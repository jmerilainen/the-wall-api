# the-wall-api

This is a example of Node REST API built from scratch and with no dependecies (except `node-postgres`).

**Strucutre**

`src/server` contains logic for server and simple router.

`src/models` interacts with postgress database models.

`src/controllers` http controllers for routes.

## Quick install

Run

```sh
$ docker-compose -f docker-compose.local.yml up
```

Open [http://localhost:3000](http://localhost:3000)

### Routes

| Method | Route      | Action            | Data            |
| ------ | ---------- | ----------------- | --------------- |
| GET    | /          | Hello World       | -               |
| GET    | /posts     | List all posts    | -               |
| POST   | /posts     | Create a new post | content: string |
| GET    | /posts/:id | Get single post   |                 |
| PATCH  | /posts/:id | Modify post       | content: string |

## Development

**Requiremenst**

- `node 16.x`
- `docker`

`npm install` to install dependecies

`npm run dev` to run dev server

Use your local Postgres or via docker-compose by running `docer-compose up`.

## Database

Export a database string for database connection, for example:

```sh
$ export DATABASE_URL='postgresql://postgres:postgres@127.0.0.1:5432/main'
```

**Migrations**

`npm run db:migrate` to run database migrations.

## Testing

`npm run lint` runs eslint

`npm run format` runs prettier

`npm test` runs unit & integration tests

## Deployment

Service is hosted in `fly.io`. Deployment is made via GitHub actions on push to `main` branch.
