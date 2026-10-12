import type { FC } from 'react';
import { useState } from 'react';
import SectionHeading from './SectionHeading';
import { Link } from 'react-router-dom';
import { useProductStore } from './store/useProductStore';
import { CATEGORIES, CATEGORY_BLURB } from './lib/contact';

// Foto kategori (file di folder public/). Didahulukan daripada foto produk
// karena komposisinya seragam. Kalau file belum ada, mundur ke foto produk.
const categoryPhoto: Record<string, string> = {
  'Denim Anak Perempuan': '/kategori-denim-anak.jpg',
  'Gamis Anak Perempuan': '/kategori-gamis-anak.jpg',
  'Gamis Dewasa': '/kategori-gamis-dewasa.jpg',
};

const formatRupiah = (value: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

const CategoryTiles: FC = () => {
  const productList = useProductStore((state) => state.productList);
  // Alamat foto yang gagal dimuat, supaya blok mundur ke foto berikutnya.
  const [brokenSrc, setBrokenSrc] = useState<string[]>([]);

  return (
    <section className="mx-auto max-w-6xl px-6 py-14 md:px-10 md:py-20">
      <SectionHeading align="left" title="Tiga koleksi" />

      <div className="mt-10 flex flex-col gap-6">
        {CATEGORIES.map((category, index) => {
          const items = productList.filter((p) => p.category === category);
          const candidates = [
            categoryPhoto[category],
            [...items].reverse().find((p) => p.imageUrl)?.imageUrl,
          ].filter((url): url is string => Boolean(url));
          const cover = candidates.find((url) => !brokenSrc.includes(url));

          const prices = items.flatMap((p) => p.seriesOptions.map((o) => o.pricePerPiece));
          const minPrice = prices.length > 0 ? Math.min(...prices) : null;
          // Blok berselang-seling kiri dan kanan, seperti halaman majalah.
          const imageFirst = index % 2 === 0;

          return (
            <Link
              key={category}
              to={`/katalog?kategori=${encodeURIComponent(category)}`}
              className={`group flex flex-col overflow-hidden rounded-lg bg-white transition hover:ring-2 hover:ring-blush ${
                imageFirst ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className="relative h-56 shrink-0 overflow-hidden bg-cream-deep sm:h-64 md:h-[280px] md:w-1/2">
                {cover && (
                  <img
                    key={cover}
                    src={cover}
                    alt=""
                    loading="lazy"
                    onError={() =>
                      setBrokenSrc((prev) => (cover && !prev.includes(cover) ? [...prev, cover] : prev))
                    }
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                )}
              </div>

              <div className="flex flex-1 flex-col justify-center gap-3 p-6 md:p-9">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">
                  Koleksi {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
                  {category}
                </h3>
                <p className="text-sm leading-relaxed text-ink/70 sm:text-base">
                  {CATEGORY_BLURB[category]}
                </p>
                <p className="text-sm text-ink/60">
                  {items.length > 0
                    ? `${items.length} model${minPrice !== null ? ` · mulai ${formatRupiah(minPrice)} / pcs` : ''}`
                    : 'Segera hadir'}
                </p>
                <span className="text-sm font-bold text-rose underline underline-offset-4">
                  Lihat model
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryTiles;
