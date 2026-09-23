# Rishikesh Pal — Portfolio (Frontend + Backend separated)

Modern, premium portfolio for **Rishikesh Pal**, Full-Stack Developer & BSE/IT student.  
Dark-first, glassmorphism, Framer Motion, fully responsive.

## Structure

```
PortFolio/
├── frontend/   # Vite + React + TS + Tailwind + Framer Motion
│   ├── src/
│   │   ├── components/  (inline in App.tsx + data-driven)
│   │   ├── data/        projects.ts, skills.ts  (fallback)
│   │   ├── lib/api.ts   axios client -> backend
│   │   └── App.tsx
│   ├── .env.example  -> VITE_API_URL
│   └── package.json
└── backend/    # Node.js + Express + MongoDB + Mongoose
    ├── src/
    │   ├── server.js
    │   ├── config/db.js
    │   ├── data/  projects.js, skills.js
    │   ├── models/Contact.js
    │   ├── routes/ projects.js, skills.js, contact.js, github.js
    │   └── middleware/errorHandler.js
    ├── .env.example
    └── package.json
```

## Frontend — quick start

```bash
cd frontend
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

Env: `frontend/.env`
```
VITE_API_URL=http://localhost:5000
VITE_GITHUB_USERNAME=octocat
```

Frontend works **standalone** — if backend is down it falls back to local `src/data/*`.

## Backend — quick start

```bash
cd backend
npm install
cp .env.example .env   # edit MONGO_URI, FRONTEND_URL, GITHUB_TOKEN
npm run dev            # http://localhost:5000 (nodemon)
npm start              # production
```

### API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Info |
| GET | `/api/health` | Health check |
| GET | `/api/projects?filter=AI&search=kitchen` | List projects |
| GET | `/api/projects/:id` | Single project |
| GET | `/api/skills` | All skill groups + learning |
| POST | `/api/contact` | Submit contact form (validated) |
| GET | `/api/github/repos?username=octocat` | Proxy to GitHub API |
| GET | `/api/github/profile?username=octocat` | GitHub profile |

Contact validates with `validator`, saves to MongoDB if `MONGO_URI` set, otherwise logs to console — portfolio still runs without DB.

## Monorepo (root)

```bash
npm install              # installs concurrently
npm run install:all
npm run dev              # runs frontend+backend together
npm run dev:frontend
npm run dev:backend
```

Requires Node >=18.

## Deploy

- **Frontend:** Vercel / Netlify (`frontend/dist`)
- **Backend:** Render / Railway / Fly.io — set `MONGO_URI`, `FRONTEND_URL` env.

## Features (all 16 sections)

Hero, Stats, About, Skills, Projects + filters + modal, Journey timeline, Problem Solving, Philosophy, Currently Learning, Experience, GitHub, Resume CTA, Contact (validated + toast), Footer — plus theme toggle, smooth scroll, animated cursor, page transitions.

