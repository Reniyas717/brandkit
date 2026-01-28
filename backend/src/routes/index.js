const express = require('express');
const brandRoutes = require('./brandRoutes');
const productRoutes = require('./productRoutes');
const kitRoutes = require('./kitRoutes');

const authRoutes = require('./authRoutes');
const db = require('../config/database');

const router = express.Router();

// API version 1 routes
router.use('/auth', authRoutes);
router.use('/brands', brandRoutes);
router.use('/products', productRoutes);
router.use('/kits', kitRoutes);

// Delivery frequencies endpoint
router.get('/frequencies', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM delivery_frequencies ORDER BY days');
        res.json({
            status: 'success',
            data: { frequencies: result.rows }
        });
    } catch (error) {
        console.error('Error fetching frequencies:', error);
        res.status(500).json({ status: 'error', message: 'Failed to fetch frequencies' });
    }
});

// Health check endpoint
router.get('/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'API is running',
        timestamp: new Date().toISOString(),
    });
});

module.exports = router;
