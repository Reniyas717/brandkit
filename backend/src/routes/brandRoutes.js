const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');

const { authenticateToken, requireSeller } = require('../middleware/authMiddleware');

// PROTECTED SELLER ROUTES (Must be before /:identifier to avoid collision if identifier is 'me')

// GET /api/v1/brands/me - Get current seller's brand
router.get('/me', authenticateToken, requireSeller, brandController.getAccountBrand);

// PUT /api/v1/brands/me - Update current seller's brand
router.put('/me', authenticateToken, requireSeller, brandController.updateAccountBrand);

// POST /api/v1/brands - Create a new brand for the seller
router.post('/', authenticateToken, requireSeller, brandController.createAccountBrand);

// GET /api/v1/brands/me/products - Get all products for seller's brand
router.get('/me/products', authenticateToken, requireSeller, brandController.getSellerProducts);

// POST /api/v1/brands/me/products - Create a new product for seller's brand
router.post('/me/products', authenticateToken, requireSeller, brandController.createSellerProduct);

// PUT /api/v1/brands/me/products/:productId - Update a product
router.put('/me/products/:productId', authenticateToken, requireSeller, brandController.updateSellerProduct);

// DELETE /api/v1/brands/me/products/:productId - Delete a product
router.delete('/me/products/:productId', authenticateToken, requireSeller, brandController.deleteSellerProduct);

// GET /api/v1/brands/me/analytics - Get analytics for seller's brand
router.get('/me/analytics', authenticateToken, requireSeller, brandController.getSellerAnalytics);


// PUBLIC ROUTES

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
