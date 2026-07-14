# Project Overview — TIA Collection Website

> Dokumen ini menjelaskan **konteks bisnis dan arsitektur teknis** proyek secara menyeluruh. Untuk cara menjalankan proyek secara praktis, lihat [`README.md`](./README.md).

## Konteks Bisnis

TIA Collection adalah toko **grosir gamis dan busana muslim anak**. Website ini melayani dua kebutuhan:

1. **Katalog publik** — calon mitra reseller/pembeli grosir bisa melihat produk, harga per "seri" (paket harga bertingkat berdasarkan rentang ukuran), dan menghubungi toko lewat WhatsApp.
2. **Admin Panel privat** — tim internal TIA Collection mengelola data produk (tambah, ubah, hapus) tanpa perlu sentuh database secara langsung.

Website ini **bukan** platform e-commerce dengan checkout online — transaksi tetap difinalisasi lewat WhatsApp (sesuai model bisnis grosir/reseller).

## Arsitektur Teknis

```
┌─────────────────────┐        ┌──────────────────────────┐
│   Browser (React)   │        │        Supabase           │
│                      │  REST  │                            │
│  Katalog (publik) ───┼───────▶│  Tabel: products           │
│  Admin Panel (login)─┼───────▶│  RLS: baca=publik,         │
│                      │  Auth  │       tulis=authenticated  │
│                      │◀───────│  Authentication (email/pw) │
└─────────────────────┘        └──────────────────────────┘
```

- **Frontend**: Single Page Application (React + Vite + TypeScript), tidak ada backend/server custom — semua logika bisnis berjalan di browser dan berbicara langsung ke Supabase.
- **Database**: Supabase (PostgreSQL) menyimpan satu tabel utama, `products`.
- **Auth**: Supabase Authentication (email + password) mengatur siapa yang boleh masuk ke Admin Panel. Tidak ada sistem role/tingkatan — siapa pun yang berhasil login dianggap admin penuh (lihat bagian "Keterbatasan Saat Ini").
- **State management**: Zustand menyimpan state produk (`useProductStore`) dan keranjang (`useCartStore`) di memori browser — tidak persisten antar sesi/refresh.

## Model Data

Tabel `products` (didefinisikan di `supabase_schema.sql`):

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | text (primary key) | Kode/SKU produk, diisi manual lewat Admin Panel |
| `name` | text | Nama produk |
| `category` | text | Kategori (Denim Panjang, Denim Pendek, Celana Katun, Rok Denim, Gamis) |
| `imageUrl` | text | URL gambar utama |
| `gallery` | text[] | URL gambar tambahan (galeri) |
| `tags` | text[] | Label bebas (opsional) |
| `seriesOptions` | jsonb | Daftar paket harga per rentang ukuran (`name`, `pricePerPiece`, `pieces`, `totalPrice`) |

> Nama kolom `imageUrl` dan `seriesOptions` sengaja dikutip (`"imageUrl"`) di skema SQL agar cocok persis dengan key camelCase yang dikirim aplikasi — PostgreSQL secara default melipat nama kolom tanpa kutip menjadi huruf kecil semua.

## Alur Autentikasi Admin

1. Admin membuka `/admin` → jika belum login, tampil `AdminLogin.tsx`.
2. Login memanggil `supabase.auth.signInWithPassword(email, password)`.
3. Sesi disimpan otomatis oleh Supabase client (bukan `sessionStorage` manual) dan dipantau lewat `supabase.auth.onAuthStateChange`.
4. Setiap request insert/update/delete ke tabel `products` dari Admin Panel otomatis membawa token sesi ini — Supabase memverifikasi lewat RLS policy `to authenticated` di sisi server sebelum mengizinkan perubahan data.

Ini menggantikan sistem awal yang sempat memakai **PIN statis** dibandingkan di sisi client (`VITE_ADMIN_PIN`) — pendekatan itu tidak aman karena PIN bisa dibaca langsung dari kode JavaScript yang ter-bundle ke publik, dan tidak ada verifikasi nyata di sisi server.

## Keterbatasan Saat Ini (Wave 1 / MVP)

- **Tidak ada pembagian role** — siapa pun yang berhasil login dianggap admin penuh; belum ada perbedaan hak akses antar staf.
- **Tidak ada checkout/pembayaran online** — keranjang belanja hanya alat bantu, transaksi final tetap lewat WhatsApp.
- **Tidak ada riwayat perubahan (audit log)** — perubahan produk tidak tercatat siapa/kapan mengubahnya.
- **Galeri foto** disimpan sebagai URL (bukan upload file) — gambar harus sudah di-hosting di tempat lain (misalnya folder `public/images` di repo ini, atau layanan hosting gambar eksternal).

## Ide Pengembangan Selanjutnya

- Tambah role/permission berbeda untuk staf vs pemilik toko.
- Upload gambar langsung dari Admin Panel (pakai Supabase Storage) alih-alih menempel URL manual.
- Riwayat/log perubahan produk untuk akuntabilitas.
- Integrasi checkout atau setidaknya "keranjang → draft pesanan WhatsApp otomatis" (generate pesan WA dari isi keranjang).