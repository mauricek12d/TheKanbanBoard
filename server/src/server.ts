import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import expressListRoutes from 'express-list-routes';
import dotenv from 'dotenv';
import routes from './routes/index.js';  
import { sequelize } from './models/index.js';
import seedAll from './seeds/index.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 10000;
const forceDatabaseRefresh = false;

// ✅ Required for __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Debugging logs to confirm `routes` is properly loaded
console.log("✅ `routes` successfully imported.");

// ✅ Register Routes (ensure `/auth` and `/api` are included)
console.log("🚀 Registering API routes...");
app.use('/', (req, _res, next) => {
  console.log(`✅ Incoming request: ${req.method} ${req.url}`);
  next();
}, routes);

// ✅ Serve React build files (Frontend)
app.use(express.static(path.join(__dirname, '../../client/dist')));

app.get('/', (_req, res) => {
  res.redirect('/api/tickets');
});

// ✅ Serve frontend for unknown routes (except API)
app.get('*', (req, res) => {
  if (req.url.includes('/api')) {
    return res.status(404).json({ message: 'Not Found' });
  } else {
    return res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'));
  }
});

// ✅ Ensure routes are listed AFTER app initialization
console.log("🚀 Listing all registered routes...");
expressListRoutes(app);  

// ✅ Test database connection & Seed Database (Only in Render if ENV is set)
sequelize.authenticate()
  .then(async () => {
    console.log('✅ Database connected successfully.');
    await sequelize.sync({ force: forceDatabaseRefresh });

    if (process.env.RUN_SEED === "true") {
      console.log("🚀 Running database seed...");
      await seedAll();
    }

    // ✅ Start server only after DB setup
    app.listen(PORT, () => {
      console.log(`✅ Server is running on http://localhost:${PORT}`);
      expressListRoutes(app);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection error:', err);
  });

export default app;
