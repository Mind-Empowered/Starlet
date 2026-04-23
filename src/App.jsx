import React, { useEffect, useState, useRef } from 'react';
import './App.css';

const sectionsData = [
  { 
    id: 1, 
    type: 'about',
    title: 'About Mind Empowered',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: '/brand/Logo.png'
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

function App() {
  const [smoothProgress, setSmoothProgress] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState('landing'); // landing, login, signup, profile
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [user, setUser] = useState({ 
    name: 'Star Hacker', 
    email: 'hacker@starlet.com', 
    team: 'Nebula Squad',
    venue: 'San Francisco, CA (Main Hub)',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ✨',
    stack: ['React', 'CSS', 'Figma']
  });
  
  const sectionRefs = useRef([]);
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

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Floating Sparkle Positions
  const sparkleTop = 20 + (smoothProgress * 60);
  const sparkleLeft = 50 + (Math.sin(smoothProgress * Math.PI * 4) * 10);

  return (
    <div className="App">
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
          <div className="splash-footer handwritten">Mind Empowered Initiative</div>
        </div>
      )}

      {/* Floating Sparkles */}
      <div className="sparkle" style={{ top: `${sparkleTop}%`, left: `${sparkleLeft}%` }}>✦</div>
      <div className="sparkle" style={{ top: `${sparkleTop - 10}%`, left: `${sparkleLeft + 20}%`, animationDelay: '0.5s' }}>✧</div>
      <div className="sparkle" style={{ top: `${sparkleTop + 15}%`, left: `${sparkleLeft - 15}%`, animationDelay: '1s' }}>✦</div>

      <header>
        <div className="logo-circle" onClick={() => { setActiveView('landing'); setIsMenuOpen(false); }}>
          <img src="/public/brand/Logo.png" alt="Starlet Logo" onError={(e) => {e.target.src='/brand/Logo.png'}} />
        </div>

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
              <img 
                src="/icons/user-profile.svg" 
                className="nav-profile-btn" 
                alt="profile" 
                onClick={() => setActiveView('profile')}
              />
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
      </header>

      {activeView === 'landing' ? (
        <>
          <main>
          <section className="hero">
          <div className="badge-main">MIND EMPOWERED PRESENTS</div>
          <h1 className="text-3d">STARLET 5.0</h1>
          <div className="subtitle-large">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
          
          <div className="hero-ctas">
            <a href="#" className="join-btn">REGISTER NOW</a>
            <a href="#" className="btn-secondary">LEARN MORE</a>
          </div>

          <div className="illustration-box">
             <img src="/hero.png" alt="Starlet Hero" />
          </div>

              <div className="trust-bar">
                <div className="trust-item"><span>500+</span> HACKERS</div>
                <div className="trust-item"><span>15+</span> COUNTRIES</div>
                <div className="trust-item"><span>$10K</span> PRIZES</div>
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
                    <strong>Note:</strong><br/>
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
                    <div className="warning-item" style={{"--r": -1}}>
                      <div className="warning-icon"><img src="/icons/warning.svg" className="card-icon" alt="warning" /></div>
                      <p><strong>LOREM IPSUM:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <div className="warning-item" style={{"--r": 1.5}}>
                      <div className="warning-icon"><img src="/icons/users.svg" className="card-icon" alt="users" /></div>
                      <p><strong>LOREM IPSUM:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <div className="warning-item" style={{"--r": -0.8}}>
                      <div className="warning-icon"><img src="/icons/calendar.svg" className="card-icon" alt="calendar" /></div>
                      <p><strong>LOREM IPSUM:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <div className="warning-item" style={{"--r": 1.2}}>
                      <div className="warning-icon"><img src="/icons/warning.svg" className="card-icon" alt="warning" /></div>
                      <p><strong>LOREM IPSUM:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                  </div>
                </div>
              ) : section.type === 'sponsors' ? (
                <div className="section-content">
                  <h2 className="text-3d" style={{ fontSize: '2.5rem' }}>{section.title}</h2>
                  <div className="sponsor-grid">
                    {[1,2,3,4,5,6].map(i => (
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
                      <div key={i} className="polaroid" style={{"--r": `${(Math.sin(i) * 5).toFixed(1)}deg`}}>
                        <div className="polaroid-img">📸<span>Coming Soon</span></div>
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
                      <div className="prize-icon"><img src="/icons/trophy.svg" style={{width: '80px'}} alt="trophy" /></div>
                      <h3 className="text-3d" style={{fontSize: '1.5rem'}}>1st Place</h3>
                      <p>Lorem ipsum dolor sit amet</p>
                    </div>
                    <div className="prize-card">
                      <div className="prize-icon"><img src="/icons/trophy.svg" style={{width: '70px', opacity: 0.7}} alt="trophy" /></div>
                      <h3 className="text-3d" style={{fontSize: '1.5rem'}}>2nd Place</h3>
                      <p>Lorem ipsum dolor sit amet</p>
                    </div>
                    <div className="prize-card">
                      <div className="prize-icon"><img src="/icons/trophy.svg" style={{width: '60px', opacity: 0.5}} alt="trophy" /></div>
                      <h3 className="text-3d" style={{fontSize: '1.5rem'}}>3rd Place</h3>
                      <p>Lorem ipsum dolor sit amet</p>
                    </div>
                  </div>
                </div>
              ) : section.type === 'faq' ? (
                <div className="section-content">
                  <h2 className="text-3d" style={{ fontSize: '2.5rem' }}>{section.title}</h2>
                  <div className="faq-grid">
                    <div className="faq-item">
                      <div className="faq-question">Lorem ipsum dolor sit amet?</div>
                      <div className="faq-answer">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                    </div>
                    <div className="faq-item">
                      <div className="faq-question">Lorem ipsum dolor sit amet?</div>
                      <div className="faq-answer">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                    </div>
                    <div className="faq-item">
                      <div className="faq-question">Lorem ipsum dolor sit amet?</div>
                      <div className="faq-answer">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                    </div>
                  </div>
                </div>
              ) : section.type === 'contact' ? (
                <div className="section-content">
                  <h2 className="text-3d" style={{ fontSize: '2.5rem' }}>{section.title}</h2>
                  <div className="contact-form">
                    <input type="text" placeholder="Your Name" />
                    <input type="email" placeholder="Your Email" />
                    <textarea placeholder="How can we help?"></textarea>
                    <button className="join-btn" style={{width: 'fit-content'}}>SEND MESSAGE</button>
                  </div>
                </div>
              ) : section.type === 'newsletter' ? (
                <div className="section-content" style={{textAlign: 'center'}}>
                  <h2 className="text-3d" style={{ fontSize: '2.5rem' }}>{section.title}</h2>
                  <p style={{color: '#fff'}}>{section.content}</p>
                  <div className="newsletter-input-group">
                    <input type="email" placeholder="Enter your email" />
                    <button className="btn">SUBSCRIBE</button>
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
            <div className="footer-grid">
              <div className="footer-brand">
                <div className="logo-circle">
                  <img src="/public/brand/Logo.png" alt="Starlet Logo" onError={(e) => {e.target.src='/brand/Logo.png'}} />
                </div>
                <h3>STARLET 5.0</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>

              <div className="footer-col">
                <h4>Quick Links</h4>
                <ul>
                  <li><div onClick={() => setActiveView('landing')} style={{cursor: 'pointer'}}>Home</div></li>
                  <li><a href="#mission">Our Mission</a></li>
                  <li><a href="#tracks">Tracks</a></li>
                  <li><a href="#timeline">Timeline</a></li>
                </ul>
              </div>

              <div className="footer-col">
                <h4>Community</h4>
                <ul>
                  <li><a href="#">Discord Server</a></li>
                  <li><a href="#">Code of Conduct</a></li>
                  <li><a href="#">Mentorship</a></li>
                </ul>
              </div>

              <div className="footer-col">
                <h4>Contact</h4>
                <ul>
                  <li><a href="mailto:hello@mind-empowered.org">hello@mind-empowered.org</a></li>
                  <li><a href="https://mind-empowered.org">Website</a></li>
                </ul>
              </div>
            </div>

            <div className="footer-bottom">
              <p>&copy; 2026 Starlet 5.0 | Mind Empowered Initiative</p>
              <p>Made with ❤️ for Every Woman</p>
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
            <div onClick={() => setActiveView('landing')} style={{marginTop: '1.5rem', cursor: 'pointer', color: 'var(--blue-shadow)'}}>← Back to Home</div>
          </div>
        </div>
      ) : activeView === 'profile' ? (
        <div className="profile-container">
          <div className="profile-sidebar">
            <div className="profile-avatar" style={{position: 'relative'}}>
              <img src="/icons/user-profile.svg" alt="avatar" />
              <label className="upload-overlay">
                <input type="file" style={{display: 'none'}} />
                ✎
              </label>
            </div>
            <h2 className="text-3d">{user.name}</h2>
            <div className="profile-field" style={{marginTop: '2rem'}}>
              <label>Hacker Bio</label>
              <textarea 
                value={user.bio} 
                onChange={(e) => setUser({...user, bio: e.target.value})}
                placeholder="Tell us about yourself..."
              />
            </div>
            <button className="logout-btn" onClick={() => { setIsLoggedIn(false); setActiveView('landing'); }}>LOGOUT</button>
            <div onClick={() => setActiveView('landing')} style={{marginTop: '2rem', cursor: 'pointer', color: 'var(--blue-shadow)'}}>← Back to Home</div>
          </div>
          <div className="profile-info">
            <div className="profile-field">
              <label>Hacking Venue</label>
              <div>{user.venue}</div>
              <p style={{fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem'}}>
                📍 Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <div className="profile-field">
              <label>Email & Team</label>
              <div>{user.email} | {user.team}</div>
            </div>
            <div className="profile-field">
              <label>My Tech Stack</label>
              <div className="tech-tag-container">
                {user.stack.map(s => <span key={s} className="tech-tag">{s}</span>)}
                <span className="tech-tag" style={{opacity: 0.5, cursor: 'pointer'}}>+ Add Tool</span>
              </div>
            </div>
            <div className="profile-field">
              <label>Hackathon Points</label>
              <div style={{fontSize: '2rem'}}>1,250 🌟</div>
              <p style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Lorem ipsum dolor sit amet!</p>
            </div>
          </div>
        </div>
      ) : null}

      <div className={`scroll-top-btn ${showScrollTop ? 'visible' : ''}`} onClick={scrollToTop}>
        <img src="/icons/rocket.svg" alt="top" />
      </div>
    </div>
  );
}

export default App;
