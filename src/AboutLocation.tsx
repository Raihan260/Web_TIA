import type { FC } from 'react';
import SectionHeading from './SectionHeading';
import { MapPin, Clock } from 'lucide-react';
import { usePageTitle } from './lib/usePageTitle';
import { STORES, OPEN_HOURS, mapsLink, storeAnchor } from './lib/contact';

const MAP_QUERY = 'Pasar Tanah Abang Blok A, Jakarta Pusat';

const AboutLocation: FC = () => {
  usePageTitle('Tentang dan Lokasi');

  return (
    <section className="bg-cream-light">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 md:grid-cols-2 md:py-16">
        <div>
          <h1 className="sr-only">Tentang Fathia Kids dan lokasi toko</h1>
          <div className="overflow-hidden rounded-2xl border border-thread/60 bg-white md:sticky md:top-24">
            <iframe
              title="Peta lokasi toko Fathia Kids di Tanah Abang"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=16&output=embed`}
              className="h-80 w-full md:h-[28rem]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <a
            href={mapsLink(MAP_QUERY)}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-sm font-semibold text-rose underline underline-offset-4"
          >
            Buka peta lebih besar
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
