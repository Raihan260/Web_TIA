import { create } from 'zustand';
import type { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  setIsCartOpen: (isOpen: boolean) => void;
  cartCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isCartOpen: false,

  addToCart: (product) => {
    const { items } = get();
    const existingIndex = items.findIndex((item) => item.product.id === product.id);

    let newItems: CartItem[];
    if (existingIndex !== -1) {
      newItems = items.map((item, index) =>
        index === existingIndex ? { ...item, quantity: item.quantity + 1 } : item,
      );
    } else {
      newItems = [...items, { product, quantity: 1 }];
    }

    set({ items: newItems, isCartOpen: true });
  },

  removeFromCart: (productId) => {
    const { items } = get();
    const newItems = items.filter((item) => item.product.id !== productId);
    set({ items: newItems });
  },

  updateQuantity: (productId, delta) => {
    const { items } = get();
    const updatedItems = items
      .map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      )
      .filter((item) => item.quantity > 0);

    set({ items: updatedItems });
  },

  setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),

  cartCount: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.quantity, 0);
  },
}));
