FROM node:18.15.0-alpine3.17 AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

FROM node:18.15.0-alpine3.17 as builder
COPY --from=deps /app /app
WORKDIR /app
COPY src/ src/
COPY .swcrc ./
RUN yarn build

FROM node:18.15.0-alpine3.17 AS prod-deps
WORKDIR /app
COPY package.json yarn.lock .yarnrc.yml ./
RUN yarn set version berry
RUN yarn plugin import workspace-tools
RUN yarn workspaces focus --all --production

FROM node:18.15.0-alpine3.17 as runner
COPY --from=builder /app/dist /app/dist
COPY --from=prod-deps /app/node_modules /app/node_modules
WORKDIR /app
COPY package.json ./
EXPOSE 8000
CMD ["yarn" ,"start"]
