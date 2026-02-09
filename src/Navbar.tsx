import type { FC } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
        <a href="#" className="flex items-center gap-2">
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
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <div className="flex items-center gap-6 text-sm font-medium text-slate-700">
            <a href="#katalog" className="hover:text-slate-900">
              Katalog
            </a>
            <a href="#tentang" className="hover:text-slate-900">
              Tentang Kami
            </a>
            <a href="#kontak" className="hover:text-slate-900">
              Kontak
            </a>
          </div>
          <a
            href="https://wa.me/6281234567890"
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
            <a href="#katalog" className="py-1" onClick={() => setIsOpen(false)}>
              Katalog
            </a>
            <a href="#tentang" className="py-1" onClick={() => setIsOpen(false)}>
              Tentang Kami
            </a>
            <a href="#kontak" className="py-1" onClick={() => setIsOpen(false)}>
              Kontak
            </a>
            <a
              href="https://wa.me/6281234567890"
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
