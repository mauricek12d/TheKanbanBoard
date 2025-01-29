import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    console.log(`🔍 Attempting login for: ${username}`);

    // Check if user exists
    const user = await User.findOne({ where: { username } });
    if (!user) {
      console.warn("⚠️ User not found in database");
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    console.log("✅ User found, checking password...");

    // Validate password
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      console.warn("❌ Password does not match");
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    console.log("✅ Password matches, generating JWT...");

    // Retrieve JWT secret key
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      console.error("🚨 JWT_SECRET_KEY is missing! Check your .env file.");
      return res.status(500).json({ message: "Internal server error" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { username: user.username, id: user.id },
      secretKey,
      { expiresIn: '1h' }
    );

    console.log("✅ JWT successfully generated:", token);

    // Return the token
    return res.json({ token });
  } catch (error) {
    console.error("❌ Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const router = Router();
router.post('/login', login);

export default router;
