-- Careerly MVP schema (Phase 1-2: auth, profiles, companies, jobs, applications, saved jobs)
-- Run this in the Supabase SQL editor, or via `supabase db push` with the CLI.

create extension if not exists "uuid-ossp";

-- ───────────────────────────── profiles ─────────────────────────────
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null default 'seeker' check (role in ('seeker', 'employer', 'admin')),
  full_name text,
  headline text,
  bio text,
  location text,
  portfolio_url text,
  github_url text,
  linkedin_url text,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ───────────────────────────── companies ─────────────────────────────
create table if not exists companies (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid not null references profiles(id) on delete cascade,
  name text not null,
  industry text,
  website text,
  description text,
  size text,
  location text,
  logo_url text,
  verification_status text not null default 'pending'
    check (verification_status in ('pending', 'verified', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_companies_owner on companies(owner_id);

create table if not exists company_members (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid not null references companies(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  role text not null default 'recruiter' check (role in ('owner', 'recruiter')),
  created_at timestamptz not null default now(),
  unique (company_id, user_id)
);

-- ───────────────────────────── jobs ─────────────────────────────
create table if not exists jobs (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid not null references companies(id) on delete cascade,
  company_name text not null,
  title text not null,
  location text not null,
  employment_type text not null check (employment_type in
    ('full_time', 'part_time', 'internship', 'contract', 'freelance')),
  work_arrangement text not null check (work_arrangement in ('remote', 'hybrid', 'on_site')),
  experience_level text check (experience_level in ('entry', 'mid', 'senior', 'lead')),
  salary_min numeric,
  salary_max numeric,
  currency text not null default 'UZS',
  skills text[] default '{}',
  description text not null,
  responsibilities text,
  qualifications text,
  benefits text,
  is_internship boolean not null default false,
  application_deadline date,
  status text not null default 'draft' check (status in ('draft', 'published', 'paused', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_jobs_company on jobs(company_id);
create index if not exists idx_jobs_status on jobs(status);
create index if not exists idx_jobs_created_at on jobs(created_at desc);

-- ───────────────────────────── saved_jobs ─────────────────────────────
create table if not exists saved_jobs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  job_id uuid not null references jobs(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, job_id)
);

-- ───────────────────────────── applications ─────────────────────────────
create table if not exists applications (
  id uuid primary key default uuid_generate_v4(),
  job_id uuid not null references jobs(id) on delete cascade,
  applicant_id uuid not null references profiles(id) on delete cascade,
  resume_url text,
  cover_letter text,
  status text not null default 'new' check (status in
    ('new', 'under_review', 'shortlisted', 'interview', 'offer', 'hired', 'rejected', 'withdrawn')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (job_id, applicant_id)
);
create index if not exists idx_applications_applicant on applications(applicant_id);
create index if not exists idx_applications_job on applications(job_id);

create table if not exists application_status_history (
  id uuid primary key default uuid_generate_v4(),
  application_id uuid not null references applications(id) on delete cascade,
  status text not null,
  created_at timestamptz not null default now()
);

-- ───────────────────────────── notifications ─────────────────────────────
create table if not exists notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  type text not null,
  title text not null,
  body text,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists idx_notifications_user on notifications(user_id, is_read);

-- ───────────────────────────── updated_at trigger ─────────────────────────────
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_profiles_updated_at before update on profiles
  for each row execute function set_updated_at();
create trigger trg_companies_updated_at before update on companies
  for each row execute function set_updated_at();
create trigger trg_jobs_updated_at before update on jobs
  for each row execute function set_updated_at();
create trigger trg_applications_updated_at before update on applications
  for each row execute function set_updated_at();

-- ───────────────────────────── Row Level Security ─────────────────────────────
alter table profiles enable row level security;
alter table companies enable row level security;
alter table company_members enable row level security;
alter table jobs enable row level security;
alter table saved_jobs enable row level security;
alter table applications enable row level security;
alter table application_status_history enable row level security;
alter table notifications enable row level security;

-- profiles: public profiles are readable; users manage only their own row,
-- and can never change their own role (role changes require a trusted
-- server-side/admin path, not a client update).
create policy "profiles_select_public_or_own" on profiles
  for select using (is_public = true or id = auth.uid());

create policy "profiles_insert_own" on profiles
  for insert with check (id = auth.uid());

create policy "profiles_update_own_no_role_change" on profiles
  for update using (id = auth.uid())
  with check (id = auth.uid() and role = (select role from profiles p where p.id = auth.uid()));

-- companies: public can read verified companies; owners manage their own.
create policy "companies_select_verified_or_own" on companies
  for select using (verification_status = 'verified' or owner_id = auth.uid());

create policy "companies_insert_own" on companies
  for insert with check (owner_id = auth.uid());

create policy "companies_update_own" on companies
  for update using (owner_id = auth.uid());

-- company_members: visible/manageable only to members of that company.
create policy "company_members_select_own_company" on company_members
  for select using (
    user_id = auth.uid()
    or exists (select 1 from companies c where c.id = company_id and c.owner_id = auth.uid())
  );

create policy "company_members_manage_owner" on company_members
  for all using (
    exists (select 1 from companies c where c.id = company_id and c.owner_id = auth.uid())
  );

-- jobs: public can read published jobs; employers manage jobs for their own company.
create policy "jobs_select_published_or_owner" on jobs
  for select using (
    status = 'published'
    or exists (select 1 from companies c where c.id = company_id and c.owner_id = auth.uid())
  );

create policy "jobs_insert_own_company" on jobs
  for insert with check (
    exists (select 1 from companies c where c.id = company_id and c.owner_id = auth.uid())
  );

create policy "jobs_update_own_company" on jobs
  for update using (
    exists (select 1 from companies c where c.id = company_id and c.owner_id = auth.uid())
  );

create policy "jobs_delete_own_company" on jobs
  for delete using (
    exists (select 1 from companies c where c.id = company_id and c.owner_id = auth.uid())
  );

-- saved_jobs: only the owning user.
create policy "saved_jobs_owner_only" on saved_jobs
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- applications: applicants see/manage their own; employers see applications
-- only for jobs belonging to their own company.
create policy "applications_select_applicant_or_employer" on applications
  for select using (
    applicant_id = auth.uid()
    or exists (
      select 1 from jobs j join companies c on c.id = j.company_id
      where j.id = job_id and c.owner_id = auth.uid()
    )
  );

create policy "applications_insert_applicant" on applications
  for insert with check (applicant_id = auth.uid());

create policy "applications_update_applicant_or_employer" on applications
  for update using (
    applicant_id = auth.uid()
    or exists (
      select 1 from jobs j join companies c on c.id = j.company_id
      where j.id = job_id and c.owner_id = auth.uid()
    )
  );

-- application_status_history: visible to applicant or owning employer.
create policy "status_history_select" on application_status_history
  for select using (
    exists (
      select 1 from applications a
      left join jobs j on j.id = a.job_id
      left join companies c on c.id = j.company_id
      where a.id = application_id
        and (a.applicant_id = auth.uid() or c.owner_id = auth.uid())
    )
  );

create policy "status_history_insert_employer" on application_status_history
  for insert with check (
    exists (
      select 1 from applications a
      join jobs j on j.id = a.job_id
      join companies c on c.id = j.company_id
      where a.id = application_id and c.owner_id = auth.uid()
    )
  );

-- notifications: visible only to the recipient.
create policy "notifications_owner_only" on notifications
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());
