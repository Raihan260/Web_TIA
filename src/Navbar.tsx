import type { FC } from 'react';
import { Phone, Menu, X, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from './store/useCartStore';
import { waLink } from './lib/contact';

const links = [
  { to: '/katalog', label: 'Katalog' },
  { to: '/#cara-pesan', label: 'Cara pesan' },
  { to: '/#tentang', label: 'Tentang kami' },
  { to: '/#kontak', label: 'Lokasi' },
];

const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cartCount = useCartStore((state) => state.cartCount());
  const setIsCartOpen = useCartStore((state) => state.setIsCartOpen);

  return (
    <header className="sticky top-0 z-30 border-b-2 border-dashed border-thread/60 bg-paper/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mauve font-display text-sm font-extrabold text-white ring-2 ring-thread ring-offset-2 ring-offset-paper">
            FK
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-base font-extrabold text-ink">Fathia Kids</span>
            <span className="text-xs text-ink/60">Grosir denim dan gamis</span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-semibold text-ink/80 transition hover:text-rose"
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative inline-flex items-center justify-center rounded-full border border-ink/15 bg-white p-2.5 text-ink transition hover:border-blush"
            aria-label="Buka keranjang"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-rose px-1 text-[11px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
          <a
            href={waLink()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-green-700"
          >
            <Phone className="h-4 w-4" />
            Chat WhatsApp
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative rounded-full border border-ink/15 bg-white p-2.5 text-ink"
            aria-label="Buka keranjang"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-rose px-1 text-[11px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
          <button
            type="button"
            className="rounded-full border border-ink/15 bg-white p-2.5 text-ink"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="border-t border-ink/10 bg-paper md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-3 text-base font-semibold text-ink">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="border-b border-dashed border-ink/15 py-3"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-green-600 px-4 py-3 text-sm font-bold text-white"
              onClick={() => setIsOpen(false)}
            >
              <Phone className="h-4 w-4" />
              Chat WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
