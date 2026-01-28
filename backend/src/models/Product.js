const db = require('../config/database');

class Product {
    static async findAll(filters = {}) {
        let query = `
            SELECT p.*, b.name as brand_name, b.slug as brand_slug
            FROM products p
            LEFT JOIN brands b ON p.brand_id = b.id
            WHERE p.is_available = true
        `;
        const params = [];
        let paramCount = 1;

        if (filters.brandId) {
            query += ` AND p.brand_id = $${paramCount}`;
            params.push(filters.brandId);
            paramCount++;
        }

        if (filters.minPrice) {
            query += ` AND p.price >= $${paramCount}`;
            params.push(filters.minPrice);
            paramCount++;
        }

        if (filters.maxPrice) {
            query += ` AND p.price <= $${paramCount}`;
            params.push(filters.maxPrice);
            paramCount++;
        }

        query += ' ORDER BY p.created_at DESC';

        const result = await db.query(query, params);
        return result.rows;
    }

    static async findById(id) {
        const result = await db.query(`
            SELECT p.*, b.name as brand_name, b.slug as brand_slug
            FROM products p
            LEFT JOIN brands b ON p.brand_id = b.id
            WHERE p.id = $1
        `, [id]);
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
        const { brand_id, name, description, category, price, image_url, is_available } = productData;
        const result = await db.query(
            `INSERT INTO products (brand_id, name, description, category, price, image_url, is_available)
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [brand_id, name, description, category || 'General', price, image_url, is_available !== false]
        );
        return result.rows[0];
    }

    static async update(id, productData) {
        const { name, description, category, price, image_url, is_available } = productData;
        
        // Build dynamic update query
        const updates = [];
        const params = [];
        let paramCount = 1;

        if (name !== undefined) {
            updates.push(`name = $${paramCount}`);
            params.push(name);
            paramCount++;
        }
        if (description !== undefined) {
            updates.push(`description = $${paramCount}`);
            params.push(description);
            paramCount++;
        }
        if (category !== undefined) {
            updates.push(`category = $${paramCount}`);
            params.push(category);
            paramCount++;
        }
        if (price !== undefined) {
            updates.push(`price = $${paramCount}`);
            params.push(parseFloat(price));
            paramCount++;
        }
        if (image_url !== undefined) {
            updates.push(`image_url = $${paramCount}`);
            params.push(image_url);
            paramCount++;
        }
        if (is_available !== undefined) {
            updates.push(`is_available = $${paramCount}`);
            params.push(is_available);
            paramCount++;
        }

        if (updates.length === 0) {
            return this.findById(id);
        }

        params.push(id);
        const result = await db.query(
            `UPDATE products SET ${updates.join(', ')}, updated_at = NOW() 
             WHERE id = $${paramCount} RETURNING *`,
            params
        );
        return result.rows[0];
    }

    static async delete(id) {
        const result = await db.query('DELETE FROM products WHERE id = $1 RETURNING id', [id]);
        return result.rows[0];
    }
}

module.exports = Product;
