import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import styles from '../../styles/AdminAuth.module.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Marquee from '@/components/Marquee';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
  const [message, setMessage] = useState(''); // State for displaying messages
  const [messageType, setMessageType] = useState(''); // To style success or error messages
  const [loading, setLoading] = useState(false); // State for button loading
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Disable button and start loading state

    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessageType('success');
      setMessage('Login successful. Redirecting...');
      localStorage.setItem('token', data.token);
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 2000); // Redirect after 2 seconds
    } else {
      setMessageType('error');
      setMessage(data.message);
    }

    setLoading(false); // Re-enable the button after response
  };

  return (
    <>
      <Header />
      <Marquee />
      <center>
        <img
          src="/radix/avatar.svg"
          style={{ width: '50px', color: '#fff', paddingTop: '20px' }}
          alt=""
        />
      </center>

      <div className={styles.authContainer}>
        <h2 style={{ color: '#102343', textAlign: 'center', fontFamily: 'Roboto', textDecoration: 'underline' }}>Login</h2>
        <div style={{ textAlign: 'center' }}>Fill in the details below to start your session.</div>
        <hr />
        <form onSubmit={handleSubmit} className={styles.authForm}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className={styles.authInput}
          />
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className={styles.authInput}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                color: '#102343',
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {message && (
            <p
              style={{
                color: messageType === 'success' ? 'green' : 'red',
                textAlign: 'center',
                marginTop: '10px',
                fontFamily: 'Roboto',
              }}
            >
              {message}
            </p>
          )}
          <p style={{ color: '#000' }}>
            Don't have an account?{' '}
            <a href="/admin/register" target="_blank">
              <span style={{ color: '#102343' }}>Register</span>
            </a>
          </p>
          <button 
            type="submit" 
            className={styles.authButton} 
            disabled={loading} // Disable button when loading
          >
            {loading ? 'Logging in...' : 'Login'} {/* Change button text while loading */}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
