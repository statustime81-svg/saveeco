create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'viewer'
    check (role in ('admin', 'editor', 'viewer')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    'viewer'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references public.categories(id) on delete set null,
  name_en text not null,
  name_hi text,
  slug text not null unique,
  description_en text,
  description_hi text,
  image_url text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  name_en text not null,
  name_hi text,
  slug text not null unique,
  description_en text,
  description_hi text,
  benefits_en text[] not null default '{}',
  benefits_hi text[] not null default '{}',
  how_to_use_en text,
  how_to_use_hi text,
  dosage jsonb not null default '{}'::jsonb,
  pack_sizes jsonb not null default '[]'::jsonb,
  images jsonb not null default '[]'::jsonb,
  price numeric(12, 2),
  show_price boolean not null default false,
  is_upcoming boolean not null default false,
  is_featured boolean not null default false,
  is_active boolean not null default true,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.banners (
  id uuid primary key default gen_random_uuid(),
  title_en text,
  title_hi text,
  subtitle_en text,
  subtitle_hi text,
  image_url text not null,
  link_url text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_stats (
  id uuid primary key default gen_random_uuid(),
  label_en text not null,
  label_hi text,
  value numeric not null default 0,
  suffix text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  designation_en text,
  designation_hi text,
  bio_en text,
  bio_hi text,
  image_url text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  title_en text not null,
  title_hi text,
  issuer text,
  certificate_number text,
  image_url text,
  document_url text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title_en text,
  title_hi text,
  image_url text not null,
  category text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  person_name text not null,
  location text,
  message_en text not null,
  message_hi text,
  image_url text,
  rating integer check (rating between 1 and 5),
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question_en text not null,
  question_hi text,
  answer_en text not null,
  answer_hi text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  setting_key text not null unique,
  setting_value jsonb not null default '{}'::jsonb,
  is_public boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text not null,
  subject text,
  message text not null,
  consent boolean not null default false,
  status text not null default 'new'
    check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.partner_leads (
  id uuid primary key default gen_random_uuid(),
  partner_type text not null
    check (partner_type in ('direct', 'channel')),
  name text not null,
  firm_name text,
  phone text not null,
  email text,
  state text,
  city text,
  district text,
  address text,
  gst_number text,
  experience text,
  sponsor_id text,
  message text,
  consent boolean not null default false,
  status text not null default 'new'
    check (status in ('new', 'contacted', 'approved', 'rejected', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'profiles', 'categories', 'products', 'banners', 'site_stats',
    'team_members', 'certificates', 'gallery_items', 'testimonials',
    'faqs', 'enquiries', 'partner_leads'
  ]
  loop
    execute format(
      'drop trigger if exists set_updated_at on public.%I',
      table_name
    );
    execute format(
      'create trigger set_updated_at before update on public.%I
       for each row execute procedure public.set_updated_at()',
      table_name
    );
  end loop;
end;
$$;

drop trigger if exists set_updated_at on public.site_settings;
create trigger set_updated_at
before update on public.site_settings
for each row execute procedure public.set_updated_at();