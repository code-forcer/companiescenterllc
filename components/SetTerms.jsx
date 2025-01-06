import { useState, useEffect } from 'react';
import Link from 'next/link';

const PrivacyPolicyPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('privacyPolicyAccepted');
    if (!hasAccepted) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 3000); // Show popup after 3 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('privacyPolicyAccepted', 'true');
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '1rem',
        zIndex: 1000,
        textAlign: 'center',
      }}
    >
      <h2>
        Welcome to companiescenterLLC By using this site, you agree to our{' '}
        <Link href="/privacypolicy" style={{ color: '#28a745', textDecoration: 'underline' }}>
          Privacy Policy
        </Link>{' '}
        and{' '}
        <Link href="/terms" style={{ color: '#28a745', textDecoration: 'underline' }}>
          Terms and Conditions
        </Link>.
      </h2>
      <button
        onClick={handleAccept}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Accept
      </button>
    </div>
  );
};

export default PrivacyPolicyPopup;
