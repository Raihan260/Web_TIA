import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { StepsList } from './Highlights';
import { waLink } from './lib/contact';
import { usePageTitle } from './lib/usePageTitle';

const notes = [
  'Harga tertera per pcs dan dijual per seri. Isi satu seri berbeda di tiap model, tetapi selalu lebih dari 1 pcs. Jumlah dan ukurannya tertera di halaman produk.',
  'Stok bisa berubah sewaktu-waktu, jadi admin akan memastikan ketersediaan sebelum Anda membayar.',
  'Total akhir dan ongkir dikonfirmasi admin lewat WhatsApp. Estimasi di keranjang belum termasuk ongkir.',
  'Pesanan dikirim lewat ekspedisi atau kargo pilihan Anda.',
];

const HowToOrderPage: FC = () => {
  usePageTitle('Cara Pesan');

  return (
    <div className="bg-cream-deep">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <SectionHeading
          as="h1"
          title="Cara pesan"
          subtitle="Empat langkah, semuanya lewat website dan WhatsApp."
        />

        <div className="mt-10">
          <StepsList />
        </div>

        <div className="mx-auto mt-12 max-w-2xl rounded-2xl bg-white p-6 ring-1 ring-blush">
          <h2 className="font-display text-lg font-extrabold text-ink">Perlu diketahui</h2>
          <ul className="mt-3 space-y-2 text-ink/75">
            {notes.map((note) => (
              <li key={note} className="flex gap-2">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/katalog"
            className="rounded-full bg-rose px-7 py-3.5 text-sm font-bold text-white transition hover:bg-rose-deep"
          >
            Lihat katalog
          </Link>
          <a
            href={waLink('Halo Admin Fathia Kids, saya mau tanya cara pemesanan grosir.')}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-green-600 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-green-700"
          >
            <MessageCircle className="h-4 w-4" />
            Tanya admin
          </a>
        </div>
      </div>
    </div>
  );
};

export default HowToOrderPage;
