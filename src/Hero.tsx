import type { FC } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, MessageCircle } from 'lucide-react';
import { waLink } from './lib/contact';

// Foto model (file di folder public/). Kalau belum ada, otomatis balik ke foto gudang.
const MODEL_PHOTO = '/hero-model.jpg';
const FALLBACK_PHOTO = '/hero-stok-gudang.jpg';

const Hero: FC = () => {
  const [src, setSrc] = useState(MODEL_PHOTO);
  const isModel = src === MODEL_PHOTO;

  return (
    <section className="relative overflow-hidden bg-cream">
      {/* Di HP foto ada di atas teks; di layar lebar foto mengisi separuh kanan. */}
      <div className="relative h-72 sm:h-96 md:absolute md:inset-y-0 md:right-0 md:h-full md:w-[52%]">
        <img
          src={src}
          onError={() => setSrc(FALLBACK_PHOTO)}
          alt={
            isModel
              ? 'Model mengenakan gamis koleksi Fathia Kids'
              : 'Tumpukan stok pakaian di gudang Fathia Kids'
          }
          /* Foto model dicerminkan supaya modelnya menghadap ke arah teks. */
          className={`h-full w-full object-cover object-top ${isModel ? 'scale-x-[-1]' : ''}`}
        />
        {/* Peralihan lembut ke latar krem, supaya foto menyatu dengan halaman. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-cream to-transparent md:inset-y-0 md:left-0 md:h-full md:w-28 md:bg-gradient-to-r"
        />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col justify-center px-6 py-12 md:min-h-[600px] md:px-10 md:py-24">
        <div className="md:max-w-[46%]">
          <h1 className="text-balance font-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
            Denim dan gamis,
            <span className="block text-rose">langsung dari produsen.</span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-ink/75">
            Denim anak perempuan, gamis anak perempuan, dan gamis dewasa untuk toko dan reseller. Dijual per
            seri, harga per pcs tertera jelas di setiap produk.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/katalog"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-rose px-7 py-3.5 text-sm font-bold text-white transition hover:bg-rose-deep"
            >
              <ShoppingBag className="h-4 w-4" />
              Lihat katalog
            </Link>
            <a
              href={waLink('Halo Admin Fathia Kids, saya mau tanya info kemitraan reseller.')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink/25 px-7 py-3.5 text-sm font-bold text-ink transition hover:border-ink hover:bg-ink hover:text-cream"
            >
              <MessageCircle className="h-4 w-4" />
              Tanya info reseller
            </a>
          </div>

          <p className="mt-6 text-sm text-ink/60">
            Isi satu seri berbeda di tiap model, detailnya ada di halaman produk.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
