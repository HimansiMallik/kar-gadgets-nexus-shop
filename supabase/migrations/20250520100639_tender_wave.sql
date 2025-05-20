/*
  # Update products table for local images

  1. Changes
    - Add image_file column to store local image files
    - Make image_url nullable since we'll use local files
*/

ALTER TABLE products 
ADD COLUMN IF NOT EXISTS image_file bytea;

-- Make image_url nullable since we'll use local files instead
ALTER TABLE products 
ALTER COLUMN image_url DROP NOT NULL;