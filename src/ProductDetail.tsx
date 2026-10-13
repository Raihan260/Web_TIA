import type { CSSProperties, FC, MouseEvent } from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, ShoppingBag } from 'lucide-react';
import { PHOTO_PLACEHOLDER, STORES, storeAnchor } from './lib/contact';
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


  // 1. PINDAHKAN HOOKS KE ATAS SINI (Wajib di React)
  const [activeImage, setActiveImage] = useState<string>('');
  const [selectedSeriesName, setSelectedSeriesName] = useState<string>('');
  // Foto sebelumnya tetap tampil di bawah foto baru supaya pergantian tidak berkedip.
  const [prevImage, setPrevImage] = useState<string>('');
  // Rasio foto utama dipakai sebagai ukuran tetap kotak, supaya halaman tidak melompat saat foto diganti.
  const [ratio, setRatio] = useState<number | null>(null);
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
    setActiveImage(product.imageUrl || PHOTO_PLACEHOLDER);
    setSelectedSeriesName('');
    setPrevImage('');
    setRatio(null);
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
      <section className="md:border-t md:border-thread/40">
        <div className="mx-auto max-w-6xl pb-10 md:px-4 md:py-14">
          <div className="mb-6 hidden px-4 text-sm text-ink/70 md:block md:px-0">
            <Link
              to="/katalog"
              onClick={handleGoBack}
              className="hover:text-ink underline-offset-2 hover:underline"
            >
              &larr; Kembali ke Katalog
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="w-full min-w-0 md:max-w-[560px]">
              {/* Di HP tingginya dipatok. Rasio asli foto baru dipakai di layar lebar:
                  kalau dipakai bersama tinggi tetap, lebarnya ikut rasio dan halaman
                  jadi bisa digeser menyamping. */}
              <div
                className="relative h-[46vh] max-h-[460px] min-h-[260px] w-full min-w-0 overflow-hidden bg-cream-deep sm:h-[55vh] sm:max-h-[520px] md:h-auto md:max-h-none md:min-h-0 md:rounded-lg md:border md:border-thread/60 md:[aspect-ratio:var(--rasio-foto)]"
                style={{ '--rasio-foto': String(ratio ?? 3 / 4) } as CSSProperties}
              >
                {prevImage && prevImage !== activeImage && (
                  <img
                    src={prevImage}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
                <img
                  key={activeImage}
                  src={activeImage}
                  alt={product.name}
                  onLoad={(e) => {
                    const { naturalWidth, naturalHeight } = e.currentTarget;
                    if (ratio === null && naturalWidth && naturalHeight) setRatio(naturalWidth / naturalHeight);
                  }}
                  className="photo-in absolute inset-0 h-full w-full object-cover"
                />

                {/* Tombol melayang hanya di HP; di layar lebar sudah ada tautan teks dan navbar. */}
                <Link
                  to="/katalog"
                  onClick={handleGoBack}
                  aria-label="Kembali ke katalog"
                  className="absolute left-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream-light/90 text-ink backdrop-blur-sm md:hidden"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Link>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(true)}
                  aria-label="Buka keranjang"
                  className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream-light/90 text-ink backdrop-blur-sm md:hidden"
                >
                  <ShoppingBag className="h-5 w-5" />
                </button>

                {product.tags && product.tags.length > 0 && (
                  <span className="absolute left-3 top-[64px] rounded bg-cream-light/95 px-2 py-0.5 text-[11px] font-semibold text-rose-deep md:hidden">
                    {product.tags[0]}
                  </span>
                )}
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
                  <div className="relative z-10 -mt-16 flex gap-2 overflow-x-auto px-3 pb-1 md:z-auto md:mt-3 md:px-0">
                    {allImages.map((image) => {
                      const isActive = activeImage === image;
                      return (
                        <button
                          key={image}
                          type="button"
                          onClick={() => {
                            if (image === activeImage) return;
                            setPrevImage(activeImage);
                            setActiveImage(image);
                          }}
                          className={`h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg border-2 md:h-16 md:w-16 ${
                            isActive ? 'border-white md:border-rose' : 'border-white/60 md:border-transparent md:hover:border-blush'
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

            <div className="space-y-5 px-4 md:px-0">
              <div className="space-y-1.5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/50">
                  {product.category}
                </p>
                <h1 className="font-display text-2xl font-bold leading-tight text-ink md:text-3xl">
                  {product.name}
                </h1>
                <p className="text-lg font-semibold text-ink">
                  Mulai {formatRupiah(minPricePerPiece)}{' '}
                  <span className="font-medium text-ink/60">/ pcs</span>
                </p>
                {product.isAvailable === false && (
                  <p className="inline-flex rounded bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
                    Stok habis
                  </p>
                )}
              </div>

              <div className="space-y-2.5">
                <p className="text-sm font-semibold text-ink">Pilih seri ukuran</p>
                <div className="space-y-2" role="radiogroup" aria-label="Pilih seri ukuran">
                  {product.seriesOptions.map((option) => {
                    const isSelected = selectedSeries?.name === option.name;
                    return (
                      <button
                        key={option.name}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setSelectedSeriesName(option.name)}
                        className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition ${
                          isSelected
                            ? 'border-2 border-rose bg-blush-soft'
                            : 'border border-ink/15 bg-white hover:border-rose/50'
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-2 ${
                            isSelected ? 'border-rose' : 'border-ink/30'
                          }`}
                        >
                          {isSelected && <span className="h-2.5 w-2.5 rounded-full bg-rose" />}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold text-ink">{option.name}</span>
                          <span className="block text-xs text-ink/65">
                            {option.pieces ? `${option.pieces} pcs · ` : ''}
                            {formatRupiah(option.pricePerPiece)} / pcs
                          </span>
                        </span>
                        <span className="whitespace-nowrap text-sm font-semibold text-ink">
                          {formatRupiah(option.totalPrice)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Keterangan yang dulu berupa chip berserakan, kini satu daftar tenang. */}
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 border-t border-thread/60 pt-4 text-sm">
                <dt className="text-ink/60">Penjualan</dt>
                <dd className="m-0 text-ink">Hanya per seri, tidak satuan</dd>
                {selectedSeries?.pieces && (
                  <>
                    <dt className="text-ink/60">Isi seri</dt>
                    <dd className="m-0 text-ink">{selectedSeries.pieces} pcs per seri</dd>
                  </>
                )}
                {STORES.some((st) => st.category === product.category) && (
                  <>
                    <dt className="text-ink/60">Toko</dt>
                    <dd className="m-0">
                      <Link
                        to={`/tentang#${storeAnchor(product.category)}`}
                        className="inline-flex items-center gap-1 text-rose underline underline-offset-4"
                      >
                        <MapPin className="h-3.5 w-3.5" />
                        {STORES.find((st) => st.category === product.category)?.place}
                      </Link>
                    </dd>
                  </>
                )}
              </dl>

              <p className="text-sm leading-relaxed text-ink/65">
                Stok bisa berubah. Admin memastikan ketersediaan dan ongkir sebelum Anda membayar.
              </p>

              {/* Di HP tombolnya ada di bilah bawah yang selalu terlihat. */}
              <div className="hidden gap-3 md:flex">
                <button
                  type="button"
                  disabled={product.isAvailable === false || !selectedSeries}
                  onClick={() => selectedSeries && addToCart(product, selectedSeries)}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-rose px-6 py-3.5 text-sm font-bold text-white transition hover:bg-rose-deep disabled:cursor-not-allowed disabled:bg-ink/25"
                >
                  <ShoppingBag className="h-4 w-4" />
                  {product.isAvailable === false
                    ? 'Stok habis'
                    : `Masukkan keranjang${selectedSeries ? ` · ${formatRupiah(selectedSeries.totalPrice)}` : ''}`}
                </button>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(true)}
                  className="inline-flex items-center justify-center rounded-full border-2 border-ink/25 px-6 py-3 text-sm font-bold text-ink transition hover:border-ink hover:bg-ink hover:text-cream"
                >
                  Lihat keranjang
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- BAGIAN 4: REKOMENDASI PRODUK LAINNYA --- */}
      <section className="mx-auto max-w-6xl px-4 mt-12 md:mt-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
          <div>
            <h2 className="text-xl font-bold uppercase tracking-[0.14em] text-ink md:text-2xl">
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
            <p className="text-base font-bold text-ink">
              {selectedSeries ? formatRupiah(selectedSeries.totalPrice) : ''}
            </p>
          </div>
          <button
            type="button"
            disabled={product.isAvailable === false || !selectedSeries}
            onClick={() => selectedSeries && addToCart(product, selectedSeries)}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-rose px-6 py-3 text-sm font-bold text-white transition hover:bg-rose-deep disabled:cursor-not-allowed disabled:bg-ink/25"
          >
            <ShoppingBag className="h-4 w-4" />
            {product.isAvailable === false ? 'Stok habis' : 'Masukkan'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;