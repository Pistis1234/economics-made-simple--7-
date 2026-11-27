import {ArrowDown, ArrowRight, ArrowUp, ArrowUpRight, Info} from 'lucide-react';
import {useId} from 'react';
import {Link} from 'react-router-dom';
import {useApp} from '../context/AppContext';
import type {PageNumberItem} from '../data/page17_18Numbers';
import {useCountUp} from '../hooks/useCountUp';
import {formatIndicatorNumber} from '../utils/formatting';

interface NumberCardProps {
  item: PageNumberItem;
}

function buildSmoothSparkline(series: number[], width: number, height: number) {
  const pts = series.length >= 2 ? series : [45, 50, 55];
  const padX = 10;
  const padTop = 10;
  const padBottom = 12;
  const usableW = width - padX * 2;
  const usableH = height - padTop - padBottom;

  const coords = pts.map((val, idx) => {
    const x = padX + (idx / (pts.length - 1)) * usableW;
    const clamped = Math.max(5, Math.min(95, val));
    const y = padTop + ((100 - clamped) / 100) * usableH;
    return {x, y};
  });

  let linePath = `M ${coords[0].x.toFixed(1)} ${coords[0].y.toFixed(1)}`;
  for (let i = 0; i < coords.length - 1; i++) {
    const p0 = coords[i];
    const p1 = coords[i + 1];
    const cx = ((p0.x + p1.x) / 2).toFixed(1);
    linePath += ` C ${cx} ${p0.y.toFixed(1)}, ${cx} ${p1.y.toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
  }

  const last = coords[coords.length - 1];
  const areaPath = `${linePath} L ${last.x.toFixed(1)} ${height} L ${coords[0].x.toFixed(1)} ${height} Z`;

  return {linePath, areaPath, last};
}

export function NumberCard({item}: NumberCardProps) {
  const {openSourceModal, bi} = useApp();
  const gradId = useId();

  const {ref, displayValue} = useCountUp<HTMLElement>({
    target: item.value,
    decimals: item.decimals,
    startOnMount: true,
  });

  const formattedFigure = formatIndicatorNumber(
    displayValue,
    item.decimals,
    item.prefix ?? '',
    item.suffix ?? ''
  );

  const title = bi(item.title, item.titleNy);
  const summary = bi(item.briefSummary, item.briefSummaryNy);
  const trendNote = bi(item.trendNote, item.trendNoteNy);

  const pageRefShort = bi(
    item.source.pageReference.split('·')[0].replace('Page ', 'p. ').trim(),
    item.source.pageReference.split('·')[0].replace('Page ', 'ts. ').trim()
  );

  const isPositive = item.trendDirection === 'positive';
  const isRisingSeries =
    item.trendSeries[item.trendSeries.length - 1] >= item.trendSeries[0];

  const strokeColor = isPositive ? '#22C55E' : '#F59E0B';
  const accentTextClass = isPositive ? 'text-[#4ADE80]' : 'text-[#FBBF24]';

  const TrendArrow = isRisingSeries ? ArrowUp : ArrowDown;
  const {linePath, areaPath, last} = buildSmoothSparkline(item.trendSeries, 240, 68);

  return (
    <article
      ref={ref}
      className="group relative overflow-hidden rounded-3xl bg-[#031F42] p-5 sm:p-6 min-h-[340px] sm:min-h-[355px] h-full flex flex-col justify-between shadow-xl"
    >
      {/* Background Documentary Photograph */}
      <img
        src={item.image}
        alt=""
        aria-hidden="true"
        referrerPolicy="no-referrer"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-50 transition-transform duration-500 group-hover:scale-105"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#031F42]/90 via-[#031F42]/45 to-[#031F42]/94"
      />

      {/* Top Section: Title, Trend Subtitle, Info Button & Giant Number */}
      <div className="relative z-10 space-y-2.5">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h3 className="font-display font-bold text-sm sm:text-base text-white leading-snug">
              {title}
            </h3>
            <div
              className={`inline-flex items-center gap-1 text-xs font-medium ${accentTextClass}`}
            >
              <TrendArrow aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
              <span className="text-[#CFE8FC]">{trendNote}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => openSourceModal(item.source)}
            aria-label={bi(
              `Source information for ${title}`,
              `Gwero la ${title}`
            )}
            title={bi('View report quote', 'Onani mawu a m’lipoti')}
            className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/90 hover:bg-[#00AEEF] hover:text-[#052C5A] transition-colors shrink-0 cursor-pointer"
          >
            <Info aria-hidden="true" className="w-4 h-4" />
          </button>
        </div>

        <div className="font-display-num font-extrabold text-4xl sm:text-5xl tracking-tight text-white drop-shadow-[0_2px_12px_rgba(3,31,66,0.9)]">
          {formattedFigure}
        </div>
      </div>

      {/* Middle: Donut Pie Chart (for share indicators) or Smooth Glowing Trend Curve */}
      <div className="relative z-10 my-1 flex items-center justify-center">
        {typeof item.pieShare === 'number' ? (
          (() => {
            const pct = Math.max(2, Math.min(98, item.pieShare));
            const r = 24;
            const c = 2 * Math.PI * r;
            const dash = (pct / 100) * c;
            const primaryLabel = bi(
              item.pieLabel ?? `${pct}%`,
              item.pieLabelNy ?? item.pieLabel ?? `${pct}%`
            );
            const restLabel = bi(
              item.pieRestLabel ?? `${(100 - pct).toFixed(0)}%`,
              item.pieRestLabelNy ?? item.pieRestLabel ?? `${(100 - pct).toFixed(0)}%`
            );

            return (
              <div className="w-full flex items-center gap-4 py-1">
                <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                  <svg
                    viewBox="0 0 64 64"
                    className="w-16 h-16 -rotate-90 overflow-visible"
                    aria-hidden="true"
                  >
                    <circle
                      cx="32"
                      cy="32"
                      r={r}
                      fill="none"
                      stroke="rgba(255,255,255,0.16)"
                      strokeWidth="9"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r={r}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth="9"
                      strokeLinecap="round"
                      strokeDasharray={`${dash.toFixed(2)} ${c.toFixed(2)}`}
                      style={{filter: `drop-shadow(0 0 6px ${strokeColor})`}}
                    />
                  </svg>
                  <span className="pointer-events-none absolute font-display-num text-[11px] font-bold text-white">
                    {formattedFigure}
                  </span>
                </div>

                <div className="min-w-0 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{backgroundColor: strokeColor}}
                    />
                    <span className="font-semibold text-white truncate">
                      {primaryLabel}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="w-2.5 h-2.5 rounded-full bg-white/25 shrink-0"
                    />
                    <span className="text-[#B8D9F8] truncate">{restLabel}</span>
                  </div>
                </div>
              </div>
            );
          })()
        ) : (
          <svg
            viewBox="0 0 240 68"
            className="w-full h-16 overflow-visible"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={strokeColor} stopOpacity="0.38" />
                <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={areaPath} fill={`url(#${gradId})`} />
            <path
              d={linePath}
              fill="none"
              stroke={strokeColor}
              strokeWidth="3"
              strokeLinecap="round"
              style={{filter: `drop-shadow(0 0 8px ${strokeColor})`}}
            />
            <circle
              cx={last.x}
              cy={last.y}
              r="6.5"
              fill={strokeColor}
              fillOpacity="0.28"
            />
            <circle
              cx={last.x}
              cy={last.y}
              r="3.5"
              fill="#FFFFFF"
              stroke={strokeColor}
              strokeWidth="2"
            />
          </svg>
        )}
      </div>

      {/* Bottom: Plain Explanation + Page Reference & Learn Link */}
      <div className="relative z-10 space-y-3">
        <p className="text-xs sm:text-sm text-[#E6F1FF] leading-relaxed">
          {summary}
        </p>

        <div className="pt-1 flex items-center justify-between gap-3">
          <span className="font-display-num text-xs font-medium text-[#9AC2EA]">
            {pageRefShort}
          </span>
          <Link
            to={`/learn/${item.topicSlug}`}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#00AEEF] hover:text-[#6AE4FF] transition-colors"
          >
            <span>{bi('See why in Learn', 'Onani mu Phunzirani')}</span>
            <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
