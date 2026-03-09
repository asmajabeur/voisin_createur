'use client'

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
  selectedProfile?: ProfileType | null
  onSelectProfile: (profileType: ProfileType) => void
  loading?: boolean
}

export default function ProfileSelector({ selectedProfile, onSelectProfile, loading = false }: ProfileSelectorProps) {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <h2 className="text-3xl font-heading text-center text-text mb-12">
        Choisissez votre profil
      </h2>

      <div className="flex flex-col md:flex-row items-stretch justify-center relative px-4">
        {/* Option Client */}
        <div className={`group flex-1 flex flex-col items-center text-center p-8 transition-all duration-300 rounded-2xl`}>
          <h2 className="font-bold text-[22px] md:text-[22px] text-[#3d2b1f] leading-tight mb-4 max-w-[500px]"
            style={{ fontFamily: "'Dancing Script', cursive" }}>
            Découvrez les trésors créatifs de votre quartier
          </h2>
          {/* Image Medium Centrée */}
          <div className="w-48 h-48 mb-6 relative">
            <img src="/profil_client.png"
              alt="Je suis Voisin"
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Ligne Décorative */}
          <div className="flex items-center w-full max-w-[300px] mb-6 opacity-70">
            <div className="h-[1px] flex-grow bg-gradient-to-l from-[#5d473a] to-transparent"></div>
            <div className="mx-3 h-[6px] w-[6px] rounded-full bg-[#5d473a]"></div>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-[#5d473a] to-transparent"></div>
          </div>

          <p className="text-[#3d2b1f] text-base md:text-lg max-w-[550px] leading-relaxed mb-8">
            Découvrez et achetez les créations uniques des artisans de votre quartier.
            Soutenez l'économie locale et trouvez des pièces authentiques.
          </p>

          <div className="bg-gradient-to-b from-[#3a7e85] to-[#2d6369] text-white px-8 py-3 rounded-xl shadow-md group-hover:brightness-110 transition-all font-medium text-lg border-b-2 border-[#1e4549]">
            S'inscrire comme Client
          </div>
        </div>

        {/* Ligne de séparation (Verticale sur Desktop, Horizontale sur Mobile) */}
        <div className="hidden md:block w-px bg-[#3a757d]/20 mx-4 self-stretch"></div>
        <div className="md:hidden h-px w-full bg-[#3a757d]/20 my-4"></div>

        {/* Option Artisan */}
        <div
          onClick={() => onSelectProfile('artisan')}
          className={`group flex-1 flex flex-col items-center text-center p-8 transition-all duration-300 rounded-2xl cursor-pointer ${selectedProfile === 'artisan'
            ? 'bg-[#3a757d]/5 ring-2 ring-[#3a757d]/20'
            : 'hover:bg-black/5'
            }`}
        >
          <h2 className="font-bold text-[22px] md:text-[22px] text-[#3d2b1f] leading-tight mb-4 max-w-[500px]"
            style={{ fontFamily: "'Dancing Script', cursive" }}>
            Révélez votre talent au cœur du quartier
          </h2>

          {/* Image Medium Centrée */}
          <div className="w-48 h-48 mb-6 relative">
            <img
              src="/profil_artisan.png"
              alt="Je suis Créateur"
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Ligne Décorative */}
          <div className="flex items-center w-full max-w-[300px] mb-6 opacity-70">
            <div className="h-[1px] flex-grow bg-gradient-to-l from-[#5d473a] to-transparent"></div>
            <div className="mx-3 h-[6px] w-[6px] rounded-full bg-[#5d473a]"></div>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-[#5d473a] to-transparent"></div>
          </div>

          {/* Content */}
          <p className="text-[#3d2b1f] text-base md:text-lg max-w-[550px] leading-relaxed mb-8">
              Vendez vos créations directement aux habitants de votre quartier.
              Une vitrine simple pour valoriser votre savoir-faire local.
          </p>

          {/* Bouton visuel */}
          <div className="bg-gradient-to-b from-[#3a7e85] to-[#2d6369] text-white px-8 py-3 rounded-xl shadow-md group-hover:brightness-110 transition-all font-medium text-lg border-b-2 border-[#1e4549]">
            S'inscrire comme Artisan
          </div>
        </div>
      </div>
    </div>
  )
}
