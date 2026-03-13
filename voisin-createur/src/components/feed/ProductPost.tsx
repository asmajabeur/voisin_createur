import Link from 'next/link'
import Image from 'next/image'
import { HeartIcon, ChatBubbleOvalLeftIcon, PaperAirplaneIcon, BookmarkIcon } from '@heroicons/react/24/outline'

interface ProductPostProps {
  id: string
  artisanName: string
  artisanAvatar: string
  timeAgo: string
  imageUrl: string
  productName: string
  price: number
  description: string
  shortDescription?: string | null
  ingredients?: string | null
  likesCount: number
}

export default function ProductPost({
  id,
  artisanName,
  artisanAvatar,
  timeAgo,
  imageUrl,
  productName,
  price,
  description,
  shortDescription,
  ingredients,
  likesCount
}: ProductPostProps) {
  return (
    <div className="bg-surface border border-border/60 rounded-xl overflow-hidden mb-8 shadow-sm">
      
      {/* Header : Artisan Info */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100 group-hover:ring-2 group-hover:ring-[#386D71] transition-all relative">
            <Image 
              src={artisanAvatar} 
              alt={artisanName} 
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-text group-hover:underline">{artisanName}</h3>
            <span className="text-xs text-text-muted">{timeAgo}</span>
          </div>
        </div>
        <button className="text-text-muted hover:text-text">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
          </svg>
        </button>
      </div>

      {/* Image Produit */}
      <Link href={`/product/${id}`} className="block">
        <div className="aspect-square w-full bg-gray-100 relative cursor-pointer group">
          <Image 
            src={imageUrl} 
            alt={productName} 
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Overlay pour clic */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="bg-white/90 text-teal px-4 py-2 rounded-full text-sm font-semibold shadow-sm transform translate-y-4 group-hover:translate-y-0 transition-all">
              Voir les détails
            </span>
          </div>
        </div>
      </Link>

      {/* Barre d'Actions Sociales */}
      <div className="p-4 pb-2">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <button className="text-text hover:text-red-500 transition-colors">
              <HeartIcon className="h-7 w-7" />
            </button>
            <button className="text-text hover:text-text-muted transition-colors">
              <ChatBubbleOvalLeftIcon className="h-7 w-7" />
            </button>
            <button className="text-text hover:text-teal transition-colors">
              <PaperAirplaneIcon className="h-7 w-7 -rotate-45" />
            </button>
          </div>
          <button className="text-text hover:text-text-muted transition-colors">
            <BookmarkIcon className="h-7 w-7" />
          </button>
        </div>
        
        {/* Compteur Likes */}
        <p className="font-semibold text-sm mb-2 text-text">{likesCount.toLocaleString()} J'aime</p>
        
        {/* Description & Prix */}
        <div className="text-sm">
          <Link href={`/product/${id}`} className="block mb-1 text-text group/title">
            <span className="font-semibold mr-2">{artisanName}</span>
            <span className="font-bold text-teal group-hover/title:underline">{productName}</span>
            <span className="px-2 py-0.5 bg-secondary/20 text-teal-dark rounded-full text-[10px] font-bold ml-2 align-middle">
              {price}€
            </span>
          </Link>
          
          <p className="text-text mb-2 leading-relaxed">
            {shortDescription || description}
          </p>

          {ingredients && (
            <div className="flex items-start gap-1.5 p-2 bg-surface border border-border/40 rounded-lg mb-2">
              <span className="text-xs" title="Allergènes">🌾</span>
              <p className="text-[11px] text-text-muted leading-tight">
                <span className="font-semibold uppercase text-[10px]">Ingrédients:</span> {ingredients}
              </p>
            </div>
          )}
        </div>

        {/* Bouton Voir commentaires (Fake) */}
        <button className="text-text-muted text-sm mt-3 hover:text-text">
          Voir les 4 commentaires
        </button>
      </div>

    </div>
  )
}
