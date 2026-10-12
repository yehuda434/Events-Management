import app from './app';
import { config } from './config';
import { testConnection } from './db';

const server = app.listen(config.port, async () => {
  console.log(`===============================================`);
  console.log(`🚀 Event Management Server running on port ${config.port}`);
  console.log(`📡 Base URL: http://localhost:${config.port}/api`);
  console.log(`===============================================`);

  // Verify connection to Neon PostgreSQL
  await testConnection();
});

export default server;
