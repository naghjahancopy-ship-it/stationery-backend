# Stationery Accounting - Backend Core (Node + TypeScript)

This scaffold implements the backend core for a stationery + services accounting system.
It includes:
- Express + TypeORM + PostgreSQL
- JWT auth (register/login)
- Product & Service CRUD
- Sales creation (reduces stock and logs inventory)
- Docker & docker-compose example
- Simple controllers and routes to get started

## Quick start (local with Docker)

1. Copy `.env.example` to `.env` and edit values if needed.
2. Start services:
   ```bash
   docker compose up --build
   ```
3. The API will be available at `http://localhost:3000`.
   - `POST /api/auth/register` to create user
   - `POST /api/auth/login` to login and get access token
   - Use `Authorization: Bearer <token>` header for protected endpoints

## Deploying to Render / Cloud
- Push this repo to GitHub.
- On Render, create a new Web Service and connect the GitHub repo.
- Set environment variables (DATABASE_URL, JWT_SECRET, NODE_ENV).
- Create a managed Postgres instance on Render and set DATABASE_URL accordingly.
- Deploy; Render will build and run the service.

Notes:
- For production, create TypeORM migrations and set `synchronize: false` in ormconfig.
- Replace JWT_SECRET with a strong secret and manage env vars securely.