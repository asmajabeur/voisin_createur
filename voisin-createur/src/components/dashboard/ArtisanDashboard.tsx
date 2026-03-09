import { UserProfile } from '../../../lib/types'

interface ArtisanDashboardProps {
  user: UserProfile
}

export default function ArtisanDashboard({ user }: ArtisanDashboardProps) {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center">
        <div className="text-6xl mb-6">🎨</div>
        <h2 className="text-3xl font-bold text-text mb-4">
          Bienvenue, {user.name || user.email} !
        </h2>
        <p className="text-lg text-text mb-8">
          Gérez votre boutique et vendez vos créations aux habitants de votre quartier
        </p>

        <div className="bg-white rounded-2xl shadow-md p-8 max-w-5xl mx-auto border border-secondary">
          <h3 className="text-xl font-semibold mb-4 text-text">
            Votre tableau de bord artisan
          </h3>
          
          <div className="space-y-4 text-left">
            <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
              <h4 className="font-medium text-primary mb-2">🎨 Gestion de vos produits</h4>
              <p className="text-sm text-text">Ajoutez, modifiez et supprimez vos créations</p>
            </div>
            <div className="p-4 bg-accent/10 rounded-xl border border-accent/20">
              <h4 className="font-medium text-accent mb-2">📋 Suivi des commandes</h4>
              <p className="text-sm text-text">Gérez les demandes de vos clients</p>
            </div>
            <div className="p-4 bg-secondary/50 rounded-xl">
              <h4 className="font-medium text-dark mb-2">📊 Vos statistiques</h4>
              <p className="text-sm text-text">Suivez vos ventes et votre popularité</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}