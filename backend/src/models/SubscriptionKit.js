const db = require('../config/database');

class SubscriptionKit {
    static async findAll() {
        const result = await db.query('SELECT * FROM subscription_kits ORDER BY created_at DESC');
        return result.rows;
    }

    static async findById(id) {
        const kitResult = await db.query(
            'SELECT * FROM subscription_kits WHERE id = $1',
            [id]
        );

        if (kitResult.rows.length === 0) {
            return null;
        }

        const kit = kitResult.rows[0];

        // Get items with product details
        const itemsResult = await db.query(`
            SELECT 
                ki.id,
                ki.product_id,
                ki.quantity,
                ki.price_at_addition,
                p.name,
                p.description,
                p.price,
                p.image_url,
                p.category,
                b.name as brand_name,
                b.slug as brand_slug
            FROM kit_items ki
            JOIN products p ON ki.product_id = p.id
            JOIN brands b ON p.brand_id = b.id
            WHERE ki.kit_id = $1
        `, [id]);

        kit.items = itemsResult.rows;

        // Get delivery frequency if set
        if (kit.delivery_frequency_id) {
            const freqResult = await db.query(
                'SELECT * FROM delivery_frequencies WHERE id = $1',
                [kit.delivery_frequency_id]
            );
            kit.delivery_frequency = freqResult.rows[0] || null;
        }

        return kit;
    }

    static async findByUserId(userId) {
        const result = await db.query(
            'SELECT * FROM subscription_kits WHERE user_id = $1 AND status = $2 ORDER BY created_at DESC LIMIT 1',
            [userId, 'draft']
        );
        
        if (result.rows.length === 0) {
            return null;
        }

        return this.findById(result.rows[0].id);
    }

    static async findAllByUser(userId) {
        // Get all confirmed/active subscriptions for the user
        const kitsResult = await db.query(`
            SELECT 
                sk.*,
                df.name as frequency_name,
                df.days as frequency_days
            FROM subscription_kits sk
            LEFT JOIN delivery_frequencies df ON sk.delivery_frequency_id = df.id
            WHERE sk.user_id = $1 AND sk.status IN ('confirmed', 'active', 'completed', 'cancelled')
            ORDER BY sk.created_at DESC
        `, [userId]);

        const kits = kitsResult.rows;

        // Get items for each kit
        for (let kit of kits) {
            const itemsResult = await db.query(`
                SELECT 
                    ki.id,
                    ki.product_id,
                    ki.quantity,
                    ki.price_at_addition,
                    p.name,
                    p.name as product_name,
                    p.description,
                    p.price,
                    p.image_url,
                    p.category,
                    b.name as brand_name,
                    b.slug as brand_slug
                FROM kit_items ki
                JOIN products p ON ki.product_id = p.id
                JOIN brands b ON p.brand_id = b.id
                WHERE ki.kit_id = $1
            `, [kit.id]);

            kit.items = itemsResult.rows;

            // Calculate total price
            kit.total_price = itemsResult.rows.reduce((sum, item) => {
                return sum + (parseFloat(item.price_at_addition || item.price) * item.quantity);
            }, 0);

            // Set delivery frequency object
            if (kit.frequency_name) {
                kit.delivery_frequency = {
                    name: kit.frequency_name,
                    days: kit.frequency_days
                };
            }
        }

        return kits;
    }

    static async create(data) {
        const result = await db.query(
            `INSERT INTO subscription_kits (user_id, status, created_at)
             VALUES ($1, $2, NOW())
             RETURNING *`,
            [data.user_id, data.status || 'draft']
        );

        return result.rows[0];
    }

    static async addItem(kitId, itemData) {
        // Check if item already exists
        const existingItem = await db.query(
            'SELECT * FROM kit_items WHERE kit_id = $1 AND product_id = $2',
            [kitId, itemData.product_id]
        );

        if (existingItem.rows.length > 0) {
            // Update quantity
            const newQuantity = existingItem.rows[0].quantity + (itemData.quantity || 1);
            const result = await db.query(
                'UPDATE kit_items SET quantity = $1 WHERE id = $2 RETURNING *',
                [newQuantity, existingItem.rows[0].id]
            );
            return result.rows[0];
        }

        // Insert new item
        const result = await db.query(
            `INSERT INTO kit_items (kit_id, product_id, quantity, price_at_addition)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [kitId, itemData.product_id, itemData.quantity || 1, itemData.price_at_addition]
        );

        return result.rows[0];
    }

    static async removeItem(kitId, itemId) {
        await db.query(
            'DELETE FROM kit_items WHERE kit_id = $1 AND id = $2',
            [kitId, itemId]
        );
    }

    static async updateItemQuantity(kitId, itemId, quantity) {
        if (quantity <= 0) {
            await this.removeItem(kitId, itemId);
            return null;
        }

        const result = await db.query(
            'UPDATE kit_items SET quantity = $1 WHERE kit_id = $2 AND id = $3 RETURNING *',
            [quantity, kitId, itemId]
        );

        return result.rows[0];
    }

    static async setFrequency(kitId, frequencyId) {
        const result = await db.query(
            'UPDATE subscription_kits SET delivery_frequency_id = $1 WHERE id = $2 RETURNING *',
            [frequencyId, kitId]
        );

        return this.findById(kitId);
    }

    static async confirm(kitId, userId) {
        // Calculate total price from items
        const itemsResult = await db.query(`
            SELECT ki.quantity, ki.price_at_addition, p.price
            FROM kit_items ki
            JOIN products p ON ki.product_id = p.id
            WHERE ki.kit_id = $1
        `, [kitId]);

        const totalPrice = itemsResult.rows.reduce((sum, item) => {
            return sum + (parseFloat(item.price_at_addition || item.price) * item.quantity);
        }, 0);

        const result = await db.query(
            `UPDATE subscription_kits 
             SET status = 'confirmed', 
                 user_id = COALESCE($2, user_id),
                 total_price = $3,
                 confirmed_at = NOW()
             WHERE id = $1 
             RETURNING *`,
            [kitId, userId, totalPrice]
        );

        return this.findById(kitId);
    }
}

module.exports = SubscriptionKit;
