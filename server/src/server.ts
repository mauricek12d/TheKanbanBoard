import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import expressListRoutes from 'express-list-routes';
import dotenv from 'dotenv';
import { sequelize } from './models/index.js';
import seedAll from './seeds/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001; // ✅ Render uses a dynamic port, fallback for local dev
const forceDatabaseRefresh = false;

// ✅ Required for __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Debugging logs
console.log("✅ `routes` successfully imported.");

// ✅ Explicitly Register Routes
import authRoutes from './routes/auth-routes.js';
import { ticketRouter } from './routes/api/ticket-routes.js';

app.use('/auth', authRoutes);  // ✅ Ensure /auth/login works
app.use('/api/tickets', ticketRouter);  // ✅ Ensure /api/tickets works

// ✅ Serve React build files (Frontend)
const clientDistPath = path.join(__dirname, '../../client/dist');
app.use(express.static(clientDistPath));

// ✅ Serve frontend for root `/`
app.get('/', (_req, res) => {
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

// ✅ Serve frontend for unknown routes (except API)
app.get('*', (req, res) => {
  if (req.url.startsWith('/api')) {
    return res.status(404).json({ message: 'Not Found' });
  } else {
    return res.sendFile(path.join(clientDistPath, 'index.html')); // ✅ Fix ENOENT issue
  }
});

// ✅ Ensure routes are listed AFTER app initialization
console.log("🚀 Listing all registered routes...");
expressListRoutes(app);

// ✅ Test database connection & Seed Database (Only in Render if ENV is set)
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully.');
    await sequelize.sync({ force: forceDatabaseRefresh });

    if (process.env.RUN_SEED === "true") {
      console.log("🚀 Running database seed...");
      await seedAll();
    }

    // ✅ Start server only after DB setup
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
      expressListRoutes(app);
    });

    return true; // ✅ Ensures all paths return a value
  } catch (err) {
    console.error('❌ Database connection error:', err);
    return false; // ✅ Ensures all paths return a value
  }
};

startServer();

export default app;
