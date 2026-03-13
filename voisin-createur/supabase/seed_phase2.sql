-- ==============================================================================
-- SCRIPT D'INSERTION DE DONNÉES DE TEST : PHASE 2 (FLUX CLIENT)
-- ==============================================================================
-- Instructions :
-- 1. Copiez ce script dans l'éditeur SQL de Supabase (Tableau de bord > SQL Editor)
-- 2. Remplacez 'VOTRE_UUID_UTILISATEUR' (Ligne 13) par un véritable ID d'utilisateur
--    (Trouvable dans Authentication > Users > Copier User UID)
-- 3. Exécutez le script (Run)
-- ==============================================================================

DO $$
DECLARE
    -- >>> REMPLACEZ L'UUID CI-DESSOUS PAR LE VÔTRE <<<
    artisan_id UUID := 'VOTRE_UUID_UTILISATEUR'; 
BEGIN
    -- Si l'UUID a été modifié (n'est plus la valeur par défaut)
    IF artisan_id::text <> 'VOTRE_UUID_UTILISATEUR' THEN
        
        -- 1. On s'assure que cet utilisateur est bien un artisan avec un profil riche
        UPDATE public.profiles 
        SET 
            profile_type = 'artisan', 
            name = 'Marie Créations', 
            city = 'Paris', 
            description = 'Créatrice passionnée de bijoux et accessoires faits main. Chaque pièce est unique !',
            image_url = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop'
        WHERE id = artisan_id;

        -- 2. On insère quelques produits de test pour alimenter le flux
        INSERT INTO public.products (user_id, name, description, price, category, stock, available, image_url)
        VALUES 
        (
            artisan_id, 
            'Collier en Perles d''Eau Douce', 
            'Fait main avec amour dans mon atelier. Collier ajustable avec fermoir en argent.', 
            45.00, 
            'Bijoux', 
            5, 
            true,
            'https://images.unsplash.com/photo-1599643478524-fb66f7ca0f47?w=800&aspect=1:1&fit=crop'
        ),
        (
            artisan_id, 
            'Tote Bag en Lin Brodé', 
            'Sac cabas en lin naturel, broderie motif floral. Parfait pour vos courses de quartier.', 
            28.50, 
            'Accessoires', 
            12, 
            true,
            'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&aspect=1:1&fit=crop'
        );

    END IF;
END $$;
