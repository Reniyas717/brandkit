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
  
  -- Insert sample products (15 items)
  INSERT INTO products (brand_id, name, description, category, price, image_url, is_available) VALUES
    -- Bags (IDs 1, 6, 11 approx)
    (brand_id_var, 'Organic Tote Bag', 'Handwoven hemp tote with reinforced straps', 'Bags', 3999, 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop', true),
    (brand_id_var, 'Bamboo Utensil Set', 'Complete set with carrying case', 'Kitchen', 1999, 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800&auto=format&fit=crop', true),
    (brand_id_var, 'Recycled Notebook', '100% post-consumer recycled paper', 'Stationery', 1519, 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=800&auto=format&fit=crop', true),
    (brand_id_var, 'Cotton T-Shirt', 'Organic cotton with natural dyes', 'Apparel', 3199, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop', true),
    (brand_id_var, 'Reusable Water Bottle', 'Stainless steel, BPA-free', 'Drinkware', 2799, 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=800&auto=format&fit=crop', true),
    
    -- Round 2 (Mix)
    (brand_id_var, 'Hemp Backpack', 'Durable hemp canvas with laptop sleeve', 'Bags', 7199, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop', true),
    (brand_id_var, 'Stainless Steel Lunch Box', 'Leak-proof compartments, BPA-free', 'Kitchen', 2499, 'https://images.unsplash.com/photo-1621303837174-8234675fde72?q=80&w=800&auto=format&fit=crop', true),
    (brand_id_var, 'Bamboo Pen Set', 'Set of 5 bamboo pens with refills', 'Stationery', 799, 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=800&auto=format&fit=crop', true),
    (brand_id_var, 'Hemp Hoodie', 'Warm and sustainable hemp blend', 'Apparel', 4999, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop', true),
    (brand_id_var, 'Bamboo Coffee Mug', 'Insulated bamboo travel mug', 'Drinkware', 1299, 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=800&auto=format&fit=crop', true),

    -- Round 3 (Mix)
    (brand_id_var, 'Jute Shopping Bag', 'Large capacity jute bag for groceries', 'Bags', 1999, 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop', true),
    (brand_id_var, 'Bamboo Cutting Board', 'Antibacterial bamboo cutting board', 'Kitchen', 1599, 'https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?q=80&w=800&auto=format&fit=crop', true),
    (brand_id_var, 'Plantable Pencils', 'Pencils that grow into plants', 'Stationery', 599, 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=800&auto=format&fit=crop', true),
    (brand_id_var, 'Bamboo Socks', 'Soft, breathable bamboo fiber socks', 'Apparel', 899, 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?q=80&w=800&auto=format&fit=crop', true),
    (brand_id_var, 'Glass Water Bottle', 'Borosilicate glass with silicone sleeve', 'Drinkware', 1999, 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=800&auto=format&fit=crop', true)
  ON CONFLICT DO NOTHING;
  
END $$;

-- Add product metadata (Update or Insert)
-- Note: Simplified for this fix. In a real app we'd map these by name significantly.
