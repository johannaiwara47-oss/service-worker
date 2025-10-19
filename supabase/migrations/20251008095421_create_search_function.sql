/*
  # Search Function for Nearby Providers

  ## Description
  Creates a PostgreSQL function to search for service providers within a specified radius.

  ## Function Created
  
  **search_nearby_providers(p_category_id, p_user_lat, p_user_lon, p_max_distance_km)**
  - Parameters:
    - p_category_id (uuid) - Category to filter by
    - p_user_lat (float8) - User's latitude
    - p_user_lon (float8) - User's longitude
    - p_max_distance_km (float8) - Maximum distance in kilometers (default 50)
  
  - Returns: Table with provider details including:
    - Provider information
    - User information (username, profile image)
    - Calculated distance in kilometers
    - Category name
  
  - Uses Haversine formula for distance calculation
  - Filters out blocked providers
  - Orders by distance ascending
  - Limits to 50 results

  ## Important Notes
  - Function uses earth radius of 6371 km for Haversine calculation
  - Only returns non-blocked providers with valid coordinates
  - Performance optimized with proper indexes on lat/lon columns
*/

-- Function to search for nearby providers
CREATE OR REPLACE FUNCTION search_nearby_providers(
  p_category_id uuid,
  p_user_lat float8,
  p_user_lon float8,
  p_max_distance_km float8 DEFAULT 50
)
RETURNS TABLE (
  id uuid,
  user_id uuid,
  provider_type text,
  business_name text,
  contact_number text,
  category_id uuid,
  category_name text,
  work_image_1 text,
  work_image_2 text,
  work_image_3 text,
  average_rating float8,
  is_verified boolean,
  latitude float8,
  longitude float8,
  location_text text,
  username text,
  profile_image_url text,
  whatsapp_number text,
  phone_number text,
  distance_km float8,
  created_at timestamptz
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    sp.id,
    sp.user_id,
    sp.provider_type,
    sp.business_name,
    sp.contact_number,
    sp.category_id,
    c.name as category_name,
    sp.work_image_1,
    sp.work_image_2,
    sp.work_image_3,
    sp.average_rating,
    sp.is_verified,
    sp.latitude,
    sp.longitude,
    sp.location_text,
    u.username,
    u.profile_image_url,
    u.whatsapp_number,
    u.phone_number,
    (
      6371 * acos(
        cos(radians(p_user_lat)) * cos(radians(sp.latitude)) * 
        cos(radians(sp.longitude) - radians(p_user_lon)) + 
        sin(radians(p_user_lat)) * sin(radians(sp.latitude))
      )
    ) as distance_km,
    sp.created_at
  FROM service_providers sp
  JOIN users u ON sp.user_id = u.id
  LEFT JOIN categories c ON sp.category_id = c.id
  WHERE 
    sp.is_blocked = false
    AND sp.latitude IS NOT NULL 
    AND sp.longitude IS NOT NULL
    AND sp.category_id = p_category_id
    AND (
      6371 * acos(
        cos(radians(p_user_lat)) * cos(radians(sp.latitude)) * 
        cos(radians(sp.longitude) - radians(p_user_lon)) + 
        sin(radians(p_user_lat)) * sin(radians(sp.latitude))
      )
    ) <= p_max_distance_km
  ORDER BY distance_km ASC
  LIMIT 50;
END;
$$ LANGUAGE plpgsql STABLE;
