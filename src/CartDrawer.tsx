import type { FC } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCartStore } from './store/useCartStore';

const formatRupiah = (value: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

const CartDrawer: FC = () => {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart } = useCartStore();

  const handleClose = () => setIsCartOpen(false);

  const handleCheckoutWhatsApp = () => {
    if (items.length === 0) {
      window.open(
        'https://wa.me/6285219847122?text=' +
          encodeURIComponent(
            'Halo Admin TIA Collection, saya mau tanya katalog grosir pakaian anak.',
          ),
        '_blank',
      );
      return;
    }

    const lines: string[] = [];
    lines.push('Halo Admin TIA Collection, saya mau order/tanya model berikut:');
    lines.push('');

    items.forEach((item, index) => {
      lines.push(
        `${index + 1}. ${item.product.name} - Jumlah: ${item.quantity} Seri`,
      );
    });

    lines.push('');
    lines.push('Mohon info stok dan total harganya ya!');

    const message = encodeURIComponent(lines.join('\n'));
    const url = `https://wa.me/6285219847122?text=${message}`;
    window.open(url, '_blank');
  };

  const getMinPrice = (seriesOptions: { pricePerPiece: number }[]) => {
    if (!seriesOptions.length) return 0;
    return Math.min(...seriesOptions.map((opt) => opt.pricePerPiece));
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
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white">
                <ShoppingBag className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-900">Keranjang Inquiry</h2>
                <p className="text-[11px] text-slate-500">
                  Pilih model yang ingin ditanyakan ke Admin
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
                  const minPrice = getMinPrice(item.product.seriesOptions);
                  return (
                    <div
                      key={item.product.id}
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
                          <h3 className="line-clamp-2 text-sm font-bold text-slate-900">
                            {item.product.name}
                          </h3>
                          <p className="mt-1 text-[11px] font-medium text-orange-600">
                            Mulai dari {formatRupiah(minPrice)} / pcs
                          </p>
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                          <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-1.5 py-1">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, -1)}
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
                              onClick={() => updateQuantity(item.product.id, 1)}
                              className="flex h-6 w-6 items-center justify-center rounded-full text-slate-600 hover:bg-slate-200"
                              aria-label="Tambah jumlah"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.product.id)}
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
            <p className="mb-3 text-[11px] leading-relaxed">
              Total harga dan ongkir akan dihitungkan Admin via WhatsApp setelah Anda kirim daftar model yang dipilih.
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
