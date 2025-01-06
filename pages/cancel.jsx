// pages/cancel.js
import Footer from '@/components/Footer';
import styles from '../styles/ResultPage.module.css';
import MenusideBar from '@/components/MenuSideBar';

export default function Cancel() {
  return (
    <>
    <MenusideBar/>
    <div className={styles.container}>
      <h1 className={styles.titlecancel}><b>Payment Canceled</b></h1>
      <p className={styles.description}>
        Your payment was canceled. You can try subscribing again at any time.
      </p>
    </div>
    <Footer/>
    </>
  );
}
