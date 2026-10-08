import type { FC } from 'react';
import { MapPin, Clock, MessageCircle } from 'lucide-react';
import { STORES, OPEN_HOURS, mapsLink, waLink } from './lib/contact';

const AboutLocation: FC = () => {
  return (
    <section id="tentang" className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 md:grid-cols-2 md:py-20">
        <div>
          <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
            Pemasok pakaian anak dan gamis sejak 2024
          </h2>
          <div className="mt-4 space-y-3 leading-relaxed text-ink/75">
            <p>
              Fathia Kids melayani pemilik toko dan reseller yang mencari pemasok langsung yang jujur dan
              profesional.
            </p>
            <p>
              Kami membuat Denim Anak Perempuan, Gamis Anak Perempuan, dan Gamis Dewasa. Fokus kami sederhana:
              pakaian yang nyaman dipakai dan mudah dijual kembali.
            </p>
          </div>
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
          <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Kunjungi toko kami</h2>
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
