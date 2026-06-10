import { useState, useEffect } from 'react';
import { ScratchCard } from './components/ScratchCard';
import { InvitationDetails } from './components/InvitationDetails';
import { RSVPModal } from './components/RSVPModal';
// @ts-ignore
import bgImage from '../../birthday-shop.webp';

declare global {
  interface Window {
    confetti: any;
  }
}

function App() {
  const [hasRevealed, setHasRevealed] = useState(false);
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);

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
    
    // Trigger epic confetti explosion from both sides multiple times
    if (window.confetti) {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, animate a bit higher than they would
        window.confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        window.confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
      }, 250);
    }
  };

  return (
    <div className={`app-container ${hasRevealed ? 'is-revealed' : ''}`}>
      {/* Background Visuals */}
      <div 
        className="bg-image" 
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
      <div className="ambient-light cursor-light"></div>
      <div className="ambient-light-2"></div>
      <div className="bokeh-overlay"></div>

      {/* Main Content */}
      <div className="content-wrapper">
        <div className="glass-panel main-panel">
          
          {!hasRevealed && (
            <div className="teaser-header">
              <p className="scratch-instruction">
                🎉 YOU ARE INVITED 🎉<br />
                <span>Scratch the card to unlock the experience</span>
              </p>
            </div>
          )}

          <div className="card-reveal-box">
            <ScratchCard onReveal={handleReveal}>
              <InvitationDetails onOpenRSVP={() => setIsRSVPOpen(true)} />
            </ScratchCard>
          </div>

        </div>
      </div>

      <RSVPModal isOpen={isRSVPOpen} onClose={() => setIsRSVPOpen(false)} />
    </div>
  );
}

export default App;
