# ---------- مرحله Build ----------
FROM node:20-alpine AS builder
WORKDIR /app

# کپی فایل package.json و package-lock.json
COPY package*.json ./

# نصب وابستگی‌ها
RUN npm install

# کپی کل پروژه
COPY . .

# کامپایل TypeScript
RUN npm run build

# ---------- مرحله Run ----------
FROM node:20-alpine
WORKDIR /app

# کپی فقط dependencies و build
COPY package*.json ./
RUN npm install --only=prod
COPY --from=builder /app/dist ./dist

# Port و CMD
EXPOSE 3000
CMD ["node", "dist/index.js"]
