'use client'

import { useState } from 'react'
import { ProfileType } from '../../../lib/types'

/**
 * Composant ProfileSelector - Phase 1: Double Profil (Artisan/Client)
 * 
 * Fonctionnalités implémentées :
 * - Interface visuelle pour choisir entre profil Artisan et Client
 * - Description claire des avantages de chaque profil
 * - Feedback visuel lors de la sélection
 * - Design responsive et accessible
 * 
 * Phase 2 - Extensions prévues :
 * - Ajout d'un troisième profil "Livreur" pour la logistique
 * - Prévisualisation des fonctionnalités de chaque profil
 * - Tutoriels intégrés pour guider le choix
 * - Personnalisation avancée de l'interface
 */
interface ProfileSelectorProps {
  onSelectProfile: (profileType: ProfileType) => void
  loading?: boolean
}

export default function ProfileSelector({ onSelectProfile, loading = false }: ProfileSelectorProps) {
  const [selectedProfile, setSelectedProfile] = useState<ProfileType | null>(null)

  /**
   * Gère la sélection d'un profil et notifie le composant parent
   * Phase 1: Simple sélection Artisan/Client
   * Phase 2: Sera enrichi avec analytics et recommandations
   */
  const handleSelect = (profileType: ProfileType) => {
    setSelectedProfile(profileType)
    onSelectProfile(profileType)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* === PHASE 1: SÉLECTION DE PROFIL === */}
      <h2 className="text-2xl font-bold text-center mb-6 text-text">
        Choisissez votre profil
      </h2>
      
      <div className="space-y-4">
        {/* Bouton de sélection pour profil CLIENT */}
        <button
          onClick={() => handleSelect('client')}
          disabled={loading}
          className={`w-full p-6 rounded-lg border-2 transition-all ${
            selectedProfile === 'client'
              ? 'border-primary bg-primary/10'
              : 'border-secondary hover:border-primary/50'
          } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <div className="text-center">
            <div className="text-4xl mb-3">🛍️</div>
            <h3 className="text-lg font-semibold text-text mb-2">Client</h3>
            <p className="text-sm text-text">
              Découvrez et achetez les créations uniques des artisans de votre quartier
            </p>
            {/* Phase 2: Ajouter stats du quartier, produits disponibles, etc. */}
          </div>
        </button>

        {/* Bouton de sélection pour profil ARTISAN */}
        <button
          onClick={() => handleSelect('artisan')}
          disabled={loading}
          className={`w-full p-6 rounded-lg border-2 transition-all ${
            selectedProfile === 'artisan'
              ? 'border-primary bg-primary/10'
              : 'border-secondary hover:border-primary/50'
          } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <div className="text-center">
            <div className="text-4xl mb-3">🎨</div>
            <h3 className="text-lg font-semibold text-text mb-2">Artisan</h3>
            <p className="text-sm text-text">
              Vendez vos créations directement aux habitants de votre quartier
            </p>
            {/* Phase 2: Ajouter exemples de ventes, revenus potentiels, etc. */}
          </div>
        </button>
      </div>

      {/* Feedback de sélection - Phase 1 */}
      {selectedProfile && (
        <div className="mt-6 p-4 bg-secondary rounded-lg border border-primary/20">
          <p className="text-sm text-text text-center">
            Profil sélectionné : <span className="font-semibold text-primary">{selectedProfile === 'artisan' ? 'Artisan' : 'Client'}</span>
          </p>
          {/* Phase 2: Ajouter preview des prochaines étapes */}
        </div>
      )}
    </div>
  )
}
