const Brand = require('../models/Brand');
const { asyncHandler } = require('../middleware/errorHandler');
const { AppError } = require('../middleware/errorHandler');

exports.getAllBrands = asyncHandler(async (req, res) => {
    const brands = await Brand.findAll();

    res.status(200).json({
        status: 'success',
        results: brands.length,
        data: { brands },
    });
});

exports.getBrand = asyncHandler(async (req, res, next) => {
    const { identifier } = req.params;

    // Try to find by ID first, then by slug
    let brand = isNaN(identifier)
        ? await Brand.findBySlug(identifier)
        : await Brand.findById(parseInt(identifier));

    if (!brand) {
        return next(new AppError('Brand not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: { brand },
    });
});

exports.getBrandWithDetails = asyncHandler(async (req, res, next) => {
    const { identifier } = req.params;

    let brand = isNaN(identifier)
        ? await Brand.findBySlug(identifier)
        : await Brand.findById(parseInt(identifier));

    if (!brand) {
        return next(new AppError('Brand not found', 404));
    }

    const [sustainabilityTags, products] = await Promise.all([
        Brand.getSustainabilityTags(brand.id),
        Brand.getProducts(brand.id),
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            brand: {
                ...brand,
                sustainability_tags: sustainabilityTags,
                products,
            },
        },
    });
});

exports.getBrandProducts = asyncHandler(async (req, res, next) => {
    const { identifier } = req.params;

    let brand = isNaN(identifier)
        ? await Brand.findBySlug(identifier)
        : await Brand.findById(parseInt(identifier));

    if (!brand) {
        return next(new AppError('Brand not found', 404));
    }

    const products = await Brand.getProducts(brand.id);

    res.status(200).json({
        status: 'success',
        results: products.length,
        data: { products },
    });
});

exports.getBrandSustainability = asyncHandler(async (req, res, next) => {
    const { identifier } = req.params;

    let brand = isNaN(identifier)
        ? await Brand.findBySlug(identifier)
        : await Brand.findById(parseInt(identifier));

    if (!brand) {
        return next(new AppError('Brand not found', 404));
    }

    const tags = await Brand.getSustainabilityTags(brand.id);

    res.status(200).json({
        status: 'success',
        data: { sustainability_tags: tags },
    });
});

exports.getAccountBrand = asyncHandler(async (req, res, next) => {
    // req.user is set by authenticateToken middleware
    const sellerId = req.user.id;

    const brand = await Brand.findBySellerId(sellerId);

    if (!brand) {
        return res.status(200).json({
            status: 'success',
            data: { brand: null }, // Valid response, just no brand yet
        });
    }

    res.status(200).json({
        status: 'success',
        data: { brand },
    });
});

exports.createAccountBrand = asyncHandler(async (req, res, next) => {
    const sellerId = req.user.id;
    const existingBrand = await Brand.findBySellerId(sellerId);

    if (existingBrand) {
        return next(new AppError('You already have a brand', 400));
    }

    const { name, slug, description, story, logo_url, banner_url, theme_config } = req.body;

    // Basic validation
    if (!name || !slug) {
        return next(new AppError('Name and Slug are required', 400));
    }

    const brand = await Brand.createWithSeller({
        name,
        slug,
        description,
        story,
        logo_url,
        banner_url,
        theme_config
    }, sellerId);

    res.status(201).json({
        status: 'success',
        data: { brand },
    });
});

exports.updateAccountBrand = asyncHandler(async (req, res, next) => {
    const sellerId = req.user.id;
    const brand = await Brand.findBySellerId(sellerId);

    if (!brand) {
        return next(new AppError('Brand not found', 404));
    }

    const updatedBrand = await Brand.update(brand.id, req.body);

    res.status(200).json({
        status: 'success',
        data: { brand: updatedBrand },
    });
});

// =====================
// SELLER PRODUCT MANAGEMENT
// =====================

exports.getSellerProducts = asyncHandler(async (req, res, next) => {
    const sellerId = req.user.id;
    const brand = await Brand.findBySellerId(sellerId);

    if (!brand) {
        return next(new AppError('You must have a brand to manage products', 400));
    }

    const products = await Brand.getProducts(brand.id);

    res.status(200).json({
        status: 'success',
        results: products.length,
        data: { products },
    });
});

exports.createSellerProduct = asyncHandler(async (req, res, next) => {
    const sellerId = req.user.id;
    const brand = await Brand.findBySellerId(sellerId);

    if (!brand) {
        return next(new AppError('You must have a brand to create products', 400));
    }

    const { name, description, category, price, image_url, is_available } = req.body;

    if (!name || !price) {
        return next(new AppError('Name and price are required', 400));
    }

    const Product = require('../models/Product');
    const product = await Product.create({
        brand_id: brand.id,
        name,
        description,
        category: category || 'General',
        price: parseFloat(price),
        image_url,
        is_available: is_available !== false
    });

    res.status(201).json({
        status: 'success',
        data: { product },
    });
});

exports.updateSellerProduct = asyncHandler(async (req, res, next) => {
    const sellerId = req.user.id;
    const { productId } = req.params;
    const brand = await Brand.findBySellerId(sellerId);

    if (!brand) {
        return next(new AppError('You must have a brand to update products', 400));
    }

    const Product = require('../models/Product');
    const product = await Product.findById(productId);

    if (!product) {
        return next(new AppError('Product not found', 404));
    }

    if (product.brand_id !== brand.id) {
        return next(new AppError('You can only update your own products', 403));
    }

    const updatedProduct = await Product.update(productId, req.body);

    res.status(200).json({
        status: 'success',
        data: { product: updatedProduct },
    });
});

exports.deleteSellerProduct = asyncHandler(async (req, res, next) => {
    const sellerId = req.user.id;
    const { productId } = req.params;
    const brand = await Brand.findBySellerId(sellerId);

    if (!brand) {
        return next(new AppError('You must have a brand to delete products', 400));
    }

    const Product = require('../models/Product');
    const product = await Product.findById(productId);

    if (!product) {
        return next(new AppError('Product not found', 404));
    }

    if (product.brand_id !== brand.id) {
        return next(new AppError('You can only delete your own products', 403));
    }

    await Product.delete(productId);

    res.status(200).json({
        status: 'success',
        message: 'Product deleted successfully',
    });
});

// =====================
// SELLER ANALYTICS
// =====================

exports.getSellerAnalytics = asyncHandler(async (req, res, next) => {
    const sellerId = req.user.id;
    const brand = await Brand.findBySellerId(sellerId);

    if (!brand) {
        return next(new AppError('You must have a brand to view analytics', 400));
    }

    const { days = 30 } = req.query;
    
    // Get analytics data from Brand model
    const analytics = await Brand.getAnalytics(brand.id, parseInt(days));

    res.status(200).json({
        status: 'success',
        data: { analytics },
    });
});
