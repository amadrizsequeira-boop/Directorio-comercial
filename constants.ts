import { Category, Business } from './types';
import { 
  Utensils, 
  Palette, 
  Car, 
  Scissors, 
  PartyPopper, 
  Home, 
  Wrench, 
  Dog, 
  Shirt, 
  HeartPulse, 
  Laptop, 
  FileText 
} from 'lucide-react';

export const CATEGORY_ICONS: Record<string, any> = {
  [Category.FOOD]: Utensils,
  [Category.CRAFTS]: Palette,
  [Category.AUTOMOTIVE]: Car,
  [Category.BEAUTY]: Scissors,
  [Category.EVENTS]: PartyPopper,
  [Category.HOME]: Home,
  [Category.MAINTENANCE]: Wrench,
  [Category.PETS]: Dog,
  [Category.CLOTHING]: Shirt,
  [Category.HEALTH]: HeartPulse,
  [Category.TECH]: Laptop,
  [Category.OTHER]: FileText,
};

export const INITIAL_BUSINESSES: Business[] = [
  {
    id: '1',
    name: 'Panadería La Espiga',
    category: Category.FOOD,
    description: 'El mejor pan artesanal de la comunidad. Ofrecemos pasteles para toda ocasión y un ambiente familiar.',
    logo: 'https://picsum.photos/100/100?random=1',
    photos: [
      'https://picsum.photos/600/400?random=101',
      'https://picsum.photos/600/400?random=102',
      'https://picsum.photos/600/400?random=103'
    ],
    phone: '+52 555 123 4567',
    email: 'contacto@laespiga.com',
    address: 'Av. Principal #123, Centro',
    hours: 'Lun-Sáb: 7:00 AM - 9:00 PM',
    rating: 4.8,
    reviewCount: 124,
    reviews: [],
    location: 'Centro'
  },
  {
    id: '2',
    name: 'Taller Mecánico Veloz',
    category: Category.AUTOMOTIVE,
    description: 'Servicio completo de mantenimiento automotriz. Frenos, afinación, suspensión y diagnóstico por computadora.',
    logo: 'https://picsum.photos/100/100?random=2',
    photos: [
      'https://picsum.photos/600/400?random=104',
      'https://picsum.photos/600/400?random=105'
    ],
    phone: '+52 555 987 6543',
    email: 'citas@tallerveloz.com',
    address: 'Calle Roble #45, Zona Industrial',
    hours: 'Lun-Vie: 9:00 AM - 6:00 PM',
    rating: 4.5,
    reviewCount: 56,
    reviews: [],
    location: 'Zona Industrial'
  },
  {
    id: '3',
    name: 'Estética Glamour',
    category: Category.BEAUTY,
    description: 'Expertos en colorimetría, cortes modernos y tratamientos capilares. ¡Realza tu belleza con nosotros!',
    logo: 'https://picsum.photos/100/100?random=3',
    photos: [
      'https://picsum.photos/600/400?random=106',
      'https://picsum.photos/600/400?random=107',
      'https://picsum.photos/600/400?random=108'
    ],
    phone: '+52 555 111 2222',
    email: 'citas@glamour.com',
    address: 'Plaza Las Flores, Local 4',
    hours: 'Mar-Dom: 10:00 AM - 7:00 PM',
    rating: 4.9,
    reviewCount: 89,
    reviews: [],
    location: 'Norte'
  }
];

export const LOCATIONS = ['Centro', 'Norte', 'Sur', 'Este', 'Oeste', 'Zona Industrial'];