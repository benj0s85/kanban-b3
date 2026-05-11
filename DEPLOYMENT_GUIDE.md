# Guide de Déploiement - Jaydee Kanban

## 1. Prérequis techniques
Pour assurer le bon fonctionnement de l'application, les éléments suivants doivent être présents sur votre machine ou votre serveur :
* **Node.js** : Version 20 (LTS) ou supérieure.
* **Docker & Docker Compose** : Recommandés pour un environnement isolé et reproductible.
* **Git** : Pour récupérer et mettre à jour le code source.
* **Variables d'environnement :**
Un fichier `.env` doit être créé à la racine du projet, en se basant sur le fichier `.env.example` (s'il existe), avec au minimum les variables suivantes :
* `PORT` : Port d'écoute de l'API (ex: 3000).
* `MONGODB_URI` : URL de connexion à la base de données MongoDB.
* `JWT_SECRET` : Clé secrète pour générer les tokens d'authentification.

---

## 2. Procédure d'installation et d'exécution
### A. Configuration (Environnement)
Créez un fichier .env à la racine du projet :
 ```bash
    NODE_ENV=development
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/visiplus
    JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long
    JWT_EXPIRES_IN=7d
    CORS_ORIGIN=*
 ```

### B. Exécution en local (Sans Docker)
```bash
    npm install

    # Démarrer en mode développement
    npm run dev

    # Lancer en mode production
    npm run build
    npm start
```

### C. Exécution avec Docker (Recommandé)
Cette commande lance l'API et la base de données MongoDB simultanément :

```bash
    # Démarrer les services
    docker-compose up -d --build

    # Arrêter les services
    docker-compose down
```

## 3. Tests
L'application utilise Vitest et Supertest pour les tests d'intégration.
```bash
    # Exécuter tous les tests
    npm test

    # Exécuter en mode watch
    npm test -- --watch
```
Les tests utilisent une instance MongoDB en mémoire (mongodb-memory-server), aucune installation de base de données n'est requise pour les tests.

## 4. Procédure de mise à jour
Pour mettre à jour l'application vers la dernière version stable :

### A. Mise à jour (Sans Docker)
Récupération du code source

```bash
    git pull origin main
    npm install

    # Démarrer en mode développement
    npm run dev

    # Lancer en mode production
    npm run build
    npm start
```

### B. Mise à jour (Avec Docker)
Récupération du code sources

```bash
    # Reconstruction de la nouvelle image
    docker-compose up -d --build
```