import {ArrowRight, GitCommitHorizontal} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';
import {useMemo, useState} from 'react';
import {useApp} from '../../context/AppContext';
import {
  SYSTEM_DIAGRAM_NODES,
  type SystemDiagramNode,
} from '../../data/malawiGrowth2026';
import {SourceInfoButton} from './SourceInformationModal';

const CATEGORY_COLORS: Record<
  SystemDiagramNode['category'],
  {bg: string; border: string; badge: string; label: string; labelNy: string}
> = {
  driver: {
    bg: '#0A3A72',
    border: '#00AEEF',
    badge: '#00AEEF',
    label: 'Growth Drivers',
    labelNy: 'Zokankhira Chuma',
  },
  constraint: {
    bg: '#031F42',
    border: '#85C7F2',
    badge: '#85C7F2',
    label: 'Business Constraints',
    labelNy: 'Zopinga Mabizinesi',
  },
  labor: {
    bg: '#073566',
    border: '#FFFFFF',
    badge: '#FFFFFF',
    label: 'Skills & Jobs',
    labelNy: 'Luso & Ntchito',
  },
  welfare: {
    bg: '#052C5A',
    border: '#B8D9F8',
    badge: '#B8D9F8',
    label: 'Household Outcomes',
    labelNy: 'Zotsatira M’mabanja',
  },
};

export function InteractiveDiagram() {
  const {bi} = useApp();
  const [selectedId, setSelectedId] = useState<string>('econ-growth');

  const selectedNode = useMemo(
    () =>
      SYSTEM_DIAGRAM_NODES.find((n) => n.id === selectedId) ??
      SYSTEM_DIAGRAM_NODES[0],
    [selectedId]
  );

  const incomingLinks = useMemo(() => {
    const incoming: {
      fromNode: SystemDiagramNode;
      relationship: string;
      relationshipNy: string;
      classification: 'direct_report' | 'platform_interpretation';
    }[] = [];
    for (const node of SYSTEM_DIAGRAM_NODES) {
      for (const edge of node.connectedTo) {
        if (edge.targetId === selectedNode.id) {
          incoming.push({
            fromNode: node,
            relationship: edge.relationship,
            relationshipNy: edge.relationshipNy,
            classification: edge.classification,
          });
        }
      }
    }
    return incoming;
  }, [selectedNode]);

  const highlightedIds = useMemo(() => {
    const set = new Set<string>([selectedNode.id]);
    selectedNode.connectedTo.forEach((e) => set.add(e.targetId));
    incomingLinks.forEach((inc) => set.add(inc.fromNode.id));
    return set;
  }, [selectedNode, incomingLinks]);

  const allEdges = useMemo(() => {
    const list: {
      key: string;
      from: SystemDiagramNode;
      to: SystemDiagramNode;
      classification: 'direct_report' | 'platform_interpretation';
    }[] = [];
    for (const node of SYSTEM_DIAGRAM_NODES) {
      for (const edge of node.connectedTo) {
        const target = SYSTEM_DIAGRAM_NODES.find((n) => n.id === edge.targetId);
        if (target) {
          list.push({
            key: `${node.id}-${target.id}`,
            from: node,
            to: target,
            classification: edge.classification,
          });
        }
      }
    }
    return list;
  }, []);

  return (
    <section
      id="connect-the-story"
      aria-labelledby="connect-story-heading"
      className="bg-[#031F42] py-10 lg:py-12 rounded-3xl shadow-xl"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 space-y-6">
        <div className="max-w-3xl space-y-2">
          <div className="text-xs font-bold text-[#00AEEF]">
            {bi(
              'HOW EVERYTHING CONNECTS · PAGES 17 & 18',
              'MOMWE ZONSE ZIMAGWIRIZANIRANA · MASAMBA 17 & 18'
            )}
          </div>
          <h2
            id="connect-story-heading"
            className="font-display font-extrabold text-2xl sm:text-3xl text-white"
          >
            {bi(
              'HOW ARE ALL THESE THINGS CONNECTED?',
              'KODI ZINTHU ZONSEZI ZIKUGWIRIZANA BWANJI?'
            )}
          </h2>
          <p className="text-sm sm:text-base text-[#CFE8FC] leading-relaxed">
            {bi(
              'Click any box to see what causes it — and what it leads to next.',
              'Dinani bokosi lililonse kuti muwone chomwe chimachiyambitsa — komanso zotsatira zake.'
            )}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#B8D9F8]">
          {Object.entries(CATEGORY_COLORS).map(([key, meta]) => (
            <span key={key} className="inline-flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-sm inline-block"
                style={{backgroundColor: meta.badge}}
              />
              <span className="font-medium text-white">{bi(meta.label, meta.labelNy)}</span>
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          <div className="lg:col-span-7 bg-[#052C5A] rounded-2xl p-4 sm:p-5">
            <div className="hidden sm:block relative w-full h-[440px] rounded-xl bg-[#052C5A]">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                <defs>
                  <marker
                    id="arrow-direct"
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="4.5"
                    markerHeight="4.5"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#85C7F2" />
                  </marker>
                  <marker
                    id="arrow-interp"
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="4.5"
                    markerHeight="4.5"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#00AEEF" />
                  </marker>
                  <marker
                    id="arrow-muted"
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="4"
                    markerHeight="4"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#164273" />
                  </marker>
                </defs>

                {allEdges.map((edge) => {
                  const isRelevant =
                    edge.from.id === selectedNode.id ||
                    edge.to.id === selectedNode.id;
                  const isInterp =
                    edge.classification === 'platform_interpretation';

                  return (
                    <line
                      key={edge.key}
                      x1={edge.from.x}
                      y1={edge.from.y}
                      x2={edge.to.x}
                      y2={edge.to.y}
                      stroke={
                        isRelevant
                          ? isInterp
                            ? '#00AEEF'
                            : '#85C7F2'
                          : '#164273'
                      }
                      strokeWidth={isRelevant ? 0.85 : 0.45}
                      strokeDasharray={
                        isRelevant ? '2.4 1.6' : isInterp ? '1.8 1.4' : undefined
                      }
                      className={isRelevant ? 'animate-flow-dash' : undefined}
                      markerEnd={
                        isRelevant
                          ? isInterp
                            ? 'url(#arrow-interp)'
                            : 'url(#arrow-direct)'
                          : 'url(#arrow-muted)'
                      }
                      opacity={isRelevant ? 1 : 0.6}
                    />
                  );
                })}
              </svg>

              {SYSTEM_DIAGRAM_NODES.map((node) => {
                const isSelected = node.id === selectedNode.id;
                const isConnected = highlightedIds.has(node.id);
                const theme = CATEGORY_COLORS[node.category];

                return (
                  <motion.button
                    key={node.id}
                    type="button"
                    onClick={() => setSelectedId(node.id)}
                    aria-pressed={isSelected}
                    animate={{scale: isSelected ? 1.07 : 1}}
                    whileHover={{scale: 1.06}}
                    whileTap={{scale: 0.96}}
                    transition={{type: 'spring', stiffness: 360, damping: 24}}
                    style={{
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                      backgroundColor: isSelected ? '#00AEEF' : theme.bg,
                      boxShadow: isSelected
                        ? '0 10px 24px rgba(0,174,239,0.35)'
                        : '0 4px 12px rgba(3,31,66,0.35)',
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 px-3 py-2 rounded-xl text-xs font-bold cursor-pointer max-w-[144px] text-center leading-tight ${
                      isSelected
                        ? 'text-[#052C5A] z-20'
                        : isConnected
                        ? 'text-white z-10'
                        : 'text-[#B8D9F8] opacity-80 hover:opacity-100'
                    }`}
                  >
                    {bi(node.label, node.labelNy)}
                  </motion.button>
                );
              })}
            </div>

            <div className="sm:hidden grid grid-cols-2 gap-2.5">
              {SYSTEM_DIAGRAM_NODES.map((node) => {
                const isSelected = node.id === selectedNode.id;
                const theme = CATEGORY_COLORS[node.category];
                return (
                  <motion.button
                    key={node.id}
                    type="button"
                    whileTap={{scale: 0.97}}
                    onClick={() => setSelectedId(node.id)}
                    aria-pressed={isSelected}
                    style={{
                      backgroundColor: isSelected ? '#00AEEF' : theme.bg,
                    }}
                    className={`p-3 rounded-xl text-left text-xs font-bold transition-colors cursor-pointer shadow-sm ${
                      isSelected ? 'text-[#052C5A]' : 'text-white'
                    }`}
                  >
                    {bi(node.label, node.labelNy)}
                  </motion.button>
                );
              })}
            </div>
          </div>

          <aside className="lg:col-span-5 bg-[#F3F6FB] text-[#052C5A] rounded-2xl p-6 sm:p-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedNode.id}
                initial={{opacity: 0, y: 8}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -8}}
                transition={{duration: 0.18, ease: [0.16, 1, 0.3, 1]}}
                className="space-y-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-[#00AEEF]">
                      {bi(
                        CATEGORY_COLORS[selectedNode.category].label,
                        CATEGORY_COLORS[selectedNode.category].labelNy
                      )}
                    </div>
                    <h3 className="font-display font-extrabold text-2xl text-[#052C5A] mt-1">
                      {bi(selectedNode.label, selectedNode.labelNy)}
                    </h3>
                  </div>
                  <SourceInfoButton
                    source={selectedNode.source}
                    label={bi(selectedNode.label, selectedNode.labelNy)}
                  />
                </div>

                <p className="text-sm sm:text-base text-[#052C5A] leading-relaxed">
                  {bi(selectedNode.summary, selectedNode.summaryNy)}
                </p>

                <div className="text-xs text-[#475E78] bg-white rounded-xl px-3.5 py-2.5">
                  {bi(selectedNode.reportLinkNote, selectedNode.reportLinkNoteNy)}
                </div>

                {selectedNode.connectedTo.length > 0 && (
                  <div className="space-y-2.5 pt-2">
                    <div className="text-xs font-bold text-[#052C5A]">
                      {bi('What this leads to:', 'Zomwe izi zimadzetsa:')}
                    </div>
                    <div className="space-y-2">
                      {selectedNode.connectedTo.map((edge) => {
                        const target = SYSTEM_DIAGRAM_NODES.find(
                          (n) => n.id === edge.targetId
                        );
                        if (!target) return null;

                        return (
                          <motion.button
                            key={edge.targetId}
                            type="button"
                            whileHover={{x: 3}}
                            onClick={() => setSelectedId(target.id)}
                            className="w-full text-left p-3 rounded-xl bg-white hover:shadow-md transition-all cursor-pointer space-y-1 shadow-sm"
                          >
                            <div className="flex items-center justify-between gap-2 text-xs font-bold text-[#052C5A]">
                              <span className="inline-flex items-center gap-1.5">
                                <ArrowRight
                                  aria-hidden="true"
                                  className="w-3.5 h-3.5 text-[#00AEEF]"
                                />
                                <span>{bi(target.label, target.labelNy)}</span>
                              </span>
                            </div>
                            <p className="text-xs text-[#475E78] leading-relaxed">
                              {bi(edge.relationship, edge.relationshipNy)}
                            </p>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {incomingLinks.length > 0 && (
                  <div className="space-y-2.5 pt-2">
                    <div className="text-xs font-bold text-[#052C5A]">
                      {bi('Caused by:', 'Zomwe zimayambitsa izi:')}
                    </div>
                    <div className="space-y-2">
                      {incomingLinks.map((inc) => (
                        <motion.button
                          key={inc.fromNode.id}
                          type="button"
                          whileHover={{x: 3}}
                          onClick={() => setSelectedId(inc.fromNode.id)}
                          className="w-full text-left p-3 rounded-xl bg-white hover:shadow-md transition-all cursor-pointer space-y-1 shadow-sm"
                        >
                          <div className="flex items-center justify-between gap-2 text-xs font-bold text-[#052C5A]">
                            <span className="inline-flex items-center gap-1.5">
                              <GitCommitHorizontal
                                aria-hidden="true"
                                className="w-3.5 h-3.5 text-[#00AEEF]"
                              />
                              <span>{bi(inc.fromNode.label, inc.fromNode.labelNy)}</span>
                            </span>
                          </div>
                          <p className="text-xs text-[#475E78] leading-relaxed">
                            {bi(inc.relationship, inc.relationshipNy)}
                          </p>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </aside>
        </div>
      </div>
    </section>
  );
}
