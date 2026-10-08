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
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-ink/10 transition hover:ring-2 hover:ring-blush">
      <Link to={`/product/${product.id}`} className="relative block aspect-[4/5] overflow-hidden bg-sage-soft">
        <img
          src={product.imageUrl || placeholderImage}
          alt={product.name}
          className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${
            isOutOfStock ? 'grayscale' : ''
          }`}
          loading="lazy"
        />
        <span className="absolute left-2.5 top-2.5 hidden items-center gap-1 sm:inline-flex rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-sage-deep">
          <Shirt className="h-3.5 w-3.5" />
          {product.category}
        </span>
        {isOutOfStock && (
          <span className="absolute right-2.5 top-2.5 rounded-full bg-ink px-2.5 py-1 text-[11px] font-bold text-white">
            Stok habis
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-3 sm:p-4">
        <div>
          <h3 className="line-clamp-2 text-sm font-extrabold text-ink sm:text-base">{product.name}</h3>
          <p className="mt-1 text-sm font-bold text-rose">
            Mulai {formatRupiah(minPricePerPiece)} <span className="font-medium text-ink/60">/ pcs</span>
          </p>
          <p className="mt-0.5 text-xs text-ink/60">
            {product.seriesOptions.length} pilihan seri, isi {product.seriesOptions[0]?.pieces ?? 3} pcs
          </p>
          {product.tags && product.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-sage-soft px-2 py-0.5 text-[11px] font-semibold text-sage-deep"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <Link
          to={`/product/${product.id}`}
          className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full bg-sage px-3 py-2.5 text-sm font-bold text-white transition hover:bg-sage-deep"
        >
          <ListChecks className="h-4 w-4 shrink-0" />
          {isOutOfStock ? 'Lihat detail' : 'Pilih seri'}
        </Link>
      </div>
    </article>
  );
};

export default ProductCard;
