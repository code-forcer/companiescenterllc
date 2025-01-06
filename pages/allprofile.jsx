import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Footer from '@/components/Footer';

export default function MessageList() {
  const [allprofiles, setAllprofiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    const fetchProfiles = async () => {
      try {
        const res = await fetch('/api/allprofileposted', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Failed to fetch profiles');
        }

        const { messages } = await res.json();
        setAllprofiles(messages);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [router]);

  const handleEdit = (id) => {
    console.log(`Edit profile ${id}`); // Add your edit logic
  };

  const handleDelete = (id) => {
    console.log(`Delete profile ${id}`); // Add your delete logic
  };

  if (loading) {
    return <p>Loading profiles...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  if (allprofiles.length === 0) {
    return <p>No profiles found.</p>;
  }

  return (
    <div style={styles.container}>
      {/* Back Button */}
      <button style={styles.backButton} onClick={() => router.back()}>
        Back
      </button>
      <h1 style={styles.title}>Your posted Companies/Services Profiles</h1>
      {allprofiles.map((profile) => (
        <div key={profile._id} style={styles.card}>
          <h3>{profile.name}</h3>
          <p>{profile.description}</p>
          <p>
            <strong>Location:</strong> {profile.location}
          </p>
          <p>
            <strong>Website:</strong>{' '}
            <a href={profile.website} target="_blank" rel="noreferrer">
              {profile.website}
            </a>
          </p>
          <button style={styles.deleteButton} onClick={() => handleDelete(profile._id)}>
            Delete
          </button>
        </div>
      ))}
      <Footer/>
    </div>
  );
}

const styles = {
  container: {
    marginTop:'5%',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
  },
  backButton: {
    marginBottom: '20px',
    padding: '10px 15px',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  title: {
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '15px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  editButton: {
    marginRight: '10px',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#e00',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
