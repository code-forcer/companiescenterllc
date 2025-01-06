import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/Profile.module.css';
import MenusideBar from '@/components/MenuSideBar';
import Footer from '@/components/Footer';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('User is not authenticated');
          setLoading(false);
          return;
        }

        const response = await axios.get('/api/getuserdetails', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setUser(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

    return (
      <>
      <div className={styles.container}>
      <MenusideBar userRole={user.role} />
      <h1 className={styles.title}>User Profile</h1>
      {user ? (
        <div className={styles.profileCard}>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      ) : (
        <p className={styles.noData}>No user data available.</p>
      )}
            </div>
            <Footer/>
    </>
  );
}
