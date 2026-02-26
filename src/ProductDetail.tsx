import type { FC, MouseEvent } from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { products } from './data/products';
import ProductCard from './ProductCard'; // <-- Import komponen kartu produk
import { useCartStore } from './store/useCartStore';

const formatRupiah = (value: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

const ProductDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find((item) => item.id === id);
  const addToCart = useCartStore((state) => state.addToCart);
  const setIsCartOpen = useCartStore((state) => state.setIsCartOpen);

  const placeholderImage =
    'https://via.placeholder.com/800x600.png?text=Denim+Anak+Perempuan';

  // 1. PINDAHKAN HOOKS KE ATAS SINI (Wajib di React)
  const [activeImage, setActiveImage] = useState<string>('');

  const handleGoBack = (e: MouseEvent) => {
    e.preventDefault();
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/', { replace: true });
    }
  };

  useEffect(() => {
    if (product) {
      setActiveImage(product.imageUrl || placeholderImage);
      // Auto-scroll ke atas saat pindah halaman produk
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [product, placeholderImage, id]);

  // 2. KONDISI JIKA PRODUK TIDAK ADA (Harus di bawah hooks)
  if (!product) {
    return (
      <section className="bg-gray-50 py-12 min-h-[60vh] flex items-center">
        <div className="mx-auto max-w-4xl px-4 text-center w-full">
          <h1 className="text-2xl font-bold text-slate-900 mb-3">Produk tidak ditemukan</h1>
          <p className="text-slate-600 mb-6 text-sm">
            Maaf, produk yang Anda cari tidak tersedia atau sudah tidak aktif.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            Kembali ke Katalog
          </Link>
        </div>
      </section>
    );
  }

  const minPricePerPiece = Math.min(
    ...product.seriesOptions.map((option) => option.pricePerPiece),
  );

  // --- 3. LOGIKA REKOMENDASI PRODUK LAINNYA ---
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  // Jika produk dengan kategori sama kurang dari 4, pinjam produk dari kategori lain
  if (relatedProducts.length < 4) {
    const moreProducts = products
      .filter((p) => p.id !== product.id && p.category !== product.category)
      .slice(0, 4 - relatedProducts.length);
    relatedProducts.push(...moreProducts);
  }

  return (
    <div className="bg-white min-h-screen pb-16">
      <section className="border-t border-b border-slate-200 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="mb-6 text-sm text-slate-600">
            <Link
              to="/"
              onClick={handleGoBack}
              className="hover:text-slate-900 underline-offset-2 hover:underline"
            >
              &larr; Kembali ke Katalog
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="h-full w-full object-cover transition-opacity duration-300"
                />
              </div>
              {product.gallery && product.gallery.length > 0 && (
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                  {product.gallery.map((image) => {
                    const isActive = activeImage === image;
                    return (
                      <button
                        key={image}
                        type="button"
                        onClick={() => setActiveImage(image)}
                        className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 ${
                          isActive
                            ? 'border-pink-500'
                            : 'border-transparent hover:border-pink-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-700">
                <span className="uppercase tracking-wide">{product.category}</span>
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                  {product.name}
                </h1>
                <p className="text-base font-semibold text-orange-600">
                  Mulai {formatRupiah(minPricePerPiece)} / pcs
                </p>
              </div>

              <div className="rounded-lg bg-orange-500 px-3 py-2 text-xs font-extrabold text-white inline-flex items-center">
                HANYA JUAL PER SERI (Isi 3 pcs)
              </div>

              {product.tags && product.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-pink-50 px-2 py-0.5 text-[11px] font-medium text-pink-700 ring-1 ring-pink-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                  Pilihan Seri (1 Seri = 3 pcs)
                </p>
                <div className="mt-3 space-y-2">
                  {product.seriesOptions.map((option) => (
                    <div
                      key={option.name}
                      className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-xs ring-1 ring-slate-200"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-slate-800">{option.name}</p>
                        <p className="text-[11px] text-slate-500">
                          {formatRupiah(option.pricePerPiece)} / pcs
                        </p>
                      </div>
                      <p className="ml-3 whitespace-nowrap text-sm font-extrabold text-slate-900">
                        {formatRupiah(option.totalPrice)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => addToCart(product)}
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-slate-700/60 transition hover:bg-slate-800"
                >
                  Tambah Model Ini ke Keranjang
                </button>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(true)}
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
                >
                  Lihat Keranjang Saya
                </button>
                <Link
                  to="/"
                  onClick={handleGoBack}
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
                >
                  Kembali ke Katalog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- BAGIAN 4: REKOMENDASI PRODUK LAINNYA --- */}
      <section className="mx-auto max-w-6xl px-4 mt-12 md:mt-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">Mungkin Anda Juga Suka</h2>
            <p className="text-sm text-slate-600 mt-1">Rekomendasi model terlaris untuk melengkapi etalase toko Anda</p>
          </div>
          <Link to="/" className="text-sm font-bold text-pink-600 hover:text-pink-700 underline underline-offset-4">
            Lihat Semua Produk
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {relatedProducts.map((relatedProd) => (
            <ProductCard key={relatedProd.id} product={relatedProd} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;