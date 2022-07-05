FROM node:16-alpine as build

WORKDIR /app

# Start command as per package.json

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
COPY ./src ./src
RUN npm install
# build the app
RUN npm run build

FROM build

WORKDIR /app

COPY --from=build /app/dist /app/dist
COPY --from=build /app/package.json ./

CMD ["npm", "start"]