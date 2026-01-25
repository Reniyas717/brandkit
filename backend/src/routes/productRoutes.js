const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET /api/v1/products - Get all products with optional filters
router.get('/', productController.getAllProducts);

// GET /api/v1/products/:id - Get product by ID
router.get('/:id', productController.getProduct);

// GET /api/v1/products/:id/details - Get product with metadata
router.get('/:id/details', productController.getProductWithMetadata);

module.exports = router;
