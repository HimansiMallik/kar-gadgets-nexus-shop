/*
  # Initial Schema Setup

  1. New Tables
    - products: Store product information
    - profiles: User profile data
    - orders: Order information
    - order_items: Individual items in orders

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add policies for admin access
    - Set up storage policies for product images
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price numeric NOT NULL,
  description text,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create profiles table with unique constraint
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id uuid UNIQUE REFERENCES auth.users ON DELETE CASCADE,
  full_name text,
  address text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create orders table with proper references
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  status text DEFAULT 'pending',
  total_amount numeric NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for foreign keys
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);

-- Create order_items table with proper references
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  quantity integer NOT NULL CHECK (quantity > 0),
  price numeric NOT NULL CHECK (price >= 0),
  created_at timestamptz DEFAULT now()
);

-- Create indexes for foreign keys
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Only admins can modify products" ON products
  FOR ALL USING (auth.jwt() ->> 'email' = 'krish69@gmail.com');

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = auth_id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = auth_id);

CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = orders.user_id
      AND profiles.auth_id = auth.uid()
    )
  );

CREATE POLICY "Users can create orders" ON orders
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = user_id
      AND profiles.auth_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own order items" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders
      JOIN profiles ON orders.user_id = profiles.id
      WHERE orders.id = order_items.order_id
      AND profiles.auth_id = auth.uid()
    )
  );

-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT DO NOTHING;

-- Storage policy for product images
CREATE POLICY "Anyone can view product images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

CREATE POLICY "Only admins can upload product images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'product-images' AND
  auth.jwt() ->> 'email' = 'krish69@gmail.com'
);