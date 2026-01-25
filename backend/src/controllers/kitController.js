const SubscriptionKit = require('../models/SubscriptionKit');
const Product = require('../models/Product');
const DeliveryFrequency = require('../models/DeliveryFrequency');
const { asyncHandler } = require('../middleware/errorHandler');
const { AppError } = require('../middleware/errorHandler');

exports.initializeKit = asyncHandler(async (req, res) => {
    const userId = req.body.userId || 1; // TODO: Get from auth middleware

    // Check if user already has a draft kit
    let kit = await SubscriptionKit.findDraftByUser(userId);

    if (!kit) {
        kit = await SubscriptionKit.create(userId);
    }

    res.status(200).json({
        status: 'success',
        data: { kit },
    });
});

exports.addProductToKit = asyncHandler(async (req, res, next) => {
    const { kitId } = req.params;
    const { productId, quantity = 1 } = req.body;

    // Verify kit exists and is in draft status
    const kit = await SubscriptionKit.findById(kitId);
    if (!kit) {
        return next(new AppError('Kit not found', 404));
    }
    if (kit.status !== 'draft') {
        return next(new AppError('Cannot modify confirmed kit', 400));
    }

    // Verify product exists and get price
    const product = await Product.findById(productId);
    if (!product) {
        return next(new AppError('Product not found', 404));
    }
    if (!product.is_available) {
        return next(new AppError('Product is not available', 400));
    }

    // Add item to kit
    const item = await SubscriptionKit.addItem(kitId, productId, quantity, product.price);

    res.status(200).json({
        status: 'success',
        data: { item },
    });
});

exports.updateKitItemQuantity = asyncHandler(async (req, res, next) => {
    const { kitId, productId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
        return next(new AppError('Quantity must be at least 1', 400));
    }

    // Verify kit is in draft status
    const kit = await SubscriptionKit.findById(kitId);
    if (!kit) {
        return next(new AppError('Kit not found', 404));
    }
    if (kit.status !== 'draft') {
        return next(new AppError('Cannot modify confirmed kit', 400));
    }

    const item = await SubscriptionKit.updateItemQuantity(kitId, productId, quantity);

    res.status(200).json({
        status: 'success',
        data: { item },
    });
});

exports.removeKitItem = asyncHandler(async (req, res, next) => {
    const { kitId, productId } = req.params;

    // Verify kit is in draft status
    const kit = await SubscriptionKit.findById(kitId);
    if (!kit) {
        return next(new AppError('Kit not found', 404));
    }
    if (kit.status !== 'draft') {
        return next(new AppError('Cannot modify confirmed kit', 400));
    }

    await SubscriptionKit.removeItem(kitId, productId);

    res.status(204).json({
        status: 'success',
        data: null,
    });
});

exports.setDeliveryFrequency = asyncHandler(async (req, res, next) => {
    const { kitId } = req.params;
    const { frequencyId } = req.body;

    // Verify kit is in draft status
    const kit = await SubscriptionKit.findById(kitId);
    if (!kit) {
        return next(new AppError('Kit not found', 404));
    }
    if (kit.status !== 'draft') {
        return next(new AppError('Cannot modify confirmed kit', 400));
    }

    // Verify frequency exists
    const frequency = await DeliveryFrequency.findById(frequencyId);
    if (!frequency) {
        return next(new AppError('Delivery frequency not found', 404));
    }

    const updatedKit = await SubscriptionKit.setDeliveryFrequency(kitId, frequencyId);

    res.status(200).json({
        status: 'success',
        data: { kit: updatedKit },
    });
});

exports.getKitSummary = asyncHandler(async (req, res, next) => {
    const { kitId } = req.params;

    const summary = await SubscriptionKit.getSummary(kitId);
    if (!summary) {
        return next(new AppError('Kit not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: { kit: summary },
    });
});

exports.confirmKit = asyncHandler(async (req, res, next) => {
    const { kitId } = req.params;

    // Verify kit exists and is in draft status
    const kit = await SubscriptionKit.findById(kitId);
    if (!kit) {
        return next(new AppError('Kit not found', 404));
    }
    if (kit.status !== 'draft') {
        return next(new AppError('Kit is already confirmed', 400));
    }

    // Verify kit has items
    const items = await SubscriptionKit.getItems(kitId);
    if (items.length === 0) {
        return next(new AppError('Cannot confirm empty kit', 400));
    }

    // Verify delivery frequency is set
    if (!kit.delivery_frequency_id) {
        return next(new AppError('Delivery frequency must be set before confirmation', 400));
    }

    const confirmedKit = await SubscriptionKit.confirm(kitId);

    res.status(200).json({
        status: 'success',
        data: { kit: confirmedKit },
    });
});

exports.getDeliveryFrequencies = asyncHandler(async (req, res) => {
    const frequencies = await DeliveryFrequency.findAll();

    res.status(200).json({
        status: 'success',
        results: frequencies.length,
        data: { frequencies },
    });
});
