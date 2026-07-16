-- =============================================================================
-- Fathu Dives — Supabase schema
-- =============================================================================
-- Run this in the Supabase SQL editor (or `supabase db push`) to provision the
-- database. It is safe to re-run: objects use "if not exists" / "or replace"
-- where possible.
--
-- Security model
--   * Public (anon) visitors may READ active/public content and INSERT enquiries.
--   * Only authenticated admin users (a row in `profiles` with an admin role)
--     may write content or read all enquiries.
--   * The service-role key bypasses RLS and must only be used server-side.
-- =============================================================================

create extension if not exists "pgcrypto";

-- Enums ----------------------------------------------------------------------
do $$ begin
  create type user_role as enum ('super_admin', 'admin', 'editor');
exception when duplicate_object then null; end $$;

do $$ begin
  create type enquiry_status as enum ('new', 'contacted', 'quoted', 'confirmed', 'cancelled');
exception when duplicate_object then null; end $$;

do $$ begin
  create type inclusion_type as enum ('included', 'excluded');
exception when duplicate_object then null; end $$;

do $$ begin
  create type media_type as enum ('image', 'video');
exception when duplicate_object then null; end $$;

-- Helper: is the current user an admin? --------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and role in ('super_admin', 'admin', 'editor')
  );
$$;

-- Helper: keep updated_at fresh ----------------------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Profiles -------------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  full_name   text,
  email       text,
  role        user_role not null default 'editor',
  created_at  timestamptz not null default now()
);

-- Automatically create a profile row when a new auth user is created.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Packages -------------------------------------------------------------------
create table if not exists public.packages (
  id                      uuid primary key default gen_random_uuid(),
  title                   text not null,
  slug                    text not null unique,
  short_description       text,
  full_description        text,
  featured_image          text,
  nights                  integer not null default 0,
  dives                   integer not null default 0,
  experience_level        text not null default 'All Levels',
  accommodation_included  boolean not null default false,
  meals_included          boolean not null default false,
  transfers_included      boolean not null default false,
  base_price              numeric not null default 0,
  currency                text not null default 'USD',
  featured                boolean not null default false,
  active                  boolean not null default true,
  sort_order              integer not null default 0,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);
drop trigger if exists packages_updated_at on public.packages;
create trigger packages_updated_at before update on public.packages
  for each row execute function public.set_updated_at();

create table if not exists public.package_inclusions (
  id              uuid primary key default gen_random_uuid(),
  package_id      uuid not null references public.packages (id) on delete cascade,
  label           text not null,
  inclusion_type  inclusion_type not null default 'included',
  sort_order      integer not null default 0
);

create table if not exists public.package_itinerary (
  id           uuid primary key default gen_random_uuid(),
  package_id   uuid not null references public.packages (id) on delete cascade,
  day_number   integer not null,
  title        text not null,
  description  text
);

-- Courses --------------------------------------------------------------------
create table if not exists public.courses (
  id                      uuid primary key default gen_random_uuid(),
  title                   text not null,
  slug                    text not null unique,
  category                text not null,
  description             text,
  duration                text,
  minimum_age             text,
  required_certification  text,
  number_of_dives         integer not null default 0,
  price                   numeric not null default 0,
  currency                text not null default 'USD',
  featured_image          text,
  active                  boolean not null default true,
  sort_order              integer not null default 0,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);
drop trigger if exists courses_updated_at on public.courses;
create trigger courses_updated_at before update on public.courses
  for each row execute function public.set_updated_at();

-- Dive sites -----------------------------------------------------------------
create table if not exists public.dive_sites (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  slug            text not null unique,
  description     text,
  site_type       text,
  depth_min       integer,
  depth_max       integer,
  difficulty      text,
  marine_life     text[] not null default '{}',
  journey_time    text,
  featured_image  text,
  latitude        double precision,
  longitude       double precision,
  featured        boolean not null default false,
  active          boolean not null default true,
  sort_order      integer not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
drop trigger if exists dive_sites_updated_at on public.dive_sites;
create trigger dive_sites_updated_at before update on public.dive_sites
  for each row execute function public.set_updated_at();

-- Gallery --------------------------------------------------------------------
create table if not exists public.gallery_items (
  id          uuid primary key default gen_random_uuid(),
  title       text,
  media_type  media_type not null default 'image',
  image_url   text,
  video_url   text,
  poster_url  text,
  category    text,
  caption     text,
  featured    boolean not null default false,
  sort_order  integer not null default 0,
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

-- Testimonials ---------------------------------------------------------------
create table if not exists public.testimonials (
  id           uuid primary key default gen_random_uuid(),
  guest_name   text not null,
  country      text,
  trip_type    text,
  review       text not null,
  guest_image  text,
  source       text,
  source_url   text,
  featured     boolean not null default false,
  active       boolean not null default true,
  created_at   timestamptz not null default now()
);

-- Enquiries ------------------------------------------------------------------
create table if not exists public.enquiries (
  id                      uuid primary key default gen_random_uuid(),
  full_name               text not null,
  email                   text not null,
  whatsapp                text,
  nationality             text,
  arrival_date            date,
  departure_date          date,
  adults                  integer not null default 1,
  children                integer not null default 0,
  number_of_divers        integer not null default 0,
  diver_status            text,
  certification_level     text,
  certification_agency    text,
  logged_dives            integer,
  package_id              uuid references public.packages (id) on delete set null,
  accommodation_required  boolean not null default false,
  equipment_required      boolean not null default false,
  transfer_required       boolean not null default false,
  special_requests        text,
  message                 text,
  status                  enquiry_status not null default 'new',
  created_at              timestamptz not null default now()
);

-- Bookings (prepared for future confirmed reservations) ----------------------
create table if not exists public.bookings (
  id              uuid primary key default gen_random_uuid(),
  enquiry_id      uuid references public.enquiries (id) on delete set null,
  package_id      uuid references public.packages (id) on delete set null,
  guest_name      text not null,
  arrival_date    date,
  departure_date  date,
  total_amount    numeric,
  currency        text not null default 'USD',
  deposit_paid    boolean not null default false,
  payment_ref     text,
  status          text not null default 'pending',
  created_at      timestamptz not null default now()
);

-- Site settings (single-row key/value style) --------------------------------
create table if not exists public.site_settings (
  id                  integer primary key default 1,
  contact_email       text,
  whatsapp            text,
  phone               text,
  instagram_url       text,
  facebook_url        text,
  youtube_url         text,
  tripadvisor_url     text,
  hero_headline       text,
  hero_subheadline    text,
  announcement        text,
  seo_title           text,
  seo_description     text,
  updated_at          timestamptz not null default now(),
  constraint site_settings_singleton check (id = 1)
);
insert into public.site_settings (id) values (1) on conflict (id) do nothing;

-- =============================================================================
-- Row Level Security
-- =============================================================================
alter table public.profiles           enable row level security;
alter table public.packages           enable row level security;
alter table public.package_inclusions enable row level security;
alter table public.package_itinerary  enable row level security;
alter table public.courses            enable row level security;
alter table public.dive_sites         enable row level security;
alter table public.gallery_items      enable row level security;
alter table public.testimonials       enable row level security;
alter table public.enquiries          enable row level security;
alter table public.bookings           enable row level security;
alter table public.site_settings      enable row level security;

-- Profiles: users read/update their own row; admins read all.
drop policy if exists "profiles self read" on public.profiles;
create policy "profiles self read" on public.profiles
  for select using (auth.uid() = id or public.is_admin());

drop policy if exists "profiles self update" on public.profiles;
create policy "profiles self update" on public.profiles
  for update using (auth.uid() = id);

-- Public content: anyone may read active rows; admins may do everything.
-- (Reusable pattern applied per table.)

-- Packages
drop policy if exists "packages public read" on public.packages;
create policy "packages public read" on public.packages
  for select using (active = true or public.is_admin());
drop policy if exists "packages admin write" on public.packages;
create policy "packages admin write" on public.packages
  for all using (public.is_admin()) with check (public.is_admin());

-- Package inclusions / itinerary follow their parent package's visibility.
drop policy if exists "inclusions public read" on public.package_inclusions;
create policy "inclusions public read" on public.package_inclusions
  for select using (true);
drop policy if exists "inclusions admin write" on public.package_inclusions;
create policy "inclusions admin write" on public.package_inclusions
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "itinerary public read" on public.package_itinerary;
create policy "itinerary public read" on public.package_itinerary
  for select using (true);
drop policy if exists "itinerary admin write" on public.package_itinerary;
create policy "itinerary admin write" on public.package_itinerary
  for all using (public.is_admin()) with check (public.is_admin());

-- Courses
drop policy if exists "courses public read" on public.courses;
create policy "courses public read" on public.courses
  for select using (active = true or public.is_admin());
drop policy if exists "courses admin write" on public.courses;
create policy "courses admin write" on public.courses
  for all using (public.is_admin()) with check (public.is_admin());

-- Dive sites
drop policy if exists "dive_sites public read" on public.dive_sites;
create policy "dive_sites public read" on public.dive_sites
  for select using (active = true or public.is_admin());
drop policy if exists "dive_sites admin write" on public.dive_sites;
create policy "dive_sites admin write" on public.dive_sites
  for all using (public.is_admin()) with check (public.is_admin());

-- Gallery
drop policy if exists "gallery public read" on public.gallery_items;
create policy "gallery public read" on public.gallery_items
  for select using (active = true or public.is_admin());
drop policy if exists "gallery admin write" on public.gallery_items;
create policy "gallery admin write" on public.gallery_items
  for all using (public.is_admin()) with check (public.is_admin());

-- Testimonials
drop policy if exists "testimonials public read" on public.testimonials;
create policy "testimonials public read" on public.testimonials
  for select using (active = true or public.is_admin());
drop policy if exists "testimonials admin write" on public.testimonials;
create policy "testimonials admin write" on public.testimonials
  for all using (public.is_admin()) with check (public.is_admin());

-- Enquiries: anyone may submit (insert); only admins may read/update/delete.
drop policy if exists "enquiries public insert" on public.enquiries;
create policy "enquiries public insert" on public.enquiries
  for insert with check (true);
drop policy if exists "enquiries admin read" on public.enquiries;
create policy "enquiries admin read" on public.enquiries
  for select using (public.is_admin());
drop policy if exists "enquiries admin update" on public.enquiries;
create policy "enquiries admin update" on public.enquiries
  for update using (public.is_admin());
drop policy if exists "enquiries admin delete" on public.enquiries;
create policy "enquiries admin delete" on public.enquiries
  for delete using (public.is_admin());

-- Bookings: admin only.
drop policy if exists "bookings admin all" on public.bookings;
create policy "bookings admin all" on public.bookings
  for all using (public.is_admin()) with check (public.is_admin());

-- Site settings: public read, admin write.
drop policy if exists "settings public read" on public.site_settings;
create policy "settings public read" on public.site_settings
  for select using (true);
drop policy if exists "settings admin write" on public.site_settings;
create policy "settings admin write" on public.site_settings
  for all using (public.is_admin()) with check (public.is_admin());

-- Helpful indexes ------------------------------------------------------------
create index if not exists idx_packages_slug on public.packages (slug);
create index if not exists idx_courses_slug on public.courses (slug);
create index if not exists idx_dive_sites_slug on public.dive_sites (slug);
create index if not exists idx_enquiries_status on public.enquiries (status);
create index if not exists idx_enquiries_created_at on public.enquiries (created_at desc);

-- =============================================================================
-- Promote your first admin (run once, after signing up through the app):
--   update public.profiles set role = 'super_admin' where email = 'you@example.com';
-- =============================================================================
