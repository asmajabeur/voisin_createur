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
  description?: string
  avatar_url?: string
  created_at: string
  updated_at: string
  short_description?: string
}

export interface ProductFormData {
  name: string
  description: string
  price: number
  category: string
  image?: File
}

export interface Product {
  id: string
  user_id: string
  name: string
  description?: string
  price: number
  image_url?: string
  category: string
  stock: number
  available: boolean
  created_at: string
  user?: {
    name?: string
    postal_code?: string
  }
}

export interface Order {
  id: string
  product_id: string
  buyer_id: string
  seller_id: string
  status: 'pending' | 'confirmed' | 'completed'
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
