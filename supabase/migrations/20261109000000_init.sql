-- ToolNest: feedback form + anonymous tool-usage counts.
-- Security model: the browser/server only ever uses the anon key.
-- The anon role can INSERT feedback and call two narrow functions. It can never SELECT, UPDATE or DELETE table rows.

-- Feedback ---------------------------------------------------------------
create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text check (char_length(name) <= 100),
  email text check (char_length(email) <= 200),
  topic text not null default 'general' check (topic in ('general', 'bug', 'feature', 'privacy', 'other')),
  message text not null check (char_length(message) between 10 and 5000),
  page text check (char_length(page) <= 200)
);

alter table public.feedback enable row level security;

revoke all on public.feedback from anon, authenticated;
grant insert on public.feedback to anon, authenticated;

drop policy if exists "Public can submit feedback" on public.feedback;
create policy "Public can submit feedback"
  on public.feedback for insert
  to anon, authenticated
  with check (true);
-- No select/update/delete policies: with RLS on, those are denied for anon.

-- Tool usage -------------------------------------------------------------
create table if not exists public.tool_usage (
  slug text not null check (slug ~ '^[a-z0-9-]{1,60}$'),
  day date not null default current_date,
  count integer not null default 1 check (count >= 0),
  primary key (slug, day)
);

alter table public.tool_usage enable row level security;

revoke all on public.tool_usage from anon, authenticated;
grant insert on public.tool_usage to anon, authenticated;

drop policy if exists "Public can insert usage" on public.tool_usage;
create policy "Public can insert usage"
  on public.tool_usage for insert
  to anon, authenticated
  with check (count = 1 and day = current_date);

-- Increment today's counter for one tool. SECURITY DEFINER so anon can upsert
-- without being granted UPDATE on the table. Input is validated.
create or replace function public.track_tool_use(p_slug text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if p_slug !~ '^[a-z0-9-]{1,60}$' then
    raise exception 'invalid slug';
  end if;
  insert into public.tool_usage as u (slug, day, count)
  values (p_slug, current_date, 1)
  on conflict (slug, day) do update set count = u.count + 1;
end;
$$;

-- Aggregated totals only (no row-level data), used for "Popular tools".
create or replace function public.popular_tools(p_days integer default 30, p_limit integer default 8)
returns table (slug text, total bigint)
language sql
stable
security definer
set search_path = ''
as $$
  select u.slug, sum(u.count)::bigint as total
  from public.tool_usage u
  where u.day >= current_date - least(greatest(p_days, 1), 365)
  group by u.slug
  order by total desc
  limit least(greatest(p_limit, 1), 20);
$$;

revoke all on function public.track_tool_use(text) from public;
revoke all on function public.popular_tools(integer, integer) from public;
grant execute on function public.track_tool_use(text) to anon, authenticated;
grant execute on function public.popular_tools(integer, integer) to anon, authenticated;
