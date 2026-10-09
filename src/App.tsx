import type { FC } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import ProductList from './ProductList';
import Favorites from './Favorites';
import ProductDetail from './ProductDetail';
import CartDrawer from './CartDrawer';
import AdminPanel from './AdminPanel';
import CategoryTiles from './CategoryTiles';
import Benefits, { HowToOrderPreview } from './Highlights';
import AboutLocation from './AboutLocation';
import AboutTeaser from './AboutTeaser';
import HowToOrderPage from './HowToOrderPage';
import Footer from './Footer';
import { useProductStore } from './store/useProductStore';
import { isSupabaseConfigured } from './lib/supabase';

const Home: FC = () => {
  return (
    <>
      <Hero />
      <CategoryTiles />
      <Favorites />
      <Benefits />
      <HowToOrderPreview />
      <AboutTeaser />
    </>
  );
};

// Setiap pindah halaman, mulai dari paling atas. Ganti filter di katalog (query) tidak ikut menggulir.
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: FC = () => {
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="flex min-h-screen flex-col bg-paper font-sans text-ink">
      {!isSupabaseConfigured && (
        <div className="bg-red-600 px-4 py-2 text-center text-xs font-semibold text-white">
          Konfigurasi database belum lengkap (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY). Katalog
          dan Admin Panel tidak akan berfungsi sampai ini diperbaiki di pengaturan hosting.
        </div>
      )}
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <CartDrawer />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/katalog" element={<ProductList />} />
            <Route path="/cara-pesan" element={<HowToOrderPage />} />
            <Route path="/tentang" element={<AboutLocation />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;