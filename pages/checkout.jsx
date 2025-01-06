// pages/hire send message to this company.js

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script'; // Import the Script component from Next.js
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/Checkout.module.css'; // Import the CSS module
import Marquee from '@/components/Marquee';

const Checkout = () => {
  const [item, setItem] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [matricNumber, setMatricNumber] = useState('');
  const router = useRouter();
  const { itemId } = router.query;

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`/api/items/${itemId}`);
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    if (itemId) fetchItem();
  }, [itemId]);

  const handlePayment = () => {
    if (typeof window.PaystackPop === 'undefined') {
      console.error('PaystackPop is not loaded.');
      return;
    }

    const handler = window.PaystackPop.setup({
      key: 'pk_test_b33ea331aba173e76776c77aa94bca5d30e2e910', // Replace with your Paystack public key
      email: email,
      amount: item.price * 100, // Amount in kobo
      currency: 'NGN',
      callback: (response) => {
        alert('Payment successful. Transaction reference: ' + response.reference);
      },
      onClose: () => {
        alert('Payment closed. Please try again.');
      },
    });

    handler.openIframe();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && email && address && matricNumber) {
      handlePayment();
    } else {
      alert('Please fill in all required fields.');
    }
  };

    
    
  return (
    <>
          <Header />
          <Marquee/>
      <div className={styles.checkoutContainer}>
        <h1 style={{color:'#ce1212'}}>Send Hire Message</h1>
        {item && (
          <>
            <h2>Hiring: {item.name}</h2>
            <h3>Price: <span style={{ color: '#102343', fontWeight: 'bold' }}>&#36;{item.price}</span></h3>
            <p>Review: <span style={{ color: '#FFD700' }}>★★★</span></p>
            <img src={item.image} style={{width:'100px',borderBottom:'2px solid #102343',borderRadius:'5px'}} alt="Fire Icon" />
          </>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            required
          />
          <button type="submit">Proceed to submit</button>
              </form>
             
          </div>
            <div style={{ textAlign: 'center',padding:'10px' }}
          > <br/>
            <img src="/comicwebimages/payment.png" alt="" srcset="" />
            </div>
           <br/>
      <Footer />
      {/* Add the Paystack script */}
      <Script src="https://js.paystack.co/v1/inline.js" strategy="beforeInteractive" />
    </>
  );
};

export default Checkout;
