'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Product, ProductFormData } from '@/lib/types'

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

  const addProduct = async (formData: ProductFormData) => {
    if (!userId) return

    try {
      setLoadingProducts(true)
      let imageUrl = null

      // 1. Upload de l'image si elle existe
      if (formData.image) {
        const file = formData.image
        const fileExt = file.name.split('.').pop()
        const fileName = `${userId}-${Math.random()}.${fileExt}`
        const filePath = `products/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, file)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath)
        
        imageUrl = publicUrl
      }

      // 2. Insertion en base
      const { data, error } = await supabase
        .from('products')
        .insert([{
          user_id: userId,
          name: formData.name,
          short_description: formData.short_description,
          description: formData.description,
          ingredients: formData.ingredients,
          price: formData.price,
          category: formData.category,
          image_url: imageUrl,
          available: true,
          stock: 99 // Valeur par défaut pour le MVP
        }])
        .select()
        .single()

      if (error) throw error
      if (data) setProducts([data, ...products])
      
      return { success: true, data }
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error('Erreur inconnue')
      console.error("Erreur lors de l'ajout du produit:", error)
      return { success: false, error: error.message }
    } finally {
      setLoadingProducts(false)
    }
  }

  const deleteProduct = async (productId: string) => {
    try {
      // Optimistic UI update
      const previousProducts = [...products]
      setProducts(products.filter(p => p.id !== productId))

      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId)

      if (error) {
        setProducts(previousProducts)
        throw error
      }
      return { success: true }
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error('Erreur inconnue')
      console.error("Erreur lors de la suppression:", error)
      return { success: false, error: error.message }
    }
  }

  const updateProduct = async (productId: string, formData: ProductFormData) => {
    try {
      setLoadingProducts(true)
      let imageUrl = undefined

      // 1. Upload de la nouvelle image si elle est fournie
      if (formData.image) {
        const file = formData.image
        const fileExt = file.name.split('.').pop()
        const fileName = `${userId}-${Math.random()}.${fileExt}`
        const filePath = `products/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, file)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath)
        
        imageUrl = publicUrl
      }

      // 2. Mise à jour en base
      const updates: Record<string, unknown> = {
        name: formData.name,
        short_description: formData.short_description,
        description: formData.description,
        ingredients: formData.ingredients,
        price: formData.price,
        category: formData.category,
        updated_at: new Date().toISOString()
      }

      if (imageUrl) updates.image_url = imageUrl

      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', productId)
        .select()
        .single()

      if (error) throw error
      if (data) {
        setProducts(products.map(p => p.id === productId ? data : p))
      }
      
      return { success: true, data }
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error('Erreur inconnue')
      console.error("Erreur lors de la mise à jour du produit:", error)
      return { success: false, error: error.message }
    } finally {
      setLoadingProducts(false)
    }
  }

  return {
    products,
    loadingProducts,
    toggleProductActive,
    addProduct,
    updateProduct,
    deleteProduct
  }
}
