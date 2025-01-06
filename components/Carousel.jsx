import { useState } from 'react';
import styles from '../styles/Carousel.module.css';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className={styles.carousel}>
      <button onClick={prevSlide} className={styles.prevButton}>&#10094;</button>
      <div className={styles.imageContainer}>
        <img src={images[currentIndex]} alt="Carousel" className={styles.image} />
      </div>
      <button onClick={nextSlide} className={styles.nextButton}>&#10095;</button>
    </div>
  );
};

export default Carousel;
