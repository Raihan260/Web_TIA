-- Supabase schema for `products` table matching the frontend `Product` interface
-- Nama kolom sengaja diberi tanda kutip ganda agar cocok persis (case-sensitive)
-- dengan key camelCase yang dikirim dari aplikasi (imageUrl, seriesOptions).
-- Tanpa tanda kutip, Postgres akan melipat nama kolom jadi huruf kecil semua
-- (imageurl, seriesoptions) sehingga tidak cocok dengan key dari aplikasi.

create table if not exists public.products (
  id text primary key,
  name text not null,
  category text not null,
  "imageUrl" text,
  tags text[],
  "seriesOptions" jsonb not null
);

-- Enable Row Level Security
alter table public.products enable row level security;

-- Siapa saja (termasuk pengunjung anonim) boleh membaca katalog produk.
create policy "Public read access to products"
  on public.products
  for select
  using (true);

-- Hanya user yang sudah login (admin) yang boleh menambah produk.
create policy "Authenticated insert access to products"
  on public.products
  for insert
  to authenticated
  with check (true);

-- Hanya user yang sudah login (admin) yang boleh mengubah produk.
create policy "Authenticated update access to products"
  on public.products
  for update
  to authenticated
  using (true)
  with check (true);

-- Hanya user yang sudah login (admin) yang boleh menghapus produk.
create policy "Authenticated delete access to products"
  on public.products
  for delete
  to authenticated
  using (true);
