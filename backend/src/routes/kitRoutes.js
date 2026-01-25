const express = require('express');
const router = express.Router();
const kitController = require('../controllers/kitController');

// POST /api/v1/kits/initialize - Initialize or get draft kit
router.post('/initialize', kitController.initializeKit);

// GET /api/v1/kits/frequencies - Get delivery frequencies
router.get('/frequencies', kitController.getDeliveryFrequencies);

// GET /api/v1/kits/:kitId - Get kit summary
router.get('/:kitId', kitController.getKitSummary);

// POST /api/v1/kits/:kitId/items - Add product to kit
router.post('/:kitId/items', kitController.addProductToKit);

// PATCH /api/v1/kits/:kitId/items/:productId - Update item quantity
router.patch('/:kitId/items/:productId', kitController.updateKitItemQuantity);

// DELETE /api/v1/kits/:kitId/items/:productId - Remove item from kit
router.delete('/:kitId/items/:productId', kitController.removeKitItem);

// PATCH /api/v1/kits/:kitId/frequency - Set delivery frequency
router.patch('/:kitId/frequency', kitController.setDeliveryFrequency);

// POST /api/v1/kits/:kitId/confirm - Confirm kit
router.post('/:kitId/confirm', kitController.confirmKit);

module.exports = router;
