'use client'

import { useState } from 'react'
import { supabase } from '../../../lib/supabase'
import { ProfileType } from '../../../lib/types'

/**
 * Composant AuthForm - Phase 1: Double Profil (Artisan/Client)
 * 
 * Fonctionnalités implémentées :
 * - Inscription avec choix de profil (Artisan/Client)
 * - Connexion utilisateur existant
 * - Création automatique du profil dans la base de données
 * - Validation des champs (email, mot de passe, code postal)
 * - Gestion des erreurs d'authentification
 * 
 * Préparation pour Phase 2 :
 * - Extension possible pour les profils sociaux (Google, Facebook)
 * - Ajout de champs supplémentaires (téléphone, adresse complète)
 * - Validation avancée du formulaire
 */
interface AuthFormProps {
  selectedProfile: ProfileType
  onAuthSuccess: () => void
}

export default function AuthForm({ selectedProfile, onAuthSuccess }: AuthFormProps) {
  // États du formulaire
  const [isSignUp, setIsSignUp] = useState(true) // Toggle entre inscription/connexion
  const [email, setEmail] = useState('') // Email de l'utilisateur
  const [password, setPassword] = useState('') // Mot de passe (min 6 caractères)
  const [name, setName] = useState('') // Nom complet (optionnel)
  const [postalCode, setPostalCode] = useState('') // Code postal pour la géolocalisation
  const [loading, setLoading] = useState(false) // État de chargement pendant l'auth
  const [error, setError] = useState<string | null>(null) // Message d'erreur

  /**
   * Gère la soumission du formulaire (inscription ou connexion)
   * Phase 1: Authentification email/mot de passe classique
   * Phase 2: Sera étendu pour les réseaux sociaux et validation avancée
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Nettoyage et validation de l'email
    const cleanEmail = email.trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(cleanEmail)) {
      setError("Format d'email invalide. Vérifiez qu'il n'y a pas d'espaces ou qu'il manque le domaine.")
      setLoading(false)
      return
    }

    try {
      if (isSignUp) {
        // === PHASE 1: INSCRIPTION UTILISATEUR ===
        // Création du compte Supabase Auth avec métadonnées
        // Le trigger SQL 'on_auth_user_created' utilisera ces données pour créer le profil
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: {
            data: {
              profile_type: selectedProfile,
              name: name || '',
              postal_code: postalCode || '',
            }
          }
        })

        if (authError) throw authError
      } else {
        // === PHASE 1: CONNEXION UTILISATEUR EXISTANT ===
        // Authentification par email/mot de passe
        // Phase 2: Sera étendu avec OAuth (Google, Facebook, etc.)
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        })

        if (signInError) throw signInError
      }

      onAuthSuccess()
    } catch (err: any) {
      // Gestion des erreurs spécifiques
      if (err.message?.includes('rate limit')) {
        setError("Trop de tentatives. Désactivez la confirmation d'email dans Supabase pour tester.")
      } else {
        setError(err.message || 'Une erreur est survenue')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto bg-surface rounded-2xl shadow-md p-6 border border-secondary">
      <div className="flex justify-center mb-4">
        <img src="/logo.png" alt="Logo" className="h-16 w-auto" />
      </div>
      <h2 className="text-2xl font-bold text-center mb-6 text-text">
        {isSignUp ? 'Créer votre compte' : 'Se connecter'}
      </h2>

      {/* Indicateur de type de profil */}
      <div className="mb-6 p-3 bg-secondary/50 rounded-full text-center">
        <p className="text-sm text-text flex items-center justify-center gap-2">
          Type de profil : 
          <span className="font-bold px-2 py-0.5 rounded text-[#3a757d] bg-[#3a757d]/10">
            {selectedProfile === 'artisan' ? 'Artisan' : 'Client'}
          </span>
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Champ Nom - Phase 1: Optionnel, Phase 2: Obligatoire */}
        {isSignUp && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
              Nom complet
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-6 py-3 border border-secondary rounded-full focus:ring-2 focus:ring-primary focus:border-transparent text-text"
              placeholder="Jean Dupont"
            />
          </div>
        )}

        {/* Champ Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-6 py-3 border border-secondary rounded-full focus:ring-2 focus:ring-primary focus:border-transparent text-text"
            placeholder="jean@example.com"
          />
        </div>

        {/* Champ Code Postal - Phase 1: Optionnel, Phase 2: Obligatoire pour géolocalisation */}
        {isSignUp && (
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-text mb-2">
              Code postal
            </label>
            <input
              type="text"
              id="postalCode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="w-full px-6 py-3 border border-secondary rounded-full focus:ring-2 focus:ring-primary focus:border-transparent text-text"
              placeholder="75001"
            />
          </div>
        )}

        {/* Champ Mot de passe */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-text mb-2">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-6 py-3 border border-secondary rounded-full focus:ring-2 focus:ring-primary focus:border-transparent text-text"
            placeholder="•••••••"
          />
        </div>

        {/* Bouton de soumission */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3.5 px-6 rounded-full font-medium transition-all ${
            loading
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-[#3a757d] hover:bg-[#2a5a60] text-white hover:shadow-lg hover:shadow-[#3a757d]/30'
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Chargement...
            </span>
          ) : (
            isSignUp ? 'Créer mon compte' : 'Me connecter'
          )}
        </button>
      </form>

      {/* Toggle inscription/connexion */}
      <div className="mt-6 text-center">
        <p className="text-sm text-text">
          {isSignUp ? 'Déjà un compte ?' : 'Pas encore de compte ?'}{' '}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-primary hover:text-accent font-medium"
          >
            {isSignUp ? 'Se connecter' : 'Créer un compte'}
          </button>
        </p>
      </div>
    </div>
  )
}
