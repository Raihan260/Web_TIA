import type { FC } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import CartDrawer from './CartDrawer';
import { Truck, ShieldCheck, BadgePercent, Clock, MessageCircle } from 'lucide-react';

const Home: FC = () => {
  return (
    <>
      <Hero />
      {/* Katalog Section */}
      <ProductList />

      {/* Section Keunggulan / Value Proposition */}
        <section className="bg-white py-12 border-t border-slate-100">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-slate-900">Kenapa Mitra Memilih TIA Collection?</h2>
              <p className="text-slate-600 mt-2 text-sm">Kami paham kebutuhan bisnis Anda akan barang berkualitas dengan harga bersaing.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: BadgePercent, title: 'Harga Tangan Pertama', desc: 'Langsung dari konveksi sendiri, menjamin harga modal terendah untuk margin Anda.' },
                { icon: ShieldCheck, title: 'Jaminan Kualitas', desc: 'Bahan soft jeans & katun pilihan. Jahitan rapi, ukuran standar, dan awet dipakai anak.' },
                { icon: Truck, title: 'Pengiriman Cepat', desc: 'Siap kirim ke seluruh Indonesia via ekspedisi langganan atau kargo pilihan Anda.' },
                { icon: Clock, title: 'Stok Continue', desc: 'Model best-seller selalu diproduksi ulang. Tidak perlu takut kehabisan barang jualan.' }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="h-12 w-12 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mb-3">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Tentang Kami */}
        <section id="tentang" className="border-t border-slate-200 bg-pink-50/50">
          <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="flex-1 space-y-4">
                <span className="text-pink-600 font-bold text-sm tracking-wider uppercase">Tentang Kami</span>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                  Mitra Terpercaya Grosir Pakaian Anak Sejak 2024
                </h2>
                <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                  <p>
                    <strong>TIA Collection</strong> hadir untuk menjawab kebutuhan para pemilik toko dan 
                    <em>reseller</em> yang mencari supplier baju anak tangan pertama yang amanah dan profesional.
                  </p>
                  <p>
                    Kami memproduksi sendiri berbagai jenis pakaian anak perempuan mulai dari 
                    <strong>Celana Denim, Gamis, Rok, hingga Celana Katun</strong>. Fokus kami adalah menciptakan 
                    produk yang nyaman dipakai anak-anak, namun tetap modis dan memiliki nilai jual tinggi.
                  </p>
                  <p>
                    Bergabunglah bersama ratusan mitra kami lainnya dan rasakan kemudahan kulakan barang 
                    berkualitas tanpa harus pusing memikirkan produksi.
                  </p>
                </div>
              </div>
              <div className="flex-1 w-full">
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100 text-center">
                    <p className="text-lg font-semibold text-slate-800">Siap Jadi Mitra Sukses Anda?</p>
                    <p className="text-sm text-slate-500 mb-4">Konsultasikan kebutuhan stok toko Anda sekarang.</p>
                    <a
                      href="https://wa.me/6285219847122?text=Halo%20Admin%20TIA%20Collection,%20saya%20mau%20konsultasi%20stok."
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block bg-green-500 text-white font-bold py-3 px-8 rounded-full hover:bg-green-600 transition shadow-lg shadow-green-200"
                    >
                      Chat Admin Via WhatsApp
                    </a>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Sederhana */}
        <footer id="kontak" className="bg-slate-900 text-slate-400 py-10 text-sm">
          <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">TIA Collection</h3>
              <p className="mb-4">Supplier Grosir Pakaian Anak Tangan Pertama. Kualitas Butik, Harga Konveksi.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Hubungi Kami</h4>
              <ul className="space-y-2">
                <li>WhatsApp: 0852-1984-7122</li>
                <li>Email: admin@tiacollection.com</li>
                <li>Jam Operasional: Senin - Sabtu (08.00 - 17.00)</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Alamat Toko</h4>
              <p>
                Tanah Abang Blok A Lt. Ground Los B No.89, Jakarta, Indonesia
              </p>
              <br />
              <p>
                Pasar Jaya Cipulir Lt 1 BKS No 51, Jakarta, Indonesia
              </p>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-10 pt-6 text-center text-xs">
            &copy; {new Date().getFullYear()} TIA Collection. All rights reserved.
          </div>
        </footer>

        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/6285219847122?text=Halo%20Admin%20TIA%20Collection,%20saya%20mau%20tanya%20katalog%20grosir."
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/40 transition-transform hover:scale-110 hover:bg-green-600"
          aria-label="Hubungi via WhatsApp"
        >
          <MessageCircle className="h-7 w-7" />
        </a>
      </>
  );
};

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }

    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return null;
};

const App: FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 font-sans">
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <CartDrawer />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;