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
  const productList = useProductStore((state) => state.productList);
  const deleteProduct = useProductStore((state) => state.deleteProduct);
  const updateProduct = useProductStore((state) => state.updateProduct);

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>('Denim Panjang');
  const [imageUrl, setImageUrl] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

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
      if (editingId) {
        await updateProduct(editingId, newProduct);
        alert('Produk Berhasil Diperbarui!');
      } else {
        const success = await addProduct(newProduct);

        if (!success) {
          alert('Gagal menyimpan produk. Silakan coba lagi.');
          return;
        }

        alert('Produk Berhasil Ditambahkan!');
      }

      setId('');
      setName('');
      setCategory('Denim Panjang');
      setImageUrl('');
      setTagsInput('');
      setEditingId(null);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setId('');
    setName('');
    setCategory('Denim Panjang');
    setImageUrl('');
    setTagsInput('');
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
                  disabled={editingId !== null}
                  className={`w-full rounded-lg border px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-0 transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100 ${
                    editingId !== null
                      ? 'border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed'
                      : 'border-slate-200 bg-white'
                  }`}
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
              <div className="flex items-center gap-3">
                {editingId !== null && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
                  >
                    Batal Edit
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center justify-center rounded-full bg-pink-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-pink-700 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSaving
                    ? editingId
                      ? 'Menyimpan Perubahan...'
                      : 'Menyimpan...'
                    : editingId
                      ? 'Update Produk'
                      : 'Tambah Produk Baru'}
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="mt-10 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="mb-4 flex items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Daftar Produk</h2>
              <p className="text-xs text-slate-500">Kelola produk yang sudah tersimpan di Supabase.</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-700">
              Total: {productList.length}
            </span>
          </div>

          {productList.length === 0 ? (
            <p className="text-sm text-slate-500">Belum ada produk. Tambahkan produk baru terlebih dahulu.</p>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {productList.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3"
                >
                  <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-white ring-1 ring-slate-200">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[10px] text-slate-400">
                        Tidak ada gambar
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900">{product.name}</p>
                    <p className="text-[11px] text-slate-500">ID: {product.id}</p>
                    <p className="text-[11px] text-slate-500">Kategori: {product.category}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(product.id);
                        setId(product.id);
                        setName(product.name);
                        setCategory(product.category as Category);
                        setImageUrl(product.imageUrl ?? '');
                        setTagsInput(product.tags ? product.tags.join(', ') : '');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold text-white shadow-sm transition hover:bg-slate-800"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm('Yakin ingin menghapus produk ini?')) {
                          deleteProduct(product.id);
                        }
                      }}
                      className="rounded-full bg-red-600 px-3 py-1 text-[11px] font-semibold text-white shadow-sm transition hover:bg-red-700"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;
