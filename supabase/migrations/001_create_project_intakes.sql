create type practice_type as enum ('growth', 'creative', 'technology', 'experiences', 'not_sure');
create type currency_type as enum ('INR', 'AED', 'USD', 'GBP', 'EUR');

create table project_intakes (
  id text primary key,
  practice practice_type not null,
  practice_focus text,
  scope text,
  business_name text not null,
  website text,
  industry text,
  geography text,
  currency currency_type not null default 'INR',
  budget_range text not null,
  timeline text not null,
  strategic_outcome text not null,
  contact_name text not null,
  contact_email text not null,
  contact_phone text,
  contact_role text,
  client_ip text,
  user_agent text,
  source text not null default 'project-diagnostic',
  created_at timestamptz not null default now()
);

alter table project_intakes enable row level security;

-- No public INSERT/SELECT/UPDATE/DELETE policies are created.
-- The application server will use a private Supabase service-role credential
-- for persistence; that credential must never be exposed to the browser.

create index project_intakes_created_at_idx
  on project_intakes (created_at desc);

create index project_intakes_contact_email_idx
  on project_intakes (contact_email);
