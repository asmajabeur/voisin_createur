'use client'

import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { ProfileType } from '../../lib/types'
import ProfileSelector from '../components/auth/ProfileSelector'
import AuthForm from '../components/auth/AuthForm'
import ProfileSwitcher from '../components/auth/ProfileSwitcher'
import ProductGrid from '../components/products/ProductGrid'

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
  const { user, loading, signOut } = useAuth()
  const [selectedProfile, setSelectedProfile] = useState<ProfileType | null>(null)
  const [showAuthForm, setShowAuthForm] = useState(false)

  /**
   * Gère la sélection du profil et affiche le formulaire d'auth
   * Phase 1: Simple transition vers le formulaire
   * Phase 2: Sera enrichi avec onboarding guidé
   */
  const handleProfileSelect = (profileType: ProfileType) => {
    setSelectedProfile(profileType)
    setShowAuthForm(true)
  }

  /**
   * Callback après authentification réussie
   * Phase 1: Simple retour à l'état initial
   * Phase 2: Sera enrichi avec welcome flow, tutorials, etc.
   */
  const handleAuthSuccess = () => {
    setShowAuthForm(false)
  }

  // === PHASE 1: ÉTAT DE CHARGEMENT ===
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-text">Chargement...</p>
          {/* Phase 2: Ajouter skeleton loading, messages personnalisés */}
        </div>
      </div>
    )
  }

  // === PHASE 1: UTILISATEUR CONNECTÉ - TABLEAU DE BORD ===
  if (user) {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <h1 className="text-2xl font-bold text-text">Voisin Créateur</h1>
              <div className="flex items-center space-x-4">
                <ProfileSwitcher 
                  currentProfile={user} 
                  onProfileChange={() => {}} 
                />
                <button
                  onClick={signOut}
                  className="px-4 py-2 text-sm text-text hover:text-primary transition-colors"
                >
                  Déconnexion
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="text-6xl mb-6">
              {user.profileType === 'artisan' ? '🎨' : '🛍️'}
            </div>
            <h2 className="text-3xl font-bold text-text mb-4">
              Bienvenue, {user.name || user.email} !
            </h2>
            <p className="text-lg text-text mb-8">
              {user.profileType === 'artisan' 
                ? 'Gérez votre boutique et vendez vos créations aux habitants de votre quartier'
                : 'Découvrez les créations uniques des artisans de votre quartier'
              }
            </p>

            {/* === PHASE 1: TABLEAU DE BORD PAR PROFIL === */}
            <div className="bg-white rounded-lg shadow-md p-8 max-w-5xl mx-auto border border-secondary">
              <h3 className="text-xl font-semibold mb-4 text-text">
                {user.profileType === 'artisan' ? 'Votre tableau de bord artisan' : 'Votre espace client'}
              </h3>
              
              {user.profileType === 'artisan' ? (
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <h4 className="font-medium text-primary mb-2">🎨 Gestion de vos produits</h4>
                    <p className="text-sm text-text">Ajoutez, modifiez et supprimez vos créations</p>
                    {/* Phase 2: Lien vers gestion CRUD, statistiques produits */}
                  </div>
                  <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                    <h4 className="font-medium text-accent mb-2">📋 Suivi des commandes</h4>
                    <p className="text-sm text-text">Gérez les demandes de vos clients</p>
                    {/* Phase 2: Lien vers système de commandes, notifications */}
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <h4 className="font-medium text-dark mb-2">📊 Vos statistiques</h4>
                    <p className="text-sm text-text">Suivez vos ventes et votre popularité</p>
                    {/* Phase 2: Graphiques, analytics, revenus */}
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-left">
                  {/* Intégration du Flux Visuel (Phase 2) */}
                  <ProductGrid />
                  
                  <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                    <h4 className="font-medium text-accent mb-2">🔍 Filtrer par proximité</h4>
                    <p className="text-sm text-text">Trouvez des créations près de chez vous</p>
                    {/* Phase 2: Géolocalisation, carte interactive */}
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <h4 className="font-medium text-dark mb-2">💬 Contacter les artisans</h4>
                    <p className="text-sm text-text">Posez vos questions et commandez facilement</p>
                    {/* Phase 2: Chat intégré, système de messagerie */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    )
  }

  // === PHASE 1: PAGE D'ACCUEIL PUBLIC ===
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-text">Voisin Créateur</h1>
            <p className="text-sm text-text">
              Les créations de vos artisans, à portée de main
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-text mb-4">
            Découvrez les trésors créatifs de votre quartier
          </h2>
          <p className="text-xl text-text max-w-3xl mx-auto">
            Connectez-vous pour acheter les créations uniques des artisans locaux 
            ou pour vendre vos propres créations à vos voisins
          </p>
        </div>

        {/* === PHASE 1: SÉLECTION DE PROFIL OU FORMULAIRE === */}
        {!showAuthForm ? (
          <ProfileSelector onSelectProfile={handleProfileSelect} />
        ) : (
          <AuthForm 
            selectedProfile={selectedProfile!} 
            onAuthSuccess={handleAuthSuccess}
          />
        )}

        {/* === PHASE 1: SECTION VALEURS === */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-lg font-semibold text-text mb-2">Artisans Talents</h3>
            <p className="text-text">
              Des créateurs passionnés qui partagent leur savoir-faire unique
            </p>
            {/* Phase 2: Témoignages, photos d'artisans locaux */}
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🏘️</div>
            <h3 className="text-lg font-semibold text-text mb-2">Circuit Court</h3>
            <p className="text-text">
              Soutenez l'économie locale et consommez près de chez vous
            </p>
            {/* Phase 2: Carte des artisans, impact local */}
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">💝</div>
            <h3 className="text-lg font-semibold text-text mb-2">Créations Uniques</h3>
            <p className="text-text">
              Des produits faits avec amour et passion par vos voisins
            </p>
            {/* Phase 2: Galerie de produits vedettes */}
          </div>
        </div>
      </main>
    </div>
  )
}
