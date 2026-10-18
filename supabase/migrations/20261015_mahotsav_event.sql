-- The event uploads attach to; id is hard-coded in app/lib/albums.ts
insert into events (id, name, description, date)
values (
  '812878f4-960d-4b91-81e3-e2035af78908',
  'Shree Nilkanth Mahadev Maha Mahotsav 2026',
  'Shree Nilkanth Mahadev Mandir, Bapupura · 22–25 October 2026',
  '2026-10-22'
)
on conflict (id) do nothing;
