// Types réutilisables pour l'application

export type ProfileType = 'artisan' | 'client'

export interface UserProfile {
  id: string
  email: string
  profileType: ProfileType
  name?: string
  postalCode?: string
  createdAt: string
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
  userId: string
  name: string
  description?: string
  price: number
  imageUrl?: string
  category: string
  available: boolean
  createdAt: string
  user?: {
    name?: string
    postalCode?: string
  }
}

export interface Order {
  id: string
  productId: string
  buyerId: string
  sellerId: string
  status: 'pending' | 'confirmed' | 'completed'
  createdAt: string
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
