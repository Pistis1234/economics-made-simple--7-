import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {DEFAULT_HOMEPAGE_STATS} from '../data/defaultHomepageStats';
import {QUIZ_QUESTIONS} from '../data/quizzes';
import {DEFAULT_REPORT_ID, REPORTS} from '../data/reports';
import {TOPICS} from '../data/topics';
import {UI_STRINGS} from '../data/translations';
import {supabase} from '../supabaseClient';
import type {
  CmsContentState,
  EconomicReport,
  HomepageStatItem,
  LanguageCode,
  LocalizedText,
  QuizQuestionData,
  SourceReference,
  Topic,
} from '../types';
import {resolveLocalizedText} from '../utils/formatting';

const LANGUAGE_STORAGE_KEY = 'ems-language';
const CMS_ROW_ID = 'main';

function readInitialLanguage(): LanguageCode {
  if (typeof window === 'undefined') return 'en';
  try {
    const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return saved === 'ny' ? 'ny' : 'en';
  } catch {
    return 'en';
  }
}

interface AppContextValue {
  reports: EconomicReport[];
  selectedReportId: string;
  selectedReport: EconomicReport;
  setSelectedReportId: (id: string) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (text: LocalizedText) => string;
  bi: (en: string, ny: string) => string;
  ui: (key: keyof typeof UI_STRINGS) => string;
  activeSource: SourceReference | null;
  openSourceModal: (source: SourceReference) => void;
  closeSourceModal: () => void;
  topics: Topic[];
  homepageStats: HomepageStatItem[];
  quizzes: QuizQuestionData[];
  contentUpdatedAt: string | null;
  saveCmsContent: (
    nextContent: CmsContentState,
    adminToken?: string
  ) => Promise<CmsContentState>;
  resetCmsContent: (adminToken?: string) => Promise<void>;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({children}: {children: React.ReactNode}) {
  const [selectedReportId, setSelectedReportId] =
    useState<string>(DEFAULT_REPORT_ID);
  const [language, setLanguageState] =
    useState<LanguageCode>(readInitialLanguage);
  const [activeSource, setActiveSource] = useState<SourceReference | null>(null);

  const [topics, setTopics] = useState<Topic[]>(TOPICS);
  const [homepageStats, setHomepageStats] = useState<HomepageStatItem[]>(
    DEFAULT_HOMEPAGE_STATS
  );
  const [quizzes, setQuizzes] = useState<QuizQuestionData[]>(QUIZ_QUESTIONS);
  const [contentUpdatedAt, setContentUpdatedAt] = useState<string | null>(null);

  const setLanguage = useCallback((lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch {
      // Ignore storage errors in restricted browsing contexts
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  useEffect(() => {
    let active = true;
    supabase
      .from('site_content')
      .select('data, updated_at')
      .eq('id', CMS_ROW_ID)
      .maybeSingle()
      .then(({data: row, error}) => {
        if (!active || error || !row?.data) return;
        const payload = row.data as {
          topics?: Topic[] | null;
          homepageStats?: HomepageStatItem[] | null;
          quizzes?: QuizQuestionData[] | null;
        };
        if (Array.isArray(payload.topics)) {
          setTopics(payload.topics);
        }
        if (Array.isArray(payload.homepageStats)) {
          setHomepageStats(payload.homepageStats);
        }
        if (Array.isArray(payload.quizzes)) {
          setQuizzes(payload.quizzes);
        }
        if (typeof row.updated_at === 'string') {
          setContentUpdatedAt(row.updated_at);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const saveCmsContent = useCallback(
    async (nextContent: CmsContentState): Promise<CmsContentState> => {
      const now = new Date().toISOString();
      const {error} = await supabase.from('site_content').upsert({
        id: CMS_ROW_ID,
        data: {
          topics: nextContent.topics,
          homepageStats: nextContent.homepageStats,
          quizzes: nextContent.quizzes,
        },
        updated_at: now,
      });

      if (error) {
        throw new Error(error.message || 'Could not save changes to Supabase.');
      }

      const saved: CmsContentState = {
        ...nextContent,
        updatedAt: now,
      };
      setTopics(saved.topics);
      setHomepageStats(saved.homepageStats);
      setQuizzes(saved.quizzes);
      setContentUpdatedAt(now);
      return saved;
    },
    []
  );

  const resetCmsContent = useCallback(async () => {
    const {error} = await supabase
      .from('site_content')
      .delete()
      .eq('id', CMS_ROW_ID);

    if (error) {
      throw new Error(error.message || 'Could not reset content.');
    }

    setTopics(TOPICS);
    setHomepageStats(DEFAULT_HOMEPAGE_STATS);
    setQuizzes(QUIZ_QUESTIONS);
    setContentUpdatedAt(null);
  }, []);

  const selectedReport = useMemo(() => {
    return REPORTS.find((r) => r.id === selectedReportId) ?? REPORTS[0];
  }, [selectedReportId]);

  const t = useCallback(
    (text: LocalizedText) => resolveLocalizedText(text, language).value,
    [language]
  );

  const bi = useCallback(
    (en: string, ny: string) => (language === 'ny' ? ny : en),
    [language]
  );

  const ui = useCallback(
    (key: keyof typeof UI_STRINGS) => {
      const entry = UI_STRINGS[key];
      if (!entry) return String(key);
      return resolveLocalizedText(entry, language).value;
    },
    [language]
  );

  const openSourceModal = useCallback((source: SourceReference) => {
    setActiveSource(source);
  }, []);

  const closeSourceModal = useCallback(() => {
    setActiveSource(null);
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      reports: REPORTS,
      selectedReportId,
      selectedReport,
      setSelectedReportId,
      language,
      setLanguage,
      t,
      bi,
      ui,
      activeSource,
      openSourceModal,
      closeSourceModal,
      topics,
      homepageStats,
      quizzes,
      contentUpdatedAt,
      saveCmsContent,
      resetCmsContent,
    }),
    [
      selectedReportId,
      selectedReport,
      language,
      setLanguage,
      t,
      bi,
      ui,
      activeSource,
      openSourceModal,
      closeSourceModal,
      topics,
      homepageStats,
      quizzes,
      contentUpdatedAt,
      saveCmsContent,
      resetCmsContent,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used inside AppProvider');
  }
  return ctx;
}