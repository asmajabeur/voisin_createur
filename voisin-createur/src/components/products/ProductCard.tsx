'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link 
      href={`/product/${product.id}`} 
      className="block group relative bg-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-border/40 cursor-pointer"
    >
      {/* Image Carrée (Style Instagram) */}
      <div className="aspect-square w-full bg-gray-100 relative overflow-hidden">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-4xl">📷</span>
          </div>
        )}
        {/* Badge Catégorie */}
        <span className="absolute top-3 right-3 bg-surface/90 backdrop-blur-sm px-2 py-1 text-xs font-medium rounded-full text-text shadow-sm">
          {product.category}
        </span>
      </div>

      {/* Infos Produit */}
      <div className="p-3">
        <h3 className="font-medium text-text truncate">{product.name}</h3>
        <p className="text-teal font-bold mt-1">{product.price.toFixed(2)} €</p>
      </div>
    </Link>
  )
}