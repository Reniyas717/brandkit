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

    static async getSustainabilityTags(brandId) {
        const result = await db.query(
            'SELECT tag_type, tag_value FROM brand_sustainability_tags WHERE brand_id = $1',
            [brandId]
        );
        return result.rows;
    }

    static async getProducts(brandId) {
        const result = await db.query(
            'SELECT * FROM products WHERE brand_id = $1 AND is_available = true ORDER BY created_at DESC',
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
}

module.exports = Brand;
