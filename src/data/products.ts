export interface SeriesOption {
  name: string;
  pricePerPiece: number;
  totalPrice: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  imageUrl?: string;
  tags?: string[];
  seriesOptions: SeriesOption[];
}

// =========================================
// 1. ATURAN HARGA DENIM PANJANG (Standar)
// Mulai Rp 80.000
// =========================================
const denimSeriesOptions: SeriesOption[] = [
  { name: 'Seri 1 (Uk. 4, 5, 6)', pricePerPiece: 80000, totalPrice: 240000 },
  { name: 'Seri 2 (Uk. 7, 8, 9)', pricePerPiece: 82500, totalPrice: 247500 },
  { name: 'Seri 3 (Uk. 10, 11, 12)', pricePerPiece: 85000, totalPrice: 255000 },
  { name: 'Seri 4 (Uk. 13, 14, 15)', pricePerPiece: 90000, totalPrice: 270000 },
];

// =========================================
// 2. ATURAN HARGA GAMIS ANAK
// Mulai Rp 65.000 (Ukuran Umur)
// =========================================
const gamisSeriesOptions: SeriesOption[] = [
  { name: 'Seri Kecil (Size 2, 4, 6)', pricePerPiece: 65000, totalPrice: 195000 },
  { name: 'Seri Tanggung (Size 8, 10, 12)', pricePerPiece: 70000, totalPrice: 210000 },
  { name: 'Seri Besar (Size 14, 16, 18)', pricePerPiece: 75000, totalPrice: 225000 },
];

// =========================================
// 3. ATURAN HARGA DENIM PENDEK
// Mulai Rp 60.000
// =========================================
const shortDenimSeriesOptions: SeriesOption[] = [
  { name: 'Seri 1 (Uk. 4, 5, 6)', pricePerPiece: 60000, totalPrice: 180000 },
  { name: 'Seri 2 (Uk. 7, 8, 9)', pricePerPiece: 62500, totalPrice: 187500 },
  { name: 'Seri 3 (Uk. 10, 11, 12)', pricePerPiece: 65000, totalPrice: 195000 },
  { name: 'Seri 4 (Uk. 13, 14, 15)', pricePerPiece: 70000, totalPrice: 210000 },
];

// =========================================
// 4. ATURAN HARGA ROK DENIM
// Mulai Rp 75.000
// =========================================
const skirtSeriesOptions: SeriesOption[] = [
  { name: 'Seri 1 (Uk. 4, 5, 6)', pricePerPiece: 75000, totalPrice: 225000 },
  { name: 'Seri 2 (Uk. 7, 8, 9)', pricePerPiece: 77500, totalPrice: 232500 },
  { name: 'Seri 3 (Uk. 10, 11, 12)', pricePerPiece: 80000, totalPrice: 240000 },
  { name: 'Seri 4 (Uk. 13, 14, 15)', pricePerPiece: 85000, totalPrice: 255000 },
];

// =========================================
// 5. ATURAN HARGA CELANA KATUN
// Mulai Rp 70.000
// =========================================
const cottonSeriesOptions: SeriesOption[] = [
  { name: 'Seri 1 (Uk. 4, 5, 6)', pricePerPiece: 70000, totalPrice: 210000 },
  { name: 'Seri 2 (Uk. 7, 8, 9)', pricePerPiece: 72500, totalPrice: 217500 },
  { name: 'Seri 3 (Uk. 10, 11, 12)', pricePerPiece: 75000, totalPrice: 225000 },
  { name: 'Seri 4 (Uk. 13, 14, 15)', pricePerPiece: 80000, totalPrice: 240000 },
];

export const products: Product[] = [
  // --- DENIM PANJANG ---
  {
    id: 'denim-amelia-basic',
    name: 'Celana Denim Amelia Basic',
    category: 'Denim Panjang',
    imageUrl: 'https://via.placeholder.com/400x300.png?text=Denim+Amelia',
    tags: ['Best Seller', 'Nyaman Dipakai', 'Mudah Dipadu'],
    seriesOptions: denimSeriesOptions,
  },
  {
    id: 'denim-naya-slim',
    name: 'Celana Denim Naya Slim Fit',
    category: 'Denim Panjang',
    tags: ['Rapi & Modis', 'Cocok Untuk Sekolah'],
    seriesOptions: denimSeriesOptions,
  },
  {
    id: 'denim-salsa-straight',
    name: 'Celana Denim Salsa Straight',
    category: 'Denim Panjang',
    tags: ['Model Favorit Ibu', 'Tidak Ketat', 'Gerak Bebas'],
    seriesOptions: denimSeriesOptions,
  },

  // --- GAMIS ---
  {
    id: 'gamis-alya-motif',
    name: 'Gamis Anak Alya Motif Bunga',
    category: 'Gamis',
    imageUrl: 'https://via.placeholder.com/400x500.png?text=Gamis+Alya',
    tags: ['Bahan Katun Rayon', 'Adem', 'Termasuk Jilbab'],
    seriesOptions: gamisSeriesOptions,
  },
  {
    id: 'gamis-polos-premium',
    name: 'Gamis Polos Premium Kids',
    category: 'Gamis',
    tags: ['Warna Pastel', 'Kualitas Butik'],
    seriesOptions: gamisSeriesOptions,
  },

  // --- DENIM PENDEK ---
  {
    id: 'denim-pendek-luna',
    name: 'Denim Pendek Luna Kids',
    category: 'Denim Pendek',
    tags: ['Santai Harian', 'Tidak Gerah', 'Karet Pinggang'],
    seriesOptions: shortDenimSeriesOptions, // <-- Pakai aturan harga 60rb
  },

  // --- ROK DENIM ---
  {
    id: 'rok-denim-bella',
    name: 'Rok Denim Bella Anak',
    category: 'Rok Denim',
    tags: ['Feminim', 'Cocok Jalan-jalan', 'Aplikasi Bordir'],
    seriesOptions: skirtSeriesOptions, // <-- Pakai aturan harga 75rb
  },

  // --- CELANA KATUN ---
  {
    id: 'celana-katun-mira',
    name: 'Celana Katun Mira',
    category: 'Celana Katun',
    tags: ['Bahan Adem', 'Cocok Untuk Rumah', 'Warna Cerah'],
    seriesOptions: cottonSeriesOptions, // <-- Pakai aturan harga 70rb
  },
];