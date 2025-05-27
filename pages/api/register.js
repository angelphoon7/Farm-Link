import { hash } from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password, name, userType, farmName, farmSize, licenseNumber, licenseDocument, address } = req.body;

    // Basic validation
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Additional validation for farmers
    if (userType === 'farmer') {
      if (!farmName || !farmSize || !licenseNumber || !licenseDocument || !address) {
        return res.status(400).json({ message: 'Missing required farmer fields' });
      }
    }

    // Hash the password
    const hashedPassword = await hash(password, 12);

    // Here you would typically:
    // 1. Check if user already exists
    // 2. Save user to database
    // 3. Handle file upload for license document
    // For now, we'll just return success

    return res.status(200).json({ 
      message: 'Registration successful',
      user: {
        email,
        name,
        userType,
        ...(userType === 'farmer' && {
          farmName,
          farmSize,
          licenseNumber,
          address
        })
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 