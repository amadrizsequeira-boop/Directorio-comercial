export enum Category {
  FOOD = 'Alimentos',
  CRAFTS = 'Artesanías',
  AUTOMOTIVE = 'Automotriz',
  BEAUTY = 'Belleza',
  EVENTS = 'Eventos',
  HOME = 'Hogar',
  MAINTENANCE = 'Mantenimiento',
  PETS = 'Mascotas',
  CLOTHING = 'Ropa',
  HEALTH = 'Salud',
  TECH = 'Tecnología',
  OTHER = 'Otros'
}

export interface Review {
  id: string;
  user: string;
  comment: string;
  rating: number;
  date: string;
}

export interface Business {
  id: string;
  name: string;
  category: Category | string;
  description: string;
  logo: string;
  photos: string[];
  phone: string;
  email: string;
  address: string;
  hours: string;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  location: string; // e.g., "Sector Norte", "Centro"
}

export interface SearchSource {
  title: string;
  uri: string;
}

export interface AIResponse {
  text: string;
  sources: SearchSource[];
}