import { useEffect, useState } from 'react';

export default function StatusBar() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, '0');
      const m = now.getMinutes().toString().padStart(2, '0');
      setTime(`${h}:${m}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="status-bar">
      <span className="status-time">{time}</span>
      <div className="status-icons">
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
          <path d="M8 2.4C5.6 2.4 3.4 3.4 1.8 5L0 3.2C2.1 1.2 4.9 0 8 0s5.9 1.2 8 3.2L14.2 5C12.6 3.4 10.4 2.4 8 2.4z" />
          <path d="M8 5.6c-1.5 0-2.9.6-3.9 1.6L2.3 5.4C3.7 4 5.8 3.2 8 3.2s4.3.8 5.7 2.2L11.9 7.2C10.9 6.2 9.5 5.6 8 5.6z" />
          <circle cx="8" cy="11" r="2" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
          <rect x="0" y="3" width="3" height="9" rx="1" />
          <rect x="4.5" y="2" width="3" height="10" rx="1" />
          <rect x="9" y="1" width="3" height="11" rx="1" />
          <rect x="13.5" y="0" width="2.5" height="12" rx="1" />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="currentColor">
          <rect x="0" y="1" width="21" height="10" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <rect x="22" y="4" width="3" height="4" rx="1.5" />
          <rect x="2" y="3" width="14" height="6" rx="1.5" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}
