import type { FC } from 'react';
import ProductCard, { type Product } from './ProductCard';

const products: Product[] = [
  {
    id: 'denim-amelia-basic',
    name: 'Celana Denim Amelia Basic',
    tags: ['Best Seller', 'Nyaman Dipakai', 'Mudah Dipadu'],
    seriesOptions: [
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
    ],
  },
  {
    id: 'denim-naya-slim',
    name: 'Celana Denim Naya Slim Fit',
    tags: ['Rapi & Modis', 'Cocok Untuk Sekolah'],
    seriesOptions: [
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
    ],
  },
  {
    id: 'denim-salsa-straight',
    name: 'Celana Denim Salsa Straight',
    tags: ['Model Favorit Ibu', 'Tidak Ketat', 'Gerak Bebas'],
    seriesOptions: [
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
    ],
  },
];

const ProductList: FC = () => {
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

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
