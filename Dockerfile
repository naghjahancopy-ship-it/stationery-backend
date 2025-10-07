# ---------- مرحله Build ----------
FROM node:20-alpine AS builder
WORKDIR /app

# کپی فایل‌های package
COPY package*.json ./

# نصب همه وابستگی‌ها
RUN npm install

# کپی پروژه
COPY . .

# کامپایل TypeScript
RUN npm run build

# ---------- مرحله Run ----------
FROM node:20-alpine
WORKDIR /app

# فقط dependencies لازم برای Run
COPY package*.json ./
RUN npm install --only=prod

# کپی build
COPY --from=builder /app/dist ./dist

# پورت و دستور شروع
EXPOSE 3000
CMD ["node", "dist/index.js"]
