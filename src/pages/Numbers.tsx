import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  ExternalLink,
  Factory,
  Scale,
  ShoppingBasket,
  TrendingUp,
} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';
import {useMemo, useState} from 'react';
import {Link} from 'react-router-dom';
import {NumberCard} from '../components/NumberCard';
import {
  QuadrantPosterInfographic,
  type QuadrantPosterItem,
} from '../components/infographics/QuadrantPosterInfographic';
import {
  RadialFanInfographic,
  type RadialFanItem,
} from '../components/infographics/RadialFanInfographic';
import {useApp} from '../context/AppContext';
import {
  MEM_2026_PDF_PATH,
  SECTION_1_SOURCES,
  SECTION_3_CAPACITY_SOURCE,
  SECTION_4_GANYU_SOURCE,
  SECTION_6_WELFARE,
} from '../data/malawiGrowth2026';
import {PAGE_17_18_NUMBERS} from '../data/page17_18Numbers';
import {PHOTO_ASSETS} from '../data/photoAssets';
import {RECOMMENDATIONS} from '../data/recommendations';
import {formatIndicatorNumber, getTopicIcon} from '../utils/formatting';

const PAGE_FILTERS = ['All', 'Page 17', 'Page 18'] as const;
type PageFilter = (typeof PAGE_FILTERS)[number];
type NumbersViewMode = 'cards' | 'quadrant' | 'fan';

export function Numbers() {
  const {bi, openSourceModal} = useApp();
  const [selectedPage, setSelectedPage] = useState<PageFilter>('All');
  const [viewMode, setViewMode] = useState<NumbersViewMode>('cards');

  const filteredItems = useMemo(() => {
    if (selectedPage === 'All') return PAGE_17_18_NUMBERS;
    return PAGE_17_18_NUMBERS.filter((item) => item.pageGroup === selectedPage);
  }, [selectedPage]);

  // Build 2x2 Quadrant Boards matching the Values poster style
  const page17Quadrant: QuadrantPosterItem[] = useMemo(() => {
    const p17 = PAGE_17_18_NUMBERS.filter((i) => i.pageGroup === 'Page 17');
    const mapped: QuadrantPosterItem[] = p17.map((item, idx) => ({
      id: item.id,
      numberLabel: String(idx + 1).padStart(2, '0'),
      title: bi(item.title, item.titleNy),
      stat: formatIndicatorNumber(
        item.value,
        item.decimals,
        item.prefix ?? '',
        item.suffix ?? ''
      ),
      summary: bi(item.briefSummary, item.briefSummaryNy),
      detail: item.source.originalWording,
      icon: getTopicIcon(item.iconName),
      image: item.image,
      to: `/learn/${item.topicSlug}`,
      linkLabel: bi('Open topic summary', 'Tsegulani chidule cha mutu'),
      source: item.source,
    }));

    mapped.push({
      id: 'p17-net-gap',
      numberLabel: '04',
      title: bi('Net Income Margin', 'Kusiyana kwa Phindu'),
      stat: '+0.1%',
      summary: bi(
        'Growth beats population by just 0.1%, leaving average pay tight.',
        'Chuma chikungoposa kuchuluka kwa anthu ndi 0.1% yokha, ndalama zikusowabe.'
      ),
      detail: SECTION_1_SOURCES.cakeAnalogy.originalWording,
      icon: Scale,
      image: PHOTO_ASSETS.inequalityContrast,
      to: '/learn/malawi-economic-growth-2026',
      linkLabel: bi('See cake simulator', 'Onani fanizo la keke'),
      source: SECTION_1_SOURCES.cakeAnalogy,
    });

    return mapped;
  }, [bi]);

  const page18JobsQuadrant: QuadrantPosterItem[] = useMemo(() => {
    const ids = [
      'p18-firm-capacity',
      'p18-formal-youth',
      'p18-ganyu-youth',
      'p18-youth-literacy',
    ];
    return ids
      .map((id, idx) => {
        const item = PAGE_17_18_NUMBERS.find((n) => n.id === id);
        if (!item) return null;
        return {
          id: item.id,
          numberLabel: String(idx + 1).padStart(2, '0'),
          title: bi(item.title, item.titleNy),
          stat: formatIndicatorNumber(
            item.value,
            item.decimals,
            item.prefix ?? '',
            item.suffix ?? ''
          ),
          summary: bi(item.briefSummary, item.briefSummaryNy),
          detail: item.source.originalWording,
          icon: getTopicIcon(item.iconName),
          image: item.image,
          to: `/learn/${item.topicSlug}`,
          linkLabel: bi('Open topic summary', 'Tsegulani chidule cha mutu'),
          source: item.source,
        };
      })
      .filter(Boolean) as QuadrantPosterItem[];
  }, [bi]);

  const page18WelfareQuadrant: QuadrantPosterItem[] = useMemo(() => {
    const ids = [
      'p18-formal-adults',
      'p18-national-poverty',
      'p18-food-poverty',
      'p18-gini',
    ];
    return ids
      .map((id, idx) => {
        const item = PAGE_17_18_NUMBERS.find((n) => n.id === id);
        if (!item) return null;
        return {
          id: item.id,
          numberLabel: String(idx + 1).padStart(2, '0'),
          title: bi(item.title, item.titleNy),
          stat: formatIndicatorNumber(
            item.value,
            item.decimals,
            item.prefix ?? '',
            item.suffix ?? ''
          ),
          summary: bi(item.briefSummary, item.briefSummaryNy),
          detail: item.source.originalWording,
          icon: getTopicIcon(item.iconName),
          image: item.image,
          to: `/learn/${item.topicSlug}`,
          linkLabel: bi('Open topic summary', 'Tsegulani chidule cha mutu'),
          source: item.source,
        };
      })
      .filter(Boolean) as QuadrantPosterItem[];
  }, [bi]);

  // Build Curved Fan items (capped at 6 clean slices so arc stays balanced)
  const fanItems: RadialFanItem[] = useMemo(() => {
    const sourceList =
      selectedPage === 'Page 17'
        ? PAGE_17_18_NUMBERS.filter((i) => i.pageGroup === 'Page 17')
        : selectedPage === 'Page 18'
        ? PAGE_17_18_NUMBERS.filter((i) => i.pageGroup === 'Page 18').slice(0, 6)
        : PAGE_17_18_NUMBERS.filter((i) =>
            [
              'p17-gdp-2026',
              'p17-population',
              'p18-firm-capacity',
              'p18-formal-youth',
              'p18-food-poverty',
              'p18-gini',
            ].includes(i.id)
          );

    return sourceList.map((item) => ({
      id: item.id,
      highlight: formatIndicatorNumber(
        item.value,
        item.decimals,
        item.prefix ?? '',
        item.suffix ?? ''
      ),
      label: bi(item.title, item.titleNy),
      example: bi(item.briefSummary, item.briefSummaryNy),
      image: item.image,
      to: `/learn/${item.topicSlug}`,
      linkLabel: bi('See what this leads to', 'Onani zotsatira zake'),
      source: item.source,
    }));
  }, [selectedPage, bi]);

  // What This Means for Malawians (2x2 Values Quadrant)
  const malawianImpactItems: QuadrantPosterItem[] = useMemo(
    () => [
      {
        id: 'imp-budgets',
        numberLabel: '01',
        title: bi('Tight Budgets', 'Ndalama Zochepa'),
        stat: '+0.1%',
        summary: bi(
          '2.7% growth barely beats 2.6% population growth.',
          'Kukula kwa 2.7% kukuposa anthu (2.6%) pang’ono.'
        ),
        detail: bi(
          'Earnings per person have slipped since 2022, keeping family budgets tight.',
          'Phindu la munthu latsika kuyambira 2022, zomwe zikupangitsa moyo kukhala wovuta.'
        ),
        icon: TrendingUp,
        image: PHOTO_ASSETS.marketPriceSigns,
        to: '/learn/economic-growth',
        linkLabel: bi('See growth summary', 'Onani chidule cha chuma'),
        source: SECTION_1_SOURCES.cakeAnalogy,
      },
      {
        id: 'imp-jobs',
        numberLabel: '02',
        title: bi('Fewer Jobs', 'Ntchito Zochepa'),
        stat: '< 4%',
        summary: bi(
          'Half-speed firms hire fewer staff, pushing youth into ganyu.',
          'Mabizinesi ochedwa amalemba ochepa, zomwe zikukankhira achinyamata ku ganyu.'
        ),
        detail: bi(
          'Under 4% of youth hold salaried jobs while casual ganyu climbed to 27.6%.',
          'Ochepera 4% ya achinyamata ali ndi ntchito zokhazikika pomwe ganyu yafika 27.6%.'
        ),
        icon: Briefcase,
        image: PHOTO_ASSETS.workshopJobs,
        to: '/learn/employment',
        linkLabel: bi('See jobs summary', 'Onani chidule cha ntchito'),
        source: SECTION_4_GANYU_SOURCE,
      },
      {
        id: 'imp-food',
        numberLabel: '03',
        title: bi('Food Stress', 'Kusowa Chakudya'),
        stat: '24.0%',
        summary: bi(
          'Nearly 1 in 4 Malawians struggled to afford daily food.',
          'Munthu 1 mwa 4 anavutika kupeza chakudya cha tsiku ndi tsiku.'
        ),
        detail: bi(
          'Food hardship climbed from 20.5% to 24.0% as income inequality widened.',
          'Kusowa chakudya kunakwera kuchoka 20.5% kufika 24.0%.'
        ),
        icon: ShoppingBasket,
        image: PHOTO_ASSETS.farmersVegetables,
        to: '/learn/agriculture',
        linkLabel: bi('See farming summary', 'Onani chidule cha ulimi'),
        source: SECTION_6_WELFARE[1].source,
      },
      {
        id: 'imp-skills',
        numberLabel: '04',
        title: bi('Skills Need Firms', 'Maluso Amafuna Ntchito'),
        stat: '~90%',
        summary: bi(
          'Nearly 9 in 10 youth can read, but hiring businesses lag.',
          'Pafupifupi 9 mwa 10 achinyamata amatha kuwerenga, koma ntchito n’zochepa.'
        ),
        detail: bi(
          'Steady power and US dollars are needed to turn schooling into jobs.',
          'Magetsi ndi madola ndi ofunikira kuti maphunziro abweretse ntchito.'
        ),
        icon: Factory,
        image: PHOTO_ASSETS.tailorShop,
        to: '/learn/malawi-economic-growth-2026',
        linkLabel: bi(
          'Explore Pages 17–18 story',
          'Werengani nkhani ya Masamba 17–18'
        ),
        source: SECTION_3_CAPACITY_SOURCE,
      },
    ],
    [bi]
  );

  // Solutions & Recommendations (Curved Radial Fan sourced from Table 1.2 / Report)
  const solutionFanItems: RadialFanItem[] = useMemo(
    () => [
      {
        id: 'sol-forex',
        highlight: bi('FIX DOLLAR ACCESS', 'KONZANI MADOLA'),
        label: bi('so firms buy supplies', 'kuti mafakitale agule zofunikira'),
        example: bi(
          'Use one clear exchange rate so workshops can buy raw materials.',
          'Gwiritsani ntchito mtengo umodzi wa dola kuti mabizinesi agule zofunikira.'
        ),
        image: PHOTO_ASSETS.forexBureau,
        to: '/actions',
        linkLabel: bi('See all actions', 'Onani njira zonse'),
        source: RECOMMENDATIONS[0]?.source,
      },
      {
        id: 'sol-power',
        highlight: bi('RELIABLE POWER', 'MAGETSI OKHAZIKIKA'),
        label: bi('cuts diesel costs', 'amachepetsa mtengo wa dizilo'),
        example: bi(
          'Fix Kapichira and Nkula power plants and finish regional power links.',
          'Konzani malo a magetsi ku Kapichira ndi Nkula ndi njira zamagetsi.'
        ),
        image: PHOTO_ASSETS.solarGrid,
        to: '/actions',
        linkLabel: bi('See all actions', 'Onani njira zonse'),
        source: RECOMMENDATIONS[5]?.source,
      },
      {
        id: 'sol-debt',
        highlight: bi('LOWER DEBT COSTS', 'CHEPETSANI NGONGOLE'),
        label: bi('frees tax cash', 'zisiya ndalama za zipatala'),
        example: bi(
          'Finish debt talks so taxes fund clinics and schools instead of interest.',
          'Malizani kukambirana ngongole kuti misonkho ithandize zipatala ndi masukulu.'
        ),
        image: PHOTO_ASSETS.publicDebtParliament,
        to: '/actions',
        linkLabel: bi('See all actions', 'Onani njira zonse'),
        source: RECOMMENDATIONS[1]?.source,
      },
      {
        id: 'sol-farms',
        highlight: bi('TOUGHER SEEDS', 'MBEWU ZOLIMBA'),
        label: bi('protects harvests', 'zimateteza zokolola'),
        example: bi(
          'Back drought-tolerant seeds and grain stores so dry spells hit less.',
          'Thandizani mbewu zolimba ku chilala ndi malo osungira chimanga.'
        ),
        image: PHOTO_ASSETS.maizeFarmerTractor,
        to: '/actions',
        linkLabel: bi('See all actions', 'Onani njira zonse'),
        source: RECOMMENDATIONS[3]?.source,
      },
      {
        id: 'sol-exports',
        highlight: bi('SELL MORE ABROAD', 'GULITSANI KUNJA'),
        label: bi('earns steady USD', 'kumabweretsa madola'),
        example: bi(
          'End sudden trade bans and let exporters keep more foreign cash.',
          'Thetsani malire osayembekezereka kuti Malawi apeze madola ambiri.'
        ),
        image: PHOTO_ASSETS.portCargoShip,
        to: '/actions',
        linkLabel: bi('See all actions', 'Onani njira zonse'),
        source: RECOMMENDATIONS[4]?.source,
      },
    ],
    [bi]
  );

  const getPageFilterLabel = (filter: PageFilter) => {
    if (filter === 'All') return bi('All (Pages 17–18)', 'Onse (Masamba 17–18)');
    if (filter === 'Page 17') return bi('Page 17', 'Tsamba 17');
    return bi('Page 18', 'Tsamba 18');
  };

  return (
    <div className="bg-[#052C5A] text-white min-h-screen">
      {/* Compact Header */}
      <section className="bg-[#031F42] py-10 sm:py-12">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={`${MEM_2026_PDF_PATH}#page=17`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#00AEEF] hover:bg-[#33C1F5] text-[#052C5A] text-xs font-bold transition-colors"
                >
                  <span>Malawi Economic Monitor</span>
                  <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
                </a>
                <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-transparent border border-[#00AEEF]/60 text-[#CFE8FC] text-xs font-semibold">
                  {bi('Pages 17 & 18', 'Masamba 17 & 18')}
                </span>
              </div>
              <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white mt-2.5 tracking-tight">
                {bi('Key Numbers', 'Manambala Ofunikira')}
              </h1>
              <p className="font-display font-medium mt-2 text-sm sm:text-base text-[#CFE8FC] max-w-xl">
                {bi(
                  'Key Pages 17–18 figures — switch between Cards, 2×2 View, or Fan.',
                  'Manambala a pa Masamba 17–18 — sinthani pakati pa Makadi, 2×2, kapena Chozungulira.'
                )}
              </p>
            </div>

            <a
              href={`${MEM_2026_PDF_PATH}#page=17`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00AEEF] hover:underline whitespace-nowrap shrink-0"
            >
              <span>{bi('Open PDF (p. 17)', 'Tsegulani PDF (ts. 17)')}</span>
              <ExternalLink aria-hidden="true" className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Page Filter */}
            <div
              role="group"
              aria-label={bi(
                'Filter numbers by report page',
                'Sankhani manambala pa tsamba la lipoti'
              )}
              className="flex flex-wrap items-center gap-2"
            >
              {PAGE_FILTERS.map((filter) => {
                const active = selectedPage === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setSelectedPage(filter)}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#00AEEF] text-[#052C5A]'
                        : 'bg-[#052C5A] text-[#B8D9F8] hover:text-white'
                    }`}
                  >
                    {getPageFilterLabel(filter)}
                  </button>
                );
              })}
            </div>

            {/* Diagram Style Switcher (Cards | 2x2 | Curved Fan) */}
            <div
              role="group"
              aria-label={bi(
                'Choose how numbers are displayed',
                'Sankhani momwe manambala awonekere'
              )}
              className="inline-flex items-center p-1 bg-[#052C5A] rounded-full"
            >
              {[
                {id: 'cards', label: bi('Cards', 'Makadi')},
                {id: 'quadrant', label: bi('2×2 View', '2×2')},
                {id: 'fan', label: bi('Curved Fan', 'Chozungulira')},
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setViewMode(tab.id as NumbersViewMode)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                    viewMode === tab.id
                      ? 'bg-[#00AEEF] text-[#052C5A]'
                      : 'text-[#B8D9F8] hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pages 17 & 18 Numbers Stage */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <AnimatePresence mode="wait">
            {viewMode === 'cards' && (
              <motion.div
                key={`cards-${selectedPage}`}
                initial={{opacity: 0, y: 8}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -8}}
                transition={{duration: 0.18}}
                className="max-w-[820px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6"
              >
                {filteredItems.map((item) => (
                  <NumberCard key={item.id} item={item} />
                ))}
              </motion.div>
            )}

            {viewMode === 'quadrant' && (
              <motion.div
                key={`quadrant-${selectedPage}`}
                initial={{opacity: 0, y: 8}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -8}}
                transition={{duration: 0.18}}
                className="space-y-8"
              >
                {(selectedPage === 'All' || selectedPage === 'Page 17') && (
                  <QuadrantPosterInfographic
                    eyebrow={bi(
                      'Page 17 · Economic Growth',
                      'Tsamba 17 · Kukula kwa Chuma'
                    )}
                    title={bi('Growth vs. People', 'Chuma vs. Anthu')}
                    subtitle={bi(
                      'Tap any card to see the exact report quote or jump to its topic',
                      'Dinani khadi iliyonse kuti muone mawu a m’lipoti kapena mutsegule mutu wake'
                    )}
                    items={page17Quadrant}
                    onInspectSource={openSourceModal}
                  />
                )}

                {(selectedPage === 'All' || selectedPage === 'Page 18') && (
                  <>
                    <QuadrantPosterInfographic
                      eyebrow={bi(
                        'Page 18 · Firms & Youth Jobs',
                        'Tsamba 18 · Mabizinesi & Ntchito'
                      )}
                      title={bi('Business & Jobs', 'Mabizinesi & Ntchito')}
                      subtitle={bi(
                        'Why more literacy has not yet created enough steady jobs',
                        'Chifukwa chake maphunziro sanabweretse ntchito zokhazikika zokwanira'
                      )}
                      items={page18JobsQuadrant}
                      onInspectSource={openSourceModal}
                    />
                    <QuadrantPosterInfographic
                      eyebrow={bi(
                        'Page 18 · Living Standards',
                        'Tsamba 18 · Moyo wa Anthu'
                      )}
                      title={bi('Poverty & Food', 'Umphawi & Chakudya')}
                      subtitle={bi(
                        'Comparing household surveys from 2019/20 to 2024/25',
                        'Kuyerekeza mafukufuku a mabanja a 2019/20 ndi 2024/25'
                      )}
                      items={page18WelfareQuadrant}
                      onInspectSource={openSourceModal}
                    />
                  </>
                )}
              </motion.div>
            )}

            {viewMode === 'fan' && (
              <motion.div
                key={`fan-${selectedPage}`}
                initial={{opacity: 0, y: 8}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -8}}
                transition={{duration: 0.18}}
              >
                <RadialFanInfographic
                  titleLeading={
                    selectedPage === 'All'
                      ? bi('PAGES 17–18', 'MASAMBA 17–18')
                      : selectedPage === 'Page 17'
                      ? bi('PAGE 17', 'TSAMBA 17')
                      : bi('PAGE 18', 'TSAMBA 18')
                  }
                  titleHighlight={bi('KEY NUMBERS', 'MANAMBALA')}
                  subtitle={bi(
                    'Tap any figure along the curve for its brief meaning',
                    'Dinani pa nambala iliyonse kuti muone tanthauzo lake lachidule'
                  )}
                  items={fanItems}
                  onInspectSource={openSourceModal}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* What This Means for Malawians (2x2 Values Quadrant) */}
      <section className="bg-[#031F42] py-12">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <QuadrantPosterInfographic
            eyebrow={bi('Everyday Life', 'Moyo wa Tsiku ndi Tsiku')}
            title={bi(
              'What This Means for Malawians',
              'Tanthanzo Lake kwa Amalawi'
            )}
            subtitle={bi(
              'How these Pages 17–18 numbers show up in homes, markets, and workplaces',
              'Momwe manambala a pa Masamba 17–18 amakhudzira m’nyumba, m’misika, ndi ku ntchito'
            )}
            items={malawianImpactItems}
            onInspectSource={openSourceModal}
          />
        </div>
      </section>

      {/* Solutions & Recommendations (Curved Radial Fan) */}
      <section className="bg-[#052C5A] py-12">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-6">
          <RadialFanInfographic
            titleLeading={bi('SOLUTIONS THAT', 'MAYANKHO OMWE')}
            titleHighlight={bi('UNLOCK GROWTH', 'AKULITSA CHUMA')}
            subtitle={bi(
              'Report recommendations showing what each fix leads to',
              'Malangizo a m’lipoti osonyeza zotsatira za kusintha kulikonse'
            )}
            items={solutionFanItems}
            onInspectSource={openSourceModal}
          />

          <div className="flex justify-center pt-2">
            <Link
              to="/actions"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00AEEF] hover:bg-[#33C1F5] text-[#052C5A] text-sm font-bold transition-colors"
            >
              <span>
                {bi(
                  'Explore all report policy actions',
                  'Onani njira zonse zothandiza chuma'
                )}
              </span>
              <ArrowRight aria-hidden="true" className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
