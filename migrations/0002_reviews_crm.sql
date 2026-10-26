-- Reviews + minimal CRM (customers by phone, $10 feedback credits).
-- Locked decisions: credits are issued for ANY star rating when the on-site
-- feedback form is submitted; they stack, never expire, and have no per-job
-- cap. Public share clicks are analytics only and never touch credits.

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  phone_e164 text not null unique,
  name text,
  created_at timestamptz not null default now()
);

-- Bookings hook: no booking system exists yet. If one is added, insert rows
-- here through applyCreditsToBooking() (src/lib/reviews/core.js) so available
-- credits auto-apply.
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references customers(id),
  scheduled_at timestamptz,
  service text,
  subtotal_cents integer,
  discount_cents integer not null default 0,
  total_cents integer,
  status text not null default 'scheduled' check (status in ('scheduled', 'done', 'cancelled')),
  created_at timestamptz not null default now()
);

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references customers(id),
  rating smallint not null check (rating between 1 and 5),
  body text not null check (char_length(body) between 1 and 280),
  display_name text not null,
  display_consent boolean not null default false,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  reject_reason text check (reject_reason is null or reject_reason in ('abusive', 'personal_info', 'off_topic', 'suspected_fake', 'no_consent')),
  source text,
  ip_hash text,
  created_at timestamptz not null default now(),
  moderated_at timestamptz,
  moderated_by text
);
create index if not exists reviews_status_created_idx on reviews (status, created_at desc);
create index if not exists reviews_ip_created_idx on reviews (ip_hash, created_at desc);

create table if not exists credits (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references customers(id),
  review_id uuid unique references reviews(id) on delete set null,
  amount_cents integer not null default 1000 check (amount_cents > 0),
  status text not null default 'available' check (status in ('available', 'redeemed', 'void')),
  redeemed_at timestamptz,
  redeemed_booking_id uuid references bookings(id),
  redeemed_note text,
  created_at timestamptz not null default now()
);
create index if not exists credits_customer_status_idx on credits (customer_id, status);

create table if not exists share_clicks (
  id bigserial primary key,
  review_id uuid references reviews(id) on delete cascade,
  platform text not null check (platform in ('google', 'facebook')),
  created_at timestamptz not null default now()
);
