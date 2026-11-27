import {motion, useReducedMotion} from 'motion/react';
import {useApp} from '../../context/AppContext';
import {AnimatedNumber} from '../AnimatedNumber';

export interface ComparisonBarItem {
  id: string;
  group: string;
  groupNy?: string;
  previousLabel: string;
  previousLabelNy?: string;
  previousValue: number;
  currentLabel: string;
  currentLabelNy?: string;
  currentValue: number;
  deltaText: string;
  deltaTextNy?: string;
}

interface ComparisonBarProps {
  items: ComparisonBarItem[];
  maxScale?: number;
  unit?: string;
}

export function ComparisonBar({
  items,
  maxScale = 100,
  unit = '%',
}: ComparisonBarProps) {
  const {bi} = useApp();
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="space-y-4">
      {items.map((item, idx) => {
        const prevPct = Math.min((item.previousValue / maxScale) * 100, 100);
        const currPct = Math.min((item.currentValue / maxScale) * 100, 100);

        return (
          <motion.div
            key={item.id}
            initial={prefersReducedMotion ? false : {opacity: 0, y: 8}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.25, delay: idx * 0.05}}
            className="bg-[#F3F6FB] text-[#052C5A] rounded-2xl p-4 sm:p-5 space-y-3"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h4 className="font-display font-bold text-sm sm:text-base text-[#052C5A]">
                {bi(item.group, item.groupNy ?? item.group)}
              </h4>
              <span className="text-xs font-bold text-[#00AEEF] tabular-nums">
                {bi(item.deltaText, item.deltaTextNy ?? item.deltaText)}
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="grid grid-cols-12 items-center gap-3">
                <div className="col-span-4 sm:col-span-3 text-xs font-medium text-[#475E78]">
                  {bi(item.previousLabel, item.previousLabelNy ?? item.previousLabel)}
                </div>
                <div className="col-span-6 sm:col-span-7 h-3 bg-white rounded-full overflow-hidden">
                  <motion.div
                    initial={prefersReducedMotion ? {scaleX: 1} : {scaleX: 0}}
                    whileInView={{scaleX: 1}}
                    viewport={{once: true, amount: 0.2}}
                    transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
                    className="h-full origin-left rounded-full bg-[#85C7F2]"
                    style={{width: `${prevPct}%`}}
                  />
                </div>
                <div className="col-span-2 flex justify-end">
                  <span className="font-mono font-bold text-xs sm:text-sm text-[#475E78] tabular-nums">
                    <AnimatedNumber
                      value={item.previousValue}
                      decimals={1}
                      suffix={unit}
                      startOnMount
                    />
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-12 items-center gap-3">
                <div className="col-span-4 sm:col-span-3 text-xs font-bold text-[#052C5A]">
                  {bi(item.currentLabel, item.currentLabelNy ?? item.currentLabel)}
                </div>
                <div className="col-span-6 sm:col-span-7 h-3 bg-white rounded-full overflow-hidden">
                  <motion.div
                    initial={prefersReducedMotion ? {scaleX: 1} : {scaleX: 0}}
                    whileInView={{scaleX: 1}}
                    viewport={{once: true, amount: 0.2}}
                    transition={{
                      duration: 0.55,
                      delay: 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="h-full origin-left rounded-full bg-[#052C5A]"
                    style={{width: `${currPct}%`}}
                  />
                </div>
                <div className="col-span-2 flex justify-end">
                  <span className="font-mono font-extrabold text-xs sm:text-sm text-[#052C5A] tabular-nums">
                    <AnimatedNumber
                      value={item.currentValue}
                      decimals={1}
                      suffix={unit}
                      startOnMount
                    />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
