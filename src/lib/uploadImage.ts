import { supabase } from './supabase';

const STORAGE_BUCKET = 'product-images';

/**
 * Upload satu file gambar ke Supabase Storage dan kembalikan URL publiknya.
 * Nama file dibuat unik (timestamp + nama asli yang sudah dibersihkan) supaya
 * tidak saling menimpa antar produk.
 */
export async function uploadImageToStorage(file: File): Promise<{ url: string | null; error?: string }> {
  const sanitizedName = file.name
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, '-')
    .replace(/-+/g, '-');

  const filePath = `${Date.now()}-${sanitizedName}`;

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    console.error('Error uploading image to Supabase Storage:', uploadError.message);
    return { url: null, error: uploadError.message };
  }

  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filePath);
  return { url: data.publicUrl };
}
