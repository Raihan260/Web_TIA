import type { FC, MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ShoppingBag } from 'lucide-react';
import { useCartStore } from './store/useCartStore';

/**
 * Bilah atas ramping khusus halaman detail produk, hanya di layar HP.
 * Menggantikan bilah utama yang memakai dua baris dan menu lengkap: di
 * halaman produk yang dibutuhkan cuma jalan kembali, nama brand, dan
 * keranjang. Di layar lebar bilah utama tetap dipakai.
 */
const ProductTopBar: FC = () => {
  const navigate = useNavigate();
  const cartCount = useCartStore((state) => state.cartCount());
  const setIsCartOpen = useCartStore((state) => state.setIsCartOpen);

  const handleGoBack = (e: MouseEvent) => {
    e.preventDefault();
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/katalog', { replace: true });
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-dashed border-thread/60 bg-paper/95 backdrop-blur-sm md:hidden">
      <div className="flex h-[52px] items-center justify-between px-1">
        <Link
          to="/katalog"
          onClick={handleGoBack}
          aria-label="Kembali"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition hover:bg-cream-deep"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>

        <Link to="/" className="font-display text-base font-bold text-ink">
          Fathia Kids
        </Link>

        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          aria-label="Buka keranjang"
          className="relative inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition hover:bg-cream-deep"
        >
          <ShoppingBag className="h-5 w-5" />
          {cartCount > 0 && (
            <span className="absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-rose px-1 text-[11px] font-bold text-white">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default ProductTopBar;
