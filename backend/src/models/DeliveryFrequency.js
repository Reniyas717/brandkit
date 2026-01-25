const db = require('../config/database');

class DeliveryFrequency {
    static async findAll() {
        const result = await db.query('SELECT * FROM delivery_frequencies ORDER BY interval_in_days ASC');
        return result.rows;
    }

    static async findById(id) {
        const result = await db.query('SELECT * FROM delivery_frequencies WHERE id = $1', [id]);
        return result.rows[0];
    }
}

module.exports = DeliveryFrequency;
