import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

console.log("🚀 Registering routes...");

// ✅ Debugging log to check if `authRoutes` is defined
if (!authRoutes) {
    console.error("❌ ERROR: authRoutes is undefined! Check your import in index.ts.");
  } else {
    console.log("✅ authRoutes successfully imported.");
  }

// ✅ Debugging log to confirm routes are loaded
router.use('/auth', (_req, _res, next) => {
    console.log("✅ [DEBUG] Loading /auth routes...");
    next();
  }, authRoutes);
  
  router.use('/api', (_req, _res, next) => {
    console.log("✅ Loading /api routes...");
    next();
  }, authenticateToken, apiRoutes);
  
  console.log("✅ Routes successfully registered!");
  
  export default router;
