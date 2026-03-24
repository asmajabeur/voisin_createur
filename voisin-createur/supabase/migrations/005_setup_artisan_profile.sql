-- Script de migration pour la Phase 4 : Expérience Artisan (Profil & Vitrine)

-- Ajout des nouveaux champs à la table profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS banner_url TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS long_description TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS social_links JSONB DEFAULT '{}'::jsonb;


