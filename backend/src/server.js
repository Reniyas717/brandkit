const app = require('./app');
const config = require('./config/env');
const db = require('./config/database');

const PORT = config.port;

// Test database connection
db.query('SELECT NOW()')
    .then(() => {
        console.log('✅ Database connected successfully');

        // Start server
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT} in ${config.nodeEnv} mode`);
            console.log(`📡 API available at http://localhost:${PORT}/api/${config.apiVersion}`);
        });
    })
    .catch((err) => {
        console.error('❌ Database connection failed:', err.message);
        process.exit(1);
    });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    process.exit(1);
});
