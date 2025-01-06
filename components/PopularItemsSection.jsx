import { useState, useEffect } from 'react';
import styles from '../styles/Pagination.module.css'; // Adjust with your actual CSS module path

const PopularItemsSection = () => {
  const itemsPerPage = 2; // Number of items per page
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/items/items');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className={styles.popularItemsSection}>
      <h2><u>Registered Companies</u> <img src="/radix/fire.svg" width={'30px'} alt="Fire Icon" /></h2>
      {loading ? (
        <p>Loading items...</p>
      ) : (
        <>
          <div className={styles.itemsGrid}>
            {currentItems.map((item, index) => (
              <div key={index} className={styles.itemCard}>
                <img src={item.image} alt={`Item ${index + 1}`} />
                <img style={{
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        objectFit: 'cover',
        marginLeft:'10px',
        border: '2px solid #ce1212',
      }} src={item.logo || '/logo/download.png'} alt={`Item ${index + 1}`} className={styles.logo} />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>Review: <span style={{ color: '#FFD700' }}>★★★</span></p>
                <a href="/reviews" className={styles.viewReviewButton}>comment a review</a> <br /><br />
                <a href={`/itemsdetails/${item._id}`} className={styles.viewItemButton}>View Company</a>
              </div>
            ))}
          </div>
          <div className={styles.pagination}>
            <button onClick={goToPrevPage} disabled={currentPage === 1}>
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => changePage(index + 1)}
                className={currentPage === index + 1 ? styles.activePage : ''}
              >
                {index + 1}
              </button>
            ))}
            <button onClick={goToNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default PopularItemsSection;
