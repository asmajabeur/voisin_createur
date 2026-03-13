import ProductCard from './ProductCard'
import { FeedProduct } from '@/hooks/useFeed'

interface ProductGridProps {
  posts: FeedProduct[]
  loading: boolean
}

export default function ProductGrid({ posts, loading }: ProductGridProps) {
  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#386D71]"></div>
        <p className="text-gray-500 font-medium">Chargement de la boutique...</p>
      </div>
    )
  }

  if (!loading && posts.length === 0) {
    return (
      <div className="text-center py-20  rounded-xl border border-gray-100 shadow-sm">
        <p className="text-gray-500 mb-2">Aucune création trouvée dans ce rayon.</p>
        <p className="text-sm text-gray-400">Essayez d&apos;autres mots-clés ou modifiez vos filtres de prix.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 shadow-sm p-4 rounded-xl md:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
