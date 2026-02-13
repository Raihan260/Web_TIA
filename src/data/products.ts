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

const baseSeriesOptions: SeriesOption[] = [
  {
    name: 'Seri 1 (Uk. 4, 5, 6)',
    pricePerPiece: 80000,
    totalPrice: 240000,
  },
  {
    name: 'Seri 2 (Uk. 7, 8, 9)',
    pricePerPiece: 82500,
    totalPrice: 247500,
  },
  {
    name: 'Seri 3 (Uk. 10, 11, 12)',
    pricePerPiece: 85000,
    totalPrice: 255000,
  },
  {
    name: 'Seri 4 (Uk. 13, 14, 15)',
    pricePerPiece: 90000,
    totalPrice: 270000,
  },
];

export const products: Product[] = [
  {
    id: 'denim-amelia-basic',
    name: 'Celana Denim Amelia Basic',
    category: 'Denim Panjang',
    tags: ['Best Seller', 'Nyaman Dipakai', 'Mudah Dipadu'],
    seriesOptions: baseSeriesOptions,
  },
  {
    id: 'denim-naya-slim',
    name: 'Celana Denim Naya Slim Fit',
    category: 'Denim Panjang',
    tags: ['Rapi & Modis', 'Cocok Untuk Sekolah'],
    seriesOptions: baseSeriesOptions,
  },
  {
    id: 'denim-salsa-straight',
    name: 'Celana Denim Salsa Straight',
    category: 'Denim Panjang',
    tags: ['Model Favorit Ibu', 'Tidak Ketat', 'Gerak Bebas'],
    seriesOptions: baseSeriesOptions,
  },
  {
    id: 'gamis-alia-syari',
    name: 'Gamis Anak Alia Syari',
    category: 'Gamis',
    tags: ['Busui Friendly', 'Lembut & Ringan'],
    seriesOptions: baseSeriesOptions,
  },
  {
    id: 'denim-pendek-luna',
    name: 'Denim Pendek Luna Kids',
    category: 'Denim Pendek',
    tags: ['Santai Harian', 'Tidak Gerah'],
    seriesOptions: baseSeriesOptions,
  },
  {
    id: 'rok-denim-bella',
    name: 'Rok Denim Bella Anak',
    category: 'Rok Denim',
    tags: ['Feminim', 'Cocok Jalan-jalan'],
    seriesOptions: baseSeriesOptions,
  },
  {
    id: 'celana-katun-mira',
    name: 'Celana Katun Mira',
    category: 'Celana Katun',
    tags: ['Bahan Adem', 'Cocok Untuk Rumah'],
    seriesOptions: baseSeriesOptions,
  },
];
