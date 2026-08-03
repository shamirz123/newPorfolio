# Shahmeer Zubair — Portfolio

Dynamic portfolio with a React frontend and Express + MongoDB backend. Add and manage projects from an admin panel — no code edits required.

## Structure

```
portfolio/
├── frontend/   # React + Vite portfolio + admin UI
└── backend/    # Express API + MongoDB
```

## Prerequisites

- Node.js 18+
- MongoDB (local install **or** free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster)

If you use Atlas, put your connection string in `backend/.env`:

```
MONGODB_URI=mongodb+srv://USER:PASS@cluster.mongodb.net/portfolio
```

## Setup

### 1. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev
```

API: `http://localhost:5000`

Default admin login:

- Email: `admin@portfolio.com`
- Password: `admin123`

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Site: `http://localhost:3003`  
Admin: `http://localhost:3003/admin/login`

## Admin features

- Login with JWT
- Add project (name, description, image, optional subtitle / URLs / tech)
- Edit and delete projects
- Uploaded images stored in `backend/uploads`

## Environment

Backend `.env`:

| Variable | Purpose |
|----------|---------|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Token signing secret |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Seeded admin credentials |
| `CLIENT_URL` | Frontend origin(s) for CORS (comma-separated OK) |
| `PORT` | API port (default `5000`) |

Frontend (Vercel / production build):

| Variable | Purpose |
|----------|---------|
| `VITE_API_URL` | Full backend URL, e.g. `https://your-api.onrender.com` |

## Deploy (Vercel + Render)

Before, one Vite folder could go entirely on Vercel. Now you have an API + image uploads, so deploy in **two parts**:

| Piece | Host | Why |
|-------|------|-----|
| `frontend/` | **Vercel** | Static React site |
| `backend/` | **Render** (or Railway) | Express + MongoDB + file uploads need a real Node server |

Vercel alone is a poor fit for this backend: local `uploads/` files do not persist on serverless.

### 1) Deploy backend on Render

1. Push this repo to GitHub.
2. [Render](https://render.com) → **New → Web Service** → select the repo.
3. Settings:
   - **Root Directory:** `backend`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Environment variables:

```
MONGODB_URI=mongodb+srv://...your atlas uri.../portfolio?retryWrites=true&w=majority
JWT_SECRET=a-long-random-secret
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=your-strong-password
CLIENT_URL=https://your-frontend.vercel.app
```

5. After first deploy, open the Render **Shell** (or one-off job) and run:

```bash
npm run seed
```

6. Copy your API URL, e.g. `https://portfolio-api-xxxx.onrender.com`

### 2) Deploy frontend on Vercel

1. [Vercel](https://vercel.com) → **Add New Project** → import the same repo.
2. Project settings:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Environment variable:

```
VITE_API_URL=https://portfolio-api-xxxx.onrender.com
```

(no trailing slash)

4. Deploy. Then go back to Render and set `CLIENT_URL` to your real Vercel URL (and redeploy backend if needed).

### 3) Admin after deploy

- Site: `https://your-frontend.vercel.app`
- Admin: `https://your-frontend.vercel.app/admin/login`

### Notes

- Free Render services **sleep** after idle time; the first API request can be slow (~30–60s).
- Uploaded project images live on the backend host (`/uploads/...`). Seeded images that use `/assets/img/...` still load from the Vercel frontend `public` folder.
- If you change `ADMIN_PASSWORD` in env after seeding, update the user in MongoDB or delete the `users` collection and run `npm run seed` again.
