# ---------- مرحله Build ----------
FROM node:18-alpine AS builder

# پوشه کاری داخل کانتینر
WORKDIR /app

# فایل‌های package برای نصب dependency‌ها
COPY package*.json ./

# نصب پکیج‌ها
RUN npm install

# کپی کل سورس پروژه
COPY . .

# کامپایل TypeScript به JavaScript
RUN npx tsc

# ---------- مرحله Run ----------
FROM node:18-alpine

WORKDIR /app

# فقط فایل‌های نهایی build شده و package.json را منتقل کن
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# نصب فقط dependencyهای لازم برای اجرا
RUN npm install --omit=dev

# باز کردن پورت 3000 برای Render
EXPOSE 3000

# فرمان اجرای سرور
CMD ["node", "dist/index.js"]
