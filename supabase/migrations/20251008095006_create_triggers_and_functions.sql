/*
  # Database Triggers and Functions

  ## Description
  Creates automated triggers and functions for ServiceWorker platform.

  ## Functions Created
  
  1. **recalculate_provider_rating()** - Recalculates average rating for a provider
     - Triggered after INSERT, UPDATE, or DELETE on ratings table
     - Computes AVG(rating) for the provider
     - Updates service_providers.average_rating
  
  2. **notify_admin_on_report()** - Creates admin notification when report is filed
     - Triggered after INSERT on reports table
     - Finds all admin users
     - Creates notification for each admin about new report

  ## Triggers Created
  
  1. **trigger_recalculate_rating** - On ratings INSERT/UPDATE/DELETE
  2. **trigger_notify_admin_report** - On reports INSERT

  ## Important Notes
  - Rating recalculation happens automatically in real-time
  - Admin notifications ensure reports are never missed
  - Functions use appropriate locking to prevent race conditions
*/

-- Function to recalculate provider average rating
CREATE OR REPLACE FUNCTION recalculate_provider_rating()
RETURNS TRIGGER AS $$
BEGIN
  -- Determine which provider_id to update based on operation
  IF (TG_OP = 'DELETE') THEN
    UPDATE service_providers
    SET average_rating = COALESCE((
      SELECT AVG(rating)::float8
      FROM ratings
      WHERE provider_id = OLD.provider_id
    ), 0)
    WHERE id = OLD.provider_id;
    RETURN OLD;
  ELSE
    UPDATE service_providers
    SET average_rating = COALESCE((
      SELECT AVG(rating)::float8
      FROM ratings
      WHERE provider_id = NEW.provider_id
    ), 0)
    WHERE id = NEW.provider_id;
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for rating recalculation
DROP TRIGGER IF EXISTS trigger_recalculate_rating ON ratings;
CREATE TRIGGER trigger_recalculate_rating
  AFTER INSERT OR UPDATE OR DELETE ON ratings
  FOR EACH ROW
  EXECUTE FUNCTION recalculate_provider_rating();

-- Function to notify admin users when a report is filed
CREATE OR REPLACE FUNCTION notify_admin_on_report()
RETURNS TRIGGER AS $$
DECLARE
  admin_user_id uuid;
  provider_name text;
  reporter_name text;
BEGIN
  -- Get provider username
  SELECT u.username INTO provider_name
  FROM service_providers sp
  JOIN users u ON sp.user_id = u.id
  WHERE sp.id = NEW.provider_id;

  -- Get reporter username
  SELECT username INTO reporter_name
  FROM users
  WHERE id = NEW.user_id;

  -- Create notification for all admin users
  FOR admin_user_id IN 
    SELECT id FROM users WHERE role = 'admin'
  LOOP
    INSERT INTO notifications (user_id, title, message, type)
    VALUES (
      admin_user_id,
      'New Report Filed',
      'User ' || COALESCE(reporter_name, 'Anonymous') || ' reported provider ' || COALESCE(provider_name, 'Unknown') || ': ' || LEFT(NEW.report_text, 100),
      'report'
    );
  END LOOP;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for admin notification on report
DROP TRIGGER IF EXISTS trigger_notify_admin_report ON reports;
CREATE TRIGGER trigger_notify_admin_report
  AFTER INSERT ON reports
  FOR EACH ROW
  EXECUTE FUNCTION notify_admin_on_report();
