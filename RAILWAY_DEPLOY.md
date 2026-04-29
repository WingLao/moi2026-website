# Railway deployment notes for MOI2026 Website

## Short verdict

Railway is **good for the web app, PostgreSQL, and Redis**.

Railway is **not the ideal place for the judge runner** if you plan to let students submit arbitrary code for long-term practice. The current worker is a host-run executor (`g++` / `python3`) without strong sandboxing. That is acceptable for MVP / internal testing, but not the best long-term production design for public student practice.

## Recommended architecture

### Option A — Best balanced setup
- Railway service 1: **web app**
- Railway service 2: **PostgreSQL**
- Railway service 3: **Redis**
- Separate VPS / private worker host: **judge worker**
- Shared data root: synced problem PDFs + testcase files

This keeps the student-facing site easy to host while moving code execution to a machine you control more tightly.

### Option B — All on Railway (MVP only)
- Railway web app
- Railway PostgreSQL
- Railway Redis
- Railway worker service
- Problem PDFs + testcases committed into the repo or mounted in the image

Use this only for small-scale testing or internal use.

## Current project constraints
- Uses Next.js + Prisma + PostgreSQL + Redis + BullMQ
- Current judge worker runs `g++` and `python3` directly
- Current data import depends on a `JUDGE_DATA_ROOT`
- Problem PDFs and testcase data must be available in the deploy environment

## Required environment variables
- `DATABASE_URL`
- `REDIS_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `JUDGE_DATA_ROOT`

Example on Railway:
- `NEXTAUTH_URL=https://your-app.up.railway.app`
- `JUDGE_DATA_ROOT=/app`

If you deploy only the `app/` repo, make sure the parent data/PDF files are included or copied into the image/repo layout that matches `JUDGE_DATA_ROOT`.

## Recommended Railway services

### Web service
Build command:
```bash
npm install && npm run prisma:generate && npm run build
```

Start command:
```bash
npm run start
```

### Worker service
Build command:
```bash
npm install && npm run prisma:generate
```

Start command:
```bash
npm run worker
```

## Data strategy

For production / long-term student practice:
- Store relational data in PostgreSQL
- Keep problem/testcase files versioned and mounted with a stable root
- Prefer object storage or a controlled filesystem instead of relying on Railway ephemeral runtime state

## Practical recommendation

If your goal is:
- students doing regular practice
- you tracking progress over time
- future scaling and safer judge execution

Then the best path is:
1. Deploy **web + DB + Redis** on Railway
2. Run the **judge worker on a VPS**
3. Move problem/testcase assets to a stable managed location
4. Later add stronger sandboxing for code execution
