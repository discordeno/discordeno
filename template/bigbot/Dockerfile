FROM node:16.18.0-alpine3.16 AS deps
WORKDIR /app
COPY package.json package-lock.json .swcrc ./
RUN npm install
COPY src/ src/
RUN npm run build

FROM node:16.18.0-alpine3.16 as rest
COPY --from=deps /app /app
WORKDIR /app
EXPOSE 8000
CMD ["npm","run","startr"]

FROM node:16.18.0-alpine3.16 as gateway
COPY --from=deps /app /app
WORKDIR /app
EXPOSE 8080
CMD ["npm","run","startg"]

FROM node:16.18.0-alpine3.16 as bot
COPY --from=deps /app /app
WORKDIR /app
COPY prisma prisma
COPY node_modules/.prisma/client node_modules/.prisma/client
EXPOSE 8080
CMD ["npm","run","startb"]
