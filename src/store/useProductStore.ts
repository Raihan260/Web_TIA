import { create } from 'zustand';
import type { Product } from '../data/products';
import { supabase } from '../lib/supabase';

interface ProductState {
  productList: Product[];
  isLoading: boolean;
  fetchProducts: () => Promise<void>;
  addProduct: (newProduct: Product) => Promise<boolean>;
}

export const useProductStore = create<ProductState>((set) => ({
  productList: [],
  isLoading: false,
  fetchProducts: async () => {
    set({ isLoading: true });
    const { data, error } = await supabase.from('products').select('*');

    if (error) {
      console.error('Error fetching products from Supabase:', error.message);
      set({ productList: [], isLoading: false });
      return;
    }

    set({ productList: (data ?? []) as Product[], isLoading: false });
  },
  addProduct: async (newProduct: Product) => {
    const { error } = await supabase.from('products').insert([newProduct]);

    if (error) {
      console.error('Error inserting product into Supabase:', error.message);
      return false;
    }

    set((state) => ({ productList: [...state.productList, newProduct] }));
    return true;
  },
}));
