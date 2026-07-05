-- 1. Add team leadership flag to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_team_leader BOOLEAN DEFAULT FALSE;

-- 2. Add rename counter to teams table
ALTER TABLE teams ADD COLUMN IF NOT EXISTS rename_count INT DEFAULT 0;

-- 3. Reset and assign exactly one leader for each existing team in the database (attendees only)
UPDATE profiles SET is_team_leader = FALSE WHERE user_role = 'attendee';

WITH team_leaders AS (
  SELECT id, ROW_NUMBER() OVER (PARTITION BY team_id ORDER BY id) as rn
  FROM profiles
  WHERE team_id IS NOT NULL AND user_role = 'attendee'
)
UPDATE profiles
SET is_team_leader = TRUE
WHERE id IN (
  SELECT id FROM team_leaders WHERE rn = 1
);
