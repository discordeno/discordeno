# build only with the platform of the host machine, since it only uses for dev purposes
FROM --platform=$BUILDPLATFORM node:20-alpine AS deps
WORKDIR /app
# copy necessary for install dependencies
COPY package.json yarn.lock .yarnrc.yml ./
COPY ./.yarn/releases  ./.yarn/releases
# install dependencies
RUN yarn install --immutable

# build only with the platform of the host machine, since we just need its files
FROM --platform=$BUILDPLATFORM node:20-alpine AS builder
# copy the dependencies (node_modules) from the deps image
COPY --from=deps /app /app
WORKDIR /app
# copy the source files
COPY src/ src/
# copy the compiler config
COPY tsconfig.json ./
# compile the files
RUN yarn build

FROM node:20-alpine AS runner
# copy the compiled files from the builder image
COPY --from=builder /app/dist /app/dist
# copy the dependencies from the deps image
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=deps /app/.yarn /app/.yarn
WORKDIR /app
# copy necessary files
COPY package.json yarn.lock .yarnrc.yml ./
ENV HOST=0.0.0.0
# open port 8000
EXPOSE 8000
# set default command
CMD ["yarn" ,"start:prod"]
