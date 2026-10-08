import type { FC } from 'react';

const benefits = [
  {
    title: 'Harga langsung dari produsen',
    desc: 'Produk dibuat sendiri, tanpa perantara, sehingga harga modal lebih rendah untuk margin toko Anda.',
  },
  {
    title: 'Dijual per seri',
    desc: 'Satu seri berisi 3 pcs ukuran berurutan. Anda tinggal memilih seri sesuai kebutuhan toko.',
  },
  {
    title: 'Bahan nyaman, jahitan rapi',
    desc: 'Denim lembut dan gamis berbahan adem, dengan ukuran yang konsisten antar produksi.',
  },
  {
    title: 'Kirim ke seluruh Indonesia',
    desc: 'Pesanan dikirim lewat ekspedisi atau kargo pilihan Anda. Model yang laris diproduksi ulang.',
  },
];

const steps = [
  { title: 'Pilih seri', desc: 'Buka produk, lalu pilih seri ukuran yang Anda mau.' },
  { title: 'Masukkan keranjang', desc: 'Tambahkan beberapa model sekaligus. Estimasi total langsung terlihat.' },
  { title: 'Kirim ke WhatsApp', desc: 'Tekan checkout, daftar pesanan terkirim otomatis ke admin.' },
  { title: 'Admin konfirmasi', desc: 'Admin memastikan stok, total akhir, dan ongkir sebelum Anda membayar.' },
];

const Highlights: FC = () => {
  return (
    <>
      <section className="seam bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[0.8fr_1.2fr] md:py-20">
          <div>
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
              Kenapa belanja di Fathia Kids
            </h2>
            <p className="mt-3 max-w-sm text-ink/70">
              Kami menjual untuk pemilik toko dan reseller, jadi semuanya diatur supaya kulakan jadi mudah.
            </p>
          </div>
          <dl className="divide-y-2 divide-dashed divide-thread/70">
            {benefits.map((item) => (
              <div key={item.title} className="py-5 first:pt-0 last:pb-0">
                <dt className="font-display text-lg font-extrabold text-sage-deep">{item.title}</dt>
                <dd className="mt-1 max-w-xl text-ink/75">{item.desc}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="cara-pesan" className="bg-sage-soft">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Cara pesan</h2>
          <p className="mt-2 max-w-md text-ink/70">Empat langkah, semuanya lewat website dan WhatsApp.</p>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step.title} className="rounded-2xl bg-white p-5 ring-1 ring-blush">
                <span className="font-display text-3xl font-extrabold text-rose">{index + 1}</span>
                <h3 className="mt-2 text-base font-extrabold text-ink">{step.title}</h3>
                <p className="mt-1 text-sm text-ink/70">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
};

export default Highlights;
