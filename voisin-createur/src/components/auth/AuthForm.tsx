'use client'

import { useState } from 'react'
import { supabase } from '../../../lib/supabase'
import { ProfileType } from '../../../lib/types'
import InputField from './InputField'

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

        // FIX: Création manuelle du profil pour s'assurer qu'il existe
        // (Au cas où le trigger SQL ne serait pas configuré)
        if (authData.user) {
          const { error: profileError } = await supabase
            .from('profiles')
            .upsert([
              {
                id: authData.user.id,
                email: cleanEmail,
                profile_type: selectedProfile,
                name: name || '',
                postal_code: postalCode || '',
              }
            ], { onConflict: 'id' }) // Évite les doublons si le trigger a déjà couru
          
          if (profileError) console.error("Info: Profil déjà existant ou erreur:", profileError)
        }
      } else {
        // === PHASE 1: CONNEXION UTILISATEUR EXISTANT ===
        // Authentification par email/mot de passe
        // Phase 2: Sera étendu avec OAuth (Google, Facebook, etc.)
        const { error: signInError, data: signInData } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        })

        if (signInError) throw signInError

        // FIX: Forcer le changement de type de profil si l'utilisateur se connecte depuis un autre onglet
        if (signInData.user) {
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ profile_type: selectedProfile })
            .eq('id', signInData.user.id)
          
          if (updateError) console.error("Info: Impossible de mettre à jour le rôle au login:", updateError)
        }
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
    // TODO REFACTOR: Extraire ces multiples styles "w-full max-w-md mx-auto bg-surface..." dans une classe `.auth-card` dans auth.css ou globals.css
    <div className="w-full max-w-md mx-auto bg-surface rounded-2xl shadow-md p-6 border border-secondary">
      {/* TODO REFACTOR: Transformer les champs de saisie répétés (input text/email/password) en un composant UI générique `<InputField label="..." type="..." />` */}
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
          <InputField
            id="name"
            label="Nom complet"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jean Dupont"
          />
        )}

        {/* Champ Email */}
        <InputField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required={true}
          placeholder="jean@example.com"
        />

        {/* Champ Code Postal - Phase 1: Optionnel, Phase 2: Obligatoire pour géolocalisation */}
        {isSignUp && (
          <InputField
            id="postalCode"
            label="Code postal"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="75001"
          />
        )}

        {/* Champ Mot de passe */}
        <InputField
          id="password"
          label="Mot de passe"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
          minLength={6}
          placeholder="•••••••"
        />

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
