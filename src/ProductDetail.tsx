import type { FC, MouseEvent } from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { STORES, storeAnchor } from './lib/contact';
import ProductCard from './ProductCard'; // <-- Import komponen kartu produk
import { useCartStore } from './store/useCartStore';
import { useProductStore } from './store/useProductStore';

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
  const productList = useProductStore((state) => state.productList);
  const product = productList.find((item) => item.id === id);
  const addToCart = useCartStore((state) => state.addToCart);
  const setIsCartOpen = useCartStore((state) => state.setIsCartOpen);

  const placeholderImage =
    'https://via.placeholder.com/800x600.png?text=Denim+Anak+Perempuan';

  // 1. PINDAHKAN HOOKS KE ATAS SINI (Wajib di React)
  const [activeImage, setActiveImage] = useState<string>('');
  const [selectedSeriesName, setSelectedSeriesName] = useState<string>('');
  // Melacak produk terakhir yang sudah di-render, untuk tahu kapan harus
  // me-reset activeImage (dilakukan saat render, bukan di useEffect, mengikuti
  // pola resmi React untuk "Resetting state when a prop changes":
  // https://react.dev/learn/you-might-not-need-an-effect
  const [renderedProductId, setRenderedProductId] = useState<string | undefined>(undefined);

  const handleGoBack = (e: MouseEvent) => {
    e.preventDefault();
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/katalog', { replace: true });
    }
  };

  if (product && renderedProductId !== product.id) {
    setRenderedProductId(product.id);
    setActiveImage(product.imageUrl || placeholderImage);
    setSelectedSeriesName('');
  }

  useEffect(() => {
    // Auto-scroll ke atas saat pindah halaman produk (efek terhadap sistem
    // eksternal/DOM, jadi memang tempatnya di useEffect, bukan setState).
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // 2. KONDISI JIKA PRODUK TIDAK ADA (Harus di bawah hooks)
  if (!product) {
    return (
      <section className="bg-paper py-12 min-h-[60vh] flex items-center">
        <div className="mx-auto max-w-4xl px-4 text-center w-full">
          <h1 className="text-2xl font-bold text-ink mb-3">Produk tidak ditemukan</h1>
          <p className="text-slate-600 mb-6 text-sm">
            Maaf, produk yang Anda cari tidak tersedia atau sudah tidak aktif.
          </p>
          <Link
            to="/katalog"
            className="inline-flex items-center justify-center rounded-full bg-mauve px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-mauve-deep"
          >
            Kembali ke Katalog
          </Link>
        </div>
      </section>
    );
  }

  // Seri terpilih; kalau belum memilih, otomatis seri pertama.
  const selectedSeries =
    product.seriesOptions.find((option) => option.name === selectedSeriesName) ??
    product.seriesOptions[0];

  const minPricePerPiece = Math.min(
    ...product.seriesOptions.map((option) => option.pricePerPiece),
  );

  // --- 3. LOGIKA REKOMENDASI PRODUK LAINNYA ---
  const relatedProducts = productList
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  // Jika produk dengan kategori sama kurang dari 4, pinjam produk dari kategori lain
  if (relatedProducts.length < 4) {
    const moreProducts = productList
      .filter((p) => p.id !== product.id && p.category !== product.category)
      .slice(0, 4 - relatedProducts.length);
    relatedProducts.push(...moreProducts);
  }

  return (
    <div className="min-h-screen bg-paper pb-28 md:pb-16">
      <section className="border-t border-b border-slate-200 bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="mb-6 text-sm text-slate-600">
            <Link
              to="/katalog"
              onClick={handleGoBack}
              className="hover:text-ink underline-offset-2 hover:underline"
            >
              &larr; Kembali ke Katalog
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <div className="aspect-[4/5] max-h-[78vh] w-full overflow-hidden rounded-2xl border border-thread/60 bg-cream-light shadow-sm">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="h-full w-full object-contain transition-opacity duration-300"
                />
              </div>
              {(() => {
                // Gabungkan gambar utama + galeri jadi satu daftar thumbnail,
                // supaya gambar utama juga bisa diklik balik (bukan cuma galeri tambahan).
                const allImages = [
                  product.imageUrl,
                  ...(product.gallery ?? []),
                ].filter((image, index, arr): image is string => {
                  return Boolean(image) && arr.indexOf(image) === index;
                });

                if (allImages.length <= 1) return null;

                return (
                  <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                    {allImages.map((image) => {
                      const isActive = activeImage === image;
                      return (
                        <button
                          key={image}
                          type="button"
                          onClick={() => setActiveImage(image)}
                          className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 ${isActive
                              ? 'border-rose'
                              : 'border-transparent hover:border-blush'
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
                );
              })()}
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-blush px-3 py-1 text-xs font-semibold text-rose-deep">
                  <span>{product.category}</span>
                </div>
                {STORES.some((st) => st.category === product.category) && (
                  <Link
                    to={`/tentang#${storeAnchor(product.category)}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-rose underline underline-offset-4"
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    Tersedia di {STORES.find((st) => st.category === product.category)?.place}
                  </Link>
                )}
                {product.isAvailable === false && (
                  <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                    Stok Habis
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-ink">
                  {product.name}
                </h1>
                <p className="text-base font-semibold text-rose">
                  Mulai {formatRupiah(minPricePerPiece)} / pcs
                </p>
              </div>

              <div className="rounded-lg bg-rose px-3 py-2 text-xs font-extrabold text-white inline-flex items-center">
                Hanya dijual per seri
              </div>

              {product.tags && product.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-blush-soft px-2 py-0.5 text-[11px] font-medium text-rose-deep ring-1 ring-blush"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                <p className="text-sm font-bold text-ink">Pilih seri ukuran</p>
                <div className="mt-3 space-y-2" role="radiogroup" aria-label="Pilih seri">
                  {product.seriesOptions.map((option) => {
                    const isSelected = selectedSeries?.name === option.name;
                    return (
                      <button
                        key={option.name}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setSelectedSeriesName(option.name)}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition ${
                          isSelected
                            ? 'bg-blush-soft ring-2 ring-rose'
                            : 'bg-slate-50 ring-1 ring-slate-200 hover:ring-blush'
                        }`}
                      >
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-slate-800">{option.name}</p>
                          <p className="text-[11px] text-slate-500">
                            {formatRupiah(option.pricePerPiece)} / pcs{option.pieces ? <> &times; {option.pieces} pcs</> : null}
                          </p>
                        </div>
                        <p className="ml-3 whitespace-nowrap text-sm font-extrabold text-ink">
                          {formatRupiah(option.totalPrice)}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 md:flex-row">
                <button
                  type="button"
                  disabled={product.isAvailable === false || !selectedSeries}
                  onClick={() => selectedSeries && addToCart(product, selectedSeries)}
                  className="hidden flex-1 items-center justify-center rounded-full bg-mauve px-6 py-3 text-sm font-semibold text-white shadow-md shadow-mauve/30 md:inline-flex transition hover:bg-mauve-deep disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
                >
                  {product.isAvailable === false ? 'Stok Habis' : `Tambah ke Keranjang${selectedSeries ? ` · ${formatRupiah(selectedSeries.totalPrice)}` : ''}`}
                </button>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(true)}
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
                >
                  Lihat Keranjang Saya
                </button>
                <Link
                  to="/katalog"
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
            <h2 className="text-xl font-extrabold uppercase tracking-[0.14em] text-ink md:text-2xl">
              Model <span className="text-rose">lainnya</span>
            </h2>
            <p className="mt-1 text-sm text-ink/70">Pilihan lain untuk melengkapi etalase toko Anda</p>
          </div>
          <Link to="/katalog" className="text-sm font-bold text-rose hover:text-rose-deep underline underline-offset-4">
            Lihat Semua Produk
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {relatedProducts.map((relatedProd) => (
            <ProductCard key={relatedProd.id} product={relatedProd} />
          ))}
        </div>
      </section>

      {/* Bar tetap di bawah layar HP supaya tombol tambah selalu terlihat */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-cream-light/95 px-4 py-3 backdrop-blur-sm md:hidden">
        <div className="mx-auto flex max-w-md items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-ink/70">{selectedSeries?.name}</p>
            <p className="text-base font-extrabold text-ink">
              {selectedSeries ? formatRupiah(selectedSeries.totalPrice) : ''}
            </p>
          </div>
          <button
            type="button"
            disabled={product.isAvailable === false || !selectedSeries}
            onClick={() => selectedSeries && addToCart(product, selectedSeries)}
            className="shrink-0 rounded-full bg-mauve px-6 py-3 text-sm font-bold text-white transition hover:bg-mauve-deep disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {product.isAvailable === false ? 'Stok habis' : 'Tambah ke keranjang'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;