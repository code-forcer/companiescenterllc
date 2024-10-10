// src/pages/about.js
import Footer from '@/components/Footer';
import Header from '../components/Header';
import styles from '../styles/About.module.css';
import Marquee from '@/components/Marquee';

export default function About() {
  return (
    <>
      <Header />
      <Marquee/>
      <div className={styles.container}>
        <section className={styles.aboutUsSection}>
          <h1 className={styles.aboutTitle}>About Us</h1>
          <p className={styles.aboutText}>
            Welcome to <span className={styles.bold}>CompaniesCenterLLC</span>, your premier platform for finding and connecting with companies offering diverse job opportunities. At CompaniesCenterLLC, we are committed to bridging the gap between companies and job seekers by providing a reliable and efficient marketplace.
          </p>

          <h2 className={styles.aboutSubheading}>Why Choose Us?</h2>
          <ul className={styles.aboutList}>
            <li className={styles.aboutListItem}>
              <span className={styles.bold}>Extensive Network:</span> We partner with a wide range of companies, from startups to established enterprises, ensuring that you have access to a broad spectrum of job opportunities tailored to your skills and career aspirations.
            </li>
            <li className={styles.aboutListItem}>
              <span className={styles.bold}>Trusted Platform:</span> At <span className={styles.bold}>CompaniesCenterLLC</span>, we prioritize your security and trust. Our platform is designed with robust security measures to ensure that your interactions and transactions are safe and transparent.
            </li>
            <li className={styles.aboutListItem}>
              <span className={styles.bold}>Supportive Community:</span> We believe in fostering a community where job seekers and companies can thrive. Our platform is user-friendly, and our team is always ready to assist you with any questions or support you need.
            </li>
          </ul>

          <h2 className={styles.aboutSubheading}>Our Mission</h2>
          <p className={styles.aboutText}>
            Our mission at <span className={styles.bold}>CompaniesCenterLLC</span> is to streamline the job search process and enhance the hiring experience for companies. We aim to be the go-to platform where job seekers find meaningful employment and companies discover top talent.
          </p>

          <h2 className={styles.aboutSubheading}>Join Us Today</h2>
          <p className={styles.aboutText}>
            Whether you are a job seeker looking for your next opportunity or a company searching for the perfect candidate, <span className={styles.bold}>CompaniesCenterLLC</span> is here to help you succeed. Join our growing community and take the next step towards achieving your goals.
          </p>

          <h2 className={styles.aboutSubheading}>Have Questions?</h2>
          <p className={styles.aboutText}>
            We are here to assist you. If you have any questions or need support, please reach out to us. At <span className={styles.bold}>CompaniesCenterLLC</span>, your success is our priority.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
}
