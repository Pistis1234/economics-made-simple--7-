import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Info,
  Minus,
  Pause,
  Play,
  RotateCw,
} from 'lucide-react';
import {motion} from 'motion/react';
import {useEffect, useState} from 'react';
import {useApp} from '../context/AppContext';
import type {SourceReference} from '../types';

export interface FlipChainStep {
  id: string;
  direction: 'up' | 'down' | 'neutral';
  headline: string;
  plainExplanation: string;
  everydayNote?: string;
  pageShort?: string;
  source?: SourceReference;
}

interface TopicFlipChainProps {
  title: string;
  subtitle?: string;
  steps: FlipChainStep[];
  defaultSource?: SourceReference;
  backgroundImage?: string;
  onInspectSource: (source: SourceReference) => void;
}

export function TopicFlipChain({
  title,
  subtitle,
  steps,
  defaultSource,
  backgroundImage,
  onInspectSource,
}: TopicFlipChainProps) {
  const {bi} = useApp();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const safeSteps = steps.length > 0 ? steps : [];

  useEffect(() => {
    setActiveIndex(0);
    setIsFlipped(false);
    setIsPlaying(false);
  }, [title, safeSteps.length]);

  // "Play the chain": flip open current step, then advance to the next step automatically
  useEffect(() => {
    if (!isPlaying || safeSteps.length === 0) return;

    const flipTimer = window.setTimeout(() => {
      setIsFlipped(true);
    }, 650);

    const advanceTimer = window.setTimeout(() => {
      setIsFlipped(false);
      setActiveIndex((prev) => {
        if (prev >= safeSteps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 3400);

    return () => {
      window.clearTimeout(flipTimer);
      window.clearTimeout(advanceTimer);
    };
  }, [isPlaying, activeIndex, safeSteps.length]);

  if (safeSteps.length === 0) {
    return null;
  }

  const currentStep = safeSteps[activeIndex] ?? safeSteps[0];
  const stepSource = currentStep.source ?? defaultSource;
  const numStr = String(activeIndex + 1).padStart(2, '0');

  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    if (activeIndex >= safeSteps.length - 1) {
      setActiveIndex(0);
    }
    setIsFlipped(false);
    setIsPlaying(true);
  };

  const handleSelectStep = (idx: number) => {
    setIsPlaying(false);
    setIsFlipped(false);
    setActiveIndex(idx);
  };

  const DirectionIcon =
    currentStep.direction === 'up'
      ? ArrowUp
      : currentStep.direction === 'down'
        ? ArrowDown
        : Minus;

  const directionText =
    currentStep.direction === 'up'
      ? bi('Goes up', 'Zikukwera')
      : currentStep.direction === 'down'
        ? bi('Goes down', 'Zikutsika')
        : bi('Steady pressure', 'Zikukhalabe');

  const directionColorClass =
    currentStep.direction === 'up'
      ? 'text-[#4ADE80]'
      : currentStep.direction === 'down'
        ? 'text-[#FBBF24]'
        : 'text-[#85C7F2]';

  return (
    <section className="space-y-4">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2
            className="font-display font-extrabold text-xl sm:text-2xl text-white leading-snug"
            style={{textWrap: 'balance'}}
          >
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-[#B8D9F8]">
            {subtitle ??
              bi(
                'Tap any card to flip for a plain explanation',
                'Dinani khadi kuti muone kufotokoza kosavuta'
              )}
          </p>
        </div>

        <button
          type="button"
          onClick={handleTogglePlay}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#00AEEF] hover:bg-[#33C1F5] text-[#052C5A] text-xs sm:text-sm font-extrabold shadow-lg transition-colors self-start sm:self-auto cursor-pointer shrink-0"
        >
          {isPlaying ? (
            <>
              <Pause aria-hidden="true" className="w-4 h-4 fill-current" />
              <span>{bi('Pause chain', 'Imani pang’ono')}</span>
            </>
          ) : (
            <>
              <Play aria-hidden="true" className="w-4 h-4 fill-current" />
              <span>{bi('Play the chain', 'Yambani ndondomeko')}</span>
            </>
          )}
        </button>
      </div>

      {/* Step Pill Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {safeSteps.map((step, idx) => {
          const isCurrent = idx === activeIndex;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => handleSelectStep(idx)}
              className={`font-display-num shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                isCurrent
                  ? 'bg-[#00AEEF] text-[#052C5A] shadow-md'
                  : 'bg-[#031F42] text-[#B8D9F8] hover:bg-[#0A3A72] hover:text-white'
              }`}
            >
              {String(idx + 1).padStart(2, '0')}
            </button>
          );
        })}
      </div>

      {/* 3D Flippable Active Chain Card (Outer wrapper has NO overflow-hidden) */}
      <div style={{perspective: '1200px'}}>
        <div
          role="button"
          tabIndex={0}
          aria-pressed={isFlipped}
          onClick={() => {
            setIsPlaying(false);
            setIsFlipped((prev) => !prev);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsPlaying(false);
              setIsFlipped((prev) => !prev);
            }
          }}
          className="relative w-full min-h-[240px] sm:min-h-[250px] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#00AEEF] rounded-3xl"
        >
          <motion.div
            key={currentStep.id}
            animate={{rotateY: isFlipped ? 180 : 0}}
            transition={{duration: 0.48, ease: [0.16, 1, 0.3, 1]}}
            style={{transformStyle: 'preserve-3d'}}
            className="relative w-full min-h-[240px] sm:min-h-[250px]"
          >
            {/* FRONT FACE */}
            <div
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
              className="relative w-full min-h-[240px] sm:min-h-[250px] overflow-hidden rounded-3xl bg-[#031F42] p-6 sm:p-8 flex flex-col justify-between shadow-xl"
            >
              {backgroundImage && (
                <>
                  <img
                    src={backgroundImage}
                    alt=""
                    aria-hidden="true"
                    referrerPolicy="no-referrer"
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-22"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#031F42]/92 via-[#031F42]/80 to-[#052C5A]/95"
                  />
                </>
              )}

              <div className="relative z-10 flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold">
                  <span className="font-display-num text-[#00AEEF]">
                    {numStr}
                  </span>
                  <span className="text-white/40">·</span>
                  <span
                    className={`inline-flex items-center gap-1 ${directionColorClass}`}
                  >
                    <DirectionIcon aria-hidden="true" className="w-3.5 h-3.5" />
                    <span>{directionText}</span>
                  </span>
                </div>

                {stepSource && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onInspectSource(stepSource);
                    }}
                    aria-label={bi(
                      `View source for step ${numStr}`,
                      `Onani gwero la sitepe ${numStr}`
                    )}
                    className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#00AEEF] hover:text-[#052C5A] text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  >
                    <Info aria-hidden="true" className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="relative z-10 my-4">
                <h3
                  className="font-display font-bold text-xl sm:text-3xl text-white leading-snug"
                  style={{textWrap: 'balance'}}
                >
                  {currentStep.headline}
                </h3>
              </div>

              <div className="relative z-10 flex items-center justify-between gap-3 text-xs sm:text-sm text-[#9AC2EA]">
                <span className="inline-flex items-center gap-1.5 font-semibold text-[#85C7F2]">
                  <RotateCw aria-hidden="true" className="w-3.5 h-3.5" />
                  <span>{bi('Tap to explain', 'Dinani kuti mumve')}</span>
                </span>
                {currentStep.pageShort && (
                  <span className="font-display-num font-medium">
                    {currentStep.pageShort}
                  </span>
                )}
              </div>
            </div>

            {/* BACK FACE */}
            <div
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
              className="absolute inset-0 w-full h-full overflow-hidden rounded-3xl bg-[#0A3A72] p-6 sm:p-8 flex flex-col justify-between shadow-2xl"
            >
              {backgroundImage && (
                <>
                  <img
                    src={backgroundImage}
                    alt=""
                    aria-hidden="true"
                    referrerPolicy="no-referrer"
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-20"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0A3A72]/94 via-[#052C5A]/88 to-[#031F42]/95"
                  />
                </>
              )}

              <div className="relative z-10 flex items-center justify-between gap-3">
                <div className="font-display-num text-xs sm:text-sm font-bold text-[#85C7F2]">
                  {numStr} · {bi('In daily life', 'Pa moyo wa tsiku ndi tsiku')}
                </div>

                {stepSource && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onInspectSource(stepSource);
                    }}
                    aria-label={bi(
                      `View source for step ${numStr}`,
                      `Onani gwero la sitepe ${numStr}`
                    )}
                    className="w-9 h-9 rounded-xl bg-white/15 hover:bg-[#00AEEF] hover:text-[#052C5A] text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  >
                    <Info aria-hidden="true" className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="relative z-10 my-3 space-y-2.5 overflow-y-auto pr-1">
                <p className="text-sm sm:text-base text-white leading-relaxed font-medium">
                  {currentStep.plainExplanation}
                </p>
                {currentStep.everydayNote && (
                  <p className="text-xs sm:text-sm text-[#6AE4FF] font-semibold leading-relaxed">
                    {currentStep.everydayNote}
                  </p>
                )}
              </div>

              <div className="relative z-10 flex items-center justify-between gap-3 text-xs sm:text-sm text-[#CFE8FC]">
                <span className="inline-flex items-center gap-1.5 font-semibold text-white">
                  <RotateCw aria-hidden="true" className="w-3.5 h-3.5" />
                  <span>{bi('Tap to return', 'Dinani kubwerera')}</span>
                </span>
                {currentStep.pageShort && (
                  <span className="font-display-num font-medium text-[#B8D9F8]">
                    {currentStep.pageShort}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Step Prev / Next Navigation Row */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <button
          type="button"
          disabled={activeIndex === 0}
          onClick={() => handleSelectStep(Math.max(0, activeIndex - 1))}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#031F42] text-xs font-bold text-[#B8D9F8] hover:bg-[#0A3A72] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
        >
          <ArrowLeft aria-hidden="true" className="w-3.5 h-3.5" />
          <span>{bi('Previous step', 'Sitepe yapita')}</span>
        </button>

        <span className="font-display-num text-xs text-[#9AC2EA]">
          {activeIndex + 1} / {safeSteps.length}
        </span>

        <button
          type="button"
          disabled={activeIndex >= safeSteps.length - 1}
          onClick={() =>
            handleSelectStep(Math.min(safeSteps.length - 1, activeIndex + 1))
          }
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#031F42] text-xs font-bold text-[#B8D9F8] hover:bg-[#0A3A72] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
        >
          <span>{bi('Next step', 'Sitepe yotsatira')}</span>
          <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
}
