import type { FC, FormEvent } from 'react';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product, SeriesOption } from './data/products';
import {
  denimSeriesOptions,
  shortDenimSeriesOptions,
  cottonSeriesOptions,
  skirtSeriesOptions,
  gamisSeriesOptions,
} from './data/products';
import { useProductStore } from './store/useProductStore';
import SeedData from './SeedData';
import AdminLogin from './AdminLogin';

const categories = ['Denim Panjang', 'Denim Pendek', 'Rok Denim', 'Celana Katun', 'Gamis'] as const;

type Category = (typeof categories)[number];

const getDefaultSeries = (cat: Category): SeriesOption[] => {
  switch (cat) {
    case 'Denim Panjang':
      return denimSeriesOptions.map((option) => ({ ...option }));
    case 'Denim Pendek':
      return shortDenimSeriesOptions.map((option) => ({ ...option }));
    case 'Celana Katun':
      return cottonSeriesOptions.map((option) => ({ ...option }));
    case 'Rok Denim':
      return skirtSeriesOptions.map((option) => ({ ...option }));
    case 'Gamis':
      return gamisSeriesOptions.map((option) => ({ ...option }));
    default:
      return denimSeriesOptions.map((option) => ({ ...option }));
  }
};

const AdminPanel: FC = () => {
  const addProduct = useProductStore((state) => state.addProduct);
  const productList = useProductStore((state) => state.productList);
  const deleteProduct = useProductStore((state) => state.deleteProduct);
  const updateProduct = useProductStore((state) => state.updateProduct);

  const [isAuthenticated, setIsAuthenticated] = useState(
    () => typeof window !== 'undefined' && sessionStorage.getItem('admin_auth') === 'true',
  );
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>('Denim Panjang');
  const [imageUrl, setImageUrl] = useState('');
  const [galleryUrls, setGalleryUrls] = useState<string[]>([]);
  const [tagsInput, setTagsInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [customSeries, setCustomSeries] = useState<SeriesOption[]>(() =>
    getDefaultSeries('Denim Panjang'),
  );
  const [adminSearch, setAdminSearch] = useState('');

  const adminSearchNormalized = adminSearch.trim().toLowerCase();

  const filteredAdminProducts = productList.filter((product) => {
    if (!adminSearchNormalized) return true;
    return (
      product.name.toLowerCase().includes(adminSearchNormalized) ||
      product.id.toLowerCase().includes(adminSearchNormalized)
    );
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!id.trim() || !name.trim()) {
      // Basic validation
      alert('ID dan Nama produk wajib diisi.');
      return;
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
      gallery: galleryUrls.filter((url) => url.trim().length > 0),
      tags: tags.length ? tags : undefined,
      seriesOptions: customSeries,
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
      setGalleryUrls([]);
      setCustomSeries(getDefaultSeries('Denim Panjang'));
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
    setGalleryUrls([]);
    setCustomSeries(getDefaultSeries('Denim Panjang'));
  };

  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLoginSuccess={() => {
          setIsAuthenticated(true);
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('admin_auth', 'true');
          }
        }}
      />
    );
  }

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
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  sessionStorage.removeItem('admin_auth');
                }
                setIsAuthenticated(false);
              }}
              className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              Logout
            </button>
            <Link
              to="/"
              className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              Kembali ke Katalog
            </Link>
          </div>
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
                  className={`w-full rounded-lg border px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-0 transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100 ${editingId !== null
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
                  onChange={(e) => {
                    const cat = e.target.value as Category;
                    setCategory(cat);
                    if (!editingId) {
                      setCustomSeries(getDefaultSeries(cat));
                    }
                  }}
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

            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-700">
                Galeri Gambar Tambahan (Opsional)
              </label>
              <p className="text-[11px] text-slate-500">
                Tambahkan URL foto lain untuk varian warna atau angle berbeda. Opsional.
              </p>
              <div className="mt-1 space-y-2">
                {galleryUrls.map((url, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => {
                        const value = e.target.value;
                        setGalleryUrls((prev) =>
                          prev.map((item, idx) => (idx === index ? value : item)),
                        );
                      }}
                      placeholder="Masukkan URL varian warna atau angle lain..."
                      className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm outline-none ring-0 transition focus:border-pink-300 focus:ring-2 focus:ring-pink-100"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setGalleryUrls((prev) => prev.filter((_, idx) => idx !== index));
                      }}
                      className="rounded-full bg-red-50 px-3 py-1 text-[10px] font-semibold text-red-600 ring-1 ring-red-100 transition hover:bg-red-100"
                    >
                      Hapus
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setGalleryUrls((prev) => [...prev, ''])}
                className="mt-1 inline-flex items-center rounded-full border border-dashed border-slate-300 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-700 shadow-sm transition hover:border-pink-300 hover:text-pink-700"
              >
                + Tambah Foto Galeri
              </button>
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

            <div className="mt-4 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                Atur Pilihan Seri &amp; Harga
              </p>
              <div className="mt-3 space-y-3">
                {customSeries.map((series, index) => (
                  <div
                    key={index}
                    className="grid gap-2 rounded-lg bg-white p-3 text-xs ring-1 ring-slate-200 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.5fr)_auto] md:items-end"
                  >
                    <div className="space-y-1">
                      <label className="block text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                        Nama Seri
                      </label>
                      <input
                        type="text"
                        value={series.name}
                        onChange={(e) => {
                          const value = e.target.value;
                          setCustomSeries((prev) =>
                            prev.map((item, idx) =>
                              idx === index ? { ...item, name: value } : item,
                            ),
                          );
                        }}
                        className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-900 shadow-sm outline-none ring-0 transition focus:border-pink-300 focus:ring-2 focus:ring-pink-100"
                        placeholder="Seri 1 (Uk. 4, 5, 6)"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                        Harga / Pcs
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={series.pricePerPiece}
                        onChange={(e) => {
                          const price = Number(e.target.value) || 0;
                          setCustomSeries((prev) =>
                            prev.map((item, idx) =>
                              idx === index
                                ? {
                                  ...item,
                                  pricePerPiece: price,
                                  totalPrice: price * (item.pieces || 3),
                                }
                                : item,
                            ),
                          );
                        }}
                        className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-900 shadow-sm outline-none ring-0 transition focus:border-pink-300 focus:ring-2 focus:ring-pink-100"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                        Jml Pcs
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={series.pieces || 3}
                        onChange={(e) => {
                          const newPieces = Number(e.target.value) || 3;
                          setCustomSeries((prev) =>
                            prev.map((item, idx) =>
                              idx === index
                                ? {
                                  ...item,
                                  pieces: newPieces,
                                  totalPrice: item.pricePerPiece * newPieces,
                                }
                                : item,
                            ),
                          );
                        }}
                        className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-900 shadow-sm outline-none ring-0 transition focus:border-pink-300 focus:ring-2 focus:ring-pink-100"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                        Total 1 Seri
                      </label>
                      <input
                        type="text"
                        value={series.totalPrice}
                        disabled
                        className="w-full rounded-lg border border-slate-100 bg-slate-50 px-2 py-1.5 text-xs text-slate-700 shadow-sm outline-none"
                      />
                    </div>
                    <div className="flex items-end justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          setCustomSeries((prev) =>
                            prev.filter((_, idx) => idx !== index),
                          );
                        }}
                        className="rounded-full bg-red-50 px-3 py-1 text-[10px] font-semibold text-red-600 ring-1 ring-red-100 transition hover:bg-red-100"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() =>
                  setCustomSeries((prev) => [
                    ...prev,
                    { name: '', pricePerPiece: 0, pieces: 3, totalPrice: 0 },
                  ])
                }
                className="mt-3 inline-flex items-center rounded-full border border-dashed border-slate-300 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-700 shadow-sm transition hover:border-pink-300 hover:text-pink-700"
              >
                + Tambah Seri
              </button>
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

          <div className="mb-4">
            <div className="relative w-full max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={adminSearch}
                onChange={(e) => setAdminSearch(e.target.value)}
                placeholder="Cari produk berdasarkan nama atau ID..."
                className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 pl-9 text-sm text-slate-900 shadow-sm outline-none ring-0 transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
              />
            </div>
          </div>

          {productList.length === 0 ? (
            <p className="text-sm text-slate-500">Belum ada produk. Tambahkan produk baru terlebih dahulu.</p>
          ) : filteredAdminProducts.length === 0 ? (
            <p className="text-sm text-slate-500">Produk tidak ditemukan.</p>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {filteredAdminProducts.map((product) => (
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
                        setGalleryUrls(product.gallery || []);
                        setCustomSeries(
                          product.seriesOptions && product.seriesOptions.length > 0
                            ? product.seriesOptions
                            : getDefaultSeries(product.category as Category),
                        );
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
