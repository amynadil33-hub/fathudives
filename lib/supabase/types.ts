// Generated-style Supabase database types.
// Regenerate with: supabase gen types typescript --project-id <id> > lib/supabase/types.ts
// This hand-written version mirrors supabase/schema.sql.

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          email: string | null
          role: 'super_admin' | 'admin' | 'editor'
          created_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          email?: string | null
          role?: 'super_admin' | 'admin' | 'editor'
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
        Relationships: []
      }
      packages: {
        Row: {
          id: string
          title: string
          slug: string
          short_description: string | null
          full_description: string | null
          featured_image: string | null
          nights: number
          dives: number
          experience_level: string
          accommodation_included: boolean
          meals_included: boolean
          transfers_included: boolean
          base_price: number
          currency: string
          featured: boolean
          active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['packages']['Row']> & { title: string; slug: string }
        Update: Partial<Database['public']['Tables']['packages']['Row']>
        Relationships: []
      }
      enquiries: {
        Row: {
          id: string
          full_name: string
          email: string
          whatsapp: string | null
          nationality: string | null
          arrival_date: string | null
          departure_date: string | null
          adults: number
          children: number
          number_of_divers: number
          diver_status: string | null
          certification_level: string | null
          certification_agency: string | null
          logged_dives: number | null
          package_id: string | null
          accommodation_required: boolean
          equipment_required: boolean
          transfer_required: boolean
          special_requests: string | null
          message: string | null
          status: 'new' | 'contacted' | 'quoted' | 'confirmed' | 'cancelled'
          created_at: string
        }
        Insert: Partial<Database['public']['Tables']['enquiries']['Row']> & {
          full_name: string
          email: string
        }
        Update: Partial<Database['public']['Tables']['enquiries']['Row']>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      user_role: 'super_admin' | 'admin' | 'editor'
      enquiry_status: 'new' | 'contacted' | 'quoted' | 'confirmed' | 'cancelled'
    }
  }
}
