import React from 'react';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import styles from '../styles/DisplayAd.module.css';

const DisplayAd = ({ ads }) => {
  const shareOnFacebook = (title) => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(title)}`;
    window.open(url, '_blank');
  };

  const shareOnTwitter = (title) => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };

  return (
    <div>
      {ads.map((ad, index) => (
        <div key={index} className={styles.adContainer}>
          <img src={ad.imageUrl} alt={ad.title} className={styles.adImage} />
          <div className={styles.adContent}>
            <div className={styles.tags}>
              {ad.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
            <h2 className={styles.adTitle}>{ad.title}</h2>
            <p className={styles.adDescription}>{ad.description}</p>
            <div className={styles.socialButtons}>
              <button onClick={() => shareOnFacebook(ad.title)} className={styles.shareButton}>
                <FaFacebook /> Share on Facebook
              </button>
              <button onClick={() => shareOnTwitter(ad.title)} className={styles.shareButton}>
                <FaTwitter /> Share on Twitter
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayAd;
