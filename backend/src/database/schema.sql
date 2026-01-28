-- Brand Kit Database Schema
-- PostgreSQL Database Schema for Subscription Kit Platform

-- Drop existing tables in reverse order of dependencies
DROP TABLE IF EXISTS kit_items CASCADE;
DROP TABLE IF EXISTS subscription_kits CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS brands CASCADE;
DROP TABLE IF EXISTS delivery_frequencies CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS product_metadata CASCADE;
DROP TABLE IF EXISTS brand_sustainability_tags CASCADE;
DROP TABLE IF EXISTS subscription_kit_items CASCADE;
DROP TABLE IF EXISTS kit_activity_log CASCADE;

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Delivery frequencies table
CREATE TABLE delivery_frequencies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    days INTEGER NOT NULL,
    discount_percent DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Brands table
CREATE TABLE brands (
    id SERIAL PRIMARY KEY,
    seller_id INTEGER REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    logo_url VARCHAR(500),
    banner_url VARCHAR(500),
    description TEXT,
    story TEXT,
    mission TEXT,
    theme_config JSONB,
    primary_color VARCHAR(20) DEFAULT '#10b981',
    secondary_color VARCHAR(20) DEFAULT '#f59e0b',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Brand sustainability tags
CREATE TABLE brand_sustainability_tags (
    id SERIAL PRIMARY KEY,
    brand_id INTEGER REFERENCES brands(id) ON DELETE CASCADE,
    tag_type VARCHAR(100) NOT NULL,
    tag_value VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    brand_id INTEGER REFERENCES brands(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(500),
    is_available BOOLEAN DEFAULT true,
    stock_quantity INTEGER DEFAULT 0,
    sustainability_score INTEGER DEFAULT 0,
    materials TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Product metadata
CREATE TABLE product_metadata (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    key VARCHAR(100) NOT NULL,
    value TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subscription kits table
CREATE TABLE subscription_kits (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    delivery_frequency_id INTEGER REFERENCES delivery_frequencies(id),
    status VARCHAR(50) DEFAULT 'draft',
    total_price DECIMAL(10,2) DEFAULT 0,
    confirmed_at TIMESTAMP,
    last_delivery_date TIMESTAMP,
    delivery_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Kit items table
CREATE TABLE kit_items (
    id SERIAL PRIMARY KEY,
    kit_id INTEGER REFERENCES subscription_kits(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 1,
    price_at_addition DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subscription kit items (for legacy support)
CREATE TABLE subscription_kit_items (
    id SERIAL PRIMARY KEY,
    kit_id INTEGER REFERENCES subscription_kits(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 1,
    price_at_addition DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Kit activity log
CREATE TABLE kit_activity_log (
    id SERIAL PRIMARY KEY,
    kit_id INTEGER REFERENCES subscription_kits(id) ON DELETE CASCADE,
    activity_type VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_products_brand ON products(brand_id);
CREATE INDEX idx_kit_items_kit ON kit_items(kit_id);
CREATE INDEX idx_subscription_kits_user ON subscription_kits(user_id);
CREATE INDEX idx_subscription_kits_status ON subscription_kits(status);
CREATE INDEX idx_brands_seller ON brands(seller_id);
CREATE INDEX idx_brands_slug ON brands(slug);
CREATE INDEX idx_product_metadata_product ON product_metadata(product_id);
CREATE INDEX idx_brand_sustainability_tags_brand ON brand_sustainability_tags(brand_id);

-- Triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_brands_updated_at BEFORE UPDATE ON brands
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscription_kits_updated_at BEFORE UPDATE ON subscription_kits
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_kit_items_updated_at BEFORE UPDATE ON kit_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
