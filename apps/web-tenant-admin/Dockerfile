# syntax=docker/dockerfile:1.4
FROM node:lts-alpine AS build

WORKDIR src

COPY --link package.json ./
COPY --link tsconfig.base.json ./
COPY --link yarn.lock ./
COPY --link libs/ ./libs/
COPY --link apps/web-tenant-admin/ ./apps/web-tenant-admin/

RUN yarn install --frozen-lockfile --non-interactive --network-timeout 100000

RUN yarn workspace cnask-web-tenant-admin build

FROM nginx:alpine AS production

COPY --from=build src/apps/web-tenant-admin/dist/ /usr/share/nginx/html
COPY --from=build src/apps/web-tenant-admin/nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]
