import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.error('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
}

// Kalau env var kosong, createClient('', '') akan langsung throw error dan
// meng-crash seluruh aplikasi (layar putih kosong tanpa pesan apa pun).
// Pakai URL placeholder yang valid secara format supaya aplikasi tetap bisa
// tampil (dengan pesan error yang jelas), bukan crash total.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-belum-dikonfigurasi.supabase.co',
  supabaseAnonKey || 'placeholder-key',
);