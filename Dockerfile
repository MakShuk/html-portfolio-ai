# Build stage
FROM node:alpine as builder

WORKDIR /app

# Установка необходимых зависимостей для сборки
RUN apk add --no-cache \
    autoconf \
    automake \
    build-base \
    libtool \
    nasm \
    pkgconfig \
    zlib \
    zlib-dev

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM node:alpine

WORKDIR /app

# Устанавливаем только serve
RUN npm install -g serve

# Копируем только оптимизированные файлы
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/index.html ./dist/

# Создаем непривилегированного пользователя
RUN addgroup -S appgroup && \
    adduser -S appuser -G appgroup && \
    chown -R appuser:appgroup /app

USER appuser

EXPOSE 80

# Запускаем serve
CMD ["serve", "-s", "dist", "-l", "80"]