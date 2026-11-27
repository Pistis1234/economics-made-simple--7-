import {ChevronDown, ChevronUp, Info} from 'lucide-react';
import {useState} from 'react';
import {useApp} from '../context/AppContext';
import {getRecommendationPhoto} from '../data/photoAssets';
import type {PolicyRecommendation} from '../types';

interface RecommendationCardProps {
  recommendation: PolicyRecommendation;
}

const CATEGORY_LABELS_NY: Record<string, string> = {
  'Economic stability': 'Kukhazikika kwa Chuma',
  'Public finances': 'Ndalama za Boma',
  Agriculture: 'Ulimi',
  'Trade and investment': 'Malonda ndi Ndalama',
  'Jobs and businesses': 'Ntchito ndi Mabizinesi',
};

export function RecommendationCard({recommendation}: RecommendationCardProps) {
  const {t, bi, openSourceModal} = useApp();
  const [showOriginal, setShowOriginal] = useState(false);

  const isShortTerm = recommendation.timeframe === 'SHORT TERM';
  const categoryLabel = bi(
    recommendation.category,
    CATEGORY_LABELS_NY[recommendation.category] ?? recommendation.category
  );
  const timeframeLabel = isShortTerm
    ? bi('SHORT TERM', 'NTHAWI YOCHEPA')
    : bi('MEDIUM TERM', 'NTHAWI YA PAKATI');

  const photo = getRecommendationPhoto(
    recommendation.id,
    recommendation.category,
    recommendation.heading.en
  );

  return (
    <article className="group relative overflow-hidden bg-[#031F42] text-white rounded-2xl p-6 flex flex-col justify-between transition-all shadow-xl">
      <img
        src={photo}
        alt=""
        aria-hidden="true"
        referrerPolicy="no-referrer"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-40 transition-transform duration-500 group-hover:scale-105"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#031F42]/88 via-[#031F42]/68 to-[#031F42]/94"
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3">
          <div className="text-xs text-[#B8D9F8] flex items-center gap-2 flex-wrap">
            <span className="font-bold text-white">{categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span
              className={`font-bold tracking-wide px-2.5 py-0.5 rounded-full text-[11px] ${
                isShortTerm
                  ? 'bg-[#00AEEF] text-[#052C5A]'
                  : 'bg-[#0A3A72] text-[#CFE8FC]'
              }`}
            >
              {timeframeLabel}
            </span>
          </div>

          <button
            type="button"
            onClick={() => openSourceModal(recommendation.source)}
            aria-label={bi(
              `Source information for ${t(recommendation.heading)}`,
              `Gwero la ${t(recommendation.heading)}`
            )}
            title={bi(
              'View source & verification details',
              'Onani gwero ndi chitsimikizo'
            )}
            className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#00AEEF] hover:text-[#052C5A] shadow-sm transition-colors shrink-0 cursor-pointer"
          >
            <Info aria-hidden="true" className="w-4 h-4" />
          </button>
        </div>

        <h3 className="mt-3 font-display font-bold text-lg sm:text-xl text-white leading-snug">
          {t(recommendation.heading)}
        </h3>

        <p className="mt-2.5 text-sm sm:text-base text-[#DCEBFC] leading-relaxed">
          {t(recommendation.simpleExplanation)}
        </p>
      </div>

      <div className="relative z-10 mt-5 pt-3 border-t border-white/10 space-y-2.5">
        <div className="flex items-center justify-between gap-3">
          <span className="font-display-num text-[11px] font-medium text-[#9AC2EA]">
            {t(recommendation.implementationNote)}
          </span>

          <button
            type="button"
            aria-expanded={showOriginal}
            onClick={() => setShowOriginal((prev) => !prev)}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#00AEEF] hover:text-[#6AE4FF] cursor-pointer shrink-0"
          >
            <span>
              {showOriginal
                ? bi('Hide quote', 'Bisani mawu')
                : bi('Report quote', 'Mawu a m’lipoti')}
            </span>
            {showOriginal ? (
              <ChevronUp aria-hidden="true" className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown aria-hidden="true" className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {showOriginal && (
          <p className="text-xs text-[#E6F1FF] bg-[#052C5A]/85 backdrop-blur-sm p-3.5 rounded-xl leading-relaxed shadow-sm">
            {recommendation.originalRecommendation}
          </p>
        )}
      </div>
    </article>
  );
}
