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

FROM node:18.15.0-alpine3.17 as runner
COPY --from=builder /app/dist /app/dist
WORKDIR /app
COPY package.json yarn.lock .swcrc ./
RUN yarn set version berry
RUN yarn plugin import workspace-tools
RUN yarn workspaces focus --all --production
EXPOSE 8000
CMD ["yarn" ,"start"]
