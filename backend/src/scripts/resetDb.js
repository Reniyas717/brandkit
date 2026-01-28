const fs = require('fs');
const path = require('path');
const { pool } = require('../config/database');

async function resetDatabase() {
    try {
        console.log('Starting database reset...');

        // Read SQL files
        const schemaPath = path.join(__dirname, '../database/schema.sql');
        const seedsPath = path.join(__dirname, '../database/seeds.sql');

        console.log('Reading SQL files...');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');
        const seedsSql = fs.readFileSync(seedsPath, 'utf8');

        const client = await pool.connect();

        try {
            console.log('Applying schema...');
            await client.query('BEGIN');
            await client.query(schemaSql);

            console.log('Seeding data...');
            await client.query(seedsSql);

            await client.query('COMMIT');
            console.log('Database reset successfully!');
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Error applying SQL:', error);
            throw error;
        } finally {
            client.release();
        }

    } catch (error) {
        console.error('Database reset failed:', error);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

resetDatabase();
