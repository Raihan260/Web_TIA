import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import ProductCard from './ProductCard';
import { useProductStore } from './store/useProductStore';

const categories = ['Semua', 'Denim Panjang', 'Denim Pendek', 'Rok Denim', 'Celana Katun', 'Gamis'] as const;

 

const ProductList: FC = () => {
  const productList = useProductStore((state) => state.productList);
  const [showAll, setShowAll] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('tia_showAll') === 'true';
  });
  const [activeCategory, setActiveCategory] = useState<string>(() => {
    if (typeof window === 'undefined') return 'Semua';
    return sessionStorage.getItem('tia_category') || 'Semua';
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem('tia_category', activeCategory);
    sessionStorage.setItem('tia_showAll', showAll.toString());
  }, [activeCategory, showAll]);

  const filteredProducts = productList.filter((product) => {
    const matchesCategory = activeCategory === 'Semua' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

        <div className="mt-6 flex justify-center">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari produk berdasarkan nama..."
              className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 pl-9 text-sm text-slate-900 shadow-sm outline-none ring-0 transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
            />
          </div>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-4">
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
