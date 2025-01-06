import { useState, useEffect } from 'react'; 
import styles from '../styles/Menubar.module.css'; 
import { FaHome, FaUserAlt, FaCog, FaQuestionCircle, FaSignOutAlt, FaBars, FaTimes, FaAngleDown, FaAngleUp} from 'react-icons/fa';
import { useRouter } from 'next/router';
import { MdCardMembership } from "react-icons/md";
import { IoIosChatboxes } from "react-icons/io";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { MdPostAdd } from "react-icons/md";

  const handleLogout = () => {
    // Remove the token from localStorage or cookies
    localStorage.removeItem('token');
    router.push('/admin/login'); // Redirect to login page after logout
  };

// Assuming you get the user's role from context or props
const MenusideBar = ({ userRole }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [policyDropdownOpen, setPolicyDropdownOpen] = useState(false);
  const [supportDropdownOpen, setSupportDropdownOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className={styles.container}>
      <div className={styles.menuIcon} onClick={toggleMenu}>
        {menuOpen ? <FaTimes className={styles.cancel} /> : <FaBars />} 
      </div>

      <div className={`${styles.sidebar} ${menuOpen ? styles.sidebarOpen : ''}`}>
        <ul className={styles.menuList}>
          {/* Main Navigation */}
          <b>
            <li>
              <a href="/admin/dashboard">
                <FaHome className={styles.menuIconItem} />Dashboard
              </a>
            </li>
            <li>
              <a href='/profile'>
                <FaUserAlt className={styles.menuIconItem} /> Profile
              </a>
            </li>
            {/* Show "Create Post" only if the user role is "company" */}
            {userRole === 'company' && (
              <li>
                <a href='/admin/dashboard'>
                  <MdPostAdd className={styles.menuIconItem} /> Create Post
                </a>
              </li>
            )}
{userRole === 'company' && (
              <li>
                <a href='/allprofile'>
                  <MdPostAdd className={styles.menuIconItem} />All profiles
                </a>
              </li>
            )}
          
            {userRole === 'company' && (<li> <a href="/messages">
             
                <IoIosChatboxes className={styles.menuIconItem} /> Chats/Messages
              </a>
            
            </li>  )}

            
            {userRole === 'employer' && (<li> <a href="/sendermessage">
             
             <IoIosChatboxes className={styles.menuIconItem} /> Chats/Messages
           </a>
         
         </li>  )}

            {/* Show "View Companies" only if the user role is "employee" */}
            {userRole === 'employer' && (
              <li>
                <a href="#">
                  <IoNotificationsCircleSharp className={styles.menuIconItem} /> View Companies
                </a>
              </li>
            )}

            {/* Policy Pages Dropdown */}
            <li onClick={() => setPolicyDropdownOpen(!policyDropdownOpen)}>
              <FaQuestionCircle className={styles.menuIconItem} /> Policies {policyDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
            </li>
            {policyDropdownOpen && (
              <ul className={styles.subMenu}>
                <li><a href="/terms">Terms of Service</a></li>
                <li><a href="/privacypolicy">Privacy Policy</a></li>
                <li><a href="#">Cancellation Policy</a></li>
              </ul>
            )}

            {/* Support Pages Dropdown */}
            <li onClick={() => setSupportDropdownOpen(!supportDropdownOpen)}>
              <FaQuestionCircle className={styles.menuIconItem} /> Support {supportDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
            </li>
            {supportDropdownOpen && (
              <ul className={styles.subMenu}>
                <li><a href="/support">Help Support</a></li>
                <li><a href="#">FAQ Page</a></li>
              </ul>
            )}
         
            {userRole === 'company' && (<li><a href="/membershipplan"><MdCardMembership className={styles.menuIconItem} /> Membership Plan</a></li>)}
              <hr />
            
            {/* Static Menu Items */}
            <li>
              <FaSignOutAlt className={styles.menuIconItem} /> Logout
            </li>
          </b>
        </ul>
      </div>
    </div>
  );
};

export default MenusideBar;
