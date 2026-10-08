import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, MessageCircle } from 'lucide-react';
import { waLink } from './lib/contact';

const Hero: FC = () => {
  return (
    <section className="relative overflow-hidden bg-ink text-cream">
      <img
        src="/hero-stok-gudang.jpg"
        alt="Tumpukan stok pakaian di gudang Fathia Kids"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/65 to-ink/30" />
      {/* Jahitan di tepi, seperti topstitch pada jeans */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 rounded-[28px] border-2 border-dashed border-thread/80 md:inset-5"
      />

      <div className="relative mx-auto flex min-h-[520px] max-w-6xl flex-col justify-center px-8 py-16 md:min-h-[600px] md:px-14">
        <h1 className="max-w-2xl text-balance text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
          Denim dan gamis,
          <span className="block text-rose-light">langsung dari produsen.</span>
        </h1>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-cream/85 sm:text-lg">
          Denim anak perempuan, gamis anak perempuan, dan gamis dewasa untuk toko dan reseller. Dijual per
          seri, harga per pcs tertera jelas di setiap produk.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/katalog"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-cream px-7 py-3.5 text-sm font-bold text-ink transition hover:bg-white"
          >
            <ShoppingBag className="h-4 w-4" />
            Lihat katalog
          </Link>
          <a
            href={waLink('Halo Admin Fathia Kids, saya mau tanya info kemitraan reseller.')}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-cream/80 px-7 py-3.5 text-sm font-bold text-cream transition hover:bg-cream hover:text-ink"
          >
            <MessageCircle className="h-4 w-4" />
            Tanya info reseller
          </a>
        </div>

        <p className="mt-6 max-w-md text-sm text-cream/70">
          Satu seri berisi 3 pcs dengan ukuran berurutan, misalnya ukuran 4, 5, 6.
        </p>
      </div>
    </section>
  );
};

export default Hero;
