import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Marquee from '@/components/Marquee';
import styles from '../../styles/ItemDetails.module.css'; // Adjust the path to your CSS module
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ItemDetails = ({ item }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch user data from local storage, a context, or an API to determine if they are logged in
    const userData = localStorage.getItem('user'); // Assuming user info is stored in localStorage
    setUser(userData ? JSON.parse(userData) : null);
  }, []);

  const handleProceedToOrder = () => {
    if (!user) {
      // If user is not logged in, redirect to signup page
      router.push('/admin/register');
    } else {
      // If user is logged in, redirect to checkout page
      router.push(`/checkout?itemId=${item._id}`); // Assuming `item._id` contains the item ID
    }
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <Marquee />
      <div className={styles.container}>
        <h1 className={styles.headername}>Company's Details Page.</h1>
        <div className={styles.imageContainer}>
          <img src={item.image} alt={item.name} className={styles.image} />
        </div>
        <h1><b>Company Info:</b></h1>
        <div className={styles.detailsContainer}>
          <h1 className={styles.title}><b>{item.name}</b></h1>
          <p className={styles.description}>{item.description}</p>
          <p className={styles.price}>Price: &#36;{item.price}</p>
          <button onClick={handleProceedToOrder} className={styles.orderButton}>
          Send a hire message
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ItemDetails;

// Fetch the item data from the database based on the item ID from the URL
export async function getServerSideProps(context) {
  const { id } = context.params; // Retrieve the ID from the route

  // Fetch item details from the database using the item ID
  const res = await fetch(`http://localhost:3000/api/items/${id}`); // Adjust the URL to match your API endpoint
  const item = await res.json();

  if (!item) {
    return {
      notFound: true, // This will show a 404 page if no item is found
    };
  }

  return {
    props: {
      item,
    },
  };
}
