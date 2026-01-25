const express = require('express');
const brandRoutes = require('./brandRoutes');
const productRoutes = require('./productRoutes');
const kitRoutes = require('./kitRoutes');

const router = express.Router();

// API version 1 routes
router.use('/brands', brandRoutes);
router.use('/products', productRoutes);
router.use('/kits', kitRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'API is running',
        timestamp: new Date().toISOString(),
    });
});

module.exports = router;
