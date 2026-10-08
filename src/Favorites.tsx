import type { FC } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import SectionHeading from './SectionHeading';
import { useProductStore } from './store/useProductStore';
import { waLink } from './lib/contact';

const MAX_ITEMS = 6;

const Favorites: FC = () => {
  const productList = useProductStore((state) => state.productList);
  const isLoading = useProductStore((state) => state.isLoading);

  // Produk yang ditandai favorit di Admin Panel; jika belum ada, tampilkan produk terbaru.
  const newestFirst = [...productList].reverse();
  const favorites = newestFirst.filter((product) => product.isFavorite);
  const shown = (favorites.length > 0 ? favorites : newestFirst).slice(0, MAX_ITEMS);

  return (
    <section id="favorit" className="scroll-mt-16 border-t-2 border-dashed border-thread/60">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <SectionHeading
          title="Produk favorit"
          subtitle="Model pilihan yang paling sering dicari reseller. Harga per pcs, dijual per seri."
        />

        {isLoading ? (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="animate-pulse overflow-hidden rounded-2xl bg-white ring-1 ring-ink/10">
                <div className="aspect-[4/5] bg-cream-deep" />
                <div className="space-y-2 p-4">
                  <div className="h-4 w-3/4 rounded bg-cream-deep" />
                  <div className="h-10 w-full rounded-full bg-cream-deep" />
                </div>
              </div>
            ))}
          </div>
        ) : shown.length === 0 ? (
          <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-thread/70 bg-white px-6 py-12 text-center">
            <p className="font-display text-lg font-bold text-ink">Katalog sedang diperbarui</p>
            <p className="max-w-sm text-sm text-ink/70">
              Tanya admin lewat WhatsApp untuk model dan stok terbaru.
            </p>
            <a
              href={waLink('Halo Admin Fathia Kids, saya mau tanya model dan stok terbaru.')}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-green-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-green-700"
            >
              Tanya admin
            </a>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {shown.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Link
            to="/katalog"
            className="rounded-full border-2 border-rose px-7 py-3 text-sm font-bold text-rose transition hover:bg-rose hover:text-white"
          >
            Lihat semua katalog
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Favorites;
