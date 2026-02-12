import type { FC } from 'react';
import { Sparkles, ShoppingBag, MessageCircle, TrendingUp } from 'lucide-react';

const Hero: FC = () => {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-10 md:flex-row md:py-16">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-pink-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-pink-600 ring-1 ring-pink-200">
            <Sparkles className="h-3.5 w-3.5 text-pink-500" />
            Supplier Tangan Pertama
          </span>

          <div className="space-y-4">
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
              Pusat Grosir Baju Anak <br />
              <span className="text-pink-500">Langsung Konveksi</span>
            </h1>
            <p className="max-w-xl text-balance text-base text-slate-600 sm:text-lg">
              Solusi kulakan Denim, Gamis, dan Bawahan Anak dengan harga modal termurah. 
              Kualitas butik, bahan nyaman, dan model selalu <i>up-to-date</i>. 
              Siap untungkan bisnis toko dan reseller Anda.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start">
            <a
              href="#katalog"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-slate-800 sm:w-auto"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Lihat Katalog Grosir</span>
            </a>
            <a
              href="https://wa.me/6285219847122?text=Halo%20Admin%20TIA%20Collection,%20saya%20mau%20tanya%20info%20kemitraan%20reseller."
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-green-400/40 transition hover:bg-green-600 sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Gabung Reseller</span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs font-medium text-slate-500 md:justify-start">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span>Margin Tinggi</span>
            </div>
            <div className="h-1 w-1 rounded-full bg-slate-300" />
            <div>Jaminan Kualitas</div>
            <div className="h-1 w-1 rounded-full bg-slate-300" />
            <div>Stok Continue</div>
          </div>
        </div>

        <div className="flex-1 w-full max-w-md">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
            {/* Ganti src ini dengan foto tumpukan stok celana di gudang Anda nanti */}
            <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100 relative">
               <img 
                src="https://via.placeholder.com/600x450.png?text=FOTO+GUDANG/STOK+REAL" 
                alt="Stok Gudang TIA Collection" 
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-white font-bold text-sm">Stok Ribuan Pcs</p>
                <p className="text-white/90 text-xs">Siap kirim ke seluruh Indonesia</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;