import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/Review.module.css';

export default function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('/api/reviews');
        setReviews(response.data);
      } catch (err) {
        setError('Failed to fetch reviews.');
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className={styles.reviewList}>
      <h3>Reviews</h3>
      {error && <p className={styles.error}>{error}</p>}
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>
            <p>{review.text}</p>
            <p className={styles.rating}>Rating: {review.rating} stars</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
