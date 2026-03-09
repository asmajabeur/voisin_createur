import { UserProfile } from '../../../lib/types'
import HeroSection from '../home/HeroSection'
import FeaturesSection from '../home/FeaturesSection'
import CreatorsSection from '../home/CreatorsSection'
import ProductGrid from '../products/ProductGrid'

interface ClientDashboardProps {
  user: UserProfile
}

export default function ClientDashboard({ user }: ClientDashboardProps) {
  return (
    <>
      <HeroSection 
        title="Découvrez les talents près de chez vous"
        subtitle={`Ravi de vous revoir, ${user.name || 'Voisin'} !`}
      />
      <FeaturesSection />
      <CreatorsSection />
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-4xl text-text mb-8 text-center">Boutique du Quartier</h2>
          <ProductGrid />
        </div>
      </section>
    </>
  )
}