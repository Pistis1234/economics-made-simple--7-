import type {LocalizedText} from '../types';

export interface CauseEffectStep {
  id: string;
  trigger: string;
  triggerNy: string;
  leadWord: string;
  leadWordNy: string;
  leadsTo: string;
  leadsToNy: string;
}

export const TOPIC_BRIEF_DEFINITIONS: Record<string, LocalizedText> = {
  'economic-growth': {
    en: 'Whether the country produces more goods and services this year than last year.',
    ny: 'Kaya dziko likupanga katundu ndi ntchito zambiri chaka chino kuposa chaka chatha.',
  },
  inflation: {
    en: 'How fast everyday prices for food, fuel, and goods are rising.',
    ny: 'Kukwera kwa mitengo ya chakudya, mafuta, ndi katundu wa tsiku ndi tsiku.',
  },
  'public-debt': {
    en: 'The total money the government owes to lenders at home and abroad.',
    ny: 'Ndalama zonse zomwe boma linabwereka kuchokera m’dziko muno ndi kunja.',
  },
  'trade-and-imports': {
    en: 'Comparing what a country sells abroad (exports) with what it buys (imports).',
    ny: 'Kuyerekezera katundu amene dziko limagulitsa kunja ndi amene limagula.',
  },
  employment: {
    en: 'How many people have steady paid jobs versus short-term casual work.',
    ny: 'Kuchuluka kwa anthu amene ali ndi ntchito zokhazikika kapena ganyu.',
  },
  agriculture: {
    en: 'Growing food and cash crops that feed families and earn export money.',
    ny: 'Ulimi wa chakudya ndi mbewu zogulitsa kunja zothandiza mabanja ndi dziko.',
  },
  'exchange-rates': {
    en: 'How many Kwacha are needed to buy one unit of foreign money like the US Dollar.',
    ny: 'Kuchuluka kwa Kwacha zofunika pogula Dola imodzi kapena ndalama zakunja.',
  },
  'government-spending': {
    en: 'How tax money is divided between daily services, debt payments, and building projects.',
    ny: 'Momwe ndalama za misonkho zimagwiritsidwira ntchito pa chitukuko ndi ngongole.',
  },
};

export const TOPIC_CAUSE_CHAINS: Record<
  string,
  {
    titleLeading: string;
    titleLeadingNy: string;
    titleHighlight: string;
    titleHighlightNy: string;
    subtitle: string;
    subtitleNy: string;
    steps: CauseEffectStep[];
  }
> = {
  'economic-growth': {
    titleLeading: 'WHAT SLOWS OR LIFTS',
    titleLeadingNy: 'ZOMWE ZIMACHEDWETSA KAPENA KUKWEZA',
    titleHighlight: 'GROWTH',
    titleHighlightNy: 'KUKULA KWA CHUMA',
    subtitle: 'Tap each step to see what one shift leads to.',
    subtitleNy: 'Dinani sitepe iliyonse kuti muwone zotsatira zake.',
    steps: [
      {
        id: 'eg-c1',
        leadWord: 'SCARCE DOLLARS',
        leadWordNy: 'KUSOWA KWA MADOLA',
        trigger: 'block factory supplies',
        triggerNy: 'kumalepheretsa mafakitale',
        leadsTo:
          'Factories cannot buy imported parts, so over half run under half-speed.',
        leadsToNy:
          'Mafakitale amalephera kugula zida kunja, kotero ambiri amagwira pansi pa 50%.',
      },
      {
        id: 'eg-c2',
        leadWord: 'POWER CUTS',
        leadWordNy: 'KUTHIMA KWA MAGETSI',
        trigger: 'raise business costs',
        triggerNy: 'kumakweza ndalama za bizinesi',
        leadsTo:
          'Workshops spend cash on diesel generators instead of hiring new workers.',
        leadsToNy:
          'Mawokishopu amawononga ndalama pa dizilo m’malo molemba antchito atsopano.',
      },
      {
        id: 'eg-c3',
        leadWord: 'SHOPS & FARMS',
        leadWordNy: 'MASITOLO NDI ULIMI',
        trigger: 'still keep growing',
        triggerNy: 'zikupitilirabe kukula',
        leadsTo:
          'Banks, mobile money, and better harvests lift 2026 growth to 2.7%.',
        leadsToNy:
          'Mabanki, ndalama za foni, ndi zokolola zikukweza chuma kufika 2.7% mu 2026.',
      },
      {
        id: 'eg-c4',
        leadWord: '2.7% vs 2.6%',
        leadWordNy: '2.7% ndi 2.6%',
        trigger: 'leaves tiny gain per person',
        triggerNy: 'kuposa pang’ono kwambiri',
        leadsTo:
          'With population growing 2.6%, everyday incomes per person barely move.',
        leadsToNy:
          'Anthu akachuluka ndi 2.6%, ndalama za munthu aliyense sizikukwera.',
      },
    ],
  },
  inflation: {
    titleLeading: 'WHAT MOVES',
    titleLeadingNy: 'ZOMWE ZIMASINTHA',
    titleHighlight: 'PRICES',
    titleHighlightNy: 'MITENGO YA KATUNDU',
    subtitle: 'See how harvests and fuel shift what you pay.',
    subtitleNy: 'Onani momwe zokolola ndi mafuta zimasinthira mitengo.',
    steps: [
      {
        id: 'inf-c1',
        leadWord: 'BETTER HARVEST',
        leadWordNy: 'ZOKOLOLA ZABWINO',
        trigger: 'increases maize supply',
        triggerNy: 'zimachulukitsa chimanga',
        leadsTo:
          'A 15% larger maize harvest pushed grain prices down at local markets.',
        leadsToNy:
          'Kukwera kwa chimanga ndi 15% kunatsitsa mitengo m’misika ya m’dziko.',
      },
      {
        id: 'inf-c2',
        leadWord: 'CHEAPER MAIZE',
        leadWordNy: 'CHIMANGA CHOTSIPIRAKO',
        trigger: 'pulls overall prices down',
        triggerNy: 'chimachepetsa mitengo yonse',
        leadsTo:
          'Since food dominates family budgets, overall price rises cooled to 21.1%.',
        leadsToNy:
          'Chakudya chikatsika mtengo, kukwera kwa mitengo yonse kunatsika kufika 21.1%.',
      },
      {
        id: 'inf-c3',
        leadWord: 'FUEL & POWER HIKES',
        leadWordNy: 'MAFUTA NDI MAGETSI',
        trigger: 'push non-food bills up',
        triggerNy: 'amakweza mitengo ina',
        leadsTo:
          'Fuel rose 108% and power rose 12%, lifting non-food prices 32.1%.',
        leadsToNy:
          'Mafuta anakwera 108% ndi magetsi 12%, zomwe zinakweza zina ndi 32.1%.',
      },
      {
        id: 'inf-c4',
        leadWord: 'HIGHER FARES',
        leadWordNy: 'MATIKITI OKWERA',
        trigger: 'squeeze tight budgets',
        triggerNy: 'amachepetsa bajeti ya banja',
        leadsTo:
          'Minibus fares and daily non-food bills stay high despite cheaper maize.',
        leadsToNy:
          'Mayendedwe ndi katundu wina amapitilira kudula ngakhale chimanga chatsika.',
      },
    ],
  },
  'public-debt': {
    titleLeading: 'WHAT GOVERNMENT DEBT',
    titleLeadingNy: 'ZOMWE NGONGOLE ZA BOMA',
    titleHighlight: 'LEADS TO',
    titleHighlightNy: 'ZIMABWERETSA',
    subtitle: 'See how borrowing affects schools, clinics, and roads.',
    subtitleNy: 'Onani momwe kubwereka kumakhudzira masukulu ndi misewu.',
    steps: [
      {
        id: 'debt-c1',
        leadWord: 'SPENDING > TAXES',
        leadWordNy: 'ZOWONONGA > MISONKHO',
        trigger: 'creates a budget gap',
        triggerNy: 'zimabweretsa kusowa ndalama',
        leadsTo:
          'When taxes fall short, government borrows from local banks and abroad.',
        leadsToNy:
          'Misonkho ikaperewera, boma limabwereka m’mabanki a m’dziko ndi kunja.',
      },
      {
        id: 'debt-c2',
        leadWord: '98% OF ECONOMY',
        leadWordNy: '98% YA CHUMA CHONSE',
        trigger: 'creates heavy debt stress',
        triggerNy: 'zimabweretsa vuto la ngongole',
        leadsTo:
          'Heavy borrowing pushed total debt to 98% of annual national output.',
        leadsToNy:
          'Kubwereka kwambiri kunakweza ngongole kufika 98% ya chuma chonse.',
      },
      {
        id: 'debt-c3',
        leadWord: 'HIGH INTEREST',
        leadWordNy: 'CHIWONGOLADZANJA',
        trigger: 'claims nearly half of taxes',
        triggerNy: 'chimatenga theka la misonkho',
        leadsTo:
          'Loan interest eats nearly 50% of taxes before clinics or schools get funded.',
        leadsToNy:
          'Chiwongoladzanja chimatenga 50% ya misonkho zisanafike ku zipatala.',
      },
      {
        id: 'debt-c4',
        leadWord: 'SLOWER BORROWING',
        leadWordNy: 'KUCHEPA KOBWEREKA',
        trigger: 'slowly frees up bank loans',
        triggerNy: 'kumatsekula mabanki ku mabizinesi',
        leadsTo:
          'Slower 2026 government borrowing eases rates so banks can lend to firms.',
        leadsToNy:
          'Kuchepa kobwereka kwa boma mu 2026 kumathandiza mabizinesi kupeza ngongole.',
      },
    ],
  },
  'trade-and-imports': {
    titleLeading: 'WHAT THE TRADE GAP',
    titleLeadingNy: 'ZOMWE KUSIYANA KWA MALONDA',
    titleHighlight: 'LEADS TO',
    titleHighlightNy: 'KUMABWERETSA',
    subtitle: 'See what happens when imports outpace exports.',
    subtitleNy: 'Onani zotsatira zake zogula kunja zikachuluka kuposa zogulitsa.',
    steps: [
      {
        id: 'trd-c1',
        leadWord: 'HEAVY IMPORTS',
        leadWordNy: 'KUGULA KWAMBIRI KUNJA',
        trigger: 'cost US$3.7 billion a year',
        triggerNy: 'kumawononga US$3.7B pa chaka',
        leadsTo:
          'Fuel, fertilizer, medicines, and machines require US dollars every month.',
        leadsToNy:
          'Mafuta, feteleza, mankhwala, ndi makina zimafuna madola mwezi uliwonse.',
      },
      {
        id: 'trd-c2',
        leadWord: 'NARROW EXPORTS',
        leadWordNy: 'ZOGULITSA ZOCHEPA',
        trigger: 'stay near US$1.0 billion',
        triggerNy: 'zimakhalabe pafupi US$1.0B',
        leadsTo:
          'Relying mostly on tobacco (~40% of exports) keeps dollar inflows small.',
        leadsToNy:
          'Kudalira fodya (~40% ya malonda) kumabweretsa madola ochepa.',
      },
      {
        id: 'trd-c3',
        leadWord: 'US$2.7B GAP',
        leadWordNy: 'KUSIYANA KWA US$2.7B',
        trigger: 'drains dollar savings',
        triggerNy: 'kumathetsa madola m’mabanki',
        leadsTo:
          'More dollars leave than enter, leaving banks under one month of cover.',
        leadsToNy:
          'Madola ochuluka amatuluka, ndipo mabanki amatsala ndi madola ochepera mwezi umodzi.',
      },
      {
        id: 'trd-c4',
        leadWord: 'LOCAL SHORTAGES',
        leadWordNy: 'KUSOWA KWA KATUNDU',
        trigger: 'slow shops & transport',
        triggerNy: 'kumachedwetsa masitolo',
        leadsTo:
          'When bank dollars run low, fuel, parts, and imported stock are delayed.',
        leadsToNy:
          'Madola akachepa, mafuta ndi katundu wofunika amachedwa kufika m’masitolo.',
      },
    ],
  },
  employment: {
    titleLeading: 'WHY SCHOOLING DOES NOT',
    titleLeadingNy: 'CHIFUKWA CHOMWE MAPHUNZIRO',
    titleHighlight: 'EQUAL JOBS',
    titleHighlightNy: 'SABWERETSA NTCHITO ZOKHA',
    subtitle: 'Trace the link from schools to the job market.',
    subtitleNy: 'Tsatirani njira kuchokera kusukulu mpaka ku ntchito.',
    steps: [
      {
        id: 'job-c1',
        leadWord: 'MORE LITERACY',
        leadWordNy: 'KUWERENGA KWAKWERA',
        trigger: 'approaches 90% for youth',
        triggerNy: 'pafupifupi 90% kwa achinyamata',
        leadsTo:
          'Today’s young Malawians are better educated and ready for skilled work.',
        leadsToNy:
          'Achinyamata alero ndi ophunzira bwino ndipo ali okonzeka kugwira ntchito.',
      },
      {
        id: 'job-c2',
        leadWord: 'SLOW FIRMS',
        leadWordNy: 'MABIZINESI OCHEDWA',
        trigger: 'hire fewer full-time staff',
        triggerNy: 'amalemba antchito ochepa',
        leadsTo:
          'Power cuts and dollar shortages keep firms under half-speed and curb hiring.',
        leadsToNy:
          'Kuthima kwa magetsi ndi kusowa madola kumachepetsa kulembedwa ntchito.',
      },
      {
        id: 'job-c3',
        leadWord: 'UNDER 4% FORMAL',
        leadWordNy: 'OCHEPERA 4% M’NTCHITO',
        trigger: 'pushes youth into ganyu',
        triggerNy: 'kumapangitsa ganyu kuchuluka',
        leadsTo:
          'With steady pay rare, youth doing casual ganyu jumped to 27.6%.',
        leadsToNy:
          'Ntchito zokhazikika zikasowa, achinyamata ogwira ganyu anakwera kufika 27.6%.',
      },
      {
        id: 'job-c4',
        leadWord: 'UNSTABLE PAY',
        leadWordNy: 'MALIPIRO OSADALIRIKA',
        trigger: 'keeps food budgets tight',
        triggerNy: 'amavuta kupezera chakudya',
        leadsTo:
          'Overall poverty dipped to 47.3%, yet food hardship rose to 24.0%.',
        leadsToNy:
          'Umphawi wonse unatsika kufika 47.3%, koma kusowa chakudya kunafika 24.0%.',
      },
    ],
  },
  agriculture: {
    titleLeading: 'WHAT FARMING',
    titleLeadingNy: 'ZOMWE ULIMI',
    titleHighlight: 'DRIVES',
    titleHighlightNy: 'UMABWERETSA',
    subtitle: 'See how harvests shift prices, exports, and hunger.',
    subtitleNy: 'Onani momwe zokolola zimasinthira mitengo ndi chakudya.',
    steps: [
      {
        id: 'agr-c1',
        leadWord: '+15% MAIZE',
        leadWordNy: '+15% CHIMANGA',
        trigger: 'reaches 3.3M metric tons',
        triggerNy: 'chinafika pa 3.3M matani',
        leadsTo:
          'Better rains lifted harvests to 3.3M tons and eased grain prices.',
        leadsToNy:
          'Mvula yabwino inakweza chimanga kufika 3.3M matani ndi kutsitsa mitengo.',
      },
      {
        id: 'agr-c2',
        leadWord: 'WEATHER RISKS',
        leadWordNy: 'VUTO LA NYENGO',
        trigger: 'still affect 1.9M people',
        triggerNy: 'likukhudza anthu 1.9M',
        leadsTo:
          'Uneven rainfall and El Niño risks leave 1 in 10 citizens food-insecure.',
        leadsToNy:
          'Mvula yosakwanira yasiya munthu 1 pa 10 aliyense ndi vuto la chakudya.',
      },
      {
        id: 'agr-c3',
        leadWord: 'TOBACCO DROP',
        leadWordNy: 'KUTSIKA KWA FODYA',
        trigger: 'cuts early earnings 38.7%',
        triggerNy: 'kunachepetsa ndalama 38.7%',
        leadsTo:
          'Lower tobacco prices (US$2.02/kg) bring far fewer export dollars to banks.',
        leadsToNy:
          'Mtengo wotsika wa fodya (US$2.02/kg) wabweretsa madola ochepa m’mabanki.',
      },
      {
        id: 'agr-c4',
        leadWord: 'IRRIGATION & VARIETY',
        leadWordNy: 'MTHILIRA NDI MBEWU ZINA',
        trigger: 'stabilize future harvests',
        triggerNy: 'zimateteza zokolola',
        leadsTo:
          'Drought-tolerant seeds, irrigation, and diverse exports protect food and dollars.',
        leadsToNy:
          'Mbewu zolimba ndi ulimi wa mthilira zimateteza chakudya ndi madola.',
      },
    ],
  },
  'exchange-rates': {
    titleLeading: 'WHAT A FIXED RATE',
    titleLeadingNy: 'ZOMWE KUSASINTHA MTENGO WA DOLA',
    titleHighlight: 'TRIGGERS',
    titleHighlightNy: 'KUMABWERETSA',
    subtitle: 'See why a fixed rate creates US dollar shortages.',
    subtitleNy: 'Onani chifukwa chomwe mtengo wosasuntha umabweretsera kusowa kwa madola.',
    steps: [
      {
        id: 'fx-c1',
        leadWord: 'FIXED RATE',
        leadWordNy: 'MTENGO WOSASUNTHA',
        trigger: 'keeps bank USD artificially low',
        triggerNy: 'umasunga mtengo pansi ku banki',
        leadsTo:
          'When bank rates stay fixed, fewer US dollars flow into official banks.',
        leadsToNy:
          'Mtengo ukauma ku banki, madola ochepa ndi omwe amalowa m’mabanki.',
      },
      {
        id: 'fx-c2',
        leadWord: '~9 DAYS COVER',
        leadWordNy: 'MASIKU ~9 OKHA',
        trigger: 'leaves dollar savings very thin',
        triggerNy: 'kumasiya madola ali ochepa',
        leadsTo:
          'Dollar reserves dropped to 0.3 months instead of the safe 3-month buffer.',
        leadsToNy:
          'Nkhokwe ya madola inatsika kufika miyezi 0.3 m’malo mwa miyezi 3.',
      },
      {
        id: 'fx-c3',
        leadWord: '~130% GAP',
        leadWordNy: 'KUSIYANA ~130%',
        trigger: 'pushes trading to the street',
        triggerNy: 'kumapita ku msika wam’mbali',
        leadsTo:
          'Traders end up paying more than double on the street to buy goods.',
        leadsToNy:
          'Amalonda amalipira kuwirikiza kawiri m’misewu kuti agule katundu.',
      },
      {
        id: 'fx-c4',
        leadWord: 'IMPORT DELAYS',
        leadWordNy: 'KUCHEDWA KWA KATUNDU',
        trigger: 'slow factories and growth',
        triggerNy: 'kumachedwetsa mafakitale',
        leadsTo:
          'Waiting months for dollars delays spare parts, slowing factories and jobs.',
        leadsToNy:
          'Kudikira madola kumachedwetsa masipeya, mafakitale, ndi ntchito.',
      },
    ],
  },
  'government-spending': {
    titleLeading: 'WHAT BUDGET CHOICES',
    titleLeadingNy: 'ZOMWE ZISANKHO ZA BAJETI',
    titleHighlight: 'CHANGE',
    titleHighlightNy: 'ZIMASINTHA',
    subtitle: 'See how taxes and budget limits shape public services.',
    subtitleNy: 'Onani momwe misonkho ndi bajeti zimasinthira chitukuko.',
    steps: [
      {
        id: 'gov-c1',
        leadWord: '17.5% VAT & E-TAX',
        leadWordNy: 'VAT YA 17.5%',
        trigger: 'brings in more tax money',
        triggerNy: 'imabweretsa misonkho yambiri',
        leadsTo:
          'Higher VAT and digital receipts raise revenue without printing extra cash.',
        leadsToNy:
          'VAT ya 17.5% ndi makina a misonkho zimakweza ndalama popanda kusindikiza.',
      },
      {
        id: 'gov-c2',
        leadWord: 'WITHIN LIMIT',
        leadWordNy: 'MKATI MWA BAJETI',
        trigger: 'shrinks gap to 8.8%',
        triggerNy: 'kumachepetsa kuperewera 8.8%',
        leadsTo:
          'Government stayed inside Parliament’s approved budget for the first time in 5 years.',
        leadsToNy:
          'Boma linatsata bajeti yake kwa nthawi yoyamba m’zaka zisanu.',
      },
      {
        id: 'gov-c3',
        leadWord: 'BUILDING CUTS',
        leadWordNy: 'KUCHEPA KWA ZOMANGA',
        trigger: 'delay new roads & clinics',
        triggerNy: 'kumachedwetsa misewu',
        leadsTo:
          'Because wages and debt interest come first, new building budgets get squeezed.',
        leadsToNy:
          'Malipiro ndi ngongole zikayamba, ndalama za misewu ndi zipatala zimachepa.',
      },
      {
        id: 'gov-c4',
        leadWord: 'SMALLER GAP',
        leadWordNy: 'BAJETI YOYENERA',
        trigger: 'slows future debt growth',
        triggerNy: 'imachepetsa ngongole mtsogolo',
        leadsTo:
          'Smaller borrowing gaps ease inflation and protect money for public services.',
        leadsToNy:
          'Kuchepetsa kubwereka kumachepetsa kukwera mitengo ndi kuteteza ntchito za anthu.',
      },
    ],
  },
};
