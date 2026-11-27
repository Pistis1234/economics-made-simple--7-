import {Check, Layers, List} from 'lucide-react';
import {motion} from 'motion/react';
import {useApp} from '../../context/AppContext';
import type {StorySectionMeta} from '../../data/malawiGrowth2026';

export type StoryViewMode = 'step' | 'all';

interface ProgressIndicatorProps {
  sections: StorySectionMeta[];
  exploredIds: string[];
  activeId: string;
  viewMode: StoryViewMode;
  onChangeViewMode: (mode: StoryViewMode) => void;
  onSelectSection: (sectionId: string) => void;
}

export function ProgressIndicator({
  sections,
  exploredIds,
  activeId,
  viewMode,
  onChangeViewMode,
  onSelectSection,
}: ProgressIndicatorProps) {
  const {bi} = useApp();
  const exploredCount = exploredIds.length;
  const total = sections.length;
  const pct = Math.round((exploredCount / Math.max(total, 1)) * 100);
  const activeIndex = Math.max(
    0,
    sections.findIndex((s) => s.id === activeId)
  );

  return (
    <nav
      aria-label={bi('Documentary section progress', 'Mmene mwafikira pa nkhaniyi')}
      className="bg-[#031F42]/95 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white">
            <span className="text-[#B8D9F8]">
              {viewMode === 'step'
                ? bi('Step', 'Gawo')
                : bi('Explored', 'Zomwe mwawerenga')}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#052C5A] font-mono font-bold text-[#00AEEF] tabular-nums">
              {viewMode === 'step'
                ? `${activeIndex + 1} / ${total}`
                : `${exploredCount} / ${total}`}
            </span>
            <span aria-hidden="true" className="text-[#85C7F2]/40">
              ·
            </span>
            <span className="text-xs font-medium text-[#B8D9F8] tabular-nums">
              {bi(`${pct}% explored`, `${pct}% yawerengedwa`)}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="hidden sm:block w-40 h-1.5 rounded-full bg-[#052C5A] overflow-hidden">
              <motion.div
                animate={{width: `${pct}%`}}
                transition={{duration: 0.35, ease: [0.16, 1, 0.3, 1]}}
                className="h-full rounded-full bg-[#00AEEF]"
              />
            </div>

            <div
              role="group"
              aria-label={bi('Reading pace mode', 'Njira yowerengera')}
              className="inline-flex items-center p-1 bg-[#052C5A] rounded-full"
            >
              <button
                type="button"
                onClick={() => onChangeViewMode('step')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  viewMode === 'step'
                    ? 'bg-[#00AEEF] text-[#052C5A]'
                    : 'text-[#B8D9F8] hover:text-white'
                }`}
              >
                <Layers aria-hidden="true" className="w-3.5 h-3.5" />
                <span>{bi('One step at a time', 'Gawo limodzi palimodzi')}</span>
              </button>
              <button
                type="button"
                onClick={() => onChangeViewMode('all')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  viewMode === 'all'
                    ? 'bg-[#00AEEF] text-[#052C5A]'
                    : 'text-[#B8D9F8] hover:text-white'
                }`}
              >
                <List aria-hidden="true" className="w-3.5 h-3.5" />
                <span>{bi('View all', 'Onani zonse')}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5">
          {sections.map((section) => {
            const isExplored = exploredIds.includes(section.id);
            const isActive = activeId === section.id;

            return (
              <motion.button
                key={section.id}
                type="button"
                whileTap={{scale: 0.96}}
                onClick={() => onSelectSection(section.id)}
                aria-current={isActive ? 'step' : undefined}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#00AEEF] text-[#052C5A]'
                    : isExplored
                    ? 'bg-[#0A3A72] text-[#85C7F2] hover:text-white'
                    : 'bg-[#052C5A] text-[#B8D9F8] hover:text-white'
                }`}
              >
                {isExplored ? (
                  <Check aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
                ) : (
                  <span className="font-mono tabular-nums">{section.number}.</span>
                )}
                <span>{bi(section.shortLabel, section.shortLabelNy)}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
