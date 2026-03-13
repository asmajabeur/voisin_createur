'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Order } from '@/lib/types'

export function useOrders(userId: string | undefined, profileType: 'artisan' | 'client' | undefined) {
  const [orders, setOrders] = useState<Order[]>([])
  const [loadingOrders, setLoadingOrders] = useState(false)

  // Récupérer les commandes
  const fetchOrders = async () => {
    if (!userId) return

    try {
      setLoadingOrders(true)
      const column = profileType === 'artisan' ? 'seller_id' : 'buyer_id'
      
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          product:product_id (*),
          buyer:buyer_id (*),
          seller:seller_id (*)
        `)
        .eq(column, userId)
        .order('created_at', { ascending: false })

      if (error) throw error
      setOrders(data || [])
    } catch (err) {
      console.error("Erreur lors de la récupération des commandes:", err)
    } finally {
      setLoadingOrders(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [userId, profileType])

  // Créer une nouvelle commande
  const createOrder = async (productId: string, sellerId: string, quantity: number, totalPrice: number, defaultPrepTime: number) => {
    if (!userId) return { success: false, error: "Utilisateur non connecté" }

    try {
      // Calcul du délai de préparation
      const estimatedReadyAt = new Date()
      estimatedReadyAt.setDate(estimatedReadyAt.getDate() + defaultPrepTime)

      const { data, error } = await supabase
        .from('orders')
        .insert([{
          product_id: productId,
          buyer_id: userId,
          seller_id: sellerId,
          quantity,
          total_price: totalPrice,
          status: 'pending',
          estimated_ready_at: estimatedReadyAt.toISOString()
        }])
        .select()
        .single()

      if (error) throw error

      // NOTIFICATION POUR LE VENDEUR
      await supabase.from('notifications').insert([{
        user_id: sellerId,
        title: "Nouvelle commande ! 🛒",
        message: `Vous avez reçu une nouvelle commande pour ${quantity}x votre produit.`,
        type: 'order_new'
      }])

      return { success: true, data }
    } catch (err: any) {
      console.error("Erreur commande:", err)
      return { success: false, error: err.message }
    }
  }

  // Mettre à jour le statut d'une commande
  const updateOrderStatus = async (orderId: string, status: Order['status'], estimatedReadyDays?: number) => {
    try {
      const updates: any = { status, updated_at: new Date().toISOString() }
      
      // Si on confirme, on peut ajuster la date
      if (status === 'confirmed' && estimatedReadyDays !== undefined) {
        const date = new Date()
        date.setDate(date.getDate() + estimatedReadyDays)
        updates.estimated_ready_at = date.toISOString()
      }

      const { data: updatedOrder, error } = await supabase
        .from('orders')
        .update(updates)
        .eq('id', orderId)
        .select(`*, product:product_id(name)`)
        .single()

      if (error) throw error
      
      // NOTIFICATION POUR L'ACHETEUR SI PRÊT
      if (status === 'ready') {
        await supabase.from('notifications').insert([{
          user_id: updatedOrder.buyer_id,
          title: "Votre commande est prête ! ✨",
          message: `La création "${updatedOrder.product?.name}" est prête. Vous pouvez aller la chercher !`,
          type: 'order_ready'
        }])
      }

      // Notification si confirmé
      if (status === 'confirmed') {
        await supabase.from('notifications').insert([{
          user_id: updatedOrder.buyer_id,
          title: "Commande confirmée ✅",
          message: `Votre commande pour "${updatedOrder.product?.name}" a été acceptée par l'artisan.`,
          type: 'order_confirmed'
        }])
      }
      
      // Mise à jour de l'état local
      setOrders(orders.map(o => o.id === orderId ? { ...o, ...updates } : o))
      
      return { success: true }
    } catch (err: any) {
      console.error("Erreur mise à jour commande:", err)
      return { success: false, error: err.message }
    }
  }

  return {
    orders,
    loadingOrders,
    createOrder,
    updateOrderStatus,
    refreshOrders: fetchOrders
  }
}
