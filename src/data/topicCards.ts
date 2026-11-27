import type {ChainSequence, TopicCardItem} from '../types';

const PDF_URL =
  '/assets/aistudio/MALAWI_ECONOMIC_MONITOR_BUILDING_STABILITY_TO_UNLOCK_GROWTH_a1ee2546.pdf';

const VERIFIED_SOURCE_2026 = (
  pageNumber: number,
  pageReference: string,
  originalWording: string,
  sourceType: 'direct_report' | 'platform_interpretation' = 'direct_report'
) => ({
  reportId: 'mem-sept-2026',
  reportTitle: 'Malawi Economic Monitor: Building Stability to Unlock Growth',
  publisher: 'World Bank',
  publicationYear: 2026,
  pageReference,
  originalWording,
  sourceUrl: `${PDF_URL}#page=${pageNumber}`,
  sourceType,
  verificationStatus: 'verified' as const,
});

const SAMPLE_SOURCE_2024 = (
  originalWording: string,
  sourceType: 'direct_report' | 'platform_interpretation' = 'platform_interpretation'
) => ({
  reportId: 'mem-2024-sample',
  reportTitle: 'Malawi Economic Monitor (Illustrative Sample)',
  publisher: 'World Bank',
  publicationYear: 2024,
  pageReference: 'Sample Section · Pending Official Verification',
  originalWording,
  sourceUrl: 'https://www.worldbank.org/en/country/malawi/publication/malawi-economic-monitor',
  sourceType,
  verificationStatus: 'sample_pending_verification' as const,
});

const SAMPLE_SOURCE_2023 = (originalWording: string) => ({
  reportId: 'mem-2023-sample',
  reportTitle: 'Malawi Economic Monitor — Archive Edition (Illustrative Sample)',
  publisher: 'World Bank',
  publicationYear: 2023,
  pageReference: 'Sample Archive · Pending Official Verification',
  originalWording,
  sourceUrl: 'https://www.worldbank.org/en/country/malawi/publication/malawi-economic-monitor',
  sourceType: 'platform_interpretation' as const,
  verificationStatus: 'sample_pending_verification' as const,
});

export const TOPIC_CARDS: TopicCardItem[] = [
  // =========================================================================
  // SEPTEMBER 2026 — TOPIC 1: ECONOMIC GROWTH (PAGE 17 SIMPLIFIED IN DEPTH)
  // =========================================================================
  {
    id: 'card26-eg-1',
    topicId: 'mem26-economic-growth',
    reportId: 'mem-sept-2026',
    stepNumber: 1,
    heading: {
      en: 'Growth Edges Up to 2.7%',
      ny: 'Chuma Chikukula kufika 2.7%',
    },
    oneLineSummary: {
      en: 'Projected 2.7% growth in 2026 sits just 0.1% above 2.6% population growth.',
      ny: 'Chuma cha 2.7% mu 2026 chikuposa kukula kwa anthu (2.6%) ndi 0.1% yokha.',
    },
    direction: 'up',
    directionLabel: {en: '2.7% vs 2.6%', ny: '2.7% vs 2.6%'},
    plainExplanation: {
      en: 'Output outpaces population for the first time in five years, yet too slowly to cut poverty.',
      ny: 'Chuma chikuposa anthu kwa nthawi yoyamba m’zaka zisanu, koma pang’ono kwambiri.',
    },
    whyItHappens: {
      en: 'With population rising 2.6% yearly, the economy needs much faster growth to lift pay.',
      ny: 'Anthu akachuluka 2.6% pachaka, chuma chiyenera kukula msanga kuti malipiro akwere.',
    },
    everydayImpact: {
      en: 'Average earnings per person have slipped since 2022 despite slight 2026 improvement.',
      ny: 'Phindu la munthu mmodzi latsika kuyambira 2022 ngakhale chuma chikukwera pang’ono.',
    },
    relatedFactors: [
      {en: 'Jobs & Employment', ny: 'Ntchito & Ganyu'},
      {en: 'Agriculture', ny: 'Ulimi'},
    ],
    iconName: 'TrendingUp',
    source: VERIFIED_SOURCE_2026(
      17,
      'Page 17 (Section 1.2)',
      'Malawi’s GDP is projected to grow by 2.7 percent in 2026, up from an estimated 2.5 percent in 2025. While this would mark the first time in five years that GDP expansion outpaces the country’s rate of population growth, which stands at 2.6 percent per year, this pace of economic growth remains too slow to push a significant number of people out of poverty.'
    ),
  },
  {
    id: 'card26-eg-2',
    topicId: 'mem26-economic-growth',
    reportId: 'mem-sept-2026',
    stepNumber: 2,
    heading: {
      en: 'Services Carry 2026 Growth',
      ny: 'Mabanki ndi Masitolo Akukweza Chuma',
    },
    oneLineSummary: {
      en: 'Banks, shops, and everyday services provide the main boost to 2026 output.',
      ny: 'Mabanki, masitolo, ndi mayendedwe ndi zomwe zikuthandiza kwambiri mu 2026.',
    },
    direction: 'up',
    directionLabel: {en: 'Services Leading', ny: 'Ntchito Zikutsogola'},
    plainExplanation: {
      en: 'Financial services and town trade are expanding even while industry stays weak.',
      ny: 'Mabanki ndi malonda a m’tauni akukula ngakhale mafakitale akuvutika.',
    },
    whyItHappens: {
      en: 'Service firms rely less on scarce factory imports than manufacturers do.',
      ny: 'Mabanki samadalira katundu wochokera kunja monga mafakitale.',
    },
    everydayImpact: {
      en: 'Growth is concentrated in towns, leaving rural families waiting for wider gains.',
      ny: 'Kukula kuli m’matauni, kotero mabanja a kumidzi akudikirabe phindu.',
    },
    relatedFactors: [
      {en: 'Gov. Spending', ny: 'Ndalama za Boma'},
      {en: 'Jobs & Employment', ny: 'Ntchito & Ganyu'},
    ],
    iconName: 'BarChart3',
    source: VERIFIED_SOURCE_2026(
      17,
      'Page 17 (Section 1.2 & Figure 1.5)',
      'The uptick in GDP is set to be underpinned by sustained expansion in the services sector, particularly financial services, alongside an ongoing recovery in agricultural output following the drought caused by the 2024 El Niño event (Figure 1.5).'
    ),
  },
  {
    id: 'card26-eg-3',
    topicId: 'mem26-economic-growth',
    reportId: 'mem-sept-2026',
    stepNumber: 3,
    heading: {
      en: 'Farming Recovers Slowly',
      ny: 'Ulimi Ukubwerera Pang’ono',
    },
    oneLineSummary: {
      en: 'Farm harvests are rebounding modestly after the 2024 El Niño drought.',
      ny: 'Zokolola za ulimi zikuyamba kuchira pambuyo pa chilala cha 2024.',
    },
    direction: 'up',
    directionLabel: {en: 'Modest Farm Recovery', ny: 'Ulimi Ukukwera Pang’ono'},
    plainExplanation: {
      en: 'Harvests improved over 2024 losses, yet farming stays below full potential.',
      ny: 'Zokolola zakwera poyerekeza ndi 2024, koma ulimi sunafike pamlingo weniweni.',
    },
    whyItHappens: {
      en: 'Better seasonal rains helped crops rebound despite rain-fed risks and costly inputs.',
      ny: 'Mvula yabwino inathandiza mbewu kukula ngakhale feteleza akadali wodula.',
    },
    everydayImpact: {
      en: 'Larger harvests steady grain markets, even while rural incomes recover slowly.',
      ny: 'Zokolola zabwino zimathandiza mitengo ya chimanga, ngakhale ndalama zikukwera pang’ono.',
    },
    relatedFactors: [
      {en: 'Agriculture', ny: 'Ulimi'},
      {en: 'Inflation & Prices', ny: 'Mitengo ya Katundu'},
    ],
    iconName: 'Sprout',
    source: VERIFIED_SOURCE_2026(
      17,
      'Page 17 (Section 1.2)',
      'While agriculture slightly recovered from the weather-related shocks of 2024, overall growth remains below potential...'
    ),
  },
  {
    id: 'card26-eg-4',
    topicId: 'mem26-economic-growth',
    reportId: 'mem-sept-2026',
    stepNumber: 4,
    heading: {
      en: 'Forex Shortages Slow Factories',
      ny: 'Kusowa Madola Kumaletsa Mafakitale',
    },
    oneLineSummary: {
      en: 'US dollar shortages prevent factories from buying raw materials and spare parts.',
      ny: 'Kusowa kwa madola kumaletsa mafakitale kugula zopangira katundu ndi masipeya.',
    },
    direction: 'down',
    directionLabel: {en: 'Industry Constrained', ny: 'Mafakitale Avutika'},
    plainExplanation: {
      en: 'Exchange-rate distortions block critical imports and keep local machines idle.',
      ny: 'Mavuto a ndalama zakunja amachedwetsa katundu wakunja ndi kufooketsa mafakitale.',
    },
    whyItHappens: {
      en: 'Low official reserves and rate controls stop firms from buying foreign supplies smoothly.',
      ny: 'Madola ochepa m’mabanki amalepheretsa makampani kuitanitsa zofunikira.',
    },
    everydayImpact: {
      en: 'Local factories make fewer goods, face higher costs, and hire fewer workers.',
      ny: 'Mafakitale amapanga katundu wochepa ndi kulemba antchito ochepa.',
    },
    relatedFactors: [
      {en: 'Exchange Rates', ny: 'Ndalama Zakunja'},
      {en: 'Trade & Imports', ny: 'Malonda & Katundu Wakunja'},
    ],
    iconName: 'Ship',
    source: VERIFIED_SOURCE_2026(
      17,
      'Page 17 (Section 1.2)',
      'Industrial sector performance remains constrained by foreign-exchange distortions, which impede the import of critical inputs and limit productive capacity.'
    ),
  },
  {
    id: 'card26-eg-5',
    topicId: 'mem26-economic-growth',
    reportId: 'mem-sept-2026',
    stepNumber: 5,
    heading: {
      en: 'Power & Rule Gaps Hurt Firms',
      ny: 'Magetsi & Malamulo Zikuvutitsa Mabizinesi',
    },
    oneLineSummary: {
      en: 'Power cuts, scarce credit, and shifting rules keep recovery fragile.',
      ny: 'Kuzimazima magetsi, kusowa ngongole, ndi malamulo osakhazikika zikufooketsa chuma.',
    },
    direction: 'down',
    directionLabel: {en: 'Bottlenecks Persist', ny: 'Zopinga Zikupitilira'},
    plainExplanation: {
      en: 'Page 17 flags four hurdles: power outages, forex limits, scarce credit, and changing rules.',
      ny: 'Tsamba 17 likutchula zopinga zinayi: magetsi, madola, ngongole, ndi malamulo osakhazikika.',
    },
    whyItHappens: {
      en: 'Weak power grids, heavy state borrowing, and policy uncertainty discourage investment.',
      ny: 'Kufooka kwa magetsi ndi ngongole za boma zimachititsa mabizinesi kuopa kukula.',
    },
    everydayImpact: {
      en: 'Millers and shops spend extra on diesel generators and struggle for affordable loans.',
      ny: 'Zigayo ndi masitolo amawononga ndalama pa dizilo ndipo amasowa ngongole zabwino.',
    },
    relatedFactors: [
      {en: 'Public Debt', ny: 'Ngongole za Boma'},
      {en: 'Exchange Rates', ny: 'Ndalama Zakunja'},
    ],
    iconName: 'ShieldCheck',
    source: VERIFIED_SOURCE_2026(
      17,
      'Page 17 (Section 1.2)',
      'Malawi’s economic recovery is fragile, amid persistent macroeconomic imbalances, limited access to finance, and policy-related distortions such as foreign-exchange shortages... Structural bottlenecks—particularly in energy supply, access to foreign exchange, and regulatory uncertainty—continue to weigh on private sector activity.'
    ),
  },
  {
    id: 'card26-eg-6',
    topicId: 'mem26-economic-growth',
    reportId: 'mem-sept-2026',
    stepNumber: 6,
    heading: {
      en: 'Incomes Lag Nearby Countries',
      ny: 'Malawi Ikutsala Mmbuyo pa Anansi',
    },
    oneLineSummary: {
      en: 'Malawi’s 2.7% forecast trails neighbors, leaving income per person below 2022.',
      ny: 'Kukula kwa 2.7% kuli pansi pa anansi, ndipo phindu la munthu latsika kuyambira 2022.',
    },
    direction: 'down',
    directionLabel: {en: 'Lags Regional Peers', ny: 'Pansi pa Mayiko Ena'},
    plainExplanation: {
      en: 'Malawi trails Zambia, Mozambique, and Rwanda while per-person income keeps slipping.',
      ny: 'Malawi ikutsala poyerekeza ndi Zambia, Mozambique, ndi Rwanda.',
    },
    whyItHappens: {
      en: 'High inflation, energy limits, and policy gaps slowed Malawi while peers grew faster.',
      ny: 'Kukwera kwa mitengo ndi mavuto a magetsi zinabwezera Malawi mmbuyo.',
    },
    everydayImpact: {
      en: 'Without fixing power and forex access, family living standards cannot steadily rise.',
      ny: 'Popanda kukonza magetsi ndi madola, moyo wa mabanja sungakwere kwenikweni.',
    },
    relatedFactors: [
      {en: 'Inflation & Prices', ny: 'Mitengo ya Katundu'},
      {en: 'Jobs & Employment', ny: 'Ntchito & Ganyu'},
    ],
    iconName: 'Scale',
    source: VERIFIED_SOURCE_2026(
      17,
      'Page 17 (Section 1.2 & Figure 1.6)',
      'Malawi’s modest projected growth rate will lag most regional peers, weighed down by the lingering effects of pandemic-era disruptions, structural weaknesses, and policy shortcomings... overall growth remains below potential and insufficient to meaningfully raise per-capita incomes, which have been declining since 2022.'
    ),
  },

  // =========================================================================
  // SEPTEMBER 2026 — OTHER 7 TOPICS (VERIFIED HIGHLIGHTS FROM REPORT)
  // =========================================================================
  {
    id: 'card26-inf-1',
    topicId: 'mem26-inflation',
    reportId: 'mem-sept-2026',
    stepNumber: 1,
    heading: {
      en: 'Headline Inflation Fell to 21.1%',
      ny: 'Mitengo Yonse Inatsika kufika 21.1%',
    },
    oneLineSummary: {
      en: 'Overall price rises slowed from 28.4% in 2025 as new maize lowered grain costs.',
      ny: 'Kukwera kwa mitengo kunatsika kuchokera 28.4% mu 2025 pamene chimanga chinatsika.',
    },
    direction: 'down',
    directionLabel: {en: '21.1% rate', ny: '21.1% mlingo'},
    plainExplanation: {
      en: 'Better 2025/26 maize harvests and tighter money growth cooled food price jumps.',
      ny: 'Zokolola zabwino za chimanga ndi kuchepetsa kusindikiza ndalama zinatsitsa mitengo.',
    },
    whyItHappens: {
      en: 'Food dominates family spending (~54% maize share), so cheaper grain pulls inflation down.',
      ny: 'Chakudya chimatenga gawo lalikulu la ndalama, choncho chimanga chikatsika mitengo yonse imatsika.',
    },
    everydayImpact: {
      en: 'Maize cost less in early 2026, though fuel and power bills still jumped 32.1%.',
      ny: 'Chimanga chinatsika mtengo, koma mafuta ndi magetsi zinakwera ndi 32.1%.',
    },
    relatedFactors: [{en: 'Agriculture', ny: 'Ulimi'}],
    iconName: 'ShoppingBasket',
    source: VERIFIED_SOURCE_2026(
      27,
      'Page 20 & Page 27',
      'Headline inflation declined to 21.1 percent in June 2026 from an average of 28.4 percent in 2025 (Figure 1.22), supported by moderating money-supply growth, and improved food availability as the new harvest season took hold.'
    ),
  },
  {
    id: 'card26-inf-2',
    topicId: 'mem26-inflation',
    reportId: 'mem-sept-2026',
    stepNumber: 2,
    heading: {
      en: 'Non-Food Costs Surged 32.1%',
      ny: 'Zinthu Zosakhala Chakudya Zakwera 32.1%',
    },
    oneLineSummary: {
      en: 'A 108% April fuel hike and 12% power tariff lift drove non-food prices sharply up.',
      ny: 'Kukwera kwa mafuta (108%) ndi magetsi (12%) kunakweza mitengo ina kufika 32.1%.',
    },
    direction: 'up',
    directionLabel: {en: 'Non-Food Up 32.1%', ny: 'Zina Zakwera 32.1%'},
    plainExplanation: {
      en: 'Even as grain cooled, energy and transport costs climbed far faster than in 2025.',
      ny: 'Ngakhale chimanga chatsika, mtengo wa magetsi ndi mayendedwe unakwera kwambiri.',
    },
    whyItHappens: {
      en: 'Global oil tensions and delayed pump and power tariff updates pushed energy bills up.',
      ny: 'Nkhondo za kunja ndi kukonza mitengo ya mafuta ndi magetsi zinakweza mabilu.',
    },
    everydayImpact: {
      en: 'Minibus fares, electricity tokens, and daily household goods stayed expensive.',
      ny: 'Matikiti a minibasi, magetsi, ndi katundu wa m’nyumba zinadula kwambiri.',
    },
    relatedFactors: [
      {en: 'Exchange Rates', ny: 'Ndalama Zakunja'},
      {en: 'Trade & Imports', ny: 'Malonda & Katundu Wakunja'},
    ],
    iconName: 'TrendingUp',
    source: VERIFIED_SOURCE_2026(
      27,
      'Pages 27–28',
      'However, non-food inflation continued to accelerate, reaching 32.1 percent in June 2026—well above the 2025 average of 20.6 percent... pushed up fuel prices at the pump by 108 percent in April... included a 12 percent increase in electricity tariffs.'
    ),
  },
  {
    id: 'card26-debt-1',
    topicId: 'mem26-public-debt',
    reportId: 'mem-sept-2026',
    stepNumber: 1,
    heading: {
      en: 'Debt Reached 98% of Economy',
      ny: 'Ngongole Zinafika 98% ya Chuma',
    },
    oneLineSummary: {
      en: 'Public debt hit 98.0% of GDP in 2025 — back near pre-2006 debt-relief levels.',
      ny: 'Ngongole za boma zinafika 98.0% ya chuma mu 2025 — pafupi ndi mlingo wa 2006.',
    },
    direction: 'up',
    directionLabel: {en: '98.0% debt', ny: '98.0% ngongole'},
    plainExplanation: {
      en: 'Years of budget deficits and costly local bank loans nearly doubled debt relative to GDP.',
      ny: 'Kubwereka kwambiri m’mabanki a m’dziko kunakweza ngongole kufika 98.0% ya chuma.',
    },
    whyItHappens: {
      en: 'With foreign loans scarce, government borrowed heavily from local banks at steep rates.',
      ny: 'Ndalama zakunja zitachepa, boma linabwereka kwambiri m’mabanki pa chiwongoladzanja chokwera.',
    },
    everydayImpact: {
      en: 'Interest payments take nearly 50% of taxes first, squeezing clinics and classrooms.',
      ny: 'Chiwongoladzanja chimatenga pafupifupi 50% ya misonkho zisanafike ku zipatala.',
    },
    relatedFactors: [{en: 'Gov. Spending', ny: 'Ndalama za Boma'}],
    iconName: 'Landmark',
    source: VERIFIED_SOURCE_2026(
      23,
      'Page 23 & Table 1.3 (p. 33)',
      'The public debt reached 98.0 percent of GDP in 2025, a level comparable to that reached before Malawi reached the Heavily Indebted Poor Countries (HIPC) completion point in 2006... interest payments represent the single largest expenditure line in the national budget, absorbing nearly 50 percent of domestic revenue in FY2025/26.'
    ),
  },
  {
    id: 'card26-debt-2',
    topicId: 'mem26-public-debt',
    reportId: 'mem-sept-2026',
    stepNumber: 2,
    heading: {
      en: 'Local Borrowing Eased in 2026',
      ny: 'Kubwereka M’dziko Kunachepa 2026',
    },
    oneLineSummary: {
      en: 'Government pulled back at local debt auctions, starting to lower loan yields.',
      ny: 'Boma lachepetsa kubwereka m’mabanki, zomwe zikutsitsa chiwongoladzanja.',
    },
    direction: 'down',
    directionLabel: {en: 'New Borrowing Slowing', ny: 'Ngongole Zatsopano Zachepa'},
    plainExplanation: {
      en: 'Smaller domestic borrowing slowed local debt growth in early 2026.',
      ny: 'Kusamala pobwereka kunachepetsa kukula kwa ngongole kumayambiriro kwa 2026.',
    },
    whyItHappens: {
      en: 'Budget restraint and stretching loan maturities help ease cash pressure.',
      ny: 'Kutsatira bajeti ndi kukonzanso nthawi yobweza kumapatsa boma mpumulo.',
    },
    everydayImpact: {
      en: 'Continued restraint frees up bank credit for private businesses over time.',
      ny: 'Kupitiliza kutero kungathandize mabizinesi kupeza ngongole ku mabanki.',
    },
    relatedFactors: [
      {en: 'Economic Growth', ny: 'Kukula kwa Chuma'},
      {en: 'Gov. Spending', ny: 'Ndalama za Boma'},
    ],
    iconName: 'Scale',
    source: VERIFIED_SOURCE_2026(
      23,
      'Page 23',
      'Recent preliminary data points to a slowdown in the pace of growth of domestic debt in the first half of 2026 (Figure 1.15), reflecting a discernible pullback in borrowing (Figure 1.16) consistent with the government’s fiscal consolidation efforts.'
    ),
  },
  {
    id: 'card26-trd-1',
    topicId: 'mem26-trade-and-imports',
    reportId: 'mem-sept-2026',
    stepNumber: 1,
    heading: {
      en: 'Imports Far Exceed Exports',
      ny: 'Zogula Kunja Zikuposa Zogulitsa',
    },
    oneLineSummary: {
      en: 'Imports hit US$3.7B in 2025 against ~US$1B in exports — a US$2.7B deficit.',
      ny: 'Malawi anagula katundu wa US$3.7B kunja pamene anagulitsa ~US$1B — kusiyana kwa US$2.7B.',
    },
    direction: 'down',
    directionLabel: {en: 'US$2.7B gap', ny: 'Kusiyana US$2.7B'},
    plainExplanation: {
      en: 'Fuel (~20% of imports) and fertilizer cost far more than tobacco (~40% of exports) earns.',
      ny: 'Mafuta (~20%) ndi feteleza zimadula kuposa zomwe fodya (~40%) amabweretsa.',
    },
    whyItHappens: {
      en: 'Exports rely on a few seasonal crops while trade rules hold back new sellers.',
      ny: 'Zogulitsa kunja zimadalira mbewu zochepa ndipo ziletso zimachedwetsa malonda.',
    },
    everydayImpact: {
      en: 'The US$2.7B gap drains US dollars, delaying fuel, fertilizer, and shop supplies.',
      ny: 'Kusiyana kwa US$2.7B kumathetsa madola ndikuchedwetsa mafuta ndi feteleza.',
    },
    relatedFactors: [
      {en: 'Exchange Rates', ny: 'Ndalama Zakunja'},
      {en: 'Agriculture', ny: 'Ulimi'},
    ],
    iconName: 'Ship',
    source: VERIFIED_SOURCE_2026(
      25,
      'Page 25',
      'The country’s annual trade deficit has nearly tripled in nominal terms since 2010, widening from approximately US$1.1 billion (10.9 percent of GDP) that year to around US$2.7 billion (18.1 percent of GDP) in 2025.'
    ),
  },
  {
    id: 'card26-job-1',
    topicId: 'mem26-employment',
    reportId: 'mem-sept-2026',
    stepNumber: 1,
    heading: {
      en: 'High Literacy, Few Steady Jobs',
      ny: 'Maphunziro Akukwera, Ntchito Zochepa',
    },
    oneLineSummary: {
      en: 'Almost 90% of youth can read, yet under 4% hold regular salaried work.',
      ny: 'Pafupifupi 90% ya achinyamata amawerenga, koma ochepera 4% ali ndi ntchito zokhazikika.',
    },
    direction: 'down',
    directionLabel: {en: '27.6% ganyu', ny: '27.6% ganyu'},
    plainExplanation: {
      en: 'Adult literacy reached 79%, yet young people doing casual ganyu jumped to 27.6%.',
      ny: 'Akulu odziwa kuwerenga anafika 79%, koma achinyamata ogwira ganyu anakwera kufika 27.6%.',
    },
    whyItHappens: {
      en: 'Slow private-sector growth leaves companies unable to hire skilled graduates.',
      ny: 'Kukula pang’ono kwa mabizinesi kumaletsa kulemba achinyamata omaliza sukulu.',
    },
    everydayImpact: {
      en: 'Relying on ganyu pushed people unable to afford daily food up to 24.0%.',
      ny: 'Kudalira ganyu kunakweza anthu osowa chakudya chokwanira kufika 24.0%.',
    },
    relatedFactors: [{en: 'Economic Growth', ny: 'Kukula kwa Chuma'}],
    iconName: 'Briefcase',
    source: VERIFIED_SOURCE_2026(
      18,
      'Page 18 (Box 1.1)',
      'Formal wage employment remains rare, only encompassing around 12 percent of prime-age adults—those aged 25–54, and less than 4 percent of young people—those aged 15–24... the share classified as working in ganyu (casual labor) increased... from 21.3 to 27.6 percent among youth.'
    ),
  },
  {
    id: 'card26-agr-1',
    topicId: 'mem26-agriculture',
    reportId: 'mem-sept-2026',
    stepNumber: 1,
    heading: {
      en: 'Maize Harvest Grew 15%',
      ny: 'Chimanga Chinakwera ndi 15%',
    },
    oneLineSummary: {
      en: 'Maize reached ~3.3M tons (shy of ~3.5M needed), easing local grain prices.',
      ny: 'Chimanga chinafika 3.3M matani (pansi pa 3.5M ofunika), kutsitsa mitengo m’misika.',
    },
    direction: 'up',
    directionLabel: {en: '+15% maize', ny: '+15% chimanga'},
    plainExplanation: {
      en: 'Harvests rose after two poor years, yet 1.9 million people still face food shortages.',
      ny: 'Zokolola zakwera, koma anthu 1.9 miliyoni akadali ndi vuto la chakudya.',
    },
    whyItHappens: {
      en: 'Better seasonal rains helped crops, though dry-spell risks and costly fertilizer persist.',
      ny: 'Mvula yabwino inathandiza, koma kuopa chilala ndi feteleza wodula zikupitilira.',
    },
    everydayImpact: {
      en: 'Cheaper maize helps food budgets, while tobacco revenue dropped 38.7% (US$2.02/kg).',
      ny: 'Chimanga chotsika mtengo chathandiza mabanja, pamene ndalama za fodya zinatsika 38.7%.',
    },
    relatedFactors: [
      {en: 'Inflation & Prices', ny: 'Mitengo ya Katundu'},
      {en: 'Trade & Imports', ny: 'Malonda & Katundu Wakunja'},
    ],
    iconName: 'Sprout',
    source: VERIFIED_SOURCE_2026(
      19,
      'Pages 19–20',
      'Maize production is estimated to have increased by approximately 15 percent, from 2.8 million metric tons in 2024/25 to around 3.3 million metric tons... Fourteen weeks into the tobacco marketing season... sales had yielded US$233.32 million... a decline of 38.7 percent in revenue.'
    ),
  },
  {
    id: 'card26-fx-1',
    topicId: 'mem26-exchange-rates',
    reportId: 'mem-sept-2026',
    stepNumber: 1,
    heading: {
      en: 'Banks Hold ~9 Days of Dollars',
      ny: 'Mabanki Ali ndi Madola a Masiku 9',
    },
    oneLineSummary: {
      en: 'Street US dollar rates sit ~130% above bank rates while factories lack supplies.',
      ny: 'Dola m’misewu ikukwera ~130% kuposa ku banki pamene mafakitale akusowa katundu.',
    },
    direction: 'down',
    directionLabel: {en: '0.3 mos USD', ny: 'Miyezi 0.3 USD'},
    plainExplanation: {
      en: 'Holding official bank rates fixed drives dollar trading onto the street and stalls factories.',
      ny: 'Kuumirira mtengo umodzi ku banki kumathamangitsira madola m’misewu.',
    },
    whyItHappens: {
      en: 'Weak tobacco inflows, money growth, and surrender rules shrink bank US dollar supply.',
      ny: 'Ndalama zochepa za fodya ndi malamulo okakamiza kusintha madola ku banki zimachepetsa madola.',
    },
    everydayImpact: {
      en: 'Over half of surveyed businesses ran below half-speed due to scarce US dollars.',
      ny: 'Mabizinesi opitilira theka akugwira ntchito pansi pa 50% chifukwa chosowa madola.',
    },
    relatedFactors: [
      {en: 'Economic Growth', ny: 'Kukula kwa Chuma'},
      {en: 'Trade & Imports', ny: 'Malonda & Katundu Wakunja'},
    ],
    iconName: 'ArrowLeftRight',
    source: VERIFIED_SOURCE_2026(
      25,
      'Pages 17–18 & Pages 25–26',
      'Official reserves sit below one month’s worth of import cover, and well below the country’s adequacy target of three months... The parallel market premium over official rate has narrowed from a peak of 150 percent in early 2025 to approximately 130 percent as of June 2026.'
    ),
  },
  {
    id: 'card26-gov-1',
    topicId: 'mem26-government-spending',
    reportId: 'mem-sept-2026',
    stepNumber: 1,
    heading: {
      en: 'Spending Kept Inside 8.8% Limit',
      ny: 'Boma Linatsata Bajeti pa 8.8%',
    },
    oneLineSummary: {
      en: 'VAT rose to 17.5% and spending stayed inside Parliament’s limit for the first time in 5 years.',
      ny: 'VAT inafika 17.5% ndipo boma linatsata bajeti yake kwa nthawi yoyamba m’zaka 5.',
    },
    direction: 'down',
    directionLabel: {en: '8.8% gap', ny: 'Kusiyana 8.8%'},
    plainExplanation: {
      en: 'Digital tax collection and spending limits narrowed the gap between revenue and outlays.',
      ny: 'Kutolera misonkho ndi kutsata malire a bajeti zinachepetsa kuperewera kwa ndalama.',
    },
    whyItHappens: {
      en: 'Electronic tax receipts and sticking to approved spending strengthened budget discipline.',
      ny: 'Makina a misonkho ndi kusamala ndalama zinathandiza bajeti.',
    },
    everydayImpact: {
      en: 'Shoppers pay 17.5% VAT while road building waits as interest takes nearly half of taxes.',
      ny: 'Ogula amalipira 17.5% VAT pamene misewu ikudikira chifukwa chobweza ngongole.',
    },
    relatedFactors: [{en: 'Public Debt', ny: 'Ngongole za Boma'}],
    iconName: 'Wallet',
    source: VERIFIED_SOURCE_2026(
      21,
      'Page 8 & Page 21',
      'The overall budget deficit (including Reserve Bank of Malawi (RBM) operations) stood at 8.8 percent of GDP in FY2025/26, narrowing by 1.7 percentage points relative to FY2024/25. For the first time in more than five years, budget execution remained within the envelope approved by parliament.'
    ),
  },

  // =========================================================================
  // EARLIER SAMPLE EDITIONS (2024 & 2023 SAMPLE CARDS)
  // =========================================================================
  {
    id: 'card-eg-1',
    topicId: 'mem24-economic-growth',
    reportId: 'mem-2024-sample',
    stepNumber: 1,
    heading: {en: 'Weather Shocks Hit Harvests', ny: 'Chilala & Nyengo Zikukhudza Zokolola'},
    oneLineSummary: {
      en: 'Dry spells and uneven rains quickly cut rural farm output.',
      ny: 'Chilala ndi mvula yosakwanira zimachepetsa zokolola m’midzi.',
    },
    direction: 'down',
    directionLabel: {en: 'Farm Output Down', ny: 'Zokolola Zatsika'},
    plainExplanation: {
      en: 'Because farming drives Malawi’s economy, weak rains pull total output down fast.',
      ny: 'Popeza ulimi ndi maziko a chuma, mvula ikachepa chuma chonse chimachepa.',
    },
    whyItHappens: {
      en: 'Most family plots rely directly on seasonal rain instead of irrigation.',
      ny: 'Minda yambiri imadalira mvula osati ulimi wa mthilira.',
    },
    everydayImpact: {
      en: 'Rural families harvest fewer maize bags and earn less from market sales.',
      ny: 'Mabanja amakolola matumba ochepa a chimanga ndi kugulitsa zochepa.',
    },
    relatedFactors: [
      {en: 'Agriculture', ny: 'Ulimi'},
      {en: 'Food Prices', ny: 'Mitengo ya Chakudya'},
    ],
    iconName: 'Sprout',
    source: SAMPLE_SOURCE_2024(
      'Illustrative explanation of rain-fed agricultural volatility impacting national GDP growth.',
      'direct_report'
    ),
  },
  {
    id: 'card-eg-2',
    topicId: 'mem24-economic-growth',
    reportId: 'mem-2024-sample',
    stepNumber: 2,
    heading: {en: 'Power & Input Bottlenecks', ny: 'Zopinga za Magetsi & Zofunikira'},
    oneLineSummary: {
      en: 'Costly fuel, fertilizer, and power cuts raise production bills.',
      ny: 'Mafuta, feteleza, ndi kuthima magetsi zimakweza ndalama zopangira katundu.',
    },
    direction: 'up',
    directionLabel: {en: 'Business Costs Up', ny: 'Mtengo wa Bizinesi Wakwera'},
    plainExplanation: {
      en: 'Factories and grain mills face delays and higher costs when power or fuel runs short.',
      ny: 'Mafakitale ndi zigayo amachedwa ngati magetsi kapena mafuta akusowa.',
    },
    whyItHappens: {
      en: 'Scarce foreign dollars delay shipments of fuel and factory spare parts.',
      ny: 'Kusowa kwa madola kumachedwetsa kuitanitsa mafuta ndi masipeya.',
    },
    everydayImpact: {
      en: 'Local shops pass extra transport and generator costs onto daily goods.',
      ny: 'Masitolo amakweza mitengo kuti akwanitse ndalama za mayendedwe ndi dizilo.',
    },
    relatedFactors: [
      {en: 'Exchange Rates', ny: 'Ndalama Zakunja'},
      {en: 'Trade & Imports', ny: 'Malonda & Katundu Wakunja'},
    ],
    iconName: 'TrendingUp',
    source: SAMPLE_SOURCE_2024(
      'Illustrative link between foreign exchange constraints, energy reliability, and industrial production.'
    ),
  },
  {
    id: 'card-inf-1',
    topicId: 'mem24-inflation',
    reportId: 'mem-2024-sample',
    stepNumber: 1,
    heading: {en: 'Food Supply Tightens', ny: 'Chakudya Chikuchepa'},
    oneLineSummary: {
      en: 'Smaller maize harvests push staple food prices upward first.',
      ny: 'Zokolola zochepa za chimanga zimakweza mitengo ya chakudya choyambirira.',
    },
    direction: 'up',
    directionLabel: {en: 'Food Prices Up', ny: 'Chakudya Chakwera'},
    plainExplanation: {
      en: 'Food takes over half of family budgets, so grain costs drive overall inflation.',
      ny: 'Chakudya chimatenga theka la ndalama za banja, choncho chimanga chikadula zonse zimakwera.',
    },
    whyItHappens: {
      en: 'Smaller harvests and costly fertilizer reduce maize supply at local markets.',
      ny: 'Zokolola zochepa ndi feteleza wodula zimachepetsa chimanga m’misika.',
    },
    everydayImpact: {
      en: 'Families spend far more of their weekly pay just on maize flour and relish.',
      ny: 'Mabanja amawononga ndalama zambiri pogula ufa ndi ndiwo.',
    },
    relatedFactors: [
      {en: 'Agriculture', ny: 'Ulimi'},
      {en: 'Economic Growth', ny: 'Kukula kwa Chuma'},
    ],
    iconName: 'ShoppingBasket',
    source: SAMPLE_SOURCE_2024(
      'Illustrative explanation of food price weight in consumer inflation.',
      'direct_report'
    ),
  },
  {
    id: 'card-debt-1',
    topicId: 'mem24-public-debt',
    reportId: 'mem-2024-sample',
    stepNumber: 1,
    heading: {en: 'Spending Exceeds Taxes', ny: 'Zogwiritsira Zikuposa Misonkho'},
    oneLineSummary: {
      en: 'Government borrows when tax revenue cannot cover planned spending.',
      ny: 'Boma limabwereka ndalama kuti likwanitse zosowa zomwe misonkho sikukwanira.',
    },
    direction: 'up',
    directionLabel: {en: 'Borrowing Up', ny: 'Kubwereka Kwakwera'},
    plainExplanation: {
      en: 'When taxes fall short, treasury issues bonds and bills to local banks.',
      ny: 'Misonkho ikachepa, boma limabwereka ndalama kuchokera ku mabanki.',
    },
    whyItHappens: {
      en: 'Slow business activity caps taxes while emergency needs lift spending.',
      ny: 'Mabizinesi akachedwa, misonkho imachepa pamene zosowa zikukwera.',
    },
    everydayImpact: {
      en: 'Debt builds over time, shifting today’s borrowing costs into future budgets.',
      ny: 'Ngongole zimachuluka chaka ndi chaka ndi kulemetsa bajeti yamtsogolo.',
    },
    relatedFactors: [
      {en: 'Gov. Spending', ny: 'Ndalama za Boma'},
      {en: 'Economic Growth', ny: 'Kukula kwa Chuma'},
    ],
    iconName: 'Landmark',
    source: SAMPLE_SOURCE_2024(
      'Illustrative explanation of fiscal deficits driving public debt accumulation.',
      'direct_report'
    ),
  },
  {
    id: 'card-trd-1',
    topicId: 'mem24-trade-and-imports',
    reportId: 'mem-2024-sample',
    stepNumber: 1,
    heading: {en: 'Imports Outpace Exports', ny: 'Zogula Kunja Zikuposa Zogulitsa'},
    oneLineSummary: {
      en: 'Malawi buys far more goods abroad than it sells to other countries.',
      ny: 'Malawi amagula katundu wochuluka kunja kuposa yemwe amagulitsa.',
    },
    direction: 'down',
    directionLabel: {en: 'Trade Balance Negative', ny: 'Malonda Akutsika'},
    plainExplanation: {
      en: 'Fuel, fertilizer, machines, and medicines cost more than export sales earn.',
      ny: 'Mafuta, feteleza, makina, ndi mankhwala zimawononga kuposa malonda akunja.',
    },
    whyItHappens: {
      en: 'Exports rely on a few seasonal crops like tobacco, tea, and sugar.',
      ny: 'Zogulitsa kunja zimadalira mbewu zochepa monga fodya, tiyi, ndi shuga.',
    },
    everydayImpact: {
      en: 'Low export earnings cause fuel queues and delays for imported stock.',
      ny: 'Madola akachepa, pamakhala mizere ya mafuta ndi kuchedwa kwa katundu.',
    },
    relatedFactors: [
      {en: 'Exchange Rates', ny: 'Ndalama Zakunja'},
      {en: 'Agriculture', ny: 'Ulimi'},
    ],
    iconName: 'Ship',
    source: SAMPLE_SOURCE_2024(
      'Illustrative explanation of persistent merchandise trade deficits.',
      'direct_report'
    ),
  },
  {
    id: 'card-job-1',
    topicId: 'mem24-employment',
    reportId: 'mem-2024-sample',
    stepNumber: 1,
    heading: {en: 'Most Work Is Informal', ny: 'Ntchito Zambiri N’zosakhazikika'},
    oneLineSummary: {
      en: 'Most workers earn livelihoods through small-scale farming or daily trading.',
      ny: 'Anthu ambiri amapeza ndalama kudzera mu ulimi kapena malonda ang’onoang’ono.',
    },
    direction: 'neutral',
    directionLabel: {en: 'Informal Majority', ny: 'Ganyu & Malonda'},
    plainExplanation: {
      en: 'Steady salaried jobs are rare, so most people create daily work themselves.',
      ny: 'Ntchito zamalipiro okhazikika n’zochepa, choncho ambiri amadzipangira ntchito.',
    },
    whyItHappens: {
      en: 'Factories and formal services expand slowly when power and loans are tight.',
      ny: 'Mafakitale amakula pang’ono ngati magetsi ndi ngongole zili zovuta.',
    },
    everydayImpact: {
      en: 'Daily take-home pay rises and falls with harvests and market foot traffic.',
      ny: 'Malipiro a tsiku ndi tsiku amasintha kutengera msika ndi zokolola.',
    },
    relatedFactors: [
      {en: 'Agriculture', ny: 'Ulimi'},
      {en: 'Economic Growth', ny: 'Kukula kwa Chuma'},
    ],
    iconName: 'Briefcase',
    source: SAMPLE_SOURCE_2024(
      'Illustrative summary of labor market structure and informal livelihoods.',
      'direct_report'
    ),
  },
  {
    id: 'card-agr-1',
    topicId: 'mem24-agriculture',
    reportId: 'mem-2024-sample',
    stepNumber: 1,
    heading: {en: 'Smallholder Farms Lead', ny: 'Alimi Aang’ono Ndi Ambiri'},
    oneLineSummary: {
      en: 'Most food grows on small family plots dependent on seasonal rains.',
      ny: 'Chakudya chambiri chimalimidwa m’minda yaing’ono yodalira mvula.',
    },
    direction: 'neutral',
    directionLabel: {en: 'Rain-Fed Core', ny: 'Kudalira Mvula'},
    plainExplanation: {
      en: 'Small family farms grow maize, beans, and cash crops that feed rural and urban homes.',
      ny: 'Alimi aang’ono amapanga chimanga, nyemba, ndi mbewu zogulitsa kunja.',
    },
    whyItHappens: {
      en: 'Limited irrigation leaves harvests vulnerable to dry spells and floods.',
      ny: 'Kusowa kwa mthilira kumasiya zokolola pangozi ya chilala ndi madzi osefukira.',
    },
    everydayImpact: {
      en: 'Good rainy seasons steady both rural incomes and town food prices.',
      ny: 'Mvula yabwino imathandiza alimi komanso kutsitsa mitengo m’tauni.',
    },
    relatedFactors: [
      {en: 'Economic Growth', ny: 'Kukula kwa Chuma'},
      {en: 'Inflation & Prices', ny: 'Mitengo ya Katundu'},
    ],
    iconName: 'Sprout',
    source: SAMPLE_SOURCE_2024(
      'Illustrative summary of smallholder agriculture’s role in the Malawian economy.',
      'direct_report'
    ),
  },
  {
    id: 'card-fx-1',
    topicId: 'mem24-exchange-rates',
    reportId: 'mem-2024-sample',
    stepNumber: 1,
    heading: {en: 'Foreign Currency Supply Is Tight', ny: 'Ndalama Zakunja N’zochepa'},
    oneLineSummary: {
      en: 'Import demand for US dollars exceeds what exports bring into banks.',
      ny: 'Kufunika kwa madola pogula katundu kukuposa madola obwera.',
    },
    direction: 'down',
    directionLabel: {en: 'Forex Supply Tight', ny: 'Madola Achepa'},
    plainExplanation: {
      en: 'Outside tobacco season, far fewer US dollars flow into local banks.',
      ny: 'Msika wa fodya ukatha, madola ochepa amalowa m’mabanki.',
    },
    whyItHappens: {
      en: 'Fuel and fertilizer bills require foreign currency every single month.',
      ny: 'Kugula mafuta ndi feteleza kumafuna madola mwezi uliwonse.',
    },
    everydayImpact: {
      en: 'Businesses wait longer for bank dollars to pay overseas suppliers.',
      ny: 'Mabizinesi amadikira nthawi yayitali kuti alandire madola ku banki.',
    },
    relatedFactors: [{en: 'Trade & Imports', ny: 'Malonda & Katundu Wakunja'}],
    iconName: 'ArrowLeftRight',
    source: SAMPLE_SOURCE_2024(
      'Illustrative summary of seasonal foreign-exchange supply mismatches.',
      'direct_report'
    ),
  },
  {
    id: 'card-gov-1',
    topicId: 'mem24-government-spending',
    reportId: 'mem-2024-sample',
    stepNumber: 1,
    heading: {en: 'Fixed Bills Come First', ny: 'Zofunika Zokhazikika Ziyamba'},
    oneLineSummary: {
      en: 'Salaries and loan interest claim most annual tax collections first.',
      ny: 'Malipiro a antchito ndi chiwongoladzanja zimatenga misonkho yambiri.',
    },
    direction: 'up',
    directionLabel: {en: 'Recurrent Costs Up', ny: 'Zofunika Zakwera'},
    plainExplanation: {
      en: 'After wages and interest are paid, less remains for roads or schools.',
      ny: 'Malipiro ndi ngongole zikalipidwa, ndalama za misewu ndi masukulu zimachepa.',
    },
    whyItHappens: {
      en: 'Rising debt interest and operating bills leave little room for new projects.',
      ny: 'Kubweza ngongole ndi ndalama za tsiku ndi tsiku zimachepetsa bajeti.',
    },
    everydayImpact: {
      en: 'New roads and clinics often face delays or rely on donor grants.',
      ny: 'Ntchito zatsopano za chitukuko zingachedwe kapena kudalira thandizo.',
    },
    relatedFactors: [{en: 'Public Debt', ny: 'Ngongole za Boma'}],
    iconName: 'Wallet',
    source: SAMPLE_SOURCE_2024(
      'Illustrative summary of recurrent versus development budget pressures.',
      'direct_report'
    ),
  },
  {
    id: 'card-2023-eg-1',
    topicId: 'mem23-economic-growth',
    reportId: 'mem-2023-sample',
    stepNumber: 1,
    heading: {en: 'Cyclone & Power Recovery', ny: 'Kubwerera Pambuyo pa Mphepo & Magetsi'},
    oneLineSummary: {
      en: 'Rebuilding damaged roads and power plants shaped 2023 output.',
      ny: 'Kumanganso misewu ndi kukonza magetsi zinasintha chuma mu 2023.',
    },
    direction: 'up',
    directionLabel: {en: 'Gradual Rebound', ny: 'Kubwerera Pang’ono'},
    plainExplanation: {
      en: 'Fixing hydroelectric dams helped shops and workshops stay open longer.',
      ny: 'Kukonza magetsi a madzi kunathandiza mabizinesi kugwira ntchito nthawi yaitali.',
    },
    whyItHappens: {
      en: 'Tropical storms damaged power equipment and main transport routes.',
      ny: 'Mphepo zamkuntho zinawononga zida za magetsi ndi misewu.',
    },
    everydayImpact: {
      en: 'Fewer blackouts helped grain mills, welders, and small shops serve customers.',
      ny: 'Kuchepa kwa kuzimazima kwa magetsi kunathandiza zigayo ndi masitolo.',
    },
    relatedFactors: [{en: 'Agriculture', ny: 'Ulimi'}],
    iconName: 'TrendingUp',
    source: SAMPLE_SOURCE_2023('Illustrative 2023 recovery summary.'),
  },
];

export const CHAIN_SEQUENCES: ChainSequence[] = [
  // September 2026 — Page 17 Growth Chain
  {
    id: 'chain-growth-2026',
    topicId: 'mem26-economic-growth',
    reportId: 'mem-sept-2026',
    title: {
      en: 'Why 2.7% Growth Feels Small',
      ny: 'Chifukwa Chake Kukula kwa 2.7% Sikukumveka',
    },
    description: {
      en: 'See how forex and power limits slow factories and keep pay flat.',
      ny: 'Onani momwe kusowa madola ndi magetsi kumachepetsera mafakitale ndi malipiro.',
    },
    steps: [
      {
        id: 'ch26-g1',
        label: {
          en: 'Power, forex & credit limits',
          ny: 'Zopinga za magetsi, madola & ngongole',
        },
        detail: {
          en: 'Power cuts, forex limits, scarce credit, and shifting rules slow firms.',
          ny: 'Magetsi, madola, ngongole zochepa, ndi malamulo zikulemetsa mabizinesi.',
        },
        direction: 'down',
      },
      {
        id: 'ch26-g2',
        label: {
          en: 'Factories lack imported inputs',
          ny: 'Mafakitale akusowa zopangira katundu',
        },
        detail: {
          en: 'Scarce US dollars block critical materials and spare parts.',
          ny: 'Kusowa kwa madola kumaletsa mafakitale kuitanitsa zida zofunikira.',
        },
        direction: 'down',
      },
      {
        id: 'ch26-g3',
        label: {
          en: 'Factory output stays low',
          ny: 'Kupanga katundu kukutsika',
        },
        detail: {
          en: 'Industry stalls, leaving banks and shops to carry growth.',
          ny: 'Mafakitale akuchedwa, ndipo mabanki ndi masitolo akuyendetsa chuma.',
        },
        direction: 'down',
      },
      {
        id: 'ch26-g4',
        label: {
          en: 'Economy grows just 2.7%',
          ny: 'Chuma chikukula ndi 2.7% yokha',
        },
        detail: {
          en: '2.7% trails neighbors and beats 2.6% population growth by 0.1%.',
          ny: '2.7% ikutsala poyerekeza ndi anansi ndipo ikuposa anthu ndi 0.1%.',
        },
        direction: 'neutral',
      },
      {
        id: 'ch26-g5',
        label: {
          en: 'Pay per person stays flat',
          ny: 'Phindu la munthu silikukwera',
        },
        detail: {
          en: 'Average incomes — falling since 2022 — barely improve.',
          ny: 'Ndalama za munthu mmodzi — zikutsika kuchokera 2022 — sizikukwera.',
        },
        direction: 'down',
      },
      {
        id: 'ch26-g6',
        label: {
          en: 'Poverty falls too slowly',
          ny: 'Umphawi ukuchepa pang’ono',
        },
        detail: {
          en: 'Growth remains too slow to lift many households out of poverty.',
          ny: 'Kukula n’kochepa kwambiri kuti kuthandize anthu ambiri kutuluka mu umphawi.',
        },
        direction: 'down',
      },
    ],
    source: VERIFIED_SOURCE_2026(
      17,
      'Page 17 (Section 1.2)',
      'Industrial sector performance remains constrained by foreign-exchange distortions, which impede the import of critical inputs and limit productive capacity... overall growth remains below potential and insufficient to meaningfully raise per-capita incomes, which have been declining since 2022.',
      'platform_interpretation'
    ),
  },
  {
    id: 'chain-inf-2026',
    topicId: 'mem26-inflation',
    reportId: 'mem-sept-2026',
    title: {
      en: 'Why Maize Fell While Fuel Rose',
      ny: 'Chifukwa Chimanga Chinatsika Koma Mafuta Anakwera',
    },
    description: {
      en: 'Cheaper maize cooled overall inflation even as non-food costs jumped 32.1%.',
      ny: 'Chimanga chotsika chinatsitsa mitengo yonse ngakhale zinthu zina zinakwera 32.1%.',
    },
    steps: [
      {
        id: 'ch26-i1',
        label: {
          en: 'Better 2025/26 maize harvest',
          ny: 'Chimanga cha 2025/26 chakwera',
        },
        detail: {
          en: 'Local maize output rose ~15% alongside grain imports.',
          ny: 'Chimanga cha m’dziko chinakwera 15% pamodzi ndi chogula kunja.',
        },
        direction: 'up',
      },
      {
        id: 'ch26-i2',
        label: {
          en: 'Maize prices cool down',
          ny: 'Mtengo wa chimanga ukutsika',
        },
        detail: {
          en: 'Cheaper food pulled headline inflation down from 28.4% to 21.1%.',
          ny: 'Chakudya chotsika chinatsitsa mitengo yonse kuchoka 28.4% kufika 21.1%.',
        },
        direction: 'down',
      },
      {
        id: 'ch26-i3',
        label: {
          en: 'Fuel & power bills jump',
          ny: 'Mafuta & magetsi akwera mtengo',
        },
        detail: {
          en: 'Pump fuel rose 108% in April and power tariffs rose 12%.',
          ny: 'Mafuta anakwera 108% mu Epulo ndipo magetsi anakwera 12%.',
        },
        direction: 'up',
      },
      {
        id: 'ch26-i4',
        label: {
          en: 'Non-food costs hit 32.1%',
          ny: 'Mitengo ina yafika 32.1%',
        },
        detail: {
          en: 'Bus fares and utility bills stay high even as maize eases.',
          ny: 'Mayendedwe ndi magetsi zikudula ngakhale chimanga chatsika.',
        },
        direction: 'up',
      },
    ],
    source: VERIFIED_SOURCE_2026(
      27,
      'Pages 27–28',
      'Headline inflation declined to 21.1 percent in June 2026 from an average of 28.4 percent in 2025... However, non-food inflation continued to accelerate, reaching 32.1 percent in June 2026.',
      'platform_interpretation'
    ),
  },
  {
    id: 'chain-fx-2026',
    topicId: 'mem26-exchange-rates',
    reportId: 'mem-sept-2026',
    title: {
      en: 'Why Fixed Rates Drain Dollars',
      ny: 'Chifukwa Mtengo Wosasuntha Umathetsa Madola',
    },
    description: {
      en: 'Holding official bank rates rigid creates recurring US dollar shortages.',
      ny: 'Kuumirira mtengo umodzi ku banki kumabweretsa kusowa kwa madola.',
    },
    steps: [
      {
        id: 'ch26-f1',
        label: {
          en: 'Official rate stays fixed',
          ny: 'Mtengo ku banki sumasuntha',
        },
        detail: {
          en: 'Fixed bank rates make imports look cheap while rewarding exporters less.',
          ny: 'Zimapangitsa ogulitsa kunja kupeza phindu lochepa ku banki.',
        },
        direction: 'neutral',
      },
      {
        id: 'ch26-f2',
        label: {
          en: 'Bank dollars run low',
          ny: 'Madola m’banki atsika kwambiri',
        },
        detail: {
          en: 'Official reserves drop to 0.3 months (~9 days) of imports.',
          ny: 'Madola osungidwa atsika kufika miyezi 0.3 yokha (~masiku 9).',
        },
        direction: 'down',
      },
      {
        id: 'ch26-f3',
        label: {
          en: 'Street rate climbs ~130%',
          ny: 'Msika wam’mbali ukukwera ~130%',
        },
        detail: {
          en: 'Exporters hold back while buyers pay over double on the street.',
          ny: 'Amalonda amakagula madola m’misewu pa mtengo wokwera.',
        },
        direction: 'up',
      },
      {
        id: 'ch26-f4',
        label: {
          en: 'Factories wait for supplies',
          ny: 'Mafakitale amadikira zida',
        },
        detail: {
          en: 'Missing parts slow factories and hold down overall growth.',
          ny: 'Kusowa kwa zida kumachedwetsa mafakitale ndi kukula kwa chuma.',
        },
        direction: 'down',
      },
    ],
    source: VERIFIED_SOURCE_2026(
      26,
      'Pages 17 & 26–27 (Box 1.3)',
      'During periods of external stress, the official exchange rate is artificially held fixed, insulating the economy from necessary adjustment at the cost of accelerating reserve depletion.',
      'platform_interpretation'
    ),
  },

  // Earlier Sample Chain
  {
    id: 'chain-trade-2024',
    topicId: 'mem24-trade-and-imports',
    reportId: 'mem-2024-sample',
    title: {
      en: 'How Import Costs Slow Trade',
      ny: 'Momwe Kudula kwa Katundu Kumachedwetsera Malonda',
    },
    description: {
      en: 'Follow how higher border costs ripple across local shops and jobs.',
      ny: 'Onani momwe misonkho ya malire imakhudzira masitolo ndi chuma.',
    },
    steps: [
      {
        id: 'ch-t1',
        label: {en: 'Import taxes rise', ny: 'Misonkho ya m’malire yakwera'},
        detail: {
          en: 'Duties and clearance fees climb on incoming goods.',
          ny: 'Mtengo wolowetsa katundu m’dziko wakwera.',
        },
        direction: 'up',
      },
      {
        id: 'ch-t2',
        label: {en: 'Imports cost more', ny: 'Katundu wakunja wadula'},
        detail: {
          en: 'Wholesalers pay more Kwacha at the border.',
          ny: 'Oitanitsa katundu amalipira Kwacha zambiri pa malire.',
        },
        direction: 'up',
      },
      {
        id: 'ch-t3',
        label: {en: 'Shop bills climb', ny: 'Mabizinesi akuwononga zambiri'},
        detail: {
          en: 'Local shops spend more on stock and spare parts.',
          ny: 'Masitolo amawononga zambiri pogula masipeya.',
        },
        direction: 'up',
      },
      {
        id: 'ch-t4',
        label: {en: 'Firms order less', ny: 'Ena amachepetsa kuitanitsa'},
        detail: {
          en: 'Businesses bring in smaller shipments to save cash.',
          ny: 'Amagula katundu wochepa chifukwa chosowa ndalama.',
        },
        direction: 'down',
      },
      {
        id: 'ch-t5',
        label: {en: 'Trade slows down', ny: 'Malonda amachepa'},
        detail: {
          en: 'Fewer goods move through markets and trucks.',
          ny: 'Katundu wochepa amayenda m’misika.',
        },
        direction: 'down',
      },
      {
        id: 'ch-t6',
        label: {en: 'Growth weakens', ny: 'Chuma chingachepe kukula'},
        detail: {
          en: 'Slower trade and production weigh on national output.',
          ny: 'Kuchepa kwa malonda kumachepetsa chuma cha dziko.',
        },
        direction: 'down',
      },
    ],
    source: SAMPLE_SOURCE_2024(
      'Illustrative cause-and-effect chain showing how import cost shocks transmit to trade and economic growth.'
    ),
  },
];
