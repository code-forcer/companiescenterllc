// pages/success.js
import Footer from '@/components/Footer';
import styles from '../styles/ResultPage.module.css';
import MenusideBar from '@/components/MenuSideBar';

export default function Success() {
  return (
    <>
    <MenusideBar/>
    <div className={styles.container}>
      <h1 className={styles.titlesuccess}>Payment Successful!</h1>
      <p className={styles.description}>
        Thank you for subscribing. You now have access to exclusive features!
      </p>
    </div>
    <Footer/>
    </>
  );
}
