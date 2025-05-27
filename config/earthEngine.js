import ee from '@google/earthengine';

// Initialize Earth Engine with service account credentials
const initializeEarthEngine = async () => {
  try {
    // Check if already initialized
    if (ee.data.getAuthToken()) {
      return;
    }

    // Initialize with service account credentials
    await ee.initialize({
      credentials: {
        client_email: process.env.NEXT_PUBLIC_EARTH_ENGINE_CLIENT_EMAIL,
        private_key: process.env.NEXT_PUBLIC_EARTH_ENGINE_PRIVATE_KEY?.replace(/\\n/g, '\n')
      }
    });
    
    console.log('Earth Engine initialized successfully');
  } catch (error) {
    console.error('Error initializing Earth Engine:', error);
    throw error;
  }
};

export { initializeEarthEngine }; 