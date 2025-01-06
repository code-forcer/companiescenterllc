// pages/membership.js

import MembershipPlan from '@/components/Membershipplan';
import styles from '../styles/MembershipPage.module.css';
import MenusideBar from '@/components/MenuSideBar';
import Footer from '@/components/Footer';

export default function MembershipPage() {
  return (
    <div className={styles.pageContainer}>
      <MenusideBar/>
      <MembershipPlan/>
      <Footer/>
    </div>
  );
}
