import React from 'react';
import styles from '../styles/GetAppSection.module.css';

const GetAppSection = () => {
  return (
    <div className={styles.getAppSection}>
      <img
        src="/comicwebimages/cards-4.png" // Replace with your actual image path
        alt="Get the app"
        className={styles.appImage}
      />
      <div className={styles.textContainer}>
        <h2><b>Get the App on Play Store or Apple Store</b></h2>
        <p>Experience the best of our services by downloading our mobile app.</p>
        <div className={styles.storeButtons}>
          <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
            <img
              src="/comicwebimages/play.avif"
              alt="Play Store"
              className={styles.storeButton}
            />
          </a>&nbsp;&nbsp;
          <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
            <img
              src="/comicwebimages/apple.avif"
              alt="Apple Store"
              className={styles.storeButton}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default GetAppSection;
