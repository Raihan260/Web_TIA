import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { waLink } from './lib/contact';

const AboutTeaser: FC = () => {
  return (
    <section className="seam bg-cream-light">
      <div className="mx-auto max-w-6xl px-4 py-12 text-center md:py-16">
        <SectionHeading title="Tentang Fathia Kids" />
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-ink/75">
          Pemasok pakaian anak dan gamis untuk pemilik toko dan reseller sejak 2024. Setiap kategori punya toko
          sendiri di Jakarta, mulai dari Tanah Abang sampai Pasar Jaya Cipulir.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/tentang"
            className="rounded-full border-2 border-rose px-7 py-3 text-sm font-bold text-rose transition hover:bg-rose hover:text-white"
          >
            Tentang dan lokasi toko
          </Link>
          <a
            href={waLink('Halo Admin Fathia Kids, saya mau konsultasi stok untuk toko saya.')}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-green-600 px-7 py-3 text-sm font-bold text-white transition hover:bg-green-700"
          >
            <MessageCircle className="h-4 w-4" />
            Konsultasi via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutTeaser;
