import {ArrowRight, ArrowUpRight, Compass} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {
  QuadrantPosterInfographic,
  type QuadrantPosterItem,
} from '../components/infographics/QuadrantPosterInfographic';
import {
  RadialFanInfographic,
  type RadialFanItem,
} from '../components/infographics/RadialFanInfographic';
import {useApp} from '../context/AppContext';
import {getTopicPhoto, PHOTO_ASSETS} from '../data/photoAssets';
import {TOPIC_BRIEF_DEFINITIONS} from '../data/topicDefinitions';
import {TOPICS as DEFAULT_TOPICS} from '../data/topics';
import type {Topic} from '../types';
import {getTopicIcon} from '../utils/formatting';

export function Learn() {
  const {
    reports,
    selectedReport,
    selectedReportId,
    setSelectedReportId,
    topics,
    t,
    bi,
  } = useApp();
  const [diagramStyle, setDiagramStyle] = useState<'quadrant' | 'fan'>(
    'quadrant'
  );

  const reportTopics = topics
    .filter((topic) => topic.reportId === selectedReportId)
    .sort((a, b) => a.order - b.order);

  const getShortDefinition = (topic: Topic) => {
    const defaultMatch = DEFAULT_TOPICS.find((item) => item.id === topic.id);
    const isUnedited =
      defaultMatch && defaultMatch.description.en === topic.description.en;
    const def = TOPIC_BRIEF_DEFINITIONS[topic.slug];
    if (isUnedited && def) {
      return t(def);
    }
    return t(topic.description);
  };

  // Group into 2x2 Quadrant Boards (4 topics per board)
  const quadrantItems: QuadrantPosterItem[] = reportTopics.map((topic, idx) => ({
    id: topic.id,
    numberLabel: String(idx + 1).padStart(2, '0'),
    title: t(topic.shortTitle),
    summary: getShortDefinition(topic),
    icon: getTopicIcon(topic.iconName),
    image: getTopicPhoto(topic.slug),
    to: `/learn/${topic.slug}`,
    linkLabel: bi('Read short summary', 'Werengani chidule'),
  }));

  const quadrantChunks: QuadrantPosterItem[][] = [];
  for (let i = 0; i < quadrantItems.length; i += 4) {
    quadrantChunks.push(quadrantItems.slice(i, i + 4));
  }

  // Curved Fan Items matching the curved fan screenshot
  const fanItems: RadialFanItem[] = reportTopics.map((topic) => {
    const titleWords = t(topic.shortTitle).toUpperCase().split(' ');
    const highlight = titleWords[0] ?? '';
    const label = titleWords.slice(1).join(' ');
    return {
      id: topic.id,
      highlight,
      label: label || bi('TOPIC', 'MUTU'),
      example: getShortDefinition(topic),
      image: getTopicPhoto(topic.slug),
      to: `/learn/${topic.slug}`,
      linkLabel: bi(
        `Open ${t(topic.shortTitle)} summary`,
        `Tsegulani chidule cha ${t(topic.shortTitle)}`
      ),
    };
  });

  return (
    <div className="bg-[#052C5A] text-white min-h-screen">
      {/* Clean Header */}
      <section className="bg-[#031F42] py-10 sm:py-12">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={selectedReport.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#00AEEF] hover:bg-[#33C1F5] text-[#052C5A] text-xs font-bold transition-colors"
                >
                  <span>{selectedReport.shortTitle}</span>
                  <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
                </a>
                <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-transparent border border-[#00AEEF]/60 text-[#CFE8FC] text-xs font-semibold">
                  {selectedReport.year}
                </span>
              </div>
              <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
                {bi('Choose a Topic', 'Sankhani Mutu')}
              </h1>
              <p className="text-sm sm:text-base text-[#CFE8FC] max-w-xl">
                {bi(
                  'Pick any card for a one-sentence meaning and quick visual breakdown.',
                  'Dinani khadi iliyonse kuti muwerenge tanthauzo lachidule ndi chithunzi.'
                )}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {/* Toggle between Values 2x2 Poster & Curved Fan */}
              <div
                role="group"
                aria-label={bi(
                  'Choose how topics are shown',
                  'Sankhani momwe mitu iwonekere'
                )}
                className="inline-flex items-center p-1 bg-[#052C5A] rounded-full"
              >
                <button
                  type="button"
                  onClick={() => setDiagramStyle('quadrant')}
                  className={`px-4 py-1.5 text-xs font-bold rounded-full transition-colors cursor-pointer ${
                    diagramStyle === 'quadrant'
                      ? 'bg-[#00AEEF] text-[#052C5A]'
                      : 'text-[#B8D9F8] hover:text-white'
                  }`}
                >
                  {bi('2×2 Cards', 'Makadi 2×2')}
                </button>
                <button
                  type="button"
                  onClick={() => setDiagramStyle('fan')}
                  className={`px-4 py-1.5 text-xs font-bold rounded-full transition-colors cursor-pointer ${
                    diagramStyle === 'fan'
                      ? 'bg-[#00AEEF] text-[#052C5A]'
                      : 'text-[#B8D9F8] hover:text-white'
                  }`}
                >
                  {bi('Curved Fan', 'Chozungulira')}
                </button>
              </div>

              <select
                aria-label={bi('Choose report edition', 'Sankhani lipoti')}
                value={selectedReportId}
                onChange={(e) => setSelectedReportId(e.target.value)}
                className="bg-[#052C5A] rounded-full px-4 py-2 text-xs font-semibold text-white focus:outline-none cursor-pointer"
              >
                {reports.map((report) => (
                  <option key={report.id} value={report.id}>
                    {report.shortTitle} ({report.year})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedReportId === 'mem-sept-2026' && (
            <Link
              to="/learn/malawi-economic-growth-2026"
              className="group relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#052C5A] hover:bg-[#0A3A72] rounded-2xl px-6 py-4 transition-colors shadow-lg"
            >
              <img
                src={PHOTO_ASSETS.harvestHills}
                alt=""
                aria-hidden="true"
                referrerPolicy="no-referrer"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-40 transition-transform duration-500 group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#031F42]/90 via-[#052C5A]/70 to-[#031F42]/88"
              />
              <div className="relative z-10 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-[#00AEEF] text-[#052C5A] flex items-center justify-center shrink-0">
                  <Compass aria-hidden="true" className="w-5 h-5" />
                </span>
                <div>
                  <div className="text-xs font-bold text-[#00AEEF]">
                    {bi(
                      'VISUAL STORY · PAGE 17 · GROWTH VS. PEOPLE',
                      'NKHANI YA ZITHUNZI · TSAMBA 17 · CHUMA VS. ANTHU'
                    )}
                  </div>
                  <div className="font-display font-bold text-base sm:text-lg text-white">
                    {bi(
                      "Is Malawi's Economy Really Growing?",
                      'Kodi Chuma cha Malawi Chikukuladi?'
                    )}
                  </div>
                </div>
              </div>
              <span className="relative z-10 inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#F3F6FB] group-hover:bg-white text-[#052C5A] text-xs sm:text-sm font-bold whitespace-nowrap self-start sm:self-center">
                <span>{bi('Open Story', 'Tsegulani Nkhani')}</span>
                <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </span>
            </Link>
          )}
        </div>
      </section>

      {/* Pure Topic Chooser */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-10">
          {reportTopics.length === 0 ? (
            <div className="relative overflow-hidden bg-[#031F42] rounded-2xl p-8 text-center text-[#DCEBFC] shadow-lg">
              <img
                src={PHOTO_ASSETS.marketBaskets}
                alt=""
                aria-hidden="true"
                referrerPolicy="no-referrer"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-30"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[#031F42]/80"
              />
              <p className="relative z-10">
                {bi(
                  'No topics have been added to this report edition yet.',
                  'Palibe mitu yomwe yaikidwa mu lipoti ili pakali pano.'
                )}
              </p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {diagramStyle === 'quadrant' ? (
                <motion.div
                  key="topics-quadrant"
                  initial={{opacity: 0, y: 8}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, y: -8}}
                  transition={{duration: 0.2}}
                  className="space-y-10"
                >
                  {quadrantChunks.map((chunk, chunkIdx) => (
                    <QuadrantPosterInfographic
                      key={`quadrant-group-${chunkIdx}`}
                      eyebrow={
                        chunkIdx === 0
                          ? bi('Core Economics', 'Mitu Yoyamba')
                          : chunkIdx === 1
                            ? bi('Everyday Life & Policy', 'Moyo & Ndondomeko')
                            : bi('Additional Topics', 'Mitu Ina Yowonjezera')
                      }
                      title={
                        chunkIdx === 0
                          ? bi('Part 1 · Foundations', 'Gawo 1 · Maziko')
                          : chunkIdx === 1
                            ? bi(
                                'Part 2 · People & Money',
                                'Gawo 2 · Anthu & Ndalama'
                              )
                            : bi(
                                `Part ${chunkIdx + 1} · More Topics`,
                                `Gawo ${chunkIdx + 1} · Mitu Yowonjezera`
                              )
                      }
                      subtitle={bi(
                        'Click any card to read its short plain-language summary',
                        'Dinani khadi iliyonse kuti muwerenge chidule chosavuta'
                      )}
                      items={chunk}
                      directNavigate
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="topics-fan"
                  initial={{opacity: 0, y: 8}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, y: -8}}
                  transition={{duration: 0.2}}
                >
                  <RadialFanInfographic
                    titleLeading={bi('PICK AN', 'SANKHANI')}
                    titleHighlight={bi('ECONOMIC TOPIC', 'MUTU WA CHUMA')}
                    subtitle={bi(
                      'Hover or click along the curve to read a brief definition, then open the short summary',
                      'Dinani pa gawo lililonse kuti muone tanthauzo lalifupi, kenako tsegulani chidule'
                    )}
                    items={fanItems}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </section>
    </div>
  );
}
