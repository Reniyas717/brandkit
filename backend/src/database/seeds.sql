-- Seed Data for Brand Kit Platform

-- Insert delivery frequencies
INSERT INTO delivery_frequencies (label, interval_in_days) VALUES
  ('Weekly', 7),
  ('Bi-Weekly', 14),
  ('Monthly', 30),
  ('Quarterly', 90)
ON CONFLICT (label) DO NOTHING;

-- Insert sample user
INSERT INTO users (name, email, password_hash) VALUES
  ('Demo User', 'demo@brandkit.com', '$2b$10$dummyhashfordemopurposes')
ON CONFLICT (email) DO NOTHING;

-- Insert sample brand
INSERT INTO brands (name, slug, logo_url, banner_url, description, story) VALUES
  (
    'EcoLux Essentials',
    'ecolux-essentials',
    'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400',
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200',
    'Premium sustainable lifestyle products crafted with care for you and the planet.',
    'Founded in 2020, EcoLux Essentials emerged from a simple belief: luxury and sustainability should coexist. Every product tells a story of ethical sourcing, minimal waste, and maximum impact.'
  )
ON CONFLICT (slug) DO NOTHING;

-- Get brand ID for reference
DO $$
DECLARE
  brand_id_var INTEGER;
BEGIN
  SELECT id INTO brand_id_var FROM brands WHERE slug = 'ecolux-essentials';
  
  -- Insert sustainability tags
  INSERT INTO brand_sustainability_tags (brand_id, tag_type, tag_value) VALUES
    (brand_id_var, 'carbon_neutral', 'true'),
    (brand_id_var, 'plastic_free', 'true'),
    (brand_id_var, 'fair_trade', 'certified'),
    (brand_id_var, 'organic', 'certified')
  ON CONFLICT (brand_id, tag_type) DO NOTHING;
  
  -- Insert sample products
  INSERT INTO products (brand_id, name, description, price, image_url, is_available) VALUES
    (
      brand_id_var,
      'Bamboo Fiber Towel Set',
      'Ultra-soft, quick-dry towels made from 100% organic bamboo fiber. Naturally antibacterial and eco-friendly.',
      49.99,
      'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?w=600',
      true
    ),
    (
      brand_id_var,
      'Organic Cotton Bedding',
      'Luxurious 400-thread-count organic cotton sheets. GOTS certified and dyed with natural pigments.',
      89.99,
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600',
      true
    ),
    (
      brand_id_var,
      'Recycled Glass Candle',
      'Hand-poured soy wax candle in a recycled glass vessel. Infused with essential oils.',
      29.99,
      'https://images.unsplash.com/photo-1602874801006-c2b5e8f62a3e?w=600',
      true
    ),
    (
      brand_id_var,
      'Natural Loofah Soap Bar',
      'Handcrafted soap with embedded natural loofah. Zero waste packaging.',
      12.99,
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600',
      true
    ),
    (
      brand_id_var,
      'Hemp Yoga Mat',
      'Premium yoga mat made from natural hemp and rubber. Non-toxic and biodegradable.',
      79.99,
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600',
      true
    ),
    (
      brand_id_var,
      'Reusable Produce Bags',
      'Set of 5 organic cotton mesh bags for grocery shopping. Machine washable.',
      19.99,
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600',
      true
    )
  ON CONFLICT DO NOTHING;
  
END $$;

-- Add product metadata
DO $$
DECLARE
  product_id_var INTEGER;
BEGIN
  -- Bamboo Towel metadata
  SELECT id INTO product_id_var FROM products WHERE name = 'Bamboo Fiber Towel Set';
  IF product_id_var IS NOT NULL THEN
    INSERT INTO product_metadata (product_id, key, value) VALUES
      (product_id_var, 'material', '100% Organic Bamboo'),
      (product_id_var, 'size', 'Bath: 30x56 inches'),
      (product_id_var, 'care', 'Machine washable')
    ON CONFLICT (product_id, key) DO NOTHING;
  END IF;
  
  -- Bedding metadata
  SELECT id INTO product_id_var FROM products WHERE name = 'Organic Cotton Bedding';
  IF product_id_var IS NOT NULL THEN
    INSERT INTO product_metadata (product_id, key, value) VALUES
      (product_id_var, 'material', 'GOTS Certified Organic Cotton'),
      (product_id_var, 'thread_count', '400'),
      (product_id_var, 'size', 'Queen')
    ON CONFLICT (product_id, key) DO NOTHING;
  END IF;
  
  -- Candle metadata
  SELECT id INTO product_id_var FROM products WHERE name = 'Recycled Glass Candle';
  IF product_id_var IS NOT NULL THEN
    INSERT INTO product_metadata (product_id, key, value) VALUES
      (product_id_var, 'burn_time', '50 hours'),
      (product_id_var, 'scent', 'Lavender & Eucalyptus'),
      (product_id_var, 'wax_type', '100% Soy Wax')
    ON CONFLICT (product_id, key) DO NOTHING;
  END IF;
  
END $$;
