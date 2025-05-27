import { useState } from 'react';
import styles from '../styles/LoginModal.module.css';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('user');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    farmName: '',
    address: '',
    farmSize: '',
    licenseNumber: '',
    licenseDocument: null
  });
  const [licensePreview, setLicensePreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!isLogin) {
      // Registration
      const formDataToSend = { ...formData, userType };
      if (formDataToSend.licenseDocument) {
        formDataToSend.licenseDocument = formDataToSend.licenseDocument.name;
      }
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formDataToSend),
      });
      if (res.ok) {
        setSuccessMessage('Registered successfully!');
        setTimeout(() => {
          setSuccessMessage('');
          onClose();
        }, 1500);
      } else {
        const data = await res.json();
        setErrorMessage(data.message || 'Registration failed!');
      }
    } else {
      // Login
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });
      
      if (res.ok) {
        const data = await res.json();
        setSuccessMessage('Login successful!');
        onLoginSuccess(data.user);
        setTimeout(() => {
          setSuccessMessage('');
          onClose();
        }, 1500);
      } else {
        const data = await res.json();
        setErrorMessage(data.message || 'Login failed!');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        licenseDocument: file
      }));
      // Create preview URL for the uploaded file
      const previewUrl = URL.createObjectURL(file);
      setLicensePreview(previewUrl);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeButton}>×</button>
        
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${isLogin ? styles.active : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`${styles.tab} ${!isLogin ? styles.active : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        {successMessage && (
          <div className={styles.successMessage}>{successMessage}</div>
        )}
        
        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          {!isLogin &&
            <>
              <div className={styles.userType}>
                <label>
                  <input
                    type="radio"
                    name="userType"
                    value="user"
                    checked={userType === 'user'}
                    onChange={(e) => setUserType(e.target.value)}
                  />
                  User
                </label>
                <label>
                  <input
                    type="radio"
                    name="userType"
                    value="farmer"
                    checked={userType === 'farmer'}
                    onChange={(e) => setUserType(e.target.value)}
                  />
                  Farmer
                </label>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {userType === 'farmer' && (
                <>
                  <div className={styles.formGroup}>
                    <label htmlFor="farmName">Farm Name</label>
                    <input
                      type="text"
                      id="farmName"
                      name="farmName"
                      value={formData.farmName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="farmSize">Farm Size (in acres)</label>
                    <input
                      type="number"
                      id="farmSize"
                      name="farmSize"
                      value={formData.farmSize}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="licenseNumber">Farmer License Number</label>
                    <input
                      type="text"
                      id="licenseNumber"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="licenseDocument">Upload License Document</label>
                    <input
                      type="file"
                      id="licenseDocument"
                      name="licenseDocument"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      required
                    />
                    <p className={styles.fileHelp}>Accepted formats: PDF, JPG, PNG</p>
                    {licensePreview && (
                      <div className={styles.filePreview}>
                        <p>Selected file: {formData.licenseDocument?.name}</p>
                      </div>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="address">Farm Address</label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </>
              )}
            </>
          }

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
} 