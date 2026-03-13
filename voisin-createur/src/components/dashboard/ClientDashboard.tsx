'use client'

import { useState } from 'react'
import { UserProfile } from '../../../lib/types'
import HeroSection from '../home/HeroSection'
import FeaturesSection from '../home/FeaturesSection'
import CreatorsSection from '../home/CreatorsSection'
import ProductGrid from '../products/ProductGrid'
import FeedFilters from '../feed/FeedFilters'
import ProductFeed from '../feed/ProductFeed'
import { useFeed, SortOption } from '../../hooks/useFeed'

interface ClientDashboardProps {
  user: UserProfile
}

export default function ClientDashboard({ user }: ClientDashboardProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'feed'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [maxPrice, setMaxPrice] = useState<number | ''>('')
  const [location, setLocation] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('recent')
  
  // Utilisation du hook avec tous les filtres
  const { feedItems, loading, error } = useFeed(searchQuery, maxPrice, location, sortBy)

  return (
    <div className="w-full bg-background min-h-screen text-text font-sans pb-12 overflow-x-hidden relative">
      {/* BACKGROUND TEXTURE OVERLAY */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] z-0"></div>
      
      <div className="relative z-10">
      {/* L'ancien Hero/Features pourrait être masqué ou repensé plus tard. Pour l'instant, on les garde mais on les met dans un conteneur */}
      <HeroSection 
        title="Découvrez les talents près de chez vous"
        subtitle={`Ravi de vous revoir, ${user.name || 'Voisin'} !`}
      />
      
      {/* Barre de filtres sticky */}
      <FeedFilters 
        viewMode={viewMode}
        onChangeViewMode={setViewMode}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        maxPrice={maxPrice}
        onMaxPriceChange={setMaxPrice}
        location={location}
        onLocationChange={setLocation}
        sortBy={sortBy}
        onChangeSortBy={setSortBy}
      />

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
              <h3 className="font-bold mb-1">Erreur de chargement des données</h3>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {viewMode === 'grid' ? (
            <div>
              <h2 className="font-heading text-3xl text-text mb-8 text-center" style={{ fontFamily: "'Dancing Script', cursive" }}>Boutique du Quartier</h2>
              <ProductGrid posts={feedItems} loading={loading} />
            </div>
          ) : (
            <div className="max-w-[470px] mx-auto">
              <ProductFeed 
                posts={feedItems}
                loading={loading}
              />
            </div>
          )}
        </div>
      </section>
      </div>
    </div>
  )
}