const SubscriptionKit = require('../models/SubscriptionKit');
const Product = require('../models/Product');
const { AppError } = require('../middleware/errorHandler');

// Get all kits
const getAllKits = async (req, res, next) => {
    try {
        const kits = await SubscriptionKit.findAll();
        res.json(kits);
    } catch (error) {
        next(error);
    }
};

// Get kit by ID
const getKitById = async (req, res, next) => {
    try {
        const kit = await SubscriptionKit.findById(req.params.id);
        if (!kit) {
            throw new AppError('Kit not found', 404);
        }
        res.json(kit);
    } catch (error) {
        next(error);
    }
};

// Create new kit
const createKit = async (req, res, next) => {
    try {
        const userId = req.user?.id || null;
        const kit = await SubscriptionKit.create({
            user_id: userId,
            status: 'draft'
        });
        res.status(201).json(kit);
    } catch (error) {
        next(error);
    }
};

// Add item to kit
const addItemToKit = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { product_id, quantity = 1 } = req.body;

        // Verify kit exists
        const kit = await SubscriptionKit.findById(id);
        if (!kit) {
            throw new AppError('Kit not found', 404);
        }

        // Get product details for price
        const product = await Product.findById(product_id);
        if (!product) {
            throw new AppError('Product not found', 404);
        }

        const item = await SubscriptionKit.addItem(id, {
            product_id,
            quantity,
            price_at_addition: product.price
        });

        res.status(201).json(item);
    } catch (error) {
        next(error);
    }
};

// Remove item from kit
const removeItemFromKit = async (req, res, next) => {
    try {
        const { id, itemId } = req.params;

        // Verify kit exists
        const kit = await SubscriptionKit.findById(id);
        if (!kit) {
            throw new AppError('Kit not found', 404);
        }

        await SubscriptionKit.removeItem(id, itemId);
        res.json({ message: 'Item removed successfully' });
    } catch (error) {
        next(error);
    }
};

// Update item quantity
const updateItemQuantity = async (req, res, next) => {
    try {
        const { id, itemId } = req.params;
        const { quantity } = req.body;

        // Verify kit exists
        const kit = await SubscriptionKit.findById(id);
        if (!kit) {
            throw new AppError('Kit not found', 404);
        }

        const item = await SubscriptionKit.updateItemQuantity(id, itemId, quantity);
        res.json(item);
    } catch (error) {
        next(error);
    }
};

// Set delivery frequency
const setDeliveryFrequency = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { frequency_id } = req.body;

        // Verify kit exists
        const kit = await SubscriptionKit.findById(id);
        if (!kit) {
            throw new AppError('Kit not found', 404);
        }

        const updatedKit = await SubscriptionKit.setFrequency(id, frequency_id);
        res.json(updatedKit);
    } catch (error) {
        next(error);
    }
};

// Confirm kit subscription
const confirmKit = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;

        // Verify kit exists
        const kit = await SubscriptionKit.findById(id);
        if (!kit) {
            throw new AppError('Kit not found', 404);
        }

        // Check if kit has items
        if (!kit.items || kit.items.length === 0) {
            throw new AppError('Cannot confirm an empty kit', 400);
        }

        const confirmedKit = await SubscriptionKit.confirm(id, userId);
        res.json(confirmedKit);
    } catch (error) {
        next(error);
    }
};

// Get user's subscriptions
const getUserSubscriptions = async (req, res, next) => {
    try {
        const userId = req.user.id;
        
        if (!userId) {
            throw new AppError('User not authenticated', 401);
        }

        const subscriptions = await SubscriptionKit.findAllByUser(userId);
        res.json(subscriptions || []);
    } catch (error) {
        console.error('Error in getUserSubscriptions:', error);
        next(error);
    }
};

module.exports = {
    getAllKits,
    getKitById,
    createKit,
    addItemToKit,
    removeItemFromKit,
    updateItemQuantity,
    setDeliveryFrequency,
    confirmKit,
    getUserSubscriptions
};
