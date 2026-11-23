-- Safe forward patch for projects that already ran migrations 001-003.
alter table public.gallery_items
  add column if not exists media_type text not null default 'photo'
    check (media_type in ('photo', 'video')),
  add column if not exists video_url text;

create table if not exists public.product_notifications (
  id uuid primary key default gen_random_uuid(),
  product_name text not null,
  email text,
  phone text,
  consent boolean not null default false check (consent = true),
  created_at timestamptz not null default now(),
  constraint product_notifications_contact_required check (email is not null or phone is not null)
);

alter table public.product_notifications enable row level security;
drop policy if exists "Visitors can request product notifications" on public.product_notifications;
create policy "Visitors can request product notifications"
  on public.product_notifications for insert to anon, authenticated
  with check (consent = true and (email is not null or phone is not null));

drop policy if exists "Admins manage product notifications" on public.product_notifications;
create policy "Admins manage product notifications"
  on public.product_notifications for all to authenticated
  using (public.is_admin()) with check (public.is_admin());
