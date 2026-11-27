import type {PolicyRecommendation} from '../types';

const PDF_URL =
  '/assets/aistudio/MALAWI_ECONOMIC_MONITOR_BUILDING_STABILITY_TO_UNLOCK_GROWTH_a1ee2546.pdf';

export const RECOMMENDATIONS: PolicyRecommendation[] = [
  // =========================================================================
  // SEPTEMBER 2026 MALAWI ECONOMIC MONITOR (TABLE O.1 / TABLE 1.2, pp. 10, 32)
  // =========================================================================
  {
    id: 'rec26-forex-1',
    reportId: 'mem-sept-2026',
    category: 'Economic stability',
    heading: {
      en: 'Use one exchange rate',
      ny: 'Gwirizanitsani mtengo wa dola',
      nyReviewStatus: 'pending_expert_review',
    },
    simpleExplanation: {
      en: 'Steady government spending, then switch to one clear exchange rate while protecting poorer families.',
      ny: 'Khazikitsani bajeti, kenako gwiritsani ntchito mtengo umodzi wa dola ndikuteteza mabanja osauka.',
    },
    originalRecommendation:
      'Table 1.2 (p. 32) — Resolving the forex crisis: Sprint (next 3 months): Lay the groundwork for exchange-rate unification through fiscal and monetary tightening, so as to stabilize the parallel rate. Marathon (next 12 months): Unify exchange rates and clearly communicate the new exchange rate regime while scaling up social protection support.',
    timeframe: 'SHORT TERM',
    implementationNote: {
      en: 'p. 32 · 3–12 months',
      ny: 'ts. 32 · Miyezi 3–12',
    },
    source: {
      reportId: 'mem-sept-2026',
      reportTitle: 'Malawi Economic Monitor: Building Stability to Unlock Growth',
      publisher: 'World Bank',
      publicationYear: 2026,
      pageReference: 'Table O.1 (p. 10) & Table 1.2 (p. 32)',
      originalWording:
        'Lay the groundwork for exchange-rate unification through fiscal and monetary tightening, so as to stabilize the parallel rate; strengthen foreign-exchange market operations and guidelines.',
      sourceUrl: `${PDF_URL}#page=32`,
      sourceType: 'direct_report',
      verificationStatus: 'verified',
    },
  },
  {
    id: 'rec26-debt-1',
    reportId: 'mem-sept-2026',
    category: 'Public finances',
    heading: {
      en: 'Cut local loan interest bills',
      ny: 'Chepetsani chiwongoladzanja cha ngongole',
      nyReviewStatus: 'pending_expert_review',
    },
    simpleExplanation: {
      en: 'Finish foreign debt talks and stretch local repayments so taxes fund clinics and schools.',
      ny: 'Malizani kukambirana ngongole zakunja kuti misonkho ithandize zipatala ndi masukulu.',
    },
    originalRecommendation:
      'Table 1.2 (p. 32) — Restoring debt sustainability (Sprints, next 3 months): Conclude debt-restructuring negotiations with external commercial creditors, limit external borrowing to concessional debt, and develop a plan to reduce the domestic interest bill, including through domestic debt reprofiling.',
    timeframe: 'SHORT TERM',
    implementationNote: {
      en: 'p. 32 · Next 3 months',
      ny: 'ts. 32 · Miyezi 3',
    },
    source: {
      reportId: 'mem-sept-2026',
      reportTitle: 'Malawi Economic Monitor: Building Stability to Unlock Growth',
      publisher: 'World Bank',
      publicationYear: 2026,
      pageReference: 'Page 10 & Page 32 (Table 1.2)',
      originalWording:
        'Conclude debt-restructuring negotiations with external commercial creditors, limit external borrowing to concessional debt, and develop a plan to reduce the domestic interest bill, including through domestic debt reprofiling.',
      sourceUrl: `${PDF_URL}#page=32`,
      sourceType: 'direct_report',
      verificationStatus: 'verified',
    },
  },
  {
    id: 'rec26-revenue-1',
    reportId: 'mem-sept-2026',
    category: 'Public finances',
    heading: {
      en: 'End unfair tax exemptions',
      ny: 'Chotsani misonkho yosapereka ena',
      nyReviewStatus: 'pending_expert_review',
    },
    simpleExplanation: {
      en: 'Drop special VAT breaks for privileged groups and keep tax rules simple.',
      ny: 'Chotsani mwayi wopanda chilungamo wa VAT ndi kusavuta malamulo a misonkho.',
    },
    originalRecommendation:
      'Table 1.2 (p. 32) — Increasing revenue mobilization: Sprint: Publish tax expenditure report; eliminate VAT exemptions for non-food items and for privileged persons and institutions. Marathon (next 12 months): Finalize and enact revised income tax and VAT legislation to simplify tax code.',
    timeframe: 'MEDIUM TERM',
    implementationNote: {
      en: 'p. 32 · 3–12 months',
      ny: 'ts. 32 · Miyezi 3–12',
    },
    source: {
      reportId: 'mem-sept-2026',
      reportTitle: 'Malawi Economic Monitor: Building Stability to Unlock Growth',
      publisher: 'World Bank',
      publicationYear: 2026,
      pageReference: 'Page 32 (Table 1.2)',
      originalWording:
        'Publish tax expenditure report; eliminate VAT exemptions for non-food items and for privileged persons and institutions; finalize and enact revised income tax and VAT legislation to simplify tax code.',
      sourceUrl: `${PDF_URL}#page=32`,
      sourceType: 'direct_report',
      verificationStatus: 'verified',
    },
  },
  {
    id: 'rec26-agri-1',
    reportId: 'mem-sept-2026',
    category: 'Agriculture',
    heading: {
      en: 'Back drought-resilient seeds',
      ny: 'Thandizani mbewu zolimba ku chilala',
      nyReviewStatus: 'pending_expert_review',
    },
    simpleExplanation: {
      en: 'Let private shops supply fertilizer, store grain early, and fund tougher seeds.',
      ny: 'Lolani makampani agulitse feteleza, sungani chimanga msanga, ndipo thandizani mbewu zolimba.',
    },
    originalRecommendation:
      'Table 1.2 (p. 32) — Ensuring food security: Shift resources away from inefficient input subsidies, transfer fertilizer procurement and distribution to the private sector, purchase staple grains to buffer El Niño shortfalls, and repurpose subsidy toward El Niño-resilient inputs.',
    timeframe: 'SHORT TERM',
    implementationNote: {
      en: 'p. 32 · 3–12 months',
      ny: 'ts. 32 · Miyezi 3–12',
    },
    source: {
      reportId: 'mem-sept-2026',
      reportTitle: 'Malawi Economic Monitor: Building Stability to Unlock Growth',
      publisher: 'World Bank',
      publicationYear: 2026,
      pageReference: 'Pages 31–32 (Table 1.2)',
      originalWording:
        'Shift resources away from inefficient input subsidies, and transfer fertilizer procurement and distribution to the private sector; purchase staple grains to buffer El Niño-related shortfalls, and repurpose subsidy toward El Niño-resilient inputs.',
      sourceUrl: `${PDF_URL}#page=32`,
      sourceType: 'direct_report',
      verificationStatus: 'verified',
    },
  },
  {
    id: 'rec26-trade-1',
    reportId: 'mem-sept-2026',
    category: 'Trade and investment',
    heading: {
      en: 'Let exporters keep dollars',
      ny: 'Lolani ogulitsa kunja asunge madola',
      nyReviewStatus: 'pending_expert_review',
    },
    simpleExplanation: {
      en: 'Stop forcing exporters to surrender US dollars and end sudden export bans.',
      ny: 'Siyani kukakamiza ogulitsa kunja kupereka madola awo ndi kuthetsa ziletso zadzidzidzi.',
    },
    originalRecommendation:
      'Table 1.2 (p. 32) — Increasing and diversifying exports: Phase out foreign-exchange surrender requirements; replace trade bans with SADC-compliant measures; scale up digitalization of regional trade.',
    timeframe: 'MEDIUM TERM',
    implementationNote: {
      en: 'p. 32 · 3–12 months',
      ny: 'ts. 32 · Miyezi 3–12',
    },
    source: {
      reportId: 'mem-sept-2026',
      reportTitle: 'Malawi Economic Monitor: Building Stability to Unlock Growth',
      publisher: 'World Bank',
      publicationYear: 2026,
      pageReference: 'Pages 27 & 32 (Table 1.2)',
      originalWording:
        'Phase out foreign-exchange surrender requirements; replace trade bans with SADC-compliant measures; strengthen the regulatory framework for trade facilitation.',
      sourceUrl: `${PDF_URL}#page=32`,
      sourceType: 'direct_report',
      verificationStatus: 'verified',
    },
  },
  {
    id: 'rec26-energy-1',
    reportId: 'mem-sept-2026',
    category: 'Jobs and businesses',
    heading: {
      en: 'Fix main power plants',
      ny: 'Konzani malo opangira magetsi',
      nyReviewStatus: 'pending_expert_review',
    },
    simpleExplanation: {
      en: 'Repair Kapichira and Nkula dams and finish the Mozambique power link.',
      ny: 'Konzani Kapichira ndi Nkula ndi kumaliza mzere wa magetsi kuchokera ku Mozambique.',
    },
    originalRecommendation:
      'Table 1.2 (p. 32) — Sustainably expanding power generation: Fast-track rehabilitation of the Kapichira and Nkula plants; complete the Mozambique interconnector; strengthen governance of SOEs in the energy sector.',
    timeframe: 'MEDIUM TERM',
    implementationNote: {
      en: 'p. 32 · Next 12 months',
      ny: 'ts. 32 · Miyezi 12',
    },
    source: {
      reportId: 'mem-sept-2026',
      reportTitle: 'Malawi Economic Monitor: Building Stability to Unlock Growth',
      publisher: 'World Bank',
      publicationYear: 2026,
      pageReference: 'Page 17, Page 32 (Table 1.2) & Page 44',
      originalWording:
        'Fast-track rehabilitation of the Kapichira and Nkula plants; complete the Mozambique interconnector; strengthen governance of SOEs in the energy sector—which account for over 80 percent of total SOE liabilities.',
      sourceUrl: `${PDF_URL}#page=32`,
      sourceType: 'direct_report',
      verificationStatus: 'verified',
    },
  },

  // Earlier Sample Report Recommendations
  {
    id: 'rec-stability-1',
    reportId: 'mem-2024-sample',
    category: 'Economic stability',
    heading: {
      en: 'Keep prices steady',
      ny: 'Khazikitsani mitengo',
      nyReviewStatus: 'pending_expert_review',
    },
    simpleExplanation: {
      en: 'Avoid printing extra money so food and transport costs stop jumping.',
      ny: 'Pewani kusindikiza ndalama zochuluka kuti mitengo ya chakudya isakwere.',
    },
    originalRecommendation:
      'Sample placeholder recommendation: Maintain a disciplined monetary stance alongside fiscal restraint to anchor inflation expectations.',
    timeframe: 'SHORT TERM',
    implementationNote: {
      en: 'Sample · Short term',
      ny: 'Chitsanzo · Nthawi yochepa',
    },
    source: {
      reportId: 'mem-2024-sample',
      reportTitle: 'Malawi Economic Monitor (Illustrative Sample)',
      publisher: 'World Bank',
      publicationYear: 2024,
      pageReference: 'Sample Recommendations · Pending Verification',
      originalWording:
        'Illustrative policy recommendation derived from common macroeconomic stabilization guidance.',
      sourceType: 'direct_report',
      verificationStatus: 'sample_pending_verification',
    },
  },
  {
    id: 'rec-2023-1',
    reportId: 'mem-2023-sample',
    category: 'Economic stability',
    heading: {
      en: 'Steady the currency market',
      ny: 'Khazikitsani msika wa ndalama',
    },
    simpleExplanation: {
      en: 'Rebuild dollar reserves so fuel and medicine imports flow smoothly.',
      ny: 'Kwezani nkhokwe ya madola kuti mafuta ndi mankhwala zibwere mosavuta.',
    },
    originalRecommendation:
      'Sample archive recommendation: Align exchange-rate management with reserve rebuilding.',
    timeframe: 'SHORT TERM',
    implementationNote: {
      en: '2023 Sample · Short term',
      ny: 'Chitsanzo 2023 · Nthawi yochepa',
    },
    source: {
      reportId: 'mem-2023-sample',
      reportTitle: 'Malawi Economic Monitor — Archive Edition (Illustrative Sample)',
      publisher: 'World Bank',
      publicationYear: 2023,
      pageReference: 'Sample Archive · Pending Verification',
      originalWording: 'Illustrative 2023 foreign exchange policy recommendation.',
      sourceType: 'direct_report',
      verificationStatus: 'sample_pending_verification',
    },
  },
];
