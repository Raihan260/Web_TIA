import type { FC } from 'react';
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

  const mainImage = product.imageUrl || placeholderImage;
  const hoverImage = product.gallery?.find((image) => image && image !== product.imageUrl);
  const seriesCount = product.seriesOptions.length;

  return (
    <Link to={`/product/${product.id}`} className="group block h-full">
      <article className="flex h-full flex-col">
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-cream-deep">
          <img
            src={mainImage}
            alt={product.name}
            className={`absolute inset-0 h-full w-full object-cover transition duration-500 ${
              hoverImage ? '' : 'group-hover:scale-105'
            } ${isOutOfStock ? 'grayscale' : ''}`}
            loading="lazy"
          />
          {hoverImage && (
            <img
              src={hoverImage}
              alt=""
              aria-hidden="true"
              className={`absolute inset-0 h-full w-full object-cover opacity-0 transition duration-500 group-hover:opacity-100 ${
                isOutOfStock ? 'grayscale' : ''
              }`}
              loading="lazy"
            />
          )}

          {product.tags && product.tags.length > 0 && (
            <div className="absolute left-2 top-2 flex flex-wrap gap-1">
              {product.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={tag}
                  className={`${index > 0 ? 'hidden sm:inline' : ''} rounded bg-white/95 px-2 py-0.5 text-[11px] font-semibold text-mauve-deep`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {isOutOfStock ? (
            <span className="absolute right-2 top-2 rounded bg-ink px-2 py-0.5 text-[11px] font-semibold text-white">
              Stok habis
            </span>
          ) : (
            <span className="absolute right-2 top-2 rounded bg-rose px-2 py-0.5 text-[11px] font-semibold text-white">
              Per seri<span className="hidden sm:inline"> ({seriesCount} pilihan)</span>
            </span>
          )}
        </div>

        <div className="mt-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-ink/50">{product.category}</p>
          <h3 className="mt-1 line-clamp-2 text-base font-medium leading-snug text-ink sm:text-lg">
            {product.name}
          </h3>
          <p className="mt-1 text-sm font-bold text-rose sm:text-base">
            Mulai {formatRupiah(minPricePerPiece)} <span className="font-medium text-ink/60">/ pcs</span>
          </p>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;
