# Product Requirements Document: Voisin Créateur MVP

## Overview

**Product Name:** Voisin Créateur  
**Problem Statement:** Permettre aux artisans talentueux qui travaillent à domicile de vendre facilement leurs créations uniques (pâtisseries, mode, accessoires) directement aux habitants de leur quartier  
**MVP Goal:** Apprendre à coder une application web complète (Fullstack) et réussir à mettre en ligne une première version (MVP) fonctionnelle où un ami peut s'inscrire et publier un faux produit  

## Target Users

### Primary User Profiles

**1. L'Artisan "Passionné"**
- **Who:** Pâtissier amateur, créateur de bijoux, artisan local
- **Problem:** N'a pas de vitrine simple pour vendre localement sans frais élevés (type Etsy/Deliveroo)
- **Current Solution:** Groupes Facebook de quartier (désorganisés) ou bouche-à-oreille (lent)
- **Why They'll Switch:** Interface dédiée, flux visuel attractif, gestion simple de catalogue

**2. Le Voisin "Consommateur local"**
- **Who:** Habitants du quartier cherchant des produits locaux et uniques
- **Problem:** Ne sait pas que son voisin à 200m vend des produits incroyables
- **Current Solution:** Hasard, recommandations, groupes Facebook
- **Why They'll Switch:** Découverte visuelle facile, produits à proximité, soutien de l'économie locale

## MVP Features

### Core Features (Must Have) ✅

#### 1. Double Profil (Artisan/Client)
- **Description:** Permet à chaque utilisateur de basculer entre mode consultation (client) et mode gestion (artisan)
- **User Value:** Flexibilité pour être à la fois vendeur et acheteur
- **Success Criteria:** 
  - Utilisateur peut créer un compte avec un des deux profils
  - Basculement transparent entre les modes
  - Interface adaptée selon le profil actif
- **Priority:** Critical

#### 2. Flux Visuel "Insta-Style"
- **Description:** Galerie de photos des produits disponibles avec filtres par catégorie et localisation
- **User Value:** Découverte visuelle et intuitive des créations locales
- **Success Criteria:**
  - Affichage en grille responsive des produits
  - Filtres fonctionnels (catégorie, code postal)
  - Performance d'affichage optimisée
- **Priority:** Critical

#### 3. Gestion de Catalogue CRUD
- **Description:** Interface pour les artisans afin d'ajouter, modifier, supprimer leurs produits
- **User Value:** Contrôle total sur leur vitrine
- **Success Criteria:**
  - Formulaire d'ajout de produit fonctionnel
  - Modification et suppression des produits
  - Upload d'images simple
- **Priority:** Critical

#### 4. Système de Commande Simple
- **Description:** Bouton "Commander" qui enregistre la demande et notifie l'artisan
- **User Value:** Processus d'achat sans friction
- **Success Criteria:**
  - Enregistrement des commandes dans la base
  - Notification à l'artisan
  - Historique des commandes accessible
- **Priority:** Critical

### Future Features (Not in MVP) ⏳
| Feature | Why Wait | Planned For |
|---------|----------|-------------|
| Paiement en ligne (Stripe) | Trop complexe pour une v1 | Version 2 |
| Messagerie instantanée | On utilise téléphone/email pour l'instant | Version 2 |
| Géolocalisation précise sur carte | Code postal suffisant pour démarrer | Version 2 |
| Système de notation | Validation du concept d'abord | Version 2 |

## Success Metrics

### Primary Metrics
1. **Adoption Artisan:** 1 artisan actif avec 3+ produits publiés d'ici 1 mois
   - How to measure: Compte admin dashboard
   - Why it matters: Validation du besoin principal

2. **Commandes Test:** 1 commande test complétée d'ici 1 mois
   - How to measure: Historique des commandes
   - Why it matters: Validation du flux d'achat

### Secondary Metrics
- Utilisateurs inscrits: 10+ d'ici 1 mois
- Temps de chargement des images: < 2 secondes
- Taux de conversion vue → commande: 5%+

## UI/UX Direction

**Design Feel:** Épuré, minimaliste, fond blanc (style Instagram/Apple)  
**Inspiration:** Instagram, Apple, Pinterest

### Key Screens
1. **Home/Feed**
   - Purpose: Découverte des produits locaux
   - Key Elements: Grille photos, filtres, barre de recherche
   - User Actions: Scroll, filtrer, cliquer sur produit

2. **Profil Artisan**
   - Purpose: Vitrine de l'artisan et gestion
   - Key Elements: Photo de profil, description, grille produits
   - User Actions: Voir produits, ajouter/modifier (artisan)

3. **Formulaire Ajout Produit**
   - Purpose: Création de nouvelle fiche produit
   - Key Elements: Upload photo, champs nom/description/prix
   - User Actions: Remplir formulaire, preview, publier

4. **Dashboard Stats**
   - Purpose: Vue d'ensemble pour l'artisan
   - Key Elements: Nombre de produits, commandes, vues
   - User Actions: Consulter statistiques

### Design Principles
- **Mobile First:** Les gens consultent dans la rue ou dans leur cuisine
- **Focus Photo:** L'artisanat se vend par le regard
- **Épuré:** Fond blanc, espaces blancs généreux
- **Intuitif:** Moins de 3 clics pour commander

## Technical Considerations

**Platform:** Web responsive  
**Responsive:** Mobile-first obligatoire  
**Performance Goals:**
- Load time: < 2 secondes
- Affichage images optimisé
- Fonctionne sur connexion 3G

**Security/Privacy:** RGPD simple, protection données personnelles  
**Scalability:** Support 100 utilisateurs sans problème

**Browser/Device Support:**
- Chrome, Safari (mobile focus)
- iOS 14+, Android 10+
- Responsive tablette: Oui

## Constraints & Requirements

### Budget
- Développement outils: 0€/mois (paliers gratuits)
- Hébergement: 0€/mois (Vercel, Supabase)
- Services tiers: 0€/mois
- **Total:** 0€/mois

### Technical Constraints
- Stack imposée: React.js, Tailwind CSS, Node.js, Express
- Base de données: Supabase (PostgreSQL)
- Déploiement: Vercel (Front), Render (Back)
- Images: Cloudinary (palier gratuit)

## MVP Completion Checklist

### Development Complete
- [ ] Inscription/connexion fonctionnelle
- [ ] Double profil opérationnel
- [ ] Flux visuel avec filtres
- [ ] CRUD produits complet
- [ ] Système de commande basique
- [ ] Mobile responsive

### Launch Ready
- [ ] Analytics configuré (simple)
- [ ] Contact/support défini
- [ ] Mentions légales & RGPD
- [ ] Déploiement Vercel/Render fonctionnel

### Quality Checks
- [ ] Test avec ami complet
- [ ] Parcours utilisateur bout en bout validé
- [ ] Performance images acceptable
- [ ] Pas de bugs critiques
