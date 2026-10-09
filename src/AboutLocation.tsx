import type { FC } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MapPin, Clock, MessageCircle, Scissors, Tag, Layers } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { usePageTitle } from './lib/usePageTitle';
import { STORES, OPEN_HOURS, CATEGORIES, mapsLink, storeAnchor, waLink } from './lib/contact';

const DAYS = [
  { label: 'Senin', open: true },
  { label: 'Selasa', open: true },
  { label: 'Rabu', open: true },
  { label: 'Kamis', open: true },
  { label: 'Jumat', open: true },
  { label: 'Sabtu', open: true },
  { label: 'Minggu', open: false },
];

// Buka Senin - Sabtu, 08.00 - 17.00 (waktu Jakarta).
const isOpenNow = () => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Jakarta',
    weekday: 'short',
    hour: 'numeric',
    hour12: false,
  }).formatToParts(new Date());
  const day = parts.find((p) => p.type === 'weekday')?.value;
  const hour = Number(parts.find((p) => p.type === 'hour')?.value) % 24;
  return day !== 'Sun' && hour >= 8 && hour < 17;
};

const POINTS = [
  { icon: Scissors, title: 'Dibuat sendiri', text: 'Diproduksi langsung oleh keluarga kami, jadi kualitas terjaga.' },
  { icon: Layers, title: 'Dijual per seri', text: 'Satu seri berisi 3 pcs dengan ukuran berurutan.' },
  { icon: Tag, title: 'Harga jelas', text: 'Harga per pcs tertera di setiap produk, tanpa harga tersembunyi.' },
];

const AboutLocation: FC = () => {
  usePageTitle('Tentang dan Lokasi');
  const { hash } = useLocation();
  const [picked, setPicked] = useState<{ hash: string; category: string } | null>(null);
  const open = isOpenNow();

  // Pilihan dari klik menang selama hash URL sama; kalau hash berganti, ikuti hash.
  const fromHash = STORES.find((s) => '#' + storeAnchor(s.category) === decodeURIComponent(hash))?.category;
  const selected = picked && picked.hash === hash ? picked.category : (fromHash ?? STORES[0].category);

  const store = STORES.find((s) => s.category === selected) ?? STORES[0];

  return (
    <div className="bg-cream-light">
      {/* Hero */}
      <section className="denim-twill relative overflow-hidden bg-ink text-cream">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <h1 className="text-balance text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
            Kami adalah
            <span className="block text-rose-light">Fathia Kids.</span>
          </h1>
          <p className="mt-6 max-w-2xl leading-relaxed text-cream/85 sm:text-lg">
            Selamat datang di Fathia Kids, pemasok denim anak perempuan, gamis anak perempuan, dan gamis
            dewasa untuk pemilik toko dan reseller. Kami membuat sendiri produk kami, supaya pakaian yang
            sampai ke tokomu nyaman dipakai, rapi jahitannya, dan mudah dijual kembali.
          </p>
        </div>
      </section>

      {/* Arah kami */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-14 md:grid-cols-2 md:py-20">
        <div className="rounded-3xl bg-blush p-8 md:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose">Tiga koleksi kami</p>
          <ul className="mt-4 space-y-3">
            {CATEGORIES.map((c) => (
              <li key={c} className="border-b border-dashed border-rose/40 pb-3 font-display text-2xl font-bold text-mauve-deep last:border-0 last:pb-0">
                {c}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionHeading align="left" title="Ke mana kami menuju" />
          <p className="mt-4 leading-relaxed text-ink/75">
            Kami bukan sekadar menjual pakaian. Kami ingin menjadi mitra tepercaya bagi pemilik toko dan
            reseller: stok yang jelas, harga yang adil, dan pelayanan yang cepat lewat WhatsApp. Setiap
            jahitan kami buat dengan teliti, dari keluarga kami untuk usaha kamu.
          </p>
        </div>
      </section>

      {/* Tujuan utama */}
      <section className="seam bg-cream">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-2 md:py-20">
          <div>
            <SectionHeading align="left" title="Tujuan utama kami" />
            <p className="mt-4 leading-relaxed text-ink/75">
              Membantu usaha kamu tumbuh dengan produk grosir berkualitas yang terjangkau. Mulai dari satu
              seri pun kami layani dengan senang hati.
            </p>
            <a
              href={waLink('Halo Admin Fathia Kids, saya mau tanya info kemitraan reseller.')}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-rose px-7 py-3 text-sm font-bold text-white transition hover:bg-rose-deep"
            >
              <MessageCircle className="h-4 w-4" />
              Jadi reseller
            </a>
          </div>
          <ul className="space-y-5">
            {POINTS.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blush text-rose">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="border-l-2 border-rose pl-3 font-bold text-ink">{title}</p>
                  <p className="mt-1 pl-3 text-sm text-ink/70">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Kunjungi toko */}
      <section className="denim-twill bg-ink py-14 text-center text-cream md:py-20">
        <h2 className="text-4xl font-bold sm:text-5xl">Kunjungi kami</h2>
        <p className="mt-2 text-3xl font-bold text-rose-light sm:text-4xl">di toko kami.</p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <p className="mb-6 text-center text-sm text-ink/70">
          Pemesanan online semuanya lewat WhatsApp admin. Kunjungan langsung ke toko sesuai kategori produk
          yang kamu cari.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {STORES.map((s) => {
            const active = s.category === selected;
            return (
              <button
                key={s.category}
                id={storeAnchor(s.category)}
                type="button"
                onClick={() => setPicked({ hash, category: s.category })}
                aria-pressed={active}
                className={`scroll-mt-24 rounded-2xl border-2 p-5 text-left transition ${
                  active ? 'border-rose bg-blush' : 'border-thread/60 bg-white hover:border-rose/60'
                }`}
              >
                <p className="font-display text-xl font-bold text-rose">{s.category}</p>
                <p className="mt-3 flex gap-2 text-sm text-ink/75">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-rose" />
                  <span>
                    {s.place}, {s.address}
                  </span>
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-12">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-display text-3xl font-bold uppercase text-rose sm:text-4xl">{store.category}</h2>
            <span
              className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold ${
                open ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-700'
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${open ? 'bg-green-600' : 'bg-red-500'}`} />
              {open ? 'Buka sekarang' : 'Tutup sekarang'}
            </span>
          </div>

          <div className="mt-6 grid gap-8 md:grid-cols-[1.1fr_1fr_1fr]">
            <div>
              <div className="overflow-hidden rounded-2xl border border-thread/60 bg-white">
                <iframe
                  key={store.category}
                  title={`Peta toko ${store.category}`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(store.mapQuery)}&z=16&output=embed`}
                  className="h-64 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <a
                href={mapsLink(store.mapQuery)}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-sm font-semibold text-rose underline underline-offset-4"
              >
                Buka di Google Maps
              </a>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-lg font-bold uppercase tracking-wider text-ink">
                <Clock className="h-5 w-5 text-rose" />
                Jam buka
              </h3>
              <div className="mt-1 h-0.5 w-10 bg-rose" />
              <ul className="mt-4 space-y-2 text-sm">
                {DAYS.map((d) => (
                  <li key={d.label} className="flex justify-between gap-4 text-ink/75">
                    <span className="font-semibold text-ink">{d.label}</span>
                    <span>{d.open ? OPEN_HOURS.replace('Senin - Sabtu, ', '') : 'Tutup'}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-lg font-bold uppercase tracking-wider text-ink">
                <MapPin className="h-5 w-5 text-rose" />
                Alamat
              </h3>
              <div className="mt-1 h-0.5 w-10 bg-rose" />
              <p className="mt-4 font-bold text-mauve-deep">{store.place}</p>
              <p className="mt-1 text-ink/75">{store.address}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutLocation;
