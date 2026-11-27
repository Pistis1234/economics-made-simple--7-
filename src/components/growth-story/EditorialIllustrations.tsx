import {motion} from 'motion/react';
import {useApp} from '../../context/AppContext';

export function CakeSharingIllustration({
  growthRate = 2.7,
  populationRate = 2.6,
}: {
  growthRate?: number;
  populationRate?: number;
}) {
  const {bi} = useApp();
  const netGap = Number((growthRate - populationRate).toFixed(1));
  const cakeScale = 0.86 + ((growthRate - 1.0) / 5.0) * 0.34;
  const isGain = netGap > 0.2;
  const isBarely = netGap >= 0 && netGap <= 0.2;

  return (
    <svg
      viewBox="0 0 360 190"
      role="img"
      aria-label={bi(
        `Diagram showing economic growth at ${growthRate.toFixed(1)}% compared with ${populationRate.toFixed(1)}% population growth`,
        `Chithunzi chosonyeza kukula kwa chuma pa ${growthRate.toFixed(1)}% poyerekeza ndi kuchuluka kwa anthu pa ${populationRate.toFixed(1)}%`
      )}
      className="w-full h-auto"
    >
      <rect width="360" height="190" rx="14" fill="#031F42" stroke="#164273" />

      <g transform="translate(115, 105)">
        <circle
          cx="0"
          cy="0"
          r="58"
          fill="none"
          stroke="#00AEEF"
          strokeWidth="2"
          strokeDasharray="5 4"
        />

        <motion.g
          animate={{scale: cakeScale}}
          transition={{type: 'spring', stiffness: 260, damping: 22}}
        >
          <circle cx="0" cy="0" r="52" fill="#0A3A72" />
          <path d="M0 0 L52 0 A52 52 0 0 1 26 45 Z" fill="#00AEEF" />
          <path d="M0 0 L26 45 A52 52 0 0 1 -26 45 Z" fill="#85C7F2" />
          <line x1="0" y1="0" x2="52" y2="0" stroke="#031F42" strokeWidth="2" />
          <line x1="0" y1="0" x2="26" y2="45" stroke="#031F42" strokeWidth="2" />
          <line x1="0" y1="0" x2="-26" y2="45" stroke="#031F42" strokeWidth="2" />
          <line x1="0" y1="0" x2="-52" y2="0" stroke="#031F42" strokeWidth="2" />
          <line x1="0" y1="0" x2="-26" y2="-45" stroke="#031F42" strokeWidth="2" />
          <line x1="0" y1="0" x2="26" y2="-45" stroke="#031F42" strokeWidth="2" />
          <circle cx="0" cy="0" r="15" fill="#F3F6FB" stroke="#00AEEF" />
          <text
            x="0"
            y="4"
            textAnchor="middle"
            fill="#052C5A"
            fontSize="10"
            fontWeight="800"
            fontFamily="JetBrains Mono, monospace"
          >
            {growthRate.toFixed(1)}%
          </text>
        </motion.g>
      </g>

      <g transform="translate(22, 16)">
        <rect width="204" height="26" rx="6" fill="#052C5A" stroke="#164273" />
        <text
          x="10"
          y="17"
          fill="#FFFFFF"
          fontSize="10.5"
          fontWeight="700"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          {bi('Economy', 'Chuma')}: +{growthRate.toFixed(1)}% · {bi('Pop', 'Anthu')}: +{populationRate.toFixed(1)}%
        </text>
      </g>

      <g transform="translate(216, 46)">
        <text
          x="0"
          y="0"
          fill="#85C7F2"
          fontSize="11"
          fontWeight="700"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          {bi('People sharing (+2.6%/yr)', 'Ogawana (+2.6%/chaka)')}
        </text>
        {[0, 1, 2, 3, 4].map((idx) => (
          <motion.g
            key={idx}
            transform={`translate(${idx * 23}, 18)`}
            animate={{y: [0, -2, 0]}}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              delay: idx * 0.25,
              ease: 'easeInOut',
            }}
          >
            <circle
              cx="8"
              cy="8"
              r="6"
              fill={idx === 4 ? '#00AEEF' : '#85C7F2'}
            />
            <path
              d="M0 26 C0 18 16 18 16 26 Z"
              fill={idx === 4 ? '#00AEEF' : '#FFFFFF'}
            />
          </motion.g>
        ))}

        <rect
          x="0"
          y="66"
          width="126"
          height="46"
          rx="8"
          fill={isGain ? '#00AEEF' : isBarely ? '#052C5A' : '#0A3A72'}
          stroke="#85C7F2"
        />
        <text
          x="10"
          y="85"
          fill={isGain ? '#052C5A' : '#FFFFFF'}
          fontSize="10.5"
          fontWeight="800"
          fontFamily="JetBrains Mono, monospace"
        >
          {bi('Net', 'Kusiyana')}: {netGap >= 0 ? `+${netGap.toFixed(1)}` : netGap.toFixed(1)}% / {bi('yr', 'chk')}
        </text>
        <text
          x="10"
          y="101"
          fill={isGain ? '#052C5A' : '#CFE8FC'}
          fontSize="9.5"
          fontFamily="DM Sans, sans-serif"
        >
          {isGain
            ? bi('Slice clearly grows!', 'Gawo likukula bwino!')
            : isBarely
            ? bi('Slice barely moves', 'Gawo silikukula kwenikweni')
            : bi('Slice shrinks per person', 'Gawo la aliyense likuchepa')}
        </text>
      </g>
    </svg>
  );
}

export function FactoryCapacityIllustration({
  activeCount = 42,
}: {
  activeCount?: number;
}) {
  const {bi} = useApp();
  const units = Array.from({length: 100}, (_, i) => i < activeCount);
  return (
    <div className="relative overflow-hidden bg-[#031F42] rounded-2xl p-5 sm:p-6 text-white shadow-xl">
      <img
        src="/src/assets/images/factory_industry_production_1795350159330.jpg"
        alt={bi(
          'Inside a Malawian agro-processing manufacturing workshop',
          'M’kati mwa fakitale yopanga katundu m’Malawi'
        )}
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-100"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#031F42]/92 via-[#052C5A]/62 to-[#031F42]/82"
      />
      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between gap-3 flex-wrap bg-[#031F42]/90 backdrop-blur-md rounded-xl px-4 py-3">
          <div className="flex items-center gap-2.5">
            <svg
              width="32"
              height="28"
              viewBox="0 0 34 30"
              aria-hidden="true"
              className="shrink-0"
            >
              <path
                d="M2 28 V14 L11 19 V14 L20 19 V12 H32 V28 Z"
                fill="#00AEEF"
              />
              <rect x="24" y="4" width="5" height="8" fill="#85C7F2" />
            </svg>
            <div>
              <div className="text-xs font-bold text-[#00AEEF]">
                {bi(
                  'ILLUSTRATIVE CAPACITY MODEL (100 POTENTIAL UNITS)',
                  'CHITSANZO CHA MPHAMVU YA FAKITALE (ZIGAWA 100)'
                )}
              </div>
              <div className="text-sm font-bold text-white">
                {activeCount < 50
                  ? bi(
                      'Operating below half (50%) capacity',
                      'Kugwira ntchito pansi pa theka (50%)'
                    )
                  : bi(
                      'Operating above half capacity',
                      'Kugwira ntchito kuposa theka'
                    )}
              </div>
            </div>
          </div>
          <div className="bg-[#052C5A] px-3 py-1.5 rounded-full font-mono text-xs font-bold text-white tabular-nums">
            {activeCount}/100 {bi('active', 'zikugwira')}
          </div>
        </div>

        <div
          role="img"
          aria-label={bi(
            `Factory output grid showing ${activeCount} active units out of 100 possible units`,
            `Chithunzi chosonyeza zigawo ${activeCount} zomwe zikugwira ntchito pa 100`
          )}
          className="grid grid-cols-10 gap-2 py-1"
        >
          {units.map((isActive, idx) => (
            <motion.div
              key={idx}
              initial={false}
              animate={{
                scale: isActive ? 1 : 0.92,
                opacity: isActive ? 1 : 0.7,
              }}
              transition={{
                duration: 0.16,
                delay: (idx % 10) * 0.012,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`h-4 sm:h-[18px] rounded-[4px] transition-colors ${
                isActive ? 'bg-[#00AEEF]' : 'bg-[#031F42]/80'
              }`}
            />
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-white bg-[#031F42]/90 backdrop-blur-md rounded-xl px-4 py-2.5">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-[3px] bg-[#00AEEF] inline-block" />
              <span>{bi(`Produced (${activeCount} units)`, `Zopangidwa (${activeCount})`)}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-[3px] bg-[#052C5A] inline-block" />
              <span>
                {bi(
                  `Unused capacity (${100 - activeCount} units)`,
                  `Zosagwiritsidwa ntchito (${100 - activeCount})`
                )}
              </span>
            </span>
          </div>
          <span className="text-[11px] text-[#B8D9F8]">
            {bi('50% line marked halfway down', 'Mlingo wa 50% uli pakati')}
          </span>
        </div>
      </div>
    </div>
  );
}

export function EducationToJobsIllustration() {
  const {bi} = useApp();

  return (
    <svg
      viewBox="0 0 640 210"
      role="img"
      aria-label={bi(
        'Visual comparison showing educated Malawian youth on one side and limited formal jobs with reliance on casual ganyu work on the other',
        'Chithunzi chosonyeza achinyamata ophunzira mbali imodzi ndi kusowa kwa ntchito zokhazikika mbali ina'
      )}
      className="w-full h-auto"
    >
      <rect width="640" height="210" rx="16" fill="#031F42" stroke="#164273" />

      <g transform="translate(20, 18)">
        <rect width="236" height="170" rx="12" fill="#F3F6FB" />
        <text
          x="18"
          y="30"
          fill="#00AEEF"
          fontSize="11"
          fontWeight="800"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          {bi('RISING EDUCATION & SKILLS', 'KUKWERA KWA MAPHUNZIRO')}
        </text>
        <g transform="translate(76, 46)">
          <polygon points="42,0 84,18 42,36 0,18" fill="#00AEEF" />
          <path d="M18 27 V46 Q42 58 66 46 V27" fill="#052C5A" />
          <line x1="76" y1="22" x2="76" y2="48" stroke="#85C7F2" strokeWidth="2.5" />
          <circle cx="76" cy="50" r="3.5" fill="#052C5A" />
        </g>
        <text
          x="118"
          y="124"
          textAnchor="middle"
          fill="#052C5A"
          fontSize="14"
          fontWeight="800"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          {bi('Youth Literacy ~90%', 'Achinyamata Odziwa ~90%')}
        </text>
        <text
          x="118"
          y="144"
          textAnchor="middle"
          fill="#475E78"
          fontSize="11"
          fontFamily="DM Sans, sans-serif"
        >
          {bi(
            'More secondary & university graduates',
            'Omaliza sekondale & koleji achuluka'
          )}
        </text>
      </g>

      <g transform="translate(268, 62)">
        <path
          d="M4 42 H98"
          stroke="#00AEEF"
          strokeWidth="3"
          strokeDasharray="6 5"
          className="animate-flow-dash"
        />
        <polygon points="94,35 106,42 94,49" fill="#00AEEF" />
        <rect x="10" y="10" width="84" height="24" rx="12" fill="#00AEEF" />
        <text
          x="52"
          y="25"
          textAnchor="middle"
          fill="#052C5A"
          fontSize="9.5"
          fontWeight="800"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          {bi('JOBS GAP*', 'MPATA WA NTCHITO*')}
        </text>
        <text
          x="52"
          y="68"
          textAnchor="middle"
          fill="#85C7F2"
          fontSize="10.5"
          fontWeight="700"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          {bi('Too few openings', 'Mipata yochepa')}
        </text>
      </g>

      <g transform="translate(384, 18)">
        <rect width="236" height="170" rx="12" fill="#F3F6FB" />
        <text
          x="18"
          y="30"
          fill="#052C5A"
          fontSize="11"
          fontWeight="800"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          {bi('LIMITED FORMAL EMPLOYMENT', 'NTCHITO ZOKHAZIKIKA ZOCHEPETSA')}
        </text>

        <g transform="translate(22, 48)">
          <rect width="84" height="58" rx="8" fill="#FFFFFF" stroke="#85C7F2" />
          <text
            x="42"
            y="26"
            textAnchor="middle"
            fill="#052C5A"
            fontSize="15"
            fontWeight="800"
            fontFamily="JetBrains Mono, monospace"
          >
            &lt;4%
          </text>
          <text
            x="42"
            y="43"
            textAnchor="middle"
            fill="#475E78"
            fontSize="9.5"
            fontFamily="DM Sans, sans-serif"
          >
            {bi('Formal youth jobs', 'Ntchito zokhazikika')}
          </text>
        </g>

        <g transform="translate(118, 48)">
          <rect width="98" height="58" rx="8" fill="#052C5A" />
          <text
            x="49"
            y="26"
            textAnchor="middle"
            fill="#00AEEF"
            fontSize="15"
            fontWeight="800"
            fontFamily="JetBrains Mono, monospace"
          >
            27.6%
          </text>
          <text
            x="49"
            y="43"
            textAnchor="middle"
            fill="#CFE8FC"
            fontSize="9.5"
            fontFamily="DM Sans, sans-serif"
          >
            {bi('Youth in ganyu', 'Achinyamata mu ganyu')}
          </text>
        </g>

        <text
          x="118"
          y="132"
          textAnchor="middle"
          fill="#052C5A"
          fontSize="12"
          fontWeight="800"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          {bi('Many rely on ganyu & farming', 'Ambiri amadalira ganyu & ulimi')}
        </text>
        <text
          x="118"
          y="149"
          textAnchor="middle"
          fill="#475E78"
          fontSize="10.5"
          fontFamily="DM Sans, sans-serif"
        >
          {bi(
            'Lower-return work absorbs graduates',
            'Ntchito zaphindu lochepa zimatenga omaliza sukulu'
          )}
        </text>
      </g>
    </svg>
  );
}
