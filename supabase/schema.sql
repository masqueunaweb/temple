-- TEMPLE Supabase Schema
-- Ejecutar este script en el SQL Editor de Supabase

-- Tabla: profiles (extensión de auth.users)
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  created_at timestamptz default now()
);

-- Tabla: blocks (Bloques de 27 días)
create table if not exists blocks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  dimension text not null check (dimension in ('interior', 'maquina', 'trinchera', 'afilado', 'tribu')),
  started_at date not null default current_date,
  completed boolean default false,
  created_at timestamptz default now()
);

-- Tabla: entries (Entradas diarias)
create table if not exists entries (
  id uuid default gen_random_uuid() primary key,
  block_id uuid references blocks(id) on delete cascade not null,
  user_id uuid references profiles(id) on delete cascade not null,
  day_number int not null check (day_number between 1 and 27),
  type text not null check (type in ('firma', 'fallo')),
  note text,
  fail_reason text,
  created_at timestamptz default now(),
  unique(block_id, day_number)
);

-- Row Level Security (RLS)
alter table profiles enable row level security;
alter table blocks enable row level security;
alter table entries enable row level security;

-- Policies para profiles
create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

-- Policies para blocks
create policy "Users can view own blocks"
  on blocks for select
  using (auth.uid() = user_id);

create policy "Users can insert own blocks"
  on blocks for insert
  with check (auth.uid() = user_id);

create policy "Users can update own blocks"
  on blocks for update
  using (auth.uid() = user_id);

create policy "Users can delete own blocks"
  on blocks for delete
  using (auth.uid() = user_id);

-- Policies para entries
create policy "Users can view own entries"
  on entries for select
  using (auth.uid() = user_id);

create policy "Users can insert own entries"
  on entries for insert
  with check (auth.uid() = user_id);

create policy "Users can update own entries"
  on entries for update
  using (auth.uid() = user_id);

create policy "Users can delete own entries"
  on entries for delete
  using (auth.uid() = user_id);

-- Índices para optimización
create index if not exists idx_blocks_user_id on blocks(user_id);
create index if not exists idx_blocks_user_id_completed on blocks(user_id, completed);
create index if not exists idx_entries_block_id on entries(block_id);
create index if not exists idx_entries_user_id on entries(user_id);
create index if not exists idx_entries_block_id_day on entries(block_id, day_number);

-- Trigger para crear profile automáticamente al registrar usuario
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, username)
  values (new.id, null)
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute procedure public.handle_new_user();
