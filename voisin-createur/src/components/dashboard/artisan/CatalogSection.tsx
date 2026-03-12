import { Product } from '../../../../lib/types'

interface CatalogSectionProps {
  products: Product[]
  loadingProducts: boolean
  onToggleProductActive: (product: Product) => void
}

export default function CatalogSection({ products, loadingProducts, onToggleProductActive }: CatalogSectionProps) {
  return (
    <div className="mb-16">
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="h-px bg-[#DEB887] flex-1 max-w-xs"></div>
        <h2 className="text-4xl text-[#362F2E] font-bold font-heading px-4">Mon Catalogue d'Articles</h2>
        <div className="h-px bg-[#DEB887] flex-1 max-w-xs"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loadingProducts ? (
          <div className="col-span-full text-center py-12 text-[#705040] font-medium">Chargement de votre catalogue...</div>
        ) : products.length === 0 ? (
          <div className="col-span-full text-center py-12 text-[#705040] font-medium border-2 border-dashed border-[#DEB887]/50 rounded-xl">
            Vous n'avez pas encore d'articles dans votre catalogue.<br />
            <button className="mt-4 bg-[#386D71] text-white py-2 px-6 rounded-lg text-sm font-semibold shadow-sm transition-colors hover:bg-[#144144]">
              Ajouter un produit
            </button>
          </div>
        ) : products.map((product) => {
          const isActive = product.available

          return (
            <div key={product.id} className="card-product group">

              {/* Image Produit - Proportions naturelles, pas carrée */}
              <div className="relative h-56 bg-gray-200 overflow-hidden">
                <img
                  src={product.image_url || 'https://images.unsplash.com/photo-1610708083812-3211116b08ed?q=80&w=600&auto=format&fit=crop'}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-all duration-300 ${!isActive ? 'grayscale opacity-70' : ''}`}
                />
              </div>

              {/* Bandeau Teal (Vert Canard) */}
              <div className="card-product-header">
                <h3 className="font-sans font-bold text-md">{product.name}</h3>
                <span className="font-bold text-xl">{product.price}€</span>
              </div>

              {/* Détails */}
              <div className="card-product-body">
                <p className="text-[15px] text-white font-medium">
                  <span className="font-bold mr-1">Détails:</span>
                  {product.description || 'Aucune description disponible.'}
                </p>
              </div>

              {/* Boutons d'action (3 en ligne) */}
              <div className="flex p-3 gap-2 bg-transparent justify-center items-center">
                <button className="btn-action-primary">
                  Éditer
                </button>
                <button className="btn-action-primary">
                  Aperçu
                </button>
                <button
                  onClick={() => onToggleProductActive(product)}
                  className={isActive ? 'btn-action-status-active' : 'btn-action-status-inactive'}
                >
                  {isActive ? 'Désactiver' : 'Activer'}
                </button>
              </div>

            </div>
          )
        })}
      </div>
    </div>
  )
}
