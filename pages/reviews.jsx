import Header from '@/components/Header';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import styles from '../styles/Review.module.css';
import Marquee from '@/components/Marquee';
import Footer from '@/components/Footer';

export default function ReviewsPage() {
  return (

    <>
      <Header />
      <Marquee/>
    <div className={styles.reviewContainer}>
      <h1>Company Reviews</h1>
      <ReviewForm />
      <ReviewList />
      </div>
      <Footer/>
      </>
  );
}
