import type { FC } from 'react';
import { Sparkles, ShoppingBag, MessageCircle } from 'lucide-react';

const Hero: FC = () => {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-10 md:flex-row md:py-16">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-pink-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-pink-600 ring-1 ring-pink-200">
            <Sparkles className="h-3.5 w-3.5 text-pink-500" />
            Koleksi Denim Anak Perempuan
          </span>

          <div className="space-y-3">
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Denim Nyaman Untuk Anak
              <span className="block text-2xl font-normal text-slate-700 sm:text-3xl">
                Untuk Anak Perempuan Anda
              </span>
            </h1>
            <p className="max-w-xl text-balance text-sm text-slate-700 sm:text-base">
              TIA Collection menyediakan celana denim khusus anak perempuan dengan bahan lembut,
              potongan kekinian, dan kualitas grosir yang siap memenuhi kebutuhan toko dan reseller Anda.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start">
            <a
              href="#katalog"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-pink-400 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-pink-300/70 transition hover:bg-pink-300 sm:w-auto"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Lihat Katalog Denim</span>
            </a>
            <a
              href="https://wa.me/6285219847122"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-green-400/60 transition hover:bg-green-400 sm:w-auto"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                <MessageCircle className="h-4 w-4" />
              </span>
              <span>Pesan via WhatsApp</span>
            </a>
          </div>

          <p className="text-xs text-slate-500">
            Minimal order fleksibel untuk reseller dan pemilik butik. Diskon menarik untuk pembelian dalam jumlah besar.
          </p>
        </div>

        <div className="flex-1">
          <div className="relative mx-auto max-w-md">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200">
              <div className="mb-3 flex items-center justify-between text-xs text-slate-600">
                <span className="font-medium">Contoh Celana Denim</span>
                <span className="rounded-full bg-pink-50 px-2 py-0.5 text-[11px] font-medium text-pink-600 ring-1 ring-pink-200">
                  Untuk Usaha Ibu
                </span>
              </div>

              <div className="mb-4 h-40 rounded-2xl bg-gradient-to-r from-sky-100 via-pink-50 to-amber-50" />

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Ukuran Tersedia</span>
                  <span className="rounded-full bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-700 ring-1 ring-slate-200">
                    S &ndash; XL (2&ndash;12 Tahun)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Harga Grosir Mulai</span>
                  <span className="font-semibold text-slate-800">Rp75.000 / pcs</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Minimal Order</span>
                  <span className="font-semibold text-slate-800">5 pcs / model</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
