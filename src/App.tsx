import { useState, useEffect } from 'react';
import { ScratchCard } from './components/ScratchCard';
import { InvitationDetails } from './components/InvitationDetails';
import { RSVPModal } from './components/RSVPModal';
const bgImage = '/birthday-shop.webp';

declare global {
  interface Window {
    confetti: any;
  }
}

function App() {
  const [hasRevealed, setHasRevealed] = useState(false);
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);
  const [introState, setIntroState] = useState<'connecting' | 'granted' | 'done'>('connecting');

  useEffect(() => {
    // Cinematic Intro Sequence
    const timer1 = setTimeout(() => {
      setIntroState('granted');
    }, 2000);
    
    const timer2 = setTimeout(() => {
      setIntroState('done');
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleReveal = () => {
    setHasRevealed(true);
  };

  return (
    <div className={`app-container ${hasRevealed ? 'is-revealed' : ''} ${introState !== 'done' ? 'is-intro' : ''}`}>
      {/* Background Visuals */}
      <div 
        className="bg-image" 
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
      <div className="grid-overlay"></div>
      <div className="noise-filter"></div>
      <div className="ambient-light cursor-light"></div>
      <div className="ambient-light-2"></div>
      <div className="ambient-light-3"></div>
      <div className="ambient-light-4"></div>
      <div className="particles-overlay"></div>

      {/* Live Mission Status Badge */}
      <div className="live-status-badge">
        <span className="status-dot"></span>
        STATUS: ACTIVE
      </div>

      {introState !== 'done' && (
        <div className="intro-sequence">
          {introState === 'connecting' && (
            <div className="loading-screen">
              <div className="scan-line-horizontal"></div>
              <h2 className="typewriter-fast">CONNECTING TO SERVER...</h2>
            </div>
          )}
          {introState === 'granted' && (
            <div className="access-screen">
              <h1 className="glitch-title cyan-glow access-granted">ACCESS GRANTED</h1>
            </div>
          )}
        </div>
      )}

      {/* Main Content */}
      {introState === 'done' && (
        <div className="content-wrapper">
          {!hasRevealed ? (
            <div className="glass-panel main-panel">
              <div className="teaser-header">
                <h1 className="mission-alert-title">NEW MISSION DETECTED</h1>
                <p className="mission-alert-subtext">Your presence is required.</p>
              </div>

              <div className="card-reveal-box">
                <ScratchCard onReveal={handleReveal}>
                  {/* Empty children before reveal, or hidden content */}
                  <div className="hidden-mission-text">MISSION UNLOCKED</div>
                </ScratchCard>
              </div>
            </div>
          ) : (
            <InvitationDetails onOpenRSVP={() => setIsRSVPOpen(true)} />
          )}
        </div>
      )}

      <RSVPModal isOpen={isRSVPOpen} onClose={() => setIsRSVPOpen(false)} />
    </div>
  );
}

export default App;
