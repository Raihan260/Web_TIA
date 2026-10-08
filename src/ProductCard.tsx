import type { FC } from 'react';
import { Shirt, ListChecks } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from './data/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const isOutOfStock = product.isAvailable === false;

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
          className={`h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:opacity-95 ${
            isOutOfStock ? 'grayscale' : ''
          }`}
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-pink-400 px-2 py-1 text-[11px] font-medium text-white shadow-sm shadow-pink-300/70">
          <Shirt className="h-3.5 w-3.5" />
          <span>{product.category}</span>
        </div>
        {isOutOfStock && (
          <div className="absolute right-3 top-3 rounded-full bg-slate-900/85 px-2 py-1 text-[11px] font-semibold text-white">
            Stok Habis
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 px-3 pb-3 pt-2.5 sm:gap-3 sm:px-4 sm:pb-4 sm:pt-3">
        <div>
          <h3 className="line-clamp-2 text-xs font-semibold tracking-tight text-slate-900 sm:text-sm">
            {product.name}
          </h3>
          <p className="mt-1 text-xs font-semibold text-orange-600 sm:text-sm">
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

        <div className="mt-1 sm:mt-2">
          <Link
            to={`/product/${product.id}`}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-slate-900 px-2 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800 sm:gap-2 sm:px-4 sm:text-sm"
          >
            <ListChecks className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
            <span className="truncate">{isOutOfStock ? 'Lihat Detail' : 'Pilih Seri'}</span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;