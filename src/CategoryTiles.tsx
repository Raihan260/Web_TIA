import type { FC } from 'react';
import SectionHeading from './SectionHeading';
import { Link } from 'react-router-dom';
import { useProductStore } from './store/useProductStore';
import { CATEGORIES } from './lib/contact';

const tone: Record<string, string> = {
  'Denim Anak Perempuan': 'bg-[#d98ba3]',
  'Gamis Anak Perempuan': 'bg-rose',
  'Gamis Dewasa': 'bg-[#d3a37f]',
};

const CategoryTiles: FC = () => {
  const productList = useProductStore((state) => state.productList);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <SectionHeading
        title="Pilih kategori"
        subtitle="Tiga kategori yang kami jual. Pilih satu untuk melihat model dan seri yang tersedia."
      />

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {CATEGORIES.map((category) => {
          const items = productList.filter((p) => p.category === category);
          const cover = [...items].reverse().find((p) => p.imageUrl)?.imageUrl;
          return (
            <Link
              key={category}
              to={`/katalog?kategori=${encodeURIComponent(category)}`}
              className={`group relative flex aspect-[16/9] items-end overflow-hidden rounded-2xl text-white md:aspect-[5/4] ${cover ? '' : 'twill'} ${tone[category]}`}
            >
              {cover && (
                <img
                  src={cover}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
              <div className="relative w-full p-5">
                <h3 className="text-xl font-extrabold leading-tight">{category}</h3>
                <p className="mt-1 text-sm text-white/85">
                  {items.length > 0 ? `${items.length} model tersedia` : 'Segera hadir'}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryTiles;
