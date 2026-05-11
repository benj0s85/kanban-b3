# Note de Sécurité - Jaydee Kanban

## 1. Identification des risques techniques
Lors de l'analyse de l'API Kanban, deux risques majeurs de sécurité ont été identifiés :
1. **Abus d'API et Déni de service (DoS) :** Sans limitation, un attaquant ou un bot malveillant peut envoyer des milliers de requêtes par seconde pour saturer le serveur ou tenter des attaques par force brute sur la route de connexion.
2. **Accès non autorisé aux ressources :** Les endpoints de modification (création, déplacement, suppression) manipulent des données sensibles. Une faille dans la gestion des sessions ou l'absence de vérification des tokens permettrait à un utilisateur anonyme d'altérer la base de données Kanban.

## 2. Mesures de sécurité implémentées
Pour pallier ces vulnérabilités, les actions suivantes ont été mises en place :
* **Limitation du trafic (Rate Limiting) :** Le middleware `express-rate-limit` a été intégré et activé de manière globale sur les routes `/api` dans `src/app.ts`. Il limite les requêtes à 100 par IP toutes les 15 minutes.
* **Protection des routes (Authentification) :** Un middleware d'authentification vérifie la présence et la validité d'un token JWT. Comme vérifié lors des tests, l'accès à une route protégée (ex: `POST /api/columns`) sans token valide renvoie strictement un code HTTP `401 Unauthorized`.

## 3. Limites des mesures actuelles
Ces protections offrent une première ligne de défense robuste, mais présentent certaines limites :
* Le Rate Limiting se base sur l'adresse IP. Un attaquant utilisant un réseau de botnets distribués (DDoS) ou changeant d'IP via un VPN pourra contourner cette limite.
* L'application manque de protection sur les en-têtes HTTP (qui pourrait être ajoutée avec la librairie `helmet` pour bloquer le Cross-Site Scripting).