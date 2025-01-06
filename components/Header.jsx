import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from '../styles/Header.module.css';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserInfo(token);
    }
  }, []);

  const fetchUserInfo = async (token) => {
    try {
      const res = await fetch('/api/user/profile', {
        method: 'GET', // Ensure the method is set to GET
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        console.error('Failed to fetch user info:', res.statusText);
      }
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/memes?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.navbar}>
        <button className={styles.hamburger} onClick={toggleMobileMenu}>
          &#9776;
        </button>
        <a target="_blank" href="/">
          <span className={styles.logo}><img src="/logo/imageone.jpeg" alt="" /></span>
        </a>

     

        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.mobileNavOpen : ''}`}>
          <ul>
            <li className={router.pathname === '/' ? styles.activeNavItem : ''}>
              <Link href="/">Home</Link>
            </li>
            <li className={router.pathname === '/about' ? styles.activeNavItem : ''}>
              <Link href="/about">About</Link>
            </li>
            <li className={router.pathname === '/memes' ? styles.activeNavItem : ''}>
              <Link href="/memes">Hire</Link>
            </li>
            <li className={router.pathname === '/contact' ? styles.activeNavItem : ''}>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
        <ul>
           {user ? (
              <li style={{ border: '1px solid #fff', padding: '2px', borderRadius: '5px', fontWeight: 'bold' }}>
                {user.name}
              </li>
            ) : (
              <li className={styles.getstarted}>
                <Link href="/admin/register">Get started</Link>
              </li>
            )}
        </ul>
      </div>
       <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="text"
            placeholder="Search companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          /> &nbsp;
          <button type="submit" className={styles.searchButton}>Search</button>
        </form>
    </header>
  );
};

export default Header;
