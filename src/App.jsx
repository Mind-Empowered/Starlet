import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import { supabase } from './supabaseClient';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import SponsorsPage from './SponsorsPage';


const sectionsData = [

  {
    id: 15,
    type: 'what-is-starlet',
    title: 'What is Starlet?',
    content: "Starlet is the ultimate innovation marathon for women where ideas meet execution and strangers become teammates. Whether you're a seasoned coder or just stepping into the world of tech, this event is built for everyone — solo innovators, dynamic duos, and full-fledged teams!",
    image: 'brand/Starlet.mp4'
  },
  {
    id: 2,
    type: 'mission',
    title: "Our Mission",
    content: "A safe place for girls to connect, code, co-create, and cultivate confidence. We believe that when women are provided with an empowering, collaborative environment, their ideas have the power to transform industries and reshape the future of technology.",
    image: "svg/1.svg"
  },
  {
    id: 16,
    type: 'theme',
    title: "Starlet 5.0 Theme",
    content: "Collaboration over competition to build technology that empowers people with disabilities, improves accessibility, and creates a more inclusive world. Whether through software, hardware, or AI, your solutions will break down barriers and foster real-world independence.",
    image: "svg/3.svg"
  },
  {
    id: 3,
    type: 'tracks',
    title: "Pick Your Track",
    content: "Choose a focus area within Assistive Tech: from Mobility Solutions and Visual/Auditory Aids to Neurodiversity Support and Inclusive Education. Your innovation can redefine independence.",
    image: "brand/Logo.png"
  },
  {
    id: 4,
    type: 'timeline',
    title: "The Roadmap",
    content: "11th July 2026, Saturday 8:00am - 5:00pm and 12th July 2026, Sunday 8:00am - 5:00pm",
    image: "brand/Logo.png"
  },

  {
    id: 6,
    type: 'prizes',
    title: "Epic Prizes",
    content: "A total prize pool of over ₹40,000 awaits the most innovative solutions!",
    image: "icons/trophy.svg"
  },
  { id: 7, type: 'rules', title: "Rules of the Galaxy", content: "Fair play and collaboration are the heart of Starlet.", image: "icons/warning.svg" },
  { id: 8, type: 'mentors', title: "Meet Your Mentors", content: "Industry experts ready to guide your journey.", image: "icons/user-profile.svg" },
  { id: 9, type: 'community', title: "Make New Friends", content: "Starlet isn't just an innovation marathon — it's the starting point for lifelong sisterhood and professional networking. Connect with passionate creators, find potential co-founders, share exciting coding breakthroughs, and become part of an empowered tech community that champions your growth!", image: "svg/2.svg" },
  { id: 10, type: 'sponsors', title: "Our Supporters", content: "The organizations making this impact possible.", image: "brand/Logo.png" },
  { id: 11, type: 'gallery', title: "The Gallery", content: "Captured moments of innovation and fun.", image: "brand/Logo.png" },
  { id: 12, type: 'faq', title: "Common Doubts", content: "Answers to frequently asked questions.", image: "icons/warning.svg" },
  // { id: 13, type: 'newsletter', title: "Stay Updated", content: "Join our community to never miss an update.", image: "icons/rocket.svg" },
  { id: 14, type: 'contact', title: "Get in Touch", content: "Reach out for support or inquiries.", image: "icons/location.svg" }
];

const tracksData = Array.from({ length: 15 }, (_, i) => ({
  id: i + i,
  title: `Challenge #${i + 1}`,
  summary: "A brief overview of the challenge and its importance in building inclusive technology.",
  details: "Dive into this challenge and use your coding skills to create a solution that makes a real-world impact. Collaboration and creativity are key!"
}));

const faqsData = [
  { id: 1, q: "What is Starlet 5.0?", a: "Starlet 5.0 is a high-impact innovation hackathon dedicated to building technology that empowers people with disabilities and improves accessibility across the world." },
  { id: 2, q: "Who can participate?", a: "The event is open to all women and non-binary students and innovators. Whether you're a beginner or a pro, you're welcome!" },
  { id: 3, q: "Do I need a team to register?", a: "No! You can register as a solo participant and we will put you in a team, or form a team of 3 to 4 members." },
  { id: 4, q: "Where will the event be held?", a: "We have two venues: the Main Venue at Adi Shankara Institute (Kalady) and a second location at Aikyam Space (Matancherry)." },
  { id: 5, q: "Is there any registration fee?", a: "Yes, the registration fee is ₹150 per head. Please ensure you attach the fee payment screenshot during registration." },
  { id: 6, q: "What are the prizes?", a: "We have a total prize pool of over ₹40,000, including awards for the top 3 teams and a special 'Best Innovation' prize." },
  { id: 7, q: "What should I bring with me?", a: "Please bring your own laptop and charger. We'll provide the internet, food, mentorship, and a great environment!" },
  { id: 8, q: "Will there be mentorship available?", a: "Yes! Industry experts and tech mentors will be available throughout the event to guide you and your team." }
];

const mentorsData = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  name: `Mentor ${i + 1}`,
  role: "Tech Expert",
  company: "Industry Leader",
  bio: "Experienced professional dedicated to guiding the next generation of innovators.",
  image: "icons/user-profile.svg"
}));

const galleryCaptions = [
  "Collaborative coding & teamwork", "Mentorship & project guidance", "Expert panel review", "Acoustic jam session break",
  "Talent showcase performances", "Campus nature break", "Starlet 4.0 photobooth memories", "Grand participant overhead group photo",
  "Casual cafe networking", "Starlet 4.0 photobooth smiles", "Community lunch line", "Collaborative team hacking sessions",
  "Enthusiastic hackers & teamwork", "Focused hacking session & mentorship", "Peer programming & problem solving", "Hacking lab in full swing",
  "Intense coding marathon", "Empowering women in tech", "In the coding zone", "Inclusive Environment: Sign language support & accessible mentorship",
  "Team Brainstorming & Architecture", "Project Pitching & Presentations", "Pair Programming & Peer Support", "Outdoor Coffee Break & Socializing",
  "Tea Break & Casual Discussions", "Expert Session & Keynote Address", "Workshops & Tech Talks", "Mentors Guiding Hackers in Action",
  "Interactive Panel & Q&A Session", "Empowering Tech Talks & Guidance", "Engaged Hackathon Participants", "swags",
  "Community & Mentorship Smiles", "Organizing Team & Keynote Speakers", "Faculty & Esteemed Mentors", "Judgement time",
  "High Energy Hackers & Celebration", "Interactive Team Games & Icebreakers", "Fun zone", "One-on-One Project Reviews",
  "Chai & Chats: Refreshment Break", "Sweet Treats & Snack Time"
];

function App() {

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState('landing'); // landing, login, signup, profile
  const [adminActiveTab, setAdminActiveTab] = useState('admin'); // admin or mentor
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [visibleUserCount, setVisibleUserCount] = useState(5);
  const [userRoleFilter, setUserRoleFilter] = useState('all'); // all, mentor, attendee
  const [isOtherTrackSelected, setIsOtherTrackSelected] = useState(false);
  const [customTrackTitle, setCustomTrackTitle] = useState('');
  const [customTrackDesc, setCustomTrackDesc] = useState('');
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [faqLimit, setFaqLimit] = useState(3);
  const [visibleSections, setVisibleSections] = useState(new Set());

  const [user, setUser] = useState({
    name: '',
    email: '',
    role: 'attendee', // attendee, mentor, admin
    role_title: '',
    isApproved: false,
    team: null,
    venue: '',
    bio: '',
    stack: [],
    college: '',
    avatarUrl: '',
    website: '',
    yearsOfExperience: '',
    languages: [],
    socials: {
      github: '',
      linkedin: '',
      twitter: ''
    }
  });
  const originalUser = useRef(null); // snapshot of last-saved profile for dirty-checking
  const hasProfileChanged = originalUser.current
    ? JSON.stringify(user) !== JSON.stringify(originalUser.current)
    : false;
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [showAboutPopup, setShowAboutPopup] = useState(false);
  const [showAikyamPopup, setShowAikyamPopup] = useState(false);
  const [showAdiPopup, setShowAdiPopup] = useState(false);
  const [showRegPopup, setShowRegPopup] = useState(false);

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

  const handleContactSubmit = (e) => {
    e.preventDefault();
    try {
      const form = e.target;
      const fd = new FormData(form);
      const name = (fd.get('contactName') || user.name || '').toString().trim();
      const email = (fd.get('contactEmail') || user.email || '').toString().trim();
      const desc = (fd.get('contactDesc') || '').toString().trim();
      const subject = `Enquiry regarding Starlet from ${name || email || 'a participant'}`;
      const body = `${desc}\n\nFrom: ${name}${email ? ` <${email}>` : ''}`;
      const recipient = 'hello@mindempowered.com';
      const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
    } catch (err) {
      console.error('Contact submit failed', err);
    }
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
  const [visibleLandingTracksCount, setVisibleLandingTracksCount] = useState(3);
  const [visibleProblemStatementsCount, setVisibleProblemStatementsCount] = useState(5);
  const [visibleActiveMentorsCount, setVisibleActiveMentorsCount] = useState(5);
  const [visiblePendingMentorsCount, setVisiblePendingMentorsCount] = useState(5);
  const [visibleProjectSubmissionsCount, setVisibleProjectSubmissionsCount] = useState(5);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [mentorRequestModal, setMentorRequestModal] = useState(null);
  const [projectSubmissions, setProjectSubmissions] = useState([]);
  const [mySubmission, setMySubmission] = useState(null);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);

  const galleryRef = useRef(null);
  const landingGalleryRef = useRef(null);
  const requestRef = useRef();
  const partnersRef = useRef(null);
  const prizesRef = useRef(null);
  const mentorGridRef = useRef(null);


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

    // Splash Screen Dynamic Loader
    const assets = [
      'brand/Logo.png',
      'brand/Mind Empowered.gif',
      'brand/Starlet.mp4',
      'icons/user-profile.svg'
    ];
    let loaded = 0;
    
    // Make sure we wait at least 2 seconds so the splash screen doesn't just flash instantly
    const minTimePromise = new Promise(resolve => setTimeout(resolve, 2000));
    let isComplete = false;

    const checkComplete = () => {
      if (loaded >= assets.length && !isComplete) {
        isComplete = true;
        minTimePromise.then(() => {
          setLoadingProgress(100);
          setTimeout(() => setFadeOut(true), 500);
          setTimeout(() => setShowSplash(false), 1200);
        });
      }
    };

    assets.forEach(src => {
      const isVideo = src.endsWith('.mp4');
      const element = isVideo ? document.createElement('video') : new Image();
      
      const onload = () => {
        loaded++;
        setLoadingProgress(prev => Math.max(prev, Math.min(90, (loaded / assets.length) * 100)));
        checkComplete();
      };
      
      if (isVideo) {
        element.onloadeddata = onload;
        element.onerror = onload; // continue even if error
        element.src = src;
      } else {
        element.onload = onload;
        element.onerror = onload;
        element.src = src;
      }
    });

    // Fallback timer just in case assets fail to load or take too long
    const fallbackTimer = setTimeout(() => {
      loaded = assets.length;
      checkComplete();
    }, 6000);

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
      clearTimeout(fallbackTimer);
    };
  }, [isSoundEnabled]);

  useEffect(() => {
    // 1. Check for initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        setIsLoggedIn(true);
        fetchProfile(session.user.id);
        if (window.location.hash && window.location.hash.includes('type=recovery')) {
          setActiveView('reset-password');
        }
      }
      setLoading(false);
    });

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (session) {
        setIsLoggedIn(true);
        fetchProfile(session.user.id);

        // If the event is PASSWORD_RECOVERY or hash contains type=recovery, switch to reset view
        if (event === 'PASSWORD_RECOVERY' || (window.location.hash && window.location.hash.includes('type=recovery'))) {
          setActiveView('reset-password');
        }
      } else {
        setIsLoggedIn(false);
        setUser({ name: '', email: '', role: '', team: null, venue: '', bio: '', stack: [], website: '', yearsOfExperience: '', languages: [], socials: { github: '', linkedin: '', twitter: '' } });
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

  useEffect(() => {
    if (!isLoggedIn || user.role !== 'attendee' || !session?.user?.id) return;
    fetchMySubmission();
  }, [isLoggedIn, user.role, user.teamName, session?.user?.id]);

  const fetchMyTeamMembers = async () => {
    if (!isLoggedIn || user.role !== 'attendee' || !session?.user?.id) {
      setTeamMembers([]);
      return;
    }

    const teamKey = user.teamId ? { column: 'team_id', value: user.teamId } : user.teamName ? { column: 'team_name', value: user.teamName } : null;

    if (!teamKey) {
      setTeamMembers([]);
      return;
    }

    const { data } = await supabase
      .from('profiles')
      .select('id, full_name, email, avatar_url, user_role, team_name, team_id')
      .eq(teamKey.column, teamKey.value)
      .order('full_name', { ascending: true });

    setTeamMembers(data || []);
  };

  useEffect(() => {
    fetchMyTeamMembers();
  }, [isLoggedIn, user.role, user.teamId, user.teamName, session?.user?.id]);

  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code === 'PGRST116') {
        setUser({
          name: 'No such user found!',
          email: '',
          role: 'attendee',
          role_title: '',
          isApproved: false,
          venue: '',
          bio: '',
          stack: [],
          college: '',
          avatarUrl: '',
          website: '',
          yearsOfExperience: '',
          languages: [],
          teamId: null,
          teamName: '',
          problemStatementId: null,
          socials: {
            github: '',
            linkedin: '',
            twitter: ''
          }
        });
      } else if (data) {
        setUser({
          name: data.full_name || '',
          email: data.email || '',
          role: data.user_role || 'attendee',
          role_title: data.role_title || '',
          isApproved: data.is_approved || false,
          venue: data.venue || '',
          bio: data.bio || '',
          stack: Array.isArray(data.stack) ? data.stack : [],
          college: data.college || '',
          avatarUrl: data.avatar_url || '',
          website: data.website_url || '',
          yearsOfExperience: data.years_of_experience || '',
          languages: Array.isArray(data.languages) ? data.languages : [],
          teamId: data.team_id || null,
          teamName: data.team_name || '',
          problemStatementId: data.problem_statement_id || null,
          socials: {
            github: data.github_url || '',
            linkedin: data.linkedin_url || '',
            twitter: data.twitter_url || ''
          }
        });
        // Snapshot for dirty-checking (must mirror the shape above)
        originalUser.current = {
          name: data.full_name || '',
          email: data.email || '',
          role: data.user_role || 'attendee',
          role_title: data.role_title || '',
          isApproved: data.is_approved || false,
          venue: data.venue || '',
          bio: data.bio || '',
          stack: Array.isArray(data.stack) ? [...data.stack] : [],
          college: data.college || '',
          avatarUrl: data.avatar_url || '',
          website: data.website_url || '',
          yearsOfExperience: data.years_of_experience || '',
          languages: Array.isArray(data.languages) ? [...data.languages] : [],
          teamId: data.team_id || null,
          teamName: data.team_name || '',
          problemStatementId: data.problem_statement_id || null,
          socials: {
            github: data.github_url || '',
            linkedin: data.linkedin_url || '',
            twitter: data.twitter_url || ''
          }
        };
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
    const channels = [];

    if (isLoggedIn && (user.role === 'mentor' || (user.role === 'admin' && adminActiveTab === 'mentor'))) {
      fetchMentorRequests();
      // Realtime listener for new requests
      const channel = supabase
        .channel('schema-db-changes')
        .on('postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'mentor_requests', filter: `mentor_id=eq.${session?.user?.id}` },
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
            if (!payload.new.status || payload.new.status === 'pending') {
              setMentorRequests(prev => [payload.new, ...prev]);
            }
          }
        )
        .subscribe();
      channels.push(channel);
    }

    if (isLoggedIn && user.role === 'admin') {
      fetchAllMentors();
      fetchAllUsers();
      fetchAuditLogs();
      fetchSubmissions();
      fetchMentorRequests();

      const adminChannel = supabase.channel('admin-updates')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => {
          fetchAllUsers();
        })
        .subscribe();
      channels.push(adminChannel);
    }

    return () => {
      channels.forEach(ch => supabase.removeChannel(ch));
    };
  }, [isLoggedIn, user.role, adminActiveTab, session?.user?.id]);

  useEffect(() => {
    if (isLoggedIn && user.role === 'admin') {
      fetchSubmissions();
    }
  }, [isLoggedIn, user.role, adminActiveTab]);

  const fetchMentorRequests = async () => {
    if (!session?.user?.id) return;
    let query = supabase
      .from('mentor_requests')
      .select('*, profiles:attendee_id(full_name, email)')
      .or('status.is.null,status.eq.pending')
      .order('created_at', { ascending: false });

    if (user.role !== 'admin') {
      query = query.eq('mentor_id', session.user.id);
    }

    const { data, error } = await query;
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

  const getDisplayTeamName = (teamName) => {
    if (!teamName) return '';
    const m = teamName.match(/^Individual-(.+)$/);
    if (m) {
      const id = m[1];
      const member = allUsers.find(u => u.id === id);
      return member?.full_name || teamName;
    }
    return teamName;
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
        company: profile.venue || 'Independent',
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
    if (!session?.user?.id) return;

    let query = supabase
      .from('project_submissions')
      .select('*');

    if (user.teamName) {
      query = query.or(`submitted_by.eq.${session.user.id},team_name.eq.${user.teamName}`);
    } else {
      query = query.eq('submitted_by', session.user.id);
    }

    const { data } = await query.maybeSingle();
    if (data) setMySubmission(data);
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const files = e.target.photos.files;

    if (formData.get('description').toString().split(' ').length < 100){
      alert('Please follow the minimum word count for description.');
      return;
    }

    const uploadedUrls = [];
    for (let i = 0; i < files.length; i++) {
      const url = await handleFileUpload(files[i], 'projects');
      if (url) uploadedUrls.push(url);
    }

    const pptFile = e.target.pptx?.files?.[0];
    const pptUrl = pptFile ? await handleFileUpload(pptFile, 'projects') : null;

    const submissionData = {
      team_name: user.teamName || `Individual-${session.user.id}`,
      project_name: formData.get('projectName'),
      description: formData.get('description'),
      github_url: formData.get('github'),
      demo_url: formData.get('demo'),
      submitted_by: session.user.id,
      image_urls: uploadedUrls,
      ppt_link: pptUrl
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
      const createdTeams = [];

      for (let i = 0; i < shuffled.length; i += groupSize) {
        const group = shuffled.slice(i, i + groupSize);

        if (group.length === 1 && createdTeams.length > 0) {
          // Merge leftover single user into the last created team
          const lastTeam = createdTeams[createdTeams.length - 1];
          const singleUser = group[0];
          await supabase
            .from('profiles')
            .update({
              team_id: lastTeam.id,
              team_name: lastTeam.name,
              team_status: 'team',
              needs_teaming: false
            })
            .eq('id', singleUser.id);
          continue;
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
        createdTeams.push({ id: newTeam.id, name: teamName });

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

  const promoteWaitlistedUsers = async () => {
    try {
      const { data: currentVenues } = await supabase.from('venues').select('*');
      const { data: attendees } = await supabase.from('profiles').select('*').eq('user_role', 'attendee');
      if (!currentVenues || !attendees) return;

      const venueOccupancy = {};
      currentVenues.forEach(v => {
        venueOccupancy[v.name] = {
          capacity: parseInt(v.capacity) || 0,
          currentCount: attendees.filter(a => a.venue === v.name).length
        };
      });

      const waitlisted = attendees.filter(a => a.venue === 'Waitlisted/Overflow');
      if (waitlisted.length === 0) return;

      const waitlistTeams = {};
      waitlisted.forEach(a => {
        const tid = a.team_id || `solo-${a.id}`;
        if (!waitlistTeams[tid]) waitlistTeams[tid] = [];
        waitlistTeams[tid].push(a);
      });

      let promotionsCount = 0;

      for (const tid in waitlistTeams) {
        const members = waitlistTeams[tid];
        const size = members.length;
        const pref = members[0].preferred_venue || currentVenues[0]?.name;

        let targetVenue = null;
        if (venueOccupancy[pref] && (venueOccupancy[pref].currentCount + size) <= venueOccupancy[pref].capacity) {
          targetVenue = pref;
        } else {
          targetVenue = Object.keys(venueOccupancy).find(vName => 
            (venueOccupancy[vName].currentCount + size) <= venueOccupancy[vName].capacity
          );
        }

        if (targetVenue) {
          venueOccupancy[targetVenue].currentCount += size;
          promotionsCount += size;
          for (const m of members) {
            await supabase.from('profiles').update({ venue: targetVenue }).eq('id', m.id);
          }
        }
      }

      if (promotionsCount > 0) {
        console.log(`Successfully promoted ${promotionsCount} waitlisted users to open venue spots.`);
        fetchAllUsers();
      }
    } catch (error) {
      console.error('Error promoting waitlisted users:', error);
    }
  };

  const handleDownloadCSV = () => {
    const filtered = allUsers.filter(u => {
      if (userRoleFilter === 'all') return true;
      return u.user_role === userRoleFilter;
    });

    if (filtered.length === 0) {
      alert('No users found for this filter.');
      return;
    }

    const headers = ['Full Name', 'Email', 'Role', 'Role Title', 'Venue', 'Phone', 'College/Org', 'Team Name', 'Verified Status', 'LinkedIn', 'Tech Stack', 'Bio'];
    
    const rows = filtered.map(u => [
      u.full_name || '',
      u.email || '',
      u.user_role || '',
      u.role_title || '',
      u.venue || 'Unassigned',
      u.phone || '',
      u.college || u.venue || '',
      u.team_name || '',
      u.is_approved ? 'Verified' : (u.user_role === 'attendee' ? 'Active' : 'Pending'),
      u.linkedin || '',
      Array.isArray(u.stack) ? u.stack.join(', ') : '',
      u.bio || ''
    ]);

    const csvContent = [
      headers.map(h => `"${h.replace(/"/g, '""')}"`).join(','),
      ...rows.map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `starlet_users_${userRoleFilter}_export.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleManualVenueChange = async (userId, newVenue) => {
    const { error } = await supabase.from('profiles').update({ venue: newVenue }).eq('id', userId);
    if (error) alert(error.message);
    else {
      fetchAllUsers();
      await promoteWaitlistedUsers();
    }
  };

  const handleTeamVenueChange = async (teamName, newVenue) => {
    const teamMembers = allUsers.filter(u => u.team_name === teamName);
    for (const member of teamMembers) {
      await supabase.from('profiles').update({ venue: newVenue }).eq('id', member.id);
    }
    alert(`Team ${teamName} relocated to ${newVenue}`);
    fetchAllUsers();
    await promoteWaitlistedUsers();
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

  const handleCreateTeam = async (teamNameInput) => {
    if (!teamNameInput || !teamNameInput.trim()) {
      alert('Please enter a valid team name.');
      return;
    }
    const teamName = teamNameInput.trim();
    setLoading(true);

    try {
      const { data: existingTeam } = await supabase
        .from('teams')
        .select('id')
        .eq('name', teamName)
        .maybeSingle();

      let finalTeamId = null;
      if (existingTeam) {
        finalTeamId = existingTeam.id;
      } else {
        const { data: newTeam, error: newTeamError } = await supabase
          .from('teams')
          .insert([{ name: teamName }])
          .select()
          .single();
        if (newTeamError) throw newTeamError;
        if (newTeam) finalTeamId = newTeam.id;
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          team_id: finalTeamId,
          team_name: teamName,
          team_status: 'team',
          needs_teaming: false
        })
        .eq('id', session.user.id);

      if (profileError) throw profileError;

      alert(`Successfully joined/created team: ${teamName}`);
      fetchProfile(session.user.id);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTeammate = async (emailInput) => {
    if (!emailInput || !emailInput.trim()) {
      alert('Please enter a valid email.');
      return;
    }
    const email = emailInput.trim().toLowerCase();
    
    if (teamMembers.length >= 4) {
      alert('Your team is already full (maximum 4 members).');
      return;
    }

    setLoading(true);

    try {
      const { data: isWhitelisted } = await supabase
        .from('registered_emails')
        .select('email')
        .eq('email', email)
        .maybeSingle();

      if (!isWhitelisted) {
        alert('This email is not registered in our records for Starlet 5.0.');
        setLoading(false);
        return;
      }

      const { data: targetUser } = await supabase
        .from('profiles')
        .select('id, full_name, team_name')
        .eq('email', email)
        .maybeSingle();

      if (!targetUser) {
        alert(`User has not registered on the web portal yet. Please tell them to register using your team name: "${user.teamName}".`);
        setLoading(false);
        return;
      }

      if (targetUser.team_name) {
        alert(`${targetUser.full_name} is already in a team ("${targetUser.team_name}").`);
        setLoading(false);
        return;
      }

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          team_id: user.teamId,
          team_name: user.teamName,
          team_status: 'team',
          needs_teaming: false
        })
        .eq('id', targetUser.id);

      if (updateError) throw updateError;

      alert(`Successfully added ${targetUser.full_name} to your team!`);
      fetchMyTeamMembers();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCustomTrack = async () => {
    if (!customTrackTitle || !customTrackTitle.trim()) {
      alert('Please enter a title for your custom track.');
      return;
    }
    if (!customTrackDesc || !customTrackDesc.trim()) {
      alert('Please enter a description for your custom track.');
      return;
    }

    setLoading(true);
    try {
      const { data: newTrack, error: insertError } = await supabase
        .from('problem_statements')
        .insert([{
          title: customTrackTitle.trim(),
          description: customTrackDesc.trim(),
          track_category: 'Other'
        }])
        .select()
        .single();

      if (insertError) throw insertError;

      if (newTrack) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ problem_statement_id: newTrack.id })
          .eq('id', session.user.id);

        if (profileError) throw profileError;

        alert('Custom track saved and locked!');
        
        const { data: updatedPS } = await supabase.from('problem_statements').select('*').order('created_at');
        if (updatedPS) setProblemStatements(updatedPS);
        fetchProfile(session.user.id);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
      setIsOtherTrackSelected(false);
      setCustomTrackTitle('');
      setCustomTrackDesc('');
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
      await promoteWaitlistedUsers();
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
          .upsert([
            {
              id: authData.user.id,
              full_name: fullName,
              email: email,
              user_role: signupRole,
              role_title: roleTitle,
              bio: bio,
              stack: techStack ? techStack.split(',').map(s => s.trim()) : [],
              college: college,
              avatar_url: avatarUrl,
              team_id: finalTeamId,
              team_status: signupRole === 'attendee' ? teamStatus : null,
              needs_teaming: signupRole === 'attendee' ? needsTeaming : false,
              team_name: signupRole === 'attendee' ? teamName : null,
              is_approved: signupRole === 'attendee'
            }
          ], { onConflict: 'id' });
        if (profileError) throw profileError;

        // Log the signup action for admin awareness
        if (signupRole === 'mentor') {
          await supabase.from('audit_logs').insert([{
            admin_id: authData.user.id, // Using the new user's ID as a placeholder for non-admin action
            action: 'New Mentor Signup',
            details: { name: fullName, email: email }
          }]);
        }
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
      window.history.replaceState(null, document.title, window.location.pathname);
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

  const handleDeleteUser = async (userId, name) => {
    if (!confirm(`Are you sure you want to remove ${name} from the galaxy? This action is irreversible.`)) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (error) throw error;

      alert(`${name} has been successfully removed.`);
      fetchAllUsers(); // Refresh the list
      logAction('Deleted User', { name, userId });
      await promoteWaitlistedUsers();
    } catch (error) {
      alert('Failed to remove user: ' + error.message);
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

    // Temporarily remove CSS transform so html2canvas captures at true A4 size
    const prevTransform = input.style.transform;
    const prevMarginBottom = input.style.marginBottom;
    input.style.transform = 'none';
    input.style.marginBottom = '0';

    try {
      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#fffdf5'
      });

      // Restore transform after capture
      input.style.transform = prevTransform;
      input.style.marginBottom = prevMarginBottom;

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
      // Restore transform even on error
      input.style.transform = prevTransform;
      input.style.marginBottom = prevMarginBottom;
      console.error('Error generating PDF:', error);
      alert('Failed to generate certificate. Please try again.');
    }
  };


  const updateProfile = async () => {
    if (!session?.user?.id) return alert('Not logged in.');
    try {
      // 1. Update profiles table with existing columns
      const profileUpdates = {
        id: session.user.id,
        full_name: user.name,
        user_role: user.role,
        role_title: user.role_title,
        bio: user.bio,
        venue: user.venue,
        stack: user.stack,
        github_url: user.socials.github,
        linkedin_url: user.socials.linkedin,
        twitter_url: user.socials.twitter,
        website_url: user.website,
        years_of_experience: user.yearsOfExperience,
        languages: user.languages,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase.from('profiles').upsert(profileUpdates);
      if (error && !error.message.includes('column')) throw error;

      // 2. Also sync to mentors table if acting as mentor
      if (user.role === 'mentor' || (user.role === 'admin' && adminActiveTab === 'mentor')) {
        await supabase.from('mentors').update({
          full_name: user.name,
          role_title: user.role_title || 'Mentor & Admin',
          company: user.venue || 'Starlet Command',
          bio: user.bio,
          expertise: user.stack,
          avatar_url: user.avatarUrl || 'icons/user-profile.svg',
          website_url: user.website,
          years_of_experience: user.yearsOfExperience,
          languages: user.languages
        }).eq('profile_id', session.user.id);
        fetchAllMentors();
      }

      alert('Profile updated successfully!');
      originalUser.current = { ...user, socials: { ...user.socials } }; // reset dirty state
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

    // 1. Update mentors table where avatar_url definitely exists
    await supabase.from('mentors').update({ avatar_url: avatarUrl }).eq('profile_id', session.user.id);
    fetchAllMentors();

    // 2. Try updating profiles table (ignore error if column doesn't exist)
    try {
      await supabase.from('profiles').update({ avatar_url: avatarUrl }).eq('id', session.user.id);
    } catch (err) { /* ignore schema cache error */ }

    setUser(prev => ({ ...prev, avatarUrl }));
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

  const scrollGallery = (direction, e) => {
    try {
      let container = null;
      if (e && e.currentTarget) {
        const btn = e.currentTarget;
        const card = btn.closest('.gallery-section-venue');
        if (card) {
          container = card.querySelector('.venue-image-grid');
        }
      }
      if (!container) {
        container = galleryRef.current;
      }
      if (!container) return;

      const firstItem = container.querySelector('.venue-img-placeholder');
      let scrollAmount = container.clientWidth;

      if (firstItem) {
        const itemWidth = firstItem.offsetWidth;
        const containerStyle = getComputedStyle(container);
        const gap = parseFloat(containerStyle.gap || containerStyle.columnGap) || 24;
        scrollAmount = Math.round(itemWidth + gap);
      }

      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    } catch (err) {
      console.error("Error scrolling gallery:", err);
    }
  };


  if (loading) {
    return (
      <div className="splash-screen">
        <div className="splash-content">
          <div className="splash-logo-container">
            <img src="brand/Logo.png" alt="Starlet" className="splash-logo" />
          </div>
          <div className="splash-text">INITIALIZING QUANTUM LINK...</div>
          <div className="splash-loading-container">
            <div className="splash-loading-bar" style={{ width: `${loadingProgress}%`, transition: 'width 0.3s ease-out', animation: 'none' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">


      {/* Registration Popup */}
      {showRegPopup && (
        <div className="modal-overlay" onClick={() => setShowRegPopup(false)}>
          <div className="registration-modal" onClick={e => e.stopPropagation()}>
            <div className="close-modal" onClick={() => setShowRegPopup(false)}>
              <img src="icons/close.svg" alt="close" />
            </div>
            <div className="registration-modal-content">
              <div className="registration-modal-header" style={{ padding: '1rem', borderBottom: '3px solid var(--text-navy)', background: 'var(--yellow-star)' }}>
                <h2 className="text-3d" style={{ fontSize: '1.2rem', margin: 0, textAlign: 'center' }}>Registration Form</h2>
              </div>
              <div className="form-iframe-container" style={{ flex: 1, overflowY: 'auto', background: 'var(--bg-cream)' }}>
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLScpTSmn2W3htUW6o2oy7Qnb1g5JGGGdVeV1E950b0lpJHTaaw/viewform?embedded=true"
                  width="100%"
                  height="1600"
                  frameBorder="0"
                  marginHeight="0"
                  marginWidth="0"
                  title="Starlet 5.0 Registration Form"
                >
                  Loading…
                </iframe>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSplash && (
        <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
          <div className="splash-content">
            <div className="splash-logo-container">
              <img src="brand/Logo.png" alt="Starlet Logo" className="splash-logo" />
              <div className="splash-stars">
                <span className="splash-star s1">✦</span>
                <span className="splash-star s2">✧</span>
                <span className="splash-star s3">✦</span>
              </div>
            </div>
            <h1 className="text-3d splash-title">STARLET 5.0</h1>
            <div className="splash-loading-container">
              <div className="splash-loading-bar" style={{ width: `${loadingProgress}%`, transition: 'width 0.3s ease-out', animation: 'none' }}></div>
            </div>
            <p className="handwritten splash-text">Igniting your creativity...</p>
          </div>
          <div className="splash-footer handwritten">
            <img src="brand/Mind Empowered.gif" alt="Mind Empowered" style={{ height: '30px', verticalAlign: 'middle', marginRight: '10px', borderRadius: '5px' }} />
            A Mind Empowered Initiative
          </div>
        </div>
      )}

      {/* Floating Sparkles */}
      <div className="sparkle s1">✦</div>
      <div className="sparkle s2">✧</div>
      <div className="sparkle s3">✦</div>

      <header className={activeView !== 'landing' && activeView !== 'sponsors-overview' && activeView !== 'profile' ? 'header-minimal' : ''}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <div className="logo-circle" onClick={() => setActiveView('landing')} style={{ cursor: 'pointer' }}>
            <img src="brand/Logo.png" alt="Starlet Logo" />
          </div>
          {(activeView === 'profile' || activeView === 'sponsors-overview') && (
            <span className="logo-text-starlet" onClick={() => setActiveView('landing')} style={{ cursor: 'pointer' }}>
              Starlet
            </span>
          )}
        </div>

        {activeView === 'landing' && (
          <>
            <nav className={`nav-links ${isMenuOpen ? 'mobile-active' : ''}`}>
              <a href="#mission" className="nav-link" onClick={() => setIsMenuOpen(false)}>Mission</a>
              <a href="#tracks" className="nav-link" onClick={() => setIsMenuOpen(false)}>Tracks</a>
              <a href="#timeline" className="nav-link" onClick={() => setIsMenuOpen(false)}>Timeline</a>

              <a href="#rules" className="nav-link" onClick={() => setIsMenuOpen(false)}>Rules</a>
              <a href="#sponsors" className="nav-link" onClick={() => setIsMenuOpen(false)}>Sponsors</a>
              <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); setActiveView('sponsors-overview'); setIsMenuOpen(false); }}>UIC Overview</a>

              <div className="mobile-auth-wrapper">
                {isLoggedIn ? (
                  <>
                    <div className="mobile-profile-link" onClick={() => { setActiveView('venue'); setIsMenuOpen(false); }}>
                      <img src="icons/location.svg" alt="venue" />
                      <span>Venue Details</span>
                    </div>
                    <div className="mobile-profile-link" onClick={() => { setActiveView('profile'); setIsMenuOpen(false); }}>
                      <img src="icons/user-profile.svg" alt="profile" />
                      <span>My Profile</span>
                    </div>
                  </>
                ) : (
                  <div className="mobile-auth-btns">
                    <div className="login-btn" onClick={() => { setActiveView('login'); setIsMenuOpen(false); }}>LOGIN</div>
                    <div className="join-btn" onClick={() => { setActiveView('signup'); setIsMenuOpen(false); }}>SIGN UP</div>
                  </div>
                )}
              </div>
            </nav>

            <div className="header-actions">
              <div className="desktop-auth-btns">
                {isLoggedIn ? (
                  <>
                    <img
                      src="icons/location.svg"
                      className="nav-icon-btn"
                      alt="venue"
                      onClick={() => setActiveView('venue')}
                      title="Venue Details"
                    />
                    <img
                      src="icons/user-profile.svg"
                      className="nav-icon-btn"
                      alt="profile"
                      onClick={() => setActiveView('profile')}
                      title="My Profile"
                    />
                  </>
                ) : (
                  <>
                    <div className="login-btn" onClick={() => setActiveView('login')}>LOGIN</div>
                    <div className="join-btn" onClick={() => setActiveView('signup')}>SIGN UP</div>
                  </>
                )}
              </div>

              <div className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <img src={isMenuOpen ? "icons/close.svg" : "icons/hamburger.svg"} alt="menu" />
              </div>
            </div>
          </>
        )}

        {activeView === 'sponsors-overview' && (
          <>
            <nav className={`nav-links ${isMenuOpen ? 'mobile-active' : ''}`}>
              <a href="pdf/Milaap%202026%20Starlet%20.pdf" download="Milaap 2026 Starlet.pdf" className="nav-link" onClick={() => setIsMenuOpen(false)}>Milaap 2026 Starlet PDF</a>
              <a href="pdf/Starlet%205.0%20adishankara.pdf" download="Starlet 5.0 adishankara.pdf" className="nav-link" onClick={() => setIsMenuOpen(false)}>Starlet 5.0 Adi Shankara PDF</a>
            </nav>
            <div className="header-actions">
              <div 
                className="nav-btn-round" 
                onClick={() => setActiveView('landing')} 
                title="Back to Home"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <div className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <img src={isMenuOpen ? "icons/close.svg" : "icons/hamburger.svg"} alt="menu" />
              </div>
            </div>
          </>
        )}

        {activeView === 'profile' && (
          <>
            <nav className={`nav-links profile-nav-links ${isMenuOpen ? 'mobile-active' : ''}`}>
              {/* Profile nav is empty except on mobile where we might want something, or just leave it empty if we use header-actions */}
            </nav>

            <div className="header-actions">
              <div className="profile-header-icons">
                {user.role === 'admin' && (
                  <div
                    className="nav-btn-round profile-switch-btn"
                    onClick={() => setAdminActiveTab(adminActiveTab === 'admin' ? 'mentor' : 'admin')}
                    title={adminActiveTab === 'admin' ? 'Switch to Mentor View' : 'Switch to Admin View'}
                    style={{ borderColor: 'var(--yellow-primary)', color: 'var(--yellow-primary)' }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 3L3 8l5 5"></path>
                      <path d="M3 8h18"></path>
                      <path d="M16 21l5-5-5-5"></path>
                      <path d="M21 16H3"></path>
                    </svg>
                  </div>
                )}

                <div
                  className="nav-btn-round"
                  onClick={() => setActiveView('landing')}
                  title="Back to Home"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </div>

                <div
                  className="nav-btn-round"
                  onClick={(e) => { e.preventDefault(); handleLogout(); setIsMenuOpen(false); }}
                  title="Logout"
                  style={{ borderColor: 'var(--pink-primary)', color: 'var(--pink-primary)' }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                </div>
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
                A place where your ideas make you a star
              </div>
              <div className="handwritten" style={{ fontSize: '1.4rem', color: 'var(--text-navy)', margin: '1rem auto 3.5rem', background: 'rgba(255, 253, 240, 0.9)', padding: '0.8rem 2rem', borderRadius: '15px', border: '2px dashed var(--text-navy)', display: 'inline-block', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)' }}>
                In Collaboration with <strong>Adi Shankara</strong>, <strong>NSS ASIET</strong> & <strong>Aikyam Space</strong>
              </div>

              <div className="hero-ctas">
                <button className="join-btn" onClick={() => setShowRegPopup(true)}>REGISTER NOW</button>
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
                        Don't forget your laptops! <img src="icons/laptop.svg" className="inline-icon" alt="laptop" />
                      </div>
                      <h3 className="whiteboard-title handwritten">Starlet 5.0 Timeline</h3>
                      <div className="handwritten">
                        <div className="timeline-event">
                          <span className="timeline-date">July 11th, Sat</span>
                          <span className="timeline-desc">Day 1: 8:00am - 5:00pm - Kickoff, Ideation & Coding <img src="icons/rocket.svg" className="inline-icon" alt="rocket" /></span>
                        </div>
                        <div className="timeline-event">
                          <span className="timeline-date">July 12th, Sun</span>
                          <span className="timeline-desc">Day 2: 8:00am - 5:00pm - Finalizing, Pitches & Awards <img src="icons/trophy.svg" className="inline-icon" alt="trophy" /></span>
                        </div>
                      </div>
                    </div>
                  ) : section.type === 'rules' ? (
                    <div className="section-content rules-hazard-box">
                      <div className="rules-hazard-inner">
                        <h2 className="text-3d warning-title" style={{ fontSize: '3rem' }}>
                          <img src="icons/warning.svg" className="title-icon" alt="warning" /> RULES & REGS
                        </h2>
                        <div className="rules-grid">
                          <div className="warning-item" style={{ "--r": -1 }}>
                            <div className="warning-icon"><img src="icons/users.svg" className="card-icon" alt="users" /></div>
                            <p><strong>TEAM FORMATION:</strong> Participants form teams of 3 to 4 members. Registering solo? The organizers will create a team for you!</p>
                          </div>
                          <div className="warning-item" style={{ "--r": 1.5 }}>
                            <div className="warning-icon"><img src="icons/warning.svg" className="card-icon" alt="warning" /></div>
                            <p><strong>REGISTRATION & FEES:</strong> Everyone must submit the registration form with a fee payment screenshot. Registration fees are strictly non-refundable.</p>
                          </div>
                          <div className="warning-item" style={{ "--r": -0.8 }}>
                            <div className="warning-icon"><img src="icons/laptop.svg" className="card-icon" alt="laptop" /></div>
                            <p><strong>CODE ORIGINALITY:</strong> All projects must be built from scratch during hackathon hours. Pre-existing code is prohibited, except open-source libraries or frameworks.</p>
                          </div>
                          <div className="warning-item" style={{ "--r": 1.2 }}>
                            <div className="warning-icon"><img src="icons/rocket.svg" className="card-icon" alt="rocket" /></div>
                            <p><strong>THEMES & SCOPE:</strong> Projects must align with official hackathon problem statements and guidelines. Teams own their original code and assets.</p>
                          </div>
                          <div className="warning-item" style={{ "--r": -1.2 }}>
                            <div className="warning-icon"><img src="icons/users.svg" className="card-icon" alt="users" /></div>
                            <p><strong>COLLABORATION POWER:</strong> Cross-team collaboration is highly encouraged and will win extra points! Seek advice and guidance from mentors and organizers.</p>
                          </div>
                          <div className="warning-item" style={{ "--r": 0.8 }}>
                            <div className="warning-icon"><img src="icons/calendar.svg" className="card-icon" alt="calendar" /></div>
                            <p><strong>SUBMISSION DEADLINE:</strong> Submit project documentation, source code, and presentation before the deadline. Late submissions face penalties or disqualification.</p>
                          </div>
                          <div className="warning-item" style={{ "--r": -1.5 }}>
                            <div className="warning-icon"><img src="icons/trophy.svg" className="card-icon" alt="trophy" /></div>
                            <p><strong>THE PITCH & JUDGING:</strong> Present your project functionality and innovation to the panel. Judging criteria are clear, and the judges' decision is final.</p>
                          </div>
                          <div className="warning-item" style={{ "--r": 1 }}>
                            <div className="warning-icon"><img src="icons/warning.svg" className="card-icon" alt="warning" /></div>
                            <p><strong>FAIR PLAY & CONDUCT:</strong> Uphold inclusivity, respect, and professional ethics. Any form of cheating, plagiarism, or harassment results in immediate disqualification.</p>
                          </div>
                          <div className="warning-item" style={{ "--r": -0.5 }}>
                            <div className="warning-icon"><img src="icons/laptop.svg" className="card-icon" alt="laptop" /></div>
                            <p><strong>CODE VALIDATION:</strong> Organizers may conduct code validation to ensure development took place within the allotted timeframe and complies with all regulations.</p>
                          </div>
                          <div className="warning-item" style={{ "--r": 1.4 }}>
                            <div className="warning-icon"><img src="icons/warning.svg" className="card-icon" alt="warning" /></div>
                            <p><strong>TERMS & CONSENT:</strong> Organizers hold no liability for equipment or losses. Participants consent to promotional media release; organizer arbitration decisions are final.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : section.type === 'tracks' ? (
                    <div className="section-content">
                      <h2 className="text-3d" style={{ fontSize: '2.5rem' }}>{section.title}</h2>
                      <p style={{ marginBottom: '2rem', maxWidth: '800px' }}>{section.content}</p>
                      
                      {(() => {
                        const officialTracks = problemStatements.filter(ps => ps.track_category !== 'Other');
                        const otherCard = {
                          id: 'other',
                          title: 'Other (Define your own track...)',
                          description: "Do you have a unique assistive technology or inclusive innovation challenge in mind that isn't listed here? Starlet 5.0 encourages participants to define their own custom tracks! Once registered and logged in, you can specify and lock your own track directly from your attendee profile dashboard.",
                          track_category: 'Other'
                        };
                        const allTracks = [...officialTracks, otherCard];

                        if (officialTracks.length === 0) {
                          return (
                            <div className="empty-state" style={{ gridColumn: '1 / -1', color: '#fff' }}>
                              <p>Innovation tracks are currently being finalized. Stay tuned!</p>
                            </div>
                          );
                        }

                        const displayedTracks = isMobile 
                          ? allTracks.slice(0, visibleLandingTracksCount)
                          : allTracks;

                        return (
                          <>
                            <div className="tracks-grid-interactive">
                              {displayedTracks.map((track, i) => (
                                <div key={track.id} className="track-card-mini" onClick={() => setSelectedTrack({ ...track, index: track.id === 'other' ? 'Other' : i + 1 })}>
                                  <div className="track-card-inner">
                                    <span className="track-number">{track.id === 'other' ? '★' : `#${i + 1}`}</span>
                                    <h3>{track.title}</h3>
                                    <div className="view-details-tag">VIEW CHALLENGE →</div>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {isMobile && allTracks.length > 3 && (
                              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                {visibleLandingTracksCount < allTracks.length && (
                                  <button 
                                    className="join-btn" 
                                    onClick={() => setVisibleLandingTracksCount(prev => prev + 3)}
                                  >
                                    SHOW MORE
                                  </button>
                                )}
                                {visibleLandingTracksCount > 3 && (
                                  <button 
                                    className="btn-secondary" 
                                    onClick={() => setVisibleLandingTracksCount(prev => Math.max(prev - 3, 3))}
                                  >
                                    SHOW LESS
                                  </button>
                                )}
                              </div>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  ) : section.type === 'sponsors' ? (
                    <div className="section-content">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '1.5rem' }}>
                        <h2 className="text-3d" style={{ fontSize: '2.5rem', margin: 0 }}>{section.title}</h2>
                        <div className="mobile-scroll-btns" style={{ display: 'flex', gap: '1rem' }}>
                          <button className="nav-btn-round" onClick={() => partnersRef.current?.scrollBy({ left: -300, behavior: 'smooth' })}>←</button>
                          <button className="nav-btn-round" onClick={() => partnersRef.current?.scrollBy({ left: 300, behavior: 'smooth' })}>→</button>
                        </div>
                      </div>
                      
                      {/* Organizers & Collaborators Grid */}
                      <div className="partners-grid-custom" ref={partnersRef}>
                        <div className="partner-card-square main-org clickable" onClick={() => setShowAboutPopup(true)}>
                          <span className="badge-main" style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%) rotate(-2deg)', zIndex: 2 }}>MAIN ORGANIZER</span>
                          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', borderRadius: '26px', zIndex: 1 }}>
                            <img src="brand/Mind Empowered.gif" alt="Mind Empowered" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                        </div>

                        <div className="partner-card-wide clickable" onClick={() => setShowAdiPopup(true)}>
                          <span className="badge-main" style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%) rotate(-2deg)', zIndex: 2, background: 'var(--pink-primary)' }}>COLLABORATOR</span>
                          <img src="collaborators/adi sankara.png" alt="Adi Shankara" loading="lazy" style={{ height: '90px', width: 'auto', maxWidth: '100%', objectFit: 'contain', marginTop: '1.5rem' }} />
                          <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: '0.8rem', color: '#555', fontWeight: 'bold', margin: 0 }}>MAIN VENUE PARTNER</p>
                          </div>
                        </div>

                        <div className="partner-card-wide clickable" onClick={() => setShowAikyamPopup(true)}>
                          <span className="badge-main" style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%) rotate(-2deg)', zIndex: 2, background: 'var(--pink-primary)' }}>COLLABORATOR</span>
                          <img src="collaborators/aikyam.webp" alt="Aikyam Space" loading="lazy" style={{ height: '90px', width: 'auto', maxWidth: '100%', objectFit: 'contain', marginTop: '1.5rem' }} />
                          <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: '0.8rem', color: '#555', fontWeight: 'bold', margin: 0 }}>VENUE PARTNER</p>
                          </div>
                        </div>

                        <div className="partner-card-square collab-nss">
                          <span className="badge-main" style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%) rotate(-2deg)', zIndex: 2, background: 'var(--pink-primary)' }}>COLLABORATOR</span>
                          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', borderRadius: '26px', zIndex: 1 }}>
                            <img src="collaborators/nss.png" alt="NSS ASIET" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                        </div>
                      </div>

                      {/* Sponsor Placeholders Section
                      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                        <h3 className="handwritten" style={{ fontSize: '2rem', color: 'var(--text-navy)', marginBottom: '1.5rem' }}>Sponsors</h3>
                        <div className="sponsor-grid">
                          {[1, 2, 3, 4].map(i => (
                            <div key={i} className="sponsor-placeholder" style={{ height: '120px' }}>
                              YOUR LOGO HERE
                            </div>
                          ))}
                        </div>
                      </div>
                      */}
                    </div>
                  ) : section.type === 'gallery' ? (
                    <div className="section-content">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <h2 className="text-3d" style={{ fontSize: '2.5rem', margin: 0 }}>{section.title}</h2>
                        <div className="gallery-nav-btns" style={{ display: 'flex', gap: '1rem' }}>
                          <button className="nav-btn-round" onClick={() => landingGalleryRef.current.scrollBy({ left: -400, behavior: 'smooth' })}>←</button>
                          <button className="nav-btn-round" onClick={() => landingGalleryRef.current.scrollBy({ left: 400, behavior: 'smooth' })}>→</button>
                        </div>
                      </div>
                      <div className="gallery-grid" ref={landingGalleryRef} style={{ overflowX: 'auto', display: 'flex', scrollBehavior: 'smooth', padding: '1rem 0' }}>
                        {Array.from({ length: 42 }, (_, i) => {
                          const index = i + 1;
                          const path = index <= 9 ? `gallery/${index}.JPG` : `gallery/${index}.jpeg`;
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
                                height: '200px',
                                width: '100%',
                                overflow: 'hidden',
                                display: 'block'
                              }}>
                                <img 
                                  src={path} 
                                  alt={caption} 
                                  loading="lazy" 
                                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                                />
                              </div>
                              <div className="polaroid-caption">{caption}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : section.type === 'prizes' ? (
                    <div className="section-content">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '1.5rem' }}>
                        <h2 className="text-3d" style={{ fontSize: '2.5rem', margin: 0 }}>{section.title}</h2>
                        <div className="mobile-scroll-btns" style={{ display: 'flex', gap: '1rem' }}>
                          <button className="nav-btn-round" onClick={() => prizesRef.current?.scrollBy({ left: -300, behavior: 'smooth' })}>←</button>
                          <button className="nav-btn-round" onClick={() => prizesRef.current?.scrollBy({ left: 300, behavior: 'smooth' })}>→</button>
                        </div>
                      </div>
                      <div className="prize-grid" ref={prizesRef}>
                        <div className="prize-card">
                          <div className="prize-icon"><img src="icons/trophy.svg" style={{ width: '80px' }} alt="trophy" /></div>
                          <h3 className="text-3d" style={{ fontSize: '1.5rem' }}>1st Prize</h3>
                          <p>₹15,000</p>
                        </div>
                        <div className="prize-card">
                          <div className="prize-icon"><img src="icons/trophy.svg" style={{ width: '70px', opacity: 0.7 }} alt="trophy" /></div>
                          <h3 className="text-3d" style={{ fontSize: '1.5rem' }}>2nd Prize</h3>
                          <p>₹10,000</p>
                        </div>
                        <div className="prize-card">
                          <div className="prize-icon"><img src="icons/trophy.svg" style={{ width: '60px', opacity: 0.5 }} alt="trophy" /></div>
                          <h3 className="text-3d" style={{ fontSize: '1.5rem' }}>3rd Prize</h3>
                          <p>₹7,500</p>
                        </div>
                        <div className="prize-card">
                          <div className="prize-icon"><img src="icons/laptop.svg" style={{ width: '60px', opacity: 0.8 }} alt="innovation" /></div>
                          <h3 className="text-3d" style={{ fontSize: '1.5rem' }}>Best Innovation</h3>
                          <p>₹7,500</p>
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
                        <form className="contact-form" onSubmit={handleContactSubmit}>
                          <input type="text" name="contactName" placeholder="Your Name" />
                          <input type="email" name="contactEmail" placeholder="Your Email" />
                          <textarea name="contactDesc" placeholder="How can we help?"></textarea>
                          <button type="submit" className="join-btn" style={{ width: 'fit-content' }}>SEND MESSAGE</button>
                        </form>

                        <div className="contact-socials">
                          <h3 className="handwritten social-title">Follow our journey!</h3>
                          <p>Join our community of 5,000+ creators on social media.</p>
                          <div className="social-grid">
                            <a href="https://www.instagram.com/mind.empowered/" className="social-item instagram">
                              <img src="icons/instagram.svg" alt="Instagram" />
                              <span>Instagram</span>
                            </a>
                            
                            <a href="https://www.linkedin.com/company/mind-empowered/" className="social-item linkedin">
                              <img src="icons/linkedin.svg" alt="LinkedIn" />
                              <span>LinkedIn</span>
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
                      <div className="mentors-section-header">
                        <h2 className="text-3d" style={{ fontSize: '2.5rem' }}>{section.title}</h2>
                        {mentors.length > 0 && (
                          <div className="mentor-header-nav">
                            <button 
                              className="mentor-nav-button prev" 
                              onClick={() => {
                                if (mentorGridRef.current) {
                                  mentorGridRef.current.scrollBy({ left: -368, behavior: 'smooth' });
                                }
                              }}
                              aria-label="Previous mentors"
                            >
                              ←
                            </button>
                            <button 
                              className="mentor-nav-button next" 
                              onClick={() => {
                                if (mentorGridRef.current) {
                                  mentorGridRef.current.scrollBy({ left: 368, behavior: 'smooth' });
                                }
                              }}
                              aria-label="Next mentors"
                            >
                              →
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="mentor-carousel-wrapper">
                        <div className="mentor-grid" ref={mentorGridRef}>
                          {mentors.length === 0 ? (
                            <p style={{ color: '#fff', textAlign: 'center', gridColumn: '1 / -1' }}>Mentors are being onboarded. Check back soon!</p>
                          ) : (
                            mentors.map(mentor => (
                              <div key={mentor.id} className="mentor-card" onClick={() => setSelectedMentor(mentor)}>
                                <div className="mentor-photo-wrapper">
                                  <img src={mentor.avatar_url || "icons/user-profile.svg"} alt="mentor" loading="lazy" />
                                </div>
                                <h3>{mentor.full_name}</h3>
                                <p className="mentor-role">{mentor.role_title}</p>
                                <p className="mentor-company">{mentor.company}</p>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>

                  ) : (
                    <div className="section-content">
                      <h2 className="text-3d" style={{ fontSize: '2.5rem' }}>{section.title}</h2>
                      <div className="section-inner">
                        <p>{section.content}</p>
                        <div className="section-visual-small">
                          {section.image?.endsWith('.mp4') ? (
                            <video src={section.image} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <img src={section.image} alt={section.title} loading="lazy" />
                          )}
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
                <img src="brand/Logo.png" alt="Starlet" />
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
                &copy; 2026 Starlet 5.0 | A <img src="brand/Mind Empowered.gif" alt="Mind Empowered" style={{ height: '20px', verticalAlign: 'middle', margin: '0 5px', borderRadius: '3px' }} /> Mind Empowered Initiative
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
                      <img src={signupAvatarPreview || 'icons/user-profile.svg'} alt="preview" />
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
        <div className={user.role === 'admin' && adminActiveTab === 'admin' ? "admin-page-wrapper" : "profile-container"}>
          {user.role === 'admin' && adminActiveTab === 'admin' ? (
            /* ADMIN PROFILE VIEW */
            <div className="admin-dashboard-full">
              <div className="admin-header-row">
                <div>
                  <h1 className="text-3d" style={{ fontSize: '3.5rem' }}>Admin Command Center</h1>
                  <p className="handwritten" style={{ fontSize: '1.2rem' }}>Master control for the Starlet 5.0 galaxy!</p>
                </div>
              </div>

              <div className="admin-stats-strip">
                <div className="admin-stat-card">
                  <div className="stat-icon"><img src="icons/users.svg" alt="users" /></div>
                  <div className="stat-info">
                    <strong>{allUsers.length}</strong>
                    <span>Total Users</span>
                  </div>
                </div>
                <div className="admin-stat-card">
                  <div className="stat-icon"><img src="icons/trophy.svg" alt="verified" /></div>
                  <div className="stat-info">
                    <strong>{allUsers.filter(u => u.user_role === 'mentor' && u.is_approved).length}</strong>
                    <span>Verified Mentors</span>
                  </div>
                </div>
                <div
                  className="admin-stat-card warning"
                  style={{
                    cursor: allUsers.filter(u => u.user_role === 'mentor' && !u.is_approved).length > 0 ? 'pointer' : 'default'
                  }}
                  onClick={() => {
                    if (allUsers.filter(u => u.user_role === 'mentor' && !u.is_approved).length > 0) {
                      document.getElementById('pending-approval-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
                  <div className="stat-icon">
                    <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="var(--text-navy)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div className="stat-info">
                    <strong>{allUsers.filter(u => u.user_role === 'mentor' && !u.is_approved).length}</strong>
                    <span>Pending Approval</span>
                  </div>
                </div>
                <div className="admin-stat-card blue">
                  <div className="stat-icon"><img src="icons/warning.svg" alt="requests" /></div>
                  <div className="stat-info">
                    <strong>{mentorRequests.length}</strong>
                    <span>Active Requests</span>
                  </div>
                </div>
              </div>

              <div className="admin-actions-bar" style={{ marginBottom: '3rem'}}>
                <button className="join-btn" style={{ marginRight: '12px' }} onClick={() => { handleRunAutoTeaming(); logAction('Ran Auto-Teaming Algorithm'); }}>
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
                        <>
                          {problemStatements.slice(0, visibleProblemStatementsCount).map(ps => (
                            <div key={ps.id} className="approval-card" style={{ marginBottom: '1rem' }}>
                              <div className="user-meta">
                                <strong>{ps.title}</strong>
                                <small style={{ display: 'block', color: 'var(--blue-shadow)' }}>{ps.track_category}</small>
                                <p style={{ fontSize: '0.8rem', marginTop: '0.3rem' }}>{ps.description}</p>
                              </div>
                              <button className="btn-small delete" onClick={() => handleDeleteProblemStatement(ps.id)}>REMOVE</button>
                            </div>
                          ))}
                          
                          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'center' }}>
                            {problemStatements.length > visibleProblemStatementsCount && (
                              <button 
                                className="btn-small" 
                                style={{ background: 'var(--yellow-star)', color: 'var(--text-navy)', fontFamily: "'Fredoka One', cursive" }} 
                                onClick={() => setVisibleProblemStatementsCount(prev => prev + 5)}
                              >
                                SHOW MORE
                              </button>
                            )}
                            {visibleProblemStatementsCount > 5 && (
                              <button 
                                className="btn-small" 
                                style={{ background: '#eee', color: 'var(--text-navy)', fontFamily: "'Fredoka One', cursive" }} 
                                onClick={() => setVisibleProblemStatementsCount(5)}
                              >
                                SHOW LESS
                              </button>
                            )}
                          </div>
                        </>
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
                        <>
                          {mentors.slice(0, visibleActiveMentorsCount).map(m => (
                            <div key={m.id} className="approval-card" style={{ marginBottom: '1rem' }}>
                              <div className="user-meta">
                                <strong>{m.full_name}</strong>
                                <small style={{ display: 'block', color: 'var(--blue-shadow)' }}>{m.role_title} @ {m.company}</small>
                              </div>
                              <button className="btn-small delete" onClick={() => handleDeleteMentor(m.id, m.full_name)}>REMOVE</button>
                            </div>
                          ))}
                          
                          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'center' }}>
                            {mentors.length > visibleActiveMentorsCount && (
                              <button 
                                className="btn-small" 
                                style={{ background: 'var(--yellow-star)', color: 'var(--text-navy)', fontFamily: "'Fredoka One', cursive" }} 
                                onClick={() => setVisibleActiveMentorsCount(prev => prev + 5)}
                              >
                                SHOW MORE
                              </button>
                            )}
                            {visibleActiveMentorsCount > 5 && (
                              <button 
                                className="btn-small" 
                                style={{ background: '#eee', color: 'var(--text-navy)', fontFamily: "'Fredoka One', cursive" }} 
                                onClick={() => setVisibleActiveMentorsCount(5)}
                              >
                                SHOW LESS
                              </button>
                            )}
                          </div>
                        </>
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
                  <h2 className="text-3d" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Your Mentor Help Requests</h2>
                  <div className="request-list">
                    {mentorRequests.map(req => (
                      <div key={req.id} className="request-card" style={{ marginBottom: '1rem', background: 'var(--card-bg)', padding: '1rem', borderRadius: '12px' }}>
                        <div className="request-user">
                          <strong>{req.profiles?.full_name || 'Anonymous'}</strong>
                          <span> ({req.profiles?.email})</span>
                        </div>
                        <p className="request-msg" style={{ margin: '0.5rem 0' }}>"{req.message}"</p>
                        <div className="request-actions" style={{ display: 'flex', gap: '0.5rem' }}>
                          <button className="btn-small accept" onClick={() => handleAcceptRequest(req.id)}>ACCEPT</button>
                          <button className="btn-small decline" onClick={() => handleDeclineRequest(req.id)}>DECLINE</button>
                        </div>
                      </div>
                    ))}
                    {mentorRequests.length === 0 && <p className="empty-msg" style={{ opacity: 0.5 }}>No active help requests for you right now.</p>}
                  </div>
                </div>

                <div className="admin-panel mentor-queue" id="pending-approval-section">
                  <h2 className="text-3d" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Mentor Approval Queue</h2>
                  <div className="approval-list">
                    {(() => {
                      const pendingMentors = allUsers.filter(u => u.user_role === 'mentor' && !u.is_approved);
                      if (pendingMentors.length === 0) {
                        return (
                          <div className="empty-state">
                            <p>All clear! No pending mentors.</p>
                          </div>
                        );
                      }
                      return (
                        <>
                          {pendingMentors.slice(0, visiblePendingMentorsCount).map(mentor => (
                            <div key={mentor.id} className="approval-card">
                              <div className="user-meta">
                                <strong>{mentor.full_name}</strong>
                                <span>{mentor.email}</span>
                                <div className="role-tag">{mentor.role_title || 'Expert'}</div>
                              </div>
                              <button className="join-btn btn-approve" onClick={() => handleApproveMentor(mentor.id)}>APPROVE MENTOR</button>
                            </div>
                          ))}
                          
                          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'center' }}>
                            {pendingMentors.length > visiblePendingMentorsCount && (
                              <button 
                                className="btn-small" 
                                style={{ background: 'var(--yellow-star)', color: 'var(--text-navy)', fontFamily: "'Fredoka One', cursive" }} 
                                onClick={() => setVisiblePendingMentorsCount(prev => prev + 5)}
                              >
                                SHOW MORE
                              </button>
                            )}
                            {visiblePendingMentorsCount > 5 && (
                              <button 
                                className="btn-small" 
                                style={{ background: '#eee', color: 'var(--text-navy)', fontFamily: "'Fredoka One', cursive" }} 
                                onClick={() => setVisiblePendingMentorsCount(5)}
                              >
                                SHOW LESS
                              </button>
                            )}
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>

                <div className="admin-panel user-directory">
                  <div className="directory-header-row">
                    <h2 className="text-3d" style={{ fontSize: '1.5rem', margin: 0 }}>Global User Directory</h2>
                    <div className="directory-controls">
                      <div className="directory-filter-tabs">
                        <button
                          className={`directory-filter-btn ${userRoleFilter === 'all' ? 'active' : ''}`}
                          onClick={() => { setUserRoleFilter('all'); setVisibleUserCount(5); }}
                        >
                          ALL
                        </button>
                        <button
                          className={`directory-filter-btn ${userRoleFilter === 'mentor' ? 'active' : ''}`}
                          onClick={() => { setUserRoleFilter('mentor'); setVisibleUserCount(5); }}
                        >
                          MENTORS
                        </button>
                        <button
                          className={`directory-filter-btn ${userRoleFilter === 'attendee' ? 'active' : ''}`}
                          onClick={() => { setUserRoleFilter('attendee'); setVisibleUserCount(5); }}
                        >
                          ATTENDEES
                        </button>
                      </div>
                      <button className="directory-download-btn" onClick={handleDownloadCSV}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        DOWNLOAD CSV
                      </button>
                    </div>
                  </div>
                  
                  {(() => {
                    const filteredUsers = allUsers.filter(u => {
                      if (userRoleFilter === 'all') return true;
                      return u.user_role === userRoleFilter;
                    });
                    
                    return (
                      <>
                        <div className="user-table-wrapper">
                          <table className="admin-table">
                            <thead>
                              <tr>
                                <th>User</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Venue</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredUsers.slice(0, visibleUserCount).map(u => (
                                <React.Fragment key={u.id}>
                                  <tr className={expandedUserId === u.id ? 'expanded-row' : ''}>
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
                                      <div className="table-actions">
                                        <button
                                          className={`btn-table-action ${expandedUserId === u.id ? 'active' : ''}`}
                                          title="View details"
                                          onClick={() => setExpandedUserId(expandedUserId === u.id ? null : u.id)}
                                        >
                                          {expandedUserId === u.id ? 'HIDE ▲' : 'DETAILS ▼'}
                                        </button>
                                        <button
                                          className="btn-table-action delete"
                                          title="Delete user"
                                          onClick={() => handleDeleteUser(u.id, u.full_name)}
                                        >
                                          REMOVE
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                  {expandedUserId === u.id && (
                                    <tr key={`${u.id}-details`} className="user-details-row">
                                      <td colSpan={5}>
                                        <div className="user-details-dropdown">
                                          <div className="user-details-grid" style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '2rem', alignItems: 'start' }}>
                                            <div className="user-detail-photo">
                                              <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--pink-primary)', background: '#fff' }}>
                                                {u.avatar_url ? (
                                                  <img src={u.avatar_url} alt={u.full_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                ) : (
                                                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--yellow-star)', color: 'var(--text-navy)', fontSize: '2rem', fontWeight: 'bold' }}>
                                                    {u.full_name?.charAt(0)?.toUpperCase()}
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                            <div className="user-details-grid-fields" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem 2rem', width: '100%' }}>
                                            <div className="user-detail-item">
                                              <span className="detail-label">Full Name</span>
                                              <span className="detail-value">{u.full_name || '—'}</span>
                                            </div>
                                            <div className="user-detail-item">
                                              <span className="detail-label">Email</span>
                                              <span className="detail-value">{u.email || '—'}</span>
                                            </div>
                                            <div className="user-detail-item">
                                              <span className="detail-label">Role</span>
                                              <span className="detail-value" style={{ textTransform: 'capitalize' }}>{u.user_role || '—'}</span>
                                            </div>
                                            <div className="user-detail-item">
                                              <span className="detail-label">Role Title</span>
                                              <span className="detail-value">{u.role_title || '—'}</span>
                                            </div>
                                            <div className="user-detail-item">
                                              <span className="detail-label">Phone</span>
                                              <span className="detail-value">{u.phone || '—'}</span>
                                            </div>
                                            <div className="user-detail-item">
                                              <span className="detail-label">College / Org</span>
                                              <span className="detail-value">{u.college || u.venue || '—'}</span>
                                            </div>
                                            <div className="user-detail-item">
                                              <span className="detail-label">Team</span>
                                              <span className="detail-value">{u.team_name || '—'}</span>
                                            </div>
                                            <div className="user-detail-item">
                                              <span className="detail-label">Approval Status</span>
                                              <span className="detail-value" style={{ color: u.is_approved ? '#2e7d32' : '#c62828', fontWeight: 700 }}>
                                                {u.is_approved ? '✓ Verified' : '⏳ Pending'}
                                              </span>
                                            </div>
                                            {u.user_role === 'mentor' && (
                                              <>
                                                <div className="user-detail-item">
                                                  <span className="detail-label">LinkedIn</span>
                                                  <span className="detail-value">
                                                    {u.linkedin ? <a href={u.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue-shadow)' }}>{u.linkedin}</a> : '—'}
                                                  </span>
                                                </div>
                                                <div className="user-detail-item">
                                                  <span className="detail-label">Tech Stack</span>
                                                  <span className="detail-value">{Array.isArray(u.stack) && u.stack.length ? u.stack.join(', ') : '—'}</span>
                                                </div>
                                                <div className="user-detail-item" style={{ gridColumn: '1 / -1' }}>
                                                  <span className="detail-label">Bio</span>
                                                  <span className="detail-value">{u.bio || '—'}</span>
                                                </div>
                                              </>
                                            )}
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  )}
                                </React.Fragment>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        
                        {filteredUsers.length > 5 && (
                          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
                            {visibleUserCount < filteredUsers.length && (
                              <button 
                                className="join-btn" 
                                onClick={() => setVisibleUserCount(prev => Math.min(prev + 5, filteredUsers.length))}
                                style={{ padding: '0.8rem 2rem', fontSize: '1rem' }}
                              >
                                SHOW MORE ▼
                              </button>
                            )}
                            {visibleUserCount > 5 && (
                              <button 
                                className="join-btn" 
                                onClick={() => setVisibleUserCount(5)}
                                style={{ padding: '0.8rem 2rem', fontSize: '1rem', background: '#fff', color: 'var(--text-navy)' }}
                              >
                                SHOW LESS ▲
                              </button>
                            )}
                          </div>
                        )}
                      </>
                    );
                  })()}
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
                        {(() => {
                          const teamsList = Array.from(new Set(allUsers.filter(u => u.user_role === 'attendee').map(u => u.team_name || `Individual-${u.id}`)));
                          return teamsList.slice(0, visibleProjectSubmissionsCount).map(team => {
                            const sub = projectSubmissions.find(s => s.team_name === team);
                            return (
                              <tr key={team}>
                                <td>
                                  <strong>{getDisplayTeamName(team)}</strong>
                                  {sub && <p style={{ fontSize: '0.8rem', color: 'var(--blue-shadow)' }}>{sub.project_name}</p>}
                                </td>
                                <td>
                                  {sub ? (
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                      <a href={sub.github_url} target="_blank" rel="noreferrer" className="btn-small accept">CODE</a>
                                      <a href={sub.demo_url} target="_blank" rel="noreferrer" className="btn-small accept">DEMO</a>
                                      <a href={sub.ppt_link} target="_blank" rel="noreferrer" className="btn-small accept">PRESENTATION</a>
                                    </div>
                                  ) : '-'}
                                </td>
                                <td>
                                  <span className={`role-badge ${sub ? 'accept' : 'decline'}`}>
                                    {sub ? 'SUBMITTED' : 'PENDING'}
                                  </span>
                                </td>
                                <td>{sub ? new Date(sub.submitted_at).toLocaleString() : '-'}</td>
                              </tr>
                            );
                          });
                        })()}
                      </tbody>
                    </table>
                  </div>
                  
                  {(() => {
                    const teamsList = Array.from(new Set(allUsers.filter(u => u.user_role === 'attendee').map(u => u.team_name || `Individual-${u.id}`)));
                    if (teamsList.length > 5) {
                      return (
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'center' }}>
                          {teamsList.length > visibleProjectSubmissionsCount && (
                            <button 
                              className="btn-small" 
                              style={{ background: 'var(--yellow-star)', color: 'var(--text-navy)', fontFamily: "'Fredoka One', cursive" }} 
                              onClick={() => setVisibleProjectSubmissionsCount(prev => prev + 5)}
                            >
                              SHOW MORE
                            </button>
                          )}
                          {visibleProjectSubmissionsCount > 5 && (
                            <button 
                              className="btn-small" 
                              style={{ background: '#eee', color: 'var(--text-navy)', fontFamily: "'Fredoka One', cursive" }} 
                              onClick={() => setVisibleProjectSubmissionsCount(5)}
                            >
                              SHOW LESS
                            </button>
                          )}
                        </div>
                      );
                    }
                  })()}
                </div>
              </div>
            </div>

          ) : (user.role === 'mentor' || (user.role === 'admin' && adminActiveTab === 'mentor')) ? (
            /* MENTOR PROFILE VIEW */
            <>
              <div className="profile-sidebar">
                <div className="profile-avatar" style={{ position: 'relative' }}>
                  <img
                    src={user.avatarUrl || 'icons/user-profile.svg'}
                    alt="avatar"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
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
                  <button
                    className="join-btn"
                    onClick={updateProfile}
                    disabled={!hasProfileChanged}
                    style={{ opacity: hasProfileChanged ? 1 : 0.45, cursor: hasProfileChanged ? 'pointer' : 'not-allowed', transition: 'opacity 0.2s' }}
                  >
                    SAVE CHANGES
                  </button>
                </div>
              </div>

              <div className="profile-info">
                <div className="mentor-profile-grid">
                  {/* Left Column: Professional Info */}
                  <div>
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
                        value={user.venue || ''}
                        onChange={(e) => setUser({ ...user, venue: e.target.value })}
                        placeholder="e.g. Google, Meta, Independent..."
                      />
                    </div>
                    
                    <div className="profile-field">
                      <label>Years of Experience</label>
                      <input
                        type="number"
                        className="profile-input"
                        min="0"
                        max="50"
                        value={user.yearsOfExperience || ''}
                        onChange={(e) => setUser({ ...user, yearsOfExperience: e.target.value })}
                        placeholder="e.g. 5"
                        style={{ maxWidth: '160px' }}
                      />
                    </div>
                    
                    <div className="profile-field">
                      <label>My Mentoring Stack</label>
                      <div className="tech-tag-container">
                        {user.stack.map(s => (
                          <span 
                            key={s} 
                            className="tech-tag" 
                            title="Click to remove"
                            onClick={() => {
                              if (confirm(`Remove ${s} from your skills?`)) {
                                setUser(prev => ({ ...prev, stack: prev.stack.filter(skill => skill !== s) }));
                              }
                            }}
                          >
                            {s} ×
                          </span>
                        ))}
                        <span 
                          className="tech-tag" 
                          style={{ opacity: 0.5, cursor: 'pointer' }}
                          onClick={() => {
                            const newSkill = prompt("Enter new skill (e.g. TypeScript, Python, UI Design):");
                            if (newSkill && newSkill.trim()) {
                              setUser(prev => ({ ...prev, stack: [...prev.stack, newSkill.trim()] }));
                            }
                          }}
                        >
                          + Add Skill
                        </span>
                      </div>
                    </div>
                    
                    <div className="profile-field" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: 0 }}>
                      <label>Languages Spoken</label>
                      <div className="tech-tag-container">
                        {(user.languages || []).map(lang => (
                          <span
                            key={lang}
                            className="tech-tag"
                            title="Click to remove"
                            style={{ background: 'var(--blue-shadow)', color: '#fff' }}
                            onClick={() => {
                              if (confirm(`Remove ${lang}?`)) {
                                setUser(prev => ({ ...prev, languages: prev.languages.filter(l => l !== lang) }));
                              }
                            }}
                          >
                            {lang} ×
                          </span>
                        ))}
                        <span
                          className="tech-tag"
                          style={{ opacity: 0.5, cursor: 'pointer' }}
                          onClick={() => {
                            const newLang = prompt("Enter a language (e.g. English, Tamil, Hindi):");
                            if (newLang && newLang.trim()) {
                              setUser(prev => ({ ...prev, languages: [...(prev.languages || []), newLang.trim()] }));
                            }
                          }}
                        >
                          + Add Language
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Social Links & Requests */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    <div>
                      <h2 className="text-3d" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Social Links</h2>
                      <div className="social-connect-grid">
                        <div className="social-connect-item">
                          <img src="icons/github.svg" alt="GitHub" />
                          <input
                            type="text"
                            placeholder="GitHub URL"
                            value={user.socials.github}
                            onChange={(e) => setUser({ ...user, socials: { ...user.socials, github: e.target.value } })}
                          />
                        </div>
                        <div className="social-connect-item">
                          <img src="icons/linkedin.svg" alt="LinkedIn" />
                          <input
                            type="text"
                            placeholder="LinkedIn URL"
                            value={user.socials.linkedin}
                            onChange={(e) => setUser({ ...user, socials: { ...user.socials, linkedin: e.target.value } })}
                          />
                        </div>
                        <div className="social-connect-item">
                          <span style={{ fontSize: '1.4rem', width: '24px', textAlign: 'center' }}>𝕏</span>
                          <input
                            type="text"
                            placeholder="Twitter / X URL"
                            value={user.socials.twitter}
                            onChange={(e) => setUser({ ...user, socials: { ...user.socials, twitter: e.target.value } })}
                          />
                        </div>
                        <div className="social-connect-item">
                          <span style={{ fontSize: '1.2rem', width: '24px', textAlign: 'center' }}>🌐</span>
                          <input
                            type="text"
                            placeholder="Portfolio / Website URL"
                            value={user.website || ''}
                            onChange={(e) => setUser({ ...user, website: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="requests-section" style={{ borderTop: '2px dashed #eee', paddingTop: '1.5rem', marginTop: 0 }}>
                      <h2 className="text-3d" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Attendee Requests</h2>
                      {!user.isApproved && (
                        <div className="warning-box" style={{ marginBottom: '1.5rem', background: '#fff9e6', border: '2px solid #ffcc00', padding: '1rem', borderRadius: '15px', color: '#856404' }}>
                          Your account is pending approval. You will be able to accept requests once verified by the Admin!
                        </div>
                      )}
                      <div className="request-list" style={{ maxHeight: '250px', overflowY: 'auto' }}>
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
                </div>
              </div>
            </>

          ) : (
            /* EXISTING ATTENDEE PROFILE VIEW */
            <>
              <div className="profile-sidebar">
                <div className="profile-avatar" style={{ position: 'relative' }}>
                  <img
                    src={user.avatarUrl || 'icons/user-profile.svg'}
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
                  <button
                    className="join-btn"
                    onClick={updateProfile}
                    disabled={!hasProfileChanged}
                    style={{ opacity: hasProfileChanged ? 1 : 0.45, cursor: hasProfileChanged ? 'pointer' : 'not-allowed', transition: 'opacity 0.2s' }}
                  >
                    SAVE CHANGES
                  </button>
                </div>
              </div>
              <div className="profile-info">
                <div className="profile-field">
                  <label>Hacking Role</label>
                  <input
                    type="text"
                    className="profile-input"
                    value={user.role_title.toUpperCase() || user.role.toUpperCase()}
                    onChange={(e) => setUser({ ...user, role_title: e.target.value })}
                    placeholder="e.g. Frontend, UI/UX, Backend..."
                    readOnly
                  />
                </div>
                <div className="profile-field">
                  <label>Allocated Venue</label>
                  <input
                    type="text"
                    className="profile-input"
                    value={user.venue.toUpperCase() || user.venue.toUpperCase()}
                    onChange={(e) => setUser({ ...user, venue: e.target.value })}
                    placeholder="Not assigned yet"
                    readOnly
                  />
                </div>
                <div className="profile-field">
                  <label>My Tech Stack</label>
                  <div className="tech-tag-container">
                    {user.stack.map(s => (
                      <span 
                        key={s} 
                        className="tech-tag" 
                        title="Click to remove"
                        onClick={() => {
                          if (confirm(`Remove ${s} from your stack?`)) {
                            setUser(prev => ({ ...prev, stack: prev.stack.filter(skill => skill !== s) }));
                          }
                        }}
                      >
                        {s} ×
                      </span>
                    ))}
                    <span 
                      className="tech-tag" 
                      style={{ opacity: 0.5, cursor: 'pointer' }}
                      onClick={() => {
                        const newSkill = prompt("Enter new tool or technology (e.g. React, Figma, Python):");
                        if (newSkill && newSkill.trim()) {
                          setUser(prev => ({ ...prev, stack: [...prev.stack, newSkill.trim()] }));
                        }
                      }}
                    >
                      + Add Tool
                    </span>
                  </div>
                </div>
                <div className="profile-field">
                  <label>Team Status</label>
                  <div className="field-value" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <strong>{user.teamName ? user.teamName : 'Solo Hacker'}</strong>
                      {user.teamName && (
                        <button className="btn-small decline" style={{ marginLeft: '1rem' }} onClick={handleLeaveTeam}>
                          LEAVE TEAM
                        </button>
                      )}
                    </div>
                    
                    {!user.teamName && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginTop: '0.5rem' }}>
                        <button className="btn-small accept" onClick={handleFindTeam}>
                          FIND MY SQUAD
                        </button>
                        <span style={{ color: 'var(--text-muted)', fontWeight: 'bold' }}>OR</span>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <input 
                            id="createTeamNameInput"
                            type="text" 
                            placeholder="Enter Team Name" 
                            className="admin-select-small"
                            style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem', width: '200px', border: '2px solid var(--text-navy)', borderRadius: '10px' }}
                          />
                          <button 
                            className="btn-small accept"
                            onClick={() => {
                              const input = document.getElementById('createTeamNameInput');
                              if (input) handleCreateTeam(input.value);
                            }}
                          >
                            CREATE/JOIN TEAM
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="profile-field">
                  <label>Team Members</label>
                  <div className="team-members-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {teamMembers.length > 0 ? (
                      teamMembers.map(member => (
                        <div key={member.id} className="team-member-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8f9fa', padding: '0.5rem 1rem', borderRadius: '12px', border: '2px solid #eee' }}>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontWeight: 'bold', color: 'var(--text-navy)' }}>{member.full_name}</span>
                            <small style={{ color: 'var(--text-muted)' }}>{member.email}</small>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="field-value" style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>
                        No team members found yet.
                      </div>
                    )}

                    {user.teamName && teamMembers.length < 4 && (
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', borderTop: '2px dashed #eee', paddingTop: '1rem' }}>
                        <input 
                          id="addTeammateEmailInput"
                          type="email" 
                          placeholder="Teammate's Email Address" 
                          className="admin-select-small"
                          style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', flex: 1, border: '2px solid var(--text-navy)', borderRadius: '10px' }}
                        />
                        <button 
                          className="btn-small accept"
                          onClick={() => {
                            const input = document.getElementById('addTeammateEmailInput');
                            if (input) {
                              handleAddTeammate(input.value);
                              input.value = '';
                            }
                          }}
                        >
                          ADD MEMBER
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="profile-field">
                  <label>Selected Innovation Track</label>
                  <div className="field-value" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                    {user.problemStatementId ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                        <strong style={{ color: 'var(--text-navy)' }}>
                          {problemStatements.find(ps => ps.id === user.problemStatementId)?.title || 'Selected'}
                        </strong>
                        <small style={{ color: 'var(--text-muted)', fontSize: '14px' }}>🔒 Selection Locked (Contact admin to change)</small>
                      </div>
                    ) : (
                      <>
                        <select
                          className="admin-select-small"
                          style={{ padding: '0.8rem', fontSize: '1rem', width: '100%', maxWidth: '400px', border: '2px solid var(--text-navy)', borderRadius: '10px' }}
                          value={isOtherTrackSelected ? 'other' : ''}
                          onChange={(e) => {
                            if (e.target.value === 'other') {
                              setIsOtherTrackSelected(true);
                            } else {
                              setIsOtherTrackSelected(false);
                              if (e.target.value) handleSelectPS(e.target.value);
                            }
                          }}
                        >
                          <option value="">Choose a Problem Statement...</option>
                          {problemStatements.map(ps => (
                            <option key={ps.id} value={ps.id}>{ps.title}</option>
                          ))}
                          <option value="other">Other (Define your own...)</option>
                        </select>

                        {isOtherTrackSelected && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', background: '#f8f9fa', padding: '1.5rem', borderRadius: '15px', border: '2px dashed var(--text-navy)', marginTop: '0.5rem', maxWidth: '500px' }}>
                            <h4 style={{ margin: 0, fontFamily: "'Fredoka One', cursive", color: 'var(--text-navy)' }}>Define Custom Track</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                              <label style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Track Title</label>
                              <input 
                                type="text"
                                placeholder="e.g. Virtual Reality Aid for Autism"
                                value={customTrackTitle}
                                onChange={(e) => setCustomTrackTitle(e.target.value)}
                                className="admin-select-small"
                                style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', border: '2px solid var(--text-navy)', borderRadius: '10px' }}
                              />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                              <label style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Description / Scope</label>
                              <textarea
                                placeholder="Describe what you plan to build..."
                                value={customTrackDesc}
                                onChange={(e) => setCustomTrackDesc(e.target.value)}
                                className="admin-select-small"
                                style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', height: '100px', resize: 'vertical', border: '2px solid var(--text-navy)', borderRadius: '10px', fontFamily: "'Outfit', sans-serif" }}
                              />
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                              <button className="btn-small accept" onClick={handleCreateCustomTrack}>
                                LOCK CUSTOM TRACK
                              </button>
                              <button className="btn-small decline" onClick={() => {
                                setIsOtherTrackSelected(false);
                                setCustomTrackTitle('');
                                setCustomTrackDesc('');
                              }}>
                                CANCEL
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <div className="profile-field">
                  <label>Social Connectivity</label>
                  <div className="social-connect-grid">
                    <div className="social-connect-item">
                      <img src="icons/github.svg" alt="GitHub" />
                      <input
                        type="text"
                        placeholder="GitHub URL"
                        value={user.socials.github}
                        onChange={(e) => setUser({ ...user, socials: { ...user.socials, github: e.target.value } })}
                      />
                    </div>
                    <div className="social-connect-item">
                      <img src="icons/linkedin.svg" alt="LinkedIn" />
                      <input
                        type="text"
                        placeholder="LinkedIn URL"
                        value={user.socials.linkedin}
                        onChange={(e) => setUser({ ...user, socials: { ...user.socials, linkedin: e.target.value } })}
                      />
                    </div>
                  </div>
                </div>
                <div className="profile-field" style={{ borderBottom: 'none' }}>
                  <label>Support & Assistance</label>
                    <div className="support-cta-grid">
                    <div className="support-btn mentor" onClick={() => {
                      setActiveView('landing');
                      const el = document.getElementById('mentors');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      else setTimeout(() => { const el2 = document.getElementById('mentors'); if (el2) el2.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 300);
                    }}>
                      CALL MENTOR
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
                        <a href={mySubmission.ppt_link} target="_blank" rel="noreferrer" className="btn-small accept">VIEW PRESENTATION</a>
                      </div>
                      <div className="submission-images-grid" style={{ marginTop: '1.5rem' }}>
                        {(mySubmission.image_urls || []).map((img, i) => (
                          <div key={i} className="submission-img-placeholder">
                            <img src={img} alt={`submission-${i}`} />
                          </div>
                        ))}
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
                        <label style={{ color: 'var(--text-navy)', fontWeight: 'bold' }}>Brief Description (min 100 words)</label>
                        <textarea name="description" placeholder="Tell us what you built and how it helps..." required style={{ width: '100%', minHeight: '100px', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}></textarea>
                      </div>
                      <div className="input-group" style={{ marginTop: '1rem' }}>
                        <label style={{ color: 'var(--text-navy)', fontWeight: 'bold' }}>Project Photos (Max 3)</label>
                        <input name="photos" type="file" accept="image/*" multiple style={{ width: '100%', padding: '0.8rem' }} />
                      </div>
                      <div className="input-group" style={{ marginTop: '1rem' }}>
                        <label style={{ color: 'var(--text-navy)', fontWeight: 'bold' }}>Project Presentation</label>
                        <input name="pptx" type="file" accept="application/vnd.openxmlformats-officedocument.presentationml.presentation" style={{ width: '100%', padding: '0.8rem' }} />
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
                  <img src="brand/Logo.png" alt="Starlet" style={{ width: '85%', height: 'auto' }} />
                </div>
                <div style={{ width: '85px', height: '85px', borderRadius: '15px', border: '3px solid #001f3f', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '5px 5px 0px #ff4d94', overflow: 'hidden' }}>
                  <img src="brand/Mind Empowered.jpeg" alt="ME" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
              venues.map(v => {
                const isAdiShankara = v.name.toLowerCase().includes('adi shankara') || v.name.toLowerCase().includes('adi sankara');
                const isAikyamSpace = v.name.toLowerCase().includes('aikyam space');
                return (
                  <React.Fragment key={v.id}>
                    <div className="venue-card map-section">
                      <h2 className="text-3d">{v.name}</h2>
                      <div className="map-placeholder">
                        <p>{v.description}</p>
                        <div className="venue-address">
                          <img src="icons/location.svg" alt="map" className="map-icon" style={{ width: '30px', height: '30px', opacity: 0.8, display: 'block', margin: '0 auto 0.5rem auto' }} />
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
                    <div className="venue-card gallery-section-venue">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 className="text-3d" style={{ margin: 0 }}>Venue Gallery</h2>
                        <div className="gallery-nav-btns">
                          <button className="nav-icon-btn small" onClick={(e) => scrollGallery('left', e)}>←</button>
                          <button className="nav-icon-btn small" onClick={(e) => scrollGallery('right', e)}>→</button>
                        </div>
                      </div>
                      <div className="venue-image-grid">
                        {(() => {
                          const imgs = v.image_urls.replace(/\[|\]/g,'').replace(/"/g, '').split(',');
                          const gateImgIndex = imgs.findIndex(img => img.includes('0.7359368490637637'));
                          if (gateImgIndex > 0) {
                            const [gateImg] = imgs.splice(gateImgIndex, 1);
                            imgs.unshift(gateImg);
                          }
                          return imgs.map((img, idx) => (
                            <div key={idx} className="venue-img-placeholder">
                              <img src={img} alt={`venue-${idx}`} />
                            </div>
                          ));
                        })()}
                      </div>
                    </div>
                    {isAdiShankara && (
                      <div className="venue-card transport-section">
                        <h2 className="text-3d">Transport</h2>
                        <div className="transport-list">
                          <div className="transport-item">
                            <div className="transport-icon"><img src="icons/train.svg" alt="train" style={{ width: '40px' }} /></div>
                            <div className="transport-info">
                              <h3>By Train</h3>
                              <p><strong>Nearest Railway Station:</strong> Angamaly for Kalady (AFK) is the closest station, located roughly 7 to 8 km away from the campus.</p>
                              <p><strong>Alternative Station:</strong> Aluva (AWY) railway station is about 17 km away and is a major stop for almost all express trains.</p>
                              <small><strong>How to proceed:</strong> You can easily find local KSRTC buses, private buses, or auto-rickshaws from either station heading toward Kalady.</small>
                            </div>
                          </div>
                          <div className="transport-item">
                            <div className="transport-icon"><img src="icons/bus.svg" alt="bus" style={{ width: '40px' }} /></div>
                            <div className="transport-info">
                              <h3>By Bus</h3>
                              <p><strong>Local Buses:</strong> Frequent private and KSRTC buses run between Angamaly and Perumbavoor via Kalady.</p>
                              <small><strong>Drop-off Point:</strong> You can get down at the Mattoor Junction or the designated Adi Shankara college bus stop on the Angamaly-Kalady road. The campus is just a short walk or quick auto ride from the main road.</small>
                            </div>
                          </div>
                          <div className="transport-item">
                            <div className="transport-icon"><img src="icons/car.svg" alt="car" style={{ width: '40px' }} /></div>
                            <div className="transport-info">
                              <h3>Car / Ride Share</h3>
                              <p><strong>Location:</strong> The campus is situated at Vidya Bharathi Nagar, Mattoor, Kalady, right along the main road connecting Angamaly and Kalady.</p>
                              <small><strong>Parking:</strong> The campus provides extensive, designated parking spaces on-site.</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {isAikyamSpace && (
                      <div className="venue-card transport-section">
                        <h2 className="text-3d">Transport</h2>
                        <div className="transport-list">
                          <div className="transport-item">
                            <div className="transport-icon"><img src="icons/ferry.svg" alt="transit" style={{ width: '40px' }} /></div>
                            <div className="transport-info">
                              <h3>By Public Bus & Ferry (Transit)</h3>
                              <p>Public transportation from Thrissur takes approximately 3 hours and 45 minutes to reach the venue.</p>
                              <p><strong>Bus Route:</strong> You can take a KSRTC or private transport bus down to Ernakulam (Vytilla Hub or Ernakulam Jetty).</p>
                              <small><strong>Ferry Option:</strong> From Ernakulam Jetty, taking the public ferry to Mattancherry or Fort Kochi is often faster and more scenic than sitting through city road traffic. The space is a short auto-rickshaw ride or walk from the Mattancherry jetty.</small>
                            </div>
                          </div>
                          <div className="transport-item">
                            <div className="transport-icon"><img src="icons/train.svg" alt="train" style={{ width: '40px' }} /></div>
                            <div className="transport-info">
                              <h3>By Train</h3>
                              <p><strong>Nearest Major Stations:</strong> Ernakulam Junction (ERS) (South) or Ernakulam Town (ERN) (North).</p>
                              <small><strong>Connection:</strong> Once you deboard at Ernakulam, you can take a local city bus directly to Mattancherry/Kappalandimukku, or take an auto-rickshaw to the Ernakulam Jetty to catch the ferry across to Fort Kochi.</small>
                            </div>
                          </div>
                          <div className="transport-item">
                            <div className="transport-icon"><img src="icons/car.svg" alt="car" style={{ width: '40px' }} /></div>
                            <div className="transport-info">
                              <h3>Car / Ride Share</h3>
                              <p><strong>Route:</strong> If you are driving down from Thrissur, follow the National Highway 544 (NH544) toward Ernakulam, then navigate through the Vikrant Bhairon Road or Thoppumpady bridge into Fort Kochi/Mattancherry.</p>
                              <small><strong>Location Hint:</strong> The space is situated on Lalan Road near the Kappalandimukku junction. Keep in mind that parking in the historic streets of Mattancherry can occasionally be tight.</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </div>

          <div onClick={() => setActiveView('landing')} style={{ marginTop: '3rem', cursor: 'pointer', color: 'var(--blue-shadow)', textAlign: 'center', width: '100%' }}>← Back to Home</div>
        </div>
      ) : activeView === 'sponsors-overview' ? (
        <SponsorsPage onBack={() => setActiveView('landing')} />
      ) : null}

      <div className={`scroll-top-btn ${showScrollTop ? 'visible' : ''}`} onClick={scrollToTop}>
        <img src="icons/rocket.svg" alt="top" />
      </div>
      {showAboutPopup && (
        <div className="modal-overlay" onClick={() => setShowAboutPopup(false)}>
          <div className="modal-content about-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAboutPopup(false)}>×</button>
            <div className="modal-inner">
              <div className="modal-visual">
                <img src="brand/Mind Empowered.gif" alt="Mind Empowered" />
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

      {showAikyamPopup && (
        <div className="modal-overlay" onClick={() => setShowAikyamPopup(false)}>
          <div className="modal-content about-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAikyamPopup(false)}>×</button>
            <div className="modal-inner">
              <div className="modal-visual" style={{ background: '#e6f4ea', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
                <img src="collaborators/aikyam.webp" alt="Aikyam Space" style={{ maxWidth: '80%', height: 'auto', objectFit: 'contain' }} />
              </div>
              <div className="modal-text" style={{ padding: '2.5rem 2rem' }}>
                <h2 className="text-3d" style={{ marginBottom: '0.8rem', fontSize: '2.2rem' }}>aikyam space</h2>
                <p className="handwritten" style={{ fontSize: '1.2rem', color: '#2eac6d', marginTop: '-0.5rem', marginBottom: '1.2rem' }}>
                  a [ space ] for inspiring action
                </p>
                <p style={{ fontSize: '1rem', lineHeight: '1.5', marginBottom: '1rem' }}>
                  <strong>aikyam space</strong> is a proudly not-for-profit community initiative in Fort Kochi, Kerala. It provides a warm, open gathering place where local communities learn, share skills, and spark collective action.
                </p>
                <p style={{ fontSize: '1rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                  <strong>Key Initiatives:</strong> Community hub workshops, hands-on skill sharing (stitching, upcycling, carpentry), change-maker residencies (Tink-Her-Hack), and inclusive listening circles.
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1.5rem' }}>
                  <a 
                    href="https://aikyam.space/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="join-btn"
                    style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center', padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}
                  >
                    VISIT WEBSITE
                  </a>
                </div>
                
                <div className="modal-footer-brand" style={{ color: '#2eac6d', marginTop: '2rem' }}>
                  A Proudly Not-for-Profit Initiative
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAdiPopup && (
        <div className="modal-overlay" onClick={() => setShowAdiPopup(false)}>
          <div className="modal-content about-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAdiPopup(false)}>×</button>
            <div className="modal-inner">
              <div className="modal-visual" style={{ background: '#e8eff6', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
                <img src="collaborators/adi sankara.png" alt="Adi Shankara" style={{ maxWidth: '80%', height: 'auto', objectFit: 'contain' }} />
              </div>
              <div className="modal-text" style={{ padding: '2.5rem 2rem' }}>
                <h2 className="text-3d" style={{ marginBottom: '0.8rem', fontSize: '2.2rem' }}>adi shankara</h2>
                <p className="handwritten" style={{ fontSize: '1.2rem', color: '#1565c0', marginTop: '-0.5rem', marginBottom: '1.2rem' }}>
                  institute of engineering & technology
                </p>
                <p style={{ fontSize: '1rem', lineHeight: '1.5', marginBottom: '1rem' }}>
                  <strong>Adi Shankara Institute of Engineering and Technology (ASIET)</strong> is a premier engineering institution located in Kalady, Kerala. Established in 2001, it is run by the Adi Sankara Trust and is renowned for its academic excellence and focus on innovation.
                </p>
                <p style={{ fontSize: '1rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                  <strong>Main Venue Partner:</strong> The college campus serves as the primary hub for Starlet 5.0, hosting the main hackathon tracks, prototyping challenges, and technical mentoring sessions.
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1.5rem' }}>
                  <a 
                    href="https://www.adishankara.ac.in/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="join-btn"
                    style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center', padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}
                  >
                    VISIT WEBSITE
                  </a>
                </div>
                
                <div className="modal-footer-brand" style={{ color: '#1565c0', marginTop: '2rem' }}>
                  Main Venue Partner
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
                <span className="track-id-badge">
                  {selectedTrack.id === 'other' ? 'CUSTOM CHALLENGE' : `CHALLENGE #${selectedTrack.index}`}
                </span>
                <h2 className="text-3d">{selectedTrack.title}</h2>
                {user.role === 'attendee' && !user.problemStatementId && selectedTrack.id !== 'other' && (
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
            <div className="lightbox-image-container">
              <img
                src={selectedGalleryImage + 1 <= 9 ? `gallery/${selectedGalleryImage + 1}.JPG` : `gallery/${selectedGalleryImage + 1}.jpeg`}
                alt="Enlarged"
              />
              <div className="lightbox-caption">
                {galleryCaptions[selectedGalleryImage] || `Starlet Memory #${selectedGalleryImage + 1}`}
              </div>
            </div>

            <div className="lightbox-controls-bottom">
              <button
                className="lightbox-nav-btn prev"
                onClick={() => setSelectedGalleryImage(prev => (prev > 0 ? prev - 1 : 41))}
              >
                ←
              </button>
              <button
                className="lightbox-nav-btn next"
                onClick={() => setSelectedGalleryImage(prev => (prev < 41 ? prev + 1 : 0))}
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}
      {selectedMentor && (
        <div className="modal-overlay" onClick={() => setSelectedMentor(null)}>
          <div className="modal-content mentor-modal" onClick={e => e.stopPropagation()}>
            
            {/* Flush Navy Banner Header */}
            <div className="mentor-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                <span className="sparkle-emoji" style={{ fontSize: '2.5rem' }}>✨</span>
                <div>
                  <h2 className="text-3d" style={{ fontSize: '2.4rem', margin: 0, color: '#fff', textShadow: '4px 4px 0px var(--pink-primary)' }}>{selectedMentor.full_name}</h2>
                  <span style={{ fontSize: '0.9rem', color: 'var(--yellow-star)', fontFamily: "'Fredoka One', cursive", letterSpacing: '2px' }}>STARLET VERIFIED MENTOR</span>
                </div>
              </div>
              <button className="mentor-modal-close" onClick={() => setSelectedMentor(null)}>×</button>
            </div>

            {/* Content Area */}
            <div className="mentor-modal-content" style={{ alignItems: 'start' }}>
              
              {/* Left Column: Profile Card */}
              <div className="mentor-modal-side" style={{ background: '#fff', border: '4px solid var(--text-navy)', borderRadius: '30px', padding: '1.5rem 1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxShadow: '8px 8px 0px var(--blue-shadow)', width: '100%' }}>
                <div className="mentor-modal-photo" style={{ width: '130px', height: '130px', borderRadius: '50%', overflow: 'hidden', border: '4px solid var(--pink-primary)', boxShadow: '4px 4px 0px var(--yellow-star)', marginBottom: '1.2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'var(--bg-cream)' }}>
                  <img src={selectedMentor.avatar_url || "icons/user-profile.svg"} alt="mentor" style={{ width: '100%', height: '100%', objectFit: selectedMentor.avatar_url ? 'cover' : 'contain' }} />
                </div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.6rem', fontFamily: "'Fredoka One', cursive", color: 'var(--text-navy)', lineHeight: '1.2' }}>{selectedMentor.role_title}</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%', alignItems: 'center' }}>
                  <span style={{ background: 'var(--bg-cream)', border: '2px solid var(--text-navy)', borderRadius: '15px', padding: '0.4rem 0.8rem', fontSize: '0.85rem', fontWeight: '900', color: 'var(--text-navy)', display: 'inline-block', width: '100%', maxWidth: '220px' }}>🏢 {selectedMentor.company}</span>
                  {selectedMentor.years_of_experience && (
                    <span style={{ background: 'var(--bg-cream)', border: '2px solid var(--text-navy)', borderRadius: '15px', padding: '0.4rem 0.8rem', fontSize: '0.85rem', fontWeight: '900', color: 'var(--text-navy)', display: 'inline-block', width: '100%', maxWidth: '220px' }}>⏳ {selectedMentor.years_of_experience} Years Exp</span>
                  )}
                </div>

                {(() => {
                  const profile = allUsers.find(u => u.id === selectedMentor.profile_id) || {};
                  const socials = profile.socials || selectedMentor.socials || {};
                  const website = selectedMentor.website_url || profile.website_url;
                  if (!socials && !website) return null;
                  return (
                    <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                      {socials.github && (
                        <a href={socials.github.startsWith('http') ? socials.github : `https://${socials.github}`} target="_blank" rel="noopener noreferrer" style={{ width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-cream)', border: '2.5px solid var(--text-navy)', borderRadius: '50%', transition: 'all 0.2s', boxShadow: '3px 3px 0px var(--text-navy)' }}>
                          <img src="icons/github.svg" alt="GitHub" style={{ width: '18px' }} />
                        </a>
                      )}
                      {socials.linkedin && (
                        <a href={socials.linkedin.startsWith('http') ? socials.linkedin : `https://${socials.linkedin}`} target="_blank" rel="noopener noreferrer" style={{ width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-cream)', border: '2.5px solid var(--text-navy)', borderRadius: '50%', transition: 'all 0.2s', boxShadow: '3px 3px 0px var(--text-navy)' }}>
                          <img src="icons/linkedin.svg" alt="LinkedIn" style={{ width: '18px' }} />
                        </a>
                      )}
                      {socials.twitter && (
                        <a href={socials.twitter.startsWith('http') ? socials.twitter : `https://${socials.twitter}`} target="_blank" rel="noopener noreferrer" style={{ width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-cream)', border: '2.5px solid var(--text-navy)', borderRadius: '50%', transition: 'all 0.2s', boxShadow: '3px 3px 0px var(--text-navy)' }}>
                          <img src="icons/twitter.svg" alt="Twitter" style={{ width: '18px' }} />
                        </a>
                      )}
                      {website && (
                        <a href={website.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" style={{ width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-cream)', border: '2.5px solid var(--text-navy)', borderRadius: '50%', transition: 'all 0.2s', boxShadow: '3px 3px 0px var(--text-navy)', fontSize: '1rem' }} title="Visit Website">
                          🌐
                        </a>
                      )}
                    </div>
                  );
                })()}
              </div>

              {/* Right Column: Info & Skills Cards */}
              <div className="mentor-modal-main" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', flex: 1 }}>
                
                {/* About Box */}
                <div className="mentor-info-card" style={{ background: '#fff', border: '3.5px solid var(--text-navy)', borderRadius: '25px', padding: '1.2rem 1.8rem', boxShadow: '6px 6px 0px var(--pink-primary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
                    <span style={{ fontSize: '1.3rem' }}>💡</span>
                    <h4 style={{ fontSize: '1.3rem', color: 'var(--text-navy)', margin: 0, fontFamily: "'Fredoka One', cursive" }}>About Me</h4>
                  </div>
                  <p style={{ fontSize: '1rem', lineHeight: '1.5', color: '#333', margin: 0, fontStyle: selectedMentor.bio ? 'normal' : 'italic' }}>
                    {selectedMentor.bio || 'Experienced professional dedicated to guiding innovators and hackers to success.'}
                  </p>
                </div>

                {/* Skills Box */}
                <div className="mentor-info-card" style={{ background: '#fff', border: '3.5px solid var(--text-navy)', borderRadius: '25px', padding: '1.2rem 1.8rem', boxShadow: '6px 6px 0px var(--yellow-star)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '1.3rem' }}>⚡</span>
                    <h4 style={{ fontSize: '1.3rem', color: 'var(--text-navy)', margin: 0, fontFamily: "'Fredoka One', cursive" }}>Mentoring Stack</h4>
                  </div>
                  <div className="mentor-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                    {(selectedMentor.expertise || []).map(tag => (
                      <span key={tag} className="tech-tag" style={{ fontSize: '0.85rem', padding: '0.4rem 1rem', background: 'var(--yellow-star)', color: 'var(--text-navy)', border: '2px solid var(--text-navy)', borderRadius: '20px', fontWeight: '900', boxShadow: '3px 3px 0px var(--text-navy)' }}>
                        {tag}
                      </span>
                    ))}
                    {(selectedMentor.expertise || []).length === 0 && (
                      <span style={{ color: '#888', fontStyle: 'italic' }}>No specific skills listed yet</span>
                    )}
                  </div>
                </div>

                {/* Languages Box */}
                {selectedMentor.languages && selectedMentor.languages.length > 0 && (
                  <div className="mentor-info-card" style={{ background: '#fff', border: '3.5px solid var(--text-navy)', borderRadius: '25px', padding: '1.2rem 1.8rem', boxShadow: '6px 6px 0px var(--blue-shadow)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
                      <span style={{ fontSize: '1.6rem' }}>🗣️</span>
                      <h4 style={{ fontSize: '1.3rem', color: 'var(--text-navy)', margin: 0, fontFamily: "'Fredoka One', cursive" }}>Languages Spoken</h4>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                      {selectedMentor.languages.map(lang => (
                        <span key={lang} className="tech-tag" style={{ fontSize: '0.85rem', padding: '0.4rem 1rem', background: 'var(--blue-shadow)', color: '#fff', border: '2px solid var(--text-navy)', borderRadius: '20px', fontWeight: '900', boxShadow: '3px 3px 0px var(--text-navy)' }}>
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Attendee Action Button */}
                {isLoggedIn && user.role === 'attendee' && (
                  <button className="join-btn" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', background: 'var(--pink-primary)', color: '#fff', border: '3.5px solid var(--text-navy)', borderRadius: '20px', boxShadow: '6px 6px 0px var(--text-navy)', cursor: 'pointer', fontFamily: "'Fredoka One', cursive", textTransform: 'uppercase', marginTop: '0.2rem' }} onClick={() => { setMentorRequestModal(selectedMentor); setSelectedMentor(null); }}>
                    🚀 REQUEST HELP FROM {selectedMentor.full_name.split(' ')[0].toUpperCase()}
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
                mentor_id: mentorRequestModal.profile_id || mentorRequestModal.id,
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
                <img src={activeAlert.attendee?.avatar_url || 'icons/user-profile.svg'} alt="attendee" />
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
