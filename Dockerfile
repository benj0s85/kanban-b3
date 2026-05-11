# Utilisation d'une image Node.js
FROM node:20-alpine
# Définition du répertoire de travail dans le conteneur
WORKDIR /app
# Copie des fichiers de configuration
COPY package*.json ./
# Installation des dépendances
RUN npm install
# Copie de tout le code source
COPY . .
# Compilation du code TypeScript en JavaScript
RUN npm run build
# Exposition du port utilisé par l'API
EXPOSE 3000
# Commande de lancement du serveur
CMD ["npm", "start"]