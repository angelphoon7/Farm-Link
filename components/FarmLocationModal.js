import { useState, useEffect } from 'react';
import styles from '../styles/FarmLocationModal.module.css';

export default function FarmLocationModal({ isOpen, onClose, farmAddress, onConfirm }) {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [confirmedLocation, setConfirmedLocation] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  useEffect(() => {
    if (isOpen && !map) {
      // Load Google Maps script
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.onload = initializeMap;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isOpen]);

  const initializeMap = () => {
    const geocoder = new window.google.maps.Geocoder();
    
    geocoder.geocode({ address: farmAddress }, (results, status) => {
      if (status === 'OK') {
        const location = results[0].geometry.location;
        const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
          center: location,
          zoom: 15,
          mapTypeId: 'satellite'
        });

        const markerInstance = new window.google.maps.Marker({
          position: location,
          map: mapInstance,
          draggable: true
        });

        setMap(mapInstance);
        setMarker(markerInstance);
        setConfirmedLocation(location);
      }
    });
  };

  const handleMarkerDragEnd = () => {
    if (marker) {
      setConfirmedLocation(marker.getPosition());
    }
  };

  const analyzeLocation = async () => {
    if (!confirmedLocation) return;

    setIsAnalyzing(true);
    try {
      // Here you would typically:
      // 1. Send the coordinates to your backend
      // 2. Use Google Earth Engine API to analyze the location
      // 3. Get information about soil type, vegetation, etc.
      
      // Simulating analysis for now
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setAnalysisResult({
        soilType: 'Loamy',
        vegetation: 'Agricultural land',
        waterAvailability: 'Good',
        suitability: 'High'
      });
    } catch (error) {
      console.error('Location analysis error:', error);
      setAnalysisResult({
        error: 'Failed to analyze location'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleConfirm = () => {
    if (confirmedLocation && analysisResult) {
      onConfirm({
        lat: confirmedLocation.lat(),
        lng: confirmedLocation.lng(),
        analysis: analysisResult
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeButton}>×</button>
        
        <h2>Confirm Farm Location</h2>
        <p className={styles.description}>
          Please confirm your farm location on the map. You can drag the marker to adjust the position.
        </p>

        <div id="map" className={styles.map}></div>

        {confirmedLocation && !analysisResult && (
          <button 
            className={styles.analyzeButton}
            onClick={analyzeLocation}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Location'}
          </button>
        )}

        {analysisResult && (
          <div className={styles.analysisResults}>
            <h3>Location Analysis</h3>
            {analysisResult.error ? (
              <p className={styles.error}>{analysisResult.error}</p>
            ) : (
              <div className={styles.resultsGrid}>
                <div className={styles.resultItem}>
                  <span>Soil Type:</span>
                  <span>{analysisResult.soilType}</span>
                </div>
                <div className={styles.resultItem}>
                  <span>Vegetation:</span>
                  <span>{analysisResult.vegetation}</span>
                </div>
                <div className={styles.resultItem}>
                  <span>Water Availability:</span>
                  <span>{analysisResult.waterAvailability}</span>
                </div>
                <div className={styles.resultItem}>
                  <span>Suitability:</span>
                  <span>{analysisResult.suitability}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {analysisResult && !analysisResult.error && (
          <button 
            className={styles.confirmButton}
            onClick={handleConfirm}
          >
            Confirm Location
          </button>
        )}
      </div>
    </div>
  );
} 