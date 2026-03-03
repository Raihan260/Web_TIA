import type { FC } from 'react';
import { useState } from 'react';
import { supabase } from './lib/supabase';
import { products } from './data/products';

const SeedData: FC = () => {
  const [isSeeding, setIsSeeding] = useState(false);

  const handleSeed = async () => {
    if (isSeeding) return;

    const confirmSeed = window.confirm(
      'Apakah Anda yakin ingin memigrasi semua data produk awal ke Supabase?\n\nTombol ini sebaiknya hanya digunakan sekali.',
    );

    if (!confirmSeed) return;

    try {
      setIsSeeding(true);

      // Hanya kirim field yang ada di tabel Supabase (tanpa gallery)
      const payload = products.map(({ gallery, ...rest }) => rest);

      const { error } = await supabase.from('products').insert(payload);

      if (error) {
        console.error('Error seeding products to Supabase:', error.message);
        alert(`Gagal memigrasi data: ${error.message}`);
        return;
      }

      alert('Berhasil memigrasi data produk ke Supabase!');
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan tak terduga saat migrasi data.');
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
      <h2 className="mb-2 text-base font-semibold">🔥 Migrasi Data Awal ke Supabase</h2>
      <p className="mb-3 text-xs text-amber-800">
        Gunakan tombol ini untuk mengirim seluruh data produk awal dari aplikasi ke database Supabase.
        Disarankan hanya diklik satu kali saat setup awal.
      </p>
      <button
        type="button"
        onClick={handleSeed}
        disabled={isSeeding}
        className="inline-flex items-center justify-center rounded-full bg-amber-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSeeding ? 'Sedang Migrasi…' : 'MIGRASI DATA KE SUPABASE'}
      </button>
    </div>
  );
};

export default SeedData;
