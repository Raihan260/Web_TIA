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
// ATURAN HARGA
// =========================================
const denimSeriesOptions: SeriesOption[] = [
  { name: 'Seri 1 (Uk. 4, 5, 6)', pricePerPiece: 80000, totalPrice: 240000 },
  { name: 'Seri 2 (Uk. 7, 8, 9)', pricePerPiece: 82500, totalPrice: 247500 },
  { name: 'Seri 3 (Uk. 10, 11, 12)', pricePerPiece: 85000, totalPrice: 255000 },
  { name: 'Seri 4 (Uk. 13, 14, 15)', pricePerPiece: 90000, totalPrice: 270000 },
];

const shortDenimSeriesOptions: SeriesOption[] = [
  { name: 'Seri 1 (Uk. 4, 5, 6)', pricePerPiece: 60000, totalPrice: 180000 },
  { name: 'Seri 2 (Uk. 7, 8, 9)', pricePerPiece: 62500, totalPrice: 187500 },
  { name: 'Seri 3 (Uk. 10, 11, 12)', pricePerPiece: 65000, totalPrice: 195000 },
  { name: 'Seri 4 (Uk. 13, 14, 15)', pricePerPiece: 70000, totalPrice: 210000 },
];

const cottonSeriesOptions: SeriesOption[] = [
  { name: 'Seri 1 (Uk. 4, 5, 6)', pricePerPiece: 70000, totalPrice: 210000 },
  { name: 'Seri 2 (Uk. 7, 8, 9)', pricePerPiece: 72500, totalPrice: 217500 },
  { name: 'Seri 3 (Uk. 10, 11, 12)', pricePerPiece: 75000, totalPrice: 225000 },
  { name: 'Seri 4 (Uk. 13, 14, 15)', pricePerPiece: 80000, totalPrice: 240000 },
];

const skirtSeriesOptions: SeriesOption[] = [
  { name: 'Seri 1 (Uk. 4, 5, 6)', pricePerPiece: 75000, totalPrice: 225000 },
  { name: 'Seri 2 (Uk. 7, 8, 9)', pricePerPiece: 77500, totalPrice: 232500 },
  { name: 'Seri 3 (Uk. 10, 11, 12)', pricePerPiece: 80000, totalPrice: 240000 },
  { name: 'Seri 4 (Uk. 13, 14, 15)', pricePerPiece: 85000, totalPrice: 255000 },
];

const gamisSeriesOptions: SeriesOption[] = [
  { name: 'Seri Kecil (Size 2, 4, 6)', pricePerPiece: 65000, totalPrice: 195000 },
  { name: 'Seri Tanggung (Size 8, 10, 12)', pricePerPiece: 70000, totalPrice: 210000 },
  { name: 'Seri Besar (Size 14, 16, 18)', pricePerPiece: 75000, totalPrice: 225000 },
];

// =========================================
// DATA PRODUK LENGKAP
// =========================================
export const products: Product[] = [
  // ---------------------------------------------------------
  // KATEGORI DENIM PANJANG (Skena, Cutbray, Cargo, Pop)
  // ---------------------------------------------------------
  {
    id: 'jeans-skena-5017',
    name: 'Celana Jeans Skena (Kd: 5017)',
    category: 'Denim Panjang',
    imageUrl: '/images/Celana-jeans-skena-Kd-5017.jpg',
    tags: ['Best Seller', 'Jeans Skena'],
    seriesOptions: denimSeriesOptions.slice(0, 3), // Khusus ini cuma 3 seri
  },
  {
    id: 'jeans-skena-5004',
    name: 'Celana Jeans Skena (Kd: 5004)',
    category: 'Denim Panjang',
    imageUrl: '/images/Celana-jeans-skena-Kd-5004.jpg',
    tags: ['Jeans Skena'],
    seriesOptions: denimSeriesOptions,
  },
  {
    id: 'jeans-skena-5008',
    name: 'Celana Jeans Skena (Kd: 5008)',
    category: 'Denim Panjang',
    imageUrl: '/images/Celana-jeans-skena-Kd-5008.jpg',
    tags: ['Jeans Skena'],
    seriesOptions: denimSeriesOptions,
  },
  {
    id: 'jeans-skena-5012',
    name: 'Celana Jeans Skena (Kd: 5012)',
    category: 'Denim Panjang',
    imageUrl: '/images/Celana-jeans-skena-Kd-5012.jpg',
    tags: ['Jeans Skena'],
    seriesOptions: denimSeriesOptions,
  },
  {
    id: 'jeans-skena-5019',
    name: 'Celana Jeans Skena (Kd: 5019)',
    category: 'Denim Panjang',
    imageUrl: '/images/Celana-jeans-skena-Kd-5019.jpg',
    tags: ['Jeans Skena'],
    seriesOptions: denimSeriesOptions,
  },
  {
    id: 'jeans-skena-5035',
    name: 'Celana Jeans Skena (Kd: 5035)',
    category: 'Denim Panjang',
    imageUrl: '/images/Celana-jeans-skena-Kd-5035.jpg',
    tags: ['Jeans Skena'],
    seriesOptions: denimSeriesOptions,
  },
  {
    id: 'jeans-skena-5036',
    name: 'Celana Jeans Skena (Kd: 5036)',
    category: 'Denim Panjang',
    imageUrl: '/images/Celana-jeans-skena-Kd-5036.jpg',
    tags: ['Jeans Skena'],
    seriesOptions: denimSeriesOptions,
  },
  {
    id: 'jeans-skena-5037',
    name: 'Celana Jeans Skena (Kd: 5037)',
    category: 'Denim Panjang',
    imageUrl: '/images/Celana-jeans-skena-Kd-5037.jpg',
    tags: ['Jeans Skena'],
    seriesOptions: denimSeriesOptions,
  },
  {
    id: 'jeans-skena-5038',
    name: 'Celana Jeans Skena (Kd: 5038)',
    category: 'Denim Panjang',
    imageUrl: '/images/Celana-jeans-skena-Kd-5038.jpg',
    tags: ['Jeans Skena'],
    seriesOptions: denimSeriesOptions,
  },
  {
    id: 'jeans-skena-5049',
    name: 'Celana Jeans Skena (Kd: 5049)',
    category: 'Denim Panjang',
    imageUrl: '/images/Celana-jeans-skena-Kd-5049.jpg',
    tags: ['Jeans Skena'],
    seriesOptions: denimSeriesOptions,
  },
  {
    id: 'jeans-skena-8011',
    name: 'Celana Jeans Skena (Kd: 8011)',
    category: 'Denim Panjang',
    imageUrl: '/images/Celana-jeans-skena-Kd-8011.jpg',
    tags: ['Jeans Skena'],
    seriesOptions: denimSeriesOptions,
  },
  {
    id: 'jeans-skena-8021',
    name: 'Celana Jeans Skena (Kd: 8021)',
    category: 'Denim Panjang',
    imageUrl: '/images/Celana-jeans-skena-Kd-8021.jpg',
    tags: ['Jeans Skena'],
    seriesOptions: denimSeriesOptions,
  },
  {
    id: 'jeans-skena-8022',
    name: 'Celana Jeans Skena (Kd: 8022)',
    category: 'Denim Panjang',
    imageUrl: '/images/Celana-jeans-skena-Kd-8022.jpg',
    tags: ['Jeans Skena'],
    seriesOptions: denimSeriesOptions,
  },
  {
    id: 'jeans-skena-8023',
    name: 'Celana Jeans Skena (Kd: 8023)',
    category: 'Denim Panjang',
    imageUrl: '/images/Celana-jeans-skena-Kd-8023.jpg',
    tags: ['Jeans Skena'],
    seriesOptions: denimSeriesOptions,
  },
  {
    id: 'jeans-skena-8024',
    name: 'Celana Jeans Skena (Kd: 8024)',
    category: 'Denim Panjang',
    imageUrl: '/images/Celana-jeans-skena-Kd-8024.jpg',
    tags: ['Jeans Skena'],
    seriesOptions: denimSeriesOptions,
  },
  {
    id: 'jeans-skena-8025',
    name: 'Celana Jeans Skena (Kd: 8025)',
    category: 'Denim Panjang',
    imageUrl: '/images/Celana-jeans-skena-Kd-8025.jpg',
    tags: ['Jeans Skena'],
    seriesOptions: denimSeriesOptions,
  },
  {
    id: 'jeans-skena-8027',
    name: 'Celana Jeans Skena (Kd: 8027)',
    category: 'Denim Panjang',
    imageUrl: '/images/Celana-jeans-skena-Kd-8027.jpg',
    tags: ['Jeans Skena'],
    seriesOptions: denimSeriesOptions,
  },
  {
    id: 'jeans-skena-8040',
    name: 'Celana Jeans Skena (Kd: 8040)',
    category: 'Denim Panjang',
    imageUrl: '/images/Celana-jeans-skena-Kd-8040.jpg',
    tags: ['Jeans Skena'],
    seriesOptions: denimSeriesOptions,
  },
  {
    id: 'jeans-skena-8041',
    name: 'Celana Jeans Skena (Kd: 8041)',
    category: 'Denim Panjang',
    imageUrl: '/images/Celana-jeans-skena-Kd-8041.jpg',
    tags: ['Best Seller', 'Jeans Skena'],
    seriesOptions: denimSeriesOptions,
  },
  {
    id: 'jeans-skena-8042',
    name: 'Celana Jeans Skena (Kd: 8042)',
    category: 'Denim Panjang',
    imageUrl: '/images/Celana-jeans-skena-Kd-8042.jpg',
    tags: ['Jeans Skena'],
    seriesOptions: denimSeriesOptions,
  },
  {
    id: 'jeans-skena-8044',
    name: 'Celana Jeans Skena (Kd: 8044)',
    category: 'Denim Panjang',
    imageUrl: '/images/Celana-jeans-skena-Kd-8044.jpg',
    tags: ['Jeans Skena'],
    seriesOptions: denimSeriesOptions,
  },
  {
    id: 'jeans-skena-8047',
    name: 'Celana Jeans Skena (Kd: 8047)',
    category: 'Denim Panjang',
    imageUrl: '/images/Celana-jeans-skena-Kd-8047.jpg',
    tags: ['Jeans Skena'],
    seriesOptions: denimSeriesOptions,
  },
  {
    id: 'jeans-skena-8051',
    name: 'Celana Jeans Skena (Kd: 8051)',
    category: 'Denim Panjang',
    imageUrl: '/images/Celana-jeans-skena- Kode-8051.jpg',
    tags: ['Jeans Skena'],
    seriesOptions: denimSeriesOptions,
  },
  {
    id: 'jeans-skena-839',
    name: 'Celana Jeans Skena (Kd: 839)',
    category: 'Denim Panjang',
    imageUrl: '/images/Celana-jeans-skena-Kd-839.jpg',
    tags: ['Jeans Skena'],
    seriesOptions: denimSeriesOptions,
  },
  {
    id: 'jeans-skena-845',
    name: 'Celana Jeans Skena (Kd: 845)',
    category: 'Denim Panjang',
    imageUrl: '/images/Celana-jeans-skena-Kd-845.jpg',
    tags: ['Jeans Skena'],
    seriesOptions: denimSeriesOptions,
  },
  {
    id: 'jeans-cutbray-5003',
    name: 'Celana Jeans Cutbray (Kd: 5003)',
    category: 'Denim Panjang',
    imageUrl: '/images/Celana-jeans-cutbray-Kd-5003.jpg',
    tags: ['Cutbray', 'Hits'],
    seriesOptions: denimSeriesOptions,
  },
  {
    id: 'jeans-cutbray-5043',
    name: 'Celana Jeans Cutbray (Kd: 5043)',
    category: 'Denim Panjang',
    imageUrl: '/images/Celana-jeans-cutbray-Kd-5043.jpg',
    tags: ['Cutbray', 'Bahan Melar'],
    seriesOptions: denimSeriesOptions,
  },
  {
    id: 'jeans-cargo',
    name: 'Celana Cargo Denim',
    category: 'Denim Panjang',
    imageUrl: '/images/Celana-Cargo-Kd--.jpg',
    tags: ['Cargo Style', 'Banyak Kantong'],
    seriesOptions: denimSeriesOptions,
  },
  {
    id: 'jeans-pop-849',
    name: 'Celana Jeans Pop (Kd: 849)',
    category: 'Denim Panjang',
    imageUrl: '/images/Celana-jeans-pop-Kd-849.jpg',
    tags: ['Pop Style'],
    seriesOptions: denimSeriesOptions,
  },

  // ---------------------------------------------------------
  // KATEGORI DENIM PENDEK
  // ---------------------------------------------------------
  {
    id: 'jeans-pendek-338',
    name: 'Celana Jeans Pendek (Kd: 338)',
    category: 'Denim Pendek',
    imageUrl: '/images/Celana-jeans-pendek-Kd-338.jpg',
    tags: ['Santai', 'Nyaman'],
    seriesOptions: shortDenimSeriesOptions,
  },
  {
    id: 'jeans-pendek-818',
    name: 'Celana Jeans Pendek (Kd: 818)',
    category: 'Denim Pendek',
    imageUrl: '/images/Celana-jeans-pendek-Kd-818.jpg',
    tags: ['Santai'],
    seriesOptions: shortDenimSeriesOptions,
  },
  {
    id: 'jeans-pendek-819',
    name: 'Celana Jeans Pendek (Kd: 819)',
    category: 'Denim Pendek',
    imageUrl: '/images/Celana-jeans-pendek-Kd-819.jpg',
    tags: ['Santai'],
    seriesOptions: shortDenimSeriesOptions,
  },
  {
    id: 'jeans-pendek-841',
    name: 'Celana Jeans Pendek (Kd: 841)',
    category: 'Denim Pendek',
    imageUrl: '/images/Celana-jeans-pendek-Kd-841.jpg',
    tags: ['Best Seller Pendek'],
    seriesOptions: shortDenimSeriesOptions,
  },

  // ---------------------------------------------------------
  // KATEGORI CELANA KATUN
  // ---------------------------------------------------------
  {
    id: 'katun-skena-5039',
    name: 'Celana Katun Skena (Kd: 5039)',
    category: 'Celana Katun',
    imageUrl: '/images/Celana-katun-skena-Kode-5039.jpg',
    tags: ['Bahan Adem'],
    seriesOptions: cottonSeriesOptions,
  },
  {
    id: 'katun-skena-ka',
    name: 'Celana Katun Skena (Kd: KA)',
    category: 'Celana Katun',
    imageUrl: '/images/Celanakatun-Kode-KA.jpg',
    tags: ['Nyaman', 'Harian'],
    seriesOptions: cottonSeriesOptions,
  },

  // ---------------------------------------------------------
  // KATEGORI GAMIS & ROK DENIM (DUMMY SEMENTARA)
  // ---------------------------------------------------------
  {
    id: 'gamis-anak-motif',
    name: 'Gamis Anak Motif Premium',
    category: 'Gamis',
    imageUrl: 'https://via.placeholder.com/400x500.png?text=FOTO+GAMIS',
    tags: ['Adem', 'Bahan Rayon'],
    seriesOptions: gamisSeriesOptions,
  },
  {
    id: 'rok-denim-anak',
    name: 'Rok Denim Anak Fashion',
    category: 'Rok Denim',
    imageUrl: 'https://via.placeholder.com/400x500.png?text=FOTO+ROK+DENIM',
    tags: ['Feminim', 'Lucu'],
    seriesOptions: skirtSeriesOptions,
  }
];