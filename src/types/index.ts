export type LanguageCode = 'en' | 'ny';

export type TranslationReviewStatus =
  | 'verified'
  | 'pending_expert_review'
  | 'not_yet_translated';

export interface LocalizedText {
  en: string;
  ny?: string;
  nyReviewStatus?: TranslationReviewStatus;
}

export type VerificationStatus = 'verified' | 'sample_pending_verification';

export type SourceType = 'direct_report' | 'platform_interpretation';

export interface SourceReference {
  reportId: string;
  reportTitle: string;
  publisher: string;
  publicationYear: number;
  pageReference: string;
  originalWording: string;
  sourceUrl?: string;
  sourceType: SourceType;
  verificationStatus: VerificationStatus;
}

export interface EconomicReport {
  id: string;
  slug: string;
  title: LocalizedText;
  shortTitle: string;
  publisher: string;
  country: string;
  year: number;
  editionLabel: string;
  summary: LocalizedText;
  verificationStatus: VerificationStatus;
  sourceUrl?: string;
}

export type TopicIconName =
  | 'TrendingUp'
  | 'ShoppingBasket'
  | 'Landmark'
  | 'Ship'
  | 'Briefcase'
  | 'Sprout'
  | 'ArrowLeftRight'
  | 'Wallet'
  | 'Coins'
  | 'BarChart3'
  | 'ShieldCheck'
  | 'Scale'
  | 'Factory';

export interface Topic {
  id: string;
  reportId: string;
  slug: string;
  title: LocalizedText;
  shortTitle: LocalizedText;
  iconName: TopicIconName;
  accentColor: string;
  description: LocalizedText;
  whyItMatters: LocalizedText;
  category: string;
  order: number;
}

export type VariableDirection = 'up' | 'down' | 'neutral';

export interface TopicCardItem {
  id: string;
  topicId: string;
  reportId: string;
  stepNumber: number;
  heading: LocalizedText;
  oneLineSummary: LocalizedText;
  direction: VariableDirection;
  directionLabel: LocalizedText;
  plainExplanation: LocalizedText;
  whyItHappens: LocalizedText;
  everydayImpact: LocalizedText;
  relatedFactors: LocalizedText[];
  iconName: TopicIconName;
  source: SourceReference;
}

export interface ChainStep {
  id: string;
  cardId?: string;
  label: LocalizedText;
  detail: LocalizedText;
  direction: VariableDirection;
}

export interface ChainSequence {
  id: string;
  topicId: string;
  reportId: string;
  title: LocalizedText;
  description: LocalizedText;
  steps: ChainStep[];
  source: SourceReference;
}

export interface FeedbackLoopNode {
  id: string;
  label: LocalizedText;
  detail: LocalizedText;
  impactTag: LocalizedText;
}

export interface FeedbackLoopData {
  id: string;
  reportId: string;
  topicSlug: string;
  type: 'trap' | 'brake';
  title: LocalizedText;
  subtitle: LocalizedText;
  summary: LocalizedText;
  nodes: FeedbackLoopNode[];
  source: SourceReference;
}

export interface IndicatorChartPoint {
  label: string;
  value: number;
}

export interface EconomicIndicator {
  id: string;
  reportId: string;
  topicSlug: string;
  category: string;
  name: LocalizedText;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  whatItMeasures: LocalizedText;
  reportingPeriod: string;
  trend: VariableDirection;
  comparisonText: LocalizedText;
  simpleExplanation: LocalizedText;
  iconName: TopicIconName;
  chartType?: 'bar' | 'line';
  chartData?: IndicatorChartPoint[];
  chartUnit?: string;
  chartNote?: LocalizedText;
  source: SourceReference;
}

export type RecommendationTimeframe = 'SHORT TERM' | 'MEDIUM TERM';

export interface PolicyRecommendation {
  id: string;
  reportId: string;
  category: string;
  heading: LocalizedText;
  simpleExplanation: LocalizedText;
  originalRecommendation: string;
  timeframe: RecommendationTimeframe;
  implementationNote: LocalizedText;
  source: SourceReference;
}

export interface QuizOption {
  id: string;
  text: LocalizedText;
}

export interface QuizQuestionData {
  id: string;
  reportId: string;
  topicSlug: string;
  question: LocalizedText;
  options: QuizOption[];
  correctOptionId: string;
  explanation: LocalizedText;
  source: SourceReference;
}

export interface SearchResultItem {
  id: string;
  type: 'topic' | 'card' | 'indicator' | 'recommendation';
  title: string;
  explanation: string;
  category: string;
  reportId: string;
  reportTitle: string;
  reportYear: number;
  href: string;
}

export interface HomepageStatItem {
  id: string;
  numberLabel: string;
  stat: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  detail: LocalizedText;
  iconName: TopicIconName;
  to: string;
  linkLabel: LocalizedText;
}

export interface CmsContentState {
  topics: Topic[];
  homepageStats: HomepageStatItem[];
  quizzes: QuizQuestionData[];
  updatedAt?: string;
}

