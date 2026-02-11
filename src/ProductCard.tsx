import type { FC } from 'react';
import { Shirt } from 'lucide-react';

export interface SeriesOption {
  name: string;
  pricePerPiece: number;
  totalPrice: number;
}

export interface Product {
  id: string;
  name: string;
  imageUrl?: string;
  tags?: string[];
  seriesOptions: SeriesOption[];
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const placeholderImage =
    'https://via.placeholder.com/400x300.png?text=Denim+Anak+Perempuan';

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

  const minPricePerPiece = Math.min(
    ...product.seriesOptions.map((option) => option.pricePerPiece),
  );

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={product.imageUrl || placeholderImage}
          alt={product.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:opacity-95"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-pink-400 px-2 py-1 text-[11px] font-medium text-white shadow-sm shadow-pink-300/70">
          <Shirt className="h-3.5 w-3.5" />
          <span>Denim Kids</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 px-4 pb-4 pt-3">
        <div className="rounded-lg bg-orange-500 px-3 py-2 text-center text-xs font-extrabold text-white">
          HANYA JUAL PER SERI (Isi 3 pcs)
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-tight text-slate-900">
            {product.name}
          </h3>
          <p className="mt-1 text-sm font-semibold text-orange-600">
            Mulai {formatRupiah(minPricePerPiece)} / pcs
          </p>
          {product.tags && product.tags.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-pink-50 px-2 py-0.5 text-[10px] font-medium text-pink-700 ring-1 ring-pink-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-lg bg-slate-50 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
            Pilih Seri (1 Seri = 3 pcs)
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {product.seriesOptions.map((option) => (
              <div
                key={option.name}
                className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-xs ring-1 ring-slate-200"
              >
                <div className="min-w-0">
                  <p className="truncate font-semibold text-slate-800">{option.name}</p>
                  <p className="text-[11px] text-slate-500">
                    {formatRupiah(option.pricePerPiece)} / pcs
                  </p>
                </div>
                <p className="ml-3 whitespace-nowrap font-extrabold text-slate-900">
                  {formatRupiah(option.totalPrice)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
