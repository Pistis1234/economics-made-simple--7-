import {
  ArrowLeft,
  BookOpen,
  Compass,
  ExternalLink,
  Scale,
  TrendingUp,
  Users,
} from 'lucide-react';
import {Link} from 'react-router-dom';
import {QuadrantPosterInfographic} from '../components/infographics/QuadrantPosterInfographic';
import {useApp} from '../context/AppContext';
import {
  MEM_2026_PDF_PATH,
  SECTION_1_INDICATORS,
  SECTION_1_SOURCES,
} from '../data/malawiGrowth2026';
import {PHOTO_ASSETS} from '../data/photoAssets';

export function MalawiGrowthExperience() {
  const {openSourceModal, bi} = useApp();

  return (
    <div className="bg-[#052C5A] text-white">
      {/* Growth vs. People Section */}
      <section
        id="section-1-growth-vs-people"
        aria-labelledby="growth-vs-people-heading"
        className="bg-[#031F42] py-10 lg:py-14"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div>
            <Link
              to="/learn"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#052C5A] hover:bg-[#0A3A72] text-xs font-semibold text-[#CFE8FC] hover:text-white transition-colors"
            >
              <ArrowLeft aria-hidden="true" className="w-3.5 h-3.5" />
              <span>{bi('All Topics', 'Mitu Yonse')}</span>
            </Link>
          </div>

          <div className="bg-[#052C5A] rounded-2xl p-5 sm:p-7 space-y-5 shadow-xl">
            <div>
              <h1
                id="growth-vs-people-heading"
                className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight"
              >
                {bi("Is Malawi's Economy Growing?", 'Kodi Chuma cha Malawi Chikukula?')}
              </h1>
              <p className="text-xs sm:text-sm text-[#B8D9F8] mt-1">
                {bi(
                  '2.7% growth vs. 2.6% population — only 0.1% faster than population growth.',
                  'Kukula 2.7% vs. anthu 2.6% — ikuposa anthu ndi 0.1% yokha.'
                )}
              </p>
            </div>

            <div>
              <QuadrantPosterInfographic
                embedded
                eyebrow={bi(
                  'WHY 2.7% FEELS SMALL',
                  'CHIFUKWA CHOMWE 2.7% IMAONEKA NGATI YOCHEPA'
                )}
                title={bi('Growth vs. People', 'Chuma vs. Anthu')}
                subtitle={bi(
                  'Seeing what 2.7% growth actually leads to for everyday incomes',
                  'Kuona zomwe kukula kwa 2.7% kumapanga pa ndalama za aliyense'
                )}
                items={[
                  {
                    id: 's1-q-2025',
                    numberLabel: '01',
                    title: bi('2025 Estimate', 'Chiyerekezo cha 2025'),
                    stat: '2.5%',
                    summary: bi(
                      'Modest growth, slightly behind population rise.',
                      'Chuma chinakula pang’ono, pansi pa anthu.'
                    ),
                    detail: bi(
                      'Slow recovery after dry spells and scarce US dollars.',
                      'Kuchira pang’ono pambuyo pa chilala ndi kusowa kwa madola.'
                    ),
                    icon: TrendingUp,
                    image: PHOTO_ASSETS.maizePlowing,
                    source: SECTION_1_INDICATORS[0].source,
                  },
                  {
                    id: 's1-q-2026',
                    numberLabel: '02',
                    title: bi('2026 Outlook', 'Chiyembekezo 2026'),
                    stat: '2.7%',
                    summary: bi(
                      'Slight lift led by banking and farming.',
                      'Kukwera pang’ono chifukwa cha mabanki ndi ulimi.'
                    ),
                    detail: bi(
                      'Forecast rises 0.2 points if harvests and services grow.',
                      'Chiyembekezo chikukwera 0.2% ngati ulimi ndi mabanki zikula.'
                    ),
                    icon: Compass,
                    image: PHOTO_ASSETS.harvestHills,
                    source: SECTION_1_INDICATORS[1].source,
                  },
                  {
                    id: 's1-q-pop',
                    numberLabel: '03',
                    title: bi('Population', 'Kuchuluka kwa Anthu'),
                    stat: '2.6%',
                    summary: bi(
                      'More citizens share almost the same output.',
                      'Anthu ochuluka akugawana chuma chomwecho.'
                    ),
                    detail: bi(
                      'Population grows ~2.6% yearly, needing food and jobs.',
                      'Anthu amachuluka ~2.6% pachaka ofuna chakudya ndi ntchito.'
                    ),
                    icon: Users,
                    image: PHOTO_ASSETS.marketBaskets,
                    source: SECTION_1_INDICATORS[2].source,
                  },
                  {
                    id: 's1-q-result',
                    numberLabel: '04',
                    title: bi('Net Gain', 'Phindu Lenileni'),
                    stat: '+0.1%',
                    summary: bi(
                      'Income per person barely budges.',
                      'Ndalama za munthu aliyense sizikukwera.'
                    ),
                    detail: bi(
                      'Beating population by just 0.1% leaves household budgets tight.',
                      'Kuposa anthu ndi 0.1% yokha sikukweza moyo wa m’banja.'
                    ),
                    icon: Scale,
                    image: PHOTO_ASSETS.inequalityContrast,
                    source: SECTION_1_SOURCES.cakeAnalogy,
                  },
                ]}
                onInspectSource={openSourceModal}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Compact Source Transparency Footer */}
      <section className="bg-[#052C5A] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-2.5 max-w-2xl">
            <BookOpen
              aria-hidden="true"
              className="w-4 h-4 text-[#00AEEF] shrink-0 mt-0.5"
            />
            <p className="text-xs text-[#B8D9F8] leading-relaxed">
              {bi('Figures from ', 'Manambala akuchokera mu ')}
              <strong className="text-white">
                Malawi Economic Monitor (World Bank, Sept 2026)
              </strong>
              {bi(', Page 17.', ', Tsamba 17.')}
            </p>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={`${MEM_2026_PDF_PATH}#page=17`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-[#F3F6FB] text-[#052C5A] text-xs font-bold transition-colors"
            >
              <span>{bi('Original PDF (p. 17)', 'Lipoti la PDF (ts. 17)')}</span>
              <ExternalLink aria-hidden="true" className="w-3.5 h-3.5" />
            </a>
            <Link
              to="/learn"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0A3A72] hover:bg-[#164273] text-[#CFE8FC] hover:text-white text-xs font-bold transition-colors"
            >
              <span>{bi('All Topics', 'Mitu Yonse')}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
