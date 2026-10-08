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
import Highlights from './Highlights';
import AboutLocation from './AboutLocation';
import Footer from './Footer';
import { useProductStore } from './store/useProductStore';
import { isSupabaseConfigured } from './lib/supabase';

const Home: FC = () => {
  return (
    <>
      <Hero />
      <CategoryTiles />
      <Favorites />
      <Highlights />
      <AboutLocation />
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

    if (location.pathname.startsWith('/product') || location.pathname === '/katalog') {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash, location.search]);

  return null;
};

const App: FC = () => {
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
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
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/katalog" element={<ProductList />} />
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