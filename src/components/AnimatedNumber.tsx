import {useCountUp} from '../hooks/useCountUp';
import {formatIndicatorNumber} from '../utils/formatting';

interface AnimatedNumberProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  startOnMount?: boolean;
  className?: string;
}

export function AnimatedNumber({
  value,
  decimals = 1,
  prefix = '',
  suffix = '',
  durationMs = 1100,
  startOnMount = false,
  className = '',
}: AnimatedNumberProps) {
  const {ref, displayValue} = useCountUp<HTMLSpanElement>({
    target: value,
    decimals,
    durationMs,
    startOnMount,
  });

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {formatIndicatorNumber(displayValue, decimals, prefix, suffix)}
    </span>
  );
}

interface AnimatedStatTextProps {
  text: string;
  durationMs?: number;
  startOnMount?: boolean;
  className?: string;
}

const STAT_PATTERN = /^([<>~+≈\-]*\s*(?:US\$|\$|MK|K)?)(-?\d+(?:\.\d+)?)(.*)$/;

export function AnimatedStatText({
  text,
  durationMs = 1100,
  startOnMount = false,
  className = '',
}: AnimatedStatTextProps) {
  const match = text.trim().match(STAT_PATTERN);

  // Skip strings that aren't numeric statistics (e.g., "Services") or non-metric text
  if (!match) {
    return <span className={className}>{text}</span>;
  }

  const prefix = match[1] ?? '';
  const numericStr = match[2];
  const suffix = match[3] ?? '';
  const target = Number.parseFloat(numericStr);

  if (Number.isNaN(target)) {
    return <span className={className}>{text}</span>;
  }

  // Do not count up words like "1 region"
  if (/[a-zA-Z]{2,}/.test(suffix.trim()) && !/^(B|M|K|pts|months)$/i.test(suffix.trim())) {
    return <span className={className}>{text}</span>;
  }

  const dotIdx = numericStr.indexOf('.');
  const decimals = dotIdx >= 0 ? numericStr.length - dotIdx - 1 : 0;

  return (
    <AnimatedNumber
      value={target}
      decimals={decimals}
      prefix={prefix}
      suffix={suffix}
      durationMs={durationMs}
      startOnMount={startOnMount}
      className={className}
    />
  );
}
