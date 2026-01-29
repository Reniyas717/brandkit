const { Pool } = require('pg');
const dns = require('dns');
require('dotenv').config();

// Force IPv4 for all DNS lookups (fixes Render IPv6 issues)
dns.setDefaultResultOrder('ipv4first');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  family: 4
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

pool.on('connect', () => {
  console.log('Database pool connected');
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
