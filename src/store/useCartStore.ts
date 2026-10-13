import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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
  /** Tambah seri ke keranjang. `quantity` dipakai kalau pembeli sudah memilih jumlah di halaman produk. */
  addToCart: (product: Product, series: SeriesOption, quantity?: number) => void;
  removeFromCart: (key: string) => void;
  updateQuantity: (key: string, delta: number) => void;
  setIsCartOpen: (isOpen: boolean) => void;
  cartCount: () => number;
  /** Samakan isi keranjang dengan data produk terbaru dari basis data. */
  syncWithProducts: (products: Product[]) => void;
}

// Keranjang disimpan di penyimpanan browser supaya isinya tidak hilang
// saat halaman dimuat ulang atau pengunjung kembali lagi nanti. Hanya isi
// keranjang yang disimpan; status laci terbuka selalu mulai dari tertutup.
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,

      addToCart: (product, series, quantity = 1) => {
        const { items } = get();
        const key = getCartItemKey(product.id, series.name);
        const exists = items.some((item) => getCartItemKey(item.product.id, item.series.name) === key);

        const tambahan = Math.max(1, Math.round(quantity));
        const newItems: CartItem[] = exists
          ? items.map((item) =>
              getCartItemKey(item.product.id, item.series.name) === key
                ? { ...item, quantity: item.quantity + tambahan }
                : item,
            )
          : [...items, { product, series, quantity: tambahan }];

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

      // Keranjang menyimpan salinan produk, jadi setelah dimuat ulang isinya bisa
      // basi: harga berubah, seri dihapus, atau produknya sudah tidak ada. Begitu
      // daftar produk terbaru datang, baris keranjang disegarkan dari daftar itu
      // dan baris yang produknya hilang dibuang.
      syncWithProducts: (products) => {
        const { items } = get();
        if (items.length === 0 || products.length === 0) return;

        const fresh = items.flatMap((item) => {
          const product = products.find((p) => p.id === item.product.id);
          if (!product) return [];
          const series = product.seriesOptions.find((o) => o.name === item.series.name);
          if (!series) return [];
          return [{ ...item, product, series }];
        });

        const changed =
          fresh.length !== items.length ||
          fresh.some((item, i) => item.product !== items[i].product || item.series !== items[i].series);
        if (changed) set({ items: fresh });
      },
    }),
    {
      name: 'fathiakids-keranjang',
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
