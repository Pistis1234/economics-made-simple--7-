import type {SourceReference, TopicIconName} from '../types';
import {PHOTO_ASSETS} from './photoAssets';

const PDF_URL =
  '/assets/aistudio/MALAWI_ECONOMIC_MONITOR_BUILDING_STABILITY_TO_UNLOCK_GROWTH_a1ee2546.pdf';

export interface PageNumberItem {
  id: string;
  pageGroup: 'Page 17' | 'Page 18';
  pageGroupNy: string;
  title: string;
  titleNy: string;
  value: number;
  decimals: number;
  prefix?: string;
  suffix?: string;
  briefSummary: string;
  briefSummaryNy: string;
  trendNote: string;
  trendNoteNy: string;
  trendDirection: 'positive' | 'caution' | 'pressure';
  trendSeries: number[];
  image: string;
  iconName: TopicIconName;
  topicSlug: string;
  pieShare?: number;
  pieLabel?: string;
  pieLabelNy?: string;
  pieRestLabel?: string;
  pieRestLabelNy?: string;
  source: SourceReference;
}

const IMG = {
  economy: PHOTO_ASSETS.harvestHills,
  farmingPlow: PHOTO_ASSETS.maizePlowing,
  market: PHOTO_ASSETS.marketBaskets,
  priceSigns: PHOTO_ASSETS.marketPriceSigns,
  farmersVeg: PHOTO_ASSETS.farmersVegetables,
  solar: PHOTO_ASSETS.solarGrid,
  tailor: PHOTO_ASSETS.tailorShop,
  workshop: PHOTO_ASSETS.workshopJobs,
  youth: PHOTO_ASSETS.youthLiteracy,
  inequality: PHOTO_ASSETS.inequalityContrast,
};

const makeSource = (
  page: 17 | 18,
  pageReference: string,
  originalWording: string
): SourceReference => ({
  reportId: 'mem-sept-2026',
  reportTitle: 'Malawi Economic Monitor: Building Stability to Unlock Growth',
  publisher: 'World Bank',
  publicationYear: 2026,
  pageReference,
  originalWording,
  sourceUrl: `${PDF_URL}#page=${page}`,
  sourceType: 'direct_report',
  verificationStatus: 'verified',
});

export const PAGE_17_18_NUMBERS: PageNumberItem[] = [
  {
    id: 'p17-gdp-2026',
    pageGroup: 'Page 17',
    pageGroupNy: 'Tsamba 17',
    title: 'Projected 2026 GDP growth',
    titleNy: 'Kukula kwa Chuma mu 2026',
    value: 2.7,
    decimals: 1,
    suffix: '%',
    briefSummary:
      'Up from 2.5%—barely ahead of 2.6% population growth.',
    briefSummaryNy:
      'Kuchokera pa 2.5%—ikungoposa kuchuluka kwa anthu (2.6%) pang’ono.',
    trendNote: 'Up from 2.5% in 2025 (vs 2.6% pop.)',
    trendNoteNy: 'Chakwera kuchoka pa 2.5% mu 2025',
    trendDirection: 'positive',
    trendSeries: [32, 62, 42, 46, 56],
    image: IMG.economy,
    iconName: 'TrendingUp',
    topicSlug: 'economic-growth',
    source: makeSource(
      17,
      'Page 17 · Section 1.2',
      'Malawi’s GDP is projected to grow by 2.7 percent in 2026, up from an estimated 2.5 percent in 2025.'
    ),
  },
  {
    id: 'p17-gdp-2025',
    pageGroup: 'Page 17',
    pageGroupNy: 'Tsamba 17',
    title: '2025 Economic Growth',
    titleNy: 'Kukula kwa Chuma mu 2025',
    value: 2.5,
    decimals: 1,
    suffix: '%',
    briefSummary:
      'Last year’s pace—slightly slower than population growth.',
    briefSummaryNy:
      'Kukula kwa chuma mu 2025—kunali pansi pa kukula kwa anthu.',
    trendNote: 'Below 2.6% yearly population pace',
    trendNoteNy: 'Pansi pa kukula kwa anthu (2.6%)',
    trendDirection: 'caution',
    trendSeries: [52, 46, 40, 44, 48],
    image: IMG.farmingPlow,
    iconName: 'TrendingUp',
    topicSlug: 'economic-growth',
    source: makeSource(
      17,
      'Page 17 · Section 1.2',
      'Malawi’s GDP is projected to grow by 2.7 percent in 2026, up from an estimated 2.5 percent in 2025.'
    ),
  },
  {
    id: 'p17-population',
    pageGroup: 'Page 17',
    pageGroupNy: 'Tsamba 17',
    title: 'Annual Population Growth',
    titleNy: 'Kukula kwa Chiwerengero cha Anthu',
    value: 2.6,
    decimals: 1,
    suffix: '%',
    briefSummary:
      'Yearly population pace leaves only +0.1% income gain.',
    briefSummaryNy:
      'Kuchuluka kwa anthu kumasiya mpata wa +0.1% yokha ya phindu.',
    trendNote: 'Steady 2.6% annual expansion',
    trendNoteNy: 'Kukula kwa 2.6% chaka chilichonse',
    trendDirection: 'caution',
    trendSeries: [46, 52, 58, 64, 70],
    image: IMG.market,
    iconName: 'Scale',
    topicSlug: 'economic-growth',
    source: makeSource(
      17,
      'Page 17 · Section 1.2',
      'While this would mark the first time in five years that GDP expansion outpaces the country’s rate of population growth, which stands at 2.6 percent per year, this pace of economic growth remains too slow to push a significant number of people out of poverty.'
    ),
  },
  {
    id: 'p18-firm-capacity',
    pageGroup: 'Page 18',
    pageGroupNy: 'Tsamba 18',
    title: 'Firms under 50% capacity',
    titleNy: 'Mabizinesi Pansi pa Theka',
    value: 50,
    decimals: 0,
    prefix: '>',
    suffix: '%',
    briefSummary:
      'Over half of firms run under half-speed from scarce US dollars.',
    briefSummaryNy:
      'Opitilira theka la makampani akugwira ntchito pansi pa 50% chifukwa chosowa madola.',
    trendNote: '2025 MCCCI business survey',
    trendNoteNy: 'Kafukufuku wa MCCCI wa 2025',
    trendDirection: 'pressure',
    trendSeries: [78, 68, 52, 40, 32],
    image: IMG.solar,
    iconName: 'Landmark',
    topicSlug: 'exchange-rates',
    pieShare: 50,
    pieLabel: '>50% under half',
    pieLabelNy: '>50% pansi pa theka',
    pieRestLabel: 'Rest higher',
    pieRestLabelNy: 'Ena pamwamba',
    source: makeSource(
      18,
      'Page 18 · 2025 MCCCI Survey',
      'A 2025 survey by the Malawi Confederation of Chambers of Commerce and Industry shows foreign-exchange availability and inflation remain the top constraints for businesses, with over half of firms operating at less than 50-percent capacity.'
    ),
  },
  {
    id: 'p18-formal-adults',
    pageGroup: 'Page 18',
    pageGroupNy: 'Tsamba 18',
    title: 'Adults in Formal Jobs',
    titleNy: 'Akuluakulu M’ntchito Zokhazikika',
    value: 12,
    decimals: 0,
    prefix: '~',
    suffix: '%',
    briefSummary:
      'Only ~12 in 100 adults (25–54) hold steady salaried jobs.',
    briefSummaryNy:
      'Akulu ~12 okha pa 100 (zaka 25–54) ali ndi ntchito zokhazikika.',
    trendNote: 'Ages 25–54 formal wage share',
    trendNoteNy: 'Ntchito zokhazikika (zaka 25–54)',
    trendDirection: 'caution',
    trendSeries: [38, 36, 35, 34, 32],
    image: IMG.tailor,
    iconName: 'Briefcase',
    topicSlug: 'employment',
    pieShare: 12,
    pieLabel: '~12% formal wage',
    pieLabelNy: '~12% okhazikika',
    pieRestLabel: '~88% informal',
    pieRestLabelNy: '~88% zina',
    source: makeSource(
      18,
      'Page 18 · Box 1.1',
      'Formal wage employment remains rare, only encompassing around 12 percent of prime-age adults—those aged 25–54, and less than 4 percent of young people—those aged 15–24.'
    ),
  },
  {
    id: 'p18-formal-youth',
    pageGroup: 'Page 18',
    pageGroupNy: 'Tsamba 18',
    title: 'Youth in Formal Jobs',
    titleNy: 'Achinyamata M’ntchito Zokhazikika',
    value: 4,
    decimals: 0,
    prefix: '< ',
    suffix: '%',
    briefSummary:
      'Under 4 in 100 youth (15–24) hold steady salaried jobs.',
    briefSummaryNy:
      'Ochepera 4 pa 100 achinyamata (15–24) ali ndi ntchito zokhazikika.',
    trendNote: 'Box 1.1 · Rare formal youth jobs',
    trendNoteNy: 'Ntchito zokhazikika zochepa (15–24)',
    trendDirection: 'pressure',
    trendSeries: [46, 38, 34, 28, 22],
    image: IMG.workshop,
    iconName: 'Briefcase',
    topicSlug: 'employment',
    pieShare: 4,
    pieLabel: '<4% formal wage',
    pieLabelNy: '<4% okhazikika',
    pieRestLabel: '>96% other work',
    pieRestLabelNy: '>96% zina',
    source: makeSource(
      18,
      'Page 18 · Box 1.1',
      'Formal wage employment remains rare, only encompassing around 12 percent of prime-age adults—those aged 25–54, and less than 4 percent of young people—those aged 15–24.'
    ),
  },
  {
    id: 'p18-ganyu-youth',
    pageGroup: 'Page 18',
    pageGroupNy: 'Tsamba 18',
    title: 'Youth Relying on Ganyu',
    titleNy: 'Achinyamata Amene Amadalira Ganyu',
    value: 27.6,
    decimals: 1,
    suffix: '%',
    briefSummary:
      'Working youth in casual ganyu rose from 21.3% in 2020.',
    briefSummaryNy:
      'Achinyamata pa ganyu anakwera kuchokera pa 21.3% mu 2020.',
    trendNote: 'Up from 21.3% in 2020 (IHS5 → IHS6)',
    trendNoteNy: 'Chakwera kuchoka pa 21.3% mu 2020',
    trendDirection: 'pressure',
    trendSeries: [34, 42, 54, 66, 78],
    image: IMG.farmersVeg,
    iconName: 'Sprout',
    topicSlug: 'employment',
    pieShare: 27.6,
    pieLabel: '27.6% casual ganyu',
    pieLabelNy: '27.6% ganyu',
    pieRestLabel: '72.4% other work',
    pieRestLabelNy: '72.4% zina',
    source: makeSource(
      18,
      'Page 18 · Box 1.1 & Figure B1.1.1',
      'Among workers in each age group, the share classified as working in ganyu (casual labor) increased between 2020 (IHS5) and 2024 (IHS6): from 21.3 to 27.6 percent among youth.'
    ),
  },
  {
    id: 'p18-youth-literacy',
    pageGroup: 'Page 18',
    pageGroupNy: 'Tsamba 18',
    title: 'Youth Literacy Rate',
    titleNy: 'Achinyamata Otha Kuwerenga',
    value: 90,
    decimals: 0,
    prefix: '~',
    suffix: '%',
    briefSummary:
      'Nearly 9 in 10 youth can read, though formal jobs stay scarce.',
    briefSummaryNy:
      'Pafupifupi 9 pa 10 achinyamata amadziwa kuwerenga, koma ntchito n’zochepa.',
    trendNote: 'Up alongside national adult literacy',
    trendNoteNy: 'Chakwera m’zaka zapitazi',
    trendDirection: 'positive',
    trendSeries: [46, 56, 66, 76, 86],
    image: IMG.youth,
    iconName: 'ShieldCheck',
    topicSlug: 'employment',
    pieShare: 90,
    pieLabel: '~90% can read',
    pieLabelNy: '~90% owerenga',
    pieRestLabel: '~10% rest',
    pieRestLabelNy: '~10% otsala',
    source: makeSource(
      18,
      'Page 18 · Box 1.1 & Figure B1.1.2',
      'The adult literacy rate rose from roughly 74 to 79 percent nationally between IHS5 and IHS6... The literacy rate among youth aged 15–24 now approaches 90 percent.'
    ),
  },
  {
    id: 'p18-national-poverty',
    pageGroup: 'Page 18',
    pageGroupNy: 'Tsamba 18',
    title: 'National Poverty Rate',
    titleNy: 'Umphawi m’Dziko Lonse',
    value: 47.3,
    decimals: 1,
    suffix: '%',
    briefSummary:
      'Dipped slightly from 50.7%, led by gains in one region.',
    briefSummaryNy:
      'Unatsika pang’ono kuchokera pa 50.7%, makamaka m’chigawo chimodzi.',
    trendNote: 'Down slightly from 50.7% (2019/20)',
    trendNoteNy: 'Chatsika pang’ono kuchoka pa 50.7%',
    trendDirection: 'positive',
    trendSeries: [72, 66, 60, 52, 46],
    image: IMG.inequality,
    iconName: 'Wallet',
    topicSlug: 'economic-growth',
    pieShare: 47.3,
    pieLabel: '47.3% in poverty',
    pieLabelNy: '47.3% mu umphawi',
    pieRestLabel: '52.7% above line',
    pieRestLabelNy: '52.7% pamwamba',
    source: makeSource(
      18,
      'Page 18 · Box 1.1',
      'The national poverty rate fell from 50.7 to 47.3 percent, while the food poverty rate rose from 20.5 to 24.0 percent, and the Gini coefficient increased from 37.9 to 39.9.'
    ),
  },
  {
    id: 'p18-food-poverty',
    pageGroup: 'Page 18',
    pageGroupNy: 'Tsamba 18',
    title: 'People Struggling for Daily Food',
    titleNy: 'Anthu Ovutika Kupeza Chakudya',
    value: 24.0,
    decimals: 1,
    suffix: '%',
    briefSummary:
      'Nearly 1 in 4 Malawians struggled to afford daily food (up from 20.5%).',
    briefSummaryNy:
      'Pafupifupi 1 pa 4 aliyense anasowa chakudya chokwanira (kuchoka pa 20.5%).',
    trendNote: 'Up from 20.5% in 2019/20 (IHS6)',
    trendNoteNy: 'Chakwera kuchoka pa 20.5% mu 2019/20',
    trendDirection: 'pressure',
    trendSeries: [34, 42, 52, 68, 78],
    image: IMG.priceSigns,
    iconName: 'ShoppingBasket',
    topicSlug: 'agriculture',
    pieShare: 24.0,
    pieLabel: '24.0% food poor',
    pieLabelNy: '24.0% osowa chakudya',
    pieRestLabel: '76.0% afford food',
    pieRestLabelNy: '76.0% okwanitsa',
    source: makeSource(
      18,
      'Page 18 · Box 1.1',
      'The national poverty rate fell from 50.7 to 47.3 percent, while the food poverty rate rose from 20.5 to 24.0 percent.'
    ),
  },
  {
    id: 'p18-gini',
    pageGroup: 'Page 18',
    pageGroupNy: 'Tsamba 18',
    title: 'Income Gap Score (Gini)',
    titleNy: 'Kusiyana kwa Chuma (Gini)',
    value: 39.9,
    decimals: 1,
    briefSummary:
      'Up from 37.9—the gap between richer and poorer households widened.',
    briefSummaryNy:
      'Chinakwera kuchoka 37.9—kusiyana kwa olemera ndi osauka kunakula.',
    trendNote: 'Up from 37.9 in 2019/20',
    trendNoteNy: 'Chakwera kuchoka pa 37.9 mu 2019/20',
    trendDirection: 'pressure',
    trendSeries: [38, 46, 54, 66, 76],
    image: IMG.inequality,
    iconName: 'Scale',
    topicSlug: 'economic-growth',
    source: makeSource(
      18,
      'Page 18 · Box 1.1',
      'The Gini coefficient increased from 37.9 to 39.9 (signaling an uptick in inequality).'
    ),
  },
];
