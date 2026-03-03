-- Supabase schema for `products` table matching the frontend `Product` interface

create table if not exists public.products (
  id text primary key,
  name text not null,
  category text not null,
  imageUrl text,
  tags text[],
  seriesOptions jsonb not null
);

-- Enable Row Level Security
alter table public.products enable row level security;

-- Allow public (anon) read access
create policy "Public read access to products"
  on public.products
  for select
  using (true);

-- Allow public (anon) insert access (MVP only, for testing convenience)
create policy "Public insert access to products"
  on public.products
  for insert
  with check (true);
