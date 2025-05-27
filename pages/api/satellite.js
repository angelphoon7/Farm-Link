import ee from '@google/earthengine';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
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
      .filterDate(ee.Date.now().advance(-30, 'day'), ee.Date.now())
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
} 