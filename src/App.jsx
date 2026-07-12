// ==========================================
// 📦 IMPORTS & DEPENDENCIES
// ==========================================
import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import { supabase, supabaseUrl, supabaseAnonKey } from './supabaseClient';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import SponsorsPage from './SponsorsPage';
import BlogPostSkeleton from './BlogPostSkeleton';


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
    id: 99,
    type: 'about-me',
    title: "ABOUT MIND EMPOWERED",
    image: "collaborators/Mind Empowered.gif"
  },
  {
    id: 3,
    type: 'tracks',
    title: "Pick Your Track",
    content: "Choose a focus area within Assistive Tech: from Mobility Solutions and Visual/Auditory Aids to Neurodiversity Support and Inclusive Education. Your innovation can redefine independence.",
    image: "brand/Logo.png"
  },
  {
    id: 6,
    type: 'prizes',
    title: "Judges & Prizes",
    content: "A total prize pool of over ₹40,000 awaits the most innovative solutions!",
    image: "icons/trophy.svg"
  },
  {
    id: 4,
    type: 'timeline',
    title: "The Roadmap",
    content: "11th July 2026, Saturday 8:00am - 5:00pm and 12th July 2026, Sunday 8:00am - 5:00pm",
    image: "brand/Logo.png"
  },
  {
    id: 8,
    type: 'mentors',
    title: "Meet Your Mentors",
    content: "Industry experts ready to guide your journey.",
    image: "icons/user-profile.svg"
  },
  {
    id: 17,
    type: 'events',
    title: "Highlights & Special Events",
    content: "Don't miss these amazing sessions, cultural performances, and networking circles scheduled during the hackathon!",
    image: "brand/Logo.png"
  },
  {
    id: 9,
    type: 'community',
    title: "Make New Friends",
    content: "Starlet isn't just an innovation marathon — it's the starting point for lifelong sisterhood and professional networking. Connect with passionate creators, find potential co-founders, share exciting coding breakthroughs, and become part of an empowered tech community that champions your growth!",
    image: "svg/2.svg"
  },
  {
    id: 10,
    type: 'sponsors',
    title: "Our Supporters",
    content: "The organizations making this impact possible.",
    image: "brand/Logo.png"
  },
  {
    id: 11,
    type: 'gallery',
    title: "The Gallery",
    content: "Captured moments of innovation and fun.",
    image: "brand/Logo.png"
  },
  {
    id: 7,
    type: 'rules',
    title: "Rules of the Galaxy",
    content: "Fair play and collaboration are the heart of Starlet.",
    image: "icons/warning.svg"
  },
  {
    id: 12,
    type: 'faq',
    title: "Common Doubts",
    content: "Answers to frequently asked questions.",
    image: "icons/warning.svg"
  },
  {
    id: 14,
    type: 'contact',
    title: "Get in Touch",
    content: "Reach out for support or inquiries.",
    image: "icons/location.svg"
  }
];

const judgesData = [
  {
    id: 1,
    name: "Shreya Krishnan",
    role: "Judge",
    title: "Managing Director, AnitaB.org",
    image: "Judge/Shreya Krishnan.jpg",
    affiliation: "AnitaB.org"
  },
  {
    id: 2,
    name: "Gayathri Manikutty",
    role: "Judge",
    title: "Senior Researcher, AMMACHI Labs, Amrita Vishwa Vidyapeetham",
    image: "Judge/Gayathri Manikutty.png",
    affiliation: "Amrita Vishwa Vidyapeetham"
  }
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
  // { id: 4, q: "Where will the event be held?", a: "We have two venues: the Main Venue at Adi Shankara Institute (Kalady) and a second location at Aikyam Space (Matancherry)." },
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

const eventsData = [
  {
    id: 1,
    name: "Indian Sign Language Interpreter",
    person: "Anamika",
    company: "",
    image: "events/Anamika ISL Interpreter.jpeg"
  },
  {
    id: 2,
    name: "Indian Sign Language Interpreter",
    person: "Archa",
    company: "",
    image: "events/Archa Krishnan ISL Interpreter .jpeg",
    objectPosition: "top"
  },
  {
    id: 3,
    name: "Kaleripayettu",
    person: "Gurukkal Rajeev Chaithanya",
    company: "Bodhi Sutra",
    image: "events/Gurukkal Rajeev Chaithanya Kaleripayuttu.png",
    objectPosition: "center",
    cardWidth: "320px",
    cardHeight: "180px"
  },
  {
    id: 4,
    name: "Sharing Circle",
    person: "Namitha Rose Thadevoos",
    company: "Founder of Sacred Pause",
    image: "events/Namitha Rose .jpeg"
  },
  {
    id: 5,
    name: "Music Performance",
    person: "Thalamura Band",
    company: "Thalamura",
    isBand: true,
    members: [
      { name: "Madhav Raj", role: "Vocals & Guitar", image: "events/Music Band/Madhav Raj Vocals and Guitar.jpeg" },
      { name: "Aldrin Johny", role: "Vocals & Keyboard", image: "events/Music Band/Aldrin Johny Vocals and Keyboard.jpeg" },
      { name: "Jen Jax", role: "Cajon", image: "events/Music Band/Jen Jax plays Cajon.jpeg" }
    ]
  },
  {
    id: 6,
    name: "Motivational Speaker",
    person: "Tiffany Brar",
    company: "",
    image: "events/Tiffany Brar .jpeg"
  },
  {
    id: 7,
    name: "Speaker",
    person: "Ms. Padmini",
    company: "Principal, Smrithi Special School",
    image: "events/Ms. Padmini.jpeg",
    objectPosition: "50% 40%"
  },
  {
    id: 8,
    name: "Legal Rights of Women",
    person: "Rabia Rahim",
    company: "Lawyer",
    image: "events/Rabia Rahim.png"
  },
  {
    id: 9,
    name: "Voice Your Worries",
    person: "Alka V",
    company: "Clinical Psychologist",
    image: "events/Alka V.png"
  }
];

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
/* ─────────────────────────────────────────────────────────────────
   MediaSlide – defined at MODULE LEVEL (outside App) so React never
   sees it as a new component type on re-render. If it were inside
   App, every state update would recreate the function reference,
   causing React to unmount+remount every slide and reset its
   `loaded` state → the shimmer flicker.
──────────────────────────────────────────────────────────────── */
const MediaSlide = ({ item, idx, objectPosition = 'center center' }) => {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Shimmer placeholder – sits behind the media */}
      {!loaded && (
        <div
          className="bps-shim"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 0,
            zIndex: 1,
          }}
        />
      )}
      {item.type === 'video' ? (
        <video
          src={item.url}
          controls
          playsInline
          loop
          preload="metadata"
          onLoadedData={() => setLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.35s ease',
            position: 'relative',
            zIndex: 2,
          }}
        />
      ) : (
        <img
          src={item.url}
          alt={`post image ${idx + 1}`}
          onLoad={() => setLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition,
            cursor: 'pointer',
            display: 'block',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.35s ease',
            position: 'relative',
            zIndex: 2,
          }}
        />
      )}
    </div>
  );
};

const checkIsAfter13th = () => {
  const now = new Date();
  const deadline = new Date(2026, 6, 13, 23, 59, 59); // July 13, 2026 at 23:59:59 (Month is 0-indexed)
  return now > deadline;
};

// ==========================================
// 🚀 MAIN APPLICATION COMPONENT
// ==========================================
function App() {

  // ==========================================


  // 🗄️ STATE MANAGEMENT (HOOKS)


  // ==========================================


  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState('landing'); // landing, login, signup, profile
  const [adminActiveTab, setAdminActiveTab] = useState('admin'); // admin or mentor
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [expandedPendingMentorId, setExpandedPendingMentorId] = useState(null);
  const [fullscreenImageUrl, setFullscreenImageUrl] = useState(null);
  const [userDirectoryPage, setUserDirectoryPage] = useState(1);
  const [userRoleFilter, setUserRoleFilter] = useState('all'); // all, mentor, attendee
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [volunteerSearchQuery, setVolunteerSearchQuery] = useState('');
  const [volunteerPage, setVolunteerPage] = useState(1);
  const [expandedVolunteerId, setExpandedVolunteerId] = useState(null);
  const [isOtherTrackSelected, setIsOtherTrackSelected] = useState(false);
  const [customTrackTitle, setCustomTrackTitle] = useState('');
  const [customTrackDesc, setCustomTrackDesc] = useState('');
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);

  // Blog Feed & 3rd Person Profile Viewer states
  const [blogPosts, setBlogPosts] = useState([]);
  const [starredPostIds, setStarredPostIds] = useState(new Set());
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadCaption, setUploadCaption] = useState('');
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadFileType, setUploadFileType] = useState('image');
  const [sourceMode, setSourceMode] = useState('gallery');
  const [isUploading, setIsUploading] = useState(false);
  const [viewProfileUser, setViewProfileUser] = useState(null);
  const [userProfilePosts, setUserProfilePosts] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadAlert, setUploadAlert] = useState(null);
  const [activeDoubleTapPostId, setActiveDoubleTapPostId] = useState(null);
  const [mentionSuggestions, setMentionSuggestions] = useState([]);
  const [isLoadingBlog, setIsLoadingBlog] = useState(false);
  const [activePostMenuId, setActivePostMenuId] = useState(null);
  const [profileTab, setProfileTab] = useState('posts');
  const [userSavedPosts, setUserSavedPosts] = useState([]);
  const [submitterName, setSubmitterName] = useState('');

  const [savedPostIds, setSavedPostIds] = useState(new Set());
  const [magicLinkState, setMagicLinkState] = useState({}); // { [userId]: 'loading' | 'done' | null }
  const [uploadFiles, setUploadFiles] = useState([]);
  const [activeViewPost, setActiveViewPost] = useState(null);
  const [carouselIndices, setCarouselIndices] = useState({});
  const [activeSharePostId, setActiveSharePostId] = useState(null);
  // Image pan/crop state for upload modal
  const [uploadPositions, setUploadPositions] = useState([]); // [{x:50,y:50}] per file
  const [activePreviewIdx, setActivePreviewIdx] = useState(0); // which thumbnail is selected
  const [isDraggingPreview, setIsDraggingPreview] = useState(false);
  const dragStartRef = React.useRef({ mx: 0, my: 0, px: 50, py: 50 });

  // Feedback Gating states
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const closeMenu = () => { setActivePostMenuId(null); setActiveSharePostId(null); };
    window.addEventListener('click', closeMenu);
    return () => window.removeEventListener('click', closeMenu);
  }, []);

  useEffect(() => {
    if (session?.user?.id) {
      fetchUserSavedPosts();
    } else {
      setUserSavedPosts([]);
      setSavedPostIds(new Set());
    }
  }, [session]);

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isIOSUser, setIsIOSUser] = useState(false);
  const [showInstallBanner, setShowInstallBanner] = useState(true);
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window !== 'undefined') {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
      return !isStandalone;
    }
    return true;
  });
  const [fadeOut, setFadeOut] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [faqLimit, setFaqLimit] = useState(3);
  const [visibleSections, setVisibleSections] = useState(new Set());

  const [user, setUser] = useState({
    id: '',
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
  const lastClickRef = useRef({ time: 0, post: null });
  const hasProfileChanged = originalUser.current
    ? JSON.stringify(user) !== JSON.stringify(originalUser.current)
    : false;
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isA11yOpen, setIsA11yOpen] = useState(false);
  const a11yRef = useRef(null);
  const [a11ySettings, setA11ySettings] = useState(() => {
    let hasSystemNotificationPermission = false;
    if (typeof window !== 'undefined' && 'Notification' in window) {
      hasSystemNotificationPermission = Notification.permission === 'granted';
    }
    try {
      const saved = localStorage.getItem('starlet_a11y_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (hasSystemNotificationPermission) {
          parsed.systemNotifications = true;
        }
        return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse a11y settings', e);
    }
    return {
      contrast: 'default',
      fontSize: 100,
      reducedMotion: false,
      dyslexiaFont: false,
      highlightLinks: false,
      bigCursor: false,
      hideImages: false,
      muteSound: false,
      readingMask: false,
      textToSpeech: false,
      systemNotifications: hasSystemNotificationPermission
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('starlet_a11y_settings', JSON.stringify(a11ySettings));
    } catch (e) {
      console.warn('Failed to save a11y settings', e);
    }

    const html = document.documentElement;

    // 1. Handle Contrast
    if (a11ySettings.contrast === 'high-contrast') {
      html.classList.add('a11y-high-contrast');
    } else {
      html.classList.remove('a11y-high-contrast');
    }

    // 2. Handle Sizing
    html.style.fontSize = `${a11ySettings.fontSize}%`;

    // 3. Handle Reduced Motion
    if (a11ySettings.reducedMotion) {
      html.classList.add('a11y-reduced-motion');
    } else {
      html.classList.remove('a11y-reduced-motion');
    }

    // 4. Handle Dyslexia Font
    if (a11ySettings.dyslexiaFont) {
      html.classList.add('a11y-dyslexia-font');
    } else {
      html.classList.remove('a11y-dyslexia-font');
    }

    // 5. Handle Highlight Links
    if (a11ySettings.highlightLinks) {
      html.classList.add('a11y-highlight-links');
    } else {
      html.classList.remove('a11y-highlight-links');
    }

    // 6. Handle Big Cursor
    if (a11ySettings.bigCursor) {
      html.classList.add('a11y-big-cursor');
    } else {
      html.classList.remove('a11y-big-cursor');
    }

    // 7. Handle Hide Images
    if (a11ySettings.hideImages) {
      html.classList.add('a11y-hide-images');
    } else {
      html.classList.remove('a11y-hide-images');
    }
  }, [a11ySettings]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (a11yRef.current && !a11yRef.current.contains(event.target)) {
        setIsA11yOpen(false);
      }
    };
    if (isA11yOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isA11yOpen]);

  const [maskY, setMaskY] = useState(300);

  useEffect(() => {
    if (!a11ySettings.readingMask) return;
    const handleMouseMove = (e) => {
      setMaskY(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [a11ySettings.readingMask]);

  useEffect(() => {
    if (!a11ySettings.textToSpeech) {
      window.speechSynthesis?.cancel();
      return;
    }

    const handleSpeechTrigger = (e) => {
      const target = e.target;
      const isWidget = target.closest('.a11y-widget-container') || target.closest('.a11y-widget-btn');
      if (isWidget) return;

      const tag = target.tagName.toLowerCase();
      const isTextTag = ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'strong', 'em', 'small', 'td', 'th'].includes(tag);

      if (isTextTag && target.innerText) {
        window.speechSynthesis?.cancel();

        const utterance = new SpeechSynthesisUtterance(target.innerText);

        // Adjust pitch and rate to sound like a young girl
        utterance.pitch = 1.45;
        utterance.rate = 1.05;

        if (window.speechSynthesis) {
          const voices = window.speechSynthesis.getVoices();
          const youngFemaleVoice = voices.find(voice =>
            voice.name.toLowerCase().includes('samantha') ||
            voice.name.toLowerCase().includes('zira') ||
            voice.name.toLowerCase().includes('google us english') ||
            voice.name.toLowerCase().includes('hazel') ||
            voice.name.toLowerCase().includes('female') ||
            voice.name.toLowerCase().includes('girl') ||
            voice.name.toLowerCase().includes('elsa') ||
            voice.name.toLowerCase().includes('anna')
          );
          if (youngFemaleVoice) {
            utterance.voice = youngFemaleVoice;
          }
        }

        target.classList.add('a11y-speaking-active');
        utterance.onend = () => {
          target.classList.remove('a11y-speaking-active');
        };
        utterance.onerror = () => {
          target.classList.remove('a11y-speaking-active');
        };

        window.speechSynthesis?.speak(utterance);
      }
    };

    document.addEventListener('click', handleSpeechTrigger);
    return () => {
      document.removeEventListener('click', handleSpeechTrigger);
      window.speechSynthesis?.cancel();
    };
  }, [a11ySettings.textToSpeech]);

  const [showAboutPopup, setShowAboutPopup] = useState(false);
  const [showForgotPasswordPopup, setShowForgotPasswordPopup] = useState(false);
  const [showAikyamPopup, setShowAikyamPopup] = useState(false);
  const [showAdiPopup, setShowAdiPopup] = useState(false);
  const [showLTPopup, setShowLTPopup] = useState(false);
  const [showRegPopup, setShowRegPopup] = useState(false);
  const [showSynthitePopup, setShowSynthitePopup] = useState(false);
  const [showReccaaPopup, setShowReccaaPopup] = useState(false);
  const [showNSSPopup, setShowNSSPopup] = useState(false);
  const [showWECPopup, setShowWECPopup] = useState(false);
  const [showFrenchToastPopup, setShowFrenchToastPopup] = useState(false);
  const [showESAFPopup, setShowESAFPopup] = useState(false);

  const [judgeScores, setJudgeScores] = useState({});
  const [tempScores, setTempScores] = useState({});
  const [savingScoreId, setSavingScoreId] = useState(null);
  const [allJudgeScores, setAllJudgeScores] = useState([]);
  const [showroomTab, setShowroomTab] = useState('projects'); // 'projects' or 'judging'
  const [expandedJudgeDescriptions, setExpandedJudgeDescriptions] = useState({});
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [expandedRows, setExpandedRows] = useState({});
  const searchInputRef = useRef(null);

  const playClickSound = () => {
    if (!isSoundEnabled || a11ySettings.muteSound) return;
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

  const playNotificationSound = () => {
    if (!isSoundEnabled || a11ySettings.muteSound) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

      // Tone 1
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
      gain1.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);
      osc1.start();
      osc1.stop(audioCtx.currentTime + 0.15);

      // Tone 2 (delayed slightly)
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.12); // E5
      gain2.gain.setValueAtTime(0.0, audioCtx.currentTime);
      gain2.gain.setValueAtTime(0.12, audioCtx.currentTime + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);
      osc2.start();
      osc2.stop(audioCtx.currentTime + 0.35);
    } catch (e) { }
  };

  const playSuccessSound = () => {
    if (!isSoundEnabled || a11ySettings.muteSound) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, audioCtx.currentTime);
      osc1.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1);
      osc1.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.2);
      gain1.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.45);
      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);
      osc1.start();
      osc1.stop(audioCtx.currentTime + 0.45);
    } catch (e) { }
  };

  const playErrorSound = () => {
    if (!isSoundEnabled || a11ySettings.muteSound) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(220, audioCtx.currentTime);
      osc1.frequency.setValueAtTime(147, audioCtx.currentTime + 0.15);
      gain1.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);
      osc1.start();
      osc1.stop(audioCtx.currentTime + 0.4);
    } catch (e) { }
  };

  const showSystemNotification = (title, body, tag = 'starlet-notification') => {
    if (a11ySettings.systemNotifications && 'Notification' in window && Notification.permission === 'granted') {
      const faviconUrl = window.location.origin + '/brand/favicon.png';
      const iconUrl = window.location.origin + '/brand/pwa-icon-192.png';
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification(title, {
            body: body,
            icon: iconUrl,
            badge: faviconUrl,
            vibrate: [200, 100, 200],
            tag: tag,
            renotify: true
          });
        }).catch((err) => {
          console.error('Service Worker ready failed:', err);
          new Notification(title, {
            body: body,
            icon: iconUrl
          });
        });
      } else {
        new Notification(title, {
          body: body,
          icon: iconUrl
        });
      }
    }
  };

  const playIssueAlertSound = () => {
    if (!isSoundEnabled || a11ySettings.muteSound) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

      // Tone 1: retro/triangle wave beep
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(440, audioCtx.currentTime); // A4
      gain1.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);
      osc1.start();
      osc1.stop(audioCtx.currentTime + 0.1);

      // Tone 2: lower retro/triangle wave beep, delayed
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(349.23, audioCtx.currentTime + 0.15); // F4
      gain2.gain.setValueAtTime(0.0, audioCtx.currentTime);
      gain2.gain.setValueAtTime(0.15, audioCtx.currentTime + 0.15);
      gain2.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);
      osc2.start();
      osc2.stop(audioCtx.currentTime + 0.25);
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
      const recipient = 'mindempowered2020@gmail.com';
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
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [expandedProject, setExpandedProject] = useState(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isIdeaModalOpen, setIsIdeaModalOpen] = useState(false);
  const [showroomSearchQuery, setShowroomSearchQuery] = useState('');
  const [settings, setSettings] = useState({
    registration_open: 'true',
    certificates_released: 'false',
    event_announcement: '',
    google_drive_link: '',
    project_submission_open: 'false',
    winner_1st_email: '',
    winner_2nd_email: '',
    winner_3rd_email: '',
    winner_innovation_email: ''
  });

  const winnerEmails = [
    settings.winner_1st_email,
    settings.winner_2nd_email,
    settings.winner_3rd_email,
    settings.winner_innovation_email
  ].map(e => e ? e.toLowerCase().trim() : '');

  const isWinner = user.email && winnerEmails.includes(user.email.toLowerCase().trim());
  const [announcementHistory, setAnnouncementHistory] = useState([]);
  const [isBannerDismissed, setIsBannerDismissed] = useState(true);
  const prevAnnouncementRef = useRef('');

  useEffect(() => {
    if (settings.event_announcement) {
      const dismissed = localStorage.getItem('dismissed_announcement');
      const isNew = prevAnnouncementRef.current !== settings.event_announcement;

      prevAnnouncementRef.current = settings.event_announcement;

      const isDismissed = dismissed === settings.event_announcement;
      setIsBannerDismissed(isDismissed);

      if (isNew && !isDismissed) {
        playNotificationSound();
        showSystemNotification('Starlet 5.0 Announcement', settings.event_announcement, 'starlet-announcement');
      }
    } else {
      setIsBannerDismissed(true);
      prevAnnouncementRef.current = '';
    }
  }, [settings.event_announcement, a11ySettings.systemNotifications]);

  useEffect(() => {
    // Request notification permission if running as a standalone app and permission is default
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        setA11ySettings((prev) => {
          if (!prev.systemNotifications) {
            return { ...prev, systemNotifications: true };
          }
          return prev;
        });
      }
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
      if (isStandalone && Notification.permission === 'default') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            setA11ySettings((prev) => ({ ...prev, systemNotifications: true }));
          }
        });
      }

      // Request camera + microphone permission proactively when running as PWA
      // This triggers the OS system permission dialog so it doesn't surprise the user mid-upload
      if (isStandalone && navigator.mediaDevices && navigator.permissions) {
        navigator.permissions.query({ name: 'camera' }).then((result) => {
          if (result.state === 'prompt') {
            // Briefly open and immediately close the stream to trigger the OS permission dialog
            navigator.mediaDevices.getUserMedia({ video: true, audio: false })
              .then((stream) => {
                stream.getTracks().forEach((track) => track.stop());
              })
              .catch(() => {
                // User denied or hardware unavailable – silently ignore
              });
          }
        }).catch(() => {
          // Permissions API not supported – silently ignore
        });
      }
    }

    // Pre-warm Speech Synthesis voices for mobile/PWA TTS compatibility
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => {
          window.speechSynthesis.getVoices();
        };
      }
    }

    // Inject html5-qrcode library for camera QR scanner
    if (typeof window !== 'undefined' && !window.Html5QrcodeScanner) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/html5-qrcode';
      script.type = 'text/javascript';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    // 5 seconds background refresh interval
    const intervalId = setInterval(() => {
      fetchSettings();
      if (isLoggedIn) {
        if (user.role === 'mentor' || (user.role === 'admin' && adminActiveTab === 'mentor')) {
          fetchMentorRequests();
        }
        if (user.role === 'admin' || user.role === 'volunteer') {
          fetchAllUsers(); // Also fetches system_issues
        }
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [isLoggedIn, user?.role, adminActiveTab, session?.user?.id]);

  useEffect(() => {
    // Detect iOS users who are not in standalone mode
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    if (isIOS && !isStandalone) {
      setIsIOSUser(true);
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    const handleAppInstalled = () => {
      setInstallPrompt(null);
      console.log('Starlet PWA was installed successfully');
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      console.log(`User response to install prompt: ${outcome}`);
      setInstallPrompt(null);
      setShowInstallBanner(false);
    }
  };

  const getSubmissionTeamLeader = (teamName) => {
    if (!teamName) return '';
    const leader = allUsers.find(
      u => u.team_name === teamName && u.is_team_leader
    );
    return leader ? leader.full_name : '';
  };

  const getEmbedLink = (url) => {
    if (!url) return '';
    try {
      // OneDrive live link folder conversion
      if (url.includes('onedrive.live.com') && url.includes('redir')) {
        return url.replace('redir', 'embed');
      }
      // SharePoint shared folders conversion
      if (url.includes('sharepoint.com') && url.includes(':f:')) {
        return url.replace(':f:', ':w:') + '?web=1';
      }
      // Google Drive folders and files conversion
      if (url.includes('drive.google.com')) {
        if (url.includes('/file/d/')) {
          return url.replace('/view', '/preview').replace('/edit', '/preview');
        }
        if (url.includes('/folderview') || url.includes('/folders/')) {
          const match = url.match(/\/folders\/([a-zA-Z0-9-_]+)/);
          if (match && match[1]) {
            return `https://drive.google.com/embeddedfolderview?id=${match[1]}#grid`;
          }
        }
      }
      return url;
    } catch (e) {
      return url;
    }
  };

  const activeScannerRef = useRef(null);
  const scanTimeoutRef = useRef(null);

  const handleVerifyCheckin = async (userId) => {
    try {
      setScanResult({ success: true, message: 'Verifying with database...' });

      // Clear any pending timeout first
      if (scanTimeoutRef.current) {
        clearTimeout(scanTimeoutRef.current);
        scanTimeoutRef.current = null;
      }

      // 1. Fetch user to verify
      const { data: profile, error: fetchError } = await supabase
        .from('profiles')
        .select('id, full_name, email, is_approved')
        .eq('id', userId)
        .single();

      if (fetchError || !profile) {
        setScanResult({ success: false, message: 'Verification Failed: User ID not found.' });
        return;
      }

      if (profile.is_approved) {
        setScanResult({ success: true, message: `${profile.full_name} is already checked in!`, user: profile });

        // Auto-clear notification after 3 seconds so the screen is ready for the next attendee
        scanTimeoutRef.current = setTimeout(() => {
          setScanResult(null);
        }, 3000);
        return;
      }

      // 2. Mark as checked in / approved
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ is_approved: true })
        .eq('id', userId);

      if (updateError) {
        setScanResult({ success: false, message: 'Database Update Failed: ' + updateError.message });
        return;
      }

      // 3. Log the check-in event in audit logs
      await supabase
        .from('audit_logs')
        .insert([{
          action: 'Attendance Check-in (QR)',
          details: { user_id: userId, name: profile.full_name, email: profile.email }
        }]);

      setScanResult({ success: true, message: `Checked In: ${profile.full_name}!`, user: { ...profile, is_approved: true } });

      // 4. Reload local user state to sync with dashboard grids & sheets
      fetchAllUsers();

      // Auto-clear notification after 3 seconds so the screen is ready for the next attendee
      scanTimeoutRef.current = setTimeout(() => {
        setScanResult(null);
      }, 3000);
    } catch (e) {
      console.error(e);
      setScanResult({ success: false, message: 'Verification Error: ' + e.message });
    }
  };

  useEffect(() => {
    if (isScannerOpen) {
      const timer = setTimeout(() => {
        if (window.Html5Qrcode) {
          const html5Qrcode = new window.Html5Qrcode("checkin-qr-reader");

          html5Qrcode.start(
            { facingMode: "environment" },
            {
              fps: 10,
              qrbox: { width: 220, height: 220 }
            },
            async (decodedText) => {
              playNotificationSound();
              await handleVerifyCheckin(decodedText);
            },
            (error) => {
              // Ignore standard frame scan errors
            }
          ).catch((err) => {
            console.error("Camera access failed:", err);
            setScanResult({ success: false, message: "Camera permission denied or not found." });
          });

          activeScannerRef.current = html5Qrcode;
        } else {
          setScanResult({ success: false, message: 'Camera Scanner Library not loaded yet. Please wait a second...' });
        }
      }, 300);

      return () => {
        clearTimeout(timer);
        if (scanTimeoutRef.current) {
          clearTimeout(scanTimeoutRef.current);
        }
      };
    }
  }, [isScannerOpen]);

  const [announcementInput, setAnnouncementInput] = useState('');

  useEffect(() => {
    if (settings.event_announcement !== undefined) {
      setAnnouncementInput(settings.event_announcement || '');
    }
  }, [settings.event_announcement]);

  const [auditLogs, setAuditLogs] = useState([]);
  const [expandedTeam, setExpandedTeam] = useState(null);
  const [submissionsFilter, setSubmissionsFilter] = useState('all'); // all, team
  const [submissionStatusFilter, setSubmissionStatusFilter] = useState('all'); // all, submitted, pending
  const [activeSquadsPage, setActiveSquadsPage] = useState(1);
  const [venues, setVenues] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [problemStatements, setProblemStatements] = useState([]);
  const [visibleLandingTracksCount, setVisibleLandingTracksCount] = useState(3);
  const [mobileTrackPageIndex, setMobileTrackPageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('next');
  const [problemStatementsPage, setProblemStatementsPage] = useState(1);
  const [activeMentorsPage, setActiveMentorsPage] = useState(1);
  const [pendingMentorsPage, setPendingMentorsPage] = useState(1);
  const [projectSubmissionsPage, setProjectSubmissionsPage] = useState(1);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [mentorRequestModal, setMentorRequestModal] = useState(null);
  const [projectSubmissions, setProjectSubmissions] = useState([]);
  const [ideaSubmissions, setIdeaSubmissions] = useState([]);
  const [mySubmission, setMySubmission] = useState(null);
  const [myIdeaSubmission, setMyIdeaSubmission] = useState(null);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [activeScheduleDay, setActiveScheduleDay] = useState(() => new Date() >= new Date('2026-07-11T23:00:00') ? 2 : 1);

  // Fetch mentor's profile socials when mentor modal is opened
  useEffect(() => {
    let mounted = true;
    const fetchMentorProfileSocials = async () => {
      if (!selectedMentor || !selectedMentor.profile_id) return;
      try {
        const { data } = await supabase
          .from('profiles')
          .select('github_url, linkedin_url, twitter_url, full_name')
          .eq('id', selectedMentor.profile_id)
          .single();
        if (mounted && data) {
          setSelectedMentor(prev => ({ ...prev, ...data }));
        }
      } catch (err) {
        // ignore
      }
    };
    fetchMentorProfileSocials();
    return () => { mounted = false; };
  }, [selectedMentor?.profile_id]);

  const galleryRef = useRef(null);
  const landingGalleryRef = useRef(null);
  const requestRef = useRef();
  const partnersRef = useRef(null);
  const prizesRef = useRef(null);
  const mentorGridRef = useRef(null);

  const [logsTimeFilter, setLogsTimeFilter] = useState('all');

  const handleAdminNavClick = (sectionId) => {
    if (activeView !== 'profile') {
      setActiveView('profile');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleHomeNavClick = (sectionId, e) => {
    if (e) e.preventDefault();
    setIsMenuOpen(false);

    const performScroll = () => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    if (activeView !== 'landing') {
      setActiveView('landing');
      setTimeout(performScroll, 300);
    } else {
      setTimeout(performScroll, 100);
    }
  };

  const navigateToLanding = (e) => {
    if (e) e.preventDefault();
    setIsMenuOpen(false);
    setActiveView('landing');

    if (window.location.hash) {
      window.history.pushState("", document.title, window.location.pathname + window.location.search);
    }

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 100);
  };

  const renderPagination = (currentPage, totalItems, itemsPerPage, onPageChange) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages <= 1) return null;

    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > 5) {
      if (currentPage <= 5) {
        startPage = 1;
        endPage = 5;
      } else {
        startPage = currentPage - 4;
        endPage = currentPage;
      }
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="pagination-container" style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="btn-small pagination-btn"
          style={{
            opacity: currentPage === 1 ? 0.5 : 1,
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            background: '#fff',
            color: 'var(--text-navy)',
            border: '1px solid var(--text-navy)',
            fontFamily: "'Fredoka One', cursive"
          }}
        >
          Prev
        </button>
        {pages.map(p => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`btn-small pagination-btn ${currentPage === p ? 'active' : ''}`}
            style={{
              background: currentPage === p ? 'var(--pink-primary)' : '#fff',
              color: currentPage === p ? '#fff' : 'var(--text-navy)',
              fontWeight: 'bold',
              border: currentPage === p ? '1px solid var(--pink-primary)' : '1px solid var(--text-navy)',
              cursor: 'pointer',
              fontFamily: "'Fredoka One', cursive",
              minWidth: '32px'
            }}
          >
            {p}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="btn-small pagination-btn"
          style={{
            opacity: currentPage === totalPages ? 0.5 : 1,
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            background: '#fff',
            color: 'var(--text-navy)',
            border: '1px solid var(--text-navy)',
            fontFamily: "'Fredoka One', cursive"
          }}
        >
          Next
        </button>
      </div>
    );
  };


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

    if (!showSplash) return;

    // Splash Screen Dynamic Loader
    const assets = [
      'brand/Logo.png',
      'collaborators/Mind Empowered.gif',
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
    // 0. Handle magic-link auto-login from URL query params
    //    URLs look like: https://starlet.mind-empowered.org/?token_hash=xxx&type=magiclink
    const urlParams = new URLSearchParams(window.location.search);
    const tokenHash = urlParams.get('token_hash');
    const tokenType = urlParams.get('type');
    const isMagicLinkFlow = !!(tokenHash && tokenType);

    if (isMagicLinkFlow) {
      // Clean the URL immediately so the token isn't visible / re-used on refresh
      window.history.replaceState({}, '', window.location.pathname + window.location.hash);

      supabase.auth.verifyOtp({ token_hash: tokenHash, type: tokenType })
        .then(({ data: otpData, error: otpError }) => {
          if (otpError) {
            console.error('Magic link verification failed:', otpError);
            alert('This login link has expired or already been used. Please request a new one from your admin.');
            setLoading(false);
          } else if (otpData?.session) {
            // Directly set the session from verifyOtp response
            setSession(otpData.session);
            setIsLoggedIn(true);
            setLoading(false);
            fetchProfile(otpData.session.user.id);
          }
        });
    }

    // 1. Check for initial session (skip if magic link flow — verifyOtp handles it)
    if (!isMagicLinkFlow) {
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
    }

    // 2. Listen for auth changes (always set up — handles magic-link, password recovery, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (session) {
        setIsLoggedIn(true);
        setLoading(false);
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
    fetchBlogPosts();
    fetchSubmissions();
    if (isLoggedIn && user.role === 'attendee') {
      fetchMySubmission();
      fetchMyIdeaSubmission();
    }

    // 4. Realtime listener for venues, settings, and mentors
    const venueChannel = supabase.channel('db-updates');

    venueChannel.on('postgres_changes', { event: '*', schema: 'public', table: 'venues' }, () => {
      fetchVenues();
    });

    venueChannel.on('postgres_changes', { event: '*', schema: 'public', table: 'event_settings' }, () => {
      fetchSettings();
    });

    venueChannel.on('postgres_changes', { event: '*', schema: 'public', table: 'mentors' }, () => {
      fetchAllMentors();
    });

    venueChannel.on('postgres_changes', { event: '*', schema: 'public', table: 'project_submissions' }, () => {
      fetchSubmissions();
      if (isLoggedIn && user.role === 'attendee') fetchMySubmission();
    });

    venueChannel.on('postgres_changes', { event: '*', schema: 'public', table: 'idea_submissions' }, () => {
      fetchSubmissions();
      if (isLoggedIn && user.role === 'attendee') fetchMyIdeaSubmission();
    });

    venueChannel.subscribe();

    return () => {
      subscription.unsubscribe();
      supabase.removeChannel(venueChannel);
    };
  }, []);

  useEffect(() => {
    if (!isLoggedIn || user.role !== 'attendee' || !session?.user?.id) return;
    fetchMySubmission();
    fetchMyIdeaSubmission();
  }, [isLoggedIn, user.role, user.teamName, session?.user?.id]);

  useEffect(() => {
    if (isLoggedIn && session?.user?.id) {
      fetchUserStarredPosts();
      fetchUserProfilePosts(session.user.id);
    } else {
      setStarredPostIds(new Set());
      setUserProfilePosts([]);
    }
  }, [isLoggedIn, session?.user?.id]);

  useEffect(() => {
    if (!isLoggedIn || !session?.user?.id || user.role !== 'attendee') return;

    const userChannel = supabase.channel(`user-profile-checkin-${session.user.id}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'profiles', filter: `id=eq.${session.user.id}` },
        (payload) => {
          console.log('Realtime profile update detected:', payload.new);
          if (payload.new.is_approved && !payload.old.is_approved) {
            playNotificationSound();
            setActiveAlert({
              id: Date.now(),
              type: 'checkin_success',
              message: 'Your morning attendance check-in has been verified by the desk volunteer!'
            });
            setUser(prev => ({ ...prev, isApproved: true }));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(userChannel);
    };
  }, [isLoggedIn, session?.user?.id, user.role]);

  // URL Hash-based Routing for Sponsors Page (UIC Overview)
  useEffect(() => {
    const checkHashRoute = () => {
      const hash = window.location.hash;
      if (hash === '#uic-overview' || hash === '#sponsors-overview') {
        setActiveView('sponsors-overview');
      } else if (hash === '#landing' || hash === '' || hash === '#') {
        setActiveView('landing');
      }
    };

    // Check on initial mount
    checkHashRoute();

    // Listen for hash changes
    window.addEventListener('hashchange', checkHashRoute);
    return () => window.removeEventListener('hashchange', checkHashRoute);
  }, []);

  // Sync activeView changes back to the URL hash
  useEffect(() => {
    const currentHash = window.location.hash;
    if (activeView === 'sponsors-overview') {
      if (currentHash !== '#uic-overview' && currentHash !== '#sponsors-overview') {
        window.location.hash = 'uic-overview';
      }
    } else if (activeView === 'landing') {
      if (currentHash === '#uic-overview' || currentHash === '#sponsors-overview') {
        // Clear hash without scrolling
        window.history.pushState("", document.title, window.location.pathname + window.location.search);
      }
    }
  }, [activeView]);

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
      .select('id, full_name, email, avatar_url, user_role, team_name, team_id, is_team_leader')
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
          id: userId || '',
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
          isTeamLeader: false,
          problemStatementId: null,
          socials: {
            github: '',
            linkedin: '',
            twitter: ''
          }
        });
      } else if (data) {
        setUser({
          id: data.id || '',
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
          isTeamLeader: data.is_team_leader || false,
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
          isTeamLeader: data.is_team_leader || false,
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

  const fetchBlogPosts = async (isRefresh = false) => {
    // Only show the full skeleton on the very first load (no posts yet).
    // Background refreshes (star toggle, upload, realtime) must never
    // replace the list with a skeleton – that causes the flicker.
    if (!isRefresh) setIsLoadingBlog(true);
    try {
      const { data: posts, error } = await supabase
        .from('blog_posts')
        .select('*, profiles:user_id(full_name, avatar_url), blog_post_stars(user_id)')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching blog posts:', error);
        return;
      }

      if (posts) {
        const mappedPosts = posts.map(post => {
          const starsList = post.blog_post_stars || [];
          const starCount = starsList.length;
          const isStarred = session?.user?.id ? starsList.some(s => s.user_id === session.user.id) : false;
          return {
            ...post,
            starCount,
            isStarred
          };
        });
        // Smart diff: only update state if something actually changed.
        // Comparing id+starCount+isStarred+caption covers all visible mutations.
        // This prevents unnecessary re-renders (and shimmer replay) when the
        // data from Supabase is identical to what we already have.
        const sig = (list) => list.map(p => `${p.id}:${p.starCount}:${p.isStarred}:${p.caption}:${JSON.stringify(p.media_positions)}`).join('|');
        setBlogPosts(prev => sig(prev) === sig(mappedPosts) ? prev : mappedPosts);
      }

      // Fetch user saves if logged in
      if (session?.user?.id) {
        try {
          const { data: saves } = await supabase
            .from('blog_post_saves')
            .select('post_id')
            .eq('user_id', session.user.id);
          if (saves) {
            setSavedPostIds(new Set(saves.map(s => s.post_id)));
          }
        } catch (err) {
          // saves table error — silently skip
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingBlog(false);
    }
  };

  const fetchUserStarredPosts = async () => {
    if (!session?.user?.id) return;
    try {
      const { data, error } = await supabase
        .from('blog_post_stars')
        .select('post_id')
        .eq('user_id', session.user.id);

      if (data) {
        setStarredPostIds(new Set(data.map(item => item.post_id)));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleStarToggle = async (postId) => {
    if (!isLoggedIn || !session?.user?.id) {
      alert('Please log in to star posts!');
      return;
    }
    const currentUserId = session.user.id;
    const isCurrentlyStarred = blogPosts.find(p => p.id === postId)?.isStarred;

    try {
      if (isCurrentlyStarred) {
        const { error } = await supabase
          .from('blog_post_stars')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', currentUserId);

        if (!error) {
          playNotificationSound();
        }
      } else {
        const { error } = await supabase
          .from('blog_post_stars')
          .insert([{ post_id: postId, user_id: currentUserId }]);

        if (!error) {
          playNotificationSound();
        }
      }
      fetchBlogPosts(true);
      if (activeView === 'profile' || activeView === 'profile-view') {
        const targetId = activeView === 'profile-view' ? viewProfileUser?.id : session.user.id;
        if (targetId) fetchUserProfilePosts(targetId);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const uploadSingleFilePromise = (file) => {
    return new Promise((resolve, reject) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${session.user.id}-${Date.now()}-${Math.floor(Math.random() * 1000)}.${fileExt}`;
      const filePath = `posts/${fileName}`;
      const url = `${supabaseUrl}/storage/v1/object/blog-media/${filePath}`;

      const xhr = new XMLHttpRequest();
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', `Bearer ${session.access_token}`);
      xhr.setRequestHeader('apikey', supabaseAnonKey);
      xhr.setRequestHeader('Content-Type', file.type);

      xhr.onload = () => {
        if (xhr.status === 200 || xhr.status === 201) {
          const { data } = supabase.storage.from('blog-media').getPublicUrl(filePath);
          resolve({
            url: data.publicUrl,
            type: file.type.startsWith('video') ? 'video' : 'image'
          });
        } else {
          reject(new Error(`Failed to upload ${file.name}`));
        }
      };
      xhr.onerror = () => reject(new Error(`Network error uploading ${file.name}`));
      xhr.send(file);
    });
  };

  // ==========================================


  // ✍️ BLOG & POST HANDLERS


  // ==========================================


  const handleUploadPost = async (e) => {
    e.preventDefault();
    if (!isLoggedIn || !session?.user?.id) {
      playErrorSound();
      setUploadAlert({ type: 'error', message: 'Please log in to upload posts!' });
      return;
    }
    if (user.role === 'attendee' && !user.isApproved) {
      playErrorSound();
      setUploadAlert({ type: 'error', message: 'Only attendees marked as "Present" can upload posts!' });
      return;
    }
    if (uploadFiles.length === 0 && !uploadCaption.trim()) {
      playErrorSound();
      setUploadAlert({ type: 'error', message: 'Please write a caption or select a file to upload.' });
      return;
    }

    // ── File size validation ──────────────────────────────────────────
    const MAX_SIZE = 50 * 1024 * 1024; // 50 MB
    for (const file of uploadFiles) {
      if (file.size > MAX_SIZE) {
        playErrorSound();
        const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
        setUploadAlert({
          type: 'error',
          message: `"${file.name}" is ${sizeMB} MB — files must be under 50 MB. Please compress the video or choose a shorter clip.`
        });
        return;
      }
    }

    setIsUploading(true);
    setUploadProgress(10);

    try {
      const mediaItems = [];
      const totalFiles = uploadFiles.length;

      for (let i = 0; i < totalFiles; i++) {
        const file = uploadFiles[i];
        const result = await uploadSingleFilePromise(file);
        mediaItems.push(result);
        setUploadProgress(Math.round(((i + 1) / totalFiles) * 90) + 10);
      }

      const mediaUrlPayload = mediaItems.length === 0 ? null : (mediaItems.length === 1 ? mediaItems[0].url : JSON.stringify(mediaItems));
      const mediaTypePayload = mediaItems.length === 0 ? 'text' : (mediaItems.length === 1 ? mediaItems[0].type : 'carousel');

      // Build positions array — only for images; videos don't need pan
      const positionsPayload = uploadFiles.map((file, idx) => {
        if (file.type.startsWith('video')) return { position: 'center center' };
        const pos = uploadPositions[idx] || { x: 50, y: 50 };
        return { position: `${pos.x}% ${pos.y}%` };
      });

      const { error: dbError } = await supabase
        .from('blog_posts')
        .insert([{
          user_id: session.user.id,
          caption: uploadCaption,
          media_url: mediaUrlPayload,
          media_type: mediaTypePayload,
          media_positions: positionsPayload,
        }]);

      if (dbError) {
        throw dbError;
      }

      playSuccessSound();
      setUploadAlert({ type: 'success', message: 'Vlog posted successfully!' });

      setUploadCaption('');
      setUploadFiles([]);
      setUploadPositions([]);
      setActivePreviewIdx(0);
      setIsUploadModalOpen(false);
      setUploadProgress(0);

      setTimeout(() => setUploadAlert(null), 4000);

      fetchBlogPosts(true);
      fetchUserProfilePosts(session.user.id);
    } catch (err) {
      console.error(err);
      playErrorSound();
      setUploadAlert({ type: 'error', message: 'Upload failed: ' + err.message });
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeletePost = async (postId) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);

      if (error) {
        alert('Failed to delete post: ' + error.message);
      } else {
        fetchBlogPosts(true);
        const targetId = activeView === 'profile-view' ? viewProfileUser?.id : session.user.id;
        if (targetId) fetchUserProfilePosts(targetId);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCaptionChange = async (val) => {
    setUploadCaption(val);
    const words = val.split(/\s+/);
    const lastWord = words[words.length - 1];
    if (lastWord && lastWord.startsWith('@')) {
      const query = lastWord.slice(1);
      if (query.length >= 0) {
        try {
          const { data } = await supabase
            .from('profiles')
            .select('id, full_name')
            .ilike('full_name', `%${query}%`)
            .limit(5);
          setMentionSuggestions(data || []);
        } catch (e) {
          console.error(e);
        }
      } else {
        setMentionSuggestions([]);
      }
    } else {
      setMentionSuggestions([]);
    }
  };

  const handleSelectMention = (targetUser) => {
    const words = uploadCaption.split(/\s+/);
    words[words.length - 1] = `@${targetUser.full_name.replace(/\s+/g, '_')}`;
    setUploadCaption(words.join(' ') + ' ');
    setMentionSuggestions([]);
  };

  const formatPostTimestamp = (dateString) => {
    const postedDate = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - postedDate.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHrs = Math.floor(diffMins / 60);

    if (diffSecs < 1) {
      return 'just now';
    }
    if (diffSecs < 60) {
      return `${diffSecs}s ago`;
    }
    if (diffMins < 60) {
      return `${diffMins} mint ago`;
    }
    if (diffHrs < 24) {
      return `${diffHrs}hr ago`;
    }
    return postedDate.toLocaleDateString();
  };

  const renderCaptionWithMentions = (captionText) => {
    if (!captionText) return null;
    const tokens = captionText.split(/(\s+)/);
    return tokens.map((token, idx) => {
      if (token.startsWith('@') && token.length > 1) {
        const cleanName = token.substring(1).replace(/_/g, ' ');
        return (
          <span
            key={idx}
            className="caption-mention-link"
            style={{ color: 'var(--pink-primary)', cursor: 'pointer', fontWeight: 'bold' }}
            onClick={async () => {
              try {
                const { data } = await supabase
                  .from('profiles')
                  .select('*')
                  .ilike('full_name', cleanName)
                  .single();
                if (data?.id) {
                  const targetUser = {
                    id: data.id,
                    name: data.full_name || 'Anonymous User',
                    role: data.user_role || 'attendee',
                    bio: data.bio || '',
                    avatarUrl: data.avatar_url || '',
                    teamName: data.team_name || '',
                    trackId: data.track_id || '',
                    socials: {
                      github: data.github_url || '',
                      linkedin: data.linkedin_url || '',
                    }
                  };
                  setViewProfileUser(targetUser);
                  setActiveView('profile-view');
                  fetchUserProfilePosts(data.id);
                }
              } catch (e) {
                console.error('Error finding mentioned user profile:', e);
              }
            }}
          >
            {token}
          </span>
        );
      }
      return token;
    });
  };

  const handlePostDoubleTap = (postId) => {
    const post = blogPosts.find(p => p.id === postId);
    if (post && !post.isStarred) {
      handleStarToggle(postId);
    }
    setActiveDoubleTapPostId(postId);
    setTimeout(() => {
      setActiveDoubleTapPostId(null);
    }, 850);
  };

  const handleReportPost = async (post) => {
    if (!isLoggedIn || !session?.user?.id) {
      setUploadAlert({ type: 'error', message: 'Please log in to report posts!' });
      playErrorSound();
      return;
    }
    const confirmReport = window.confirm("Are you sure you want to report this post to the admins?");
    if (!confirmReport) return;

    try {
      // Parse media items for thumbnail preview
      let mediaItems = [];
      try {
        mediaItems = post.media_type === 'carousel' || post.media_url?.startsWith('[')
          ? JSON.parse(post.media_url)
          : [{ url: post.media_url, type: post.media_type }];
      } catch (_) {
        mediaItems = [{ url: post.media_url, type: post.media_type }];
      }
      const firstMedia = mediaItems[0] || {};

      const reportPayload = {
        user_id: session.user.id,
        report_type: 'post',
        post_id: post.id,
        reported_user_id: post.user_id,
        reported_user_name: post.profiles?.full_name || 'Anonymous',
        media_url: firstMedia.url || post.media_url,
        media_type: firstMedia.type || post.media_type,
        caption: post.caption || '',
        description: `POST REPORT — Post by "${post.profiles?.full_name || 'Anonymous'}". Caption: "${(post.caption || '').slice(0, 120)}". Media: ${firstMedia.url || post.media_url}`,
      };

      const { error } = await supabase
        .from('system_issues')
        .insert([reportPayload]);

      if (error) throw error;
      setUploadAlert({ type: 'success', message: 'Thank you! The post has been reported to the admins.' });
      playSuccessSound();
    } catch (err) {
      console.error(err);
      setUploadAlert({ type: 'error', message: 'Failed to report post: ' + err.message });
      playErrorSound();
    }
  };

  const renderProfileGridMedia = (post) => {
    let thumbUrl = post.media_url;
    let isVid = post.media_type === 'video';
    if (post.media_type === 'carousel' || (thumbUrl && typeof thumbUrl === 'string' && thumbUrl.startsWith('['))) {
      try {
        const parsed = JSON.parse(thumbUrl);
        if (parsed.length > 0) {
          thumbUrl = parsed[0].url;
          isVid = parsed[0].type === 'video';
        }
      } catch (e) { }
    }
    return isVid ? (
      <div className="video-thumbnail-placeholder">
        <video src={thumbUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} muted />
        <div className="video-play-indicator">▶</div>
      </div>
    ) : (
      <img src={thumbUrl} alt="vlog" />
    );
  };

  const renderPostMedia = (post) => {
    if (post.media_type === 'text' || !post.media_url) return null;
    let mediaItems = [];
    try {
      if (post.media_type === 'carousel' || post.media_url.startsWith('[')) {
        mediaItems = JSON.parse(post.media_url);
      } else {
        mediaItems = [{ url: post.media_url, type: post.media_type }];
      }
    } catch (e) {
      mediaItems = [{ url: post.media_url, type: post.media_type }];
    }

    const activeIndex = carouselIndices[post.id] || 0;

    return (
      <div
        className="blog-post-media"
        onClick={() => handlePostMediaClick(post)}
        style={{ position: 'relative', width: '100%', overflow: 'hidden' }}
      >
        {/* Slide Indicator Overlay (Top Right) */}
        {mediaItems.length > 1 && (
          <div className="carousel-slide-indicator">
            {activeIndex + 1}/{mediaItems.length}
          </div>
        )}

        {/* Carousel Container */}
        <div
          className="carousel-container-horizontal"
          onScroll={(e) => {
            const idx = Math.round(e.target.scrollLeft / e.target.clientWidth);
            if (carouselIndices[post.id] !== idx) {
              setCarouselIndices(prev => ({ ...prev, [post.id]: idx }));
            }
          }}
          style={{ display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {mediaItems.map((item, idx) => {
            const positions = Array.isArray(post.media_positions) ? post.media_positions : [];
            const objPos = positions[idx]?.position || 'center center';
            return (
              <div
                key={idx}
                className="carousel-slide-item"
                style={{ flex: '0 0 100%', width: '100%', aspectRatio: 'auto', minHeight: '200px', scrollSnapAlign: 'start', overflow: 'hidden', position: 'relative' }}
              >
                <MediaSlide item={item} idx={idx} objectPosition={objPos} />
              </div>
            );
          })}
        </div>

        {/* Double-tap overlay */}
        {activeDoubleTapPostId === post.id && (
          <div className="double-tap-star-overlay">
            <svg viewBox="0 0 24 24" width="75" height="75" fill="var(--yellow-star)" stroke="var(--text-navy)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
        )}
      </div>
    );
  };

  const handlePostMediaClick = (post) => {
    const currentTime = Date.now();
    const timeDiff = currentTime - lastClickRef.current.time;

    if (lastClickRef.current.post === post.id && timeDiff < 300) {
      handlePostDoubleTap(post.id);
      lastClickRef.current.time = 0;
    } else {
      lastClickRef.current.time = currentTime;
      lastClickRef.current.post = post.id;

      setTimeout(() => {
        if (lastClickRef.current.time === currentTime) {
          if (post.media_type === 'image') {
            setFullscreenImageUrl(post.media_url);
          }
        }
      }, 300);
    }
  };

  const fetchUserSavedPosts = async () => {
    if (!session?.user?.id) return;
    try {
      const { data, error } = await supabase
        .from('blog_post_saves')
        .select(`
          post_id,
          blog_posts (
            id,
            user_id,
            caption,
            media_url,
            media_type,
            created_at,
            profiles:user_id (full_name, avatar_url),
            blog_post_stars (user_id)
          )
        `)
        .eq('user_id', session.user.id);

      if (error) {
        setUserSavedPosts([]);
        return;
      }

      if (data) {
        const posts = data.map(item => {
          const post = item.blog_posts;
          if (!post) return null;
          const starsList = post.blog_post_stars || [];
          const starCount = starsList.length;
          const isStarred = session?.user?.id ? starsList.some(s => s.user_id === session.user.id) : false;
          return {
            ...post,
            starCount,
            isStarred
          };
        }).filter(Boolean);
        setUserSavedPosts(posts);
      }
    } catch (e) {
      setUserSavedPosts([]);
    }
  };

  const handleSaveToggle = async (post) => {
    if (!isLoggedIn || !session?.user?.id) {
      setUploadAlert({ type: 'error', message: 'Please log in to save posts!' });
      playErrorSound();
      return;
    }

    const isSaved = savedPostIds.has(post.id);
    try {
      if (isSaved) {
        const { error } = await supabase
          .from('blog_post_saves')
          .delete()
          .eq('user_id', session.user.id)
          .eq('post_id', post.id);
        if (error) throw error;
        setUploadAlert({ type: 'success', message: 'Post removed from saved!' });
      } else {
        const { error } = await supabase
          .from('blog_post_saves')
          .insert([{ user_id: session.user.id, post_id: post.id }]);
        if (error) throw error;
        setUploadAlert({ type: 'success', message: 'Post saved successfully!' });
      }
      playSuccessSound();

      // Update local saves set and lists
      const updatedSaves = new Set(savedPostIds);
      if (isSaved) {
        updatedSaves.delete(post.id);
      } else {
        updatedSaves.add(post.id);
      }
      setSavedPostIds(updatedSaves);

      fetchUserSavedPosts();
    } catch (err) {
      console.error(err);
      setUploadAlert({ type: 'error', message: 'Failed to save post: ' + err.message });
      playErrorSound();
    }
  };

  const handleEditPostCaption = async (post) => {
    const newCaption = prompt("Edit your post caption:", post.caption || '');
    if (newCaption === null) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ caption: newCaption })
        .eq('id', post.id);

      if (error) throw error;
      setUploadAlert({ type: 'success', message: 'Caption updated successfully!' });
      playSuccessSound();

      if (activeViewPost?.id === post.id) {
        setActiveViewPost(prev => ({ ...prev, caption: newCaption }));
      }

      fetchBlogPosts(true);
      fetchUserProfilePosts(session.user.id);
    } catch (err) {
      console.error(err);
      setUploadAlert({ type: 'error', message: 'Failed to update caption: ' + err.message });
      playErrorSound();
    }
  };

  const togglePostMenu = (postId, e) => {
    e.stopPropagation();
    setActivePostMenuId(activePostMenuId === postId ? null : postId);
  };

  const fetchUserProfilePosts = async (userId, targetFullName = null) => {
    try {
      let resolvedName = targetFullName;
      if (!resolvedName) {
        const { data: profile } = await supabase.from('profiles').select('full_name').eq('id', userId).single();
        if (profile) resolvedName = profile.full_name;
      }

      let query = supabase
        .from('blog_posts')
        .select('*, profiles:user_id(full_name, avatar_url), blog_post_stars(user_id)')
        .order('created_at', { ascending: false });

      if (resolvedName) {
        const mentionTag = `@${resolvedName.replace(/\s+/g, '_')}`;
        query = query.or(`user_id.eq.${userId},caption.ilike.%${mentionTag}%`);
      } else {
        query = query.eq('user_id', userId);
      }

      const { data, error } = await query;

      if (data) {
        const mappedPosts = data.map(post => {
          const starsList = post.blog_post_stars || [];
          const starCount = starsList.length;
          const isStarred = session?.user?.id ? starsList.some(s => s.user_id === session.user.id) : false;
          return {
            ...post,
            starCount,
            isStarred
          };
        });
        setUserProfilePosts(mappedPosts);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleViewUserProfile = async (userId) => {
    if (session?.user?.id && userId === session.user.id) {
      setActiveView('profile');
      fetchUserProfilePosts(session.user.id);
      return;
    }

    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching target profile:', error);
        return;
      }

      if (profile) {
        const mappedUser = {
          id: profile.id,
          name: profile.full_name || 'Anonymous',
          email: profile.email || '',
          role: profile.user_role || 'attendee',
          avatarUrl: profile.avatar_url,
          bio: profile.bio || '',
          teamName: profile.team_name || '',
          trackId: profile.track_id || '',
          college: profile.college || '',
          stack: profile.stack || [],
          venue: profile.venue || '',
          roleTitle: profile.role_title || '',
          yearsOfExperience: profile.years_of_experience || '',
          languages: profile.languages || '',
          website: profile.website_url || '',
          socials: {
            github: profile.github_url || '',
            linkedin: profile.linkedin_url || '',
            instagram: profile.twitter_url || ''
          },
          isApproved: profile.is_approved || false,
          isTeamLeader: profile.is_team_leader || false
        };
        setViewProfileUser(mappedUser);
        fetchUserProfilePosts(userId);
        setActiveView('profile-view');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchVenues = async () => {
    const { data, error } = await supabase
      .from('venues')
      .select('*')
      .order('created_at', { ascending: true });
    if (data) setVenues(data);
  };

  // ==========================================


  // 🌐 DATA FETCHING FUNCTIONS (API CALLS)


  // ==========================================


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
              id: payload.new.id,
              type: 'mentor_request',
              message: payload.new.message,
              attendee: richData
            });

            playIssueAlertSound();

            const attendeeName = richData?.full_name || 'An attendee';
            showSystemNotification(
              'New Mentor Help Request',
              `${attendeeName} requested help: "${payload.new.message}"`,
              `mentor-request-${payload.new.id}`
            );

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

      // Realtime listener for new system issues
      const issuesChannel = supabase.channel('admin-issues-updates')
        .on('postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'system_issues' },
          async (payload) => {
            const { data: richData } = await supabase
              .from('profiles')
              .select('full_name, avatar_url, team_name')
              .eq('id', payload.new.user_id)
              .single();

            setActiveAlert({
              id: payload.new.id,
              type: 'system_issue',
              message: payload.new.description,
              attendee: richData
            });

            playIssueAlertSound();

            const attendeeName = richData?.full_name || 'An attendee';
            showSystemNotification(
              'New System Issue Reported',
              `${attendeeName} reported: "${payload.new.description}"`,
              `system-issue-${payload.new.id}`
            );

            fetchAllUsers();
          }
        )
        .subscribe();
      channels.push(issuesChannel);
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
    const { data: profilesData, error } = await supabase
      .from('profiles')
      .select('*')
      .order('full_name');

    // Fetch registered_emails to sync phone numbers
    const { data: whitelistData } = await supabase
      .from('registered_emails')
      .select('email, phone');

    if (profilesData) {
      const mappedProfiles = await Promise.all(profilesData.map(async (u) => {
        let currentPhone = u.phone;

        // Find corresponding whitelisted email phone if profile phone is missing
        const matchedWhitelist = whitelistData?.find(
          w => w.email?.toLowerCase().trim() === u.email?.toLowerCase().trim()
        );

        if (!currentPhone && matchedWhitelist?.phone) {
          currentPhone = matchedWhitelist.phone;
          // Sync to profiles db
          supabase
            .from('profiles')
            .update({ phone: matchedWhitelist.phone })
            .eq('id', u.id)
            .then(({ error: syncErr }) => {
              if (syncErr) console.error("Sync phone err for profile:", syncErr);
            });
        } else if (currentPhone && matchedWhitelist && !matchedWhitelist.phone) {
          // Sync to registered_emails db
          supabase
            .from('registered_emails')
            .update({ phone: currentPhone })
            .eq('email', u.email)
            .then(({ error: syncErr }) => {
              if (syncErr) console.error("Sync phone err for registered_emails:", syncErr);
            });
        }
        return { ...u, phone: currentPhone };
      }));
      setAllUsers(mappedProfiles);
    }

    const { data: issues } = await supabase
      .from('system_issues')
      .select('*, profiles:user_id(full_name, avatar_url)')
      .eq('status', 'open')
      .order('created_at', { ascending: false });
    if (issues) setSystemIssues(issues);
  };

  // ── Admin: Generate single-use magic login link for a participant ──────────
  // Calls the Supabase Edge Function which uses service_role (safe, server-side).
  // The resulting link is copied to clipboard so admin can share via WhatsApp.
  const handleGenerateMagicLink = async (u) => {
    setMagicLinkState(prev => ({ ...prev, [u.id]: 'loading' }));
    try {
      const { data: { session: adminSession } } = await supabase.auth.getSession();
      const res = await fetch(
        `${supabaseUrl}/functions/v1/generate-magic-link`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminSession.access_token}`,
            'apikey': supabaseAnonKey,
          },
          body: JSON.stringify({ email: u.email }),
        }
      );
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.error || 'Failed to generate link');

      const link = json.magic_link;
      // Copy to clipboard
      try { await navigator.clipboard.writeText(link); } catch (_) { }
      setMagicLinkState(prev => ({ ...prev, [u.id]: { link } }));
    } catch (err) {
      alert('Magic link failed: ' + err.message);
      setMagicLinkState(prev => ({ ...prev, [u.id]: null }));
    }
  };

  const handleReRunAudit = async (submission) => {
    try {
      const { data: { session: adminSession } } = await supabase.auth.getSession();

      // Update local state to scanning
      setProjectSubmissions(prev => prev.map(s => s.id === submission.id ? { ...s, git_audit_status: 'scanning' } : s));

      const res = await fetch(
        `${supabaseUrl}/functions/v1/analyze-repo`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminSession.access_token}`,
            'apikey': supabaseAnonKey,
          },
          body: JSON.stringify({ id: submission.id, github_url: submission.github_url }),
        }
      );
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.error || 'Failed to analyze repository');

      fetchSubmissions();
    } catch (err) {
      alert('Audit trigger failed: ' + err.message);
      fetchSubmissions();
    }
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

  const fetchAnnouncementHistory = async () => {
    const { data, error } = await supabase
      .from('audit_logs')
      .select('*, profiles(full_name)')
      .eq('action', 'Updated Setting: event_announcement')
      .order('created_at', { ascending: false })
      .limit(10);
    if (data) {
      setAnnouncementHistory(data);
    }
  };

  const dismissBanner = () => {
    localStorage.setItem('dismissed_announcement', settings.event_announcement || '');
    setIsBannerDismissed(true);
  };

  const fetchSettings = async () => {
    const { data } = await supabase.from('event_settings').select('*');
    if (data) {
      const settingsMap = {};
      data.forEach(s => settingsMap[s.id] = s.value);
      setSettings(prev => ({ ...prev, ...settingsMap }));
    }
    fetchAnnouncementHistory();
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

  const formatLogDetails = (log) => {
    if (!log.details || typeof log.details !== 'object') {
      return String(log.details || '');
    }

    if (log.action.startsWith('Updated Setting:')) {
      const settingKey = log.action.split('Updated Setting: ')[1];
      return `Set "${settingKey}" to: "${log.details.value}"`;
    }

    if (log.action === 'Approved Mentor') {
      return `Mentor Name: ${log.details.name}`;
    }

    if (log.action === 'Added Venue') {
      return `Venue Name: ${log.details.name} (Images: ${log.details.images || 0})`;
    }

    if (log.action === 'Added Mentor') {
      return `Mentor Name: ${log.details.name}`;
    }

    if (log.action === 'Deleted Mentor') {
      return `Mentor Name: ${log.details.name}`;
    }

    if (log.action === 'Deleted User') {
      return `User Name: ${log.details.name} (ID: ${log.details.userId})`;
    }

    return Object.entries(log.details)
      .map(([key, val]) => `${key}: ${val}`)
      .join(', ');
  };

  const updateSetting = async (key, value) => {
    const { error } = await supabase
      .from('event_settings')
      .upsert({ id: key, value: String(value) });

    if (!error) {
      logAction(`Updated Setting: ${key}`, { value });
      fetchSettings();
      if (key === 'google_drive_link') {
        await supabase
          .from('event_settings')
          .upsert({ id: 'event_announcement', value: `Submission Google Drive Link has been updated! Access it here: ${value}` });
      }
    }
  };

  const clearAnnouncementHistory = async () => {
    if (!window.confirm("Are you sure you want to clear the announcement history?")) return;
    const { error } = await supabase
      .from('audit_logs')
      .delete()
      .eq('action', 'Updated Setting: event_announcement');

    if (error) {
      alert("Error clearing history: " + error.message);
    } else {
      setAnnouncementHistory([]);
      alert("Announcement history cleared successfully!");
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

  const fetchJudgeScores = async () => {
    if (!session?.user?.id || user.role !== 'judge') return;
    try {
      const { data, error } = await supabase
        .from('judge_scores')
        .select('*')
        .eq('judge_id', session.user.id);
      if (error) throw error;
      if (data) {
        const scoresMap = {};
        data.forEach(score => {
          scoresMap[score.project_id] = score;
        });
        setJudgeScores(scoresMap);
      }
    } catch (err) {
      console.error('Failed to fetch judge scores:', err.message);
    }
  };

  const fetchAllJudgeScores = async () => {
    if (!session?.user?.id || user.role !== 'admin') return;
    try {
      const { data, error } = await supabase
        .from('judge_scores')
        .select('*')
        .order('team_name', { ascending: true });
      if (error) throw error;
      if (data) {
        setAllJudgeScores(data);
      }
    } catch (err) {
      console.error('Failed to fetch all judge scores:', err.message);
    }
  };

  useEffect(() => {
    if (activeView === 'showroom') {
      if (user.role === 'judge') {
        fetchJudgeScores();
      } else if (user.role === 'admin') {
        fetchAllJudgeScores();
      }
    }
  }, [activeView, user.role, session?.user?.id]);

  const handleScoreChange = (projectId, field, value) => {
    setTempScores(prev => {
      const current = prev[projectId] || judgeScores[projectId] || allJudgeScores.find(s => s.project_id === projectId) || {
        innovation_score: 0,
        technical_score: 0,
        ux_score: 0,
        impact_score: 0,
        presentation_score: 0,
        feasibility_score: 0,
        remarks: ''
      };
      return {
        ...prev,
        [projectId]: {
          ...current,
          [field]: value
        }
      };
    });
  };

  const getInputValue = (rowKey, field, dbValue) => {
    if (tempScores[rowKey] && tempScores[rowKey][field] !== undefined) {
      return tempScores[rowKey][field];
    }
    return dbValue !== undefined ? dbValue : '';
  };

  const getRemarksValue = (rowKey, dbValue) => {
    if (tempScores[rowKey] && tempScores[rowKey].remarks !== undefined) {
      return tempScores[rowKey].remarks;
    }
    return dbValue !== undefined ? dbValue : '';
  };

  const handleUnifiedScoreChange = (rowKey, field, value) => {
    setTempScores(prev => {
      const current = prev[rowKey] || {};
      return {
        ...prev,
        [rowKey]: { ...current, [field]: value }
      };
    });
  };

  const handleClampedScoreChange = (rowKey, field, value, maxVal) => {
    if (value === '') {
      handleUnifiedScoreChange(rowKey, field, '');
      return;
    }
    let num = parseInt(value);
    if (isNaN(num)) num = 0;
    if (num < 0) num = 0;
    if (num > maxVal) num = maxVal;
    handleUnifiedScoreChange(rowKey, field, num);
  };

  const getCalculatedTotal = (rowKey, row) => {
    const innovation = parseInt(getInputValue(rowKey, 'innovation_score', row.innovation_score) || 0);
    const technical = parseInt(getInputValue(rowKey, 'technical_score', row.technical_score) || 0);
    const ux = parseInt(getInputValue(rowKey, 'ux_score', row.ux_score) || 0);
    const impact = parseInt(getInputValue(rowKey, 'impact_score', row.impact_score) || 0);
    const presentation = parseInt(getInputValue(rowKey, 'presentation_score', row.presentation_score) || 0);
    const feasibility = parseInt(getInputValue(rowKey, 'feasibility_score', row.feasibility_score) || 0);
    return innovation + technical + ux + impact + presentation + feasibility;
  };

  const handleUnifiedSave = async (rowKey, row) => {
    if (!session?.user?.id) {
      alert("You must be logged in to save scores.");
      return;
    }

    const projectId = row.project_id;
    const submission = projectSubmissions.find(sub => sub.id === projectId);
    if (!submission) {
      alert("Project submission not found.");
      return;
    }

    const innovation = parseInt(getInputValue(rowKey, 'innovation_score', row.innovation_score) || 0);
    const technical = parseInt(getInputValue(rowKey, 'technical_score', row.technical_score) || 0);
    const ux = parseInt(getInputValue(rowKey, 'ux_score', row.ux_score) || 0);
    const impact = parseInt(getInputValue(rowKey, 'impact_score', row.impact_score) || 0);
    const presentation = parseInt(getInputValue(rowKey, 'presentation_score', row.presentation_score) || 0);
    const feasibility = parseInt(getInputValue(rowKey, 'feasibility_score', row.feasibility_score) || 0);
    const remarks = getRemarksValue(rowKey, row.remarks).toString().trim();
    const totalMark = innovation + technical + ux + impact + presentation + feasibility;

    setSavingScoreId(rowKey);

    try {
      const { data: teamData } = await supabase
        .from('teams')
        .select('id')
        .ilike('name', submission.team_name)
        .maybeSingle();

      const teamId = teamData?.id || null;

      let targetJudgeId = session.user.id;
      let targetJudgeName = user.name || 'Anonymous Judge';

      let dbRecordId = row.id || null;
      if (user.role === 'admin' && row.judge_id && row.judge_id !== 'Not Graded') {
        targetJudgeId = row.judge_id;
        targetJudgeName = row.judge_name;
      }

      const upsertData = {
        project_id: projectId,
        judge_id: targetJudgeId,
        judge_name: targetJudgeName,
        team_name: submission.team_name,
        team_id: teamId,
        submitted_time: submission.submitted_at || submission.created_at || new Date().toISOString(),
        ai_percentage: submission.ai_percentage || 0,
        innovation_score: innovation,
        technical_score: technical,
        ux_score: ux,
        impact_score: impact,
        presentation_score: presentation,
        feasibility_score: feasibility,
        remarks: remarks,
        total_mark: totalMark,
        updated_at: new Date().toISOString()
      };

      if (dbRecordId) {
        upsertData.id = dbRecordId;
      }

      const { data: savedRecord, error: upsertError } = await supabase
        .from('judge_scores')
        .upsert([upsertData])
        .select()
        .single();

      if (upsertError) throw upsertError;

      if (user.role === 'admin') {
        setAllJudgeScores(prev => {
          const filtered = prev.filter(s => s.id !== savedRecord.id);
          return [...filtered, savedRecord].sort((a, b) => a.team_name.localeCompare(b.team_name));
        });
      } else {
        setJudgeScores(prev => ({
          ...prev,
          [projectId]: savedRecord
        }));
      }

      setTempScores(prev => {
        const copy = { ...prev };
        delete copy[rowKey];
        return copy;
      });

      const googleScriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbxegpLYC3j5i1UIGffgpRXdHOZ6pgDVDQSc3qyY-_xNs5z0MopMkH_ezspB5PTpF2U/exec';
      if (googleScriptUrl) {
        fetch(googleScriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(savedRecord)
        }).catch(e => console.error('Failed to sync to Google Sheets:', e));
      }

      alert("Scores saved and synced successfully!");
    } catch (err) {
      alert("Failed to save score: " + err.message);
    } finally {
      setSavingScoreId(null);
    }
  };

  const handleSaveScore = async (projectId) => {
    if (!session?.user?.id) {
      alert("You must be logged in to save scores.");
      return;
    }

    const submission = projectSubmissions.find(sub => sub.id === projectId);
    if (!submission) {
      alert("Project submission not found.");
      return;
    }

    let currentScoreObj = tempScores[projectId];
    if (!currentScoreObj) {
      if (user.role === 'admin') {
        currentScoreObj = allJudgeScores.find(s => s.project_id === projectId);
      } else {
        currentScoreObj = judgeScores[projectId];
      }
    }

    if (!currentScoreObj) {
      currentScoreObj = {};
    }

    const innovation = parseInt(currentScoreObj.innovation_score ?? 0);
    const technical = parseInt(currentScoreObj.technical_score ?? 0);
    const ux = parseInt(currentScoreObj.ux_score ?? 0);
    const impact = parseInt(currentScoreObj.impact_score ?? 0);
    const presentation = parseInt(currentScoreObj.presentation_score ?? 0);
    const feasibility = parseInt(currentScoreObj.feasibility_score ?? 0);
    const remarks = (currentScoreObj.remarks ?? '').toString().trim();
    const totalMark = innovation + technical + ux + impact + presentation + feasibility;

    if (innovation < 0 || innovation > 15) {
      alert("Innovation score must be between 0 and 15.");
      return;
    }
    if ([technical, ux, impact, presentation, feasibility].some(val => val < 0 || val > 10)) {
      alert("Criteria scores must be between 0 and 10.");
      return;
    }

    setSavingScoreId(projectId);

    try {
      const { data: teamData } = await supabase
        .from('teams')
        .select('id')
        .ilike('name', submission.team_name)
        .maybeSingle();

      const teamId = teamData?.id || null;

      let targetJudgeId = session.user.id;
      let targetJudgeName = user.name || 'Anonymous Judge';

      let dbRecordId = null;
      if (user.role === 'admin') {
        const existingRecord = allJudgeScores.find(s => s.project_id === projectId && s.id === currentScoreObj.id);
        if (existingRecord) {
          targetJudgeId = existingRecord.judge_id;
          targetJudgeName = existingRecord.judge_name;
          dbRecordId = existingRecord.id;
        } else {
          const adminExistingRecord = allJudgeScores.find(s => s.project_id === projectId && s.judge_id === session.user.id);
          if (adminExistingRecord) {
            dbRecordId = adminExistingRecord.id;
          }
        }
      } else {
        const existingRecord = judgeScores[projectId];
        if (existingRecord) {
          dbRecordId = existingRecord.id;
        }
      }

      const upsertData = {
        project_id: projectId,
        judge_id: targetJudgeId,
        judge_name: targetJudgeName,
        team_name: submission.team_name,
        team_id: teamId,
        submitted_time: submission.submitted_at || submission.created_at || new Date().toISOString(),
        ai_percentage: submission.ai_percentage || 0,
        innovation_score: innovation,
        technical_score: technical,
        ux_score: ux,
        impact_score: impact,
        presentation_score: presentation,
        feasibility_score: feasibility,
        remarks: remarks,
        total_mark: totalMark,
        updated_at: new Date().toISOString()
      };

      if (dbRecordId) {
        upsertData.id = dbRecordId;
      }

      const { data: savedRecord, error: upsertError } = await supabase
        .from('judge_scores')
        .upsert([upsertData])
        .select()
        .single();

      if (upsertError) throw upsertError;

      if (user.role === 'admin') {
        setAllJudgeScores(prev => {
          const filtered = prev.filter(s => s.id !== savedRecord.id);
          return [...filtered, savedRecord].sort((a, b) => a.team_name.localeCompare(b.team_name));
        });
      } else {
        setJudgeScores(prev => ({
          ...prev,
          [projectId]: savedRecord
        }));
      }

      setTempScores(prev => {
        const copy = { ...prev };
        delete copy[projectId];
        return copy;
      });

      const googleScriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbxegpLYC3j5i1UIGffgpRXdHOZ6pgDVDQSc3qyY-_xNs5z0MopMkH_ezspB5PTpF2U/exec';
      if (googleScriptUrl) {
        fetch(googleScriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(savedRecord)
        }).catch(e => console.error('Failed to sync to Google Sheets:', e));
      }

      alert("Scores saved and synced successfully!");
    } catch (err) {
      alert("Failed to save score: " + err.message);
    } finally {
      setSavingScoreId(null);
    }
  };

  const handleDownloadJudgeScoresCSV = () => {
    if (allJudgeScores.length === 0) {
      alert('No judge scores found to export.');
      return;
    }

    const headers = [
      'Judge Name',
      'Team Name',
      'Team ID',
      'Project Name',
      'Submitted Time',
      'AI Percentage',
      'Innovation (Max 15)',
      'Technical (Max 10)',
      'UX (Max 10)',
      'Impact (Max 10)',
      'Presentation (Max 10)',
      'Feasibility (Max 10)',
      'Total Mark',
      'Special Remarks',
      'Last Updated'
    ];

    const rows = allJudgeScores.map(score => {
      const submission = projectSubmissions.find(sub => sub.id === score.project_id);
      const projectName = submission?.project_name || score.project_name || '';

      return [
        score.judge_name || '',
        score.team_name || '',
        score.team_id || '',
        projectName,
        score.submitted_time ? new Date(score.submitted_time).toLocaleString() : '',
        score.ai_percentage !== null && score.ai_percentage !== undefined ? `${score.ai_percentage}%` : '0%',
        score.innovation_score || 0,
        score.technical_score || 0,
        score.ux_score || 0,
        score.impact_score || 0,
        score.presentation_score || 0,
        score.feasibility_score || 0,
        score.total_mark || 0,
        score.remarks || '',
        score.updated_at ? new Date(score.updated_at).toLocaleString() : ''
      ];
    });

    const csvContent = [
      headers.map(h => `"${h.replace(/"/g, '""')}"`).join(','),
      ...rows.map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `starlet_judge_scores_export.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fetchSubmissions = async () => {
    const { data } = await supabase.from('project_submissions').select('*');
    if (data) setProjectSubmissions(data);

    const { data: ideaData } = await supabase.from('idea_submissions').select('*');
    if (ideaData) setIdeaSubmissions(ideaData);

    if (session?.user?.id) {
      if (user.role === 'judge') {
        await fetchJudgeScores();
      } else if (user.role === 'admin') {
        await fetchAllJudgeScores();
      }
    }
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
    if (data) {
      setMySubmission(data);
      if (data.submitted_by !== session.user.id) {
        const { data: prof } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', data.submitted_by)
          .single();
        if (prof) {
          setSubmitterName(prof.full_name);
        } else {
          setSubmitterName('');
        }
      } else {
        setSubmitterName('');
      }
    } else {
      setMySubmission(null);
      setSubmitterName('');
    }
  };

  const fetchMyIdeaSubmission = async () => {
    if (!session?.user?.id) return;

    let query = supabase
      .from('idea_submissions')
      .select('*');

    if (user.teamName) {
      query = query.or(`submitted_by.eq.${session.user.id},team_name.eq.${user.teamName}`);
    } else {
      query = query.eq('submitted_by', session.user.id);
    }

    const { data } = await query.maybeSingle();
    if (data) {
      setMyIdeaSubmission(data);
    } else {
      setMyIdeaSubmission(null);
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    if (settings.project_submission_open !== 'true') {
      alert('Project submissions are currently closed by the admin.');
      return;
    }

    // Leadership Check (Attendees only)
    if (user.role === 'attendee' && user.teamName && !user.isTeamLeader) {
      alert('Only the Team Leader can submit the project for your team!');
      return;
    }

    // Presence Check (Attendees only)
    if (user.role === 'attendee' && !user.isApproved) {
      alert('Only attendees marked as "Present" by the registration desk can submit projects!');
      return;
    }

    const formData = new FormData(e.target);

    if (formData.get('description').toString().split(' ').length < 100) {
      alert('Please follow the minimum word count for description.');
      return;
    }

    const teamKey = user.teamName || `Individual-${session.user.id}`;
    const { data: existingSub } = await supabase
      .from('project_submissions')
      .select('id')
      .eq('team_name', teamKey)
      .maybeSingle();

    if (existingSub) {
      alert('A submission has already been made for your team!');
      fetchMySubmission();
      return;
    }

    const driveLink = formData.get('driveLink') || '';
    const projectLink = formData.get('projectLink') || '';
    const techStack = formData.get('techStack') || '';

    const submissionData = {
      team_name: user.teamName || `Individual-${session.user.id}`,
      project_name: formData.get('projectName'),
      description: formData.get('description'),
      github_url: formData.get('github'),
      demo_url: projectLink, // demo_url stores the deployed project link
      ppt_link: driveLink,   // ppt_link stores the Google Drive folder link
      tech_stack: techStack,
      submitted_by: session.user.id,
      image_urls: []
    };

    const { error } = await supabase.from('project_submissions').insert([submissionData]);
    if (error) alert(error.message);
    else {
      alert('Project submitted successfully! Good luck!');
      setIsProjectModalOpen(false);
      fetchMySubmission();
    }
  };

  const handleIdeaSubmit = async (e) => {
    e.preventDefault();
    if (settings.idea_submission_open !== 'true') {
      alert('Idea submissions are currently closed by the admin.');
      return;
    }

    if (user.role === 'attendee' && user.teamName && !user.isTeamLeader) {
      alert('Only the Team Leader can submit the idea for your team!');
      return;
    }

    if (user.role === 'attendee' && !user.isApproved) {
      alert('Only attendees marked as "Present" by the registration desk can submit ideas!');
      return;
    }

    const formData = new FormData(e.target);

    if (formData.get('description').toString().split(' ').length < 100) {
      alert('Please follow the minimum word count for description.');
      return;
    }

    const teamKey = user.teamName || `Individual-${session.user.id}`;
    const { data: existingSub } = await supabase
      .from('idea_submissions')
      .select('id')
      .eq('team_name', teamKey)
      .maybeSingle();

    if (existingSub) {
      alert('A submission has already been made for your team!');
      fetchMyIdeaSubmission();
      return;
    }

    const submissionData = {
      team_name: user.teamName || `Individual-${session.user.id}`,
      idea_title: formData.get('ideaTitle'),
      description: formData.get('description'),
      submitted_by: session.user.id
    };

    const { error } = await supabase.from('idea_submissions').insert([submissionData]);
    if (error) alert(error.message);
    else {
      alert('Idea submitted successfully! Good luck!');
      setIsIdeaModalOpen(false);
      fetchMyIdeaSubmission();
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

      // Fetch current count of teams to determine the starting index
      const { count: teamCount, error: countError } = await supabase
        .from('teams')
        .select('*', { count: 'exact', head: true });

      if (countError) throw countError;
      let squadIndex = (teamCount || 0) + 1;

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
              is_team_leader: false,
              needs_teaming: false
            })
            .eq('id', singleUser.id);
          continue;
        }

        const teamName = `Starlet ${String(squadIndex).padStart(2, '0')}`;
        squadIndex++;

        // Create the team in the teams table first
        const { data: newTeam, error: teamError } = await supabase
          .from('teams')
          .insert([{ name: teamName, bio: 'Automatically generated squad.' }])
          .select()
          .single();

        if (teamError) continue;
        createdTeams.push({ id: newTeam.id, name: teamName });

        // Randomly select a leader index for this group
        const leaderIndex = Math.floor(Math.random() * group.length);

        // Update all members in this group
        for (let j = 0; j < group.length; j++) {
          const user = group[j];
          const isLeader = j === leaderIndex;
          await supabase
            .from('profiles')
            .update({
              team_id: newTeam.id,
              team_name: teamName,
              team_status: 'team',
              is_team_leader: isLeader,
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

    const headers = ['Full Name', 'Email', 'Role', 'Role Title', 'Venue', 'Phone', 'College/Org', 'Team Name', 'Presence / Verified Status', 'LinkedIn', 'Tech Stack', 'Bio'];

    const rows = filtered.map(u => [
      u.full_name || '',
      u.email || '',
      u.user_role || '',
      u.role_title || '',
      u.venue || 'Unassigned',
      u.phone || '',
      u.college || u.venue || '',
      u.team_name || '',
      u.user_role === 'attendee' ? (u.is_approved ? 'Present' : 'Absent') : (u.is_approved ? 'Verified' : 'Pending'),
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

  const handleDownloadSubmissionsCSV = () => {
    if (projectSubmissions.length === 0) {
      alert('No project submissions found to export.');
      return;
    }

    const headers = ['Team/Group Name', 'Project Name', 'Description', 'Tech Stack', 'GitHub Repository', 'Google Drive Link', 'Project Deployed Link', 'Submitted By (User ID)', 'Submitted At'];

    const rows = projectSubmissions.map(sub => [
      sub.team_name || '',
      sub.project_name || '',
      sub.description || '',
      sub.tech_stack || '',
      sub.github_url || '',
      sub.ppt_link || '',
      sub.demo_url || '',
      sub.submitted_by || '',
      sub.submitted_at || sub.created_at || ''
    ]);

    const csvContent = [
      headers.map(h => `"${h.replace(/"/g, '""')}"`).join(','),
      ...rows.map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `starlet_project_submissions_export.csv`);
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

  const handleToggleAttendance = async (userId, isPresent) => {
    if (checkIsAfter13th()) {
      alert("Attendance records cannot be modified after July 13th, 2026.");
      fetchAllUsers();
      return;
    }
    // Optimistically update the UI so the checkbox ticks instantly
    setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, is_approved: isPresent } : u));

    const { error } = await supabase.from('profiles').update({ is_approved: isPresent }).eq('id', userId);
    if (error) {
      alert(error.message);
      fetchAllUsers(); // Revert to actual DB state on error
    } else {
      // Background sync to ensure it saved properly
      fetchAllUsers();
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
    try {
      const { data: targetUser } = await supabase.from('profiles').select('team_name').eq('id', userId).maybeSingle();
      let query = supabase.from('profiles').update({ problem_statement_id: psId });
      if (targetUser && targetUser.team_name) {
        query = query.ilike('team_name', targetUser.team_name.trim());
      } else {
        query = query.eq('id', userId);
      }
      const { error } = await query;
      if (error) throw error;
      alert('Attendee track updated!');
      fetchAllUsers();
    } catch (err) {
      alert(err.message);
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
    try {
      setLoading(true);
      let query = supabase.from('profiles').update({ problem_statement_id: psId });
      if (user.teamName) {
        query = query.ilike('team_name', user.teamName.trim());
      } else {
        query = query.eq('id', session.user.id);
      }
      const { error } = await query;
      if (error) throw error;
      alert('Selection locked! Contact admin to change.');
      fetchProfile(session.user.id);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
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
        .select('id, name')
        .ilike('name', teamName)
        .maybeSingle();

      let finalTeamId = null;
      let finalTeamName = teamName;
      let isLeader = true;

      if (existingTeam) {
        finalTeamId = existingTeam.id;
        finalTeamName = existingTeam.name;

        // Check if there are already members in this team
        const { data: teamMembers } = await supabase
          .from('profiles')
          .select('id')
          .eq('team_id', finalTeamId)
          .limit(1);
        if (teamMembers && teamMembers.length > 0) {
          isLeader = false;
        }
      } else {
        const { data: newTeam, error: newTeamError } = await supabase
          .from('teams')
          .insert([{ name: teamName }])
          .select()
          .single();
        if (newTeamError) throw newTeamError;
        if (newTeam) {
          finalTeamId = newTeam.id;
          finalTeamName = newTeam.name;
        }
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          team_id: finalTeamId,
          team_name: finalTeamName,
          team_status: 'team',
          is_team_leader: isLeader,
          needs_teaming: false
        })
        .eq('id', session.user.id);

      if (profileError) throw profileError;

      alert(`Successfully joined/created team: ${finalTeamName}`);
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

  // ==========================================


  // 👥 TEAM MANAGEMENT HANDLERS


  // ==========================================


  const handleLeaveTeam = async () => {
    try {
      const leavingUserId = session.user.id;
      const leavingUserTeamId = user.teamId;
      const leavingUserWasLeader = user.isTeamLeader;

      const { error } = await supabase
        .from('profiles')
        .update({
          team_id: null,
          team_name: null,
          team_status: 'single',
          is_team_leader: false,
          needs_teaming: true
        })
        .eq('id', leavingUserId);

      if (error) throw error;

      // If the leaving user was the leader, assign another leader or delete the team if empty
      if (leavingUserWasLeader && leavingUserTeamId) {
        const { data: remainingMembers } = await supabase
          .from('profiles')
          .select('id')
          .eq('team_id', leavingUserTeamId)
          .neq('id', leavingUserId)
          .limit(1);

        if (remainingMembers && remainingMembers.length > 0) {
          await supabase
            .from('profiles')
            .update({ is_team_leader: true })
            .eq('id', remainingMembers[0].id);
        } else {
          // No members left in the team, delete from teams table
          await supabase
            .from('teams')
            .delete()
            .eq('id', leavingUserTeamId);
        }
      }

      alert('You have left the team and are now back in the solo pool.');
      fetchProfile(leavingUserId);
      await promoteWaitlistedUsers();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRenameTeam = async (newTeamNameInput) => {
    if (!newTeamNameInput || !newTeamNameInput.trim()) {
      alert('Please enter a valid team name.');
      return;
    }
    const newTeamName = newTeamNameInput.trim();
    if (!user.teamId) return;

    try {
      // 1. Fetch team's current rename_count
      const { data: teamData, error: fetchError } = await supabase
        .from('teams')
        .select('id, rename_count, name')
        .eq('id', user.teamId)
        .single();

      if (fetchError) throw fetchError;

      const currentRenameCount = teamData.rename_count || 0;
      if (currentRenameCount >= 2) {
        alert('You can only rename your team up to 2 times!');
        return;
      }

      // Check case-insensitive uniqueness (excluding current team name)
      if (teamData.name.trim().toLowerCase() !== newTeamName.toLowerCase()) {
        const { data: duplicateTeam } = await supabase
          .from('teams')
          .select('id')
          .ilike('name', newTeamName)
          .maybeSingle();

        if (duplicateTeam) {
          alert('A team with this name already exists. Please choose another name!');
          return;
        }
      }

      // 2. Update the team name and increment rename_count in 'teams' table
      const { error: teamUpdateError } = await supabase
        .from('teams')
        .update({
          name: newTeamName,
          rename_count: currentRenameCount + 1
        })
        .eq('id', user.teamId);

      if (teamUpdateError) throw teamUpdateError;

      // 3. Update all team members' profiles team_name field
      const { error: profilesUpdateError } = await supabase
        .from('profiles')
        .update({
          team_name: newTeamName
        })
        .eq('team_id', user.teamId);

      if (profilesUpdateError) throw profilesUpdateError;

      alert('Team renamed successfully!');
      fetchProfile(session.user.id);
      fetchMyTeamMembers();
    } catch (err) {
      alert(err.message);
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

  // ==========================================


  // 🔐 AUTHENTICATION HANDLERS (LOGIN/SIGNUP)


  // ==========================================


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
    const phone = (formData.get('phone') || '').trim();

    if (!phone) {
      alert('Please enter your mobile number. It is required for event day coordination.');
      return;
    }

    try {
      if (!signupAvatar) {
        alert('Please upload a profile photo. A profile photo is required for registration.');
        return;
      }

      let selectedVenueChosen = null;
      if (signupRole === 'attendee') {
        const { data: isWhitelisted } = await supabase
          .from('registered_emails')
          .select('email, venue_chosen')
          .eq('email', email)
          .maybeSingle();

        if (!isWhitelisted) {
          alert('This email is not registered in our records. Please use the email you registered with on the Google Form.');
          return;
        }
        selectedVenueChosen = isWhitelisted.venue_chosen;
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
        let finalTeamName = null;
        if (signupRole === 'attendee' && teamStatus === 'team' && teamName) {
          const trimmedTeamName = teamName.trim();
          // Check if team exists case-insensitively, if not create it
          const { data: existingTeam } = await supabase
            .from('teams')
            .select('id, name')
            .ilike('name', trimmedTeamName)
            .maybeSingle();

          if (existingTeam) {
            finalTeamId = existingTeam.id;
            finalTeamName = existingTeam.name;
          } else {
            const { data: newTeam } = await supabase
              .from('teams')
              .insert([{ name: trimmedTeamName }])
              .select()
              .single();
            if (newTeam) {
              finalTeamId = newTeam.id;
              finalTeamName = newTeam.name;
            }
          }
        }

        const { error: profileError } = await supabase
          .from('profiles')
          .upsert([
            {
              id: authData.user.id,
              full_name: fullName,
              email: email,
              phone: phone,
              user_role: signupRole,
              role_title: roleTitle,
              bio: bio,
              stack: techStack ? techStack.split(',').map(s => s.trim()) : [],
              college: college,
              avatar_url: avatarUrl,
              team_id: finalTeamId,
              team_status: signupRole === 'attendee' ? teamStatus : null,
              needs_teaming: signupRole === 'attendee' ? needsTeaming : false,
              team_name: signupRole === 'attendee' ? (finalTeamName || teamName) : null,
              is_approved: false,
              venue: signupRole === 'attendee' ? selectedVenueChosen : null
            }
          ], { onConflict: 'id' });
        if (profileError) throw profileError;

        // Backfill phone in registered_emails if it was empty
        // (keeps both tables in sync for participants who registered via Google Form)
        if (signupRole === 'attendee' && phone) {
          await supabase
            .from('registered_emails')
            .update({ phone })
            .eq('email', email)
            .is('phone', null);
        }

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

  const getWordCount = (text) => {
    if (!text) return 0;
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const handleClaimCertificateClick = () => {
    if (localStorage.getItem(`feedback_submitted_${user.id}`) === 'true') {
      setActiveView('certificate');
    } else {
      setShowFeedbackModal(true);
    }
  };

  const handleSubmitFeedback = async () => {
    const wordCount = getWordCount(feedbackText);
    if (wordCount < 100) {
      alert(`Please write at least 100 words. Current count: ${wordCount}`);
      return;
    }

    setIsSubmittingFeedback(true);
    try {
      const googleScriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbxegpLYC3j5i1UIGffgpRXdHOZ6pgDVDQSc3qyY-_xNs5z0MopMkH_ezspB5PTpF2U/exec';

      const payload = {
        action: 'feedback',
        name: user.name || 'Anonymous',
        email: user.email || '—',
        college: user.college || '—',
        feedback: feedbackText
      };

      if (googleScriptUrl) {
        await fetch(googleScriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
      }

      localStorage.setItem(`feedback_submitted_${user.id}`, 'true');
      setShowFeedbackModal(false);
      setFeedbackText('');

      setActiveView('certificate');
      alert('Thank you for your feedback! Your certificate has been unlocked.');
    } catch (error) {
      console.error('Feedback submit error:', error);
      alert('Failed to submit feedback: ' + error.message + '. Please try again.');
    } finally {
      setIsSubmittingFeedback(false);
    }
  };


  // ==========================================



  // 📝 PROFILE EDITING HANDLERS



  // ==========================================



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


  const filteredSubmissionsForJudge = projectSubmissions.filter(sub => {
    if (!showroomSearchQuery) return true;
    const q = showroomSearchQuery.toLowerCase().trim();
    const teamName = (sub.team_name || '').toLowerCase();
    const projectName = (sub.project_name || '').toLowerCase();

    const teamLeader = allUsers.find(u => u.team_name === sub.team_name && u.is_team_leader);
    const leaderName = teamLeader ? (teamLeader.full_name || '').toLowerCase() : '';
    const submitter = allUsers.find(u => u.id === sub.submitted_by);
    const submitterName = submitter ? (submitter.full_name || '').toLowerCase() : '';

    return teamName.includes(q) || projectName.includes(q) || leaderName.includes(q) || submitterName.includes(q);
  });

  const filteredScoresForAdmin = allJudgeScores.filter(score => {
    if (!showroomSearchQuery) return true;
    const q = showroomSearchQuery.toLowerCase().trim();
    const teamName = (score.team_name || '').toLowerCase();
    const judgeName = (score.judge_name || '').toLowerCase();

    const sub = projectSubmissions.find(s => s.id === score.project_id);
    const projectName = sub ? (sub.project_name || '').toLowerCase() : '';

    const teamLeader = allUsers.find(u => u.team_name === score.team_name && u.is_team_leader);
    const leaderName = teamLeader ? (teamLeader.full_name || '').toLowerCase() : '';

    return teamName.includes(q) || judgeName.includes(q) || projectName.includes(q) || leaderName.includes(q);
  });

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
      <a href="#main-content-anchor" className="skip-to-content-link">Skip to Main Content</a>

      {uploadAlert && (
        <div className={`blog-alert-popup ${uploadAlert.type}`}>
          <span className="alert-icon" style={{ display: 'flex', alignItems: 'center' }}>
            {uploadAlert.type === 'success' ? (
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="#0d9488" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="#e11d48" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
            )}
          </span>
          <span className="alert-message">{uploadAlert.message}</span>
          <button className="alert-close-btn" aria-label="Dismiss notification" onClick={() => setUploadAlert(null)}>×</button>
        </div>
      )}


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
              <div className="form-iframe-container" style={{ flex: 1, overflowY: 'auto', background: 'var(--bg-cream)', display: settings.registration_open === 'true' ? 'block' : 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: settings.registration_open === 'true' ? '0' : '3rem 2rem', textAlign: 'center', gap: '1rem' }}>
                {settings.registration_open === 'true' ? (
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
                ) : (
                  <>
                    <div style={{ margin: '1rem 0' }}><img src="svg/emoji/lock.svg" style={{ width: '64px', height: '64px' }} alt="Locked" /></div>
                    <h3 className="text-3d" style={{ fontSize: '2rem', color: 'var(--text-navy)', marginBottom: '0.5rem' }}>Registrations Closed</h3>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto', lineHeight: '1.5' }}>
                      Public registrations for Starlet 5.0 are currently closed. If you have already registered, you can still sign up to create your account!
                    </p>
                  </>
                )}
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
            <img src="brand/Mind Empowered.jpeg" alt="Mind Empowered" style={{ height: '30px', verticalAlign: 'middle', marginRight: '10px', borderRadius: '5px' }} />
            A Mind Empowered Initiative
          </div>
        </div>
      )}

      <div className="fixed-header-wrapper">
        {/* Live Announcement Banner */}
        {settings.event_announcement && !isBannerDismissed && (
          <div className="live-announcement-banner">
            <div className="banner-content">
              <span className="banner-icon"><img src="svg/emoji/announcement.svg" className="emoji-icon" alt="Announcement" /></span>
              <div className="banner-text-wrapper">
                <span className="banner-badge">ANNOUNCEMENT</span>
                <span className="banner-text">{settings.event_announcement}</span>
              </div>
            </div>
            <button className="banner-close-btn" onClick={dismissBanner} aria-label="Dismiss announcement">
              &times;
            </button>
          </div>
        )}

        {/* PWA Install Banner */}
        {/* PWA Install Banner (Android/Chrome/Windows) */}
        {!isIOSUser && installPrompt && showInstallBanner && (
          <div className="pwa-install-banner">
            <div className="pwa-install-banner-content">
              <span className="pwa-install-logo">✦</span>
              <div className="pwa-install-text-wrapper">
                <span className="pwa-install-badge">APP UPGRADE</span>
                <span className="pwa-install-text">Install the Starlet 5.0 application on your device for offline support and system notifications!</span>
              </div>
            </div>
            <div className="pwa-install-actions">
              <button className="pwa-install-dismiss" onClick={() => setShowInstallBanner(false)} aria-label="Dismiss install prompt">Not Now</button>
              <button className="pwa-install-btn-accent" onClick={handleInstallClick} aria-label="Install App">Install</button>
            </div>
          </div>
        )}

        {/* PWA Install Banner (iOS Safari) */}
        {isIOSUser && showInstallBanner && (
          <div className="pwa-install-banner" style={{ background: 'var(--yellow-star)', color: 'var(--text-navy)', border: '3px solid var(--text-navy)', boxShadow: '6px 6px 0px var(--blue-shadow)' }}>
            <div className="pwa-install-banner-content">
              <span className="pwa-install-logo" style={{ color: 'var(--pink-primary)' }}>✦</span>
              <div className="pwa-install-text-wrapper">
                <span className="pwa-install-badge" style={{ background: 'var(--pink-primary)', color: '#fff' }}>INSTALL APP</span>
                <span className="pwa-install-text" style={{ fontSize: '0.85rem', color: 'var(--text-navy)', fontWeight: 'bold' }}>
                  Add Starlet 5.0 to your iPhone: tap the <strong>Share</strong> button <span style={{ fontSize: '1.2rem', verticalAlign: 'middle' }}>⎋</span> at the bottom of Safari, then select <strong>Add to Home Screen</strong>!
                </span>
              </div>
            </div>
            <div className="pwa-install-actions">
              <button className="pwa-install-dismiss" onClick={() => setShowInstallBanner(false)} style={{ color: 'var(--text-navy)', border: '2px solid var(--text-navy)', fontWeight: 'bold' }} aria-label="Dismiss install prompt">Dismiss</button>
            </div>
          </div>
        )}

        {/* Floating Sparkles */}
        <div className="sparkle s1">✦</div>
        <div className="sparkle s2">✧</div>
        <div className="sparkle s3">✦</div>

        <header className={activeView !== 'landing' && activeView !== 'sponsors-overview' && activeView !== 'profile' && activeView !== 'audit-logs' && activeView !== 'blog' && activeView !== 'profile-view' && activeView !== 'venue' && activeView !== 'showroom' ? 'header-minimal' : ''}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <div className="logo-circle" onClick={navigateToLanding} style={{ cursor: 'pointer' }}>
              <img src="brand/Logo.png" alt="Starlet Logo" />
            </div>
            <span className="logo-text" onClick={navigateToLanding}>
              Starlet
            </span>
          </div>

          {(activeView === 'landing' || activeView === 'blog' || activeView === 'profile-view' || activeView === 'venue' || activeView === 'showroom') && (
            <>
              <nav className={`nav-links ${isMenuOpen ? 'mobile-active' : ''}`}>
                <>
                  <a href="#tracks" className="nav-link" onClick={(e) => handleHomeNavClick('tracks', e)}>Tracks</a>
                  <a href="#timeline" className="nav-link" onClick={(e) => handleHomeNavClick('timeline', e)}>Timeline</a>
                  <a href="#events" className="nav-link" onClick={(e) => handleHomeNavClick('events', e)}>Events</a>
                  <a href="#rules" className="nav-link" onClick={(e) => handleHomeNavClick('rules', e)}>Rules</a>
                  <a href="#sponsors" className="nav-link" onClick={(e) => handleHomeNavClick('sponsors', e)}>Sponsors</a>
                  <a href="#uic-overview" className="nav-link" onClick={(e) => { e.preventDefault(); setActiveView('sponsors-overview'); setIsMenuOpen(false); }}>UIC Overview</a>
                  <a href="#contact" className="nav-link" onClick={(e) => handleHomeNavClick('contact', e)}>Contact Us</a>
                  <a href="#" className={`nav-link ${activeView === 'showroom' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveView('showroom'); setIsMenuOpen(false); }}>Showroom</a>
                  <a href="#" className={`nav-link ${activeView === 'blog' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveView('blog'); setIsMenuOpen(false); }}>Blog</a>
                </>

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
                  ) : null}
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
                  ) : null}
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
                  onClick={navigateToLanding}
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

          {(activeView === 'profile' || activeView === 'audit-logs') && (
            <>
              <nav className={`nav-links ${user.role === 'admin' && adminActiveTab === 'admin' ? 'admin-top-nav' : 'profile-nav-links'} ${isMenuOpen ? 'mobile-active' : ''}`}>
                {user.role === 'admin' && adminActiveTab === 'admin' && (
                  <>
                    <a href="#project-submissions-section" className="nav-link" onClick={(e) => { e.preventDefault(); handleAdminNavClick('project-submissions-section'); }}>Submissions</a>
                    <a href="#active-squads-section" className="nav-link" onClick={(e) => { e.preventDefault(); handleAdminNavClick('active-squads-section'); }}>Active Squads</a>
                    <a href="#global-config-section" className="nav-link" onClick={(e) => { e.preventDefault(); handleAdminNavClick('global-config-section'); }}>Config</a>
                    <a href="#venue-management-section" className="nav-link" onClick={(e) => { e.preventDefault(); handleAdminNavClick('venue-management-section'); }}>Venue</a>
                    <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); setActiveView('audit-logs'); setIsMenuOpen(false); }}>Logs</a>
                  </>
                )}
              </nav>

              <div className="header-actions">
                <div className="profile-header-icons">
                  {user.role === 'admin' && (
                    <div
                      className="nav-btn-round profile-switch-btn"
                      onClick={() => {
                        setAdminActiveTab(adminActiveTab === 'admin' ? 'mentor' : 'admin');
                        if (activeView === 'audit-logs') {
                          setActiveView('profile');
                        }
                      }}
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
                    onClick={navigateToLanding}
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
                {user.role === 'admin' && adminActiveTab === 'admin' && (
                  <div className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <img src={isMenuOpen ? "icons/close.svg" : "icons/hamburger.svg"} alt="menu" />
                  </div>
                )}
              </div>
            </>
          )}
        </header>
      </div>

      // ==========================================


      // 🖥️ RENDER: LANDING PAGE


      // ==========================================


      {activeView === 'landing' ? (
        <>
          <main id="main-content-anchor">
            <section className="hero">
              <div className="badge-main">
                MIND EMPOWERED PRESENTS
              </div>
              <h1 className="text-3d">STARLET 5.0</h1>
              <div className="subtitle-large">
                A place where your ideas make you a star
              </div>
              <div className="handwritten" style={{ fontSize: '1.4rem', color: 'var(--text-navy)', margin: '1rem auto 3.5rem', background: 'rgba(255, 253, 240, 0.9)', padding: '0.8rem 2rem', borderRadius: '15px', border: '2px dashed var(--text-navy)', display: 'inline-block', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)' }}>
                In Collaboration with <strong>Adi Shankara Institute of Engineering and Technology</strong>
              </div>

              <div className="hero-ctas">
                {!isLoggedIn && <button className="join-btn" onClick={() => setActiveView('signup')}>SIGN UP</button>}
                {!isLoggedIn && <button className="btn-secondary" onClick={() => setActiveView('login')}>LOGIN</button>}
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
                      {(() => {
                        return (
                          <>
                            <h3 className="whiteboard-title handwritten" style={{ marginBottom: '1rem', fontSize: '2rem' }}>
                              Starlet 5.0 Schedule
                            </h3>

                            {/* Manual Day Selection Tabs */}
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', zIndex: 10 }}>
                              <button
                                className={`schedule-day-btn ${activeScheduleDay === 1 ? 'active' : ''}`}
                                onClick={() => setActiveScheduleDay(1)}
                                style={{
                                  padding: '8px 20px',
                                  fontFamily: 'Outfit, sans-serif',
                                  fontSize: '0.95rem',
                                  fontWeight: '900',
                                  borderRadius: '12px',
                                  border: '3px solid var(--text-navy)',
                                  background: activeScheduleDay === 1 ? 'var(--pink-primary)' : '#fff',
                                  color: activeScheduleDay === 1 ? '#fff' : 'var(--text-navy)',
                                  boxShadow: activeScheduleDay === 1 ? '2px 2px 0px var(--text-navy)' : '4px 4px 0px var(--text-navy)',
                                  transform: activeScheduleDay === 1 ? 'translate(2px, 2px)' : 'none',
                                  cursor: 'pointer',
                                  transition: 'all 0.1s',
                                  textTransform: 'uppercase',
                                  letterSpacing: '1px'
                                }}
                              >
                                Day 1 (Sat, July 11)
                              </button>
                              <button
                                className={`schedule-day-btn ${activeScheduleDay === 2 ? 'active' : ''}`}
                                onClick={() => setActiveScheduleDay(2)}
                                style={{
                                  padding: '8px 20px',
                                  fontFamily: 'Outfit, sans-serif',
                                  fontSize: '0.95rem',
                                  fontWeight: '900',
                                  borderRadius: '12px',
                                  border: '3px solid var(--text-navy)',
                                  background: activeScheduleDay === 2 ? 'var(--pink-primary)' : '#fff',
                                  color: activeScheduleDay === 2 ? '#fff' : 'var(--text-navy)',
                                  boxShadow: activeScheduleDay === 2 ? '2px 2px 0px var(--text-navy)' : '4px 4px 0px var(--text-navy)',
                                  transform: activeScheduleDay === 2 ? 'translate(2px, 2px)' : 'none',
                                  cursor: 'pointer',
                                  transition: 'all 0.1s',
                                  textTransform: 'uppercase',
                                  letterSpacing: '1px'
                                }}
                              >
                                Day 2 (Sun, July 12)
                              </button>
                            </div>

                            <div className="handwritten" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.8rem', padding: '0 1rem' }}>
                              {activeScheduleDay === 1 ? (
                                <>
                                  <div className="timeline-event" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(0,0,0,0.15)', paddingBottom: '0.4rem', gap: '1.5rem' }}>
                                    <strong style={{ minWidth: '150px', color: 'var(--text-navy)', textAlign: 'left' }}>8:00am - 8:30am</strong>
                                    <span style={{ flex: 1, textAlign: 'left' }}>Registration and Breakfast</span>
                                  </div>
                                  <div className="timeline-event" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(0,0,0,0.15)', paddingBottom: '0.4rem', gap: '1.5rem' }}>
                                    <strong style={{ minWidth: '150px', color: 'var(--text-navy)', textAlign: 'left' }}>8:30am - 9:00 am</strong>
                                    <span style={{ flex: 1, textAlign: 'left' }}>Settling in and introduction of rules and regulations</span>
                                  </div>
                                  <div className="timeline-event" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(0,0,0,0.15)', paddingBottom: '0.4rem', gap: '1.5rem' }}>
                                    <strong style={{ minWidth: '150px', color: 'var(--text-navy)', textAlign: 'left' }}>9:00am - 9:30am</strong>
                                    <span style={{ flex: 1, textAlign: 'left' }}>Introduction of theme and challenges</span>
                                  </div>
                                  <div className="timeline-event" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(0,0,0,0.15)', paddingBottom: '0.4rem', gap: '1.5rem' }}>
                                    <strong style={{ minWidth: '150px', color: 'var(--pink-primary)', textAlign: 'left' }}>9:30am onwards</strong>
                                    <span style={{ flex: 1, textAlign: 'left', fontWeight: 'bold' }}>Hackathon Begins <img src="svg/emoji/energy.svg" className="emoji-icon" alt="Begins" /></span>
                                  </div>
                                  <div className="timeline-event" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(0,0,0,0.15)', paddingBottom: '0.4rem', gap: '1.5rem' }}>
                                    <strong style={{ minWidth: '150px', color: 'var(--text-navy)', textAlign: 'left' }}>11:00 AM</strong>
                                    <span style={{ flex: 1, textAlign: 'left' }}>Snack break</span>
                                  </div>
                                  <div className="timeline-event" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(0,0,0,0.15)', paddingBottom: '0.4rem', gap: '1.5rem' }}>
                                    <strong style={{ minWidth: '150px', color: 'var(--text-navy)', textAlign: 'left' }}>1:00 PM</strong>
                                    <span style={{ flex: 1, textAlign: 'left' }}>Lunch break</span>
                                  </div>
                                  <div className="timeline-event" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(0,0,0,0.15)', paddingBottom: '0.4rem', gap: '1.5rem' }}>
                                    <strong style={{ minWidth: '150px', color: 'var(--text-navy)', textAlign: 'left' }}>2:00 PM</strong>
                                    <span style={{ flex: 1, textAlign: 'left' }}>Hacking Continues</span>
                                  </div>
                                  <div className="timeline-event" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(0,0,0,0.15)', paddingBottom: '0.4rem', gap: '1.5rem' }}>
                                    <strong style={{ minWidth: '150px', color: 'var(--text-navy)', textAlign: 'left' }}>3:30 PM</strong>
                                    <span style={{ flex: 1, textAlign: 'left' }}>Snack break</span>
                                  </div>
                                  <div className="timeline-event" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(0,0,0,0.15)', paddingBottom: '0.4rem', gap: '1.5rem' }}>
                                    <strong style={{ minWidth: '150px', color: 'var(--text-navy)', textAlign: 'left' }}>4:00 PM</strong>
                                    <span style={{ flex: 1, textAlign: 'left' }}>Hacking Continues</span>
                                  </div>
                                  <div className="timeline-event" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(0,0,0,0.15)', paddingBottom: '0.4rem', gap: '1.5rem' }}>
                                    <strong style={{ minWidth: '150px', color: 'var(--text-navy)', textAlign: 'left' }}>4:30 PM</strong>
                                    <span style={{ flex: 1, textAlign: 'left' }}>Cultural Programme</span>
                                  </div>
                                  <div className="timeline-event" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(0,0,0,0.15)', paddingBottom: '0.4rem', gap: '1.5rem' }}>
                                    <strong style={{ minWidth: '150px', color: 'var(--text-navy)', textAlign: 'left' }}>6:00 PM</strong>
                                    <span style={{ flex: 1, textAlign: 'left' }}>Wrap up for the day</span>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="timeline-event" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(0,0,0,0.15)', paddingBottom: '0.4rem', gap: '1.5rem' }}>
                                    <strong style={{ minWidth: '150px', color: 'var(--text-navy)', textAlign: 'left' }}>8:00 AM</strong>
                                    <span style={{ flex: 1, textAlign: 'left' }}>Breakfast</span>
                                  </div>
                                  <div className="timeline-event" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(0,0,0,0.15)', paddingBottom: '0.4rem', gap: '1.5rem' }}>
                                    <strong style={{ minWidth: '150px', color: 'var(--text-navy)', textAlign: 'left' }}>8:30 AM</strong>
                                    <span style={{ flex: 1, textAlign: 'left' }}>Hacking Continues</span>
                                  </div>
                                  <div className="timeline-event" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(0,0,0,0.15)', paddingBottom: '0.4rem', gap: '1.5rem' }}>
                                    <strong style={{ minWidth: '150px', color: 'var(--text-navy)', textAlign: 'left' }}>11:00 AM</strong>
                                    <span style={{ flex: 1, textAlign: 'left' }}>Snack break</span>
                                  </div>
                                  <div className="timeline-event" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(0,0,0,0.15)', paddingBottom: '0.4rem', gap: '1.5rem' }}>
                                    <strong style={{ minWidth: '150px', color: 'var(--pink-primary)', textAlign: 'left' }}>1:00 PM</strong>
                                    <span style={{ flex: 1, textAlign: 'left', fontWeight: 'bold' }}>Deadline for uploading demo link on the website <img src="svg/emoji/warning.svg" className="emoji-icon" alt="Warning" /></span>
                                  </div>
                                  <div className="timeline-event" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(0,0,0,0.15)', paddingBottom: '0.4rem', gap: '1.5rem' }}>
                                    <strong style={{ minWidth: '150px', color: 'var(--text-navy)', textAlign: 'left' }}>1:05 PM</strong>
                                    <span style={{ flex: 1, textAlign: 'left' }}>Lunch Break</span>
                                  </div>
                                  <div className="timeline-event" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(0,0,0,0.15)', paddingBottom: '0.4rem', gap: '1.5rem' }}>
                                    <strong style={{ minWidth: '150px', color: 'var(--text-navy)', textAlign: 'left' }}>1:30 PM</strong>
                                    <span style={{ flex: 1, textAlign: 'left', fontWeight: 'bold' }}>Final Presentation to the judges</span>
                                  </div>
                                  <div className="timeline-event" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(0,0,0,0.15)', paddingBottom: '0.4rem', gap: '1.5rem' }}>
                                    <strong style={{ minWidth: '150px', color: 'var(--text-navy)', textAlign: 'left' }}>3:30 PM</strong>
                                    <span style={{ flex: 1, textAlign: 'left' }}>Snack break</span>
                                  </div>
                                  <div className="timeline-event" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(0,0,0,0.15)', paddingBottom: '0.4rem', gap: '1.5rem' }}>
                                    <strong style={{ minWidth: '150px', color: 'var(--text-navy)', textAlign: 'left' }}>4:00 PM</strong>
                                    <span style={{ flex: 1, textAlign: 'left' }}>Judgement time</span>
                                  </div>
                                  <div className="timeline-event" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(0,0,0,0.15)', paddingBottom: '0.4rem', gap: '1.5rem' }}>
                                    <strong style={{ minWidth: '150px', color: 'var(--pink-primary)', textAlign: 'left' }}>4:30 PM</strong>
                                    <span style={{ flex: 1, textAlign: 'left', fontWeight: 'bold' }}>Prize Distribution <img src="svg/emoji/prize.svg" className="emoji-icon" alt="Prize" /></span>
                                  </div>
                                  <div className="timeline-event" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(0,0,0,0.15)', paddingBottom: '0.4rem', gap: '1.5rem' }}>
                                    <strong style={{ minWidth: '150px', color: 'var(--text-navy)', textAlign: 'left' }}>5:00 PM</strong>
                                    <span style={{ flex: 1, textAlign: 'left' }}>Wrap up for the day</span>
                                  </div>
                                </>
                              )}
                            </div>
                          </>
                        );
                      })()}
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
                            <p><strong>CODE ORIGINALITY:</strong> All projects must be built from scratch during hackathon hours. Pre-existing code is prohibited, except open-source libraries or frameworks. Taking external help or coding only using ai leads to disqualification.</p>
                          </div>
                          <div className="warning-item" style={{ "--r": 1.2 }}>
                            <div className="warning-icon"><img src="icons/rocket.svg" className="card-icon" alt="rocket" /></div>
                            <p><strong>THEMES & SCOPE:</strong> Projects must align with official hackathon problem statements and guidelines. Teams own their original code and assets.</p>
                          </div>
                          <div className="warning-item" style={{ "--r": -1.2 }}>
                            <div className="warning-icon"><img src="icons/users.svg" className="card-icon" alt="users" /></div>
                            <p><strong>COLLABORATION POWER:</strong> Cross-team collaboration is highly encouraged! Seek advice and guidance from mentors and organizers.</p>
                          </div>
                          <div className="warning-item" style={{ "--r": 0.8 }}>
                            <div className="warning-icon"><img src="icons/calendar.svg" className="card-icon" alt="calendar" /></div>
                            <p><strong>SUBMISSION DEADLINE:</strong> Submit project documentation, source code, and presentation before the deadline. Late submissions face disqualification.</p>
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

                        if (isMobile) {
                          const PAGE_SIZE = 3;
                          const numPages = Math.ceil(allTracks.length / PAGE_SIZE);
                          const startIndex = mobileTrackPageIndex * PAGE_SIZE;
                          const pageTracks = allTracks.slice(startIndex, startIndex + PAGE_SIZE);

                          if (pageTracks.length === 0) return null;

                          return (
                            <>
                              <div className="tracks-grid-interactive paginated-mobile-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', width: '100%' }}>
                                {pageTracks.map((track) => {
                                  const absoluteIndex = allTracks.indexOf(track);
                                  return (
                                    <div
                                      key={track.id}
                                      className={`track-card-mini paginated-active-card slide-${slideDirection}`}
                                      onClick={() => setSelectedTrack({ ...track, index: track.id === 'other' ? 'Other' : absoluteIndex + 1 })}
                                      style={{ width: '100%', margin: '0 auto' }}
                                    >
                                      <div className="track-card-inner">
                                        <span className="track-number">{track.id === 'other' ? '★' : `#${absoluteIndex + 1}`}</span>
                                        <h3>{track.title}</h3>
                                        <div className="view-details-tag">VIEW CHALLENGE →</div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>

                              <div className="track-pagination-controls">
                                <button
                                  className="track-pagination-arrow"
                                  onClick={() => {
                                    if (mobileTrackPageIndex > 0) {
                                      setSlideDirection('prev');
                                      setMobileTrackPageIndex(prev => prev - 1);
                                    }
                                  }}
                                  disabled={mobileTrackPageIndex === 0}
                                  aria-label="Previous Page"
                                >
                                  ←
                                </button>
                                <div className="track-pagination-numbers">
                                  {Array.from({ length: numPages }).map((_, idx) => (
                                    <button
                                      key={idx}
                                      className={`track-pagination-number ${mobileTrackPageIndex === idx ? 'active' : ''}`}
                                      onClick={() => {
                                        setSlideDirection(idx > mobileTrackPageIndex ? 'next' : 'prev');
                                        setMobileTrackPageIndex(idx);
                                      }}
                                    >
                                      {idx + 1}
                                    </button>
                                  ))}
                                </div>
                                <button
                                  className="track-pagination-arrow"
                                  onClick={() => {
                                    if (mobileTrackPageIndex < numPages - 1) {
                                      setSlideDirection('next');
                                      setMobileTrackPageIndex(prev => prev + 1);
                                    }
                                  }}
                                  disabled={mobileTrackPageIndex === numPages - 1}
                                  aria-label="Next Page"
                                >
                                  →
                                </button>
                              </div>
                            </>
                          );
                        }

                        return (
                          <>
                            <div className="tracks-grid-interactive">
                              {allTracks.map((track, i) => (
                                <div key={track.id} className="track-card-mini" onClick={() => setSelectedTrack({ ...track, index: track.id === 'other' ? 'Other' : i + 1 })}>
                                  <div className="track-card-inner">
                                    <span className="track-number">{track.id === 'other' ? '★' : `#${i + 1}`}</span>
                                    <h3>{track.title}</h3>
                                    <div className="view-details-tag">VIEW CHALLENGE →</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  ) : section.type === 'sponsors' ? (
                    <div className="section-content">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '1.5rem' }}>
                        <h2 className="text-3d" style={{ fontSize: '2.5rem', margin: 0 }}>{section.title}</h2>
                        <div className="mobile-scroll-btns" style={{ display: 'flex', gap: '1rem' }}>
                          <button className="nav-btn-round" aria-label="Scroll sponsors left" onClick={() => partnersRef.current?.scrollBy({ left: -300, behavior: 'smooth' })}>←</button>
                          <button className="nav-btn-round" aria-label="Scroll sponsors right" onClick={() => partnersRef.current?.scrollBy({ left: 300, behavior: 'smooth' })}>→</button>
                        </div>
                      </div>

                      {/* Organizers & Collaborators Grid */}
                      <div className="partners-grid-custom supporters-row-grid" ref={partnersRef}>

                        <div className="partner-card-wide partner-card-extra-wide clickable" onClick={() => setShowAdiPopup(true)}>
                          <span className="badge-main" style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%) rotate(-2deg)', zIndex: 2, background: 'var(--pink-primary)' }}>COLLABORATOR</span>
                          <img src="collaborators/adi sankara.png" alt="Adi Shankara" loading="lazy" style={{ height: '110px', width: 'auto', maxWidth: '100%', objectFit: 'contain', marginTop: '1.2rem', marginBottom: '0.2rem' }} />
                          <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: '0.8rem', color: '#555', fontWeight: 'bold', margin: 0 }}>MAIN VENUE PARTNER</p>
                          </div>
                        </div>

                        <div className="partner-card-square collab-nss clickable" onClick={() => setShowNSSPopup(true)}>
                          <span className="badge-main" style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%) rotate(-2deg)', zIndex: 2, background: 'var(--pink-primary)' }}>OUTREACH PARTNER</span>
                          <div style={{ position: 'absolute', top: '25px', left: '25px', right: '25px', bottom: '25px', overflow: 'hidden', zIndex: 1 }}>
                            <img src="collaborators/nss.png" alt="NSS ASIET" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                          </div>
                        </div>

                        <div className="partner-card-square clickable" onClick={() => setShowLTPopup(true)}>
                          <span className="badge-main" style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%) rotate(-2deg)', zIndex: 2, background: 'var(--pink-primary)' }}>OUTREACH PARTNER</span>
                          <div style={{ position: 'absolute', top: '25px', left: '25px', right: '25px', bottom: '25px', overflow: 'hidden', zIndex: 1 }}>
                            <img src="collaborators/LT.png" alt="Lenient Tree" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                          </div>
                        </div>

                        <div className="partner-card-square clickable" onClick={() => setShowWECPopup(true)}>
                          <span className="badge-main" style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%) rotate(-2deg)', zIndex: 2, background: 'var(--pink-primary)' }}>OUTREACH PARTNER</span>
                          <div style={{ position: 'absolute', top: '25px', left: '25px', right: '25px', bottom: '25px', overflow: 'hidden', zIndex: 1 }}>
                            <img src="collaborators/Women Empowerement Cell.png" alt="Women Empowerment Cell" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                          </div>
                        </div>
                      </div>

                      {/* Sponsors Section */}
                      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                        <h3 className="handwritten" style={{ fontSize: '2.5rem', color: 'var(--text-navy)', marginBottom: '1.5rem' }}>Sponsors</h3>
                        <div className="partners-grid-custom sponsors-row-grid" style={{ marginTop: '2rem' }}>
                          {/* Synthite */}
                          <div className="partner-card-wide clickable" onClick={() => setShowSynthitePopup(true)} style={{ padding: '1.5rem 1.5rem 1rem' }}>
                            <span className="badge-main" style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%) rotate(-2deg)', zIndex: 2, background: 'var(--pink-primary)' }}>PRIZE SPONSOR</span>
                            <img src="collaborators/Synthite.png" alt="Synthite Industries" loading="lazy" style={{ height: '100px', width: 'auto', maxWidth: '100%', objectFit: 'contain', marginTop: '1.2rem' }} />
                            <div style={{ textAlign: 'center' }}>
                              <p style={{ fontSize: '0.8rem', color: '#555', fontWeight: 'bold', margin: 0 }}>PRIZE SPONSOR</p>
                            </div>
                          </div>

                          {/* Reccaa Club */}
                          <div className="partner-card-square clickable" onClick={() => setShowReccaaPopup(true)}>
                            <span className="badge-main" style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%) rotate(-2deg)', zIndex: 2, background: 'var(--pink-primary)' }}>SPONSOR</span>
                            <div style={{ position: 'absolute', top: '25px', left: '25px', right: '25px', bottom: '25px', overflow: 'hidden', zIndex: 1 }}>
                              <img src="collaborators/Reccaa club.png" alt="Reccaa Club" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </div>
                          </div>

                          {/* Aikyam Space */}
                          <div className="partner-card-wide clickable" onClick={() => setShowAikyamPopup(true)} style={{ padding: '1.5rem 1.5rem 1rem' }}>
                            <span className="badge-main" style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%) rotate(-2deg)', zIndex: 2, background: 'var(--pink-primary)' }}>SPONSOR</span>
                            <img src="collaborators/aikyam.webp" alt="Aikyam Space" loading="lazy" style={{ height: '90px', width: 'auto', maxWidth: '100%', objectFit: 'contain', marginTop: '1.5rem' }} />
                            <div style={{ textAlign: 'center' }}>
                              <p style={{ fontSize: '0.8rem', color: '#555', fontWeight: 'bold', margin: 0 }}>SPONSOR</p>
                            </div>
                          </div>

                          {/* French Toast */}
                          <div className="partner-card-wide clickable" onClick={() => setShowFrenchToastPopup(true)} style={{ padding: '1.5rem 1.5rem 1rem' }}>
                            <span className="badge-main" style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%) rotate(-2deg)', zIndex: 2, background: 'var(--pink-primary)' }}>SPONSOR</span>
                            <img src="collaborators/french toast.png" alt="French Toast" loading="lazy" style={{ height: '90px', width: 'auto', maxWidth: '100%', objectFit: 'contain', marginTop: '1.5rem' }} />
                            <div style={{ textAlign: 'center' }}>
                              <p style={{ fontSize: '0.8rem', color: '#555', fontWeight: 'bold', margin: 0 }}>SPONSOR</p>
                            </div>
                          </div>

                          {/* ESAF small finance bank */}
                          <div className="partner-card-wide clickable" onClick={() => setShowESAFPopup(true)} style={{ padding: '1.5rem 1.5rem 1rem' }}>
                            <span className="badge-main" style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%) rotate(-2deg)', zIndex: 2, background: 'var(--pink-primary)' }}>SPONSOR</span>
                            <img src="collaborators/ESAF.png" alt="ESAF" loading="lazy" style={{ height: '90px', width: 'auto', maxWidth: '100%', objectFit: 'contain', marginTop: '1.5rem' }} />
                            <div style={{ textAlign: 'center' }}>
                              <p style={{ fontSize: '0.8rem', color: '#555', fontWeight: 'bold', margin: 0 }}>SPONSOR</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : section.type === 'gallery' ? (
                    <div className="section-content">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <h2 className="text-3d" style={{ fontSize: '2.5rem', margin: 0 }}>{section.title}</h2>
                        <div className="gallery-nav-btns" style={{ display: 'flex', gap: '1rem' }}>
                          <button className="nav-btn-round" aria-label="Scroll gallery left" onClick={() => landingGalleryRef.current.scrollBy({ left: -400, behavior: 'smooth' })}>←</button>
                          <button className="nav-btn-round" aria-label="Scroll gallery right" onClick={() => landingGalleryRef.current.scrollBy({ left: 400, behavior: 'smooth' })}>→</button>
                        </div>
                      </div>
                      <div className="gallery-grid" ref={landingGalleryRef} style={{ overflowX: 'auto', display: 'flex', scrollBehavior: 'smooth', padding: '1rem 0' }}>
                        {Array.from({ length: 42 }, (_, i) => {
                          const index = i + 1;
                          const path = index <= 9 ? `gallery/${index}.JPG` : `gallery/${index}.jpg`;
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
                      <h2 className="text-3d" style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>{section.title}</h2>

                      {/* Jury Showcase (Top) */}
                      <div className="jury-arcade-deck">
                        <h3 className="arcade-subtitle">JURY GRID</h3>
                        <div className="arcade-character-grid">
                          {judgesData.map((judge, index) => (
                            <div key={judge.id} className="arcade-char-card">
                              <div className="arcade-char-frame">
                                <img src={judge.image} alt={judge.name} className="arcade-char-img" />
                                <div className="arcade-scanline"></div>
                              </div>
                              <div className="arcade-char-stats">
                                <h4 className="char-name">{judge.name}</h4>
                                <p className="char-title">{judge.title}</p>
                                <div className="char-stats-list">
                                  <div className="char-stat-item">
                                    <span className="stat-label">AFFILIATION:</span>
                                    <span className="stat-value">{judge.affiliation}</span>
                                  </div>
                                  <div className="char-stat-item">
                                    <span className="stat-label">STATUS:</span>
                                    <span className="stat-value select-ready">▶ READY</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Judging Criteria Showcase */}
                      <div className="judging-criteria-deck" style={{ marginTop: '3.5rem', marginBottom: '3.5rem' }}>
                        <h3 className="arcade-subtitle">JUDGING CRITERIA</h3>
                        <div className="arcade-criteria-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', padding: '1rem' }}>

                          <div className="arcade-char-card" style={{ padding: '1.5rem', border: '3px solid var(--text-navy)', background: 'var(--bg-cream)', boxShadow: '5px 5px 0px var(--text-navy)', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '0.8rem', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '-15px', right: '15px', background: 'var(--pink-primary)', color: '#fff', padding: '0.3rem 0.8rem', border: '2px solid var(--text-navy)', borderRadius: '10px', fontFamily: "'Fredoka One', cursive", fontSize: '0.9rem', boxShadow: '2px 2px 0px var(--text-navy)' }}>
                              15 MARKS
                            </div>
                            <h4 style={{ fontFamily: "'Fredoka One', cursive", fontSize: '1.25rem', color: 'var(--pink-primary)', margin: 0 }}>Innovation</h4>
                            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.95rem', color: 'var(--text-navy)', margin: 0, lineHeight: '1.4', textAlign: 'left' }}>
                              Does the project bring a new and unique solution to the challenge at hand?
                            </p>
                          </div>

                          <div className="arcade-char-card" style={{ padding: '1.5rem', border: '3px solid var(--text-navy)', background: 'var(--bg-cream)', boxShadow: '5px 5px 0px var(--text-navy)', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '0.8rem', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '-15px', right: '15px', background: 'var(--text-navy)', color: '#fff', padding: '0.3rem 0.8rem', border: '2px solid var(--text-navy)', borderRadius: '10px', fontFamily: "'Fredoka One', cursive", fontSize: '0.9rem', boxShadow: '2px 2px 0px var(--text-navy)' }}>
                              10 MARKS
                            </div>
                            <h4 style={{ fontFamily: "'Fredoka One', cursive", fontSize: '1.25rem', color: 'var(--text-navy)', margin: 0 }}>Technical Merit</h4>
                            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.95rem', color: 'var(--text-navy)', margin: 0, lineHeight: '1.4', textAlign: 'left' }}>
                              Does the project demonstrate a high level of technical skill and expertise?
                            </p>
                          </div>

                          <div className="arcade-char-card" style={{ padding: '1.5rem', border: '3px solid var(--text-navy)', background: 'var(--bg-cream)', boxShadow: '5px 5px 0px var(--text-navy)', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '0.8rem', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '-15px', right: '15px', background: 'var(--text-navy)', color: '#fff', padding: '0.3rem 0.8rem', border: '2px solid var(--text-navy)', borderRadius: '10px', fontFamily: "'Fredoka One', cursive", fontSize: '0.9rem', boxShadow: '2px 2px 0px var(--text-navy)' }}>
                              10 MARKS
                            </div>
                            <h4 style={{ fontFamily: "'Fredoka One', cursive", fontSize: '1.25rem', color: 'var(--text-navy)', margin: 0 }}>User Experience</h4>
                            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.95rem', color: 'var(--text-navy)', margin: 0, lineHeight: '1.4', textAlign: 'left' }}>
                              Is the project user-friendly and easy to use?
                            </p>
                          </div>

                          <div className="arcade-char-card" style={{ padding: '1.5rem', border: '3px solid var(--text-navy)', background: 'var(--bg-cream)', boxShadow: '5px 5px 0px var(--text-navy)', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '0.8rem', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '-15px', right: '15px', background: 'var(--text-navy)', color: '#fff', padding: '0.3rem 0.8rem', border: '2px solid var(--text-navy)', borderRadius: '10px', fontFamily: "'Fredoka One', cursive", fontSize: '0.9rem', boxShadow: '2px 2px 0px var(--text-navy)' }}>
                              10 MARKS
                            </div>
                            <h4 style={{ fontFamily: "'Fredoka One', cursive", fontSize: '1.25rem', color: 'var(--text-navy)', margin: 0 }}>Impact</h4>
                            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.95rem', color: 'var(--text-navy)', margin: 0, lineHeight: '1.4', textAlign: 'left' }}>
                              Does the project have the potential to have a positive impact on society or a specific group of people?
                            </p>
                          </div>

                          <div className="arcade-char-card" style={{ padding: '1.5rem', border: '3px solid var(--text-navy)', background: 'var(--bg-cream)', boxShadow: '5px 5px 0px var(--text-navy)', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '0.8rem', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '-15px', right: '15px', background: 'var(--text-navy)', color: '#fff', padding: '0.3rem 0.8rem', border: '2px solid var(--text-navy)', borderRadius: '10px', fontFamily: "'Fredoka One', cursive", fontSize: '0.9rem', boxShadow: '2px 2px 0px var(--text-navy)' }}>
                              10 MARKS
                            </div>
                            <h4 style={{ fontFamily: "'Fredoka One', cursive", fontSize: '1.25rem', color: 'var(--text-navy)', margin: 0 }}>Presentation</h4>
                            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.95rem', color: 'var(--text-navy)', margin: 0, lineHeight: '1.4', textAlign: 'left' }}>
                              Was the presentation clear, concise, and engaging?
                            </p>
                          </div>

                          <div className="arcade-char-card" style={{ padding: '1.5rem', border: '3px solid var(--text-navy)', background: 'var(--bg-cream)', boxShadow: '5px 5px 0px var(--text-navy)', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '0.8rem', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '-15px', right: '15px', background: 'var(--text-navy)', color: '#fff', padding: '0.3rem 0.8rem', border: '2px solid var(--text-navy)', borderRadius: '10px', fontFamily: "'Fredoka One', cursive", fontSize: '0.9rem', boxShadow: '2px 2px 0px var(--text-navy)' }}>
                              10 MARKS
                            </div>
                            <h4 style={{ fontFamily: "'Fredoka One', cursive", fontSize: '1.25rem', color: 'var(--text-navy)', margin: 0 }}>Feasibility</h4>
                            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.95rem', color: 'var(--text-navy)', margin: 0, lineHeight: '1.4', textAlign: 'left' }}>
                              Is the project feasible to implement in the real world?
                            </p>
                          </div>

                        </div>
                      </div>

                      {/* Full Screen dashed divider */}
                      <div className="arcade-full-bleed-divider"></div>

                      {/* Prizes Showcase (Bottom) */}
                      <div className="prizes-ticket-rack">
                        <h3 className="arcade-subtitle">CLAIM STARLET PRIZE TICKETS</h3>
                        <div className="arcade-tickets-grid">
                          <div className="arcade-ticket rank-1">
                            <div className="ticket-left">
                              <div className="ticket-rank">01</div>
                            </div>
                            <div className="ticket-right">
                              <div className="ticket-header">
                                <span className="ticket-label">GOLD TICKET</span>
                                <span className="ticket-serial">ST-2026-01</span>
                              </div>
                              <div className="ticket-body">
                                <div className="ticket-amount">₹15,000</div>
                                <div className="ticket-details">First Place Trophy + Certificate</div>
                              </div>
                            </div>
                          </div>

                          <div className="arcade-ticket rank-2">
                            <div className="ticket-left">
                              <div className="ticket-rank">02</div>
                            </div>
                            <div className="ticket-right">
                              <div className="ticket-header">
                                <span className="ticket-label">SILVER TICKET</span>
                                <span className="ticket-serial">ST-2026-02</span>
                              </div>
                              <div className="ticket-body">
                                <div className="ticket-amount">₹10,000</div>
                                <div className="ticket-details">Second Place Trophy + Certificate</div>
                              </div>
                            </div>
                          </div>

                          <div className="arcade-ticket rank-3">
                            <div className="ticket-left">
                              <div className="ticket-rank">03</div>
                            </div>
                            <div className="ticket-right">
                              <div className="ticket-header">
                                <span className="ticket-label">BRONZE TICKET</span>
                                <span className="ticket-serial">ST-2026-03</span>
                              </div>
                              <div className="ticket-body">
                                <div className="ticket-amount">₹7,500</div>
                                <div className="ticket-details">Third Place Trophy + Certificate</div>
                              </div>
                            </div>
                          </div>

                          <div className="arcade-ticket rank-innovation">
                            <div className="ticket-left">
                              <div className="ticket-rank">
                                <img src="svg/emoji/idea.svg" alt="Innovation" style={{ width: '32px', height: '32px' }} />
                              </div>
                            </div>
                            <div className="ticket-right">
                              <div className="ticket-header">
                                <span className="ticket-label">COSMIC TICKET</span>
                                <span className="ticket-serial">ST-2026-IN</span>
                              </div>
                              <div className="ticket-body">
                                <div className="ticket-amount">₹7,500</div>
                                <div className="ticket-details">Best Innovation Special Award</div>
                              </div>
                            </div>
                          </div>
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
                          <p>Join our community of creators on social media.</p>
                          <div className="social-grid">
                            <a href="https://www.instagram.com/mind.empowered?igsh=bGNmYXI1czlrcDhi" target="_blank" rel="noopener noreferrer" className="social-item instagram">
                              <img src="icons/instagram.svg" alt="Instagram" />
                              <span>Instagram</span>
                            </a>

                            <a href="https://www.linkedin.com/company/mind-empowered/" target="_blank" rel="noopener noreferrer" className="social-item linkedin">
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

                  ) : section.type === 'events' ? (
                    <div className="section-content">
                      <h2 className="text-3d" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>{section.title}</h2>
                      <p style={{ color: '#fff', marginBottom: '2.5rem', fontSize: '1.1rem' }}>{section.content}</p>

                      <div className="events-grid" style={{
                        display: 'flex',
                        overflowX: 'auto',
                        gap: '2.5rem',
                        margin: isMobile ? '0 -5%' : '0 -8%',
                        padding: isMobile ? '1rem 5% 2.5rem 5%' : '1rem 8% 2.5rem 8%',
                        scrollSnapType: 'x mandatory',
                        WebkitOverflowScrolling: 'touch',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                      }}>
                        {eventsData.map(ev => (
                          <div
                            key={ev.id}
                            className="event-card"
                            style={{
                              background: '#fffdf6',
                              border: '4px solid var(--text-navy)',
                              borderRadius: '24px',
                              padding: '1rem 1.25rem 1.6rem 1.25rem',
                              display: 'flex',
                              flexDirection: 'column',
                              boxShadow: '8px 8px 0px var(--text-navy)',
                              transition: 'transform 0.2s',
                              flex: ev.isBand ? '0 0 840px' : (ev.cardWidth ? `0 0 ${parseInt(ev.cardWidth) + 40}px` : '0 0 280px'),
                              scrollSnapAlign: 'start',
                              position: 'relative'
                            }}
                          >
                            {/* Decorative Red Tape */}
                            <div style={{
                              position: 'absolute',
                              top: '-12px',
                              left: '50%',
                              transform: 'translateX(-50%) rotate(-3deg)',
                              background: 'var(--pink-primary)',
                              border: '2.5px solid var(--text-navy)',
                              padding: '2px 14px',
                              fontSize: '0.65rem',
                              fontWeight: '900',
                              color: '#fff',
                              zIndex: 5,
                              fontFamily: "'Fredoka One', cursive",
                              boxShadow: '2px 2px 0px rgba(0,0,0,0.15)',
                              letterSpacing: '1px'
                            }}>
                              STARLET 5.0
                            </div>

                            {ev.isBand ? (
                              <>
                                <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', marginBottom: '1.2rem', width: '100%', marginTop: '0.4rem' }}>
                                  {ev.members.map((m, idx) => (
                                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '240px' }}>
                                      <div style={{
                                        width: '240px',
                                        height: '240px',
                                        border: '3px solid var(--text-navy)',
                                        overflow: 'hidden',
                                        background: 'var(--yellow-star)',
                                        marginBottom: '0.4rem'
                                      }}>
                                        <img src={m.image} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                                      </div>
                                      <span style={{ fontSize: '0.75rem', fontWeight: '900', color: 'var(--text-navy)', textAlign: 'center', whiteSpace: 'normal', lineHeight: 1.1 }}>{m.name}</span>
                                      <span style={{ fontSize: '0.62rem', color: '#5c3c24', opacity: 0.8, textAlign: 'center', marginTop: '0.1rem', lineHeight: 1.1 }}>{m.role}</span>
                                    </div>
                                  ))}
                                </div>
                                <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '0.4rem' }}>
                                  <span style={{
                                    color: 'var(--pink-primary)',
                                    fontSize: '0.85rem',
                                    fontWeight: '900',
                                    display: 'inline-block',
                                    marginBottom: '0.2rem',
                                    fontFamily: "'Fredoka One', cursive",
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                  }}>
                                    {ev.name}
                                  </span>
                                  <h3 style={{
                                    fontFamily: "'Fredoka One', cursive",
                                    fontSize: '1.3rem',
                                    color: 'var(--text-navy)',
                                    margin: '0 0 0.1rem 0',
                                    lineHeight: 1.2
                                  }}>
                                    {ev.person}
                                  </h3>
                                  {ev.company && (
                                    <p style={{
                                      fontFamily: 'Outfit, sans-serif',
                                      fontSize: '0.85rem',
                                      fontWeight: '700',
                                      color: '#5c3c24',
                                      opacity: 0.8,
                                      margin: 0
                                    }}>
                                      {ev.company}
                                    </p>
                                  )}
                                </div>
                              </>
                            ) : (
                              <>
                                <div style={{ width: ev.cardWidth || '240px', height: ev.cardHeight || '240px', border: '3px solid var(--text-navy)', overflow: 'hidden', background: 'var(--yellow-star)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '0.4rem' }}>
                                  {ev.image ? (
                                    <img
                                      src={ev.image}
                                      alt={ev.person}
                                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: ev.objectPosition || 'center' }}
                                      loading="lazy"
                                    />
                                  ) : (
                                    <div style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      color: 'var(--text-navy)',
                                      fontWeight: '900',
                                      fontSize: '3.5rem',
                                      fontFamily: 'Outfit, sans-serif'
                                    }}>
                                      {ev.person.split(' ').map(n => n[0]).join('')}
                                    </div>
                                  )}
                                </div>
                                <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '0.8rem' }}>
                                  <span style={{
                                    color: 'var(--pink-primary)',
                                    fontSize: '0.85rem',
                                    fontWeight: '900',
                                    display: 'inline-block',
                                    marginBottom: '0.2rem',
                                    fontFamily: "'Fredoka One', cursive",
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                  }}>
                                    {ev.name}
                                  </span>
                                  <h3 style={{
                                    fontFamily: "'Fredoka One', cursive",
                                    fontSize: '1.3rem',
                                    color: 'var(--text-navy)',
                                    margin: '0 0 0.1rem 0',
                                    lineHeight: 1.2
                                  }}>
                                    {ev.person}
                                  </h3>
                                  {ev.company && (
                                    <p style={{
                                      fontFamily: 'Outfit, sans-serif',
                                      fontSize: '0.85rem',
                                      fontWeight: '700',
                                      color: '#5c3c24',
                                      opacity: 0.8,
                                      margin: 0
                                    }}>
                                      {ev.company}
                                    </p>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : section.type === 'about-me' ? (
                    <div className="section-content">
                      <h2 className="text-3d" style={{ fontSize: '2.5rem' }}>{section.title}</h2>
                      <div className="section-inner">
                        <div style={{ flex: 1, textAlign: 'left' }}>
                          <p style={{ marginBottom: '1.5rem' }}>Mind Empowered (ME) is a charitable organization based in India. It is the brainchild of Maya Menon and her sister - two sisters who resonate positivity and happiness wherever they go.</p>
                          <p style={{ marginBottom: '2.5rem' }}>The sisters realized there was a strong need to eliminate the stigma associated with mental health from our society. Hence, the idea of an open forum to help the students came to life by forming "ME".</p>
                          <strong style={{ color: 'var(--blue-shadow)', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.9rem', display: 'block' }}>A MIND EMPOWERED INITIATIVE</strong>
                          <a href="https://www.mind-empowered.org" target="_blank" rel="noreferrer" className="join-btn" style={{ display: 'inline-block', marginTop: '1.5rem', textDecoration: 'none', padding: '12px 24px', fontSize: '1rem' }}>
                            VISIT US
                          </a>
                        </div>
                        <div className="section-visual-small" style={{ borderRadius: '26px', overflow: 'hidden', border: '3px solid var(--text-navy)', boxShadow: '4px 4px 0px var(--text-navy)', maxWidth: '350px', background: '#fff' }}>
                          <img src={section.image} alt={section.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
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
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveView('showroom'); }}>Showroom</a>
                <a href="#tracks">Tracks</a>
                <a href="#timeline">Timeline</a>
                <a href="#faq">FAQ</a>
                <a href="#">Privacy Policy</a>
              </div>

              <div className="footer-copy-mini">
                &copy; 2026 Starlet 5.0 | A <img src="brand/Mind Empowered.jpeg" alt="Mind Empowered Logo" style={{ height: '20px', verticalAlign: 'middle', margin: '0 5px', borderRadius: '3px' }} /> Initiative
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
                        {'ADD PHOTO *'}
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
                      <option value="volunteer">I am a Volunteer</option>
                    </select>
                  </div>

                  <div className="signup-fields-col">
                    <input name="fullName" type="text" placeholder="Full Name" required />
                    <input name="email" type="email" placeholder="Email Address" required />
                    <input name="password" type="password" placeholder="Password" required />
                    <input
                      name="phone"
                      type="tel"
                      placeholder="Mobile Number (e.g. +91 98765 43210)"
                      required
                      pattern="[+\d\s\-()]{7,15}"
                      title="Enter a valid mobile number"
                    />

                    {signupRole === 'mentor' ? (
                      <>
                        <input name="roleTitle" type="text" placeholder="Professional Title (e.g. Senior Architect)" required />
                        <input name="techStack" type="text" placeholder="Tech Stack (e.g. React, Python, AWS)" required />
                      </>
                    ) : (
                      <>
                        <input name="college" type="text" placeholder="College or Organization Name" required />

                        {signupRole === 'attendee' && (
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
                        )}
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
                    onClick={() => setShowForgotPasswordPopup(true)}
                  >
                    Forgot Password?
                  </div>
                </>
              )}

              <button
                type="submit"
                className="join-btn"
                disabled={activeView === 'signup' && signupRole === 'mentor' && !signupAvatarPreview}
                style={{
                  marginTop: '2rem',
                  width: '100%',
                  opacity: (activeView === 'signup' && !signupAvatarPreview) ? 0.5 : 1,
                  cursor: (activeView === 'signup' && !signupAvatarPreview) ? 'not-allowed' : 'pointer'
                }}
              >
                {activeView === 'login' ? 'LOGIN TO CONSOLE' : 'INITIALIZE REGISTRATION'}
              </button>
            </form>
            <p className="auth-toggle-text">
              {activeView === 'login' ? "Don't have an account? " : "Already have an account? "}
              <span onClick={() => setActiveView(activeView === 'login' ? 'signup' : 'login')}>
                {activeView === 'login' ? 'Sign up here' : 'Login here'}
              </span>
            </p>
            <div className="admin-back-link" onClick={navigateToLanding} style={{ marginTop: '1.5rem' }}>← Back to Home</div>
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
        // ==========================================

        // 🖥️ RENDER: MY PROFILE PAGE (ATTENDEE/MENTOR)

        // ==========================================

      ) : activeView === 'profile' ? (
        <div className={user.role === 'admin' && adminActiveTab === 'admin' ? "admin-page-wrapper" : "profile-container"}>
          {user.role === 'admin' && adminActiveTab === 'admin' ? (
            /* ADMIN PROFILE VIEW */
            // ==========================================

            // 🖥️ RENDER: ADMIN COMMAND CENTER

            // ==========================================

            <div className="admin-dashboard-full">
              <div className="admin-header-row">
                <div>
                  <h1 className="text-3d" style={{ fontSize: '3.5rem' }}>Admin Command Center</h1>
                  <p className="handwritten" style={{ fontSize: '1.2rem' }}>Master control for the Starlet 5.0 galaxy!</p>
                </div>
              </div>



              <div className="admin-stats-strip">
                <div
                  className="admin-stat-card"
                  style={{ cursor: 'pointer' }}
                  onClick={() => document.getElementById('global-user-directory-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                >
                  <div className="stat-icon"><img src="icons/users.svg" alt="users" /></div>
                  <div className="stat-info">
                    <strong>{allUsers.length}</strong>
                    <span>Total Users</span>
                  </div>
                </div>
                <div
                  className="admin-stat-card"
                  style={{ cursor: 'pointer' }}
                  onClick={() => document.getElementById('mentor-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                >
                  <div className="stat-icon"><img src="icons/trophy.svg" alt="verified" /></div>
                  <div className="stat-info">
                    <strong>{allUsers.filter(u => u.user_role === 'mentor' && u.is_approved).length}</strong>
                    <span>Verified Mentors</span>
                  </div>
                </div>
                {(() => {
                  const pendingCount = allUsers.filter(u => u.user_role === 'mentor' && (!u.is_approved || !mentors.some(m => m.profile_id === u.id))).length;
                  return (
                    <div
                      className="admin-stat-card warning"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        document.getElementById('pending-approval-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                    >
                      <div className="stat-icon">
                        <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="var(--text-navy)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      </div>
                      <div className="stat-info">
                        <strong>{pendingCount}</strong>
                        <span>Pending Approval</span>
                      </div>
                    </div>
                  );
                })()}
                <div
                  className="admin-stat-card blue"
                  style={{ cursor: 'pointer' }}
                  onClick={() => document.getElementById('system-reports-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                >
                  <div className="stat-icon"><img src="icons/warning.svg" alt="requests" /></div>
                  <div className="stat-info">
                    <strong>{mentorRequests.length}</strong>
                    <span>Active Requests</span>
                  </div>
                </div>
                <div
                  className="admin-stat-card green"
                  style={{ cursor: 'pointer', background: 'rgba(37, 211, 102, 0.1)', borderColor: '#25D366' }}
                  onClick={() => setIsScannerOpen(true)}
                >
                  <div className="stat-icon">
                    <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="var(--text-navy)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <path d="M7 7h2v2H7zm0 8h2v2H7zm8-8h2v2h-2zm0 8h2v2h-2z" />
                    </svg>
                  </div>
                  <div className="stat-info">
                    <strong>SCAN</strong>
                    <span>QR Check-in</span>
                  </div>
                </div>
              </div>

              <div className="admin-actions-bar" style={{ marginBottom: '3rem' }}>
                <button className="join-btn" style={{ margin: '12px' }} onClick={() => { handleRunAutoTeaming(); logAction('Ran Auto-Teaming Algorithm'); }}>
                  RUN AUTO-TEAMING ALGORITHM
                </button>
                <button
                  className="join-btn"
                  style={{ background: settings.certificates_released === 'true' ? '#4caf50' : 'var(--pink-primary)', margin: '12px' }}
                  onClick={handleAllocateCertificates}
                >
                  {settings.certificates_released === 'true' ? 'CERTIFICATES ALLOCATED ✓' : 'ALLOCATE CERTIFICATES'}
                </button>
              </div>

              {/* EVENT CONFIGURATION */}
              <div className="admin-panel" id="global-config-section" style={{ marginBottom: '4rem' }}>
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
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Start / Stop Submission</span>
                        <button
                          className={`btn-small ${settings.project_submission_open === 'true' ? 'accept' : 'decline'}`}
                          onClick={() => updateSetting('project_submission_open', settings.project_submission_open === 'true' ? 'false' : 'true')}
                        >
                          {settings.project_submission_open === 'true' ? 'STOP SUBMISSIONS' : 'START SUBMISSIONS'}
                        </button>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                        <span>Start / Stop Idea Submission</span>
                        <button
                          className={`btn-small ${settings.idea_submission_open === 'true' ? 'accept' : 'decline'}`}
                          onClick={() => updateSetting('idea_submission_open', settings.idea_submission_open === 'true' ? 'false' : 'true')}
                        >
                          {settings.idea_submission_open === 'true' ? 'STOP IDEA SUBMISSION' : 'START IDEA SUBMISSION'}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="admin-card">
                    <h3>Live Announcement</h3>
                    <div style={{ marginTop: '1rem' }}>
                      <textarea
                        style={{
                          width: '100%',
                          padding: '1rem',
                          borderRadius: '8px',
                          border: '1px solid #ddd',
                          overflowY: 'hidden',
                          resize: 'vertical'
                        }}
                        value={announcementInput}
                        onChange={(e) => setAnnouncementInput(e.target.value)}
                        placeholder="Type a message for the landing page banner..."
                      />
                      <button
                        className="join-btn"
                        style={{ width: '100%', marginTop: '1rem' }}
                        onClick={() => updateSetting('event_announcement', announcementInput)}
                      >
                        UPDATE LIVE BANNER
                      </button>
                      <small style={{ display: 'block', marginTop: '0.6rem', color: 'var(--text-muted)', fontSize: '0.75rem', textAlign: 'center', lineHeight: '1.4' }}>
                        <img src="svg/emoji/announcement.svg" className="emoji-icon" alt="Broadcast" /> This will instantly update the landing page banner and trigger push notifications for all subscribed attendees.
                      </small>
                    </div>

                    {/* Announcement History Section */}
                    <div className="announcement-history-container">
                      <h4 className="announcement-history-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span><img src="svg/emoji/pending.svg" className="emoji-icon" alt="History" /> Announcement History</span>
                        {announcementHistory.length > 0 && (
                          <button
                            onClick={clearAnnouncementHistory}
                            className="btn-small decline"
                            style={{
                              padding: '0.2rem 0.5rem',
                              fontSize: '0.75rem',
                              cursor: 'pointer',
                              border: '2px solid var(--text-navy)',
                              boxShadow: '2px 2px 0px var(--text-navy)',
                              borderRadius: '8px',
                              fontFamily: "'Fredoka One', cursive"
                            }}
                          >
                            CLEAR HISTORY
                          </button>
                        )}
                      </h4>
                      {announcementHistory.length === 0 ? (
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', margin: '1rem 0' }}>
                          No past announcements recorded yet.
                        </p>
                      ) : (
                        <div className="announcement-history-list">
                          {announcementHistory.map((log) => (
                            <div key={log.id} className="announcement-history-item">
                              <div className="announcement-history-meta">
                                <span className="announcement-history-admin">
                                  <img src="svg/emoji/user.svg" className="emoji-icon" alt="Admin" /> {log.profiles?.full_name || 'Admin'}
                                </span>
                                <span>
                                  {new Date(log.created_at).toLocaleString()}
                                </span>
                              </div>
                              <div className="announcement-history-text">
                                {log.details?.value || ''}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="admin-card">
                    <h3>Submission Drive Link</h3>
                    <div style={{ marginTop: '1rem' }}>
                      <input
                        type="url"
                        style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #ddd' }}
                        value={settings.google_drive_link || ''}
                        onChange={(e) => setSettings({ ...settings, google_drive_link: e.target.value })}
                        placeholder="https://drive.google.com/..."
                      />
                      <button
                        className="join-btn"
                        style={{ width: '100%', marginTop: '1rem' }}
                        onClick={() => updateSetting('google_drive_link', settings.google_drive_link)}
                      >
                        UPDATE DRIVE LINK
                      </button>
                    </div>
                  </div>

                  <div className="admin-card" style={{ gridColumn: 'span 2' }}>
                    <h3>Special Award Winners</h3>
                    <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: '1rem' }}>
                      Enter the email addresses of the award winners. These users will be excluded from claiming participation certificates.
                    </p>
                    <div className="admin-two-col-grid" style={{ gap: '1rem' }}>
                      <div className="input-group">
                        <label style={{ color: 'var(--text-navy)', fontWeight: 'bold' }}>1st Place Winner Email</label>
                        <input
                          type="email"
                          style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                          value={settings.winner_1st_email || ''}
                          onChange={(e) => setSettings({ ...settings, winner_1st_email: e.target.value })}
                          placeholder="winner1@example.com"
                        />
                      </div>
                      <div className="input-group">
                        <label style={{ color: 'var(--text-navy)', fontWeight: 'bold' }}>2nd Place Winner Email</label>
                        <input
                          type="email"
                          style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                          value={settings.winner_2nd_email || ''}
                          onChange={(e) => setSettings({ ...settings, winner_2nd_email: e.target.value })}
                          placeholder="winner2@example.com"
                        />
                      </div>
                      <div className="input-group">
                        <label style={{ color: 'var(--text-navy)', fontWeight: 'bold' }}>3rd Place Winner Email</label>
                        <input
                          type="email"
                          style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                          value={settings.winner_3rd_email || ''}
                          onChange={(e) => setSettings({ ...settings, winner_3rd_email: e.target.value })}
                          placeholder="winner3@example.com"
                        />
                      </div>
                      <div className="input-group">
                        <label style={{ color: 'var(--text-navy)', fontWeight: 'bold' }}>Best Innovation Prize Email</label>
                        <input
                          type="email"
                          style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                          value={settings.winner_innovation_email || ''}
                          onChange={(e) => setSettings({ ...settings, winner_innovation_email: e.target.value })}
                          placeholder="innovation@example.com"
                        />
                      </div>
                    </div>
                    <button
                      className="join-btn"
                      style={{ width: '100%', marginTop: '1.5rem' }}
                      onClick={async () => {
                        try {
                          await updateSetting('winner_1st_email', settings.winner_1st_email || '');
                          await updateSetting('winner_2nd_email', settings.winner_2nd_email || '');
                          await updateSetting('winner_3rd_email', settings.winner_3rd_email || '');
                          await updateSetting('winner_innovation_email', settings.winner_innovation_email || '');
                          alert('Winner emails updated successfully!');
                        } catch (err) {
                          alert('Failed to update winner emails: ' + err.message);
                        }
                      }}
                    >
                      UPDATE WINNERS LIST
                    </button>
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

              <div className="admin-teams-section" id="active-squads-section" style={{ marginBottom: '4rem' }}>
                <h2 className="text-3d" style={{ fontSize: '2rem', marginBottom: '2rem' }}>Active Squads</h2>
                {(() => {
                  const squadsList = Object.entries(
                    allUsers.reduce((acc, user) => {
                      if (user.team_name) {
                        if (!acc[user.team_name]) acc[user.team_name] = [];
                        acc[user.team_name].push(user);
                      }
                      return acc;
                    }, {})
                  );
                  const paginatedSquads = squadsList.slice((activeSquadsPage - 1) * 3, activeSquadsPage * 3);

                  return (
                    <>
                      <div className="teams-grid" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '2rem' }}>
                        {paginatedSquads.map(([teamName, members]) => (
                          <div key={teamName} className="admin-team-card">
                            <div className="team-header">
                              <h3>{teamName}</h3>
                              <span className="member-count">{members.length} Members</span>
                            </div>
                            <div className="team-track">
                              <strong>Track:</strong> {members[0].selected_track || 'Not Selected Yet'}
                            </div>
                            <div className="team-venue-override" style={{ marginTop: '0.5rem', borderTop: '1px solid #eee', paddingTop: '0.5rem', marginBottom: '1rem' }}>
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
                                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                      {m.full_name}
                                      {m.is_team_leader && (
                                        <span className="leader-tag" style={{ background: 'var(--pink-primary)', color: '#fff', fontSize: '0.65rem', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 'bold' }}>
                                          LEADER
                                        </span>
                                      )}
                                    </span>
                                    <small>{m.email}</small>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      {renderPagination(activeSquadsPage, squadsList.length, 3, setActiveSquadsPage)}
                    </>
                  );
                })()}
              </div>

              {/* EMAIL WHITELIST MANAGEMENT */}
              <div className="admin-panel" id="whitelist-section" style={{ marginBottom: '4rem' }}>
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
                          {problemStatements.slice((problemStatementsPage - 1) * 5, problemStatementsPage * 5).map(ps => (
                            <div key={ps.id} className="approval-card" style={{ marginBottom: '1rem' }}>
                              <div className="user-meta">
                                <strong>{ps.title}</strong>
                                <small style={{ display: 'block', color: 'var(--blue-shadow)' }}>{ps.track_category}</small>
                                <p style={{ fontSize: '0.8rem', marginTop: '0.3rem' }}>{ps.description}</p>
                              </div>
                              <button className="btn-small delete" onClick={() => handleDeleteProblemStatement(ps.id)}>REMOVE</button>
                            </div>
                          ))}
                          {renderPagination(problemStatementsPage, problemStatements.length, 5, setProblemStatementsPage)}
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
              <div className="admin-panel" id="mentor-section" style={{ marginBottom: '4rem' }}>
                <h2 className="text-3d" style={{ fontSize: '2rem', marginBottom: '2rem' }}>Mentor Management</h2>
                <div className="admin-two-col-grid">
                  <div className="admin-card">
                    <h3>Active Mentors</h3>
                    <div className="admin-issues-list" style={{ marginTop: '1rem' }}>
                      {mentors.length === 0 ? (
                        <p>No mentors in the library.</p>
                      ) : (
                        <>
                          {mentors.slice((activeMentorsPage - 1) * 5, activeMentorsPage * 5).map(m => (
                            <div key={m.id} className="approval-card" style={{ marginBottom: '1rem' }}>
                              <div className="user-meta">
                                <strong>{m.full_name}</strong>
                                <small style={{ display: 'block', color: 'var(--blue-shadow)' }}>{m.role_title} @ {m.company}</small>
                              </div>
                              <button className="btn-small delete" onClick={() => handleDeleteMentor(m.id, m.full_name)}>REMOVE</button>
                            </div>
                          ))}
                          {renderPagination(activeMentorsPage, mentors.length, 5, setActiveMentorsPage)}
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
                <div className="admin-panel mentor-queue" id="system-reports-section">
                  <h2 className="text-3d" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                    System Reports
                    {systemIssues.length > 0 && (
                      <span style={{ marginLeft: '0.6rem', background: '#e53e3e', color: '#fff', borderRadius: '50px', fontSize: '0.72rem', padding: '2px 9px', fontFamily: 'sans-serif', fontWeight: 700, verticalAlign: 'middle' }}>
                        {systemIssues.length}
                      </span>
                    )}
                  </h2>
                  <div className="admin-issues-list">
                    {systemIssues.length === 0 ? (
                      <p>No active issues reported.</p>
                    ) : (
                      systemIssues.map(issue => (
                        <div key={issue.id} className="approval-card" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.75rem' }}>

                          {/* Header row: badge + timestamp */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', width: '100%' }}>
                            <span style={{
                              background: issue.report_type === 'post' ? '#fed7d7' : '#e9d8fd',
                              color: issue.report_type === 'post' ? '#c53030' : '#553c9a',
                              borderRadius: '6px', padding: '2px 10px', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em'
                            }}>
                              {issue.report_type === 'post' ? '🚩 Post Report' : '⚠️ System Issue'}
                            </span>
                            <small style={{ color: 'var(--text-muted)', marginLeft: 'auto' }}>
                              {new Date(issue.created_at).toLocaleString()}
                            </small>
                          </div>

                          {/* Reporter row */}
                          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                            {issue.profiles?.avatar_url ? (
                              <img src={issue.profiles.avatar_url} alt="" style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--text-navy)', flexShrink: 0 }} />
                            ) : (
                              <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--yellow-star)', border: '2px solid var(--text-navy)', flexShrink: 0 }} />
                            )}
                            <div>
                              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Reported by</div>
                              <strong style={{ fontSize: '0.88rem' }}>{issue.profiles?.full_name || 'Anonymous'}</strong>
                            </div>
                          </div>

                          {/* Post details card (only for post reports) */}
                          {issue.report_type === 'post' && (
                            <div style={{ background: '#fff8f0', border: '1.5px solid #f6ad55', borderRadius: '10px', padding: '0.75rem 1rem', width: '100%', boxSizing: 'border-box' }}>
                              <div style={{ fontSize: '0.75rem', color: '#744210', marginBottom: '0.35rem', fontWeight: 700 }}>
                                REPORTED POST — uploaded by {issue.reported_user_name || 'Unknown'}
                              </div>
                              {issue.caption && (
                                <p style={{ fontSize: '0.84rem', margin: '0 0 0.5rem', color: '#2d3748', fontStyle: 'italic', lineHeight: 1.4 }}>
                                  "{issue.caption.slice(0, 180)}{issue.caption.length > 180 ? '…' : ''}"
                                </p>
                              )}
                              {issue.media_url && issue.media_type !== 'video' && (
                                <img
                                  src={issue.media_url}
                                  alt="Reported post media"
                                  style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'block' }}
                                />
                              )}
                              {issue.media_url && issue.media_type === 'video' && (
                                <video
                                  src={issue.media_url}
                                  muted
                                  preload="metadata"
                                  style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'block' }}
                                />
                              )}
                              <div style={{ fontSize: '0.7rem', color: '#a0aec0', marginTop: '0.4rem' }}>
                                Post ID: <code>{issue.post_id}</code>
                              </div>
                            </div>
                          )}

                          {/* Plain description for non-post issues */}
                          {issue.report_type !== 'post' && (
                            <p style={{ fontSize: '0.88rem', margin: 0, color: '#2d3748' }}>{issue.description}</p>
                          )}

                          {/* Action buttons */}
                          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                            <button className="btn-small accept" onClick={() => handleResolveIssue(issue.id)}>
                              ✓ RESOLVE
                            </button>
                            {issue.report_type === 'post' && issue.post_id && (
                              <button
                                className="btn-small delete"
                                onClick={async () => {
                                  if (!confirm('Permanently delete this reported post?')) return;
                                  const { error } = await supabase.from('blog_posts').delete().eq('id', issue.post_id);
                                  if (!error) { handleResolveIssue(issue.id); fetchBlogPosts(true); }
                                  else alert('Failed to delete post: ' + error.message);
                                }}
                              >
                                🗑 DELETE POST
                              </button>
                            )}
                          </div>

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
                          {req.created_at && (
                            <small style={{ display: 'block', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                              {new Date(req.created_at).toLocaleString()}
                            </small>
                          )}
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
                      const pendingMentors = allUsers.filter(u => u.user_role === 'mentor' && (!u.is_approved || !mentors.some(m => m.profile_id === u.id)));
                      if (pendingMentors.length === 0) {
                        return (
                          <div className="empty-state">
                            <p>All clear! No pending mentors.</p>
                          </div>
                        );
                      }
                      return (
                        <>
                          {pendingMentors.slice((pendingMentorsPage - 1) * 5, pendingMentorsPage * 5).map(mentor => (
                            <div
                              key={mentor.id}
                              className="approval-card-wrapper"
                              style={{
                                marginBottom: '1rem',
                                border: '3px solid var(--text-navy)',
                                borderRadius: '15px',
                                overflow: 'hidden',
                                background: '#fff',
                                boxShadow: '4px 4px 0px var(--text-navy)',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                              }}
                            >
                              <div
                                className="approval-card"
                                onClick={() => setExpandedPendingMentorId(expandedPendingMentorId === mentor.id ? null : mentor.id)}
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  padding: '1rem',
                                  width: '100%',
                                  background: 'none',
                                  border: 'none',
                                  boxShadow: 'none',
                                  borderRadius: 0,
                                  margin: 0
                                }}
                              >
                                <div className="user-meta" style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', textAlign: 'left' }}>
                                  <strong style={{ color: 'var(--text-navy)', fontSize: '1.05rem' }}>{mentor.full_name}</strong>
                                  <span style={{ fontSize: '0.85rem', opacity: 0.8, color: 'var(--text-navy)' }}>{mentor.email}</span>
                                  <div className="role-tag" style={{
                                    background: 'var(--yellow-star)',
                                    color: 'var(--text-navy)',
                                    border: '1.5px solid var(--text-navy)',
                                    borderRadius: '10px',
                                    padding: '0.2rem 0.6rem',
                                    fontSize: '0.75rem',
                                    fontWeight: '900',
                                    display: 'inline-block',
                                    width: 'fit-content',
                                    marginTop: '0.3rem',
                                    fontFamily: "'Fredoka One', cursive",
                                    boxShadow: '2px 2px 0px var(--text-navy)'
                                  }}>
                                    {mentor.role_title || 'Expert'}
                                  </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                  <span style={{ fontSize: '1.2rem', transition: 'transform 0.2s', transform: expandedPendingMentorId === mentor.id ? 'rotate(90deg)' : 'none', color: 'var(--text-navy)' }}>▶</span>
                                  <button
                                    className="join-btn btn-approve"
                                    onClick={(e) => { e.stopPropagation(); handleApproveMentor(mentor.id); }}
                                    style={{
                                      padding: '0.5rem 1rem',
                                      fontSize: '0.82rem',
                                      cursor: 'pointer',
                                      boxShadow: '3px 3px 0px var(--text-navy)',
                                      borderRadius: '10px'
                                    }}
                                  >
                                    APPROVE MENTOR
                                  </button>
                                </div>
                              </div>

                              {expandedPendingMentorId === mentor.id && (
                                <div
                                  className="approval-dropdown"
                                  style={{
                                    padding: '1.2rem',
                                    borderTop: '3.5px dashed var(--text-navy)',
                                    background: '#fffdf5',
                                    display: 'flex',
                                    gap: '1.5rem',
                                    alignItems: 'start',
                                    borderBottomRightRadius: '12px',
                                    borderBottomLeftRadius: '12px',
                                    flexWrap: 'wrap'
                                  }}
                                >
                                  <div style={{
                                    width: '90px',
                                    height: '90px',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    border: '3px solid var(--pink-primary)',
                                    boxShadow: '3px 3px 0px var(--yellow-star)',
                                    background: '#fff',
                                    flexShrink: 0
                                  }}>
                                    {mentor.avatar_url ? (
                                      <img
                                        src={mentor.avatar_url}
                                        alt={mentor.full_name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'zoom-in' }}
                                        onClick={() => setFullscreenImageUrl(mentor.avatar_url)}
                                        title="Click to view full screen"
                                      />
                                    ) : (
                                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--yellow-star)', color: 'var(--text-navy)', fontSize: '2.5rem', fontWeight: 'bold' }}>
                                        {mentor.full_name?.charAt(0)?.toUpperCase()}
                                      </div>
                                    )}
                                  </div>
                                  <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                                    gap: '1rem 1.5rem',
                                    flex: 1,
                                    textAlign: 'left'
                                  }}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                      <span style={{ fontSize: '0.75rem', color: '#555', fontWeight: '900', textTransform: 'uppercase', fontFamily: "'Fredoka One', cursive" }}>Phone Contact</span>
                                      <span style={{ fontSize: '0.92rem', color: 'var(--text-navy)', fontWeight: '700' }}>{mentor.phone || '—'}</span>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                      <span style={{ fontSize: '0.75rem', color: '#555', fontWeight: '900', textTransform: 'uppercase', fontFamily: "'Fredoka One', cursive" }}>Company / Organization</span>
                                      <span style={{ fontSize: '0.92rem', color: 'var(--text-navy)', fontWeight: '700' }}>{mentor.venue || mentor.college || '—'}</span>
                                    </div>
                                    {mentor.years_of_experience && (
                                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span style={{ fontSize: '0.75rem', color: '#555', fontWeight: '900', textTransform: 'uppercase', fontFamily: "'Fredoka One', cursive" }}>Years of Experience</span>
                                        <span style={{ fontSize: '0.92rem', color: 'var(--text-navy)', fontWeight: '700' }}>{mentor.years_of_experience} years</span>
                                      </div>
                                    )}
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                      <span style={{ fontSize: '0.75rem', color: '#555', fontWeight: '900', textTransform: 'uppercase', fontFamily: "'Fredoka One', cursive" }}>GitHub Link</span>
                                      <span style={{ fontSize: '0.92rem', color: 'var(--text-navy)', fontWeight: '700' }}>
                                        {mentor.github_url ? <a href={mentor.github_url.startsWith('http') ? mentor.github_url : `https://${mentor.github_url}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue-shadow)' }}>{mentor.github_url}</a> : '—'}
                                      </span>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                      <span style={{ fontSize: '0.75rem', color: '#555', fontWeight: '900', textTransform: 'uppercase', fontFamily: "'Fredoka One', cursive" }}>LinkedIn Link</span>
                                      <span style={{ fontSize: '0.92rem', color: 'var(--text-navy)', fontWeight: '700' }}>
                                        {mentor.linkedin_url ? <a href={mentor.linkedin_url.startsWith('http') ? mentor.linkedin_url : `https://${mentor.linkedin_url}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue-shadow)' }}>{mentor.linkedin_url}</a> : '—'}
                                      </span>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                      <span style={{ fontSize: '0.75rem', color: '#555', fontWeight: '900', textTransform: 'uppercase', fontFamily: "'Fredoka One', cursive" }}>Instagram Link</span>
                                      <span style={{ fontSize: '0.92rem', color: 'var(--text-navy)', fontWeight: '700' }}>
                                        {mentor.twitter_url ? <a href={mentor.twitter_url.startsWith('http') ? mentor.twitter_url : `https://${mentor.twitter_url}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue-shadow)' }}>{mentor.twitter_url}</a> : '—'}
                                      </span>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                      <span style={{ fontSize: '0.75rem', color: '#555', fontWeight: '900', textTransform: 'uppercase', fontFamily: "'Fredoka One', cursive" }}>Website Link</span>
                                      <span style={{ fontSize: '0.92rem', color: 'var(--text-navy)', fontWeight: '700' }}>
                                        {mentor.website_url ? <a href={mentor.website_url.startsWith('http') ? mentor.website_url : `https://${mentor.website_url}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue-shadow)' }}>{mentor.website_url}</a> : '—'}
                                      </span>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gridColumn: '1 / -1' }}>
                                      <span style={{ fontSize: '0.75rem', color: '#555', fontWeight: '900', textTransform: 'uppercase', fontFamily: "'Fredoka One', cursive" }}>Skills Stack</span>
                                      <span style={{ fontSize: '0.92rem', color: 'var(--text-navy)', fontWeight: '700' }}>{Array.isArray(mentor.stack) && mentor.stack.length ? mentor.stack.join(', ') : '—'}</span>
                                    </div>
                                    {Array.isArray(mentor.languages) && mentor.languages.length > 0 && (
                                      <div style={{ display: 'flex', flexDirection: 'column', gridColumn: '1 / -1' }}>
                                        <span style={{ fontSize: '0.75rem', color: '#555', fontWeight: '900', textTransform: 'uppercase', fontFamily: "'Fredoka One', cursive" }}>Languages Spoken</span>
                                        <span style={{ fontSize: '0.92rem', color: 'var(--text-navy)', fontWeight: '700' }}>{mentor.languages.join(', ')}</span>
                                      </div>
                                    )}
                                    <div style={{ display: 'flex', flexDirection: 'column', gridColumn: '1 / -1' }}>
                                      <span style={{ fontSize: '0.75rem', color: '#555', fontWeight: '900', textTransform: 'uppercase', fontFamily: "'Fredoka One', cursive" }}>Bio / Description</span>
                                      <p style={{ fontSize: '0.92rem', color: '#333', margin: 0, fontStyle: mentor.bio ? 'normal' : 'italic', lineHeight: 1.4 }}>{mentor.bio || 'No biography written.'}</p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                          {renderPagination(pendingMentorsPage, pendingMentors.length, 5, setPendingMentorsPage)}
                        </>
                      );
                    })()}
                  </div>
                </div>

                <div className="admin-panel user-directory" id="global-user-directory-section">
                  <div className="directory-header-row">
                    <h2 className="text-3d" style={{ fontSize: '1.5rem', margin: 0 }}>Global User Directory</h2>
                    <div className="directory-controls">
                      <div className="directory-search" style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <input
                          type="text"
                          placeholder="Search by name or email..."
                          value={userSearchQuery}
                          onChange={(e) => { setUserSearchQuery(e.target.value); setUserDirectoryPage(1); }}
                          style={{
                            padding: '8px 12px 8px 36px',
                            borderRadius: '10px',
                            border: '2px solid #001f3f',
                            background: '#f5f6f8',
                            color: '#001f3f',
                            fontFamily: 'Outfit, sans-serif',
                            fontSize: '0.9rem',
                            outline: 'none',
                            width: '220px',
                            transition: 'border-color 0.2s'
                          }}
                          onFocus={(e) => e.target.style.borderColor = 'var(--pink-primary)'}
                          onBlur={(e) => e.target.style.borderColor = '#001f3f'}
                        />
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#001f3f"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{
                            position: 'absolute',
                            left: '12px',
                            pointerEvents: 'none'
                          }}
                        >
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                      </div>
                      <div className="directory-filter-tabs">
                        <button
                          className={`directory-filter-btn ${userRoleFilter === 'all' ? 'active' : ''}`}
                          onClick={() => { setUserRoleFilter('all'); setUserDirectoryPage(1); }}
                        >
                          ALL
                        </button>
                        <button
                          className={`directory-filter-btn ${userRoleFilter === 'mentor' ? 'active' : ''}`}
                          onClick={() => { setUserRoleFilter('mentor'); setUserDirectoryPage(1); }}
                        >
                          MENTORS
                        </button>
                        <button
                          className={`directory-filter-btn ${userRoleFilter === 'attendee' ? 'active' : ''}`}
                          onClick={() => { setUserRoleFilter('attendee'); setUserDirectoryPage(1); }}
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
                      if (userRoleFilter !== 'all' && u.user_role !== userRoleFilter) return false;
                      if (userSearchQuery.trim()) {
                        const q = userSearchQuery.toLowerCase().trim();
                        const nameMatch = u.full_name?.toLowerCase().includes(q);
                        const emailMatch = u.email?.toLowerCase().includes(q);
                        return nameMatch || emailMatch;
                      }
                      return true;
                    });

                    return (
                      <>
                        <div className="user-table-wrapper">
                          <table className="admin-table">
                            <thead>
                              <tr>
                                <th>User</th>
                                <th>Role</th>
                                <th>Venue</th>
                                <th>Presence</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredUsers.slice((userDirectoryPage - 1) * 5, userDirectoryPage * 5).map(u => (
                                <React.Fragment key={u.id}>
                                  <tr
                                    className={expandedUserId === u.id ? 'expanded-row' : ''}
                                    onClick={() => setExpandedUserId(expandedUserId === u.id ? null : u.id)}
                                    style={{ cursor: 'pointer' }}
                                  >
                                    <td>
                                      <div className="table-user">
                                        <strong>{u.full_name}</strong>
                                        <span>{u.email}</span>
                                      </div>
                                    </td>
                                    <td><span className="role-badge">{u.user_role}</span></td>
                                    <td>
                                      <div className="table-venue-select">
                                        <select
                                          className="admin-select-small"
                                          value={u.venue || ''}
                                          onChange={(e) => handleManualVenueChange(u.id, e.target.value)}
                                          onClick={(e) => e.stopPropagation()}
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
                                      {u.user_role === 'attendee' ? (
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                          <input
                                            type="checkbox"
                                            checked={u.is_approved || false}
                                            disabled={checkIsAfter13th()}
                                            onChange={(e) => handleToggleAttendance(u.id, e.target.checked)}
                                            onClick={(e) => e.stopPropagation()}
                                            style={{
                                              width: '20px',
                                              height: '20px',
                                              cursor: checkIsAfter13th() ? 'not-allowed' : 'pointer',
                                              accentColor: 'var(--pink-primary)',
                                              opacity: checkIsAfter13th() ? 0.5 : 1
                                            }}
                                          />
                                        </div>
                                      ) : (
                                        <div style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.4)' }}>—</div>
                                      )}
                                    </td>
                                    <td>
                                      <div className="table-actions">
                                        <button
                                          className="btn-table-action delete"
                                          title="Delete user"
                                          onClick={(e) => { e.stopPropagation(); handleDeleteUser(u.id, u.full_name); }}
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
                                                  <img
                                                    src={u.avatar_url}
                                                    alt={u.full_name}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'zoom-in' }}
                                                    onClick={() => setFullscreenImageUrl(u.avatar_url)}
                                                    title="Click to view full screen"
                                                  />
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
                                                <span className="detail-value">
                                                  {u.phone
                                                    ? <a href={`tel:${u.phone}`} style={{ color: 'var(--pink-primary)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}><img src="/svg/emoji/phone.svg" alt="phone" style={{ width: '16px', height: '16px' }} /> {u.phone}</a>
                                                    : <span style={{ color: '#a0aec0', fontStyle: 'italic' }}>Not provided</span>
                                                  }
                                                </span>
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
                                                <span className="detail-label">{u.user_role === 'attendee' ? 'Attendance' : 'Approval Status'}</span>
                                                <span className="detail-value" style={{ color: u.is_approved ? '#2e7d32' : '#c62828', fontWeight: 700 }}>
                                                  {u.user_role === 'attendee'
                                                    ? (u.is_approved ? '✓ Present' : <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}><img src="/svg/emoji/pending.svg" alt="absent" style={{ width: '16px', height: '16px' }} /> Absent</span>)
                                                    : (u.is_approved ? '✓ Verified' : <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}><img src="/svg/emoji/pending.svg" alt="pending" style={{ width: '16px', height: '16px' }} /> Pending</span>)
                                                  }
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

                                          {/* ── Magic Login Link ── */}
                                          <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', background: 'rgba(255,0,127,0.06)', borderRadius: '10px', border: '1.5px dashed var(--pink-primary)' }}>
                                            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--pink-primary)', marginBottom: '0.5rem' }}>🔗 PARTICIPANT LOGIN BYPASS</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>Generate a one-time magic link for this user (expires in 1 hour). Share it via WhatsApp or show them on screen. No email needed.</div>
                                            {magicLinkState[u.id]?.link ? (
                                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.5rem 0.75rem', fontSize: '0.7rem', wordBreak: 'break-all', color: '#2d3748', fontFamily: 'monospace', maxHeight: '60px', overflowY: 'auto' }}>
                                                  {magicLinkState[u.id].link}
                                                </div>
                                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                                  <button
                                                    className="btn-small accept"
                                                    onClick={() => { navigator.clipboard.writeText(magicLinkState[u.id].link); }}
                                                  >📋 Copy Link</button>
                                                  {(() => {
                                                    const msg = `Hi ${u.full_name}! Here is your one-time Starlet login link (valid 1 hour):\n${magicLinkState[u.id].link}`;
                                                    let cleanPhone = u.phone ? u.phone.replace(/\D/g, '') : '';
                                                    if (cleanPhone && cleanPhone.length === 10) {
                                                      cleanPhone = '91' + cleanPhone;
                                                    }
                                                    const waHref = cleanPhone
                                                      ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`
                                                      : `https://wa.me/?text=${encodeURIComponent(msg)}`;
                                                    return (
                                                      <a
                                                        href={waHref}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{ textDecoration: 'none' }}
                                                      >
                                                        <button className="btn-small accept" style={{ background: '#25D366', borderColor: '#25D366' }}>💬 Send WhatsApp</button>
                                                      </a>
                                                    );
                                                  })()}
                                                  <button
                                                    className="btn-small delete"
                                                    onClick={() => setMagicLinkState(prev => ({ ...prev, [u.id]: null }))}
                                                  >Clear</button>
                                                </div>
                                                <div style={{ fontSize: '0.68rem', color: '#e53e3e', fontStyle: 'italic' }}>⚠️ Single-use — once opened it expires. Generate a new one if needed.</div>
                                              </div>
                                            ) : (
                                              <button
                                                className="btn-small accept"
                                                disabled={magicLinkState[u.id] === 'loading'}
                                                onClick={(e) => { e.stopPropagation(); handleGenerateMagicLink(u); }}
                                                style={{ fontSize: '0.8rem' }}
                                              >
                                                {magicLinkState[u.id] === 'loading' ? '⏳ Generating…' : '🔗 Generate Login Link'}
                                              </button>
                                            )}
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

                        {renderPagination(userDirectoryPage, filteredUsers.length, 5, setUserDirectoryPage)}
                      </>
                    );
                  })()}
                </div>

                {/* VOLUNTEER CONTROL SECTION */}
                <div className="admin-panel user-directory" id="volunteer-control-section" style={{ marginBottom: '4rem' }}>
                  <div className="directory-header-row">
                    <h2 className="text-3d" style={{ fontSize: '1.5rem', margin: 0 }}>Volunteer Control</h2>
                    <div className="directory-controls">
                      <div className="directory-search" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <input
                          type="text"
                          placeholder="Search volunteers..."
                          value={volunteerSearchQuery}
                          onChange={(e) => { setVolunteerSearchQuery(e.target.value); setVolunteerPage(1); }}
                          style={{
                            padding: '8px 12px 8px 36px',
                            borderRadius: '10px',
                            border: '2px solid #001f3f',
                            background: '#f5f6f8',
                            color: '#001f3f',
                            fontFamily: 'Outfit, sans-serif',
                            fontSize: '0.9rem',
                            outline: 'none',
                            width: '250px'
                          }}
                        />
                        <svg style={{ position: 'absolute', left: '12px', color: '#64748b' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {(() => {
                    const volunteerUsers = allUsers.filter(u => u.user_role === 'volunteer');
                    const filtered = volunteerUsers.filter(u => {
                      if (!volunteerSearchQuery.trim()) return true;
                      const q = volunteerSearchQuery.toLowerCase().trim();
                      return u.full_name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q);
                    });

                    const itemsPerPage = 5;
                    const paginated = filtered.slice((volunteerPage - 1) * itemsPerPage, volunteerPage * itemsPerPage);

                    if (filtered.length === 0) {
                      return (
                        <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b', fontStyle: 'italic' }}>
                          No volunteers found matching your criteria.
                        </div>
                      );
                    }

                    return (
                      <>
                        <div className="volunteer-card-list">
                          {paginated.map(u => {
                            const isExpanded = expandedVolunteerId === u.id;
                            return (
                              <div key={u.id} className={`volunteer-card ${isExpanded ? 'expanded' : ''}`} onClick={() => setExpandedVolunteerId(isExpanded ? null : u.id)}>
                                <div className="volunteer-card-header">
                                  <strong className="volunteer-name">{u.full_name}</strong>
                                  <button
                                    className="btn-table-action delete volunteer-delete-btn"
                                    title="Remove Volunteer"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteUser(u.id, u.full_name);
                                    }}
                                  >
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <polyline points="3 6 5 6 21 6"></polyline>
                                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    </svg>
                                  </button>
                                </div>
                                {isExpanded && (
                                  <div className="volunteer-card-details">
                                    <div className="volunteer-avatar-wrapper">
                                      <img src={u.avatar_url || u.avatarUrl || 'icons/user-profile.svg'} alt={u.full_name} className="volunteer-avatar" style={{ objectFit: (u.avatar_url || u.avatarUrl) ? 'cover' : 'contain' }} />
                                    </div>
                                    <div className="volunteer-info">
                                      <div className="info-item">
                                        <label>College:</label>
                                        <span>{u.college || u.venue || 'N/A'}</span>
                                      </div>
                                      <div className="info-item">
                                        <label>Phone:</label>
                                        <span>{u.phone || 'N/A'}</span>
                                      </div>
                                      <div className="info-item">
                                        <label>Email:</label>
                                        <span>{u.email || 'N/A'}</span>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        {renderPagination(volunteerPage, filtered.length, 5, setVolunteerPage)}
                      </>
                    );
                  })()}
                </div>

                {/* PROJECT SUBMISSIONS OVERVIEW */}
                <div className="admin-panel" id="project-submissions-section" style={{ marginBottom: '4rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <h2 className="text-3d" style={{ fontSize: '2rem', margin: 0 }}>Project Submissions</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                      <div className="directory-filter-tabs" style={{ margin: 0 }}>
                        <button
                          className={`directory-filter-btn ${submissionStatusFilter === 'all' ? 'active' : ''}`}
                          onClick={() => { setSubmissionStatusFilter('all'); setProjectSubmissionsPage(1); }}
                        >
                          ALL STATUS
                        </button>
                        <button
                          className={`directory-filter-btn ${submissionStatusFilter === 'submitted' ? 'active' : ''}`}
                          onClick={() => { setSubmissionStatusFilter('submitted'); setProjectSubmissionsPage(1); }}
                        >
                          SUBMITTED
                        </button>
                        <button
                          className={`directory-filter-btn ${submissionStatusFilter === 'pending' ? 'active' : ''}`}
                          onClick={() => { setSubmissionStatusFilter('pending'); setProjectSubmissionsPage(1); }}
                        >
                          PENDING
                        </button>
                      </div>
                      <button className="directory-download-btn" onClick={handleDownloadSubmissionsCSV} style={{ margin: 0, padding: '0.6rem 1.2rem' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        DOWNLOAD CSV
                      </button>
                      <div className="admin-stats-strip" style={{ margin: 0, padding: '0.5rem 1rem', background: 'transparent' }}>
                        <div className="admin-stat-card" style={{ padding: '0.5rem 1rem', minWidth: 'auto' }}>
                          <strong>{projectSubmissions.length}</strong>
                          <span style={{ fontSize: '0.7rem' }}>Submitted</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="user-table-wrapper submission-table-wrapper">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Team / Project</th>
                          <th>Links</th>
                          <th>Status</th>
                          <th>Audit Status</th>
                          <th>Submitted At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(() => {
                          const rawTeamsList = Array.from(new Set(
                            allUsers
                              .filter(u => u.user_role === 'attendee' && u.team_name && !u.team_name.startsWith('Individual-'))
                              .map(u => u.team_name)
                          ));
                          const teamsList = rawTeamsList.filter(team => {
                            const sub = projectSubmissions.find(s => s.team_name === team);
                            if (submissionStatusFilter === 'submitted' && !sub) {
                              return false;
                            }
                            if (submissionStatusFilter === 'pending' && sub) {
                              return false;
                            }
                            return true;
                          });
                          return teamsList.slice((projectSubmissionsPage - 1) * 5, projectSubmissionsPage * 5).map(team => {
                            const sub = projectSubmissions.find(s => s.team_name === team);
                            const isExpanded = expandedTeam === team;
                            const aiScore = sub && sub.ai_percentage !== null && sub.ai_percentage !== undefined ? Number(sub.ai_percentage) : null;
                            const isAiApproved = Number.isFinite(aiScore) && aiScore < 40;
                            const isAiFlagged = Number.isFinite(aiScore) && aiScore >= 40;
                            const isScanning = sub?.git_audit_status === 'scanning';
                            const auditBadgeClass = sub ? (isScanning ? 'pending' : isAiApproved ? 'accept' : isAiFlagged ? 'decline' : sub.git_audit_status === 'passed' ? 'accept' : 'decline') : '';
                            const auditBadgeStyle = isScanning ? { background: '#2b6cb0', color: '#fff' } : isAiApproved ? { background: '#dcfce7', color: '#166534' } : isAiFlagged ? { background: '#fee2e2', color: '#991b1b' } : undefined;
                            const auditStatusText = sub ? (isScanning ? 'SCANNING' : isAiApproved ? 'APPROVED' : isAiFlagged ? 'FLAGGED' : sub.git_audit_status === 'passed' ? 'PASSED' : 'PENDING') : '-';
                            const detailStatusColor = isScanning ? '#2b6cb0' : isAiApproved ? '#166534' : isAiFlagged ? '#c53030' : sub?.git_audit_status === 'passed' ? '#276749' : '#000000';
                            return (
                              <React.Fragment key={team}>
                                <tr
                                  onClick={() => sub && setExpandedTeam(isExpanded ? null : team)}
                                  style={{ cursor: sub ? 'pointer' : 'default' }}
                                >
                                  <td>
                                    <strong style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                      {sub && (isExpanded ? '▼' : '▶')} {getDisplayTeamName(team)}
                                    </strong>
                                    {sub && (
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem', flexWrap: 'wrap' }}>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--blue-shadow)', minWidth: 0, maxWidth: '100%', overflowWrap: 'anywhere' }}>{sub.project_name}</span>
                                        {sub.ai_percentage !== null && sub.ai_percentage !== undefined && (
                                          <span style={{
                                            fontSize: '0.72rem',
                                            fontWeight: 'bold',
                                            padding: '2px 6px',
                                            borderRadius: '4px',
                                            background: '#fff',
                                            color: '#000',
                                            border: '1px solid rgba(0, 0, 0, 0.15)',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.3rem',
                                            whiteSpace: 'nowrap'
                                          }}>
                                            <img src="/svg/emoji/robot.svg" alt="" style={{ width: '13px', height: '13px' }} />
                                            {sub.ai_percentage}% AI
                                          </span>
                                        )}
                                      </div>
                                    )}
                                  </td>
                                  <td>
                                    {sub ? (
                                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <a href={sub.github_url} target="_blank" rel="noreferrer" className="btn-small accept" onClick={(e) => e.stopPropagation()}>CODE</a>
                                        {sub.ppt_link && (
                                          <a href={sub.ppt_link} target="_blank" rel="noreferrer" className="btn-small accept" onClick={(e) => e.stopPropagation()}>DRIVE FOLDER</a>
                                        )}
                                        {sub.demo_url && (
                                          <a href={sub.demo_url} target="_blank" rel="noreferrer" className="btn-small accept" style={{ background: 'var(--yellow-star)' }} onClick={(e) => e.stopPropagation()}>LIVE DEMO</a>
                                        )}
                                      </div>
                                    ) : '-'}
                                  </td>
                                  <td>
                                    <span className={`role-badge ${sub ? 'accept' : 'decline'}`}>
                                      {sub ? 'SUBMITTED' : 'PENDING'}
                                    </span>
                                  </td>
                                  <td>
                                    {sub ? (
                                      <span className={`role-badge ${auditBadgeClass}`} style={auditBadgeStyle}>
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                                          <img
                                            src={isScanning ? '/svg/emoji/pending.svg' : isAiFlagged ? '/svg/emoji/warning.svg' : sub.git_audit_status === 'passed' ? '/svg/emoji/check.svg' : '/svg/emoji/pending.svg'}
                                            alt=""
                                            style={{ width: '14px', height: '14px' }}
                                          />
                                          <span>{auditStatusText}</span>
                                        </span>
                                      </span>
                                    ) : '-'}
                                  </td>
                                  <td>{sub ? new Date(sub.submitted_at).toLocaleString() : '-'}</td>
                                </tr>
                                {isExpanded && sub && (
                                  <tr className="submission-details-row">
                                    <td colSpan="5" style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1.5rem', borderLeft: '4px solid var(--pink-primary)' }}>
                                      <div style={{ color: '#000000' }}>
                                        <h4 style={{ color: 'var(--yellow-star)', fontFamily: "'Fredoka One', cursive", marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                          <img src="/svg/emoji/rocket.svg" alt="" style={{ width: '18px', height: '18px' }} /> {sub.project_name} Details
                                        </h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                          <p style={{ margin: 0, fontSize: '0.9rem' }}>
                                            <strong>Team/Group Name:</strong> {getDisplayTeamName(sub.team_name)}
                                          </p>
                                          <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.5' }}>
                                            <strong>Description:</strong> {sub.description}
                                          </p>
                                          <p style={{ margin: 0, fontSize: '0.9rem' }}>
                                            <strong>Tech Stack Used:</strong> <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.15)' }}>{sub.tech_stack || 'Not specified'}</span>
                                          </p>
                                          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                                            <a href={sub.github_url} target="_blank" rel="noreferrer" className="btn-small accept" style={{ padding: '0.4rem 0.8rem' }}>GitHub Code</a>
                                            {sub.ppt_link && (
                                              <a href={sub.ppt_link} target="_blank" rel="noreferrer" className="btn-small accept" style={{ padding: '0.4rem 0.8rem' }}>Google Drive Folder</a>
                                            )}
                                            {sub.demo_url && (
                                              <a href={sub.demo_url} target="_blank" rel="noreferrer" className="btn-small accept" style={{ padding: '0.4rem 0.8rem', background: 'var(--yellow-star)' }}>Live Project Website</a>
                                            )}
                                          </div>

                                          {/* Automated Git & AI Audit Report details */}
                                          <div style={{ marginTop: '1rem', padding: '1rem', background: '#ffffff', borderRadius: '10px', border: '2px solid rgba(0,31,63,0.15)' }}>
                                            <h5 style={{ color: '#000000', margin: '0 0 0.75rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', fontWeight: 'bold' }}>
                                              <img src="/svg/emoji/report.svg" alt="" style={{ width: '16px', height: '16px' }} /> Automated Git &amp; AI Audit Report
                                            </h5>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '0.8rem' }}>
                                              <div>
                                                <span style={{ fontSize: '0.72rem', color: '#000000', fontWeight: '600', display: 'block', marginBottom: '0.15rem' }}>AUDIT STATUS</span>
                                                <strong style={{
                                                  fontSize: '0.9rem',
                                                  color: detailStatusColor
                                                }}>
                                                  {auditStatusText}
                                                </strong>
                                              </div>
                                              <div>
                                                <span style={{ fontSize: '0.72rem', color: '#000000', fontWeight: '600', display: 'block', marginBottom: '0.15rem' }}>COMMIT COUNT</span>
                                                <strong style={{ fontSize: '0.9rem', color: '#000000' }}>{sub.commit_count !== null && sub.commit_count !== undefined ? `${sub.commit_count} commits` : '—'}</strong>
                                              </div>
                                              <div>
                                                <span style={{ fontSize: '0.72rem', color: '#000000', fontWeight: '600', display: 'block', marginBottom: '0.15rem' }}>AI CODE CONFIDENCE</span>
                                                <strong style={{ fontSize: '0.9rem', color: '#000000' }}>
                                                  {sub.ai_percentage !== null && sub.ai_percentage !== undefined
                                                    ? `${sub.ai_percentage}% AI`
                                                    : sub.git_audit_status === 'scanning'
                                                      ? 'Scanning...'
                                                      : sub.git_audit_status
                                                        ? '0% AI'
                                                        : '—'}
                                                </strong>
                                              </div>
                                            </div>
                                            {sub.audit_anomalies && sub.audit_anomalies.length > 0 && (
                                              <div style={{ marginBottom: '0.8rem' }}>
                                                <span style={{ fontSize: '0.72rem', color: '#000000', fontWeight: '600', display: 'block', marginBottom: '0.2rem' }}>FLAGGED ANOMALIES</span>
                                                <ul style={{ margin: '0.2rem 0 0 0', paddingLeft: '1.2rem', color: '#000000', fontSize: '0.82rem', lineHeight: '1.4' }}>
                                                  {sub.audit_anomalies.map((anom, aIdx) => (
                                                    <li key={aIdx}>{anom}</li>
                                                  ))}
                                                </ul>
                                              </div>
                                            )}
                                            <button
                                              className="btn-small accept"
                                              disabled={sub.git_audit_status === 'scanning'}
                                              onClick={(e) => { e.stopPropagation(); handleReRunAudit(sub); }}
                                              style={{ marginTop: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                                            >
                                              {sub.git_audit_status === 'scanning' ? (
                                                <><img src="/svg/emoji/pending.svg" alt="" style={{ width: '14px', height: '14px' }} /> Scanning Repo...</>
                                              ) : (
                                                <><img src="/svg/emoji/refresh.svg" alt="" style={{ width: '14px', height: '14px' }} /> Re-run Repo Audit</>
                                              )}
                                            </button>
                                          </div>

                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </React.Fragment>
                            );
                          });
                        })()}
                      </tbody>
                    </table>
                  </div>

                  {(() => {
                    const rawTeamsList = Array.from(new Set(
                      allUsers
                        .filter(u => u.user_role === 'attendee' && u.team_name && !u.team_name.startsWith('Individual-'))
                        .map(u => u.team_name)
                    ));
                    const teamsList = rawTeamsList.filter(team => {
                      const sub = projectSubmissions.find(s => s.team_name === team);
                      if (submissionStatusFilter === 'submitted' && !sub) {
                        return false;
                      }
                      if (submissionStatusFilter === 'pending' && sub) {
                        return false;
                      }
                      return true;
                    });
                    return renderPagination(projectSubmissionsPage, teamsList.length, 5, setProjectSubmissionsPage);
                  })()}
                </div>

                {/* IDEA SUBMISSIONS OVERVIEW */}
                <div className="admin-panel" id="idea-submissions-section" style={{ marginBottom: '4rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <h2 className="text-3d" style={{ fontSize: '2rem', margin: 0 }}>Idea Submissions</h2>
                  </div>

                  <div className="table-responsive">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>TEAM / INDIVIDUAL</th>
                          <th>IDEA TITLE</th>
                          <th>DESCRIPTION</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ideaSubmissions.length === 0 ? (
                          <tr><td colSpan="3" style={{ textAlign: 'center', padding: '2rem' }}>No ideas submitted yet.</td></tr>
                        ) : (
                          ideaSubmissions.map((sub, idx) => (
                            <tr key={sub.id || idx}>
                              <td><strong>{sub.team_name}</strong></td>
                              <td>{sub.idea_title}</td>
                              <td style={{ whiteSpace: 'pre-wrap', minWidth: '300px' }}>{sub.description}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

          ) : (user.role === 'mentor' || (user.role === 'admin' && adminActiveTab === 'mentor')) ? (
            /* MENTOR PROFILE VIEW */
            <>
              <div className="profile-sidebar">
                <div className="profile-header-top-row">
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
                  <div className="profile-header-details">
                    <h2 className="text-3d">{user.name}</h2>
                    <div className="profile-badges-row">
                      <div className={`status-badge ${user.isApproved ? 'approved' : 'pending'}`}>
                        {user.isApproved ? 'VERIFIED MENTOR' : 'AWAITING APPROVAL'}
                      </div>
                      <div className="vlogs-count-badge">
                        📷 {userProfilePosts.length} {userProfilePosts.length === 1 ? 'Post' : 'Posts'}
                      </div>
                    </div>
                  </div>
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
                    className="join-btn desktop-only-btn"
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
                          <img src="icons/instagram.svg" alt="Instagram" style={{ width: '20px', height: '20px' }} />
                          <input
                            type="text"
                            placeholder="Instagram URL"
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
                    {/* MY VLOGS / POSTS / SAVED GRID */}
                    <div className="profile-card" style={{ marginTop: '2rem', padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '20px' }}>
                      <div className="profile-tabs-header" style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', borderBottom: '3px solid var(--text-navy)', paddingBottom: '0.5rem' }}>
                        <h3
                          className={`profile-tab-title ${profileTab === 'posts' ? 'active' : ''}`}
                          onClick={() => setProfileTab('posts')}
                          style={{ fontSize: '1.3rem', fontWeight: 'bold', margin: 0, cursor: 'pointer', opacity: profileTab === 'posts' ? 1 : 0.4 }}
                        >
                          MY POSTS
                        </h3>
                        <h3
                          className={`profile-tab-title ${profileTab === 'saved' ? 'active' : ''}`}
                          onClick={() => setProfileTab('saved')}
                          style={{ fontSize: '1.3rem', fontWeight: 'bold', margin: 0, cursor: 'pointer', opacity: profileTab === 'saved' ? 1 : 0.4 }}
                        >
                          SAVED POSTS
                        </h3>
                      </div>

                      {profileTab === 'posts' ? (
                        userProfilePosts.length === 0 ? (
                          <p style={{ opacity: 0.5, fontStyle: 'italic' }}>No posts uploaded yet. Head over to the Blog Feed to upload your first vlog!</p>
                        ) : (
                          <div className="profile-vlogs-grid">
                            {userProfilePosts.map(post => (
                              <div key={post.id} className="profile-vlog-item" onClick={() => setActiveViewPost(post)}>
                                {renderProfileGridMedia(post)}
                              </div>
                            ))}
                          </div>
                        )
                      ) : (
                        userSavedPosts.length === 0 ? (
                          <p style={{ opacity: 0.5, fontStyle: 'italic' }}>No saved posts yet. Explore the feed and save vlogs to view them here!</p>
                        ) : (
                          <div className="profile-vlogs-grid">
                            {userSavedPosts.map(post => (
                              <div key={post.id} className="profile-vlog-item" onClick={() => setActiveViewPost(post)}>
                                {renderProfileGridMedia(post)}
                              </div>
                            ))}
                          </div>
                        )
                      )}
                    </div>
                    {/* Mobile-only Save Changes Button */}
                    <button
                      className="join-btn mobile-only-btn"
                      onClick={updateProfile}
                      disabled={!hasProfileChanged}
                      style={{ opacity: hasProfileChanged ? 1 : 0.45, cursor: hasProfileChanged ? 'pointer' : 'not-allowed', transition: 'opacity 0.2s', width: '100%' }}
                    >
                      SAVE CHANGES
                    </button>
                  </div>
                </div>
              </div>
            </>

          ) : user.role === 'volunteer' ? (
            /* VOLUNTEER PROFILE VIEW */
            <>
              <div className="profile-sidebar">
                <div className="profile-avatar" style={{ position: 'relative' }}>
                  <img
                    src={user.avatarUrl || 'icons/user-profile.svg'}
                    alt="avatar"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </div>
                <h2 className="text-3d" style={{ marginTop: '1rem', fontSize: '1.8rem', textAlign: 'center' }}>
                  {user.name}
                </h2>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--accent-gold)', fontWeight: 600 }}>
                  Starlet Volunteer
                </div>
                <div className="profile-stats">
                  <div className="stat-box">
                    <span className="stat-label">Affiliation</span>
                    <span className="stat-value" style={{ fontSize: '1rem' }}>{user.college || 'N/A'}</span>
                  </div>
                </div>

              </div>

              <div className="profile-content">
                <div className="admin-panel user-directory">
                  <div className="directory-header-row">
                    <h2 className="text-3d" style={{ fontSize: 'clamp(1.5rem, 6vw, 2.2rem)', margin: 0, textTransform: 'uppercase' }}>Mark Attendance</h2>
                    <div className="directory-controls">
                      {/* QR SCANNER BUTTON */}
                      {/* <button
                        id="volunteer-qr-scan-btn"
                        onClick={() => setIsScannerOpen(true)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '9px 18px',
                          borderRadius: '12px',
                          border: '2.5px solid #25D366',
                          background: 'rgba(37, 211, 102, 0.12)',
                          color: '#1a7a40',
                          fontFamily: 'Outfit, sans-serif',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          cursor: checkIsAfter13th() ? 'not-allowed' : 'pointer',
                          opacity: checkIsAfter13th() ? 0.5 : 1,
                          transition: 'all 0.2s ease',
                          whiteSpace: 'nowrap',
                          boxShadow: '0 2px 8px rgba(37,211,102,0.2)',
                        }}
                        title={checkIsAfter13th() ? 'Attendance closed' : 'Scan attendee QR code'}
                        disabled={checkIsAfter13th()}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="7" height="7" rx="1" />
                          <rect x="14" y="3" width="7" height="7" rx="1" />
                          <rect x="3" y="14" width="7" height="7" rx="1" />
                          <rect x="14" y="14" width="3" height="3" />
                          <rect x="18" y="14" width="3" height="3" />
                          <rect x="14" y="18" width="3" height="3" />
                          <rect x="18" y="18" width="3" height="3" />
                        </svg>
                        Scan QR
                      </button> */}
                      <div className="directory-search" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <input
                          type="text"
                          placeholder="Search attendees..."
                          value={volunteerSearchQuery}
                          onChange={(e) => { setVolunteerSearchQuery(e.target.value); setVolunteerPage(1); }}
                          style={{
                            padding: '8px 12px 8px 36px',
                            borderRadius: '10px',
                            border: '2px solid #001f3f',
                            background: '#f5f6f8',
                            color: '#001f3f',
                            fontFamily: 'Outfit, sans-serif',
                            fontSize: '0.9rem',
                            outline: 'none',
                            width: '250px'
                          }}
                        />
                        <svg style={{ position: 'absolute', left: '12px', color: '#64748b' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="user-table-wrapper">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>User Info</th>
                          <th style={{ textAlign: 'center' }}>Presence</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(() => {
                          const attendees = allUsers.filter(u => u.user_role === 'attendee');
                          const filtered = attendees.filter(u => {
                            if (!volunteerSearchQuery.trim()) return true;
                            const q = volunteerSearchQuery.toLowerCase();
                            return u.full_name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q);
                          });
                          const itemsPerPage = 10;
                          const paginated = filtered.slice((volunteerPage - 1) * itemsPerPage, volunteerPage * itemsPerPage);

                          if (paginated.length === 0) {
                            return <tr><td colSpan="3" style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>No attendees found.</td></tr>;
                          }

                          return paginated.map(u => (
                            <tr key={u.id} className="table-row-hover">
                              <td>
                                <div className="table-user">
                                  <strong>{u.full_name}</strong>
                                  <span>{u.email}</span>
                                </div>
                              </td>
                              <td>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <input
                                    type="checkbox"
                                    checked={u.is_approved || false}
                                    disabled={checkIsAfter13th()}
                                    onChange={(e) => handleToggleAttendance(u.id, e.target.checked)}
                                    style={{
                                      width: '20px',
                                      height: '20px',
                                      cursor: checkIsAfter13th() ? 'not-allowed' : 'pointer',
                                      accentColor: 'var(--pink-primary)',
                                      opacity: checkIsAfter13th() ? 0.5 : 1
                                    }}
                                  />
                                </div>
                              </td>
                            </tr>
                          ));
                        })()}
                      </tbody>
                    </table>
                  </div>
                  {(() => {
                    const attendees = allUsers.filter(u => u.user_role === 'attendee');
                    const filtered = attendees.filter(u => {
                      if (!volunteerSearchQuery.trim()) return true;
                      const q = volunteerSearchQuery.toLowerCase();
                      return u.full_name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q);
                    });
                    return renderPagination(volunteerPage, filtered.length, 10, setVolunteerPage);
                  })()}
                </div>

                {/* MY VLOGS / POSTS / SAVED GRID */}
                <div className="admin-panel" style={{ marginTop: '2rem', padding: '2rem', borderRadius: '20px' }}>
                  <div className="profile-tabs-header" style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', borderBottom: '3px solid var(--text-navy)', paddingBottom: '0.5rem' }}>
                    <h3
                      className={`profile-tab-title ${profileTab === 'posts' ? 'active' : ''}`}
                      onClick={() => setProfileTab('posts')}
                      style={{ fontSize: '1.3rem', fontWeight: 'bold', margin: 0, cursor: 'pointer', opacity: profileTab === 'posts' ? 1 : 0.4 }}
                    >
                      MY POSTS
                    </h3>
                    <h3
                      className={`profile-tab-title ${profileTab === 'saved' ? 'active' : ''}`}
                      onClick={() => setProfileTab('saved')}
                      style={{ fontSize: '1.3rem', fontWeight: 'bold', margin: 0, cursor: 'pointer', opacity: profileTab === 'saved' ? 1 : 0.4 }}
                    >
                      SAVED POSTS
                    </h3>
                  </div>

                  {profileTab === 'posts' ? (
                    userProfilePosts.length === 0 ? (
                      <p style={{ opacity: 0.5, fontStyle: 'italic' }}>No posts uploaded yet. Head over to the Blog Feed to upload your first vlog!</p>
                    ) : (
                      <div className="profile-vlogs-grid">
                        {userProfilePosts.map(post => (
                          <div key={post.id} className="profile-vlog-item" onClick={() => setActiveViewPost(post)}>
                            {renderProfileGridMedia(post)}
                          </div>
                        ))}
                      </div>
                    )
                  ) : (
                    userSavedPosts.length === 0 ? (
                      <p style={{ opacity: 0.5, fontStyle: 'italic' }}>No saved posts yet. Explore the feed and save vlogs to view them here!</p>
                    ) : (
                      <div className="profile-vlogs-grid">
                        {userSavedPosts.map(post => (
                          <div key={post.id} className="profile-vlog-item" onClick={() => setActiveViewPost(post)}>
                            {renderProfileGridMedia(post)}
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </div>
              </div>
            </>

          ) : (
            /* EXISTING ATTENDEE PROFILE VIEW */
            <>
              <div className="profile-sidebar">
                <div className="profile-header-top-row">
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
                  <div className="profile-header-details">
                    <h2 className="text-3d">{user.name}</h2>
                    <div className="profile-badges-row">
                      <div className={`status-badge ${user.isApproved ? 'approved' : 'pending'}`}>
                        {user.isApproved ? '✅ CHECKED IN' : '⏳ NOT CHECKED IN'}
                      </div>
                      {user.isTeamLeader && (
                        <div className="status-badge approved" style={{ background: 'var(--pink-primary)', color: '#fff', border: 'none' }}>
                          TEAM LEADER
                        </div>
                      )}
                      <div className="vlogs-count-badge">
                        📷 {userProfilePosts.length} {userProfilePosts.length === 1 ? 'Post' : 'Posts'}
                      </div>
                    </div>
                  </div>
                </div>
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
                    className="join-btn desktop-only-btn"
                    onClick={updateProfile}
                    disabled={!hasProfileChanged}
                    style={{ opacity: hasProfileChanged ? 1 : 0.45, cursor: hasProfileChanged ? 'pointer' : 'not-allowed', transition: 'opacity 0.2s' }}
                  >
                    SAVE CHANGES
                  </button>
                </div>

                {/* PWA Broadcast Alerts Card */}
                {typeof window !== 'undefined' && 'Notification' in window && (
                  <div className="pwa-alerts-card" style={{ marginTop: '1.5rem', padding: '1.2rem', background: 'rgba(0, 31, 63, 0.04)', border: '2px solid var(--text-navy)', borderRadius: '15px', textDecoration: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
                      <img src="svg/emoji/announcement.svg" className="emoji-icon" alt="Alerts" style={{ width: '20px', height: '20px', margin: 0 }} />
                      <strong style={{ color: 'var(--text-navy)', fontSize: '0.95rem' }}>Live Event Broadcasts</strong>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 1rem 0', lineHeight: '1.4', textAlign: 'left' }}>
                      Enable push notifications to receive instant updates on hacking deadlines, food releases, and track announcements.
                    </p>
                    {Notification.permission === 'granted' ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#25D366', fontWeight: 'bold', fontSize: '0.85rem' }}>
                        <img src="svg/emoji/check.svg" className="emoji-icon" alt="Active" style={{ width: '16px', height: '16px', margin: 0 }} />
                        Real-time Alerts Active
                      </div>
                    ) : (
                      <button
                        className="btn-small accept"
                        style={{ width: '100%', padding: '0.6rem', fontSize: '0.85rem' }}
                        onClick={async () => {
                          const permission = await Notification.requestPermission();
                          if (permission === 'granted') {
                            setA11ySettings(prev => ({ ...prev, systemNotifications: true }));
                            showSystemNotification(
                              'Notifications Enabled!',
                              'You will now receive real-time updates and alerts for Starlet 5.0.',
                              'starlet-welcome'
                            );
                          } else {
                            alert('Please enable notification permissions in your browser settings to receive live updates.');
                          }
                        }}
                      >
                        ENABLE LIVE ALERTS
                      </button>
                    )}
                  </div>
                )}

                {/* STARLET 5.0 PASS CARD */}
                {user.id && (
                  <div className="hacker-pass-card" style={{ marginTop: '1.5rem', padding: '1.5rem', background: 'var(--bg-cream)', border: `4px solid ${user.isApproved ? '#25D366' : 'var(--text-navy)'}`, borderRadius: '24px', boxShadow: `5px 5px 0px ${user.isApproved ? '#25D366' : 'var(--text-navy)'}`, textAlign: 'center', position: 'relative', overflow: 'hidden', transition: 'border-color 0.5s, box-shadow 0.5s' }}>
                    {user.isApproved && (
                      <div className="checkin-verified-ribbon" style={{ position: 'absolute', top: '14px', right: '-35px', background: '#25D366', color: '#fff', fontSize: '0.65rem', fontWeight: 800, padding: '4px 40px', transform: 'rotate(45deg)', letterSpacing: '0.5px', zIndex: 2, boxShadow: '0 2px 6px rgba(37,211,102,0.3)' }}>VERIFIED</div>
                    )}
                    <div className="handwritten" style={{ fontSize: '1.2rem', color: user.isApproved ? '#25D366' : 'var(--pink-primary)', marginBottom: '0.5rem', fontWeight: 'bold', transition: 'color 0.5s' }}>Starlet 5.0 Pass</div>
                    <div style={{ display: 'inline-block', padding: '0.8rem', background: '#fff', border: `3px solid ${user.isApproved ? '#25D366' : 'var(--text-navy)'}`, borderRadius: '16px', margin: '0.5rem 0', position: 'relative', transition: 'border-color 0.5s' }}>
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&color=${user.isApproved ? '25D366' : '001f3f'}&bgcolor=ffffff&data=${encodeURIComponent(user.id)}`}
                        alt="Check-in Pass QR"
                        style={{ display: 'block', width: '150px', height: '150px', transition: 'opacity 0.5s', opacity: user.isApproved ? 0.35 : 1 }}
                      />
                      {user.isApproved && (
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
                          <div style={{ width: '50px', height: '50px', background: 'rgba(37, 211, 102, 0.12)', border: '3px solid #25D366', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#25D366" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          </div>
                          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#25D366', letterSpacing: '1px' }}>CHECKED IN</span>
                        </div>
                      )}
                    </div>
                    <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', fontWeight: 'bold', color: user.isApproved ? '#25D366' : 'var(--text-navy)', transition: 'color 0.5s' }}>
                      {user.name?.toUpperCase()}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      ID: {user.id.substring(0, 8)}...
                    </div>
                    {user.isApproved && (
                      <div style={{ marginTop: '0.6rem', fontSize: '0.75rem', color: '#25D366', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#25D366" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        Attendance verified — you're all set!
                      </div>
                    )}
                  </div>
                )}
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <strong>{user.teamName ? user.teamName : 'Solo Hacker'}</strong>
                      {user.teamName && user.isTeamLeader && (
                        <button
                          className="btn-small accept"
                          onClick={() => {
                            const newName = prompt("Enter new team name (Max 2 changes allowed):");
                            if (newName && newName.trim()) {
                              handleRenameTeam(newName);
                            }
                          }}
                        >
                          RENAME TEAM
                        </button>
                      )}
                      {user.teamName && (
                        <button className="btn-small decline" onClick={handleLeaveTeam}>
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
                            <span style={{ fontWeight: 'bold', color: 'var(--text-navy)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              {member.full_name}
                              {member.is_team_leader && (
                                <span className="leader-tag" style={{ background: 'var(--pink-primary)', color: '#fff', fontSize: '0.7rem', padding: '0.1rem 0.5rem', borderRadius: '6px', fontWeight: 'bold' }}>
                                  LEADER
                                </span>
                              )}
                            </span>
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
                        <small style={{ color: 'var(--text-muted)', fontSize: '14px' }}><img src="svg/emoji/lock.svg" className="emoji-icon" alt="Locked" /> Selection Locked (Contact admin to change)</small>
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
                    {settings.certificates_released === 'true' && user.isApproved && !isWinner && (
                      <div
                        className="support-btn mentor"
                        style={{
                          background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
                          color: '#001f3f',
                          gridColumn: 'span 2'
                        }}
                        onClick={handleClaimCertificateClick}
                      >
                        <img src="svg/emoji/certificate.svg" className="emoji-icon" alt="Certificate" /> CLAIM ACHIEVEMENT CERTIFICATE
                      </div>
                    )}
                    {settings.certificates_released === 'true' && user.isApproved && isWinner && (
                      <div
                        className="support-btn mentor disabled"
                        style={{
                          background: 'linear-gradient(135deg, #bdc3c7, #2c3e50)',
                          color: '#fff',
                          gridColumn: 'span 2',
                          cursor: 'not-allowed',
                          opacity: 0.8
                        }}
                        onClick={() => alert("As an award winner, you are eligible for a special category certificate instead of a participation certificate. Please contact the organizers.")}
                      >
                        <img src="svg/emoji/certificate.svg" className="emoji-icon" alt="Certificate" /> SPECIAL CERTIFICATE (CONTACT ADMIN)
                      </div>
                    )}
                  </div>
                </div>

                {/* PROJECT SUBMISSION SECTION */}
                <div className="profile-card" style={{ marginTop: '2rem', padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center' }}>
                  <h3 className="text-3d" style={{ fontSize: '1.5rem', margin: 0 }}>Project Submission</h3>
                  <p style={{ margin: 0, opacity: 0.8, fontSize: '0.95rem', color: '#fff' }}>
                    {mySubmission
                      ? `Your project "${mySubmission.project_name}" is successfully submitted!`
                      : "Submit your final hackathon project files, presentation slides, and source code link."}
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', width: '100%', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                    {!mySubmission && (
                      <a
                        href={settings.google_drive_link || "https://drive.google.com"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-small accept"
                        style={{ padding: '0.8rem 1.5rem', borderRadius: '12px', textDecoration: 'none', fontFamily: 'Fredoka One', minWidth: '200px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: '48px', boxSizing: 'border-box' }}
                      >
                        📂 UPLOAD TO DRIVE
                      </a>
                    )}
                    <button
                      onClick={() => setIsProjectModalOpen(true)}
                      className="join-btn"
                      style={{ minWidth: '200px', cursor: 'pointer', height: '48px', boxSizing: 'border-box', margin: 0 }}
                    >
                      {mySubmission ? "VIEW SUBMISSION DETAILS" : "SUBMIT PROJECT"}
                    </button>
                  </div>
                </div>

                {/* IDEA SUBMISSION SECTION */}
                <div className="profile-card" style={{ marginTop: '2rem', padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center' }}>
                  <h3 className="text-3d" style={{ fontSize: '1.5rem', margin: 0 }}>Idea Submission</h3>
                  <p style={{ margin: 0, opacity: 0.8, fontSize: '0.95rem', color: '#fff' }}>
                    {myIdeaSubmission
                      ? `Your idea "${myIdeaSubmission.idea_title}" is successfully submitted!`
                      : "Submit your initial idea for the hackathon."}
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', width: '100%', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => setIsIdeaModalOpen(true)}
                      className="join-btn"
                      style={{ minWidth: '200px', cursor: 'pointer', height: '48px', boxSizing: 'border-box', margin: 0 }}
                    >
                      {myIdeaSubmission ? "VIEW IDEA DETAILS" : "SUBMIT IDEA"}
                    </button>
                  </div>
                </div>
                {/* MY VLOGS / POSTS / SAVED GRID */}
                <div className="profile-card" style={{ marginTop: '2rem', padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '20px' }}>
                  <div className="profile-tabs-header" style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', borderBottom: '3px solid var(--text-navy)', paddingBottom: '0.5rem' }}>
                    <h3
                      className={`profile-tab-title ${profileTab === 'posts' ? 'active' : ''}`}
                      onClick={() => setProfileTab('posts')}
                      style={{ fontSize: '1.3rem', fontWeight: 'bold', margin: 0, cursor: 'pointer', opacity: profileTab === 'posts' ? 1 : 0.4 }}
                    >
                      MY POSTS
                    </h3>
                    <h3
                      className={`profile-tab-title ${profileTab === 'saved' ? 'active' : ''}`}
                      onClick={() => setProfileTab('saved')}
                      style={{ fontSize: '1.3rem', fontWeight: 'bold', margin: 0, cursor: 'pointer', opacity: profileTab === 'saved' ? 1 : 0.4 }}
                    >
                      SAVED POSTS
                    </h3>
                  </div>

                  {profileTab === 'posts' ? (
                    userProfilePosts.length === 0 ? (
                      <p style={{ opacity: 0.5, fontStyle: 'italic' }}>No posts uploaded yet. Head over to the Blog Feed to upload your first vlog!</p>
                    ) : (
                      <div className="profile-vlogs-grid">
                        {userProfilePosts.map(post => (
                          <div key={post.id} className="profile-vlog-item" onClick={() => setActiveViewPost(post)}>
                            {renderProfileGridMedia(post)}
                          </div>
                        ))}
                      </div>
                    )
                  ) : (
                    userSavedPosts.length === 0 ? (
                      <p style={{ opacity: 0.5, fontStyle: 'italic' }}>No saved posts yet. Explore the feed and save vlogs to view them here!</p>
                    ) : (
                      <div className="profile-vlogs-grid">
                        {userSavedPosts.map(post => (
                          <div key={post.id} className="profile-vlog-item" onClick={() => setActiveViewPost(post)}>
                            {renderProfileGridMedia(post)}
                          </div>
                        ))}
                      </div>
                    )
                  )}
                  {/* Mobile-only Save Changes Button */}
                  <button
                    className="join-btn mobile-only-btn"
                    onClick={updateProfile}
                    disabled={!hasProfileChanged}
                    style={{ opacity: hasProfileChanged ? 1 : 0.45, cursor: hasProfileChanged ? 'pointer' : 'not-allowed', transition: 'opacity 0.2s', width: '100%' }}
                  >
                    SAVE CHANGES
                  </button>
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
            padding: '120px 2rem 2rem 2rem',
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
              backgroundImage: "url('certificate/participation.png')",
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
              position: 'relative',
              boxSizing: 'border-box',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '360px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontFamily: "'Cinzel', serif",
                textTransform: 'uppercase',
                fontSize: '2.8rem',
                fontWeight: 700,
                color: '#4a1210',
                textAlign: 'center',
                width: '80%',
                padding: 0,
                margin: 0,
                zIndex: 10,
                letterSpacing: '1px'
              }}>
                {user.name || ''}
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
                          const imgs = v.image_urls.replace(/\[|\]/g, '').replace(/"/g, '').split(',');
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

          <div onClick={navigateToLanding} style={{ marginTop: '3rem', cursor: 'pointer', color: 'var(--blue-shadow)', textAlign: 'center', width: '100%' }}>← Back to Home</div>
        </div>
      ) : activeView === 'audit-logs' ? (
        <div className="admin-page-wrapper" style={{ padding: '2rem' }}>
          <div className="admin-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div>
              <h1 className="text-3d" style={{ fontSize: '3.5rem' }}>Security Audit Logs</h1>
              <p className="handwritten" style={{ fontSize: '1.2rem' }}>Activity tracking and security analysis center</p>
            </div>
            <button
              className="join-btn"
              onClick={() => { setActiveView('profile'); setAdminActiveTab('admin'); }}
              style={{ background: 'var(--text-navy)', color: '#fff' }}
            >
              ← Back to Admin Console
            </button>
          </div>

          <div className="admin-panel" style={{ background: '#fff', padding: '2rem', borderRadius: '25px', border: '4px solid var(--text-navy)', boxShadow: '10px 10px 0px var(--yellow-star)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div className="directory-filter-tabs" style={{ margin: 0 }}>
                {['all', 'week', 'month', 'six_months'].map(filterVal => {
                  const label = filterVal === 'all' ? 'All Time' : filterVal === 'week' ? 'Last Week' : filterVal === 'month' ? 'Last Month' : '6 Months Ago';
                  return (
                    <button
                      key={filterVal}
                      className={`directory-filter-btn ${logsTimeFilter === filterVal ? 'active' : ''}`}
                      onClick={() => setLogsTimeFilter(filterVal)}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              <button className="btn-small" onClick={fetchAuditLogs}>REFRESH LOGS</button>
            </div>

            <div className="user-table-wrapper" style={{ maxHeight: '600px', overflowY: 'auto' }}>
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
                  {(() => {
                    const filteredLogs = auditLogs.filter(log => {
                      if (logsTimeFilter === 'all') return true;
                      const logDate = new Date(log.created_at);
                      const now = new Date();
                      if (logsTimeFilter === 'week') {
                        return now.getTime() - logDate.getTime() <= 7 * 24 * 60 * 60 * 1000;
                      }
                      if (logsTimeFilter === 'month') {
                        return now.getTime() - logDate.getTime() <= 30 * 24 * 60 * 60 * 1000;
                      }
                      if (logsTimeFilter === 'six_months') {
                        return now.getTime() - logDate.getTime() <= 180 * 24 * 60 * 60 * 1000;
                      }
                      return true;
                    });

                    if (filteredLogs.length === 0) {
                      return <tr><td colSpan="4" style={{ textAlign: 'center' }}>No logs recorded for this period.</td></tr>;
                    }

                    return filteredLogs.map(log => (
                      <tr key={log.id}>
                        <td><small>{new Date(log.created_at).toLocaleString()}</small></td>
                        <td><strong>{log.profiles?.full_name || 'System / Anonymous'}</strong></td>
                        <td><span className="role-badge" style={{ background: '#eee', color: '#333' }}>{log.action}</span></td>
                        <td><span style={{ fontSize: '0.85rem' }}>{formatLogDetails(log)}</span></td>
                      </tr>
                    ));
                  })()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : activeView === 'sponsors-overview' ? (
        <SponsorsPage onBack={() => setActiveView('landing')} />
        // ==========================================

        // 🖥️ RENDER: BLOG FEED

        // ==========================================

      ) : activeView === 'blog' ? (
        <div className="blog-page-layout">
          <div className="blog-feed-container">
            {isLoggedIn && !checkIsAfter13th() && (
              <button
                className="floating-add-post-btn"
                onClick={() => setIsUploadModalOpen(true)}
                title="Share a vlog or photo"
              >
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            )}

            <div className="blog-posts-feed">
              {isLoadingBlog ? (
                <BlogPostSkeleton count={3} />
              ) : blogPosts.length === 0 ? (
                <div className="empty-blog-placeholder">
                  <div className="empty-blog-glow"></div>
                  <div className="empty-blog-illustration">
                    <svg viewBox="0 0 24 24" width="80" height="80" fill="none" stroke="url(#blogIconGrad)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="empty-blog-icon">
                      <defs>
                        <linearGradient id="blogIconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="var(--pink-primary)" />
                          <stop offset="100%" stopColor="var(--yellow-primary)" />
                        </linearGradient>
                      </defs>
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                      <circle cx="12" cy="13" r="4"></circle>
                    </svg>
                  </div>
                  <h2 className="empty-blog-title">No Posts Yet</h2>
                  <p className="empty-blog-description">Be the first to share a highlight or progress update from the event!</p>
                  {isLoggedIn && !checkIsAfter13th() && (
                    <button
                      className="btn-small accept empty-blog-action-btn"
                      onClick={() => setIsUploadModalOpen(true)}
                    >
                      SHARE A POST
                    </button>
                  )}
                </div>
              ) : (
                <div className="blog-posts-list">
                  {blogPosts.map(post => (
                    <div key={post.id} className="blog-post-card">
                      {/* Post Header */}
                      <div className="blog-post-header">
                        <div className="blog-post-author" onClick={() => handleViewUserProfile(post.user_id)} style={{ cursor: 'pointer' }}>
                          <div className="author-avatar">
                            <img
                              src={post.profiles?.avatar_url || 'icons/user-profile.svg'}
                              alt={post.profiles?.full_name || 'User'}
                            />
                          </div>
                          <div className="author-meta">
                            <strong>{post.profiles?.full_name || 'Anonymous User'}</strong>
                            <span>{formatPostTimestamp(post.created_at)}</span>
                          </div>
                        </div>

                        {/* Options menu dropdown (3 vertical dots) */}
                        <div className="blog-post-menu-container" style={{ position: 'relative' }}>
                          <button className="blog-menu-dots-btn" onClick={(e) => togglePostMenu(post.id, e)} title="Options">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                              <circle cx="12" cy="5" r="2" />
                              <circle cx="12" cy="12" r="2" />
                              <circle cx="12" cy="19" r="2" />
                            </svg>
                          </button>
                          {activePostMenuId === post.id && (
                            <div className="blog-post-menu-dropdown" onClick={(e) => e.stopPropagation()}>
                              {(session?.user?.id && (post.user_id === session.user.id || user?.role === 'admin')) && (
                                <div className="blog-menu-item delete" onClick={() => { handleDeletePost(post.id); setActivePostMenuId(null); }}>
                                  Delete
                                </div>
                              )}
                              {(session?.user?.id && post.user_id === session.user.id) && (
                                <div className="blog-menu-item edit" onClick={() => { handleEditPostCaption(post); setActivePostMenuId(null); }}>
                                  Edit Caption
                                </div>
                              )}
                              {(!session?.user?.id || post.user_id !== session.user.id) && (
                                <div className="blog-menu-item report" onClick={() => { handleReportPost(post); setActivePostMenuId(null); }}>
                                  Report
                                </div>
                              )}
                              {session?.user?.id && (
                                <div className="blog-menu-item save" onClick={() => { handleSaveToggle(post); setActivePostMenuId(null); }}>
                                  {savedPostIds.has(post.id) ? 'Unsave' : 'Save'}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Post Content Media or Text-only body */}
                      {(post.media_type === 'text' || !post.media_url) ? (
                        <div className="blog-post-text-body" style={{ padding: '2.5rem 1.5rem', fontSize: '1.25rem', color: 'var(--text-navy)', fontFamily: "'Outfit', sans-serif", borderBottom: '3.5px solid var(--text-navy)', lineHeight: '1.6', background: 'rgba(255, 255, 255, 0.3)', textAlign: 'left', wordBreak: 'break-word' }}>
                          {renderCaptionWithMentions(post.caption)}
                        </div>
                      ) : (
                        renderPostMedia(post)
                      )}

                      {/* Post Actions & Caption */}
                      <div className="blog-post-footer" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 1.25rem' }}>
                        <button
                          className={`blog-star-btn ${post.isStarred ? 'starred' : ''}`}
                          onClick={() => handleStarToggle(post.id)}
                          title={post.isStarred ? 'Unstar post' : 'Star post'}
                          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <svg className="star-icon-svg" viewBox="0 0 24 24" width="24" height="24" fill={post.isStarred ? "var(--yellow-star)" : "none"} stroke="var(--text-navy)" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                        </button>

                        {post.caption && post.media_type !== 'text' && post.media_url && (
                          <div className="blog-post-caption" style={{ margin: 0, flex: 1, textAlign: 'left' }}>
                            <span>{renderCaptionWithMentions(post.caption)}</span>
                          </div>
                        )}

                        {/* Share Button — right side */}
                        <div className="blog-share-wrapper" style={{ marginLeft: 'auto' }}>
                          <button
                            className="blog-share-btn"
                            title="Share post"
                            onClick={(e) => { e.stopPropagation(); setActiveSharePostId(activeSharePostId === post.id ? null : post.id); }}
                          >
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="18" cy="5" r="3" />
                              <circle cx="6" cy="12" r="3" />
                              <circle cx="18" cy="19" r="3" />
                              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                            </svg>
                          </button>
                          {activeSharePostId === post.id && (
                            <div className="blog-share-dropdown" onClick={e => e.stopPropagation()}>
                              <a
                                className="blog-share-option instagram"
                                href={`https://www.instagram.com/`}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => { navigator.clipboard?.writeText(`${window.location.href} — Check out this post by @mind.empowered on Starlet! 🌟`); setActiveSharePostId(null); }}
                                title="Caption copied to clipboard — paste it into your Instagram post!"
                              >
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                </svg>
                                <span>Instagram</span>
                                <span className="blog-share-hint">📋 Copies caption</span>
                              </a>
                              <a
                                className="blog-share-option linkedin"
                                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${encodeURIComponent((post.caption || 'Check out this post on Starlet!') + ' — Follow @mind-empowered for more 🌟')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setActiveSharePostId(null)}
                              >
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                  <rect x="2" y="9" width="4" height="12" />
                                  <circle cx="4" cy="4" r="2" />
                                </svg>
                                <span>LinkedIn</span>
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* UPLOAD MODAL */}
            {isUploadModalOpen && (
              <div className="modal-overlay" onClick={() => setIsUploadModalOpen(false)}>
                <div className="modal-content blog-upload-modal" onClick={e => e.stopPropagation()}>
                  <button className="modal-close" onClick={() => setIsUploadModalOpen(false)}>×</button>
                  <h2 className="text-3d" style={{ marginBottom: '1.5rem', marginTop: '1rem', textAlign: 'center' }}>Upload Vlog or Photo</h2>
                  <form className="auth-form" onSubmit={handleUploadPost}>
                    <div className="input-group">
                      <label style={{ color: 'var(--text-navy)', fontWeight: 'bold' }}>Post Caption</label>
                      <textarea
                        placeholder="Write something cool about this post... Use @ to tag users!"
                        value={uploadCaption}
                        onChange={(e) => handleCaptionChange(e.target.value)}
                        className="blog-form-textarea"
                      />
                      {mentionSuggestions.length > 0 && (
                        <div className="mention-autocomplete-dropdown">
                          {mentionSuggestions.map(user => (
                            <div
                              key={user.id}
                              className="mention-suggestion-item"
                              onClick={() => handleSelectMention(user)}
                            >
                              <strong>@{user.full_name.replace(/\s+/g, '_')}</strong>
                              <span style={{ fontSize: '0.8rem', opacity: 0.7, marginLeft: '8px' }}>({user.full_name})</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="input-group" style={{ marginTop: '1.5rem' }}>
                      <label style={{ color: 'var(--text-navy)', fontWeight: 'bold' }}>Add Photos or Videos (Multiple allowed)</label>
                      <div className="custom-file-upload">
                        <input
                          type="file"
                          id="blog-media-file"
                          multiple
                          accept="image/*,video/*"
                          onChange={(e) => {
                            const files = Array.from(e.target.files || []);
                            // Size check
                            const tooBig = files.find(f => f.size > 50 * 1024 * 1024);
                            if (tooBig) {
                              const sizeMB = (tooBig.size / (1024 * 1024)).toFixed(1);
                              setUploadAlert({ type: 'error', message: `"${tooBig.name}" is ${sizeMB} MB — max 50 MB per file.` });
                              return;
                            }
                            if (uploadFiles.length + files.length > 5) {
                              setUploadAlert({ type: 'error', message: 'Maximum 5 files per post.' });
                              const remaining = 5 - uploadFiles.length;
                              if (remaining > 0) {
                                setUploadFiles(prev => [...prev, ...files.slice(0, remaining)]);
                                setUploadPositions(prev => [...prev, ...Array(Math.min(remaining, files.length)).fill({ x: 50, y: 50 })]);
                              }
                            } else {
                              setUploadFiles(prev => [...prev, ...files]);
                              setUploadPositions(prev => [...prev, ...Array(files.length).fill({ x: 50, y: 50 })]);
                              setActivePreviewIdx(uploadFiles.length); // focus newly added first
                            }
                          }}
                          style={{ display: 'none' }}
                        />
                        <label htmlFor="blog-media-file" className="blog-file-label">
                          <span className="file-icon" style={{ display: 'flex', alignItems: 'center' }}>
                            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                            </svg>
                          </span>
                          <span className="file-text">
                            {uploadFiles.length > 0 ? `${uploadFiles.length} file(s) selected` : 'Click to select photos/videos...'}
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* ── Drag-to-Pan Preview + Thumbnail Strip ── */}
                    {uploadFiles.length > 0 && (() => {
                      const activeFile = uploadFiles[activePreviewIdx];
                      const isVideo = activeFile?.type?.startsWith('video');
                      let objectUrl = '';
                      try { objectUrl = URL.createObjectURL(activeFile); } catch (_) { }
                      const pos = uploadPositions[activePreviewIdx] || { x: 50, y: 50 };

                      return (
                        <div style={{ marginTop: '1rem' }}>
                          {/* Main square preview */}
                          <div style={{ position: 'relative', width: '100%', paddingTop: '100%', borderRadius: '14px', overflow: 'hidden', border: '3px solid var(--text-navy)', background: '#0a0a1a', cursor: isVideo ? 'default' : isDraggingPreview ? 'grabbing' : 'grab' }}
                            onPointerDown={(e) => {
                              if (isVideo) return;
                              e.currentTarget.setPointerCapture(e.pointerId);
                              setIsDraggingPreview(true);
                              dragStartRef.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y };
                            }}
                            onPointerMove={(e) => {
                              if (!isDraggingPreview || isVideo) return;
                              const dx = e.clientX - dragStartRef.current.mx;
                              const dy = e.clientY - dragStartRef.current.my;
                              // Moving right → move focus left (smaller x%) and vice versa
                              const newX = Math.max(0, Math.min(100, dragStartRef.current.px - dx * 0.3));
                              const newY = Math.max(0, Math.min(100, dragStartRef.current.py - dy * 0.3));
                              setUploadPositions(prev => {
                                const next = [...prev];
                                next[activePreviewIdx] = { x: Math.round(newX), y: Math.round(newY) };
                                return next;
                              });
                            }}
                            onPointerUp={() => setIsDraggingPreview(false)}
                            onPointerCancel={() => setIsDraggingPreview(false)}
                          >
                            <div style={{ position: 'absolute', inset: 0 }}>
                              {isVideo ? (
                                <video src={objectUrl} muted preload="metadata" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              ) : (
                                <img
                                  src={objectUrl}
                                  alt="preview"
                                  draggable={false}
                                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: `${pos.x}% ${pos.y}%`, userSelect: 'none', pointerEvents: 'none' }}
                                />
                              )}
                              {/* Drag hint overlay */}
                              {!isVideo && (
                                <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.55)', color: '#fff', fontSize: '0.7rem', borderRadius: '20px', padding: '3px 10px', pointerEvents: 'none', whiteSpace: 'nowrap' }}>
                                  ✥ drag to reposition
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Thumbnail strip */}
                          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', overflowX: 'auto', paddingBottom: '0.4rem' }}>
                            {uploadFiles.map((file, idx) => {
                              const isVid = file.type.startsWith('video');
                              let tUrl = '';
                              try { tUrl = URL.createObjectURL(file); } catch (_) { }
                              const tPos = uploadPositions[idx] || { x: 50, y: 50 };
                              return (
                                <div
                                  key={idx}
                                  onClick={() => setActivePreviewIdx(idx)}
                                  style={{ position: 'relative', width: '64px', height: '64px', borderRadius: '10px', border: `3px solid ${activePreviewIdx === idx ? 'var(--pink-primary)' : 'var(--text-navy)'}`, overflow: 'hidden', flexShrink: 0, cursor: 'pointer', background: '#f8fafc', boxSizing: 'border-box' }}
                                >
                                  {isVid ? (
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>📹</div>
                                  ) : (
                                    <img src={tUrl} alt="thumb" draggable={false} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: `${tPos.x}% ${tPos.y}%`, pointerEvents: 'none' }} />
                                  )}
                                  <button
                                    type="button"
                                    onClick={(ev) => { ev.stopPropagation(); setUploadFiles(prev => prev.filter((_, i) => i !== idx)); setUploadPositions(prev => prev.filter((_, i) => i !== idx)); setActivePreviewIdx(p => Math.max(0, p >= idx ? p - 1 : p)); }}
                                    style={{ position: 'absolute', top: 2, right: 2, background: 'var(--text-navy)', color: '#fff', border: 'none', borderRadius: '50%', width: '18px', height: '18px', fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0, zIndex: 2 }}
                                  >×</button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })()}

                    {isUploading && (
                      <div className="blog-upload-progress-container" style={{ marginTop: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--text-navy)' }}>
                          <span>Uploading file...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <div className="blog-progress-bar-bg">
                          <div className="blog-progress-bar-fill" style={{ width: `${uploadProgress}%` }}></div>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="join-btn"
                      disabled={isUploading}
                      style={{ width: '100%', marginTop: '2rem' }}
                    >
                      {isUploading ? `UPLOADING (${uploadProgress}%)` : 'POST TO BLOG FEED ✦'}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>

          <div className="blog-sidebar-panel">
            <div className="sidebar-card quote-card">
              <div className="quote-icon">“</div>
              <p className="quote-text">
                Technology is most powerful when it empowers everyone. Build for accessibility, innovate for independence.
              </p>
              <span className="quote-author">— Starlet 5.0 Team</span>
            </div>

            <div className="sidebar-card info-card">
              <h3>📢 Galaxy Feed</h3>
              <p>
                Catch up with live updates, vlogs, and project sneak peeks from all our squads across adiabatic venues.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                <span className="sidebar-tag">#AssistiveTech</span>
                <span className="sidebar-tag">#Inclusion</span>
              </div>
            </div>
          </div>

        </div>
        // ==========================================
        // 🖥️ RENDER: 3RD PERSON PROFILE VIEWER
        // ==========================================

      ) : activeView === 'profile-view' ? (
        <div className="profile-container" style={{ paddingTop: '120px' }}>
          <div className="profile-sidebar">
            <div className="profile-header-top-row">
              <div className="profile-avatar">
                <img
                  src={viewProfileUser.avatarUrl || 'icons/user-profile.svg'}
                  alt="avatar"
                  style={{ objectFit: viewProfileUser.avatarUrl ? 'cover' : 'contain', borderRadius: '50%', width: '100%', height: '100%' }}
                />
              </div>
              <div className="profile-header-details">
                <h2 className="text-3d">{viewProfileUser.name}</h2>
                <div className="profile-badges-row">
                  <div className={`status-badge ${viewProfileUser.role}`}>
                    {viewProfileUser.role.toUpperCase()}
                  </div>
                  {viewProfileUser.isTeamLeader && (
                    <div className="status-badge approved" style={{ background: 'var(--pink-primary)', color: '#fff', border: 'none' }}>
                      TEAM LEADER
                    </div>
                  )}
                  <div className="vlogs-count-badge">
                    📷 {userProfilePosts.length} {userProfilePosts.length === 1 ? 'Post' : 'Posts'}
                  </div>
                </div>
              </div>
            </div>

            {viewProfileUser.bio && (
              <div className="profile-field" style={{ marginTop: '2rem' }}>
                <label>{viewProfileUser.role === 'mentor' ? 'Mentor Bio' : 'Hacker Bio'}</label>
                <div className="field-value" style={{ border: '2px solid var(--text-navy)', padding: '1rem', borderRadius: '12px', background: 'rgba(0,0,0,0.05)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                  {viewProfileUser.bio}
                </div>
              </div>
            )}

            <button className="join-btn" style={{ marginTop: '2rem', width: '100%' }} onClick={() => setActiveView('blog')}>
              BACK TO BLOG FEED
            </button>
          </div>

          <div className="profile-main">
            {/* ROLE SPECIFIC DETAILS */}
            {(viewProfileUser.role === 'mentor') && (viewProfileUser.venue || viewProfileUser.roleTitle || viewProfileUser.yearsOfExperience || viewProfileUser.stack?.length > 0 || viewProfileUser.languages || viewProfileUser.website) ? (
              <div className="profile-card">
                <h3 className="text-3d" style={{ fontSize: '1.5rem', marginBottom: '1.2rem' }}>Mentor Profile</h3>
                {viewProfileUser.venue && (
                  <div className="profile-field">
                    <label>Company / Organization</label>
                    <div className="field-value" style={{ fontWeight: 'bold' }}>{viewProfileUser.venue}</div>
                  </div>
                )}
                {viewProfileUser.roleTitle && (
                  <div className="profile-field">
                    <label>Role Title</label>
                    <div className="field-value" style={{ fontWeight: 'bold' }}>{viewProfileUser.roleTitle}</div>
                  </div>
                )}
                {viewProfileUser.yearsOfExperience && (
                  <div className="profile-field">
                    <label>Years of Experience</label>
                    <div className="field-value" style={{ fontWeight: 'bold' }}>{viewProfileUser.yearsOfExperience}</div>
                  </div>
                )}
                {viewProfileUser.stack?.length > 0 && (
                  <div className="profile-field">
                    <label>Expertise / Tech Stack</label>
                    <div className="field-value" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {viewProfileUser.stack.map(tech => (
                        <span key={tech} style={{ background: 'var(--yellow-star)', color: 'var(--text-navy)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {viewProfileUser.languages && (
                  <div className="profile-field">
                    <label>Languages</label>
                    <div className="field-value" style={{ fontWeight: 'bold' }}>{viewProfileUser.languages}</div>
                  </div>
                )}
                {viewProfileUser.website && (
                  <div className="profile-field">
                    <label>Website</label>
                    <div className="field-value">
                      <a href={viewProfileUser.website.startsWith('http') ? viewProfileUser.website : `https://${viewProfileUser.website}`} target="_blank" rel="noreferrer" style={{ color: 'var(--blue-shadow)', fontWeight: 'bold' }}>
                        {viewProfileUser.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ) : null}

            {((viewProfileUser.role === 'attendee' || viewProfileUser.role === 'volunteer' || viewProfileUser.role === 'admin') && (viewProfileUser.college || viewProfileUser.stack?.length > 0 || viewProfileUser.teamName)) ? (
              <div className="profile-card">
                <h3 className="text-3d" style={{ fontSize: '1.5rem', marginBottom: '1.2rem' }}>{viewProfileUser.role === 'attendee' ? 'Hacker Details' : 'Details'}</h3>
                {viewProfileUser.college && (
                  <div className="profile-field">
                    <label>College / Affiliation</label>
                    <div className="field-value" style={{ fontWeight: 'bold' }}>{viewProfileUser.college}</div>
                  </div>
                )}
                {viewProfileUser.stack?.length > 0 && (
                  <div className="profile-field">
                    <label>Tech Stack</label>
                    <div className="field-value" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {viewProfileUser.stack.map(tech => (
                        <span key={tech} style={{ background: 'var(--yellow-star)', color: 'var(--text-navy)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {viewProfileUser.teamName && (
                  <div className="profile-field">
                    <label>Team Name</label>
                    <div className="field-value" style={{ fontWeight: 'bold' }}>{viewProfileUser.teamName}</div>
                  </div>
                )}
                {viewProfileUser.role === 'attendee' && (
                  <div className="profile-field">
                    <label>Selected Track</label>
                    <div className="field-value">
                      <strong>
                        {problemStatements.find(ps => ps.id === viewProfileUser.trackId)?.title || 'No track selected yet'}
                      </strong>
                    </div>
                  </div>
                )}
              </div>
            ) : null}

            {(viewProfileUser.socials.github || viewProfileUser.socials.linkedin || viewProfileUser.socials.instagram) ? (
              <div className="profile-card">
                <h3 className="text-3d" style={{ fontSize: '1.5rem', marginBottom: '1.2rem' }}>Social Connectivity</h3>
                <div className="social-connect-grid">
                  {viewProfileUser.socials.github && (
                    <a href={viewProfileUser.socials.github} target="_blank" rel="noreferrer" className="social-connect-item-view">
                      <img src="icons/github.svg" alt="GitHub" />
                      <span>View GitHub Profile</span>
                    </a>
                  )}
                  {viewProfileUser.socials.linkedin && (
                    <a href={viewProfileUser.socials.linkedin} target="_blank" rel="noreferrer" className="social-connect-item-view">
                      <img src="icons/linkedin.svg" alt="LinkedIn" />
                      <span>View LinkedIn Profile</span>
                    </a>
                  )}
                  {viewProfileUser.socials.instagram && (
                    <a href={viewProfileUser.socials.instagram.startsWith('http') ? viewProfileUser.socials.instagram : `https://${viewProfileUser.socials.instagram}`} target="_blank" rel="noreferrer" className="social-connect-item-view">
                      <img src="icons/instagram.svg" alt="Instagram" />
                      <span>View Instagram</span>
                    </a>
                  )}
                </div>
              </div>
            ) : null}

            {/* VLOGS / POSTS GRID */}
            <div className="profile-card">
              <h3 className="text-3d" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Vlogs & Posts</h3>
              {userProfilePosts.length === 0 ? (
                <p style={{ opacity: 0.5, fontStyle: 'italic' }}>This user hasn't posted anything yet.</p>
              ) : (
                <div className="profile-vlogs-grid">
                  {userProfilePosts.map(post => (
                    <div key={post.id} className="profile-vlog-item" onClick={() => setActiveViewPost(post)}>
                      {renderProfileGridMedia(post)}
                      <div className="profile-vlog-hover">
                        <span>⭐ {post.starCount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : activeView === 'showroom' ? (
        <div className="showroom-container">
          <div className="section-header" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
            {/* {user.role === 'judge' ? (
              <p className="subtitle-large" style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Welcome, Judge! Score each team's project below. Updates sync in real-time to the database and Google Sheets.
              </p>
            ) : user.role === 'admin' ? (
              null
            ) : (
              <p className="subtitle-large" style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Explore the amazing innovations created by all teams at Starlet 5.0!
              </p>
            )} */}

            {/* Search, Toggle, Download — all on one row */}
            <div className="showroom-header-top">
              {/* Left side: search bar wrapped so flex:1 doesn't override its own width */}
              <div className="showroom-header-side">
                <div
                  className={`showroom-search-container ${isSearchExpanded ? 'expanded' : 'collapsed'}`}
                  onClick={() => {
                    if (!isSearchExpanded) {
                      setIsSearchExpanded(true);
                      setTimeout(() => searchInputRef.current?.focus(), 100);
                    }
                  }}
                >
                  <span className="search-toggle-btn" style={{ cursor: 'pointer' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text-navy)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </span>
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search by Team, Project, or Leader..."
                    value={showroomSearchQuery}
                    onChange={(e) => setShowroomSearchQuery(e.target.value)}
                    className="showroom-search-input"
                    onBlur={() => {
                      if (showroomSearchQuery.trim() === '') {
                        setIsSearchExpanded(false);
                      }
                    }}
                  />
                  {showroomSearchQuery && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowroomSearchQuery('');
                        searchInputRef.current?.focus();
                      }}
                      className="search-clear-btn"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>

              {/* Center: Toggle Switch (Projects vs Judging) */}
              {(user.role === 'admin' || user.role === 'judge') ? (
                <div className="showroom-toggle-container">
                  <button
                    onClick={() => { setShowroomTab('projects'); playClickSound(); }}
                    className={`showroom-toggle-btn ${showroomTab === 'projects' ? 'active' : ''}`}
                  >
                    Projects View
                  </button>
                  <button
                    onClick={() => { setShowroomTab('judging'); playClickSound(); }}
                    className={`showroom-toggle-btn ${showroomTab === 'judging' ? 'active' : ''}`}
                  >
                    {user.role === 'admin' ? 'Judging Overview' : 'Judging Sheet'}
                  </button>
                </div>
              ) : <div />}

              {/* Right side: Download button wrapped so flex:1 doesn't distort it */}
              <div className="showroom-header-side showroom-header-side--right">
                {(user.role === 'admin' && showroomTab === 'judging') ? (
                  <button
                    onClick={handleDownloadJudgeScoresCSV}
                    title="Export Judging Spreadsheet (CSV)"
                    className="showroom-download-btn"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text-navy)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </button>
                ) : <div style={{ width: '52px' }} />}
              </div>
            </div>
          </div>

          {(user.role === 'judge' || user.role === 'admin') && showroomTab === 'judging' ? (
            (() => {
              // 1. Build the list of rows to display based on user role
              let rows = [];
              if (user.role === 'admin') {
                rows = [
                  ...allJudgeScores,
                  ...projectSubmissions
                    .filter(sub => !allJudgeScores.some(score => score.project_id === sub.id))
                    .map(sub => ({
                      project_id: sub.id,
                      team_name: sub.team_name,
                      judge_name: 'Not Graded',
                      total_mark: '—',
                      innovation_score: 0,
                      technical_score: 0,
                      ux_score: 0,
                      impact_score: 0,
                      presentation_score: 0,
                      feasibility_score: 0,
                      remarks: ''
                    }))
                ];
              } else {
                rows = projectSubmissions.map(sub => {
                  const existingScore = judgeScores[sub.id];
                  return existingScore ? { ...existingScore, project_id: sub.id } : {
                    project_id: sub.id,
                    team_name: sub.team_name,
                    judge_name: user.name || 'Anonymous Judge',
                    total_mark: '—',
                    innovation_score: 0,
                    technical_score: 0,
                    ux_score: 0,
                    impact_score: 0,
                    presentation_score: 0,
                    feasibility_score: 0,
                    remarks: ''
                  };
                });
              }

              // 2. Filter the rows by the search query
              const filteredJudgingRows = rows.filter(row => {
                if (!showroomSearchQuery.trim()) return true;
                const q = showroomSearchQuery.toLowerCase().trim();
                const teamName = (row.team_name || '').toLowerCase();
                const judgeName = (row.judge_name || '').toLowerCase();

                const sub = projectSubmissions.find(s => s.id === row.project_id);
                const projectName = sub ? (sub.project_name || '').toLowerCase() : '';

                const teamLeader = allUsers.find(u => u.team_name === row.team_name && u.is_team_leader);
                const leaderName = teamLeader ? (teamLeader.full_name || '').toLowerCase() : '';

                return teamName.includes(q) || judgeName.includes(q) || projectName.includes(q) || leaderName.includes(q);
              });

              return (
                <div className="user-table-wrapper" style={{ marginTop: '1.5rem', background: 'rgba(255, 255, 255, 0.03)', padding: '1.5rem 0', borderRadius: '24px', border: '4px solid var(--text-navy)', boxShadow: '8px 8px 0px var(--text-navy)', overflowX: 'auto' }}>
                  <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '3px solid var(--text-navy)' }}>
                        <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontFamily: "'Fredoka One', cursive", color: 'var(--text-navy)' }}>Team</th>
                        <th style={{ padding: '1rem', textAlign: 'left', fontFamily: "'Fredoka One', cursive", color: 'var(--text-navy)' }}>Judge</th>
                        <th style={{ padding: '1rem 1.5rem', textAlign: 'center', fontFamily: "'Fredoka One', cursive", color: 'var(--text-navy)', width: '120px' }}>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredJudgingRows.length === 0 ? (
                        <tr>
                          <td colSpan="3" style={{ textAlign: 'center', padding: '3rem 1.5rem', fontFamily: 'Outfit', color: 'var(--text-muted)' }}>
                            No matching teams or evaluations found.
                          </td>
                        </tr>
                      ) : (
                        filteredJudgingRows.map((row) => {
                          const pId = row.project_id;
                          const rowKey = row.id ? `${row.id}-${pId}` : `pending-${pId}`;
                          const isExpanded = !!expandedRows[rowKey];

                          const subDetail = projectSubmissions.find(s => s.id === pId) || {};
                          const teamLeader = allUsers.find(u => u.team_name === row.team_name && u.is_team_leader);
                          const leaderName = teamLeader ? teamLeader.full_name : '';

                          const calculatedTotal = getCalculatedTotal(rowKey, row);
                          const totalSum = row.total_mark === '—' && !tempScores[rowKey] ? '—' : calculatedTotal;
                          const isSaved = !tempScores[rowKey] || Object.keys(tempScores[rowKey]).length === 0;

                          return (
                            <React.Fragment key={rowKey}>
                              <tr
                                onClick={() => setExpandedRows(prev => ({ ...prev, [rowKey]: !prev[rowKey] }))}
                                style={{
                                  borderBottom: '2px solid rgba(0, 31, 63, 0.1)',
                                  cursor: 'pointer',
                                  background: isExpanded ? 'rgba(0, 31, 63, 0.04)' : 'transparent',
                                  transition: 'background 0.2s'
                                }}
                              >
                                <td style={{ padding: '1.2rem 1.5rem', fontWeight: 'bold', color: 'var(--text-navy)', textAlign: 'left' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    <span>{row.team_name}</span>
                                    {subDetail.project_name && (
                                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>
                                        ({subDetail.project_name})
                                      </span>
                                    )}
                                  </div>
                                </td>
                                <td style={{ padding: '1.2rem 1rem', color: 'var(--text-navy)', textAlign: 'left' }}>
                                  {row.judge_name || 'Not Graded'}
                                </td>
                                <td style={{ padding: '1.2rem 1.5rem', textAlign: 'center', fontWeight: '900', color: 'var(--text-navy)' }}>
                                  {totalSum}
                                </td>
                              </tr>

                              {isExpanded && (
                                <tr style={{ background: '#fff' }}>
                                  <td colSpan="3" style={{ padding: '1.5rem', borderBottom: '3px solid var(--text-navy)', textAlign: 'left' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>

                                      {/* Attendee Submitted Details */}
                                      <div>
                                        <h4 style={{ margin: '0 0 0.4rem 0', fontSize: '0.95rem', color: 'var(--text-navy)', fontFamily: "'Fredoka One', cursive" }}>Project Details</h4>
                                        <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.88rem', color: 'var(--text-navy)', fontFamily: 'Outfit', lineHeight: '1.5' }}>
                                          <strong>Description:</strong> {subDetail.description || 'No description provided.'}
                                        </p>
                                        {subDetail.tech_stack && (
                                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '0.6rem' }}>
                                            {subDetail.tech_stack.split(',').map((tech, idx) => (
                                              <span key={idx} style={{ fontSize: '0.7rem', background: 'var(--bg-cream)', border: '1.5px solid var(--text-navy)', padding: '0.15rem 0.45rem', borderRadius: '6px', fontFamily: 'Outfit', fontWeight: 'bold', color: 'var(--text-navy)' }}>
                                                {tech.trim()}
                                              </span>
                                            ))}
                                          </div>
                                        )}
                                        {leaderName && (
                                          <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.88rem', color: 'var(--text-navy)', fontFamily: 'Outfit' }}>
                                            <strong>Leader:</strong> {leaderName}
                                          </p>
                                        )}
                                        <div style={{ fontSize: '0.85rem', color: 'var(--blue-shadow)', fontWeight: 'bold', marginBottom: '0.6rem' }}>
                                          🤖 AI Percentage: {subDetail.ai_percentage ?? 0}%
                                        </div>
                                      </div>

                                      {/* Clickable Links */}
                                      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                                        {subDetail.github_url && (
                                          <a href={subDetail.github_url.startsWith('http') ? subDetail.github_url : `https://${subDetail.github_url}`} target="_blank" rel="noreferrer" className="btn-small accept" style={{ fontSize: '0.75rem', padding: '0.3rem 0.8rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                                            💻 Code Repo
                                          </a>
                                        )}
                                        {subDetail.ppt_link && (
                                          <a href={subDetail.ppt_link.startsWith('http') ? subDetail.ppt_link : `https://${subDetail.ppt_link}`} target="_blank" rel="noreferrer" className="btn-small accept" style={{ fontSize: '0.75rem', padding: '0.3rem 0.8rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                                            📂 Drive Folder
                                          </a>
                                        )}
                                        {subDetail.demo_url && (
                                          <a href={subDetail.demo_url.startsWith('http') ? subDetail.demo_url : `https://${subDetail.demo_url}`} target="_blank" rel="noreferrer" className="btn-small accept" style={{ fontSize: '0.75rem', padding: '0.3rem 0.8rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: 'var(--yellow-star)' }}>
                                            🚀 Live Demo
                                          </a>
                                        )}
                                      </div>

                                      {/* Evaluation Criteria */}
                                      <div style={{ background: 'var(--bg-cream)', padding: '1.2rem', borderRadius: '12px', border: '2.5px solid var(--text-navy)' }}>
                                        <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', color: 'var(--text-navy)', fontFamily: "'Fredoka One', cursive" }}>Evaluation Criteria</h4>

                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))', gap: '1rem', marginBottom: '1.2rem' }}>
                                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-navy)' }}>Innovation (Max 15)</span>
                                            <input
                                              type="number"
                                              min="0"
                                              max="15"
                                              placeholder="0-15"
                                              value={getInputValue(rowKey, 'innovation_score', row.innovation_score)}
                                              onChange={(e) => handleClampedScoreChange(rowKey, 'innovation_score', e.target.value, 15)}
                                              style={{ width: '100%', padding: '0.4rem', border: '2.5px solid var(--text-navy)', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold', fontSize: '1rem', background: '#fff' }}
                                            />
                                          </div>
                                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-navy)' }}>Technical (Max 10)</span>
                                            <input
                                              type="number"
                                              min="0"
                                              max="10"
                                              placeholder="0-10"
                                              value={getInputValue(rowKey, 'technical_score', row.technical_score)}
                                              onChange={(e) => handleClampedScoreChange(rowKey, 'technical_score', e.target.value, 10)}
                                              style={{ width: '100%', padding: '0.4rem', border: '2.5px solid var(--text-navy)', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold', fontSize: '1rem', background: '#fff' }}
                                            />
                                          </div>
                                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-navy)' }}>UX (Max 10)</span>
                                            <input
                                              type="number"
                                              min="0"
                                              max="10"
                                              placeholder="0-10"
                                              value={getInputValue(rowKey, 'ux_score', row.ux_score)}
                                              onChange={(e) => handleClampedScoreChange(rowKey, 'ux_score', e.target.value, 10)}
                                              style={{ width: '100%', padding: '0.4rem', border: '2.5px solid var(--text-navy)', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold', fontSize: '1rem', background: '#fff' }}
                                            />
                                          </div>
                                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-navy)' }}>Impact (Max 10)</span>
                                            <input
                                              type="number"
                                              min="0"
                                              max="10"
                                              placeholder="0-10"
                                              value={getInputValue(rowKey, 'impact_score', row.impact_score)}
                                              onChange={(e) => handleClampedScoreChange(rowKey, 'impact_score', e.target.value, 10)}
                                              style={{ width: '100%', padding: '0.4rem', border: '2.5px solid var(--text-navy)', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold', fontSize: '1rem', background: '#fff' }}
                                            />
                                          </div>
                                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-navy)' }}>Pitch (Max 10)</span>
                                            <input
                                              type="number"
                                              min="0"
                                              max="10"
                                              placeholder="0-10"
                                              value={getInputValue(rowKey, 'presentation_score', row.presentation_score)}
                                              onChange={(e) => handleClampedScoreChange(rowKey, 'presentation_score', e.target.value, 10)}
                                              style={{ width: '100%', padding: '0.4rem', border: '2.5px solid var(--text-navy)', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold', fontSize: '1rem', background: '#fff' }}
                                            />
                                          </div>
                                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-navy)' }}>Feasible (Max 10)</span>
                                            <input
                                              type="number"
                                              min="0"
                                              max="10"
                                              placeholder="0-10"
                                              value={getInputValue(rowKey, 'feasibility_score', row.feasibility_score)}
                                              onChange={(e) => handleClampedScoreChange(rowKey, 'feasibility_score', e.target.value, 10)}
                                              style={{ width: '100%', padding: '0.4rem', border: '2.5px solid var(--text-navy)', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold', fontSize: '1rem', background: '#fff' }}
                                            />
                                          </div>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.2rem' }}>
                                          <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-navy)' }}>Special Remarks</span>
                                          <input
                                            type="text"
                                            placeholder="Add special remarks..."
                                            value={getRemarksValue(rowKey, row.remarks)}
                                            onChange={(e) => handleUnifiedScoreChange(rowKey, 'remarks', e.target.value)}
                                            style={{ width: '100%', padding: '0.6rem 0.8rem', border: '2.5px solid var(--text-navy)', borderRadius: '8px', fontSize: '0.9rem', background: '#fff' }}
                                          />
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                                          <span style={{ fontSize: '1.1rem', fontWeight: '900', color: 'var(--text-navy)', fontFamily: 'Outfit' }}>
                                            Calculated Total: <span style={{ color: 'var(--pink-primary)' }}>{calculatedTotal}</span> / 65
                                          </span>
                                          <button
                                            onClick={() => handleUnifiedSave(rowKey, row)}
                                            disabled={savingScoreId === rowKey}
                                            className="join-btn"
                                            style={{
                                              background: isSaved ? '#48bb78' : 'var(--pink-primary)',
                                              color: '#fff',
                                              padding: '0.6rem 2rem',
                                              borderRadius: '12px',
                                              border: '2.5px solid var(--text-navy)',
                                              boxShadow: '3px 3px 0px var(--text-navy)',
                                              cursor: 'pointer',
                                              fontWeight: 'bold',
                                              fontFamily: "'Fredoka One', cursive",
                                              fontSize: '0.9rem'
                                            }}
                                          >
                                            {savingScoreId === rowKey ? 'Saving...' : isSaved ? 'Saved ✓' : 'Save Evaluation'}
                                          </button>
                                        </div>
                                      </div>

                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              );
            })()
          ) : (
            <>
              {(() => {
                const filteredSubmissions = projectSubmissions.filter(sub => {
                  if (!showroomSearchQuery.trim()) return true;
                  const query = showroomSearchQuery.toLowerCase().trim();
                  const teamName = (sub.team_name || '').toLowerCase();
                  const leaderName = getSubmissionTeamLeader(sub.team_name).toLowerCase();
                  const projectName = (sub.project_name || '').toLowerCase();
                  return teamName.includes(query) || leaderName.includes(query) || projectName.includes(query);
                });

                if (projectSubmissions.length === 0) {
                  return (
                    <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--bg-cream)', border: '4px solid var(--text-navy)', borderRadius: '24px', boxShadow: '8px 8px 0px var(--text-navy)' }}>
                      <div style={{ marginBottom: '1rem' }}>
                        <img src="/svg/emoji/rocket.svg" alt="Rocket" style={{ width: '64px', height: '64px' }} />
                      </div>
                      <h3 style={{ fontFamily: 'Fredoka One', color: 'var(--text-navy)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>No Submissions Yet</h3>
                      <p style={{ fontFamily: 'Outfit', color: 'var(--text-muted)' }}>Check back once hacking finishes and teams submit their projects!</p>
                    </div>
                  );
                }

                if (filteredSubmissions.length === 0) {
                  return (
                    <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--bg-cream)', border: '4px solid var(--text-navy)', borderRadius: '24px', boxShadow: '8px 8px 0px var(--text-navy)' }}>
                      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
                      <h3 style={{ fontFamily: 'Fredoka One', color: 'var(--text-navy)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>No Matching Projects Found</h3>
                      <p style={{ fontFamily: 'Outfit', color: 'var(--text-muted)' }}>Try refining your search query or check spelling.</p>
                    </div>
                  );
                }

                return (
                  <div className="showroom-grid">
                    {filteredSubmissions.map((submission) => {
                      const formattedTime = submission.created_at
                        ? new Date(submission.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) + ' ' + new Date(submission.created_at).toLocaleDateString([], { month: 'short', day: 'numeric' })
                        : 'N/A';
                      const leaderName = getSubmissionTeamLeader(submission.team_name);

                      return (
                        <div key={submission.id} className="blog-post-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%', gap: '1rem', background: '#fff', textAlign: 'left' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="sidebar-tag" style={{ background: 'var(--pink-primary)', color: '#fff', border: 'none', fontWeight: 'bold' }}>
                              {submission.team_name}
                            </span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>
                              🕒 {formattedTime}
                            </span>
                          </div>

                          <h3 style={{ fontFamily: 'Fredoka One', color: 'var(--text-navy)', fontSize: '1.4rem', margin: '0.5rem 0 0.2rem 0' }}>
                            {submission.project_name}
                          </h3>

                          {leaderName && (
                            <p style={{ fontFamily: 'Outfit', color: 'var(--text-navy)', fontSize: '0.88rem', margin: '0 0 0.2rem 0', textAlign: 'left' }}>
                              <strong>👑 Leader:</strong> {leaderName}
                            </p>
                          )}

                          {submission.tech_stack && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                              {submission.tech_stack.split(',').map((tech, i) => (
                                <span key={i} className="sidebar-tag" style={{ fontSize: '0.75rem', background: '#fff', border: '1.5px solid var(--text-navy)' }}>
                                  {tech.trim()}
                                </span>
                              ))}
                            </div>
                          )}

                          <p style={{ fontFamily: 'Outfit', color: '#000000', fontSize: '0.92rem', lineHeight: '1.5', flexGrow: 1, textAlign: 'left', margin: '0.5rem 0' }}>
                            {submission.description}
                          </p>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: 'auto', paddingTop: '1rem', borderTop: '2px dashed rgba(0, 31, 63, 0.15)' }}>
                            {submission.github_url && (
                              <a
                                href={submission.github_url.startsWith('http') ? submission.github_url : `https://${submission.github_url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-connect-item-view"
                                style={{ margin: 0, textDecoration: 'none', background: '#fff', border: '2px solid var(--text-navy)', padding: '0.7rem 1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'transform 0.1s' }}
                              >
                                <img src="icons/github.svg" alt="GitHub" style={{ width: '20px', height: '20px' }} />
                                <span style={{ fontFamily: 'Fredoka One', color: 'var(--text-navy)', fontSize: '0.9rem' }}>Github Repository</span>
                              </a>
                            )}

                            {submission.demo_url && (
                              <a
                                href={submission.demo_url.startsWith('http') ? submission.demo_url : `https://${submission.demo_url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-connect-item-view"
                                style={{ margin: 0, textDecoration: 'none', background: 'var(--pink-primary)', color: '#fff', border: '2px solid var(--text-navy)', padding: '0.7rem 1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'transform 0.1s', boxShadow: '3px 3px 0px var(--text-navy)' }}
                              >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h6" />
                                  <polyline points="15 3 21 3 21 9" />
                                  <line x1="10" y1="14" x2="21" y2="3" />
                                </svg>
                                <span style={{ fontFamily: 'Fredoka One', fontSize: '0.9rem' }}>Live Project Website</span>
                              </a>
                            )}

                            {submission.ppt_link && (
                              <>
                                <a
                                  href={submission.ppt_link.startsWith('http') ? submission.ppt_link : `https://${submission.ppt_link}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="social-connect-item-view"
                                  style={{ margin: 0, textDecoration: 'none', background: '#fff', border: '2px solid var(--text-navy)', padding: '0.7rem 1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'transform 0.1s' }}
                                >
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-navy)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" y1="15" x2="12" y2="3" />
                                  </svg>
                                  <span style={{ fontFamily: 'Fredoka One', color: 'var(--text-navy)', fontSize: '0.9rem' }}>Open OneDrive Folder</span>
                                </a>

                                <button
                                  onClick={() => setExpandedProject(expandedProject === submission.id ? null : submission.id)}
                                  className="social-connect-item-view"
                                  style={{ margin: 0, border: '2px solid var(--text-navy)', padding: '0.7rem 1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', background: expandedProject === submission.id ? 'var(--pink-primary)' : 'var(--yellow-star)', color: expandedProject === submission.id ? '#fff' : 'var(--text-navy)', boxShadow: '3px 3px 0px var(--text-navy)', transition: 'all 0.1s' }}
                                >
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    {expandedProject === submission.id ? (
                                      <>
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                      </>
                                    ) : (
                                      <>
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                      </>
                                    )}
                                  </svg>
                                  <span style={{ fontFamily: 'Fredoka One', fontSize: '0.9rem' }}>
                                    {expandedProject === submission.id ? 'Hide Live Folder' : 'Live Folder Preview'}
                                  </span>
                                </button>
                              </>
                            )}
                          </div>

                          {expandedProject === submission.id && submission.ppt_link && (
                            <div style={{ marginTop: '1.2rem', width: '100%', height: '420px', border: '3.5px solid var(--text-navy)', borderRadius: '18px', overflow: 'hidden', background: '#fff', position: 'relative', boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.06)' }}>
                              <iframe
                                src={getEmbedLink(submission.ppt_link)}
                                style={{ width: '100%', height: '100%', border: 'none' }}
                                title={`Project Preview - ${submission.project_name}`}
                                allow="autoplay; encrypted-media"
                              ></iframe>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </>
          )}
        </div>
      ) : null}

      <div className={`scroll-top-btn ${showScrollTop && activeView !== 'blog' ? 'visible' : ''}`} onClick={scrollToTop}>
        <img src="icons/rocket.svg" alt="top" />
      </div>
      {showForgotPasswordPopup && (
        <div className="modal-overlay" onClick={() => setShowForgotPasswordPopup(false)}>
          <div className="modal-content about-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowForgotPasswordPopup(false)}>×</button>
            <div className="modal-inner">
              <div className="modal-visual" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
                <img src="icons/warning.svg" alt="Support" style={{ maxWidth: '60%', height: 'auto' }} />
              </div>
              <div className="modal-text">
                <h2 className="text-3d">Recover Account</h2>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--text-navy)', marginBottom: '1rem' }}>
                  Please contact the organizers to reset your password.
                </p>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', color: 'var(--text-navy)', marginBottom: '1.5rem' }}>
                  Kindly provide your <strong>registered email address</strong> and your <strong>Instagram handle</strong> for verification when reaching out.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.5rem' }}>
                  <a href="mailto:mindempowered2020@gmail.com" className="social-connect-item-view" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', textDecoration: 'none', padding: '0.8rem 1.2rem', background: 'var(--bg-cream)', border: '2.5px solid var(--text-navy)', borderRadius: '15px', color: 'var(--text-navy)', fontWeight: 'bold', boxShadow: '3px 3px 0px var(--text-navy)' }}>
                    <span>📧 Email: mindempowered2020@gmail.com</span>
                  </a>
                  <a href="https://www.instagram.com/mind.empowered?igsh=bGNmYXI1czlrcDhi" target="_blank" rel="noopener noreferrer" className="social-connect-item-view" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', textDecoration: 'none', padding: '0.8rem 1.2rem', background: 'var(--bg-cream)', border: '2.5px solid var(--text-navy)', borderRadius: '15px', color: 'var(--text-navy)', fontWeight: 'bold', boxShadow: '3px 3px 0px var(--text-navy)' }}>
                    <span>📸 Instagram: @mind.empowered</span>
                  </a>
                </div>
                <div className="modal-footer-brand">
                  Starlet Organizer Support
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showAboutPopup && (
        <div className="modal-overlay" onClick={() => setShowAboutPopup(false)}>
          <div className="modal-content about-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAboutPopup(false)}>×</button>
            <div className="modal-inner">
              <div className="modal-visual">
                <img src="collaborators/Mind Empowered.gif" alt="Mind Empowered" />
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

      {showLTPopup && (
        <div className="modal-overlay" onClick={() => setShowLTPopup(false)}>
          <div className="modal-content about-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowLTPopup(false)}>×</button>
            <div className="modal-inner">
              <div className="modal-visual" style={{ background: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
                <img src="collaborators/LT.png" alt="Lenient Tree" style={{ maxWidth: '80%', height: 'auto', objectFit: 'contain' }} />
              </div>
              <div className="modal-text" style={{ padding: '2.5rem 2rem' }}>
                <h2 className="text-3d" style={{ marginBottom: '0.8rem', fontSize: '2.2rem' }}>Lenient Tree</h2>
                <p className="handwritten" style={{ fontSize: '1.2rem', color: 'var(--pink-primary)', marginTop: '-0.5rem', marginBottom: '1.2rem' }}>
                  Outreach Partner
                </p>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1rem', color: 'var(--text-navy)' }}>
                  <strong>Lenient Tree</strong> is a student-driven Web3 & startup community focused on bridging the gap between education and industry.
                </p>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1rem', color: 'var(--text-navy)' }}>
                  We enable students to gain real-world exposure through ideathons, hackathons, workshops, portfolio building, and direct collaboration with founders, investors, and ecosystem partners.
                </p>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem', color: 'var(--text-navy)' }}>
                  Our mission is to turn ideas into impact by building practical skills, strong networks, and future-ready talent.
                </p>

                <div className="modal-footer-brand" style={{ color: 'var(--pink-primary)', marginTop: '2rem' }}>
                  Outreach Partner
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSynthitePopup && (
        <div className="modal-overlay" onClick={() => setShowSynthitePopup(false)}>
          <div className="modal-content about-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowSynthitePopup(false)}>×</button>
            <div className="modal-inner">
              <div className="modal-visual" style={{ background: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
                <img src="collaborators/Synthite.png" alt="Synthite" style={{ maxWidth: '80%', height: 'auto', objectFit: 'contain' }} />
              </div>
              <div className="modal-text" style={{ padding: '2.5rem 2rem' }}>
                <h2 className="text-3d" style={{ marginBottom: '0.8rem', fontSize: '2.2rem' }}>Synthite</h2>
                <p className="handwritten" style={{ fontSize: '1.2rem', color: 'var(--pink-primary)', marginTop: '-0.5rem', marginBottom: '1.2rem' }}>
                  Prize Sponsor
                </p>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1rem', color: 'var(--text-navy)' }}>
                  <strong>Synthite Industries Private Limited</strong> is the global leader in spice oleoresins and value-added plant extracts. Combining nature and science, Synthite delivers raw ingredients of the highest quality to the food, fragrance, cosmetic, and pharmaceutical industries worldwide.
                </p>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem', color: 'var(--text-navy)' }}>
                  As our **Prize Sponsor**, Synthite is fostering creativity, supporting innovative solutions, and encouraging the next generation of women in tech at Starlet 5.0.
                </p>

                <div className="modal-footer-brand" style={{ color: 'var(--pink-primary)', marginTop: '2rem' }}>
                  Prize Sponsor
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showReccaaPopup && (
        <div className="modal-overlay" onClick={() => setShowReccaaPopup(false)}>
          <div className="modal-content about-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowReccaaPopup(false)}>×</button>
            <div className="modal-inner">
              <div className="modal-visual" style={{ background: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
                <img src="collaborators/Reccaa club.png" alt="Reccaa Club" style={{ maxWidth: '80%', height: 'auto', objectFit: 'contain' }} />
              </div>
              <div className="modal-text" style={{ padding: '2.5rem 2rem' }}>
                <h2 className="text-3d" style={{ marginBottom: '0.8rem', fontSize: '2.2rem' }}>Reccaa Club</h2>
                <p className="handwritten" style={{ fontSize: '1.2rem', color: 'var(--pink-primary)', marginTop: '-0.5rem', marginBottom: '1.2rem' }}>
                  Sponsor
                </p>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1rem', color: 'var(--text-navy)' }}>
                  <strong>Reccaa Club</strong> is a premier social and recreation community club bringing together professionals, families, and organizations to collaborate, connect, and enjoy wellness-driven initiatives.
                </p>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem', color: 'var(--text-navy)' }}>
                  We are proud to partner with Starlet 5.0 as a sponsor, lending our support to the empowerment of women through engineering and collaborative innovation.
                </p>

                <div className="modal-footer-brand" style={{ color: 'var(--pink-primary)', marginTop: '2rem' }}>
                  Event Sponsor
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showNSSPopup && (
        <div className="modal-overlay" onClick={() => setShowNSSPopup(false)}>
          <div className="modal-content about-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowNSSPopup(false)}>×</button>
            <div className="modal-inner">
              <div className="modal-visual" style={{ background: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
                <img src="collaborators/nss.png" alt="NSS ASIET" style={{ maxWidth: '80%', height: 'auto', objectFit: 'contain' }} />
              </div>
              <div className="modal-text" style={{ padding: '2.5rem 2rem' }}>
                <h2 className="text-3d" style={{ marginBottom: '0.8rem', fontSize: '2.2rem' }}>NSS ASIET</h2>
                <p className="handwritten" style={{ fontSize: '1.2rem', color: 'var(--pink-primary)', marginTop: '-0.5rem', marginBottom: '1.2rem' }}>
                  Outreach Partner
                </p>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1rem', color: 'var(--text-navy)' }}>
                  The **National Service Scheme (NSS) unit at Adi Shankara Institute of Engineering & Technology (ASIET)** is dedicated to community service and social development. Through hands-on community service projects, civic engagement, and social awareness campaigns, NSS volunteers work actively to create positive social impacts.
                </p>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem', color: 'var(--text-navy)' }}>
                  As our **Outreach Partner**, NSS ASIET is key in spreading the word, mobilizing resources, and driving participation across campuses to support gender equity and social progress.
                </p>

                <div className="modal-footer-brand" style={{ color: 'var(--pink-primary)', marginTop: '2rem' }}>
                  Outreach Partner
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showWECPopup && (
        <div className="modal-overlay" onClick={() => setShowWECPopup(false)}>
          <div className="modal-content about-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowWECPopup(false)}>×</button>
            <div className="modal-inner">
              <div className="modal-visual" style={{ background: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
                <img src="collaborators/Women Empowerement Cell.png" alt="Women Empowerment Cell" style={{ maxWidth: '80%', height: 'auto', objectFit: 'contain' }} />
              </div>
              <div className="modal-text" style={{ padding: '2.5rem 2rem' }}>
                <h2 className="text-3d" style={{ marginBottom: '0.8rem', fontSize: '2.2rem' }}>Women Empowerment Cell</h2>
                <p className="handwritten" style={{ fontSize: '1.2rem', color: 'var(--pink-primary)', marginTop: '-0.5rem', marginBottom: '1.2rem' }}>
                  Outreach Partner
                </p>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1rem', color: 'var(--text-navy)' }}>
                  The **Women Empowerment Cell** is committed to fostering gender equality, nurturing leadership skills, and creating a supportive environment for female engineering students to unlock their full potential.
                </p>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem', color: 'var(--text-navy)' }}>
                  As an **Outreach Partner** for Starlet 5.0, they play a vital role in championing inclusion and mentoring women to drive innovation and claim their space in technology fields.
                </p>

                <div className="modal-footer-brand" style={{ color: 'var(--pink-primary)', marginTop: '2rem' }}>
                  Outreach Partner
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showFrenchToastPopup && (
        <div className="modal-overlay" onClick={() => setShowFrenchToastPopup(false)}>
          <div className="modal-content about-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowFrenchToastPopup(false)}>×</button>
            <div className="modal-inner">
              <div className="modal-visual" style={{ background: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
                <img src="collaborators/french toast.png" alt="French Toast" style={{ maxWidth: '80%', height: 'auto', objectFit: 'contain' }} />
              </div>
              <div className="modal-text" style={{ padding: '2.5rem 2rem' }}>
                <h2 className="text-3d" style={{ marginBottom: '0.8rem', fontSize: '2.2rem' }}>French Toast</h2>
                <p className="handwritten" style={{ fontSize: '1.2rem', color: 'var(--pink-primary)', marginTop: '-0.5rem', marginBottom: '1.2rem' }}>
                  Sponsor
                </p>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem', color: 'var(--text-navy)' }}>
                  <strong>French Toast</strong> is a premier artisanal bakery and cafe chain. Famed for its exceptional pastries, sourdough breads, and gourmet menu, French Toast is fueling our developers, organizers, and mentors at Starlet 5.0.
                </p>
                <div className="modal-footer-brand" style={{ color: 'var(--pink-primary)', marginTop: '2rem' }}>
                  Sponsor
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showESAFPopup && (
        <div className="modal-overlay" onClick={() => setShowESAFPopup(false)}>
          <div className="modal-content about-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowESAFPopup(false)}>×</button>
            <div className="modal-inner">
              <div className="modal-visual" style={{ background: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
                <img src="collaborators/ESAF.png" alt="ESAF Finance Bank" style={{ maxWidth: '80%', height: 'auto', objectFit: 'contain' }} />
              </div>
              <div className="modal-text" style={{ padding: '2.5rem 2rem' }}>
                <h2 className="text-3d" style={{ marginBottom: '0.8rem', fontSize: '2.2rem' }}>ESAF Bank</h2>
                <p className="handwritten" style={{ fontSize: '1.2rem', color: 'var(--pink-primary)', marginTop: '-0.5rem', marginBottom: '1.2rem' }}>
                  Sponsor
                </p>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem', color: 'var(--text-navy)' }}>
                  <strong>ESAF Bank</strong> is a leading banking institution dedicated to social impact and sustainable finance. ESAF is supporting Starlet 5.0 to promote financial inclusion, women empowerment, and innovative digital solutions.
                </p>
                <div className="modal-footer-brand" style={{ color: 'var(--pink-primary)', marginTop: '2rem' }}>
                  Sponsor
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

      {isProjectModalOpen && (
        <div className="modal-overlay" onClick={() => setIsProjectModalOpen(false)}>
          <div className="modal-content about-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '750px', background: 'var(--bg-cream)', border: '4px solid var(--text-navy)', padding: '2.5rem', borderRadius: '24px', boxShadow: '10px 10px 0px var(--text-navy)', overflowY: 'auto', maxHeight: '90vh', position: 'relative' }}>
            <button className="modal-close" onClick={() => setIsProjectModalOpen(false)} style={{ color: 'var(--text-navy)', fontSize: '2rem', right: '1.5rem', top: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}>×</button>

            <div style={{ width: '100%' }}>
              <h2 className="text-3d" style={{ fontSize: '2.2rem', marginBottom: '1.5rem', textAlign: 'center' }}>Project Submission</h2>

              {mySubmission ? (
                <div className="submission-success" style={{ textAlign: 'center' }}>
                  <div style={{ marginBottom: '1rem', fontSize: '3rem' }}>🚀</div>
                  <h3 style={{ fontFamily: 'Fredoka One', color: 'var(--text-navy)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>Project Submitted!</h3>
                  <p style={{ fontFamily: 'Outfit', color: 'var(--text-navy)', fontSize: '1.05rem', margin: '0.5rem 0' }}>Your team's project <strong>"{mySubmission.project_name}"</strong> has been received.</p>

                  {submitterName && (
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-navy)', fontWeight: 'bold', marginTop: '0.5rem' }}>
                      Submitted by teammate: <span style={{ color: 'var(--pink-primary)' }}>{submitterName}</span>
                    </p>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginTop: '2rem', textAlign: 'left' }}>
                    <div className="input-group">
                      <label style={{ color: 'var(--text-navy)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.3rem', display: 'block' }}>Team Name</label>
                      <input type="text" value={mySubmission.team_name} disabled style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '2px solid var(--text-navy)', background: '#e2e8f0', color: '#4a5568', fontWeight: 'bold' }} />
                    </div>
                    <div className="input-group">
                      <label style={{ color: 'var(--text-navy)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.3rem', display: 'block' }}>Project Name</label>
                      <input type="text" value={mySubmission.project_name} disabled style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '2px solid var(--text-navy)', background: '#e2e8f0', color: '#4a5568', fontWeight: 'bold' }} />
                    </div>
                    <div className="admin-two-col-grid" style={{ gap: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                      <div className="input-group">
                        <label style={{ color: 'var(--text-navy)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.3rem', display: 'block' }}>GitHub Repository</label>
                        <input type="text" value={mySubmission.github_url} disabled style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '2px solid var(--text-navy)', background: '#e2e8f0', color: '#4a5568' }} />
                      </div>
                      <div className="input-group">
                        <label style={{ color: 'var(--text-navy)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.3rem', display: 'block' }}>Google Drive Folder</label>
                        <input type="text" value={mySubmission.ppt_link || ''} disabled style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '2px solid var(--text-navy)', background: '#e2e8f0', color: '#4a5568' }} />
                      </div>
                    </div>
                    <div className="admin-two-col-grid" style={{ gap: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                      <div className="input-group">
                        <label style={{ color: 'var(--text-navy)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.3rem', display: 'block' }}>Tech Stack</label>
                        <input type="text" value={mySubmission.tech_stack} disabled style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '2px solid var(--text-navy)', background: '#e2e8f0', color: '#4a5568' }} />
                      </div>
                      <div className="input-group">
                        <label style={{ color: 'var(--text-navy)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.3rem', display: 'block' }}>Project Live Link (Optional)</label>
                        <input type="text" value={mySubmission.demo_url || 'N/A'} disabled style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '2px solid var(--text-navy)', background: '#e2e8f0', color: '#4a5568' }} />
                      </div>
                    </div>
                    <div className="input-group">
                      <label style={{ color: 'var(--text-navy)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.3rem', display: 'block' }}>Brief Description</label>
                      <textarea value={mySubmission.description} disabled style={{ width: '100%', minHeight: '100px', padding: '0.8rem', borderRadius: '8px', border: '2px solid var(--text-navy)', background: '#e2e8f0', color: '#4a5568', resize: 'vertical' }}></textarea>
                    </div>
                  </div>

                  <div className="submission-links-row" style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <a href={mySubmission.github_url} target="_blank" rel="noreferrer" className="btn-small accept" style={{ padding: '0.7rem 1.5rem', borderRadius: '12px', textDecoration: 'none', fontFamily: 'Fredoka One' }}>VIEW CODE</a>
                    {mySubmission.ppt_link && (
                      <a href={mySubmission.ppt_link} target="_blank" rel="noreferrer" className="btn-small accept" style={{ padding: '0.7rem 1.5rem', borderRadius: '12px', textDecoration: 'none', fontFamily: 'Fredoka One' }}>VIEW DRIVE FOLDER</a>
                    )}
                    {mySubmission.demo_url && (
                      <a href={mySubmission.demo_url} target="_blank" rel="noreferrer" className="btn-small accept" style={{ padding: '0.7rem 1.5rem', borderRadius: '12px', textDecoration: 'none', background: 'var(--yellow-star)', color: 'var(--text-navy)', border: '2px solid var(--text-navy)', fontFamily: 'Fredoka One' }}>LIVE WEBSITE</a>
                    )}
                  </div>
                </div>
              ) : (
                <form className="auth-form" onSubmit={handleProjectSubmit} style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <div className="submission-instructions-box" style={{ background: 'rgba(0, 31, 63, 0.03)', border: '2px dashed var(--text-navy)', borderRadius: '14px', padding: '1.2rem' }}>
                    <h4 style={{ color: 'var(--text-navy)', fontFamily: "'Fredoka One', cursive", margin: '0 0 0.5rem 0' }}>Submission Guidelines</h4>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-navy)', margin: '0 0 0.8rem 0', lineHeight: '1.4' }}>
                      Please follow the steps below to submit your project:
                    </p>
                    <ol style={{ fontSize: '0.85rem', color: 'var(--text-navy)', paddingLeft: '1.2rem', margin: 0, lineHeight: '1.6' }}>
                      <li>Open the event's shared <a href={settings.google_drive_link || "https://drive.google.com"} target="_blank" rel="noreferrer" style={{ color: 'var(--pink-primary)', textDecoration: 'underline', fontWeight: 'bold' }}>Google Drive Folder</a>.</li>
                      <li>Create a new folder inside, named exactly after your team name (<strong>{user.teamName || "Your Team Name"}</strong>).</li>
                      <li>Upload your <strong>demo video</strong> and <strong>presentation slide deck (PPTX/PDF)</strong> into that team folder.</li>
                      <li>Submit your GitHub repo link and your team folder's Google Drive link in the form below.</li>
                    </ol>
                  </div>

                  <div className="input-group">
                    <label style={{ color: 'var(--text-navy)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.3rem', display: 'block' }}>Team/Group Name</label>
                    <input name="teamName" type="text" value={user.teamName || `Individual-${session?.user?.id}`} disabled style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '2px solid var(--text-navy)', background: '#e2e8f0', color: '#4a5568', fontWeight: 'bold' }} />
                  </div>

                  <div className="admin-two-col-grid" style={{ gap: '1.2rem', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                    <div className="input-group">
                      <label style={{ color: 'var(--text-navy)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.3rem', display: 'block' }}>Project Name</label>
                      <input name="projectName" type="text" placeholder="My Awesome Hack" required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '2px solid var(--text-navy)' }} />
                    </div>
                    <div className="input-group">
                      <label style={{ color: 'var(--text-navy)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.3rem', display: 'block' }}>GitHub Repository</label>
                      <input name="github" type="url" placeholder="https://github.com/..." required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '2px solid var(--text-navy)' }} />
                    </div>
                  </div>

                  <div className="admin-two-col-grid" style={{ gap: '1.2rem', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                    <div className="input-group">
                      <label style={{ color: 'var(--text-navy)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.3rem', display: 'block' }}>Google Drive Folder Link</label>
                      <input name="driveLink" type="url" placeholder="https://drive.google.com/drive/folders/..." required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '2px solid var(--text-navy)' }} />
                    </div>
                    <div className="input-group">
                      <label style={{ color: 'var(--text-navy)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.3rem', display: 'block' }}>Tech Stack Used</label>
                      <input name="techStack" type="text" placeholder="React, Node, Supabase, Python" required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '2px solid var(--text-navy)' }} />
                    </div>
                  </div>

                  <div className="admin-two-col-grid" style={{ gap: '1.2rem', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                    <div className="input-group">
                      <label style={{ color: 'var(--text-navy)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.3rem', display: 'block' }}>Project Deployed Link (Optional)</label>
                      <input name="projectLink" type="url" placeholder="https://my-app.vercel.app" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '2px solid var(--text-navy)' }} />
                    </div>
                  </div>

                  <div className="input-group">
                    <label style={{ color: 'var(--text-navy)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.3rem', display: 'block' }}>Brief Description (min 100 words)</label>
                    <textarea name="description" placeholder="Tell us what you built and how it helps..." required style={{ width: '100%', minHeight: '100px', padding: '0.8rem', borderRadius: '8px', border: '2px solid var(--text-navy)', resize: 'vertical' }}></textarea>
                  </div>

                  {settings.project_submission_open === 'true' ? (
                    <button
                      type="submit"
                      className="join-btn"
                      style={{
                        width: '100%',
                        marginTop: '1rem',
                        cursor: 'pointer',
                        padding: '1rem'
                      }}
                    >
                      SUBMIT FINAL PROJECT
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="join-btn disabled"
                      style={{
                        width: '100%',
                        marginTop: '1rem',
                        cursor: 'not-allowed',
                        opacity: 0.6,
                        padding: '1rem'
                      }}
                      disabled
                    >
                      SUBMISSION CLOSED
                    </button>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {isIdeaModalOpen && (
        <div className="modal-overlay" onClick={() => setIsIdeaModalOpen(false)}>
          <div className="modal-content about-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '650px', background: 'var(--bg-cream)', border: '4px solid var(--text-navy)', padding: '2.5rem', borderRadius: '24px', boxShadow: '10px 10px 0px var(--text-navy)', overflowY: 'auto', maxHeight: '90vh', position: 'relative' }}>
            <button className="modal-close" onClick={() => setIsIdeaModalOpen(false)} style={{ color: 'var(--text-navy)', fontSize: '2rem', right: '1.5rem', top: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}>×</button>

            <div style={{ width: '100%' }}>
              <h2 className="text-3d" style={{ fontSize: '2.2rem', marginBottom: '1.5rem', textAlign: 'center' }}>Idea Submission</h2>

              {myIdeaSubmission ? (
                <div className="submission-success" style={{ textAlign: 'center' }}>
                  <div style={{ marginBottom: '1rem', fontSize: '3rem' }}>💡</div>
                  <h3 style={{ fontFamily: 'Fredoka One', color: 'var(--text-navy)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>Idea Submitted!</h3>
                  <p style={{ fontFamily: 'Outfit', color: 'var(--text-navy)', fontSize: '1.05rem', margin: '0.5rem 0' }}>Your idea <strong>"{myIdeaSubmission.idea_title}"</strong> has been received.</p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginTop: '2rem', textAlign: 'left' }}>
                    <div className="input-group">
                      <label style={{ color: 'var(--text-navy)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.3rem', display: 'block' }}>Idea Details</label>
                      <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.03)', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', whiteSpace: 'pre-wrap' }}>
                        {myIdeaSubmission.description}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <form className="auth-form" onSubmit={handleIdeaSubmit} style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  
                  <div className="input-group">
                    <label style={{ color: 'var(--text-navy)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.3rem', display: 'block' }}>Team/Group Name</label>
                    <input name="teamName" type="text" value={user.teamName || `Individual-${session?.user?.id}`} disabled style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '2px solid var(--text-navy)', background: '#e2e8f0', color: '#4a5568', fontWeight: 'bold' }} />
                  </div>

                  <div className="input-group">
                    <label style={{ color: 'var(--text-navy)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.3rem', display: 'block' }}>Idea Title</label>
                    <input name="ideaTitle" type="text" placeholder="Title of your idea" required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '2px solid var(--text-navy)' }} />
                  </div>

                  <div className="input-group">
                    <label style={{ color: 'var(--text-navy)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.3rem', display: 'block' }}>Idea Description (min 100 words)</label>
                    <textarea name="description" placeholder="Describe the problem you're solving and your proposed solution..." required style={{ width: '100%', minHeight: '150px', padding: '0.8rem', borderRadius: '8px', border: '2px solid var(--text-navy)', resize: 'vertical' }}></textarea>
                  </div>

                  {settings.idea_submission_open === 'true' ? (
                    <button
                      type="submit"
                      className="join-btn"
                      style={{
                        width: '100%',
                        marginTop: '1rem',
                        cursor: 'pointer',
                        padding: '1rem'
                      }}
                    >
                      SUBMIT IDEA
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="join-btn disabled"
                      style={{
                        width: '100%',
                        marginTop: '1rem',
                        cursor: 'not-allowed',
                        opacity: 0.6,
                        padding: '1rem'
                      }}
                      disabled
                    >
                      IDEA SUBMISSION CLOSED
                    </button>
                  )}
                </form>
              )}
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
                src={selectedGalleryImage + 1 <= 9 ? `gallery/${selectedGalleryImage + 1}.JPG` : `gallery/${selectedGalleryImage + 1}.jpg`}
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
                  const githubLink = profile.github_url || selectedMentor.github_url;
                  const linkedinLink = profile.linkedin_url || selectedMentor.linkedin_url;
                  const instagramLink = profile.twitter_url || selectedMentor.twitter_url;
                  const websiteLink = profile.website_url || selectedMentor.website_url;

                  const hasAnySocial = githubLink || linkedinLink || instagramLink || websiteLink;
                  if (!hasAnySocial) return null;

                  return (
                    <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                      {githubLink && (
                        <a href={githubLink.startsWith('http') ? githubLink : `https://${githubLink}`} target="_blank" rel="noopener noreferrer" style={{ width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-cream)', border: '2.5px solid var(--text-navy)', borderRadius: '50%', transition: 'all 0.2s', boxShadow: '3px 3px 0px var(--text-navy)' }} title="GitHub">
                          <img src="icons/github.svg" alt="GitHub" style={{ width: '18px' }} />
                        </a>
                      )}
                      {linkedinLink && (
                        <a href={linkedinLink.startsWith('http') ? linkedinLink : `https://${linkedinLink}`} target="_blank" rel="noopener noreferrer" style={{ width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-cream)', border: '2.5px solid var(--text-navy)', borderRadius: '50%', transition: 'all 0.2s', boxShadow: '3px 3px 0px var(--text-navy)' }} title="LinkedIn">
                          <img src="icons/linkedin.svg" alt="LinkedIn" style={{ width: '18px' }} />
                        </a>
                      )}
                      {instagramLink && (
                        <a href={instagramLink.startsWith('http') ? instagramLink : `https://${instagramLink}`} target="_blank" rel="noopener noreferrer" style={{ width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-cream)', border: '2.5px solid var(--text-navy)', borderRadius: '50%', transition: 'all 0.2s', boxShadow: '3px 3px 0px var(--text-navy)' }} title="Instagram">
                          <img src="icons/instagram.svg" alt="Instagram" style={{ width: '18px' }} />
                        </a>
                      )}
                      {websiteLink && (
                        <a href={websiteLink.startsWith('http') ? websiteLink : `https://${websiteLink}`} target="_blank" rel="noopener noreferrer" style={{ width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-cream)', border: '2.5px solid var(--text-navy)', borderRadius: '50%', transition: 'all 0.2s', boxShadow: '3px 3px 0px var(--text-navy)', fontSize: '1rem' }} title="Visit Website">
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
            <div className="alert-header" style={{ background: activeAlert.type === 'checkin_success' ? '#25D366' : undefined }}>
              {activeAlert.type === 'system_issue' ? 'NEW SYSTEM ISSUE' : activeAlert.type === 'checkin_success' ? 'CHECK-IN VERIFIED' : 'NEW HELP REQUEST'}
            </div>
            <div className="alert-body">
              {activeAlert.type === 'checkin_success' ? (
                <div style={{ textAlign: 'center', width: '100%' }}>
                  <div className="install-success-icon" style={{ display: 'inline-flex', width: '70px', height: '70px', background: 'rgba(37, 211, 102, 0.1)', border: '2.5px solid #25D366', borderRadius: '50%', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem' }}>
                    <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="#25D366" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <h3 style={{ fontFamily: 'Fredoka One', color: 'var(--text-navy)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>Welcome to Starlet 5.0!</h3>
                  <p style={{ fontFamily: 'Outfit', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.4' }}>{activeAlert.message}</p>
                </div>
              ) : (
                <>
                  <div className="alert-user-photo">
                    <img src={activeAlert.attendee?.avatar_url || 'icons/user-profile.svg'} alt="user" />
                  </div>
                  <div className="alert-content">
                    <h3>{activeAlert.attendee?.full_name || 'Attendee'}</h3>
                    <span className="alert-team-tag">{activeAlert.attendee?.team_name || 'Solo Hacker'}</span>
                    <p>"{activeAlert.message}"</p>
                  </div>
                </>
              )}
            </div>
            <div className="alert-footer">
              {activeAlert.type === 'system_issue' || activeAlert.type === 'checkin_success' ? (
                <button className="join-btn" style={{ width: '100%' }} onClick={() => setActiveAlert(null)}>
                  ACKNOWLEDGE
                </button>
              ) : (
                <>
                  <button className="join-btn" style={{ width: '100%', marginBottom: '0.5rem' }} onClick={() => { handleAcceptRequest(activeAlert.id); setActiveAlert(null); }}>
                    ACCEPT NOW
                  </button>
                  <button className="btn-secondary" style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid #eee', cursor: 'pointer' }} onClick={() => setActiveAlert(null)}>
                    DISMISS
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {fullscreenImageUrl && (
        <div
          className="modal-overlay lightbox-overlay"
          onClick={() => setFullscreenImageUrl(null)}
          style={{ zIndex: 20000, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(0, 31, 63, 0.95)' }}
        >
          <button
            className="lightbox-close"
            onClick={() => setFullscreenImageUrl(null)}
            style={{ position: 'absolute', top: '30px', right: '30px' }}
          >
            ×
          </button>
          <div className="lightbox-content" onClick={e => e.stopPropagation()} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="lightbox-image-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img
                src={fullscreenImageUrl}
                alt="Enlarged profile avatar"
                style={{ maxHeight: '80vh', maxWidth: '90vw', borderRadius: '15px', border: '8px solid #fff', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      )}

      {activeViewPost && (
        <div
          className="modal-overlay"
          onClick={() => setActiveViewPost(null)}
          style={{ zIndex: 10000, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(0,0,0,0.5)' }}
        >
          <div
            className="modal-content post-detail-popup-card-wrapper"
            onClick={e => e.stopPropagation()}
            style={{ padding: '0.8rem', background: '#fff', border: '4px solid var(--text-navy)', borderRadius: '24px', boxShadow: '10px 10px 0 var(--text-navy)', maxWidth: '480px', width: '92vw', position: 'relative' }}
          >
            <button
              className="modal-close"
              onClick={() => setActiveViewPost(null)}
              style={{ position: 'absolute', top: '10px', right: '15px', fontSize: '2rem', border: 'none', background: 'none', cursor: 'pointer', zIndex: 10 }}
            >
              ×
            </button>
            <div className="blog-post-card" style={{ border: 'none', boxShadow: 'none', margin: 0, padding: 0 }}>
              {/* Post Header */}
              <div className="blog-post-header" style={{ padding: '0.8rem 1rem 0.5rem 1rem' }}>
                <div className="blog-post-author" onClick={() => { handleViewUserProfile(activeViewPost.user_id); setActiveViewPost(null); }} style={{ cursor: 'pointer' }}>
                  <div className="author-avatar">
                    <img
                      src={activeViewPost.profiles?.avatar_url || 'icons/user-profile.svg'}
                      alt={activeViewPost.profiles?.full_name || 'User'}
                    />
                  </div>
                  <div className="author-meta">
                    <strong>{activeViewPost.profiles?.full_name || 'Anonymous User'}</strong>
                    <span>{formatPostTimestamp(activeViewPost.created_at)}</span>
                  </div>
                </div>

                {/* Options menu dropdown (3 vertical dots) */}
                <div className="blog-post-menu-container" style={{ position: 'relative' }}>
                  <button className="blog-menu-dots-btn" onClick={(e) => togglePostMenu(activeViewPost.id, e)} title="Options">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <circle cx="12" cy="5" r="2" />
                      <circle cx="12" cy="12" r="2" />
                      <circle cx="12" cy="19" r="2" />
                    </svg>
                  </button>
                  {activePostMenuId === activeViewPost.id && (
                    <div className="blog-post-menu-dropdown" onClick={(e) => e.stopPropagation()}>
                      {(session?.user?.id && (activeViewPost.user_id === session.user.id || user?.role === 'admin')) && (
                        <div className="blog-menu-item delete" onClick={() => { handleDeletePost(activeViewPost.id); setActivePostMenuId(null); setActiveViewPost(null); }}>
                          Delete
                        </div>
                      )}
                      {(session?.user?.id && activeViewPost.user_id === session.user.id) && (
                        <div className="blog-menu-item edit" onClick={() => { handleEditPostCaption(activeViewPost); setActivePostMenuId(null); }}>
                          Edit Caption
                        </div>
                      )}
                      {(!session?.user?.id || activeViewPost.user_id !== session.user.id) && (
                        <div className="blog-menu-item report" onClick={() => { handleReportPost(activeViewPost); setActivePostMenuId(null); }}>
                          Report
                        </div>
                      )}
                      {session?.user?.id && (
                        <div className="blog-menu-item save" onClick={() => { handleSaveToggle(activeViewPost); setActivePostMenuId(null); }}>
                          {savedPostIds.has(activeViewPost.id) ? 'Unsave' : 'Save'}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Render Media */}
              {renderPostMedia(activeViewPost)}

              {/* Footer */}
              <div className="blog-post-footer" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 1rem' }}>
                <button
                  className={`blog-star-btn ${activeViewPost.isStarred ? 'starred' : ''}`}
                  onClick={() => handleStarToggle(activeViewPost.id)}
                  title={activeViewPost.isStarred ? 'Unstar post' : 'Star post'}
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <svg className="star-icon-svg" viewBox="0 0 24 24" width="24" height="24" fill={activeViewPost.isStarred ? "var(--yellow-star)" : "none"} stroke="var(--text-navy)" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </button>

                {activeViewPost.caption && (
                  <div className="blog-post-caption" style={{ margin: 0, flex: 1, textAlign: 'left' }}>
                    <span>{renderCaptionWithMentions(activeViewPost.caption)}</span>
                  </div>
                )}

                {/* Share Button — right side */}
                <div className="blog-share-wrapper" style={{ marginLeft: 'auto' }}>
                  <button
                    className="blog-share-btn"
                    title="Share post"
                    onClick={(e) => { e.stopPropagation(); setActiveSharePostId(activeSharePostId === activeViewPost.id ? null : activeViewPost.id); }}
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </svg>
                  </button>
                  {activeSharePostId === activeViewPost.id && (
                    <div className="blog-share-dropdown" onClick={e => e.stopPropagation()}>
                      <a
                        className="blog-share-option instagram"
                        href={`https://www.instagram.com/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => { navigator.clipboard?.writeText(`${window.location.href} — Check out this post by @mind.empowered on Starlet! 🌟`); setActiveSharePostId(null); }}
                        title="Caption copied to clipboard — paste it into your Instagram post!"
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                        <span>Instagram</span>
                        <span className="blog-share-hint">📋 Copies caption</span>
                      </a>
                      <a
                        className="blog-share-option linkedin"
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${encodeURIComponent((activeViewPost.caption || 'Check out this post on Starlet!') + ' — Follow @mind-empowered for more 🌟')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setActiveSharePostId(null)}
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                          <rect x="2" y="9" width="4" height="12" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                        <span>LinkedIn</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {a11ySettings.readingMask && (
        <>
          <div
            className="a11y-reading-mask-top"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: `${maskY - 45}px`,
              backgroundColor: 'rgba(0, 0, 0, 0.55)',
              pointerEvents: 'none',
              zIndex: 999999
            }}
          />
          <div
            className="a11y-reading-mask-ruler"
            style={{
              position: 'fixed',
              top: `${maskY - 45}px`,
              left: 0,
              width: '100vw',
              height: '90px',
              borderTop: '3px solid var(--pink-primary)',
              borderBottom: '3px solid var(--pink-primary)',
              pointerEvents: 'none',
              zIndex: 999999,
              backgroundColor: 'transparent'
            }}
          />
          <div
            className="a11y-reading-mask-bottom"
            style={{
              position: 'fixed',
              top: `${maskY + 45}px`,
              left: 0,
              width: '100vw',
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.55)',
              pointerEvents: 'none',
              zIndex: 999999
            }}
          />
        </>
      )}

      {/* Floating Accessibility Widget */}
      {!isMenuOpen && !showSplash && (
        <div className="a11y-widget-container" ref={a11yRef}>
          <button
            className="a11y-widget-btn"
            onClick={() => setIsA11yOpen(!isA11yOpen)}
            aria-expanded={isA11yOpen}
            aria-haspopup="dialog"
            aria-label="Accessibility Settings Menu"
            title="Accessibility Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="5" r="2" />
              <path d="m9 22 3-6 3 6" />
              <path d="m6 8 6 2 6-2" />
              <path d="M12 10v6" />
            </svg>
          </button>

          {isA11yOpen && (
            <div className="a11y-widget-panel" role="dialog" aria-modal="true" aria-labelledby="a11y-panel-title">
              <div className="a11y-widget-header">
                <h3 id="a11y-panel-title">Accessibility Tools</h3>
                <button
                  className="a11y-widget-close"
                  onClick={() => setIsA11yOpen(false)}
                  aria-label="Close accessibility tools panel"
                >
                  &times;
                </button>
              </div>

              <div className="a11y-widget-options">
                {/* High Contrast Toggle */}
                <div className="a11y-option-item">
                  <span className="a11y-option-label">High Contrast</span>
                  <label className="a11y-switch">
                    <input
                      type="checkbox"
                      checked={a11ySettings.contrast === 'high-contrast'}
                      onChange={(e) =>
                        setA11ySettings((prev) => ({
                          ...prev,
                          contrast: e.target.checked ? 'high-contrast' : 'default'
                        }))
                      }
                      aria-label="Toggle High Contrast Mode"
                    />
                    <span className="a11y-slider"></span>
                  </label>
                </div>

                {/* Sizing controls */}
                <div className="a11y-option-item">
                  <span className="a11y-option-label">Font Sizing</span>
                  <div className="a11y-font-size-control">
                    <button
                      className="a11y-font-size-btn"
                      onClick={() =>
                        setA11ySettings((prev) => ({
                          ...prev,
                          fontSize: Math.max(80, prev.fontSize - 10)
                        }))
                      }
                      aria-label="Decrease Font Size"
                    >
                      A-
                    </button>
                    <span className="a11y-font-size-value">{a11ySettings.fontSize}%</span>
                    <button
                      className="a11y-font-size-btn"
                      onClick={() =>
                        setA11ySettings((prev) => ({
                          ...prev,
                          fontSize: Math.min(150, prev.fontSize + 10)
                        }))
                      }
                      aria-label="Increase Font Size"
                    >
                      A+
                    </button>
                  </div>
                </div>

                {/* Dyslexia Font Toggle */}
                <div className="a11y-option-item">
                  <span className="a11y-option-label">Dyslexia Font</span>
                  <label className="a11y-switch">
                    <input
                      type="checkbox"
                      checked={a11ySettings.dyslexiaFont}
                      onChange={(e) =>
                        setA11ySettings((prev) => ({
                          ...prev,
                          dyslexiaFont: e.target.checked
                        }))
                      }
                      aria-label="Toggle Dyslexia-Friendly Typography"
                    />
                    <span className="a11y-slider"></span>
                  </label>
                </div>

                {/* Reduced Motion Toggle */}
                <div className="a11y-option-item">
                  <span className="a11y-option-label">Reduced Motion</span>
                  <label className="a11y-switch">
                    <input
                      type="checkbox"
                      checked={a11ySettings.reducedMotion}
                      onChange={(e) =>
                        setA11ySettings((prev) => ({
                          ...prev,
                          reducedMotion: e.target.checked
                        }))
                      }
                      aria-label="Toggle Animation Motion Reductions"
                    />
                    <span className="a11y-slider"></span>
                  </label>
                </div>

                {/* Highlight Links */}
                <div className="a11y-option-item">
                  <span className="a11y-option-label">Highlight Links</span>
                  <label className="a11y-switch">
                    <input
                      type="checkbox"
                      checked={a11ySettings.highlightLinks}
                      onChange={(e) =>
                        setA11ySettings((prev) => ({
                          ...prev,
                          highlightLinks: e.target.checked
                        }))
                      }
                      aria-label="Toggle Link and Button Outlines"
                    />
                    <span className="a11y-slider"></span>
                  </label>
                </div>

                {/* Big Cursor (Desktop Only) */}
                {!isMobile && (
                  <div className="a11y-option-item">
                    <span className="a11y-option-label">Big Cursor</span>
                    <label className="a11y-switch">
                      <input
                        type="checkbox"
                        checked={a11ySettings.bigCursor}
                        onChange={(e) =>
                          setA11ySettings((prev) => ({
                            ...prev,
                            bigCursor: e.target.checked
                          }))
                        }
                        aria-label="Toggle Enlarged Mouse Pointer cursor"
                      />
                      <span className="a11y-slider"></span>
                    </label>
                  </div>
                )}

                {/* Hide Images */}
                <div className="a11y-option-item">
                  <span className="a11y-option-label">Hide Images</span>
                  <label className="a11y-switch">
                    <input
                      type="checkbox"
                      checked={a11ySettings.hideImages}
                      onChange={(e) =>
                        setA11ySettings((prev) => ({
                          ...prev,
                          hideImages: e.target.checked
                        }))
                      }
                      aria-label="Toggle Hide Visual Content Images"
                    />
                    <span className="a11y-slider"></span>
                  </label>
                </div>

                {/* Reading Ruler */}
                <div className="a11y-option-item">
                  <span className="a11y-option-label">Reading Ruler</span>
                  <label className="a11y-switch">
                    <input
                      type="checkbox"
                      checked={a11ySettings.readingMask}
                      onChange={(e) =>
                        setA11ySettings((prev) => ({
                          ...prev,
                          readingMask: e.target.checked
                        }))
                      }
                      aria-label="Toggle Reading Ruler Mask"
                    />
                    <span className="a11y-slider"></span>
                  </label>
                </div>

                {/* Screen Reader (TTS) */}
                <div className="a11y-option-item">
                  <span className="a11y-option-label">Screen Reader (TTS)</span>
                  <label className="a11y-switch">
                    <input
                      type="checkbox"
                      checked={a11ySettings.textToSpeech}
                      onChange={(e) =>
                        setA11ySettings((prev) => ({
                          ...prev,
                          textToSpeech: e.target.checked
                        }))
                      }
                      aria-label="Toggle Screen Reader Text-to-Speech"
                    />
                    <span className="a11y-slider"></span>
                  </label>
                </div>

                {/* Mute Audio Beeps */}
                <div className="a11y-option-item">
                  <span className="a11y-option-label">Mute Audio Beeps</span>
                  <label className="a11y-switch">
                    <input
                      type="checkbox"
                      checked={a11ySettings.muteSound}
                      onChange={(e) =>
                        setA11ySettings((prev) => ({
                          ...prev,
                          muteSound: e.target.checked
                        }))
                      }
                      aria-label="Toggle Sound Effects Muting"
                    />
                    <span className="a11y-slider"></span>
                  </label>
                </div>

                {/* System Notifications */}
                <div className="a11y-option-item">
                  <span className="a11y-option-label">System Notifications</span>
                  <label className="a11y-switch">
                    <input
                      type="checkbox"
                      checked={a11ySettings.systemNotifications}
                      onChange={async (e) => {
                        const checked = e.target.checked;
                        if (checked && 'Notification' in window) {
                          const permission = await Notification.requestPermission();
                          if (permission !== 'granted') {
                            alert('Please enable notification permissions in your browser or device settings.');
                            return;
                          }
                        }
                        setA11ySettings((prev) => ({
                          ...prev,
                          systemNotifications: checked
                        }));
                      }}
                      aria-label="Toggle System Notifications"
                    />
                    <span className="a11y-slider"></span>
                  </label>
                </div>

                {/* Reset Button */}
                <button
                  className="a11y-reset-btn"
                  onClick={() =>
                    setA11ySettings({
                      contrast: 'default',
                      fontSize: 100,
                      reducedMotion: false,
                      dyslexiaFont: false,
                      highlightLinks: false,
                      bigCursor: false,
                      hideImages: false,
                      muteSound: false,
                      readingMask: false,
                      textToSpeech: false,
                      systemNotifications: false
                    })
                  }
                >
                  Reset All Settings
                </button>
              </div>
            </div>
          )}
        </div>
      )}


      {/* QR CHECK-IN SCANNER MODAL */}
      {isScannerOpen && (
        <div className="install-loading-overlay">
          <div className="install-loading-card" style={{ maxWidth: '480px', padding: '2rem' }}>
            <h3 style={{ fontFamily: 'Fredoka One', color: 'var(--text-navy)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>Registration Check-in</h3>
            <p style={{ fontFamily: 'Outfit', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.4' }}>
              Scan an attendee's QR Pass to verify their morning presence and update their hackathon status.
            </p>

            <div id="checkin-qr-reader" style={{ width: '100%', borderRadius: '15px', overflow: 'hidden', border: '3.5px solid var(--text-navy)', background: '#fff' }}></div>

            {scanResult && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: scanResult.success ? 'rgba(37, 211, 102, 0.1)' : 'rgba(229, 62, 98, 0.1)', border: `2.5px solid ${scanResult.success ? '#25D366' : '#e53e3e'}`, borderRadius: '14px', textAlign: 'left' }}>
                <strong style={{ color: 'var(--text-navy)', fontSize: '0.95rem', display: 'block' }}>
                  {scanResult.message}
                </strong>
                {scanResult.user && (
                  <div style={{ marginTop: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {scanResult.user.email} | Status: {scanResult.user.is_approved ? 'Present' : 'Absent'}
                  </div>
                )}
              </div>
            )}

            <button
              className="join-btn"
              style={{ width: '100%', marginTop: '1.5rem', background: '#e53e3e', borderColor: '#e53e3e', boxShadow: 'none' }}
              onClick={async () => {
                if (activeScannerRef.current) {
                  try {
                    await activeScannerRef.current.clear();
                  } catch (err) {
                    console.error('Clear scanner error:', err);
                  }
                  activeScannerRef.current = null;
                }
                setIsScannerOpen(false);
                setScanResult(null);
              }}
            >
              CLOSE SCANNER
            </button>
          </div>
        </div>
      )}

      {/* FEEDBACK POPUP FOR CERTIFICATE CLAIMING */}
      {showFeedbackModal && (
        <div className="modal-overlay" onClick={() => setShowFeedbackModal(false)} style={{ zIndex: 3000 }}>
          <div
            className="mentor-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '650px',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              position: 'relative'
            }}
          >
            <button
              className="modal-close"
              onClick={() => setShowFeedbackModal(false)}
              style={{
                top: '20px',
                right: '25px',
                position: 'absolute',
                background: 'none',
                border: 'none',
                fontSize: '2rem',
                cursor: 'pointer',
                color: 'var(--text-navy)',
                fontWeight: 'bold'
              }}
            >
              ×
            </button>

            <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>✦</div>
              <h2 className="text-3d" style={{ fontSize: '2rem', marginBottom: '0.75rem', color: 'var(--text-navy)', fontFamily: 'Fredoka One' }}>
                Share Your Feedback
              </h2>
              <p style={{ fontFamily: 'Outfit', color: 'var(--text-navy)', opacity: 0.85, fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
                We'd love to hear your thoughts about Starlet 5.0! Please write a quick feedback of at least <strong>100 words</strong> to unlock your certificate downloading dashboard.
              </p>
            </div>

            <div style={{ position: 'relative', width: '100%' }}>
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="What did you think of the venue, mentoring, organizers, food, workshops, and project building? What was your favorite part of Starlet 5.0?"
                style={{
                  width: '100%',
                  height: '220px',
                  padding: '1.2rem',
                  borderRadius: '20px',
                  border: '3.5px solid var(--text-navy)',
                  backgroundColor: '#fffdf9',
                  color: 'var(--text-navy)',
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '0.95rem',
                  resize: 'none',
                  boxShadow: 'inset 4px 4px 0px rgba(0, 31, 63, 0.08)',
                  outline: 'none',
                  lineHeight: '1.5',
                  transition: 'all 0.2s'
                }}
              />

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '0.6rem',
                fontSize: '0.9rem',
                fontFamily: 'Outfit',
                fontWeight: 'bold'
              }}>
                <span style={{ color: 'var(--text-navy)' }}>
                  Word Count:{' '}
                  <span style={{
                    color: getWordCount(feedbackText) >= 100 ? '#10b981' : '#ef4444',
                    fontSize: '1.05rem'
                  }}>
                    {getWordCount(feedbackText)}
                  </span>{' '}
                  / 100
                </span>

                {getWordCount(feedbackText) >= 100 ? (
                  <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ fontSize: '1.1rem' }}>✓</span> Minimum word count reached!
                  </span>
                ) : (
                  <span style={{ color: '#ef4444', fontWeight: '500', opacity: 0.9 }}>
                    Need {100 - getWordCount(feedbackText)} more words
                  </span>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', width: '100%' }}>
              <button
                className="btn-secondary"
                onClick={() => setShowFeedbackModal(false)}
                style={{ flex: 1, padding: '1rem 1.5rem', fontFamily: 'Fredoka One' }}
                disabled={isSubmittingFeedback}
              >
                CANCEL
              </button>
              <button
                className="join-btn"
                onClick={handleSubmitFeedback}
                style={{
                  flex: 2,
                  padding: '1rem 1.5rem',
                  opacity: (getWordCount(feedbackText) >= 100 && !isSubmittingFeedback) ? 1 : 0.5,
                  cursor: (getWordCount(feedbackText) >= 100 && !isSubmittingFeedback) ? 'pointer' : 'not-allowed',
                  background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
                  color: '#001f3f',
                  border: '3.5px solid var(--text-navy)',
                  fontFamily: 'Fredoka One'
                }}
                disabled={getWordCount(feedbackText) < 100 || isSubmittingFeedback}
              >
                {isSubmittingFeedback ? 'SUBMITTING...' : 'SUBMIT & UNLOCK CERTIFICATE ✦'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
