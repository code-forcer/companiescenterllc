import React from "react";
import Image from "next/image";
import supportImage from "../public/chatsupport.svg"; // Make sure the image is in the public folder
import styles from "../styles/ContactSupport.module.css"; // Importing the CSS module
import { FaArrowLeft } from 'react-icons/fa'; // FontAwesome for back arrow icon
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
const ContactSupport = () => {
  const router = useRouter();
  return (
    <>
      <div className={styles.contactSupportContainer}>
          
          <header className={styles.header}>
              <div className={styles.backIcon} onClick={() => router.back()}>
        <FaArrowLeft />
      </div>
        <button className={styles.backBtn} onClick={() => window.history.back()}>
          &#8592;
        </button>
        <h2>Contact Support</h2>
      </header>

      <div className={styles.supportImage}>
        <Image src={supportImage} alt="Support Illustration" layout="responsive" />
      </div>

      <form className={styles.contactForm}>
        <h3>Send us a message</h3>
        <input type="text" placeholder="Subject" className={styles.inputField} />
        <textarea placeholder="Write your message" className={styles.textareaField}></textarea>
        <button type="submit" className={styles.submitBtn}>Submit</button>
          </form>
      </div>
       <Footer/>
      </>
  );
};

export default ContactSupport;
