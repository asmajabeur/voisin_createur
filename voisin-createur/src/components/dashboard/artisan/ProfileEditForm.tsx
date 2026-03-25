'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { UserProfile } from '@/lib/types'
import { useAuth } from '@/hooks/useAuth'

interface ProfileEditFormProps {
  onCancel: () => void
  onSuccess: () => void
}

export default function ProfileEditForm({ onCancel, onSuccess }: ProfileEditFormProps) {
  const { user, updateProfile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Refs pour les inputs type file
  const avatarInputRef = useRef<HTMLInputElement>(null)
  const bannerInputRef = useRef<HTMLInputElement>(null)

  // Pré-visualisation des images
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatar_url || null)
  const [bannerPreview, setBannerPreview] = useState<string | null>(user?.banner_url || null)

  // Fichiers à uploader
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [bannerFile, setBannerFile] = useState<File | null>(null)

  // Form Data
  const [formData, setFormData] = useState({
    name: user?.name || '',
    short_description: user?.short_description || '',
    long_description: user?.long_description || '',
    phone: user?.phone || '',
    address: user?.address || '',
    is_motorized: user?.is_motorized || false,
    can_deliver: user?.can_deliver || false,
    instagram: user?.social_links?.instagram || '',
    facebook: user?.social_links?.facebook || '',
    website: user?.social_links?.website || ''
  })

  // Fonction utilitaire pour l'upload Cloudinary
  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)
    
    // Utilisation du preset public Cloudinary configuré pour Voisin Créateur
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    
    if (!uploadPreset || !cloudName) {
      throw new Error("Configuration Cloudinary manquante")
    }
    
    formData.append('upload_preset', uploadPreset)

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Erreur lors de l'upload de l'image.`)
    }

    const data = await response.json()
    return data.secure_url
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'banner') => {
    const file = e.target.files?.[0]
    if (!file) return

    const previewUrl = URL.createObjectURL(file)
    if (type === 'avatar') {
      setAvatarFile(file)
      setAvatarPreview(previewUrl)
    } else {
      setBannerFile(file)
      setBannerPreview(previewUrl)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      let finalAvatarUrl = user?.avatar_url
      let finalBannerUrl = user?.banner_url

      // 1. Upload des images si modifiées
      if (avatarFile) {
        finalAvatarUrl = await uploadImage(avatarFile)
      }
      if (bannerFile) {
        finalBannerUrl = await uploadImage(bannerFile)
      }

      // 2. Préparation des données pour Supabase
      const updates: Partial<UserProfile> = {
        name: formData.name,
        short_description: formData.short_description,
        long_description: formData.long_description,
        phone: formData.phone,
        address: formData.address,
        is_motorized: formData.is_motorized,
        can_deliver: formData.can_deliver,
        avatar_url: finalAvatarUrl,
        banner_url: finalBannerUrl,
        social_links: {
          instagram: formData.instagram,
          facebook: formData.facebook,
          website: formData.website
        }
      }

      // 3. Appel du hook pour mise à jour
      const result = await updateProfile(updates)
      
      if (result.success) {
        onSuccess()
      } else {
        throw new Error(result.error || "Erreur inconnue lors de la sauvegarde.")
      }
    } catch (err) {
      console.error(err)
      setError((err instanceof Error ? err.message : String(err)) || 'Une erreur est survenue lors de la mise à jour.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in text-left">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6 border border-red-100">
          {error}
        </div>
      )}

      {/* --- SECTION IMAGES --- */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-text mb-2">Bannière de votre vitrine</label>
          <div 
            onClick={() => bannerInputRef.current?.click()}
            className="w-full h-48 bg-surface rounded-xl border-2 border-dashed border-border flex items-center justify-center cursor-pointer overflow-hidden relative group"
          >
            {bannerPreview ? (
              <>
                <Image src={bannerPreview} alt="Bannière" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-medium">Changer la bannière</span>
                </div>
              </>
            ) : (
              <div className="text-center text-text-muted">
                <span className="text-2xl mb-2 block">🖼️</span>
                <span className="text-sm">Cliquez pour ajouter une bannière</span>
              </div>
            )}
            <input 
              type="file" 
              ref={bannerInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={(e) => handleImageChange(e, 'banner')}
            />
          </div>
          <p className="text-xs text-text-muted mt-2">Format recommandé: 1920x600px. Cette image habillera le haut de votre page publique.</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-text mb-2">Photo de profil</label>
          <div className="flex items-center gap-6">
            <div 
              onClick={() => avatarInputRef.current?.click()}
              className="w-24 h-24 rounded-full bg-surface border-2 border-dashed border-border flex items-center justify-center cursor-pointer overflow-hidden relative group flex-shrink-0"
            >
              {avatarPreview ? (
                 <>
                   <Image src={avatarPreview} alt="Avatar" fill className="object-cover" />
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <span className="text-white text-xs text-center font-medium px-1">Changer</span>
                   </div>
                 </>
              ) : (
                <span className="text-2xl">👤</span>
              )}
              <input 
                type="file" 
                ref={avatarInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={(e) => handleImageChange(e, 'avatar')}
              />
            </div>
            <div className="text-sm text-text-muted">
              C&apos;est le visage de votre entreprise. Utilisez une photo de vous en pleine création ou le logo de votre marque !
            </div>
          </div>
        </div>
      </div>

      <hr className="border-border" />

      {/* --- SECTION INFOS GÉNÉRALES --- */}
      <div className="space-y-4">
        <h3 className="font-heading font-bold text-xl text-text">Informations Générales</h3>
        
        <div>
          <label className="block text-sm font-semibold text-text mb-1">Nom de l&apos;atelier / Marque *</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 bg-surface border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-text"
            placeholder="Ex: Les Biscuits de Sophie"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-text mb-1">Slogan ou Métier court *</label>
          <input
            type="text"
            name="short_description"
            required
            maxLength={100}
            value={formData.short_description}
            onChange={handleChange}
            className="w-full p-3 bg-surface border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-text"
            placeholder="Ex: Pâtisseries créatives sur-mesure"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-text mb-1">Votre histoire (Bio longue)</label>
          <textarea
            name="long_description"
            rows={5}
            value={formData.long_description}
            onChange={handleChange}
            className="w-full p-3 bg-surface border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-text"
            placeholder="Racontez d'où vient votre passion, vos inspirations, et ce qui rend vos créations uniques..."
          />
        </div>
      </div>

      <hr className="border-border" />

      {/* --- SECTION CONTACT & LOGISTIQUE --- */}
      <div className="space-y-4">
        <h3 className="font-heading font-bold text-xl text-text">Contact & Logistique</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-text mb-1">Numéro de téléphone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 bg-surface border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-text"
              placeholder="Ex: 06 12 34 56 78"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-text mb-1">Adresse exacte ou Atelier</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 bg-surface border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-text"
              placeholder="Ex: 12 rue des Artisans, Paris"
            />
          </div>
        </div>

        <div className="flex gap-6 pt-2">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center w-6 h-6 border-2 border-border rounded-md bg-white group-hover:border-primary transition-colors">
              <input
                type="checkbox"
                name="is_motorized"
                checked={formData.is_motorized}
                onChange={handleChange}
                className="absolute opacity-0 w-full h-full cursor-pointer"
              />
              {formData.is_motorized && (
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              )}
            </div>
            <span className="text-text font-medium select-none text-sm">🚗 Je suis motorisé(e)</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center w-6 h-6 border-2 border-border rounded-md bg-white group-hover:border-primary transition-colors">
              <input
                type="checkbox"
                name="can_deliver"
                checked={formData.can_deliver}
                onChange={handleChange}
                className="absolute opacity-0 w-full h-full cursor-pointer"
              />
              {formData.can_deliver && (
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              )}
            </div>
             <span className="text-text font-medium select-none text-sm">📦 Possibilité de livrer</span>
          </label>
        </div>
      </div>

      <hr className="border-border" />

      {/* --- SECTION RÉSEAUX SOCIAUX --- */}
      <div className="space-y-4">
        <h3 className="font-heading font-bold text-xl text-text">Vos Réseaux Sociaux <span className="text-sm font-normal text-text-muted">(Optionnel)</span></h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-text mb-1">Lien Instagram</label>
            <input
              type="url"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              className="w-full p-3 bg-surface border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-text text-sm"
              placeholder="https://instagram.com/..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text mb-1">Lien Facebook</label>
            <input
              type="url"
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
              className="w-full p-3 bg-surface border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-text text-sm"
              placeholder="https://facebook.com/..."
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-text mb-1">Site Web (ou autre lien)</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full p-3 bg-surface border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-text text-sm"
              placeholder="https://..."
            />
          </div>
        </div>
      </div>

      {/* --- ACTIONS --- */}
      <div className="flex justify-end gap-3 pt-6 border-t border-border sticky bottom-0 bg-background pb-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-6 py-3 border border-border text-text hover:bg-surface rounded-xl font-bold transition-colors disabled:opacity-50"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-primary text-white hover:bg-primary-dark rounded-xl font-bold shadow-md transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? (
            <>
              <span className="block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              Enregistrement...
            </>
          ) : (
            'Enregistrer les modifications'
          )}
        </button>
      </div>
    </form>
  )
}
