'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Product } from '../../lib/types'

export function useProducts(userId: string | undefined) {
  const [products, setProducts] = useState<Product[]>([])
  const [loadingProducts, setLoadingProducts] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      if (!userId) {
        setLoadingProducts(false)
        return
      }
      
      try {
        setLoadingProducts(true)
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })

        if (error) throw error
        setProducts(data || [])
      } catch (err) {
        console.error("Erreur lors de la récupération des produits:", err)
      } finally {
        setLoadingProducts(false)
      }
    }

    fetchProducts()
  }, [userId])

  const toggleProductActive = async (product: Product) => {
    try {
      const newAvailableStatus = !product.available
      // Optimistic UI update
      setProducts(products.map(p => p.id === product.id ? { ...p, available: newAvailableStatus } : p))

      const { error } = await supabase
        .from('products')
        .update({ available: newAvailableStatus })
        .eq('id', product.id)

      if (error) throw error
    } catch (err) {
      console.error("Erreur lors de la mise à jour du produit:", err)
      // Revert optimistic update
      setProducts(products.map(p => p.id === product.id ? { ...p, available: product.available } : p))
    }
  }

  return {
    products,
    loadingProducts,
    toggleProductActive
  }
}
