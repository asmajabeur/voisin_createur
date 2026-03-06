'use client'

export interface Product {
  id: string
  name: string
  price: number
  image_url: string | null
  category: string
  user_id?: string
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative bg-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-secondary/20">
      {/* Image Carrée (Style Instagram) */}
      <div className="aspect-square w-full bg-gray-100 relative overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
        <p className="text-primary font-semibold mt-1">{product.price.toFixed(2)} €</p>
      </div>
    </div>
  )
}