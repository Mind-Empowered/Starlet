import React from 'react';

const SponsorsPage = ({ onBack }) => {
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
            Join us to provide credibility to our shared mission.
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

        <div className="sponsors-overview-card" style={{ overflowX: 'auto' }}>
          <h2 style={{ marginBottom: '0.5rem', textAlign: 'center' }}>Sponsorship Pitch</h2>
          <p style={{ marginBottom: '2rem', textAlign: 'center' }}>Grab an opportunity to pitch your brand at our event!</p>
          
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

        <div className="sponsors-overview-card padded-large">
          <h2 className="text-3d sponsors-collab-title">In Collaboration With</h2>
          <div className="partners-grid-custom">
            
            <div className="partner-card-wide" style={{ margin: 0 }}>
              <span className="badge-main" style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%) rotate(-2deg)', zIndex: 2, background: 'var(--pink-primary)' }}>COLLABORATOR</span>
              <img src="collaborators/adi sankara.png" alt="Adi Shankara" loading="lazy" style={{ height: '90px', width: 'auto', maxWidth: '100%', objectFit: 'contain', marginTop: '1.5rem' }} />
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.8rem', color: '#555', fontWeight: 'bold', margin: 0 }}>MAIN VENUE PARTNER</p>
              </div>
            </div>

            <div className="partner-card-wide" style={{ margin: 0 }}>
              <span className="badge-main" style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%) rotate(-2deg)', zIndex: 2, background: 'var(--pink-primary)' }}>COLLABORATOR</span>
              <img src="collaborators/aikyam.webp" alt="Aikyam Space" loading="lazy" style={{ height: '90px', width: 'auto', maxWidth: '100%', objectFit: 'contain', marginTop: '1.5rem' }} />
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.8rem', color: '#555', fontWeight: 'bold', margin: 0 }}>VENUE PARTNER</p>
              </div>
            </div>

            <div className="partner-card-square collab-nss" style={{ margin: 0 }}>
              <span className="badge-main" style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%) rotate(-2deg)', zIndex: 2, background: 'var(--pink-primary)' }}>COLLABORATOR</span>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', borderRadius: '26px', zIndex: 1 }}>
                <img src="collaborators/nss.png" alt="NSS ASIET" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
            {Array.from({ length: 20 }).map((_, i) => {
              const hasRealSponsor = i < 3;
              return (
                <div 
                  key={i} 
                  className={`past-sponsor-placeholder ${hasRealSponsor ? 'real-sponsor' : 'placeholder-sponsor'}`}
                >
                  {hasRealSponsor ? (
                    <img 
                      src={`sponsors/${i + 1}.png`} 
                      alt={`Sponsor ${i + 1}`} 
                      loading="lazy"
                      style={{ 
                        maxWidth: '100%', 
                        maxHeight: '100%', 
                        objectFit: 'contain',
                        opacity: 0.85,
                        transition: 'opacity 0.3s ease'
                      }} 
                    />
                  ) : (
                    `Sponsor #${i + 1}`
                  )}
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
              { id: 2, src: 'testimonials/2.mp4' }
            ].map((video) => (
              <div key={video.id} className="sponsors-testimonial-card">
                <video 
                  src={video.src} 
                  controls 
                  preload="metadata"
                  className="sponsors-testimonial-video"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div onClick={onBack} className="sponsors-back-button">
        ← Back to Home
      </div>
    </div>
  );
};

export default SponsorsPage;
