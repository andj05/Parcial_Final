# Etapa 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Etapa 2: Producción
FROM node:18-alpine

WORKDIR /app

# Establecer variables de entorno
ENV NODE_ENV=production
ENV PORT=3000

# Copiar dependencias desde builder
COPY --from=builder /app/node_modules ./node_modules

# Copiar archivos de la aplicación
COPY app.js .
COPY package*.json ./

# Crear usuario no-root por seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

USER nodejs

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

EXPOSE 3000

CMD ["node", "app.js"]