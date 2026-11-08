import { app } from './app.js';
import { env } from './config/env.js';
import { sequelize } from './config/database.js';

try {
  await sequelize.authenticate();
  console.log('MySQL connection established.');
} catch (error) {
  console.warn(`MySQL is unavailable at startup: ${error.message}`);
  console.warn('API will start, but database-backed features need a configured MySQL server.');
}

app.listen(env.PORT, () => console.log(`EduPilot API listening on port ${env.PORT}`));
