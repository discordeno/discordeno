FROM node:16.18.0-alpine3.16 AS deps
WORKDIR /app
COPY package.json package-lock.json .swcrc ./
RUN npm install

FROM node:16.18.0-alpine3.16 as rest
COPY --from=deps /app /app
WORKDIR /app
COPY src/analytics.ts src/configs.ts src/
COPY src/rest src/rest
RUN npm run build
EXPOSE 8000
CMD ["npm","run","startr"]

FROM node:16.18.0-alpine3.16 as gateway
COPY --from=deps /app /app
WORKDIR /app
COPY src/configs.ts src/
COPY src/gateway src/gateway
RUN npm run build
EXPOSE 8080
CMD ["npm","run","startg"]

FROM node:16.18.0-alpine3.16 as bot
COPY --from=deps /app /app
WORKDIR /app
COPY prisma prisma
COPY node_modules/.prisma/client node_modules/.prisma/client
COPY src/analytics.ts src/prisma.ts src/configs.ts src/
COPY src/bot src/bot
RUN npm run build
EXPOSE 8080
CMD ["npm","run","startb"]

FROM rabbitmq:3.11.2-management-alpine as rabbitmq
COPY src/rabbitmq/plugins plugins
RUN rabbitmq-plugins enable rabbitmq_message_deduplication
