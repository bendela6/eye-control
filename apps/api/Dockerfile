FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app /app
COPY . /app
RUN npm run build:api

CMD ["node", "dist/apps/api/main.js"]
