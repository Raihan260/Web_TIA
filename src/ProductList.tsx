import type { FC } from 'react';
import SectionHeading from './SectionHeading';
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import { useProductStore } from './store/useProductStore';
import { CATEGORIES, waLink } from './lib/contact';


const ProductList: FC = () => {
  const productList = useProductStore((state) => state.productList);
  const isLoading = useProductStore((state) => state.isLoading);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showAll, setShowAll] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return sessionStorage.getItem('tia_showAll') === 'true';
    } catch {
      return false;
    }
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Hanya kategori yang sudah punya produk yang ditampilkan sebagai tab.
  const availableCategories = CATEGORIES.filter((category) =>
    productList.some((p) => p.category === category),
  );
  const categories = ['Semua', ...availableCategories];
  const categoryParam = searchParams.get('kategori');
  const activeCategory = categories.includes(categoryParam ?? '') ? (categoryParam as string) : 'Semua';

  useEffect(() => {
    try {
      sessionStorage.setItem('tia_showAll', showAll.toString());
    } catch {
      // abaikan jika penyimpanan browser tidak tersedia
    }
  }, [showAll]);

  const selectCategory = (category: string) => {
    setShowAll(false);
    setSearchParams(category === 'Semua' ? {} : { kategori: category }, { replace: true, preventScrollReset: true });
  };

  const filteredProducts = productList.filter((product) => {
    const matchesCategory = activeCategory === 'Semua' || product.category === activeCategory;

    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query.length === 0 ||
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      (product.tags ?? []).some((tag) => tag.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  const reversedFilteredProducts = [...filteredProducts].reverse();

  const PREVIEW_COUNT = 4; // HP menampilkan 4; desktop menampilkan 3 lewat lg:hidden di item ke-4
  const displayedProducts = showAll
    ? reversedFilteredProducts
    : reversedFilteredProducts.slice(0, PREVIEW_COUNT);

  const isFiltering = activeCategory !== 'Semua' || searchQuery.trim().length > 0;

  return (
    <section id="katalog" className="scroll-mt-16 border-t-2 border-dashed border-thread/60 bg-paper">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <SectionHeading
          title="Katalog grosir"
          subtitle="Harga tertera per pcs dan dijual per seri. Stok bisa berubah, jadi konfirmasi ke admin sebelum membayar."
        />

        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div
            className={`flex gap-2 overflow-x-auto pb-1 ${availableCategories.length < 2 ? 'hidden' : ''}`}
            role="tablist"
            aria-label="Kategori"
          >
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => selectCategory(category)}
                  className={
                    isActive
                      ? 'whitespace-nowrap rounded-full bg-mauve px-4 py-2 text-sm font-bold text-white'
                      : 'whitespace-nowrap rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-semibold text-ink/75 transition hover:border-mauve hover:text-mauve-deep'
                  }
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:max-w-xs">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama atau tag produk"
              aria-label="Cari produk"
              className="w-full rounded-full border border-ink/15 bg-white py-2.5 pl-10 pr-4 text-sm text-ink outline-none transition focus:border-rose focus:ring-2 focus:ring-blush"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="animate-pulse overflow-hidden rounded-2xl bg-white ring-1 ring-ink/10">
                <div className="aspect-[4/5] bg-mauve-soft" />
                <div className="space-y-2 p-4">
                  <div className="h-4 w-3/4 rounded bg-mauve-soft" />
                  <div className="h-4 w-1/2 rounded bg-mauve-soft" />
                  <div className="mt-2 h-10 w-full rounded-full bg-mauve-soft" />
                </div>
              </div>
            ))}
          </div>
        ) : displayedProducts.length === 0 ? (
          <div className="mt-8 flex flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-thread/70 bg-white px-6 py-12 text-center">
            <p className="font-display text-lg font-extrabold text-ink">
              {isFiltering ? 'Produk tidak ditemukan' : 'Belum ada produk di katalog'}
            </p>
            <p className="max-w-sm text-sm text-ink/70">
              {isFiltering
                ? 'Coba kata kunci lain atau pilih kategori lain. Anda juga bisa tanya stok terbaru ke admin.'
                : 'Katalog sedang diperbarui. Tanya admin lewat WhatsApp untuk model dan stok terbaru.'}
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {isFiltering && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    selectCategory('Semua');
                  }}
                  className="rounded-full border border-mauve px-4 py-2 text-sm font-bold text-mauve-deep transition hover:bg-mauve hover:text-white"
                >
                  Tampilkan semua produk
                </button>
              )}
              <a
                href={waLink('Halo Admin Fathia Kids, saya mau tanya model dan stok terbaru.')}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-green-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-green-700"
              >
                Tanya admin
              </a>
            </div>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {displayedProducts.map((product, index) => (
              <div key={product.id} className={!showAll && index === 3 ? 'lg:hidden' : undefined}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {filteredProducts.length > 3 && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="rounded-full border-2 border-mauve px-6 py-2.5 text-sm font-bold text-mauve-deep transition hover:bg-mauve hover:text-white"
            >
              {showAll ? 'Tampilkan lebih sedikit' : 'Lihat semua produk'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductList;
