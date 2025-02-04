import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';

const app = express();
const PORT = process.env.PORT || 3001;
const forceDatabaseRefresh = false;

//Middleware to parse incoming JSON data
app.use(express.json());

// Serves static files in the entire client's dist folder
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/dist'));
}

// ✅ Add a default route for `/` before the API routes
app.get('/', (_, res) => {
  res.status(200).send("✅ API is running...");
});

app.use(routes);

// Test database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully.');
    return sequelize.sync({ force: forceDatabaseRefresh });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection error:', err);
  });
