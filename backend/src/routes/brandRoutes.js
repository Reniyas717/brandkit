const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');

// GET /api/v1/brands - Get all brands
router.get('/', brandController.getAllBrands);

// GET /api/v1/brands/:identifier - Get brand by ID or slug
router.get('/:identifier', brandController.getBrand);

// GET /api/v1/brands/:identifier/details - Get brand with full details
router.get('/:identifier/details', brandController.getBrandWithDetails);

// GET /api/v1/brands/:identifier/products - Get brand products
router.get('/:identifier/products', brandController.getBrandProducts);

// GET /api/v1/brands/:identifier/sustainability - Get brand sustainability tags
router.get('/:identifier/sustainability', brandController.getBrandSustainability);

module.exports = router;
