insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  (
    'public-media',
    'public-media',
    true,
    5242880,
    array['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
  ),
  (
    'documents',
    'documents',
    true,
    10485760,
    array['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
  )
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Public can view website media"
on storage.objects for select to anon, authenticated
using (bucket_id in ('public-media', 'documents'));

create policy "Admins can upload website media"
on storage.objects for insert to authenticated
with check (
  bucket_id in ('public-media', 'documents')
  and public.is_admin()
);

create policy "Admins can update website media"
on storage.objects for update to authenticated
using (
  bucket_id in ('public-media', 'documents')
  and public.is_admin()
)
with check (
  bucket_id in ('public-media', 'documents')
  and public.is_admin()
);

create policy "Admins can delete website media"
on storage.objects for delete to authenticated
using (
  bucket_id in ('public-media', 'documents')
  and public.is_admin()
);
