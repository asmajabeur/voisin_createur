'use client'

import { useState, useEffect } from 'react'
import { ChartBarIcon, CreditCardIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/solid'
import { useProducts } from '../../hooks/useProducts'
import CatalogSection from './artisan/CatalogSection'
import OrdersList from './artisan/OrdersList'
import ChatInterface from './artisan/ChatInterface'
import { UserProfile } from '../../../lib/types'

interface ArtisanDashboardProps {
  user: UserProfile
}

export default function ArtisanDashboard({ user }: ArtisanDashboardProps) {
  const { products, loadingProducts, toggleProductActive } = useProducts(user?.id)

  return (
    // TODO REFACTOR: Extraire les classes de conteneur de page globales dans globals.css (ex: `.page-layout-artisan`)
    <div className="w-full bg-[#FFF8DC] min-h-screen text-[#362F2E] font-sans pb-12 overflow-x-hidden">

      {/* BACKGROUND TEXTURE OVERLAY (Optionnel pour ajouter du grain) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] z-0"></div>

      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">

        {/* --- HEADER PROFIL --- */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-[#DEB887] pb-8 relative">
          {/* Diviseur décoratif (ligne pointillée/cousue) */}
          <div className="absolute bottom-0 left-0 w-full h-px border-b-2 border-dashed border-[#DEB887]/50 translate-y-[2px]"></div>

          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar Image Circulaire avec bordure grise douce */}
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#F5F1E7] shadow-md flex-shrink-0">
              <img
                src={user.avatar_url || "https://images.unsplash.com/photo-1580983574971-ce488d5e08f5?q=80&w=300&auto=format&fit=crop"}
                alt="Profil de l'artisan"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Infos Profil */}
            <div className="text-center md:text-left">
              <h2 className="text-3xl  font-sans font-bold text-[#1A1A1A] mb-1">
                {user.name || 'inconnu'} - <span className="font-sans italic">{user.short_description || 'inconnu'}</span>
              </h2>
              <p className="text-[#333333] text-lg leading-relaxed max-w-lg mt-2 font-medium">
                - Bienvenue dans votre atelier en ligne.<br />
                Gérer votre catalogue et vos commandes.
              </p>
              {/* Nouveaux boutons d'action rapides */}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-4">
                <button className="bg-white border border-[#DEB887] text-[#705040] hover:bg-[#F8EFE6] px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors">
                  ✏️ Modifier mon profil
                </button>
                <button onClick={() => alert('Ouverture du formulaire d\'ajout...')} className="bg-[#386D71] hover:bg-[#2A5255] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors">
                  ➕ Ajouter un article
                </button>
              </div>
            </div>
          </div>

          {/* Bloc Statistiques - Style encadré blanc cassé avec ombre douce */}
          <div className=" border border-[#DEB887]/60 rounded-2xl p-5 min-w-[300px] shadow-md transform rotate-1">
            <div className="space-y-4">
              {/* Total Ventes (Mois) */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 text-[#705040]">
                  <ChartBarIcon className="w-5 h-5" />
                  <span className="text-[15px] font-semibold text-[#333333] uppercase spacing tracking-wide">Total Ventes (Mois):</span>
                </div>
                <span className="font-bold text-[#1A1A1A] text-xl">480€</span>
              </div>
              {/* Commandes en Cours */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 text-[#705040]">
                  <CreditCardIcon className="w-5 h-5" />
                  <span className="text-[15px] font-semibold text-[#333333] uppercase spacing tracking-wide">Commandes en Cours:</span>
                </div>
                <span className="font-bold text-[#1A1A1A] text-xl">3</span>
              </div>

              {/* Nouveaux Chats */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 text-[#705040]">
                  <ChatBubbleLeftIcon className="w-5 h-5" />
                  <span className="text-[15px] font-semibold text-[#333333] uppercase spacing tracking-wide">Nouveaux Chats:</span>
                </div>
                <span className="font-bold text-[#1A1A1A] text-xl">1</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- SECTION CATALOGUE ARTICLES --- */}
        <CatalogSection
          products={products}
          loadingProducts={loadingProducts}
          onToggleProductActive={toggleProductActive}
        />

        {/* --- SECTION COMMANDES ET CHAT --- */}
        <div>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px bg-[#DEB887] flex-1 max-w-xs"></div>
            <h2 className="text-4xl text-[#362F2E] font-bold font-heading px-4">Mes Commandes et Chat</h2>
            <div className="h-px bg-[#DEB887] flex-1 max-w-xs"></div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <OrdersList />
            <ChatInterface user={user} />
          </div>
        </div>

      </div>

      {/* FOOTER - Bande horizontale intégrée dans la page Artisan si nécessaire pour le visuel complet */}
      <div className="mt-16 bg-gradient-to-t from-[#5a3a2a] to-[#8B4513] text-white py-12 text-center relative border-t-4 border-[#DEB887]/20">
        <h2 className="font-heading text-3xl mb-6">Rejoignez la communauté des créateurs locaux</h2>
        <button className="bg-[#FFF8DC] text-[#362F2E] font-bold px-8 py-3 rounded-lg shadow-md hover:bg-white transition-colors">
          S'inscrire à la Newsletter &gt;
        </button>
      </div>
    </div>
  )
}