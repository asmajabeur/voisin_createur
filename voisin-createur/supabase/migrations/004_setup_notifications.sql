-- CRÉATION DE LA TABLE NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT CHECK (type IN ('order_new', 'order_ready', 'order_confirmed', 'message_new')),
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index pour la performance
CREATE INDEX IF NOT EXISTS notifications_user_id_idx ON public.notifications (user_id);

-- POLITIQUES RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Les utilisateurs peuvent voir leurs propres notifications
DROP POLICY IF EXISTS "Users can view their own notifications" ON public.notifications;
CREATE POLICY "Utilisateurs voient leurs notifications" 
ON public.notifications FOR SELECT 
USING (auth.uid() = user_id);

-- Les utilisateurs peuvent marquer leurs notifications comme lues
DROP POLICY IF EXISTS "Users can update their own notifications" ON public.notifications;
CREATE POLICY "Utilisateurs gèrent leurs notifications" 
ON public.notifications FOR UPDATE 
USING (auth.uid() = user_id);

-- Autoriser le système (via triggers ou API) à insérer des notifications
-- Note: Pour simplifier dans le MVP, on autorise l'insertion authentifiée
DROP POLICY IF EXISTS "Anyone can insert notifications" ON public.notifications;
CREATE POLICY "Insertion de notifications" 
ON public.notifications FOR INSERT 
WITH CHECK (true);
