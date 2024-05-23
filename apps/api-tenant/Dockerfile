# syntax=docker/dockerfile:1.4
FROM node:lts-alpine AS build

WORKDIR /src

COPY --link package.json ./
COPY --link yarn.lock ./
COPY --link tsconfig.base.json ./
COPY --link apps/api-tenant/ ./apps/api-tenant/

RUN yarn install --frozen-lockfile --non-interactive
RUN yarn workspace cnask-api-tenant prisma:generate
RUN yarn workspace cnask-api-tenant build

FROM node:lts-alpine AS production

ENV PORT=3000

EXPOSE $PORT

COPY --from=build --chown=0:0 /etc/passwd /etc/passwd
USER node
WORKDIR /app

COPY --from=build --chown=node:node /src/apps/api-tenant/dist/ /app/
COPY --from=build --chown=node:node /src/apps/api-tenant/node_modules/ /app/node_modules/
COPY --from=build --chown=node:node /src/node_modules/ /app/node_modules/
COPY --from=build --chown=node:node /src/apps/api-tenant/package.json /app/package.json

CMD ["node", "src/main"]
