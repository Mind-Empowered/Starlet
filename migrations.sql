-- Migration for profiles and event_settings

-- 1. Set the default value of public.profiles.is_approved to false
-- This ensures that new sign-ups default to "Absent" for attendees
ALTER TABLE public.profiles ALTER COLUMN is_approved SET DEFAULT false;

-- 2. Pre-seed default settings in event_settings table if they don't already exist
INSERT INTO public.event_settings (id, value) VALUES
('project_submission_open', 'true'),
('winner_1st_email', ''),
('winner_2nd_email', ''),
('winner_3rd_email', ''),
('winner_innovation_email', '')
ON CONFLICT (id) DO NOTHING;
