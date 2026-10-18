-- Public bucket for community uploads (matches the 10 MB / JPG-PNG-WebP check in app/upload/page.tsx)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('photos', 'photos', true, 10485760, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
set public = true, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

-- Visitors may upload into the bucket; no select policy, so nobody can list or overwrite files
drop policy if exists "Public can upload photos" on storage.objects;
create policy "Public can upload photos" on storage.objects
  for insert to anon, authenticated
  with check (bucket_id = 'photos');

-- Visitors may only submit unapproved rows and only see approved ones
alter table photos enable row level security;

drop policy if exists "Public can submit unapproved photos" on photos;
create policy "Public can submit unapproved photos" on photos
  for insert to anon, authenticated
  with check (approved = false);

drop policy if exists "Public can read approved photos" on photos;
create policy "Public can read approved photos" on photos
  for select to anon, authenticated
  using (approved = true);
