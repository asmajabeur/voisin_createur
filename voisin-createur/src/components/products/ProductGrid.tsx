'use client'

import { useState } from 'react'
import ProductCard, { Product } from './ProductCard'

// Données fictives pour tester l'interface "Insta-style"
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Tarte aux pommes maison',
    price: 15.00,
    category: 'Pâtisserie',
    image_url: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: '2',
    name: 'Écharpe en laine tricotée',
    price: 35.00,
    category: 'Mode',
    image_url: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: '3',
    name: 'Confiture de fraises bio',
    price: 6.50,
    category: 'Épicerie',
    image_url: 'https://images.unsplash.com/photo-1507260385058-27e9848b6840?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: '4',
    name: 'Bougies parfumées soja',
    price: 18.00,
    category: 'Déco',
    image_url: 'https://images.unsplash.com/photo-1602826416379-24d420797137?auto=format&fit=crop&w=500&q=80'
  },
]

export default function ProductGrid() {
  const [products] = useState<Product[]>(MOCK_PRODUCTS)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-text">À la une dans votre quartier</h2>
        {/* Futurs filtres ici */}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}