// Types réutilisables pour l'application

export type ProfileType = 'artisan' | 'client'

export interface UserProfile {
  id: string
  email: string
  profile_type: ProfileType
  name?: string
  postal_code?: string
  city?: string
  phone?: string
  address?: string
  description?: string
  avatar_url?: string
  banner_url?: string
  is_motorized?: boolean
  can_deliver?: boolean
  created_at: string
  updated_at: string
  short_description?: string
  long_description?: string
  social_links?: {
    instagram?: string
    facebook?: string
    tiktok?: string
    website?: string
  }
}

export interface ProductFormData {
  name: string
  short_description: string
  description: string
  ingredients?: string
  price: number
  category: string
  image?: File
}

export interface Product {
  id: string
  user_id: string
  name: string
  short_description?: string
  description?: string
  ingredients?: string
  price: number
  image_url: string | null
  category: string
  stock: number
  available: boolean
  default_prep_time: number
  created_at: string
  user?: {
    name?: string
    postal_code?: string
  } | null
  artisan?: UserProfile | null
}

export interface Order {
  id: string
  product_id: string
  buyer_id: string
  seller_id: string
  quantity: number
  total_price: number
  status: 'pending' | 'confirmed' | 'ready' | 'completed' | 'cancelled'
  estimated_ready_at?: string
  pickup_code?: string
  created_at: string
  product?: Product
  buyer?: UserProfile
  seller?: UserProfile
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// Catégories de produits
export const PRODUCT_CATEGORIES = [
  'Pâtisserie',
  'Bijoux',
  'Mode',
  'Accessoires',
  'Art',
  'Décoration',
  'Autre'
] as const

export type ProductCategory = typeof PRODUCT_CATEGORIES[number]
