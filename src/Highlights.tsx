import type { FC } from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from './SectionHeading';

const benefits = [
  {
    title: 'Harga langsung dari produsen',
    desc: 'Dibuat sendiri tanpa perantara, jadi harga modal lebih rendah untuk margin toko Anda.',
  },
  {
    title: 'Dijual per seri',
    desc: 'Satu seri berisi 3 pcs ukuran berurutan. Pilih seri sesuai kebutuhan toko.',
  },
  {
    title: 'Bahan nyaman, jahitan rapi',
    desc: 'Bahan nyaman dipakai anak, dengan ukuran yang konsisten antar produksi.',
  },
  {
    title: 'Kirim ke seluruh Indonesia',
    desc: 'Dikirim lewat ekspedisi atau kargo pilihan Anda. Model laris diproduksi ulang.',
  },
];

const steps = [
  { title: 'Pilih seri', desc: 'Buka produk, lalu pilih seri ukuran yang Anda mau.' },
  { title: 'Masukkan keranjang', desc: 'Tambah beberapa model sekaligus, estimasi total langsung terlihat.' },
  { title: 'Kirim ke WhatsApp', desc: 'Daftar pesanan terkirim otomatis ke admin lewat WhatsApp.' },
  { title: 'Admin konfirmasi', desc: 'Admin memastikan stok, total, dan ongkir sebelum Anda membayar.' },
];

export const Benefits: FC = () => {
  return (
    <section className="seam bg-cream-light">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[0.8fr_1.2fr] md:py-16">
        <div>
          <SectionHeading
            align="left"
            title="Kenapa belanja di Fathia Kids"
            subtitle="Kami menjual untuk pemilik toko dan reseller, jadi semuanya diatur supaya kulakan jadi mudah."
          />
        </div>
        <dl className="divide-y-2 divide-dashed divide-thread/70">
          {benefits.map((item) => (
            <div key={item.title} className="py-5 first:pt-0 last:pb-0">
              <dt className="font-display text-lg font-extrabold text-mauve-deep">{item.title}</dt>
              <dd className="mt-1 max-w-xl text-sm text-ink/75 sm:text-base">{item.desc}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export const StepsList: FC = () => (
  <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {steps.map((step, index) => (
      <li key={step.title} className="rounded-2xl bg-white p-5 ring-1 ring-blush">
        <span className="font-display text-3xl font-extrabold text-rose">{index + 1}</span>
        <h3 className="mt-2 text-base font-extrabold text-ink">{step.title}</h3>
        <p className="mt-1 text-sm text-ink/70">{step.desc}</p>
      </li>
    ))}
  </ol>
);

// Ringkasan di halaman utama, dengan link ke halaman Cara pesan.
export const HowToOrderPreview: FC = () => {
  return (
    <section className="bg-cream-deep">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <SectionHeading title="Cara pesan" subtitle="Empat langkah, semuanya lewat website dan WhatsApp." />
        <div className="mt-10">
          <StepsList />
        </div>
        <div className="mt-8 flex justify-center">
          <Link
            to="/cara-pesan"
            className="rounded-full border-2 border-rose px-7 py-3 text-sm font-bold text-rose transition hover:bg-rose hover:text-white"
          >
            Lihat panduan lengkap
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
