import type {
  LanguageCode,
  LocalizedText,
  TopicIconName,
} from '../types';
import {
  ArrowLeftRight,
  BarChart3,
  Briefcase,
  Coins,
  Factory,
  Landmark,
  Scale,
  ShieldCheck,
  Ship,
  ShoppingBasket,
  Sprout,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export function resolveLocalizedText(
  text: LocalizedText,
  language: LanguageCode
): { value: string; isPendingChichewa: boolean; isDraftChichewa: boolean } {
  if (language === 'ny') {
    if (text.ny && text.ny.trim().length > 0) {
      return {
        value: text.ny,
        isPendingChichewa: false,
        isDraftChichewa: text.nyReviewStatus !== 'verified',
      };
    }
    return {
      value: text.en,
      isPendingChichewa: true,
      isDraftChichewa: false,
    };
  }
  return {
    value: text.en,
    isPendingChichewa: false,
    isDraftChichewa: false,
  };
}

export function formatIndicatorNumber(
  value: number,
  decimals = 1,
  prefix = '',
  suffix = ''
): string {
  const formatted = value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${prefix}${formatted}${suffix}`;
}

const ICON_MAP: Record<TopicIconName, LucideIcon> = {
  TrendingUp,
  ShoppingBasket,
  Landmark,
  Ship,
  Briefcase,
  Sprout,
  ArrowLeftRight,
  Wallet,
  Coins,
  BarChart3,
  ShieldCheck,
  Scale,
  Factory,
};

export function getTopicIcon(name: TopicIconName): LucideIcon {
  return ICON_MAP[name] ?? BarChart3;
}
