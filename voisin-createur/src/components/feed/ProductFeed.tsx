import ProductPost from './ProductPost'
import { FeedProduct } from '@/hooks/useFeed'

interface ProductFeedProps {
  posts: FeedProduct[]
  loading: boolean
}

export default function ProductFeed({ posts, loading }: ProductFeedProps) {

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#386D71]"></div>
        <p className="text-gray-500 font-medium">Chargement des créations de vos voisins...</p>
      </div>
    )
  }

  if (!loading && posts.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl border border-gray-100 shadow-sm">
        <p className="text-gray-500 mb-2">Aucune création trouvée pour cette recherche.</p>
        <p className="text-sm text-gray-400">Essayez d'autres mots-clés ou modifiez vos filtres.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {posts.map((post) => (
        <ProductPost 
          key={post.id}
          id={post.id}
          artisanName={post.artisan?.name || 'Artisan Inconnu'}
          artisanAvatar={post.artisan?.avatar_url || 'https://images.unsplash.com/photo-1577219491135-ce591d1ec999?w=150&h=150&fit=crop'}
          timeAgo="Récemment" // Gestion du temps relatif à faire plus tard
          imageUrl={post.image_url || 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&aspect=1:1&fit=crop'}
          productName={post.name}
          price={post.price}
          description={post.description || ''}
          shortDescription={post.short_description}
          ingredients={post.ingredients}
          likesCount={0} // Fake likes pour l'instant
        />
      ))}
    </div>
  )
}
