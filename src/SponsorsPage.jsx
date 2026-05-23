import React from 'react';

const SponsorsPage = ({ onBack }) => {
  return (
    <div className="sponsors-overview-container" style={{ padding: '120px 5%', minHeight: '100vh' }}>
      <div className="venue-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="text-3d">UIC OVERVIEW</h1>
        <p className="handwritten" style={{ fontSize: '1.5rem', color: 'var(--accent-gold)' }}>
          Partner with Starlet 5.0 and empower the next generation of innovators.
        </p>
      </div>

      <div style={{ display: 'grid', gap: '2rem', width: '100%', color: 'var(--text-white)' }}>
        <div style={{ background: 'var(--glass-bg)', padding: '2rem', borderRadius: '20px', border: '1px solid var(--glass-border)', backdropFilter: 'blur(15px)' }}>
          <h2 style={{ color: 'var(--accent-gold)', marginBottom: '1rem' }}>Why Sponsor Us?</h2>
          <p style={{ lineHeight: '1.6', fontSize: '1.1rem', color: 'var(--text-muted)' }}>
            Starlet 5.0 is the ultimate innovation marathon dedicated to building technology that empowers women. 
            By sponsoring us, you align your brand with inclusivity, innovation, and youth empowerment. 
            Gain unparalleled access to top talent and showcase your commitment to driving meaningful change. 
            Join us to provide credibility to our shared mission.
          </p>
        </div>

        <div style={{ background: 'var(--glass-bg)', padding: '2rem', borderRadius: '20px', border: '1px solid var(--glass-border)', backdropFilter: 'blur(15px)' }}>
          <h2 style={{ color: 'var(--accent-gold)', marginBottom: '1.5rem', textAlign: 'center' }}>Our Impact By the Numbers</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '1.5rem', textAlign: 'center' }}>
            <div style={{ flex: '1 1 200px' }}>
              <div style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--text-white)', textShadow: '0 0 10px var(--accent-blue-light)' }}>400+</div>
              <div style={{ fontSize: '1.1rem', color: 'var(--accent-blue-light)', textTransform: 'uppercase', letterSpacing: '1px' }}>Participants</div>
            </div>
            <div style={{ flex: '1 1 200px' }}>
              <div style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--text-white)', textShadow: '0 0 10px var(--accent-blue-light)' }}>20+</div>
              <div style={{ fontSize: '1.1rem', color: 'var(--accent-blue-light)', textTransform: 'uppercase', letterSpacing: '1px' }}>Universities</div>
            </div>
            <div style={{ flex: '1 1 200px' }}>
              <div style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--text-white)', textShadow: '0 0 10px var(--accent-blue-light)' }}>₹40k+</div>
              <div style={{ fontSize: '1.1rem', color: 'var(--accent-blue-light)', textTransform: 'uppercase', letterSpacing: '1px' }}>In Prizes</div>
            </div>
            <div style={{ flex: '1 1 200px' }}>
              <div style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--text-white)', textShadow: '0 0 10px var(--accent-blue-light)' }}>100%</div>
              <div style={{ fontSize: '1.1rem', color: 'var(--accent-blue-light)', textTransform: 'uppercase', letterSpacing: '1px' }}>Women & Non-Binary</div>
            </div>
          </div>
        </div>

        <div style={{ background: 'var(--glass-bg)', padding: '2rem', borderRadius: '20px', border: '1px solid var(--glass-border)', backdropFilter: 'blur(15px)', overflowX: 'auto' }}>
          <h2 style={{ color: 'var(--accent-gold)', marginBottom: '0.5rem', textAlign: 'center' }}>Sponsorship Pitch</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', textAlign: 'center' }}>Grab an opportunity to pitch your brand at our event!</p>
          
          <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', textAlign: 'center', color: 'var(--text-white)' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--glass-border)' }}>
                <th style={{ padding: '1rem', textAlign: 'left', width: '40%' }}>Perks</th>
                <th style={{ padding: '1rem', color: 'var(--text-navy)', fontSize: '1.2rem' }}>Platinum<br/><span style={{fontSize:'0.9rem', fontWeight:'normal'}}>(Rs. 50,000)</span></th>
                <th style={{ padding: '1rem', color: 'var(--text-navy)', fontSize: '1.2rem' }}>Gold<br/><span style={{fontSize:'0.9rem', fontWeight:'normal'}}>(Rs. 25,000)</span></th>
                <th style={{ padding: '1rem', color: 'var(--text-navy)', fontSize: '1.2rem' }}>Silver<br/><span style={{fontSize:'0.9rem', fontWeight:'normal'}}>(Rs. 15,000)</span></th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <td style={{ padding: '1rem', textAlign: 'left' }}>Slot to Speak</td>
                <td>⭐</td><td></td><td></td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <td style={{ padding: '1rem', textAlign: 'left' }}>Logo in Website</td>
                <td>⭐</td><td>⭐</td><td>⭐</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <td style={{ padding: '1rem', textAlign: 'left' }}>Logo featured in event Venue (Banners/standees/posters)</td>
                <td>⭐</td><td>⭐</td><td></td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <td style={{ padding: '1rem', textAlign: 'left' }}>Logo in meetup announcements, reels and email to attendees</td>
                <td>⭐</td><td>⭐</td><td>⭐</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <td style={{ padding: '1rem', textAlign: 'left' }}>Banner at Refreshment Corner</td>
                <td>⭐</td><td>⭐</td><td></td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <td style={{ padding: '1rem', textAlign: 'left' }}>Social Media Shoutout</td>
                <td>⭐</td><td>⭐</td><td>⭐</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem', textAlign: 'left' }}>Provision for Interaction with attendees and distribution of merchandise</td>
                <td>⭐</td><td></td><td></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ background: 'var(--glass-bg)', padding: '3rem 2rem', borderRadius: '20px', border: '1px solid var(--glass-border)', backdropFilter: 'blur(15px)' }}>
          <h2 className="text-3d" style={{ color: 'var(--text-navy)', marginBottom: '2.5rem', textAlign: 'center', fontSize: '2.2rem' }}>In Collaboration With</h2>
          <div className="partners-grid-custom">
            
            <div className="partner-card-wide" style={{ margin: 0 }}>
              <span className="badge-main" style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%) rotate(-2deg)', zIndex: 2, background: 'var(--pink-primary)' }}>COLLABORATOR</span>
              <img src="/collaborators/adi sankara.png" alt="Adi Shankara" style={{ height: '90px', width: 'auto', objectFit: 'contain', marginTop: '1rem' }} />
              <div style={{ textAlign: 'center' }}>
                <h3 className="text-3d" style={{ fontSize: '1rem', color: 'var(--text-navy)', margin: '0 0 0.2rem 0' }}>ADI SHANKARA</h3>
                <p style={{ fontSize: '0.8rem', color: '#555', fontWeight: 'bold' }}>MAIN VENUE PARTNER</p>
              </div>
            </div>

            <div className="partner-card-square collab-nss" style={{ margin: 0 }}>
              <span className="badge-main" style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%) rotate(-2deg)', zIndex: 2, background: 'var(--pink-primary)' }}>COLLABORATOR</span>
              <img src="/collaborators/nss.png" alt="NSS ASIET" />
            </div>

          </div>
        </div>

        <div style={{ background: 'var(--glass-bg)', padding: '2rem', borderRadius: '20px', border: '1px solid var(--glass-border)', backdropFilter: 'blur(15px)', overflow: 'hidden' }}>
          <h2 style={{ color: 'var(--accent-gold)', marginBottom: '1rem' }}>Testimonials</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Hear from our past partners and participants.</p>
          
          <div style={{ 
            display: 'flex', 
            gap: '1.5rem', 
            overflowX: 'auto', 
            paddingBottom: '1rem',
            scrollbarWidth: 'thin',
            scrollbarColor: 'var(--accent-gold) transparent'
          }}>
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} style={{ 
                flex: '0 0 300px', 
                height: '200px', 
                background: 'rgba(0,0,0,0.4)', 
                borderRadius: '15px', 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                justifyContent: 'center', 
                border: '2px dashed var(--accent-gold)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
              }}>
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  borderRadius: '50%', 
                  background: 'var(--accent-gold)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginBottom: '10px'
                }}>
                  <span style={{ color: 'var(--bg-color)', fontSize: '1.5rem', marginLeft: '5px' }}>▶</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Video Placeholder {i + 1}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div onClick={onBack} style={{ marginTop: '3rem', cursor: 'pointer', color: 'var(--accent-blue-light)', textAlign: 'center', width: '100%' }}>
        ← Back to Home
      </div>
    </div>
  );
};

export default SponsorsPage;
