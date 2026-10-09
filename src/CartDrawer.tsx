import type { FC } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { CATEGORIES } from './lib/contact';
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
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md transform border-l border-slate-200 bg-white shadow-xl transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isCartOpen}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-mauve text-white">
                <ShoppingBag className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-ink">Keranjang Inquiry</h2>
                <p className="text-[11px] text-slate-500">
                  Seri pilihan Anda akan dikirim ke Admin
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="rounded-full border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-100"
              aria-label="Tutup keranjang"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center text-sm text-slate-500">
                <ShoppingBag className="mb-2 h-8 w-8 text-slate-300" />
                <p className="font-semibold text-slate-700">Keranjang Inquiry Masih Kosong</p>
                <p className="mt-1 text-xs text-slate-500">
                  Tambahkan dulu beberapa model yang ingin Anda tanyakan.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => {
                  const itemKey = getCartItemKey(item.product.id, item.series.name);
                  return (
                    <div
                      key={itemKey}
                      className="flex gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm"
                    >
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
                        <img
                          src={item.product.imageUrl || 'https://via.placeholder.com/200x200'}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            {item.product.category}
                          </p>
                          <h3 className="line-clamp-2 text-sm font-bold text-ink">
                            {item.product.name}
                          </h3>
                          <p className="mt-0.5 text-[11px] font-medium text-slate-600">
                            {item.series.name}
                          </p>
                          <p className="mt-0.5 text-[11px] font-semibold text-rose">
                            {formatRupiah(item.series.totalPrice)} / seri
                          </p>
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                          <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-1.5 py-1">
                            <button
                              type="button"
                              onClick={() => updateQuantity(itemKey, -1)}
                              className="flex h-6 w-6 items-center justify-center rounded-full text-slate-600 hover:bg-slate-200"
                              aria-label="Kurangi jumlah"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="min-w-[2rem] text-center text-xs font-semibold text-slate-800">
                              {item.quantity} Seri
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(itemKey, 1)}
                              className="flex h-6 w-6 items-center justify-center rounded-full text-slate-600 hover:bg-slate-200"
                              aria-label="Tambah jumlah"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(itemKey)}
                            className="rounded-full p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500"
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
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 bg-slate-50 px-4 py-4 text-xs text-slate-600">
            {items.length > 0 && (
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">Estimasi total</span>
                <span className="font-extrabold text-ink">{formatRupiah(totalPrice)}</span>
              </div>
            )}
            <p className="mb-3 text-[11px] leading-relaxed">
              Ongkir dan total akhir akan dikonfirmasi Admin via WhatsApp setelah Anda kirim daftar pesanan.
            </p>
            <button
              type="button"
              onClick={handleCheckoutWhatsApp}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-green-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-green-400/60 transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-80"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Checkout via WhatsApp</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default CartDrawer;