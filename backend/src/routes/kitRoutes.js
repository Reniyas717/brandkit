const express = require('express');
const router = express.Router();
const kitController = require('../controllers/kitController');
const { authenticateToken } = require('../middleware/authMiddleware');

// User's subscriptions - must be before /:id routes to avoid conflict
router.get('/my-subscriptions', authenticateToken, kitController.getUserSubscriptions);

// Public routes
router.get('/', kitController.getAllKits);

// Protected routes
router.post('/', authenticateToken, kitController.createKit);
router.get('/:id', kitController.getKitById);
router.post('/:id/items', authenticateToken, kitController.addItemToKit);
router.delete('/:id/items/:itemId', authenticateToken, kitController.removeItemFromKit);
router.patch('/:id/items/:itemId', authenticateToken, kitController.updateItemQuantity);
router.patch('/:id/frequency', authenticateToken, kitController.setDeliveryFrequency);
router.post('/:id/confirm', authenticateToken, kitController.confirmKit);

module.exports = router;
