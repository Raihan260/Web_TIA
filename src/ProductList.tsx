import type { FC } from 'react';
import ProductCard, { type Product } from './ProductCard';

const products: Product[] = [
  {
    id: 'denim-basic-slim',
    name: 'Denim Slim Fit Basic',
    sizeRange: ['S', 'M', 'L', 'XL'],
    wholesalePrice: 'Rp75.000 / pcs',
    minimumOrder: 'Min. 5 pcs / model',
    tags: ['Best Seller', 'Bahan Lembut', 'Cocok Sehari-hari'],
  },
  {
    id: 'denim-ribbon',
    name: 'Denim Ribbon Girl',
    sizeRange: ['S', 'M', 'L'],
    wholesalePrice: 'Rp78.000 / pcs',
    minimumOrder: 'Min. 4 pcs / model',
    tags: ['Detail Pita', 'Model Feminim'],
  },
  {
    id: 'denim-boyfriend',
    name: 'Denim Boyfriend Kids',
    sizeRange: ['M', 'L', 'XL'],
    wholesalePrice: 'Rp82.000 / pcs',
    minimumOrder: 'Min. 5 pcs / model',
    tags: ['Loose Fit', 'Tren Kekinian'],
  },
  {
    id: 'denim-flower',
    name: 'Denim Flower Embroidery',
    sizeRange: ['S', 'M', 'L', 'XL'],
    wholesalePrice: 'Rp88.000 / pcs',
    minimumOrder: 'Min. 3 pcs / model',
    tags: ['Bordir Bunga', 'Premium'],
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
