import type { FC } from 'react';
import { Phone, Menu, X, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from './store/useCartStore';

const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cartCount = useCartStore((state) => state.cartCount());
  const setIsCartOpen = useCartStore((state) => state.setIsCartOpen);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-400 text-sm font-semibold text-white shadow-sm shadow-pink-300/70">
            TIA
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-wide text-slate-900">
              TIA Collection
            </span>
            <span className="text-xs text-slate-500">
              Denim Anak Perempuan Grosir
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <div className="flex items-center gap-6 text-sm font-medium text-slate-700">
            <Link to="/#katalog" className="hover:text-slate-900">
              Katalog
            </Link>
            <Link to="/#tentang" className="hover:text-slate-900">
              Tentang Kami
            </Link>
            <Link to="/#kontak" className="hover:text-slate-900">
              Kontak
            </Link>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-3 py-2 text-slate-700 shadow-sm hover:bg-slate-100"
            aria-label="Lihat keranjang inquiry"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-pink-500 px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
          <a
            href="https://wa.me/6285219847122"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-green-400/60 transition hover:bg-green-400"
          >
            <Phone className="h-4 w-4" />
            <span>Pesan via WhatsApp</span>
          </a>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-2 py-2 text-slate-700 shadow-sm hover:bg-slate-100 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 text-sm font-medium text-slate-700">
            <Link to="/#katalog" className="py-1" onClick={() => setIsOpen(false)}>
              Katalog
            </Link>
            <Link to="/#tentang" className="py-1" onClick={() => setIsOpen(false)}>
              Tentang Kami
            </Link>
            <Link to="/#kontak" className="py-1" onClick={() => setIsOpen(false)}>
              Kontak
            </Link>
            <button
              type="button"
              onClick={() => {
                setIsCartOpen(true);
                setIsOpen(false);
              }}
              className="mt-1 inline-flex items-center justify-between rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                <span>Keranjang Inquiry</span>
              </span>
              {cartCount > 0 && (
                <span className="ml-2 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-pink-500 px-1 text-[11px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
            <a
              href="https://wa.me/6285219847122"
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-green-400/60 transition hover:bg-green-400"
              onClick={() => setIsOpen(false)}
            >
              <Phone className="h-4 w-4" />
              <span>Pesan via WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
