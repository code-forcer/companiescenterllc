import { useState } from 'react';
import { useRouter } from 'next/router';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import styles from '../../styles/AdminAuth.module.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Marquee from '@/components/Marquee';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [role, setRole] = useState('employer'); // Default role as 'Employer'
  const [message, setMessage] = useState(''); // State for displaying messages
  const [messageType, setMessageType] = useState(''); // To style success or error messages
  const [loading, setLoading] = useState(false); // For disabling the button during loading
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); // Disable the button while loading

    const res = await fetch('/api/admin/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, role }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessageType('success');
      setMessage('Registration successful. Redirecting to login page...');
      setTimeout(() => {
        router.push('/admin/login');
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
        <h2 style={{ color: '#102343', textAlign: 'center', fontFamily: 'Roboto', textDecoration: 'underline' }}>
          Register
        </h2>
        <div style={{ textAlign: 'center' }}>
          Get started with us by creating an account with us, fill in the details below appropriately to have an account with us.
        </div>
        <hr />
        <form onSubmit={handleRegister} className={styles.authForm}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.authInput}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.authInput}
          />
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          <h4 style={{ paddingLeft: '5px', textDecoration: 'underline' }}>Role</h4>
          <select
            className={styles.authInput}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="employer">Employer</option>
            <option value="company">Company</option>
          </select>
          <h6>
            <input type="checkbox" name="terms" id="" required /> Consent to our site{' '}
            <span style={{ color: '#0a4', textDecoration: 'underline' }}>
              <a href="/policy" target="_blank">
                Terms and condition policy
              </a>
            </span>
          </h6>
          <p style={{ color: '#000' }}>
            Already have an account?{' '}
            <a href="/admin/login" target="_blank">
              <span style={{ color: '#102343', textDecoration: 'underline' }}>
                <b>Login</b>
              </span>
            </a>
          </p>
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
          <button type="submit" className={styles.authButton} disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        <br />
      </div>
      <Footer />
    </>
  );
}
