import {motion} from 'motion/react';
import {Link} from 'react-router-dom';
import {useApp} from '../context/AppContext';
import type {Topic} from '../types';
import {getTopicIcon} from '../utils/formatting';

interface TopicPetalProps {
  topic: Topic;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  style?: React.CSSProperties;
  variant?: 'radial' | 'grid';
}

export function TopicPetal({
  topic,
  isActive,
  onActivate,
  onDeactivate,
  style,
  variant = 'radial',
}: TopicPetalProps) {
  const {t} = useApp();
  const Icon = getTopicIcon(topic.iconName);
  const label = t(topic.shortTitle);

  if (variant === 'grid') {
    return (
      <motion.div
        whileHover={{y: -3}}
        whileTap={{scale: 0.98}}
        transition={{duration: 0.16, ease: [0.16, 1, 0.3, 1]}}
      >
        <Link
          to={`/learn/${topic.slug}`}
          className="group flex flex-col items-center text-center p-5 rounded-2xl bg-[#F3F6FB] hover:bg-white shadow-lg focus-visible:outline-2 focus-visible:outline-[#00AEEF] h-full transition-colors"
        >
          <span className="w-12 h-12 rounded-full bg-[#052C5A] flex items-center justify-center mb-3">
            <Icon aria-hidden="true" className="w-5 h-5 text-[#00AEEF]" />
          </span>
          <span className="font-display font-bold text-sm text-[#052C5A] leading-snug">
            {label}
          </span>
          <span className="mt-1.5 text-xs text-[#475E78] line-clamp-2">
            {t(topic.description)}
          </span>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      style={style}
      initial={false}
      animate={{scale: isActive ? 1.1 : 1}}
      whileHover={{scale: 1.09}}
      whileTap={{scale: 0.96}}
      transition={{type: 'spring', stiffness: 360, damping: 24}}
      className={`absolute -translate-x-1/2 -translate-y-1/2 w-[138px] h-[138px] rounded-full ${
        isActive ? 'z-20' : 'z-10'
      }`}
    >
      <Link
        to={`/learn/${topic.slug}`}
        onMouseEnter={onActivate}
        onFocus={onActivate}
        onMouseLeave={onDeactivate}
        onBlur={onDeactivate}
        aria-label={`Explore ${t(topic.title)}`}
        className={`w-full h-full rounded-full flex flex-col items-center justify-center text-center p-3 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-white shadow-lg ${
          isActive
            ? 'bg-white text-[#052C5A]'
            : 'bg-[#F3F6FB] text-[#052C5A]'
        }`}
      >
        <span className="w-10 h-10 rounded-full bg-[#052C5A] flex items-center justify-center mb-1.5 shrink-0">
          <Icon aria-hidden="true" className="w-5 h-5 text-[#00AEEF]" />
        </span>
        <span className="font-display font-bold text-[12.5px] leading-tight text-[#052C5A]">
          {label}
        </span>
      </Link>
    </motion.div>
  );
}
