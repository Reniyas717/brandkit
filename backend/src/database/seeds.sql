-- Seed Data for Brand Kit Platform
-- Two Brands: EcoLux Essentials & Terra Verde

-- Insert delivery frequencies
INSERT INTO delivery_frequencies (name, days) VALUES
  ('Weekly', 7),
  ('Bi-Weekly', 14),
  ('Monthly', 30),
  ('Quarterly', 90);

-- Clear existing data for clean seed
DELETE FROM kit_activity_log;
DELETE FROM subscription_kit_items;
DELETE FROM subscription_kits;
DELETE FROM product_metadata;
DELETE FROM products;
DELETE FROM brand_sustainability_tags;
DELETE FROM brands;
DELETE FROM users WHERE email IN ('customer@brandkit.com', 'seller@ecolux.com', 'seller@terraverde.com');

-- Insert users: 1 Customer, 2 Sellers
-- Password for all: "password123" (bcrypt hashed)
INSERT INTO users (name, email, password_hash, role) VALUES
  ('Demo Customer', 'customer@brandkit.com', '$2b$10$Ru5djLamBRLDTNjb7wv.bu9CIO1BFBK85LIdsBdTZ6KJG6tB.BfS2', 'customer'),
  ('Sarah Mitchell', 'seller@ecolux.com', '$2b$10$Ru5djLamBRLDTNjb7wv.bu9CIO1BFBK85LIdsBdTZ6KJG6tB.BfS2', 'seller'),
  ('James Rodriguez', 'seller@terraverde.com', '$2b$10$Ru5djLamBRLDTNjb7wv.bu9CIO1BFBK85LIdsBdTZ6KJG6tB.BfS2', 'seller');

-- Insert Brand 1: EcoLux Essentials
DO $$
DECLARE
  ecolux_seller_id INTEGER;
  ecolux_brand_id INTEGER;
  terra_seller_id INTEGER;
  terra_brand_id INTEGER;
BEGIN
  -- Get Seller IDs
  SELECT id INTO ecolux_seller_id FROM users WHERE email = 'seller@ecolux.com';
  SELECT id INTO terra_seller_id FROM users WHERE email = 'seller@terraverde.com';

  -- ===== BRAND 1: ECOLUX ESSENTIALS =====
  INSERT INTO brands (seller_id, name, slug, logo_url, banner_url, description, story, theme_config) VALUES
    (
      ecolux_seller_id,
      'EcoLux Essentials',
      'ecolux-essentials',
      'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400',
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200',
      'Premium sustainable lifestyle products crafted with care for you and the planet.',
      'Founded in 2020, EcoLux Essentials emerged from a simple belief: luxury and sustainability should coexist. Our founder, Sarah Mitchell, left her corporate job to pursue a dream of creating products that are both beautiful and kind to the earth.

Every product tells a story of ethical sourcing, minimal waste, and maximum impact. We partner with artisan communities across India and Southeast Asia, ensuring fair wages and sustainable practices.

From our signature hemp tote bags to our bamboo kitchen essentials, each item is designed to replace single-use alternatives without compromising on style or quality. We believe that small changes in daily habits can lead to massive positive impact on our planet.

Join us in our mission to make sustainable living accessible, stylish, and effortless.',
      '{"primaryColor": "emerald", "secondaryColor": "stone-100", "accentColor": "amber"}'
    )
  RETURNING id INTO ecolux_brand_id;
  
  -- EcoLux Sustainability Tags
  INSERT INTO brand_sustainability_tags (brand_id, tag_type, tag_value) VALUES
    (ecolux_brand_id, 'carbon_neutral', 'true'),
    (ecolux_brand_id, 'plastic_free', 'true'),
    (ecolux_brand_id, 'fair_trade', 'certified'),
    (ecolux_brand_id, 'organic', 'certified'),
    (ecolux_brand_id, 'vegan', 'true');
  
  -- EcoLux Products (15 items)
  INSERT INTO products (brand_id, name, description, category, price, image_url, is_available) VALUES
    -- Bags
    (ecolux_brand_id, 'Organic Hemp Tote', 'Handwoven hemp tote with reinforced leather straps. Perfect for daily use.', 'Bags', 2499, 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800', true),
    (ecolux_brand_id, 'Canvas Messenger Bag', 'Organic cotton canvas with recycled PET lining. Fits 15" laptop.', 'Bags', 3499, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800', true),
    (ecolux_brand_id, 'Jute Market Bag', 'Large capacity jute shopping bag with cotton handles.', 'Bags', 899, 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800', true),
    
    -- Kitchen
    (ecolux_brand_id, 'Bamboo Utensil Set', 'Complete 5-piece set with organic cotton carrying case.', 'Kitchen', 1299, 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800', true),
    (ecolux_brand_id, 'Steel Lunch Box', 'Triple-layer stainless steel tiffin with leak-proof design.', 'Kitchen', 1799, 'https://images.unsplash.com/photo-1621303837174-8234675fde72?q=80&w=800', true),
    (ecolux_brand_id, 'Bamboo Cutting Board', 'Antibacterial bamboo board with juice groove.', 'Kitchen', 1199, 'https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?q=80&w=800', true),
    
    -- Drinkware
    (ecolux_brand_id, 'Insulated Steel Bottle', '750ml double-wall vacuum insulated. Keeps drinks cold 24hrs.', 'Drinkware', 1999, 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=800', true),
    (ecolux_brand_id, 'Bamboo Travel Mug', '400ml bamboo exterior with ceramic interior.', 'Drinkware', 999, 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=800', true),
    (ecolux_brand_id, 'Glass Water Bottle', 'Borosilicate glass with protective silicone sleeve.', 'Drinkware', 1499, 'https://images.unsplash.com/photo-1523362628745-0c100150b504?q=80&w=800', true),
    
    -- Stationery
    (ecolux_brand_id, 'Recycled Paper Notebook', '200 pages of 100% post-consumer recycled paper.', 'Stationery', 599, 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=800', true),
    (ecolux_brand_id, 'Bamboo Pen Set', 'Set of 5 refillable bamboo pens with plant-based ink.', 'Stationery', 449, 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=800', true),
    (ecolux_brand_id, 'Seed Paper Cards', 'Pack of 10 plantable greeting cards. Grows wildflowers!', 'Stationery', 349, 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=800', true),
    
    -- Apparel
    (ecolux_brand_id, 'Organic Cotton Tee', 'GOTS certified organic cotton. Naturally dyed.', 'Apparel', 1299, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800', true),
    (ecolux_brand_id, 'Hemp Blend Hoodie', 'Warm 55% hemp, 45% organic cotton blend hoodie.', 'Apparel', 2999, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800', true),
    (ecolux_brand_id, 'Bamboo Fiber Socks', 'Pack of 3 antibacterial bamboo socks. Breathable comfort.', 'Apparel', 599, 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?q=80&w=800', true);


  -- ===== BRAND 2: TERRA VERDE =====
  INSERT INTO brands (seller_id, name, slug, logo_url, banner_url, description, story, theme_config) VALUES
    (
      terra_seller_id,
      'Terra Verde',
      'terra-verde',
      'https://images.unsplash.com/photo-1518531933037-9a6470d7f513?w=400',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200',
      'Modern sustainable products for the conscious urban dweller.',
      'Terra Verde was born in the heart of Mumbai, where our founder James Rodriguez witnessed the environmental challenges of rapid urbanization firsthand. What started as a personal mission to reduce plastic in his own life evolved into a brand that helps thousands do the same.

Our design philosophy centers on urban functionality - products that fit seamlessly into city life while drastically reducing environmental footprint. We believe sustainability should never mean compromising on aesthetics or convenience.

Working with cutting-edge materials like recycled ocean plastic, agricultural waste fibers, and lab-grown alternatives, we create products that push the boundaries of eco-design. Our R&D team constantly explores new materials and manufacturing techniques to minimize impact.

From our bestselling laptop sleeves made from recycled plastic bottles to our innovative plant-based leather accessories, Terra Verde represents the future of sustainable urban living.',
      '{"primaryColor": "teal", "secondaryColor": "slate-100", "accentColor": "orange"}'
    )
  RETURNING id INTO terra_brand_id;
  
  -- Terra Verde Sustainability Tags
  INSERT INTO brand_sustainability_tags (brand_id, tag_type, tag_value) VALUES
    (terra_brand_id, 'recycled_materials', 'true'),
    (terra_brand_id, 'ocean_plastic', 'certified'),
    (terra_brand_id, 'carbon_neutral', 'true'),
    (terra_brand_id, 'b_corp', 'certified'),
    (terra_brand_id, 'plastic_negative', 'true');
  
  -- Terra Verde Products (15 items)
  INSERT INTO products (brand_id, name, description, category, price, image_url, is_available) VALUES
    -- Bags
    (terra_brand_id, 'Ocean Plastic Backpack', 'Made from 15 recycled ocean plastic bottles. Water-resistant.', 'Bags', 4999, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800', true),
    (terra_brand_id, 'Upcycled Denim Tote', 'Handcrafted from upcycled denim jeans. Each piece unique.', 'Bags', 1899, 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800', true),
    (terra_brand_id, 'Cork Laptop Sleeve', 'Premium Portuguese cork. Fits 13-15" laptops.', 'Bags', 2499, 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=800', true),
    
    -- Kitchen
    (terra_brand_id, 'Wheat Straw Containers', 'Set of 4 microwave-safe containers from wheat straw.', 'Kitchen', 899, 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?q=80&w=800', true),
    (terra_brand_id, 'Coconut Bowl Set', 'Set of 2 polished coconut bowls with bamboo spoons.', 'Kitchen', 699, 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?q=80&w=800', true),
    (terra_brand_id, 'Silicone Food Bags', 'Set of 6 reusable silicone bags. Freezer & dishwasher safe.', 'Kitchen', 1299, 'https://images.unsplash.com/photo-1605664041952-4a2855d9363b?q=80&w=800', true),
    
    -- Drinkware
    (terra_brand_id, 'Recycled Glass Tumbler', 'Set of 4 tumblers from 100% recycled glass.', 'Drinkware', 1199, 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800', true),
    (terra_brand_id, 'Copper Water Bottle', 'Ayurvedic copper bottle with lacquer lining. 1 liter.', 'Drinkware', 1799, 'https://images.unsplash.com/photo-1536939459926-301728717817?q=80&w=800', true),
    (terra_brand_id, 'Sugarcane Coffee Cup', 'Biodegradable cup from sugarcane fiber with cork sleeve.', 'Drinkware', 599, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800', true),
    
    -- Stationery
    (terra_brand_id, 'Stone Paper Notebook', 'Waterproof notebook made from limestone waste.', 'Stationery', 799, 'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=800', true),
    (terra_brand_id, 'Recycled Pencil Set', '12 pencils made from recycled newspapers.', 'Stationery', 299, 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=800', true),
    (terra_brand_id, 'Desk Organizer', 'Modular organizer made from recycled plastic.', 'Stationery', 1499, 'https://images.unsplash.com/photo-1507915977619-a162d596559e?q=80&w=800', true),
    
    -- Apparel
    (terra_brand_id, 'Recycled Polyester Jacket', 'Lightweight jacket from 20 plastic bottles.', 'Apparel', 3999, 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800', true),
    (terra_brand_id, 'Plant Leather Belt', 'Durable belt made from pineapple leaf fiber (Piñatex).', 'Apparel', 1899, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800', true),
    (terra_brand_id, 'Cork Wallet', 'Slim bifold wallet in Portuguese cork. RFID blocking.', 'Apparel', 1299, 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800', true);

END $$;

-- Add product metadata for filtering
DO $$
DECLARE
  prod RECORD;
BEGIN
  FOR prod IN SELECT id, category FROM products LOOP
    -- Add material metadata based on product names/categories
    IF prod.category = 'Bags' THEN
      INSERT INTO product_metadata (product_id, key, value) VALUES 
        (prod.id, 'material', 'Recycled'),
        (prod.id, 'eco_rating', '5');
    ELSIF prod.category = 'Kitchen' THEN
      INSERT INTO product_metadata (product_id, key, value) VALUES 
        (prod.id, 'material', 'Bamboo'),
        (prod.id, 'eco_rating', '5');
    ELSIF prod.category = 'Drinkware' THEN
      INSERT INTO product_metadata (product_id, key, value) VALUES 
        (prod.id, 'material', 'Stainless Steel'),
        (prod.id, 'eco_rating', '4');
    ELSIF prod.category = 'Stationery' THEN
      INSERT INTO product_metadata (product_id, key, value) VALUES 
        (prod.id, 'material', 'Recycled Paper'),
        (prod.id, 'eco_rating', '5');
    ELSIF prod.category = 'Apparel' THEN
      INSERT INTO product_metadata (product_id, key, value) VALUES 
        (prod.id, 'material', 'Organic Cotton'),
        (prod.id, 'eco_rating', '5');
    END IF;
  END LOOP;
END $$;
