import {ArrowDown, ArrowRight, Pause, Play, RotateCcw, StepForward} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';
import {useEffect, useState} from 'react';
import {useApp} from '../../context/AppContext';
import type {SourceReference} from '../../types';
import {SourceInfoButton} from './SourceInformationModal';

export interface CauseEffectStepItem {
  id: string;
  label: string;
  labelNy?: string;
  detail: string;
  detailNy?: string;
  direction?: 'up' | 'down' | 'neutral';
}

interface CauseEffectChainProps {
  title: string;
  subtitle: string;
  steps: CauseEffectStepItem[];
  source: SourceReference;
  isInterpretation?: boolean;
}

export function CauseEffectChain({
  title,
  subtitle,
  steps,
  source,
  isInterpretation = true,
}: CauseEffectChainProps) {
  const {bi} = useApp();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => {
        if (prev + 1 >= steps.length) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1700);
    return () => window.clearInterval(timer);
  }, [isPlaying, steps.length]);

  const activeStep = steps[activeIndex] ?? steps[0];
  const progressPct = Math.round(((activeIndex + 1) / Math.max(steps.length, 1)) * 100);

  const handleReset = () => {
    setIsPlaying(false);
    setActiveIndex(0);
  };

  const handleTogglePlay = () => {
    if (!isPlaying && activeIndex >= steps.length - 1) {
      setActiveIndex(0);
    }
    setIsPlaying((prev) => !prev);
  };

  const handleStepNext = () => {
    setIsPlaying(false);
    setActiveIndex((prev) => (prev + 1 < steps.length ? prev + 1 : 0));
  };

  return (
    <div className="bg-[#031F42] text-white rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-5">
        <div className="space-y-1">
          <div className="text-xs font-bold text-[#00AEEF]">
            {isInterpretation
              ? bi('WHAT LEADS TO WHAT*', 'CHOYAMBITSA NDI CHOTSATIRA*')
              : bi('STEP-BY-STEP FLOW', 'NDONDOMEKO YA MASITEPE')}
          </div>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
            {title}
          </h3>
          <p className="text-sm text-[#CFE8FC] max-w-2xl">{subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <motion.button
            type="button"
            whileTap={{scale: 0.96}}
            onClick={handleTogglePlay}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#00AEEF] hover:bg-[#33C1F5] text-[#052C5A] font-bold text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-colors"
          >
            {isPlaying ? (
              <>
                <Pause aria-hidden="true" className="w-4 h-4" />
                <span>{bi('Pause', 'Imani')}</span>
              </>
            ) : (
              <>
                <Play aria-hidden="true" className="w-4 h-4" />
                <span>{bi('Play chain', 'Yendetsani masitepe')}</span>
              </>
            )}
          </motion.button>

          <motion.button
            type="button"
            whileTap={{scale: 0.96}}
            onClick={handleStepNext}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#052C5A] hover:bg-[#0A3A72] text-white font-semibold text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-colors"
          >
            <StepForward aria-hidden="true" className="w-4 h-4" />
            <span>{bi('Step', 'Sitepe')}</span>
          </motion.button>

          <motion.button
            type="button"
            whileTap={{scale: 0.96}}
            onClick={handleReset}
            aria-label={bi('Reset chain to step 1', 'Bwezerani ku sitepe yoyamba')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#052C5A] hover:bg-[#0A3A72] text-[#B8D9F8] hover:text-white font-semibold text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-colors"
          >
            <RotateCcw aria-hidden="true" className="w-4 h-4" />
            <span>{bi('Reset', 'Yambiraninso')}</span>
          </motion.button>

          <SourceInfoButton source={source} label={title} dark />
        </div>
      </div>

      <div className="h-1.5 w-full rounded-full bg-[#052C5A] overflow-hidden">
        <motion.div
          animate={{width: `${progressPct}%`}}
          transition={{duration: 0.35, ease: [0.16, 1, 0.3, 1]}}
          className="h-full rounded-full bg-[#00AEEF]"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 space-y-2.5">
          {steps.map((step, idx) => {
            const isCurrent = idx === activeIndex;
            const isReached = idx <= activeIndex;

            return (
              <div key={step.id} className="space-y-2">
                <motion.button
                  type="button"
                  whileHover={{x: 3}}
                  whileTap={{scale: 0.99}}
                  onClick={() => {
                    setIsPlaying(false);
                    setActiveIndex(idx);
                  }}
                  aria-current={isCurrent ? 'step' : undefined}
                  className={`w-full text-left p-4 rounded-xl transition-all flex items-center justify-between gap-4 cursor-pointer shadow-md ${
                    isCurrent
                      ? 'bg-white text-[#052C5A] shadow-xl'
                      : isReached
                      ? 'bg-[#F3F6FB] text-[#052C5A]'
                      : 'bg-[#052C5A] text-[#B8D9F8] hover:bg-[#0A3A72]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-8 h-8 rounded-full font-mono text-xs font-extrabold flex items-center justify-center shrink-0 tabular-nums transition-colors ${
                        isCurrent
                          ? 'bg-[#00AEEF] text-[#052C5A]'
                          : isReached
                          ? 'bg-[#052C5A] text-white'
                          : 'bg-[#031F42] text-[#85C7F2]'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className="font-display font-bold text-sm sm:text-base">
                      {bi(step.label, step.labelNy ?? step.label)}
                    </span>
                  </div>
                  <ArrowRight
                    aria-hidden="true"
                    className={`w-4 h-4 shrink-0 transition-opacity ${
                      isCurrent ? 'opacity-100 text-[#00AEEF]' : 'opacity-40'
                    }`}
                  />
                </motion.button>

                {idx < steps.length - 1 && (
                  <div className="pl-7">
                    <ArrowDown
                      aria-hidden="true"
                      className={`w-4 h-4 transition-colors ${
                        idx < activeIndex ? 'text-[#00AEEF]' : 'text-[#85C7F2]/40'
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.id}
              initial={{opacity: 0, y: 8}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -8}}
              transition={{duration: 0.18, ease: [0.16, 1, 0.3, 1]}}
              className="bg-[#F3F6FB] text-[#052C5A] rounded-2xl p-6 space-y-4"
            >
              <div className="text-xs font-mono font-bold text-[#00AEEF] tabular-nums">
                {bi(
                  `STEP ${activeIndex + 1} OF ${steps.length}`,
                  `SITEPE ${activeIndex + 1} PA ${steps.length}`
                )}
              </div>
              <h4 className="font-display font-extrabold text-xl text-[#052C5A]">
                {bi(activeStep.label, activeStep.labelNy ?? activeStep.label)}
              </h4>
              <p className="text-sm sm:text-base text-[#475E78] leading-relaxed">
                {bi(activeStep.detail, activeStep.detailNy ?? activeStep.detail)}
              </p>

              {isInterpretation && (
                <div className="pt-2 text-xs text-[#475E78] leading-relaxed">
                  {bi(
                    '* Explanatory chain built from the report’s discussion on Pages 17–18.',
                    '* Ndondomeko yofotokozerayi yachokera pa nkhani za m’lipoti pa Masamba 17–18.'
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
