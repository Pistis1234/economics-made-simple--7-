import {ArrowDown, ArrowUp, Minus} from 'lucide-react';
import {motion} from 'motion/react';
import {useApp} from '../../context/AppContext';
import type {StoryIndicatorData} from '../../data/malawiGrowth2026';
import {useCountUp} from '../../hooks/useCountUp';
import {formatIndicatorNumber} from '../../utils/formatting';
import {SourceInfoButton} from './SourceInformationModal';

interface EconomicIndicatorCardProps {
  indicator: StoryIndicatorData;
}

export function EconomicIndicatorCard({indicator}: EconomicIndicatorCardProps) {
  const {bi} = useApp();
  const {ref, displayValue} = useCountUp({
    target: indicator.value,
    decimals: indicator.decimals ?? 1,
    startOnMount: true,
  });

  const formattedValue = formatIndicatorNumber(
    displayValue,
    indicator.decimals ?? 1,
    indicator.prefix ?? '',
    indicator.suffix ?? ''
  );

  const TrendIcon =
    indicator.direction === 'up'
      ? ArrowUp
      : indicator.direction === 'down'
      ? ArrowDown
      : Minus;

  const pageChip = indicator.source.pageReference
    .split('·')[0]
    .trim()
    .replace('Pages', bi('Pages', 'Masamba'))
    .replace('Page', bi('Page', 'Tsamba'));

  const label = bi(indicator.label, indicator.labelNy);
  const statusNote = bi(indicator.statusNote, indicator.statusNoteNy);
  const explanation = bi(indicator.explanation, indicator.explanationNy);
  const directionText = indicator.directionText
    ? bi(indicator.directionText, indicator.directionTextNy ?? indicator.directionText)
    : undefined;

  return (
    <motion.article
      ref={ref}
      whileHover={{y: -2}}
      transition={{duration: 0.18, ease: [0.16, 1, 0.3, 1]}}
      className="bg-[#F3F6FB] hover:bg-white text-[#052C5A] rounded-2xl p-6 flex flex-col justify-between transition-colors shadow-lg"
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="text-xs text-[#475E78] flex items-center gap-1.5 flex-wrap">
            <span className="font-bold text-[#052C5A]">{pageChip}</span>
            <span aria-hidden="true">·</span>
            <span>{statusNote}</span>
          </div>

          <SourceInfoButton source={indicator.source} label={label} />
        </div>

        <div className="mt-4 rounded-xl px-4 py-3.5 bg-white shadow-sm">
          <div className="font-display-num font-extrabold text-4xl sm:text-5xl tracking-tight text-[#052C5A]">
            {formattedValue}
          </div>
        </div>

        <h3 className="mt-4 font-display font-bold text-lg text-[#052C5A]">
          {label}
        </h3>

        {directionText && (
          <div className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-bold text-[#00AEEF]">
            <TrendIcon aria-hidden="true" className="w-3.5 h-3.5" />
            <span>{directionText}</span>
          </div>
        )}

        <p className="mt-3 pt-2 text-sm text-[#475E78] leading-relaxed">
          {explanation}
        </p>
      </div>
    </motion.article>
  );
}
