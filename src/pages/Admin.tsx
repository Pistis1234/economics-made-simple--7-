import {
  AlertCircle,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Eye,
  EyeOff,
  HelpCircle,
  KeyRound,
  Lock,
  LogOut,
  Pencil,
  Plus,
  RotateCcw,
  Save,
  ShieldCheck,
  Trash2,
  X,
} from 'lucide-react';
import {useEffect, useMemo, useState} from 'react';
import {Link} from 'react-router-dom';
import {useApp} from '../context/AppContext';
import {supabase} from '../supabaseClient';
import type {
  HomepageStatItem,
  QuizOption,
  QuizQuestionData,
  Topic,
  TopicIconName,
} from '../types';
import {getTopicIcon} from '../utils/formatting';

type AdminTab = 'topics' | 'stats' | 'quizzes';

const ICON_OPTIONS: TopicIconName[] = [
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
];

const ACCENT_PRESETS = [
  '#00AEEF',
  '#2684FF',
  '#22C55E',
  '#F4A340',
  '#E06C4E',
  '#20B8A5',
];

function toSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

interface AuthStatus {
  loading: boolean;
  configured: boolean;
  envManaged: boolean;
}

export function Admin() {
  const {
    reports,
    topics,
    homepageStats,
    quizzes,
    contentUpdatedAt,
    saveCmsContent,
    resetCmsContent,
  } = useApp();

  const [authLoading, setAuthLoading] = useState(true);
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState('');

  // Auth form fields (never persisted to browser storage)
  const [passcodeInput, setPasscodeInput] = useState('');
  const [confirmInput, setConfirmInput] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [authSubmitting, setAuthSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Dashboard state
  const [activeTab, setActiveTab] = useState<AdminTab>('topics');
  const [reportFilter, setReportFilter] = useState<string>(
    reports[0]?.id ?? 'mem-sept-2026'
  );
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Topic editor state
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [isNewTopic, setIsNewTopic] = useState(false);
  const [slugLocked, setSlugLocked] = useState(false);

  // Homepage stat editor state
  const [editingStat, setEditingStat] = useState<HomepageStatItem | null>(null);
  const [isNewStat, setIsNewStat] = useState(false);

  // Quiz editor state
  const [editingQuiz, setEditingQuiz] = useState<QuizQuestionData | null>(null);
  const [isNewQuiz, setIsNewQuiz] = useState(false);

  useEffect(() => { let active = true; supabase.auth.getSession().then(({data}) => { if (!active) return; setAdminToken(data.session?.access_token ?? null); setAuthLoading(false); }); const {data: listener} = supabase.auth.onAuthStateChange((_e, session) => { if (active) setAdminToken(session?.access_token ?? null); }); return () => { active = false; listener.subscription.unsubscribe(); }; }, []);

  const filteredTopics = useMemo(
    () =>
      topics
        .filter((t) => t.reportId === reportFilter)
        .sort((a, b) => a.order - b.order),
    [topics, reportFilter]
  );
  const filteredQuizzes = useMemo(
    () => quizzes.filter((q) => q.reportId === reportFilter),
    [quizzes, reportFilter]
  );

  const handleLoginSubmit = async (e: any) => { e.preventDefault(); setAuthError(null); setAuthSubmitting(true); const {data, error} = await supabase.auth.signInWithPassword({email: emailInput.trim(), password: passcodeInput}); setAuthSubmitting(false); if (error || !data.session) { setAuthError(error?.message || 'Invalid email or password.'); return; } setAdminToken(data.session.access_token); setPasscodeInput(''); }; const handleSignOut = async () => { await supabase.auth.signOut(); setAdminToken(null); };

  const persistUpdate = async (
    nextTopics: Topic[],
    nextStats: HomepageStatItem[],
    nextQuizzes: QuizQuestionData[],
    successMsg: string
  ): Promise<boolean> => {
    if (!adminToken) return false;
    setSaving(true);
    setFeedback(null);
    try {
      await saveCmsContent(
        {
          topics: nextTopics,
          homepageStats: nextStats,
          quizzes: nextQuizzes,
        },
        adminToken
      );
      setFeedback({type: 'success', text: successMsg});
      return true;
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : 'Could not save changes.';
      if (msg.toLowerCase().includes('session')) {
        setAdminToken(null);
        setAuthError('Your admin session expired. Please sign in again.');
      } else {
        setFeedback({type: 'error', text: msg});
      }
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleResetDefaults = async () => {
    if (!adminToken) return;
    setSaving(true);
    setFeedback(null);
    try {
      await resetCmsContent(adminToken);
      setConfirmReset(false);
      setEditingTopic(null);
      setEditingStat(null);
      setEditingQuiz(null);
      setFeedback({
        type: 'success',
        text: 'Restored built-in World Bank report defaults.',
      });
    } catch (err) {
      setFeedback({
        type: 'error',
        text: err instanceof Error ? err.message : 'Could not reset content.',
      });
    } finally {
      setSaving(false);
    }
  };

  // Topic CRUD handlers
  const openNewTopicEditor = () => {
    const nextOrder =
      filteredTopics.reduce((max, item) => Math.max(max, item.order), 0) + 1;
    setIsNewTopic(true);
    setSlugLocked(false);
    setEditingTopic({
      id: `custom-topic-${Date.now()}`,
      reportId: reportFilter,
      slug: '',
      title: {en: '', ny: ''},
      shortTitle: {en: '', ny: ''},
      iconName: 'TrendingUp',
      accentColor: '#00AEEF',
      description: {en: '', ny: ''},
      whyItMatters: {en: '', ny: ''},
      category: 'Macroeconomics',
      order: nextOrder,
    });
  };

  const openEditTopicEditor = (topic: Topic) => {
    setIsNewTopic(false);
    setSlugLocked(true);
    setEditingTopic({
      ...topic,
      title: {...topic.title},
      shortTitle: {...topic.shortTitle},
      description: {...topic.description},
      whyItMatters: {...topic.whyItMatters},
    });
  };

  const handleSaveTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTopic) return;
    const cleanSlug = toSlug(editingTopic.slug || editingTopic.shortTitle.en);
    if (!cleanSlug) {
      setFeedback({
        type: 'error',
        text: 'Provide a topic short title or URL slug.',
      });
      return;
    }
    const normalizedTopic: Topic = {
      ...editingTopic,
      slug: cleanSlug,
      title: {
        en: editingTopic.title.en.trim() || editingTopic.shortTitle.en.trim(),
        ...(editingTopic.title.ny?.trim()
          ? {ny: editingTopic.title.ny.trim()}
          : {}),
      },
      shortTitle: {
        en: editingTopic.shortTitle.en.trim() || editingTopic.title.en.trim(),
        ...(editingTopic.shortTitle.ny?.trim()
          ? {ny: editingTopic.shortTitle.ny.trim()}
          : {}),
      },
      description: {
        en: editingTopic.description.en.trim(),
        ...(editingTopic.description.ny?.trim()
          ? {ny: editingTopic.description.ny.trim()}
          : {}),
      },
      whyItMatters: {
        en: editingTopic.whyItMatters.en.trim(),
        ...(editingTopic.whyItMatters.ny?.trim()
          ? {ny: editingTopic.whyItMatters.ny.trim()}
          : {}),
      },
    };

    const nextTopics = isNewTopic
      ? [...topics, normalizedTopic]
      : topics.map((t) => (t.id === normalizedTopic.id ? normalizedTopic : t));

    const ok = await persistUpdate(
      nextTopics,
      homepageStats,
      quizzes,
      isNewTopic
        ? `Added "${normalizedTopic.shortTitle.en}" to topics.`
        : `Updated "${normalizedTopic.shortTitle.en}".`
    );
    if (ok) {
      setEditingTopic(null);
    }
  };

  const handleDeleteTopic = async (topic: Topic) => {
    const nextTopics = topics.filter((t) => t.id !== topic.id);
    const ok = await persistUpdate(
      nextTopics,
      homepageStats,
      quizzes,
      `Removed "${topic.shortTitle.en}".`
    );
    if (ok) {
      setConfirmDeleteId(null);
    }
  };

  // Homepage Stats CRUD handlers
  const openNewStatEditor = () => {
    const nextNum = String(homepageStats.length + 1).padStart(2, '0');
    setIsNewStat(true);
    setEditingStat({
      id: `custom-stat-${Date.now()}`,
      numberLabel: nextNum,
      stat: {en: '', ny: ''},
      title: {en: '', ny: ''},
      summary: {en: '', ny: ''},
      detail: {en: '', ny: ''},
      iconName: 'TrendingUp',
      to: `/learn/${filteredTopics[0]?.slug ?? 'economic-growth'}`,
      linkLabel: {en: 'Open Topic Summary', ny: 'Tsegulani Chidule'},
    });
  };

  const openEditStatEditor = (item: HomepageStatItem) => {
    setIsNewStat(false);
    setEditingStat({
      ...item,
      stat: {...item.stat},
      title: {...item.title},
      summary: {...item.summary},
      detail: {...item.detail},
      linkLabel: {...item.linkLabel},
    });
  };

  const handleSaveStat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStat) return;
    const normalizedStat: HomepageStatItem = {
      ...editingStat,
      numberLabel: editingStat.numberLabel.trim() || '01',
      to: editingStat.to.trim().startsWith('/')
        ? editingStat.to.trim()
        : `/${editingStat.to.trim()}`,
    };
    const nextStats = isNewStat
      ? [...homepageStats, normalizedStat]
      : homepageStats.map((s) =>
          s.id === normalizedStat.id ? normalizedStat : s
        );

    const ok = await persistUpdate(
      topics,
      nextStats,
      quizzes,
      isNewStat
        ? `Added homepage stat "${normalizedStat.title.en}".`
        : `Updated homepage stat "${normalizedStat.title.en}".`
    );
    if (ok) {
      setEditingStat(null);
    }
  };

  const handleDeleteStat = async (stat: HomepageStatItem) => {
    const nextStats = homepageStats.filter((s) => s.id !== stat.id);
    const ok = await persistUpdate(
      topics,
      nextStats,
      quizzes,
      `Removed homepage stat "${stat.title.en}".`
    );
    if (ok) {
      setConfirmDeleteId(null);
    }
  };

  // Quiz CRUD handlers
  const openNewQuizEditor = () => {
    const reportObj =
      reports.find((r) => r.id === reportFilter) ?? reports[0];
    setIsNewQuiz(true);
    setEditingQuiz({
      id: `q-${Date.now()}`,
      reportId: reportFilter,
      topicSlug: filteredTopics[0]?.slug ?? 'economic-growth',
      question: {en: '', ny: ''},
      options: [
        {id: 'a', text: {en: '', ny: ''}},
        {id: 'b', text: {en: '', ny: ''}},
        {id: 'c', text: {en: '', ny: ''}},
        {id: 'd', text: {en: '', ny: ''}},
      ],
      correctOptionId: 'a',
      explanation: {en: '', ny: ''},
      source: {
        reportId: reportFilter,
        reportTitle: reportObj?.shortTitle ?? 'Malawi Economic Monitor',
        publisher: reportObj?.publisher ?? 'World Bank',
        publicationYear: reportObj?.year ?? 2026,
        pageReference: 'Admin entry',
        originalWording: 'Added via the site admin dashboard.',
        sourceType: 'platform_interpretation',
        verificationStatus: 'sample_pending_verification',
      },
    });
  };

  const openEditQuizEditor = (quiz: QuizQuestionData) => {
    setIsNewQuiz(false);
    setEditingQuiz({
      ...quiz,
      question: {...quiz.question},
      options: quiz.options.map((opt) => ({
        id: opt.id,
        text: {...opt.text},
      })),
      explanation: {...quiz.explanation},
      source: {...quiz.source},
    });
  };

  const handleQuizOptionChange = (
    optId: string,
    lang: 'en' | 'ny',
    value: string
  ) => {
    if (!editingQuiz) return;
    setEditingQuiz({
      ...editingQuiz,
      options: editingQuiz.options.map((opt: QuizOption) =>
        opt.id === optId
          ? {
              ...opt,
              text: {
                ...opt.text,
                [lang]: value,
              },
            }
          : opt
      ),
    });
  };

  const handleSaveQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingQuiz) return;

    const validOptions = editingQuiz.options.filter(
      (o) => o.text.en.trim().length > 0
    );
    if (validOptions.length < 2) {
      setFeedback({
        type: 'error',
        text: 'Please provide at least two non-empty answer choices.',
      });
      return;
    }
    const safeCorrectId = validOptions.some(
      (o) => o.id === editingQuiz.correctOptionId
    )
      ? editingQuiz.correctOptionId
      : validOptions[0].id;

    const normalizedQuiz: QuizQuestionData = {
      ...editingQuiz,
      options: validOptions,
      correctOptionId: safeCorrectId,
      question: {
        en: editingQuiz.question.en.trim(),
        ...(editingQuiz.question.ny?.trim()
          ? {ny: editingQuiz.question.ny.trim()}
          : {}),
      },
      explanation: {
        en: editingQuiz.explanation.en.trim(),
        ...(editingQuiz.explanation.ny?.trim()
          ? {ny: editingQuiz.explanation.ny.trim()}
          : {}),
      },
    };

    const nextQuizzes = isNewQuiz
      ? [...quizzes, normalizedQuiz]
      : quizzes.map((q) => (q.id === normalizedQuiz.id ? normalizedQuiz : q));

    const ok = await persistUpdate(
      topics,
      homepageStats,
      nextQuizzes,
      isNewQuiz ? 'Added new quiz question.' : 'Updated quiz question.'
    );
    if (ok) {
      setEditingQuiz(null);
    }
  };

  const handleDeleteQuiz = async (quiz: QuizQuestionData) => {
    const nextQuizzes = quizzes.filter((q) => q.id !== quiz.id);
    const ok = await persistUpdate(
      topics,
      homepageStats,
      nextQuizzes,
      'Deleted quiz question.'
    );
    if (ok) {
      setConfirmDeleteId(null);
    }
  };

  // =====================================================================
  // RENDER AUTHENTICATION SCREEN IF NOT SIGNED IN
  // =====================================================================
  if (authLoading) {
    return (
      <div className="min-h-[70vh] bg-[#052C5A] flex items-center justify-center px-5">
        <div className="bg-[#031F42] rounded-3xl p-8 text-center text-[#CFE8FC] shadow-xl">
          Checking admin access...
        </div>
      </div>
    );
  }

  if (!adminToken) {
    const isSetupMode = false;
    return (
      <div className="min-h-[75vh] bg-[#052C5A] flex items-center justify-center px-5 py-16">
        <div className="w-full max-w-md bg-[#031F42] rounded-3xl p-8 shadow-2xl border border-white/10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#00AEEF]/20 text-[#00AEEF] flex items-center justify-center shrink-0">
              {isSetupMode ? (
                <KeyRound className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Lock className="w-6 h-6" aria-hidden="true" />
              )}
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#00AEEF]">
                Hidden Owner Access
              </span>
              <h1 className="font-display font-extrabold text-2xl text-white">
                {isSetupMode ? 'Set Admin Password' : 'Admin Sign In'}
              </h1>
            </div>
          </div>

          <p className="text-sm text-[#CFE8FC] leading-relaxed">
            {isSetupMode
              ? 'Create an admin password for first-time setup to unlock editing for economics topics, homepage stats, and quiz questions.'
              : 'Enter your admin passcode to add or edit economics topics, update homepage stats, and manage quiz questions.'}
          </p>

          {authError && (
            <div
              role="alert"
              className="flex items-start gap-2.5 rounded-xl bg-red-500/15 border border-red-400/40 px-4 py-3 text-sm text-red-100"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-300" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4"><div><label htmlFor="admin-email" className="block text-xs font-semibold text-[#B8D9F8] mb-1.5">Admin Email</label><input id="admin-email" type="email" value={emailInput} onChange={(e)=>setEmailInput(e.target.value)} placeholder="you@example.com" required className="w-full rounded-xl bg-[#052C5A] border border-white/15 px-4 py-3 text-sm text-white" /></div><div><label htmlFor="admin-passcode" className="block text-xs font-semibold text-[#B8D9F8] mb-1.5">Password</label><input id="admin-passcode" type="password" value={passcodeInput} onChange={(e)=>setPasscodeInput(e.target.value)} placeholder="Enter admin password" required className="w-full rounded-xl bg-[#052C5A] border border-white/15 px-4 py-3 text-sm text-white" /></div><button type="submit" disabled={authSubmitting} className="w-full rounded-full bg-[#00AEEF] hover:bg-[#33C1F5] text-[#052C5A] font-bold text-sm py-3 px-6">{authSubmitting ? "Signing in..." : "Unlock Dashboard"}</button></form>

          <div className="pt-2 border-t border-white/10 text-center">
            <Link
              to="/"
              className="text-xs font-semibold text-[#85C7F2] hover:text-white transition-colors"
            >
              Return to Public Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // =====================================================================
  // AUTHENTICATED ADMIN DASHBOARD
  // =====================================================================
  return (
    <div className="min-h-screen bg-[#052C5A] text-white pb-16">
      {/* Header Bar */}
      <section className="bg-[#031F42] border-b border-white/10 py-8">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#00AEEF]">
              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
              <span>ADMIN DASHBOARD · HIDDEN ROUTE</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl text-white">
              Site Content Manager
            </h1>
            <p className="text-xs sm:text-sm text-[#B8D9F8]">
              {contentUpdatedAt
                ? `Last saved: ${new Date(contentUpdatedAt).toLocaleString()}`
                : 'Currently using built-in World Bank report defaults.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#052C5A] hover:bg-[#0A3A72] px-4 py-2 text-xs font-semibold text-[#CFE8FC]"
            >
              Preview Home
            </Link>
            <Link
              to="/learn"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#052C5A] hover:bg-[#0A3A72] px-4 py-2 text-xs font-semibold text-[#CFE8FC]"
            >
              Preview Topics
            </Link>
            <Link
              to="/quiz"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#052C5A] hover:bg-[#0A3A72] px-4 py-2 text-xs font-semibold text-[#CFE8FC]"
            >
              Preview Quiz
            </Link>

            {confirmReset ? (
              <div className="inline-flex items-center gap-1.5 rounded-full bg-red-500/20 border border-red-400/40 px-3 py-1.5 text-xs">
                <span className="text-red-100 font-semibold">Reset all?</span>
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  disabled={saving}
                  className="px-2.5 py-0.5 rounded-full bg-red-500 text-white font-bold cursor-pointer"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  className="px-2 py-0.5 text-[#CFE8FC] hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#052C5A] hover:bg-[#0A3A72] px-4 py-2 text-xs font-semibold text-[#F4A340] cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Reset Defaults</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#00AEEF] hover:bg-[#33C1F5] text-[#052C5A] px-4 py-2 text-xs font-bold cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-8 space-y-6">
        {/* Status Banner */}
        {feedback && (
          <div
            role="status"
            className={`flex items-center justify-between gap-3 rounded-2xl px-5 py-3.5 text-sm font-medium ${
              feedback.type === 'success'
                ? 'bg-emerald-500/15 border border-emerald-400/40 text-emerald-100'
                : 'bg-red-500/15 border border-red-400/40 text-red-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-300 shrink-0" />
              )}
              <span>{feedback.text}</span>
            </div>
            <button
              type="button"
              onClick={() => setFeedback(null)}
              aria-label="Dismiss notification"
              className="text-white/70 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Section Tabs & Report Edition Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label="Dashboard sections"
            className="inline-flex flex-wrap items-center p-1 bg-[#031F42] rounded-2xl gap-1"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'topics'}
              onClick={() => {
                setActiveTab('topics');
                setEditingStat(null);
                setEditingQuiz(null);
              }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                activeTab === 'topics'
                  ? 'bg-[#00AEEF] text-[#052C5A]'
                  : 'text-[#CFE8FC] hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              <span>Economics Topics ({filteredTopics.length})</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'stats'}
              onClick={() => {
                setActiveTab('stats');
                setEditingTopic(null);
                setEditingQuiz(null);
              }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                activeTab === 'stats'
                  ? 'bg-[#00AEEF] text-[#052C5A]'
                  : 'text-[#CFE8FC] hover:text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4" aria-hidden="true" />
              <span>Homepage Stats ({homepageStats.length})</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'quizzes'}
              onClick={() => {
                setActiveTab('quizzes');
                setEditingTopic(null);
                setEditingStat(null);
              }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                activeTab === 'quizzes'
                  ? 'bg-[#00AEEF] text-[#052C5A]'
                  : 'text-[#CFE8FC] hover:text-white'
              }`}
            >
              <HelpCircle className="w-4 h-4" aria-hidden="true" />
              <span>Quiz Questions ({filteredQuizzes.length})</span>
            </button>
          </div>

          {activeTab !== 'stats' && (
            <select
              aria-label="Filter by report edition"
              value={reportFilter}
              onChange={(e) => {
                setReportFilter(e.target.value);
                setEditingTopic(null);
                setEditingQuiz(null);
              }}
              className="bg-[#031F42] border border-white/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-[#00AEEF] cursor-pointer"
            >
              {reports.map((rep) => (
                <option key={rep.id} value={rep.id}>
                  {rep.shortTitle} ({rep.year})
                </option>
              ))}
            </select>
          )}
        </div>

        {/* =============================================================== */}
        {/* TAB 1: ECONOMICS TOPICS                                         */}
        {/* =============================================================== */}
        {activeTab === 'topics' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-bold text-xl text-white">Economics Topics</h2>
                <p className="text-xs sm:text-sm text-[#B8D9F8]">
                  Add or edit topics shown on the Learn page and Topic Detail views.
                </p>
              </div>
              <button
                type="button"
                onClick={openNewTopicEditor}
                className="inline-flex items-center gap-2 rounded-full bg-[#00AEEF] hover:bg-[#33C1F5] text-[#052C5A] px-5 py-2.5 text-xs sm:text-sm font-bold cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
                <span>Add Topic</span>
              </button>
            </div>

            {editingTopic && (
              <form
                onSubmit={handleSaveTopic}
                className="rounded-2xl border border-white/10 bg-[#031F42] p-5 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-lg text-white">
                    {isNewTopic ? 'New Topic' : 'Edit Topic'}
                  </h3>
                  <button type="button" onClick={() => setEditingTopic(null)} aria-label="Close topic editor" className="text-[#CFE8FC] hover:text-white cursor-pointer">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#B8D9F8] mb-1.5">Title (English)</label>
                    <input value={editingTopic.title.en} onChange={(e) => setEditingTopic({...editingTopic, title: {...editingTopic.title, en: e.target.value}})} className="w-full rounded-xl bg-[#052C5A] border border-white/15 px-4 py-3 text-sm text-white" required />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#B8D9F8] mb-1.5">Title (Chichewa)</label>
                    <input value={editingTopic.title.ny ?? ''} onChange={(e) => setEditingTopic({...editingTopic, title: {...editingTopic.title, ny: e.target.value}})} className="w-full rounded-xl bg-[#052C5A] border border-white/15 px-4 py-3 text-sm text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#B8D9F8] mb-1.5">Short Title (English)</label>
                    <input value={editingTopic.shortTitle.en} onChange={(e) => setEditingTopic({...editingTopic, shortTitle: {...editingTopic.shortTitle, en: e.target.value}, slug: slugLocked ? editingTopic.slug : toSlug(e.target.value)})} className="w-full rounded-xl bg-[#052C5A] border border-white/15 px-4 py-3 text-sm text-white" required />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#B8D9F8] mb-1.5">Short Title (Chichewa)</label>
                    <input value={editingTopic.shortTitle.ny ?? ''} onChange={(e) => setEditingTopic({...editingTopic, shortTitle: {...editingTopic.shortTitle, ny: e.target.value}})} className="w-full rounded-xl bg-[#052C5A] border border-white/15 px-4 py-3 text-sm text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#B8D9F8] mb-1.5">URL Slug</label>
                    <input value={editingTopic.slug} onChange={(e) => setEditingTopic({...editingTopic, slug: toSlug(e.target.value)})} disabled={slugLocked} className="w-full rounded-xl bg-[#052C5A] border border-white/15 px-4 py-3 text-sm text-white disabled:opacity-60" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#B8D9F8] mb-1.5">Category</label>
                    <input value={editingTopic.category} onChange={(e) => setEditingTopic({...editingTopic, category: e.target.value})} className="w-full rounded-xl bg-[#052C5A] border border-white/15 px-4 py-3 text-sm text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#B8D9F8] mb-1.5">Icon</label>
                    <select value={editingTopic.iconName} onChange={(e) => setEditingTopic({...editingTopic, iconName: e.target.value as TopicIconName})} className="w-full rounded-xl bg-[#052C5A] border border-white/15 px-4 py-3 text-sm text-white">
                      {ICON_OPTIONS.map((icon) => <option key={icon} value={icon}>{icon}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#B8D9F8] mb-1.5">Accent Color</label>
                    <select value={editingTopic.accentColor} onChange={(e) => setEditingTopic({...editingTopic, accentColor: e.target.value})} className="w-full rounded-xl bg-[#052C5A] border border-white/15 px-4 py-3 text-sm text-white">
                      {ACCENT_PRESETS.map((color) => <option key={color} value={color}>{color}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#B8D9F8] mb-1.5">Display Order</label>
                    <input type="number" value={editingTopic.order} onChange={(e) => setEditingTopic({...editingTopic, order: Number(e.target.value)})} className="w-full rounded-xl bg-[#052C5A] border border-white/15 px-4 py-3 text-sm text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#B8D9F8] mb-1.5">Report</label>
                    <select value={editingTopic.reportId} onChange={(e) => setEditingTopic({...editingTopic, reportId: e.target.value})} className="w-full rounded-xl bg-[#052C5A] border border-white/15 px-4 py-3 text-sm text-white">
                      {reports.map((report) => <option key={report.id} value={report.id}>{report.shortTitle}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#B8D9F8] mb-1.5">Description (English)</label>
                    <textarea value={editingTopic.description.en} onChange={(e) => setEditingTopic({...editingTopic, description: {...editingTopic.description, en: e.target.value}})} rows={4} className="w-full rounded-xl bg-[#052C5A] border border-white/15 px-4 py-3 text-sm text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#B8D9F8] mb-1.5">Description (Chichewa)</label>
                    <textarea value={editingTopic.description.ny ?? ''} onChange={(e) => setEditingTopic({...editingTopic, description: {...editingTopic.description, ny: e.target.value}})} rows={4} className="w-full rounded-xl bg-[#052C5A] border border-white/15 px-4 py-3 text-sm text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#B8D9F8] mb-1.5">Why It Matters (English)</label>
                    <textarea value={editingTopic.whyItMatters.en} onChange={(e) => setEditingTopic({...editingTopic, whyItMatters: {...editingTopic.whyItMatters, en: e.target.value}})} rows={4} className="w-full rounded-xl bg-[#052C5A] border border-white/15 px-4 py-3 text-sm text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#B8D9F8] mb-1.5">Why It Matters (Chichewa)</label>
                    <textarea value={editingTopic.whyItMatters.ny ?? ''} onChange={(e) => setEditingTopic({...editingTopic, whyItMatters: {...editingTopic.whyItMatters, ny: e.target.value}})} rows={4} className="w-full rounded-xl bg-[#052C5A] border border-white/15 px-4 py-3 text-sm text-white" />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setEditingTopic(null)} className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold text-[#CFE8FC] cursor-pointer">Cancel</button>
                  <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-full bg-[#00AEEF] px-5 py-2 text-xs font-bold text-[#052C5A] disabled:opacity-60 cursor-pointer"><Save className="w-4 h-4" />Save Topic</button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTopics.map((topic) => (
                <div key={topic.id} className="bg-[#031F42] rounded-2xl p-5 border border-white/10">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[11px] font-bold text-[#85C7F2]">{topic.category} · Order {topic.order}</div>
                      <h3 className="font-display font-bold text-base text-white mt-1">{topic.shortTitle.en}</h3>
                      <p className="text-xs text-[#CFE8FC] mt-1 line-clamp-2">{topic.description.en}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button type="button" onClick={() => openEditTopicEditor(topic)} className="p-2 rounded-full bg-[#052C5A] text-[#CFE8FC] hover:text-white cursor-pointer" aria-label={`Edit ${topic.shortTitle.en}`}><Pencil className="w-3.5 h-3.5" /></button>
                      {confirmDeleteId === topic.id ? (
                        <div className="flex items-center gap-1">
                          <button type="button" onClick={() => handleDeleteTopic(topic)} disabled={saving} className="text-xs font-bold text-red-200 cursor-pointer">Delete</button>
                          <button type="button" onClick={() => setConfirmDeleteId(null)} className="text-xs text-[#CFE8FC] cursor-pointer">Cancel</button>
                        </div>
                      ) : (
                        <button type="button" onClick={() => setConfirmDeleteId(topic.id)} className="p-2 rounded-full bg-[#052C5A] text-[#B8D9F8] hover:text-red-200 cursor-pointer" aria-label={`Delete ${topic.shortTitle.en}`}><Trash2 className="w-3.5 h-3.5" /></button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-bold text-xl text-white">Homepage Stats</h2>
                <p className="text-xs sm:text-sm text-[#B8D9F8]">Manage the statistics displayed on the public homepage.</p>
              </div>
              <button type="button" onClick={openNewStatEditor} className="inline-flex items-center gap-2 rounded-full bg-[#00AEEF] hover:bg-[#33C1F5] text-[#052C5A] px-5 py-2.5 text-xs sm:text-sm font-bold cursor-pointer shrink-0">
                <Plus className="w-4 h-4" aria-hidden="true" />
                <span>Add Stat</span>
              </button>
            </div>

            {editingStat && (
              <form onSubmit={handleSaveStat} className="rounded-2xl border border-white/10 bg-[#031F42] p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-lg text-white">{isNewStat ? 'New Homepage Stat' : 'Edit Homepage Stat'}</h3>
                  <button type="button" onClick={() => setEditingStat(null)} aria-label="Close stat editor" className="text-[#CFE8FC] hover:text-white cursor-pointer"><X className="w-4 h-4" /></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#B8D9F8] mb-1.5">Number Label</label>
                    <input value={editingStat.numberLabel} onChange={(e) => setEditingStat({...editingStat, numberLabel: e.target.value})} className="w-full rounded-xl bg-[#052C5A] border border-white/15 px-4 py-3 text-sm text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#B8D9F8] mb-1.5">Stat (English)</label>
                    <input value={editingStat.stat.en} onChange={(e) => setEditingStat({...editingStat, stat: {...editingStat.stat, en: e.target.value}})} className="w-full rounded-xl bg-[#052C5A] border border-white/15 px-4 py-3 text-sm text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#B8D9F8] mb-1.5">Title (English)</label>
                    <input value={editingStat.title.en} onChange={(e) => setEditingStat({...editingStat, title: {...editingStat.title, en: e.target.value}})} className="w-full rounded-xl bg-[#052C5A] border border-white/15 px-4 py-3 text-sm text-white" required />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#B8D9F8] mb-1.5">Title (Chichewa)</label>
                    <input value={editingStat.title.ny ?? ''} onChange={(e) => setEditingStat({...editingStat, title: {...editingStat.title, ny: e.target.value}})} className="w-full rounded-xl bg-[#052C5A] border border-white/15 px-4 py-3 text-sm text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#B8D9F8] mb-1.5">Link Path</label>
                    <input value={editingStat.to} onChange={(e) => setEditingStat({...editingStat, to: e.target.value})} className="w-full rounded-xl bg-[#052C5A] border border-white/15 px-4 py-3 text-sm text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#B8D9F8] mb-1.5">Icon</label>
                    <select value={editingStat.iconName} onChange={(e) => setEditingStat({...editingStat, iconName: e.target.value as TopicIconName})} className="w-full rounded-xl bg-[#052C5A] border border-white/15 px-4 py-3 text-sm text-white">
                      {ICON_OPTIONS.map((icon) => <option key={icon} value={icon}>{icon}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#B8D9F8] mb-1.5">Summary (English)</label>
                    <textarea value={editingStat.summary.en} onChange={(e) => setEditingStat({...editingStat, summary: {...editingStat.summary, en: e.target.value}})} rows={3} className="w-full rounded-xl bg-[#052C5A] border border-white/15 px-4 py-3 text-sm text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#B8D9F8] mb-1.5">Detail (English)</label>
                    <textarea value={editingStat.detail.en} onChange={(e) => setEditingStat({...editingStat, detail: {...editingStat.detail, en: e.target.value}})} rows={3} className="w-full rounded-xl bg-[#052C5A] border border-white/15 px-4 py-3 text-sm text-white" />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setEditingStat(null)} className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold text-[#CFE8FC] cursor-pointer">Cancel</button>
                  <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-full bg-[#00AEEF] px-5 py-2 text-xs font-bold text-[#052C5A] disabled:opacity-60 cursor-pointer"><Save className="w-4 h-4" />Save Stat</button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {homepageStats.map((stat) => (
                <div key={stat.id} className="bg-[#031F42] rounded-2xl p-5 border border-white/10">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold text-[#00AEEF]">{stat.numberLabel} · {stat.stat.en}</div>
                      <h3 className="font-display font-bold text-base text-white mt-1">{stat.title.en}</h3>
                      <p className="text-xs text-[#CFE8FC] mt-1 line-clamp-2">{stat.summary.en}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button type="button" onClick={() => openEditStatEditor(stat)} className="p-2 rounded-full bg-[#052C5A] text-[#CFE8FC] hover:text-white cursor-pointer" aria-label={`Edit ${stat.title.en}`}><Pencil className="w-3.5 h-3.5" /></button>
                      {confirmDeleteId === stat.id ? (
                        <div className="flex items-center gap-1">
                          <button type="button" onClick={() => handleDeleteStat(stat)} disabled={saving} className="text-xs font-bold text-red-200 cursor-pointer">Delete</button>
                          <button type="button" onClick={() => setConfirmDeleteId(null)} className="text-xs text-[#CFE8FC] cursor-pointer">Cancel</button>
                        </div>
                      ) : (
                        <button type="button" onClick={() => setConfirmDeleteId(stat.id)} className="p-2 rounded-full bg-[#052C5A] text-[#B8D9F8] hover:text-red-200 cursor-pointer" aria-label={`Delete ${stat.title.en}`}><Trash2 className="w-3.5 h-3.5" /></button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'quizzes' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-bold text-xl text-white">Quiz Questions</h2>
                <p className="text-xs sm:text-sm text-[#B8D9F8]">Add or edit questions for the public quiz.</p>
              </div>
              <button type="button" onClick={openNewQuizEditor} className="inline-flex items-center gap-2 rounded-full bg-[#00AEEF] hover:bg-[#33C1F5] text-[#052C5A] px-5 py-2.5 text-xs sm:text-sm font-bold cursor-pointer shrink-0">
                <Plus className="w-4 h-4" aria-hidden="true" />
                <span>Add Question</span>
              </button>
            </div>

            {editingQuiz && (
              <form onSubmit={handleSaveQuiz} className="rounded-2xl border border-white/10 bg-[#031F42] p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-lg text-white">{isNewQuiz ? 'New Quiz Question' : 'Edit Quiz Question'}</h3>
                  <button type="button" onClick={() => setEditingQuiz(null)} aria-label="Close quiz editor" className="text-[#CFE8FC] hover:text-white cursor-pointer"><X className="w-4 h-4" /></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#B8D9F8] mb-1.5">Question (English)</label>
                    <textarea value={editingQuiz.question.en} onChange={(e) => setEditingQuiz({...editingQuiz, question: {...editingQuiz.question, en: e.target.value}})} rows={3} className="w-full rounded-xl bg-[#052C5A] border border-white/15 px-4 py-3 text-sm text-white" required />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#B8D9F8] mb-1.5">Question (Chichewa)</label>
                    <textarea value={editingQuiz.question.ny ?? ''} onChange={(e) => setEditingQuiz({...editingQuiz, question: {...editingQuiz.question, ny: e.target.value}})} rows={3} className="w-full rounded-xl bg-[#052C5A] border border-white/15 px-4 py-3 text-sm text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#B8D9F8] mb-1.5">Topic Slug</label>
                    <select value={editingQuiz.topicSlug} onChange={(e) => setEditingQuiz({...editingQuiz, topicSlug: e.target.value})} className="w-full rounded-xl bg-[#052C5A] border border-white/15 px-4 py-3 text-sm text-white">
                      {filteredTopics.map((topic) => <option key={topic.slug} value={topic.slug}>{topic.shortTitle.en}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#B8D9F8] mb-1.5">Correct Answer</label>
                    <select value={editingQuiz.correctOptionId} onChange={(e) => setEditingQuiz({...editingQuiz, correctOptionId: e.target.value})} className="w-full rounded-xl bg-[#052C5A] border border-white/15 px-4 py-3 text-sm text-white">
                      {editingQuiz.options.map((option) => <option key={option.id} value={option.id}>{option.id.toUpperCase()}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {editingQuiz.options.map((option) => (
                    <div key={option.id}>
                      <label className="block text-xs font-semibold text-[#B8D9F8] mb-1.5">Answer {option.id.toUpperCase()} (English)</label>
                      <input value={option.text.en} onChange={(e) => handleQuizOptionChange(option.id, 'en', e.target.value)} className="w-full rounded-xl bg-[#052C5A] border border-white/15 px-4 py-3 text-sm text-white" />
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#B8D9F8] mb-1.5">Explanation (English)</label>
                    <textarea value={editingQuiz.explanation.en} onChange={(e) => setEditingQuiz({...editingQuiz, explanation: {...editingQuiz.explanation, en: e.target.value}})} rows={3} className="w-full rounded-xl bg-[#052C5A] border border-white/15 px-4 py-3 text-sm text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#B8D9F8] mb-1.5">Explanation (Chichewa)</label>
                    <textarea value={editingQuiz.explanation.ny ?? ''} onChange={(e) => setEditingQuiz({...editingQuiz, explanation: {...editingQuiz.explanation, ny: e.target.value}})} rows={3} className="w-full rounded-xl bg-[#052C5A] border border-white/15 px-4 py-3 text-sm text-white" />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setEditingQuiz(null)} className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold text-[#CFE8FC] cursor-pointer">Cancel</button>
                  <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-full bg-[#00AEEF] px-5 py-2 text-xs font-bold text-[#052C5A] disabled:opacity-60 cursor-pointer"><Save className="w-4 h-4" />Save Question</button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 gap-4">
              {filteredQuizzes.map((quiz, idx) => {
                const correctOpt = quiz.options.find((option) => option.id === quiz.correctOptionId);
                return (
                  <div key={quiz.id} className="bg-[#031F42] rounded-2xl p-5 border border-white/10">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="text-[11px] font-bold text-[#85C7F2]">Q{idx + 1} · {quiz.topicSlug}</div>
                        <h3 className="font-display font-bold text-base text-white">{quiz.question.en}</h3>
                        <div className="text-xs text-[#CFE8FC]">Correct ({quiz.correctOptionId.toUpperCase()}): {correctOpt?.text.en}</div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button type="button" onClick={() => openEditQuizEditor(quiz)} className="p-2 rounded-full bg-[#052C5A] text-[#CFE8FC] hover:text-white cursor-pointer" aria-label={`Edit question ${idx + 1}`}><Pencil className="w-3.5 h-3.5" /></button>
                        {confirmDeleteId === quiz.id ? (
                          <div className="flex items-center gap-1">
                            <button type="button" onClick={() => handleDeleteQuiz(quiz)} disabled={saving} className="text-xs font-bold text-red-200 cursor-pointer">Delete</button>
                            <button type="button" onClick={() => setConfirmDeleteId(null)} className="text-xs text-[#CFE8FC] cursor-pointer">Cancel</button>
                          </div>
                        ) : (
                          <button type="button" onClick={() => setConfirmDeleteId(quiz.id)} className="p-2 rounded-full bg-[#052C5A] text-[#B8D9F8] hover:text-red-200 cursor-pointer" aria-label={`Delete question ${idx + 1}`}><Trash2 className="w-3.5 h-3.5" /></button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

