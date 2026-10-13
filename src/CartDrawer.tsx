import type { FC } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle } from 'lucide-react';
import { CATEGORIES, PHOTO_PLACEHOLDER } from './lib/contact';
import { useCartStore, getCartItemKey } from './store/useCartStore';

const formatRupiah = (value: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

const CartDrawer: FC = () => {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart } = useCartStore();

  const totalPrice = items.reduce((sum, item) => sum + item.series.totalPrice * item.quantity, 0);
  const totalSeries = items.reduce((sum, item) => sum + item.quantity, 0);
  // Urutan kategori mengikuti CATEGORIES, sama dengan urutan di pesan WhatsApp.
  const categoriesInCart = [
    ...CATEGORIES.filter((c) => items.some((i) => i.product.category === c)),
    ...Array.from(new Set(items.map((i) => i.product.category))).filter(
      (c) => !CATEGORIES.includes(c as (typeof CATEGORIES)[number]),
    ),
  ];

  const handleClose = () => setIsCartOpen(false);

  const handleCheckoutWhatsApp = () => {
    if (items.length === 0) {
      window.open(
        'https://wa.me/6285219847122?text=' +
          encodeURIComponent(
            'Halo Admin Fathia Kids, saya mau tanya katalog grosir pakaian anak.',
          ),
        '_blank',
      );
      return;
    }

    const lines: string[] = [];
    lines.push('Halo Admin Fathia Kids, saya mau order/tanya model berikut:');
    lines.push('');

    const known: string[] = [...CATEGORIES];
    const extra = items.map((i) => i.product.category).filter((c) => !known.includes(c));
    const order = [...known, ...Array.from(new Set(extra))];
    let n = 0;
    order.forEach((category) => {
      const group = items.filter((i) => i.product.category === category);
      if (group.length === 0) return;
      lines.push(`*${category}*`);
      group.forEach((item) => {
        n += 1;
        lines.push(
          `${n}. ${item.product.name}\n   ${item.series.name} - ${item.quantity} Seri x ${formatRupiah(item.series.totalPrice)} = ${formatRupiah(item.series.totalPrice * item.quantity)}`,
        );
      });
      lines.push('');
    });

    lines.push(`Estimasi total: ${formatRupiah(totalPrice)} (belum termasuk ongkir)`);

    lines.push('');
    lines.push('Mohon info stok dan total harganya ya!');

    const message = encodeURIComponent(lines.join('\n'));
    const url = `https://wa.me/6285219847122?text=${message}`;
    window.open(url, '_blank');
  };


  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={handleClose}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md transform border-l border-thread/60 bg-cream shadow-xl transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isCartOpen}
      >
        <div className="flex h-full flex-col">
          {/* Kepala */}
          <div className="flex items-center justify-between gap-3 border-b border-dashed border-thread px-4 py-3">
            <div>
              <h2 className="font-display text-lg font-bold text-ink">Keranjang</h2>
              <p className="text-xs text-ink/60">
                {items.length === 0
                  ? 'Belum ada seri yang dipilih'
                  : `${totalSeries} seri dari ${categoriesInCart.length} kategori`}
              </p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition hover:bg-cream-deep"
              aria-label="Tutup keranjang"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Isi, dikelompokkan per kategori seperti pesan WhatsApp yang nanti terkirim */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                <ShoppingBag className="mb-3 h-8 w-8 text-ink/25" />
                <p className="font-semibold text-ink">Keranjang masih kosong</p>
                <p className="mt-1 text-sm text-ink/60">
                  Pilih seri di halaman produk, lalu daftarnya muncul di sini.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {categoriesInCart.map((category, index) => (
                  <div
                    key={category}
                    className={index > 0 ? 'border-t border-thread/60 pt-5' : undefined}
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/50">
                      {category}
                    </p>
                    <div className="mt-3 space-y-4">
                      {items
                        .filter((item) => item.product.category === category)
                        .map((item) => {
                          const itemKey = getCartItemKey(item.product.id, item.series.name);
                          return (
                            <div key={itemKey} className="flex gap-3">
                              <img
                                src={item.product.imageUrl || PHOTO_PLACEHOLDER}
                                alt=""
                                className="h-24 w-[72px] shrink-0 rounded-lg bg-cream-deep object-cover"
                              />
                              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                                <p className="line-clamp-2 text-[15px] font-medium leading-tight text-ink">
                                  {item.product.name}
                                </p>
                                <p className="text-[13px] text-ink/65">
                                  {item.series.name} · {formatRupiah(item.series.totalPrice)} / seri
                                </p>
                                <div className="flex items-center gap-2">
                                  <span className="inline-flex items-center rounded-full border border-ink/15 bg-white">
                                    <button
                                      type="button"
                                      onClick={() => updateQuantity(itemKey, -1)}
                                      className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition hover:bg-cream-deep"
                                      aria-label="Kurangi jumlah"
                                    >
                                      <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="min-w-[28px] text-center text-sm font-semibold text-ink">
                                      {item.quantity}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => updateQuantity(itemKey, 1)}
                                      className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition hover:bg-cream-deep"
                                      aria-label="Tambah jumlah"
                                    >
                                      <Plus className="h-4 w-4" />
                                    </button>
                                  </span>
                                  <span className="flex-1 text-right text-[15px] font-semibold text-ink">
                                    {formatRupiah(item.series.totalPrice * item.quantity)}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => removeFromCart(itemKey)}
                                    className="flex h-10 w-10 items-center justify-center rounded-full text-ink/45 transition hover:bg-red-50 hover:text-red-600"
                                    aria-label="Hapus dari keranjang"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Penutup: total, lalu satu tombol hubungi admin */}
          <div className="space-y-3 border-t border-ink/10 bg-cream-light px-4 py-4">
            {items.length > 0 && (
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[15px] text-ink">Estimasi total</span>
                <span className="font-display text-[22px] font-bold text-ink">
                  {formatRupiah(totalPrice)}
                </span>
              </div>
            )}
            <p className="text-xs leading-relaxed text-ink/65">
              Belum termasuk ongkir. Admin memastikan stok dan total akhir sebelum Anda membayar.
            </p>
            <button
              type="button"
              onClick={handleCheckoutWhatsApp}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-3.5 text-[15px] font-bold text-white transition hover:bg-ink/85"
            >
              <MessageCircle className="h-[18px] w-[18px]" />
              {items.length === 0 ? 'Tanya admin' : 'Kirim pesanan ke admin'}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default CartDrawer;