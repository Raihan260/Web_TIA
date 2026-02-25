import type { FC } from 'react';
import { Shirt, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from './data/products';
import { useCartStore } from './store/useCartStore';

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

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
          <span>{product.category}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 px-4 pb-4 pt-3">
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

        <div className="mt-2 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => addToCart(product)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Tambah ke Keranjang</span>
          </button>
          <Link
            to={`/product/${product.id}`}
            className="inline-flex w-full items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
          >
            Lihat Detail
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
