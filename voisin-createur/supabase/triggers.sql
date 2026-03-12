-- ==============================================================================
-- TRIGGER AUTOMATIQUE : CRÉATION DE PROFIL
-- ==============================================================================
-- Ce script crée un "trigger" (déclencheur) qui s'exécute automatiquement
-- chaque fois qu'un utilisateur s'inscrit via Supabase Auth.
-- Il copie les données (email, profile_type, etc.) vers la table public.profiles.
-- ==============================================================================

-- 1. Création de la fonction qui gère l'insertion
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, profile_type, name, postal_code)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'profile_type',
    new.raw_user_meta_data->>'name',
    new.raw_user_meta_data->>'postal_code'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Création du déclencheur (Trigger)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();