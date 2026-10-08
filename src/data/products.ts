export interface SeriesOption {
  name: string;
  pricePerPiece: number;
  pieces?: number;
  totalPrice: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  imageUrl?: string;
  gallery?: string[];
  tags?: string[];
  seriesOptions: SeriesOption[];
  isAvailable?: boolean; // Status stok: true = tersedia, false = habis. Default true.
  isFavorite?: boolean; // true = tampil di bagian "Produk favorit" pada halaman utama.
}

// =========================================
// ATURAN HARGA
// =========================================
export const denimSeriesOptions: SeriesOption[] = [
  { name: 'Seri 1 (Uk. 4, 5, 6)', pricePerPiece: 80000, pieces: 3, totalPrice: 240000 },
  { name: 'Seri 2 (Uk. 7, 8, 9)', pricePerPiece: 82500, pieces: 3, totalPrice: 247500 },
  { name: 'Seri 3 (Uk. 10, 11, 12)', pricePerPiece: 85000, pieces: 3, totalPrice: 255000 },
  { name: 'Seri 4 (Uk. 13, 14, 15)', pricePerPiece: 90000, pieces: 3, totalPrice: 270000 },
];

export const gamisAnakSeriesOptions: SeriesOption[] = [
  { name: 'Seri Kecil (Size 2, 4, 6)', pricePerPiece: 65000, pieces: 3, totalPrice: 195000 },
  { name: 'Seri Tanggung (Size 8, 10, 12)', pricePerPiece: 70000, pieces: 3, totalPrice: 210000 },
  { name: 'Seri Besar (Size 14, 16, 18)', pricePerPiece: 75000, pieces: 3, totalPrice: 225000 },
];

// Harga sementara (mirip Gamis Anak). Silakan ubah angkanya sesuai harga asli.
export const gamisDewasaSeriesOptions: SeriesOption[] = [
  { name: 'Seri Kecil (Size S, M, L)', pricePerPiece: 65000, pieces: 3, totalPrice: 195000 },
  { name: 'Seri Besar (Size XL, XXL, XXXL)', pricePerPiece: 75000, pieces: 3, totalPrice: 225000 },
];

// Data produk awal (dummy) sudah dikosongkan karena 34 produk lama sudah
// tidak relevan (stok habis, gambar sudah dihapus dari public/images).
// Tambahkan produk baru lewat Admin Panel (/admin), bukan lewat array ini.
export const products: Product[] = [];