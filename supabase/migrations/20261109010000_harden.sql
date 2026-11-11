-- Hardening after the security review.

-- 1. Usage writes only go through track_tool_use(); no direct inserts.
revoke insert on public.tool_usage from anon, authenticated;
drop policy if exists "Public can insert usage" on public.tool_usage;

-- 2. Only known tool slugs can be counted (keep in sync with src/lib/tools.ts).
create or replace function public.track_tool_use(p_slug text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if p_slug not in (
    'image-compressor','compress-image-to-100kb','compress-image-to-50kb','compress-image-to-20kb',
    'heic-to-jpg','png-to-jpg','jpg-to-png','webp-to-jpg',
    'merge-pdf','split-pdf','compress-pdf','jpg-to-pdf','pdf-to-jpg','organize-pdf','rotate-pdf',
    'extract-pdf-pages','delete-pdf-pages','add-page-numbers-to-pdf','watermark-pdf',
    'qr-code-generator','wifi-qr-code-generator',
    'emi-calculator','compound-interest-calculator','sip-calculator','percentage-calculator','discount-calculator',
    'background-remover'
  ) then
    raise exception 'unknown tool';
  end if;
  insert into public.tool_usage as u (slug, day, count)
  values (p_slug, (now() at time zone 'utc')::date, 1)
  on conflict (slug, day) do update set count = u.count + 1;
end;
$$;

-- 3. Database-side flood guard for feedback (anyone with the anon key could call PostgREST directly).
create or replace function public.feedback_flood_guard()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if (select count(*) from public.feedback where created_at > now() - interval '10 minutes') >= 30 then
    raise exception 'Too many messages right now, please try again later.';
  end if;
  return new;
end;
$$;

drop trigger if exists feedback_flood_guard on public.feedback;
create trigger feedback_flood_guard
  before insert on public.feedback
  for each row execute function public.feedback_flood_guard();

revoke all on function public.feedback_flood_guard() from public, anon, authenticated;
