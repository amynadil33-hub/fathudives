-- Complete the content model used by the website and provision CMS media storage.
alter table public.packages
  add column if not exists gallery text[] not null default '{}',
  add column if not exists audiences text[] not null default '{}',
  add column if not exists whale_shark boolean not null default false,
  add column if not exists manta boolean not null default false,
  add column if not exists highlights text[] not null default '{}',
  add column if not exists accommodation_info text,
  add column if not exists equipment_info text,
  add column if not exists transfer_info text,
  add column if not exists important_notes text[] not null default '{}',
  add column if not exists cancellation_policy text;

alter table public.courses
  add column if not exists long_description text,
  add column if not exists highlights text[] not null default '{}',
  add column if not exists what_you_learn text[] not null default '{}',
  add column if not exists featured boolean not null default false;

alter table public.dive_sites
  add column if not exists long_description text,
  add column if not exists current_level text not null default 'Variable',
  add column if not exists gallery text[] not null default '{}';

alter table public.testimonials
  add column if not exists sort_order integer not null default 0,
  add column if not exists updated_at timestamptz not null default now();

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(), question text not null, answer text not null,
  active boolean not null default true, sort_order integer not null default 0,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(), title text not null, description text,
  level text, image text, href text, size text not null default 'regular',
  featured boolean not null default false, active boolean not null default true,
  sort_order integer not null default 0, created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(), constraint experiences_size check (size in ('tall','wide','regular'))
);
create table if not exists public.adventure_options (
  id uuid primary key default gen_random_uuid(), label text not null, description text,
  recommendation_type text not null, recommendation_slug text not null, recommendation_label text not null,
  featured boolean not null default false, active boolean not null default true,
  sort_order integer not null default 0, created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint adventure_recommendation_type check (recommendation_type in ('package','course'))
);

do $$ begin
  create trigger testimonials_updated_at before update on public.testimonials for each row execute function public.set_updated_at();
exception when duplicate_object then null; end $$;
do $$ begin create trigger faqs_updated_at before update on public.faqs for each row execute function public.set_updated_at(); exception when duplicate_object then null; end $$;
do $$ begin create trigger experiences_updated_at before update on public.experiences for each row execute function public.set_updated_at(); exception when duplicate_object then null; end $$;
do $$ begin create trigger adventure_options_updated_at before update on public.adventure_options for each row execute function public.set_updated_at(); exception when duplicate_object then null; end $$;

alter table public.faqs enable row level security;
alter table public.experiences enable row level security;
alter table public.adventure_options enable row level security;
do $$ declare t text; begin
  foreach t in array array['faqs','experiences','adventure_options'] loop
    execute format('drop policy if exists %I on public.%I', t || ' public read', t);
    execute format('create policy %I on public.%I for select using (active = true or public.is_admin())', t || ' public read', t);
    execute format('drop policy if exists %I on public.%I', t || ' admin write', t);
    execute format('create policy %I on public.%I for all using (public.is_admin()) with check (public.is_admin())', t || ' admin write', t);
  end loop;
end $$;

create index if not exists idx_packages_active_sort on public.packages(active, sort_order);
create index if not exists idx_courses_active_sort on public.courses(active, sort_order);
create index if not exists idx_dive_sites_active_sort on public.dive_sites(active, sort_order);
create index if not exists idx_gallery_active_sort on public.gallery_items(active, sort_order);
create index if not exists idx_testimonials_active_sort on public.testimonials(active, sort_order);
create index if not exists idx_faqs_active_sort on public.faqs(active, sort_order);
create index if not exists idx_experiences_active_sort on public.experiences(active, sort_order);
create index if not exists idx_adventure_options_active_sort on public.adventure_options(active, sort_order);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 15728640, array['image/jpeg','image/png','image/webp','image/gif','video/mp4','video/webm','video/quicktime'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;
drop policy if exists "media public read" on storage.objects;
create policy "media public read" on storage.objects for select using (bucket_id = 'media');
drop policy if exists "media admin insert" on storage.objects;
create policy "media admin insert" on storage.objects for insert to authenticated
  with check (bucket_id = 'media' and public.is_admin());
drop policy if exists "media admin update" on storage.objects;
create policy "media admin update" on storage.objects for update to authenticated
  using (bucket_id = 'media' and public.is_admin()) with check (bucket_id = 'media' and public.is_admin());
drop policy if exists "media admin delete" on storage.objects;
create policy "media admin delete" on storage.objects for delete to authenticated
  using (bucket_id = 'media' and public.is_admin());
