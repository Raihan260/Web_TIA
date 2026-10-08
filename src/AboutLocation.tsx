import type { FC } from 'react';
import SectionHeading from './SectionHeading';
import { MapPin, Clock, MessageCircle } from 'lucide-react';
import { STORES, OPEN_HOURS, mapsLink, waLink } from './lib/contact';

const AboutLocation: FC = () => {
  return (
    <section id="tentang" className="bg-cream-light">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 md:grid-cols-2 md:py-16">
        <div>
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

        <div id="kontak" className="scroll-mt-24">
          <SectionHeading align="left" title="Kunjungi toko kami" />
          <ul className="mt-5 divide-y-2 divide-dashed divide-thread/70">
            {STORES.map((store) => (
              <li key={store.name} className="flex gap-3 py-4 first:pt-0">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-rose" />
                <div>
                  <p className="font-display font-extrabold text-mauve-deep">{store.name}</p>
                  <p className="text-ink/75">{store.address}</p>
                  <a
                    href={mapsLink(`Fathia Kids ${store.name} ${store.address}`)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-block text-sm font-semibold text-rose underline underline-offset-4"
                  >
                    Buka di Google Maps
                  </a>
                </div>
              </li>
            ))}
            <li className="flex gap-3 pt-4">
              <Clock className="mt-1 h-5 w-5 shrink-0 text-rose" />
              <div>
                <p className="font-display font-extrabold text-mauve-deep">Jam operasional</p>
                <p className="text-ink/75">{OPEN_HOURS}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutLocation;
