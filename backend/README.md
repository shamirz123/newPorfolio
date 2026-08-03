# Portfolio Backend

Express + MongoDB API for the portfolio admin and project data.

## Setup

1. Install [MongoDB](https://www.mongodb.com/try/download/community) and start it locally.
2. Copy env file and install deps:

```bash
cp .env.example .env
npm install
npm run seed
npm run dev
```

API runs at `http://localhost:5000`.

## Default admin

- Email: `admin@portfolio.com`
- Password: `admin123`

Change these in `.env` before seeding in production.

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/login` | No | Admin login |
| GET | `/api/projects` | No | List projects |
| POST | `/api/projects` | Yes | Create project (multipart) |
| PUT | `/api/projects/:id` | Yes | Update project |
| DELETE | `/api/projects/:id` | Yes | Delete project |
