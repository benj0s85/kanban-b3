# Stratégie CI/CD - Jaydee Kanban

## 1. Objectifs de la CI/CD
La mise en place d'une démarche d'Intégration et de Déploiement Continus (CI/CD) pour l'API Jaydee Kanban répond à trois objectifs majeurs :
**Automatisation :** Supprimer les tâches manuelles répétitives (installation, tests, build) pour gagner du temps.
**Fiabilité :** Éviter l'introduction de régressions en s'assurant que le code fusionné compile et passe tous les tests avec succès.
**Qualité :** Standardiser le processus de mise en production pour garantir que l'environnement final est toujours sain et prédictible.

## 2. Déclencheurs du pipeline (Triggers)
Le pipeline s'exécutera automatiquement lors des événements suivants :
**Pull Request :** À chaque ouverture ou mise à jour d'une PR vers la branche `main` pour vérification avant validation.
**Push :** Lors d'un commit direct ou d'une fusion (merge) sur la branche principale `main`.
**Release :** Lors de la création d'un tag de version (ex: `v1.0.0`) pour déclencher le déploiement en production.

## 3. Étapes principales du pipeline
1. **Setup :** Récupération du code (Checkout) et configuration de l'environnement Node.js version 20.
2. **Installation :** Installation propre des dépendances via `npm ci`.
3. **Tests :** Exécution des tests d'intégration automatisés via `npm test`. Le pipeline s'arrête en cas d'échec].
4. **Build :** Compilation du code TypeScript en JavaScript (`npm run build`).
5. **Déploiement :** Construction de l'image Docker de production et mise à jour de l'environnement.

## 4. Extrait YAML (GitHub Actions)
Voici un exemple simplifié du pipeline d'intégration :

```yaml
name: CI Pipeline Kanban
on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]
jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with: { node-version: '20' }
      - run: npm ci
      - run: npm test
      - run: npm run build
```

## 5. Gestion des secrets et validations avant mise en production
Pour garantir la sécurité de l'application, aucun secret n'est stocké en clair dans le pipeline :
**Gestion des secrets :** Les variables sensibles (`MONGODB_URI`, `JWT_SECRET`) sont stockées de manière chiffrée dans les secrets du dépôt (ex: GitHub Secrets) et injectées dynamiquement lors de l'exécution.
**Validations :** Le déploiement ne peut avoir lieu que si les tests d'intégration sont au vert et après une validation manuelle (revue de code) sur la Pull Request.