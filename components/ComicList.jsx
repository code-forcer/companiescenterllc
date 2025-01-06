// pages/comics/index.js

import { useEffect, useState } from 'react';
import styles from '../styles/ComicList.module.css';

const ComicList = () => {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const res = await fetch('/api/comics');
        const data = await res.json();
        setComics(data);
      } catch (error) {
        console.error('Error fetching comics:', error);
      }
    };

    fetchComics();
  }, []);

  return (
    <div className={styles.comicList}>
      {comics.map((comic) => (
       <a target='_blank' href='/memes'> <div key={comic._id} className={styles.comicItem}>
          <img src={comic.image} alt={comic.name} className={styles.comicImage} />
          <img style={{
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        objectFit: 'cover',
        marginLeft:'10px',
        border: '2px solid #ce1212',
      }} src={comic.logo || '/logo/download.png'} alt={comic.name} className={styles.logo} />
          <h3 className={styles.comicTitle}>{comic.name}</h3>
          <code style={{padding:'2px'}}><b>Like: {comic.likes||0}</b></code>
          <img src="/radix/fire.svg" width="20px" alt="Fire Icon" />
        </div>
        </a>
      ))}
    </div>
  );
};

export default ComicList;
