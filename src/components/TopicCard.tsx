import {ArrowDown, ArrowUp, ChevronDown, Info, Minus} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';
import {useState} from 'react';
import {useApp} from '../context/AppContext';
import type {TopicCardItem} from '../types';
import {getTopicIcon} from '../utils/formatting';

interface TopicCardProps {
  card: TopicCardItem;
  isHighlighted?: boolean;
}

export function TopicCard({card, isHighlighted = false}: TopicCardProps) {
  const {t, openSourceModal} = useApp();
  const [isExpanded, setIsExpanded] = useState(false);

  const Icon = getTopicIcon(card.iconName);

  const DirectionIcon =
    card.direction === 'up'
      ? ArrowUp
      : card.direction === 'down'
      ? ArrowDown
      : Minus;

  const isInterpretation =
    card.source.sourceType === 'platform_interpretation';

  return (
    <motion.article
      whileHover={{y: -2}}
      transition={{duration: 0.18, ease: [0.16, 1, 0.3, 1]}}
      className={`rounded-2xl transition-all duration-200 shadow-lg ${
        isHighlighted
          ? 'bg-white shadow-[0_0_20px_rgba(0,174,239,0.45)]'
          : 'bg-[#F3F6FB] hover:bg-white'
      } text-[#052C5A]`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="bg-[#052C5A] font-display-num text-sm font-bold text-[#00AEEF] w-10 h-10 rounded-lg flex items-center justify-center">
              {String(card.stepNumber).padStart(2, '0')}
            </span>
            <span className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
              <Icon aria-hidden="true" className="w-4 h-4 text-[#052C5A]" />
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#052C5A]">
              <DirectionIcon aria-hidden="true" className="w-3.5 h-3.5 text-[#00AEEF]" />
              <span>{t(card.directionLabel)}</span>
            </span>

            <button
              type="button"
              onClick={() => openSourceModal(card.source)}
              aria-label={`Source information for ${t(card.heading)}`}
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#052C5A] hover:bg-[#00AEEF] shadow-sm transition-colors cursor-pointer"
            >
              <Info aria-hidden="true" className="w-4 h-4" />
            </button>
          </div>
        </div>

        <button
          type="button"
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded((prev) => !prev)}
          className="w-full text-left mt-4 group cursor-pointer focus-visible:outline-2 focus-visible:outline-[#00AEEF] rounded-lg"
        >
          <h3 className="font-display font-bold text-xl text-[#052C5A] group-hover:text-[#00AEEF] transition-colors flex items-center justify-between gap-2">
            <span>
              {t(card.heading)}
              {isInterpretation ? '*' : ''}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#475E78] shrink-0">
              <span>{isExpanded ? 'Hide' : 'Read'}</span>
              <ChevronDown
                aria-hidden="true"
                className={`w-4 h-4 transition-transform duration-200 ${
                  isExpanded ? 'rotate-180 text-[#00AEEF]' : ''
                }`}
              />
            </span>
          </h3>

          <p className="mt-2 text-sm sm:text-base text-[#475E78] leading-relaxed">
            {t(card.oneLineSummary)}
          </p>
        </button>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{opacity: 0, y: -6}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -6}}
              transition={{duration: 0.2, ease: [0.16, 1, 0.3, 1]}}
              className="mt-5 rounded-xl bg-white p-5 space-y-3 text-sm"
            >
              <div>
                <div className="text-xs font-bold text-[#00AEEF]">In plain language</div>
                <p className="mt-1 leading-relaxed text-[#052C5A]">
                  {t(card.plainExplanation)}
                </p>
              </div>
              <div>
                <div className="text-xs font-bold text-[#052C5A]">Why it happens</div>
                <p className="mt-1 leading-relaxed text-[#475E78]">{t(card.whyItHappens)}</p>
              </div>
              <div>
                <div className="text-xs font-bold text-[#052C5A]">Everyday impact</div>
                <p className="mt-1 leading-relaxed text-[#475E78]">{t(card.everydayImpact)}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}
