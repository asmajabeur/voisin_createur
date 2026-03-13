'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { ProductFormData, PRODUCT_CATEGORIES } from '@/lib/types'

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => Promise<void>
  onCancel: () => void
  initialData?: Partial<ProductFormData & { image_url?: string | null }>
  loading?: boolean
}

export default function ProductForm({ onSubmit, onCancel, initialData, loading }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: initialData?.name || '',
    short_description: initialData?.short_description || '',
    description: initialData?.description || '',
    ingredients: initialData?.ingredients || '',
    price: initialData?.price || 0,
    category: initialData?.category || (PRODUCT_CATEGORIES[0] as string),
    image: undefined
  })

  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image_url || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, image: file })
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section Image */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-text">Photo du produit</label>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="aspect-square w-full border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-surface transition-colors overflow-hidden bg-background relative"
          >
            {imagePreview ? (
              <Image src={imagePreview} alt="Preview" fill className="object-cover" />
            ) : (
              <div className="text-center p-4">
                <span className="text-4xl block mb-2">📸</span>
                <span className="text-xs text-text-muted">Cliquez pour ajouter une photo</span>
              </div>
            )}
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>

        {/* Section Infos */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text mb-1">Nom de la création</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:ring-2 focus:ring-teal outline-none transition-all"
              placeholder="Ex: Tarte aux fraises maison"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">Prix (€)</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:ring-2 focus:ring-teal outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Catégorie</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:ring-2 focus:ring-teal outline-none transition-all"
              >
                {PRODUCT_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">Description courte (Liste)</label>
            <input
              type="text"
              required
              value={formData.short_description}
              onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:ring-2 focus:ring-teal outline-none transition-all"
              placeholder="Une phrase d&apos;accroche pour le flux"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text mb-1">Description complète</label>
          <textarea
            required
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:ring-2 focus:ring-teal outline-none transition-all"
            placeholder="Détails sur la fabrication, l&apos;origine des produits..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1">Ingrédients & Allergies</label>
          <textarea
            rows={2}
            value={formData.ingredients}
            onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
            className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:ring-2 focus:ring-teal outline-none transition-all"
            placeholder="Ex: Farine de blé, Œufs, Lait. Traces de noisettes."
          />
        </div>
      </div>

      <div className="flex gap-4 pt-4 border-t border-border/40">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-6 py-3 rounded-xl border border-border text-text font-medium hover:bg-surface transition-all"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-6 py-3 rounded-xl bg-teal text-white font-bold shadow-md hover:bg-teal-dark disabled:opacity-50 transition-all"
        >
          {loading ? 'Enregistrement...' : 'Enregistrer la création'}
        </button>
      </div>
    </form>
  )
}
