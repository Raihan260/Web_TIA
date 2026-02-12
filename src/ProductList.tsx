import type { FC } from 'react';
import { useState } from 'react';
import ProductCard, { type Product } from './ProductCard';

const categories = ['Semua', 'Denim Panjang', 'Denim Pendek', 'Rok Denim', 'Celana Katun', 'Gamis'] as const;

const baseSeriesOptions = [
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

const products: Product[] = [
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

const ProductList: FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('Semua');

  const filteredProducts =
    activeCategory === 'Semua'
      ? products
      : products.filter((product) => product.category === activeCategory);

  const displayedProducts = showAll
    ? filteredProducts
    : filteredProducts.slice(0, 3);

  return (
    <section id="katalog" className="border-t border-b border-slate-200 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
              Katalog Denim Grosir
            </h2>
            <p className="max-w-xl text-sm text-slate-700">
              Pilihan celana denim khusus anak perempuan dengan potongan rapi dan bahan nyaman.
              Siap dikirim untuk kebutuhan toko, butik, ataupun reseller rumahan.
            </p>
          </div>
          <p className="text-xs text-slate-500">
            Stok dan model dapat berubah sewaktu-waktu. Hubungi admin untuk update terbaru.
          </p>
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-4">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActiveCategory(category);
                  setShowAll(false);
                }}
                className={
                  isActive
                    ? 'whitespace-nowrap rounded-full bg-pink-500 px-4 py-1.5 text-xs font-semibold text-white shadow-sm'
                    : 'whitespace-nowrap rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-pink-200 hover:text-slate-900'
                }
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Tombol hanya muncul jika produk lebih dari 3 */}
        {filteredProducts.length > 3 && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="rounded-full border border-pink-200 bg-white px-5 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-pink-300 hover:bg-pink-50 hover:text-slate-900"
            >
              {showAll ? 'Tampilkan Lebih Sedikit' : 'Lihat Semua Koleksi'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductList;
