'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Product } from '@/lib/types'

export function useProductDetail(productId: string) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return

      try {
        setLoading(true)
        const { data, error: fetchError } = await supabase
          .from('products')
          .select(`
            *,
            artisan:user_id (*)
          `)
          .eq('id', productId)
          .single()

        if (fetchError) throw fetchError
        
        // Formatage pour correspondre à l'attendee UI
        const formattedProduct = {
          ...data,
          artisan: data.artisan ? (Array.isArray(data.artisan) ? data.artisan[0] : data.artisan) : null
        }
        
        setProduct(formattedProduct)
      } catch (err: unknown) {
        const error = err instanceof Error ? err : new Error('Erreur inconnue')
        console.error("Erreur fetch produit:", error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  return { product, loading, error }
}
