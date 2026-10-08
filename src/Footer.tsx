import type { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { CATEGORIES, EMAIL, WA_DISPLAY, OPEN_HOURS, waLink } from './lib/contact';

const Footer: FC = () => {
  const { pathname } = useLocation();
  // Di halaman produk & admin tombol melayang menutupi harga/form, jadi disembunyikan.
  const showFloatingWa = !pathname.startsWith('/product') && !pathname.startsWith('/admin');

  return (
    <>
      <footer className="bg-ink text-cream/80">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
          <div>
            <p className="font-display text-xl font-extrabold text-cream">Fathia Kids</p>
            <p className="mt-2 max-w-xs text-sm">
              Grosir denim anak perempuan, gamis anak perempuan, dan gamis dewasa untuk toko dan reseller.
            </p>
          </div>
          <div>
            <p className="font-display font-extrabold text-cream">Katalog</p>
            <ul className="mt-3 space-y-2 text-sm">
              {CATEGORIES.map((category) => (
                <li key={category}>
                  <Link
                    to={`/katalog?kategori=${encodeURIComponent(category)}`}
                    className="transition hover:text-cream"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-display font-extrabold text-cream">Hubungi kami</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>WhatsApp {WA_DISPLAY}</li>
              <li>{EMAIL}</li>
              <li>{OPEN_HOURS}</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4">
          <div className="seam py-5 text-center text-xs text-cream/60">
            &copy; {new Date().getFullYear()}{' '}
            <Link to="/admin" className="transition hover:text-cream">
              Fathia Kids
            </Link>
            . Semua hak dilindungi.
          </div>
        </div>
      </footer>

      {showFloatingWa && (
        <a
          href={waLink('Halo Admin Fathia Kids, saya mau tanya katalog grosir.')}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-lg transition hover:scale-105 hover:bg-green-700"
          aria-label="Chat WhatsApp"
        >
          <MessageCircle className="h-7 w-7" />
        </a>
      )}
    </>
  );
};

export default Footer;
