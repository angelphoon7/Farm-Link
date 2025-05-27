import { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const SatelliteMap = ({ onLocationSelect }) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [satelliteImage, setSatelliteImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSatelliteImage = async (lat, lng) => {
    setIsLoading(true);
    setError(null);
    setSatelliteImage(null);
    try {
      const res = await fetch('/api/satellite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lat, lng }),
      });
      const data = await res.json();
      if (data.imageUrl) {
        setSatelliteImage(data.imageUrl);
      } else {
        setError(data.error || 'Failed to fetch satellite image.');
      }
    } catch (err) {
      setError('Failed to fetch satellite image.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarker({ lat, lng });
    fetchSatelliteImage(lat, lng);
    onLocationSelect({ lat, lng });
  };

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = {
    lat: 0,
    lng: 0,
  };

  return (
    <div className="satellite-map-container">
      {error && (
        <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>
      )}
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={2}
          onClick={handleMapClick}
          onLoad={setMap}
        >
          {marker && <Marker position={marker} />}
        </GoogleMap>
      </LoadScript>
      {isLoading && (
        <div className="loading" style={{ textAlign: 'center', marginTop: '1rem' }}>
          Loading satellite imagery...
        </div>
      )}
      {satelliteImage && !isLoading && (
        <div className="satellite-image-container">
          <h3>Satellite Image</h3>
          <img
            src={satelliteImage}
            alt="Satellite view"
            style={{ width: '100%', maxWidth: '512px', marginTop: '1rem' }}
          />
        </div>
      )}
    </div>
  );
};

export default SatelliteMap; 