import type {EconomicReport} from '../types';

export const REPORTS: EconomicReport[] = [
  {
    id: 'mem-sept-2026',
    slug: 'malawi-economic-monitor-september-2026',
    title: {
      en: 'Malawi Economic Monitor: Building Stability to Unlock Growth',
      ny: 'Malawi Economic Monitor: Kukhazikitsa Chuma Kuti Chikule (Seputembala 2026)',
      nyReviewStatus: 'pending_expert_review',
    },
    shortTitle: 'Malawi Economic Monitor',
    publisher: 'World Bank',
    country: 'Malawi',
    year: 2026,
    editionLabel: 'September 2026 · 23rd Edition',
    summary: {
      en: 'Verified insights from the September 2026 World Bank Malawi Economic Monitor — featuring a plain-language breakdown of Page 17 (2026 growth outlook, population growth, and structural bottlenecks) alongside key macro indicators and policy priorities.',
      ny: 'Mfundo zowona kuchokera mu lipoti la World Bank la Seputembala 2026 — zofotokoza Tsamba 17 (kukula kwa chuma mu 2026, chiwerengero cha anthu, ndi zopinga za chuma) m’chiyankhulo chosavuta.',
      nyReviewStatus: 'pending_expert_review',
    },
    verificationStatus: 'verified',
    sourceUrl:
      '/assets/aistudio/MALAWI_ECONOMIC_MONITOR_BUILDING_STABILITY_TO_UNLOCK_GROWTH_a1ee2546.pdf',
  },
  {
    id: 'mem-2024-sample',
    slug: 'malawi-economic-monitor-2024',
    title: {
      en: 'Malawi Economic Monitor (Illustrative Sample)',
      ny: 'Malawi Economic Monitor (Chitsanzo Chosavomerezedwa)',
      nyReviewStatus: 'pending_expert_review',
    },
    shortTitle: 'Malawi Economic Monitor (Sample)',
    publisher: 'World Bank',
    country: 'Malawi',
    year: 2024,
    editionLabel: '2024 Sample Edition',
    summary: {
      en: 'An illustrative educational template showing how earlier report editions plug into the multi-report architecture. Sample data shown pending official verification.',
      ny: 'Chitsanzo cha momwe lipoti la World Bank la Malawi Economic Monitor limafotokozera za chuma, mitengo ya katundu, ngongole, malonda, ulimi, ndi ntchito m’chiyankhulo chosavuta.',
      nyReviewStatus: 'pending_expert_review',
    },
    verificationStatus: 'sample_pending_verification',
    sourceUrl:
      'https://www.worldbank.org/en/country/malawi/publication/malawi-economic-monitor',
  },
  {
    id: 'mem-2023-sample',
    slug: 'malawi-economic-monitor-2023',
    title: {
      en: 'Malawi Economic Monitor — Archive Edition (Illustrative Sample)',
      ny: 'Malawi Economic Monitor — Buku Lakale (Chitsanzo)',
      nyReviewStatus: 'pending_expert_review',
    },
    shortTitle: 'Malawi Economic Monitor (Archive)',
    publisher: 'World Bank',
    country: 'Malawi',
    year: 2023,
    editionLabel: '2023 Sample Archive',
    summary: {
      en: 'An illustrative archive edition demonstrating multi-report switching across reporting years. Contains sample educational figures pending official report verification.',
      ny: 'Chitsanzo cha lipoti lakale losonyeza momwe malipoti osiyanasiyana angasinthidwire pa tsambali.',
      nyReviewStatus: 'pending_expert_review',
    },
    verificationStatus: 'sample_pending_verification',
    sourceUrl:
      'https://www.worldbank.org/en/country/malawi/publication/malawi-economic-monitor',
  },
];

export const DEFAULT_REPORT_ID = 'mem-sept-2026';
