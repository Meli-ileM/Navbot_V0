require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 5000;

console.log('Starting server, PORT =', PORT);

try {
  const server = app.listen(PORT, () => {
    console.log(`🚀 Backend NavBot lancé sur le port ${PORT}`);
  });

  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    server.close(() => process.exit(1));
  });
  process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection at:', reason);
  });
} catch (err) {
  console.error('Failed to start server:', err);
  process.exit(1);
}
