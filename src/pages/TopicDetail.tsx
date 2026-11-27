import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Info,
  Layers,
  Sparkles,
} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';
import {useEffect, useState} from 'react';
import {Link, useParams, useSearchParams} from 'react-router-dom';
import {AnimatedNumber} from '../components/AnimatedNumber';
import {TopicChartCard} from '../components/TopicChartCard';
import {
  TopicFlipChain,
  type FlipChainStep,
} from '../components/TopicFlipChain';
import {
  QuadrantPosterInfographic,
  type QuadrantPosterItem,
} from '../components/infographics/QuadrantPosterInfographic';
import {
  RadialFanInfographic,
  type RadialFanItem,
} from '../components/infographics/RadialFanInfographic';
import {useApp} from '../context/AppContext';
import {INDICATORS} from '../data/indicators';
import {CHAIN_SEQUENCES, TOPIC_CARDS} from '../data/topicCards';
import {
  TOPIC_BRIEF_DEFINITIONS,
  TOPIC_CAUSE_CHAINS,
} from '../data/topicDefinitions';
import {getTopicPhoto, PHOTO_ASSETS} from '../data/photoAssets';
import {
  getTopicVisualConfig,
  hasBuiltInTopicVisual,
} from '../data/topicVisuals';
import {TOPICS as DEFAULT_TOPICS} from '../data/topics';
import {formatIndicatorNumber, getTopicIcon} from '../utils/formatting';

const CATEGORY_NY: Record<string, string> = {
  'Economic growth': 'Kukula kwa Chuma',
  Inflation: 'Kukwera kwa Mitengo',
  'Public debt': 'Ngongole za Boma',
  Trade: 'Malonda & Katundu',
  Employment: 'Ntchito & Ganyu',
  Agriculture: 'Ulimi',
  'Exchange rates': 'Kusinthana kwa Ndalama',
  'Government spending': 'Ndalama za Boma',
};

function formatCompactPageRef(pageReference: string, language: 'en' | 'ny'): string {
  const match = pageReference.match(/\d+(?:–\d+)?/);
  if (!match) return language === 'ny' ? 'Lipoti' : 'Report';
  return language === 'ny' ? `ts. ${match[0]}` : `p. ${match[0]}`;
}

export function TopicDetail() {
  const {topicSlug} = useParams<{topicSlug: string}>();
  const [searchParams] = useSearchParams();
  const {
    selectedReport,
    selectedReportId,
    setSelectedReportId,
    reports,
    topics,
    t,
    bi,
    language,
    openSourceModal,
  } = useApp();

  const [showClassicView, setShowClassicView] = useState(false);

  const queryReportId = searchParams.get('report');
  useEffect(() => {
    if (
      queryReportId &&
      queryReportId !== selectedReportId &&
      reports.some((r) => r.id === queryReportId)
    ) {
      setSelectedReportId(queryReportId);
    }
  }, [queryReportId, selectedReportId, setSelectedReportId, reports]);

  useEffect(() => {
    setShowClassicView(false);
  }, [topicSlug, selectedReportId]);

  const reportTopics = topics
    .filter((item) => item.reportId === selectedReportId)
    .sort((a, b) => a.order - b.order);

  const topicIndex = reportTopics.findIndex((item) => item.slug === topicSlug);
  const topic = topicIndex >= 0 ? reportTopics[topicIndex] : undefined;

  if (!topic) {
    return (
      <div className="bg-[#052C5A] min-h-[70vh] py-16 px-4">
        <div className="relative overflow-hidden max-w-2xl mx-auto bg-[#031F42] rounded-2xl p-8 text-center space-y-4 shadow-xl">
          <img
            src={PHOTO_ASSETS.harvestHills}
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-30"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[#031F42]/80"
          />
          <h1 className="relative z-10 font-display font-bold text-2xl text-white">
            {bi(
              `Topic not found in ${selectedReport.shortTitle} (${selectedReport.year})`,
              `Mutu sunapezeke mu ${selectedReport.shortTitle} (${selectedReport.year})`
            )}
          </h1>
          <p className="relative z-10 text-sm text-[#DCEBFC]">
            {bi(
              'Choose from available topics for this report edition.',
              'Sankhani kuchokera pa mitu yomwe ilipo ya lipotili.'
            )}
          </p>
          <div className="relative z-10 pt-2">
            <Link
              to="/learn"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#00AEEF] text-[#052C5A] text-sm font-bold"
            >
              <ArrowLeft aria-hidden="true" className="w-4 h-4" />
              <span>{bi('All topics', 'Mitu yonse')}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const Icon = getTopicIcon(topic.iconName);

  const cards = TOPIC_CARDS.filter(
    (c) => c.topicId === topic.id && c.reportId === selectedReportId
  ).sort((a, b) => a.stepNumber - b.stepNumber);

  const relatedIndicators = INDICATORS.filter(
    (ind) => ind.topicSlug === topic.slug && ind.reportId === selectedReportId
  );

  const hasVisual = hasBuiltInTopicVisual(topic.slug);
  const visualConfig = getTopicVisualConfig(topic.slug, selectedReportId);

  const defaultTopicMatch = DEFAULT_TOPICS.find((item) => item.id === topic.id);
  const isUneditedDefault =
    defaultTopicMatch && defaultTopicMatch.description.en === topic.description.en;

  const briefDef =
    isUneditedDefault && TOPIC_BRIEF_DEFINITIONS[topic.slug]
      ? t(TOPIC_BRIEF_DEFINITIONS[topic.slug])
      : t(topic.description);

  // Build up to 4 summary quadrant items for the classic 2x2 view
  const firstCard = cards[0];
  const quadrantSummaryItems: QuadrantPosterItem[] = [];

  const causePhotoBySlug: Record<string, string> = {
    'economic-growth': PHOTO_ASSETS.solarGrid,
    inflation: PHOTO_ASSETS.freightHighway,
    'public-debt': PHOTO_ASSETS.publicDebtParliament,
    'trade-and-imports': PHOTO_ASSETS.forexBureau,
    employment: PHOTO_ASSETS.tailorShop,
    agriculture: PHOTO_ASSETS.maizePlowing,
    'exchange-rates': PHOTO_ASSETS.portCargoShip,
    'government-spending': PHOTO_ASSETS.tailorShop,
  };
  const topicCausePhoto = causePhotoBySlug[topic.slug] ?? PHOTO_ASSETS.marketBaskets;
  const topicImpactPhoto =
    topic.slug === 'inflation'
      ? PHOTO_ASSETS.marketPriceSigns
      : topic.slug === 'economic-growth' || topic.slug === 'employment'
        ? PHOTO_ASSETS.inequalityContrast
        : PHOTO_ASSETS.marketBaskets;

  if (firstCard) {
    quadrantSummaryItems.push({
      id: `${topic.id}-q1`,
      numberLabel: '01',
      title: bi('What Is Happening', 'Zomwe Zikuchitika'),
      stat: firstCard.directionLabel ? t(firstCard.directionLabel) : undefined,
      summary: t(firstCard.oneLineSummary),
      detail: t(firstCard.plainExplanation),
      icon: Icon,
      image: visualConfig.image,
      source: firstCard.source,
    });

    quadrantSummaryItems.push({
      id: `${topic.id}-q2`,
      numberLabel: '02',
      title: bi('Why It Happens', 'Chifukwa Chake'),
      summary: t(firstCard.whyItHappens),
      detail: cards[1] ? t(cards[1].oneLineSummary) : t(firstCard.whyItHappens),
      icon: Sparkles,
      image: topicCausePhoto,
      source: cards[1]?.source ?? firstCard.source,
    });

    quadrantSummaryItems.push({
      id: `${topic.id}-q3`,
      numberLabel: '03',
      title: bi('Everyday Impact', 'Zotsatira pa Moyo'),
      summary: t(firstCard.everydayImpact),
      detail: t(topic.whyItMatters),
      icon: CheckCircle2,
      image: topicImpactPhoto,
      source: firstCard.source,
    });

    const headlineInd = relatedIndicators[0];
    if (headlineInd) {
      quadrantSummaryItems.push({
        id: `${topic.id}-q4`,
        numberLabel: '04',
        title: bi('Key Number', 'Nambala Yofunikira'),
        stat: formatIndicatorNumber(
          headlineInd.value,
          headlineInd.decimals ?? 1,
          headlineInd.prefix ?? '',
          headlineInd.suffix ?? ''
        ),
        summary: t(headlineInd.simpleExplanation),
        detail: `${t(headlineInd.name)} (${headlineInd.reportingPeriod}): ${t(headlineInd.comparisonText)}`,
        icon: getTopicIcon(headlineInd.iconName),
        image: getTopicPhoto(topic.slug),
        to: '/numbers',
        linkLabel: bi('See all key numbers', 'Onani manambala onse'),
        source: headlineInd.source,
      });
    } else if (cards[1]) {
      quadrantSummaryItems.push({
        id: `${topic.id}-q4`,
        numberLabel: '04',
        title: bi('Also Note', 'Onaninso Izi'),
        summary: t(cards[1].oneLineSummary),
        detail: t(cards[1].plainExplanation),
        icon: getTopicIcon(cards[1].iconName),
        image: topicCausePhoto,
        source: cards[1].source,
      });
    }
  }

  // Build Curved Fan "What Doing One Thing Leads To" items for classic view
  const topicCauseDef = TOPIC_CAUSE_CHAINS[topic.slug];
  const fallbackChain = CHAIN_SEQUENCES.find(
    (ch) => ch.topicId === topic.id && ch.reportId === selectedReportId
  );

  let fanTitleLeading = bi('WHAT THIS', 'ZOTSATIRA');
  let fanTitleHighlight = bi('LEADS TO', 'ZAKE');
  let fanSubtitle = bi(
    'Click any step along the curve to see how one change causes the next.',
    'Dinani pa gawo lililonse kuti muone momwe kusintha kumodzi kumabweretsera kunzake.'
  );
  let causeFanItems: RadialFanItem[] = [];

  const stepPhotoCycle = [
    visualConfig.image,
    topicCausePhoto,
    topicImpactPhoto,
    PHOTO_ASSETS.farmersVegetables,
  ];

  if (topicCauseDef) {
    fanTitleLeading =
      language === 'ny'
        ? topicCauseDef.titleLeadingNy
        : topicCauseDef.titleLeading;
    fanTitleHighlight =
      language === 'ny'
        ? topicCauseDef.titleHighlightNy
        : topicCauseDef.titleHighlight;
    fanSubtitle =
      language === 'ny' ? topicCauseDef.subtitleNy : topicCauseDef.subtitle;
    causeFanItems = topicCauseDef.steps.map((s, idx) => ({
      id: s.id,
      highlight: language === 'ny' ? s.leadWordNy : s.leadWord,
      label: language === 'ny' ? s.triggerNy : s.trigger,
      example: language === 'ny' ? s.leadsToNy : s.leadsTo,
      image: stepPhotoCycle[idx % stepPhotoCycle.length],
    }));
  } else if (fallbackChain) {
    causeFanItems = fallbackChain.steps.map((step, idx) => {
      const words = t(step.label).split(' ');
      return {
        id: step.id,
        highlight: words.slice(0, 2).join(' ').toUpperCase(),
        label: words.slice(2).join(' ') || words[0] || '',
        example: t(step.detail),
        image: stepPhotoCycle[idx % stepPhotoCycle.length],
        source: fallbackChain.source,
      };
    });
  }

  // Build interactive Flip-Chain steps (matching screenshot workflow for every topic)
  const compactPage = formatCompactPageRef(
    (fallbackChain?.source ?? visualConfig.source).pageReference,
    language
  );

  let chainTitle = t(topic.shortTitle);
  let chainSubtitle = bi(
    'Tap any card to flip for a plain explanation',
    'Dinani khadi iliyonse kuti muone kufotokoza kosavuta'
  );
  let flipChainSteps: FlipChainStep[] = [];

  if (fallbackChain) {
    chainTitle = t(fallbackChain.title);
    flipChainSteps = fallbackChain.steps.map((step, i) => ({
      id: step.id,
      direction: step.direction ?? 'neutral',
      headline: t(step.label),
      plainExplanation: t(step.detail),
      everydayNote:
        i === fallbackChain.steps.length - 1
          ? t(topic.whyItMatters)
          : undefined,
      pageShort: compactPage,
      source: fallbackChain.source,
    }));
  } else if (topicCauseDef) {
    chainTitle = `${
      language === 'ny'
        ? topicCauseDef.titleLeadingNy
        : topicCauseDef.titleLeading
    } ${
      language === 'ny'
        ? topicCauseDef.titleHighlightNy
        : topicCauseDef.titleHighlight
    }`;
    flipChainSteps = topicCauseDef.steps.map((step, idx) => {
      const lead = language === 'ny' ? step.leadWordNy : step.leadWord;
      const trig = language === 'ny' ? step.triggerNy : step.trigger;
      const leadsTo = language === 'ny' ? step.leadsToNy : step.leadsTo;
      const lowerTrigger = `${lead} ${trig}`.toLowerCase();
      const inferredDirection: 'up' | 'down' | 'neutral' =
        lowerTrigger.includes('slow') ||
        lowerTrigger.includes('drop') ||
        lowerTrigger.includes('cut') ||
        lowerTrigger.includes('less') ||
        lowerTrigger.includes('under') ||
        lowerTrigger.includes('scarce') ||
        lowerTrigger.includes('delay') ||
        lowerTrigger.includes('achepa') ||
        lowerTrigger.includes('tsika')
          ? 'down'
          : lowerTrigger.includes('rise') ||
              lowerTrigger.includes('grow') ||
              lowerTrigger.includes('hike') ||
              lowerTrigger.includes('more') ||
              lowerTrigger.includes('15%') ||
              lowerTrigger.includes('90%') ||
              lowerTrigger.includes('kwera')
            ? 'up'
            : 'neutral';

      return {
        id: step.id,
        direction: inferredDirection,
        headline: `${lead}: ${trig}`,
        plainExplanation: leadsTo,
        everydayNote:
          idx === topicCauseDef.steps.length - 1
            ? t(topic.whyItMatters)
            : firstCard
              ? t(firstCard.everydayImpact)
              : undefined,
        pageShort: compactPage,
        source: firstCard?.source ?? visualConfig.source,
      };
    });
  }

  const prevTopic = topicIndex > 0 ? reportTopics[topicIndex - 1] : null;
  const nextTopic =
    topicIndex < reportTopics.length - 1 ? reportTopics[topicIndex + 1] : null;

  const localizedCategory =
    language === 'ny'
      ? (CATEGORY_NY[topic.category] ?? topic.category)
      : topic.category;

  const topicNum = String(topicIndex + 1).padStart(2, '0');
  const topicTotal = String(reportTopics.length).padStart(2, '0');

  return (
    <div className="bg-[#052C5A] text-white min-h-screen">
      {/* Main Topic Header + Photo-Backed Graph Stage */}
      <section className="pt-8 pb-6 sm:pt-10 sm:pb-8">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              to="/learn"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#85C7F2] hover:text-white transition-colors"
            >
              <ArrowLeft aria-hidden="true" className="w-4 h-4" />
              <span>{bi('Back to all topics', 'Bwererani ku mitu yonse')}</span>
            </Link>

            <span className="font-display-num text-xs font-semibold text-[#9AC2EA]">
              {selectedReport.shortTitle} ({selectedReport.year})
            </span>
          </div>

          {/* Concise Headline + Giant Stat (Screenshot Style) */}
          <div className="space-y-3">
            <div className="font-display-num text-xs sm:text-sm font-semibold text-[#9AC2EA]">
              {topicNum} / {topicTotal} · {localizedCategory}
            </div>

            <h1
              className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-[1.08]"
              style={{textWrap: 'balance'}}
            >
              {t(topic.shortTitle)}
            </h1>

            <p className="text-sm sm:text-base text-[#DCEBFC] leading-relaxed max-w-2xl">
              {briefDef}
            </p>

            {hasVisual && (
              <div className="pt-2 space-y-0.5">
                <div
                  className="font-display-num font-extrabold text-4xl sm:text-5xl tracking-tight"
                  style={{color: visualConfig.accentColor}}
                >
                  {visualConfig.heroStat}
                </div>
                <div className="text-xs sm:text-sm font-medium text-[#B8D9F8]">
                  {bi(
                    visualConfig.heroStatCaption,
                    visualConfig.heroStatCaptionNy
                  )}
                </div>
              </div>
            )}
          </div>

          {hasVisual ? (
            <>
              {/* Interactive Photo-Backed Chart Card */}
              <TopicChartCard
                config={visualConfig}
                topicId={topic.id}
                onInspectSource={openSourceModal}
              />

              {/* Tap Control Directly Below the Graph for Classic 2x2 & Curved Fan View (with Background Picture) */}
              <div className="flex justify-center pt-1">
                <button
                  type="button"
                  onClick={() => setShowClassicView((prev) => !prev)}
                  aria-expanded={showClassicView}
                  className="relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-between sm:justify-center gap-3 px-6 py-3.5 rounded-2xl bg-[#031F42] hover:bg-[#0A3A72] text-white shadow-lg transition-colors cursor-pointer"
                >
                  <img
                    src={visualConfig.image}
                    alt=""
                    aria-hidden="true"
                    referrerPolicy="no-referrer"
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-25"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[#031F42]/80"
                  />
                  <span className="relative z-10 inline-flex items-center gap-2.5 text-left">
                    <span className="w-8 h-8 rounded-xl bg-[#00AEEF]/20 text-[#00AEEF] flex items-center justify-center shrink-0">
                      <Layers aria-hidden="true" className="w-4 h-4" />
                    </span>
                    <span>
                      <span className="block font-display font-bold text-xs sm:text-sm text-white">
                        {showClassicView
                          ? bi(
                              'Hide 2×2 summary & curved steps',
                              'Bisani chidule cha 2×2'
                            )
                          : bi(
                              'See 2×2 summary & curved steps',
                              'Onani chidule cha 2×2'
                            )}
                      </span>
                      <span className="block text-[11px] text-[#9AC2EA]">
                        {showClassicView
                          ? bi(
                              'Back to chart view',
                              'Bwererani ku grafu'
                            )
                          : bi(
                              'Quick breakdown over this photo',
                              'Mfundo zazidule pa chithunzichi'
                            )}
                      </span>
                    </span>
                  </span>
                  {showClassicView ? (
                    <ChevronUp
                      aria-hidden="true"
                      className="relative z-10 w-4 h-4 text-[#00AEEF] shrink-0"
                    />
                  ) : (
                    <ChevronDown
                      aria-hidden="true"
                      className="relative z-10 w-4 h-4 text-[#00AEEF] shrink-0"
                    />
                  )}
                </button>
              </div>
            </>
          ) : (
            <div className="relative overflow-hidden rounded-3xl bg-[#031F42] p-6 sm:p-8 shadow-xl space-y-4">
              <img
                src={getTopicPhoto(topic.slug)}
                alt=""
                aria-hidden="true"
                referrerPolicy="no-referrer"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-30"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#031F42]/92 via-[#052C5A]/82 to-[#031F42]/95"
              />
              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00AEEF]/20 text-[#00AEEF] text-xs font-bold">
                  <Icon aria-hidden="true" className="w-4 h-4" />
                  <span>{t(topic.title)}</span>
                </div>
                <p className="text-base sm:text-lg text-white font-medium leading-relaxed">
                  {t(topic.whyItMatters)}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Expandable Classic Topic View (2x2 Flip Cards & Curved Fan) WITH Relatable Background Photograph */}
      <AnimatePresence initial={false}>
        {showClassicView && (
          <motion.section
            initial={{opacity: 0, height: 0}}
            animate={{opacity: 1, height: 'auto'}}
            exit={{opacity: 0, height: 0}}
            transition={{duration: 0.32, ease: [0.16, 1, 0.3, 1]}}
            className="overflow-hidden"
          >
            <div className="max-w-[1440px] mx-auto px-5 sm:px-8 pb-10 space-y-8">
              {/* Why It Matters Callout with Background Photo */}
              <aside className="relative overflow-hidden rounded-3xl bg-[#031F42] p-6 sm:p-8 shadow-xl max-w-4xl mx-auto">
                <img
                  src={visualConfig.image}
                  alt=""
                  aria-hidden="true"
                  referrerPolicy="no-referrer"
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-35"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#031F42]/92 via-[#052C5A]/80 to-[#031F42]/92"
                />
                <div className="relative z-10 space-y-1.5">
                  <div className="text-xs font-extrabold tracking-wide text-[#00AEEF]">
                    {bi(
                      'WHY IT MATTERS TO YOU',
                      'CHIFUKWA CHOMWE ZIKUKHUDZA INU'
                    )}
                  </div>
                  <p className="text-sm sm:text-base text-white font-medium leading-relaxed">
                    {t(topic.whyItMatters)}
                  </p>
                </div>
              </aside>

              {quadrantSummaryItems.length > 0 && (
                <QuadrantPosterInfographic
                  eyebrow={bi('Short Summary', 'Chidule Chachidule')}
                  title={t(topic.shortTitle)}
                  subtitle={bi(
                    'Tap any card to flip for a closer note or exact report page',
                    'Dinani khadi iliyonse kuti muone zambiri kapena tsamba la lipoti'
                  )}
                  items={quadrantSummaryItems}
                  onInspectSource={openSourceModal}
                />
              )}

              {causeFanItems.length > 0 && (
                <RadialFanInfographic
                  titleLeading={fanTitleLeading}
                  titleHighlight={fanTitleHighlight}
                  subtitle={fanSubtitle}
                  items={causeFanItems}
                  onInspectSource={openSourceModal}
                />
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Interactive Step-by-Step Flippable Cause Chain */}
      {flipChainSteps.length > 0 && (
        <section className="py-6 sm:py-8">
          <div className="max-w-4xl mx-auto px-5 sm:px-8">
            <TopicFlipChain
              title={chainTitle}
              subtitle={chainSubtitle}
              steps={flipChainSteps}
              defaultSource={fallbackChain?.source ?? visualConfig.source}
              backgroundImage={visualConfig.image}
              onInspectSource={openSourceModal}
            />
          </div>
        </section>
      )}

      {/* Simple Related Key Figures */}
      {relatedIndicators.length > 0 && (
        <section className="bg-[#031F42] py-10 mt-4">
          <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-5">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-white">
                {bi('Key Figures at a Glance', 'Manambala Ofunikira Mwachidule')}
              </h2>
              <Link
                to="/numbers"
                className="text-xs sm:text-sm font-bold text-[#00AEEF] hover:underline"
              >
                {bi('See all numbers →', 'Onani manambala onse →')}
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedIndicators.map((ind, idx) => (
                <div
                  key={ind.id}
                  className="relative overflow-hidden bg-[#052C5A] text-white rounded-2xl p-5 flex items-start justify-between gap-4 shadow-lg"
                >
                  <img
                    src={stepPhotoCycle[idx % stepPhotoCycle.length]}
                    alt=""
                    aria-hidden="true"
                    referrerPolicy="no-referrer"
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-40"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#031F42]/90 via-[#031F42]/68 to-[#052C5A]/92"
                  />
                  <div className="relative z-10 space-y-1">
                    <div className="font-display-num font-extrabold text-2xl sm:text-3xl text-[#00AEEF]">
                      <AnimatedNumber
                        value={ind.value}
                        decimals={ind.decimals ?? 1}
                        prefix={ind.prefix ?? ''}
                        suffix={ind.suffix ?? ''}
                        startOnMount
                      />
                    </div>
                    <div className="font-display font-bold text-sm text-white">
                      {t(ind.name)}
                    </div>
                    <p className="text-xs text-[#DCEBFC] leading-relaxed">
                      {t(ind.simpleExplanation)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => openSourceModal(ind.source)}
                    aria-label={bi(
                      `View source for ${t(ind.name)}`,
                      `Onani gwero la ${t(ind.name)}`
                    )}
                    className="relative z-10 w-8 h-8 rounded-full bg-white/15 text-white hover:bg-[#00AEEF] hover:text-[#052C5A] flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                  >
                    <Info aria-hidden="true" className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Prev / Next Topic */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {prevTopic ? (
            <Link
              to={`/learn/${prevTopic.slug}`}
              className="group relative overflow-hidden inline-flex items-center gap-3 p-4 rounded-2xl bg-[#031F42] hover:bg-[#0A3A72] transition-colors shadow-md"
            >
              <img
                src={getTopicPhoto(prevTopic.slug)}
                alt=""
                aria-hidden="true"
                referrerPolicy="no-referrer"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-35 transition-transform duration-500 group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#031F42]/92 via-[#031F42]/76 to-[#031F42]/90"
              />
              <ArrowLeft
                aria-hidden="true"
                className="relative z-10 w-4 h-4 text-[#00AEEF]"
              />
              <div className="relative z-10">
                <div className="text-xs text-[#85C7F2]">
                  {bi('Previous topic', 'Mutu wapita')}
                </div>
                <div className="font-display font-bold text-sm text-white">
                  {t(prevTopic.shortTitle)}
                </div>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextTopic && (
            <Link
              to={`/learn/${nextTopic.slug}`}
              className="group relative overflow-hidden inline-flex items-center justify-end gap-3 p-4 rounded-2xl bg-[#031F42] hover:bg-[#0A3A72] transition-colors text-right shadow-md"
            >
              <img
                src={getTopicPhoto(nextTopic.slug)}
                alt=""
                aria-hidden="true"
                referrerPolicy="no-referrer"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-35 transition-transform duration-500 group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-l from-[#031F42]/92 via-[#031F42]/76 to-[#031F42]/90"
              />
              <div className="relative z-10">
                <div className="text-xs text-[#85C7F2]">
                  {bi('Next topic', 'Mutu wotsatira')}
                </div>
                <div className="font-display font-bold text-sm text-white">
                  {t(nextTopic.shortTitle)}
                </div>
              </div>
              <ArrowRight
                aria-hidden="true"
                className="relative z-10 w-4 h-4 text-[#00AEEF]"
              />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
