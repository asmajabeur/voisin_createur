# 💻 Technique - Voisin Créateur App

Ce dossier contient l'interface utilisateur et la logique métier de l'application Voisin Créateur.

## 🛠️ Pré-requis
- Node.js 20+
- Un projet [Supabase](https://supabase.com/) actif.
- Un compte [Cloudinary](https://cloudinary.com/) pour la gestion des images.

## ⚙️ Configuration
1. Clonez le dépôt GitHub.
2. Allez dans le dossier `voisin-createur`.
3. Créez un fichier `.env.local` basé sur le modèle suivant :

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=votre_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon
SUPABASE_SERVICE_ROLE_KEY=votre_cle_service_role

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=votre_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=votre_preset

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🚀 Développement
Installez les dépendances et lancez le serveur de développement :

```bash
npm install
npm run dev
```

## 🏗️ Build de Production
Le projet est configuré pour un build strict (ESLint + TypeScript) afin de garantir la qualité du code.

```bash
npm run build
```

## 🌍 Déploiement sur Vercel
Le déploiement est automatisé via GitHub. 
**Important** : Sur Vercel, n'oubliez pas de configurer le **Root Directory** sur `voisin-createur` et d'ajouter toutes les variables d'environnement listées ci-dessus.

---
*Note : Le script `prepare` ignore Husky pendant le build de production pour éviter les erreurs de dossier `.git` sur Vercel.*
