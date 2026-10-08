import { create } from 'zustand';
import type { Product, SeriesOption } from '../data/products';

export interface CartItem {
  product: Product;
  series: SeriesOption;
  quantity: number;
}

// Satu baris keranjang = kombinasi produk + seri yang dipilih.
export const getCartItemKey = (productId: string, seriesName: string) =>
  `${productId}::${seriesName}`;

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: Product, series: SeriesOption) => void;
  removeFromCart: (key: string) => void;
  updateQuantity: (key: string, delta: number) => void;
  setIsCartOpen: (isOpen: boolean) => void;
  cartCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isCartOpen: false,

  addToCart: (product, series) => {
    const { items } = get();
    const key = getCartItemKey(product.id, series.name);
    const exists = items.some((item) => getCartItemKey(item.product.id, item.series.name) === key);

    const newItems: CartItem[] = exists
      ? items.map((item) =>
          getCartItemKey(item.product.id, item.series.name) === key
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      : [...items, { product, series, quantity: 1 }];

    set({ items: newItems, isCartOpen: true });
  },

  removeFromCart: (key) => {
    set({
      items: get().items.filter((item) => getCartItemKey(item.product.id, item.series.name) !== key),
    });
  },

  updateQuantity: (key, delta) => {
    set({
      items: get().items.map((item) =>
        getCartItemKey(item.product.id, item.series.name) === key
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    });
  },

  setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),

  cartCount: () => get().items.reduce((total, item) => total + item.quantity, 0),
}));
