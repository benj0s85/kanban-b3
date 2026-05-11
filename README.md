# Jaydee Kanban - API de gestion de production

## 1. Présentation du projet et contexte
L'entreprise **Jaydee**, spécialisée dans la fabrication de pièces plastiques par injection, a développé l'application **Jaydee Kanban** pour améliorer le suivi de sa production et la gestion de ses priorités. 

Ce projet est une API REST Node.js / Express connectée à une base de données MongoDB. L'objectif de ce dépôt est de fournir une version préparée pour une mise en production sécurisée, testable et reproductible.

## 2. Choix techniques et architecture
* **Backend :** Node.js avec Express (TypeScript).
* **Base de données :** MongoDB (modélisation via Mongoose).
* **Qualité & Tests :** Tests d'intégration automatisés avec Vitest et Supertest sur une base de données en mémoire (MongoDB Memory Server).
* **Déploiement :** Conteneurisation complète avec Docker et Docker Compose.
* **CI/CD :** Pipeline d'intégration continue configuré via GitHub Actions (voir `CI_CD_STRATEGIE.md`).

## 3. Mesures de sécurité appliquées
Pour garantir la protection de l'API contre les cyberattaques courantes :
* **Limitation de trafic (Rate Limiting) :** Le middleware `express-rate-limit` restreint les appels à 100 requêtes par tranche de 15 minutes par IP, prévenant ainsi les attaques par déni de service (DDoS) ou par force brute.
* **Authentification :** Les routes sensibles sont protégées par un middleware exigeant un token JWT valide.
* **Gestion des secrets :** Aucune variable sensible n'est versionnée dans le code source (utilisation systématique de fichiers `.env` et de secrets de pipeline).

## 4. Étapes d'installation et d'exécution

### Prérequis
* Node.js (v20+)
* Docker et Docker Compose
* Fichier `.env` configuré à la racine :
  ```env
  PORT=3000
  MONGODB_URI=mongodb://localhost:27017/visiplus
  JWT_SECRET=votre_super_secret_jwt_32_chars
  NODE_ENV=production
  ```

### Lancement avec Docker (Recommandé)
Démarre l'API et la base de données simultanément dans des conteneurs isolés :
```bash
docker-compose up -d --build
```
L'API est accessible sur `http://localhost:3000`.

### Lancement en local (Sans Docker)
```bash
npm install
npm run build
npm start
```

### Exécution des tests automatisés
```bash
npm test
```

## 5. Auteurs et Version
* **Version :** 1.0.0
* **Auteur :** Benjamin FOUCHE - Concepteur Développeur d'Applications
