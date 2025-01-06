import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

import styles from '../styles/Checkout.module.css'; // Import the CSS module

const HireMessage = () => {
  const [item, setItem] = useState(null);
  const [companyOwnerId, setCompanyOwnerId] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [userId , setUserId]=useState(null);
  const router = useRouter();
  const { itemId } = router.query;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    const fetchUserData = async () => {
      const response = await fetch('/api/getuserdetails', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserId(data._id);
      } else {
        localStorage.removeItem('token');
        router.push('/admin/login');
      }
    };
    
    fetchUserData();
  }, [router]);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`/api/items/${itemId}`);
        setItem(response.data);

        // Extract companyOwnerId (companyid from item data)
        setCompanyOwnerId(response.data.companyid);
      } catch (error) {
        toast.error('Failed to fetch item details.');
        console.error('Error fetching item:', error);
      }
    };

    if (itemId) fetchItem();
  }, [itemId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !subject || !message) {
      toast.error('Please fill in all the required fields.');
      return;
    }

    try {
      const response = await axios.post('/api/hire-message', {
        itemId, // The current itemId
        companyOwnerId, // The company owner id associated with the item
        userId, // Include the userId here
        name,
        email,
        subject,
        message,
      });

      if (response.status === 201) {
        toast.success('Message sent successfully!');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        toast.error('Failed to send the message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending the message:', error);
      toast.error('An error occurred while sending the message.');
    }
  };

  return (
    <>
      <Header />
      <br />
      <div className={styles.checkoutContainer}>
        <h1 style={{ color: '#ce1212' }}>Send Hire Message</h1>
        {item && (
          <>
            <h2>Sending Hiring Message: {item.name}</h2>
            <p>
              Review: <span style={{ color: '#FFD700' }}>★★★</span>
            </p>
            <img
              src={item.image}
              style={{
                width: '100px',
                borderBottom: '2px solid #102343',
                borderRadius: '5px',
              }}
              alt="Item"
            />
            <p>{item.description}</p>
          </>
        )}
        <form onSubmit={handleSubmit}>
          <input type="text" value={itemId} hidden readOnly />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            required
          />
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Your Subject"
            required
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your Message"
            rows={6}
            required
          ></textarea>

          <button type="submit">Send Message</button>
        </form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <br />
      <Footer />
    </>
  );
};

export default HireMessage;
