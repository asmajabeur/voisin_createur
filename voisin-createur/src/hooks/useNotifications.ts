'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'

export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  type: 'order_new' | 'order_ready' | 'order_confirmed'
  read: boolean
  created_at: string
}

export function useNotifications(userId: string | undefined) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  const fetchNotifications = useCallback(async () => {
    if (!userId) return

    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(20)

    if (!error && data) {
      setNotifications(data)
      setUnreadCount(data.filter(n => !n.read).length)
    }
  }, [userId])

  useEffect(() => {
    if (!userId) return

    fetchNotifications()

    // Abonnement Realtime
    const channel = supabase
      .channel(`notifications:${userId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'notifications',
        filter: `user_id=eq.${userId}` 
      }, (payload) => {
        const newNotif = payload.new as Notification
        setNotifications(prev => [newNotif, ...prev])
        setUnreadCount(prev => prev + 1)
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId, fetchNotifications])

  const markAsRead = async (notifId: string) => {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notifId)

    if (!error) {
      setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n))
      setUnreadCount(prev => Math.max(0, prev - 1))
    }
  }

  return { notifications, unreadCount, markAsRead, refreshNotifications: fetchNotifications }
}
