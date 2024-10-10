import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/AdminAuth.module.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Marquee from '@/components/Marquee';

 export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employer'); // Default role as 'Employer'
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/admin/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, role }),
    });

    if (res.ok) {
      router.push('/admin/login');
    } else {
      const data = await res.json();
      alert(data.message);
    }
  };


  return (
    <>
      <Header />
      <Marquee/>
    <center><img src="/radix/avatar.svg" style={{ width: "50px", color: '#fff', paddingTop: '20px' }} alt="" /></center> 
           
    <div className={styles.authContainer}>
          <h2 style={{ color: '#102343', textAlign: 'center', fontFamily:'Oswald'}}>Register</h2>
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
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.authInput}
          />
          <h4 style={{paddingLeft:'5px',textDecoration:'underline'}}>Role</h4>
          <select  className={styles.authInput} value={role} onChange={(e) => setRole(e.target.value)} required>
        <option value="employer">Employer</option>
        <option value="company">Company</option>
          </select>
          <h6> <input type="checkbox" name="terms" id="" required /> Consent to our site <span style={{color:'#0a4',textDecoration:'underline'}}><a href='/policy' target='_blank'> Terms and condition policy</a></span></h6>
         <p style={{color:'#000'}}>Already have an account? <a href="/admin/login" target='_blank'><span style={{color:'#102343',textDecoration:'underline'}}><b>Login</b></span> </a></p>
        <button type="submit" className={styles.authButton}><b>Sign Up</b></button>
      </form><br />
   
      </div>
         <Footer/>
      </>
  );
};
