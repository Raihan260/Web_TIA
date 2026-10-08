export const WA_NUMBER = '6285219847122';
export const WA_DISPLAY = '0852-1984-7122';
export const EMAIL = 'admin@fathiakids.com';
export const OPEN_HOURS = 'Senin - Sabtu, 08.00 - 17.00';

export const waLink = (text?: string) =>
  `https://wa.me/${WA_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const STORES = [
  { name: 'Tanah Abang', address: 'Blok A Lt. Ground Los B No.89, Tanah Abang, Jakarta' },
  { name: 'Pasar Jaya Cipulir', address: 'Lt. 1 BKS No. 51, Pasar Jaya Cipulir, Jakarta' },
] as const;

export const mapsLink = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const CATEGORIES = ['Denim Anak Perempuan', 'Gamis Anak Perempuan', 'Gamis Dewasa'] as const;
