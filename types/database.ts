export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          role: 'user' | 'provider' | 'admin'
          username: string
          email: string
          phone_number: string | null
          whatsapp_number: string | null
          profile_image_url: string | null
          latitude: number | null
          longitude: number | null
          location_text: string | null
          created_at: string
          deleted_at: string | null
        }
        Insert: {
          id?: string
          role?: 'user' | 'provider' | 'admin'
          username: string
          email: string
          phone_number?: string | null
          whatsapp_number?: string | null
          profile_image_url?: string | null
          latitude?: number | null
          longitude?: number | null
          location_text?: string | null
          created_at?: string
          deleted_at?: string | null
        }
        Update: {
          id?: string
          role?: 'user' | 'provider' | 'admin'
          username?: string
          email?: string
          phone_number?: string | null
          whatsapp_number?: string | null
          profile_image_url?: string | null
          latitude?: number | null
          longitude?: number | null
          location_text?: string | null
          created_at?: string
          deleted_at?: string | null
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          created_at?: string
        }
      }
      service_providers: {
        Row: {
          id: string
          user_id: string
          provider_type: 'individual' | 'business'
          business_name: string | null
          contact_number: string | null
          category_id: string | null
          work_image_1: string | null
          work_image_2: string | null
          work_image_3: string | null
          average_rating: number
          is_verified: boolean
          is_blocked: boolean
          blocked_at: string | null
          latitude: number | null
          longitude: number | null
          location_text: string | null
          created_at: string
          deleted_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          provider_type: 'individual' | 'business'
          business_name?: string | null
          contact_number?: string | null
          category_id?: string | null
          work_image_1?: string | null
          work_image_2?: string | null
          work_image_3?: string | null
          average_rating?: number
          is_verified?: boolean
          is_blocked?: boolean
          blocked_at?: string | null
          latitude?: number | null
          longitude?: number | null
          location_text?: string | null
          created_at?: string
          deleted_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          provider_type?: 'individual' | 'business'
          business_name?: string | null
          contact_number?: string | null
          category_id?: string | null
          work_image_1?: string | null
          work_image_2?: string | null
          work_image_3?: string | null
          average_rating?: number
          is_verified?: boolean
          is_blocked?: boolean
          blocked_at?: string | null
          latitude?: number | null
          longitude?: number | null
          location_text?: string | null
          created_at?: string
          deleted_at?: string | null
        }
      }
      ratings: {
        Row: {
          id: string
          user_id: string
          provider_id: string
          rating: number
          comment: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          provider_id: string
          rating: number
          comment?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          provider_id?: string
          rating?: number
          comment?: string | null
          created_at?: string
        }
      }
      reports: {
        Row: {
          id: string
          user_id: string | null
          provider_id: string
          report_text: string
          status: 'pending' | 'resolved'
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          provider_id: string
          report_text: string
          status?: 'pending' | 'resolved'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          provider_id?: string
          report_text?: string
          status?: 'pending' | 'resolved'
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          type: string
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          type?: string
          is_read?: boolean
          created_at?: string
        }
      }
    }
    Functions: {
      search_nearby_providers: {
        Args: {
          p_category_id: string
          p_user_lat: number
          p_user_lon: number
          p_max_distance_km?: number
        }
        Returns: Array<{
          id: string
          user_id: string
          provider_type: string
          business_name: string | null
          contact_number: string | null
          category_id: string | null
          category_name: string | null
          work_image_1: string | null
          work_image_2: string | null
          work_image_3: string | null
          average_rating: number
          is_verified: boolean
          latitude: number | null
          longitude: number | null
          location_text: string | null
          username: string
          profile_image_url: string | null
          whatsapp_number: string | null
          phone_number: string | null
          distance_km: number
          created_at: string
        }>
      }
    }
  }
}
