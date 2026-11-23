create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.banners enable row level security;
alter table public.site_stats enable row level security;
alter table public.team_members enable row level security;
alter table public.certificates enable row level security;
alter table public.gallery_items enable row level security;
alter table public.testimonials enable row level security;
alter table public.faqs enable row level security;
alter table public.site_settings enable row level security;
alter table public.enquiries enable row level security;
alter table public.partner_leads enable row level security;

create policy "Users can view their own profile"
on public.profiles for select to authenticated
using (id = auth.uid() or public.is_admin());

create policy "Admins can update profiles"
on public.profiles for update to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Public can view active categories"
on public.categories for select to anon, authenticated
using (is_active or public.is_admin());

create policy "Admins manage categories"
on public.categories for all to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Public can view active products"
on public.products for select to anon, authenticated
using (is_active or public.is_admin());

create policy "Admins manage products"
on public.products for all to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Public can view active banners"
on public.banners for select to anon, authenticated
using (is_active or public.is_admin());

create policy "Admins manage banners"
on public.banners for all to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Public can view active stats"
on public.site_stats for select to anon, authenticated
using (is_active or public.is_admin());

create policy "Admins manage stats"
on public.site_stats for all to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Public can view active team members"
on public.team_members for select to anon, authenticated
using (is_active or public.is_admin());

create policy "Admins manage team members"
on public.team_members for all to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Public can view active certificates"
on public.certificates for select to anon, authenticated
using (is_active or public.is_admin());

create policy "Admins manage certificates"
on public.certificates for all to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Public can view active gallery items"
on public.gallery_items for select to anon, authenticated
using (is_active or public.is_admin());

create policy "Admins manage gallery items"
on public.gallery_items for all to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Public can view active testimonials"
on public.testimonials for select to anon, authenticated
using (is_active or public.is_admin());

create policy "Admins manage testimonials"
on public.testimonials for all to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Public can view active FAQs"
on public.faqs for select to anon, authenticated
using (is_active or public.is_admin());

create policy "Admins manage FAQs"
on public.faqs for all to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Public can view public settings"
on public.site_settings for select to anon, authenticated
using (is_public or public.is_admin());

create policy "Admins manage settings"
on public.site_settings for all to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Visitors can submit enquiries"
on public.enquiries for insert to anon, authenticated
with check (consent = true);

create policy "Admins manage enquiries"
on public.enquiries for all to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Visitors can submit partner leads"
on public.partner_leads for insert to anon, authenticated
with check (consent = true);

create policy "Admins manage partner leads"
on public.partner_leads for all to authenticated
using (public.is_admin())
with check (public.is_admin());