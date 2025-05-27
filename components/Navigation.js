import { useState, useEffect } from 'react';
import Link from 'next/link';
import Cart from './Cart';
import LoginModal from './LoginModal';
import FarmLocationModal from './FarmLocationModal';
import styles from '../styles/Navigation.module.css';

export default function Navigation() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    // Store user data in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(userData));
    }
    
    // If user is a farmer, show location confirmation modal
    if (userData.userType === 'farmer') {
      setIsLocationModalOpen(true);
    }
  };

  // Check for stored user data on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        // If user is a farmer and hasn't confirmed location, show modal
        if (userData.userType === 'farmer' && !userData.locationConfirmed) {
          setIsLocationModalOpen(true);
        }
      }
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  };

  const handleLocationConfirm = async (locationData) => {
    try {
      // Update user data with location information
      const updatedUser = {
        ...user,
        locationConfirmed: true,
        farmLocation: locationData
      };
      
      // Here you would typically:
      // 1. Send the location data to your backend
      // 2. Update the user's profile in the database
      
      // For now, just update the local state
      setUser(updatedUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      setIsLocationModalOpen(false);
    } catch (error) {
      console.error('Error saving location:', error);
      alert('Failed to save location. Please try again.');
    }
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.navContent}>
        <Link href="/" className={styles.logo}>
          FarmLink
        </Link>

        <div className={styles.navLinks}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/products" className={styles.navLink}>
            Products
          </Link>
          <Link href="/about" className={styles.navLink}>
            About
          </Link>
        </div>

        <div className={styles.navActions}>
          {user ? (
            <>
              <span className={styles.userName}>Welcome, {user.name}</span>
              <button
                className={styles.logoutButton}
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              className={styles.loginButton}
              onClick={() => setIsLoginOpen(true)}
            >
              Login / Register
            </button>
          )}
          <button
            className={styles.cartButton}
            onClick={() => setIsCartOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </button>
        </div>
      </div>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} user={user} />
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLoginSuccess={handleLoginSuccess}
      />
      {user?.userType === 'farmer' && (
        <FarmLocationModal
          isOpen={isLocationModalOpen}
          onClose={() => setIsLocationModalOpen(false)}
          farmAddress={user.address}
          onConfirm={handleLocationConfirm}
        />
      )}
    </nav>
  );
} 