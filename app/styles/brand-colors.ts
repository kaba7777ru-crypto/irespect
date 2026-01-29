// Brand colors for each business

export const brandColors = {
  irespect: {
    primary: '#5F8575',
    secondary: '#4A6B5F',
    light: '#E8F3EF',
    gradient: 'from-[#5F8575] to-[#4A6B5F]',
    text: '#2D4A3E',
    hover: '#4F7565'
  },
  ritual: {
    primary: '#1E3A5F',
    secondary: '#152C47',
    light: '#E8EDF5',
    gradient: 'from-[#1E3A5F] to-[#152C47]',
    text: '#0F1E33',
    hover: '#2A4A75'
  },
  aires: {
    primary: '#2C3E50',
    secondary: '#1A252F',
    light: '#E8EAED',
    gradient: 'from-[#2C3E50] to-[#1A252F]',
    text: '#161F27',
    hover: '#3C4E60'
  }
};

export type BusinessId = 'irespect' | 'ritual' | 'aires';

export function getBusinessColors(businessId: BusinessId) {
  return brandColors[businessId];
}

export const businessLogos = {
  irespect: '/logos/irespect.svg',
  ritual: '/logos/ritual.svg',
  aires: '/logos/aires.svg'
};

export const businessNames = {
  irespect: {
    full: 'irespect',
    tagline: 'Handwerker-Marktplatz für Deutschland',
    description: 'Marketplace для услуг мастеров'
  },
  ritual: {
    full: 'Ritual-Service24',
    tagline: 'Bestattungsservice + KI-Psychologe',
    description: 'Похоронные услуги с AI поддержкой'
  },
  aires: {
    full: 'AIRES',
    tagline: 'Digitaler Friedhofs-Katalog',
    description: 'Мобильный каталог могил с AR'
  }
};
