import type {SourceReference} from '../types';

export const MEM_2026_PDF_PATH =
  '/assets/aistudio/MEM_BUILDING_STABILITY_TO_UNLOCK_GROWTH_a1ee2546.pdf';

const makeSource = (
  page: 17 | 18,
  pageReference: string,
  originalWording: string,
  sourceType: 'direct_report' | 'platform_interpretation' = 'direct_report'
): SourceReference => ({
  reportId: 'mem-sept-2026',
  reportTitle: 'Malawi Economic Monitor: Building Stability to Unlock Growth',
  publisher: 'World Bank',
  publicationYear: 2026,
  pageReference,
  originalWording,
  sourceUrl: `${MEM_2026_PDF_PATH}#page=${page}`,
  sourceType,
  verificationStatus: 'verified',
});

export interface StorySectionMeta {
  id: string;
  number: number;
  shortLabel: string;
  shortLabelNy: string;
  title: string;
  titleNy: string;
  pageRef: string;
  pageRefNy: string;
}

export const STORY_SECTIONS: StorySectionMeta[] = [
  {
    id: 'section-1-growth',
    number: 1,
    shortLabel: 'Economy vs. Population',
    shortLabelNy: 'Chuma vs. Anthu',
    title: "Is Malawi's Economy Growing?",
    titleNy: 'Kodi Chuma cha Malawi Chikukula?',
    pageRef: 'Page 17',
    pageRefNy: 'Tsamba 17',
  },
  {
    id: 'section-2-drivers',
    number: 2,
    shortLabel: 'What Helps Growth',
    shortLabelNy: 'Zothandiza Kukula',
    title: 'What Is Pushing the Economy Forward?',
    titleNy: 'Chikukankhira Chuma Patsogolo N’chiyani?',
    pageRef: 'Page 17',
    pageRefNy: 'Tsamba 17',
  },
  {
    id: 'section-3-businesses',
    number: 3,
    shortLabel: 'Business Struggles',
    shortLabelNy: 'Mavuto a Mabizinesi',
    title: 'Why Are Businesses Not Operating at Full Capacity?',
    titleNy: 'Chifukwa Chiyani Mabizinesi Sakugwira Ntchito Mwakukwanira?',
    pageRef: 'Pages 17–18',
    pageRefNy: 'Masamba 17–18',
  },
  {
    id: 'section-4-jobs',
    number: 4,
    shortLabel: 'Jobs & Ganyu',
    shortLabelNy: 'Ntchito & Ganyu',
    title: 'Are Young People Getting the Jobs They Need?',
    titleNy: 'Kodi Achinyamata Akupeza Ntchito Zomwe Akufuna?',
    pageRef: 'Page 18',
    pageRefNy: 'Tsamba 18',
  },
  {
    id: 'section-5-education',
    number: 5,
    shortLabel: 'Education vs. Jobs',
    shortLabelNy: 'Maphunziro vs. Ntchito',
    title: 'More Educated Young People, But Not Enough Opportunities?',
    titleNy: 'Achinyamata Ophunzira Ambiri, Koma Ntchito Zochepa?',
    pageRef: 'Page 18',
    pageRefNy: 'Tsamba 18',
  },
  {
    id: 'section-6-welfare',
    number: 6,
    shortLabel: 'Poverty & Food',
    shortLabelNy: 'Umphawi & Chakudya',
    title: 'Poverty Is Falling, But Food Hardship Is Getting Worse.',
    titleNy: 'Umphawi Ukutsika, Koma Vuto la Chakudya Likuwonjezeka.',
    pageRef: 'Page 18',
    pageRefNy: 'Tsamba 18',
  },
];

export interface StoryIndicatorData {
  id: string;
  label: string;
  labelNy: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  statusNote: string;
  statusNoteNy: string;
  explanation: string;
  explanationNy: string;
  direction?: 'up' | 'down' | 'neutral';
  directionText?: string;
  directionTextNy?: string;
  accentColor: string;
  source: SourceReference;
}

export const SECTION_1_INDICATORS: StoryIndicatorData[] = [
  {
    id: 's1-gdp-2025',
    label: '2025 Economic Growth',
    labelNy: 'Kukula kwa Chuma 2025',
    value: 2.5,
    suffix: '%',
    decimals: 1,
    statusNote: 'Report estimate (2025e)',
    statusNoteNy: 'Zomwe zikuganiziridwa (2025e)',
    explanation:
      'Estimated growth of goods and services produced in Malawi during 2025.',
    explanationNy:
      'Kukula kwa katundu ndi ntchito zomwe zinapangidwa m’Malawi mu 2025.',
    direction: 'neutral',
    directionText: 'Baseline estimate',
    directionTextNy: 'Mlingo woyambira',
    accentColor: '#0071BC',
    source: makeSource(
      17,
      'Page 17 · Section 1.2 Recent Economic Developments',
      'Malawi’s GDP is projected to grow by 2.7 percent in 2026, up from an estimated 2.5 percent in 2025.'
    ),
  },
  {
    id: 's1-gdp-2026',
    label: '2026 Projected Economic Growth',
    labelNy: 'Kukula Komwe Kukuyembekezeka 2026',
    value: 2.7,
    suffix: '%',
    decimals: 1,
    statusNote: 'Projection — not an actual recorded outcome',
    statusNoteNy: 'Chiyembekezo — sichinachitikebe',
    explanation:
      'A modest uptick expected for 2026, though still slower than most regional neighbors.',
    explanationNy:
      'Kuwonjezeka pang’ono komwe kukuyembekezeka mu 2026, koma pansi pa mayiko oyandikana nawo.',
    direction: 'up',
    directionText: 'Up 0.2 pts (projected)',
    directionTextNy: 'Kwakwera 0.2 (chiyembekezo)',
    accentColor: '#002244',
    source: makeSource(
      17,
      'Page 17 · Section 1.2 & Figure 1.6',
      'Malawi’s GDP is projected to grow by 2.7 percent in 2026, up from an estimated 2.5 percent in 2025... Malawi’s modest projected growth rate will lag most regional peers.'
    ),
  },
  {
    id: 's1-pop-growth',
    label: 'Annual Population Growth',
    labelNy: 'Kuchuluka kwa Anthu Pachaka',
    value: 2.6,
    suffix: '%',
    decimals: 1,
    statusNote: 'Yearly demographic pace',
    statusNoteNy: 'Mlingo wa pachaka',
    explanation:
      'Because population grows by about 2.6% each year, the 2.7% economy leaves almost no extra room per person.',
    explanationNy:
      'Popeza anthu amachuluka ndi 2.6% pachaka, chuma cha 2.7% chikusiya kusintha kochepa kwambiri pa munthu aliyense.',
    direction: 'neutral',
    directionText: 'Nearly matches 2026p GDP',
    directionTextNy: 'Kukufanana ndi chuma cha 2026',
    accentColor: '#B26A3E',
    source: makeSource(
      17,
      'Page 17 · Section 1.2 & Figure 1.5',
      'While this would mark the first time in five years that GDP expansion outpaces the country’s rate of population growth, which stands at 2.6 percent per year, this pace of economic growth remains too slow to push a significant number of people out of poverty.'
    ),
  },
];

export const SECTION_1_BAR_DATA = [
  {name: '2025 Growth (Est.)', value: 2.5, fill: '#0071BC', kind: 'Estimate'},
  {name: 'Population Growth', value: 2.6, fill: '#B26A3E', kind: 'Annual pace'},
  {name: '2026 Growth (Proj.)', value: 2.7, fill: '#002244', kind: 'Projection'},
];

export const SECTION_1_SOURCES = {
  cakeAnalogy: makeSource(
    17,
    'Page 17 · Per-capita income & poverty qualification',
    'While this would mark the first time in five years that GDP expansion outpaces the country’s rate of population growth, which stands at 2.6 percent per year, this pace of economic growth remains too slow to push a significant number of people out of poverty... overall growth remains below potential and insufficient to meaningfully raise per-capita incomes, which have been declining since 2022.',
    'platform_interpretation'
  ),
};

export const SECTION_2_DATA = {
  servicesSource: makeSource(
    17,
    'Page 17 · Section 1.2 & Figure 1.5',
    'The uptick in GDP is set to be underpinned by sustained expansion in the services sector, particularly financial services, alongside an ongoing recovery in agricultural output following the drought caused by the 2024 El Niño event (Figure 1.5).'
  ),
  agricultureSource: makeSource(
    17,
    'Page 17 · Section 1.2 & Figure 1.5',
    'The uptick in GDP is set to be underpinned by sustained expansion in the services sector, particularly financial services, alongside an ongoing recovery in agricultural output following the drought caused by the 2024 El Niño event (Figure 1.5). While agriculture slightly recovered from the weather-related shocks of 2024, overall growth remains below potential.'
  ),
  industryConstraintSource: makeSource(
    17,
    'Page 17 · Section 1.2',
    'Industrial sector performance remains constrained by foreign-exchange distortions, which impede the import of critical inputs and limit productive capacity.'
  ),
  forwardChain: [
    {
      id: 'f1',
      title: 'Financial services expand',
      titleNy: 'Mabanki & ntchito za ndalama zikukula',
      detail: 'Banks, mobile money, and financial transactions continue growing.',
      detailNy: 'Mabanki, mobile money, ndi ntchito za ndalama zikupitilira kukula.',
      accent: '#0071BC',
    },
    {
      id: 'f2',
      title: 'Agricultural production recovers',
      titleNy: 'Zokolola za ulimi zikuyamba kubwerera',
      detail: 'Farming is gradually rebounding after the 2024 El Niño drought.',
      detailNy: 'Ulimi ukuyamba kuchira pang’ono pambuyo pa chilala cha 2024.',
      accent: '#20B8A5',
    },
    {
      id: 'f3',
      title: 'Economic activity receives a boost',
      titleNy: 'Chuma chikulandira mphamvu pang’ono',
      detail:
        'Together, these two areas push projected 2026 growth to 2.7% — even while industry struggles.',
      detailNy:
        'Pamodzi, mbali ziwirizi zikukweza chiyembekezo cha 2026 kufika 2.7% — ngakhale mafakitale akuvutika.',
      accent: '#002244',
    },
  ],
};

export interface BusinessConstraintItem {
  id: string;
  title: string;
  titleNy: string;
  shortTag: string;
  shortTagNy: string;
  explanation: string;
  explanationNy: string;
  everydayExample: string;
  everydayExampleNy: string;
  source: SourceReference;
}

export const SECTION_3_CONSTRAINTS: BusinessConstraintItem[] = [
  {
    id: 'c-forex',
    title: 'Foreign-exchange shortages',
    titleNy: 'Kusowa kwa Madola (Forex)',
    shortTag: 'Top 2025 survey constraint',
    shortTagNy: 'Vuto lalikulu 2025',
    explanation:
      'Scarce US dollars make it hard to import machinery, fuel, and materials.',
    explanationNy:
      'Kusowa kwa madola kumavuta kugula makina, mafuta, ndi zopangira katundu kunja.',
    everydayExample:
      'Factories struggle to import packaging, fertilizer parts, or spare parts.',
    everydayExampleNy:
      'Mafakitale amalephera kuitanitsa mapaketi ndi masipeya.',
    source: makeSource(
      18,
      'Pages 17 & 18 · Section 1.2 & 2025 MCCCI Survey',
      'Industrial sector performance remains constrained by foreign-exchange distortions, which impede the import of critical inputs... A 2025 survey by the Malawi Confederation of Chambers of Commerce and Industry shows foreign-exchange availability and inflation remain the top constraints for businesses.'
    ),
  },
  {
    id: 'c-inflation',
    title: 'Inflation',
    titleNy: 'Kukwera kwa Mitengo',
    shortTag: 'Top 2025 survey constraint',
    shortTagNy: 'Vuto lalikulu 2025',
    explanation:
      'Fast-rising prices raise operating bills and complicate business planning.',
    explanationNy:
      'Mitengo ikamakwera msanga, mabizinesi amawononga zambiri ndipo bajeti imavuta.',
    everydayExample:
      'Transport, stock, and rent jump mid-year, squeezing cash flow.',
    everydayExampleNy:
      'Mayendedwe, katundu, ndi lenti zimakwera mwadzidzidzi pakati pa chaka.',
    source: makeSource(
      18,
      'Page 18 · 2025 MCCCI Survey',
      'A 2025 survey by the Malawi Confederation of Chambers of Commerce and Industry shows foreign-exchange availability and inflation remain the top constraints for businesses, with over half of firms operating at less than 50-percent capacity.'
    ),
  },
  {
    id: 'c-energy',
    title: 'Unreliable or insufficient energy supply',
    titleNy: 'Kuzimazima kwa Magetsi',
    shortTag: 'Structural bottleneck',
    shortTagNy: 'Chopinga chachikulu',
    explanation:
      'Frequent blackouts stop machines and force firms onto costly backup power.',
    explanationNy:
      'Magetsi akamazinazima, mabizinesi sangathe kugwira ntchito bwinobwino.',
    everydayExample:
      'Workshops, grain mills, and factories lose hours or burn expensive diesel.',
    everydayExampleNy:
      'Mawokishopu, zigayo, ndi mafakitale amataya maola kapena kugula dizilo.',
    source: makeSource(
      17,
      'Pages 17–18 · Structural Bottlenecks',
      'Structural bottlenecks—particularly in energy supply, access to foreign exchange, and regulatory uncertainty—continue to weigh on private sector activity. Without meaningful progress on foreign-exchange access, energy supply, and support infrastructure, the improvements signaled in the budget are unlikely to shift private sector sentiment.'
    ),
  },
  {
    id: 'c-finance',
    title: 'Limited access to long-term finance',
    titleNy: 'Kusowa kwa Ngongole Zabwino',
    shortTag: 'Credit constraint',
    shortTagNy: 'Vuto la ngongole',
    explanation:
      'Affordable multi-year loans for new machinery and growth are scarce.',
    explanationNy:
      'Mabizinesi amavutika kupeza ngongole zotsika mtengo zogulira makina.',
    everydayExample:
      'Agro-processors struggle to finance modern equipment for local processing.',
    everydayExampleNy:
      'Opanga katundu akuvutika kupeza ngongole zogulira makina atsopano.',
    source: makeSource(
      18,
      'Pages 17–18 · Private Sector Activity',
      'The cumulative impact of years of declining productive capacity, shallow domestic supply chains, and constrained access to long-term credit for capital investment (especially in technology adoption) has eroded the foundation for private sector-led growth.'
    ),
  },
  {
    id: 'c-regulation',
    title: 'Regulatory uncertainty',
    titleNy: 'Malamulo Osasintha-sintha',
    shortTag: 'Policy predictability',
    shortTagNy: 'Kusakhazikika kwa malamulo',
    explanation:
      'Sudden tax or rule changes make owners hesitate to invest or hire.',
    explanationNy:
      'Malamulo kapena misonkho ikamasintha mwadzidzidzi, mabizinesi amaopa kuika ndalama.',
    everydayExample:
      'Investors delay building warehouses or expanding into new branches.',
    everydayExampleNy:
      'Osunga ndalama amadikira m’malo momanga malo kapena kutsegula masitolo.',
    source: makeSource(
      17,
      'Page 17 · Section 1.2',
      'Structural bottlenecks—particularly in energy supply, access to foreign exchange, and regulatory uncertainty—continue to weigh on private sector activity, limiting economic diversification and export potential.'
    ),
  },
  {
    id: 'c-infrastructure',
    title: 'Weak infrastructure & shallow domestic supply chains',
    titleNy: 'Misewu Yofooka & Kusowa kwa Katundu M’dziko',
    shortTag: 'Logistics & local sourcing',
    shortTagNy: 'Zomangamanga & kugula m’dziko',
    explanation:
      'Rough roads and few local suppliers force reliance on costly imports.',
    explanationNy:
      'Misewu yoipa ndi kusowa kwa ogulitsa m’dziko zimachititsa kudalira katundu wakunja.',
    everydayExample:
      'Local agribusinesses rely on imported inputs exposed to global shipping shocks.',
    everydayExampleNy:
      'Mabizinesi a ulimi amadalira zinthu zakunja zomwe zimadula pakasokonezeka malonda.',
    source: makeSource(
      18,
      'Page 18 · Private Sector Activity',
      'The cumulative impact of years of declining productive capacity, shallow domestic supply chains, and constrained access to long-term credit for capital investment... The conflict in the Middle East compounded Malawi’s vulnerability to external shocks, particularly for agribusiness and industrial sectors that are heavily reliant on imported intermediate goods.'
    ),
  },
];

export const SECTION_3_CAPACITY_SOURCE = makeSource(
  18,
  'Page 18 · 2025 MCCCI Business Survey',
  'A 2025 survey by the Malawi Confederation of Chambers of Commerce and Industry shows foreign-exchange availability and inflation remain the top constraints for businesses, with over half of firms operating at less than 50-percent capacity.'
);

export const SECTION_3_CHAIN_STEPS = [
  {
    id: 'sc-1',
    label: 'Foreign-exchange shortages',
    labelNy: 'Kusowa kwa madola (Forex)',
    detail:
      'Official US dollars are scarce, making foreign currency difficult and expensive for firms to access.',
    detailNy:
      'Madola a ku banki akusowa, zomwe zimapangitsa ndalama zakunja kukhala zovuta ndipo zodula kwa mabizinesi.',
    direction: 'down' as const,
  },
  {
    id: 'sc-2',
    label: 'Businesses struggle to import essential materials',
    labelNy: 'Mabizinesi akuvutika kuitanitsa zofunikira',
    detail:
      'Without enough foreign currency, factories and agribusinesses cannot smoothly buy machinery, fuel, or raw inputs abroad.',
    detailNy:
      'Popanda madola okwanira, mafakitale amalephera kugula makina, mafuta, ndi zopangira katundu kunja.',
    direction: 'down' as const,
  },
  {
    id: 'sc-3',
    label: 'Production becomes more difficult',
    labelNy: 'Kupanga katundu kumavuta',
    detail:
      'Supply delays combine with power interruptions and rising input prices inside Malawi.',
    detailNy:
      'Kuchedwa kwa katundu kumaphatikizana ndi kuzimazima kwa magetsi komanso kukwera kwa mitengo.',
    direction: 'down' as const,
  },
  {
    id: 'sc-4',
    label: 'Businesses may operate below their capacity',
    labelNy: 'Mabizinesi amagwira ntchito pansi pa mphamvu zawo',
    detail:
      'Over half of surveyed firms end up running at less than 50% of what they are built to produce.',
    detailNy:
      'Mabizinesi opitilira theka akugwira ntchito pansi pa 50% ya zomwe akanatha kupanga.',
    direction: 'down' as const,
  },
  {
    id: 'sc-5',
    label: 'Economic activity is weakened',
    labelNy: 'Chuma chikufooka',
    detail:
      'Firms create fewer goods and fewer formal jobs, holding overall economic growth below potential.',
    detailNy:
      'Mabizinesi amapanga katundu wochepa ndi ntchito zochepa, zomwe zimachedwetsa chuma.',
    direction: 'down' as const,
  },
];

export const SECTION_3_CHAIN_SOURCE = makeSource(
  18,
  'Pages 17–18 · Explanatory Chain*',
  'Industrial sector performance remains constrained by foreign-exchange distortions, which impede the import of critical inputs and limit productive capacity... A 2025 survey by the Malawi Confederation of Chambers of Commerce and Industry shows foreign-exchange availability and inflation remain the top constraints for businesses, with over half of firms operating at less than 50-percent capacity.',
  'platform_interpretation'
);

export const SECTION_4_FORMAL_CARDS: StoryIndicatorData[] = [
  {
    id: 's4-formal-prime',
    label: 'Prime-Age Adults (Ages 25–54)',
    labelNy: 'Akuluakulu Ogwira Ntchito (Zaka 25–54)',
    value: 12,
    prefix: '~',
    suffix: '%',
    decimals: 0,
    statusNote: 'Formal wage employment (IHS5 & IHS6)',
    statusNoteNy: 'Ntchito zokhazikika za malipiro (IHS5 & IHS6)',
    explanation:
      'Only around 12 out of every 100 working adults aged 25–54 have a formal wage job.',
    explanationNy:
      'Anthu pafupifupi 12 okha mwa akulu 100 aliyense azaka 25–54 ndi omwe ali pa ntchito yokhazikika.',
    direction: 'neutral',
    directionText: 'Flat across 2019/20 and 2024/25',
    directionTextNy: 'Sizinawasinthe pakati pa 2019/20 ndi 2024/25',
    accentColor: '#002244',
    source: makeSource(
      18,
      'Page 18 · Box 1.1 (Labor markets)',
      'Formal wage employment remains rare, only encompassing around 12 percent of prime-age adults—those aged 25–54, and less than 4 percent of young people—those aged 15–24. Notably, such shares remained stable between the two survey rounds, pointing to a lack of growth in the rate of formal wage employment.'
    ),
  },
  {
    id: 's4-formal-youth',
    label: 'Young People (Ages 15–24)',
    labelNy: 'Achinyamata (Zaka 15–24)',
    value: 4,
    prefix: '< ',
    suffix: '%',
    decimals: 0,
    statusNote: 'Formal wage employment (IHS5 & IHS6)',
    statusNoteNy: 'Ntchito zokhazikika za malipiro (IHS5 & IHS6)',
    explanation:
      'Fewer than 4 out of every 100 young people aged 15–24 hold a formal salaried or wage job.',
    explanationNy:
      'Achinyamata ochepera 4 mwa 100 aliyense azaka 15–24 ndi omwe ali pa ntchito yokhazikika ya malipiro.',
    direction: 'neutral',
    directionText: 'Under 4% in both surveys',
    directionTextNy: 'Pansi pa 4% m’mafukufuku onse awiri',
    accentColor: '#B26A3E',
    source: makeSource(
      18,
      'Page 18 · Box 1.1 (Labor markets)',
      'Formal wage employment remains rare, only encompassing around 12 percent of prime-age adults—those aged 25–54, and less than 4 percent of young people—those aged 15–24.'
    ),
  },
];

export const SECTION_4_GANYU_BARS = [
  {
    id: 'ganyu-youth',
    group: 'Youth aged 15–24',
    groupNy: 'Achinyamata azaka 15–24',
    previousLabel: '2020 (IHS5)',
    previousLabelNy: '2020 (IHS5)',
    previousValue: 21.3,
    currentLabel: '2024 (IHS6)',
    currentLabelNy: '2024 (IHS6)',
    currentValue: 27.6,
    deltaText: '+6.3 percentage points',
    deltaTextNy: '+6.3% kuwonjezeka',
  },
  {
    id: 'ganyu-prime',
    group: 'Prime-age adults aged 25–54',
    groupNy: 'Akulu azaka 25–54',
    previousLabel: '2020 (IHS5)',
    previousLabelNy: '2020 (IHS5)',
    previousValue: 18.9,
    currentLabel: '2024 (IHS6)',
    currentLabelNy: '2024 (IHS6)',
    currentValue: 25.3,
    deltaText: '+6.4 percentage points',
    deltaTextNy: '+6.4% kuwonjezeka',
  },
  {
    id: 'ganyu-older',
    group: 'Older workers aged 55–64',
    groupNy: 'Achikulire azaka 55–64',
    previousLabel: '2020 (IHS5)',
    previousLabelNy: '2020 (IHS5)',
    previousValue: 12.8,
    currentLabel: '2024 (IHS6)',
    currentLabelNy: '2024 (IHS6)',
    currentValue: 16.7,
    deltaText: '+3.9 percentage points',
    deltaTextNy: '+3.9% kuwonjezeka',
  },
];

export const SECTION_4_GANYU_SOURCE = makeSource(
  18,
  'Page 18 · Box 1.1 & Figure B1.1.1',
  'Among workers in each age group, the share classified as working in ganyu (casual labor) increased between 2020 (IHS5) and 2024 (IHS6): from 21.3 to 27.6 percent among youth, from 18.9 to 25.3 percent among prime-age adults, and from 12.8 to 16.7 percent among older workers (Figure B1.1.1).'
);

export const SECTION_5_LITERACY_BARS = [
  {
    id: 'lit-national',
    group: 'National adult literacy (15+)',
    groupNy: 'Akulu odziwa kuwerenga m’dziko (15+)',
    previousLabel: '2019/20 (IHS5)',
    previousLabelNy: '2019/20 (IHS5)',
    previousValue: 74,
    currentLabel: '2024/25 (IHS6)',
    currentLabelNy: '2024/25 (IHS6)',
    currentValue: 79,
    deltaText: '+5 percentage points (approx.)',
    deltaTextNy: '+5% kuwonjezeka (pafupifupi)',
  },
  {
    id: 'lit-women',
    group: "Women's literacy (15+)",
    groupNy: 'Amayi odziwa kuwerenga (15+)',
    previousLabel: '2019/20 (IHS5)',
    previousLabelNy: '2019/20 (IHS5)',
    previousValue: 67,
    currentLabel: '2024/25 (IHS6)',
    currentLabelNy: '2024/25 (IHS6)',
    currentValue: 75,
    deltaText: '+8 percentage points (approx.)',
    deltaTextNy: '+8% kuwonjezeka (pafupifupi)',
  },
];

export const SECTION_5_SOURCES = {
  education: makeSource(
    18,
    'Page 18 · Box 1.1 & Figure B1.1.2',
    'The adult literacy rate rose from roughly 74 to 79 percent nationally between IHS5 and IHS6, with women recording larger gains (from about 67 to 75 percent). The literacy rate among youth aged 15–24 now approaches 90 percent, and younger cohorts reach secondary and post-secondary education at higher rates than older adults (Figure B1.1.2).'
  ),
  absorptionGap: makeSource(
    18,
    'Page 18 · Box 1.1 (Absorption Challenge)',
    'These are meaningful signs of human-capital progress. But they also sharpen the absorption challenge: young Malawians are entering the labor market better educated than any previous generation, yet a large share still transitions into ganyu, subsistence farming, or other low-return activities. Expanding educational opportunities without a corresponding expansion of productive employment risks leaving that investment unrealized.',
    'platform_interpretation'
  ),
};

export interface WelfareComparisonItem {
  id: string;
  title: string;
  titleNy: string;
  shortDirection: 'DOWN' | 'UP';
  shortDirectionNy: string;
  trendArrow: 'down' | 'up';
  isWorse: boolean;
  previousPeriod: string;
  previousPeriodNy: string;
  previousValue: string;
  previousNumeric: number;
  currentPeriod: string;
  currentPeriodNy: string;
  currentValue: string;
  currentNumeric: number;
  maxScale: number;
  unit: string;
  unitNy: string;
  plainExplanation: string;
  plainExplanationNy: string;
  source: SourceReference;
}

export const SECTION_6_WELFARE: WelfareComparisonItem[] = [
  {
    id: 'w-national-poverty',
    title: 'National Poverty',
    titleNy: 'Umphawi Wonse wa Dziko',
    shortDirection: 'DOWN',
    shortDirectionNy: 'WATSITSA',
    trendArrow: 'down',
    isWorse: false,
    previousPeriod: '2019/20 (IHS5)',
    previousPeriodNy: '2019/20 (IHS5)',
    previousValue: '50.7%',
    previousNumeric: 50.7,
    currentPeriod: '2024/25 (IHS6)',
    currentPeriodNy: '2024/25 (IHS6)',
    currentValue: '47.3%',
    currentNumeric: 47.3,
    maxScale: 60,
    unit: '% of population',
    unitNy: '% ya anthu onse',
    plainExplanation:
      'The share of people living below the national poverty line declined slightly.',
    plainExplanationNy:
      'Chiwerengero cha anthu okhala mu umphawi chinatsika pang’ono.',
    source: makeSource(
      18,
      'Page 18 · Box 1.1 (Welfare gains)',
      'The national poverty rate fell from 50.7 to 47.3 percent, while the food poverty rate rose from 20.5 to 24.0 percent, and the Gini coefficient increased from 37.9 to 39.9 (signaling an uptick in inequality).'
    ),
  },
  {
    id: 'w-food-poverty',
    title: 'Food Poverty',
    titleNy: 'Kusowa Chakudya Chokwanira',
    shortDirection: 'UP',
    shortDirectionNy: 'KWAKWERA',
    trendArrow: 'up',
    isWorse: true,
    previousPeriod: '2019/20 (IHS5)',
    previousPeriodNy: '2019/20 (IHS5)',
    previousValue: '20.5%',
    previousNumeric: 20.5,
    currentPeriod: '2024/25 (IHS6)',
    currentPeriodNy: '2024/25 (IHS6)',
    currentValue: '24.0%',
    currentNumeric: 24.0,
    maxScale: 60,
    unit: '% of population',
    unitNy: '% ya anthu onse',
    plainExplanation:
      'Even though national poverty declined, the share of people unable to afford enough food increased.',
    plainExplanationNy:
      'Ngakhale umphawi wonse unatsika, anthu osatha kugula chakudya chokwanira anakwera.',
    source: makeSource(
      18,
      'Page 18 · Box 1.1 (Welfare gains)',
      'The national poverty rate fell from 50.7 to 47.3 percent, while the food poverty rate rose from 20.5 to 24.0 percent, and the Gini coefficient increased from 37.9 to 39.9 (signaling an uptick in inequality).'
    ),
  },
  {
    id: 'w-inequality',
    title: 'Inequality (Gini Coefficient)',
    titleNy: 'Kusiyana kwa Chuma (Gini)',
    shortDirection: 'UP',
    shortDirectionNy: 'KWAKWERA',
    trendArrow: 'up',
    isWorse: true,
    previousPeriod: '2019/20 (IHS5)',
    previousPeriodNy: '2019/20 (IHS5)',
    previousValue: '37.9',
    previousNumeric: 37.9,
    currentPeriod: '2024/25 (IHS6)',
    currentPeriodNy: '2024/25 (IHS6)',
    currentValue: '39.9',
    currentNumeric: 39.9,
    maxScale: 60,
    unit: 'Gini index (0–100)',
    unitNy: 'Mlingo wa Gini (0–100)',
    plainExplanation:
      "The difference between people's incomes or living standards has increased. The Gini coefficient is a measure of inequality.",
    plainExplanationNy:
      'Kusiyana pakati pa anthu olemera ndi osauka kwakula. Gini ndi mlingo woyezera kusiyanaku.',
    source: makeSource(
      18,
      'Page 18 · Box 1.1 (Welfare gains)',
      'The national poverty rate fell from 50.7 to 47.3 percent, while the food poverty rate rose from 20.5 to 24.0 percent, and the Gini coefficient increased from 37.9 to 39.9 (signaling an uptick in inequality).'
    ),
  },
];

export interface SystemDiagramNode {
  id: string;
  label: string;
  labelNy: string;
  category: 'driver' | 'constraint' | 'labor' | 'welfare';
  x: number;
  y: number;
  summary: string;
  summaryNy: string;
  reportLinkNote: string;
  reportLinkNoteNy: string;
  connectedTo: {
    targetId: string;
    relationship: string;
    relationshipNy: string;
    classification: 'direct_report' | 'platform_interpretation';
  }[];
  source: SourceReference;
}

export const SYSTEM_DIAGRAM_NODES: SystemDiagramNode[] = [
  {
    id: 'ag-recovery',
    label: 'Agricultural recovery',
    labelNy: 'Kuchira kwa ulimi',
    category: 'driver',
    x: 16,
    y: 16,
    summary:
      'Farming output is recovering modestly from the severe 2024 El Niño drought, helping lift 2026 projected GDP growth.',
    summaryNy:
      'Zokolola za ulimi zikuyamba kubwerera pang’ono pambuyo pa chilala cha 2024, zomwe zikuthandiza chuma kukula mu 2026.',
    reportLinkNote: 'Directly discussed as a 2026 growth contributor on Page 17.',
    reportLinkNoteNy: 'Zafotokozedwa mwachindunji pa Tsamba 17 ngati zothandiza chuma.',
    connectedTo: [
      {
        targetId: 'econ-growth',
        relationship: 'Supports GDP growth recovery in 2026 (2.7% projected)',
        relationshipNy: 'Zimathandiza kukula kwa chuma mu 2026 (2.7%)',
        classification: 'direct_report',
      },
      {
        targetId: 'food-poverty',
        relationship: 'Weather & harvest swings strongly affect rural food access*',
        relationshipNy: 'Nyengo ndi zokolola zimakhudza kwambiri chakudya cha kumidzi*',
        classification: 'platform_interpretation',
      },
    ],
    source: makeSource(
      17,
      'Page 17 · Section 1.2',
      'The uptick in GDP is set to be underpinned by sustained expansion in the services sector, particularly financial services, alongside an ongoing recovery in agricultural output following the drought caused by the 2024 El Niño event.'
    ),
  },
  {
    id: 'services',
    label: 'Services',
    labelNy: 'Mabanki & Ntchito',
    category: 'driver',
    x: 50,
    y: 12,
    summary:
      'Sustained expansion in services—particularly financial services—is underpinning Malawi’s projected 2026 GDP growth.',
    summaryNy:
      'Kukula kwa mabanki ndi ntchito za ndalama kukuthandiza kwambiri kukula kwa chuma mu 2026.',
    reportLinkNote: 'Directly discussed as a growth driver on Page 17.',
    reportLinkNoteNy: 'Zafotokozedwa pa Tsamba 17 ngati zokankhira chuma.',
    connectedTo: [
      {
        targetId: 'econ-growth',
        relationship: 'Underpins projected 2026 GDP expansion (Figure 1.5)',
        relationshipNy: 'Zikuchirikiza kukula kwa chuma mu 2026 (Chithunzi 1.5)',
        classification: 'direct_report',
      },
    ],
    source: makeSource(
      17,
      'Page 17 · Section 1.2 & Figure 1.5',
      'The uptick in GDP is set to be underpinned by sustained expansion in the services sector, particularly financial services...'
    ),
  },
  {
    id: 'fx-shortages',
    label: 'Foreign-exchange shortages',
    labelNy: 'Kusowa kwa Madola',
    category: 'constraint',
    x: 84,
    y: 18,
    summary:
      'Scarcity of US dollars makes it hard for factories and agribusinesses to import raw materials, spare parts, and equipment.',
    summaryNy:
      'Kusowa kwa madola kumavuta mafakitale kuitanitsa zopangira katundu, masipeya, ndi makina.',
    reportLinkNote: 'Directly identified as a top business constraint (Pages 17–18).',
    reportLinkNoteNy: 'Chopezeka ngati chopinga chachikulu cha mabizinesi (Masamba 17–18).',
    connectedTo: [
      {
        targetId: 'business-activity',
        relationship: 'Impedes critical imports & keeps firms below 50% capacity',
        relationshipNy: 'Kumaletsa kuitanitsa zofunikira ndipo mabizinesi amagwira ntchito pansi pa 50%',
        classification: 'direct_report',
      },
    ],
    source: makeSource(
      18,
      'Pages 17 & 18 · Section 1.2',
      'Industrial sector performance remains constrained by foreign-exchange distortions, which impede the import of critical inputs... A 2025 survey by the Malawi Confederation of Chambers of Commerce and Industry shows foreign-exchange availability and inflation remain the top constraints for businesses.'
    ),
  },
  {
    id: 'econ-growth',
    label: 'Economic growth',
    labelNy: 'Kukula kwa Chuma',
    category: 'driver',
    x: 34,
    y: 42,
    summary:
      'Projected at 2.7% in 2026 (up from 2.5% in 2025), barely exceeding 2.6% annual population growth.',
    summaryNy:
      'Kukuyembekezeka pa 2.7% mu 2026 (kuchokera 2.5% mu 2025), kungoposa chiwerengero cha anthu (2.6%) pang’ono.',
    reportLinkNote: 'Directly reported on Page 17.',
    reportLinkNoteNy: 'Zolembedwa pa Tsamba 17.',
    connectedTo: [
      {
        targetId: 'employment',
        relationship: 'Slow growth limits the creation of formal jobs*',
        relationshipNy: 'Kukula pang’ono kumachepetsa kupanga ntchito zokhazikika*',
        classification: 'platform_interpretation',
      },
      {
        targetId: 'household-incomes',
        relationship: 'Per-capita incomes have been declining since 2022',
        relationshipNy: 'Ndalama za munthu aliyense zikutsika kuyambira 2022',
        classification: 'direct_report',
      },
    ],
    source: makeSource(
      17,
      'Page 17 · Section 1.2',
      'Malawi’s GDP is projected to grow by 2.7 percent in 2026, up from an estimated 2.5 percent in 2025... overall growth remains below potential and insufficient to meaningfully raise per-capita incomes, which have been declining since 2022.'
    ),
  },
  {
    id: 'business-activity',
    label: 'Business activity',
    labelNy: 'Ntchito za Mabizinesi',
    category: 'constraint',
    x: 72,
    y: 44,
    summary:
      'More than half of surveyed businesses operate below 50% capacity due to forex shortages, inflation, unreliable power, and scarce credit.',
    summaryNy:
      'Mabizinesi opitilira theka akugwira ntchito pansi pa 50% chifukwa chosowa madola, kukwera mitengo, magetsi, ndi ngongole.',
    reportLinkNote: 'Directly reported on Page 18 (MCCCI 2025 survey).',
    reportLinkNoteNy: 'Zolembedwa pa Tsamba 18 (kafukufuku wa MCCCI 2025).',
    connectedTo: [
      {
        targetId: 'econ-growth',
        relationship: 'Muted industrial & private output holds growth below potential',
        relationshipNy: 'Kuchepa kwa mafakitale kumasunga chuma pansi',
        classification: 'direct_report',
      },
      {
        targetId: 'employment',
        relationship: 'Firms running under half capacity hire fewer salaried workers*',
        relationshipNy: 'Mabizinesi omwe sakupanga zokwanira amalemba antchito ochepa*',
        classification: 'platform_interpretation',
      },
    ],
    source: makeSource(
      18,
      'Page 18 · Private sector activity',
      'Private sector activity remains muted... with over half of firms operating at less than 50-percent capacity.'
    ),
  },
  {
    id: 'education',
    label: 'Education',
    labelNy: 'Maphunziro',
    category: 'labor',
    x: 16,
    y: 66,
    summary:
      'Adult literacy climbed from ~74% to ~79% (women ~67% to ~75%), and youth literacy approaches 90%.',
    summaryNy:
      'Akulu odziwa kuwerenga anakwera kuchoka ~74% kufika ~79% (amayi ~67% kufika ~75%), ndipo achinyamata ali pafupi 90%.',
    reportLinkNote: 'Directly reported in Box 1.1 (Page 18).',
    reportLinkNoteNy: 'Zolembedwa m’Bokosi 1.1 (Tsamba 18).',
    connectedTo: [
      {
        targetId: 'employment',
        relationship: 'Better-educated youth enter a market with too few formal jobs',
        relationshipNy: 'Achinyamata ophunzira akupeza ntchito zokhazikika zochepa',
        classification: 'direct_report',
      },
    ],
    source: makeSource(
      18,
      'Page 18 · Box 1.1',
      'The adult literacy rate rose from roughly 74 to 79 percent nationally between IHS5 and IHS6, with women recording larger gains (from about 67 to 75 percent). The literacy rate among youth aged 15–24 now approaches 90 percent.'
    ),
  },
  {
    id: 'employment',
    label: 'Employment',
    labelNy: 'Ntchito & Ganyu',
    category: 'labor',
    x: 50,
    y: 66,
    summary:
      'Formal wage jobs remain rare (~12% of prime-age adults, <4% of youth), while casual ganyu participation rose sharply.',
    summaryNy:
      'Ntchito zokhazikika n’zochepa (~12% ya akulu, <4% ya achinyamata), pamene ganyu wakwera kwambiri.',
    reportLinkNote: 'Directly reported in Box 1.1 (Page 18).',
    reportLinkNoteNy: 'Zolembedwa m’Bokosi 1.1 (Tsamba 18).',
    connectedTo: [
      {
        targetId: 'household-incomes',
        relationship: 'Heavy reliance on ganyu & subsistence work keeps earnings insecure*',
        relationshipNy: 'Kudalira ganyu kumasunga ndalama za banja zosakhazikika*',
        classification: 'platform_interpretation',
      },
    ],
    source: makeSource(
      18,
      'Page 18 · Box 1.1',
      'Formal wage employment remains rare, only encompassing around 12 percent of prime-age adults—those aged 25–54, and less than 4 percent of young people—those aged 15–24... the share classified as working in ganyu (casual labor) increased between 2020 (IHS5) and 2024 (IHS6).'
    ),
  },
  {
    id: 'household-incomes',
    label: 'Household incomes',
    labelNy: 'Ndalama za Mabanja',
    category: 'welfare',
    x: 82,
    y: 68,
    summary:
      'Average earnings per person have declined since 2022, and overall poverty fell only slightly from 50.7% to 47.3% with uneven regional gains.',
    summaryNy:
      'Phindu la munthu aliyense latsika kuyambira 2022, ndipo umphawi wonse unatsika pang’ono kuchoka 50.7% kufika 47.3%.',
    reportLinkNote: 'Directly reported on Pages 17 & 18.',
    reportLinkNoteNy: 'Zolembedwa pa Masamba 17 & 18.',
    connectedTo: [
      {
        targetId: 'food-poverty',
        relationship: 'Strained household budgets leave more families unable to afford food*',
        relationshipNy: 'Kusowa kwa ndalama kumasiya mabanja ambiri osakwanitsa kugula chakudya*',
        classification: 'platform_interpretation',
      },
      {
        targetId: 'inequality',
        relationship: 'Uneven income gains widen living-standard gaps*',
        relationshipNy: 'Kusintha kosagawika bwino kumakulitsa kusiyana kwa moyo*',
        classification: 'platform_interpretation',
      },
    ],
    source: makeSource(
      18,
      'Pages 17–18 · Box 1.1',
      'Per-capita incomes, which have been declining since 2022... In the time interval between the surveys, the national poverty rate fell modestly, but food poverty deepened, inequality increased, and progress was heavily concentrated in a single region.'
    ),
  },
  {
    id: 'food-poverty',
    label: 'Food poverty',
    labelNy: 'Kusowa Chakudya',
    category: 'welfare',
    x: 32,
    y: 88,
    summary:
      'Rose from 20.5% (2019/20) to 24.0% (2024/25) — meaning nearly 1 in 4 people struggled to afford enough food.',
    summaryNy:
      'Anakwera kuchoka 20.5% (2019/20) kufika 24.0% (2024/25) — pafupifupi munthu 1 mwa 4 anavutika kupeza chakudya chokwanira.',
    reportLinkNote: 'Directly reported in Box 1.1 (Page 18).',
    reportLinkNoteNy: 'Zolembedwa m’Bokosi 1.1 (Tsamba 18).',
    connectedTo: [],
    source: makeSource(
      18,
      'Page 18 · Box 1.1',
      'The national poverty rate fell from 50.7 to 47.3 percent, while the food poverty rate rose from 20.5 to 24.0 percent...'
    ),
  },
  {
    id: 'inequality',
    label: 'Inequality',
    labelNy: 'Kusiyana kwa Moyo',
    category: 'welfare',
    x: 68,
    y: 88,
    summary:
      'The Gini coefficient increased from 37.9 (2019/20) to 39.9 (2024/25), showing wider differences in living standards.',
    summaryNy:
      'Mlingo wa Gini unakwera kuchoka 37.9 (2019/20) kufika 39.9 (2024/25), kusonyeza kusiyana kwakukulu pakati pa anthu.',
    reportLinkNote: 'Directly reported in Box 1.1 (Page 18).',
    reportLinkNoteNy: 'Zolembedwa m’Bokosi 1.1 (Tsamba 18).',
    connectedTo: [],
    source: makeSource(
      18,
      'Page 18 · Box 1.1',
      '...and the Gini coefficient increased from 37.9 to 39.9 (signaling an uptick in inequality).'
    ),
  },
];

export interface StoryQuizQuestion {
  id: string;
  question: string;
  questionNy: string;
  options: {id: string; text: string; textNy: string}[];
  correctOptionId: string;
  explanation: string;
  explanationNy: string;
  pageRef: string;
  pageRefNy: string;
  source: SourceReference;
}

export const STORY_QUIZ_QUESTIONS: StoryQuizQuestion[] = [
  {
    id: 'sq-1',
    question:
      'Malawi’s economy is projected to grow 2.7% in 2026 while population grows about 2.6% a year. What does this mean for ordinary people?',
    questionNy:
      'Chuma cha Malawi chikuyembekezeka kukula ndi 2.7% mu 2026 pamene anthu akuchuluka ndi 2.6% pachaka. Kodi izi zikutanthauza chiyani kwa anthu wamba?',
    options: [
      {
        id: 'a',
        text: 'Every household will automatically become much richer.',
        textNy: 'Banja lililonse lidzakhala lolemera kwambiri mwachangu.',
      },
      {
        id: 'b',
        text: 'Growth barely outpaces population growth, so living standards hardly improve and poverty will not fall quickly.',
        textNy: 'Chuma chikungoposa chiwerengero cha anthu pang’ono, choncho moyo wa anthu sukukwera kwenikweni.',
      },
      {
        id: 'c',
        text: 'Population growth has stopped completely.',
        textNy: 'Kuchuluka kwa anthu kwaimilira.',
      },
      {
        id: 'd',
        text: '2.7% is already recorded as a final 2026 outcome.',
        textNy: '2.7% ndi zotsatira zotsimikizika zomwe zachitika kale mu 2026.',
      },
    ],
    correctOptionId: 'b',
    explanation:
      'Think of the cake growing by 2.7% while 2.6% more people share it — each person’s slice barely grows. Also remember 2.7% is a projection, not yet a recorded outcome.',
    explanationNy:
      'Ganizirani keke yokula ndi 2.7% pamene anthu ogawana akukula ndi 2.6% — gawo la aliyense silikula kwenikweni. Komanso 2.7% ndi chiyembekezo chokha.',
    pageRef: 'Page 17',
    pageRefNy: 'Tsamba 17',
    source: makeSource(
      17,
      'Page 17 · Section 1.2',
      'Malawi’s GDP is projected to grow by 2.7 percent in 2026... While this would mark the first time in five years that GDP expansion outpaces the country’s rate of population growth, which stands at 2.6 percent per year, this pace of economic growth remains too slow to push a significant number of people out of poverty.'
    ),
  },
  {
    id: 'sq-2',
    question:
      'Why do foreign-exchange (US dollar) shortages hurt Malawian factories and businesses?',
    questionNy:
      'Chifukwa chiyani kusowa kwa madola (forex) kumavulaza mafakitale ndi mabizinesi a m’Malawi?',
    options: [
      {
        id: 'a',
        text: 'Businesses need foreign currency to import machinery, fuel, and essential production materials; without it, many run below capacity.',
        textNy: 'Mabizinesi amafunika madola kuti agule makina, mafuta, ndi zopangira katundu kunja; popanda madola, amagwira ntchito pansi pa mphamvu zawo.',
      },
      {
        id: 'b',
        text: 'Factories only sell goods in US dollars inside local villages.',
        textNy: 'Mafakitale amagulitsa katundu wawo m’midzi muno ndi madola okha.',
      },
      {
        id: 'c',
        text: 'Foreign-exchange shortages make electricity free.',
        textNy: 'Kusowa kwa madola kumapangitsa magetsi kukhala aulere.',
      },
      {
        id: 'd',
        text: 'Because businesses no longer need raw materials.',
        textNy: 'Chifukwa mabizinesi safunanso zopangira katundu.',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Correct! When foreign currency is hard to get, businesses struggle to import critical materials and spare parts — contributing to more than half of surveyed firms operating below 50% capacity.',
    explanationNy:
      'Mwakhoza! Madola akasowa, mabizinesi amalephera kuitanitsa zida ndi masipeya — zomwe zachititsa mafakitale opitilira theka kugwira ntchito pansi pa 50%.',
    pageRef: 'Pages 17–18',
    pageRefNy: 'Masamba 17–18',
    source: makeSource(
      18,
      'Pages 17–18 · Private sector activity',
      'Industrial sector performance remains constrained by foreign-exchange distortions, which impede the import of critical inputs... A 2025 survey by the Malawi Confederation of Chambers of Commerce and Industry shows foreign-exchange availability and inflation remain the top constraints for businesses, with over half of firms operating at less than 50-percent capacity.'
    ),
  },
  {
    id: 'sq-3',
    question: 'What does "ganyu" mean in the World Bank report?',
    questionNy: 'Kodi mawu oti "ganyu" akutanthauza chiyani mu lipoti la World Bank?',
    options: [
      {
        id: 'a',
        text: 'A formal government salary with a long-term contract.',
        textNy: 'Ntchito ya boma yokhazikika ya kontrakiti yaitali.',
      },
      {
        id: 'b',
        text: 'Casual, usually short-term work that people take up to earn money, often in farming or manual jobs.',
        textNy: 'Ntchito zochepa zanthawi yochepa zomwe anthu amagwira kuti apeze ndalama, makamaka m’minda kapena za manja.',
      },
      {
        id: 'c',
        text: 'A university degree program.',
        textNy: 'Maphunziro a ku yunivesite.',
      },
      {
        id: 'd',
        text: 'A type of import tax.',
        textNy: 'Mtundu wa msonkho wa m’malire.',
      },
    ],
    correctOptionId: 'b',
    explanation:
      'Exactly! Ganyu is casual, short-term labor. Between 2020 and 2024, ganyu participation rose across all age groups — jumping from 21.3% to 27.6% among youth aged 15–24.',
    explanationNy:
      'Ndendende! Ganyu ndi ntchito ya nthawi yochepa. Pakati pa 2020 ndi 2024, ogwira ganyu anakwera kwa aliyense — makamaka achinyamata kuchoka 21.3% kufika 27.6%.',
    pageRef: 'Page 18',
    pageRefNy: 'Tsamba 18',
    source: makeSource(
      18,
      'Page 18 · Box 1.1',
      'Among workers in each age group, the share classified as working in ganyu (casual labor) increased between 2020 (IHS5) and 2024 (IHS6): from 21.3 to 27.6 percent among youth, from 18.9 to 25.3 percent among prime-age adults, and from 12.8 to 16.7 percent among older workers.'
    ),
  },
  {
    id: 'sq-4',
    question:
      'Youth literacy is approaching 90% and adult literacy rose to ~79%. Why has better education not automatically created secure jobs for everyone?',
    questionNy:
      'Achinyamata pafupifupi 90% amadziwa kuwerenga ndipo akulu anakwera kufika ~79%. Chifukwa chiyani maphunziro sanabweretse ntchito zokhazikika kwa aliyense?',
    options: [
      {
        id: 'a',
        text: 'Because literate workers prefer not to earn salaries.',
        textNy: 'Chifukwa anthu ophunzira safuna kulandira malipiro.',
      },
      {
        id: 'b',
        text: 'Because the economy is not creating enough productive formal jobs to absorb better-educated workers.',
        textNy: 'Chifukwa chuma sichikupanga ntchito zokhazikika zokwanira zolemba anthu ophunzira.',
      },
      {
        id: 'c',
        text: 'Because literacy rates actually declined since 2019/20.',
        textNy: 'Chifukwa odziwa kuwerenga anachepa kuyambira 2019/20.',
      },
      {
        id: 'd',
        text: 'Because more than 80% of youth already hold formal wage jobs.',
        textNy: 'Chifukwa oposa 80% ya achinyamata ali ndi ntchito zokhazikika kale.',
      },
    ],
    correctOptionId: 'b',
    explanation:
      'Well spotted! Education builds skills, yet fewer than 4% of youth aged 15–24 have formal wage employment — showing the gap between educational progress and business job creation.',
    explanationNy:
      'Mwaona bwino! Maphunziro amathandiza, koma ochepera 4% a achinyamata ali pa ntchito zokhazikika — kusonyeza kusiyana pakati pa maphunziro ndi kupezeka kwa ntchito.',
    pageRef: 'Page 18',
    pageRefNy: 'Tsamba 18',
    source: makeSource(
      18,
      'Page 18 · Box 1.1 (Absorption Challenge)',
      'Educational attainment among young people is advancing faster than the ability of the economy to absorb better-educated workers... Expanding educational opportunities without a corresponding expansion of productive employment risks leaving that investment unrealized.'
    ),
  },
  {
    id: 'sq-5',
    question:
      'Comparing IHS5 (2019/20) and IHS6 (2024/25), what happened to national poverty versus food poverty?',
    questionNy:
      'Poyerekeza IHS5 (2019/20) ndi IHS6 (2024/25), n’chiyani chinachitika ku umphawi wonse poyerekeza ndi kusowa kwa chakudya?',
    options: [
      {
        id: 'a',
        text: 'Both national poverty and food poverty fell sharply.',
        textNy: 'Umphawi wonse ndi kusowa kwa chakudya zinatsika kwambiri.',
      },
      {
        id: 'b',
        text: 'National poverty rose, while food poverty disappeared.',
        textNy: 'Umphawi wonse unakwera pamene kusowa chakudya kunatha.',
      },
      {
        id: 'c',
        text: 'National poverty edged down (50.7% to 47.3%), while food poverty got worse (20.5% to 24.0%) and inequality rose.',
        textNy: 'Umphawi wonse unatsika pang’ono (50.7% kufika 47.3%), pamene kusowa chakudya kunakula (20.5% kufika 24.0%) ndi kusiyana chuma kunakwera.',
      },
      {
        id: 'd',
        text: 'Nothing changed between the two surveys.',
        textNy: 'Palibe chomwe chinasintha pakati pa mafukufuku awiriwa.',
      },
    ],
    correctOptionId: 'c',
    explanation:
      'That is why one indicator alone can mislead! Overall poverty fell slightly, yet severe food hardship rose to 24.0% and the Gini inequality index climbed from 37.9 to 39.9.',
    explanationNy:
      'N’chifukwa chake chiwerengero chimodzi chingapusitse! Umphawi wonse unatsika pang’ono, koma kusowa chakudya kunakwera kufika 24.0% ndipo Gini anakwera kuchoka 37.9 kufika 39.9.',
    pageRef: 'Page 18',
    pageRefNy: 'Tsamba 18',
    source: makeSource(
      18,
      'Page 18 · Box 1.1',
      'The national poverty rate fell from 50.7 to 47.3 percent, while the food poverty rate rose from 20.5 to 24.0 percent, and the Gini coefficient increased from 37.9 to 39.9 (signaling an uptick in inequality).'
    ),
  },
];
