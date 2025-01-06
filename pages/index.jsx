import React from 'react';
import Header from '../components/Header';
import ComicList from '../components/ComicList';
import Carousel from '../components/Carousel';
import Marquee from '@/components/Marquee';
import styles from '../styles/Home.module.css';
import Footer from '@/components/Footer';
import GetAppSection from '@/components/GetAppSection';
import PopularItemsSection from '@/components/PopularItemsSection';
import DisplayAd from '@/components/DisplayAd';
import SliderReels from '@/components/Sliderreels';
import MapComponent from '@/components/MapComponent';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import AutoplayVideo from '@/components/Autoplayvideo';
import ChatIcon from '@/components/ChatIcon';
import SetTerms from '@/components/SetTerms';
const Home = () => {
  // Dynamically import MapComponent so it only renders client-side
const MapComponent = dynamic(() => import('../components/MapComponent'), { ssr: false });

  const carouselImages = [
    '/mail_google_com/Untitled design (9).png',
    '/mail_google_com/Untitled design (10).png',
    '/mail_google_com/Untitled design (2).png',
    '/mail_google_com/Untitled design (7).png',
    '/mail_google_com/Untitled design (12).png',
    '/mail_google_com/Untitled design (6).png',
    // Add more image paths here...
  ];

  const ads = [
    {
      tags: ['Join Us', 'Networking'],
      title: 'Connect with Top Companies',
      description: 'Join companiescenterllc.com and connect with leading companies offering a wide range of services.',
      imageUrl: '/mail_google_com/Untitled design (6).png',
    },
    {
      tags: ['Job Opportunities', 'Career Growth'],
      title: 'Find Your Dream Job',
      description: 'Explore job listings from top companies and take the next step in your career.',
      imageUrl: '/mail_google_com/air.PNG',
    },
    {
      tags: ['Community', 'Feedback'],
      title: 'Share Your Experience',
      description: 'Leave reviews and feedback for companies you’ve worked with to help others make informed decisions.',
      imageUrl: '/logo/imagetwo.jpeg',
    },
  ];

  return (
    <div>
      <Header />
      <main style={{ fontFamily: "'Roboto', sans serif", color: '#102343', padding: '20px' }}>
        <Marquee />
        {/* Main Section */}
        <div className={styles.homepageContainer}>
          <section className={styles.heroSection}>
            <div className={styles.heroText}>
              <h1>Welcome to companiescenterllc.com</h1>
              <p>Your Trusted Platform for Connecting with Leading Companies. Whether you're looking to hire or get hired, we provide a comprehensive marketplace for businesses and job seekers. Explore job opportunities, read reviews, and connect with companies that meet your needs.</p>
              <a href="/admin/register" className={styles.ctaButton}>Join Us Today <img src="/radix/fire.svg" width={'20px'} alt="Network icon" /></a>
            </div>
            <div className={styles.heroImage}>
              <img src="/logo/imagetwo.jpeg" alt="Business networking" />
            </div>
          </section>
          {/* video section */}
          <AutoplayVideo />
          <br />
          {/* Carousel */}
          <Carousel images={carouselImages} />

          {/* Featured Companies Section */}
          <h2 style={{
            fontFamily: "'Roboto', sans serif", padding: '5px', textAlign: 'center', fontWeight: 'bold',
            color: '#102343', textDecoration: 'underline'
          }}>
            Featured Companies
          </h2>
          <img src="/radix/thick-arrow-right.svg" width={'20px'} alt="Arrow icon" />
          <ComicList />
          <ChatIcon/>
          <br />
          <section className={styles.featuresSection}>
            <h3>Why Choose companiescenterllc.com?</h3>
            <div className={styles.features}>
              <div className={styles.featureItem}>
                <img src="/displays/download.png" alt="Extensive Network" />
                <h3>Extensive Network</h3>
                <p>Connect with top companies and professionals in various industries.</p>
              </div>
              <div className={styles.featureItem}>
                <img src="/displays/download3.png" alt="Job Opportunities" />
                <h3>Job Opportunities</h3>
                <p>Find the best job opportunities that match your skills and interests.</p>
              </div>
              <div className={styles.featureItem}>
                <img src="/displays/download2.png" alt="Trust and Reviews" />
                <h3>Trust and Reviews</h3>
                <p>Read reviews and ratings from other users to make informed decisions.</p>
              </div>
            </div>
          </section>

          {/* Popular Items Section */}
          <PopularItemsSection />

          {/* Display Ads */}
          <DisplayAd ads={ads} />
          {/* Slider */}
          <SliderReels />
          {/* Maps sections */}
          <MapComponent/> 
          {/* Get App Section */}
          <GetAppSection />

          <div style={{ textAlign: 'center', padding: '10px' }}>
            <img src="/comicwebimages/payment.png" alt="Payment Options" />
          </div>

          <section className={styles.callToActionSection}>
            <h2><b>Ready to Grow Your Business?</b></h2>
            <p>Join the companiescenterllc.com community today and start connecting with potential clients and partners!</p>
            <a href="/admin/register" className={styles.ctaButton}>Get Started</a>
          </section>
        </div>

        {/* Ends here */}
      </main>
      <SetTerms/>
      <Footer />
    </div>
  );
};

export default Home;
