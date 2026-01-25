const db = require('../config/database');

class SubscriptionKit {
    static async findById(id) {
        const result = await db.query('SELECT * FROM subscription_kits WHERE id = $1', [id]);
        return result.rows[0];
    }

    static async findDraftByUser(userId) {
        const result = await db.query(
            'SELECT * FROM subscription_kits WHERE user_id = $1 AND status = $2 ORDER BY created_at DESC LIMIT 1',
            [userId, 'draft']
        );
        return result.rows[0];
    }

    static async create(userId) {
        const result = await db.query(
            'INSERT INTO subscription_kits (user_id, status) VALUES ($1, $2) RETURNING *',
            [userId, 'draft']
        );

        // Log activity
        await this.logActivity(result.rows[0].id, 'created', {});

        return result.rows[0];
    }

    static async getItems(kitId) {
        const result = await db.query(
            `SELECT ski.*, p.name, p.image_url, p.description
       FROM subscription_kit_items ski
       JOIN products p ON ski.product_id = p.id
       WHERE ski.kit_id = $1`,
            [kitId]
        );
        return result.rows;
    }

    static async addItem(kitId, productId, quantity, price) {
        const result = await db.query(
            `INSERT INTO subscription_kit_items (kit_id, product_id, quantity, price_at_addition)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (kit_id, product_id)
       DO UPDATE SET quantity = $3, price_at_addition = $4, updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
            [kitId, productId, quantity, price]
        );

        await this.updateTotalPrice(kitId);
        await this.logActivity(kitId, 'item_added', { productId, quantity });

        return result.rows[0];
    }

    static async updateItemQuantity(kitId, productId, quantity) {
        const result = await db.query(
            `UPDATE subscription_kit_items
       SET quantity = $1, updated_at = CURRENT_TIMESTAMP
       WHERE kit_id = $2 AND product_id = $3
       RETURNING *`,
            [quantity, kitId, productId]
        );

        await this.updateTotalPrice(kitId);
        await this.logActivity(kitId, 'quantity_updated', { productId, quantity });

        return result.rows[0];
    }

    static async removeItem(kitId, productId) {
        await db.query(
            'DELETE FROM subscription_kit_items WHERE kit_id = $1 AND product_id = $2',
            [kitId, productId]
        );

        await this.updateTotalPrice(kitId);
        await this.logActivity(kitId, 'item_removed', { productId });
    }

    static async setDeliveryFrequency(kitId, frequencyId) {
        const result = await db.query(
            'UPDATE subscription_kits SET delivery_frequency_id = $1 WHERE id = $2 RETURNING *',
            [frequencyId, kitId]
        );

        await this.logActivity(kitId, 'frequency_set', { frequencyId });

        return result.rows[0];
    }

    static async updateTotalPrice(kitId) {
        await db.query(
            `UPDATE subscription_kits
       SET total_price = (
         SELECT COALESCE(SUM(price_at_addition * quantity), 0)
         FROM subscription_kit_items
         WHERE kit_id = $1
       )
       WHERE id = $1`,
            [kitId]
        );
    }

    static async confirm(kitId) {
        const result = await db.query(
            `UPDATE subscription_kits
       SET status = 'confirmed', confirmed_at = CURRENT_TIMESTAMP
       WHERE id = $1 AND status = 'draft'
       RETURNING *`,
            [kitId]
        );

        await this.logActivity(kitId, 'confirmed', {});

        return result.rows[0];
    }

    static async getSummary(kitId) {
        const kit = await this.findById(kitId);
        if (!kit) return null;

        const items = await this.getItems(kitId);

        let frequency = null;
        if (kit.delivery_frequency_id) {
            const freqResult = await db.query(
                'SELECT * FROM delivery_frequencies WHERE id = $1',
                [kit.delivery_frequency_id]
            );
            frequency = freqResult.rows[0];
        }

        return {
            ...kit,
            items,
            delivery_frequency: frequency,
        };
    }

    static async logActivity(kitId, actionType, actionDetails) {
        await db.query(
            'INSERT INTO kit_activity_log (kit_id, action_type, action_details) VALUES ($1, $2, $3)',
            [kitId, actionType, JSON.stringify(actionDetails)]
        );
    }
}

module.exports = SubscriptionKit;
