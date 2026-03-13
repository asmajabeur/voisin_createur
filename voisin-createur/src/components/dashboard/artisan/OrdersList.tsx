'use client'

import React from 'react'
import { useOrders } from '@/hooks/useOrders'
import { useAuth } from '@/hooks/useAuth'
import { Order } from '@/lib/types'
import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

export default function OrdersList() {
  const { user } = useAuth()
  const { orders, loadingOrders, updateOrderStatus } = useOrders(user?.id, 'artisan')
  const [expandedId, setExpandedId] = React.useState<string | null>(null)

  if (loadingOrders) {
    return <div className="p-4 text-center text-text-muted italic">Chargement des commandes...</div>
  }

  if (orders.length === 0) {
    return <div className="p-8 text-center bg-surface border border-dashed border-border rounded-xl text-text-muted">Aucune commande pour le moment.</div>
  }

  const getStatusStyle = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'ready': return 'bg-teal-light/30 text-teal-dark'
      case 'completed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'En attente'
      case 'confirmed': return 'Confirmé'
      case 'ready': return 'Prêt !'
      case 'completed': return 'Finalisé'
      default: return status
    }
  }

  return (
    <div className="flex-1 space-y-4">
      {orders.map((order: Order) => (
        <div key={order.id} className="bg-surface border border-border/60 rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md">
          {/* Header */}
          <div 
            className="p-4 flex items-center justify-between cursor-pointer"
            onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center font-bold text-teal border border-border/40">
                #{order.id.slice(0, 4).toUpperCase()}
              </div>
              <div>
                <span className="font-bold text-text block">{order.buyer?.name || 'Voisin'}</span>
                <span className="text-[10px] text-text-muted uppercase tracking-wider">{new Date(order.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className={`font-bold text-[10px] uppercase px-2 py-1 rounded-md ${getStatusStyle(order.status)}`}>
                {getStatusLabel(order.status)}
              </span>
              <span className={`text-border transition-transform ${expandedId === order.id ? 'rotate-180' : ''}`}>▼</span>
            </div>
          </div>

          {/* Details */}
          {expandedId === order.id && (
            <div className="p-5 bg-background/30 border-t border-border/30">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold text-text-muted uppercase mb-3 flex items-center gap-1.5">
                    <CheckCircleIcon className="h-4 w-4" /> Détails Produit
                  </h4>
                  <div className="flex gap-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image 
                        src={order.product?.image_url || 'https://images.unsplash.com/photo-1610708083812-3211116b08ed?q=80&w=600&auto=format&fit=crop'} 
                        alt={order.product?.name || 'Produit'}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-text">{order.product?.name}</p>
                      <p className="text-sm text-text-muted">Quantité: {order.quantity}</p>
                      <p className="text-sm font-bold text-teal">{order.total_price}€</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-text-muted uppercase mb-3 flex items-center gap-1.5">
                    <ClockIcon className="h-4 w-4" /> Suivi & Délais
                  </h4>
                  <p className="text-sm text-text mb-2 italic">
                    {order.status === 'pending' ? "La commande attend votre confirmation." : "Échéance prévue : " + (order.estimated_ready_at ? new Date(order.estimated_ready_at).toLocaleDateString() : 'A définir')}
                  </p>
                  
                  <div className="flex gap-2 mt-4">
                    {order.status === 'pending' && (
                      <button 
                        onClick={() => updateOrderStatus(order.id, 'confirmed')}
                        className="flex-1 bg-teal text-white py-2 rounded-lg text-sm font-bold hover:bg-teal-dark shadow-sm"
                      >
                        Confirmer la commande
                      </button>
                    )}
                    {order.status === 'confirmed' && (
                      <button 
                        onClick={() => updateOrderStatus(order.id, 'ready')}
                        className="flex-1 bg-secondary text-teal-dark py-2 rounded-lg text-sm font-bold hover:bg-secondary/80 shadow-sm"
                      >
                        Marquer comme PRÊT
                      </button>
                    )}
                    {order.status === 'ready' && (
                      <button 
                        onClick={() => updateOrderStatus(order.id, 'completed')}
                        className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg text-sm font-bold hover:bg-gray-200"
                      >
                        Terminer (Remis au client)
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

