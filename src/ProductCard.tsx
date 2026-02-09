import type { FC } from 'react';
import { Shirt } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  sizeRange: string[];
  wholesalePrice: string;
  minimumOrder: string;
  imageUrl?: string;
  tags?: string[];
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const placeholderImage =
    'https://via.placeholder.com/400x300.png?text=Denim+Anak+Perempuan';

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
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-slate-900">
            {product.name}
          </h3>
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

        <div className="space-y-2 rounded-lg bg-slate-50 p-3 text-xs text-slate-700">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
              Ukuran
            </span>
            <div className="flex flex-wrap gap-1">
              {product.sizeRange.map((size) => (
                <span
                  key={size}
                  className="inline-flex h-6 min-w-[1.75rem] items-center justify-center rounded-full bg-white px-2 text-[11px] font-semibold text-slate-800 ring-1 ring-slate-200"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
              Harga Grosir
            </span>
            <span className="text-xs font-semibold text-slate-900">
              {product.wholesalePrice}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
              Minimal Order
            </span>
            <span className="text-xs font-medium text-slate-900">
              {product.minimumOrder}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
