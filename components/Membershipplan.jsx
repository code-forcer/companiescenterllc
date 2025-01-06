import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import styles from '../styles/MembershipPlan.module.css';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

export default function MembershipPlan() {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [price, setPrice] = useState(null); // State to hold the price

  useEffect(() => {
    const fetchMembershipPrice = async () => {
      try {
        const response = await axios.get('/api/get-membership-price'); // API call to fetch price
        setPrice(response.data.price || 1); // Default to $1 if not set
      } catch (error) {
        console.error('Error fetching membership price:', error.response?.data || error.message);
        setPrice(1); // Fallback price in case of error
      }
    };

    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        alert('User not authenticated.');
        return;
      }

      try {
        const response = await axios.get('/api/getuserdetails', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserId(response.data._id);
      } catch (error) {
        console.error('Error fetching user details:', error.response?.data || error.message);
        alert('Failed to fetch user details.');
      }
    };

    fetchMembershipPrice();
    fetchUserDetails();
  }, []);

  const handlePayment = async () => {
    if (!userId) {
      alert('User not authenticated.');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        '/api/create-checkout-session',
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = response.data;
      const stripe = await stripePromise;

      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error('Stripe redirection error:', error.message);
        alert('Failed to redirect to Stripe Checkout.');
      }
    } catch (error) {
      console.error('Payment initiation failed:', error.response?.data || error.message);
      alert('Failed to initiate payment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Membership Plan</h1>
      <p className={styles.description}>
        Subscribe to post your profile and access exclusive features now for only{' '}
        <strong>${price}!</strong>
      </p>
      <button
        onClick={handlePayment}
        disabled={loading}
        className={styles.button}
      >
        {loading ? 'Processing...' : 'Subscribe Now'}
      </button>
    </div>
  );
}
