import React, { useEffect, useState, useRef } from 'react';
import './App.css';

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
    id: 3,
    type: 'tracks',
    title: "Pick Your Track",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
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
    image: "/prizes.png"
  },
  {
    id: 6,
    type: 'prizes',
    title: "Epic Prizes",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/prizes.png"
  },
  { id: 7, type: 'rules', title: "Rules of the Galaxy", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", image: "/rules.png" },
  { id: 8, type: 'mentors', title: "Meet Your Mentors", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", image: "/mentors.png" },
  { id: 9, type: 'community', title: "Make New Friends", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", image: "/community.png" },
  { id: 10, type: 'sponsors', title: "Our Supporters", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", image: "/sponsors.png" },
  { id: 11, type: 'gallery', title: "The Gallery", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", image: "/gallery.png" },
  { id: 12, type: 'faq', title: "Common Doubts", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", image: "/faq.png" },
  { id: 13, type: 'newsletter', title: "Stay Updated", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", image: "/newsletter.png" },
  { id: 14, type: 'contact', title: "Get in Touch", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", image: "/contact.png" }
];

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

function App() {
  const [smoothProgress, setSmoothProgress] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState('landing'); // landing, login, signup, profile
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [faqLimit, setFaqLimit] = useState(3);
  const [user, setUser] = useState({
    name: 'Star Hacker',
    email: 'hacker@starlet.com',
    role: 'Full Stack Wizard',
    team: null, // Test "team not found" state
    venue: 'San Francisco, CA (Main Hub)',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    stack: ['React', 'CSS', 'Figma'],
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
    } catch (e) {}
  };

  const sectionRefs = useRef([]);
  const galleryRef = useRef(null);
  const requestRef = useRef();

  const animate = () => {
    setSmoothProgress(prev => {
      const target = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      const lerpFactor = 0.1;
      return prev + (target - prev) * lerpFactor;
    });
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);

    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    sectionRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      cancelAnimationFrame(requestRef.current);
      observer.disconnect();
    };
  }, [sectionsData, activeView]);

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

  // Floating Sparkle Positions
  const sparkleTop = 20 + (smoothProgress * 60);
  const sparkleLeft = 50 + (Math.sin(smoothProgress * Math.PI * 4) * 10);

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
            <p className="handwritten splash-text">Igniting your creativity... ✨</p>
          </div>
          <div className="splash-footer handwritten">
            <img src="/brand/Mind Empowered.gif" alt="Mind Empowered" style={{ height: '30px', verticalAlign: 'middle', marginRight: '10px', borderRadius: '5px' }} />
            A Mind Empowered Initiative
          </div>
        </div>
      )}

      {/* Floating Sparkles */}
      <div className="sparkle" style={{ top: `${sparkleTop}%`, left: `${sparkleLeft}%` }}>✦</div>
      <div className="sparkle" style={{ top: `${sparkleTop - 10}%`, left: `${sparkleLeft + 20}%`, animationDelay: '0.5s' }}>✧</div>
      <div className="sparkle" style={{ top: `${sparkleTop + 15}%`, left: `${sparkleLeft - 15}%`, animationDelay: '1s' }}>✦</div>

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
                <a href="#" className="join-btn">REGISTER NOW</a>
                <a href="#" className="btn-secondary">LEARN MORE</a>
              </div>


            </section>

            <div className="content-wrapper">
              {sectionsData.map((section, index) => (
                <div
                  key={section.id}
                  id={section.type}
                  className={`section-block ${section.type}-section`}
                  ref={el => sectionRefs.current[index] = el}
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
                          <span className="timeline-desc">Lorem ipsum dolor sit amet, consectetur. 🔥</span>
                        </div>
                        <div className="timeline-event">
                          <span className="timeline-date">June 20th</span>
                          <span className="timeline-desc">Lorem ipsum dolor sit amet, consectetur. <img src="/icons/trophy.svg" className="inline-icon" alt="trophy" /></span>
                        </div>
                      </div>
                    </div>
                  ) : section.type === 'rules' ? (
                    <div className="section-content">
                      <div className="hazard-stripes"></div>
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
                      <h2 className="text-3d" style={{ fontSize: '2.5rem' }}>{section.title}</h2>
                      <div className="gallery-grid">
                        {[
                          "Lorem Ipsum 1", "Lorem Ipsum 2", "Lorem Ipsum 3", "Lorem Ipsum 4",
                          "Lorem Ipsum 5", "Lorem Ipsum 6", "Lorem Ipsum 7", "Lorem Ipsum 8",
                          "Lorem Ipsum 9", "Lorem Ipsum 10", "Lorem Ipsum 11", "Lorem Ipsum 12",
                          "Lorem Ipsum 13", "Lorem Ipsum 14", "Lorem Ipsum 15", "Lorem Ipsum 16",
                          "Lorem Ipsum 17", "Lorem Ipsum 18", "Lorem Ipsum 19", "Lorem Ipsum 20"
                        ].map((caption, i) => (
                          <div key={i} className="polaroid" style={{ "--r": `${(Math.sin(i) * 5).toFixed(1)}deg` }}>
                            <div className="polaroid-img">Coming Soon</div>
                            <div className="polaroid-caption">{caption}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : section.type === 'hall-of-fame' ? (
                    <div className="section-content">
                      <h2 className="text-3d" style={{ fontSize: '2.5rem' }}>{section.title}</h2>
                      <div className="winner-grid">
                        <div className="winner-card">
                          <div className="winner-badge">GOLD WINNER</div>
                          <div className="winner-project-img">✨<span>Project Preview</span></div>
                          <span className="winner-year">STARLET 4.0</span>
                          <h3>Lorem Ipsum Project</h3>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                          <div className="view-project-btn">VIEW CASE STUDY →</div>
                        </div>
                        <div className="winner-card">
                          <div className="winner-badge">LOREM IPSUM</div>
                          <div className="winner-project-img">🎨<span>Project Preview</span></div>
                          <span className="winner-year">STARLET 3.0</span>
                          <h3>Lorem Ipsum Project</h3>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                          <div className="view-project-btn">VIEW CASE STUDY →</div>
                        </div>
                        <div className="winner-card">
                          <div className="winner-badge">LOREM IPSUM</div>
                          <div className="winner-project-img">🌍<span>Project Preview</span></div>
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
                          <h3 className="handwritten social-title">Follow our journey! ✨</h3>
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
                        {mentorsData.map(mentor => (
                          <div key={mentor.id} className="mentor-card" onClick={() => setSelectedMentor(mentor)}>
                            <div className="mentor-photo-wrapper">
                              <img src={mentor.image} alt="mentor" />
                              <div className="mentor-hover-hint">VIEW PROFILE →</div>
                            </div>
                            <h3>{mentor.name}</h3>
                            <p className="mentor-role">{mentor.role}</p>
                            <p className="mentor-company">{mentor.company}</p>
                          </div>
                        ))}
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
          <div className="auth-card">
            <h2 className="text-3d">{activeView === 'login' ? 'Welcome Back!' : 'Join Starlet!'}</h2>
            <form className="auth-form" onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); setActiveView('landing'); }}>
              {activeView === 'signup' && <input type="text" placeholder="Full Name" required />}
              <input type="email" placeholder="Email Address" required />
              <input type="password" placeholder="Password" required />
              <button type="submit" className="join-btn">{activeView === 'login' ? 'LOGIN' : 'SIGN UP'}</button>
            </form>
            <p>
              {activeView === 'login' ? "Don't have an account? " : "Already have an account? "}
              <span onClick={() => setActiveView(activeView === 'login' ? 'signup' : 'login')}>
                {activeView === 'login' ? 'Sign up here' : 'Login here'}
              </span>
            </p>
            <div onClick={() => setActiveView('landing')} style={{ marginTop: '1.5rem', cursor: 'pointer', color: 'var(--blue-shadow)' }}>← Back to Home</div>
          </div>
        </div>
      ) : activeView === 'profile' ? (
        <div className="profile-container">
          <div className="profile-sidebar">
            <div className="profile-avatar" style={{ position: 'relative' }}>
              <img src="/icons/user-profile.svg" alt="avatar" />
              <label className="upload-overlay">
                <input type="file" style={{ display: 'none' }} />
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
              <button className="logout-btn" onClick={() => { setIsLoggedIn(false); setActiveView('landing'); }}>LOGOUT</button>
            </div>
            <div onClick={() => setActiveView('landing')} style={{ marginTop: '2rem', cursor: 'pointer', color: 'var(--blue-shadow)' }}>← Back to Home</div>
          </div>
          <div className="profile-info">
            <div className="profile-field">
              <label>Hacking Role</label>
              <input
                type="text"
                className="profile-input"
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
                placeholder="e.g. Frontend, UI/UX, Backend..."
              />
            </div>
            <div className="profile-field">
              <label>Email & Team</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div>{user.email}</div>
                <div style={{ color: 'var(--text-muted)' }}>|</div>
                {user.team ? (
                  <div className="team-badge">{user.team}</div>
                ) : (
                  <div className="no-team-cta" onClick={() => window.open('https://discord.gg/starlet', '_blank')}>
                    TEAM NOT FOUND? FIND SQUAD →
                  </div>
                )}
              </div>
            </div>
            <div className="profile-field">
              <label>My Tech Stack</label>
              <div className="tech-tag-container">
                {user.stack.map(s => <span key={s} className="tech-tag">{s}</span>)}
                <span className="tech-tag" style={{ opacity: 0.5, cursor: 'pointer' }}>+ Add Tool</span>
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
                <div className="support-btn mentor" onClick={() => alert('Mentor request sent! Stay tuned.')}>
                  REQUEST A MENTOR
                </div>
                <div className="support-btn issue" onClick={() => alert('Our team has been notified. We will reach out soon!')}>
                  REPORT AN ISSUE
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : activeView === 'venue' ? (
        <div className="venue-container">
          <div className="venue-header">
            <h1 className="text-3d">VENUE DETAILS</h1>
            <p className="handwritten">Everything you need to know about where the magic happens! ✨</p>
          </div>

          <div className="venue-grid">
            <div className="venue-card map-section">
              <h2 className="text-3d">Location</h2>
              <div className="map-placeholder">
                <img src="/icons/location.svg" alt="map" className="map-icon" />
                <p>Google Maps Embed would go here</p>
                <div className="venue-address">
                  <strong>Starlet Innovation Hub</strong><br />
                  123 Nebula Lane, Tech City, ST 45678
                </div>
              </div>
              <div className="join-btn" style={{ marginTop: '1.5rem', textAlign: 'center' }}>OPEN IN GOOGLE MAPS</div>
            </div>

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
                  <div className="transport-icon">🚇</div>
                  <div className="transport-info">
                    <h3>Metro (Line 5)</h3>
                    <p>From <strong>Central Station</strong> to <strong>Innovation Park</strong></p>
                    <small>Runs every 10 minutes. 5-minute walk to venue.</small>
                  </div>
                </div>
                <div className="transport-item">
                  <div className="transport-icon">🚌</div>
                  <div className="transport-info">
                    <h3>Shuttle Bus</h3>
                    <p>From <strong>City Plaza</strong> to <strong>Venue Entrance</strong></p>
                    <small>Complimentary for Starlet attendees. Hourly service.</small>
                  </div>
                </div>
                <div className="transport-item">
                  <div className="transport-icon">🚗</div>
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
    </div>
  );
}

export default App;
