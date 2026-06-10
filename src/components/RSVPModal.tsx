import { useState } from 'react';

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RSVPModal = ({ isOpen, onClose }: RSVPModalProps) => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState(1);
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [wishes, setWishes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    
    // Simulate API request
    setTimeout(() => {
      setFormState('success');
    }, 2000);
  };

  const handleIncrementGuests = () => {
    if (guests < 5) setGuests(prev => prev + 1);
  };

  const handleDecrementGuests = () => {
    if (guests > 1) setGuests(prev => prev - 1);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel">
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        {formState === 'idle' && (
          <form onSubmit={handleSubmit} className="rsvp-form">
            <div className="modal-header">
              <h2 className="modal-title">RSVP to Rahul's 21st</h2>
              <p className="modal-subtitle">Join the main event of the year</p>
            </div>

            {/* Attendance Choice Cards */}
            <div className="attendance-choice">
              <div 
                className={`choice-card yes-card ${attending === 'yes' ? 'selected' : ''}`}
                onClick={() => setAttending('yes')}
              >
                <span className="choice-emoji">🥂</span>
                <span className="choice-title">HELL YES!</span>
                <span className="choice-desc">Party of the year</span>
              </div>
              <div 
                className={`choice-card no-card ${attending === 'no' ? 'selected' : ''}`}
                onClick={() => setAttending('no')}
              >
                <span className="choice-emoji">😢</span>
                <span className="choice-title">SADLY NO</span>
                <span className="choice-desc">Will miss the fun</span>
              </div>
            </div>
            
            <div className="input-group">
              <label>Full Name</label>
              <input 
                type="text" 
                required 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Enter your name"
                className="premium-input"
              />
            </div>
            
            <div className="input-group">
              <label>Phone Number</label>
              <input 
                type="tel" 
                required 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                placeholder="Enter your phone number"
                className="premium-input"
              />
            </div>

            {attending === 'yes' && (
              <div className="input-group guest-selector-box">
                <label>Number of Guests (Including You)</label>
                <div className="guest-controls">
                  <button 
                    type="button" 
                    className="guest-btn" 
                    onClick={handleDecrementGuests}
                    disabled={guests <= 1}
                  >
                    -
                  </button>
                  <span className="guest-display">{guests}</span>
                  <button 
                    type="button" 
                    className="guest-btn" 
                    onClick={handleIncrementGuests}
                    disabled={guests >= 5}
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <div className="input-group">
              <label>Wish Rahul a Happy Birthday!</label>
              <textarea 
                value={wishes} 
                onChange={(e) => setWishes(e.target.value)} 
                placeholder="Leave a message..."
                className="premium-textarea"
                rows={2}
              />
            </div>

            <button type="submit" className="glow-btn btn-primary submit-btn">
              {attending === 'yes' ? 'Secure My Invite ⚡' : 'Send Wishes 🤍'}
            </button>
          </form>
        )}

        {formState === 'submitting' && (
          <div className="modal-status">
            <div className="loader"></div>
            <p className="loading-text">Finalizing your VIP response...</p>
          </div>
        )}

        {formState === 'success' && (
          <div className="modal-status success-anim">
            <div className="success-checkmark">
              <div className="check-icon">
                <span className="icon-line line-tip"></span>
                <span className="icon-line line-long"></span>
                <div className="icon-circle"></div>
                <div className="icon-fix"></div>
              </div>
            </div>
            
            {attending === 'yes' ? (
              <>
                <h2 className="success-title">You're On The List, {name}!</h2>
                <p className="success-message">We've locked in {guests} spot{guests > 1 ? 's' : ''} for you. See you on August 15th! 🥂</p>
              </>
            ) : (
              <>
                <h2 className="success-title">Thank You, {name}!</h2>
                <p className="success-message">We've sent your warm wishes to Rahul. You will be missed! 🤍</p>
              </>
            )}

            <button className="glow-btn btn-secondary close-success-btn" onClick={onClose}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
