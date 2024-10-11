import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/AdminAuth.module.css';
import Logout from '@/components/Logout';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import axios from 'axios';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [companyPrice, setCompanyPrice] = useState('');
  const [companyImage, setCompanyImage] = useState(null);
  const [companyLocation, setCompanyLocation] = useState('');
  const [companyMapUrl, setCompanyMapUrl] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [companyContact, setCompanyContact] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!companyName || !companyImage) {
      setError('Please provide both a company name and an image.');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(companyImage);
    reader.onloadend = async () => {
      const base64Image = reader.result;

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName,
          companyDescription,
          companyPrice,
          companyLocation,
          companyMapUrl,
          companyWebsite,
          companyContact,
          companyImage: base64Image,
        }),
      });

      if (res.status === 201) {
        setSuccess('Company information uploaded successfully!');
        setCompanyName('');
        setCompanyDescription('');
        setCompanyPrice('');
        setCompanyImage(null);
        setCompanyLocation('');
        setCompanyMapUrl('');
        setCompanyWebsite('');
        setCompanyContact('');
      } else {
        const data = await res.json();
        setError(data.error);
      }
    };

    reader.onerror = () => {
      setError('Failed to read the file.');
    };
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    const fetchUserData = async () => {
      const response = await fetch('/api/getuserdetails', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        localStorage.removeItem('token');
        router.push('/admin/login');
      }
    };

    fetchUserData();
  }, [router]);

  return (
    user && (
      <>
        <Header />
        <div className={styles.authContainer}>
          <h1 className={styles.title}>
            Dashboard: Welcome, <span style={{ textDecoration: 'capitalize' }}>{user.name}</span>
          </h1>
          <h5 style={{ color: '#ce1212', float: 'right', textDecoration: 'underline' }}>
            <b>
              <span style={{ textDecoration: 'capitalize' }}>{user.role}</span> <img src="/radix/fire.svg" width={'30px'} alt="Fire Icon" />
            </b>
          </h5>
          <small style={{ textAlign: 'center', fontWeight: 'bold' }}>Welcome to your mini-dashboard</small>

          <form onSubmit={handleUpload} className={styles.uploadForm}>
            <input
              type="text"
              placeholder="Company's Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className={styles.authInput}
            />
            <textarea
              rows="5"
              cols="5"
              placeholder="Company's Description"
              value={companyDescription}
              onChange={(e) => setCompanyDescription(e.target.value)}
              className={styles.authInput}
            />
            <input
              type="number"
              placeholder="Company's Price"
              value={companyPrice}
              onChange={(e) => setCompanyPrice(e.target.value)}
              className={styles.authInput}
            />
            <input
              type="text"
              placeholder="Company's Location"
              value={companyLocation}
              onChange={(e) => setCompanyLocation(e.target.value)}
              className={styles.authInput}
            />
            <input
              type="text"
              placeholder="Company's Map URL"
              value={companyMapUrl}
              onChange={(e) => setCompanyMapUrl(e.target.value)}
              className={styles.authInput}
            />
            <input
              type="text"
              placeholder="Company's Website URL"
              value={companyWebsite}
              onChange={(e) => setCompanyWebsite(e.target.value)}
              className={styles.authInput}
            />
            <input
              type="text"
              placeholder="Company's Contact Information"
              value={companyContact}
              onChange={(e) => setCompanyContact(e.target.value)}
              className={styles.authInput}
            />
            <h4>Company's Image/Banner: <small>size in kbs</small></h4>
            <input
              type="file"
              onChange={(e) => setCompanyImage(e.target.files[0])}
              className={styles.authInput}
              accept="image/*"
            />
            {error && <p className={styles.errorMessage}>{error}</p>}
            {success && <p className={styles.successMessage}>{success}</p>}
            <button type="submit" className={styles.authButton}>Submit</button>
          </form>

          <Logout />
        </div>
        <Footer />
      </>
    )
  );
}
