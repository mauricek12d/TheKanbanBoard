import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
  id?: number;
}

// Extend Express Request to include `user`
declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}

/**
 * Middleware to authenticate requests using JWT
 */
export const authenticateToken = (req: Request, res: Response, next: NextFunction): Response | void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Access token is missing" });
    return; 
  }
    
  const token = authHeader.split(' ')[1];

  const secretKey = process.env.JWT_SECRET_KEY;
  if (!secretKey) {
    console.error('🚨 JWT_SECRET_KEY is missing! Check your .env file.');
    return res.status(500).json({ message: 'Server error' });
    return;
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.error('❌ JWT verification failed:', err);
      return res.status(403).json({ message: 'Invalid token' });
      return;
    }

    req.user = decoded as JwtPayload;
    next();
    return;
  });
};
