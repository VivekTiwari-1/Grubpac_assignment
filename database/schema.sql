-- database/schema.sql

CREATE DATABASE IF NOT EXISTS room_booking;
USE room_booking;

-- USERS TABLE
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ROOMS TABLE
CREATE TABLE IF NOT EXISTS rooms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  price_per_night DECIMAL(10, 2) NOT NULL,
  capacity INT DEFAULT 2,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  room_id INT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,

  CONSTRAINT chk_dates CHECK (end_date > start_date)
);

-- SEED: Sample Rooms
INSERT INTO rooms (name, description, price_per_night, capacity, image_url) VALUES
(
  'Deluxe Ocean Suite',
  'Spacious suite with panoramic ocean views, king bed, and private balcony.',
  149.99,
  2,
  'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800'
),
(
  'Mountain View Studio',
  'Cozy studio with stunning mountain views, perfect for solo travelers or couples.',
  89.99,
  2,
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800'
),
(
  'Family Suite',
  'Large family suite with two bedrooms, living area, and kitchenette.',
  199.99,
  4,
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'
),
(
  'Executive Business Room',
  'Modern room with dedicated workspace, high-speed WiFi, and city views.',
  119.99,
  2,
  'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800'
),
(
  'Cozy Garden Cottage',
  'Charming private cottage surrounded by gardens, ideal for a quiet retreat.',
  109.99,
  2,
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'
);