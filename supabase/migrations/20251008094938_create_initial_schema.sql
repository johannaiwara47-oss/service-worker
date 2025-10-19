/*
  # ServiceWorker Initial Schema

  ## Description
  Creates the complete database schema for ServiceWorker marketplace platform.

  ## Tables Created
  
  1. **users** - Core user information with role-based access
     - id (uuid, primary key)
     - role (text) - user, provider, or admin
     - username, email, phone_number, whatsapp_number
     - profile_image_url (text)
     - latitude, longitude, location_text - for user location
     - created_at, deleted_at timestamps
  
  2. **categories** - Service categories for providers
     - id (uuid, primary key)
     - name (text, unique)
     - description (text)
     - created_at timestamp
  
  3. **service_providers** - Provider-specific information
     - id (uuid, primary key)
     - user_id (references users)
     - provider_type (individual or business)
     - business_name, contact_number
     - category_id (references categories)
     - work_image_1, work_image_2, work_image_3 URLs
     - average_rating (float)
     - is_verified, is_blocked flags
     - blocked_at timestamp
     - latitude, longitude, location_text - for provider location
     - created_at, deleted_at timestamps
  
  4. **ratings** - User ratings for providers
     - id (uuid, primary key)
     - user_id (references users)
     - provider_id (references service_providers)
     - rating (1-5 integer)
     - comment (text)
     - created_at timestamp
  
  5. **reports** - User reports against providers
     - id (uuid, primary key)
     - user_id (references users)
     - provider_id (references service_providers)
     - report_text (text)
     - status (pending or resolved)
     - created_at timestamp
  
  6. **notifications** - System notifications for users
     - id (uuid, primary key)
     - user_id (references users)
     - title, message (text)
     - type (text)
     - is_read (boolean)
     - created_at timestamp

  ## Security
  - RLS will be enabled on all tables in subsequent migration
  - Foreign key constraints ensure referential integrity
  - Check constraints enforce data validity
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role text NOT NULL CHECK (role IN ('user', 'provider', 'admin')) DEFAULT 'user',
  username text NOT NULL,
  email text NOT NULL UNIQUE,
  phone_number text,
  whatsapp_number text,
  profile_image_url text,
  latitude float8,
  longitude float8,
  location_text text,
  created_at timestamptz DEFAULT now(),
  deleted_at timestamptz
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create service_providers table
CREATE TABLE IF NOT EXISTS service_providers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider_type text NOT NULL CHECK (provider_type IN ('individual', 'business')),
  business_name text,
  contact_number text,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  work_image_1 text,
  work_image_2 text,
  work_image_3 text,
  average_rating float8 DEFAULT 0,
  is_verified boolean DEFAULT false,
  is_blocked boolean DEFAULT false,
  blocked_at timestamptz,
  latitude float8,
  longitude float8,
  location_text text,
  created_at timestamptz DEFAULT now(),
  deleted_at timestamptz
);

-- Create ratings table
CREATE TABLE IF NOT EXISTS ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider_id uuid NOT NULL REFERENCES service_providers(id) ON DELETE CASCADE,
  rating int NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, provider_id)
);

-- Create reports table
CREATE TABLE IF NOT EXISTS reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  provider_id uuid NOT NULL REFERENCES service_providers(id) ON DELETE CASCADE,
  report_text text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'resolved')),
  created_at timestamptz DEFAULT now()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_service_providers_user_id ON service_providers(user_id);
CREATE INDEX IF NOT EXISTS idx_service_providers_category_id ON service_providers(category_id);
CREATE INDEX IF NOT EXISTS idx_service_providers_location ON service_providers(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_service_providers_blocked ON service_providers(is_blocked, blocked_at);
CREATE INDEX IF NOT EXISTS idx_ratings_provider_id ON ratings(provider_id);
CREATE INDEX IF NOT EXISTS idx_ratings_user_provider ON ratings(user_id, provider_id);
CREATE INDEX IF NOT EXISTS idx_reports_provider_id ON reports(provider_id);
CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
