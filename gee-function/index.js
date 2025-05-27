const ee = require('@google/earthengine');

exports.getSatelliteImage = async (req, res) => {
  // For CORS (if calling from browser)
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST');
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  const { lat, lng } = req.body;

  try {
    await ee.initialize({
      credentials: {
        client_email: process.env.EE_CLIENT_EMAIL,
        private_key: process.env.EE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
    });

    const point = ee.Geometry.Point([lng, lat]);
    const sentinel2 = ee.ImageCollection('COPERNICUS/S2_SR')
      .filterBounds(point)
      .filterDate('2023-01-01', '2023-12-31') // or use dynamic dates
      .sort('CLOUD_COVERAGE_ASSESSMENT')
      .first();

    const imageUrl = await sentinel2.getThumbURL({
      dimensions: 512,
      format: 'jpg',
      bands: ['B4', 'B3', 'B2'],
      min: 0,
      max: 3000,
      gamma: 1.4,
    });

    res.status(200).json({ imageUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 