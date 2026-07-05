// Google Apps Script for Starlet 5.0 Google Sheets Synchronization
// Google Sheet URL: https://docs.google.com/spreadsheets/d/1y9diyOSPAIgM6nAstAPS97nfUzduTCLgrJG12yw1dsA/edit
// To install: Open your Google Sheet -> Click Extensions -> Apps Script -> Paste this code -> Click Save -> Click Run.

const SUPABASE_URL = "https://pxgurlmrtoxlmlpiyqrj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4Z3VybG1ydG94bG1scGl5cXJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwMTQzMjcsImV4cCI6MjA5MjU5MDMyN30.hoo0QEO1zswZdqzRAlCkiYk_r-BuxEN2kP6VKo2wbuo";

// Adds a custom menu to the spreadsheet on load
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("✦ Starlet Sync")
    .addItem("Sync All Data from Supabase", "syncAllFromSupabase")
    .addToUi();
}

// Main synchronization function
function syncAllFromSupabase() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Create or retrieve tabs
  const submissionsSheet = getOrCreateSheet(ss, "Submissions");
  const attendanceSheet = getOrCreateSheet(ss, "Attendance");
  const teamsSheet = getOrCreateSheet(ss, "Teams & Members");
  
  // Set up API Headers
  const headers = {
    "apikey": SUPABASE_ANON_KEY,
    "Authorization": "Bearer " + SUPABASE_ANON_KEY,
    "Content-Type": "application/json"
  };
  const options = {
    "method": "get",
    "headers": headers,
    "muteHttpExceptions": true
  };
  
  // ==========================================
  // 1. SYNC SUBMISSIONS
  // ==========================================
  const subResponse = UrlFetchApp.fetch(SUPABASE_URL + "/rest/v1/project_submissions?select=*", options);
  if (subResponse.getResponseCode() === 200) {
    const submissions = JSON.parse(subResponse.getContentText());
    
    // Clear and set headers
    submissionsSheet.clear();
    submissionsSheet.appendRow([
      "Team Name", 
      "Project Name", 
      "Video & PPT Link (Google Drive)", 
      "GitHub Repository Link", 
      "AI Score (%)", 
      "Git Audit Status", 
      "Submission Time"
    ]);
    
    // Write data rows
    submissions.forEach(sub => {
      submissionsSheet.appendRow([
        sub.team_name,
        sub.project_name,
        sub.demo_url,
        sub.github_url,
        sub.ai_percentage !== null ? sub.ai_percentage + "%" : "—",
        sub.git_audit_status ? sub.git_audit_status.toUpperCase() : "PENDING",
        sub.submitted_at ? new Date(sub.submitted_at).toLocaleString() : "—"
      ]);
    });
    
    formatHeaderRow(submissionsSheet);
  }
  
  // ==========================================
  // 2. SYNC ATTENDANCE
  // ==========================================
  const attResponse = UrlFetchApp.fetch(SUPABASE_URL + "/rest/v1/profiles?user_role=eq.attendee&select=*", options);
  if (attResponse.getResponseCode() === 200) {
    const attendees = JSON.parse(attResponse.getContentText());
    
    // Clear and set headers
    attendanceSheet.clear();
    attendanceSheet.appendRow([
      "Attendee Name", 
      "Email Address", 
      "College / Institution", 
      "Allocated Venue", 
      "Attendance Status"
    ]);
    
    let presentCount = 0;
    attendees.forEach(att => {
      const isPresent = att.is_approved === true;
      if (isPresent) presentCount++;
      
      attendanceSheet.appendRow([
        att.full_name || "Anonymous",
        att.email,
        att.college || "—",
        att.venue || "Unassigned",
        isPresent ? "PRESENT ✅" : "ABSENT ❌"
      ]);
    });
    
    // Append a summary card at the bottom
    attendanceSheet.appendRow([]);
    attendanceSheet.appendRow(["Summary Stats:"]);
    attendanceSheet.appendRow(["Total Approved Attendees Present", presentCount]);
    attendanceSheet.appendRow(["Total Registered Attendees", attendees.length]);
    
    formatHeaderRow(attendanceSheet);
    
    // Bold summary metrics
    const lastRow = attendanceSheet.getLastRow();
    attendanceSheet.getRange(lastRow - 2, 1, 3, 2).setFontWeight("bold");
  }
  
  // ==========================================
  // 3. SYNC TEAMS & MEMBERS
  // ==========================================
  const teamsResponse = UrlFetchApp.fetch(SUPABASE_URL + "/rest/v1/profiles?user_role=eq.attendee&select=*", options);
  if (teamsResponse.getResponseCode() === 200) {
    const attendees = JSON.parse(teamsResponse.getContentText());
    
    // Group attendees by team_name
    const teamGroups = {};
    attendees.forEach(att => {
      const tName = att.team_name || "Solo Pool (No Team)";
      if (!teamGroups[tName]) teamGroups[tName] = [];
      teamGroups[tName].push(att);
    });
    
    // Clear and set headers
    teamsSheet.clear();
    teamsSheet.appendRow([
      "Team Name", 
      "Role / Position", 
      "Member Name", 
      "Email Address", 
      "Innovation Track"
    ]);
    
    Object.keys(teamGroups).sort().forEach(team => {
      const members = teamGroups[team];
      members.forEach(m => {
        let role = "Member";
        if (m.is_team_leader) role = "Team Leader 👑";
        if (team === "Solo Pool (No Team)") role = "Solo Hacker";
        
        teamsSheet.appendRow([
          team,
          role,
          m.full_name || "Anonymous",
          m.email,
          m.selected_track || "—"
        ]);
      });
      // Add empty spacing row between teams
      teamsSheet.appendRow([]);
    });
    
    formatHeaderRow(teamsSheet);
  }
  
  SpreadsheetApp.getUi().alert("✦ Starlet Sync Complete!\n\nAll spreadsheet pages have been updated with the latest live data from Supabase.");
}

// Helper to get or create sheet tabs
function getOrCreateSheet(ss, name) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  return sheet;
}

// Styling helper for header rows
function formatHeaderRow(sheet) {
  const range = sheet.getRange("A1:G1");
  range.setBackground("#001F3F"); // Navy
  range.setFontColor("#FFFFFF");  // White
  range.setFontWeight("bold");
  range.setHorizontalAlignment("center");
  sheet.autoResizeColumns(1, sheet.getLastColumn());
}
