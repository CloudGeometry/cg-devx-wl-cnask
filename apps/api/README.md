### Description

The app use [Nest Framework](https://github.com/nestjs/nest) and PostgreSQL connector.

### 1. Preparation

1. Install Nodejs, Yarn, PostgreSQL, Docker

2. Copy .env.example to .env

3. Set up your database connection in .env

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
# yarn
yarn start

# watch mode
yarn start:dev
```

Run Nest Server in Production mode:

```bash
# yarn
yarn start:prod
```

GraphQL Playground for the NestJS Server is available here: http://localhost:3000/graphql

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

[Prisma Migrate](https://github.com/prisma/prisma2/tree/master/docs/prisma-migrate) is used to manage the schema and
migration of the database. Prisma datasource requires an environment variable `DATABASE_URL` for the connection to the
PostgreSQL database. Prisma reads the `DATABASE_URL` from the root [.env](./.env) file.

Use Prisma Migrate in
your [development environment](https://www.prisma.io/blog/prisma-migrate-preview-b5eno5g08d0b#evolving-the-schema-in-development)
to

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

## Using built-in features

### Multi tenancy

Use `tenancy` config in `apps/api/src/common/configs/config.ts` to set tenancy ON/OFF

```typescript
tenancy: {
  enabled: false;
}
```

### Pagination

Cover your model with `Paginated` type

```typescript
@ObjectType()
export class PaginatedItems extends Paginated<Item>(Item) {}
```

Use `paginate` function in your service

```typescript
return paginate(
  this.prisma.item,
  {
    where: where_active,
    orderBy: orderArray(orderBy)
  },
  paginateOptions
);
```

### Sorting

Use `orderArray` function in your service and `Sort` enum in your object type

```typescript
{
  orderBy: orderArray(orderBy);
}
```

```typescript
import { Sort } from 'common/sorting/sort.enum';

@InputType()
export class ItemOrderByInput {
  @Field(() => Sort, { defaultValue: Sort.ASC })
  createdAt?: Sort;
}
```

### Safe delete and safe filter

Use `safeWhere` and `safeDelete` function in your service

```typescript
return await safeDelete<Item>(this.prisma, 'item', id);
```

```typescript
{
  where: safeWhere(where);
}
```
