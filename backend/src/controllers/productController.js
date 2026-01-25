const Product = require('../models/Product');
const { asyncHandler } = require('../middleware/errorHandler');
const { AppError } = require('../middleware/errorHandler');

exports.getAllProducts = asyncHandler(async (req, res) => {
    const filters = {
        brandId: req.query.brandId,
        minPrice: req.query.minPrice,
        maxPrice: req.query.maxPrice,
    };

    const products = await Product.findAll(filters);

    res.status(200).json({
        status: 'success',
        results: products.length,
        data: { products },
    });
});

exports.getProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
        return next(new AppError('Product not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: { product },
    });
});

exports.getProductWithMetadata = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.getWithMetadata(id);

    if (!product) {
        return next(new AppError('Product not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: { product },
    });
});
