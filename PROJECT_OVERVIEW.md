# Dokumentasi Proyek TIA Collection

Dokumen ini menjelaskan struktur proyek, fungsi setiap file utama, dan alur kerja aplikasi berbasis **Vite + React + TypeScript + Tailwind CSS** yang digunakan untuk website TIA Collection.

---

## 1. Gambaran Besar Arsitektur

- **Vite**: bundler & dev server. Menangani build, hot reload, dan optimasi aset.
- **React + TypeScript**: membangun UI komponen (Navbar, Hero, ProductList, ProductCard, dll) dengan type-safety.
- **Tailwind CSS**: utility-first CSS (class seperti `bg-white`, `text-sm`, `flex`, dll) untuk styling cepat dan konsisten.
- **Struktur Halaman** (single page):
  - `Navbar` menempel di atas (sticky) dan berisi navigasi anchor (`#katalog`, `#tentang`, `#kontak`).
  - `Hero` adalah bagian hero/landing utama dengan CTA ke katalog dan WhatsApp.
  - `ProductList` menampilkan daftar produk (kartu-kartu produk) untuk katalog denim.
  - Bagian `Tentang TIA Collection` dan `Kontak & Pemesanan` ada di dalam `App` sebagai section tambahan.

Semua komponen dirangkai di `App.tsx`, lalu dirender ke elemen HTML dengan id `root` oleh `main.tsx`.

---

## 2. File Konfigurasi Utama

### 2.1. package.json

Fungsi:
- Menyimpan **nama proyek**, versi, dependencies, dan script.
- Script penting:
  - `dev`: menjalankan `vite` (development server dengan hot reload).
  - `build`: `tsc -b && vite build` untuk build TypeScript dan bundling produksi.
  - `lint`: `eslint .` untuk cek kualitas kode.
  - `preview`: `vite preview` untuk melihat hasil build secara lokal.

Dependencies utama:
- `react`, `react-dom`: library UI.
- `lucide-react`: icon library (ikon Phone, Menu, X, Sparkles, dsb).

DevDependencies:
- `vite`, `@vitejs/plugin-react`: tools build + plugin React.
- `typescript`, `@types/*`: dukungan TypeScript.
- `eslint` + plugin: linter.
- `tailwindcss`, `postcss`, `autoprefixer`: untuk styling Tailwind.

### 2.2. vite.config.ts

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

Fungsi:
- Mengkonfigurasi Vite untuk proyek React:
  - `plugins: [react()]` mengaktifkan fitur-fitur React seperti Fast Refresh, JSX transform, dll.
- Bisa diperluas kalau nanti perlu alias path, environment variable khusus, proxy API, dll.

### 2.3. tailwind.config.js & postcss.config.js

- **tailwind.config.js**: mengatur konfigurasi Tailwind (theme, extend warna, screens, dsb). Di proyek ini dipakai untuk mengaktifkan Tailwind dan bisa diperluas sesuai kebutuhan.
- **postcss.config.js**: menghubungkan Tailwind dan Autoprefixer dengan chain PostCSS yang digunakan Vite saat build CSS.

### 2.4. tsconfig*.json

- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`:
  - Mengatur bagaimana TypeScript melakukan type-checking untuk source code aplikasi dan file yang berjalan di Node (config, script build, dsb).
  - Berisi pengaturan seperti target JavaScript, module resolution, path alias (kalau ada), strict mode, dll.

### 2.5. eslint.config.js

- Mengatur rule ESLint untuk menjaga kualitas kode.
- Membantu menemukan kesalahan umum (unused variables, import salah, dsb) dan menjaga style konsisten.

---

## 3. Entry HTML & Root React

### 3.1. index.html (root HTML)

Fungsi utama:
- Dokumen HTML dasar yang disajikan browser.
- Berisi elemen `<div id="root"></div>` sebagai tempat React akan dirender.
- Vite akan menyuntikkan script JS hasil build ke file ini saat production build.

### 3.2. src/main.tsx (entry React)

Isi penting:
- Import React dan `createRoot` dari `react-dom/client`.
- Import global CSS (`index.css`).
- Import `App` sebagai komponen utama.
- Inisialisasi React:
  - Mencari elemen dengan id `root` di `index.html`.
  - Menjalankan `createRoot(...).render(<StrictMode><App /></StrictMode>)`.

Fungsi:
- Menjadi **jembatan** antara dunia HTML biasa dan dunia React.
- Di sinilah aplikasi React pertama kali “dinyalakan”.

---

## 4. Struktur Komponen React di src/

### 4.1. App.tsx (komponen utama halaman)

Peran besar:
- Menjadi **layout utama** dan tempat merangkai semua bagian halaman:
  - `Navbar`
  - `Hero`
  - `ProductList`
  - Section `Tentang TIA Collection`
  - Section `Kontak & Pemesanan`

Detail fungsi:
- Menggunakan wrapper `<div className="min-h-screen bg-gray-50 text-slate-800">`:
  - `min-h-screen`: tinggi minimal layar penuh, supaya halaman terlihat penuh.
  - `bg-gray-50`, `text-slate-800`: warna dasar background & teks.
- Di dalam `<main>` terdapat:
  - `<Hero />`: bagian hero dengan headline dan CTA.
  - `<ProductList />`: grid kartu produk.
  - Section `id="tentang"`: menjelaskan deskripsi bisnis TIA Collection.
  - Section `id="kontak"`: info kontak dan jam operasional.
- Id section (`tentang`, `kontak`, `katalog`) dihubungkan dengan anchor di `Navbar`.

Singkatnya, `App` adalah komposisi layout besar, bukan komponen yang menyimpan state berat.

### 4.2. Navbar.tsx (navigasi utama)

Konsep utama:
- Komponen **functional** dengan TypeScript (`FC`).
- Menggunakan `useState` untuk mengatur state `isOpen` (menu mobile).
- Menggunakan ikon dari `lucide-react` (`Phone`, `Menu`, `X`).

Struktur fungsi:
1. **State**:
   - `const [isOpen, setIsOpen] = useState(false);`
   - `isOpen` = apakah menu mobile sedang terbuka.
2. **Bagian header**:
   - `header` dengan class `sticky top-0 z-30 ...` membuat navbar selalu di atas saat scroll.
   - Kiri: logo TIA (lingkaran TIA + teks brand).
   - Tengah/kanan (hanya di layar medium ke atas, `md:flex`):
     - Link navigasi ke section: `#katalog`, `#tentang`, `#kontak`.
     - Tombol WhatsApp dengan ikon `Phone` yang membuka link `https://wa.me/`.
3. **Tombol burger (mobile)**:
   - Hanya tampil di mobile (`md:hidden`).
   - Klik tombol akan toggle `isOpen`.
   - Ikon berganti antara `Menu` dan `X` tergantung `isOpen`.
4. **Menu dropdown mobile**:
   - Ditampilkan hanya saat `isOpen === true`.
   - Berisi link yang sama seperti versi desktop.
   - Setiap link menjalankan `onClick={() => setIsOpen(false)}` untuk menutup menu setelah dipilih.

Tujuan:
- Memudahkan pengunjung berpindah ke bagian penting halaman dengan sekali klik.
- Responsif: tampilan berbeda untuk desktop dan mobile.

### 4.3. Hero.tsx (bagian hero/landing)

Konsep utama:
- Komponen visual untuk menyapa pengunjung dengan pesan utama tentang TIA Collection.
- Menggunakan ikon `Sparkles`, `ShoppingBag`, `MessageCircle` dari `lucide-react`.

Struktur isi:
- **Badge** di atas judul: teks "Koleksi Denim Anak Perempuan" dengan ikon Sparkles.
- **Judul besar (headline)**:
  - Menjelaskan bahwa TIA Collection menyediakan denim nyaman khusus anak perempuan.
- **Paragraf penjelasan**: menggambarkan value proposition (bahan lembut, potongan kekinian, kualitas grosir).
- **Dua tombol utama (CTA)**:
  - "Lihat Katalog Denim" → scroll ke section `#katalog`.
  - "Pesan via WhatsApp" → membuka WhatsApp admin.
- **Catatan kecil**: menjelaskan minimal order dan benefit reseller.
- **Kartu contoh produk di sisi kanan**:
  - Menunjukkan contoh informasi produk: ukuran tersedia, harga grosir mulai, minimal order.
  - Visual berupa box gradient (placeholder, bisa diganti foto nantinya).

Tujuan:
- Mengarahkan perhatian pengunjung ke produk utama dan call-to-action (katalog & WhatsApp) secepat mungkin.

### 4.4. ProductList.tsx (daftar produk / katalog)

Konsep utama:
- Menampung data **produk-produk** dalam array `products` bertipe `Product[]`.
- Menampilkan grid kartu produk menggunakan komponen `ProductCard`.

Bagian penting:
1. **Tipe data**:
   - Menggunakan type `Product` yang diimpor dari `ProductCard`.
2. **Data dummy/seed**:
   - `products: Product[] = [...]` berisi beberapa contoh produk dengan field:
     - `id`: unik per produk.
     - `name`: nama model denim.
     - `sizeRange`: daftar ukuran (S, M, L, XL, dst).
     - `wholesalePrice`: teks harga grosir.
     - `minimumOrder`: teks minimum order.
     - `tags`: label kecil (Best Seller, Bahan Lembut, dsb).
3. **Render**:
   - Section `id="katalog"` supaya bisa discroll dari navbar dan hero.
   - Bagian title + deskripsi di atas grid.
   - `products.map((product) => <ProductCard key={product.id} product={product} />)`:
     - Setiap item di array diubah menjadi satu kartu.

Tujuan:
- Menjadikan pengelolaan produk terstruktur dan mudah diubah hanya dari satu tempat (array `products`).
- Nantinya bisa diganti sumber datanya (API, JSON, dsb) tanpa mengubah tampilan kartu.

### 4.5. ProductCard.tsx (kartu produk tunggal)

Konsep utama:
- Komponen presentational untuk **satu produk**.
- Menggunakan prop bertipe `ProductCardProps` yang berisi `product: Product`.

Tipe data:
```ts
export interface Product {
  id: string;
  name: string;
  sizeRange: string[];
  wholesalePrice: string;
  minimumOrder: string;
  imageUrl?: string;
  tags?: string[];
}
```

Beberapa hal penting:
- `imageUrl` optional, jadi kalau tidak ada akan pakai `placeholderImage` (URL placeholder gratis).
- `tags` optional, dicek dulu `product.tags && product.tags.length > 0` sebelum dirender.

Struktur tampilan:
1. **Bagian gambar**:
   - Wrapper dengan `aspect-[4/3]` menjaga rasio gambar.
   - `<img src={product.imageUrl || placeholderImage} ... />` untuk menampilkan gambar.
   - Overlay gradient halus dan badge "Denim Kids" dengan ikon `Shirt` dari `lucide-react`.
2. **Bagian isi kartu**:
   - Judul produk (`product.name`).
   - Deretan `tags` (jika ada) sebagai pill kecil.
   - Box informasi dengan background abu (`bg-slate-50`) berisi:
     - Ukuran (loop `product.sizeRange` dan render pill ukuran).
     - Harga grosir (`product.wholesalePrice`).
     - Minimal order (`product.minimumOrder`).

Tujuan:
- Menampilkan informasi produk secara rapi dan mudah discan.
- Komponen ini reusable untuk berbagai daftar produk.

### 4.6. App.css (jika ada)

File ini dapat berisi style tambahan spesifik aplikasi. Dalam struktur sekarang, styling utama banyak dikerjakan lewat Tailwind di className tiap komponen, sehingga App.css mungkin minim atau tidak kritikal.

### 4.7. index.css (global styles)

Isi utama:
- Direktif Tailwind:
  - `@tailwind base;`
  - `@tailwind components;`
  - `@tailwind utilities;`
- Style global untuk elemen root:
  - `html, body, #root { height: 100%; }`
- Style global untuk `body`:
  - Menghapus margin default.
  - `@apply bg-gray-50 text-slate-800 antialiased;` (menggunakan utilitas Tailwind).
- Style global untuk `a` (link):
  - `@apply text-sky-700 hover:text-sky-800 transition-colors;`

Tujuan:
- Menyetel baseline tampilan seluruh aplikasi.
- Menjamin konsistensi warna dan tipografi dasar.

---

## 5. Alur Kerja Aplikasi (Dari Buka Website sampai Tampil)

1. Browser meminta `index.html` dari dev server Vite / hasil build.
2. Di dalam `index.html` ada `<div id="root"></div>`.
3. File JS utama (hasil bundling dari `src/main.tsx`) dijalankan:
   - `main.tsx` mencari elemen `#root`.
   - Membuat React root dan memanggil `render(<App />)`.
4. Komponen `App` dirender:
   - Memanggil `Navbar`, `Hero`, `ProductList`, dan section lain.
5. `Navbar` mendaftar event klik untuk tombol burger dan link navigasi.
6. `ProductList` membuat daftar `ProductCard` dari array `products`.
7. CSS dari Tailwind (yang sudah diproses via PostCSS) diaplikasikan ke seluruh elemen.

Hasil akhirnya: satu halaman landing responsif dengan navigasi halus dan call-to-action ke WhatsApp.

---

## 6. Cara Menjalankan & Mengembangkan

### 6.1. Menjalankan di mode pengembangan

1. Pastikan sudah menjalankan `npm install` sekali untuk mengunduh dependencies.
2. Jalankan:
   - `npm run dev`
3. Buka URL yang diberikan Vite (biasanya `http://localhost:5173`).

### 6.2. Build untuk produksi

- Jalankan:
  - `npm run build`
- Hasil build akan ada di folder `dist/` (bisa di-host ke server/hosting statis).

### 6.3. Menambah / Mengubah Komponen

- Untuk menambah section baru:
  - Buat file baru di `src/`, misalnya `Testimonials.tsx`.
  - Import dan gunakan di `App.tsx`.
  - Jika perlu navigasi, tambahkan link di `Navbar.tsx` dan `id` di section baru.

- Untuk menambah produk baru:
  - Edit array `products` di `ProductList.tsx` dan tambahkan objek `Product` baru.

---

## 7. Tips Memahami & Mengembangkan Proyek Ini

- **Mulai dari App.tsx**:
  - Lihat urutan komponen yang dirender untuk memahami struktur halaman.
- **Cek tiap komponen satu per satu**:
  - `Navbar` → navigasi & responsif.
  - `Hero` → hero & CTA.
  - `ProductList` + `ProductCard` → data produk & tampilan.
- **Perhatikan Tailwind className**:
  - Walaupun terlihat panjang, setiap class adalah 1 fungsi kecil (warna, margin, font, dsb).
  - Bisa belajar dengan menghapus/ubah satu class untuk melihat efeknya.
- **Manfaatkan TypeScript**:
  - Tipe `Product` memudahkan saat menambah properti baru (misalnya `stock`, `color`, dsb). TypeScript akan mengingatkan kalau ada data yang kurang terisi.

Jika ingin, kita bisa menambah bagian dokumentasi yang lebih teknis lagi (misalnya flow state, rencana integrasi API, atau panduan styling lanjutan).