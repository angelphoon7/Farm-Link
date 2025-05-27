import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

export default function CropManagement() {
  const router = useRouter();
  const [crops, setCrops] = useState([]);
  const [formData, setFormData] = useState({
    cropType: '',
    location: '',
    size: '',
    amount: '',
    plantingDate: '',
    expectedHarvestDate: '',
    soilType: '',
    irrigationMethod: '',
    notes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Here you would typically make an API call to save the crop data
      const newCrop = {
        id: Date.now(), // temporary ID generation
        ...formData,
        createdAt: new Date().toISOString()
      };
      
      setCrops(prevCrops => [...prevCrops, newCrop]);
      setFormData({
        cropType: '',
        location: '',
        size: '',
        amount: '',
        plantingDate: '',
        expectedHarvestDate: '',
        soilType: '',
        irrigationMethod: '',
        notes: ''
      });
      
      // You can add an API call here to save to your backend
      // await fetch('/api/crops', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(newCrop)
      // });
      
    } catch (error) {
      console.error('Error adding crop:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Crop Management</h1>
      
      <div className={styles.farmerInterface}>
        <h2>Add New Crop</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            <div>
              <label className={styles.label}>Crop Type</label>
              <input
                type="text"
                name="cropType"
                value={formData.cropType}
                onChange={handleInputChange}
                className={styles.formInput}
                required
              />
            </div>
            
            <div>
              <label className={styles.label}>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className={styles.formInput}
                required
              />
            </div>

            <div>
              <label className={styles.label}>Size (acres)</label>
              <input
                type="number"
                name="size"
                value={formData.size}
                onChange={handleInputChange}
                className={styles.formInput}
                required
              />
            </div>

            <div>
              <label className={styles.label}>Amount (kg)</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                className={styles.formInput}
                required
              />
            </div>

            <div>
              <label className={styles.label}>Planting Date</label>
              <input
                type="date"
                name="plantingDate"
                value={formData.plantingDate}
                onChange={handleInputChange}
                className={styles.formInput}
                required
              />
            </div>

            <div>
              <label className={styles.label}>Expected Harvest Date</label>
              <input
                type="date"
                name="expectedHarvestDate"
                value={formData.expectedHarvestDate}
                onChange={handleInputChange}
                className={styles.formInput}
                required
              />
            </div>

            <div>
              <label className={styles.label}>Soil Type</label>
              <select
                name="soilType"
                value={formData.soilType}
                onChange={handleInputChange}
                className={styles.formSelect}
                required
              >
                <option value="">Select soil type</option>
                <option value="clay">Clay</option>
                <option value="sandy">Sandy</option>
                <option value="loamy">Loamy</option>
                <option value="silt">Silt</option>
              </select>
            </div>

            <div>
              <label className={styles.label}>Irrigation Method</label>
              <select
                name="irrigationMethod"
                value={formData.irrigationMethod}
                onChange={handleInputChange}
                className={styles.formSelect}
                required
              >
                <option value="">Select irrigation method</option>
                <option value="drip">Drip Irrigation</option>
                <option value="sprinkler">Sprinkler</option>
                <option value="flood">Flood</option>
                <option value="manual">Manual</option>
              </select>
            </div>
          </div>

          <div>
            <label className={styles.label}>Additional Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows="3"
              className={styles.formTextarea}
            ></textarea>
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="submit"
              className={styles.farmerButton}
            >
              Add Crop
            </button>
          </div>
        </form>
      </div>

      {/* Display existing crops */}
      <div className={styles.farmerInterface}>
        <h2>Your Crops</h2>
        <div className={styles.productGrid}>
          {crops.map((crop) => (
            <div key={crop.id} className={styles.productCard}>
              <h3>{crop.cropType}</h3>
              <p className={styles.farmer}>Location: {crop.location}</p>
              <p className={styles.price}>Size: {crop.size} acres</p>
              <p className={styles.description}>Amount: {crop.amount} kg</p>
              <p className={styles.description}>Planting Date: {new Date(crop.plantingDate).toLocaleDateString()}</p>
              <p className={styles.description}>Expected Harvest: {new Date(crop.expectedHarvestDate).toLocaleDateString()}</p>
              <p className={styles.description}>Soil Type: {crop.soilType}</p>
              <p className={styles.description}>Irrigation: {crop.irrigationMethod}</p>
              {crop.notes && <p className={styles.description}>Notes: {crop.notes}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
