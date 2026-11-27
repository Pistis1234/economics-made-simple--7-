import type {QuizQuestionData} from '../types';

const PDF_URL =
  '/assets/aistudio/MALAWI_ECONOMIC_MONITOR_BUILDING_STABILITY_TO_UNLOCK_GROWTH_a1ee2546.pdf';

export const QUIZ_QUESTIONS: QuizQuestionData[] = [
  // September 2026 Verified Report Quiz (Page 17 + Report Essentials)
  {
    id: 'q1-2026',
    reportId: 'mem-sept-2026',
    topicSlug: 'economic-growth',
    question: {
      en: '2026 growth is projected at 2.7% while population grows 2.6%. Why is that still too slow?',
      ny: 'Chuma chikuyembekezeka kukula 2.7% pamene anthu akukula 2.6%. Chifukwa chiyani sikokwanira?',
      nyReviewStatus: 'pending_expert_review',
    },
    options: [
      {
        id: 'a',
        text: {
          en: '2.7% is slower than 2024’s rate.',
          ny: '2.7% ndi yochepa kuposa ya mu 2024.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'A 0.1% lead over population is too small to cut poverty.',
          ny: 'Kuposa anthu ndi 0.1% yokha sikungachepetse umphawi.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Population stopped growing.',
          ny: 'Anthu anasiya kuchuluka.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Malawi outpaced every neighbor.',
          ny: 'Malawi anaposa mayiko onse oyandikana nawo.',
        },
      },
    ],
    correctOptionId: 'b',
    explanation: {
      en: 'Spot on! Leading population growth by just 0.1% leaves average earnings per person flat.',
      ny: 'Mwakhoza! Kuposa anthu ndi 0.1% yokha sikukweza ndalama za munthu aliyense.',
    },
    source: {
      reportId: 'mem-sept-2026',
      reportTitle: 'Malawi Economic Monitor: Building Stability to Unlock Growth',
      publisher: 'World Bank',
      publicationYear: 2026,
      pageReference: 'Page 17 (Section 1.2)',
      originalWording:
        'While this would mark the first time in five years that GDP expansion outpaces the country’s rate of population growth, which stands at 2.6 percent per year, this pace of economic growth remains too slow to push a significant number of people out of poverty.',
      sourceUrl: `${PDF_URL}#page=17`,
      sourceType: 'direct_report',
      verificationStatus: 'verified',
    },
  },
  {
    id: 'q2-2026',
    reportId: 'mem-sept-2026',
    topicSlug: 'economic-growth',
    question: {
      en: 'Which sector leads Malawi’s 2026 growth?',
      ny: 'Ndi gawo liti lomwe likutsogolera kukula kwa chuma mu 2026?',
    },
    options: [
      {
        id: 'a',
        text: {en: 'Heavy steel factories.', ny: 'Mafakitale akulu a chitsulo.'},
      },
      {
        id: 'b',
        text: {
          en: 'Services (banks & shops) alongside recovering farms.',
          ny: 'Mabanki & masitolo, pamodzi ndi ulimi wochira.',
        },
      },
      {
        id: 'c',
        text: {en: 'Oil and gas drilling.', ny: 'Kukumba mafuta ndi gasi.'},
      },
      {
        id: 'd',
        text: {en: 'Car manufacturing.', ny: 'Kupanga magalimoto.'},
      },
    ],
    correctOptionId: 'b',
    explanation: {
      en: 'Right! Banking and recovering harvests carry 2026 growth.',
      ny: 'Zoona! Mabanki ndi zokolola zabwino ndi zomwe zikukweza chuma mu 2026.',
    },
    source: {
      reportId: 'mem-sept-2026',
      reportTitle: 'Malawi Economic Monitor: Building Stability to Unlock Growth',
      publisher: 'World Bank',
      publicationYear: 2026,
      pageReference: 'Page 17 (Section 1.2 & Figure 1.5)',
      originalWording:
        'The uptick in GDP is set to be underpinned by sustained expansion in the services sector, particularly financial services, alongside an ongoing recovery in agricultural output following the drought caused by the 2024 El Niño event.',
      sourceUrl: `${PDF_URL}#page=17`,
      sourceType: 'direct_report',
      verificationStatus: 'verified',
    },
  },
  {
    id: 'q3-2026',
    reportId: 'mem-sept-2026',
    topicSlug: 'economic-growth',
    question: {
      en: 'What is slowing Malawi’s factories down?',
      ny: 'N’chiyani chikuchedwetsa mafakitale a ku Malawi?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Scarce US dollars, power cuts, tight loans, and shifting rules.',
          ny: 'Kusowa kwa madola, kuthima magetsi, kuchepa ngongole, ndi malamulo osasintha.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Too many cheap imported parts.',
          ny: 'Kuchuluka kwa masipeya otsika mtengo.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Lack of literate youth.',
          ny: 'Kusowa kwa achinyamata otha kuwerenga.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Too much unused electricity.',
          ny: 'Magetsi ochuluka osagwiritsidwa ntchito.',
        },
      },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Correct! Without steady US dollars and reliable power, factories run below half-speed.',
      ny: 'Mwakhoza! Popanda madola ndi magetsi odalirika, mafakitale amagwira ntchito pansi pa theka.',
    },
    source: {
      reportId: 'mem-sept-2026',
      reportTitle: 'Malawi Economic Monitor: Building Stability to Unlock Growth',
      publisher: 'World Bank',
      publicationYear: 2026,
      pageReference: 'Page 17 (Section 1.2)',
      originalWording:
        'Industrial sector performance remains constrained by foreign-exchange distortions, which impede the import of critical inputs and limit productive capacity... Structural bottlenecks—particularly in energy supply, access to foreign exchange, and regulatory uncertainty—continue to weigh on private sector activity.',
      sourceUrl: `${PDF_URL}#page=17`,
      sourceType: 'direct_report',
      verificationStatus: 'verified',
    },
  },
  {
    id: 'q4-2026',
    reportId: 'mem-sept-2026',
    topicSlug: 'inflation',
    question: {
      en: 'Why did total inflation ease to 21.1% in June 2026 even though fuel and power jumped?',
      ny: 'Chifukwa chiyani mitengo yonse inatsika mpaka 21.1% ngakhale mafuta ndi magetsi zinakwera?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Cheaper maize—over half of family budgets—pulled the average down.',
          ny: 'Chimanga chotsika mtengo—chomwe ndi gawo lalikulu la bajeti—chinatsitsa mitengo.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'Fuel and power became free.',
          ny: 'Mafuta ndi magetsi zinali zaulere.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Everyone’s salary doubled.',
          ny: 'Malipiro a aliyense anakwera kawiri.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'All imports were banned.',
          ny: 'Katundu wakunja analetsedwa.',
        },
      },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Exactly! Food is over half of the price basket, so cheaper maize cooled total inflation even as non-food costs rose 32.1%.',
      ny: 'Zoonadi! Chakudya chimapanga theka la bajeti, choncho chimanga chotsika chinatsitsa mitengo ngakhale mafuta anakwera.',
    },
    source: {
      reportId: 'mem-sept-2026',
      reportTitle: 'Malawi Economic Monitor: Building Stability to Unlock Growth',
      publisher: 'World Bank',
      publicationYear: 2026,
      pageReference: 'Page 20 & Page 27',
      originalWording:
        'Headline inflation declined to 21.1 percent in June 2026 from an average of 28.4 percent in 2025... Maize prices fell sharply, reflecting increased imports from neighboring countries alongside the effect of the domestic harvest.',
      sourceUrl: `${PDF_URL}#page=27`,
      sourceType: 'direct_report',
      verificationStatus: 'verified',
    },
  },
  {
    id: 'q5-2026',
    reportId: 'mem-sept-2026',
    topicSlug: 'public-debt',
    question: {
      en: 'About how much of domestic tax money in FY2025/26 went just to loan interest?',
      ny: 'Ndi gawo liti la misonkho mu FY2025/26 lomwe linapita kokalipira chiwongoladzanja cha ngongole?',
    },
    options: [
      {id: 'a', text: {en: 'About 5%.', ny: 'Pafupifupi 5%.'}},
      {
        id: 'b',
        text: {
          en: 'Nearly 50% (almost half of taxes).',
          ny: 'Pafupifupi 50% (theka la misonkho).',
        },
      },
      {id: 'c', text: {en: '0% — all forgiven.', ny: '0% — zonse zinakhululukidwa.'}},
      {id: 'd', text: {en: 'Exactly 10%.', ny: '10% yeniyeni.'}},
    ],
    correctOptionId: 'b',
    explanation: {
      en: 'Right. Interest bills took nearly half of domestic taxes, squeezing money for clinics and roads.',
      ny: 'Mwakhoza. Chiwongoladzanja chinatenga pafupifupi theka la misonkho, kuchepetsa ndalama za zipatala.',
    },
    source: {
      reportId: 'mem-sept-2026',
      reportTitle: 'Malawi Economic Monitor: Building Stability to Unlock Growth',
      publisher: 'World Bank',
      publicationYear: 2026,
      pageReference: 'Page 23',
      originalWording:
        'Interest payments represent the single largest expenditure line in the national budget, absorbing nearly 50 percent of domestic revenue in FY2025/26.',
      sourceUrl: `${PDF_URL}#page=23`,
      sourceType: 'direct_report',
      verificationStatus: 'verified',
    },
  },

  // Earlier Sample Report Quizzes
  {
    id: 'q1-2024',
    reportId: 'mem-2024-sample',
    topicSlug: 'inflation',
    question: {
      en: 'What does inflation mean?',
      ny: 'Kodi kukwera kwa mitengo (inflation) kumatanthauza chiyani?',
      nyReviewStatus: 'pending_expert_review',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'The general increase in prices over time.',
          ny: 'Kukwera kwa mitengo ya zinthu pa nthawi yaitali.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'A reduction in government spending.',
          ny: 'Kuchepetsa kugwiritsa ntchito ndalama za boma.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'An increase in the number of businesses.',
          ny: 'Kuwonjezeka kwa chiwerengero cha mabizinesi.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'A decrease in imports.',
          ny: 'Kuchepa kwa katundu wochokera kunja.',
        },
      },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Correct! Inflation means everyday food, oil, and fare prices rise, so each Kwacha buys less.',
      ny: 'Mwakhoza! Kukwera kwa mitengo kumatanthauza kuti Kwacha imodzi ikugula zochepa kuposa kale.',
    },
    source: {
      reportId: 'mem-2024-sample',
      reportTitle: 'Malawi Economic Monitor (Illustrative Sample)',
      publisher: 'World Bank',
      publicationYear: 2024,
      pageReference: 'Sample Educational Quiz',
      originalWording: 'Plain-language definition of consumer price inflation.',
      sourceType: 'platform_interpretation',
      verificationStatus: 'sample_pending_verification',
    },
  },
  {
    id: 'q1-2023',
    reportId: 'mem-2023-sample',
    topicSlug: 'economic-growth',
    question: {
      en: 'What factor can quickly slow both rural pay and city food supply?',
      ny: 'Ndi chinthu chiti chomwe chimachepetsa ndalama zakumudzi ndi chakudya m’tauni?',
    },
    options: [
      {
        id: 'a',
        text: {
          en: 'Floods or long dry spells.',
          ny: 'Madzi osefukira kapena chilala chachitali.',
        },
      },
      {
        id: 'b',
        text: {
          en: 'More paved rural roads.',
          ny: 'Misewu yambiri ya phula m’midzi.',
        },
      },
      {
        id: 'c',
        text: {
          en: 'Lower electricity tariffs.',
          ny: 'Kutsika kwa mtengo wa magetsi.',
        },
      },
      {
        id: 'd',
        text: {
          en: 'Higher literacy rates.',
          ny: 'Kukwera kwa anthu otha kuwerenga.',
        },
      },
    ],
    correctOptionId: 'a',
    explanation: {
      en: 'Correct! Because most families rely on rain-fed farming, weather shocks shrink harvests and lift food prices.',
      ny: 'Mwakhoza! Mabanja ambiri amadalira mvula, choncho chilala kapena madzi osefukira amachepetsa zokolola.',
    },
    source: {
      reportId: 'mem-2023-sample',
      reportTitle: 'Malawi Economic Monitor — Archive Edition (Illustrative Sample)',
      publisher: 'World Bank',
      publicationYear: 2023,
      pageReference: 'Sample Archive Quiz',
      originalWording: 'Weather shock impacts on agriculture and food inflation.',
      sourceType: 'platform_interpretation',
      verificationStatus: 'sample_pending_verification',
    },
  },
];
