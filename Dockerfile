FROM node:16-alpine

EXPOSE 8080

ENV \
    DB_HOST='' \
    DB_USER='' \
    DB_NAME='' \
    DB_PASSWORD='' \
    DB_PORT=''

WORKDIR /app
ADD . ./

# Start command as per package.json

# Install app dependencies
COPY package.json ./
COPY ./src ./src
RUN npm install
# build the app
RUN npm run build

CMD ["npm", "start"]