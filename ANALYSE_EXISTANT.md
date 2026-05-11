# Analyse de l'existant - Jaydee Kanban

## 1. Structure du projet et dépendances
L'application Jaydee Kanban est une API REST développée en Node.js avec TypeScript, structurée autour du framework Express et connectée à une base de données MongoDB. L'architecture suit une logique MVC (Models, Controllers, Routes).

**Dépendances principales :**
* **Express** : Framework utilisé pour la création du serveur et la gestion des routes.
* **Mongoose** : Utilisé pour la modélisation objet et les interactions avec MongoDB.
* **Zod** : Utilisé pour la validation stricte des données entrantes (présent dans `src/middlewares/validate.middleware.ts`).
* **Pino** : Système de log performant utilisé pour tracer l'activité du serveur (`src/config/logger.ts`).
* **Vitest / Supertest** : Stack technique prévue pour les tests automatisés (`vitest.config.ts`).

**Variables d'environnement clés (.env) :**
* `PORT` : Port d'écoute du serveur Node.js.
* `MONGODB_URI` : Chaîne de connexion à la base de données.
* `JWT_SECRET` et `JWT_EXPIRES_IN` : Clé et durée de validité pour la gestion de l'authentification par token.
* `CORS_ORIGIN` : Gère l'autorisation des domaines pouvant interroger l'API.

**Fichiers et dossiers clés :**
* `src/main.ts`, `server.ts`, `app.ts` : Points d'entrée de l'application.
* `src/middlewares/` : Contient la logique d'authentification (`auth.middleware.ts`) et de gestion d'erreurs.
* `src/routes/` et `src/controllers/` : Gèrent la logique métier des entités (Ordres de Fabrication, Colonnes, Utilisateurs).

## 2. Risques et anomalies constatés
L'analyse de la base de code actuelle permet d'identifier plusieurs points d'attention avant la mise en production :

* **Couverture de tests incomplète :** L'arborescence prévoit un dossier `tests/`, mais les tests d'intégration pour les routes des colonnes (`GET /api/columns`, `POST /api/columns`) doivent être implémentés pour éviter des régressions métiers.
* **Absence de protection :** Le dossier `src/middlewares/` ne contient pas de middleware pour sécuriser les en-têtes HTTP ou limiter le trafic entrant. L'API est donc vulnérable aux attaques DDoS et à diverses failles Web.
* **Dépendance à l'environnement d'exécution :** Il n'y a pour le moment aucun `Dockerfile` à la racine. Le projet repose sur un lancement via `npm run dev` ou `npm start` directement sur la machine.

## 3. Priorités avant mise en production
1. **Fiabilisation technique :** Créer les tests d'intégration dans `tests/columns.test.ts` (avec Vitest) pour vérifier la structure JSON et les retours HTTP de l'API.
2. **Docker :** Isoler l'application en rédigeant un `Dockerfile` optimisé pour Node.js afin de figer l'environnement de production.
3. **Sécurisation de l'API :** Implémenter des bibliothèques de sécurité comme `helmet` (protection des en-têtes) ou `express-rate-limit` dans `app.ts`.
4. **Mise en place d'une CI/CD :** Définir une stratégie automatisée pour vérifier le code (tests, build) à chaque nouvelle modification avant le déploiement.