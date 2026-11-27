import {useCallback, useEffect, useState} from 'react';

interface UseChainAnimationOptions {
  totalSteps: number;
  intervalMs?: number;
  loop?: boolean;
}

export function useChainAnimation({
  totalSteps,
  intervalMs = 1500,
  loop = false,
}: UseChainAnimationOptions) {
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const play = useCallback(() => {
    if (totalSteps <= 0) return;
    setActiveStep((prev) => (prev < 0 || prev >= totalSteps - 1 ? 0 : prev));
    setIsPlaying(true);
  }, [totalSteps]);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const restart = useCallback(() => {
    if (totalSteps <= 0) return;
    setActiveStep(0);
    setIsPlaying(true);
  }, [totalSteps]);

  const nextStep = useCallback(() => {
    if (totalSteps <= 0) return;
    setIsPlaying(false);
    setActiveStep((prev) => {
      if (prev < 0) return 0;
      if (prev + 1 >= totalSteps) return loop ? 0 : totalSteps - 1;
      return prev + 1;
    });
  }, [totalSteps, loop]);

  const selectStep = useCallback((index: number) => {
    setIsPlaying(false);
    setActiveStep(index);
  }, []);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setActiveStep(-1);
  }, []);

  useEffect(() => {
    if (!isPlaying || totalSteps <= 0) return;

    const timer = window.setInterval(() => {
      setActiveStep((prev) => {
        if (prev + 1 >= totalSteps) {
          if (loop) {
            return 0;
          }
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [isPlaying, totalSteps, intervalMs, loop]);

  useEffect(() => {
    setActiveStep(-1);
    setIsPlaying(false);
  }, [totalSteps]);

  return {
    activeStep,
    isPlaying,
    play,
    pause,
    restart,
    nextStep,
    selectStep,
    reset,
  };
}
