export const WA_NUMBER = '6285219847122';
export const WA_DISPLAY = '0852-1984-7122';
export const EMAIL = 'admin@fathiakids.com';
export const OPEN_HOURS = 'Senin - Sabtu, 08.00 - 17.00';

export const waLink = (text?: string) =>
  `https://wa.me/${WA_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

// Setiap kategori punya toko sendiri. Alamat Gamis Dewasa masih DATA DUMMY, ganti dengan alamat asli.
export const STORES = [
  {
    category: 'Denim Anak Perempuan',
    place: 'Pasar Jaya Cipulir',
    address: 'Lt. 1 BKS No. 51, Pasar Jaya Cipulir, Jakarta',
  },
  {
    category: 'Gamis Anak Perempuan',
    place: 'Tanah Abang',
    address: 'Blok A Lt. Ground Los B No. 89, Tanah Abang, Jakarta',
  },
  {
    category: 'Gamis Dewasa',
    place: 'Segera diumumkan',
    address: 'Alamat toko Gamis Dewasa (data contoh), Jakarta',
  },
] as const;

export const storeAnchor = (category: string) =>
  'toko-' + category.toLowerCase().replace(/\s+/g, '-');

export const mapsLink = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const CATEGORIES = ['Denim Anak Perempuan', 'Gamis Anak Perempuan', 'Gamis Dewasa'] as const;
