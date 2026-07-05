-- SQL Script to enable automated blog media sync to Google Drive
-- Copy and paste this script directly into your Supabase Dashboard SQL Editor (https://supabase.com/dashboard/project/pxgurlmrtoxlmlpiyqrj/sql)

-- 1. Enable pg_net extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "pg_net";

-- 2. Create the webhook notifier function
CREATE OR REPLACE FUNCTION public.sync_blog_post_to_google_drive()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER 
AS $$
BEGIN
  PERFORM net.http_post(
    url := 'https://script.google.com/macros/s/AKfycbyNOpWZ-vec82PEEFS8lhiDNBxoohd662-lmyEESMJ_iSJ7qYx6FiGYbqKU8JLPA_o0wg/exec',
    body := jsonb_build_object(
      'type', TG_OP,
      'table', TG_TABLE_NAME,
      'record', row_to_json(NEW)
    ),
    headers := '{"Content-Type": "application/json"}'::jsonb
  );
  RETURN NEW;
END;
$$;

-- 3. Bind the function as a trigger on the 'posts' table (only on insert)
DROP TRIGGER IF EXISTS tr_sync_blog_post_to_google_drive ON public.posts;
CREATE TRIGGER tr_sync_blog_post_to_google_drive
AFTER INSERT ON public.posts
FOR EACH ROW
EXECUTE FUNCTION public.sync_blog_post_to_google_drive();
