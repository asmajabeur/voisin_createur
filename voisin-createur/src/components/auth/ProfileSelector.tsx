'use client'

import { ProfileType } from '@/lib/types'
import ProfileCard from './ProfileCard'

interface ProfileSelectorProps {
  selectedProfile?: ProfileType | null
  onSelectProfile: (profileType: ProfileType) => void
  loading?: boolean
}

export default function ProfileSelector({ selectedProfile, onSelectProfile }: ProfileSelectorProps) {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row items-stretch justify-center relative px-4 gap-4 md:gap-0">
        
        {/* Option Client */}
        <ProfileCard
          type="client"
          title="Découvrez les trésors créatifs de votre quartier"
          imageSrc="/profil_client.png"
          imageAlt="Je suis Voisin"
          description="Découvrez et achetez les créations uniques des artisans de votre quartier. Soutenez l'économie locale et trouvez des pièces authentiques."
          buttonText="S'inscrire comme Client"
          isSelected={selectedProfile === 'client'}
          onSelect={() => onSelectProfile('client')}
        />

        {/* Ligne de séparation */}
        <div className="hidden md:block w-px bg-[#3a757d]/20 mx-4 self-stretch"></div>
        <div className="md:hidden h-px w-full bg-[#3a757d]/20 my-4"></div>

        {/* Option Artisan */}
        <ProfileCard
          type="artisan"
          title="Révélez votre talent au cœur du quartier"
          imageSrc="/profil_artisan.png"
          imageAlt="Je suis Créateur"
          description="Vendez vos créations directement aux habitants de votre quartier. Une vitrine simple pour valoriser votre savoir-faire local."
          buttonText="S'inscrire comme Artisan"
          isSelected={selectedProfile === 'artisan'}
          onSelect={() => onSelectProfile('artisan')}
        />

      </div>
    </div>
  )
}
