import {Info} from 'lucide-react';
import {useEffect, useId, useState} from 'react';
import {useApp} from '../context/AppContext';
import type {TopicVisualConfig} from '../data/topicVisuals';
import type {SourceReference} from '../types';

interface TopicChartCardProps {
  config: TopicVisualConfig;
  topicId: string;
  onInspectSource: (source: SourceReference) => void;
}

function buildSmoothCurvePoints(
  values: number[],
  maxVal: number,
  width: number,
  height: number
) {
  const padLeft = 44;
  const padRight = 24;
  const padTop = 22;
  const padBottom = 18;
  const usableW = width - padLeft - padRight;
  const usableH = height - padTop - padBottom;
  const safeMax = maxVal > 0 ? maxVal : 1;

  const coords = values.map((val, idx) => {
    const x =
      values.length > 1
        ? padLeft + (idx / (values.length - 1)) * usableW
        : padLeft + usableW / 2;
    const clampedRatio = Math.max(0, Math.min(1, val / safeMax));
    const y = padTop + (1 - clampedRatio) * usableH;
    return {x, y};
  });

  if (coords.length === 0) {
    return {linePath: '', areaPath: '', coords: []};
  }

  let linePath = `M ${coords[0].x.toFixed(1)} ${coords[0].y.toFixed(1)}`;
  for (let i = 0; i < coords.length - 1; i++) {
    const p0 = coords[i];
    const p1 = coords[i + 1];
    const cx = ((p0.x + p1.x) / 2).toFixed(1);
    linePath += ` C ${cx} ${p0.y.toFixed(1)}, ${cx} ${p1.y.toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
  }

  const bottomY = (height - padBottom).toFixed(1);
  const last = coords[coords.length - 1];
  const areaPath = `${linePath} L ${last.x.toFixed(1)} ${bottomY} L ${coords[0].x.toFixed(1)} ${bottomY} Z`;

  return {linePath, areaPath, coords, bottomY: Number(bottomY)};
}

function describeDonutSlice(
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  startAngleDeg: number,
  endAngleDeg: number
) {
  const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180;
  const x1 = cx + outerR * Math.cos(toRad(startAngleDeg));
  const y1 = cy + outerR * Math.sin(toRad(startAngleDeg));
  const x2 = cx + outerR * Math.cos(toRad(endAngleDeg));
  const y2 = cy + outerR * Math.sin(toRad(endAngleDeg));
  const x3 = cx + innerR * Math.cos(toRad(endAngleDeg));
  const y3 = cy + innerR * Math.sin(toRad(endAngleDeg));
  const x4 = cx + innerR * Math.cos(toRad(startAngleDeg));
  const y4 = cy + innerR * Math.sin(toRad(startAngleDeg));
  const largeArc = endAngleDeg - startAngleDeg > 180 ? 1 : 0;

  return [
    `M ${x1.toFixed(2)} ${y1.toFixed(2)}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`,
    `L ${x3.toFixed(2)} ${y3.toFixed(2)}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${x4.toFixed(2)} ${y4.toFixed(2)}`,
    'Z',
  ].join(' ');
}

export function TopicChartCard({
  config,
  topicId,
  onInspectSource,
}: TopicChartCardProps) {
  const {bi, language} = useApp();
  const gradId = useId();
  const defaultIndex = Math.max(0, config.points.length - 1);
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);

  useEffect(() => {
    setSelectedIndex(Math.max(0, config.points.length - 1));
  }, [topicId, config.points.length]);

  const activePoint =
    config.points[selectedIndex] ?? config.points[config.points.length - 1];

  const unitLabel = bi(config.unitLabel, config.unitLabelNy);
  const chartTitle = bi(config.chartTitle, config.chartTitleNy);
  const pageLabel = bi(config.pageLabel, config.pageLabelNy);

  const values = config.points.map((p) => p.value);
  const rawMax = Math.max(
    ...values,
    config.referenceTarget ? config.referenceTarget.value : 0
  );
  const yMax = rawMax > 0 ? Number((rawMax * 1.15).toFixed(1)) : 10;
  const yMid = Number((yMax / 2).toFixed(1));

  const svgWidth = 620;
  const svgHeight = 195;
  const {linePath, areaPath, coords, bottomY} = buildSmoothCurvePoints(
    values,
    yMax,
    svgWidth,
    svgHeight
  );

  const activeLabel =
    language === 'ny' && activePoint?.labelNy
      ? activePoint.labelNy
      : activePoint?.label;
  const activeAnnotation = activePoint
    ? bi(activePoint.annotation, activePoint.annotationNy)
    : '';

  return (
    <section
      aria-label={chartTitle}
      className="relative overflow-hidden rounded-3xl bg-[#031F42] p-5 sm:p-8 shadow-2xl"
    >
      {/* Relatable Documentary Photograph Background */}
      <img
        src={config.image}
        alt=""
        aria-hidden="true"
        referrerPolicy="no-referrer"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#031F42]/92 via-[#031F42]/50 to-[#031F42]/95"
      />

      {/* Top Row: Chart Unit, Title, Active Readout & Source Button */}
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className="space-y-1.5 min-w-0">
          <div className="text-xs sm:text-sm font-medium text-[#B8D9F8]">
            {unitLabel}
          </div>
          <h2
            className="font-display font-bold text-lg sm:text-2xl text-white leading-snug"
            style={{textWrap: 'balance'}}
          >
            {chartTitle}
          </h2>

          {activePoint && (
            <div className="pt-1 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
              <span
                className="font-display-num font-extrabold text-2xl sm:text-3xl tracking-tight drop-shadow-[0_2px_10px_rgba(3,31,66,0.9)]"
                style={{color: activePoint.sliceColor ?? config.accentColor}}
              >
                {activePoint.displayValue}
              </span>
              <span className="font-display-num text-xs sm:text-sm font-semibold text-white/90">
                {config.chartType === 'pie'
                  ? activeLabel
                  : bi(`in ${activeLabel}`, `mu ${activeLabel}`)}
              </span>
              <span className="text-xs sm:text-sm text-[#DCEBFC] font-medium">
                {activeAnnotation}
              </span>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => onInspectSource(config.source)}
          aria-label={bi(
            `View report source for ${chartTitle}`,
            `Onani gwero la ${chartTitle}`
          )}
          title={bi('View report quote', 'Onani mawu a m’lipoti')}
          className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-[#00AEEF] hover:text-[#052C5A] text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer"
        >
          <Info aria-hidden="true" className="w-4 h-4" />
        </button>
      </div>

      {/* Middle: Interactive Chart Area (Line, Pie, or Bar) */}
      <div className="relative z-10 mt-6 mb-4">
        {config.chartType === 'pie' ? (
          (() => {
            const total = values.reduce((sum, v) => sum + Math.max(0, v), 0) || 1;
            const palette = [config.accentColor, '#00AEEF', '#22C55E', '#F59E0B'];
            let cursorDeg = 0;
            const slices = config.points.map((pt, idx) => {
              const share = Math.max(0, pt.value) / total;
              const sweep = Math.max(2, share * 360);
              const startDeg = cursorDeg;
              const endDeg = cursorDeg + sweep;
              cursorDeg = endDeg;
              const pct = Math.round(share * 100);
              const color = pt.sliceColor ?? palette[idx % palette.length];
              return {pt, idx, startDeg, endDeg, pct, color};
            });

            return (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 py-2">
                <div className="relative w-48 h-48 sm:w-52 sm:h-52 shrink-0 flex items-center justify-center">
                  <svg
                    viewBox="0 0 220 220"
                    className="w-full h-full overflow-visible"
                    role="img"
                    aria-label={chartTitle}
                  >
                    {slices.map((s) => {
                      const isActive = s.idx === selectedIndex;
                      const gap = slices.length > 1 ? 1.6 : 0;
                      const d = describeDonutSlice(
                        110,
                        110,
                        isActive ? 92 : 84,
                        50,
                        s.startDeg + gap,
                        s.endDeg - gap
                      );
                      const ptLabel =
                        language === 'ny' && s.pt.labelNy
                          ? s.pt.labelNy
                          : s.pt.label;
                      return (
                        <path
                          key={s.pt.label}
                          d={d}
                          fill={s.color}
                          fillOpacity={isActive ? 1 : 0.72}
                          stroke="#031F42"
                          strokeWidth="2"
                          onClick={() => setSelectedIndex(s.idx)}
                          className="cursor-pointer transition-all duration-300"
                          style={{
                            filter: isActive
                              ? `drop-shadow(0 0 14px ${s.color}99)`
                              : undefined,
                          }}
                        >
                          <title>
                            {ptLabel}: {s.pt.displayValue} ({s.pct}%)
                          </title>
                        </path>
                      );
                    })}
                  </svg>

                  {/* Center Readout */}
                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <span className="font-display-num font-extrabold text-lg sm:text-xl text-white leading-none">
                      {config.pieCenterValue ?? activePoint?.displayValue}
                    </span>
                    <span className="mt-1 text-[11px] font-semibold text-[#B8D9F8]">
                      {bi(
                        config.pieCenterLabel ?? '',
                        config.pieCenterLabelNy ?? config.pieCenterLabel ?? ''
                      )}
                    </span>
                  </div>
                </div>

                {/* Clickable Slice Legend */}
                <div className="w-full max-w-xs space-y-2.5">
                  {slices.map((s) => {
                    const isActive = s.idx === selectedIndex;
                    const label =
                      language === 'ny' && s.pt.labelNy
                        ? s.pt.labelNy
                        : s.pt.label;
                    return (
                      <button
                        key={s.pt.label}
                        type="button"
                        onClick={() => setSelectedIndex(s.idx)}
                        aria-pressed={isActive}
                        className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl text-left transition-all cursor-pointer ${
                          isActive
                            ? 'bg-white/15 backdrop-blur-sm ring-1 ring-white/30'
                            : 'bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            aria-hidden="true"
                            className="w-3 h-3 rounded-full shrink-0"
                            style={{
                              backgroundColor: s.color,
                              boxShadow: isActive ? `0 0 10px ${s.color}` : undefined,
                            }}
                          />
                          <span className="text-xs sm:text-sm font-semibold text-white truncate">
                            {label}
                          </span>
                        </div>
                        <span className="font-display-num text-xs sm:text-sm font-bold text-[#DCEBFC] shrink-0">
                          {s.pt.displayValue}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })()
        ) : config.chartType === 'line' ? (
          <div className="space-y-2">
            <div className="relative w-full">
              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full h-44 sm:h-52 overflow-visible"
                role="img"
                aria-label={chartTitle}
              >
                <defs>
                  <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor={config.accentColor}
                      stopOpacity="0.45"
                    />
                    <stop
                      offset="100%"
                      stopColor={config.accentColor}
                      stopOpacity="0.02"
                    />
                  </linearGradient>
                </defs>

                {/* Subtle Y-axis reference labels & dashed baseline guides */}
                {[
                  {label: yMax.toFixed(1), y: 22},
                  {label: yMid.toFixed(1), y: 100},
                  {label: '0', y: bottomY ?? 177},
                ].map((tick) => (
                  <g key={tick.label}>
                    <text
                      x={32}
                      y={tick.y + 4}
                      textAnchor="end"
                      className="fill-[#B8D9F8]/75 font-display-num text-[11px]"
                    >
                      {tick.label}
                    </text>
                    <line
                      x1={44}
                      y1={tick.y}
                      x2={svgWidth - 20}
                      y2={tick.y}
                      stroke="#FFFFFF"
                      strokeOpacity="0.1"
                      strokeDasharray={tick.label === '0' ? undefined : '4 4'}
                    />
                  </g>
                ))}

                {/* Area gradient fill & smooth curve */}
                <path d={areaPath} fill={`url(#${gradId})`} />
                <path
                  d={linePath}
                  fill="none"
                  stroke={config.accentColor}
                  strokeWidth="4"
                  strokeLinecap="round"
                  style={{
                    filter: `drop-shadow(0 0 10px ${config.accentColor})`,
                  }}
                />

                {/* Active vertical dashed guide line */}
                {coords[selectedIndex] && (
                  <line
                    x1={coords[selectedIndex].x}
                    y1={coords[selectedIndex].y}
                    x2={coords[selectedIndex].x}
                    y2={bottomY ?? 177}
                    stroke="#FFFFFF"
                    strokeOpacity="0.4"
                    strokeDasharray="4 4"
                  />
                )}

                {/* Interactive point circles */}
                {coords.map((pt, idx) => {
                  const isActive = idx === selectedIndex;
                  const pointData = config.points[idx];
                  const ptLabel =
                    language === 'ny' && pointData?.labelNy
                      ? pointData.labelNy
                      : pointData?.label;
                  return (
                    <g
                      key={pointData?.label ?? idx}
                      onClick={() => setSelectedIndex(idx)}
                      className="cursor-pointer"
                    >
                      <circle cx={pt.x} cy={pt.y} r={22} fill="transparent" />
                      {isActive && (
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={12}
                          fill={config.accentColor}
                          fillOpacity={0.3}
                        />
                      )}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isActive ? 6.5 : 4.5}
                        fill={isActive ? '#FFFFFF' : config.accentColor}
                        stroke={isActive ? config.accentColor : '#031F42'}
                        strokeWidth={isActive ? 3 : 2}
                      />
                      <title>
                        {ptLabel}: {pointData?.displayValue}
                      </title>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Interactive X-axis year selector */}
            <div
              className="grid gap-1 pt-1 pl-7 pr-2"
              style={{
                gridTemplateColumns: `repeat(${config.points.length}, minmax(0, 1fr))`,
              }}
            >
              {config.points.map((pt, idx) => {
                const isActive = idx === selectedIndex;
                const label =
                  language === 'ny' && pt.labelNy ? pt.labelNy : pt.label;
                return (
                  <button
                    key={pt.label}
                    type="button"
                    onClick={() => setSelectedIndex(idx)}
                    className={`font-display-num py-1.5 rounded-lg text-xs sm:text-sm transition-all cursor-pointer ${
                      isActive
                        ? 'font-extrabold text-white bg-white/15 backdrop-blur-sm'
                        : 'font-medium text-[#B8D9F8]/80 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Rounded Interactive Bar Chart */
          <div className="space-y-2.5">
            <div className="relative h-44 sm:h-52 flex items-end gap-3 sm:gap-5 pt-6 pl-9 pr-2">
              {/* Y-axis scale marks */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-5 bottom-1 flex flex-col justify-between text-right w-7 font-display-num text-[11px] text-[#B8D9F8]/75"
              >
                <span>{yMax}</span>
                <span>{yMid}</span>
                <span>0</span>
              </div>

              {/* Subtle background dashed guides */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-9 right-2 top-6 bottom-1 flex flex-col justify-between"
              >
                <div className="h-px w-full bg-white/10" />
                <div className="h-px w-full bg-white/10" />
                <div className="h-px w-full bg-white/15" />
              </div>

              {config.points.map((pt, idx) => {
                const isActive = idx === selectedIndex;
                const heightPct = Math.max(
                  10,
                  Math.min(100, Math.round((pt.value / yMax) * 100))
                );
                const barTint = pt.isReferenceTarget
                  ? '#85C7F2'
                  : config.accentColor;

                return (
                  <button
                    key={pt.label}
                    type="button"
                    onClick={() => setSelectedIndex(idx)}
                    className="relative z-10 flex-1 h-full flex flex-col justify-end items-center group cursor-pointer focus:outline-none"
                    aria-pressed={isActive}
                  >
                    <span
                      className={`font-display-num text-[11px] sm:text-xs font-bold mb-1.5 transition-all ${
                        isActive
                          ? 'text-white opacity-100 translate-y-0'
                          : 'text-[#B8D9F8]/80 opacity-85 group-hover:opacity-100'
                      }`}
                    >
                      {pt.displayValue}
                    </span>
                    <div
                      className="w-full max-w-[68px] rounded-xl transition-all duration-300"
                      style={{
                        height: `${heightPct}%`,
                        backgroundColor: barTint,
                        opacity: isActive ? 0.98 : pt.isReferenceTarget ? 0.32 : 0.48,
                        boxShadow: isActive
                          ? `0 0 24px ${barTint}66`
                          : undefined,
                      }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Interactive X-axis year/period labels */}
            <div
              className="grid gap-3 sm:gap-5 pl-9 pr-2"
              style={{
                gridTemplateColumns: `repeat(${config.points.length}, minmax(0, 1fr))`,
              }}
            >
              {config.points.map((pt, idx) => {
                const isActive = idx === selectedIndex;
                const label =
                  language === 'ny' && pt.labelNy ? pt.labelNy : pt.label;
                return (
                  <button
                    key={pt.label}
                    type="button"
                    onClick={() => setSelectedIndex(idx)}
                    className={`font-display-num py-1.5 px-1 rounded-lg text-xs sm:text-sm transition-all cursor-pointer truncate ${
                      isActive
                        ? 'font-extrabold text-white bg-white/15 backdrop-blur-sm'
                        : 'font-medium text-[#B8D9F8]/80 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer Citation & Interactive Prompt */}
      <div className="relative z-10 pt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-[#9AC2EA]">
        <span className="font-display-num font-medium">{pageLabel}</span>
        <span className="font-medium text-[#B8D9F8]">
          {config.chartType === 'pie'
            ? bi('Tap any slice to inspect', 'Dinani gawo kuti muwone')
            : bi('Tap any point to inspect', 'Dinani chaka kuti muwone')}
        </span>
      </div>
    </section>
  );
}
