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
