import {ArrowRight, Info} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';
import type {CSSProperties} from 'react';
import {useId, useState} from 'react';
import {Link} from 'react-router-dom';
import {useApp} from '../../context/AppContext';
import type {SourceReference} from '../../types';
import {AnimatedStatText} from '../AnimatedNumber';

export interface RadialFanItem {
  id: string;
  label: string;
  highlight: string;
  example: string;
  image?: string;
  to?: string;
  linkLabel?: string;
  source?: SourceReference;
}

interface RadialFanInfographicProps {
  titleLeading: string;
  titleHighlight: string;
  subtitle?: string;
  items: RadialFanItem[];
  onInspectSource?: (source: SourceReference) => void;
}

export function RadialFanInfographic({
  titleLeading,
  titleHighlight,
  subtitle,
  items,
  onInspectSource,
}: RadialFanInfographicProps) {
  const {bi} = useApp();
  const [activeIndex, setActiveIndex] = useState(0);
  const gradId = useId();
  const activeItem = items[activeIndex] ?? items[0];

  const count = items.length;
  const arcSpanDeg = 136;
  const startDeg = -arcSpanDeg / 2;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#052C5A] shadow-xl p-4 sm:p-7 lg:p-8 text-white">

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -left-16 w-64 h-64 bg-[#00AEEF]/12 rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-4xl mx-auto grid grid-cols-12 gap-x-2 gap-y-5 lg:gap-x-6 lg:gap-y-5 items-center">
        {/* Hub Circle + Headline (stays beside the curved fan on mobile AND desktop) */}
        <div className="col-span-5 lg:col-span-5 lg:row-start-1 self-center">
          <div className="relative flex items-center py-3 sm:py-4">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 w-24 h-24 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full bg-[#0A3A72]"
            />
            <div className="relative z-10 pr-1.5 sm:pr-4 space-y-1 sm:space-y-2">
              {subtitle && (
                <p className="text-[10px] sm:text-xs font-medium text-[#B8D9F8] leading-snug">
                  {subtitle}
                </p>
              )}
              <h3
                className="font-display text-base sm:text-2xl lg:text-3xl leading-[1.08] tracking-tight text-white"
                style={{textWrap: 'balance'}}
              >
                <span className="font-normal text-white/95">{titleLeading} </span>
                <span className="font-extrabold text-[#00AEEF]">
                  {titleHighlight}
                </span>
              </h3>
            </div>
          </div>
        </div>

        {/* Right: Curved Orbital Arc with Dots + Fan Wedge Cards (always rendered on mobile & desktop) */}
        <div className="col-span-7 lg:col-span-7 lg:row-start-1 lg:row-span-2 flex items-center gap-1.5 sm:gap-4 min-w-0">
          <div className="relative w-8 sm:w-12 h-[220px] sm:h-[320px] lg:h-[340px] shrink-0">
            <svg
              viewBox="0 0 80 380"
              preserveAspectRatio="xMidYMid meet"
              className="w-full h-full overflow-visible"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#85C7F2" />
                  <stop offset="50%" stopColor="#00AEEF" />
                  <stop offset="100%" stopColor="#FFFFFF" />
                </linearGradient>
              </defs>
              <path
                d="M 10 24 A 185 185 0 0 1 10 356"
                fill="none"
                stroke={`url(#${gradId})`}
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {items.map((item, idx) => {
                const t = count > 1 ? idx / (count - 1) : 0.5;
                const deg = startDeg + t * arcSpanDeg;
                const rad = (deg * Math.PI) / 180;
                const cx = -110 + Math.cos(rad) * 185;
                const cy = 190 + Math.sin(rad) * 185;
                const isActive = idx === activeIndex;

                return (
                  <g key={`dot-${item.id}`}>
                    {isActive && (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={12}
                        fill="#00AEEF"
                        fillOpacity={0.28}
                      />
                    )}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isActive ? 7 : 5}
                      fill={isActive ? '#00AEEF' : '#052C5A'}
                      stroke={isActive ? '#FFFFFF' : '#85C7F2'}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex-1 max-w-md space-y-2 sm:space-y-2.5 min-w-0">
            {items.map((item, idx) => {
              const isActive = idx === activeIndex;
              const mid = (count - 1) / 2;
              const distFromMid = Math.abs(idx - mid) / Math.max(mid, 1);
              const curveRatio = Number(
                (1 - distFromMid * distFromMid).toFixed(3)
              );

              const stepHasPhoto = Boolean(item.image);

              return (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  whileHover={{x: 4}}
                  whileTap={{scale: 0.99}}
                  style={{'--fan-ratio': curveRatio} as CSSProperties}
                  className={`relative overflow-hidden ml-[calc(var(--fan-ratio)*10px)] sm:ml-[calc(var(--fan-ratio)*20px)] mr-[calc((1-var(--fan-ratio))*10px)] sm:mr-[calc((1-var(--fan-ratio))*20px)] w-[calc(100%-10px)] sm:w-[calc(100%-20px)] text-left px-2.5 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl transition-all cursor-pointer flex items-center justify-between gap-1.5 sm:gap-3 ${
                    stepHasPhoto
                      ? isActive
                        ? 'bg-[#031F42] text-white shadow-xl'
                        : 'bg-[#031F42]/90 text-white hover:bg-[#031F42] shadow-md'
                      : isActive
                        ? 'bg-white text-[#052C5A] shadow-lg'
                        : 'bg-[#F3F6FB] text-[#052C5A] hover:bg-white shadow-sm'
                  }`}
                >
                  {item.image && (
                    <>
                      <img
                        src={item.image}
                        alt=""
                        aria-hidden="true"
                        referrerPolicy="no-referrer"
                        className={`pointer-events-none absolute inset-0 h-full w-full object-cover object-center transition-opacity ${
                          isActive ? 'opacity-45' : 'opacity-28'
                        }`}
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#031F42]/92 via-[#031F42]/68 to-[#031F42]/88"
                      />
                    </>
                  )}

                  <div className="relative z-10 min-w-0">
                    <span className="text-[11px] sm:text-sm leading-tight sm:leading-snug block">
                      <span
                        className={`font-extrabold ${
                          stepHasPhoto
                            ? isActive
                              ? 'text-[#00AEEF]'
                              : 'text-[#85C7F2]'
                            : isActive
                              ? 'text-[#00AEEF]'
                              : 'text-[#052C5A]'
                        }`}
                      >
                        <AnimatedStatText text={item.highlight} startOnMount />
                      </span>{' '}
                      <span
                        className={`font-medium ${
                          stepHasPhoto ? 'text-[#E6F1FF]' : 'text-[#475E78]'
                        }`}
                      >
                        {item.label}
                      </span>
                    </span>
                  </div>

                  <span
                    className={`relative z-10 font-display-num text-[10px] sm:text-xs font-bold shrink-0 tabular-nums w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center ${
                      isActive
                        ? 'bg-[#00AEEF] text-[#052C5A]'
                        : 'bg-[#052C5A] text-white'
                    }`}
                  >
                    {idx + 1}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Selected Step / Topic Detail Card (below visual on mobile, below title on desktop) */}
        <div className="col-span-12 lg:col-span-5 lg:row-start-2">
          <AnimatePresence mode="wait">
            {activeItem && (
              <motion.div
                key={activeItem.id}
                initial={{opacity: 0, y: 6}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -6}}
                transition={{duration: 0.18, ease: [0.16, 1, 0.3, 1]}}
                className="relative overflow-hidden bg-[#031F42] rounded-2xl p-4 sm:p-5 space-y-2.5 sm:space-y-3 shadow-lg"
              >
                {activeItem.image && (
                  <>
                    <img
                      src={activeItem.image}
                      alt=""
                      aria-hidden="true"
                      referrerPolicy="no-referrer"
                      className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-35"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#031F42]/92 via-[#031F42]/76 to-[#031F42]/94"
                    />
                  </>
                )}

                <div className="relative z-10 flex items-center justify-between gap-2">
                  <span className="font-display-num text-xs font-bold text-[#00AEEF] tabular-nums">
                    {String(activeIndex + 1).padStart(2, '0')} /{' '}
                    {String(count).padStart(2, '0')} · {activeItem.highlight}
                  </span>
                  {activeItem.source && onInspectSource && (
                    <button
                      type="button"
                      onClick={() => onInspectSource(activeItem.source!)}
                      aria-label={bi(
                        `View source for ${activeItem.highlight}`,
                        `Onani gwero la ${activeItem.highlight}`
                      )}
                      className="w-7 h-7 rounded-full bg-[#0A3A72] flex items-center justify-center text-[#B8D9F8] hover:text-white hover:bg-[#164273] transition-colors cursor-pointer"
                    >
                      <Info aria-hidden="true" className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <p className="relative z-10 text-sm sm:text-base text-white leading-relaxed">
                  {activeItem.example}
                </p>

                {activeItem.to && (
                  <div className="relative z-10 pt-1">
                    <Link
                      to={activeItem.to}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#00AEEF] hover:bg-[#33C1F5] text-[#052C5A] text-xs sm:text-sm font-bold transition-colors"
                    >
                      <span>
                        {activeItem.linkLabel ??
                          bi('Open short summary', 'Tsegulani chidule')}
                      </span>
                      <ArrowRight aria-hidden="true" className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
