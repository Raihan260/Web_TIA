export const WA_NUMBER = '6285219847122';
export const WA_DISPLAY = '0852-1984-7122';
export const EMAIL = 'admin@fathiakids.com';
export const OPEN_HOURS = 'Senin - Sabtu, 08.00 - 17.00';

export const waLink = (text?: string) =>
  `https://wa.me/${WA_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

// Setiap kategori punya toko sendiri.
export const STORES = [
  {
    category: 'Denim Anak Perempuan',
    place: 'Tanah Abang',
    mapQuery: 'Pasar Tanah Abang Blok A, Jakarta Pusat',
    // Alamat Denim Anak masih DATA DUMMY, ganti dengan alamat asli.
    address: 'Alamat toko Denim Anak (data contoh), Tanah Abang, Jakarta',
  },
  {
    category: 'Gamis Anak Perempuan',
    place: 'Tanah Abang',
    mapQuery: 'Pasar Tanah Abang Blok B, Jakarta Pusat',
    address: 'Blok B Lt. Ground Los B No. 89, Tanah Abang, Jakarta',
  },
  {
    category: 'Gamis Dewasa',
    place: 'Gedung Metro Tanah Abang',
    mapQuery: 'Pusat Grosir Metro Tanah Abang, Jakarta Pusat',
    address: 'PGMTA Lt. LG Blok B No. 53-55, Tanah Abang, Jakarta',
  },
] as const;

export const storeAnchor = (category: string) =>
  'toko-' + category.toLowerCase().replace(/\s+/g, '-');

export const mapsLink = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const CATEGORIES = ['Denim Anak Perempuan', 'Gamis Anak Perempuan', 'Gamis Dewasa'] as const;

// Kotak krem bertuliskan "Foto menyusul", dipakai untuk produk yang belum berfoto.
// Dibuat sendiri sebagai SVG supaya tidak bergantung pada layanan gambar di luar.
export const PHOTO_PLACEHOLDER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800">' +
      '<rect width="600" height="800" fill="#f1e8d8"/>' +
      '<text x="300" y="400" text-anchor="middle" dominant-baseline="middle" ' +
      'font-family="Figtree, system-ui, sans-serif" font-size="28" fill="#2f2a2d" ' +
      'fill-opacity="0.45">Foto menyusul</text>' +
    '</svg>',
  );

// Satu kalimat pengantar per kategori di beranda. Ubah di sini kalau mau ganti teksnya.
export const CATEGORY_BLURB: Record<string, string> = {
  'Denim Anak Perempuan': 'Dibuat sendiri dengan jahitan rapi dan ukuran yang konsisten antar produksi.',
  'Gamis Anak Perempuan': 'Warna lembut yang mudah dipadukan, nyaman dipakai anak sepanjang hari.',
  'Gamis Dewasa': 'Potongan sederhana untuk pemakaian harian, tersedia sampai ukuran besar.',
};
