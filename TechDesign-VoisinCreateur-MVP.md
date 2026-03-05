# Technical Design Document: Voisin Créateur MVP

## Overview

Ce document explique comment construire Voisin Créateur avec une approche équilibrée entre simplicité et apprentissage.

## Recommended Approach

### 🎯 Best Path for You: Low-code avec IA Assistance

**Primary Approach: Next.js + Supabase + Cursor**

**Pourquoi c'est parfait pour vous :**
- Vous connaissez déjà React.js et JavaScript
- Next.js ajoute le backend et le routing automatiquement
- Supabase gère la base de données et l'authentification
- Cursor génère le code, vous testez uniquement

**Coût :** 0€/mois (paliers gratuits)
**Temps d'apprentissage :** 1-2 jours
**Taux de réussite :** 95% pour projets similaires

### Alternative Options Compared

| Option | Pros | Cons | Coût | Temps MVP |
|--------|------|------|------|-----------|
| Next.js + Supabase | Stack moderne, tout-en-un | Courbe d'apprentissage Next.js | 0€ |
| React + Node.js | Contrôle total | Plus complexe à configurer | 0€ | 
| Bolt.new no-code | Plus rapide | Moins flexible, dépendant | 0€ | 

## Project Setup Checklist

### Step 1: Create Accounts (Jour 1)
- [ ] **Supabase** compte - https://supabase.com
- [ ] **Vercel** compte - https://vercel.com  
- [ ] **Cloudinary** compte - https://cloudinary.com
- [ ] **Cursor** IDE - https://cursor.sh

### Step 2: AI Assistant Setup (Jour 1)
- [ ] Installer Cursor IDE
- [ ] Configurer avec API key (OpenAI/Claude)
- [ ] Tester avec "Hello World"

### Step 3: Project Initialization (Jour 2)
```bash
# Créer projet Next.js
npx create-next-app@latest voisin-createur --typescript --tailwind --eslint --app
cd voisin-createur
npm install @supabase/supabase-js
npm install @supabase/auth-helpers-nextjs
```

## Building Your Features

### Feature 1: Double Profil (Artisan/Client)

**Complexité:** ⭐⭐☆☆☆ (Facile-Moyen)

**Comment construire avec Next.js + Supabase:**

#### Prompt pour Cursor:
```
Crée un système de profil double pour Voisin Créateur:
- Table users avec champ profile_type ('artisan' ou 'client')
- Formulaire d'inscription avec choix de profil
- Dashboard différent selon le profil
- Utilise Next.js app router et Supabase
```

#### Fichiers à créer:
- `app/auth/signin/page.tsx` - Page connexion
- `app/auth/signup/page.tsx` - Page inscription  
- `app/dashboard/artisan/page.tsx` - Dashboard artisan
- `app/dashboard/client/page.tsx` - Dashboard client

#### Data/Backend Needs:
- **Table users:** id, email, profile_type, name, created_at
- **Authentification:** Supabase Auth
- **API endpoints:** Routes API Next.js

### Feature 2: Flux Visuel "Insta-Style"

**Complexité:** ⭐⭐☆☆☆ (Facile-Moyen)

#### Prompt pour Cursor:
```
Crée un flux Instagram-style pour Voisin Créateur:
- Grille responsive des produits avec images
- Filtres par catégorie et code postal
- Design épuré style Instagram (fond blanc)
- Utilise Tailwind CSS et Next.js
```

#### Fichiers à créer:
- `app/page.tsx` - Page d'accueil avec flux
- `components/ProductGrid.tsx` - Grille produits
- `components/ProductCard.tsx` - Carte produit individuelle
- `components/Filters.tsx` - Composant filtres

#### Data/Backend Needs:
- **Table products:** id, user_id, name, description, price, image_url, category, postal_code
- **API endpoints:** GET /api/products, GET /api/products?category=...

### Feature 3: Gestion de Catalogue CRUD

**Complexité:** ⭐⭐⭐☆☆ (Moyen)

#### Prompt pour Cursor:
```
Crée un CRUD complet pour les produits d'artisans:
- Formulaire d'ajout de produit avec upload image
- Page de gestion des produits pour l'artisan
- Modification et suppression des produits
- Intégration Cloudinary pour les images
```

#### Fichiers à créer:
- `app/products/new/page.tsx` - Formulaire ajout
- `app/products/manage/page.tsx` - Gestion produits
- `app/products/edit/[id]/page.tsx` - Modification produit
- `components/ProductForm.tsx` - Formulaire réutilisable

### Feature 4: Système de Commande Simple

**Complexité:** ⭐⭐☆☆☆ (Facile-Moyen)

#### Prompt pour Cursor:
```
Crée un système de commande simple:
- Bouton "Commander" sur chaque produit
- Enregistrement de la commande en base
- Notification à l'artisan (email simple)
- Historique des commandes pour artisan et client
```

#### Fichiers à créer:
- `app/orders/create/[productId]/page.tsx` - Page commande
- `app/orders/history/page.tsx` - Historique commandes
- `app/api/orders/route.ts` - API endpoint commandes

## Design Implementation

### Matching Your PRD Vision: "Épuré, minimaliste, fond blanc"

#### Design System Setup
```css
/* globals.css */
:root {
  --primary: #000000;
  --secondary: #666666;
  --background: #ffffff;
  --surface: #f8f8f8;
  --border: #e5e5e5;
}

/* Typography */
font-main: Inter, system-ui, sans-serif;
font-heading: Inter, system-ui, sans-serif;
```

#### Mobile Responsiveness
- Utiliser Tailwind responsive classes
- Points de rupture: 640px, 768px, 1024px
- Test sur iPhone, Android, Tablet

## Database & Data Storage

### Simple Setup: Supabase

**Setup time:** 10 minutes  
**Cost:** Free pour MVP  
**Why it works:** Auth + DB + Storage tout-en-un

#### Data Structure
```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  profile_type VARCHAR(20) NOT NULL, -- 'artisan' or 'client'
  name VARCHAR(255),
  postal_code VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table  
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  image_url TEXT,
  category VARCHAR(100),
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  buyer_id UUID REFERENCES users(id),
  seller_id UUID REFERENCES users(id),
  status VARCHAR(20) DEFAULT 'pending', -- pending, confirmed, completed
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## AI Assistance Strategy

### Which AI Tool for What

| Task | Best AI Tool | Example Prompt |
|------|--------------|----------------|
| Architecture | Claude Sonnet | "Design database schema for Voisin Créateur" |
| Writing code | Cursor | "Implement product grid with Tailwind CSS" |
| Fixing bugs | ChatGPT | "Error: [error]. How to fix in Next.js?" |
| UI/Design | v0.dev | "Create Instagram-style product card" |
| Deployment | GitHub Copilot | "Deploy Next.js to Vercel" |

### Prompt Templates for Your Features

**Feature Implementation:**
```
Je veux construire [feature name] pour Voisin Créateur.
Requirements:
- [Requirement from PRD]
- [Requirement from PRD]  
Tech stack: Next.js, Supabase, Tailwind CSS
Fournis l'implémentation étape par étape.
```

**Debugging:**
```
Erreur dans [feature]:
[Error message]
Code actuel: [paste relevant code]
Comportement attendu: [what should happen]
Corrige et explique le problème.
```

## Deployment Plan

### Recommended Platform: Vercel

#### Why Vercel:
- **Déploiement automatique** depuis GitHub
- **Tier gratuit** couvre les besoins MVP
- **Auto-scaling** automatique
- **Intégration Next.js** native

#### Deployment Steps:
1. **Push sur GitHub:** `git push origin main`
2. **Connecter repository** sur Vercel
3. **Configurer environment variables:**
   ```
   NEXT_PUBLIC_SUPABASE_URL=[your-supabase-url]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
   SUPABASE_SERVICE_ROLE_KEY=[your-service-key]
   ```
4. **Deploy automatique** sur chaque push

### Backup Options:
- **Netlify:** Bon alternative si Vercel ne convient pas
- **Render:** Pour backend séparé si nécessaire

## Cost Breakdown

### Development Phase (Building)
| Service | Free Tier | Paid Tier | You Need |
|---------|-----------|-----------|----------|
| Cursor IDE | Limited | $20/mo | Free OK |
| Supabase | 500MB DB | $25/mo | Free OK |
| Vercel | 100GB | $20/mo | Free OK |
| Cloudinary | 25GB | $89/mo | Free OK |
| **Total** | **$0** | **$154/mo** | **$0/mo** |

### Production Phase (After Launch)
| Service | Monthly Cost | At 1000 Users |
|---------|--------------|---------------|
| Vercel | $0-20 | $20 |
| Supabase | $0-25 | $25 |
| Cloudinary | $0-5 | $5 |
| **Total** | **$0-50** | **$50** |

## Scaling Path

### When You Hit These Milestones:

**100 Users:**
- Setup actuel fonctionne parfaitement
- Monitorer performance
- Recueillir feedback

**1,000 Users:**
- Passer aux paliers payants
- Ajouter monitoring (Sentry)
- Optimiser requêtes base

**10,000 Users:**
- Infrastructure dédiée
- Cache layer
- Engager aide technique

## Important Limitations

### What This Approach CAN'T Do:
1. **Fonctionnalités temps réel:** Pas de chat instantané
   - *Workaround:* Email/notification simple
2. **Algorithmes complexes:** Pas de recommandations ML
   - *Workaround:* Filtrage simple par catégorie/localisation

### When You'll Need to Upgrade:
- **10,000+ utilisateurs:** Passer à infrastructure dédiée
- **Fonctionnalités avancées:** Ajouter services spécialisés

## Learning Resources

### Essential Tutorials for Your Stack
1. **Next.js 15:** https://nextjs.org/learn
2. **Supabase Auth:** https://supabase.com/docs/guides/auth
3. **Tailwind CSS:** https://tailwindcss.com/docs

### AI Assistant Tutorials
1. **Cursor Basics:** Documentation officielle Cursor
2. **Effective Prompting:** Guides Cursor/GitHub Copilot

## Success Checklist

### Before Starting Development
- [ ] Tous les comptes créés
- [ ] Environnement de développement prêt
- [ ] Limitations comprises
- [ ] Budget confirmé (0€)

### During Development
- [ ] Suivre uniquement les fonctionnalités PRD
- [ ] Tester après chaque fonctionnalité
- [ ] Commit code régulièrement
- [ ] Demander à l'IA quand bloqué

### Before Launch
- [ ] Toutes les fonctionnalités PRD fonctionnent
- [ ] Testé sur mobile
- [ ] Gestion erreurs basique
- [ ] Analytics connectés
- [ ] Plan backup prêt

## Definition of Technical Success

Votre implémentation technique est réussie quand:
- L'application fonctionne sans crasher
- Les fonctionnalités PRD principales marchent
- Déployée et accessible en ligne
- Vous pouvez la mettre à jour vous-même
- Les coûts mensuels sont dans le budget
- Vous comprenez comment la maintenir

---
*Technical Design for: Voisin Créateur*  
*Approach: Next.js + Supabase + Cursor*  
*Estimated Cost: 0€/month*
