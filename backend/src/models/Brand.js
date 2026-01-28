const db = require('../config/database');

class Brand {
    static async findAll() {
        const result = await db.query('SELECT * FROM brands ORDER BY created_at DESC');
        return result.rows;
    }

    static async findById(id) {
        const result = await db.query('SELECT * FROM brands WHERE id = $1', [id]);
        return result.rows[0];
    }

    static async findBySlug(slug) {
        const result = await db.query('SELECT * FROM brands WHERE slug = $1', [slug]);
        return result.rows[0];
    }

    static async findBySellerId(sellerId) {
        const result = await db.query('SELECT * FROM brands WHERE seller_id = $1', [sellerId]);
        return result.rows[0];
    }

    static async getSustainabilityTags(brandId) {
        const result = await db.query(
            'SELECT tag_type, tag_value FROM brand_sustainability_tags WHERE brand_id = $1',
            [brandId]
        );
        return result.rows;
    }

    static async getProducts(brandId, includeUnavailable = true) {
        // For sellers, include all products. For public, only available ones.
        const condition = includeUnavailable ? '' : 'AND p.is_available = true';
        const result = await db.query(
            `SELECT p.*, b.name as brand_name, b.slug as brand_slug 
             FROM products p
             JOIN brands b ON p.brand_id = b.id
             WHERE p.brand_id = $1 ${condition} 
             ORDER BY p.created_at DESC`,
            [brandId]
        );
        return result.rows;
    }

    static async create(brandData) {
        const { name, slug, logo_url, banner_url, description, story } = brandData;
        const result = await db.query(
            `INSERT INTO brands (name, slug, logo_url, banner_url, description, story)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [name, slug, logo_url, banner_url, description, story]
        );
        return result.rows[0];
    }

    static async createWithSeller(brandData, sellerId) {
        const { name, slug, logo_url, banner_url, description, story, theme_config } = brandData;
        const result = await db.query(
            `INSERT INTO brands (name, slug, logo_url, banner_url, description, story, theme_config, seller_id)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [name, slug, logo_url, banner_url, description, story, theme_config, sellerId]
        );
        return result.rows[0];
    }

    static async update(id, brandData) {
        const { name, slug, logo_url, banner_url, description, story, theme_config } = brandData;
        const result = await db.query(
            `UPDATE brands 
             SET name = $1, slug = $2, logo_url = $3, banner_url = $4, description = $5, story = $6, theme_config = $7, updated_at = NOW()
             WHERE id = $8 RETURNING *`,
            [name, slug, logo_url, banner_url, description, story, theme_config, id]
        );
        return result.rows[0];
    }

    // Analytics for seller dashboard - Real data from subscription kits
    static async getAnalytics(brandId, days = 30) {
        const dateThreshold = new Date();
        dateThreshold.setDate(dateThreshold.getDate() - days);
        
        // Get product count
        const productsResult = await db.query(
            'SELECT COUNT(*) as total, COUNT(*) FILTER (WHERE is_available = true) as available FROM products WHERE brand_id = $1',
            [brandId]
        );
        const productStats = productsResult.rows[0];

        // Get products by category
        const categoryResult = await db.query(
            `SELECT category, COUNT(*) as count 
             FROM products WHERE brand_id = $1 
             GROUP BY category ORDER BY count DESC`,
            [brandId]
        );

        // Get real order data from confirmed subscription kits containing this brand's products
        const ordersResult = await db.query(
            `SELECT 
                COUNT(DISTINCT sk.id) as total_orders,
                COUNT(DISTINCT sk.user_id) as total_customers,
                COALESCE(SUM(ki.price_at_addition * ki.quantity), 0) as total_revenue
             FROM subscription_kits sk
             JOIN kit_items ki ON sk.id = ki.kit_id
             JOIN products p ON ki.product_id = p.id
             WHERE p.brand_id = $1 
               AND sk.status = 'confirmed'
               AND sk.confirmed_at >= $2`,
            [brandId, dateThreshold]
        );
        const orderStats = ordersResult.rows[0];

        // Get previous period stats for trend calculation
        const previousDateThreshold = new Date(dateThreshold);
        previousDateThreshold.setDate(previousDateThreshold.getDate() - days);
        
        const previousOrdersResult = await db.query(
            `SELECT 
                COUNT(DISTINCT sk.id) as total_orders,
                COUNT(DISTINCT sk.user_id) as total_customers,
                COALESCE(SUM(ki.price_at_addition * ki.quantity), 0) as total_revenue
             FROM subscription_kits sk
             JOIN kit_items ki ON sk.id = ki.kit_id
             JOIN products p ON ki.product_id = p.id
             WHERE p.brand_id = $1 
               AND sk.status = 'confirmed'
               AND sk.confirmed_at >= $2
               AND sk.confirmed_at < $3`,
            [brandId, previousDateThreshold, dateThreshold]
        );
        const previousStats = previousOrdersResult.rows[0];

        // Calculate trends
        const calcTrend = (current, previous) => {
            if (previous === 0) return current > 0 ? 100 : 0;
            return Math.round(((current - previous) / previous) * 100);
        };

        // Get top selling products
        const topProductsResult = await db.query(
            `SELECT 
                p.id, p.name, p.category, p.price, p.image_url,
                COALESCE(SUM(ki.quantity), 0) as total_sold,
                COALESCE(SUM(ki.price_at_addition * ki.quantity), 0) as total_revenue
             FROM products p
             LEFT JOIN kit_items ki ON p.id = ki.product_id
             LEFT JOIN subscription_kits sk ON ki.kit_id = sk.id AND sk.status = 'confirmed'
             WHERE p.brand_id = $1 AND p.is_available = true
             GROUP BY p.id, p.name, p.category, p.price, p.image_url
             ORDER BY total_sold DESC, total_revenue DESC
             LIMIT 5`,
            [brandId]
        );

        // Get recent orders with this brand's products
        const recentOrdersResult = await db.query(
            `SELECT DISTINCT 
                sk.id, sk.status, sk.total_price, sk.created_at, sk.confirmed_at,
                u.name as customer_name, u.email as customer_email,
                (SELECT COALESCE(SUM(ki2.price_at_addition * ki2.quantity), 0) 
                 FROM kit_items ki2 
                 JOIN products p2 ON ki2.product_id = p2.id 
                 WHERE ki2.kit_id = sk.id AND p2.brand_id = $1) as total
             FROM subscription_kits sk
             JOIN users u ON sk.user_id = u.id
             JOIN kit_items ki ON sk.id = ki.kit_id
             JOIN products p ON ki.product_id = p.id
             WHERE p.brand_id = $1 AND sk.status = 'confirmed'
             ORDER BY sk.confirmed_at DESC NULLS LAST
             LIMIT 10`,
            [brandId]
        );

        // Category breakdown with revenue
        const categoryBreakdownResult = await db.query(
            `SELECT 
                p.category,
                COUNT(DISTINCT p.id) as product_count,
                COALESCE(SUM(ki.price_at_addition * ki.quantity), 0) as revenue
             FROM products p
             LEFT JOIN kit_items ki ON p.id = ki.product_id
             LEFT JOIN subscription_kits sk ON ki.kit_id = sk.id AND sk.status = 'confirmed'
             WHERE p.brand_id = $1
             GROUP BY p.category
             ORDER BY revenue DESC`,
            [brandId]
        );

        const totalCategoryRevenue = categoryBreakdownResult.rows.reduce((sum, cat) => sum + parseFloat(cat.revenue), 0);

        return {
            overview: {
                totalRevenue: parseFloat(orderStats.total_revenue) || 0,
                revenueTrend: calcTrend(parseFloat(orderStats.total_revenue), parseFloat(previousStats.total_revenue)),
                totalOrders: parseInt(orderStats.total_orders) || 0,
                ordersTrend: calcTrend(parseInt(orderStats.total_orders), parseInt(previousStats.total_orders)),
                totalCustomers: parseInt(orderStats.total_customers) || 0,
                customersTrend: calcTrend(parseInt(orderStats.total_customers), parseInt(previousStats.total_customers)),
                totalProducts: parseInt(productStats.total),
                availableProducts: parseInt(productStats.available),
                averageOrderValue: orderStats.total_orders > 0 
                    ? Math.round(parseFloat(orderStats.total_revenue) / parseInt(orderStats.total_orders))
                    : 0
            },
            categoryBreakdown: categoryBreakdownResult.rows.map(cat => ({
                category: cat.category,
                count: parseInt(cat.product_count),
                revenue: parseFloat(cat.revenue),
                percentage: totalCategoryRevenue > 0 
                    ? Math.round((parseFloat(cat.revenue) / totalCategoryRevenue) * 100) 
                    : 0
            })),
            topProducts: topProductsResult.rows.map((p, i) => ({
                ...p,
                rank: i + 1,
                total_sold: parseInt(p.total_sold),
                total_revenue: parseFloat(p.total_revenue)
            })),
            recentOrders: recentOrdersResult.rows.map(order => ({
                ...order,
                total_price: parseFloat(order.total_price),
                items_count: parseInt(order.items_count)
            }))
        };
    }
}

module.exports = Brand;
