# MOI2026 Website MVP

## Stack
- Next.js App Router
- PostgreSQL + Prisma
- NextAuth credentials login
- Redis + BullMQ judge queue
- Host-run local judge adapter (`g++` / `python3`)

## Important limitation
Docker is unavailable on this host, so this MVP does **not** claim full sandbox isolation. The judge is intentionally kept behind a worker/adapter boundary so it can later be swapped for a containerized or stronger sandbox runner.

## Current data issues
- `J-exchange.pdf` is mapped to problem slug `j-exchange` and data dir `data/J/exchange`.
- `data/S/climb/climb-0.in` is missing matching `climb-0.out`; importer marks that testcase invalid and stores a warning in DB.
- `.DS_Store` files in the data tree are ignored.

## Local setup
### 1) Environment
Copy `.env.example` to `.env`.

Default `.env` values expect:
- PostgreSQL on `localhost:5432`
- Redis on `localhost:6379`
- data root at `/Users/macbook/Desktop/MOI2026_website/app`

### 2) Start services on this Mac
If PostgreSQL/Redis are not installed yet:
```bash
brew install postgresql@16 redis
brew services start postgresql@16
brew services start redis
```

Create/update the local DB role + database expected by `.env`:
```bash
export PATH="/opt/homebrew/opt/postgresql@16/bin:$PATH"
psql -d postgres -c "DO \$\$ BEGIN IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname='postgres') THEN CREATE ROLE postgres LOGIN SUPERUSER PASSWORD 'postgres'; ELSE ALTER ROLE postgres WITH LOGIN SUPERUSER PASSWORD 'postgres'; END IF; END \$\$;"
createdb moi2026 2>/dev/null || true
psql -d postgres -c "ALTER DATABASE moi2026 OWNER TO postgres;"
```

### 3) Initialize app data
From `app/`:
```bash
npm install
npm run db:init
```

That will:
- generate Prisma client
- run Prisma migration(s)
- seed accounts
- import problems + testcases

### 4) Run app + worker
Terminal 1:
```bash
npm run dev
```

Terminal 2:
```bash
npm run worker
```

Open: <http://localhost:3000>

## Seed accounts
- `admin` / `Admin@MOI2026`
- `moi01` ~ `moi30` / `MOI2026-01` ~ `MOI2026-30`

## Main pages available
- `/login`
- `/problems`
- `/problems/[slug]`
- `/submissions`
- `/submissions/[id]`
- `/leaderboard`
- `/admin`
- `/admin/problems`
- `/admin/submissions`
- `/admin/users`

## Admin user tools
Inside `/admin/users`, an authenticated `ADMIN` can:
- manually create a new user account
- choose `STUDENT` or `ADMIN`
- set whether the user must change password on first login
- upload a `Name.csv` file to map `E-mail` -> `User.name`

Expected CSV headers:
```csv
Name,E-mail
陳大文,student@example.com
```

If the database connection is healthy, importing names from the page updates existing users immediately.

## Scripts
- `npm run prisma:generate`
- `npm run prisma:migrate`
- `npm run db:init`
- `npm run seed`
- `npm run import:problems`
- `npm run audit:data`
- `npm run worker`
- `npm run sync:user-names -- /absolute/path/to/Name.csv`

## Scoring rules
- Every problem is worth 100 points.
- Testcases evenly split the 100 points; any remainder goes to earlier cases.
- Unlimited submissions.
- Highest score per problem counts on the leaderboard.
- Tie-break uses the earliest recorded time the counted score was reached.

## Practical local test procedure
1. Log in with `admin`.
2. Open `/problems` and verify all 9 problems are listed.
3. Open a problem detail page and submit code.
4. Check `/submissions/[id]` for status / testcase results.
5. Check `/leaderboard` after creating student submissions.
6. Open `/admin/users` and verify manual user creation works.
7. Open `/admin/users` and upload `Name.csv` to verify name import.
8. Check `/admin/*` pages as admin.

### Tested on this host
- `npm run lint` ✅
- `npm run build` ✅
- `npm run db:init` ✅
- login via browser as `admin` ✅
- problem import into PostgreSQL ✅
- submission creation + queue handoff to BullMQ worker ✅
- worker judging of Python submission ✅ (finished with score 0 / WA)
- worker handling of C++ compile error ✅
- admin user-management UI for create/import added ✅

### Notes from testing
- The default C++ template on the problem page originally used `#include <bits/stdc++.h>`, which fails with the host compiler toolchain on this Mac; compile-error handling was verified through that path.
- A Python submission (`print('hello')`) was judged successfully by the worker and stored testcase results.
- `s-climb` remains partially invalid because source data is missing one output file.

## Known incomplete items
- Statement PDF rendering/extraction into HTML is not implemented; pages currently show metadata only.
- No hardened sandbox/isolation yet; host-run execution is for MVP/local testing only.
- Admin UI is still lightweight, but student progress overview plus manual user creation / name import are available.
- No polished contest rules, rate limiting, or production hardening yet.

## Railway deployment note
A Railway deployment is feasible for the web app, PostgreSQL, and Redis.
For long-term student practice, the safer recommendation is:
- Railway for web + DB + Redis
- separate worker host / VPS for judging

See `RAILWAY_DEPLOY.md` for the deployment recommendation and service split.
