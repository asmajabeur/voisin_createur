import Link from 'next/link'
import { ArrowLeftIcon, HeartIcon, ShareIcon, ShieldCheckIcon, TruckIcon } from '@heroicons/react/24/outline'

// Mock Data pour le développement
const MOCK_PRODUCT = {
  id: '1',
  name: 'Pain de Campagne Traditionnel',
  price: 4.5,
  description: 'Notre pain de campagne au levain naturel, cuit au feu de bois ce matin. Croustillant à l\'extérieur, moelleux à l\'intérieur ! Parfait pour accompagner vos fromages affinés ou pour des tartines gourmandes au petit-déjeuner. Farine bio issue de moulins locaux.',
  imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&aspect=1:1&fit=crop',
  stock: 12,
  category: 'Alimentation',
  artisan: {
    name: 'Boulangerie Le Pain Doré',
    avatar: 'https://images.unsplash.com/photo-1577219491135-ce591d1ec999?w=150&h=150&fit=crop',
    location: 'Quartier St-Michel, à 400m',
    bio: 'Artisan boulanger depuis 15 ans, passionné par les fermentations longues et les farines anciennes.',
    memberSince: '2023'
  }
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  // En production, on ferait un fetch Supabase avec params.id
  const product = MOCK_PRODUCT

  return (
    <div className="min-h-screen bg-background pb-20">
      
      {/* Navbar Mobile (Retour) */}
      <div className="bg-surface sticky top-0 z-20 px-4 py-3 flex items-center justify-between border-b border-border/40 shadow-sm md:hidden">
        <Link href="/" className="p-2 -ml-2 text-text hover:bg-background rounded-full transition-colors">
          <ArrowLeftIcon className="h-6 w-6" />
        </Link>
        <span className="font-semibold text-lg text-text truncate flex-1 text-center px-4">{product.name}</span>
        <div className="w-10"></div> {/* Spacer pour centrer le texte */}
      </div>

      <div className="max-w-5xl mx-auto md:py-8 md:px-6">
        
        {/* Fil d'Ariane Desktop */}
        <div className="hidden md:flex items-center gap-2 text-sm text-text-muted mb-6">
          <Link href="/" className="hover:text-teal transition-colors">Accueil</Link>
          <span>/</span>
          <span className="text-text font-medium truncate">{product.name}</span>
        </div>

        <div className="bg-surface md:rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row border border-border/40">
          
          {/* Colonne Gauche : Image (Prend plus de place sur desktop) */}
          <div className="w-full md:w-3/5 lg:w-1/2 aspect-square md:aspect-auto md:min-h-[600px] bg-gray-100 relative">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {/* Actions Image (Mobile: Sur l'image, Desktop: En dessous ou cachées) */}
            <div className="absolute top-4 right-4 flex gap-2 md:hidden">
              <button className="bg-surface/90 backdrop-blur-sm p-2 rounded-full text-text shadow-sm">
                <HeartIcon className="h-6 w-6" />
              </button>
              <button className="bg-surface/90 backdrop-blur-sm p-2 rounded-full text-text shadow-sm">
                <ShareIcon className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Colonne Droite : Infos Produit */}
          <div className="w-full md:w-2/5 lg:w-1/2 p-6 md:p-8 flex flex-col">
            
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-text leading-tight">
                  {product.name}
                </h1>
                <div className="hidden md:flex gap-2 ml-4">
                  <button className="p-2 text-text-muted hover:text-red-500 rounded-full hover:bg-background transition-colors">
                    <HeartIcon className="h-6 w-6" />
                  </button>
                  <button className="p-2 text-text-muted hover:text-teal rounded-full hover:bg-background transition-colors">
                    <ShareIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="text-3xl font-bold text-teal mb-6">
                {product.price.toFixed(2)} €
              </div>

              {/* Badges de confiance */}
              <div className="flex flex-col gap-3 py-4 border-y border-border/40 mb-6">
                <div className="flex items-center gap-3 text-sm text-text-muted">
                  <div className="bg-teal-light/20 p-1.5 rounded-full text-teal">
                    <ShieldCheckIcon className="h-5 w-5" />
                  </div>
                  Paiement sécurisé via VoisinCréateur
                </div>
                <div className="flex items-center gap-3 text-sm text-text-muted">
                  <div className="bg-teal-light/20 p-1.5 rounded-full text-teal">
                    <TruckIcon className="h-5 w-5" />
                  </div>
                  Remise en main propre ou livraison locale
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold text-lg text-text mb-2">Description</h3>
                <p className="text-text-muted leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              {/* Bloc Artisan */}
              <div className="bg-background p-4 rounded-xl border border-border/60 mb-8 cursor-pointer hover:bg-surface transition-colors">
                <h3 className="font-semibold text-sm text-text-muted uppercase tracking-wider mb-3">Créé par</h3>
                <div className="flex items-center gap-4">
                  <img src={product.artisan.avatar} alt={product.artisan.name} className="w-14 h-14 rounded-full object-cover border-2 border-surface shadow-sm" />
                  <div>
                    <p className="font-bold text-text hover:underline">{product.artisan.name}</p>
                    <p className="text-sm text-teal">{product.artisan.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Zone d'achat (Sticky sur mobile en bas d'écran) */}
            <div className="fixed bottom-0 left-0 right-0 bg-surface p-4 border-t border-border/40 md:static md:bg-transparent md:p-0 md:border-t-0 z-20 md:mt-auto">
              {product.stock > 0 ? (
                <button className="w-full bg-teal hover:bg-teal-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-teal/20 transition-all text-lg flex justify-center items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  Ajouter au panier ({product.price.toFixed(2)}€)
                </button>
              ) : (
                <button disabled className="w-full bg-surface text-text-muted font-bold py-4 rounded-xl cursor-not-allowed text-lg border border-border/40">
                  Rupture de stock
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
