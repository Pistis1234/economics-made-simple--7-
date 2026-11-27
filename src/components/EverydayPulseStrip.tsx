import {X} from 'lucide-react';
import {motion} from 'motion/react';
import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {useApp} from '../context/AppContext';
import {AnimatedNumber} from './AnimatedNumber';

type PulseTrend = 'up' | 'down' | 'flat';

function TrendArrow({trend, active}: {trend: PulseTrend; active: boolean}) {
  if (trend === 'flat') return null;

  const isUp = trend === 'up';
  return (
    <motion.span
      aria-label={isUp ? 'Up' : 'Down'}
      animate={
        active
          ? {y: isUp ? [0, -2, 0] : [0, 2, 0], scale: [1, 1.15, 1]}
          : {y: 0, scale: 1}
      }
      transition={{
        duration: 1.6,
        repeat: active ? Infinity : 0,
        ease: 'easeInOut',
      }}
      className={`inline-block text-[10px] leading-none font-bold ${
        isUp ? 'text-[#FBBF24]' : 'text-[#00AEEF]'
      }`}
    >
      {isUp ? '▲' : '▼'}
    </motion.span>
  );
}

export function EverydayPulseStrip() {
  const {bi} = useApp();
  const {pathname} = useLocation();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [dismissed, setDismissed] = useState<boolean>(false);

  const isHomePage =
    pathname === '/' ||
    ![
      '/learn',
      '/numbers',
      '/actions',
      '/quiz',
      '/methodology',
      '/admin',
    ].some((prefix) => pathname.startsWith(prefix));

  // Subtle spotlight cycle across the 3 everyday items
  useEffect(() => {
    if (!isHomePage || dismissed) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [isHomePage, dismissed]);

  if (!isHomePage || dismissed) {
    return null;
  }

  const cards = [
    {
      id: 'maize-50kg',
      label: bi('Maize (50kg)', 'Chimanga (50kg)'),
      figures: [
        {
          subLabel: null as string | null,
          value: 60000,
          prefix: 'MK ',
          suffix: '',
          trend: 'up' as PulseTrend,
        },
      ],
    },
    {
      id: 'usd-rbm',
      label: bi('USD (RBM)', 'Dola (RBM)'),
      figures: [
        {
          subLabel: null as string | null,
          value: 1750,
          prefix: 'MK ',
          suffix: '',
          trend: 'flat' as PulseTrend,
        },
      ],
    },
    {
      id: 'fuel-mera',
      label: bi('Fuel (MERA)', 'Mafuta (MERA)'),
      figures: [
        {
          subLabel: bi('Petrol', 'Petulo'),
          value: 5619,
          prefix: 'MK ',
          suffix: '/L',
          trend: 'down' as PulseTrend,
        },
        {
          subLabel: bi('Diesel', 'Dizilo'),
          value: 5863,
          prefix: 'MK ',
          suffix: '/L',
          trend: 'down' as PulseTrend,
        },
      ],
    },
  ];

  const renderCardContent = (
    item: (typeof cards)[number],
    idx: number,
    showSpotlight: boolean,
    keySuffix = ''
  ) => {
    const isActive = idx === activeIndex;
    return (
      <div
        key={`${item.id}${keySuffix}`}
        onMouseEnter={() => setActiveIndex(idx)}
        className="relative flex items-center gap-1.5 px-2.5 py-0.5 rounded-full transition-colors whitespace-nowrap"
      >
        {showSpotlight && isActive && (
          <motion.span
            layoutId="everyday-brand-spotlight"
            transition={{type: 'spring', stiffness: 320, damping: 28}}
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-[#0A3A72] shadow-[0_0_14px_rgba(0,174,239,0.2)]"
          />
        )}

        <span className="relative z-10 text-[11px] font-semibold text-[#85C7F2] whitespace-nowrap">
          {item.label}:
        </span>

        <div className="relative z-10 flex items-center gap-2">
          {item.figures.map((fig, fIdx) => (
            <div key={fIdx} className="flex items-center gap-1 whitespace-nowrap">
              {fig.subLabel && (
                <span className="text-[10px] font-semibold text-[#CFE8FC]">
                  {fig.subLabel}
                </span>
              )}
              <span className="font-display-num text-[11px] sm:text-xs font-bold tracking-tight text-white">
                <AnimatedNumber
                  value={fig.value}
                  decimals={0}
                  prefix={fig.prefix}
                  suffix={fig.suffix}
                  durationMs={850}
                  startOnMount
                />
              </span>
              <TrendArrow trend={fig.trend} active={isActive} />
              {fIdx < item.figures.length - 1 && (
                <span aria-hidden="true" className="text-[#1B4B80] pl-0.5 select-none">
                  ·
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <aside
      aria-label={bi(
        'Everyday prices and rates in Malawi',
        'Mitengo ndi ndalama za tsiku ndi tsiku ku Malawi'
      )}
      className="relative z-20 w-full overflow-hidden bg-[#031F42]/96 text-white"
    >
      {/* Subtle Brand Sky-Cyan Sheen Sweep */}
      <motion.div
        aria-hidden="true"
        initial={{x: '-100%'}}
        animate={{x: '220%'}}
        transition={{
          duration: 4.2,
          repeat: Infinity,
          repeatDelay: 3.5,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[#00AEEF]/12 to-transparent skew-x-[-20deg]"
      />

      <div className="relative max-w-[1360px] mx-auto px-4 sm:px-8 py-1 flex items-center justify-between gap-2">
        {/* Desktop Compact Centered Row */}
        <div className="hidden md:flex items-center justify-center flex-1 gap-2 min-w-0">
          <motion.span
            aria-hidden="true"
            animate={{scale: [1, 1.3, 1], opacity: [0.75, 1, 0.75]}}
            transition={{duration: 2.2, repeat: Infinity, ease: 'easeInOut'}}
            className="w-1.5 h-1.5 rounded-full bg-[#00AEEF] shrink-0 mr-0.5"
          />
          {cards.map((item, idx) => (
            <div key={item.id} className="flex items-center gap-2">
              {renderCardContent(item, idx, true)}
              {idx < cards.length - 1 && (
                <span aria-hidden="true" className="text-[#1B4B80] text-xs select-none">
                  |
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Smooth Continuous Ticker */}
        <div className="md:hidden flex-1 overflow-hidden relative [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <motion.div
            className="flex items-center gap-3 w-max"
            animate={{x: ['0%', '-50%']}}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {[0, 1].map((loopIdx) => (
              <div key={loopIdx} className="flex items-center gap-3">
                {cards.map((item, idx) => (
                  <div
                    key={`${loopIdx}-${item.id}`}
                    className="flex items-center gap-3"
                  >
                    {renderCardContent(item, idx, false, `-mob-${loopIdx}`)}
                    <span
                      aria-hidden="true"
                      className="text-[#1B4B80] text-xs select-none"
                    >
                      |
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Optional User Choice to Hide Strip */}
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label={bi('Hide price strip', 'Bisani mitengo')}
          className="shrink-0 p-1 rounded-full text-[#85C7F2]/60 hover:text-white hover:bg-[#0A3A72]/60 transition-colors cursor-pointer"
        >
          <X aria-hidden="true" className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
