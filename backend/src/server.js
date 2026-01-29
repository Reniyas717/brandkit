const app = require('./app');
const config = require('./config/env');
const db = require('./config/database');

const PORT = process.env.PORT || config.port || 5000;
const HOST = '0.0.0.0'; // Required for Render

// Start server first, then test database
const server = app.listen(PORT, HOST, () => {
    console.log(`🚀 Server running on ${HOST}:${PORT} in ${config.nodeEnv} mode`);
    console.log(`📡 API available at http://localhost:${PORT}/api/${config.apiVersion}`);
    
    // Test database connection after server starts
    db.query('SELECT NOW()')
        .then((result) => {
            console.log('✅ Database connected successfully at:', result.rows[0].now);
        })
        .catch((err) => {
            console.error('⚠️ Database connection warning:', err.message);
            console.log('Server will continue running, but database features may not work.');
        });
});

server.on('error', (err) => {
    console.error('Server error:', err.message);
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
