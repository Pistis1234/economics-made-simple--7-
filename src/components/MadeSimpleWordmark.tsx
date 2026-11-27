import {motion, useReducedMotion} from 'motion/react';

interface MadeSimpleWordmarkProps {
  madeText?: string;
  simpleText?: string;
  className?: string;
  wordClassName?: string;
}

/**
 * Animates two words in a continuous sequential spin-and-pause cycle:
 * first word spins 360° -> pause -> second word spins 360° -> pause -> repeats.
 */
export function MadeSimpleWordmark({
  madeText = 'Made',
  simpleText = 'Simple',
  className = '',
  wordClassName = '',
}: MadeSimpleWordmarkProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <span className={`inline-flex items-baseline gap-[0.26em] ${className}`}>
        <span className={wordClassName}>{madeText}</span>
        <span className={wordClassName}>{simpleText}</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-baseline gap-[0.26em] ${className}`}
      style={{perspective: 750}}
    >
      <motion.span
        className={`inline-block origin-center will-change-transform ${wordClassName}`}
        style={{transformStyle: 'preserve-3d'}}
        animate={{
          rotateY: [0, 180, 360, 360, 360],
          scale: [1, 1.07, 1, 1, 1],
        }}
        transition={{
          duration: 4.2,
          times: [0, 0.11, 0.22, 0.5, 1],
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      >
        {madeText}
      </motion.span>
      <motion.span
        className={`inline-block origin-center will-change-transform ${wordClassName}`}
        style={{transformStyle: 'preserve-3d'}}
        animate={{
          rotateY: [0, 0, 180, 360, 360],
          scale: [1, 1, 1.07, 1, 1],
        }}
        transition={{
          duration: 4.2,
          times: [0, 0.36, 0.47, 0.58, 1],
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      >
        {simpleText}
      </motion.span>
    </span>
  );
}
