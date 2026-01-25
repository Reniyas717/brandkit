const db = require('../config/database');

class Product {
    static async findAll(filters = {}) {
        let query = 'SELECT * FROM products WHERE is_available = true';
        const params = [];
        let paramCount = 1;

        if (filters.brandId) {
            query += ` AND brand_id = $${paramCount}`;
            params.push(filters.brandId);
            paramCount++;
        }

        if (filters.minPrice) {
            query += ` AND price >= $${paramCount}`;
            params.push(filters.minPrice);
            paramCount++;
        }

        if (filters.maxPrice) {
            query += ` AND price <= $${paramCount}`;
            params.push(filters.maxPrice);
            paramCount++;
        }

        query += ' ORDER BY created_at DESC';

        const result = await db.query(query, params);
        return result.rows;
    }

    static async findById(id) {
        const result = await db.query('SELECT * FROM products WHERE id = $1', [id]);
        return result.rows[0];
    }

    static async getMetadata(productId) {
        const result = await db.query(
            'SELECT key, value FROM product_metadata WHERE product_id = $1',
            [productId]
        );
        return result.rows;
    }

    static async getWithMetadata(productId) {
        const product = await this.findById(productId);
        if (!product) return null;

        const metadata = await this.getMetadata(productId);
        return {
            ...product,
            metadata: metadata.reduce((acc, { key, value }) => {
                acc[key] = value;
                return acc;
            }, {}),
        };
    }

    static async create(productData) {
        const { brand_id, name, description, price, image_url } = productData;
        const result = await db.query(
            `INSERT INTO products (brand_id, name, description, price, image_url)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [brand_id, name, description, price, image_url]
        );
        return result.rows[0];
    }
}

module.exports = Product;
