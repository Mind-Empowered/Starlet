import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import { supabase } from './supabaseClient';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const sectionsData = [

  {
    id: 15,
    type: 'what-is-starlet',
    title: 'What is Starlet?',
    content: "Starlet is the ultimate innovation marathon for women where ideas meet execution and strangers become teammates. Whether you're a seasoned coder or just stepping into the world of tech, this event is built for everyone — solo innovators, dynamic duos, and full-fledged teams!",
    image: '/brand/Starlet.gif'
  },
  {
    id: 2,
    type: 'mission',
    title: "Our Mission",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/brand/Logo.png"
  },
  {
    id: 16,
    type: 'theme',
    title: "2025 Theme: Assistive Tech",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: '/icons/laptop.svg'
  },
  {
    id: 3,
    type: 'tracks',
    title: "Pick Your Track",
    content: "Choose a focus area within Assistive Tech: from Mobility Solutions and Visual/Auditory Aids to Neurodiversity Support and Inclusive Education. Your innovation can redefine independence.",
    image: "/brand/Logo.png"
  },
  {
    id: 4,
    type: 'timeline',
    title: "The Roadmap",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/brand/Logo.png"
  },
  {
    id: 5,
    type: 'hall-of-fame',
    title: "The Hall of Fame",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/icons/trophy.svg"
  },
  {
    id: 6,
    type: 'prizes',
    title: "Epic Prizes",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/icons/trophy.svg"
  },
  { id: 7, type: 'rules', title: "Rules of the Galaxy", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", image: "/icons/warning.svg" },
  { id: 8, type: 'mentors', title: "Meet Your Mentors", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", image: "/icons/user-profile.svg" },
  { id: 9, type: 'community', title: "Make New Friends", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", image: "/icons/users.svg" },
  { id: 10, type: 'sponsors', title: "Our Supporters", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", image: "/brand/Logo.png" },
  { id: 11, type: 'gallery', title: "The Gallery", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", image: "/brand/Logo.png" },
  { id: 12, type: 'faq', title: "Common Doubts", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", image: "/icons/warning.svg" },
  { id: 13, type: 'newsletter', title: "Stay Updated", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", image: "/icons/rocket.svg" },
  { id: 14, type: 'contact', title: "Get in Touch", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", image: "/icons/location.svg" }
];

const tracksData = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  title: `Problem Statement ${i + 1}`,
  summary: "A brief overview of the challenge and its importance in Assistive Technology.",
  details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
}));

const faqsData = [
  { id: 1, q: "Lorem ipsum dolor sit amet?", a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
  { id: 2, q: "Lorem ipsum dolor sit amet?", a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { id: 3, q: "Lorem ipsum dolor sit amet?", a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { id: 4, q: "Lorem ipsum dolor sit amet?", a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { id: 5, q: "Lorem ipsum dolor sit amet?", a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { id: 6, q: "Lorem ipsum dolor sit amet?", a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { id: 7, q: "Lorem ipsum dolor sit amet?", a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { id: 8, q: "Lorem ipsum dolor sit amet?", a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { id: 9, q: "Lorem ipsum dolor sit amet?", a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }
];

const mentorsData = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Mentor Lorem Ipsum ${i + 1}`,
  role: "Lead Lorem Expert",
  company: "Ipsum Global",
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  image: "/icons/user-profile.svg"
}));

const galleryCaptions = [
  "Late Night Coding", "Idea Storming", "Winning Moment", "Pizza Fuel", 
  "The Eureka Moment", "Team Bonding", "Pitch Practice", "Designing the Future",
  "Focus Mode", "Collaborative Spirit", "Debugging Life", "Coffee & Code",
  "Innovative Thinking", "Prototyping Fun", "The Presentation", "Celebrating Tech",
  "Hackathon Hustle", "Building Dreams", "Tech Talk", "Creative Solutions",
  "The Final Push", "Mentorship Magic", "Code & Creativity", "Future Leaders",
  "Hackathon Highs", "Problem Solving", "Digital Craftsmanship", "Inspiration Everywhere",
  "Starlet Vibes", "Empowered Innovators", "Breaking Barriers", "The Next Big Thing",
  "Coding Journey", "Tech Enthusiasts", "Sparking Ideas", "Minds in Action",
  "The Winner's Circle", "Collaboration Wins", "Learning & Growing", "Tech Community",
  "Starlet 5.0 Magic", "Unforgettable Moments"
];

function App() {

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState('landing'); // landing, login, signup, profile
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [faqLimit, setFaqLimit] = useState(3);
  const [visibleSections, setVisibleSections] = useState(new Set());

  const [user, setUser] = useState({
    name: '',
    email: '',
    role: 'attendee', // attendee, mentor, admin
    isApproved: false,
    team: null,
    venue: '',
    bio: '',
    stack: [],
    avatarUrl: '',
    socials: {
      github: '',
      linkedin: '',
      twitter: ''
    }
  });
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [showAboutPopup, setShowAboutPopup] = useState(false);

  const playClickSound = () => {
    if (!isSoundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.1);

      gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.1);
    } catch (e) { }
  };


  const [signupRole, setSignupRole] = useState('attendee');
  const [signupAvatar, setSignupAvatar] = useState(null);
  const [signupAvatarPreview, setSignupAvatarPreview] = useState(null);
  const [teamStatus, setTeamStatus] = useState('single');
  const [needsTeaming, setNeedsTeaming] = useState(false);
  const [activeAlert, setActiveAlert] = useState(null);
  const [systemIssues, setSystemIssues] = useState([]);
  const [settings, setSettings] = useState({
    registration_open: 'true',
    certificates_released: 'false',
    event_announcement: ''
  });
  const [auditLogs, setAuditLogs] = useState([]);
  const [venues, setVenues] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [problemStatements, setProblemStatements] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [mentorRequestModal, setMentorRequestModal] = useState(null);
  const [projectSubmissions, setProjectSubmissions] = useState([]);
  const [mySubmission, setMySubmission] = useState(null);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(null);

  const galleryRef = useRef(null);
  const requestRef = useRef();


  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => new Set([...prev, entry.target.id]));
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.section-block');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [activeView, loading]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);

    // Splash Screen Timer
    const fadeTimer = setTimeout(() => setFadeOut(true), 3000);
    const removeTimer = setTimeout(() => setShowSplash(false), 3800);

    const handleGlobalClick = (e) => {
      const target = e.target.closest('button, a, .join-btn, .login-btn, .nav-link, .logo-circle, .mentor-card, .faq-item');
      if (target) {
        playClickSound();
      }
    };

    window.addEventListener('click', handleGlobalClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleGlobalClick);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [isSoundEnabled]);

  useEffect(() => {
    // 1. Check for initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        setIsLoggedIn(true);
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (session) {
        setIsLoggedIn(true);
        fetchProfile(session.user.id);

        // If the event is PASSWORD_RECOVERY, switch to reset view
        if (event === 'PASSWORD_RECOVERY') {
          setActiveView('reset-password');
        }
      } else {
        setIsLoggedIn(false);
        setUser({ name: '', email: '', role: '', team: null, venue: '', bio: '', stack: [], socials: { github: '', linkedin: '', twitter: '' } });
      }
    });

    // 3. Fetch venues, problem statements, settings, and mentors
    fetchVenues();
    fetchProblemStatements();
    fetchSettings();
    fetchAllMentors();
    if (isLoggedIn && user.role === 'admin') fetchSubmissions();
    if (isLoggedIn && user.role === 'attendee') fetchMySubmission();

    // 4. Realtime listener for venues, settings, and mentors
    const venueChannel = supabase
      .channel('db-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'venues' }, () => {
        fetchVenues();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'event_settings' }, () => {
        fetchSettings();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'mentors' }, () => {
        fetchAllMentors();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'project_submissions' }, () => {
        if (isLoggedIn && user.role === 'admin') fetchSubmissions();
        if (isLoggedIn && user.role === 'attendee') fetchMySubmission();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
      supabase.removeChannel(venueChannel);
    };
  }, []);

  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (data) {
        setUser({
          name: data.full_name || '',
          email: data.email || '',
          role: data.user_role || 'attendee',
          role_title: data.role_title || '',
          isApproved: data.is_approved || false,
          venue: data.venue || '',
          bio: data.bio || '',
          stack: data.stack || [],
          avatarUrl: data.avatar_url || '',
          teamId: data.team_id || null,
          teamName: data.team_name || '',
          problemStatementId: data.problem_statement_id || null,
          socials: {
            github: data.github_url || '',
            linkedin: data.linkedin_url || '',
            twitter: data.twitter_url || ''
          }
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchVenues = async () => {
    const { data, error } = await supabase
      .from('venues')
      .select('*')
      .order('created_at', { ascending: true });
    if (data) setVenues(data);
  };

  const fetchProblemStatements = async () => {
    const { data } = await supabase.from('problem_statements').select('*').order('created_at');
    if (data) setProblemStatements(data);
  };

  const [mentorRequests, setMentorRequests] = useState([]);
  const [allMentors, setAllMentors] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    if (isLoggedIn && user.role === 'mentor') {
      fetchMentorRequests();
      // Realtime listener for new requests
      const channel = supabase
        .channel('schema-db-changes')
        .on('postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'mentor_requests', filter: `mentor_id=eq.${session.user.id}` },
          async (payload) => {
            // Fetch rich details for the alert
            const { data: richData } = await supabase
              .from('profiles')
              .select('full_name, avatar_url, team_name')
              .eq('id', payload.new.attendee_id)
              .single();

            setActiveAlert({
              ...payload.new,
              attendee: richData
            });
            setMentorRequests(prev => [payload.new, ...prev]);
          }
        )
        .subscribe();
      return () => supabase.removeChannel(channel);
    }
    if (isLoggedIn && user.role === 'admin') {
      fetchAllMentors();
      fetchAllUsers();
      fetchAuditLogs();
    }
  }, [isLoggedIn, user.role]);

  const fetchMentorRequests = async () => {
    const { data, error } = await supabase
      .from('mentor_requests')
      .select('*, profiles:attendee_id(full_name, email)')
      .eq('mentor_id', session.user.id)
      .order('created_at', { ascending: false });
    if (data) setMentorRequests(data);
  };

  const fetchAllMentors = async () => {
    const { data } = await supabase.from('mentors').select('*').eq('is_active', true);
    if (data) setMentors(data);
  };

  const fetchAllUsers = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('full_name');
    if (data) setAllUsers(data);

    const { data: issues } = await supabase
      .from('system_issues')
      .select('*, profiles(full_name)')
      .eq('status', 'open')
      .order('created_at', { ascending: false });
    if (issues) setSystemIssues(issues);
  };

  const fetchSettings = async () => {
    const { data } = await supabase.from('event_settings').select('*');
    if (data) {
      const settingsMap = {};
      data.forEach(s => settingsMap[s.id] = s.value);
      setSettings(settingsMap);
    }
  };

  const fetchAuditLogs = async () => {
    const { data } = await supabase
      .from('audit_logs')
      .select('*, profiles(full_name)')
      .order('created_at', { ascending: false })
      .limit(50);
    if (data) setAuditLogs(data);
  };

  const logAction = async (action, details = {}) => {
    await supabase.from('audit_logs').insert([{
      admin_id: session.user.id,
      action,
      details
    }]);
    fetchAuditLogs();
  };

  const updateSetting = async (key, value) => {
    const { error } = await supabase
      .from('event_settings')
      .update({ value: String(value) })
      .eq('id', key);
    
    if (!error) {
      logAction(`Updated Setting: ${key}`, { value });
      fetchSettings();
    }
  };

  const handleRequestMentor = async (mentorId) => {
    const { error } = await supabase
      .from('mentor_requests')
      .insert([
        { attendee_id: session.user.id, mentor_id: mentorId, message: 'Help needed with my project!' }
      ]);
    if (error) alert(error.message);
    else alert('Request sent to mentor!');
  };

  const handleApproveMentor = async (mentorId) => {
    // 1. Get the profile data first
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', mentorId).single();
    if (!profile) return;

    // 2. Check if already in mentors table to avoid duplicates
    const { data: existing } = await supabase.from('mentors').select('id').eq('profile_id', mentorId).single();
    
    if (!existing) {
      // 3. Promote to mentors table
      const { error: promoError } = await supabase.from('mentors').insert([{
        profile_id: mentorId,
        full_name: profile.full_name,
        role_title: profile.role_title || 'Expert',
        company: profile.company || 'Independent',
        bio: profile.bio || '',
        expertise: profile.stack || [],
        avatar_url: profile.avatar_url,
        is_active: true
      }]);
      if (promoError) {
        alert("Promotion failed: " + promoError.message);
        return;
      }
    }

    // 4. Mark as approved in profiles
    const { error } = await supabase
      .from('profiles')
      .update({ is_approved: true })
      .eq('id', mentorId);

    if (error) alert(error.message);
    else {
      alert('Mentor approved and added to the grid!');
      fetchAllMentors();
      fetchAllUsers(); // Refresh the directory
      logAction('Approved Mentor', { name: profile.full_name });
    }
  };

  const fetchSubmissions = async () => {
    const { data } = await supabase.from('project_submissions').select('*');
    if (data) setProjectSubmissions(data);
  };

  const fetchMySubmission = async () => {
    if (!session) return;
    const { data } = await supabase
      .from('project_submissions')
      .select('*')
      .or(`submitted_by.eq.${session.user.id},team_name.eq.${user.teamName}`)
      .single();
    if (data) setMySubmission(data);
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const files = e.target.photos.files;
    
    const uploadedUrls = [];
    for (let i = 0; i < files.length; i++) {
      const url = await handleFileUpload(files[i], 'projects');
      if (url) uploadedUrls.push(url);
    }

    const submissionData = {
      team_name: user.teamName || `Individual-${session.user.id}`,
      project_name: formData.get('projectName'),
      description: formData.get('description'),
      github_url: formData.get('github'),
      demo_url: formData.get('demo'),
      submitted_by: session.user.id,
      image_urls: uploadedUrls
    };

    const { error } = await supabase.from('project_submissions').insert([submissionData]);
    if (error) alert(error.message);
    else {
      alert('Project submitted successfully! Good luck!');
      fetchMySubmission();
    }
  };

  const handleRunAutoTeaming = async () => {
    try {
      // 1. Fetch all solo attendees who want teaming and don't have a team yet
      const { data: singles, error: fetchError } = await supabase
        .from('profiles')
        .select('id, full_name')
        .eq('user_role', 'attendee')
        .eq('team_status', 'single')
        .eq('needs_teaming', true)
        .is('team_name', null);

      if (fetchError) throw fetchError;
      if (!singles || singles.length < 2) {
        alert('Not enough single attendees to form new teams yet.');
        return;
      }

      // 2. Shuffle
      const shuffled = [...singles].sort(() => Math.random() - 0.5);

      // 3. Group into 4s
      const groupSize = 4;

      for (let i = 0; i < shuffled.length; i += groupSize) {
        const group = shuffled.slice(i, i + groupSize);
        if (group.length < 2) {
          // Add leftover to previous group logic would go here, 
          // for now we'll just form teams of 2-4
        }

        const squadNumber = Math.floor(Math.random() * 10000);
        const teamName = `Stellar Squad ${squadNumber}`;

        // Create the team in the teams table first
        const { data: newTeam, error: teamError } = await supabase
          .from('teams')
          .insert([{ name: teamName, bio: 'Automatically generated squad.' }])
          .select()
          .single();

        if (teamError) continue;

        // Update all members in this group
        for (const user of group) {
          await supabase
            .from('profiles')
            .update({
              team_id: newTeam.id,
              team_name: teamName,
              team_status: 'team',
              needs_teaming: false
            })
            .eq('id', user.id);
        }
      }

      alert('Success! Generated relational teams for all solo attendees.');
      fetchAllUsers();
    } catch (error) {
      alert(error.message);
    }
  };
  const handleAllocateCertificates = async () => {
    try {
      await updateSetting('certificates_released', 'true');
      alert('Certificates have been successfully released for all participants!');
    } catch (error) {
      alert('Failed to release certificates: ' + error.message);
    }
  };

  const handleSortVenues = async () => {
    try {
      setLoading(true);
      // 1. Fetch current data
      const { data: attendees } = await supabase.from('profiles').select('*').eq('user_role', 'attendee');
      const { data: currentVenues } = await supabase.from('venues').select('*');
      
      if (!attendees || !currentVenues || currentVenues.length === 0) {
        setLoading(false);
        return alert('Missing attendees or venue data to perform sorting.');
      }

      // 2. Initialize tracking
      const venueLimits = {};
      currentVenues.forEach(v => { 
        venueLimits[v.name] = { capacity: parseInt(v.capacity) || 0, count: 0 }; 
      });
      
      // 3. Group by Team
      const teams = {};
      attendees.forEach(a => {
        const tid = a.team_id || `solo-${a.id}`;
        if (!teams[tid]) teams[tid] = [];
        teams[tid].push(a);
      });

      // 4. Sort (Iterate teams)
      const updates = [];
      for (const tid in teams) {
        const members = teams[tid];
        const size = members.length;
        // Use the preference of the first member, or default to the first available venue
        const preference = members[0].preferred_venue || currentVenues[0].name;

        let assignedVenue = null;
        
        // Try preferred first
        if (venueLimits[preference] && (venueLimits[preference].count + size) <= venueLimits[preference].capacity) {
          assignedVenue = preference;
        } else {
          // Try any other venue with space
          assignedVenue = Object.keys(venueLimits).find(name => (venueLimits[name].count + size) <= venueLimits[name].capacity);
        }

        if (assignedVenue) {
          venueLimits[assignedVenue].count += size;
          members.forEach(m => updates.push({ id: m.id, venue: assignedVenue }));
        } else {
          members.forEach(m => updates.push({ id: m.id, venue: 'Waitlisted/Overflow' }));
        }
      }

      // 5. Update Database in chunks to avoid rate limits
      for (const update of updates) {
        await supabase.from('profiles').update({ venue: update.venue }).eq('id', update.id);
      }

      alert('Venue sorting complete! Capacities respected and teams kept together.');
      fetchAllUsers();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert('Error during sorting: ' + error.message);
    }
  };

  const handleManualVenueChange = async (userId, newVenue) => {
    const { error } = await supabase.from('profiles').update({ venue: newVenue }).eq('id', userId);
    if (error) alert(error.message);
    else fetchAllUsers();
  };

  const handleTeamVenueChange = async (teamName, newVenue) => {
    const teamMembers = allUsers.filter(u => u.team_name === teamName);
    for (const member of teamMembers) {
      await supabase.from('profiles').update({ venue: newVenue }).eq('id', member.id);
    }
    alert(`Team ${teamName} relocated to ${newVenue}`);
    fetchAllUsers();
  };

  const handleAddVenue = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const imageFiles = e.target.images.files;
    
    if (imageFiles.length < 4 || imageFiles.length > 6) {
      alert(`Please select between 4 and 6 images (you selected ${imageFiles.length})`);
      return;
    }

    setLoading(true);
    const uploadedUrls = [];
    try {
      for (let i = 0; i < imageFiles.length; i++) {
        const url = await handleFileUpload(imageFiles[i], 'venues');
        if (url) uploadedUrls.push(url);
      }

      const updates = {
        name: formData.get('name'),
        address: formData.get('address'),
        google_maps_url: formData.get('mapsUrl'),
        description: formData.get('description'),
        capacity: parseInt(formData.get('capacity')) || 0,
        image_urls: uploadedUrls,
        image_url: uploadedUrls[0] // Set first image as primary header
      };

      const { error } = await supabase.from('venues').insert([updates]);
      if (error) throw error;
      
      alert('Venue added successfully with ' + uploadedUrls.length + ' images!');
      e.target.reset();
      fetchVenues();
      logAction('Added Venue', { name: updates.name, images: uploadedUrls.length });
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVenue = async (venueId) => {
    if (!confirm('Are you sure you want to remove this venue?')) return;
    const { error } = await supabase.from('venues').delete().eq('id', venueId);
    if (error) alert(error.message);
    else fetchVenues();
  };

  const handleAddProblemStatement = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { error } = await supabase.from('problem_statements').insert([{
      title: formData.get('title'),
      description: formData.get('description'),
      track_category: formData.get('category')
    }]);
    if (error) alert(error.message);
    else {
      alert('Problem statement added!');
      fetchProblemStatements();
      e.target.reset();
    }
  };

  const handleDeleteProblemStatement = async (id) => {
    if (!confirm('Are you sure you want to remove this problem statement?')) return;
    const { error } = await supabase.from('problem_statements').delete().eq('id', id);
    if (error) alert(error.message);
    else fetchProblemStatements();
  };

  const handleAdminUpdateUserPS = async (userId, psId) => {
    const { error } = await supabase.from('profiles').update({ problem_statement_id: psId }).eq('id', userId);
    if (error) alert(error.message);
    else {
      alert('Attendee track updated!');
      fetchAllUsers();
    }
  };

  const handleAddMentor = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const photoFile = e.target.photo.files[0];
    
    let photoUrl = '';
    if (photoFile) {
      photoUrl = await handleFileUpload(photoFile, 'avatars');
    }

    const { error } = await supabase.from('mentors').insert([{
      full_name: formData.get('name'),
      role_title: formData.get('role'),
      company: formData.get('company'),
      bio: formData.get('bio'),
      expertise: formData.get('expertise').split(',').map(s => s.trim()),
      avatar_url: photoUrl
    }]);
    
    if (error) alert(error.message);
    else {
      alert('Mentor added to the grid!');
      logAction('Added Mentor', { name: formData.get('name') });
      fetchAllMentors();
      e.target.reset();
    }
  };

  const handleDeleteMentor = async (id, name) => {
    if (!confirm(`Are you sure you want to remove ${name}?`)) return;
    const { error } = await supabase.from('mentors').delete().eq('id', id);
    if (error) alert(error.message);
    else {
      logAction('Deleted Mentor', { name });
      fetchAllMentors();
    }
  };

  const handleSelectPS = async (psId) => {
    if (!psId) return;
    const { error } = await supabase.from('profiles').update({ problem_statement_id: psId }).eq('id', session.user.id);
    if (error) alert(error.message);
    else {
      alert('Selection locked! Contact admin to change.');
      fetchProfile(session.user.id);
    }
  };

  const handleLeaveTeam = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          team_id: null,
          team_name: null,
          team_status: 'single',
          needs_teaming: true
        })
        .eq('id', session.user.id);

      if (error) throw error;
      alert('You have left the team and are now back in the solo pool.');
      fetchProfile(session.user.id);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSelectTrack = async (trackTitle) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ selected_track: trackTitle })
        .eq('id', session.user.id);

      if (error) throw error;
      alert('Track selection saved!');
      fetchProfile(session.user.id);
      setSelectedTrack(null);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const fullName = formData.get('fullName');
    const roleTitle = formData.get('roleTitle') || '';
    const bio = formData.get('bio') || '';
    const techStack = formData.get('techStack') || '';
    const college = formData.get('college') || '';
    const teamName = formData.get('teamName') || '';

    try {
      if (signupRole === 'attendee') {
        const { data: isWhitelisted } = await supabase
          .from('registered_emails')
          .select('email')
          .eq('email', email)
          .single();
        
        if (!isWhitelisted) {
          alert('This email is not registered in our records. Please use the email you registered with on the Google Form.');
          return;
        }
      }

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } }
      });
      if (authError) throw authError;

      if (authData.user) {
        let avatarUrl = '';
        if (signupAvatar) {
          avatarUrl = await handleFileUpload(signupAvatar, 'avatars');
        }

        let finalTeamId = null;
        if (signupRole === 'attendee' && teamStatus === 'team' && teamName) {
          // Check if team exists, if not create it
          const { data: existingTeam } = await supabase
            .from('teams')
            .select('id')
            .eq('name', teamName)
            .single();

          if (existingTeam) {
            finalTeamId = existingTeam.id;
          } else {

            const { data: newTeam } = await supabase
              .from('teams')
              .insert([{ name: teamName }])
              .select()
              .single();
            if (newTeam) finalTeamId = newTeam.id;
          }
        }

        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id,
              full_name: fullName,
              email: email,
              user_role: signupRole,
              role_title: roleTitle,
              bio: bio,
              tech_stack: techStack,
              college: college,
              avatar_url: avatarUrl,
              team_id: finalTeamId,
              team_status: signupRole === 'attendee' ? teamStatus : null,
              needs_teaming: signupRole === 'attendee' ? needsTeaming : false,
              team_name: signupRole === 'attendee' ? teamName : null,
              is_approved: signupRole === 'attendee'
            }
          ]);
        if (profileError) throw profileError;
      }

      alert('Registration successful! Please check your email for verification.');
      setActiveView('login');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignupAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSignupAvatar(file);
      setSignupAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) alert(error.message);
    else setActiveView('landing');
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin
    });
    if (error) alert(error.message);
    else alert('Password reset link sent! Please check your email.');
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    const newPassword = e.target.newPassword.value;
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) alert(error.message);
    else {
      alert('Password updated successfully!');
      setActiveView('login');
    }
  };

  const handleReportIssue = async () => {
    const desc = prompt("Please describe the issue you are facing:");
    if (!desc) return;

    try {
      const { error } = await supabase
        .from('system_issues')
        .insert([{ user_id: session.user.id, description: desc }]);

      if (error) throw error;
      alert('Issue reported. Admin will look into it!');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleFileUpload = async (file, bucket) => {
    if (!file) return null;
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) {
      alert(`Upload failed: ${uploadError.message}`);
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleResolveIssue = async (issueId) => {
    const { error } = await supabase
      .from('system_issues')
      .update({ status: 'resolved' })
      .eq('id', issueId);
    if (error) alert(error.message);
    else {
      alert('Issue marked as resolved!');
      fetchAllUsers();
    }
  };

  const handleFindTeam = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          team_status: 'single',
          needs_teaming: true
        })
        .eq('id', session.user.id);

      if (error) throw error;
      alert('You have been added to the auto-teaming pool! Check back later for your squad assignment.');
      fetchProfile(session.user.id);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error logging out:', error.message);
    else {
      setIsLoggedIn(false);
      setActiveView('landing');
    }
  };

  const handleDownloadCertificate = async () => {
    const input = document.getElementById('certificate-render');
    if (!input) return;

    try {
      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#fffdf5'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Starlet5_Certificate_${user.name?.replace(/\s+/g, '_') || 'Participant'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate certificate. Please try again.');
    }
  };

  const updateProfile = async () => {
    if (!session?.user?.id) return alert('Not logged in.');
    try {
      const updates = {
        id: session.user.id,
        full_name: user.name,
        user_role: user.role,
        bio: user.bio,
        venue: user.venue,
        stack: user.stack,
        github_url: user.socials.github,
        linkedin_url: user.socials.linkedin,
        twitter_url: user.socials.twitter,
        role_title: user.role_title,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase.from('profiles').upsert(updates);
      if (error) throw error;
      alert('Profile updated successfully!');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !session?.user?.id) return;

    const fileExt = file.name.split('.').pop();
    const filePath = `avatars/${session.user.id}.${fileExt}`;

    // Show local preview immediately
    const localPreview = URL.createObjectURL(file);
    setUser(prev => ({ ...prev, avatarUrl: localPreview }));

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      alert('Upload failed: ' + uploadError.message);
      return;
    }

    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    const avatarUrl = urlData.publicUrl;

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ avatar_url: avatarUrl })
      .eq('id', session.user.id);

    if (updateError) alert('Could not save avatar: ' + updateError.message);
    else setUser(prev => ({ ...prev, avatarUrl }));
  };

  const handleAcceptRequest = async (requestId) => {
    const { error } = await supabase
      .from('mentor_requests')
      .update({ status: 'accepted' })
      .eq('id', requestId);
    if (error) alert(error.message);
    else {
      alert('Request accepted!');
      fetchMentorRequests();
    }
  };

  const handleDeclineRequest = async (requestId) => {
    const { error } = await supabase
      .from('mentor_requests')
      .update({ status: 'declined' })
      .eq('id', requestId);
    if (error) alert(error.message);
    else fetchMentorRequests();
  };

  useEffect(() => {
    const html = document.documentElement;
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
      html.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
      html.classList.remove('menu-open');
    }
    return () => {
      document.body.classList.remove('menu-open');
      html.classList.remove('menu-open');
    };
  }, [isMenuOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollGallery = (direction) => {
    if (galleryRef.current) {
      const scrollAmount = galleryRef.current.offsetWidth;
      galleryRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };


  if (loading) {
    return (
      <div className="splash-screen">
        <div className="splash-content">
          <div className="splash-logo-container">
            <img src="/brand/Logo.png" alt="Starlet" className="splash-logo" />
          </div>
          <div className="splash-text">INITIALIZING QUANTUM LINK...</div>
          <div className="splash-loading-container">
            <div className="splash-loading-bar" style={{ animationDuration: '1s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Mentor Detail Modal */}
      {selectedMentor && (
        <div className="modal-overlay" onClick={() => setSelectedMentor(null)}>
          <div className="mentor-modal" onClick={e => e.stopPropagation()}>
            <div className="close-modal" onClick={() => setSelectedMentor(null)}>
              <img src="/icons/close.svg" alt="close" />
            </div>
            <div className="mentor-modal-content">
              <div className="mentor-modal-photo">
                <img src={selectedMentor.image} alt="mentor" />
              </div>
              <div className="mentor-modal-info">
                <h2 className="text-3d">{selectedMentor.name}</h2>
                <div className="mentor-modal-tag">{selectedMentor.role} @ {selectedMentor.company}</div>
                <p>{selectedMentor.bio}</p>
                <div className="mentor-modal-footer">
                  <div className="join-btn" onClick={() => setSelectedMentor(null)}>GET IN TOUCH</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSplash && (
        <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
          <div className="splash-content">
            <div className="splash-logo-container">
              <img src="/brand/Logo.png" alt="Starlet Logo" className="splash-logo" />
              <div className="splash-stars">
                <span className="splash-star s1">✦</span>
                <span className="splash-star s2">✧</span>
                <span className="splash-star s3">✦</span>
              </div>
            </div>
            <h1 className="text-3d splash-title">STARLET 5.0</h1>
            <div className="splash-loading-container">
              <div className="splash-loading-bar"></div>
            </div>
            <p className="handwritten splash-text">Igniting your creativity...</p>
          </div>
          <div className="splash-footer handwritten">
            <img src="/brand/Mind Empowered.gif" alt="Mind Empowered" style={{ height: '30px', verticalAlign: 'middle', marginRight: '10px', borderRadius: '5px' }} />
            A Mind Empowered Initiative
          </div>
        </div>
      )}

      {/* Floating Sparkles */}
      <div className="sparkle s1">✦</div>
      <div className="sparkle s2">✧</div>
      <div className="sparkle s3">✦</div>

      <header className={activeView !== 'landing' ? 'header-minimal' : ''}>
        <div className="logo-circle" onClick={() => setActiveView('landing')} style={{ cursor: 'pointer' }}>
          <img src="/brand/Logo.png" alt="Starlet Logo" />
        </div>

        {activeView === 'landing' && (
          <>
            <nav className={`nav-links ${isMenuOpen ? 'mobile-active' : ''}`}>
              <a href="#mission" className="nav-link" onClick={() => setIsMenuOpen(false)}>Mission</a>
              <a href="#tracks" className="nav-link" onClick={() => setIsMenuOpen(false)}>Tracks</a>
              <a href="#timeline" className="nav-link" onClick={() => setIsMenuOpen(false)}>Timeline</a>
              <a href="#hall-of-fame" className="nav-link" onClick={() => setIsMenuOpen(false)}>Hall of Fame</a>
              <a href="#rules" className="nav-link" onClick={() => setIsMenuOpen(false)}>Rules</a>
              <a href="#sponsors" className="nav-link" onClick={() => setIsMenuOpen(false)}>Sponsors</a>

              <div className="mobile-auth-wrapper">
                {isLoggedIn ? (
                  <div className="mobile-profile-link" onClick={() => { setActiveView('profile'); setIsMenuOpen(false); }}>
                    <img src="/icons/user-profile.svg" alt="profile" />
                    <span>My Profile</span>
                  </div>
                ) : (
                  <div className="mobile-auth-btns">
                    <div className="login-btn" onClick={() => { setActiveView('login'); setIsMenuOpen(false); }}>LOGIN</div>
                    <div className="join-btn" onClick={() => { setActiveView('signup'); setIsMenuOpen(false); }}>SIGN UP!</div>
                  </div>
                )}
              </div>
            </nav>

            <div className="header-actions">
              <div className="desktop-auth-btns">
                {isLoggedIn ? (
                  <>
                    <img
                      src="/icons/location.svg"
                      className="nav-icon-btn"
                      alt="venue"
                      onClick={() => setActiveView('venue')}
                      title="Venue Details"
                    />
                    <img
                      src="/icons/user-profile.svg"
                      className="nav-icon-btn"
                      alt="profile"
                      onClick={() => setActiveView('profile')}
                      title="My Profile"
                    />
                  </>
                ) : (
                  <>
                    <div className="login-btn" onClick={() => setActiveView('login')}>LOGIN</div>
                    <div className="join-btn" onClick={() => setActiveView('signup')}>SIGN UP!</div>
                  </>
                )}
              </div>

              <div className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <img src={isMenuOpen ? "/icons/close.svg" : "/icons/hamburger.svg"} alt="menu" />
              </div>
            </div>
          </>
        )}
      </header>

      {activeView === 'landing' ? (
        <>
          <main>
            <section className="hero">
              <div className="badge-main">
                MIND EMPOWERED PRESENTS
              </div>
              <h1 className="text-3d">STARLET 5.0</h1>
              <div className="subtitle-large">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>

              <div className="hero-ctas">
                <button className="join-btn" onClick={() => setActiveView('signup')}>REGISTER NOW</button>
                <a href="#what-is-starlet" className="btn-secondary">LEARN MORE</a>
              </div>


            </section>

            <div className="content-wrapper">
              {sectionsData.map((section, index) => (
                <div
                  key={section.id}
                  id={section.type}
                  className={`section-block ${section.type}-section ${visibleSections.has(section.type) ? 'visible' : ''}`}
                >
                  {section.type === 'timeline' ? (
                    <div className="whiteboard-container">
                      <div className="wall-clock">
                        <div className="clock-center">
                          <div className="clock-hand hand-hour"></div>
                          <div className="clock-hand hand-min"></div>
                        </div>
                      </div>
                      <div className="magnetic-paper handwritten">
                        <div className="magnet"></div>
                        <strong>Note:</strong><br />
                        Don't forget your laptops! <img src="/icons/laptop.svg" className="inline-icon" alt="laptop" />
                      </div>
                      <h3 className="whiteboard-title handwritten">Starlet 5.0 Timeline</h3>
                      <div className="handwritten">
                        <div className="timeline-event">
                          <span className="timeline-date">May 15th</span>
                          <span className="timeline-desc">Lorem ipsum dolor sit amet, consectetur. <img src="/icons/rocket.svg" className="inline-icon" alt="rocket" /></span>
                        </div>
                        <div className="timeline-event">
                          <span className="timeline-date">June 1st</span>
                          <span className="timeline-desc">Lorem ipsum dolor sit amet, consectetur. <img src="/icons/users.svg" className="inline-icon" alt="users" /></span>
                        </div>
                        <div className="timeline-event">
                          <span className="timeline-date">June 10th</span>
                          <span className="timeline-desc">Lorem ipsum dolor sit amet, consectetur. <img src="/icons/calendar.svg" className="inline-icon" alt="calendar" /></span>
                        </div>
                        <div className="timeline-event">
                          <span className="timeline-date">June 15th</span>
                          <span className="timeline-desc">Lorem ipsum dolor sit amet, consectetur.</span>
                        </div>
                        <div className="timeline-event">
                          <span className="timeline-date">June 20th</span>
                          <span className="timeline-desc">Lorem ipsum dolor sit amet, consectetur. <img src="/icons/trophy.svg" className="inline-icon" alt="trophy" /></span>
                        </div>
                      </div>
                    </div>
                  ) : section.type === 'rules' ? (
                    <div className="section-content rules-hazard-box">
                      <div className="rules-hazard-inner">
                        <h2 className="text-3d warning-title" style={{ fontSize: '3rem' }}>
                          <img src="/icons/warning.svg" className="title-icon" alt="warning" /> RULES & REGS
                        </h2>
                        <div className="rules-grid">
                          <div className="warning-item" style={{ "--r": -1 }}>
                            <div className="warning-icon"><img src="/icons/warning.svg" className="card-icon" alt="warning" /></div>
                            <p><strong>LOREM IPSUM:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                          </div>
                          <div className="warning-item" style={{ "--r": 1.5 }}>
                            <div className="warning-icon"><img src="/icons/users.svg" className="card-icon" alt="users" /></div>
                            <p><strong>LOREM IPSUM:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                          </div>
                          <div className="warning-item" style={{ "--r": -0.8 }}>
                            <div className="warning-icon"><img src="/icons/calendar.svg" className="card-icon" alt="calendar" /></div>
                            <p><strong>LOREM IPSUM:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                          </div>
                          <div className="warning-item" style={{ "--r": 1.2 }}>
                            <div className="warning-icon"><img src="/icons/warning.svg" className="card-icon" alt="warning" /></div>
                            <p><strong>LOREM IPSUM:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : section.type === 'tracks' ? (
                    <div className="section-content">
                      <h2 className="text-3d" style={{ fontSize: '2.5rem' }}>{section.title}</h2>
                      <p style={{ marginBottom: '2rem', maxWidth: '800px' }}>{section.content}</p>
                      <div className="tracks-grid-interactive">
                        {problemStatements.length === 0 ? (
                          <div className="empty-state" style={{ gridColumn: '1 / -1', color: '#fff' }}>
                            <p>Innovation tracks are currently being finalized. Stay tuned!</p>
                          </div>
                        ) : (
                          problemStatements.map((track, i) => (
                            <div key={track.id} className="track-card-mini" onClick={() => setSelectedTrack({ ...track, index: i + 1 })}>
                              <div className="track-card-inner">
                                <span className="track-number">#{i + 1}</span>
                                <h3>{track.title}</h3>
                                <div className="view-details-tag">VIEW CHALLENGE →</div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  ) : section.type === 'sponsors' ? (
                    <div className="section-content">
                      <h2 className="text-3d" style={{ fontSize: '2.5rem' }}>{section.title}</h2>
                      <div className="sponsor-grid">
                        <div className="sponsor-card main-organizer clickable" onClick={() => setShowAboutPopup(true)}>
                          <span className="badge-main">MAIN ORGANIZER</span>
                          <img src="/brand/Mind Empowered.gif" alt="Mind Empowered" />
                          <h3 className="text-3d" style={{ fontSize: '1.2rem' }}>MIND EMPOWERED</h3>
                        </div>
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="sponsor-placeholder">
                            YOUR LOGO HERE
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : section.type === 'gallery' ? (
                    <div className="section-content">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <h2 className="text-3d" style={{ fontSize: '2.5rem', margin: 0 }}>{section.title}</h2>
                        <div className="gallery-nav-btns" style={{ display: 'flex', gap: '1rem' }}>
                          <button className="nav-btn-round" onClick={() => galleryRef.current.scrollBy({ left: -400, behavior: 'smooth' })}>←</button>
                          <button className="nav-btn-round" onClick={() => galleryRef.current.scrollBy({ left: 400, behavior: 'smooth' })}>→</button>
                        </div>
                      </div>
                      <div className="gallery-grid" ref={galleryRef} style={{ overflowX: 'auto', display: 'flex', scrollBehavior: 'smooth', padding: '1rem 0' }}>
                        {Array.from({ length: 42 }, (_, i) => {
                          const index = i + 1;
                          const path = index <= 9 ? `/gallery/${index}.JPG` : `/gallery/${index}.jpeg`;
                          const caption = galleryCaptions[i] || `Starlet Memory #${index}`;
                          return (
                            <div 
                              key={index} 
                              className="polaroid" 
                              style={{ 
                                "--r": `${(Math.sin(index) * 6).toFixed(1)}deg`,
                                flex: '0 0 auto',
                                cursor: 'zoom-in'
                              }}
                              onClick={() => setSelectedGalleryImage(i)}
                            >
                              <div className="polaroid-heart">💖</div>
                              <div className="polaroid-img" style={{ 
                                backgroundImage: `url('${path}')`, 
                                backgroundSize: 'cover', 
                                backgroundPosition: 'center',
                                height: '200px',
                                width: '100%'
                              }}></div>
                              <div className="polaroid-caption">{caption}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : section.type === 'hall-of-fame' ? (
                    <div className="section-content">
                      <h2 className="text-3d" style={{ fontSize: '2.5rem' }}>{section.title}</h2>
                      <div className="winner-grid">
                        <div className="winner-card">
                          <div className="winner-badge">GOLD WINNER</div>
                          <div className="winner-project-img"><span>Project Preview</span></div>
                          <span className="winner-year">STARLET 4.0</span>
                          <h3>Lorem Ipsum Project</h3>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                          <div className="view-project-btn">VIEW CASE STUDY →</div>
                        </div>
                        <div className="winner-card">
                          <div className="winner-badge">LOREM IPSUM</div>
                          <div className="winner-project-img"><span>Project Preview</span></div>
                          <span className="winner-year">STARLET 3.0</span>
                          <h3>Lorem Ipsum Project</h3>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                          <div className="view-project-btn">VIEW CASE STUDY →</div>
                        </div>
                        <div className="winner-card">
                          <div className="winner-badge">LOREM IPSUM</div>
                          <div className="winner-project-img"><span>Project Preview</span></div>
                          <span className="winner-year">STARLET 2.0</span>
                          <h3>Lorem Ipsum Project</h3>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                          <div className="view-project-btn">VIEW CASE STUDY →</div>
                        </div>
                      </div>
                    </div>
                  ) : section.type === 'prizes' ? (
                    <div className="section-content">
                      <h2 className="text-3d" style={{ fontSize: '2.5rem' }}>{section.title}</h2>
                      <div className="prize-grid">
                        <div className="prize-card">
                          <div className="prize-icon"><img src="/icons/trophy.svg" style={{ width: '80px' }} alt="trophy" /></div>
                          <h3 className="text-3d" style={{ fontSize: '1.5rem' }}>1st Place</h3>
                          <p>Lorem ipsum dolor sit amet</p>
                        </div>
                        <div className="prize-card">
                          <div className="prize-icon"><img src="/icons/trophy.svg" style={{ width: '70px', opacity: 0.7 }} alt="trophy" /></div>
                          <h3 className="text-3d" style={{ fontSize: '1.5rem' }}>2nd Place</h3>
                          <p>Lorem ipsum dolor sit amet</p>
                        </div>
                        <div className="prize-card">
                          <div className="prize-icon"><img src="/icons/trophy.svg" style={{ width: '60px', opacity: 0.5 }} alt="trophy" /></div>
                          <h3 className="text-3d" style={{ fontSize: '1.5rem' }}>3rd Place</h3>
                          <p>Lorem ipsum dolor sit amet</p>
                        </div>
                      </div>
                    </div>
                  ) : section.type === 'faq' ? (
                    <div className="section-content">
                      <h2 className="text-3d" style={{ fontSize: '2.5rem' }}>{section.title}</h2>
                      <div className="faq-grid">
                        {faqsData.slice(0, faqLimit).map(faq => (
                          <div key={faq.id} className="faq-item">
                            <div className="faq-question">{faq.q}</div>
                            <div className="faq-answer">{faq.a}</div>
                          </div>
                        ))}
                      </div>
                      {faqLimit < faqsData.length && (
                        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                          <button className="join-btn" onClick={() => setFaqLimit(prev => prev + 3)}>
                            SHOW MORE DOUBTS
                          </button>
                        </div>
                      )}
                    </div>
                  ) : section.type === 'contact' ? (
                    <div className="section-content">
                      <h2 className="text-3d" style={{ fontSize: '2.5rem' }}>{section.title}</h2>
                      <div className="contact-container">
                        <div className="contact-form">
                          <input type="text" placeholder="Your Name" />
                          <input type="email" placeholder="Your Email" />
                          <textarea placeholder="How can we help?"></textarea>
                          <button className="join-btn" style={{ width: 'fit-content' }}>SEND MESSAGE</button>
                        </div>

                        <div className="contact-socials">
                          <h3 className="handwritten social-title">Follow our journey!</h3>
                          <p>Join our community of 5,000+ creators on social media.</p>
                          <div className="social-grid">
                            <a href="#" className="social-item instagram">
                              <img src="/icons/instagram.svg" alt="Instagram" />
                              <span>Instagram</span>
                            </a>
                            <a href="#" className="social-item discord">
                              <img src="/icons/discord.svg" alt="Discord" />
                              <span>Discord</span>
                            </a>
                            <a href="#" className="social-item linkedin">
                              <img src="/icons/linkedin.svg" alt="LinkedIn" />
                              <span>LinkedIn</span>
                            </a>
                            <a href="#" className="social-item twitter">
                              <img src="/icons/twitter.svg" alt="Twitter" />
                              <span>Twitter / X</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : section.type === 'newsletter' ? (
                    <div className="section-content" style={{ textAlign: 'center' }}>
                      <h2 className="text-3d" style={{ fontSize: '2.5rem' }}>{section.title}</h2>
                      <p style={{ color: '#fff' }}>{section.content}</p>
                      <div className="newsletter-input-group">
                        <input type="email" placeholder="Enter your email" />
                        <button className="btn">SUBSCRIBE</button>
                      </div>
                    </div>
                  ) : section.type === 'mentors' ? (
                    <div className="section-content">
                      <h2 className="text-3d" style={{ fontSize: '2.5rem' }}>{section.title}</h2>
                      <div className="mentor-grid">
                        {mentors.length === 0 ? (
                          <p style={{ color: '#fff', textAlign: 'center', gridColumn: '1 / -1' }}>Mentors are being onboarded. Check back soon!</p>
                        ) : (
                          mentors.map(mentor => (
                            <div key={mentor.id} className="mentor-card" onClick={() => setSelectedMentor(mentor)}>
                              <div className="mentor-photo-wrapper">
                                <img src={mentor.avatar_url || "/icons/user-profile.svg"} alt="mentor" />
                                <div className="mentor-hover-hint">VIEW PROFILE →</div>
                              </div>
                              <h3>{mentor.full_name}</h3>
                              <p className="mentor-role">{mentor.role_title}</p>
                              <p className="mentor-company">{mentor.company}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="section-content">
                      <h2 className="text-3d" style={{ fontSize: '2.5rem' }}>{section.title}</h2>
                      <div className="section-inner">
                        <p>{section.content}</p>
                        <div className="section-visual-small">
                          <img src={section.image} alt={section.title} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </main>

          <footer>
            <div className="footer-minimal">
              <div className="footer-brand-mini">
                <img src="/brand/Logo.png" alt="Starlet" />
                <span className="text-3d">STARLET 5.0</span>
              </div>

              <div className="footer-links-mini">
                <a href="#mission">Mission</a>
                <a href="#tracks">Tracks</a>
                <a href="#timeline">Timeline</a>
                <a href="#faq">FAQ</a>
                <a href="#">Privacy Policy</a>
              </div>

              <div className="footer-copy-mini">
                &copy; 2026 Starlet 5.0 | A <img src="/brand/Mind Empowered.gif" alt="Mind Empowered" style={{ height: '20px', verticalAlign: 'middle', margin: '0 5px', borderRadius: '3px' }} /> Mind Empowered Initiative
              </div>
            </div>
          </footer>
        </>
      ) : activeView === 'login' || activeView === 'signup' ? (
        <div className="auth-container">
          <div className="auth-card" style={{ maxWidth: activeView === 'signup' ? '800px' : '500px' }}>
            <h2 className="text-3d">{activeView === 'login' ? 'Welcome Back!' : 'Join Starlet!'}</h2>
            <form className="auth-form" onSubmit={activeView === 'login' ? handleLogin : handleSignUp}>
              {activeView === 'signup' && (
                <div className="signup-grid">
                  <div className="signup-photo-col">
                    <div className="signup-avatar-preview">
                      <img src={signupAvatarPreview || '/icons/user-profile.svg'} alt="preview" />
                      <label className="photo-upload-btn">
                        ADD PHOTO
                        <input type="file" hidden accept="image/*" onChange={handleSignupAvatarChange} />
                      </label>
                    </div>
                    <select
                      name="userRole"
                      className="auth-select"
                      value={signupRole}
                      onChange={(e) => setSignupRole(e.target.value)}
                    >
                      <option value="attendee">I am an Attendee</option>
                      <option value="mentor">I am a Mentor</option>
                    </select>
                  </div>

                  <div className="signup-fields-col">
                    <input name="fullName" type="text" placeholder="Full Name" required />
                    <input name="email" type="email" placeholder="Email Address" required />
                    <input name="password" type="password" placeholder="Password" required />

                    {signupRole === 'mentor' ? (
                      <>
                        <input name="roleTitle" type="text" placeholder="Professional Title (e.g. Senior Architect)" required />
                        <input name="techStack" type="text" placeholder="Tech Stack (e.g. React, Python, AWS)" required />
                      </>
                    ) : (
                      <>
                        <input name="college" type="text" placeholder="College or Organization Name" required />

                        <div className="teaming-options">
                          <label className="teaming-label">Participation Type:</label>
                          <div className="teaming-radios">
                            <label>
                              <input
                                type="radio"
                                name="teamStatus"
                                value="single"
                                checked={teamStatus === 'single'}
                                onChange={() => setTeamStatus('single')}
                              /> Solo
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="teamStatus"
                                value="team"
                                checked={teamStatus === 'team'}
                                onChange={() => setTeamStatus('team')}
                              /> Existing Team
                            </label>
                          </div>

                          {teamStatus === 'single' ? (
                            <label className="teaming-checkbox">
                              <input
                                type="checkbox"
                                checked={needsTeaming}
                                onChange={(e) => setNeedsTeaming(e.target.checked)}
                              /> Want us to find a team for you?
                            </label>
                          ) : (
                            <input name="teamName" type="text" placeholder="Enter your Team Name" required />
                          )}
                        </div>
                      </>
                    )}

                    <textarea name="bio" placeholder={signupRole === 'mentor' ? "Tell us about your mentoring experience..." : "Tell us about yourself and what you want to build..."} required></textarea>
                  </div>
                </div>
              )}

              {activeView === 'login' && (
                <>
                  <input name="email" type="email" placeholder="Email Address" required />
                  <input name="password" type="password" placeholder="Password" required />
                  <div
                    style={{ textAlign: 'right', fontSize: '0.8rem', cursor: 'pointer', color: 'var(--pink-primary)', fontWeight: 'bold', marginTop: '-0.5rem' }}
                    onClick={() => setActiveView('forgot-password')}
                  >
                    Forgot Password?
                  </div>
                </>
              )}

              <button type="submit" className="join-btn" style={{ marginTop: '2rem', width: '100%' }}>
                {activeView === 'login' ? 'LOGIN TO CONSOLE' : 'INITIALIZE REGISTRATION'}
              </button>
            </form>
            <p className="auth-toggle-text">
              {activeView === 'login' ? "Don't have an account? " : "Already have an account? "}
              <span onClick={() => setActiveView(activeView === 'login' ? 'signup' : 'login')}>
                {activeView === 'login' ? 'Sign up here' : 'Login here'}
              </span>
            </p>
            <div className="admin-back-link" onClick={() => setActiveView('landing')} style={{ marginTop: '1.5rem' }}>← Back to Home</div>
          </div>
        </div>
      ) : activeView === 'forgot-password' ? (
        <div className="auth-container">
          <div className="auth-card">
            <h2 className="text-3d">Recover Account</h2>
            <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>Enter your email and we will send you a secure link to reset your password.</p>
            <form className="auth-form" onSubmit={handleForgotPassword}>
              <input name="email" type="email" placeholder="Email Address" required />
              <button type="submit" className="join-btn" style={{ marginTop: '2rem', width: '100%' }}>
                SEND RECOVERY LINK
              </button>
            </form>
            <div className="admin-back-link" onClick={() => setActiveView('login')} style={{ marginTop: '1.5rem' }}>← Back to Login</div>
          </div>
        </div>
      ) : activeView === 'reset-password' ? (
        <div className="auth-container">
          <div className="auth-card">
            <h2 className="text-3d">Reset Password</h2>
            <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>Security First! Please enter your new, strong password below.</p>
            <form className="auth-form" onSubmit={handleUpdatePassword}>
              <input name="newPassword" type="password" placeholder="Enter New Password" required />
              <button type="submit" className="join-btn" style={{ marginTop: '2rem', width: '100%' }}>
                UPDATE PASSWORD
              </button>
            </form>
          </div>
        </div>
      ) : activeView === 'profile' ? (
        <div className={user.role === 'admin' ? "admin-page-wrapper" : "profile-container"}>
          {user.role === 'admin' ? (
            /* ADMIN PROFILE VIEW */
            <div className="admin-dashboard-full">
              <div className="admin-header-row">
                <div>
                  <h1 className="text-3d" style={{ fontSize: '3.5rem' }}>Admin Command Center</h1>
                  <p className="handwritten" style={{ fontSize: '1.2rem' }}>Master control for the Starlet 5.0 galaxy!</p>
                </div>
                <div className="admin-quick-actions">
                  <button className="logout-btn" onClick={handleLogout}>LOGOUT ADMIN</button>
                  <div className="admin-back-link" onClick={() => setActiveView('landing')}>← Back to Home</div>
                </div>
              </div>

              <div className="admin-stats-strip">
                <div className="admin-stat-card">
                  <div className="stat-icon"><img src="/icons/users.svg" alt="users" /></div>
                  <div className="stat-info">
                    <strong>{allUsers.length}</strong>
                    <span>Total Users</span>
                  </div>
                </div>
                <div className="admin-stat-card">
                  <div className="stat-icon"><img src="/icons/trophy.svg" alt="verified" /></div>
                  <div className="stat-info">
                    <strong>{allMentors.filter(m => m.is_approved).length}</strong>
                    <span>Verified Mentors</span>
                  </div>
                </div>
                <div className="admin-stat-card warning">
                  <div className="stat-icon"><img src="/icons/calendar.svg" alt="pending" /></div>
                  <div className="stat-info">
                    <strong>{allMentors.filter(m => !m.is_approved).length}</strong>
                    <span>Pending Approval</span>
                  </div>
                </div>
                <div className="admin-stat-card blue">
                  <div className="stat-icon"><img src="/icons/warning.svg" alt="requests" /></div>
                  <div className="stat-info">
                    <strong>{mentorRequests.length}</strong>
                    <span>Active Requests</span>
                  </div>
                </div>
              </div>

              <div className="admin-actions-bar" style={{ marginBottom: '3rem' }}>
                <button className="join-btn" onClick={() => { handleRunAutoTeaming(); logAction('Ran Auto-Teaming Algorithm'); }}>
                  RUN AUTO-TEAMING ALGORITHM
                </button>
                <button 
                  className="join-btn" 
                  style={{ background: settings.certificates_released === 'true' ? '#4caf50' : 'var(--pink-primary)' }}
                  onClick={handleAllocateCertificates}
                >
                  {settings.certificates_released === 'true' ? 'CERTIFICATES ALLOCATED ✓' : 'ALLOCATE CERTIFICATES'}
                </button>
              </div>

              {/* EVENT CONFIGURATION */}
              <div className="admin-panel" style={{ marginBottom: '4rem' }}>
                <h2 className="text-3d" style={{ fontSize: '2rem', marginBottom: '2rem' }}>Global Configuration</h2>
                <div className="admin-two-col-grid">
                  <div className="admin-card">
                    <h3>Event Toggles</h3>
                    <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Public Registration</span>
                        <button 
                          className={`btn-small ${settings.registration_open === 'true' ? 'accept' : 'decline'}`}
                          onClick={() => updateSetting('registration_open', settings.registration_open === 'true' ? 'false' : 'true')}
                        >
                          {settings.registration_open === 'true' ? 'OPEN' : 'CLOSED'}
                        </button>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Certificate Claiming</span>
                        <button 
                          className={`btn-small ${settings.certificates_released === 'true' ? 'accept' : 'decline'}`}
                          onClick={() => updateSetting('certificates_released', settings.certificates_released === 'true' ? 'false' : 'true')}
                        >
                          {settings.certificates_released === 'true' ? 'ENABLED' : 'DISABLED'}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="admin-card">
                    <h3>Live Announcement</h3>
                    <div style={{ marginTop: '1rem' }}>
                      <textarea 
                        style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #ddd' }}
                        value={settings.event_announcement || ''}
                        onChange={(e) => setSettings({ ...settings, event_announcement: e.target.value })}
                        placeholder="Type a message for the landing page banner..."
                      />
                      <button 
                        className="join-btn" 
                        style={{ width: '100%', marginTop: '1rem' }}
                        onClick={() => updateSetting('event_announcement', settings.event_announcement)}
                      >
                        UPDATE LIVE BANNER
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* VENUE MANAGEMENT SECTION */}
              <div className="admin-panel" style={{ marginBottom: '4rem' }}>
                <h2 className="text-3d" style={{ fontSize: '2rem', marginBottom: '2rem' }}>Venue Management</h2>
                <div className="admin-two-col-grid">
                  <div className="admin-card">
                    <h3>Add New Venue</h3>
                    <form className="auth-form" onSubmit={handleAddVenue} style={{ marginTop: '1rem' }}>
                      <input name="name" type="text" placeholder="Venue Name" required />
                      <input name="address" type="text" placeholder="Full Address" required />
                      <input name="mapsUrl" type="url" placeholder="Google Maps URL" required />
                      <input name="capacity" type="number" placeholder="Max Capacity (e.g. 60)" required />
                      <textarea name="description" placeholder="Description / Accessibility Details" required></textarea>
                      <div className="input-group">
                        <label>Venue Gallery (Upload 4-6 Photos)</label>
                        <input name="images" type="file" accept="image/*" multiple required />
                      </div>
                      <button type="submit" className="join-btn" style={{ width: '100%' }}>ADD VENUE</button>
                    </form>
                  </div>
                  <div className="admin-card">
                    <h3>Current Venues & Capacity</h3>
                    <div className="admin-issues-list" style={{ marginTop: '1rem' }}>
                      {venues.length === 0 ? (
                        <p>No venues added yet.</p>
                      ) : (
                        venues.map(v => (
                          <div key={v.id} className="approval-card" style={{ marginBottom: '1rem' }}>
                            <div className="user-meta">
                              <strong>{v.name}</strong>
                              <p style={{ fontSize: '0.8rem' }}>Capacity: {v.capacity} | {v.address}</p>
                            </div>
                            <button className="btn-small delete" onClick={() => handleDeleteVenue(v.id)}>
                              REMOVE
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                    {venues.length > 0 && (
                      <button 
                        className="join-btn" 
                        style={{ width: '100%', marginTop: '2rem', background: 'var(--blue-shadow)' }}
                        onClick={handleSortVenues}
                      >
                        RUN VENUE SORTING ALGORITHM
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="admin-teams-section" style={{ marginBottom: '4rem' }}>
                <h2 className="text-3d" style={{ fontSize: '2rem', marginBottom: '2rem' }}>Active Squads</h2>
                <div className="teams-grid">
                  {Object.entries(
                    allUsers.reduce((acc, user) => {
                      if (user.team_name) {
                        if (!acc[user.team_name]) acc[user.team_name] = [];
                        acc[user.team_name].push(user);
                      }
                      return acc;
                    }, {})
                  ).map(([teamName, members]) => (
                    <div key={teamName} className="admin-team-card">
                      <div className="team-header">
                        <h3>{teamName}</h3>
                        <span className="member-count">{members.length} Members</span>
                      </div>
                      <div className="team-track">
                        <strong>Track:</strong> {members[0].selected_track || 'Not Selected Yet'}
                      </div>
                      <div className="team-venue-override" style={{ marginTop: '0.5rem', borderTop: '1px solid #eee', paddingTop: '0.5rem' }}>
                        <select 
                          className="admin-select-small"
                          value={members[0].venue || ''}
                          onChange={(e) => handleTeamVenueChange(teamName, e.target.value)}
                        >
                          <option value="">No Venue Assigned</option>
                          {venues.map(v => (
                            <option key={v.id} value={v.name}>{v.name}</option>
                          ))}
                          <option value="Waitlisted/Overflow">Waitlisted/Overflow</option>
                        </select>
                      </div>
                      <div className="team-members-list">
                        {members.map(m => (
                          <div key={m.id} className="team-member-item">
                            <span>{m.full_name}</span>
                            <small>{m.email}</small>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* EMAIL WHITELIST MANAGEMENT */}
              <div className="admin-panel" style={{ marginBottom: '4rem' }}>
                <h2 className="text-3d" style={{ fontSize: '2rem', marginBottom: '2rem' }}>Registration Whitelist</h2>
                <div className="admin-two-col-grid">
                  <div className="admin-card">
                    <h3>Add Registered Email</h3>
                    <form className="auth-form" style={{ marginTop: '1rem' }} onSubmit={async (e) => {
                      e.preventDefault();
                      const email = e.target.email.value;
                      const { error } = await supabase.from('registered_emails').insert([{ email }]);
                      if (error) alert(error.message);
                      else {
                        alert('Email whitelisted!');
                        e.target.reset();
                      }
                    }}>
                      <input name="email" type="email" placeholder="attendee@example.com" required />
                      <button type="submit" className="join-btn" style={{ width: '100%' }}>WHITELIST EMAIL</button>
                    </form>
                  </div>
                  <div className="admin-card">
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      Only emails in this whitelist will be allowed to sign up as <strong>Attendees</strong>. 
                      This ensures that only people who filled out the Google Form can access the platform.
                    </p>
                  </div>
                </div>
              </div>

              {/* AUDIT LOGS */}
              <div className="admin-panel" style={{ marginBottom: '4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <h2 className="text-3d" style={{ fontSize: '2rem', margin: 0 }}>Security Audit Logs</h2>
                  <button className="btn-small" onClick={fetchAuditLogs}>REFRESH LOGS</button>
                </div>
                <div className="user-table-wrapper" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Timestamp</th>
                        <th>Admin</th>
                        <th>Action</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {auditLogs.length === 0 ? (
                        <tr><td colSpan="4" style={{ textAlign: 'center' }}>No logs recorded yet.</td></tr>
                      ) : (
                        auditLogs.map(log => (
                          <tr key={log.id}>
                            <td><small>{new Date(log.created_at).toLocaleString()}</small></td>
                            <td><strong>{log.profiles?.full_name}</strong></td>
                            <td><span className="role-badge" style={{ background: '#eee', color: '#333' }}>{log.action}</span></td>
                            <td><code style={{ fontSize: '0.7rem' }}>{JSON.stringify(log.details)}</code></td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* PROBLEM STATEMENT MANAGEMENT */}
              <div className="admin-panel" style={{ marginBottom: '4rem' }}>
                <h2 className="text-3d" style={{ fontSize: '2rem', marginBottom: '2rem' }}>Problem Statement Library</h2>
                <div className="admin-two-col-grid">
                  <div className="admin-card">
                    <h3>Current Statements</h3>
                    <div className="admin-issues-list" style={{ marginTop: '1rem' }}>
                      {problemStatements.length === 0 ? (
                        <p>Library is empty.</p>
                      ) : (
                        problemStatements.map(ps => (
                          <div key={ps.id} className="approval-card" style={{ marginBottom: '1rem' }}>
                            <div className="user-meta">
                              <strong>{ps.title}</strong>
                              <small style={{ display: 'block', color: 'var(--blue-shadow)' }}>{ps.track_category}</small>
                              <p style={{ fontSize: '0.8rem', marginTop: '0.3rem' }}>{ps.description}</p>
                            </div>
                            <button className="btn-small delete" onClick={() => handleDeleteProblemStatement(ps.id)}>REMOVE</button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                  <div className="admin-card">
                    <h3>Add New Statement</h3>
                    <form className="auth-form" onSubmit={handleAddProblemStatement} style={{ marginTop: '1rem' }}>
                      <input name="title" type="text" placeholder="Statement Title" required />
                      <input name="category" type="text" placeholder="Track Category (e.g. AI, Health)" required />
                      <textarea name="description" placeholder="Short description of the challenge..." required></textarea>
                      <button type="submit" className="join-btn" style={{ width: '100%' }}>ADD TO LIBRARY</button>
                    </form>
                  </div>
                </div>
              </div>

              {/* MENTOR MANAGEMENT */}
              <div className="admin-panel" style={{ marginBottom: '4rem' }}>
                <h2 className="text-3d" style={{ fontSize: '2rem', marginBottom: '2rem' }}>Mentor Management</h2>
                <div className="admin-two-col-grid">
                  <div className="admin-card">
                    <h3>Active Mentors</h3>
                    <div className="admin-issues-list" style={{ marginTop: '1rem' }}>
                      {mentors.length === 0 ? (
                        <p>No mentors in the library.</p>
                      ) : (
                        mentors.map(m => (
                          <div key={m.id} className="approval-card" style={{ marginBottom: '1rem' }}>
                            <div className="user-meta">
                              <strong>{m.full_name}</strong>
                              <small style={{ display: 'block', color: 'var(--blue-shadow)' }}>{m.role_title} @ {m.company}</small>
                            </div>
                            <button className="btn-small delete" onClick={() => handleDeleteMentor(m.id, m.full_name)}>REMOVE</button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                  <div className="admin-card">
                    <h3>Add New Mentor</h3>
                    <form className="auth-form" onSubmit={handleAddMentor} style={{ marginTop: '1rem' }}>
                      <input name="name" type="text" placeholder="Full Name" required />
                      <input name="role" type="text" placeholder="Title (e.g. UX Designer)" required />
                      <input name="company" type="text" placeholder="Company" required />
                      <input name="expertise" type="text" placeholder="Expertise (comma separated: React, AI)" required />
                      <textarea name="bio" placeholder="Brief bio..." required></textarea>
                      <div className="input-group">
                        <label>Mentor Photo</label>
                        <input name="photo" type="file" accept="image/*" required />
                      </div>
                      <button type="submit" className="join-btn" style={{ width: '100%' }}>ADD MENTOR</button>
                    </form>
                  </div>
                </div>
              </div>

              <div className="admin-main-grid">
                <div className="admin-panel mentor-queue">
                  <h2 className="text-3d" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>System Reports</h2>
                  <div className="admin-issues-list">
                    {systemIssues.length === 0 ? (
                      <p>No active issues reported.</p>
                    ) : (
                      systemIssues.map(issue => (
                        <div key={issue.id} className="approval-card">
                          <div className="user-meta">
                            <strong>{issue.profiles?.full_name || 'Anonymous'}</strong>
                            <p>{issue.description}</p>
                            <small>{new Date(issue.created_at).toLocaleString()}</small>
                          </div>
                          <button className="btn-small accept" onClick={() => handleResolveIssue(issue.id)}>
                            RESOLVE
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="admin-panel mentor-queue">
                  <h2 className="text-3d" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Mentor Approval Queue</h2>
                  <div className="approval-list">
                    {allMentors.filter(m => !m.is_approved).map(mentor => (
                      <div key={mentor.id} className="approval-card">
                        <div className="user-meta">
                          <strong>{mentor.full_name}</strong>
                          <span>{mentor.email}</span>
                          <div className="role-tag">{mentor.role_title || 'Expert'}</div>
                        </div>
                        <button className="join-btn btn-approve" onClick={() => handleApproveMentor(mentor.id)}>APPROVE MENTOR</button>
                      </div>
                    ))}
                    {allMentors.filter(m => !m.is_approved).length === 0 && (
                      <div className="empty-state">
                        <p>All clear! No pending mentors.</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="admin-panel user-directory">
                  <h2 className="text-3d" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Global User Directory</h2>
                  <div className="user-table-wrapper">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>User</th>
                          <th>Role</th>
                          <th>Status</th>
                          <th>Venue</th>
                          <th>Selected Track</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allUsers.map(u => (
                          <tr key={u.id}>
                            <td>
                              <div className="table-user">
                                <strong>{u.full_name}</strong>
                                <span>{u.email}</span>
                              </div>
                            </td>
                            <td><span className="role-badge">{u.user_role}</span></td>
                            <td>
                              <span className={`status-dot ${u.is_approved ? 'active' : 'idle'}`}></span>
                              {u.is_approved ? 'Verified' : (u.user_role === 'attendee' ? 'Active' : 'Pending')}
                            </td>
                            <td>
                              <div className="table-venue-select">
                                <select 
                                  className="admin-select-small"
                                  value={u.venue || ''}
                                  onChange={(e) => handleManualVenueChange(u.id, e.target.value)}
                                >
                                  <option value="">Unassigned</option>
                                  {venues.map(v => (
                                    <option key={v.id} value={v.name}>{v.name}</option>
                                  ))}
                                  <option value="Waitlisted/Overflow">Waitlisted</option>
                                </select>
                              </div>
                            </td>
                            <td>
                              <div className="table-venue-select">
                                <select 
                                  className="admin-select-small"
                                  value={u.problem_statement_id || ''}
                                  onChange={(e) => handleAdminUpdateUserPS(u.id, e.target.value)}
                                >
                                  <option value="">No Selection</option>
                                  {problemStatements.map(ps => (
                                    <option key={ps.id} value={ps.id}>{ps.title}</option>
                                  ))}
                                </select>
                              </div>
                            </td>
                            <td>
                              <div className="table-actions">
                                <button className="btn-table-action" title="View details">DETAILS</button>
                                <button className="btn-table-action delete" title="Delete user">REMOVE</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* PROJECT SUBMISSIONS OVERVIEW */}
                <div className="admin-panel" style={{ marginBottom: '4rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 className="text-3d" style={{ fontSize: '2rem', margin: 0 }}>Project Submissions</h2>
                    <div className="admin-stats-strip" style={{ margin: 0, padding: '0.5rem 1rem', background: 'transparent' }}>
                      <div className="admin-stat-card" style={{ padding: '0.5rem 1rem', minWidth: 'auto' }}>
                        <strong>{projectSubmissions.length}</strong>
                        <span style={{ fontSize: '0.7rem' }}>Submitted</span>
                      </div>
                    </div>
                  </div>
                  <div className="user-table-wrapper">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Team / Project</th>
                          <th>Links</th>
                          <th>Status</th>
                          <th>Submitted At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Show all unique teams and their submission status */}
                        {Array.from(new Set(allUsers.filter(u => u.user_role === 'attendee').map(u => u.team_name || `Individual-${u.id}`))).map(team => {
                          const sub = projectSubmissions.find(s => s.team_name === team);
                          return (
                            <tr key={team}>
                              <td>
                                <strong>{team}</strong>
                                {sub && <p style={{ fontSize: '0.8rem', color: 'var(--blue-shadow)' }}>{sub.project_name}</p>}
                              </td>
                              <td>
                                {sub ? (
                                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <a href={sub.github_url} target="_blank" rel="noreferrer" className="btn-small accept">CODE</a>
                                    <a href={sub.demo_url} target="_blank" rel="noreferrer" className="btn-small accept">DEMO</a>
                                  </div>
                                ) : '-'}
                              </td>
                              <td>
                                <span className={`role-badge ${sub ? 'accept' : 'decline'}`}>
                                  {sub ? 'SUBMITTED' : 'PENDING'}
                                </span>
                              </td>
                              <td>{sub ? new Date(sub.submitted_at).toLocaleDateString() : '-'}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

          ) : user.role === 'mentor' ? (
            /* MENTOR PROFILE VIEW */
            <>
              <div className="profile-sidebar">
                <div className="profile-avatar" style={{ position: 'relative' }}>
                  <img
                    src={user.avatarUrl || '/icons/user-profile.svg'}
                    alt="avatar"
                    style={{ objectFit: user.avatarUrl ? 'cover' : 'contain', borderRadius: '50%', width: '100%', height: '100%' }}
                  />
                  <label className="upload-overlay" title="Change photo">
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleAvatarUpload}
                    />
                    ✎
                  </label>
                </div>
                <h2 className="text-3d">{user.name}</h2>
                <div className={`status-badge ${user.isApproved ? 'approved' : 'pending'}`}>
                  {user.isApproved ? 'VERIFIED MENTOR' : 'AWAITING APPROVAL'}
                </div>

                <div className="profile-field" style={{ marginTop: '2rem' }}>
                  <label>Mentor Bio</label>
                  <textarea
                    value={user.bio}
                    onChange={(e) => setUser({ ...user, bio: e.target.value })}
                    placeholder="Share your expertise and how you can help..."
                  />
                </div>

                <div className="profile-actions" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
                  <button className="join-btn" onClick={updateProfile}>SAVE CHANGES</button>
                  <button className="logout-btn" onClick={handleLogout}>LOGOUT</button>
                </div>
                <div onClick={() => setActiveView('landing')} style={{ marginTop: '2rem', cursor: 'pointer', color: 'var(--blue-shadow)' }}>← Back to Home</div>
              </div>

              <div className="profile-info">
                <div className="profile-card-group">
                  <h2 className="text-3d" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Professional Info</h2>
                  <div className="profile-field">
                    <label>Expertise / Role</label>
                    <input
                      type="text"
                      className="profile-input"
                      value={user.role_title || ''}
                      onChange={(e) => setUser({ ...user, role_title: e.target.value })}
                      placeholder="e.g. Senior Software Architect, Product Designer..."
                    />
                  </div>
                  <div className="profile-field">
                    <label>Company / Organization</label>
                    <input
                      type="text"
                      className="profile-input"
                      value={user.venue || ''} // Using venue field for company as per common profile patterns
                      onChange={(e) => setUser({ ...user, venue: e.target.value })}
                      placeholder="e.g. Google, Meta, Independent..."
                    />
                  </div>
                  <div className="profile-field">
                    <label>My Mentoring Stack</label>
                    <div className="tech-tag-container">
                      {user.stack.map(s => <span key={s} className="tech-tag">{s}</span>)}
                      <span className="tech-tag" style={{ opacity: 0.5, cursor: 'pointer' }}>+ Add Skill</span>
                    </div>
                  </div>
                  <div className="profile-field">
                    <label>Social Links</label>
                    <div className="social-connect-grid">
                      <div className="social-connect-item">
                        <img src="/icons/github.svg" alt="GitHub" />
                        <input
                          type="text"
                          placeholder="GitHub Username"
                          value={user.socials.github}
                          onChange={(e) => setUser({ ...user, socials: { ...user.socials, github: e.target.value } })}
                        />
                      </div>
                      <div className="social-connect-item">
                        <img src="/icons/linkedin.svg" alt="LinkedIn" />
                        <input
                          type="text"
                          placeholder="LinkedIn Profile"
                          value={user.socials.linkedin}
                          onChange={(e) => setUser({ ...user, socials: { ...user.socials, linkedin: e.target.value } })}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="requests-section" style={{ marginTop: '3rem' }}>
                  <h2 className="text-3d" style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Attendee Requests</h2>
                  {!user.isApproved && (
                    <div className="warning-box" style={{ marginBottom: '1.5rem', background: '#fff9e6', border: '2px solid #ffcc00', padding: '1rem', borderRadius: '15px', color: '#856404' }}>
                      Your account is pending approval. You will be able to accept requests once verified by the Admin!
                    </div>
                  )}
                  <div className="request-list">
                    {mentorRequests.map(req => (
                      <div key={req.id} className="request-card">
                        <div className="request-user">
                          <strong>{req.profiles?.full_name || 'Anonymous'}</strong>
                          <span>{req.profiles?.email}</span>
                        </div>
                        <p className="request-msg">"{req.message}"</p>
                        <div className="request-actions">
                          <button className="btn-small accept" disabled={!user.isApproved} onClick={() => handleAcceptRequest(req.id)}>ACCEPT</button>
                          <button className="btn-small decline" onClick={() => handleDeclineRequest(req.id)}>DECLINE</button>
                        </div>
                      </div>
                    ))}
                    {mentorRequests.length === 0 && <p className="empty-msg" style={{ opacity: 0.5 }}>No active help requests yet. Stay tuned!</p>}
                  </div>
                </div>
              </div>
            </>

          ) : (
            /* EXISTING ATTENDEE PROFILE VIEW */
            <>
              <div className="profile-sidebar">
                <div className="profile-avatar" style={{ position: 'relative' }}>
                  <img
                    src={user.avatarUrl || '/icons/user-profile.svg'}
                    alt="avatar"
                    style={{ objectFit: user.avatarUrl ? 'cover' : 'contain', borderRadius: '50%', width: '100%', height: '100%' }}
                  />
                  <label className="upload-overlay" title="Change photo">
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleAvatarUpload}
                    />
                    ✎
                  </label>
                </div>
                <h2 className="text-3d">{user.name}</h2>
                <div className="profile-field" style={{ marginTop: '2rem' }}>
                  <label>Hacker Bio</label>
                  <textarea
                    value={user.bio}
                    onChange={(e) => setUser({ ...user, bio: e.target.value })}
                    placeholder="Tell us about yourself..."
                  />
                </div>
                <div className="profile-actions" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
                  <div className="sound-toggle-large" onClick={() => setIsSoundEnabled(!isSoundEnabled)}>
                    <span>Volume Control</span>
                    <div className={`toggle-switch ${isSoundEnabled ? 'active' : ''}`}>
                      {isSoundEnabled ? "AUDIO ON" : "AUDIO OFF"}
                    </div>
                  </div>
                  <button className="join-btn" onClick={updateProfile}>SAVE CHANGES</button>
                  <button className="logout-btn" onClick={handleLogout}>LOGOUT</button>
                </div>
                <div onClick={() => setActiveView('landing')} style={{ marginTop: '2rem', cursor: 'pointer', color: 'var(--blue-shadow)' }}>← Back to Home</div>
              </div>
              <div className="profile-info">
                <div className="profile-field">
                  <label>Hacking Role</label>
                  <input
                    type="text"
                    className="profile-input"
                    value={user.role_title || user.role}
                    onChange={(e) => setUser({ ...user, role_title: e.target.value })}
                    placeholder="e.g. Frontend, UI/UX, Backend..."
                  />
                </div>
                <div className="profile-field">
                  <label>My Tech Stack</label>
                  <div className="tech-tag-container">
                    {user.stack.map(s => <span key={s} className="tech-tag">{s}</span>)}
                    <span className="tech-tag" style={{ opacity: 0.5, cursor: 'pointer' }}>+ Add Tool</span>
                  </div>
                </div>
                <div className="profile-field">
                  <label>Team Status</label>
                  <div className="field-value">
                    <strong>{user.teamName ? user.teamName : 'Solo Hacker'}</strong>
                    {user.teamName ? (
                      <button className="btn-small decline" style={{ marginLeft: '1rem' }} onClick={handleLeaveTeam}>
                        LEAVE TEAM
                      </button>
                    ) : (
                      <button className="btn-small accept" style={{ marginLeft: '1rem' }} onClick={handleFindTeam}>
                        FIND MY SQUAD
                      </button>
                    )}
                  </div>
                </div>
                <div className="profile-field">
                  <label>Selected Innovation Track</label>
                  <div className="field-value">
                    {user.problemStatementId ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                        <strong style={{ color: 'var(--text-navy)' }}>
                          {problemStatements.find(ps => ps.id === user.problemStatementId)?.title || 'Selected'}
                        </strong>
                        <small style={{ color: 'var(--text-muted)' }}>🔒 Selection Locked (Contact admin to change)</small>
                      </div>
                    ) : (
                      <select 
                        className="admin-select-small" 
                        style={{ padding: '0.8rem', fontSize: '1rem' }}
                        onChange={(e) => handleSelectPS(e.target.value)}
                      >
                        <option value="">Choose a Problem Statement...</option>
                        {problemStatements.map(ps => (
                          <option key={ps.id} value={ps.id}>{ps.title}</option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
                <div className="profile-field">
                  <label>Social Connectivity</label>
                  <div className="social-connect-grid">
                    <div className="social-connect-item">
                      <img src="/icons/github.svg" alt="GitHub" />
                      <input
                        type="text"
                        placeholder="GitHub Username"
                        value={user.socials.github}
                        onChange={(e) => setUser({ ...user, socials: { ...user.socials, github: e.target.value } })}
                      />
                    </div>
                    <div className="social-connect-item">
                      <img src="/icons/linkedin.svg" alt="LinkedIn" />
                      <input
                        type="text"
                        placeholder="LinkedIn Profile"
                        value={user.socials.linkedin}
                        onChange={(e) => setUser({ ...user, socials: { ...user.socials, linkedin: e.target.value } })}
                      />
                    </div>
                  </div>
                </div>
                <div className="profile-field" style={{ borderBottom: 'none' }}>
                  <label>Support & Assistance</label>
                  <div className="support-cta-grid">
                    <div className="support-btn mentor" onClick={() => setActiveView('landing')}>
                      GO TO MENTOR LIST
                    </div>
                    <div className="support-btn issue" onClick={handleReportIssue}>
                      REPORT AN ISSUE
                    </div>
                    {settings.certificates_released === 'true' && (
                      <div 
                        className="support-btn mentor" 
                        style={{ 
                          background: 'linear-gradient(135deg, #ffd700, #ff8c00)', 
                          color: '#001f3f',
                          gridColumn: 'span 2'
                        }} 
                        onClick={() => setActiveView('certificate')}
                      >
                        🎓 CLAIM ACHIEVEMENT CERTIFICATE
                      </div>
                    )}
                  </div>
                </div>

                {/* PROJECT SUBMISSION SECTION */}
                <div className="profile-card" style={{ marginTop: '2rem', padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '20px' }}>
                  <h3 className="text-3d" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Project Submission</h3>
                  {mySubmission ? (
                    <div className="submission-success" style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
                      <h3>Project Submitted!</h3>
                      <p>Your team's project <strong>"{mySubmission.project_name}"</strong> has been received.</p>
                      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                        <a href={mySubmission.github_url} target="_blank" rel="noreferrer" className="btn-small accept">VIEW CODE</a>
                        <a href={mySubmission.demo_url} target="_blank" rel="noreferrer" className="btn-small accept">VIEW DEMO</a>
                      </div>
                    </div>
                  ) : (
                    <form className="auth-form" onSubmit={handleProjectSubmit} style={{ marginTop: '1rem' }}>
                      <div className="admin-two-col-grid" style={{ gap: '1rem' }}>
                        <div className="input-group">
                          <label style={{ color: 'var(--text-navy)', fontWeight: 'bold' }}>Project Name</label>
                          <input name="projectName" type="text" placeholder="My Awesome Hack" required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }} />
                        </div>
                        <div className="input-group">
                          <label style={{ color: 'var(--text-navy)', fontWeight: 'bold' }}>GitHub Repository</label>
                          <input name="github" type="url" placeholder="https://github.com/..." required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }} />
                        </div>
                      </div>
                      <div className="input-group" style={{ marginTop: '1rem' }}>
                        <label style={{ color: 'var(--text-navy)', fontWeight: 'bold' }}>Demo Link (Video or URL)</label>
                        <input name="demo" type="url" placeholder="https://youtube.com/... or https://myapp.com" required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }} />
                      </div>
                      <div className="input-group" style={{ marginTop: '1rem' }}>
                        <label style={{ color: 'var(--text-navy)', fontWeight: 'bold' }}>Brief Description</label>
                        <textarea name="description" placeholder="Tell us what you built and how it helps..." required style={{ width: '100%', minHeight: '100px', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}></textarea>
                      </div>
                      <div className="input-group" style={{ marginTop: '1rem' }}>
                        <label style={{ color: 'var(--text-navy)', fontWeight: 'bold' }}>Project Photos (Max 3)</label>
                        <input name="photos" type="file" accept="image/*" multiple style={{ width: '100%', padding: '0.8rem' }} />
                      </div>
                      <button type="submit" className="join-btn" style={{ width: '100%', marginTop: '1.5rem' }}>
                        SUBMIT FINAL PROJECT
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      ) : activeView === 'certificate' ? (
        <div 
          className="certificate-view-screen" 
          style={{ 
            minHeight: '100vh', 
            padding: '2rem', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center' 
          }}
        >
          {/* Sticky Controls Header */}
          <div 
            className="certificate-sticky-header" 
            style={{
              position: 'sticky',
              top: '20px',
              zIndex: 100,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              padding: '1rem 2rem',
              borderRadius: '20px',
              border: '3px solid #001f3f',
              boxShadow: '10px 10px 0px #001f3f',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '90%',
              maxWidth: '1123px',
              marginBottom: '3rem'
            }}
          >
            <h2 className="text-3d" style={{ margin: 0 }}>YOUR ACHIEVEMENT</h2>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="join-btn" onClick={handleDownloadCertificate}>DOWNLOAD PDF</button>
              <button className="btn-secondary" onClick={() => setActiveView('profile')}>BACK TO PROFILE</button>
            </div>
          </div>
          
          {/* Certificate Display Area */}
          <div 
            className="certificate-display-wrapper" 
            style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              perspective: '1000px', 
              paddingBottom: '4rem' 
            }}
          >
            <div className="certificate-container-live" id="certificate-render" style={{
              width: '1123px',
              height: '794px',
              backgroundColor: '#fffdf5',
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
              border: '8px solid #001f3f',
              borderRadius: '40px',
              position: 'relative',
              boxShadow: '25px 25px 0px #ff4d94',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '60px 80px',
              boxSizing: 'border-box',
              fontFamily: "'Outfit', sans-serif",
              overflow: 'hidden'
            }}>
              {/* Watermark */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-15deg)', fontFamily: "'Fredoka One', cursive", fontSize: '11rem', color: 'rgba(0, 31, 63, 0.03)', whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 1, letterSpacing: '4rem' }}>STARLET</div>
              
              {/* Decorative Star */}
              <div style={{ position: 'absolute', top: '30px', left: '30px', width: '60px', height: '60px', backgroundColor: '#ffd700', clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', border: '3px solid #001f3f', transform: 'rotate(-15deg)', zIndex: 2 }}></div>

              {/* Header Branding */}
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', zIndex: 2 }}>
                <div style={{ width: '85px', height: '85px', borderRadius: '15px', border: '3px solid #001f3f', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '5px 5px 0px #ff4d94', overflow: 'hidden' }}>
                  <img src="/brand/Logo.png" alt="Starlet" style={{ width: '85%', height: 'auto' }} />
                </div>
                <div style={{ width: '85px', height: '85px', borderRadius: '15px', border: '3px solid #001f3f', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '5px 5px 0px #ff4d94', overflow: 'hidden' }}>
                  <img src="/brand/Mind Empowered.jpeg" alt="ME" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
              
              {/* Title Section */}
              <div style={{ textAlign: 'center', zIndex: 2 }}>
                <h1 style={{ fontFamily: "'Fredoka One', cursive", fontSize: '5.5rem', color: '#001f3f', margin: 0, textTransform: 'uppercase', textShadow: '4px 4px 0px #ffd700' }}>Certificate</h1>
                <p style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ff4d94', letterSpacing: '15px', marginTop: '-5px', textTransform: 'uppercase' }}>OF EXCELLENCE</p>
              </div>

              {/* Recipient Details */}
              <div style={{ marginTop: '20px', fontSize: '1.2rem', color: '#001f3f', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', zIndex: 2 }}>
                This award is officially presented to
              </div>

              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '4rem', fontWeight: 900, color: '#001f3f', margin: '5px 0', padding: '10px 40px', borderBottom: '4px solid #ffd700', zIndex: 2, minWidth: '500px', minHeight: '60px' }}>
                {user.name || ''}
              </div>

              {/* Achievement Body */}
              <div style={{ maxWidth: '850px', margin: '15px auto 40px auto', textAlign: 'center', fontSize: '1.3rem', lineHeight: '1.8', color: '#444', fontWeight: 400, zIndex: 2 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Your contribution to <strong style={{ color: '#ff4d94', fontWeight: 800 }}>Starlet 5.0</strong> has left an indelible mark on the galaxy of innovators.
              </div>

              {/* Footer Row */}
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto', paddingBottom: '15px', paddingLeft: '80px', paddingRight: '80px', boxSizing: 'border-box', zIndex: 2 }}>
                <div style={{ width: '350px', textAlign: 'center' }}>
                  <div style={{ height: '4px', background: '#001f3f', width: '280px', margin: '0 auto 15px auto', borderRadius: '2px' }}></div>
                  <strong style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.4rem', color: '#001f3f', display: 'block', fontWeight: 900, letterSpacing: '1px', lineHeight: 1 }}>MIND EMPOWERED</strong>
                </div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(0, 31, 63, 0.4)', textTransform: 'uppercase', letterSpacing: '1px', lineHeight: 1 }}>
                  ISSUE DATE: JULY 11, 2024
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : activeView === 'venue' ? (
        <div className="venue-container">
          <div className="venue-header">
            <h1 className="text-3d">VENUE DETAILS</h1>
            <p className="handwritten">Everything you need to know about where the magic happens!</p>
          </div>

          <div className="venue-grid">
            {venues.length === 0 ? (
              <div className="venue-card map-section" style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
                <h2 className="text-3d">Locations Coming Soon</h2>
                <p>We are finalizing the coordinates for the Starlet 5.0 hubs. Check back later!</p>
              </div>
            ) : (
              venues.map(v => (
                <div key={v.id} className="venue-card map-section">
                  <h2 className="text-3d">{v.name}</h2>
                  <div className="map-placeholder">
                    <img src="/icons/location.svg" alt="map" className="map-icon" />
                    <p>{v.description}</p>
                    <div className="venue-address">
                      <strong>Address:</strong><br />
                      {v.address}
                    </div>
                  </div>
                  <a 
                    href={v.google_maps_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="join-btn" 
                    style={{ marginTop: '1.5rem', textAlign: 'center', display: 'block', textDecoration: 'none' }}
                  >
                    OPEN IN GOOGLE MAPS
                  </a>
                </div>
              ))
            )}

            <div className="venue-card gallery-section-venue">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 className="text-3d" style={{ margin: 0 }}>Venue Gallery</h2>
                <div className="gallery-nav-btns">
                  <button className="nav-icon-btn small" onClick={() => scrollGallery('left')}>←</button>
                  <button className="nav-icon-btn small" onClick={() => scrollGallery('right')}>→</button>
                </div>
              </div>
              <div className="venue-image-grid" ref={galleryRef}>
                <div className="venue-img-placeholder">
                  <span>Main Entrance Preview</span>
                </div>
                <div className="venue-img-placeholder">
                  <span>Hacking Hall Preview</span>
                </div>
                <div className="venue-img-placeholder">
                  <span>Chill Zone Preview</span>
                </div>
                <div className="venue-img-placeholder">
                  <span>Workshop Area Preview</span>
                </div>
              </div>
            </div>

            <div className="venue-card transport-section">
              <h2 className="text-3d">Transport</h2>
              <div className="transport-list">
                <div className="transport-item">
                  <div className="transport-icon"><img src="/icons/location.svg" alt="metro" style={{ width: '40px' }} /></div>
                  <div className="transport-info">
                    <h3>Metro (Line 5)</h3>
                    <p>From <strong>Central Station</strong> to <strong>Innovation Park</strong></p>
                    <small>Runs every 10 minutes. 5-minute walk to venue.</small>
                  </div>
                </div>
                <div className="transport-item">
                  <div className="transport-icon"><img src="/icons/users.svg" alt="bus" style={{ width: '40px' }} /></div>
                  <div className="transport-info">
                    <h3>Shuttle Bus</h3>
                    <p>From <strong>City Plaza</strong> to <strong>Venue Entrance</strong></p>
                    <small>Complimentary for Starlet attendees. Hourly service.</small>
                  </div>
                </div>
                <div className="transport-item">
                  <div className="transport-icon"><img src="/icons/location.svg" alt="car" style={{ width: '40px' }} /></div>
                  <div className="transport-info">
                    <h3>Car / Ride Share</h3>
                    <p>Drop-off at <strong>Main Gate</strong></p>
                    <small>Free parking available for the first 100 cars.</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div onClick={() => setActiveView('landing')} style={{ marginTop: '3rem', cursor: 'pointer', color: 'var(--blue-shadow)', textAlign: 'center', width: '100%' }}>← Back to Home</div>
        </div>
      ) : null}

      <div className={`scroll-top-btn ${showScrollTop ? 'visible' : ''}`} onClick={scrollToTop}>
        <img src="/icons/rocket.svg" alt="top" />
      </div>
      {showAboutPopup && (
        <div className="modal-overlay" onClick={() => setShowAboutPopup(false)}>
          <div className="modal-content about-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAboutPopup(false)}>×</button>
            <div className="modal-inner">
              <div className="modal-visual">
                <img src="/brand/Mind Empowered.gif" alt="Mind Empowered" />
              </div>
              <div className="modal-text">
                <h2 className="text-3d">About Mind Empowered</h2>
                <p>
                  Mind Empowered (ME) is a charitable organization based in India. It is the brainchild of Maya Menon and her sister - two sisters who resonate positivity and happiness wherever they go.
                </p>
                <p>
                  The sisters realized there was a strong need to eliminate the stigma associated with mental health from our society. Hence, the idea of an open forum to help the students came to life by forming "ME".
                </p>
                <div className="modal-footer-brand">
                  A Mind Empowered Initiative
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedTrack && (
        <div className="modal-overlay" onClick={() => setSelectedTrack(null)}>
          <div className="modal-content track-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedTrack(null)}>×</button>
            <div className="track-modal-inner">
              <div className="track-modal-header">
                <span className="track-id-badge">CHALLENGE #{selectedTrack.index}</span>
                <h2 className="text-3d">{selectedTrack.title}</h2>
                {user.role === 'attendee' && !user.problemStatementId && (
                  <button className="join-btn" onClick={() => { handleSelectPS(selectedTrack.id); setSelectedTrack(null); }}>
                    CHOOSE THIS TRACK
                  </button>
                )}
              </div>
              <div className="track-modal-body">
                <div className="track-description">
                  <h3>The Challenge</h3>
                  <p>{selectedTrack.description}</p>
                </div>
                <div className="track-meta">
                  <div className="meta-item">
                    <strong>Focus Area:</strong>
                    <span>Assistive Technology</span>
                  </div>
                  <div className="meta-item">
                    <strong>Category:</strong>
                    <span>{selectedTrack.track_category || 'Software / Hardware'}</span>
                  </div>
                </div>
              </div>
              <div className="modal-footer-brand">
                Starlet 5.0 Innovation Track
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedGalleryImage !== null && (
        <div className="modal-overlay lightbox-overlay" onClick={() => setSelectedGalleryImage(null)}>
          <button className="lightbox-close" onClick={() => setSelectedGalleryImage(null)}>×</button>
          
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button 
              className="lightbox-nav-btn prev" 
              onClick={() => setSelectedGalleryImage(prev => (prev > 0 ? prev - 1 : 41))}
            >
              ←
            </button>
            
            <div className="lightbox-image-container">
              <img 
                src={selectedGalleryImage + 1 <= 9 ? `/gallery/${selectedGalleryImage + 1}.JPG` : `/gallery/${selectedGalleryImage + 1}.jpeg`} 
                alt="Enlarged" 
              />
              <div className="lightbox-caption">
                {galleryCaptions[selectedGalleryImage] || `Starlet Memory #${selectedGalleryImage + 1}`}
              </div>
            </div>

            <button 
              className="lightbox-nav-btn next" 
              onClick={() => setSelectedGalleryImage(prev => (prev < 41 ? prev + 1 : 0))}
            >
              →
            </button>
          </div>
        </div>
      )}

      {selectedMentor && (
        <div className="modal-overlay" onClick={() => setSelectedMentor(null)}>
          <div className="modal-content mentor-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="text-3d">{selectedMentor.full_name}</h2>
              <button className="modal-close" onClick={() => setSelectedMentor(null)}>×</button>
            </div>
            <div className="mentor-modal-content">
              <div className="mentor-modal-side">
                <img src={selectedMentor.avatar_url || "/icons/user-profile.svg"} alt="mentor" />
                <h3>{selectedMentor.role_title}</h3>
                <p>{selectedMentor.company}</p>
                <div className="mentor-tags">
                  {(selectedMentor.expertise || []).map(tag => <span key={tag} className="tech-tag">{tag}</span>)}
                </div>
              </div>
              <div className="mentor-modal-main">
                <h4>About</h4>
                <p>{selectedMentor.bio}</p>
                {user.role === 'attendee' && (
                  <button className="join-btn" style={{ marginTop: '2rem', width: '100%' }} onClick={() => { setMentorRequestModal(selectedMentor); setSelectedMentor(null); }}>
                    REQUEST HELP FROM {selectedMentor.full_name.split(' ')[0]}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {mentorRequestModal && (
        <div className="modal-overlay" onClick={() => setMentorRequestModal(null)}>
          <div className="modal-content" style={{ maxWidth: '500px' }} onClick={e => e.stopPropagation()}>
            <h2 className="text-3d">Request Help</h2>
            <p>Send a message to <strong>{mentorRequestModal.full_name}</strong>. They will be notified immediately.</p>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const msg = e.target.message.value;
              const { error } = await supabase.from('mentor_requests').insert([{
                attendee_id: session.user.id,
                mentor_id: mentorRequestModal.id,
                message: msg
              }]);
              if (error) alert(error.message);
              else {
                alert('Request sent!');
                setMentorRequestModal(null);
              }
            }}>
              <textarea 
                name="message" 
                placeholder="What do you need help with? (e.g. Debugging React, UI Feedback)"
                required
                style={{ width: '100%', minHeight: '120px', padding: '1rem', borderRadius: '12px', marginTop: '1rem' }}
              ></textarea>
              <button type="submit" className="join-btn" style={{ width: '100%', marginTop: '1rem' }}>SEND REQUEST</button>
            </form>
          </div>
        </div>
      )}

      {activeAlert && (
        <div className="realtime-alert-overlay">
          <div className="realtime-alert-card">
            <div className="alert-header">NEW HELP REQUEST</div>
            <div className="alert-body">
              <div className="alert-user-photo">
                <img src={activeAlert.attendee?.avatar_url || '/icons/user-profile.svg'} alt="attendee" />
              </div>
              <div className="alert-content">
                <h3>{activeAlert.attendee?.full_name}</h3>
                <span className="alert-team-tag">{activeAlert.attendee?.team_name || 'Solo Hacker'}</span>
                <p>"{activeAlert.message}"</p>
              </div>
            </div>
            <div className="alert-footer">
              <button className="join-btn" style={{ width: '100%', marginBottom: '0.5rem' }} onClick={() => { handleAcceptRequest(activeAlert.id); setActiveAlert(null); }}>
                ACCEPT NOW
              </button>
              <button className="btn-secondary" style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid #eee', cursor: 'pointer' }} onClick={() => setActiveAlert(null)}>
                DISMISS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
