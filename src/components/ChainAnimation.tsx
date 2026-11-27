import {
  ArrowDown,
  ArrowUp,
  Info,
  Minus,
  Pause,
  Play,
  RotateCcw,
  StepForward,
} from 'lucide-react';
import {motion} from 'motion/react';
import {useApp} from '../context/AppContext';
import {useChainAnimation} from '../hooks/useChainAnimation';
import type {ChainSequence} from '../types';

interface ChainAnimationProps {
  chain: ChainSequence;
}

export function ChainAnimation({chain}: ChainAnimationProps) {
  const {t, ui, openSourceModal} = useApp();
  const {activeStep, isPlaying, play, pause, restart, nextStep, selectStep} =
    useChainAnimation({
      totalSteps: chain.steps.length,
      intervalMs: 1400,
    });

  const isInterpretation =
    chain.source.sourceType === 'platform_interpretation';

  const progressPct =
    activeStep >= 0
      ? Math.round(((activeStep + 1) / Math.max(chain.steps.length, 1)) * 100)
      : 0;

  return (
    <section
      aria-label={t(chain.title)}
      className="bg-[#031F42] text-white rounded-3xl p-6 sm:p-8 shadow-xl"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 pb-5">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-bold text-[#00AEEF]">
            <span>WHAT LEADS TO WHAT</span>
            <button
              type="button"
              onClick={() => openSourceModal(chain.source)}
              aria-label={`Source details for ${t(chain.title)}`}
              className="p-1 rounded-full hover:bg-[#052C5A] text-[#B8D9F8] hover:text-white cursor-pointer"
            >
              <Info aria-hidden="true" className="w-3.5 h-3.5" />
            </button>
          </div>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
            {t(chain.title)}
            {isInterpretation ? '*' : ''}
          </h3>
          <p className="text-sm text-[#CFE8FC] leading-relaxed">
            {t(chain.description)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {!isPlaying ? (
            <motion.button
              type="button"
              whileTap={{scale: 0.96}}
              onClick={play}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#00AEEF] hover:bg-[#33C1F5] text-[#052C5A] font-bold text-sm whitespace-nowrap transition-colors cursor-pointer"
            >
              <Play aria-hidden="true" className="w-4 h-4 fill-current" />
              <span>{ui('playChain')}</span>
            </motion.button>
          ) : (
            <motion.button
              type="button"
              whileTap={{scale: 0.96}}
              onClick={pause}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-[#F3F6FB] text-[#052C5A] font-bold text-sm whitespace-nowrap transition-colors cursor-pointer"
            >
              <Pause aria-hidden="true" className="w-4 h-4 fill-current" />
              <span>Pause</span>
            </motion.button>
          )}

          <motion.button
            type="button"
            whileTap={{scale: 0.96}}
            onClick={nextStep}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#052C5A] hover:bg-[#0A3A72] text-white text-sm font-medium whitespace-nowrap transition-colors cursor-pointer"
          >
            <StepForward aria-hidden="true" className="w-4 h-4" />
            <span>Next step</span>
          </motion.button>

          <motion.button
            type="button"
            whileTap={{scale: 0.96}}
            onClick={restart}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#052C5A] hover:bg-[#0A3A72] text-[#B8D9F8] hover:text-white text-sm font-medium whitespace-nowrap transition-colors cursor-pointer"
          >
            <RotateCcw aria-hidden="true" className="w-4 h-4" />
            <span>Restart</span>
          </motion.button>
        </div>
      </div>

      <div className="mt-4 h-1.5 w-full rounded-full bg-[#052C5A] overflow-hidden">
        <motion.div
          animate={{width: `${progressPct}%`}}
          transition={{duration: 0.35, ease: [0.16, 1, 0.3, 1]}}
          className="h-full rounded-full bg-[#00AEEF]"
        />
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {chain.steps.map((step, index) => {
          const isActive = index === activeStep;
          const isReached = activeStep >= index;

          const DirIcon =
            step.direction === 'up'
              ? ArrowUp
              : step.direction === 'down'
              ? ArrowDown
              : Minus;

          return (
            <motion.button
              key={step.id}
              type="button"
              onClick={() => selectStep(index)}
              animate={{scale: isActive ? 1.02 : 1}}
              whileHover={{y: -2}}
              whileTap={{scale: 0.98}}
              transition={{type: 'spring', stiffness: 360, damping: 25}}
              className={`w-full h-full text-left p-4 rounded-2xl transition-all duration-200 cursor-pointer shadow-md ${
                isActive
                  ? 'bg-white text-[#052C5A] shadow-xl'
                  : isReached
                  ? 'bg-[#F3F6FB] text-[#052C5A]'
                  : 'bg-[#052C5A] text-white hover:bg-[#0A3A72]'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`font-display-num text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-[#00AEEF] text-[#052C5A]'
                      : isReached
                      ? 'bg-[#052C5A] text-white'
                      : 'bg-[#031F42] text-[#85C7F2]'
                  }`}
                >
                  Step {index + 1}
                </span>
                <DirIcon
                  aria-hidden="true"
                  className={`w-4 h-4 ${
                    isActive || isReached ? 'text-[#00AEEF]' : 'text-[#85C7F2]'
                  }`}
                />
              </div>
              <div className="mt-2.5 font-display font-bold text-base">
                {t(step.label)}
              </div>
              <p
                className={`mt-1 text-xs sm:text-sm leading-relaxed ${
                  isActive || isReached ? 'text-[#475E78]' : 'text-[#CFE8FC]'
                }`}
              >
                {t(step.detail)}
              </p>
            </motion.button>
          );
        })}
      </div>

      {isInterpretation && (
        <p className="mt-5 text-xs text-[#B8D9F8]">
          * This is an interpretation by Economics Made Simple based on information in the original report.
        </p>
      )}
    </section>
  );
}
