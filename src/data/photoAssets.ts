export const PHOTO_ASSETS = {
  harvestHills: '/assets/aistudio/backdrop_harvest_agriculture_1795599804243_53f6d1bb.jpg',
  tailorShop: '/assets/aistudio/backdrop_small_business_1795599806065_601f5dfe.jpg',
  solarGrid: '/assets/aistudio/backdrop_solar_infrastructure_1795599804685_56357cf5.jpg',
  freightHighway: '/assets/aistudio/backdrop_trade_freight_1795599805434_5212e51e.jpg',
  farmersVegetables: '/assets/aistudio/WhatsApp_Image_2026-11-25_at__7c349d2b.jpeg',
  workshopJobs: '/assets/aistudio/WhatsApp_Image_2026-11-25_at_1_933c4b26.jpeg',
  forexBureau: '/assets/aistudio/WhatsApp_Image_2026-11-25_at_16._87576b25.jpeg',
  publicDebtParliament: '/assets/aistudio/WhatsApp_Image_2026-11-25_at_16.5_f9dd4e37.jpeg',
  maizeFarmerTractor: '/assets/aistudio/WhatsApp_Image_2026-11-25_at_16.59._5f520f74.jpeg',
  maizePlowing: '/assets/aistudio/WhatsApp_Image_2026-11-25_at_16.59.3_7cc8d244.jpeg',
  inequalityContrast: '/assets/aistudio/WhatsApp_Image_2026-11-25_at_16.59.32_aa9ec717.jpeg',
  portCargoShip: '/assets/aistudio/WhatsApp_Image_2026-11-25_at_16.59.34_f2f099fc.jpeg',
  marketPriceSigns: '/assets/aistudio/WhatsApp_Image_2026-11-25_at_16.59.33_921d2fc0.jpeg',
  marketBaskets: '/assets/aistudio/hero_malawi_market_1795599803692_9ce59c6a.jpg',
  youthLiteracy: '/src/assets/images/youth_education_graduates_1795350159594.jpg',
} as const;

export function getTopicPhoto(slug: string): string {
  switch (slug) {
    case 'economic-growth':
      return PHOTO_ASSETS.harvestHills;
    case 'inflation':
      return PHOTO_ASSETS.marketPriceSigns;
    case 'public-debt':
      return PHOTO_ASSETS.publicDebtParliament;
    case 'trade-and-imports':
      return PHOTO_ASSETS.portCargoShip;
    case 'employment':
      return PHOTO_ASSETS.workshopJobs;
    case 'agriculture':
      return PHOTO_ASSETS.maizeFarmerTractor;
    case 'exchange-rates':
      return PHOTO_ASSETS.forexBureau;
    case 'government-spending':
      return PHOTO_ASSETS.publicDebtParliament;
    default:
      return PHOTO_ASSETS.marketBaskets;
  }
}

export function getRecommendationPhoto(
  id: string,
  category: string,
  headingText: string
): string {
  const text = `${id} ${headingText}`.toLowerCase();
  if (text.includes('forex') || text.includes('exchange')) {
    return PHOTO_ASSETS.forexBureau;
  }
  if (text.includes('debt') || text.includes('interest')) {
    return PHOTO_ASSETS.publicDebtParliament;
  }
  if (text.includes('tax') || text.includes('revenue')) {
    return PHOTO_ASSETS.tailorShop;
  }
  if (text.includes('power') || text.includes('energy') || text.includes('electric')) {
    return PHOTO_ASSETS.solarGrid;
  }
  if (text.includes('export') || text.includes('trade') || text.includes('border')) {
    return PHOTO_ASSETS.portCargoShip;
  }
  if (text.includes('seed') || text.includes('agri') || text.includes('fertilizer') || text.includes('maize')) {
    return PHOTO_ASSETS.maizeFarmerTractor;
  }

  switch (category) {
    case 'Economic stability':
      return PHOTO_ASSETS.marketBaskets;
    case 'Public finances':
      return PHOTO_ASSETS.publicDebtParliament;
    case 'Agriculture':
      return PHOTO_ASSETS.farmersVegetables;
    case 'Trade and investment':
      return PHOTO_ASSETS.freightHighway;
    case 'Jobs and businesses':
      return PHOTO_ASSETS.workshopJobs;
    default:
      return PHOTO_ASSETS.harvestHills;
  }
}
