-- Migration to add Git & AI Code Audit columns to project_submissions
ALTER TABLE project_submissions
  ADD COLUMN IF NOT EXISTS git_audit_status TEXT DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS ai_percentage INT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS commit_count INT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS audit_anomalies TEXT[] DEFAULT '{}';
