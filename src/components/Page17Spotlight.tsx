import {
  AlertCircle,
  ArrowRight,
  ExternalLink,
  Info,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import {Link} from 'react-router-dom';
import {useApp} from '../context/AppContext';
import {AnimatedStatText} from './AnimatedNumber';

const PDF_PAGE_17_URL =
  '/assets/aistudio/MALAWI_ECONOMIC_MONITOR_BUILDING_STABILITY_TO_UNLOCK_GROWTH_a1ee2546.pdf#page=17';

const PAGE_17_SOURCE = {
  reportId: 'mem-sept-2026',
  reportTitle: 'Malawi Economic Monitor: Building Stability to Unlock Growth',
  publisher: 'World Bank',
  publicationYear: 2026,
  pageReference: 'Page 17 (Section 1.2, Figures 1.5 & 1.6)',
  originalWording:
    'Malawi’s GDP is projected to grow by 2.7 percent in 2026, up from an estimated 2.5 percent in 2025. While this would mark the first time in five years that GDP expansion outpaces the country’s rate of population growth, which stands at 2.6 percent per year, this pace of economic growth remains too slow to push a significant number of people out of poverty... Structural bottlenecks—particularly in energy supply, access to foreign exchange, and regulatory uncertainty—continue to weigh on private sector activity.',
  sourceUrl: PDF_PAGE_17_URL,
  sourceType: 'direct_report' as const,
  verificationStatus: 'verified' as const,
};

const GROWTH_COMPARISON_TILES = [
  {num: '01', year: '2025 Estimate', val: '2.5%', note: 'Below population growth'},
  {num: '02', year: '2026 Projection', val: '2.7%', note: 'Only 0.1% faster than population'},
  {num: '03', year: 'Population Growth', val: '2.6%', note: 'New people sharing the economy'},
  {num: '04', year: 'What It Leads To', val: 'Flat Pay', note: 'Average income still feels tight'},
];

interface Page17SpotlightProps {
  compact?: boolean;
}

export function Page17Spotlight({compact = false}: Page17SpotlightProps) {
  const {openSourceModal} = useApp();

  return (
    <section
      aria-labelledby="page-17-spotlight-heading"
      className={
        compact
          ? 'bg-[#052C5A] py-10'
          : 'bg-[#052C5A] py-14 lg:py-16'
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#031F42] rounded-3xl overflow-hidden shadow-xl">
          <div className="px-6 py-6 sm:px-8 bg-[#031F42] text-white flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="inline-flex px-3.5 py-1 rounded-full bg-[#00AEEF] text-[#052C5A] text-xs font-bold">
                SIMPLIFIED FROM PAGE 17
              </div>
              <h2
                id="page-17-spotlight-heading"
                className="font-display font-extrabold text-xl sm:text-2xl text-white mt-2"
              >
                Why 2026 Growth (2.7%) Still Feels Like Standing Still
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <a
                href={PDF_PAGE_17_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0A3A72] hover:bg-[#164273] text-xs font-semibold text-white transition-colors"
              >
                <span>Open PDF Page 17</span>
                <ExternalLink aria-hidden="true" className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={() => openSourceModal(PAGE_17_SOURCE)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#00AEEF] hover:bg-[#33C1F5] text-[#052C5A] text-xs font-bold transition-colors cursor-pointer"
              >
                <Info aria-hidden="true" className="w-3.5 h-3.5" />
                <span>Source quote</span>
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-5">
              <p className="text-base sm:text-lg text-[#CFE8FC] leading-relaxed font-medium">
                Projected <strong className="font-display-num text-[#00AEEF]">2.7%</strong> growth in 2026 barely beats{' '}
                <strong className="font-display-num text-white">2.6%</strong> population growth — by just{' '}
                <strong className="text-white">0.1%</strong> — so everyday incomes still feel squeezed.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#052C5A] space-y-2">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00AEEF]">
                    <TrendingUp aria-hidden="true" className="w-4 h-4" />
                    <span>WHAT HELPS</span>
                  </div>
                  <ul className="space-y-1.5 text-sm text-[#CFE8FC]">
                    <li>
                      <strong className="text-white">Services:</strong> Banking &amp; mobile money.
                    </li>
                    <li>
                      <strong className="text-white">Farming:</strong> Recovery after 2024 drought.
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-[#052C5A] space-y-2">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#85C7F2]">
                    <TrendingDown aria-hidden="true" className="w-4 h-4" />
                    <span>WHAT HOLDS IT BACK</span>
                  </div>
                  <ul className="space-y-1.5 text-sm text-[#CFE8FC]">
                    <li>
                      <strong className="text-white">Forex shortages:</strong> Hard to import supplies.
                    </li>
                    <li>
                      <strong className="text-white">Power &amp; credit:</strong> Outages &amp; costly loans.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-2 text-xs sm:text-sm text-[#B8D9F8]">
                <AlertCircle
                  aria-hidden="true"
                  className="w-4 h-4 text-[#00AEEF] shrink-0 mt-0.5"
                />
                <span>
                  Malawi&apos;s 2.7% still lags neighbors like Zambia, Mozambique, and Rwanda.
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <Link
                  to="/learn/malawi-economic-growth-2026"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00AEEF] hover:bg-[#33C1F5] text-[#052C5A] text-sm font-bold transition-colors"
                >
                  <span>Explore Visual Story (Pages 17–18)</span>
                  <ArrowRight aria-hidden="true" className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Graph-free 2x2 Values comparison tiles */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {GROWTH_COMPARISON_TILES.map((tile) => (
                <div
                  key={tile.num}
                  className="bg-[#F3F6FB] text-[#052C5A] rounded-2xl p-5 flex flex-col justify-between min-h-[140px]"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-xs font-bold text-[#475E78]">
                      {tile.year}
                    </span>
                    <span className="font-display-num font-bold text-sm text-[#85C7F2]">
                      {tile.num}
                    </span>
                  </div>
                  <div className="font-display-num font-extrabold text-3xl text-[#052C5A] my-2">
                    <AnimatedStatText text={tile.val} />
                  </div>
                  <div className="text-xs text-[#475E78]">{tile.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
