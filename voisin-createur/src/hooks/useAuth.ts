'use client'

import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import React from 'react'
import { supabase } from '../../lib/supabase'
import { UserProfile, ProfileType } from '../../lib/types'

interface AuthContextType {
  user: UserProfile | null
  loading: boolean
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
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
          profileType: data.profile_type as ProfileType,
          name: data.name,
          postalCode: data.postal_code ,
          createdAt: data.created_at,
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
      async (event: any, session: any) => {
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
    await supabase.auth.signOut()
    setUser(null)
  }

  const contextValue = {
    user,
    loading,
    signOut,
    refreshProfile
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
