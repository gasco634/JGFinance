-- Exécuter une fois dans Supabase > SQL Editor pour créer le stockage privé de JGFinance.
create table if not exists public.jgfinance_backups (
  user_id uuid primary key references auth.users (id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.jgfinance_backups enable row level security;
revoke all on table public.jgfinance_backups from anon, authenticated;
grant select, insert, update on table public.jgfinance_backups to authenticated;

drop policy if exists "Read own JGFinance backup" on public.jgfinance_backups;
create policy "Read own JGFinance backup"
  on public.jgfinance_backups for select to authenticated
  using (auth.uid() is not null and auth.uid() = user_id);

drop policy if exists "Create own JGFinance backup" on public.jgfinance_backups;
create policy "Create own JGFinance backup"
  on public.jgfinance_backups for insert to authenticated
  with check (auth.uid() is not null and auth.uid() = user_id);

drop policy if exists "Update own JGFinance backup" on public.jgfinance_backups;
create policy "Update own JGFinance backup"
  on public.jgfinance_backups for update to authenticated
  using (auth.uid() is not null and auth.uid() = user_id)
  with check (auth.uid() is not null and auth.uid() = user_id);

do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime')
     and not exists (
       select 1 from pg_publication_tables
       where pubname = 'supabase_realtime'
         and schemaname = 'public'
         and tablename = 'jgfinance_backups'
     ) then
    execute 'alter publication supabase_realtime add table public.jgfinance_backups';
  end if;
end $$;
