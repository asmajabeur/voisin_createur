'use client'

import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import React from 'react'
import { supabase } from '../../lib/supabase'
import { UserProfile, ProfileType } from '../../lib/types'

/**
 * Hook useAuth - Phase 1: Double Profil (Artisan/Client)
 * 
 * Fonctionnalités implémentées :
 * - Gestion complète de l'authentification Supabase
 * - Synchronisation automatique des profils utilisateurs
 * - États de chargement et erreurs
 * - Persistance de session
 * - Support du double profil (basculement)
 * 
 * Phase 2 - Extensions prévues :
 * - Support OAuth (Google, Facebook, Apple)
 * - Gestion des rôles et permissions avancées
 * - Cache intelligent et offline mode
 * - Notifications push par profil
 * - Analytics de comportement utilisateur
 */
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

  /**
   * Récupère le profil utilisateur depuis la base de données
   * Phase 1: Simple récupération du profil principal
   * Phase 2: Sera enrichi avec cache, permissions, etc.
   */
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
          name: data.name || undefined,
          postal_code: data.postal_code || undefined,
          created_at: data.created_at,
          updated_at: data.created_at,
        }
        setUser(profile)
      }
    } catch (error) {
      console.error('Erreur lors du chargement du profil:', error)
      setUser(null)
    }
  }

  /**
   * Rafraîchit manuellement le profil utilisateur
   * Phase 1: Simple rechargement depuis la base
   * Phase 2: Sera optimisé avec cache invalidation
   */
  const refreshProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await fetchProfile(user.id)
    } else {
      setUser(null)
    }
  }

  /**
   * Configuration des écouteurs d'événements d'authentification
   * Phase 1: Écoute des changements de session basiques
   * Phase 2: Sera enrichi avec analytics, logging, etc.
   */
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

  /**
   * Déconnexion de l'utilisateur
   * Phase 1: Simple déconnexion Supabase
   * Phase 2: Sera enrichi avec nettoyage cache, notifications, etc.
   */
  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  const value = {
    user,
    loading,
    signOut,
    refreshProfile
  }

  return React.createElement(
    AuthContext.Provider,
    { value: value },
    children
  )
}

/**
 * Hook personnalisé pour accéder au contexte d'authentification
 * Phase 1: Simple accès au contexte
 * Phase 2: Sera enrichi avec helpers, validation, etc.
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
