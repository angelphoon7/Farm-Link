import { useState, useEffect } from 'react';
import styles from '../styles/Cart.module.css';

export default function Cart({ isOpen, onClose, user }) {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Calculate total whenever cart items change
    const newTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotal(newTotal);
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleCheckout = async () => {
    if (!user) {
      alert('Please login to proceed with checkout');
      return;
    }

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          items: cartItems,
          total: total
        }),
      });

      if (response.ok) {
        alert('Order placed successfully!');
        setCartItems([]);
        onClose();
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to place order');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.cartOverlay}>
      <div className={styles.cart}>
        <div className={styles.cartHeader}>
          <h2>Your Cart</h2>
          <button onClick={onClose} className={styles.closeButton}>×</button>
        </div>

        {cartItems.length === 0 ? (
          <p className={styles.emptyCart}>Your cart is empty</p>
        ) : (
          <>
            <div className={styles.cartItems}>
              {cartItems.map(item => (
                <div key={item.id} className={styles.cartItem}>
                  <img src={item.image} alt={item.name} className={styles.itemImage} />
                  <div className={styles.itemDetails}>
                    <h3>{item.name}</h3>
                    <p className={styles.farmer}>By {item.farmer}</p>
                    <p className={styles.price}>${item.price}</p>
                  </div>
                  <div className={styles.quantityControls}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className={styles.quantityButton}
                    >
                      -
                    </button>
                    <span className={styles.quantity}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className={styles.quantityButton}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className={styles.removeButton}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.cartFooter}>
              <div className={styles.total}>
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button 
                className={styles.checkoutButton}
                onClick={handleCheckout}
              >
                {user ? 'Proceed to Checkout' : 'Login to Checkout'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 