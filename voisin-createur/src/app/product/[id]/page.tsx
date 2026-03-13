'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowLeftIcon, ClockIcon } from '@heroicons/react/24/outline'
import { useProductDetail } from '@/hooks/useProductDetail'
import { useOrders } from '@/hooks/useOrders'
import { useAuth } from '@/hooks/useAuth'

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { user } = useAuth()
  const { id } = React.use(params)
  const { product, loading, error } = useProductDetail(id)
  const { createOrder } = useOrders(user?.id, 'client')
  const [quantity, setQuantity] = React.useState(1)
  const [isOrdering, setIsOrdering] = React.useState(false)

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal"></div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-bold text-text mb-4">Oups ! Produit introuvable.</h1>
        <Link href="/" className="text-teal font-bold hover:underline">Retour à l&apos;accueil</Link>
      </div>
    )
  }

  const handleOrder = async () => {
    if (!user) {
      alert("Veuillez vous connecter pour commander.")
      return
    }

    try {
      setIsOrdering(true)
      const totalPrice = product.price * quantity
      const result = await createOrder(
        product.id, 
        product.user_id, 
        quantity, 
        totalPrice, 
        product.default_prep_time || 2
      )

      if (result.success) {
        alert("Commande envoyée avec succès ! Votre voisin a été notifié.")
        router.push('/')
      } else {
        alert("Erreur: " + result.error)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsOrdering(false)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      
      {/* Navbar Mobile (Retour) */}
      <div className="bg-surface sticky top-0 z-20 px-4 py-3 flex items-center justify-between border-b border-border/40 shadow-sm md:hidden">
        <Link href="/" className="p-2 -ml-2 text-text hover:bg-background rounded-full transition-colors">
          <ArrowLeftIcon className="h-6 w-6" />
        </Link>
        <span className="font-semibold text-lg text-text truncate flex-1 text-center px-4">{product.name}</span>
        <div className="w-10"></div>
      </div>

      <div className="max-w-5xl mx-auto md:py-8 md:px-6">
        
        <div className="hidden md:flex items-center gap-2 text-sm text-text-muted mb-6">
          <Link href="/" className="hover:text-teal transition-colors">Accueil</Link>
          <span>/</span>
          <span className="text-text font-medium truncate">{product.name}</span>
        </div>

        <div className="bg-surface md:rounded-3xl shadow-sm overflow-hidden flex flex-col md:flex-row border border-border/40">
          
          {/* Image */}
          <div className="w-full md:w-3/5 lg:w-1/2 aspect-square md:aspect-auto md:min-h-[500px] bg-background relative overflow-hidden">
            <Image 
              src={product.image_url || 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&aspect=1:1&fit=crop'} 
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          </div>

          {/* Infos */}
          <div className="w-full md:w-2/5 lg:w-1/2 p-6 md:p-10 flex flex-col">
            
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-3xl font-heading font-bold text-text mb-1">
                  {product.name}
                </h1>
              </div>

              <div className="text-3xl font-bold text-teal-dark mb-6">
                {product.price.toFixed(2)} €
              </div>

              {/* Infos Préparation */}
              <div className="flex items-center gap-3 py-4 border-y border-border/40 mb-6 font-medium">
                <div className="bg-secondary/20 p-2 rounded-xl text-teal">
                  <ClockIcon className="h-5 w-5" />
                </div>
                <div className="text-sm">
                  <p className="text-text">Prêt sous {product.default_prep_time || 2} jours</p>
                  <p className="text-text-muted text-xs font-normal">Temps estimé de fabrication artisanale</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-bold text-lg text-text mb-2">Description</h3>
                <p className="text-text-muted leading-relaxed">
                  {product.description || product.short_description}
                </p>
              </div>

              {product.ingredients && (
                <div className="mb-8">
                  <h3 className="font-bold text-sm text-text-muted uppercase mb-2">Ingrédients & Allergies</h3>
                  <div className="p-3 bg-surface border border-dashed border-border rounded-xl text-sm italic text-text-muted">
                    {product.ingredients}
                  </div>
                </div>
              )}

              {/* Artisan */}
              <div className="bg-background p-4 rounded-2xl border border-border/60 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-surface shadow-sm relative">
                    <Image 
                      src={product.artisan?.avatar_url || "https://images.unsplash.com/photo-1580983574971-ce488d5e08f5?w=150"} 
                      alt={product.artisan?.name || 'Artisan'} 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-text">{product.artisan?.name || 'Voisin Créateur'}</p>
                    <p className="text-xs text-teal">{product.artisan?.city || 'Local'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Achat */}
            <div className="fixed bottom-0 left-0 right-0 bg-surface p-4 border-t border-border/40 md:static md:bg-transparent md:p-0 md:border-t-0 z-20 md:mt-auto">
              <div className="flex items-center gap-4 mb-4 md:mb-6">
                <div className="flex items-center border border-border rounded-xl">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 font-bold text-xl">-</button>
                  <span className="px-4 font-bold">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 font-bold text-xl">+</button>
                </div>
                <div className="text-right flex-1">
                  <span className="block text-xs text-text-muted uppercase font-bold tracking-widest">Total</span>
                  <span className="text-2xl font-bold text-text">{(product.price * quantity).toFixed(2)}€</span>
                </div>
              </div>

              <button 
                onClick={handleOrder}
                disabled={isOrdering}
                className="w-full bg-teal hover:bg-teal-dark text-white font-bold py-4 rounded-2xl shadow-xl transition-all text-lg flex justify-center items-center gap-2 active:scale-95 disabled:opacity-50"
              >
                {isOrdering ? 'Traitement...' : 'Commander maintenant'}
              </button>
              <p className="text-[10px] text-center text-text-muted mt-3 uppercase tracking-tighter">
                Réservation ferme • Paiement à la remise en main propre
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

