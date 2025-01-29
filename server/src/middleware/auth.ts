import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
  id?: number;
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): Response | void => {
  // TODO: verify the token exists and add the user data to the request object
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "Access token is missing" });
    return;
  }
    
  const token = authHeader.split(' ')[1];

    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      console.error('JWT secret key is missing');
      return res.status(500).json({ message: 'Server error' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.error('JWT verify error:', err);
        res.status(403).json({ message: 'Invalid token' });
      } else {
        req.user = decoded as JwtPayload;
        next();
      }
    });
};
