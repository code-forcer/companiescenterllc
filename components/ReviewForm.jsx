import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Review.module.css';

export default function ReviewForm() {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!reviewText) {
      setError('Review text cannot be empty.');
      return;
    }

    try {
      const response = await axios.post('/api/reviews', { reviewText, rating });
      if (response.status === 201) {
        setSuccess('Review submitted successfully!');
        setReviewText('');
        setRating(1);
      }
    } catch (err) {
      setError('Failed to submit review.');
    }
  };

  return (
    <div className={styles.reviewForm}>
      <h3>Submit Your Review</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          placeholder="Write your review here..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <div>
          <label>
            Rating:
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>
                  {star}
                </option>
              ))}
            </select>
          </label>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}
