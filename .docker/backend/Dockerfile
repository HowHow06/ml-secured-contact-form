FROM node:18-slim AS base

FROM base AS deps
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY ./backend/package.json ./backend/yarn.lock* ./backend/package-lock.json* ./backend/pnpm-lock.yaml* ./
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY ./backend/. .

# No need to build

FROM base AS runner
WORKDIR /app

# Assuming your source code is already copied and npm install is done
COPY --from=builder /app .

# Copy entrypoint script
COPY ./.docker/backend/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENV NODE_ENV=production

EXPOSE 8000

# Use the entrypoint script
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
