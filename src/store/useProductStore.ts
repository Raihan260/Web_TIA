import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../data/products';
import { products } from '../data/products';

interface ProductState {
  productList: Product[];
  addProduct: (newProduct: Product) => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      productList: products,
      addProduct: (newProduct) =>
        set((state) => ({ productList: [...state.productList, newProduct] })),
    }),
    {
      name: 'tia-product-store',
    },
  ),
);
