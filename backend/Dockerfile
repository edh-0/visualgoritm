FROM node:18-alpine

WORKDIR /app

# Копируем зависимости
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем исходный код
COPY src ./src

# Открываем порт
EXPOSE 5000

# Команда запуска
CMD ["npm", "run", "dev"]