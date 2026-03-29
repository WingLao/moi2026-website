FROM node:20-slim

# Install g++ and python3 for C++ compilation in judge worker
RUN apt-get update && apt-get install -y \
    g++ \
        python3 \
            --no-install-recommends \
              && rm -rf /var/lib/apt/lists/*

              WORKDIR /app

              # Copy package files
              COPY package*.json ./
              COPY prisma ./prisma/

              # Install all deps (including devDeps for tsx/prisma CLI)
              RUN npm ci

              # Copy source
              COPY . .

              # Build Next.js
              RUN npm run build

              EXPOSE 8080

              CMD ["sh", "-c", "npm run db:bootstrap && (npm run worker & npm start)"]
