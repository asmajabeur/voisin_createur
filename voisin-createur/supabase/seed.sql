-- ==============================================================================
-- SCRIPT DE DÉPLOIEMENT : DONNÉES EXEMPLE ARTISAN (PIERRE BOIS&CO)
-- ==============================================================================
-- Instructions :
-- 1. Copiez ce script dans l'éditeur SQL de Supabase (Tableau de bord > SQL Editor)
-- 2. Remplacez '00000000-0000-0000-0000-000000000000' par l'ID de votre utilisateur connecté 
--    (Trouvable dans Authentication > Users > Copier User UID)
-- 3. Exécutez le script (Run)
-- ==============================================================================

-- 1. S'assurer que la table 'profiles' a toutes les colonnes nécessaires
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  profile_type TEXT,
  name TEXT,
  postal_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Ajout des colonnes pour le profil riche (si elles n'existent pas)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS city TEXT;

-- 2. Création de la table 'products'
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  image_url TEXT,
  category TEXT,
  stock INTEGER DEFAULT 1,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Insertion/Mise à jour du Profil Artisan "Pierre Bois&Co"
DO $$
DECLARE
    -- >>> REMPLACEZ L'UUID CI-DESSOUS PAR LE VÔTRE <<<
    target_user_id UUID := '00000000-0000-0000-0000-000000000000'; 
BEGIN
    -- Si l'UUID est valide (pas le placeholder par défaut), on insère
    IF target_user_id <> '00000000-0000-0000-0000-000000000000' THEN
        -- Mise à jour du profil
        INSERT INTO public.profiles (id, name, profile_type, postal_code, city, phone, description, image_url)
        VALUES (
            target_user_id,
            'Pierre Bois&Co',
            'artisan',
            '75011',
            'Paris',
            '06 12 34 56 78',
            'Artisan ébéniste passionné par le bois local et durable. Je fabrique des meubles uniques et des objets de décoration dans mon atelier du 11ème arrondissement. Chaque pièce est faite main avec amour et précision.',
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        )
        ON CONFLICT (id) DO UPDATE SET
            name = EXCLUDED.name,
            description = EXCLUDED.description,
            image_url = EXCLUDED.image_url,
            city = EXCLUDED.city,
            phone = EXCLUDED.phone;

        -- Insertion des produits (On supprime d'abord les anciens pour éviter les doublons lors des tests)
        DELETE FROM public.products WHERE user_id = target_user_id;

        INSERT INTO public.products (user_id, name, description, price, category, stock, image_url) VALUES
        (target_user_id, 'Table basse "Racine" en chêne', 'Table basse réalisée à la main en chêne massif français. Finition vernis mat naturel. Pieds en acier thermolaqué noir. Dimensions 100x60cm. Idéale pour un salon style industriel ou scandinave.', 250.00, 'Mobilier', 2, 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&q=80'),
        (target_user_id, 'Planche à découper "Chef"', 'Planche à découper en bois de bout (noyer et érable). Idéale pour la cuisine, n''abîme pas les couteaux. Traitée à l''huile alimentaire et cire d''abeille. Dimensions 40x30cm.', 45.00, 'Cuisine', 15, 'https://images.unsplash.com/photo-1624823183483-c6f8b4d9b83c?w=800&q=80'),
        (target_user_id, 'Lampe de bureau "Lumière"', 'Lampe minimaliste en frêne et laiton. Ampoule LED vintage incluse. Câble textile noir. Interrupteur tactile. Hauteur 45cm.', 120.00, 'Décoration', 5, 'https://images.unsplash.com/photo-1507473888900-52e1adad5420?w=800&q=80');
    END IF;
END $$;