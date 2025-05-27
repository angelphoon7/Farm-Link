import { compare } from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Here you would typically:
    // 1. Find user in database by email
    // 2. Compare password hash
    // For now, we'll simulate a successful login
    // TODO: Replace with actual database lookup and password comparison

    // Simulate successful login
    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: '1',
        email,
        name: 'Test User',
        userType: 'user'
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 