import { MagnifyingGlassIcon, MapPinIcon, CurrencyEuroIcon, Squares2X2Icon, ViewColumnsIcon, ArrowsUpDownIcon } from '@heroicons/react/24/outline'
import { Squares2X2Icon as Squares2X2IconSolid, ViewColumnsIcon as ViewColumnsIconSolid } from '@heroicons/react/24/solid'
import { SortOption } from '../../hooks/useFeed'

interface FeedFiltersProps {
  viewMode: 'grid' | 'feed'
  onChangeViewMode: (mode: 'grid' | 'feed') => void
  searchQuery: string
  onSearchChange: (query: string) => void
  maxPrice: number | ''
  onMaxPriceChange: (price: number | '') => void
  location: string
  onLocationChange: (loc: string) => void
  sortBy: SortOption
  onChangeSortBy: (sort: SortOption) => void
}

export default function FeedFilters({ 
  viewMode, 
  onChangeViewMode, 
  searchQuery, 
  onSearchChange,
  maxPrice,
  onMaxPriceChange,
  location,
  onLocationChange,
  sortBy,
  onChangeSortBy
}: FeedFiltersProps) {
  return (
    <div className="bg-background sticky top-0 z-40 shadow-sm border-b border-border py-4 px-4 sm:px-6 lg:px-8 mb-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Barre de Recherche */}
        <div className="relative w-full md:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-border rounded-full leading-5 bg-surface placeholder-text-muted focus:outline-none focus:bg-background focus:ring-1 focus:ring-teal focus:border-teal sm:text-sm text-text transition-colors"
            placeholder="Rechercher une création, un artisan..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <div className="flex gap-2 flex-wrap justify-center">
            <div className="relative flex items-center bg-surface border border-border rounded-full px-3 py-1.5 focus-within:ring-1 focus-within:ring-teal focus-within:border-teal transition-colors">
              <CurrencyEuroIcon className="h-4 w-4 text-text-muted mr-1.5" />
              <input 
                type="number" 
                placeholder="Prix max" 
                value={maxPrice === '' ? '' : maxPrice}
                onChange={(e) => onMaxPriceChange(e.target.value ? Number(e.target.value) : '')}
                className="bg-transparent border-none p-0 focus:ring-0 text-sm font-medium text-text w-20 sm:w-24 placeholder-text-muted"
              />
            </div>
            
            <div className="relative flex items-center bg-surface border border-border rounded-full px-3 py-1.5 focus-within:ring-1 focus-within:ring-teal focus-within:border-teal transition-colors">
              <MapPinIcon className="h-4 w-4 text-text-muted mr-1.5" />
              <input 
                type="text" 
                placeholder="Quartier/Ville" 
                value={location}
                onChange={(e) => onLocationChange(e.target.value)}
                className="bg-transparent border-none p-0 focus:ring-0 text-sm font-medium text-text w-24 sm:w-32 placeholder-text-muted"
              />
            </div>

            <div className="relative flex items-center bg-surface border border-border rounded-full px-3 py-1.5 focus-within:ring-1 focus-within:ring-teal focus-within:border-teal transition-colors">
              <ArrowsUpDownIcon className="h-4 w-4 text-text-muted mr-1.5" />
              <select
                value={sortBy}
                onChange={(e) => onChangeSortBy(e.target.value as SortOption)}
                className="bg-transparent border-none p-0 focus:ring-0 text-sm font-medium text-text cursor-pointer"
              >
                <option value="recent">Plus récents</option>
                <option value="price_asc">Prix croissant</option>
                <option value="price_desc">Prix décroissant</option>
                <option value="name_asc">De A à Z</option>
              </select>
            </div>
          </div>

          {/* Séparateur */}
          <div className="h-8 w-px bg-border hidden md:block"></div>

          {/* Sélecteur de Vue (Grid vs Feed) */}
          <div className="flex bg-surface border border-border p-1 rounded-lg">
            <button
              onClick={() => onChangeViewMode('grid')}
              className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-background shadow-sm text-teal' : 'text-text-muted hover:text-text'}`}
              title="Vue Grille"
            >
              {viewMode === 'grid' ? <Squares2X2IconSolid className="h-5 w-5" /> : <Squares2X2Icon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => onChangeViewMode('feed')}
              className={`p-1.5 rounded-md transition-all ${viewMode === 'feed' ? 'bg-background shadow-sm text-teal' : 'text-text-muted hover:text-text'}`}
              title="Vue Flux (Style Instagram)"
            >
              {viewMode === 'feed' ? <ViewColumnsIconSolid className="h-5 w-5" /> : <ViewColumnsIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
