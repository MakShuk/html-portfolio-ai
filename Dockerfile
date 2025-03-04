# Используем официальный образ Node.js
FROM node:20-alpine

# Создаем директорию приложения
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код приложения
COPY . .

# Открываем порт 80
EXPOSE 80

# Запускаем приложение
CMD ["npm", "start"]