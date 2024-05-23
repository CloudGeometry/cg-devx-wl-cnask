### Description

The app use [Nest Framework](https://github.com/nestjs/nest) and PostgreSQL connection.

### 1. Preparation

1. Install Nodejs, Yarn, PostgreSQL, Docker

2. copy .env.example to .env

3. set up your database connection in .env

### 2. Install Dependencies

Install the dependencies for the Nest application:

```bash
# yarn
yarn install
```

### 3. Set Database schemas

```bash
# yarn
yarn migrate
```

### 4. Start NestJS Server

Run Nest Server in Development mode:

```bash
yarn start

# watch mode
yarn start:dev
```

Run Nest Server in Production mode:

```bash
yarn start:prod
```

GraphQL Playground for the NestJS Server is available here: http://localhost:4000/graphql


## GraphQL Playground

You could use following example queries in the GraphQL Playground.

Some queries and mutations are secured by an auth guard. You have to acquire a JWT token from `signup` or `login`.

```graphql
mutation {login(data: {username: "YOURUSER", password: "YOURPASSWORD"}) {refreshToken, accessToken, user {id} }}
```

Add the `accessToken`as followed to **HTTP HEADERS** in the playground and replace `YOURTOKEN` like this:

```json
{
  "Authorization": "Bearer YOURTOKEN"
}
```

########################################

### 5*. Prisma Migrate

[Prisma Migrate](https://github.com/prisma/prisma2/tree/master/docs/prisma-migrate) is used to manage the schema and migration of the database. Prisma datasource requires an environment variable `DATABASE_URL` for the connection to the PostgreSQL database. Prisma reads the `DATABASE_URL` from the root [.env](./.env) file.

Use Prisma Migrate in your [development environment](https://www.prisma.io/blog/prisma-migrate-preview-b5eno5g08d0b#evolving-the-schema-in-development) to

1. Creates `migration.sql` file
2. Updates Database Schema
3. Generates Prisma Client

> **Note**: Every time you update [schema.prisma](prisma/schema.prisma) re-generate Prisma Client JS

```bash
yarn prisma:generate
# or
npx prisma generate
```

```bash
yarn migrate:dev
# or
npx prisma migrate dev
```

If you like to customize your `migration.sql` file run the following command. After making your customizations run `npx prisma migrate dev` to apply it.

```bash
yarn migrate:dev:create
# or
npx prisma migrate dev --create-only
```

If you are happy with your database changes you want to deploy those changes to your [production database](https://www.prisma.io/blog/prisma-migrate-preview-b5eno5g08d0b#applying-migrations-in-production-and-other-environments). Use `prisma migrate deploy` to apply all pending migrations, can also be used in CI/CD pipelines as it works without prompts.

```bash
yarn migrate:deploy
# or
npx prisma migrate deploy
```

### 6*. Seed the database data with this script

Execute the script with this command:

```bash
yarn seed
```

### 7. Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
