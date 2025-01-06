// pages/privacy-policy.js
import React from 'react';
import styles from '../styles/PrivacyPolicy.module.css';

const PrivacyPolicy = () => {
  return (
    <div className={styles.container}>
      <h1>Privacy Policy</h1>
      <p>
        Our new feature allows users to connect with individuals offering their skills and seeking job opportunities. This service is designed to facilitate connections between those in need of work and those looking to hire, similar to how some people find opportunities outside certain establishments.
      </p>

      <h2>User Responsibility</h2>
      <p>
        Please note that Companies Center does not conduct background checks or guarantee the suitability of the individuals offering their services through this feature. Therefore, it is essential for users to carefully evaluate the available profiles and use their best judgment when selecting someone to hire.
      </p>

      <h2>Mutual Trust and Respect</h2>
      <p>
        Our platform encourages mutual trust and respect in every interaction. However, by using this feature, users acknowledge that Companies Center assumes no responsibility for the behavior or actions of the individuals hired.
      </p>

      <h2>Encouragement for Responsible Use</h2>
      <p>
        We appreciate your understanding and encourage you to use this tool responsibly, always considering the importance of fair and respectful treatment in all work relationships.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
