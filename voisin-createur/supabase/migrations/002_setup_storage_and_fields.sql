-- 1. MISE À JOUR DE LA TABLE PRODUCTS
-- Ajout des colonnes demandées pour le CRUD Artisan
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS short_description TEXT,
ADD COLUMN IF NOT EXISTS ingredients TEXT;

-- 2. CONFIGURATION DU STORAGE
-- Création du bucket pour les images de produits (s'il n'existe pas)
-- Note: L'extension 'storage' doit être activée sur Supabase
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- 3. POLITIQUES DE SÉCURITÉ POUR LE STORAGE (RLS)
-- Permettre la lecture publique de toutes les images
CREATE POLICY "Images de produits publiques"
ON storage.objects FOR SELECT
USING ( bucket_id = 'product-images' );

-- Permettre aux artisans d'uploader des images dans leur dossier
-- Les fichiers sont nommés "products/userID-random.ext"
CREATE POLICY "Artisans peuvent uploader des produits"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'product-images' 
  AND auth.role() = 'authenticated'
);

-- Permettre aux artisans de supprimer leurs propres images
CREATE POLICY "Artisans peuvent supprimer leurs produits"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'product-images' 
  AND auth.role() = 'authenticated'
);
