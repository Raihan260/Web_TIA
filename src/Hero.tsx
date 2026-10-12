import type { FC } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

// Foto model (file di folder public/). Kalau belum ada, otomatis balik ke foto gudang.
const MODEL_PHOTO = '/hero-model.jpg';
const FALLBACK_PHOTO = '/hero-stok-gudang.jpg';

const Hero: FC = () => {
  const [src, setSrc] = useState(MODEL_PHOTO);
  const isModel = src === MODEL_PHOTO;

  return (
    <>
      {/* Hero editorial: foto penuh, teks duduk di bagian bawah foto yang terang. */}
      <section className="relative">
        <img
          src={src}
          onError={() => setSrc(FALLBACK_PHOTO)}
          alt={
            isModel
              ? 'Model mengenakan gamis koleksi Fathia Kids'
              : 'Tumpukan stok pakaian di gudang Fathia Kids'
          }
          /* Foto model dicerminkan supaya modelnya tidak tertutup teks. */
          className={`block h-[460px] w-full object-cover object-[center_22%] sm:h-[540px] lg:h-[620px] ${
            isModel ? 'scale-x-[-1]' : ''
          }`}
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-cream via-cream/85 to-transparent"
        />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-8 md:px-10 md:pb-12">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-deep">
              Koleksi Fathia Kids
            </p>
            <h1 className="mt-3 max-w-3xl text-balance font-display text-4xl font-bold leading-[1.02] text-ink sm:text-5xl lg:text-6xl">
              Pakaian yang nyaman dipakai, mudah dijual kembali.
            </h1>
          </div>
        </div>
      </section>

      {/* Baris pengantar: kalimat penjelas dan satu ajakan utama. */}
      <section className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-8 md:flex-row md:items-center md:px-10 md:py-10">
        <p className="flex-1 text-base leading-relaxed text-ink/75">
          Denim anak perempuan, gamis anak perempuan, dan gamis dewasa untuk pemilik toko dan reseller.
          Dijual per seri, harga per pcs tertera jelas di setiap produk.
        </p>
        <Link
          to="/katalog"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-rose px-7 py-3.5 text-sm font-bold text-white transition hover:bg-rose-deep"
        >
          <ShoppingBag className="h-4 w-4" />
          Lihat katalog
        </Link>
      </section>
    </>
  );
};

export default Hero;
