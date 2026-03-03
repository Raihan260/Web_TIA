import type { FC, FormEvent } from 'react';
import { useState } from 'react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

// Set VITE_ADMIN_PIN in your .env file, e.g.:
// VITE_ADMIN_PIN=123456
const ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN as string | undefined;

const AdminLogin: FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!ADMIN_PIN) {
      console.error('VITE_ADMIN_PIN is not set in the environment variables.');
      setError('Konfigurasi PIN admin belum diatur. Hubungi developer.');
      return;
    }

    if (pin.trim() === ADMIN_PIN) {
      setError('');
      onLoginSuccess();
    } else {
      setError('PIN salah. Silakan coba lagi.');
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-lg font-semibold text-slate-900 mb-1 text-center">Login Admin</h1>
        <p className="mb-5 text-xs text-slate-500 text-center">
          Masukkan PIN akses admin untuk membuka halaman pengelolaan produk.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="admin-pin"
              className="block text-xs font-semibold uppercase tracking-wide text-slate-700"
            >
              PIN Akses Admin
            </label>
            <input
              id="admin-pin"
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Masukkan PIN"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-0 transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
            />
          </div>

          {error && <p className="text-xs text-red-600">{error}</p>}

          <button
            type="submit"
            className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-pink-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-pink-700"
          >
            Masuk ke Admin Panel
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdminLogin;
