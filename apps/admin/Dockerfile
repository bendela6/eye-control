FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build:admin

FROM nginx:alpine
WORKDIR /app
COPY --from=builder /app/dist/apps/admin /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
