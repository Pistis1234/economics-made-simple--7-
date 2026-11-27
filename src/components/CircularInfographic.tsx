import {ArrowRight} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';
import {useMemo, useState} from 'react';
import {Link} from 'react-router-dom';
import {useApp} from '../context/AppContext';
import type {Topic} from '../types';
import {TopicPetal} from './TopicPetal';

interface CircularInfographicProps {
  topics: Topic[];
  embedded?: boolean;
}

export function CircularInfographic({
  topics,
  embedded = false,
}: CircularInfographicProps) {
  const {t, ui, selectedReport} = useApp();
  const [hoveredTopicId, setHoveredTopicId] = useState<string | null>(null);

  const orderedTopics = useMemo(
    () => [...topics].sort((a, b) => a.order - b.order),
    [topics]
  );

  const activeTopic = useMemo(
    () =>
      orderedTopics.find((item) => item.id === hoveredTopicId) ??
      orderedTopics[0],
    [orderedTopics, hoveredTopicId]
  );

  const size = 620;
  const center = size / 2;
  const radius = 224;

  const petalPositions = useMemo(() => {
    const count = orderedTopics.length || 1;
    return orderedTopics.map((topic, index) => {
      const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
      const x = center + Math.cos(angle) * radius;
      const y = center + Math.sin(angle) * radius;
      return {topic, x, y, angle};
    });
  }, [orderedTopics, center, radius]);

  if (orderedTopics.length === 0) {
    return null;
  }

  return (
    <div
      className={
        embedded
          ? 'bg-[#031F42] text-white rounded-3xl p-6 sm:p-10 shadow-xl'
          : 'bg-[#052C5A] text-white py-16 lg:py-20'
      }
    >
      <div className={embedded ? '' : 'max-w-[1440px] mx-auto px-5 sm:px-8'}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          <div className="lg:col-span-8 flex flex-col items-center">
            <div className="text-center mb-6 lg:hidden">
              <h3 className="font-display font-bold text-2xl tracking-tight text-white">
                {ui('chooseTopic')}
              </h3>
              <p className="text-sm text-[#B8D9F8] mt-1">Tap any topic</p>
            </div>

            <div
              className="hidden md:block relative select-none"
              style={{width: `${size}px`, height: `${size}px`}}
            >
              <svg
                viewBox={`0 0 ${size} ${size}`}
                className="w-full h-full pointer-events-none"
                aria-hidden="true"
              >
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke="rgba(133,199,242,0.28)"
                  strokeWidth="1.5"
                  strokeDasharray="8 8"
                  className="animate-orbit-slow"
                />
                <circle
                  cx={center}
                  cy={center}
                  r={120}
                  fill="none"
                  stroke="rgba(0,174,239,0.35)"
                  strokeWidth="1.5"
                />
                {petalPositions.map(({topic, x, y}) => {
                  const isActive = topic.id === activeTopic?.id;
                  return (
                    <line
                      key={`spoke-${topic.id}`}
                      x1={center}
                      y1={center}
                      x2={x}
                      y2={y}
                      stroke={isActive ? '#00AEEF' : 'rgba(133,199,242,0.22)'}
                      strokeWidth={isActive ? 2.5 : 1.5}
                      strokeDasharray={isActive ? '7 5' : undefined}
                      className={isActive ? 'animate-flow-dash' : undefined}
                      strokeLinecap="round"
                    />
                  );
                })}
              </svg>

              <motion.div
                key={activeTopic?.id}
                initial={{scale: 0.97}}
                animate={{scale: 1}}
                transition={{duration: 0.2, ease: [0.16, 1, 0.3, 1]}}
                style={{left: `${center}px`, top: `${center}px`}}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-[184px] h-[184px] rounded-full bg-[#F3F6FB] shadow-xl flex flex-col items-center justify-center text-center p-5 z-10"
              >
                <span className="text-[11px] font-bold tracking-wider text-[#00AEEF]">
                  {selectedReport.shortTitle}
                </span>
                <div className="font-display font-extrabold text-xl leading-tight text-[#052C5A] mt-1.5">
                  {ui('chooseTopic')}
                </div>
                <span className="text-xs text-[#475E78] mt-1.5">
                  Hover or click
                </span>
              </motion.div>

              {petalPositions.map(({topic, x, y}) => (
                <TopicPetal
                  key={topic.id}
                  topic={topic}
                  isActive={topic.id === hoveredTopicId}
                  onActivate={() => setHoveredTopicId(topic.id)}
                  onDeactivate={() => setHoveredTopicId(null)}
                  style={{left: `${x}px`, top: `${y}px`}}
                  variant="radial"
                />
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:hidden">
              {orderedTopics.map((topic) => (
                <TopicPetal
                  key={topic.id}
                  topic={topic}
                  isActive={false}
                  onActivate={() => {}}
                  onDeactivate={() => {}}
                  variant="grid"
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              {activeTopic && (
                <motion.div
                  key={activeTopic.id}
                  initial={{opacity: 0, y: 8}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, y: -8}}
                  transition={{duration: 0.18, ease: [0.16, 1, 0.3, 1]}}
                  className="bg-[#F3F6FB] text-[#052C5A] rounded-2xl p-6 sm:p-7 space-y-5"
                >
                  <div className="text-xs font-bold text-[#00AEEF]">
                    {selectedReport.shortTitle} · {selectedReport.year}
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold text-2xl text-[#052C5A]">
                      {t(activeTopic.shortTitle)}
                    </h4>
                    <p className="mt-2.5 text-sm sm:text-base text-[#475E78] leading-relaxed">
                      {t(activeTopic.description)}
                    </p>
                  </div>

                  <Link
                    to={`/learn/${activeTopic.slug}`}
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full bg-[#052C5A] hover:bg-[#0A3A72] text-white text-sm font-bold transition-colors"
                  >
                    <span>Explore {t(activeTopic.shortTitle)}</span>
                    <ArrowRight aria-hidden="true" className="w-4 h-4" />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
