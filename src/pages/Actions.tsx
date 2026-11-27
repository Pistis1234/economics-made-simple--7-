import {useEffect, useMemo, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {RecommendationCard} from '../components/RecommendationCard';
import {useApp} from '../context/AppContext';
import {PHOTO_ASSETS} from '../data/photoAssets';
import {RECOMMENDATIONS} from '../data/recommendations';

const ACTION_CATEGORIES = [
  'All',
  'Economic stability',
  'Public finances',
  'Agriculture',
  'Trade and investment',
  'Jobs and businesses',
];

const CATEGORY_LABELS_NY: Record<string, string> = {
  All: 'Zonse',
  'Economic stability': 'Kukhazikika kwa Chuma',
  'Public finances': 'Ndalama za Boma',
  Agriculture: 'Ulimi',
  'Trade and investment': 'Malonda & Kuyika Ndalama',
  'Jobs and businesses': 'Ntchito & Mabizinesi',
};

export function Actions() {
  const {
    selectedReport,
    selectedReportId,
    setSelectedReportId,
    reports,
    ui,
    bi,
  } = useApp();
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTimeframe, setSelectedTimeframe] = useState<
    'ALL' | 'SHORT TERM' | 'MEDIUM TERM'
  >('ALL');

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

  const reportRecommendations = useMemo(
    () => RECOMMENDATIONS.filter((rec) => rec.reportId === selectedReportId),
    [selectedReportId]
  );

  const availableCategories = useMemo(() => {
    const present = new Set(reportRecommendations.map((r) => r.category));
    return ACTION_CATEGORIES.filter(
      (cat) => cat === 'All' || present.has(cat)
    );
  }, [reportRecommendations]);

  const filtered = useMemo(() => {
    return reportRecommendations.filter((rec) => {
      const catMatch =
        selectedCategory === 'All' || rec.category === selectedCategory;
      const timeMatch =
        selectedTimeframe === 'ALL' || rec.timeframe === selectedTimeframe;
      return catMatch && timeMatch;
    });
  }, [reportRecommendations, selectedCategory, selectedTimeframe]);

  const getTimeframeLabel = (tf: 'ALL' | 'SHORT TERM' | 'MEDIUM TERM') => {
    if (tf === 'ALL') return bi('All timeframes', 'Nthawi zonse');
    if (tf === 'SHORT TERM') return bi('SHORT TERM', 'NTHAWI YOCHEPA');
    return bi('MEDIUM TERM', 'NTHAWI YAPAKATI');
  };

  return (
    <div className="bg-[#052C5A] text-white min-h-screen">
      {/* Compact Header */}
      <section className="bg-[#031F42] py-10 sm:py-12">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 space-y-6">
          <div>
            <div className="inline-flex px-4 py-1 rounded-full bg-[#00AEEF] text-[#052C5A] text-xs font-bold">
              {bi('POLICY OPTIONS', 'NJIRA ZOTHANDIZA')} · {selectedReport.shortTitle}{' '}
              ({selectedReport.year})
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white mt-2 tracking-tight">
              {ui('whatCanBeDone')}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[#CFE8FC] max-w-xl">
              {bi(
                'Six quick fixes from the report — filter by area or timing.',
                'Njira zisanu ndi imodzi zachidule — sankhani pa gulu kapena nthawi.'
              )}
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-1">
            <div
              role="group"
              aria-label={bi(
                'Filter recommendations by category',
                'Sankhani malangizo pa gulu'
              )}
              className="flex flex-wrap items-center gap-2"
            >
              {availableCategories.map((category) => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#00AEEF] text-[#052C5A]'
                        : 'bg-[#052C5A] text-[#B8D9F8] hover:text-white'
                    }`}
                  >
                    {bi(category, CATEGORY_LABELS_NY[category] ?? category)}
                  </button>
                );
              })}
            </div>

            <div
              role="group"
              aria-label={bi(
                'Filter recommendations by timeframe',
                'Sankhani malangizo pa nthawi'
              )}
              className="inline-flex items-center p-1 bg-[#052C5A] rounded-full self-start"
            >
              {(['ALL', 'SHORT TERM', 'MEDIUM TERM'] as const).map((tf) => (
                <button
                  key={tf}
                  type="button"
                  onClick={() => setSelectedTimeframe(tf)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                    selectedTimeframe === tf
                      ? 'bg-[#00AEEF] text-[#052C5A]'
                      : 'text-[#B8D9F8] hover:text-white'
                  }`}
                >
                  {getTimeframeLabel(tf)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recommendations Grid */}
      <section className="py-12">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8">
          {filtered.length === 0 ? (
            <div className="relative overflow-hidden bg-[#031F42] rounded-2xl p-8 text-center text-[#DCEBFC] shadow-lg">
              <img
                src={PHOTO_ASSETS.publicDebtParliament}
                alt=""
                aria-hidden="true"
                referrerPolicy="no-referrer"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-30"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[#031F42]/80"
              />
              <p className="relative z-10">
                {bi(
                  'No recommendations match the current filter for this report.',
                  'Palibe malangizo ogwirizana ndi zomwe mwasankhazi mu lipotili.'
                )}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((rec) => (
                <RecommendationCard key={rec.id} recommendation={rec} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
