import type {SourceReference} from '../types';
import {PHOTO_ASSETS} from './photoAssets';

const PDF_URL =
  '/assets/aistudio/MALAWI_ECONOMIC_MONITOR_BUILDING_STABILITY_TO_UNLOCK_GROWTH_a1ee2546.pdf';

export const TOPIC_PHOTOS = {
  economy: PHOTO_ASSETS.harvestHills,
  market: PHOTO_ASSETS.marketPriceSigns,
  farming: PHOTO_ASSETS.maizeFarmerTractor,
  factory: PHOTO_ASSETS.portCargoShip,
  youth: PHOTO_ASSETS.workshopJobs,
  services: PHOTO_ASSETS.publicDebtParliament,
  forex: PHOTO_ASSETS.forexBureau,
} as const;

export interface TopicChartPoint {
  label: string;
  labelNy?: string;
  value: number;
  displayValue: string;
  annotation: string;
  annotationNy: string;
  isReferenceTarget?: boolean;
  sliceColor?: string;
}

export interface TopicVisualConfig {
  image: string;
  chartType: 'line' | 'bar' | 'pie';
  accentColor: string;
  pieCenterValue?: string;
  pieCenterLabel?: string;
  pieCenterLabelNy?: string;
  heroStat: string;
  heroStatCaption: string;
  heroStatCaptionNy: string;
  unitLabel: string;
  unitLabelNy: string;
  chartTitle: string;
  chartTitleNy: string;
  pageLabel: string;
  pageLabelNy: string;
  referenceTarget?: {
    value: number;
    label: string;
    labelNy: string;
  };
  points: TopicChartPoint[];
  source: SourceReference;
}

const verifiedSource2026 = (
  pageNumber: number,
  pageReference: string,
  originalWording: string
): SourceReference => ({
  reportId: 'mem-sept-2026',
  reportTitle: 'Malawi Economic Monitor: Building Stability to Unlock Growth',
  publisher: 'World Bank',
  publicationYear: 2026,
  pageReference,
  originalWording,
  sourceUrl: `${PDF_URL}#page=${pageNumber}`,
  sourceType: 'direct_report',
  verificationStatus: 'verified',
});

const TOPIC_VISUALS_2026: Record<string, TopicVisualConfig> = {
  'economic-growth': {
    image: TOPIC_PHOTOS.economy,
    chartType: 'bar',
    accentColor: '#00AEEF',
    heroStat: '2.7%',
    heroStatCaption: 'Projected 2026 economic growth (vs 2.6% population)',
    heroStatCaptionNy: 'Kukula kwa chuma koyembekezeka mu 2026 (vs anthu 2.6%)',
    unitLabel: 'Annual real GDP growth (%) · Population growth: 2.6%',
    unitLabelNy: 'Kukula kwa chuma pa chaka (%) · Kukula kwa anthu: 2.6%',
    chartTitle: 'How fast Malawi’s economy grew each year',
    chartTitleNy: 'Liwiro la kukula kwa chuma cha Malawi chaka chilichonse',
    pageLabel: 'World Bank Malawi Economic Monitor · pp. 17 & 33',
    pageLabelNy: 'World Bank Malawi Economic Monitor · ts. 17 & 33',
    referenceTarget: {
      value: 2.6,
      label: '2.6% Population growth line',
      labelNy: 'Mzere wa kukula kwa anthu (2.6%)',
    },
    points: [
      {
        label: '2023',
        value: 1.9,
        displayValue: '1.9%',
        annotation: 'Slower than 2.6% population growth',
        annotationNy: 'Pansi pa kukula kwa anthu (2.6%)',
      },
      {
        label: '2024',
        value: 1.7,
        displayValue: '1.7%',
        annotation: 'El Niño drought hit farm output hard',
        annotationNy: 'Chilala cha El Niño chinachepetsa zokolola',
      },
      {
        label: '2025e',
        value: 2.5,
        displayValue: '2.5%',
        annotation: 'Services expanded while industry lagged',
        annotationNy: 'Mabanki ndi masitolo anakula, mafakitale anachedwa',
      },
      {
        label: '2026p',
        value: 2.7,
        displayValue: '2.7%',
        annotation: 'Edges past 2.6% population growth by +0.1%',
        annotationNy: 'Chikuposa kukula kwa anthu ndi +0.1% yokha',
      },
    ],
    source: verifiedSource2026(
      17,
      'Pages 17 & 33 (Table 1.3)',
      'Malawi’s GDP is projected to grow by 2.7 percent in 2026, up from an estimated 2.5 percent in 2025. While this would mark the first time in five years that GDP expansion outpaces the country’s rate of population growth, which stands at 2.6 percent per year, this pace of economic growth remains too slow to push a significant number of people out of poverty.'
    ),
  },

  inflation: {
    image: TOPIC_PHOTOS.market,
    chartType: 'line',
    accentColor: '#F59E0B',
    heroStat: '21.1%',
    heroStatCaption: 'Overall yearly price rise in June 2026',
    heroStatCaptionNy: 'Kukwera kwa mitengo yonse mu Juni 2026',
    unitLabel: 'Yearly price jump (%)',
    unitLabelNy: 'Kukwera kwa mitengo pa chaka (%)',
    chartTitle: 'How fast everyday prices rose',
    chartTitleNy: 'Momwe mitengo ya zinthu za tsiku ndi tsiku inakwerera',
    pageLabel: 'World Bank Malawi Economic Monitor · pp. 27–28 & 33',
    pageLabelNy: 'World Bank Malawi Economic Monitor · ts. 27–28 & 33',
    points: [
      {
        label: '2023',
        value: 28.7,
        displayValue: '28.7%',
        annotation: 'Food shortages & import costs lifted prices',
        annotationNy: 'Kusowa kwa chakudya ndi kudula kwa katundu wakunja',
      },
      {
        label: '2024',
        value: 32.3,
        displayValue: '32.3%',
        annotation: 'El Niño drought squeezed maize harvests',
        annotationNy: 'Chilala cha El Niño chinachepetsa chimanga',
      },
      {
        label: '2025',
        value: 28.4,
        displayValue: '28.4%',
        annotation: 'Food pressures lingered; non-food at 20.6%',
        annotationNy: 'Chakudya chinadulabe; zosakhala chakudya 20.6%',
      },
      {
        label: 'Jun 2026',
        labelNy: 'Jun 2026',
        value: 21.1,
        displayValue: '21.1%',
        annotation: 'Cheaper maize cooled total inflation; non-food hit 32.1%',
        annotationNy: 'Chimanga chinatsika, koma mafuta & magetsi anakwera 32.1%',
      },
    ],
    source: verifiedSource2026(
      27,
      'Pages 27–28 & 33 (Table 1.3)',
      'Headline inflation declined to 21.1 percent in June 2026 from an average of 28.4 percent in 2025 (Figure 1.22)... However, non-food inflation continued to accelerate, reaching 32.1 percent in June 2026.'
    ),
  },

  'public-debt': {
    image: TOPIC_PHOTOS.services,
    chartType: 'bar',
    accentColor: '#F59E0B',
    heroStat: '98.0%',
    heroStatCaption: 'Government debt compared to annual GDP (2025)',
    heroStatCaptionNy: 'Ngongole za boma poyerekeza ndi chuma chonse (2025)',
    unitLabel: 'Total public debt (% of GDP)',
    unitLabelNy: 'Ngongole zonse za boma (% ya GDP)',
    chartTitle: 'How public debt climbed near 2006 relief levels',
    chartTitleNy: 'Momwe ngongole za boma zinakwerera pafupi ndi za mu 2006',
    pageLabel: 'World Bank Malawi Economic Monitor · pp. 23 & 33',
    pageLabelNy: 'World Bank Malawi Economic Monitor · ts. 23 & 33',
    points: [
      {
        label: '2023',
        value: 85.9,
        displayValue: '85.9%',
        annotation: 'Heavy local bank borrowing kept debt high',
        annotationNy: 'Kubwereka m’mabanki a m’dziko kunakweza ngongole',
      },
      {
        label: '2024',
        value: 87.8,
        displayValue: '87.8%',
        annotation: 'High interest bills added to public loans',
        annotationNy: 'Chiwongoladzanja chokwera chinawonjezera ngongole',
      },
      {
        label: '2025e',
        value: 98.0,
        displayValue: '98.0%',
        annotation: 'Interest takes nearly 50% of domestic taxes',
        annotationNy: 'Chiwongoladzanja chimatenga pafupifupi 50% ya misonkho',
      },
    ],
    source: verifiedSource2026(
      23,
      'Pages 23 & 33 (Table 1.3)',
      'The public debt reached 98.0 percent of GDP in 2025, a level comparable to that reached before Malawi reached the Heavily Indebted Poor Countries (HIPC) completion point in 2006... interest payments absorb nearly 50 percent of domestic revenue in FY2025/26.'
    ),
  },

  'trade-and-imports': {
    image: TOPIC_PHOTOS.factory,
    chartType: 'pie',
    accentColor: '#F59E0B',
    pieCenterValue: 'US$3.7B',
    pieCenterLabel: '2025 Imports',
    pieCenterLabelNy: 'Zogula 2025',
    heroStat: 'US$2.7B',
    heroStatCaption: 'Annual trade gap in 2025 (imports minus exports)',
    heroStatCaptionNy: 'Kusiyana kwa malonda akunja mu 2025',
    unitLabel: 'Share of 2025 US$3.7B import bill (p. 25)',
    unitLabelNy: 'Gawo la US$3.7B yogula kunja mu 2025 (ts. 25)',
    chartTitle: 'How much of Malawi’s imports exports can pay for',
    chartTitleNy: 'Gawo la katundu wakunja lomwe zogulitsa zimaperekera',
    pageLabel: 'World Bank Malawi Economic Monitor · p. 25',
    pageLabelNy: 'World Bank Malawi Economic Monitor · ts. 25',
    points: [
      {
        label: 'Exports (~27%)',
        labelNy: 'Zogulitsa (~27%)',
        value: 1.0,
        displayValue: '~US$1.0B',
        annotation: 'Tobacco (~40% of exports) leads foreign earnings',
        annotationNy: 'Fodya (~40%) ndiwo amabweretsa madola ambiri',
        sliceColor: '#00AEEF',
      },
      {
        label: 'Trade Gap (~73%)',
        labelNy: 'Mpata (~73%)',
        value: 2.7,
        displayValue: 'US$2.7B',
        annotation: 'Uncovered gap of US$3.7B total imports (18.1% of GDP)',
        annotationNy: 'Mpata wosakwaniritsidwa pa US$3.7B zonse zogula kunja',
        sliceColor: '#F59E0B',
      },
    ],
    source: verifiedSource2026(
      25,
      'Page 25 (Section 1.3)',
      'The country’s annual trade deficit has nearly tripled in nominal terms since 2010, widening from approximately US$1.1 billion (10.9 percent of GDP) that year to around US$2.7 billion (18.1 percent of GDP) in 2025.'
    ),
  },

  employment: {
    image: TOPIC_PHOTOS.youth,
    chartType: 'bar',
    accentColor: '#00AEEF',
    heroStat: '27.6%',
    heroStatCaption: 'Working youth doing casual ganyu (fewer than 4% in steady jobs)',
    heroStatCaptionNy: 'Achinyamata ogwira ganyu (ochepera 4% m’ntchito zokhazikika)',
    unitLabel: 'Household survey shares (%) · Box 1.1',
    unitLabelNy: 'Ziwerengero za kafukufuku (%) · Bokosi 1.1',
    chartTitle: 'Youth schooling vs steady jobs & casual ganyu',
    chartTitleNy: 'Maphunziro a achinyamata poyerekeza ndi ntchito & ganyu',
    pageLabel: 'World Bank Malawi Economic Monitor · p. 18 (Box 1.1)',
    pageLabelNy: 'World Bank Malawi Economic Monitor · ts. 18 (Bokosi 1.1)',
    points: [
      {
        label: 'Youth Read',
        labelNy: 'Owerenga',
        value: 90.0,
        displayValue: '~90%',
        annotation: 'Almost 9 in 10 young Malawians (15–24) can read',
        annotationNy: 'Pafupifupi 9 pa 10 achinyamata amatha kuwerenga',
      },
      {
        label: 'Ganyu ’20',
        labelNy: 'Ganyu ’20',
        value: 21.3,
        displayValue: '21.3%',
        annotation: 'Share of youth relying on casual work in 2020',
        annotationNy: 'Achinyamata ogwira ganyu mu 2020',
      },
      {
        label: 'Ganyu ’25',
        labelNy: 'Ganyu ’25',
        value: 27.6,
        displayValue: '27.6%',
        annotation: 'Youth in casual ganyu rose by 2024/25 survey',
        annotationNy: 'Achinyamata pa ganyu anakwera mu 2024/25',
      },
      {
        label: 'Adults Paid',
        labelNy: 'Akulu Paid',
        value: 12.0,
        displayValue: '~12%',
        annotation: 'Only ~12% of adults (25–54) hold formal wage jobs',
        annotationNy: 'Akulu ~12% okha ali ndi ntchito za malipiro a mwezi',
      },
      {
        label: 'Youth Paid',
        labelNy: 'Ntchito 15-24',
        value: 4.0,
        displayValue: '<4%',
        annotation: 'Fewer than 4% of youth (15–24) hold steady salaried work',
        annotationNy: 'Ochepera 4% ya achinyamata ali ndi ntchito zokhazikika',
      },
    ],
    source: verifiedSource2026(
      18,
      'Page 18 (Box 1.1)',
      'Formal wage employment remains rare, only encompassing around 12 percent of prime-age adults—those aged 25–54, and less than 4 percent of young people—those aged 15–24... the share classified as working in ganyu (casual labor) increased... from 21.3 to 27.6 percent among youth.'
    ),
  },

  agriculture: {
    image: TOPIC_PHOTOS.farming,
    chartType: 'bar',
    accentColor: '#22C55E',
    heroStat: '3.3M tons',
    heroStatCaption: 'Estimated 2025/26 maize harvest (+15% rebound)',
    heroStatCaptionNy: 'Zokolola za chimanga mu 2025/26 (+15%)',
    unitLabel: 'Maize harvest volume (Million metric tons)',
    unitLabelNy: 'Zokolola za chimanga (Matani miliyoni)',
    chartTitle: 'Maize harvest recovery vs national food need',
    chartTitleNy: 'Kukwera kwa chimanga poyerekeza ndi chimanga chofunika',
    pageLabel: 'World Bank Malawi Economic Monitor · pp. 19–20',
    pageLabelNy: 'World Bank Malawi Economic Monitor · ts. 19–20',
    referenceTarget: {
      value: 3.5,
      label: '~3.5M tons yearly food need',
      labelNy: 'Matani ~3.5M ofunika pa chaka',
    },
    points: [
      {
        label: '2024/25',
        value: 2.8,
        displayValue: '2.8M t',
        annotation: 'Tight harvest squeezed rural & market supplies',
        annotationNy: 'Zokolola zochepa zinachepetsa chimanga m’misika',
      },
      {
        label: '2025/26',
        value: 3.3,
        displayValue: '3.3M t',
        annotation: '+15% rebound cooled early 2026 grain prices',
        annotationNy: 'Chakwera 15% zomwe zinathandiza kutsitsa mitengo',
      },
      {
        label: 'Need',
        labelNy: 'Chofunika',
        value: 3.5,
        displayValue: '~3.5M t',
        annotation: 'Estimated national food requirement (~1.9M still short)',
        annotationNy: 'Chimanga chofunikira m’dziko (~1.9M akusowa chakudya)',
        isReferenceTarget: true,
      },
    ],
    source: verifiedSource2026(
      19,
      'Pages 19–20 (Section 1.2)',
      'Maize production is estimated to have increased by approximately 15 percent, from 2.8 million metric tons in 2024/25 to around 3.3 million metric tons, although it remains below the national food requirement of approximately 3.5 million metric tons.'
    ),
  },

  'exchange-rates': {
    image: TOPIC_PHOTOS.forex,
    chartType: 'bar',
    accentColor: '#00AEEF',
    heroStat: '0.3 mos',
    heroStatCaption: 'Official US dollar reserves (~9 days of imports)',
    heroStatCaptionNy: 'Madola osungidwa ku banki ya boma (~masiku 9)',
    unitLabel: 'Months of import cover (Safe target: 3.0 months)',
    unitLabelNy: 'Miyezi ya katundu wakunja (Cholinga: miyezi 3.0)',
    chartTitle: 'How many months of imports reserves can pay for',
    chartTitleNy: 'Miyezi yomwe madola osungidwa angakwanire kugula katundu',
    pageLabel: 'World Bank Malawi Economic Monitor · pp. 25–26 & 33',
    pageLabelNy: 'World Bank Malawi Economic Monitor · ts. 25–26 & 33',
    referenceTarget: {
      value: 3.0,
      label: '3.0 mos safe buffer target',
      labelNy: 'Cholinga chodalirika: miyezi 3.0',
    },
    points: [
      {
        label: '2023',
        value: 0.6,
        displayValue: '0.6 mos',
        annotation: 'Already far under the 3-month adequacy benchmark',
        annotationNy: 'Pansi kwambiri pa miyezi 3 yofunika',
      },
      {
        label: '2024',
        value: 0.4,
        displayValue: '0.4 mos',
        annotation: 'Less than two weeks of official import buffer',
        annotationNy: 'Ochepera milungu iwiri ya katundu wakunja',
      },
      {
        label: '2025e',
        value: 0.3,
        displayValue: '0.3 mos',
        annotation: 'About 9 days cover; street rate ~130% above bank',
        annotationNy: 'Masiku ~9 okha; mtengo m’misewu ukukwera ~130%',
      },
      {
        label: 'Target',
        labelNy: 'Cholinga',
        value: 3.0,
        displayValue: '3.0 mos',
        annotation: 'Recommended safe reserve buffer for smooth imports',
        annotationNy: 'Nkhokwe yofunikira kuti katundu azibwera bwino',
        isReferenceTarget: true,
      },
    ],
    source: verifiedSource2026(
      25,
      'Pages 25–26 & 33 (Table 1.3)',
      'Official reserves sit below one month’s worth of import cover, and well below the country’s adequacy target of three months. (Table 1.3: 0.6 months in 2023, 0.4 in 2024, 0.3 in 2025e).'
    ),
  },

  'government-spending': {
    image: TOPIC_PHOTOS.services,
    chartType: 'bar',
    accentColor: '#00AEEF',
    heroStat: '8.8%',
    heroStatCaption: 'FY2025/26 budget gap (% of economy)',
    heroStatCaptionNy: 'Kusiyana kwa bajeti mu FY2025/26 (% ya chuma)',
    unitLabel: 'Overall budget deficit (% of GDP)',
    unitLabelNy: 'Kuperewera kwa bajeti (% ya GDP)',
    chartTitle: 'Budget gap shrank by 1.7 points within Parliament’s limit',
    chartTitleNy: 'Bajeti inatsika ndi 1.7% mkati mwa malire a Nyumba ya Malamulo',
    pageLabel: 'World Bank Malawi Economic Monitor · pp. 8 & 21',
    pageLabelNy: 'World Bank Malawi Economic Monitor · ts. 8 & 21',
    points: [
      {
        label: 'FY2024/25',
        value: 10.5,
        displayValue: '10.5%',
        annotation: 'Wider budget deficit before FY2025/26 restraint',
        annotationNy: 'Kuperewera kwakukulu chisanafike kuchepetsa kwa 2025/26',
      },
      {
        label: 'FY2025/26',
        value: 8.8,
        displayValue: '8.8%',
        annotation: 'Narrowed 1.7 pts; VAT at 17.5%; interest ~50% of taxes',
        annotationNy: 'Yatsika 1.7%; VAT 17.5%; ngongole zikudya ~50% ya misonkho',
      },
    ],
    source: verifiedSource2026(
      21,
      'Pages 8 & 21',
      'The overall budget deficit (including Reserve Bank of Malawi (RBM) operations) stood at 8.8 percent of GDP in FY2025/26, narrowing by 1.7 percentage points relative to FY2024/25. For the first time in more than five years, budget execution remained within the envelope approved by parliament.'
    ),
  },
};

export function hasBuiltInTopicVisual(topicSlug: string): boolean {
  return Boolean(TOPIC_VISUALS_2026[topicSlug]);
}

export function getTopicVisualConfig(
  topicSlug: string,
  reportId: string
): TopicVisualConfig {
  const base =
    TOPIC_VISUALS_2026[topicSlug] ?? TOPIC_VISUALS_2026['economic-growth'];

  if (reportId === 'mem-sept-2026') {
    return base;
  }

  // Archive / sample reports override only where explicit sample indicators exist
  if (reportId === 'mem-2024-sample' && topicSlug === 'economic-growth') {
    return {
      ...base,
      heroStat: '1.8%',
      heroStatCaption: 'Sample annual real GDP growth',
      heroStatCaptionNy: 'Chitsanzo cha kukula kwa chuma pa chaka',
      pageLabel: 'World Bank MEM (2024 Sample)',
      pageLabelNy: 'World Bank MEM (Chitsanzo cha 2024)',
      points: [
        {
          label: '2021',
          value: 2.8,
          displayValue: '2.8%',
          annotation: 'Sample historical baseline',
          annotationNy: 'Chitsanzo chakale',
        },
        {
          label: '2022',
          value: 0.9,
          displayValue: '0.9%',
          annotation: 'Sample storm & energy slowdown',
          annotationNy: 'Chitsanzo cha kuchedwa',
        },
        {
          label: '2023',
          value: 1.6,
          displayValue: '1.6%',
          annotation: 'Sample gradual recovery',
          annotationNy: 'Chitsanzo cha kubwerera pang’ono',
        },
        {
          label: '2024*',
          value: 1.8,
          displayValue: '1.8%',
          annotation: 'Trails ~2.6% yearly population growth',
          annotationNy: 'Pansi pa kukula kwa anthu (~2.6%)',
        },
      ],
    };
  }

  if (reportId === 'mem-2024-sample' && topicSlug === 'inflation') {
    return {
      ...base,
      heroStat: '28.4%',
      heroStatCaption: 'Sample headline price inflation',
      heroStatCaptionNy: 'Chitsanzo cha kukwera kwa mitengo',
      pageLabel: 'World Bank MEM (2024 Sample)',
      pageLabelNy: 'World Bank MEM (Chitsanzo cha 2024)',
      points: [
        {
          label: 'Q1',
          value: 24.5,
          displayValue: '24.5%',
          annotation: 'Sample early-year pressure',
          annotationNy: 'Chitsanzo cha gawo loyamba',
        },
        {
          label: 'Q2',
          value: 26.8,
          displayValue: '26.8%',
          annotation: 'Sample food & fuel pass-through',
          annotationNy: 'Chitsanzo cha gawo lachiwiri',
        },
        {
          label: 'Q3',
          value: 27.9,
          displayValue: '27.9%',
          annotation: 'Sample mid-year tightening',
          annotationNy: 'Chitsanzo cha gawo lachitatu',
        },
        {
          label: 'Q4',
          value: 28.4,
          displayValue: '28.4%',
          annotation: 'Sample full-year average',
          annotationNy: 'Chitsanzo cha gawo lachinayi',
        },
      ],
    };
  }

  return base;
}
