FROM node:16.13.0-alpine AS builder
WORKDIR "/app"
COPY . .
RUN yarn
RUN yarn build

FROM node:16.13.0-alpine AS production

WORKDIR "/app"
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

CMD [ "sh", "-c", "npm run start:prod"]