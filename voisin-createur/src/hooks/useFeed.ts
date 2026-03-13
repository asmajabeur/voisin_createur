'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Product, UserProfile } from '../../lib/types'

// Étend le type Product pour inclure les informations du profil directement au 1er niveau
export interface FeedProduct extends Product {
  artisan: UserProfile | null
}

export type SortOption = 'recent' | 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc'

export function useFeed(searchQuery: string = '', maxPrice: number | '' = '', location: string = '', sortBy: SortOption = 'recent') {
  const [feedItems, setFeedItems] = useState<FeedProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        setLoading(true)
        
        // 1. On récupère les profils des artisans d'abord (pour filtrer la requête principale sur 'user_id' plus tard si on le faisait dans l'autre sens, mais ici Supabase permet pas de faire un .ilike() sur une table jointe de manière simple sur la version SDK basique).
        // Solution plus simple pour la V1 : Fetch tous les produits actifs + Leurs profils. Puis filtre côté client pour l'instant (car MVP et petite DB).
        
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select(`
            *,
            profiles:user_id (*)
          `)
          .eq('available', true)
          .order('created_at', { ascending: false })

        if (productsError) {
          console.error("Supabase Fetch Error:", productsError)
          throw productsError
        }

        console.log(`[DEBUG] Données brutes reçues de Supabase:`, productsData)

        // 2. Formatage des données et Typage
        let formattedData = (productsData || []).map(item => ({
          ...item,
          artisan: item.profiles ? (Array.isArray(item.profiles) ? item.profiles[0] : item.profiles) : null
        })) as FeedProduct[]

        console.log(`[DEBUG] Produits après formatage:`, formattedData.length, formattedData)

        // 3. Filtrage basique (Recherche texte)
        if (searchQuery.trim() !== '') {
          const lowerQuery = searchQuery.toLowerCase()
          formattedData = formattedData.filter(item => {
            const matchName = item.name ? item.name.toLowerCase().includes(lowerQuery) : false
            const matchDesc = item.description ? item.description.toLowerCase().includes(lowerQuery) : false
            const matchArtisan = item.artisan?.name ? item.artisan.name.toLowerCase().includes(lowerQuery) : false
            const matchCat = item.category ? item.category.toLowerCase().includes(lowerQuery) : false
            return matchName || matchDesc || matchArtisan || matchCat
          })
          console.log(`[DEBUG] Produits après recherche '${searchQuery}':`, formattedData.length)
        }

        // 4. Filtrage Prix Max
        if (maxPrice !== '') {
          formattedData = formattedData.filter(item => item.price <= Number(maxPrice))
          console.log(`[DEBUG] Produits après prix max ${maxPrice}:`, formattedData.length)
        }

        // 5. Filtrage Localisation (Ville ou Code Postal de l'artisan)
        if (location.trim() !== '') {
          const lowerLoc = location.toLowerCase()
          formattedData = formattedData.filter(item => {
            const matchCity = item.artisan?.city ? item.artisan.city.toLowerCase().includes(lowerLoc) : false
            const matchZip = item.artisan?.postal_code ? item.artisan.postal_code.toLowerCase().includes(lowerLoc) : false
            return matchCity || matchZip
          })
          console.log(`[DEBUG] Produits après localisation '${location}':`, formattedData.length)
        }

        // 6. Tri
        switch (sortBy) {
          case 'price_asc':
            formattedData.sort((a, b) => a.price - b.price)
            break
          case 'price_desc':
            formattedData.sort((a, b) => b.price - a.price)
            break
          case 'name_asc':
            formattedData.sort((a, b) => a.name.localeCompare(b.name))
            break
          case 'name_desc':
            formattedData.sort((a, b) => b.name.localeCompare(a.name))
            break
          case 'recent':
          default:
            formattedData.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            break
        }
        console.log(`[DEBUG] Produits après tri '${sortBy}':`, formattedData.length)

        setFeedItems(formattedData)
        setErrorMsg(null)
      } catch (err: any) {
        console.error("Erreur lors de la récupération du Feed:", err)
        setErrorMsg(err.message || JSON.stringify(err))
      } finally {
        setLoading(false)
      }
    }

    // Le debounce de la recherche pour ne pas spammer la DB sera utile plus tard si on fait la recherche côté serveur.
    // Mais vu qu'on filtre localement ici, on re-rend direct.
    fetchFeed()
  }, [searchQuery, maxPrice, location, sortBy])

  return {
    feedItems,
    loading,
    error: errorMsg
  }
}
