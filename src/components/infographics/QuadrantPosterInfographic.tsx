import {ArrowRight, Info, RotateCw, type LucideIcon} from 'lucide-react';
import {motion} from 'motion/react';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useApp} from '../../context/AppContext';
import type {SourceReference} from '../../types';
import {AnimatedStatText} from '../AnimatedNumber';

export interface QuadrantPosterItem {
  id: string;
  numberLabel: string;
  title: string;
  stat?: string;
  summary: string;
  detail?: string;
  icon?: LucideIcon;
  image?: string;
  to?: string;
  linkLabel?: string;
  source?: SourceReference;
}

interface QuadrantPosterInfographicProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items: QuadrantPosterItem[];
  onInspectSource?: (source: SourceReference) => void;
  embedded?: boolean;
  /** When true, clicking a card with `to` navigates directly to that route (ideal for topic selection). */
  directNavigate?: boolean;
}

export function QuadrantPosterInfographic({
  eyebrow,
  title,
  subtitle,
  items,
  onInspectSource,
  embedded = false,
  directNavigate = false,
}: QuadrantPosterInfographicProps) {
  const {bi} = useApp();
  const [flippedIds, setFlippedIds] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    setFlippedIds((prev) => ({...prev, [id]: !prev[id]}));
  };

  return (
    <div
      className={`bg-[#052C5A] text-white relative overflow-hidden rounded-3xl shadow-xl ${
        embedded ? 'p-4 sm:p-8' : 'p-4 sm:p-8 lg:p-10'
      }`}
    >

      {/* Subtle architectural glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 w-72 h-72 rounded-full bg-[#00AEEF]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -bottom-20 w-72 h-72 rounded-full bg-[#85C7F2]/10 blur-3xl"
      />

      <div className="relative z-10 max-w-4xl mx-auto space-y-6 sm:space-y-7">
        {/* Centered Header */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          {eyebrow && (
            <div className="inline-flex items-center justify-center px-4 py-1 sm:px-4 sm:py-1 rounded-full bg-[#00AEEF] text-white text-[11px] sm:text-xs font-semibold tracking-wide shadow-sm">
              {eyebrow}
            </div>
          )}
          <h3
            className="font-display font-extrabold text-2xl sm:text-4xl tracking-tight text-white leading-[1.08]"
            style={{textWrap: 'balance'}}
          >
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs sm:text-sm text-[#B8D9F8]">{subtitle}</p>
          )}
        </div>

        {/* 2x2 Quadrant Grid Over Soft Ice-Blue Cross Connector */}
        <div className="relative max-w-3xl mx-auto">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[56%] h-[56%] bg-[#85C7F2] rounded-2xl sm:rounded-3xl"
          />

          <div className="relative z-10 grid grid-cols-2 gap-2.5 sm:gap-4">
            {items.slice(0, 4).map((item, idx) => {
              const isFlipped = !directNavigate && Boolean(flippedIds[item.id]);
              const hasPhoto = Boolean(item.image);

              const cardPhotoOverlay = item.image ? (
                <>
                  <img
                    src={item.image}
                    alt=""
                    aria-hidden="true"
                    referrerPolicy="no-referrer"
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-50 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#031F42]/82 via-[#031F42]/50 to-[#031F42]/92"
                  />
                </>
              ) : null;

              const frontHeaderAndSummary = (
                <>
                  {cardPhotoOverlay}

                  <div className="relative z-10 space-y-1.5 sm:space-y-2">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <h4
                        className={`font-display font-extrabold text-sm sm:text-xl transition-colors leading-tight ${
                          hasPhoto
                            ? 'text-white group-hover:text-[#6AE4FF]'
                            : 'text-[#052C5A] group-hover:text-[#00AEEF]'
                        }`}
                      >
                        {item.title}
                      </h4>
                      {item.stat && (
                        <motion.span
                          animate={{
                            y: [0, -3.5, 0],
                            scale: [1, 1.05, 1],
                            boxShadow: [
                              '0 0 4px rgba(0, 174, 239, 0.35)',
                              '0 0 14px rgba(0, 174, 239, 0.9)',
                              '0 0 4px rgba(0, 174, 239, 0.35)',
                            ],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 0.7,
                            delay: idx * 0.25,
                            ease: 'easeInOut',
                          }}
                          className={`inline-flex items-center px-1.5 py-0.5 sm:px-2 rounded-md font-display-num font-bold text-[10px] sm:text-xs max-w-full ${
                            hasPhoto
                              ? 'bg-[#00AEEF] text-[#052C5A]'
                              : 'bg-[#052C5A] text-[#6AE4FF]'
                          }`}
                        >
                          (<AnimatedStatText text={item.stat} startOnMount />)
                        </motion.span>
                      )}
                    </div>
                    <p
                      className={`text-[11px] sm:text-sm leading-snug sm:leading-relaxed ${
                        hasPhoto ? 'text-[#E6F1FF]' : 'text-[#475E78]'
                      }`}
                    >
                      {item.summary}
                    </p>
                  </div>

                  <div className="relative z-10 pt-3 sm:pt-4 flex items-center justify-between gap-2 sm:gap-3">
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <span
                        className={`font-display font-semibold text-base sm:text-lg tabular-nums shrink-0 ${
                          hasPhoto ? 'text-[#6AE4FF]' : 'text-[#85C7F2]'
                        }`}
                      >
                        {item.numberLabel}
                      </span>
                      {directNavigate && item.to ? (
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold transition-colors leading-tight ${
                            hasPhoto
                              ? 'text-[#CFE8FC] group-hover:text-white'
                              : 'text-[#052C5A] group-hover:text-[#00AEEF]'
                          }`}
                        >
                          <span className="hidden sm:inline">
                            {item.linkLabel ??
                              bi('Open summary', 'Tsegulani chidule')}
                          </span>
                          <span className="sm:hidden">
                            {bi('Open', 'Tsegulani')}
                          </span>
                          <ArrowRight
                            aria-hidden="true"
                            className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0"
                          />
                        </span>
                      ) : (
                        (item.detail || item.to) && (
                          <span
                            className={`text-[10px] sm:text-xs font-semibold leading-tight ${
                              hasPhoto ? 'text-[#B8D9F8]' : 'text-[#052C5A]/75'
                            }`}
                          >
                            <span className="hidden sm:inline">
                              {bi(
                                'Tap to read more →',
                                'Dinani kuti muwerenge zambiri →'
                              )}
                            </span>
                            <span className="sm:hidden">
                              {bi('Tap to flip →', 'Dinani →')}
                            </span>
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </>
              );

              if (directNavigate && item.to) {
                return (
                  <motion.div
                    key={item.id}
                    initial={{opacity: 0, y: 10}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true, amount: 0.2}}
                    transition={{duration: 0.25, delay: idx * 0.04}}
                    whileHover={{y: -3}}
                  >
                    <Link
                      to={item.to}
                      className={`group relative overflow-hidden rounded-xl sm:rounded-2xl p-3.5 sm:p-5 min-h-[154px] sm:min-h-[186px] flex flex-col justify-between shadow-lg transition-all focus-visible:outline-2 focus-visible:outline-[#00AEEF] h-full ${
                        hasPhoto
                          ? 'bg-[#031F42] text-white'
                          : 'bg-[#F3F6FB] hover:bg-white text-[#052C5A]'
                      }`}
                    >
                      {frontHeaderAndSummary}
                    </Link>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={item.id}
                  initial={{opacity: 0, y: 10}}
                  whileInView={{opacity: 1, y: 0}}
                  viewport={{once: true, amount: 0.2}}
                  transition={{duration: 0.25, delay: idx * 0.04}}
                  style={{perspective: '1200px'}}
                  className="h-full min-h-[175px] sm:min-h-[205px]"
                >
                  <div
                    role="button"
                    tabIndex={0}
                    aria-pressed={isFlipped}
                    onClick={() => toggleFlip(item.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleFlip(item.id);
                      }
                    }}
                    className="group relative w-full h-full cursor-pointer focus-visible:outline-2 focus-visible:outline-[#00AEEF] rounded-xl sm:rounded-2xl"
                  >
                    <motion.div
                      animate={{rotateY: isFlipped ? 180 : 0}}
                      transition={{duration: 0.48, ease: [0.16, 1, 0.3, 1]}}
                      style={{transformStyle: 'preserve-3d'}}
                      className="relative w-full h-full"
                    >
                      {/* FRONT FACE */}
                      <div
                        style={{
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                        }}
                        className={`relative w-full h-full overflow-hidden rounded-xl sm:rounded-2xl p-3.5 sm:p-5 min-h-[175px] sm:min-h-[205px] flex flex-col justify-between shadow-lg transition-colors ${
                          hasPhoto
                            ? 'bg-[#031F42] text-white'
                            : 'bg-[#F3F6FB] group-hover:bg-white text-[#052C5A]'
                        }`}
                      >
                        {frontHeaderAndSummary}
                      </div>

                      {/* BACK FACE (FLIP REVEAL) */}
                      <div
                        style={{
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)',
                        }}
                        className="absolute inset-0 w-full h-full overflow-hidden bg-[#031F42] text-white rounded-xl sm:rounded-2xl p-3.5 sm:p-6 flex flex-col justify-between shadow-xl"
                      >
                        {item.image && (
                          <>
                            <img
                              src={item.image}
                              alt=""
                              aria-hidden="true"
                              referrerPolicy="no-referrer"
                              className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-25"
                            />
                            <div
                              aria-hidden="true"
                              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#031F42]/92 via-[#031F42]/82 to-[#031F42]/96"
                            />
                          </>
                        )}

                        <div className="relative z-10 flex items-start justify-between gap-2 shrink-0">
                          <div className="text-[11px] sm:text-xs font-bold text-[#00AEEF] leading-snug">
                            <span className="font-display-num">
                              {item.numberLabel}
                            </span>{' '}
                            · {item.title}
                          </div>
                          {item.source && onInspectSource && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onInspectSource(item.source!);
                              }}
                              aria-label={bi(
                                `View source for ${item.title}`,
                                `Onani gwero la ${item.title}`
                              )}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0A3A72] hover:bg-[#164273] text-[10px] sm:text-xs font-semibold text-white shrink-0 cursor-pointer transition-colors"
                            >
                              <Info aria-hidden="true" className="w-3 h-3" />
                              <span className="hidden sm:inline">
                                {bi('Source', 'Gwero')}
                              </span>
                            </button>
                          )}
                        </div>

                        <div className="relative z-10 my-2 flex-1 overflow-y-auto pr-1 flex items-center">
                          <p className="text-[11px] sm:text-sm text-[#EAF4FE] leading-relaxed">
                            {item.detail ?? item.summary}
                          </p>
                        </div>

                        <div className="relative z-10 flex items-center justify-between gap-2 pt-1 shrink-0">
                          <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-[#85C7F2]">
                            <RotateCw
                              aria-hidden="true"
                              className="w-3 h-3 shrink-0"
                            />
                            <span>
                              {bi('Tap to flip back', 'Dinani kubwerera')}
                            </span>
                          </span>

                          {item.to && (
                            <Link
                              to={item.to}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#00AEEF] hover:bg-[#33C1F5] text-[#052C5A] text-[10px] sm:text-xs font-bold transition-colors whitespace-nowrap"
                            >
                              <span>
                                {item.linkLabel ??
                                  bi('Open', 'Tsegulani')}
                              </span>
                              <ArrowRight
                                aria-hidden="true"
                                className="w-3 h-3"
                              />
                            </Link>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
