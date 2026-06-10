import { useState } from 'react';

interface InvitationDetailsProps {
  onOpenRSVP: () => void;
}

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);

export const InvitationDetails = ({ onOpenRSVP }: InvitationDetailsProps) => {
  const [isTimelineExpanded, setIsTimelineExpanded] = useState(false);
  
  const handleMapRedirect = () => {
    window.open("https://www.google.com/maps/search/?api=1&query=Grand+Celebration+Hall+Andheri+West+Mumbai", "_blank");
  };

  return (
    <div className="landing-layout">
      {/* Immersive HUD Portrait Area */}
      <div className="portrait-wrapper">
        {/* Radar-like background decorative rings */}
        <div className="hud-radar-ring ring-1"></div>
        <div className="hud-radar-ring ring-2"></div>
        <div className="hud-radar-ring ring-3"></div>

        <div className="portrait-image-container">
          {/* Camera HUD overlays */}
          <div className="hud-tag top-left">[ REC ● ]</div>
          <div className="hud-tag top-right">LVL.21</div>
          <div className="hud-tag bottom-left">SYS.LOC: MUM</div>
          <div className="hud-tag bottom-right">BASH.ID // 0815</div>

          {/* HUD Corner brackets */}
          <div className="hud-corner c-tl"></div>
          <div className="hud-corner c-tr"></div>
          <div className="hud-corner c-bl"></div>
          <div className="hud-corner c-br"></div>

          <img 
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80" 
            alt="Rahul" 
            className="portrait-image"
          />
        </div>

        {/* Ambient Sparkles */}
        <div className="portrait-sparkles">
          <span className="sparkle spot-1">✦</span>
          <span className="sparkle spot-2">✦</span>
          <span className="sparkle spot-3">✦</span>
        </div>
        
        {/* Equalizer Audio Visualizer inside HUD styling */}
        <div className="visualizer-container">
          <span className="viz-label">EQ_ACTV</span>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>

      {/* Details Area styled like a custom cyber deck console */}
      <div className="details-content">
        <div className="title-area">
          <div className="tech-header-label">// SECURE ACCESS GRANTED // BASH_PORT_21</div>
          <h1 className="main-title">
            <span className="outline-text">RAHUL'S</span> 21ST
          </h1>
          <h2 className="sub-title">BIRTHDAY BASH</h2>
          <div className="tech-dress-code">DRESS CODE: NEON CYBERPUNK // BLACK & GOLD CHIC</div>
        </div>

        <div className="fullscreen-grid">
          {/* Date HUD Module */}
          <div className="hud-module">
            <div className="module-header">
              <span className="module-code">REF.DT_15</span>
              <span className="module-led led-cyan"></span>
            </div>
            <div className="module-body">
              <span className="detail-icon"><CalendarIcon /></span>
              <div className="card-text">
                <h3>DATE</h3>
                <p>August 15, 2026</p>
              </div>
            </div>
          </div>

          {/* Time HUD Module */}
          <div className="hud-module">
            <div className="module-header">
              <span className="module-code">REF.TM_07</span>
              <span className="module-led led-pink"></span>
            </div>
            <div className="module-body">
              <span className="detail-icon"><ClockIcon /></span>
              <div className="card-text">
                <h3>TIME</h3>
                <p>7:00 PM Onwards</p>
              </div>
            </div>
          </div>

          {/* Venue HUD Module */}
          <div className="hud-module span-cols">
            <div className="module-header">
              <span className="module-code">REF.LOC_ANDH</span>
              <span className="module-led led-gold"></span>
            </div>
            <div className="module-body">
              <span className="detail-icon"><MapPinIcon /></span>
              <div className="card-text">
                <h3>VENUE</h3>
                <p>Grand Celebration Hall, Andheri West, Mumbai</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cyberpunk Horizontal Timeline Segment - Clickable */}
        <div className="hud-module timeline-module span-cols clickable-timeline" onClick={() => setIsTimelineExpanded(true)}>
          <div className="module-header">
            <span className="module-code">SYSTEM_TIMELINE [CLICK TO EXPAND]</span>
            <span className="module-status-text">STATUS: ACTIVE</span>
          </div>
          <div className="timeline-horizontal-wrapper">
            <div className="timeline-horizontal-item">
              <div className="node-marker"></div>
              <span className="time-tag">19:00 HRS</span>
              <p className="timeline-desc">Red Carpet & Drinks</p>
            </div>
            
            <div className="horizontal-divider"></div>

            <div className="timeline-horizontal-item">
              <div className="node-marker marker-cyan"></div>
              <span className="time-tag tag-cyan">20:30 HRS</span>
              <p className="timeline-desc">VIP Toast & Cake</p>
            </div>

            <div className="horizontal-divider divider-pink"></div>

            <div className="timeline-horizontal-item">
              <div className="node-marker marker-pink"></div>
              <span className="time-tag tag-pink">21:00 HRS</span>
              <p className="timeline-desc">DJ Live Set & Dinner</p>
            </div>
          </div>
        </div>

        {/* Buttons Console */}
        <div className="landing-buttons">
          <button className="glow-btn btn-primary rsvp-trigger" onClick={onOpenRSVP}>
            INITIALIZE RSVP
          </button>
          <button className="glow-btn btn-secondary map-trigger" onClick={handleMapRedirect}>
            NAVIGATE VENUE
          </button>
        </div>
      </div>

      {/* Fullscreen Detailed Timeline Overlay */}
      {isTimelineExpanded && (
        <div className="timeline-overlay">
          <div className="timeline-expanded-content glass-panel">
            <button className="close-btn" onClick={(e) => { e.stopPropagation(); setIsTimelineExpanded(false); }}>&times;</button>
            <div className="tech-header-label">// PORT_21_TIMELINE_DETAILS</div>
            <h2 className="expanded-title">EVENT SCHEDULE</h2>
            
            <div className="expanded-timeline">
              <div className="expanded-timeline-item">
                <span className="expanded-time">19:00 HRS</span>
                <div className="expanded-node node-purple"></div>
                <div className="expanded-text">
                  <h4>RED CARPET ARRIVAL & DRINKS</h4>
                  <p>Welcome drinks and photo session at the neon wall. Meet the guests and grab your signature cocktail.</p>
                </div>
              </div>

              <div className="expanded-timeline-item">
                <span className="expanded-time">20:30 HRS</span>
                <div className="expanded-node node-cyan"></div>
                <div className="expanded-text">
                  <h4>VIP TOAST & CAKE CUTTING</h4>
                  <p>Gather around for the champagne toast, custom projections, and cutting the birthday cake.</p>
                </div>
              </div>

              <div className="expanded-timeline-item">
                <span className="expanded-time">21:00 HRS</span>
                <div className="expanded-node node-pink"></div>
                <div className="expanded-text">
                  <h4>DJ LIVE SET & MIDNIGHT DINNER</h4>
                  <p>The dance floor opens under the laser show. Enjoy the premium gourmet buffet and party until late.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
