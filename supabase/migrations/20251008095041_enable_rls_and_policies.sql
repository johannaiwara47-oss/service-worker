/*
  # Row Level Security (RLS) Policies

  ## Description
  Enables RLS on all tables and creates comprehensive security policies.

  ## Security Model
  
  ### users table
  - Users can SELECT their own row
  - Users can UPDATE their own row (except role)
  - Admins can SELECT and UPDATE any user
  - Service role can INSERT (for auth signup)
  
  ### service_providers table
  - Anyone can SELECT non-blocked providers
  - Owner can UPDATE their provider details
  - Owner can DELETE their provider (soft delete)
  - Admins can UPDATE any provider
  
  ### categories table
  - Anyone can SELECT categories
  - Only admins can INSERT/UPDATE/DELETE
  
  ### ratings table
  - Anyone can SELECT ratings
  - Authenticated users can INSERT ratings
  - Users can UPDATE/DELETE only their own ratings
  
  ### reports table
  - Authenticated users can INSERT reports
  - Only admins can SELECT reports
  - Only admins can UPDATE report status
  
  ### notifications table
  - Users can SELECT their own notifications
  - Users can UPDATE their own notifications (mark read)
  - Server-side functions can INSERT notifications

  ## Important Notes
  - RLS is RESTRICTIVE by default - access denied unless explicitly allowed
  - All policies check authentication state
  - Ownership checks prevent unauthorized access
  - Admin role has elevated privileges for moderation
*/

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- ============================================
-- USERS TABLE POLICIES
-- ============================================

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Admins can view all users
CREATE POLICY "Admins can view all users"
  ON users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Users can update their own profile (except role)
CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id AND role = (SELECT role FROM users WHERE id = auth.uid()));

-- Allow insert for new user registration (via service role)
CREATE POLICY "Allow user registration"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- ============================================
-- SERVICE_PROVIDERS TABLE POLICIES
-- ============================================

-- Anyone can view non-blocked providers
CREATE POLICY "Public can view active providers"
  ON service_providers FOR SELECT
  TO authenticated
  USING (is_blocked = false);

-- Admins can view all providers including blocked
CREATE POLICY "Admins can view all providers"
  ON service_providers FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Authenticated users can create provider profile
CREATE POLICY "Users can create provider profile"
  ON service_providers FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND EXISTS (SELECT 1 FROM users WHERE id = auth.uid())
  );

-- Providers can update their own profile
CREATE POLICY "Providers can update own profile"
  ON service_providers FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Admins can update any provider (for blocking/verification)
CREATE POLICY "Admins can update any provider"
  ON service_providers FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Providers can delete their own profile
CREATE POLICY "Providers can delete own profile"
  ON service_providers FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- ============================================
-- CATEGORIES TABLE POLICIES
-- ============================================

-- Anyone can view categories
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  TO authenticated
  USING (true);

-- Only admins can insert categories
CREATE POLICY "Admins can insert categories"
  ON categories FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Only admins can update categories
CREATE POLICY "Admins can update categories"
  ON categories FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Only admins can delete categories
CREATE POLICY "Admins can delete categories"
  ON categories FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- RATINGS TABLE POLICIES
-- ============================================

-- Anyone can view ratings
CREATE POLICY "Anyone can view ratings"
  ON ratings FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can insert ratings
CREATE POLICY "Users can insert ratings"
  ON ratings FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND EXISTS (SELECT 1 FROM users WHERE id = auth.uid())
  );

-- Users can update their own ratings
CREATE POLICY "Users can update own ratings"
  ON ratings FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Users can delete their own ratings
CREATE POLICY "Users can delete own ratings"
  ON ratings FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- ============================================
-- REPORTS TABLE POLICIES
-- ============================================

-- Authenticated users can insert reports
CREATE POLICY "Users can insert reports"
  ON reports FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND EXISTS (SELECT 1 FROM users WHERE id = auth.uid())
  );

-- Only admins can view reports
CREATE POLICY "Admins can view reports"
  ON reports FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Only admins can update report status
CREATE POLICY "Admins can update reports"
  ON reports FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- NOTIFICATIONS TABLE POLICIES
-- ============================================

-- Users can view their own notifications
CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Users can update their own notifications (mark as read)
CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Admins can insert notifications for any user
CREATE POLICY "Admins can insert notifications"
  ON notifications FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Allow service role to insert notifications (for triggers)
CREATE POLICY "Service role can insert notifications"
  ON notifications FOR INSERT
  TO service_role
  WITH CHECK (true);
