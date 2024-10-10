// src/pages/404.js
import Link from 'next/link';
import styles from '../styles/404.module.css';

export default function Custom404() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Oops! The page you're looking for does not exist.</p>
        <a href='/' className={styles.link}>Go Back Home</a>
    </div>
  );
}
