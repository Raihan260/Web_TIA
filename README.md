# Fathia Kids - Website Katalog & Admin

Website katalog online untuk **Fathia Kids**, toko grosir gamis dan busana muslim anak. Menampilkan katalog produk ke publik, dan menyediakan Admin Panel privat untuk mengelola data produk.

## Fitur

- Katalog produk publik dengan pencarian dan detail per produk (galeri foto, pilihan harga per "seri").
- Keranjang belanja sederhana (disimpan di memori browser).
- Admin Panel (`/admin`) untuk tambah, ubah, dan hapus produk — dilindungi login (email & password).
- Data produk disimpan di Supabase (PostgreSQL) dengan Row Level Security: siapa saja bisa membaca katalog, tapi hanya admin yang login yang bisa mengubah data.

## Tech Stack

- [Vite](https://vite.dev/) + React 19 + TypeScript
- [React Router](https://reactrouter.com/) — routing (`/`, `/product/:id`, `/admin`)
- [Zustand](https://zustand-demo.pmnd.rs/) — state management (produk & keranjang)
- [Supabase](https://supabase.com/) — database (PostgreSQL) + Authentication
- [Tailwind CSS](https://tailwindcss.com/) — styling
- [lucide-react](https://lucide.dev/) — ikon

## Persiapan

1. **Clone repo dan install dependency**

   ```bash
   git clone https://github.com/Raihan260/Web_TIA.git
   cd Web_TIA
   npm install
   ```

2. **Buat file `.env`**

   Salin `.env.example` menjadi `.env`, lalu isi dengan kredensial Supabase Anda:

   ```bash
   cp .env.example .env
   ```

   ```
   VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=sb_publishable_xxxxxxxx
   ```

   Kredensial ini bisa dilihat di Supabase Dashboard → **Settings → API**. Pakai **publishable key** (`sb_publishable_...`), bukan `service_role` key.

   ⚠️ **Jangan pernah commit file `.env`** — file ini sudah masuk `.gitignore`.

3. **Siapkan database Supabase**

   Jalankan isi file `supabase_schema.sql` di **SQL Editor** pada project Supabase Anda. Ini akan membuat tabel `products` beserta aturan keamanan (RLS): baca data terbuka untuk siapa saja, sementara tambah/ubah/hapus data hanya untuk user yang sudah login.

4. **Buat akun admin**

   Di Supabase Dashboard → **Authentication → Users**, buat satu user (email + password). Akun ini yang dipakai untuk login di halaman `/admin` — tidak ada pendaftaran akun baru lewat aplikasi.

## Menjalankan Proyek

```bash
npm run dev       # jalankan development server
npm run build     # build untuk production (cek tipe + build Vite)
npm run lint      # jalankan ESLint
npm run preview   # preview hasil build production secara lokal
```

Buka `http://localhost:5173` untuk katalog, dan `http://localhost:5173/admin` untuk Admin Panel.

## Struktur Proyek (ringkas)

```
src/
├── data/products.ts        # Tipe data produk & data awal (untuk migrasi/seed)
├── lib/supabase.ts         # Inisialisasi Supabase client
├── store/                  # State management (Zustand)
│   ├── useProductStore.ts  # Fetch/tambah/ubah/hapus produk dari Supabase
│   └── useCartStore.ts     # Keranjang belanja
├── AdminLogin.tsx          # Form login admin (Supabase Auth)
├── AdminPanel.tsx          # CRUD produk (perlu login)
├── SeedData.tsx            # Tombol migrasi data awal ke Supabase (sekali pakai)
├── ProductList.tsx / ProductCard.tsx / ProductDetail.tsx  # Katalog & detail produk
└── App.tsx                 # Routing utama
```

Untuk penjelasan arsitektur dan konteks bisnis yang lebih lengkap, lihat [`PROJECT_OVERVIEW.md`](./PROJECT_OVERVIEW.md).

## Catatan Keamanan

- Login admin memakai **Supabase Auth** (email + password) — bukan PIN statis.
- Row Level Security (RLS) di tabel `products` membatasi insert/update/delete hanya untuk user yang terautentikasi (`role: authenticated`). Baca (`SELECT`) tetap terbuka untuk publik karena katalog memang untuk pengunjung umum.
- Jangan pernah commit `.env`, API key, atau kredensial lain ke repo ini.