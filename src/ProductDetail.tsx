import type { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { products } from './data/products';

const formatRupiah = (value: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

const ProductDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-3">Produk tidak ditemukan</h1>
          <p className="text-slate-600 mb-6 text-sm">
            Maaf, produk yang Anda cari tidak tersedia atau sudah tidak aktif.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            Kembali ke Katalog
          </Link>
        </div>
      </section>
    );
  }

  const placeholderImage =
    'https://via.placeholder.com/800x600.png?text=Denim+Anak+Perempuan';

  const minPricePerPiece = Math.min(
    ...product.seriesOptions.map((option) => option.pricePerPiece),
  );

  const whatsappMessage = encodeURIComponent(
    `Halo Admin TIA Collection, saya tertarik untuk pesan grosir model *${product.name}*. Boleh minta info stok serinya?`,
  );

  return (
    <section className="border-t border-b border-slate-200 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="mb-6 text-sm text-slate-600">
          <Link to="/" className="hover:text-slate-900 underline-offset-2 hover:underline">
            &larr; Kembali ke Katalog
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <img
                src={product.imageUrl || placeholderImage}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-700">
              <span className="uppercase tracking-wide">{product.category}</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                {product.name}
              </h1>
              <p className="text-base font-semibold text-orange-600">
                Mulai {formatRupiah(minPricePerPiece)} / pcs
              </p>
            </div>

            <div className="rounded-lg bg-orange-500 px-3 py-2 text-xs font-extrabold text-white inline-flex items-center">
              HANYA JUAL PER SERI (Isi 3 pcs)
            </div>

            {product.tags && product.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-pink-50 px-2 py-0.5 text-[11px] font-medium text-pink-700 ring-1 ring-pink-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                Pilihan Seri (1 Seri = 3 pcs)
              </p>
              <div className="mt-3 space-y-2">
                {product.seriesOptions.map((option) => (
                  <div
                    key={option.name}
                    className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-xs ring-1 ring-slate-200"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-800">{option.name}</p>
                      <p className="text-[11px] text-slate-500">
                        {formatRupiah(option.pricePerPiece)} / pcs
                      </p>
                    </div>
                    <p className="ml-3 whitespace-nowrap text-sm font-extrabold text-slate-900">
                      {formatRupiah(option.totalPrice)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={`https://wa.me/6285219847122?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-green-400/60 transition hover:bg-green-600"
              >
                Pesan Model Ini via WhatsApp
              </a>
              <Link
                to="/"
                className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
              >
                Kembali ke Katalog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
