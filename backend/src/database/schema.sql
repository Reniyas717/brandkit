-- Brand Kit Database Schema
-- PostgreSQL Database Schema for Subscription Kit Platform

-- Drop existing tables if they exist (for development)
DROP TABLE IF EXISTS kit_activity_log CASCADE;
DROP TABLE IF EXISTS subscription_kit_items CASCADE;
DROP TABLE IF EXISTS subscription_kits CASCADE;
DROP TABLE IF EXISTS product_metadata CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS brand_sustainability_tags CASCADE;
DROP TABLE IF EXISTS brands CASCADE;
DROP TABLE IF EXISTS delivery_frequencies CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users Table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  auth_provider VARCHAR(50) DEFAULT 'local',
  auth_provider_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Brands Table
CREATE TABLE brands (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  logo_url TEXT,
  banner_url TEXT,
  description TEXT,
  story TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Brand Sustainability Tags
CREATE TABLE brand_sustainability_tags (
  id SERIAL PRIMARY KEY,
  brand_id INTEGER NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  tag_type VARCHAR(100) NOT NULL,
  tag_value VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(brand_id, tag_type)
);

-- Products Table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  brand_id INTEGER NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Product Metadata
CREATE TABLE product_metadata (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  key VARCHAR(100) NOT NULL,
  value TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(product_id, key)
);

-- Delivery Frequencies
CREATE TABLE delivery_frequencies (
  id SERIAL PRIMARY KEY,
  label VARCHAR(100) NOT NULL UNIQUE,
  interval_in_days INTEGER NOT NULL CHECK (interval_in_days > 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subscription Kits
CREATE TABLE subscription_kits (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'confirmed', 'cancelled')),
  delivery_frequency_id INTEGER REFERENCES delivery_frequencies(id),
  total_price DECIMAL(10, 2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  confirmed_at TIMESTAMP
);

-- Subscription Kit Items
CREATE TABLE subscription_kit_items (
  id SERIAL PRIMARY KEY,
  kit_id INTEGER NOT NULL REFERENCES subscription_kits(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  price_at_addition DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(kit_id, product_id)
);

-- Kit Activity Log
CREATE TABLE kit_activity_log (
  id SERIAL PRIMARY KEY,
  kit_id INTEGER NOT NULL REFERENCES subscription_kits(id) ON DELETE CASCADE,
  action_type VARCHAR(100) NOT NULL,
  action_details JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_products_brand_id ON products(brand_id);
CREATE INDEX idx_subscription_kits_user_id ON subscription_kits(user_id);
CREATE INDEX idx_subscription_kits_status ON subscription_kits(status);
CREATE INDEX idx_subscription_kit_items_kit_id ON subscription_kit_items(kit_id);
CREATE INDEX idx_kit_activity_log_kit_id ON kit_activity_log(kit_id);
CREATE INDEX idx_brand_sustainability_tags_brand_id ON brand_sustainability_tags(brand_id);
CREATE INDEX idx_product_metadata_product_id ON product_metadata(product_id);

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

CREATE TRIGGER update_subscription_kit_items_updated_at BEFORE UPDATE ON subscription_kit_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
