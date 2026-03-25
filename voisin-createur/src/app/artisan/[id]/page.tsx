import { supabase } from '@/lib/supabase'
import ArtisanShowcase from '@/components/profile/ArtisanShowcase'
import { notFound } from 'next/navigation'
import { UserProfile } from '@/lib/types'
import { FeedProduct } from '@/hooks/useFeed'

// Revalidate all les 60 secondes pour garder le catalogue à jour sans plomber les performances
export const revalidate = 60 

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ArtisanPage({ params }: PageProps) {
  // Nécessaire dans Next.js 15+ pour les pages dynamiques asynchrones
  const p = await params;
  
  if (!p.id) {
    notFound()
  }

  // 1. Récupération du profil de l'artisan
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', p.id)
    .single()

  if (profileError || !profile || profile.profile_type !== 'artisan') {
    // Si l'utilisateur n'existe pas ou n'est pas un artisan, on renvoie une 404
    notFound()
  }

  // 2. Récupération des produits de l'artisan
  const { data: productsData } = await supabase
    .from('products')
    .select(`
      *,
      user:profiles (
        name,
        postal_code
      )
    `)
    .eq('user_id', p.id)
    .eq('available', true) // On ne montre que les produits disponibles
    .order('created_at', { ascending: false })

  const typedProfile = profile as unknown as UserProfile
  const typedProducts = (productsData || []).map(p => ({
    ...p,
    artisan: typedProfile // On attache le profil artisan pour que ProductGrid puisse l'utiliser
  })) as unknown as FeedProduct[]

  return (
    <ArtisanShowcase 
      artisan={typedProfile} 
      products={typedProducts} 
      loading={false} // Server component, pas de loading côté client
    />
  )
}
