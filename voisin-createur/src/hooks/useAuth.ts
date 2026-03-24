'use client'

import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import React from 'react'
import { supabase } from '@/lib/supabase'
import { UserProfile, ProfileType } from '@/lib/types'

export interface AuthContextType {
  user: UserProfile | null
  loading: boolean
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      if (data) {
        const profile: UserProfile = {
          id: data.id,
          email: data.email,
          profile_type: data.profile_type as ProfileType,
          name: data.name,
          postal_code: data.postal_code,
          city: data.city,
          phone: data.phone,
          address: data.address,
          description: data.description,
          avatar_url: data.avatar_url,
          banner_url: data.banner_url,
          is_motorized: data.is_motorized,
          can_deliver: data.can_deliver,
          created_at: data.created_at,
          updated_at: data.updated_at,
          short_description: data.short_description,
          long_description: data.long_description,
          social_links: data.social_links,
        }
        setUser(profile)
      }
    } catch (error) {
      console.error('Erreur lors du chargement du profil:', error)
      setUser(null)
    }
  }

  const refreshProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await fetchProfile(user.id)
    } else {
      setUser(null)
    }
  }

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        await fetchProfile(session.user.id)
      }
      setLoading(false)
    }

    checkSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          await fetchProfile(session.user.id)
        } else {
          setUser(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error('Erreur lors de la déconnexion Supabase:', error)
    } finally {
      setUser(null)
    }
  }

  const updateProfile = async (updates: Partial<UserProfile>): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'Non authentifié' }
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)

      if (error) throw error

      // Rafraîchir pour avoir les données locales à jour
      await refreshProfile()
      
      return { success: true }
    } catch (error: any) {
      console.error('Erreur lors de la mise à jour du profil:', error)
      return { success: false, error: error.message || 'Erreur lors de la mise à jour' }
    }
  }

  const contextValue = {
    user,
    loading,
    signOut,
    refreshProfile,
    updateProfile
  }

  return React.createElement(
    AuthContext.Provider,
    { value: contextValue },
    children
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
