# Une Le Monde - Agrégateur d'articles du journal Le Monde

Une application web qui récupère et affiche les articles de la une du journal Le Monde à partir de leur flux RSS. L'application est construite avec Laravel 12 pour le backend et React 19 pour le frontend.

## 🚀 Technologies utilisées

### Backend
- **Laravel 12** - Framework PHP moderne
- **MySQL** - Base de données relationnelle
- **SimpleXML** - Bibliothèque PHP pour parser le flux XML

### Frontend
- **React 19** - Bibliothèque JavaScript pour construire des interfaces utilisateur
- **TypeScript** - Superset typé de JavaScript
- **Vite** - Outil de build ultra-rapide
- **TailwindCSS** - Framework CSS utilitaire
- **React Query** - Bibliothèque pour la gestion des états et des requêtes API
- **React Router** - Routage côté client

## 📋 Prérequis

- PHP 8.2 ou supérieur
- Composer 2
- Node.js 18 ou supérieur
- npm ou yarn
- MySQL 8.0 ou supérieur

## 🔧 Installation et lancement

### 1. Cloner le dépôt

```bash
git clone https://github.com/creasitenet/lemonde_headlines_laravel_react.git
cd une_lemonde_laravel_react
```

### 2. Installer les dépendances backend

```bash
# Installation des dépendances PHP avec Composer
composer install
```

### 3. Configurer l'environnement

Copiez le fichier `.env.example` en `.env` et modifiez les variables selon votre configuration :

```bash
# Créer le fichier .env
cp .env.example .env

# Générer la clé d'application
php artisan key:generate
```

Modifiez le fichier `.env` pour configurer la connexion à la base de données :

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=une_lemonde
DB_USERNAME=root
DB_PASSWORD=
```

### 4. Créer la base de données et exécuter les migrations

```bash
# Créer la base de données
php artisan db:create

# Exécuter les migrations
php artisan migrate
```

### 5. Installer les dépendances frontend

```bash
# Installer les dépendances avec npm
npm install
# ou avec yarn
yarn install
```

### 6. Lancer l'application

#### Backend (Laravel)

```bash
# Démarrer le serveur de développement Laravel
php artisan serve
```

#### Frontend (Vite)

```bash
# Dans un autre terminal, démarrer le serveur de développement Vite
npm run dev
# ou
yarn dev
```

L'application sera accessible à l'adresse `http://localhost:8000`.

## 📝 Scripts disponibles

### Backend (Laravel)

- `php artisan serve` : Démarre le serveur de développement Laravel
- `php artisan migrate` : Exécute les migrations de base de données
- `php artisan db:seed` : Remplit la base de données avec des données de test
- `php artisan route:list` : Affiche toutes les routes disponibles
- `php artisan api:sync` : Synchronise manuellement les articles depuis le flux RSS du Monde

### Frontend (React)

- `npm run dev` / `yarn dev` : Lance le serveur de développement Vite
- `npm run build` / `yarn build` : Compile l'application pour la production
- `npm run lint` / `yarn lint` : Exécute ESLint pour analyser le code

## 🌟 Fonctionnalités

- **Synchronisation automatique** : Les articles sont automatiquement synchronisés depuis le flux RSS du Monde toutes les 24 heures
- **Recherche d'articles** : Recherche par mots-clés dans les titres et descriptions
- **Pagination** : Navigation facile à travers les articles
- **Affichage détaillé** : Vue détaillée de chaque article avec image et contenu
- **Interface responsive** : S'adapte à tous les appareils (desktop, tablette, mobile)

## 🏗️ Structure du projet

### Backend (Laravel)

- `/app/Http/Controllers/Api` : Contrôleurs API pour les articles
- `/app/Models` : Modèles de données (Article)
- `/app/Services` : Services pour la récupération et le traitement des données (LeMondeService, ArticleService)
- `/database/migrations` : Migrations de base de données
- `/routes/api.php` : Définition des routes API

### Frontend (React)

- `/resources/js/components` : Composants React réutilisables
- `/resources/js/pages` : Composants de pages (Home, Article)
- `/resources/js/services` : Services pour les appels API
- `/resources/js/stores` : Gestion de l'état global avec Zustand
- `/resources/js/types` : Définitions de types TypeScript

## 🚧 Fonctionnalités à venir

- **Système de favoris** : Permettre aux utilisateurs de marquer des articles comme favoris
- **Catégorisation** : Filtrer les articles par catégorie
- **Mode hors ligne** : Accéder aux articles précédemment chargés sans connexion internet
- **Notifications** : Alerter les utilisateurs des nouveaux articles importants
- **Partage social** : Partager les articles sur les réseaux sociaux

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.
