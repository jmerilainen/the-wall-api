# Base image
FROM node:16-alpine as base

# Install all dependencies
FROM base as deps

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

# Prune dev dependencies to get production dependencies
FROM base as production-deps

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
ADD package.json ./
ADD package-lock.json ./

RUN npm prune --omit=dev

# Build with dev dependencies
FROM base as build

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

ADD package.json ./
ADD package-lock.json ./
COPY tsconfig.json ./
COPY ./src ./src

RUN npm run build

# Start app with only production dependencies
FROM base

ENV NODE_ENV=production

WORKDIR /app

COPY --from=production-deps /app/node_modules ./node_modules
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package.json ./

CMD ["npm", "start"]
