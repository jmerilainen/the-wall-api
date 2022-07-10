# The WALL API

This is an example of Node REST API built from scratch and with zero dependencies (except `node-postgres`).

Demo: https://the-wall-api.fly.dev (API), https://the-wall.fly.dev (Client).

A barebone client for the API is found in [`the-wall-client`](https://github.com/jmerilainen/the-wall-client).

## About

### Strucutre

* `src/server` contains logic for the server and simple router.
* `src/models` interacts with postgress database models.
* `src/controllers` http controllers for routes.

### Routes

| Method | Route      | Action            | Data            |
| ------ | ---------- | ----------------- | --------------- |
| GET    | /          | Hello World       | -               |
| GET    | /posts     | List all posts    | -               |
| POST   | /posts     | Create a new post | content: string |
| GET    | /posts/:id | Get a single post | -               |
| PATCH  | /posts/:id | Modify a post     | content: string |

## Quickstart with Docker

To get project running locally with Docker, run

```sh
yarn docker:serve

# alias for "docker-compose -f docker-compose.local.yml up"
```

Open [http://localhost:3000](http://localhost:3000)

## Requirements

- Node.js `16.x`
- Docker or PostgreSQL

## Development

1. Install dependecies

    ```sh
    npm install
    ```

2. Start Postgres database

    ```sh
    npm run docker:db

    # or use a local service
    ```

3. Export envs

    ```sh
    export DATABASE_URL='postgresql://postgres:postgres@127.0.0.1:5432/main'

    # or modify according to your local database
    ```

3. Run database migrations

    ```sh
    npm run db:migrate
    ```

4. Start development server with watch mode

    ```sh
    npm run dev
    ```

5. Start coding

## Testing

### Unit & integration

For unit & integration tests the project uses Jest. Tests are in `test` directory.

To run unit tests run command

```sh
npm run test
```

### Type checks

Project uses TypeScript.

To run type checking across the whole project, run command

```sh
npm run typecheck
```

### Linting

Project uses ESLint for linting. That is configured in `.eslintrc.js`.

To run linting with auto-fix, run command

```sh
npm run lint
```

### Formatting

[Prettier](https://prettier.io/) is used for auto-formatting. It's recommended to install an editor plugin (like the [VSCode Prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)) to get auto-formatting on save.

To run formating, run command

```sh
npm run format
```

## Deployment

Service is hosted in [Fly.io](https://fly.io).

Deployment to production is made via GitHub actions on push to `main` branch.
