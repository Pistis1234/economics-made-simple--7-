import type {HomepageStatItem} from '../types';

export const DEFAULT_HOMEPAGE_STATS: HomepageStatItem[] = [
  {
    id: 'sig-growth',
    numberLabel: '01',
    stat: {en: '2.7%', ny: '2.7%'},
    title: {en: 'Slow Growth', ny: 'Kukula Pang’ono'},
    summary: {
      en: 'Growth beats population (2.6%) by just 0.1%.',
      ny: 'Chuma chikuposa anthu (2.6%) ndi 0.1% yokha.',
    },
    detail: {
      en: '2.7% growth barely passes population growth, keeping household incomes tight.',
      ny: 'Kukula kwa 2.7% kukuposa anthu pang’ono, moyo wa m’banja ukadali wovuta.',
    },
    iconName: 'TrendingUp',
    to: '/learn/economic-growth',
    linkLabel: {
      en: 'Open Summary',
      ny: 'Tsegulani Chidule',
    },
  },
  {
    id: 'sig-engines',
    numberLabel: '02',
    stat: {en: 'Services', ny: 'Ntchito'},
    title: {en: 'Two Engines', ny: 'Njira Ziwiri'},
    summary: {
      en: 'Banks and better harvests drive 2026 growth.',
      ny: 'Mabanki ndi zokolola zabwino zikukweza chuma.',
    },
    detail: {
      en: 'Finance and rebounding farms lift GDP while factories wait on dollars.',
      ny: 'Mabanki ndi ulimi zikuthandiza chuma pamene mafakitale akudikira madola.',
    },
    iconName: 'Sprout',
    to: '/learn/agriculture',
    linkLabel: {
      en: 'Open Summary',
      ny: 'Tsegulani Chidule',
    },
  },
  {
    id: 'sig-firms',
    numberLabel: '03',
    stat: {en: '< 50%', ny: '< 50%'},
    title: {en: 'Stalled Firms', ny: 'Mafakitale Ochedwa'},
    summary: {
      en: 'Over half of firms run below half capacity.',
      ny: 'Mabizinesi opitilira theka akugwira ntchito pansi pa 50%.',
    },
    detail: {
      en: 'Scarce US dollars and power cuts keep factories running below half speed.',
      ny: 'Kusowa kwa madola ndi magetsi zikulepheretsa mafakitale.',
    },
    iconName: 'Factory',
    to: '/learn/exchange-rates',
    linkLabel: {
      en: 'See Why',
      ny: 'Onani Chifukwa',
    },
  },
  {
    id: 'sig-youth',
    numberLabel: '04',
    stat: {en: '24.0%', ny: '24.0%'},
    title: {en: 'Jobs & Food', ny: 'Ntchito & Chakudya'},
    summary: {
      en: 'Under 4% of youth hold formal jobs; food stress rose.',
      ny: 'Ochepera 4% ya achinyamata ali ndi ntchito zokhazikika; chakudya chavuta.',
    },
    detail: {
      en: 'Nearly 90% of youth can read, yet most rely on ganyu while 24.0% face food stress.',
      ny: 'Pafupifupi 90% ya achinyamata amatha kuwerenga, koma ambiri amadalira ganyu.',
    },
    iconName: 'Briefcase',
    to: '/learn/employment',
    linkLabel: {
      en: 'Open Summary',
      ny: 'Tsegulani Chidule',
    },
  },
];
