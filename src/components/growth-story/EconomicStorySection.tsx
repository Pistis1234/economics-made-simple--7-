import {ArrowLeft, ArrowRight, CheckCircle2} from 'lucide-react';
import {motion} from 'motion/react';
import React, {useEffect, useRef} from 'react';
import {useApp} from '../../context/AppContext';
import type {SourceReference} from '../../types';
import {SourceInfoButton} from './SourceInformationModal';

interface EconomicStorySectionProps {
  id: string;
  sectionNumber: number;
  totalSections?: number;
  title: string;
  kicker: string;
  pageRef: string;
  summaryLine?: string;
  variant?: 'light' | 'muted' | 'dark';
  isExplored: boolean;
  onBecomeVisible: (id: string) => void;
  prevSectionId?: string;
  prevSectionLabel?: string;
  nextSectionId?: string;
  nextSectionLabel?: string;
  onNavigate?: (targetId: string) => void;
  source?: SourceReference;
  children: React.ReactNode;
}

export function EconomicStorySection({
  id,
  sectionNumber,
  totalSections = 7,
  title,
  kicker,
  pageRef,
  summaryLine,
  variant = 'light',
  isExplored,
  onBecomeVisible,
  prevSectionId,
  prevSectionLabel,
  nextSectionId,
  nextSectionLabel,
  onNavigate,
  source,
  children,
}: EconomicStorySectionProps) {
  const {bi} = useApp();
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          onBecomeVisible(id);
        }
      },
      {threshold: 0.15}
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [id, onBecomeVisible]);

  const sectionClasses =
    variant === 'muted'
      ? 'bg-[#031F42] text-white'
      : 'bg-[#052C5A] text-white';

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`${sectionClasses} py-10 lg:py-14 scroll-mt-24`}
    >
      <motion.div
        initial={{opacity: 0, y: 12}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.35, ease: [0.22, 1, 0.36, 1]}}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-5">
          <div className="space-y-1.5 max-w-3xl">
            <div className="text-xs font-bold flex flex-wrap items-center gap-2 text-[#00AEEF]">
              <span className="font-mono tabular-nums">
                {bi(
                  `Step ${sectionNumber} of ${totalSections}`,
                  `Gawo ${sectionNumber} pa ${totalSections}`
                )}
              </span>
              <span aria-hidden="true" className="text-[#85C7F2]/40">
                ·
              </span>
              <span>{kicker}</span>
              <span aria-hidden="true" className="text-[#85C7F2]/40">
                ·
              </span>
              <span className="text-[#B8D9F8]">World Bank {pageRef}</span>
            </div>

            <h2
              id={`${id}-heading`}
              className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-white"
              style={{textWrap: 'balance'}}
            >
              {title}
            </h2>

            {summaryLine && (
              <p className="text-sm sm:text-base leading-relaxed pt-0.5 text-[#CFE8FC]">
                {summaryLine}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {isExplored && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00AEEF]">
                <CheckCircle2 aria-hidden="true" className="w-4 h-4" />
                <span>{bi('Read', 'Yawerengedwa')}</span>
              </span>
            )}
            {source && (
              <SourceInfoButton source={source} label={title} dark />
            )}
          </div>
        </div>

        <div>{children}</div>

        {(prevSectionId || nextSectionId) && onNavigate && (
          <div className="pt-5 flex flex-wrap items-center justify-between gap-3">
            {prevSectionId ? (
              <motion.button
                type="button"
                whileHover={{x: -2}}
                whileTap={{scale: 0.98}}
                onClick={() => onNavigate(prevSectionId)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-[#0A3A72] hover:bg-[#164273] text-white transition-colors cursor-pointer"
              >
                <ArrowLeft aria-hidden="true" className="w-4 h-4" />
                <span>
                  {bi('Previous', 'Zapitazo')}
                  {prevSectionLabel ? `: ${prevSectionLabel}` : ''}
                </span>
              </motion.button>
            ) : (
              <div />
            )}

            {nextSectionId && (
              <motion.button
                type="button"
                whileHover={{x: 2}}
                whileTap={{scale: 0.98}}
                onClick={() => onNavigate(nextSectionId)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold bg-[#00AEEF] hover:bg-[#33C1F5] text-[#052C5A] transition-colors cursor-pointer"
              >
                <span>
                  {bi('Next', 'Zotsatira')}: {nextSectionLabel}
                </span>
                <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        )}
      </motion.div>
    </section>
  );
}
