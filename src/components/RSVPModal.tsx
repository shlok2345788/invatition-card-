import { useState } from 'react';

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RSVPModal = ({ isOpen, onClose }: RSVPModalProps) => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [name, setName] = useState('');
  const [callsign, setCallsign] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [squadSize, setSquadSize] = useState(1);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    
    setTimeout(() => {
      setFormState('success');
    }, 2000);
  };

  const handleIncrement = () => {
    if (squadSize < 5) setSquadSize(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (squadSize > 1) setSquadSize(prev => prev - 1);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel terminal-border">
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        {formState === 'idle' && (
          <form onSubmit={handleSubmit} className="rsvp-form">
            <div className="modal-header">
              <h2 className="modal-title glitch-text">MISSION REGISTRATION</h2>
              <p className="modal-subtitle">Confirm your operative status</p>
            </div>

            <div className="attendance-choice">
              <div 
                className={`choice-card yes-card ${attending === 'yes' ? 'selected' : ''}`}
                onClick={() => setAttending('yes')}
              >
                <span className="choice-icon">✓</span>
                <span className="choice-title">ACCEPT DIRECTIVE</span>
              </div>
              <div 
                className={`choice-card no-card ${attending === 'no' ? 'selected' : ''}`}
                onClick={() => setAttending('no')}
              >
                <span className="choice-icon">✕</span>
                <span className="choice-title">ABORT MISSION</span>
              </div>
            </div>
            
            <div className="input-group">
              <label>OPERATIVE NAME</label>
              <input 
                type="text" 
                required 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Enter Identity..."
                className="premium-input"
              />
            </div>
            
            <div className="input-group">
              <label>CALLSIGN (OPTIONAL)</label>
              <input 
                type="text" 
                value={callsign} 
                onChange={(e) => setCallsign(e.target.value)} 
                placeholder="Enter Alias..."
                className="premium-input"
              />
            </div>

            {attending === 'yes' && (
              <div className="input-group guest-selector-box">
                <label>SQUAD SIZE (INCLUDING YOU)</label>
                <div className="guest-controls">
                  <button 
                    type="button" 
                    className="guest-btn" 
                    onClick={handleDecrement}
                    disabled={squadSize <= 1}
                  >
                    -
                  </button>
                  <span className="guest-display">{squadSize}</span>
                  <button 
                    type="button" 
                    className="guest-btn" 
                    onClick={handleIncrement}
                    disabled={squadSize >= 5}
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <button type="submit" className="glow-btn btn-primary submit-btn">
              {attending === 'yes' ? 'INITIALIZE LINK ⚡' : 'TRANSMIT APOLOGY 🚫'}
            </button>
          </form>
        )}

        {formState === 'submitting' && (
          <div className="modal-status">
            <div className="loader-cyber"></div>
            <p className="loading-text type-anim">ENCRYPTING RESPONSE...</p>
          </div>
        )}

        {formState === 'success' && (
          <div className="modal-status success-anim">
            <div className="success-checkmark cyber-check">
              ✓
            </div>
            
            {attending === 'yes' ? (
              <>
                <h2 className="success-title">CREDENTIALS ACCEPTED</h2>
                <p className="success-message">Agent {callsign || name}, your {squadSize} member squad is cleared for entry. Standby for further instructions.</p>
              </>
            ) : (
              <>
                <h2 className="success-title">TRANSMISSION SENT</h2>
                <p className="success-message">Agent {callsign || name}, we acknowledge your absence. Operation will proceed.</p>
              </>
            )}

            <button className="glow-btn btn-secondary close-success-btn" onClick={onClose}>
              CLOSE TERMINAL
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
