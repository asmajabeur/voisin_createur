'use client'

import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { UserProfile, ProfileType } from '@/lib/types'
import ProfileSelector from '../components/auth/ProfileSelector'
import AuthForm from '../components/auth/AuthForm'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import ArtisanDashboard from '../components/dashboard/ArtisanDashboard'
import ClientDashboard from '../components/dashboard/ClientDashboard'
import HeroSection from '../components/home/HeroSection'

/**
 * Page d'accueil principale - Phase 1: Double Profil (Artisan/Client)
 * 
 * Fonctionnalités implémentées :
 * - Interface d'accueil avec sélection de profil
 * - Formulaire d'inscription/connexion intégré
 * - Tableau de bord personnalisé par profil
 * - Navigation adaptative selon le rôle
 * - Design responsive et moderne
 * 
 * Phase 2 - Extensions prévues :
 * - Flux visuel "Instagram-style" des produits
 * - Filtres avancés (catégorie, localisation, prix)
 * - Système de recommandations IA
 * - Notifications en temps réel
 * - Chat intégré entre artisans et clients
 * - Analytics et statistiques personnelles
 */
export default function Home() {
  const { user, loading, signOut, refreshProfile } = useAuth()
  const [selectedProfile, setSelectedProfile] = useState<ProfileType | null>(null)

  /**
   * Gère la sélection du profil et affiche le formulaire d'auth
   * Phase 1: Simple transition vers le formulaire
   * Phase 2: Sera enrichi avec onboarding guidé
   */
  const handleProfileSelect = (profileType: ProfileType) => {
    setSelectedProfile(profileType)
  }

  /**
   * Callback après authentification réussie
   * Phase 1: Simple retour à l'état initial
   * Phase 2: Sera enrichi avec welcome flow, tutorials, etc.
   */
  const handleAuthSuccess = async () => {
    // Force la récupération du profil pour être sûr de bien avoir le bon `profile_type`
    // fraîchement mis à jour lors de la connexion.
    await refreshProfile()
  }

  // === PHASE 1: ÉTAT DE CHARGEMENT ===
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-text">Chargement...</p>
        </div>
      </div>
    )
  }

  // === PHASE 1: UTILISATEUR CONNECTÉ - TABLEAU DE BORD ===
  if (user) {
    return (
      <div className="min-h-screen bg-background font-sans">
        <Header user={user} signOut={signOut} />

        {user.profile_type === 'artisan' ? (
          <ArtisanDashboard user={user} />
        ) : (
          <ClientDashboard user={user} />
        )}

        <Footer />
      </div>
    )
  }

  // === PAGE DE CONNEXION (PUBLIC) ===
  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <Header />

      <HeroSection 
        title="Voisin Créateur" 
        subtitle="Rejoignez la communauté des artisans locaux"
      />

      <main className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center justify-start gap-12">
        {/* Sélecteur de profil toujours visible */}
        <ProfileSelector 
          selectedProfile={selectedProfile} 
          onSelectProfile={handleProfileSelect} 
        />

        {/* Formulaire qui apparaît en dessous une fois le profil choisi */}
        {selectedProfile && (
          <div className="w-full max-w-md animate-fade-in scroll-mt-10">
            <AuthForm 
              selectedProfile={selectedProfile as ProfileType} 
              onAuthSuccess={handleAuthSuccess}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
