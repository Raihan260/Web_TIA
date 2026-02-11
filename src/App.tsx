import type { FC } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import ProductList from './ProductList';

const App: FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-slate-800">
      <Navbar />
      <main>
        <Hero />
        <ProductList />

        <section
          id="tentang"
          className="border-t border-slate-200 bg-white/80"
        >
          <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
            <div className="max-w-2xl space-y-3">
              <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
                Tentang TIA Collection
              </h2>
              <p className="text-sm text-slate-700">
                TIA Collection adalah supplier celana denim khusus anak perempuan yang
                berfokus pada kualitas bahan, kerapian jahitan, dan kenyamanan anak saat
                beraktivitas. Kami melayani pembelian grosir untuk pemilik toko, butik,
                maupun reseller online di seluruh Indonesia.
              </p>
              <p className="text-sm text-slate-700">
                Dengan pilihan model yang selalu update mengikuti tren, TIA Collection siap
                menjadi partner fashion anak perempuan untuk usaha Anda.
              </p>
            </div>
          </div>
        </section>

        <section
          id="kontak"
          className="border-t border-slate-200 bg-white"
        >
          <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
                  Kontak &amp; Pemesanan
                </h2>
                <p className="max-w-xl text-sm text-slate-700">
                  Ingin cek stok terbaru, tanya ukuran, atau minta rekomendasi model
                  untuk toko Anda? Silakan hubungi admin TIA Collection melalui WhatsApp.
                </p>
              </div>
              <div className="space-y-2 text-sm text-slate-700">
                <p>
                  WhatsApp Admin:{' '}
                  <a
                    href="https://wa.me/6285219847122"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-green-600 underline-offset-4 hover:underline"
                  >
                    0852-1984-7122
                  </a>
                </p>
                <p className="text-xs text-slate-500">
                  Jam operasional: 09.00 &ndash; 20.00 WIB (Senin &ndash; Sabtu)
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
