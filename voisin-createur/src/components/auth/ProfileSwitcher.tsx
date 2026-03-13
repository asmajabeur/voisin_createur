'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { ProfileType, UserProfile } from '@/lib/types'

/**
 * Composant ProfileSwitcher - Phase 1: Double Profil (Artisan/Client)
 * 
 * Fonctionnalités implémentées :
 * - Basculement transparent entre les modes Artisan et Client
 * - Affichage du profil actif avec badge visuel
 * - Ajout dynamique d'un deuxième profil
 * - Interface compacte pour l'en-tête
 * 
 * Phase 2 - Extensions prévues :
 * - Gestion de plus de 2 profils (Artisan + Client + Livreur)
 * - Notifications par profil
 * - Personnalisation des préférences par profil
 * - Statistiques et analytics par profil
 * - Mode "privé" pour certains profils
 */
interface ProfileSwitcherProps {
  currentProfile: UserProfile | null
  onProfileChange: (profile: UserProfile) => void
}

export default function ProfileSwitcher({ currentProfile, onProfileChange }: ProfileSwitcherProps) {
  const [loading, setLoading] = useState(false)

  // Synchronisation avec le profil courant
  useEffect(() => {
    // Plus besoin de synchroniser les profils locaux si on utilise seulement currentProfile
  }, [currentProfile])

  /**
   * Ajoute ou bascule vers un autre type de profil
   * Phase 1: Simple basculement Artisan ↔ Client
   * Phase 2: Sera enrichi avec profils multiples et permissions
   */
  const handleAddProfile = async (newProfileType: ProfileType) => {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Utilisateur non connecté')

      // Vérifier si le profil existe déjà
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .eq('profile_type', newProfileType)
        .single()

      if (existingProfile) {
        // Le profil existe déjà, juste basculer
        onProfileChange(existingProfile)
      } else {
        // Créer un nouveau profil - Phase 1: Simple duplication
        // Phase 2: Sera enrichi avec configuration spécifique par profil
        const { data: newProfile, error } = await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            email: user.email!,
            profile_type: newProfileType,
            name: currentProfile?.name,
            postal_code: currentProfile?.postal_code,
          })
          .select()
          .single()

        if (error) throw error
        if (newProfile) {
          // Mapping des données DB (snake_case) vers App (camelCase)
          const mappedProfile = {
            ...newProfile,
            profile_type: newProfile.profile_type,
            postal_code: newProfile.postal_code,
          } as UserProfile

          onProfileChange(mappedProfile)
        }
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du profil:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!currentProfile) return null

  return (
    <div className="">
      {/* === PHASE 1: INTERFACE DE BASCULEMENT DE PROFIL === */}
      <div className="flex items-center justify-between">

        {/* Affichage du profil actuel avec badge visuel */}
        {/* <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-text">Profil actuel:</span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              currentProfile.profile_type === 'artisan' 
                ? 'bg-primary/20 text-primary' 
                : 'bg-primary/10 text-primary'
            }`}>
              {currentProfile.profile_type === 'artisan' ? '🎨 Artisan' : '🛍️ Client'}
            </span>
          </div> */}

        {/* Informations utilisateur - Phase 1 */}
        <span className="text-sm text-text space-x-2">
          {currentProfile.name || currentProfile.email}
        </span>
        {/* Phase 2: Ajouter avatar, niveau de confiance, etc. */}


        {/* Boutons de basculement - Phase 1 */}
        <div className="flex items-center space-x-2">
          {currentProfile.profile_type === 'client' && (
            <button
              onClick={() => handleAddProfile('artisan')}
              disabled={loading}
              className="px-5 py-2.5 text-xs bg-primary text-white rounded-full hover:bg-accent transition-all hover:shadow-md hover:shadow-teal-400/30 disabled:opacity-50"
            >
              {loading ? 'Chargement...' : 'Devenir artisan'}
            </button>
          )}

          {currentProfile.profile_type === 'artisan' && (
            <button
              onClick={() => handleAddProfile('client')}
              disabled={loading}
              className="px-5 py-2.5 text-xs bg-primary text-white rounded-full hover:bg-accent transition-all hover:shadow-md hover:shadow-teal-400/30 disabled:opacity-50"
            >
              {loading ? 'Chargement...' : 'Voir en tant que client'}
            </button>
          )}
          {/* Phase 2: Ajouter menu déroulant pour profils multiples */}
        </div>
      </div>
    </div>
  )
}
