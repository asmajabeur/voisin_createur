'use client'

import Image from 'next/image'
import Link from 'next/link'
import { UserProfile } from '@/lib/types'
import { FeedProduct } from '@/hooks/useFeed'
import ProductGrid from '../products/ProductGrid'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'

interface ArtisanShowcaseProps {
  artisan: UserProfile
  products: FeedProduct[]
  loading: boolean
}

export default function ArtisanShowcase({ artisan, products, loading }: ArtisanShowcaseProps) {
  // Styles pour les réseaux sociaux (Exemple avec SVG placeholders ou texte simple)
  // Dans un cas réel, on importerait des icônes spécifiques pour chaque réseau (ex: react-icons)

  return (
    <div className="min-h-screen bg-background font-sans pb-20 relative">
      {/* Texture de fond optionnelle pour un effet "craft" */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] z-0"></div>

      <main className="relative z-10">
        
        {/* --- SECTION BANNIÈRE & RETOUR --- */}
        <div className="relative w-full h-64 md:h-80 lg:h-96 bg-surface overflow-hidden">
          {artisan.banner_url ? (
            <Image 
              src={artisan.banner_url} 
              alt={`Couverture de ${artisan.name}`}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <span className="text-4xl opacity-20">🎨</span>
            </div>
          )}
          
          {/* Overlay dégradé pour que le texte/avatar ressorte mieux en bas */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent"></div>

          {/* Bouton Retour Accueil */}
          <Link href="/" className="absolute top-4 left-4 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-colors cursor-pointer group">
            <ArrowLeftIcon className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* --- SECTION INFOS ARTISAN (Bascule hors de la bannière) --- */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl -mt-20 md:-mt-24 relative z-20 mb-16">
          <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-border/50 text-center flex flex-col items-center">
            
            {/* Avatar Débordant */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white overflow-hidden shadow-lg -mt-24 md:-mt-32 mb-4 bg-surface relative">
              <Image 
                src={artisan.avatar_url || "https://images.unsplash.com/photo-1580983574971-ce488d5e08f5?q=80&w=300&auto=format&fit=crop"}
                alt={`Avatar de ${artisan.name}`}
                fill
                className="object-cover"
              />
            </div>

            {/* Titre et Slogan */}
            <h1 className="text-3xl md:text-5xl font-heading font-black text-text mb-2">
              {artisan.name || "Créateur Voisin"}
            </h1>
            <p className="text-lg md:text-xl text-primary font-medium italic mb-6">
              {artisan.short_description || "Artisan(e) passionné(e)"}
            </p>

            {/* Infos Contact & Logistique (Style LinkedIn/CV) */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-text-muted text-sm font-medium mb-8">
              {(artisan.city || artisan.postal_code || artisan.address) && (
                <div className="flex items-center gap-1.5 bg-surface px-4 py-2 rounded-full border border-border/50 shadow-sm">
                  <span>📍</span>
                  <span>{artisan.address ? `${artisan.address}, ` : ''}{artisan.city} {artisan.postal_code}</span>
                </div>
              )}
              {artisan.phone && (
                <a href={`tel:${artisan.phone}`} className="flex items-center gap-1.5 bg-surface px-4 py-2 rounded-full border border-border/50 shadow-sm hover:text-primary transition-colors">
                  <span>📞</span>
                  <span>{artisan.phone}</span>
                </a>
              )}
              {artisan.is_motorized && (
                <div className="flex items-center gap-1.5 bg-surface px-4 py-2 rounded-full border border-border/50 shadow-sm" title="L'artisan est motorisé">
                  <span>🚗</span>
                  <span>Motorisé(e)</span>
                </div>
              )}
              {artisan.can_deliver && (
                <div className="flex items-center gap-1.5 bg-surface px-4 py-2 rounded-full border border-border/50 shadow-sm" title="Possibilité de livraison">
                  <span>📦</span>
                  <span>Livraison possible</span>
                </div>
              )}
            </div>

            {/* Bio Longue */}
            {artisan.long_description && (
              <div className="max-w-3xl w-full text-center">
                <div className="h-px w-24 bg-border mx-auto mb-6"></div>
                <p className="text-text-muted leading-relaxed whitespace-pre-wrap">
                  {artisan.long_description}
                </p>
                <div className="h-px w-24 bg-border mx-auto mt-6 mb-8"></div>
              </div>
            )}

            {/* Réseaux Sociaux */}
            {artisan.social_links && Object.values(artisan.social_links).some(link => link) && (
              <div className="flex gap-4 justify-center mt-4">
                {artisan.social_links.instagram && (
                  <a href={artisan.social_links.instagram} target="_blank" rel="noopener noreferrer" className="p-3 bg-surface hover:bg-black hover:text-white rounded-full transition-colors text-text shadow-sm">
                   📸 Instagram
                  </a>
                )}
                {artisan.social_links.facebook && (
                  <a href={artisan.social_links.facebook} target="_blank" rel="noopener noreferrer" className="p-3 bg-surface hover:bg-[#1877F2] hover:text-white rounded-full transition-colors text-text shadow-sm">
                   📘 Facebook
                  </a>
                )}
                {artisan.social_links.website && (
                  <a href={artisan.social_links.website} target="_blank" rel="noopener noreferrer" className="p-3 bg-surface hover:bg-primary hover:text-white rounded-full transition-colors text-text shadow-sm">
                   🌐 Site Web
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* --- SECTION CATALOGUE --- */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px bg-border flex-1 max-w-[100px] md:max-w-xs"></div>
            <h2 className="text-3xl md:text-4xl text-text font-bold font-heading px-4 text-center">
              Ses Créations
            </h2>
            <div className="h-px bg-border flex-1 max-w-[100px] md:max-w-xs"></div>
          </div>

          <div className="bg-surface/50 rounded-3xl p-6 md:p-8 backdrop-blur-sm border border-border">
            {products.length === 0 && !loading ? (
              <div className="text-center py-12">
                <p className="text-text-muted text-lg">Cet artisan n&apos;a pas encore de créations en ligne.</p>
              </div>
            ) : (
              <ProductGrid posts={products} loading={loading} />
            )}
          </div>
        </div>

      </main>
    </div>
  )
}
