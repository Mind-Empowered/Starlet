import React, { useState } from 'react';

const pastSponsors = [
  { name: "Aisat", logo: "sponsors/Aisat.png" },
  { name: "American Inference", logo: "sponsors/American Inference.png" },
  { name: "Civil 20 India", logo: "sponsors/CIVIL 20 INDIA.png" },
  { name: "Foss United", logo: "sponsors/Foss united.png" },
  { name: "Gujarati College", logo: "sponsors/Gujarati collage.jpg" },
  { name: "Kerala Startup Mission", logo: "sponsors/Kerala startup mission.png" },
  { name: "SLBS", logo: "sponsors/SLBS.png" },
  { name: "Samagata", logo: "sponsors/Samagata.jpg" },
  { name: "Tinker Hub", logo: "sponsors/Tinker hub.png" },
  { name: "WiCyS", logo: "sponsors/Wicys.jpg" },
  { name: "ASAP", logo: "sponsors/asap.png" },
  { name: "Prajaahita", logo: "sponsors/prajaahita.png" }
];

const SponsorsPage = ({ onBack }) => {
  const [showLTPopup, setShowLTPopup] = useState(false);
  const [showSynthitePopup, setShowSynthitePopup] = useState(false);
  const [showReccaaPopup, setShowReccaaPopup] = useState(false);
  const [showNSSPopup, setShowNSSPopup] = useState(false);
  const [showWECPopup, setShowWECPopup] = useState(false);
  const [showAikyamPopup, setShowAikyamPopup] = useState(false);
  return (
    <div className="sponsors-overview-container">
      <div className="sponsors-venue-header">
        <h1 className="text-3d">UIC OVERVIEW</h1>
        <p className="handwritten sponsors-overview-subtitle">
          Partner with Starlet 5.0 and empower the next generation of innovators.
        </p>
      </div>

      <div className="sponsors-overview-grid">
        <div className="sponsors-overview-card">
          <h2>Why Sponsor Us?</h2>
          <p>
            Starlet 5.0 is the ultimate innovation marathon dedicated to building technology that empowers women. 
            By sponsoring us, you align your brand with inclusivity, innovation, and youth empowerment. 
            Gain unparalleled access to top talent and showcase your commitment to driving meaningful change.
          </p>
        </div>

        <div className="sponsors-overview-card">
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Our Impact By the Numbers</h2>
          <div className="sponsors-impact-grid">
            <div className="sponsors-impact-card">
              <div className="sponsors-impact-number">400+</div>
              <div className="sponsors-impact-label">Participants</div>
            </div>
            <div className="sponsors-impact-card">
              <div className="sponsors-impact-number">20+</div>
              <div className="sponsors-impact-label">Universities</div>
            </div>
            <div className="sponsors-impact-card">
              <div className="sponsors-impact-number">₹40k+</div>
              <div className="sponsors-impact-label">In Prizes</div>
            </div>
            <div className="sponsors-impact-card">
              <div className="sponsors-impact-number">100%</div>
              <div className="sponsors-impact-label">Women & Non-Binary</div>
            </div>
          </div>
        </div>

        <div className="sponsors-overview-card">
          <h2 style={{ marginBottom: '0.5rem', textAlign: 'center' }}>Sponsorship Pitch</h2>
          <p style={{ marginBottom: '2rem', textAlign: 'center' }}>Grab an opportunity to pitch your brand at our event!</p>
          
          <div className="sponsors-table-wrapper">
            <table className="sponsors-pitch-table">
              <thead>
                <tr>
                  <th>Perks</th>
                  <th>Platinum<br/><span style={{fontSize:'0.9rem', fontWeight:'normal'}}>(Rs. 50,000)</span></th>
                  <th>Gold<br/><span style={{fontSize:'0.9rem', fontWeight:'normal'}}>(Rs. 25,000)</span></th>
                  <th>Silver<br/><span style={{fontSize:'0.9rem', fontWeight:'normal'}}>(Rs. 15,000)</span></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Slot to Speak</td>
                  <td>⭐</td><td></td><td></td>
                </tr>
                <tr>
                  <td>Logo in Website</td>
                  <td>⭐</td><td>⭐</td><td>⭐</td>
                </tr>
                <tr>
                  <td>Logo featured in event Venue (Banners/standees/posters)</td>
                  <td>⭐</td><td>⭐</td><td></td>
                </tr>
                <tr>
                  <td>Logo in meetup announcements, reels and email to attendees</td>
                  <td>⭐</td><td>⭐</td><td>⭐</td>
                </tr>
                <tr>
                  <td>Banner at Refreshment Corner</td>
                  <td>⭐</td><td>⭐</td><td></td>
                </tr>
                <tr>
                  <td>Social Media Shoutout</td>
                  <td>⭐</td><td>⭐</td><td>⭐</td>
                </tr>
                <tr>
                  <td>Provision for Interaction with attendees and distribution of merchandise</td>
                  <td>⭐</td><td></td><td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="sponsors-overview-card padded-large">
          <h2 className="text-3d sponsors-collab-title" style={{ color: 'var(--accent-gold)' }}>Our Sponsors</h2>
          <div className="partners-grid-custom">
            {/* Synthite */}
            <div className="partner-card-wide clickable" onClick={() => setShowSynthitePopup(true)} style={{ margin: 0, padding: '1.5rem 1.5rem 1rem' }}>
              <span className="badge-main" style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%) rotate(-2deg)', zIndex: 2, background: 'var(--pink-primary)' }}>PRIZE SPONSOR</span>
              <img src="collaborators/Synthite.png" alt="Synthite Industries" loading="lazy" style={{ height: '100px', width: 'auto', maxWidth: '100%', objectFit: 'contain', marginTop: '1.2rem' }} />
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.8rem', color: '#555', fontWeight: 'bold', margin: 0 }}>PRIZE SPONSOR</p>
              </div>
            </div>

            {/* Reccaa Club */}
            <div className="partner-card-wide clickable" onClick={() => setShowReccaaPopup(true)} style={{ margin: 0, padding: '1.5rem 1.5rem 1rem' }}>
              <span className="badge-main" style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%) rotate(-2deg)', zIndex: 2, background: 'var(--pink-primary)' }}>SPONSOR</span>
              <img src="collaborators/Reccaa club.png" alt="Reccaa Club" loading="lazy" style={{ height: '145px', width: 'auto', maxWidth: '100%', objectFit: 'contain', marginTop: '0.1rem' }} />
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.8rem', color: '#555', fontWeight: 'bold', margin: 0 }}>SPONSOR</p>
              </div>
            </div>

            {/* Aikyam Space */}
            <div className="partner-card-wide clickable" onClick={() => setShowAikyamPopup(true)} style={{ margin: 0, padding: '1.5rem 1.5rem 1rem' }}>
              <span className="badge-main" style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%) rotate(-2deg)', zIndex: 2, background: 'var(--pink-primary)' }}>SPONSOR</span>
              <img src="collaborators/aikyam.webp" alt="Aikyam Space" loading="lazy" style={{ height: '90px', width: 'auto', maxWidth: '100%', objectFit: 'contain', marginTop: '1.5rem' }} />
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.8rem', color: '#555', fontWeight: 'bold', margin: 0 }}>SPONSOR</p>
              </div>
            </div>
          </div>
        </div>

        <div className="sponsors-overview-card padded-large">
          <h2 className="text-3d sponsors-collab-title">In Collaboration With</h2>
          <div className="partners-grid-custom">
            
            <div className="partner-card-wide partner-card-extra-wide" style={{ margin: 0 }}>
              <span className="badge-main" style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%) rotate(-2deg)', zIndex: 2, background: 'var(--pink-primary)' }}>COLLABORATOR</span>
              <img src="collaborators/adi sankara.png" alt="Adi Shankara" loading="lazy" style={{ height: '110px', width: 'auto', maxWidth: '100%', objectFit: 'contain', marginTop: '1.2rem', marginBottom: '0.2rem' }} />
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.8rem', color: '#555', fontWeight: 'bold', margin: 0 }}>MAIN VENUE PARTNER</p>
              </div>
            </div>

            <div className="partner-card-square collab-nss clickable" onClick={() => setShowNSSPopup(true)} style={{ margin: 0 }}>
              <span className="badge-main" style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%) rotate(-2deg)', zIndex: 2, background: 'var(--pink-primary)' }}>OUTREACH PARTNER</span>
              <div style={{ position: 'absolute', top: '25px', left: '25px', right: '25px', bottom: '25px', overflow: 'hidden', zIndex: 1 }}>
                <img src="collaborators/nss.png" alt="NSS ASIET" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
            </div>

            <div className="partner-card-wide clickable" onClick={() => setShowLTPopup(true)} style={{ margin: 0, padding: '1.5rem 1.5rem 1rem' }}>
              <span className="badge-main" style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%) rotate(-2deg)', zIndex: 2, background: 'var(--pink-primary)' }}>OUTREACH PARTNER</span>
              <img src="collaborators/LT.png" alt="Lenient Tree" loading="lazy" style={{ height: '185px', width: 'auto', maxWidth: '100%', objectFit: 'contain', marginTop: '-1.6rem', marginBottom: '0.2rem' }} />
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.8rem', color: '#555', fontWeight: 'bold', margin: 0 }}>OUTREACH PARTNER</p>
              </div>
            </div>

            <div className="partner-card-wide clickable" onClick={() => setShowWECPopup(true)} style={{ margin: 0, padding: '1.5rem 1.5rem 1rem' }}>
              <span className="badge-main" style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%) rotate(-2deg)', zIndex: 2, background: 'var(--pink-primary)' }}>OUTREACH PARTNER</span>
              <img src="collaborators/Women Empowerement Cell.png" alt="Women Empowerment Cell" loading="lazy" style={{ height: '130px', width: 'auto', maxWidth: '100%', objectFit: 'contain', marginTop: '0.6rem' }} />
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.8rem', color: '#555', fontWeight: 'bold', margin: 0 }}>OUTREACH PARTNER</p>
              </div>
            </div>

          </div>
        </div>

        <div className="sponsors-overview-card padded-large">
          <h2 style={{ textAlign: 'center' }}>Past Sponsors</h2>
          <p style={{ marginBottom: '2rem', textAlign: 'center' }}>
            Empowering our journey year after year. Meet the brands that supported us.
          </p>
          <div className="sponsors-past-grid">
            {pastSponsors.map((sponsor, idx) => {
              const isLargeLogo = [
                "sponsors/Aisat.png",
                "sponsors/CIVIL 20 INDIA.png",
                "sponsors/Foss united.png",
                "sponsors/Kerala startup mission.png",
                "sponsors/SLBS.png",
                "sponsors/Tinker hub.png"
              ].includes(sponsor.logo);

              return (
                <div 
                  key={idx} 
                  className="past-sponsor-placeholder real-sponsor"
                  style={isLargeLogo ? { padding: '0.15rem' } : {}}
                >
                  <img 
                    src={sponsor.logo} 
                    alt={sponsor.name} 
                    loading="lazy"
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '100%', 
                      objectFit: 'contain',
                      opacity: 0.85,
                      transition: 'opacity 0.3s ease',
                      transform: isLargeLogo ? 'scale(1.2)' : 'none'
                    }} 
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="sponsors-overview-card" style={{ overflow: 'hidden' }}>
          <h2>Testimonials</h2>
          <p style={{ marginBottom: '1.5rem' }}>Hear from our past partners and participants.</p>
          
          <div className="sponsors-testimonials-slider">
            {[
              { id: 1, src: 'testimonials/1.mp4' },
              { id: 2, src: 'testimonials/2.mp4' },
              { id: 3, src: 'testimonials/3.mp4' },
              { id: 4, src: 'testimonials/4.png' }
            ].map((item) => (
              <div key={item.id} className={`sponsors-testimonial-card ${!item.src.endsWith('.mp4') ? 'image-testimonial' : ''}`}>
                {item.src.endsWith('.mp4') ? (
                  <video 
                    src={`${item.src}#t=0.001`} 
                    controls 
                    preload="metadata"
                    playsInline
                    className="sponsors-testimonial-video"
                  />
                ) : (
                  <img 
                    src={item.src} 
                    alt="Testimonial" 
                    className="sponsors-testimonial-image"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div onClick={onBack} className="sponsors-back-button">
        ← Back to Home
      </div>

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
                <p className="handwritten" style={{ fontSize: '1.2rem', color: 'var(--accent-gold)', marginTop: '-0.5rem', marginBottom: '1.2rem' }}>
                  Outreach Partner
                </p>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1rem', color: 'var(--text-white)' }}>
                  <strong>Lenient Tree</strong> is a student-driven Web3 & startup community focused on bridging the gap between education and industry.
                </p>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1rem', color: 'var(--text-white)' }}>
                  We enable students to gain real-world exposure through ideathons, hackathons, workshops, portfolio building, and direct collaboration with founders, investors, and ecosystem partners.
                </p>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem', color: 'var(--text-white)' }}>
                  Our mission is to turn ideas into impact by building practical skills, strong networks, and future-ready talent.
                </p>
                
                <div className="modal-footer-brand" style={{ color: 'var(--accent-gold)', marginTop: '2rem' }}>
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
                <p className="handwritten" style={{ fontSize: '1.2rem', color: 'var(--accent-gold)', marginTop: '-0.5rem', marginBottom: '1.2rem' }}>
                  Prize Sponsor
                </p>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1rem', color: 'var(--text-white)' }}>
                  <strong>Synthite Industries Private Limited</strong> is the global leader in spice oleoresins and value-added plant extracts. Combining nature and science, Synthite delivers raw ingredients of the highest quality to the food, fragrance, cosmetic, and pharmaceutical industries worldwide.
                </p>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem', color: 'var(--text-white)' }}>
                  As our **Prize Sponsor**, Synthite is fostering creativity, supporting innovative solutions, and encouraging the next generation of women in tech at Starlet 5.0.
                </p>
                
                <div className="modal-footer-brand" style={{ color: 'var(--accent-gold)', marginTop: '2rem' }}>
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
                <p className="handwritten" style={{ fontSize: '1.2rem', color: 'var(--accent-gold)', marginTop: '-0.5rem', marginBottom: '1.2rem' }}>
                  Sponsor
                </p>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1rem', color: 'var(--text-white)' }}>
                  <strong>Reccaa Club</strong> is a premier social and recreation community club bringing together professionals, families, and organizations to collaborate, connect, and enjoy wellness-driven initiatives.
                </p>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem', color: 'var(--text-white)' }}>
                  We are proud to partner with Starlet 5.0 as a sponsor, lending our support to the empowerment of women through engineering and collaborative innovation.
                </p>
                
                <div className="modal-footer-brand" style={{ color: 'var(--accent-gold)', marginTop: '2rem' }}>
                  Event Sponsor
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
              <div className="modal-visual" style={{ background: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
                <img src="collaborators/aikyam.webp" alt="Aikyam Space" style={{ maxWidth: '80%', height: 'auto', objectFit: 'contain' }} />
              </div>
              <div className="modal-text" style={{ padding: '2.5rem 2rem' }}>
                <h2 className="text-3d" style={{ marginBottom: '0.8rem', fontSize: '2.2rem' }}>Aikyam Space</h2>
                <p className="handwritten" style={{ fontSize: '1.2rem', color: 'var(--accent-gold)', marginTop: '-0.5rem', marginBottom: '1.2rem' }}>
                  Sponsor
                </p>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1rem', color: 'var(--text-white)' }}>
                  <strong>Aikyam Space</strong> is a proudly not-for-profit community initiative in Fort Kochi, Kerala. It provides a warm, open gathering place where local communities learn, share skills, and spark collective action.
                </p>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem', color: 'var(--text-white)' }}>
                  We are proud to have them as a Sponsor for Starlet 5.0, hosting tracks, workshops, and mentoring activities.
                </p>
                
                <div className="modal-footer-brand" style={{ color: 'var(--accent-gold)', marginTop: '2rem' }}>
                  Sponsor
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
                <p className="handwritten" style={{ fontSize: '1.2rem', color: 'var(--accent-gold)', marginTop: '-0.5rem', marginBottom: '1.2rem' }}>
                  Outreach Partner
                </p>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1rem', color: 'var(--text-white)' }}>
                  The **National Service Scheme (NSS) unit at Adi Shankara Institute of Engineering & Technology (ASIET)** is dedicated to community service and social development. Through hands-on community service projects, civic engagement, and social awareness campaigns, NSS volunteers work actively to create positive social impacts.
                </p>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem', color: 'var(--text-white)' }}>
                  As our **Outreach Partner**, NSS ASIET is key in spreading the word, mobilizing resources, and driving participation across campuses to support gender equity and social progress.
                </p>
                
                <div className="modal-footer-brand" style={{ color: 'var(--accent-gold)', marginTop: '2rem' }}>
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
                <p className="handwritten" style={{ fontSize: '1.2rem', color: 'var(--accent-gold)', marginTop: '-0.5rem', marginBottom: '1.2rem' }}>
                  Outreach Partner
                </p>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1rem', color: 'var(--text-white)' }}>
                  The **Women Empowerment Cell** is committed to fostering gender equality, nurturing leadership skills, and creating a supportive environment for female engineering students to unlock their full potential.
                </p>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem', color: 'var(--text-white)' }}>
                  As an **Outreach Partner** for Starlet 5.0, they play a vital role in championing inclusion and mentoring women to drive innovation and claim their space in technology fields.
                </p>
                
                <div className="modal-footer-brand" style={{ color: 'var(--accent-gold)', marginTop: '2rem' }}>
                  Outreach Partner
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SponsorsPage;
