import { useEffect, useRef, useState } from 'react';

interface InvitationDetailsProps {
  onOpenRSVP: () => void;
}

export const InvitationDetails = ({ onOpenRSVP }: InvitationDetailsProps) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeNodes, setActiveNodes] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveNodes((prev) => Array.from(new Set([...prev, index])));
          }
        });
      },
      { threshold: 0.8, rootMargin: "-10% 0px -20% 0px" }
    );

    const nodes = document.querySelectorAll('.mobile-experience .timeline-node-item');
    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  const handleMapRedirect = () => {
    window.open("https://www.google.com/maps/search/?api=1&query=Grand+Celebration+Hall+Mumbai", "_blank");
  };

  const timelineEvents = [
    { time: "18:00", title: "AGENT ARRIVAL", desc: "Guests enter venue." },
    { time: "19:00", title: "TARGET ACTIVATED", desc: "Birthday entry cinematic." },
    { time: "20:00", title: "ENERGY LEVEL MAX", desc: "DJ / dance / celebration begins." },
    { time: "21:00", title: "CAKE CEREMONY", desc: "Main celebration event." },
    { time: "22:00", title: "FINAL CHAOS", desc: "Party peak moment." },
  ];

  return (
    <>
      {/* MOBILE EXPERIENCE: Vertical Snap Scroll */}
      <div className="mobile-experience vertical-scroll-container">
        {/* SECTION 1: CHARACTER REVEAL */}
        <section className="scroll-section character-reveal-section">
          <div className="portrait-wrapper cinematic-zoom">
            <div className="hud-radar-ring ring-1"></div>
            <div className="hud-radar-ring ring-2"></div>
            
            <div className="portrait-image-container">
              <div className="hud-tag top-left">[ SYS: TRACKING ]</div>
              <div className="hud-tag top-right">LVL: MAX</div>
              <div className="hud-tag bottom-left">LOC: BOM</div>
              <div className="hud-tag bottom-right">OP // 0815</div>

              <img 
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80" 
                alt="Target Agent" 
                className="portrait-image"
              />
              
              <div className="neon-rim-light"></div>
              <div className="portrait-scan-effect"></div>
            </div>
          </div>
          <div className="scroll-indicator">
            <span>SCROLL FOR INTEL</span>
            <div className="chevron-down"></div>
          </div>
        </section>

        {/* SECTION 2: MISSION TIMELINE */}
        <section className="scroll-section timeline-section">
          <div className="section-header">
            <h2 className="section-title">MISSION OBJECTIVES</h2>
            <div className="section-divider"></div>
          </div>

          <div className="vertical-timeline" ref={timelineRef}>
            <div className="timeline-connecting-line"></div>
            {timelineEvents.map((evt, idx) => {
              const isActive = activeNodes.includes(idx);
              return (
                <div 
                  key={idx} 
                  className={`timeline-node-item ${isActive ? 'is-active' : ''}`}
                  data-index={idx}
                >
                  <div className="timeline-time">{evt.time}</div>
                  <div className="timeline-dot">
                    <div className="dot-inner"></div>
                  </div>
                  <div className="timeline-content">
                    <h3>{evt.title}</h3>
                    <p>{evt.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 3: TARGET LOCATION & RSVP */}
        <section className="scroll-section location-rsvp-section">
          <div className="section-header">
            <h2 className="section-title">TARGET LOCATION</h2>
            <div className="section-divider"></div>
          </div>

          <div className="minimap-container">
            <div className="minimap-overlay"></div>
            <div className="pulsing-pin">
              <div className="pin-core"></div>
              <div className="pin-ring ring-a"></div>
              <div className="pin-ring ring-b"></div>
            </div>
            <div className="minimap-coords">COORD: 19.1136° N, 72.8697° E</div>
          </div>

          <div className="location-details">
            <h3>GRAND CELEBRATION HALL</h3>
            <p>MUMBAI SECTOR 4</p>
          </div>

          <div className="action-buttons-container">
            <button className="glow-btn btn-secondary map-trigger" onClick={handleMapRedirect}>
              TRACK TARGET
            </button>
            <button className="glow-btn btn-primary rsvp-trigger" onClick={onOpenRSVP}>
              ACCEPT MISSION
            </button>
          </div>
        </section>

        {/* SECTION 4: FINAL SCREEN */}
        <section className="scroll-section final-section">
          <div className="final-content">
            <h1 className="glitch-title cyan-glow">SEE YOU AT THE MISSION</h1>
            <div className="tech-dress-code mt-4">END OF TRANSMISSION</div>
          </div>
        </section>
      </div>

      {/* DESKTOP EXPERIENCE: Dashboard Grid Layout */}
      <div className="desktop-experience">
        <div className="desktop-dashboard">
          
          {/* Main Dashboard Header */}
          <div className="dashboard-header">
            <div className="header-title-box">
              <h1 className="dashboard-title glitch-text" data-text="OPERATION: BIRTHDAY NIGHT">OPERATION: BIRTHDAY NIGHT</h1>
              <div className="header-subtitle">SYSTEM COMMAND CENTER // BOM.0815</div>
            </div>
            <div className="system-status-box">
              <div className="status-item">
                <span className="label">SECURITY:</span>
                <span className="value text-green">SECURE</span>
              </div>
              <div className="status-item">
                <span className="label">LINK:</span>
                <span className="value text-cyan">ACTIVE</span>
              </div>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="dashboard-grid">
            
            {/* Left Panel: Character / Portrait */}
            <div className="dashboard-panel portrait-panel">
              <div className="panel-header">
                <span className="panel-title">[ TARGET INTEL ]</span>
                <span className="panel-badge led-pink"></span>
              </div>
              <div className="panel-body">
                <div className="portrait-wrapper">
                  <div className="hud-radar-ring ring-1"></div>
                  <div className="hud-radar-ring ring-2"></div>
                  
                  <div className="portrait-image-container">
                    <div className="hud-tag top-left">[ SYS: TRACKING ]</div>
                    <div className="hud-tag top-right">LVL: MAX</div>
                    <div className="hud-tag bottom-left">LOC: BOM</div>
                    <div className="hud-tag bottom-right">OP // 0815</div>

                    <img 
                      src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80" 
                      alt="Target Agent" 
                      className="portrait-image"
                    />
                    
                    <div className="neon-rim-light"></div>
                    <div className="portrait-scan-effect"></div>
                  </div>
                </div>

                <div className="target-specs">
                  <div className="spec-row">
                    <span className="spec-label">CODENAME</span>
                    <span className="spec-val">BIRTHDAY BOY</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">THREAT LEVEL</span>
                    <span className="spec-val text-pink">MAXIMUM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Panel: Mission Timeline */}
            <div className="dashboard-panel timeline-panel">
              <div className="panel-header">
                <span className="panel-title">[ MISSION OBJECTIVES ]</span>
                <span className="panel-badge led-cyan"></span>
              </div>
              <div className="panel-body">
                <div className="vertical-timeline static-timeline" ref={timelineRef}>
                  <div className="timeline-connecting-line"></div>
                  {timelineEvents.map((evt, idx) => (
                    <div 
                      key={idx} 
                      className="timeline-node-item is-active"
                    >
                      <div className="timeline-time">{evt.time}</div>
                      <div className="timeline-dot">
                        <div className="dot-inner"></div>
                      </div>
                      <div className="timeline-content">
                        <h3>{evt.title}</h3>
                        <p>{evt.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Panel: Map & Actions */}
            <div className="dashboard-panel location-panel">
              <div className="panel-header">
                <span className="panel-title">[ TARGET COORDINATES ]</span>
                <span className="panel-badge led-purple"></span>
              </div>
              <div className="panel-body">
                <div className="minimap-container">
                  <div className="minimap-overlay"></div>
                  <div className="pulsing-pin">
                    <div className="pin-core"></div>
                    <div className="pin-ring ring-a"></div>
                    <div className="pin-ring ring-b"></div>
                  </div>
                  <div className="minimap-coords">COORD: 19.1136° N, 72.8697° E</div>
                </div>

                <div className="location-details">
                  <h3>GRAND CELEBRATION HALL</h3>
                  <p>MUMBAI SECTOR 4</p>
                </div>

                <div className="action-buttons-container">
                  <button className="glow-btn btn-secondary map-trigger" onClick={handleMapRedirect}>
                    TRACK TARGET
                  </button>
                  <button className="glow-btn btn-primary rsvp-trigger" onClick={onOpenRSVP}>
                    ACCEPT MISSION
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Footer banner */}
          <div className="dashboard-footer">
            <span className="footer-status-text">SECURE LINK ESTABLISHED // SYSTEM UPTIME 100%</span>
            <span className="footer-action-text">END OF TRANSMISSION</span>
          </div>

        </div>
      </div>
    </>
  );
};
