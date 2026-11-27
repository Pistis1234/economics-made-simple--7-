import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Compass,
} from 'lucide-react';
import {AnimatePresence, motion, useScroll, useTransform} from 'motion/react';
import {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {MadeSimpleWordmark} from '../components/MadeSimpleWordmark';
import {
  QuadrantPosterInfographic,
  type QuadrantPosterItem,
} from '../components/infographics/QuadrantPosterInfographic';
import {RadialFanInfographic} from '../components/infographics/RadialFanInfographic';
import {useApp} from '../context/AppContext';
import {getTopicIcon} from '../utils/formatting';
import type {SourceReference} from '../types';
import {
  SECTION_1_SOURCES,
  SECTION_2_DATA,
  SECTION_3_CONSTRAINTS,
  SECTION_4_GANYU_SOURCE,
} from '../data/malawiGrowth2026';

const STAT_SOURCE_MAP: Record<string, SourceReference> = {
  'sig-growth': SECTION_1_SOURCES.cakeAnalogy,
  'sig-engines': SECTION_2_DATA.servicesSource,
  'sig-firms': SECTION_2_DATA.industryConstraintSource,
  'sig-youth': SECTION_4_GANYU_SOURCE,
};

const HERO_BG_IMAGES = [
  '/src/assets/images/malawi_market_hero_1795614449547.jpg',
  '/src/assets/images/hero_malawi_economy_1795350158759.jpg',
];

export function Home() {
  const {bi, t, homepageStats, openSourceModal} = useApp();
  const [heroBgIdx, setHeroBgIdx] = useState(0);
  const [slideIdx, setSlideIdx] = useState(0);
  const [visualMode, setVisualMode] = useState<'quadrant' | 'fan'>('quadrant');

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroBgIdx((prev) => (prev + 1) % HERO_BG_IMAGES.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, []);

  const heroContainerRef = useRef<HTMLDivElement | null>(null);
  const {scrollYProgress} = useScroll({
    target: heroContainerRef,
    offset: ['start start', 'end start'],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.25]);

  const heroSlides = [
    {
      id: 'slide-growth',
      image: '/src/assets/images/hero_malawi_economy_1795350158759.jpg',
      alt: bi(
        'Lilongwe city skyline and Lake Malawi horizon',
        'Mzinda wa Lilongwe ndi Nyanja ya Malawi'
      ),
      title: bi(
        'Growth That Barely Outpaces People',
        'Chuma Chikungoposa Anthu Pang’ono'
      ),
      summary: bi(
        '2.7% projected growth in 2026 sits just 0.1% above 2.6% population growth.',
        'Kukula kwa 2.7% mu 2026 kukuposa kuchuluka kwa anthu (2.6%) ndi 0.1% yokha.'
      ),
      primaryLabel: bi('Explore Story', 'Werengani Nkhaniyi'),
      primaryTo: '/learn/malawi-economic-growth-2026',
      secondaryLabel: bi('Choose a Topic', 'Sankhani Mutu'),
      secondaryTo: '/learn',
    },
    {
      id: 'slide-engines',
      image: '/src/assets/images/agriculture_maize_farmer_1795350159460.jpg',
      alt: bi(
        'Malawian farmer inspecting healthy maize after drought recovery',
        'Mlimi wa ku Malawi akuona chimanga chabwino'
      ),
      title: bi(
        'Farming & Services Lead Recovery',
        'Ulimi & Mabanki Akutsogolera Kuchira'
      ),
      summary: bi(
        'Banking and better harvests lift GDP while factories wait for US dollars.',
        'Mabanki ndi chimanga zikukweza chuma pamene mafakitale akudikira madola.'
      ),
      primaryLabel: bi('See Short Summaries', 'Onani Chidule'),
      primaryTo: '/learn',
      secondaryLabel: bi('See Key Numbers', 'Onani Manambala'),
      secondaryTo: '/numbers',
    },
    {
      id: 'slide-everyday',
      image: '/src/assets/images/services_mobile_banking_1795350157982.jpg',
      alt: bi(
        'Small business owner using mobile payments in Malawi',
        'Wamalonda akugwiritsa ntchito ndalama pa foni m’Malawi'
      ),
      title: bi(
        'How One Thing Leads to Another',
        'Momwe Chinthu Chimodzi Chimayambitsira Chinanso'
      ),
      summary: bi(
        'Trace how dollar shortages ripple into factory output and youth jobs.',
        'Onani momwe kusowa madola kumakhudzira mafakitale ndi ntchito za achinyamata.'
      ),
      primaryLabel: bi('Start Learning', 'Yambani Kuphunzira'),
      primaryTo: '/learn',
      secondaryLabel: bi('Quick Quiz', 'Mayeso Achidule'),
      secondaryTo: '/quiz',
    },
  ];

  const simpleTakeaways = homepageStats.map((item) => ({
    id: item.id,
    icon: getTopicIcon(item.iconName),
    title: `${t(item.stat)} · ${t(item.title)}`,
    summary: t(item.summary),
    to: item.to,
  }));

  const howItWorksSteps = [
    {
      step: '01',
      title: bi('Pick a Topic', 'Sankhani Mutu'),
      body: bi(
        'Open Learn and pick any topic in one sentence.',
        'Tsegulani Phunzirani ndi kusankha mutu mwachidule.'
      ),
    },
    {
      step: '02',
      title: bi('Read 4 Takeaways', 'Werengani Mfundo 4'),
      body: bi(
        'Get the core message without reading 80 report pages.',
        'Pezani mfundo zazikulu popanda kuwerenga masamba 80.'
      ),
    },
    {
      step: '03',
      title: bi('Trace Cause & Effect', 'Onani Chobweretsa Chinanso'),
      body: bi(
        'Tap step cards to see what one shift triggers next.',
        'Dinani pa zithunzi kuti muone zotsatira zake.'
      ),
    },
    {
      step: '04',
      title: bi('Check Key Numbers', 'Onani Manambala'),
      body: bi(
        'Verify stats, check pages, or take a 2-minute quiz.',
        'Onani manambala, masamba, kapena yesani mafunso.'
      ),
    },
  ];

  const activeSlide = heroSlides[slideIdx] ?? heroSlides[0];

  const keySignals: QuadrantPosterItem[] = homepageStats.map((item) => ({
    id: item.id,
    numberLabel: item.numberLabel,
    title: t(item.title),
    stat: t(item.stat),
    summary: t(item.summary),
    detail: t(item.detail),
    icon: getTopicIcon(item.iconName),
    to: item.to,
    linkLabel: t(item.linkLabel),
    source: STAT_SOURCE_MAP[item.id],
  }));

  const hurdlesFan = SECTION_3_CONSTRAINTS.map((item) => {
    const localizedTitle = bi(item.title, item.titleNy);
    const words = localizedTitle.split(' ');
    return {
      id: item.id,
      highlight: (words[0] ?? '').toUpperCase(),
      label: words.slice(1).join(' ') || localizedTitle,
      example: bi(item.everydayExample, item.everydayExampleNy),
      to: '/learn/malawi-economic-growth-2026',
      linkLabel: bi(
        'Explore Pages 17–18 Story',
        'Werengani Nkhani ya Masamba 17–18'
      ),
      source: item.source,
    };
  });

  return (
    <div className="bg-[#052C5A] text-white overflow-x-clip">
      {/* ================================================================= */}
      {/* 1. STICKY FULL-VIEWPORT HERO + SCROLL-OVER PHOTO CURTAIN          */}
      {/* ================================================================= */}
      <div ref={heroContainerRef} className="relative">
        <div className="sticky top-16 z-0">
          <section className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-[#07090D] text-white py-10">
            {HERO_BG_IMAGES.map((src, idx) => (
              <motion.img
                key={src}
                src={src}
                alt=""
                aria-hidden="true"
                referrerPolicy="no-referrer"
                initial={false}
                animate={{
                  opacity: heroBgIdx === idx ? 1 : 0,
                  scale: heroBgIdx === idx ? 1.04 : 1,
                }}
                transition={{
                  opacity: {duration: 1.15, ease: 'easeInOut'},
                  scale: {duration: 6.5, ease: 'easeOut'},
                }}
                className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
              />
            ))}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-black/45"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/65 via-black/30 to-black/75"
            />

            <motion.div
              style={{scale: heroScale, opacity: heroOpacity}}
              className="relative z-10 mx-auto w-full max-w-[1440px] px-5 py-8 text-center sm:px-8 md:px-14"
            >
              <motion.div
                initial={{opacity: 0, y: 12}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.4}}
                className="mb-6"
              >
                <Link
                  to="/learn/malawi-economic-growth-2026"
                  className="inline-flex flex-wrap items-center justify-center gap-2 px-5 py-1.5 rounded-full bg-[#00AEEF] hover:bg-[#33C1F5] text-[#052C5A] text-xs sm:text-sm font-bold shadow-lg transition-colors"
                >
                  <Compass aria-hidden="true" className="w-4 h-4 shrink-0" />
                  <span className="inline-flex flex-wrap items-baseline justify-center gap-1.5">
                    <span>
                      {bi(
                        'Worldbank Malawi report &',
                        'Lipoti la Worldbank ku Malawi &'
                      )}
                    </span>
                    <MadeSimpleWordmark
                      madeText={bi('weekly', 'nkhani ya')}
                      simpleText={bi('spotlight', 'mlungu')}
                    />
                  </span>
                  <ArrowUpRight aria-hidden="true" className="w-4 h-4 shrink-0" />
                </Link>
              </motion.div>

              <motion.h1
                initial={{opacity: 0, y: 24}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
                className="mx-auto max-w-5xl font-display font-extrabold leading-[1.04] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.92)] text-[clamp(2.5rem,1.8rem+4.2vw,5.4rem)]"
                style={{textWrap: 'balance'}}
              >
                <span className="block">
                  {bi("Malawi's economy", 'Chuma cha Malawi')}
                </span>
                <span className="mt-1 block text-[#00AEEF]">
                  {bi('in ', '')}
                  <MadeSimpleWordmark
                    madeText={bi('plain', 'poyera')}
                    simpleText={bi('sight', 'bwino')}
                    wordClassName="text-[#00AEEF]"
                  />
                </span>
              </motion.h1>

              <motion.p
                initial={{opacity: 0, y: 16}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1]}}
                className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)] leading-relaxed font-medium"
              >
                {bi(
                  'Long technical reports turned into visual stories you can grasp in minutes',
                  'Malipoti ataliatali asinthidwa kukhala nkhani za zithunzi zomwe mungamvetse m’mphindi zochepa'
                )}
              </motion.p>

              <motion.div
                initial={{opacity: 0, y: 12}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1]}}
                className="mt-8 flex flex-wrap items-center justify-center gap-3"
              >
                <Link
                  to="/learn"
                  className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-bold transition-colors h-12 px-7 text-sm sm:text-base bg-[#00AEEF] text-[#052C5A] hover:bg-[#33C1F5] shadow-lg"
                >
                  <span>{bi('Choose a Topic', 'Sankhani Mutu')}</span>
                  <ArrowRight aria-hidden="true" className="w-4 h-4" />
                </Link>
                <Link
                  to="/learn/malawi-economic-growth-2026"
                  className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-colors h-12 px-7 text-sm sm:text-base bg-black/55 border border-white/25 backdrop-blur-sm text-white hover:bg-black/75 shadow-lg"
                >
                  <span>{bi('2026 Visual Story', 'Nkhani ya 2026')}</span>
                </Link>
              </motion.div>
            </motion.div>
          </section>
        </div>

        {/* =============================================================== */}
        {/* 2. FULL-BLEED PHOTO CURTAIN CAROUSEL (SLIDES OVER HERO)         */}
        {/* =============================================================== */}
        <section
          aria-roledescription="carousel"
          aria-label={bi(
            'Featured economic stories',
            'Nkhani zazikulu za chuma'
          )}
          className="relative z-10 w-full overflow-hidden bg-[#052C5A]"
        >
          <div className="relative flex h-[76svh] min-h-[460px] w-full sm:h-[82svh] max-h-[860px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{opacity: 0, scale: 1.03}}
                animate={{opacity: 1, scale: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
                className="absolute inset-0"
              >
                <img
                  src={activeSlide.image}
                  alt={activeSlide.alt}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-center opacity-100"
                />
              </motion.div>
            </AnimatePresence>

            {/* Measured Navy Scrims */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-[#031F42]/95 via-[#052C5A]/70 to-transparent"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#052C5A]"
            />

            {/* Slide Copy */}
            <div className="relative z-10 mx-auto flex h-full w-full max-w-[1440px] flex-col justify-end px-5 sm:px-8 pb-24 sm:justify-center sm:pb-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeSlide.id}-${slideIdx}`}
                  initial={{opacity: 0, y: 18}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, y: -12}}
                  transition={{duration: 0.32, ease: [0.16, 1, 0.3, 1]}}
                  className="max-w-xl space-y-4"
                >
                  <h2
                    className="font-display text-3xl font-extrabold leading-tight text-white sm:text-5xl"
                    style={{textWrap: 'balance'}}
                  >
                    {activeSlide.title}
                  </h2>
                  <p className="max-w-md text-sm sm:text-base leading-relaxed text-[#CFE8FC]">
                    {activeSlide.summary}
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3">
                    <Link
                      to={activeSlide.primaryTo}
                      className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#00AEEF] px-6 py-2.5 text-sm font-bold text-[#052C5A] transition-colors hover:bg-[#33C1F5]"
                    >
                      <span>{activeSlide.primaryLabel}</span>
                      <ArrowRight aria-hidden="true" className="w-4 h-4" />
                    </Link>
                    <Link
                      to={activeSlide.secondaryTo}
                      className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/25"
                    >
                      <span>{activeSlide.secondaryLabel}</span>
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Carousel Controls */}
            <div className="absolute inset-x-0 bottom-6 z-20 sm:bottom-10">
              <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 sm:px-8">
                <div className="flex items-center gap-2">
                  {heroSlides.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      aria-label={`${bi('View slide', 'Onani chithunzi')} ${idx + 1}: ${s.title}`}
                      onClick={() => setSlideIdx(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        idx === slideIdx
                          ? 'w-8 bg-[#00AEEF]'
                          : 'w-2.5 bg-white/35 hover:bg-white/60'
                      }`}
                    />
                  ))}
                  <span className="ml-3 font-display-num text-xs text-[#CFE8FC] tabular-nums">
                    {slideIdx + 1} / {heroSlides.length}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label={bi('Previous slide', 'Chithunzi chapita')}
                    onClick={() =>
                      setSlideIdx(
                        (prev) =>
                          (prev - 1 + heroSlides.length) % heroSlides.length
                      )
                    }
                    className="w-10 h-10 rounded-full bg-[#031F42]/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#0A3A72] cursor-pointer transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    aria-label={bi('Next slide', 'Chithunzi chotsatira')}
                    onClick={() =>
                      setSlideIdx((prev) => (prev + 1) % heroSlides.length)
                    }
                    className="w-10 h-10 rounded-full bg-[#031F42]/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#0A3A72] cursor-pointer transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ================================================================= */}
      {/* 3. HOW THIS WEBSITE WORKS (CLEAR 4-STEP ORIENTATION)              */}
      {/* =============================================================== */}
      <section
        aria-labelledby="how-works-title"
        className="relative z-10 bg-[#031F42] py-16 lg:py-24"
      >
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="inline-flex px-4 py-1 rounded-full bg-[#00AEEF] text-[#052C5A] text-xs font-bold mb-3">
                {bi('SIMPLE GUIDE', 'KALOZERA WOSAVUTA')}
              </div>
              <h2
                id="how-works-title"
                className="font-display font-extrabold text-white text-[clamp(2rem,1.4rem+2.4vw,3.5rem)] leading-[1.06] tracking-tight"
                style={{textWrap: 'balance'}}
              >
                {bi('How this website works', 'Momwe tsambali limagwirira ntchito')}
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="max-w-prose text-base text-[#B8D9F8] leading-relaxed">
                {bi(
                  'Understand the big picture in four simple steps — no charts or technical language.',
                  'Mvetsetsani chithunzi chachikulu mu masitepe anayi osavuta — popanda ma grafu kapena mawu ovuta.'
                )}
              </p>
            </div>
          </div>

          <ol className="grid gap-x-8 gap-y-10 md:grid-cols-2 xl:grid-cols-4 mt-14">
            {howItWorksSteps.map((item, idx) => (
              <motion.li
                key={item.step}
                initial={{opacity: 0, y: 14}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.2}}
                transition={{duration: 0.3, delay: idx * 0.05}}
                className="flex flex-col bg-[#052C5A] rounded-2xl p-6 shadow-md"
              >
                <span
                  aria-hidden="true"
                  className="font-display text-3xl sm:text-4xl font-extrabold tabular-nums text-[#00AEEF]"
                >
                  {item.step}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm sm:text-base text-[#CFE8FC] leading-relaxed">
                  {item.body}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 4. VISUAL DIAGRAMS (VALUES QUADRANT + CURVED CAUSE-EFFECT FAN)    */}
      {/* ================================================================= */}
      <section
        id="visuals"
        aria-labelledby="visuals-title"
        className="relative z-10 bg-[#052C5A] py-16 lg:py-24"
      >
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 space-y-10">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h2
                id="visuals-title"
                className="font-display font-extrabold text-white text-[clamp(2rem,1.4rem+2.4vw,3.5rem)] leading-[1.06] tracking-tight"
                style={{textWrap: 'balance'}}
              >
                {bi('See what leads to what', 'Onani chomwe chimabweretsa chinanso')}
              </h2>
            </div>

            <div className="flex flex-col gap-4 lg:col-span-5 lg:col-start-8">
              <p className="max-w-prose text-base text-[#B8D9F8]">
                {bi(
                  'Switch between our two visual diagram formats below.',
                  'Sinthani pakati pa zithunzi ziwiri zosonyeza mfundo.'
                )}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <div
                  role="group"
                  aria-label={bi('Choose diagram view', 'Sankhani mawonekedwe')}
                  className="inline-flex flex-wrap items-center p-1 bg-[#031F42] rounded-full gap-1"
                >
                  {[
                    {
                      id: 'quadrant',
                      label: bi('4 Key Signals', 'Zizindikiro 4'),
                    },
                    {
                      id: 'fan',
                      label: bi('Why Firms Stall', 'Chifukwa Mabizinesi Achedwa'),
                    },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setVisualMode(tab.id as 'quadrant' | 'fan')}
                      className={`px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                        visualMode === tab.id
                          ? 'bg-[#00AEEF] text-[#052C5A]'
                          : 'text-[#B8D9F8] hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <Link
                  to="/learn"
                  className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-colors bg-[#031F42] text-white hover:bg-[#0A3A72] h-10 px-5 text-xs sm:text-sm"
                >
                  <span>{bi('All Topics', 'Mitu Yonse')}</span>
                  <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {visualMode === 'quadrant' ? (
              <motion.div
                key="vis-quadrant"
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -10}}
                transition={{duration: 0.22}}
              >
                <QuadrantPosterInfographic
                  embedded
                  eyebrow={bi('2026 At a Glance', 'Chidule cha 2026')}
                  title={bi('Key Signals', 'Zizindikiro Zazikulu')}
                  subtitle={bi(
                    'Tap any card for meaning and full summary',
                    'Dinani khadi iliyonse kuti muone tanthauzo lake'
                  )}
                  items={keySignals}
                  onInspectSource={openSourceModal}
                />
              </motion.div>
            ) : (
              <motion.div
                key="vis-fan"
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -10}}
                transition={{duration: 0.22}}
              >
                <RadialFanInfographic
                  titleLeading={bi('WHAT HOLDS FIRMS', 'CHOMWE CHIKULETSA')}
                  titleHighlight={bi('BELOW 50%', 'MABIZINESI')}
                  subtitle={bi(
                    'Tap any step along the curve to see what it leads to',
                    'Dinani pa gawo lililonse kuti muone zotsatira zake'
                  )}
                  items={hurdlesFan}
                  onInspectSource={openSourceModal}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 5. QUICK TOPIC LIST (STRAIGHT TO ANY TOPIC)                       */}
      {/* ================================================================= */}
      <section
        aria-labelledby="highlights-title"
        className="relative z-10 bg-[#031F42] py-16 lg:py-24"
      >
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2
              id="highlights-title"
              className="font-display font-extrabold text-white text-[clamp(2rem,1.4rem+2.2vw,3.2rem)] leading-[1.06] tracking-tight"
            >
              {bi('Jump straight to a topic', 'Pitani mwachindunji ku mutu')}
            </h2>
            <Link
              to="/learn"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#00AEEF] hover:text-[#33C1F5]"
            >
              <span>
                {bi(
                  'See all topics & definitions',
                  'Onani mitu yonse ndi matanthauzo'
                )}
              </span>
              <ArrowRight aria-hidden="true" className="w-4 h-4" />
            </Link>
          </div>

          <ul className="mt-10 space-y-3">
            {simpleTakeaways.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.li
                  key={item.id}
                  initial={{opacity: 0, y: 12}}
                  whileInView={{opacity: 1, y: 0}}
                  viewport={{once: true, amount: 0.25}}
                  transition={{duration: 0.3, delay: idx * 0.04}}
                >
                  <Link
                    to={item.to}
                    className="group grid gap-4 py-6 md:grid-cols-12 items-center transition-colors bg-[#052C5A]/70 hover:bg-[#0A3A72] px-5 rounded-2xl shadow-md"
                  >
                    <h3 className="flex items-center gap-4 font-display text-xl sm:text-2xl font-bold text-white md:col-span-5 group-hover:text-[#00AEEF] transition-colors">
                      <span
                        aria-hidden="true"
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F3F6FB] text-[#052C5A]"
                      >
                        <Icon className="w-5 h-5" />
                      </span>
                      <span>{item.title}</span>
                    </h3>
                    <div className="md:col-span-6 md:col-start-7 flex items-center justify-between gap-4">
                      <p className="max-w-prose text-sm sm:text-base text-[#CFE8FC] leading-relaxed">
                        {item.summary}
                      </p>
                      <ArrowRight
                        aria-hidden="true"
                        className="w-5 h-5 text-[#85C7F2] group-hover:text-[#00AEEF] group-hover:translate-x-1 transition-all shrink-0"
                      />
                    </div>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 6. CLEAN CLOSING CALLOUT                                          */}
      {/* ================================================================= */}
      <section
        aria-labelledby="closing-cta-title"
        className="relative z-10 bg-[#052C5A] py-16 lg:py-24"
      >
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="flex flex-col gap-3 lg:col-span-8">
              <h2
                id="closing-cta-title"
                className="font-display font-extrabold text-white text-[clamp(2rem,1.4rem+2.2vw,3.2rem)] leading-[1.06] tracking-tight"
                style={{textWrap: 'balance'}}
              >
                {bi(
                  'Ready to check what you learned?',
                  'Kodi mwakonzeka kuyesa zomwe mwaphunzira?'
                )}
              </h2>
              <p className="max-w-prose text-base sm:text-lg text-[#B8D9F8]">
                {bi(
                  'Take a 2-minute quiz with quick explanations.',
                  'Yankhani mafunso a mphindi ziwiri ndi mafotokozedwe achidule.'
                )}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 lg:col-span-4 lg:justify-end">
              <Link
                to="/quiz"
                className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-bold transition-colors bg-[#00AEEF] hover:bg-[#33C1F5] text-[#052C5A] h-12 px-7 text-sm sm:text-base"
              >
                <span>{bi('Take Quick Quiz', 'Yambani Mayeso')}</span>
              </Link>
              <Link
                to="/learn"
                className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-colors bg-[#0A3A72] text-white hover:bg-[#164273] h-12 px-7 text-sm sm:text-base"
              >
                <span>{bi('Choose a Topic', 'Sankhani Mutu')}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
