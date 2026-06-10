interface InvitationDetailsProps {
  onOpenRSVP: () => void;
}

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);

export const InvitationDetails = ({ onOpenRSVP }: InvitationDetailsProps) => {
  const handleMapRedirect = () => {
    window.open("https://www.google.com/maps/search/?api=1&query=Grand+Celebration+Hall+Andheri+West+Mumbai", "_blank");
  };

  return (
    <div className="landing-layout">
      {/* Visual Portrait overlapping the details container */}
      <div className="portrait-wrapper">
        <div className="portrait-glow-ring"></div>
        <div className="portrait-image-container">
          <img 
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80" 
            alt="Rahul" 
            className="portrait-image"
          />
        </div>
        <div className="portrait-sparkles">
          <span className="sparkle spot-1">✦</span>
          <span className="sparkle spot-2">✦</span>
          <span className="sparkle spot-3">✦</span>
        </div>
        
        {/* Subtle music visualizer attached to the image */}
        <div className="visualizer-container">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>

      <div className="details-content">
        <div className="title-area">
          <h1 className="main-title">RAHUL'S 21ST</h1>
          <h2 className="sub-title">BIRTHDAY BASH</h2>
        </div>

        <div className="fullscreen-grid">
          <div className="glass-card detail-card">
            <span className="detail-icon"><CalendarIcon /></span>
            <div className="card-text">
              <h3>DATE</h3>
              <p>August 15, 2026</p>
            </div>
          </div>

          <div className="glass-card detail-card">
            <span className="detail-icon"><ClockIcon /></span>
            <div className="card-text">
              <h3>TIME</h3>
              <p>7:00 PM Onwards</p>
            </div>
          </div>

          <div className="glass-card detail-card span-cols">
            <span className="detail-icon"><MapPinIcon /></span>
            <div className="card-text">
              <h3>VENUE</h3>
              <p>Grand Celebration Hall, Andheri West, Mumbai</p>
            </div>
          </div>
        </div>

        {/* Additional Custom Section: Event Schedule */}
        <div className="schedule-section glass-card span-cols">
          <h3>PARTY TIMELINE</h3>
          <div className="timeline">
            <div className="timeline-item">
              <span className="time">07:00 PM</span>
              <span className="event">Red Carpet & Drinks</span>
            </div>
            <div className="timeline-item">
              <span className="time">08:30 PM</span>
              <span className="event">Cake Cutting Ceremony</span>
            </div>
            <div className="timeline-item">
              <span className="time">09:00 PM</span>
              <span className="event">DJ Set & Dinner</span>
            </div>
          </div>
        </div>

        {/* Additional Custom Section: Dress Code */}
        <div className="dress-code-badge glass-card span-cols">
          <span className="badge-title">DRESS CODE:</span>
          <span className="badge-text">Neon Cyberpunk / Black & Gold Chic</span>
        </div>

        <div className="landing-buttons">
          <button className="glow-btn btn-primary rsvp-trigger" onClick={onOpenRSVP}>
            RSVP NOW
          </button>
          <button className="glow-btn btn-secondary map-trigger" onClick={handleMapRedirect}>
            GOOGLE MAPS
          </button>
        </div>
      </div>
    </div>
  );
};
