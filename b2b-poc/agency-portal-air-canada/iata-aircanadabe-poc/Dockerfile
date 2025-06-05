FROM node:20 AS builder

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:20-alpine AS runner

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/yarn.lock ./
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

COPY .env ./

EXPOSE 5012

CMD ["node", "dist/src/main.js"]