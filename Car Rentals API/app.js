require('dotenv').config();
const app = require('./app/runner');

const server = app.listen(process.env.PORT, () =>
  console.log(`App Running on Port ${process.env.PORT}`)
);

// Handle rejection outside express
process.on('unhandledRejection', (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});
