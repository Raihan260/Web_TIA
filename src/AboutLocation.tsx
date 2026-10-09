import type { FC } from 'react';
import SectionHeading from './SectionHeading';
import { MapPin, Clock, MessageCircle } from 'lucide-react';
import { usePageTitle } from './lib/usePageTitle';
import { STORES, OPEN_HOURS, mapsLink, storeAnchor, waLink } from './lib/contact';

const AboutLocation: FC = () => {
  usePageTitle('Tentang dan Lokasi');

  return (
    <section className="bg-cream-light">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 md:grid-cols-2 md:py-16">
        <div>
          <h1 className="sr-only">Tentang Fathia Kids dan lokasi toko</h1>
          <SectionHeading align="left" title="Pemasok pakaian anak dan gamis sejak 2024" />
          <p className="mt-4 leading-relaxed text-ink/75">
            Fathia Kids melayani pemilik toko dan reseller dengan Denim Anak Perempuan, Gamis Anak Perempuan,
            dan Gamis Dewasa buatan sendiri. Fokus kami sederhana: pakaian yang nyaman dipakai dan mudah
            dijual kembali.
          </p>
          <a
            href={waLink('Halo Admin Fathia Kids, saya mau konsultasi stok untuk toko saya.')}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-green-700"
          >
            <MessageCircle className="h-4 w-4" />
            Konsultasi stok via WhatsApp
          </a>
        </div>

        <div>
          <SectionHeading align="left" title="Kunjungi toko kami" />
          <p className="mt-3 text-sm text-ink/70">
            Pemesanan online semuanya lewat WhatsApp admin. Kunjungan langsung ke toko sesuai kategori produk yang kamu cari.
          </p>
          <ul className="mt-5 space-y-4">
            {STORES.map((store) => (
              <li
                key={store.category}
                id={storeAnchor(store.category)}
                className="scroll-mt-24 rounded-2xl border border-thread/60 bg-white p-5"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-rose">{store.category}</p>
                <div className="mt-2 flex gap-3">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-rose" />
                  <div>
                    <p className="font-display font-extrabold text-mauve-deep">{store.place}</p>
                    <p className="text-ink/75">{store.address}</p>
                    <a
                      href={mapsLink(`Fathia Kids ${store.place} ${store.address}`)}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-block text-sm font-semibold text-rose underline underline-offset-4"
                    >
                      Buka di Google Maps
                    </a>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-3 border-t border-dashed border-thread/70 pt-3 text-sm text-ink/75">
                  <Clock className="h-4 w-4 shrink-0 text-rose" />
                  {OPEN_HOURS}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutLocation;
