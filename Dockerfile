FROM node:16-alpine as build

WORKDIR /app

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm install

# Build the app
COPY tsconfig.json ./
COPY ./src ./src

RUN npm run build

FROM build

# Use only builded files in final container

WORKDIR /app

COPY --from=build /app/dist /app/dist
COPY --from=build /app/package.json ./

CMD ["npm", "start"]