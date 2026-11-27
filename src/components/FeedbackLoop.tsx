import {Info, Pause, Play, RotateCcw, StepForward} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';
import {useEffect, useMemo} from 'react';
import {useApp} from '../context/AppContext';
import {useChainAnimation} from '../hooks/useChainAnimation';
import type {FeedbackLoopData} from '../types';

interface FeedbackLoopProps {
  loop: FeedbackLoopData;
}

export function FeedbackLoop({loop}: FeedbackLoopProps) {
  const {t, openSourceModal} = useApp();
  const {activeStep, isPlaying, play, pause, restart, nextStep, selectStep} =
    useChainAnimation({
      totalSteps: loop.nodes.length,
      intervalMs: 1700,
      loop: true,
    });

  useEffect(() => {
    if (activeStep === -1 && loop.nodes.length > 0) {
      selectStep(0);
    }
  }, [activeStep, loop.nodes.length, selectStep]);

  const isTrap = loop.type === 'trap';
  const accentColor = isTrap ? '#00AEEF' : '#85C7F2';

  const size = 440;
  const center = size / 2;
  const radius = 152;

  const nodeGeometry = useMemo(() => {
    const total = loop.nodes.length;
    return loop.nodes.map((node, index) => {
      const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
      const nextAngle = ((index + 1) / total) * Math.PI * 2 - Math.PI / 2;
      const x = center + Math.cos(angle) * radius;
      const y = center + Math.sin(angle) * radius;

      const arcStartAngle = angle + 0.24;
      const arcEndAngle = nextAngle - 0.24;
      const sx = center + Math.cos(arcStartAngle) * radius;
      const sy = center + Math.sin(arcStartAngle) * radius;
      const ex = center + Math.cos(arcEndAngle) * radius;
      const ey = center + Math.sin(arcEndAngle) * radius;

      const midAngle = (arcStartAngle + arcEndAngle) / 2;
      const ctrlR = radius + 24;
      const cx = center + Math.cos(midAngle) * ctrlR;
      const cy = center + Math.sin(midAngle) * ctrlR;

      return {
        node,
        index,
        x,
        y,
        pathD: `M ${sx} ${sy} Q ${cx} ${cy} ${ex} ${ey}`,
      };
    });
  }, [loop.nodes, center, radius]);

  const currentIndex = activeStep >= 0 ? activeStep : 0;
  const activeNode = loop.nodes[currentIndex] ?? loop.nodes[0];
  const isInterpretation = loop.source.sourceType === 'platform_interpretation';

  return (
    <article className="bg-[#031F42] text-white rounded-3xl p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-6">
        <div>
          <div className="text-xs font-bold tracking-wider text-[#00AEEF]">
            {t(loop.subtitle)}
          </div>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-white mt-1">
            {t(loop.title)}
            {isInterpretation ? '*' : ''}
          </h3>
          <p className="mt-2 text-sm text-[#CFE8FC] max-w-2xl leading-relaxed">
            {t(loop.summary)}
          </p>
        </div>

        <button
          type="button"
          onClick={() => openSourceModal(loop.source)}
          aria-label={`Source information for ${t(loop.title)}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0A3A72] hover:bg-[#164273] text-xs font-semibold text-[#B8D9F8] hover:text-white shrink-0 self-start cursor-pointer transition-colors"
        >
          <Info aria-hidden="true" className="w-3.5 h-3.5" />
          <span>Source info</span>
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative w-full max-w-[440px] aspect-square">
            <svg
              viewBox={`0 0 ${size} ${size}`}
              className="w-full h-full"
              aria-hidden="true"
            >
              <defs>
                <marker
                  id={`arrow-idle-${loop.id}`}
                  viewBox="0 0 10 10"
                  refX="7"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="rgba(184,217,248,0.45)" />
                </marker>
                <marker
                  id={`arrow-active-${loop.id}`}
                  viewBox="0 0 10 10"
                  refX="7"
                  refY="5"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill={accentColor} />
                </marker>
              </defs>

              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="#164273"
                strokeWidth="1.5"
              />

              {nodeGeometry.map(({index, pathD}) => {
                const isActiveArrow = index === currentIndex;
                return (
                  <path
                    key={`arc-${loop.id}-${index}`}
                    d={pathD}
                    fill="none"
                    stroke={isActiveArrow ? accentColor : '#2B5B94'}
                    strokeWidth={isActiveArrow ? 3 : 2}
                    strokeDasharray={isActiveArrow ? '7 5' : undefined}
                    className={isActiveArrow ? 'animate-flow-dash' : undefined}
                    strokeLinecap="round"
                    markerEnd={
                      isActiveArrow
                        ? `url(#arrow-active-${loop.id})`
                        : `url(#arrow-idle-${loop.id})`
                    }
                  />
                );
              })}
            </svg>

            <motion.div
              key={currentIndex}
              initial={{scale: 0.96}}
              animate={{scale: 1}}
              transition={{duration: 0.2, ease: [0.16, 1, 0.3, 1]}}
              style={{left: '50%', top: '50%'}}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-[128px] h-[128px] sm:w-[140px] sm:h-[140px] rounded-full bg-[#F3F6FB] shadow-xl flex flex-col items-center justify-center text-center p-3 pointer-events-none"
            >
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#00AEEF]">
                {isTrap ? 'Reinforcing Trap' : 'Balancing Brake'}
              </span>
              <span className="font-display font-bold text-xs sm:text-sm text-[#052C5A] mt-1 leading-tight">
                {isTrap ? 'Cycle repeats' : 'Moves toward balance'}
              </span>
            </motion.div>

            {nodeGeometry.map(({node, index, x, y}) => {
              const isSelected = index === currentIndex;
              const leftPct = (x / size) * 100;
              const topPct = (y / size) * 100;

              return (
                <motion.button
                  key={node.id}
                  type="button"
                  onClick={() => selectStep(index)}
                  animate={{scale: isSelected ? 1.07 : 1}}
                  whileHover={{scale: 1.08}}
                  whileTap={{scale: 0.95}}
                  transition={{type: 'spring', stiffness: 360, damping: 24}}
                  style={{left: `${leftPct}%`, top: `${topPct}%`}}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-[110px] sm:w-[126px] min-h-[60px] px-2.5 py-2 rounded-xl text-center cursor-pointer flex flex-col items-center justify-center shadow-lg ${
                    isSelected
                      ? 'z-20 bg-white text-[#052C5A]'
                      : 'z-10 bg-[#052C5A] text-white hover:bg-[#0A3A72]'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full font-display-num text-[10px] font-bold flex items-center justify-center mb-1 ${
                      isSelected
                        ? 'bg-[#00AEEF] text-[#052C5A]'
                        : 'bg-[#031F42] text-[#85C7F2]'
                    }`}
                  >
                    0{index + 1}
                  </span>
                  <span className="font-display font-bold text-[11px] sm:text-xs leading-tight">
                    {t(node.label)}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            {!isPlaying ? (
              <motion.button
                type="button"
                whileTap={{scale: 0.96}}
                onClick={play}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00AEEF] text-[#052C5A] font-bold text-xs sm:text-sm cursor-pointer hover:bg-[#33C1F5]"
              >
                <Play aria-hidden="true" className="w-4 h-4 fill-current" />
                <span>Play cycle</span>
              </motion.button>
            ) : (
              <motion.button
                type="button"
                whileTap={{scale: 0.96}}
                onClick={pause}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#052C5A] font-bold text-xs sm:text-sm cursor-pointer hover:bg-[#F3F6FB]"
              >
                <Pause aria-hidden="true" className="w-4 h-4 fill-current" />
                <span>Pause</span>
              </motion.button>
            )}

            <motion.button
              type="button"
              whileTap={{scale: 0.96}}
              onClick={nextStep}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#052C5A] hover:bg-[#0A3A72] text-xs sm:text-sm font-medium text-white cursor-pointer transition-colors"
            >
              <StepForward aria-hidden="true" className="w-4 h-4" />
              <span>Next</span>
            </motion.button>

            <motion.button
              type="button"
              whileTap={{scale: 0.96}}
              onClick={restart}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#052C5A] hover:bg-[#0A3A72] text-xs sm:text-sm font-medium text-[#B8D9F8] hover:text-white cursor-pointer transition-colors"
            >
              <RotateCcw aria-hidden="true" className="w-4 h-4" />
              <span>Restart</span>
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            {activeNode && (
              <motion.div
                key={activeNode.id}
                initial={{opacity: 0, x: 10}}
                animate={{opacity: 1, x: 0}}
                exit={{opacity: 0, x: -10}}
                transition={{duration: 0.18, ease: [0.16, 1, 0.3, 1]}}
                className="bg-[#F3F6FB] text-[#052C5A] rounded-2xl p-5 space-y-2.5"
              >
                <div className="text-xs font-bold flex items-center gap-2 text-[#00AEEF]">
                  <span>
                    Step {currentIndex + 1} of {loop.nodes.length}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#475E78]">{t(activeNode.impactTag)}</span>
                </div>
                <h4 className="font-display font-bold text-lg text-[#052C5A]">
                  {t(activeNode.label)}
                </h4>
                <p className="text-sm text-[#475E78] leading-relaxed">
                  {t(activeNode.detail)}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {isInterpretation && (
            <p className="text-xs text-[#B8D9F8] leading-relaxed">
              * This is an interpretation by Economics Made Simple based on information in the original report.
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
