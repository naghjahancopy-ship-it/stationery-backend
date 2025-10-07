FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --production=false
COPY . .
RUN npm run build
ENV NODE_ENV=production
CMD ["node","dist/index.js"]