import { create } from 'zustand';
import type { Product } from '../data/products';
import { supabase } from '../lib/supabase';

interface ProductState {
  productList: Product[];
  isLoading: boolean;
  fetchProducts: () => Promise<void>;
  addProduct: (newProduct: Product) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<void>;
  updateProduct: (id: string, updatedData: Partial<Product>) => Promise<void>;
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
  deleteProduct: async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);

    if (error) {
      console.error('Error deleting product from Supabase:', error.message);
      return;
    }

    set((state) => ({
      productList: state.productList.filter((product) => product.id !== id),
    }));
  },
  updateProduct: async (id: string, updatedData: Partial<Product>) => {
    const { error } = await supabase.from('products').update(updatedData).eq('id', id);

    if (error) {
      console.error('Error updating product in Supabase:', error.message);
      return;
    }

    set((state) => ({
      productList: state.productList.map((product) =>
        product.id === id ? { ...product, ...updatedData } : product,
      ),
    }));
  },
}));
