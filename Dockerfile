# ==========================================
# Stage 1: Builder - Compilation TypeScript
# ==========================================
FROM node:20-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY backend/package*.json ./

# Installation de toutes les dépendances (dev inclus pour build)
RUN npm ci --only=production=false

# Copier tout le code source
COPY backend/ ./

# Build de l'application NestJS
RUN npm run build

# Nettoyer les devDependencies
RUN npm prune --production

# ==========================================
# Stage 2: Production - Image finale légère
# ==========================================
FROM node:20-alpine AS production

# Installer curl pour health checks
RUN apk add --no-cache curl

# Créer un utilisateur non-root pour la sécurité
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001 -G nodejs

# Définir le répertoire de travail
WORKDIR /app

# Copier node_modules et code compilé depuis builder
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/package*.json ./

# Variables d'environnement par défaut
ENV NODE_ENV=production \
    PORT=3000 \
    TZ=Africa/Nairobi

# Exposer le port de l'application
EXPOSE 3000

# Basculer vers l'utilisateur non-root
USER nestjs

# Health check pour Kubernetes
HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Commande de démarrage
CMD ["node", "dist/main.js"]
