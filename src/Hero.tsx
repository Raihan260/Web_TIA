import type { FC } from 'react';
import { ShoppingBag, MessageCircle } from 'lucide-react';
import { waLink } from './lib/contact';

const Hero: FC = () => {
  return (
    <section className="denim-twill relative overflow-hidden text-white">
      {/* Jahitan di tepi, seperti topstitch pada celana jeans */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 rounded-[28px] border-2 border-dashed border-thread/70 md:inset-5"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-8 py-14 md:grid-cols-[1.1fr_0.9fr] md:px-14 md:py-20">
        <div>
          <h1 className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Denim dan gamis, langsung dari produsen.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg">
            Denim anak perempuan, gamis anak perempuan, dan gamis dewasa untuk toko dan reseller.
            Dijual per seri, harga per pcs tertera jelas di setiap produk.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#katalog"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-pink-500 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-pink-400"
            >
              <ShoppingBag className="h-4 w-4" />
              Lihat katalog
            </a>
            <a
              href={waLink('Halo Admin Fathia Kids, saya mau tanya info kemitraan reseller.')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/70 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white hover:text-denim"
            >
              <MessageCircle className="h-4 w-4" />
              Tanya info reseller
            </a>
          </div>

          <p className="mt-6 max-w-md text-sm text-white/65">
            Satu seri berisi 3 pcs dengan ukuran berurutan, misalnya ukuran 4, 5, 6.
          </p>
        </div>

        <div className="mx-auto w-full max-w-md md:max-w-none">
          <div className="rounded-3xl border-2 border-dashed border-thread p-2.5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-denim-deep">
              <img
                src="/hero-stok-gudang.jpg"
                alt="Tumpukan stok pakaian di gudang Fathia Kids"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-denim-deep/90 to-transparent px-4 pb-3 pt-10">
                <p className="text-sm font-semibold">Stok gudang Fathia Kids</p>
                <p className="text-xs text-white/80">Dikirim ke seluruh Indonesia</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
