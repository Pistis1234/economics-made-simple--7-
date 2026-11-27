import type {FeedbackLoopData} from '../types';

const PDF_URL =
  '/assets/aistudio/MALAWI_ECONOMIC_MONITOR_BUILDING_STABILITY_TO_UNLOCK_GROWTH_a1ee2546.pdf';

export const FEEDBACK_LOOPS: FeedbackLoopData[] = [
  // September 2026 Verified Report Loops
  {
    id: 'loop-trap-growth-2026',
    reportId: 'mem-sept-2026',
    topicSlug: 'economic-growth',
    type: 'trap',
    title: {
      en: 'Why Subdued Growth Traps Incomes (Page 17 Cycle)',
      ny: 'Chifukwa Chake Kukula Pang’ono Kumabwezeretsa Ndalama za Anthu M’mbuyo',
      nyReviewStatus: 'pending_expert_review',
    },
    subtitle: {
      en: 'THE ECONOMIC TRAP',
      ny: 'MSAMPHA WA CHUMA',
      nyReviewStatus: 'pending_expert_review',
    },
    summary: {
      en: 'Based on Page 17: forex shortages, power bottlenecks, and regulatory uncertainty hold back factories and investment, keeping growth too close to population growth (2.7% vs 2.6%) to lift incomes.',
      ny: 'Kuchokera pa Tsamba 17: kusowa kwa ndalama zakunja ndi magetsi kumalepheretsa mafakitale, zomwe zimapangitsa chuma kukula pang’ono.',
      nyReviewStatus: 'pending_expert_review',
    },
    nodes: [
      {
        id: 't26-1',
        label: {en: 'Power & forex bottlenecks'},
        detail: {
          en: 'Page 17 notes that unreliable electricity, foreign-exchange shortages, and limited credit restrict businesses from importing inputs.',
        },
        impactTag: {en: 'Page 17 constraint'},
      },
      {
        id: 't26-2',
        label: {en: 'Industry runs below capacity'},
        detail: {
          en: 'Industrial production cannot expand strongly; businesses stay cautious and limit new hiring.',
        },
        impactTag: {en: 'Output constrained'},
      },
      {
        id: 't26-3',
        label: {en: 'Growth trails peers (2.7%)'},
        detail: {
          en: 'GDP rises only 2.7% in 2026 — lagging regional neighbors and barely passing 2.6% population growth.',
        },
        impactTag: {en: 'Modest headline'},
      },
      {
        id: 't26-4',
        label: {en: 'Per-capita income stays weak'},
        detail: {
          en: 'Average income per person, which has been falling since 2022, fails to recover meaningfully.',
        },
        impactTag: {en: 'Households squeezed'},
      },
      {
        id: 't26-5',
        label: {en: 'Shallow domestic demand'},
        detail: {
          en: 'With household budgets stretched by inflation, local demand and private investment remain cautious.',
        },
        impactTag: {en: 'Cycle repeats'},
      },
    ],
    source: {
      reportId: 'mem-sept-2026',
      reportTitle: 'Malawi Economic Monitor: Building Stability to Unlock Growth',
      publisher: 'World Bank',
      publicationYear: 2026,
      pageReference: 'Page 17 (Section 1.2) & Page 18',
      originalWording:
        'Structural bottlenecks—particularly in energy supply, access to foreign exchange, and regulatory uncertainty—continue to weigh on private sector activity, keeping growth below potential and insufficient to meaningfully raise per-capita incomes, which have been declining since 2022.',
      sourceUrl: `${PDF_URL}#page=17`,
      sourceType: 'platform_interpretation',
      verificationStatus: 'verified',
    },
  },
  {
    id: 'loop-brake-stability-2026',
    reportId: 'mem-sept-2026',
    topicSlug: 'inflation',
    type: 'brake',
    title: {
      en: 'How Easing Food Prices & Budget Restraint Cool Inflation',
      ny: 'Momwe Kutsika kwa Mitengo ya Chimanga ndi Dongosolo la Bajeti Zimachepetsera Kukwera kwa Mitengo',
      nyReviewStatus: 'pending_expert_review',
    },
    subtitle: {
      en: 'THE ECONOMIC BRAKE',
      ny: 'CHOLETSA KUKWERA KWA MITENGO',
      nyReviewStatus: 'pending_expert_review',
    },
    summary: {
      en: 'When harvests recover, money-supply growth slows, and government borrowing falls, inflation eases from 28.4% (2025) toward 21.1% (June 2026).',
    },
    nodes: [
      {
        id: 'b26-1',
        label: {en: 'Better staple harvest & imports'},
        detail: {
          en: 'Maize output rose ~15% in 2025/26 alongside neighboring imports, pulling monthly maize prices sharply down.',
        },
        impactTag: {en: 'Food supply relief'},
      },
      {
        id: 'b26-2',
        label: {en: 'Tighter budget & money growth'},
        detail: {
          en: 'Narrowing the budget deficit to 8.8% of GDP reduced domestic borrowing and slowed money-supply growth.',
        },
        impactTag: {en: 'Fiscal restraint'},
      },
      {
        id: 'b26-3',
        label: {en: 'Headline inflation cools'},
        detail: {
          en: 'Overall inflation declined from an average of 28.4% in 2025 to 21.1% in June 2026.',
        },
        impactTag: {en: 'Price relief'},
      },
      {
        id: 'b26-4',
        label: {en: 'Borrowing yields start dipping'},
        detail: {
          en: 'Selective government debt auctions began compressing treasury-bill yields and slowing domestic debt growth.',
        },
        impactTag: {en: 'Stability builds'},
      },
    ],
    source: {
      reportId: 'mem-sept-2026',
      reportTitle: 'Malawi Economic Monitor: Building Stability to Unlock Growth',
      publisher: 'World Bank',
      publicationYear: 2026,
      pageReference: 'Pages 20–23 & Page 27',
      originalWording:
        'Headline inflation declined to 21.1 percent in June 2026 from an average of 28.4 percent in 2025, supported by moderating money-supply growth, and improved food availability as the new harvest season took hold.',
      sourceUrl: `${PDF_URL}#page=27`,
      sourceType: 'platform_interpretation',
      verificationStatus: 'verified',
    },
  },
  {
    id: 'loop-trap-bop-2026',
    reportId: 'mem-sept-2026',
    topicSlug: 'exchange-rates',
    type: 'trap',
    title: {
      en: 'The Foreign-Exchange & Trade Deficit Trap',
      ny: 'Msampha wa Kusowa kwa Ndalama Zakunja ndi Malonda',
      nyReviewStatus: 'pending_expert_review',
    },
    subtitle: {
      en: 'THE ECONOMIC TRAP',
      ny: 'MSAMPHA WA CHUMA',
      nyReviewStatus: 'pending_expert_review',
    },
    summary: {
      en: 'Holding the official exchange rate rigid while tobacco exports lag creates a parallel market premium (~130%), discourages formal exports, and keeps reserves under 1 month of imports.',
    },
    nodes: [
      {
        id: 'fx26-1',
        label: {en: 'Exchange rate held rigid'},
        detail: {
          en: 'Overvalued official rate suppresses export returns while fuel and fertilizer import demand stays high.',
        },
        impactTag: {en: 'Misalignment'},
      },
      {
        id: 'fx26-2',
        label: {en: 'Parallel market premium (~130%)'},
        detail: {
          en: 'Scarcity pushes transactions outside formal banks; exporters face surrender requirements.',
        },
        impactTag: {en: 'Informal shift'},
      },
      {
        id: 'fx26-3',
        label: {en: 'Reserves fall below 1 month'},
        detail: {
          en: 'Official reserves drop well below the 3-month adequacy benchmark.',
        },
        impactTag: {en: 'Thin buffer'},
      },
      {
        id: 'fx26-4',
        label: {en: 'Factory & import bottlenecks'},
        detail: {
          en: 'Manufacturers struggle to import critical inputs (Page 17), limiting new export growth.',
        },
        impactTag: {en: 'Growth constrained'},
      },
    ],
    source: {
      reportId: 'mem-sept-2026',
      reportTitle: 'Malawi Economic Monitor: Building Stability to Unlock Growth',
      publisher: 'World Bank',
      publicationYear: 2026,
      pageReference: 'Pages 17, 25–27 (Box 1.3)',
      originalWording:
        'Distortions in the exchange rate and foreign-exchange market undermine export competitiveness and discourage formal trade, while their constraining impact on imports of essential goods and production inputs further weakens economic activity.',
      sourceUrl: `${PDF_URL}#page=26`,
      sourceType: 'platform_interpretation',
      verificationStatus: 'verified',
    },
  },

  // Earlier Sample Report Loops (kept for multi-report switching)
  {
    id: 'loop-trap-growth-2024',
    reportId: 'mem-2024-sample',
    topicSlug: 'economic-growth',
    type: 'trap',
    title: {
      en: 'The Slow-Growth Cycle',
      ny: 'Mzunguliro wa Kuchepa kwa Chuma',
      nyReviewStatus: 'pending_expert_review',
    },
    subtitle: {
      en: 'THE ECONOMIC TRAP',
      ny: 'MSAMPHA WA CHUMA',
      nyReviewStatus: 'pending_expert_review',
    },
    summary: {
      en: 'When growth stalls, businesses sell less and hire fewer workers, which reduces household spending and slows growth even further.',
      ny: 'Chuma chikachedwa kukula, mabizinesi amagulitsa pang’ono ndipo amalembetsa antchito ochepa, zomwe zimachepetsa kugula kwa mabanja.',
      nyReviewStatus: 'pending_expert_review',
    },
    nodes: [
      {
        id: 'trap-1',
        label: {en: 'Slow economic growth'},
        detail: {
          en: 'National output grows slower than needed, often triggered by poor harvests or power and fuel shortages.',
        },
        impactTag: {en: 'Weak start'},
      },
      {
        id: 'trap-2',
        label: {en: 'Lower business activity'},
        detail: {
          en: 'Shops, farms, and factories face higher input costs and slower sales, so they delay expanding.',
        },
        impactTag: {en: 'Production slows'},
      },
      {
        id: 'trap-3',
        label: {en: 'Fewer jobs & lower incomes'},
        detail: {
          en: 'Employers hire fewer workers and informal earnings fall behind rising living costs.',
        },
        impactTag: {en: 'Household strain'},
      },
      {
        id: 'trap-4',
        label: {en: 'Reduced household spending'},
        detail: {
          en: 'Families cut back on non-essential purchases and focus strictly on basic food and transport.',
        },
        impactTag: {en: 'Tighter budgets'},
      },
      {
        id: 'trap-5',
        label: {en: 'Lower market demand'},
        detail: {
          en: 'With fewer customers buying goods and services, local businesses see revenue shrink further.',
        },
        impactTag: {en: 'Reinforces slowdown'},
      },
    ],
    source: {
      reportId: 'mem-2024-sample',
      reportTitle: 'Malawi Economic Monitor (Illustrative Sample)',
      publisher: 'World Bank',
      publicationYear: 2024,
      pageReference: 'Sample Synthesis · Pending Verification',
      originalWording:
        'Illustrative diagram synthesizing how sluggish GDP growth, constrained private-sector activity, and weak household purchasing power reinforce one another.',
      sourceType: 'platform_interpretation',
      verificationStatus: 'sample_pending_verification',
    },
  },
  {
    id: 'loop-brake-inflation-2024',
    reportId: 'mem-2024-sample',
    topicSlug: 'inflation',
    type: 'brake',
    title: {
      en: 'The Inflation-Control Mechanism',
      ny: 'Njira Yochepetsera Kukwera kwa Mitengo',
      nyReviewStatus: 'pending_expert_review',
    },
    subtitle: {
      en: 'THE ECONOMIC BRAKE',
      ny: 'CHOLETSA KUKWERA KWA MITENGO',
      nyReviewStatus: 'pending_expert_review',
    },
    summary: {
      en: 'Targeted food supply improvements and steady monetary discipline work together to cool rapid price increases over time.',
      ny: 'Kuwonjezera chakudya m’misika komanso kugwiritsa ntchito ndalama mwadongosolo kumathandiza kuchepetsa kukwera kwa mitengo.',
      nyReviewStatus: 'pending_expert_review',
    },
    nodes: [
      {
        id: 'brake-1',
        label: {en: 'High price pressure'},
        detail: {
          en: 'Food scarcity and expensive imports push everyday market prices sharply upward.',
        },
        impactTag: {en: 'Signal to act'},
      },
      {
        id: 'brake-2',
        label: {en: 'Tighter money & supply support'},
        detail: {
          en: 'Central bank policy restrains excess credit growth while better harvests or grain releases add food supply.',
        },
        impactTag: {en: 'Policy & supply'},
      },
      {
        id: 'brake-3',
        label: {en: 'Demand & food prices cool'},
        detail: {
          en: 'More stable maize availability and slower borrowing reduce upward pressure on market prices.',
        },
        impactTag: {en: 'Pressure eases'},
      },
      {
        id: 'brake-4',
        label: {en: 'More predictable prices'},
        detail: {
          en: 'Households and shopkeepers can plan budgets without sudden weekly price jumps.',
        },
        impactTag: {en: 'Stability returns'},
      },
      {
        id: 'brake-5',
        label: {en: 'Confidence gradually recovers'},
        detail: {
          en: 'Lower inflation protects real wages and creates steadier conditions for saving and investment.',
        },
        impactTag: {en: 'Balanced cycle'},
      },
    ],
    source: {
      reportId: 'mem-2024-sample',
      reportTitle: 'Malawi Economic Monitor (Illustrative Sample)',
      publisher: 'World Bank',
      publicationYear: 2024,
      pageReference: 'Sample Synthesis · Pending Verification',
      originalWording:
        'Illustrative stabilization diagram showing how monetary restraint paired with improved agricultural supply helps bring inflation closer to balance.',
      sourceType: 'platform_interpretation',
      verificationStatus: 'sample_pending_verification',
    },
  },
  {
    id: 'loop-trap-2023',
    reportId: 'mem-2023-sample',
    topicSlug: 'economic-growth',
    type: 'trap',
    title: {en: 'The Weather Shock & Food Price Loop (2023 Sample)'},
    subtitle: {en: 'THE ECONOMIC TRAP'},
    summary: {
      en: 'Illustrative 2023 archive cycle showing how cyclone and rainfall shocks lower harvests and push up household living costs.',
    },
    nodes: [
      {
        id: 't23-1',
        label: {en: 'Severe weather shock'},
        detail: {en: 'Floods or dry spells damage crops and rural roads.'},
        impactTag: {en: 'Harvest hit'},
      },
      {
        id: 't23-2',
        label: {en: 'Smaller maize supply'},
        detail: {en: 'Less grain reaches local markets after harvest.'},
        impactTag: {en: 'Supply drops'},
      },
      {
        id: 't23-3',
        label: {en: 'Higher food prices'},
        detail: {en: 'Families spend more of their income on basic staples.'},
        impactTag: {en: 'Cost rises'},
      },
      {
        id: 't23-4',
        label: {en: 'Lower savings for inputs'},
        detail: {en: 'Farmers struggle to afford seed and fertilizer for the next season.'},
        impactTag: {en: 'Next cycle strained'},
      },
    ],
    source: {
      reportId: 'mem-2023-sample',
      reportTitle: 'Malawi Economic Monitor — Archive Edition (Illustrative Sample)',
      publisher: 'World Bank',
      publicationYear: 2023,
      pageReference: 'Sample Synthesis · Pending Verification',
      originalWording:
        'Illustrative archive cycle explaining climate shock transmission into food inflation.',
      sourceType: 'platform_interpretation',
      verificationStatus: 'sample_pending_verification',
    },
  },
];
