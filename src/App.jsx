import React, { useEffect, useState, useRef } from 'react';
import './App.css';

const sectionsData = [
  { 
    id: 1, 
    type: 'mission',
    title: "Who We Are", 
    content: "Starlet 5.0 is a fun and safe hackathon for girls and gender minorities. We want to show you that technology is just a tool for your amazing imagination!",
    image: "https://img.freepik.com/free-vector/hand-drawn-coding-concept-illustration_23-2148810394.jpg?t=st=1713876000~exp=1713879600~hmac=7a5"
  },
  { 
    id: 1, 
    type: 'about',
    title: 'About Mind Empowered',
    content: 'Mind Empowered is a global movement dedicated to closing the gender gap in technology by providing safe spaces for girls to create and innovate.',
    image: '/brand/Logo.png'
  },
  { 
    id: 2, 
    type: 'mission',
    title: "Our Mission", 
    content: "Our mission is to empower 1 million girls by 2030 through hackathons, mentorship, and tech-education.",
    image: "/brand/Logo.png"
  },
  { 
    id: 3, 
    type: 'tracks',
    title: "Pick Your Track", 
    content: "Choose your mission: Creative Art, AI Bots, Tech for Good, or Future of Learning.",
    image: "/brand/Logo.png"
  },
  { 
    id: 4, 
    type: 'timeline',
    title: "The Roadmap", 
    content: "Follow the whiteboard to see our journey from registration to the grand finale!",
    image: "/brand/Logo.png"
  },
  { 
    id: 5, 
    type: 'prizes',
    title: "Epic Prizes", 
    content: "Win $10,000+ in prizes, tech swag, and exclusive mentorship sessions.",
    image: "/prizes.png"
  },
  { 
    id: 6, 
    type: 'rules',
    title: "Rules of the Galaxy", 
    content: "Keep it fair, keep it fun, and keep it safe for everyone.",
    image: "/rules.png"
  },
  { 
    id: 7, 
    type: 'mentors',
    title: "Meet Your Mentors", 
    content: "Get guided by professionals from Google, Meta, and Microsoft.",
    image: "/mentors.png"
  },
  { 
    id: 8, 
    type: 'community',
    title: "Make New Friends", 
    content: "Join 500+ girls worldwide and build your dream team.",
    image: "/community.png"
  },
  { 
    id: 9, 
    type: 'sponsors',
    title: "Our Supporters", 
    content: "The amazing companies making Starlet 5.0 possible.",
    image: "/sponsors.png"
  },
  { 
    id: 10, 
    type: 'gallery',
    title: "The Gallery", 
    content: "Memories from our previous editions.",
    image: "/gallery.png"
  },
  { 
    id: 11, 
    type: 'faq',
    title: "Common Doubts", 
    content: "Everything you need to know about Starlet 5.0.",
    image: "/faq.png"
  },
  { 
    id: 12, 
    type: 'newsletter',
    title: "Stay Updated", 
    content: "Join our newsletter to never miss an update!",
    image: "/newsletter.png"
  },
  { 
    id: 13, 
    type: 'contact',
    title: "Get in Touch", 
    content: "Have a specific question? We are here to help.",
    image: "/contact.png"
  }
];

function App() {
  const [smoothProgress, setSmoothProgress] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState('landing'); // landing, login, signup, profile
  const [user, setUser] = useState({ 
    name: 'Star Hacker', 
    email: 'hacker@starlet.com', 
    team: 'Nebula Squad',
    venue: 'San Francisco, CA (Main Hub)',
    bio: 'I love building things that sparkle and solve problems! ✨',
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
  }, []);

  // Floating Sparkle Positions
  const sparkleTop = 20 + (smoothProgress * 60);
  const sparkleLeft = 50 + (Math.sin(smoothProgress * Math.PI * 4) * 10);

  return (
    <div className="App">
      {/* Floating Sparkles */}
      <div className="sparkle" style={{ top: `${sparkleTop}%`, left: `${sparkleLeft}%` }}>✦</div>
      <div className="sparkle" style={{ top: `${sparkleTop - 10}%`, left: `${sparkleLeft + 20}%`, animationDelay: '0.5s' }}>✧</div>
      <div className="sparkle" style={{ top: `${sparkleTop + 15}%`, left: `${sparkleLeft - 15}%`, animationDelay: '1s' }}>✦</div>

      <header>
        <div className="logo-circle">
          <img src="/public/brand/Logo.png" alt="Starlet Logo" onError={(e) => {e.target.src='/brand/Logo.png'}} />
        </div>

        <nav className="nav-links">
          <a href="#mission" className="nav-link">Mission</a>
          <a href="#tracks" className="nav-link">Tracks</a>
          <a href="#timeline" className="nav-link">Timeline</a>
          <a href="#rules" className="nav-link">Rules</a>
          <a href="#sponsors" className="nav-link">Sponsors</a>
        </nav>

        <div className="mobile-menu-btn">
          <img src="/icons/hamburger.svg" alt="menu" />
        </div>

        <div className="auth-btns">
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
      </header>

      {activeView === 'landing' ? (
        <>
          <main>
          <section className="hero">
          <div className="badge-main">MIND EMPOWERED PRESENTS</div>
          <h1 className="text-3d">STARLET 5.0</h1>
          <div className="subtitle-large">
            A HACKATHON FOR GIRLS AND OTHER GENDER MINORITIES
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
                      <span className="timeline-desc">Registration Opens! <img src="/icons/rocket.svg" className="inline-icon" alt="rocket" /></span>
                    </div>
                    <div className="timeline-event">
                      <span className="timeline-date">June 1st</span>
                      <span className="timeline-desc">Team Formation Mixer <img src="/icons/users.svg" className="inline-icon" alt="users" /></span>
                    </div>
                    <div className="timeline-event">
                      <span className="timeline-date">June 10th</span>
                      <span className="timeline-desc">Workshops & Training <img src="/icons/calendar.svg" className="inline-icon" alt="calendar" /></span>
                    </div>
                    <div className="timeline-event">
                      <span className="timeline-date">June 15th</span>
                      <span className="timeline-desc">Hacking Begins! 🔥</span>
                    </div>
                    <div className="timeline-event">
                      <span className="timeline-date">June 20th</span>
                      <span className="timeline-desc">Grand Finale & Demo <img src="/icons/trophy.svg" className="inline-icon" alt="trophy" /></span>
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
                      <p><strong>NO PLAGIARISM:</strong> Code must be built during the hackathon.</p>
                    </div>
                    <div className="warning-item" style={{"--r": 1.5}}>
                      <div className="warning-icon"><img src="/icons/users.svg" className="card-icon" alt="users" /></div>
                      <p><strong>RESPECT ALL:</strong> Be kind to mentors and teammates.</p>
                    </div>
                    <div className="warning-item" style={{"--r": -0.8}}>
                      <div className="warning-icon"><img src="/icons/calendar.svg" className="card-icon" alt="calendar" /></div>
                      <p><strong>BE ON TIME:</strong> Submissions after the deadline won't be accepted.</p>
                    </div>
                    <div className="warning-item" style={{"--r": 1.2}}>
                      <div className="warning-icon"><img src="/icons/warning.svg" className="card-icon" alt="warning" /></div>
                      <p><strong>STAY SAFE:</strong> Follow our online safety guidelines.</p>
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
                      "Opening Ceremony", "Team Building", "Workshop Hour", "Late Night Hacking",
                      "Mentor Session", "Coffee Break", "UI Design Fun", "Bot Building",
                      "Impact Project", "Pitch Practice", "Global Connection", "Future Leaders",
                      "Code Debugging", "Creative Spark", "Presentation Day", "Winner Reveal",
                      "Celebration", "Tech Swag", "New Friendships", "The Journey"
                    ].map((caption, i) => (
                      <div key={i} className="polaroid" style={{"--r": `${(Math.sin(i) * 5).toFixed(1)}deg`}}>
                        <div className="polaroid-img">📸<span>Coming Soon</span></div>
                        <div className="polaroid-caption">{caption}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : section.type === 'prizes' ? (
                <div className="section-content">
                  <h2 className="text-3d" style={{ fontSize: '2.5rem' }}>{section.title}</h2>
                  <div className="prize-grid">
                    <div className="prize-card">
                      <div className="prize-icon"><img src="/icons/trophy.svg" style={{width: '80px'}} alt="trophy" /></div>
                      <h3 className="text-3d" style={{fontSize: '1.5rem'}}>1st Place</h3>
                      <p>$5,000 + Tech Swag</p>
                    </div>
                    <div className="prize-card">
                      <div className="prize-icon"><img src="/icons/trophy.svg" style={{width: '70px', opacity: 0.7}} alt="trophy" /></div>
                      <h3 className="text-3d" style={{fontSize: '1.5rem'}}>2nd Place</h3>
                      <p>$3,000 + Swag</p>
                    </div>
                    <div className="prize-card">
                      <div className="prize-icon"><img src="/icons/trophy.svg" style={{width: '60px', opacity: 0.5}} alt="trophy" /></div>
                      <h3 className="text-3d" style={{fontSize: '1.5rem'}}>3rd Place</h3>
                      <p>$2,000 + Swag</p>
                    </div>
                  </div>
                </div>
              ) : section.type === 'faq' ? (
                <div className="section-content">
                  <h2 className="text-3d" style={{ fontSize: '2.5rem' }}>{section.title}</h2>
                  <div className="faq-grid">
                    <div className="faq-item">
                      <div className="faq-question">I'm a beginner, can I join?</div>
                      <div className="faq-answer">YES! Starlet is for everyone. We have mentors to help you from step one.</div>
                    </div>
                    <div className="faq-item">
                      <div className="faq-question">Is there a registration fee?</div>
                      <div className="faq-answer">Nope! Starlet 5.0 is completely FREE for everyone.</div>
                    </div>
                    <div className="faq-item">
                      <div className="faq-question">How many people in a team?</div>
                      <div className="faq-answer">Teams can be between 2 to 4 girls.</div>
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
                <p>Empowering the next generation of women in technology through community, creativity, and code.</p>
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
                📍 Your assigned physical location for the event.
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
              <p style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Complete workshops to earn more!</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
