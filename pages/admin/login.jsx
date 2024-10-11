import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/AdminAuth.module.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Marquee from '@/components/Marquee';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      router.push('/admin/dashboard');
    } else {
      alert(data.message);
    }
  };

  return (
    <>
      <Header />
      <Marquee/>
            <center><img src="/radix/avatar.svg" style={{ width: "50px", color: '#fff', paddingTop: '20px' }} alt="" /></center> 
           
    <div className={styles.authContainer}>
          <h2 style={{ color: '#102343', textAlign: 'center', fontFamily:'Oswald'}}>Login</h2>
       <form onSubmit={handleSubmit} className={styles.authForm}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
            required
            className={styles.authInput}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
            required
            className={styles.authInput}
      />
                     <p style={{color:'#000'}}>Don't have an account? <a href="/admin/register" target='_blank'><span style={{color:'#102343'}}>Register</span> </a></p>
        <button type="submit" className={styles.authButton}>Login</button>
      </form>
      </div>
      <Footer/>
          </>
  );
};

