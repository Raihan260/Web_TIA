import type { FC, FormEvent } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from './data/products';
import {
  denimSeriesOptions,
  shortDenimSeriesOptions,
  cottonSeriesOptions,
  skirtSeriesOptions,
  gamisSeriesOptions,
} from './data/products';
import { useProductStore } from './store/useProductStore';
import SeedData from './SeedData';

const categories = ['Denim Panjang', 'Denim Pendek', 'Rok Denim', 'Celana Katun', 'Gamis'] as const;

type Category = (typeof categories)[number];

const AdminPanel: FC = () => {
  const addProduct = useProductStore((state) => state.addProduct);

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>('Denim Panjang');
  const [imageUrl, setImageUrl] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!id.trim() || !name.trim()) {
      // Basic validation
      alert('ID dan Nama produk wajib diisi.');
      return;
    }

    let seriesOptions;
    switch (category) {
      case 'Denim Panjang':
        seriesOptions = denimSeriesOptions;
        break;
      case 'Denim Pendek':
        seriesOptions = shortDenimSeriesOptions;
        break;
      case 'Celana Katun':
        seriesOptions = cottonSeriesOptions;
        break;
      case 'Rok Denim':
        seriesOptions = skirtSeriesOptions;
        break;
      case 'Gamis':
        seriesOptions = gamisSeriesOptions;
        break;
      default:
        seriesOptions = denimSeriesOptions;
    }

    const tags = tagsInput
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const newProduct: Product = {
      id: id.trim(),
      name: name.trim(),
      category,
      imageUrl: imageUrl.trim() || undefined,
      tags: tags.length ? tags : undefined,
      seriesOptions,
    };

    try {
      setIsSaving(true);
      const success = await addProduct(newProduct);

      if (success) {
        alert('Produk Berhasil Ditambahkan');

        setId('');
        setName('');
        setCategory('Denim Panjang');
        setImageUrl('');
        setTagsInput('');
      } else {
        alert('Gagal menyimpan produk. Silakan coba lagi.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Admin Panel</h1>
            <p className="mt-1 text-sm text-slate-600">
              Tambahkan produk baru ke katalog tanpa perlu mengubah kode.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
          >
            Kembali ke Katalog
          </Link>
        </div>

        <SeedData />

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="id" className="block text-xs font-semibold uppercase tracking-wide text-slate-700">
                  ID Produk
                </label>
                <input
                  id="id"
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="Contoh: jeans-skena-9999"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-0 transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                />
                <p className="text-[11px] text-slate-500">Gunakan format yang konsisten dan unik.</p>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wide text-slate-700">
                  Nama Produk
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Celana Jeans Skena (Kd: 5099)"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-0 transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="category" className="block text-xs font-semibold uppercase tracking-wide text-slate-700">
                  Kategori
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-0 transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-500">
                  Harga per seri akan mengikuti kategori yang dipilih.
                </p>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="imageUrl" className="block text-xs font-semibold uppercase tracking-wide text-slate-700">
                  URL Gambar Utama
                </label>
                <input
                  id="imageUrl"
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Contoh: /images/Celana-jeans-skena-Kd-5099.jpg"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-0 transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                />
                <p className="text-[11px] text-slate-500">Bisa berupa path lokal atau URL penuh.</p>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="tags" className="block text-xs font-semibold uppercase tracking-wide text-slate-700">
                Tag Produk (Opsional)
              </label>
              <input
                id="tags"
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Contoh: Best Seller, Bahan Melar, Limited"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-0 transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
              />
              <p className="text-[11px] text-slate-500">Pisahkan dengan koma untuk beberapa tag.</p>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
              <p className="text-[11px] text-slate-500">
                Data produk akan tersimpan langsung di database Supabase.
              </p>
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center justify-center rounded-full bg-pink-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-pink-700 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Menyimpan...' : 'Simpan Produk'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;
