import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import clientPromise from '../lib/mongodb';
import styles from '../styles/Memes.module.css';
import Marquee from '@/components/Marquee';
import Footer from '@/components/Footer';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'; // Importing social icons

const MemeList = ({ memes }) => {
  const [filteredMemes, setFilteredMemes] = useState(memes);
  const router = useRouter();
  const { query } = router.query;

  useEffect(() => {
    if (query) {
      const searchQuery = query.toLowerCase();
      const sortedMemes = memes
        .map((meme) => ({
          ...meme,
          isMatch: 
            Object.values(meme) // Check if any value in the meme object contains the query
              .some((value) => 
                typeof value === 'string' && value.toLowerCase().includes(searchQuery)
              ),
        }))
        .sort((a, b) => b.isMatch - a.isMatch); // Matching memes come first

      setFilteredMemes(sortedMemes);
    } else {
      setFilteredMemes(memes);
    }
  }, [query, memes]);

  const handleLike = async (memeId) => {
    try {
      const res = await fetch('/api/memes/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ memeId }),
      });

      if (res.ok) {
        window.location.reload(); // Reload to update like count
      }
    } catch (error) {
      console.error('Error liking meme:', error);
    }
  };

  const handleBuy = async (memeId) => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/admin/login');
    } else {
      router.push(`/hiremessage?companyUserid=${memeId}`);
    }
  };

  return (
    <>
      <Header />
      <Marquee />
      <div className={styles.memesContainer}>
        <h1>Company Lists</h1>
        <hr />
        <div>
          {filteredMemes.map((meme) => (
            <div className={styles.memeItem} key={meme._id}>
              <h3>
                <span style={{ textDecoration: 'underline', textAlign: 'left' }}>{meme.name}</span>
              </h3>
              <div className={styles.banner}>
                <img className={styles.memeImage} src={meme.image} alt={meme.name} />
                <div className={styles.logo}>
  {meme.logo ? (
    <img
      src={meme.logo}
      alt="Company Logo"
      style={{
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        objectFit: 'cover',
        border: '2px solid #ce1212',
      }}
    />
  ) : (
    <img
      src="/logo/download.png"
      alt="Fallback Logo"
      style={{
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        objectFit: 'cover',
        border: '2px solid #ce1212',
      }}
    />
  )}
</div>

              </div>
              <ul>
                <li><span style={{ color: '#ce1212', textDecoration: 'underline', fontWeight: 'bold' }}>Company Description:</span> {meme.description || 'None'}</li>
                <li><span style={{ color: '#ce1212', textDecoration: 'underline', fontWeight: 'bold' }}>Company Location:</span> <address>{meme.location || 'None'}</address></li>
                <li><span style={{ color: '#ce1212', textDecoration: 'underline', fontWeight: 'bold' }}>View On Map:</span> {meme.mapUrl ? (
                  <a href={meme.mapUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'blue' }}>Open Map</a>
                ) : 'None'}</li>
                <li><span style={{ color: '#ce1212', textDecoration: 'underline', fontWeight: 'bold' }}>Company Website Link:</span> {meme.website ? (
                  <a href={meme.website} target="_blank" rel="noopener noreferrer" style={{ color: 'blue' }}>Visit Website</a>
                ) : 'None'}</li>
                <li>
                  <span style={{ color: '#ce1212', textDecoration: 'underline', fontWeight: 'bold' }}>Social Media:</span>
                  <div className={styles.socialIcons}>
                    {meme.facebook && (
                      <a href={meme.facebook} target="_blank" rel="noopener noreferrer">
                        <FaFacebookF size={30} />
                      </a>
                    )}
                    {meme.twitter && (
                      <a href={meme.twitter} target="_blank" rel="noopener noreferrer">
                        <FaTwitter size={30} />
                      </a>
                    )}
                    {meme.instagram && (
                      <a href={meme.instagram} target="_blank" rel="noopener noreferrer">
                        <FaInstagram size={30} />
                      </a>
                    )}
                  </div>
                </li>
              </ul>
              <h2>Price: &#36;{meme.price}</h2>
              <hr />
              <p className={styles.likeSection}>{meme.likes || 0} 👍Likes</p>
              <button className={styles.likeButton} onClick={() => handleLike(meme._id)}>Like</button>
              <button className={styles.buyButton} onClick={() => handleBuy(meme._id)}>Hire</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const memes = await db.collection('memes').find({}).toArray();

    return {
      props: {
        memes: JSON.parse(JSON.stringify(memes)),
      },
    };
  } catch (error) {
    console.error('Error fetching memes:', error);
    return {
      props: {
        memes: [],
      },
    };
  }
}

export default MemeList;
