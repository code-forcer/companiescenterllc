import { useState } from 'react';
import styles from '../styles/Contact.module.css';
import Header from '../components/Header';
import Marquee from '@/components/Marquee';
import Footer from '@/components/Footer';
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    emergency: false,
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          emergency: false,
        });
      } else {
        setStatus('Failed to send message.');
      }
    } catch (error) {
      setStatus('An error occurred while sending the message.');
    }
  };

    return (
        <>
        <Header />
        <Marquee/>
    <div className={styles.contactContainer}>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} className={styles.contactForm}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="emergency"
            name="emergency"
            checked={formData.emergency}
            onChange={handleChange}
          />
          <label htmlFor="emergency">This is an emergency case</label>
        </div>

        <button type="submit" className={styles.submitButton}>Send Message</button>
        {status && <p className={styles.statusMessage}>{status}</p>}
      </form>
        </div>
        <Footer/>
            </>
  );
};

export default Contact;
