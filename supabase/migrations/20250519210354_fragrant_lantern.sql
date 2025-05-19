/*
  # Fix Database Schema Issues

  1. Changes
    - Rename tables to remove spaces and use snake_case
    - Add proper primary key constraints
    - Fix column names to follow conventions
    - Add foreign key relationships
    - Add proper constraints for JSONB data
    - Enable RLS on all tables
    - Add RLS policies

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Rename tables and fix primary keys
ALTER TABLE "Profile Table" RENAME TO profiles;
ALTER TABLE "Product Table" RENAME TO products;
ALTER TABLE "Order Table" RENAME TO orders;

-- Fix profiles table
ALTER TABLE profiles 
  DROP CONSTRAINT IF EXISTS "Profile Table_pkey",
  ALTER COLUMN id SET DEFAULT gen_random_uuid(),
  ADD PRIMARY KEY (id);

-- Fix products table
ALTER TABLE products
  DROP CONSTRAINT IF EXISTS "Product Table_pkey",
  DROP CONSTRAINT IF EXISTS "Product Table_id_key",
  ALTER COLUMN id SET DEFAULT gen_random_uuid(),
  ADD PRIMARY KEY (id);

-- Fix orders table
ALTER TABLE orders
  RENAME COLUMN "user-id" TO user_id;

-- Add foreign key constraints
ALTER TABLE orders
  ADD CONSTRAINT fk_user
  FOREIGN KEY (user_id) 
  REFERENCES profiles(id)
  ON DELETE CASCADE;

-- Add JSONB validation
ALTER TABLE orders
  ADD CONSTRAINT valid_product_ids
  CHECK (jsonb_typeof(product_ids) = 'array');

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
CREATE POLICY "Users can view their own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Anyone can view products"
  ON products
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view their own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);