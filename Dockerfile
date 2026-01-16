# ==========================================
# Stage 1: Builder
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copie des fichiers de dépendances (depuis le dossier backend vers la racine du container)
COPY backend/package*.json ./

# Installation des dépendances
RUN npm ci

# Copie du reste du code source
COPY backend/ ./

# Compilation
RUN npm run build
RUN npm prune --production

# ==========================================
# Stage 2: Production
# ==========================================
FROM node:20-alpine AS production

# Outils système minimaux
RUN apk add --no-cache curl

# Sécurité (utilisateur non-root)
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001 -G nodejs

WORKDIR /app

# COPIE CRITIQUE : On prend les fichiers depuis le builder
# Le builder a tout mis dans /app, donc on récupère depuis /app
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/package*.json ./

# Variables d'environnement
ENV NODE_ENV=production \
    PORT=3000 \
    TZ=Africa/Nairobi

EXPOSE 3000

USER nestjs

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Démarrage
CMD ["node", "dist/main.js"]
