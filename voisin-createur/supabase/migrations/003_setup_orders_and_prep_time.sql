-- 1. MISE À JOUR DE LA TABLE PRODUCTS
-- Ajout d'un délai de préparation par défaut (en jours)
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS default_prep_time INTEGER DEFAULT 2;

-- 2. MISE À JOUR DE LA TABLE ORDERS
-- On s'assure que la table existe et on ajoute les colonnes nécessaires
ALTER TABLE public.orders
ADD COLUMN IF NOT EXISTS quantity INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS total_price DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS estimated_ready_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS pickup_code TEXT; -- Petit bonus : un code pour la remise en main propre

-- 3. POLITIQUES DE SÉCURITÉ POUR LES COMMANDES (RLS)
-- Les clients ne peuvent voir que leurs propres commandes
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
CREATE POLICY "Clients peuvent voir leurs commandes" 
ON public.orders FOR SELECT 
USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

-- Seuls les clients peuvent créer une commande
DROP POLICY IF EXISTS "Users can create orders" ON public.orders;
CREATE POLICY "Clients peuvent commander" 
ON public.orders FOR INSERT 
WITH CHECK (auth.uid() = buyer_id);

-- Seuls les artisans (vendeurs) peuvent mettre à jour le statut et le délai
DROP POLICY IF EXISTS "Sellers can update orders" ON public.orders;
CREATE POLICY "Artisans gèrent leurs commandes" 
ON public.orders FOR UPDATE 
USING (auth.uid() = seller_id);
