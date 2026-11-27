import 'dotenv/config';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import express, {type NextFunction, type Request, type Response} from 'express';

const PORT = Number(process.env.PORT || 3000);
const HOST = '0.0.0.0';
const DATA_DIR = path.resolve(process.cwd(), '.data');
const AUTH_FILE = path.join(DATA_DIR, 'admin-auth.json');
const CONTENT_FILE = path.join(DATA_DIR, 'cms-content.json');

const SESSION_TTL_MS = 8 * 60 * 60 * 1000;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const MAX_LOGIN_ATTEMPTS = 10;

const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET?.trim() ||
  crypto.randomBytes(32).toString('hex');

const ALLOWED_ICONS = new Set([
  'TrendingUp',
  'ShoppingBasket',
  'Landmark',
  'Ship',
  'Briefcase',
  'Sprout',
  'ArrowLeftRight',
  'Wallet',
  'Coins',
  'BarChart3',
  'ShieldCheck',
  'Scale',
  'Factory',
]);

interface StoredAuthRecord {
  saltHex: string;
  hashHex: string;
  createdAt: string;
}

interface SessionPayload {
  role: 'admin';
  jti: string;
  exp: number;
}

interface LoginRateRecord {
  count: number;
  resetAt: number;
}

const loginAttempts = new Map<string, LoginRateRecord>();
const revokedTokens = new Map<string, number>();

function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, {recursive: true, mode: 0o700});
  }
}

function writeJsonAtomic(filePath: string, data: unknown): void {
  ensureDataDir();
  const tmpPath = `${filePath}.${crypto.randomBytes(6).toString('hex')}.tmp`;
  fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), {
    encoding: 'utf8',
    mode: 0o600,
  });
  fs.renameSync(tmpPath, filePath);
}

function readJsonFile<T>(filePath: string): T | null {
  try {
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function getEnvAdminPasscode(): string {
  return process.env.ADMIN_PASSCODE?.trim() ?? '';
}

function timingSafeTextEqual(a: string, b: string): boolean {
  const hashA = crypto.createHash('sha256').update(a, 'utf8').digest();
  const hashB = crypto.createHash('sha256').update(b, 'utf8').digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

function hashPasscode(passcode: string): StoredAuthRecord {
  const salt = crypto.randomBytes(16);
  const derived = crypto.scryptSync(passcode, salt, 64);
  return {
    saltHex: salt.toString('hex'),
    hashHex: derived.toString('hex'),
    createdAt: new Date().toISOString(),
  };
}

function verifyScryptPasscode(
  passcode: string,
  record: StoredAuthRecord
): boolean {
  try {
    const salt = Buffer.from(record.saltHex, 'hex');
    const storedHash = Buffer.from(record.hashHex, 'hex');
    const derived = crypto.scryptSync(passcode, salt, 64);
    if (storedHash.length !== derived.length) return false;
    return crypto.timingSafeEqual(storedHash, derived);
  } catch {
    return false;
  }
}

function getAdminAuthStatus(): {configured: boolean; envManaged: boolean} {
  if (getEnvAdminPasscode().length > 0) {
    return {configured: true, envManaged: true};
  }
  const stored = readJsonFile<StoredAuthRecord>(AUTH_FILE);
  const hasStored = Boolean(stored?.saltHex && stored?.hashHex);
  return {configured: hasStored, envManaged: false};
}

function signSessionToken(): {token: string; expiresAt: number} {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload: SessionPayload = {
    role: 'admin',
    jti: crypto.randomBytes(16).toString('hex'),
    exp: expiresAt,
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload), 'utf8').toString(
    'base64url'
  );
  const sig = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(encodedPayload)
    .digest('base64url');
  return {token: `${encodedPayload}.${sig}`, expiresAt};
}

function cleanupExpiredRevocations(): void {
  const now = Date.now();
  for (const [jti, exp] of revokedTokens.entries()) {
    if (exp <= now) {
      revokedTokens.delete(jti);
    }
  }
}

function verifySessionToken(token: string): SessionPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const [encodedPayload, providedSig] = parts;
    if (!encodedPayload || !providedSig) return null;

    const expectedSig = crypto
      .createHmac('sha256', SESSION_SECRET)
      .update(encodedPayload)
      .digest('base64url');

    if (!timingSafeTextEqual(providedSig, expectedSig)) {
      return null;
    }

    const decoded = JSON.parse(
      Buffer.from(encodedPayload, 'base64url').toString('utf8')
    ) as SessionPayload;

    if (
      decoded.role !== 'admin' ||
      typeof decoded.exp !== 'number' ||
      typeof decoded.jti !== 'string' ||
      decoded.exp <= Date.now()
    ) {
      return null;
    }

    cleanupExpiredRevocations();
    if (revokedTokens.has(decoded.jti)) {
      return null;
    }

    return decoded;
  } catch {
    return null;
  }
}

function getClientKey(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0]?.trim() || 'unknown';
  }
  return req.ip || req.socket.remoteAddress || 'unknown';
}

function isRateLimited(clientKey: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(clientKey);
  if (!entry) return false;
  if (entry.resetAt <= now) {
    loginAttempts.delete(clientKey);
    return false;
  }
  return entry.count >= MAX_LOGIN_ATTEMPTS;
}

function recordFailedAttempt(clientKey: string): void {
  const now = Date.now();
  const entry = loginAttempts.get(clientKey);
  if (!entry || entry.resetAt <= now) {
    loginAttempts.set(clientKey, {count: 1, resetAt: now + LOGIN_WINDOW_MS});
    return;
  }
  entry.count += 1;
}

function requireAdminAuth(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization ?? '';
  if (!authHeader.startsWith('Bearer ')) {
    res.status(401).json({error: 'Admin sign-in is required.'});
    return;
  }
  const token = authHeader.slice(7).trim();
  const session = verifySessionToken(token);
  if (!session) {
    res.status(401).json({error: 'Session expired or invalid.'});
    return;
  }
  (req as Request & {adminSession?: SessionPayload}).adminSession = session;
  next();
}

function asTrimmedString(val: unknown, maxLen: number): string {
  if (typeof val !== 'string') return '';
  return val.trim().slice(0, maxLen);
}

function normalizeLocalizedText(
  val: unknown,
  fieldLabel: string,
  required = true,
  maxLen = 1200
): {en: string; ny?: string; nyReviewStatus?: string} {
  if (!val || typeof val !== 'object') {
    if (required) {
      throw new Error(`Invalid localized field: ${fieldLabel}`);
    }
    return {en: ''};
  }
  const obj = val as Record<string, unknown>;
  const en = asTrimmedString(obj.en, maxLen);
  if (required && !en) {
    throw new Error(`${fieldLabel} (English) is required.`);
  }
  const ny = asTrimmedString(obj.ny, maxLen);
  const out: {en: string; ny?: string; nyReviewStatus?: string} = {en};
  if (ny) {
    out.ny = ny;
  }
  if (
    obj.nyReviewStatus === 'verified' ||
    obj.nyReviewStatus === 'pending_expert_review' ||
    obj.nyReviewStatus === 'not_yet_translated'
  ) {
    out.nyReviewStatus = obj.nyReviewStatus;
  }
  return out;
}

function validateAndSanitizeContent(body: unknown): {
  topics: unknown[];
  homepageStats: unknown[];
  quizzes: unknown[];
  updatedAt: string;
} {
  if (!body || typeof body !== 'object') {
    throw new Error('Request payload must be a JSON object.');
  }
  const raw = body as Record<string, unknown>;

  if (!Array.isArray(raw.topics) || raw.topics.length > 60) {
    throw new Error('Topics must be a list of up to 60 items.');
  }
  if (!Array.isArray(raw.homepageStats) || raw.homepageStats.length > 12) {
    throw new Error('Homepage stats must be a list of up to 12 items.');
  }
  if (!Array.isArray(raw.quizzes) || raw.quizzes.length > 100) {
    throw new Error('Quizzes must be a list of up to 100 items.');
  }

  const seenTopicKeys = new Set<string>();
  const topics = raw.topics.map((item, idx) => {
    if (!item || typeof item !== 'object') {
      throw new Error(`Invalid topic at index ${idx}.`);
    }
    const t = item as Record<string, unknown>;
    const id = asTrimmedString(t.id, 80);
    const reportId = asTrimmedString(t.reportId, 80);
    const slug = asTrimmedString(t.slug, 80).toLowerCase();
    const category = asTrimmedString(t.category, 80);
    const iconName = asTrimmedString(t.iconName, 40);
    const accentColor = asTrimmedString(t.accentColor, 20);
    const order = Number(t.order);

    if (!id || !reportId || !category) {
      throw new Error(`Topic #${idx + 1} is missing required identifiers.`);
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      throw new Error(
        `Topic slug "${slug}" must use lowercase letters, numbers, and hyphens only.`
      );
    }
    const dedupeKey = `${reportId}:${slug}`;
    if (seenTopicKeys.has(dedupeKey)) {
      throw new Error(
        `Duplicate topic slug "${slug}" in report "${reportId}".`
      );
    }
    seenTopicKeys.add(dedupeKey);

    if (!ALLOWED_ICONS.has(iconName)) {
      throw new Error(`Unsupported icon "${iconName}" on topic "${slug}".`);
    }
    const safeColor = /^#[0-9a-fA-F]{3,8}$/.test(accentColor)
      ? accentColor
      : '#00AEEF';

    return {
      id,
      reportId,
      slug,
      title: normalizeLocalizedText(t.title, `Topic ${slug} title`, true, 160),
      shortTitle: normalizeLocalizedText(
        t.shortTitle,
        `Topic ${slug} short title`,
        true,
        100
      ),
      iconName,
      accentColor: safeColor,
      description: normalizeLocalizedText(
        t.description,
        `Topic ${slug} description`,
        true,
        600
      ),
      whyItMatters: normalizeLocalizedText(
        t.whyItMatters,
        `Topic ${slug} why it matters`,
        true,
        900
      ),
      category,
      order: Number.isFinite(order) ? Math.max(1, Math.round(order)) : idx + 1,
    };
  });

  const homepageStats = raw.homepageStats.map((item, idx) => {
    if (!item || typeof item !== 'object') {
      throw new Error(`Invalid homepage stat at index ${idx}.`);
    }
    const s = item as Record<string, unknown>;
    const id = asTrimmedString(s.id, 80);
    const numberLabel = asTrimmedString(s.numberLabel, 12);
    const iconName = asTrimmedString(s.iconName, 40);
    const to = asTrimmedString(s.to, 160);

    if (!id || !numberLabel) {
      throw new Error(`Homepage stat #${idx + 1} is missing ID or number.`);
    }
    if (!ALLOWED_ICONS.has(iconName)) {
      throw new Error(`Unsupported icon "${iconName}" on homepage stat.`);
    }
    if (!to.startsWith('/')) {
      throw new Error(`Stat link "${to}" must be an internal path starting with /.`);
    }

    return {
      id,
      numberLabel,
      stat: normalizeLocalizedText(s.stat, `Stat #${idx + 1} value`, true, 40),
      title: normalizeLocalizedText(s.title, `Stat #${idx + 1} title`, true, 80),
      summary: normalizeLocalizedText(
        s.summary,
        `Stat #${idx + 1} summary`,
        true,
        240
      ),
      detail: normalizeLocalizedText(
        s.detail,
        `Stat #${idx + 1} detail`,
        true,
        420
      ),
      iconName,
      to,
      linkLabel: normalizeLocalizedText(
        s.linkLabel,
        `Stat #${idx + 1} link label`,
        true,
        80
      ),
    };
  });

  const quizzes = raw.quizzes.map((item, idx) => {
    if (!item || typeof item !== 'object') {
      throw new Error(`Invalid quiz question at index ${idx}.`);
    }
    const q = item as Record<string, unknown>;
    const id = asTrimmedString(q.id, 80);
    const reportId = asTrimmedString(q.reportId, 80);
    const topicSlug = asTrimmedString(q.topicSlug, 80).toLowerCase();
    const correctOptionId = asTrimmedString(q.correctOptionId, 16);

    if (!id || !reportId || !topicSlug) {
      throw new Error(`Quiz question #${idx + 1} is missing required fields.`);
    }
    if (!Array.isArray(q.options) || q.options.length < 2 || q.options.length > 6) {
      throw new Error(
        `Quiz question #${idx + 1} must have between 2 and 6 answer options.`
      );
    }

    const options = q.options.map((opt, oIdx) => {
      if (!opt || typeof opt !== 'object') {
        throw new Error(`Invalid option on question #${idx + 1}.`);
      }
      const o = opt as Record<string, unknown>;
      const optId = asTrimmedString(o.id, 16);
      if (!optId) {
        throw new Error(`Missing option ID on question #${idx + 1}.`);
      }
      return {
        id: optId,
        text: normalizeLocalizedText(
          o.text,
          `Question #${idx + 1} option ${oIdx + 1}`,
          true,
          280
        ),
      };
    });

    if (!options.some((o) => o.id === correctOptionId)) {
      throw new Error(
        `Correct option "${correctOptionId}" does not match any option on question #${idx + 1}.`
      );
    }

    const rawSource =
      q.source && typeof q.source === 'object'
        ? (q.source as Record<string, unknown>)
        : {};
    const pubYear = Number(rawSource.publicationYear);
    const sourceUrl = asTrimmedString(rawSource.sourceUrl, 400);
    const safeSourceUrl =
      sourceUrl &&
      (sourceUrl.startsWith('/') ||
        sourceUrl.startsWith('https://') ||
        sourceUrl.startsWith('http://'))
        ? sourceUrl
        : undefined;

    return {
      id,
      reportId,
      topicSlug,
      question: normalizeLocalizedText(
        q.question,
        `Question #${idx + 1}`,
        true,
        400
      ),
      options,
      correctOptionId,
      explanation: normalizeLocalizedText(
        q.explanation,
        `Question #${idx + 1} explanation`,
        true,
        600
      ),
      source: {
        reportId: asTrimmedString(rawSource.reportId, 80) || reportId,
        reportTitle:
          asTrimmedString(rawSource.reportTitle, 200) ||
          'Malawi Economic Monitor',
        publisher: asTrimmedString(rawSource.publisher, 120) || 'World Bank',
        publicationYear: Number.isFinite(pubYear) ? pubYear : 2026,
        pageReference:
          asTrimmedString(rawSource.pageReference, 120) || 'Admin entry',
        originalWording:
          asTrimmedString(rawSource.originalWording, 1000) ||
          'Added or updated via the site admin dashboard.',
        ...(safeSourceUrl ? {sourceUrl: safeSourceUrl} : {}),
        sourceType:
          rawSource.sourceType === 'direct_report'
            ? 'direct_report'
            : 'platform_interpretation',
        verificationStatus:
          rawSource.verificationStatus === 'verified'
            ? 'verified'
            : 'sample_pending_verification',
      },
    };
  });

  return {
    topics,
    homepageStats,
    quizzes,
    updatedAt: new Date().toISOString(),
  };
}

async function startServer(): Promise<void> {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({limit: '512kb'}));

  // Public CMS read endpoint
  app.get('/api/content', (_req, res) => {
    const content = readJsonFile<{
      topics?: unknown[];
      homepageStats?: unknown[];
      quizzes?: unknown[];
      updatedAt?: string;
    }>(CONTENT_FILE);
    res.setHeader('Cache-Control', 'no-store');
    res.json({
      topics: content?.topics ?? null,
      homepageStats: content?.homepageStats ?? null,
      quizzes: content?.quizzes ?? null,
      updatedAt: content?.updatedAt ?? null,
    });
  });

  // Admin configuration status (never exposes secrets or hashes)
  app.get('/api/admin/status', (_req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    res.json(getAdminAuthStatus());
  });

  // First-run one-time admin passcode setup (disabled once configured or env-managed)
  app.post('/api/admin/setup', (req, res) => {
    const status = getAdminAuthStatus();
    if (status.configured) {
      res.status(409).json({
        error: 'An admin passcode is already configured. Please sign in.',
      });
      return;
    }

    const passcode =
      typeof req.body?.passcode === 'string' ? req.body.passcode : '';
    if (passcode.length < 8 || passcode.length > 128) {
      res.status(400).json({
        error: 'Passcode must be between 8 and 128 characters.',
      });
      return;
    }

    const record = hashPasscode(passcode);
    writeJsonAtomic(AUTH_FILE, record);
    const session = signSessionToken();
    res.status(201).json({
      token: session.token,
      expiresAt: session.expiresAt,
      envManaged: false,
    });
  });

  // Admin login
  app.post('/api/admin/login', (req, res) => {
    const clientKey = getClientKey(req);
    if (isRateLimited(clientKey)) {
      res.status(429).json({
        error: 'Too many failed sign-in attempts. Wait 15 minutes and try again.',
      });
      return;
    }

    const status = getAdminAuthStatus();
    if (!status.configured) {
      res.status(409).json({
        error: 'No admin passcode has been set yet.',
      });
      return;
    }

    const passcode =
      typeof req.body?.passcode === 'string' ? req.body.passcode : '';
    if (!passcode) {
      res.status(400).json({error: 'Enter your admin passcode.'});
      return;
    }

    const envPasscode = getEnvAdminPasscode();
    let valid = false;
    if (envPasscode.length > 0) {
      valid = timingSafeTextEqual(passcode, envPasscode);
    } else {
      const stored = readJsonFile<StoredAuthRecord>(AUTH_FILE);
      valid = stored ? verifyScryptPasscode(passcode, stored) : false;
    }

    if (!valid) {
      recordFailedAttempt(clientKey);
      res.status(401).json({error: 'Invalid admin passcode.'});
      return;
    }

    loginAttempts.delete(clientKey);
    const session = signSessionToken();
    res.json({
      token: session.token,
      expiresAt: session.expiresAt,
      envManaged: envPasscode.length > 0,
    });
  });

  app.get('/api/admin/session', requireAdminAuth, (req, res) => {
    const session = (req as Request & {adminSession?: SessionPayload})
      .adminSession;
    res.json({
      authenticated: true,
      expiresAt: session?.exp ?? null,
      envManaged: getEnvAdminPasscode().length > 0,
    });
  });

  app.post('/api/admin/logout', requireAdminAuth, (req, res) => {
    const session = (req as Request & {adminSession?: SessionPayload})
      .adminSession;
    if (session) {
      revokedTokens.set(session.jti, session.exp);
    }
    res.json({ok: true});
  });

  // Protected CMS update endpoint
  app.put('/api/admin/content', requireAdminAuth, (req, res) => {
    try {
      const validated = validateAndSanitizeContent(req.body);
      writeJsonAtomic(CONTENT_FILE, validated);
      res.json(validated);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Invalid content payload.';
      res.status(400).json({error: message});
    }
  });

  // Protected CMS reset endpoint (restores built-in report defaults)
  app.post('/api/admin/reset', requireAdminAuth, (_req, res) => {
    try {
      if (fs.existsSync(CONTENT_FILE)) {
        fs.unlinkSync(CONTENT_FILE);
      }
      res.json({ok: true});
    } catch {
      res.status(500).json({error: 'Could not reset stored content.'});
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const {createServer: createViteServer} = await import('vite');
    const vite = await createViteServer({
      server: {middlewareMode: true},
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`Server listening on http://${HOST}:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
