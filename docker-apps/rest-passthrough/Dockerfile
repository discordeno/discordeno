# we node 18 alpine 3.19 as base image
# we use multi stage build in this file

# deps
#   contain all dependencies including dev dependencies
# builder
#   contains all compiled files
# runner
#   the final image, with only the dependencies and compiled files

# build only with the platform of the host machine, since it only uses for dev purposes
FROM --platform=$BUILDPLATFORM node:18.19.0-alpine3.19 AS deps
WORKDIR /app
# copy necessary for install dependencies
COPY package.json yarn.lock .yarnrc.yml ./
COPY ./.yarn/releases  ./.yarn/releases
# install dependencies
RUN yarn install --immutable

# build only with the platform of the host machine, since we just need its files
FROM --platform=$BUILDPLATFORM node:18.19.0-alpine3.19 AS builder
# copy the dependencies (node_modules) from the deps image
COPY --from=deps /app /app
WORKDIR /app
# copy the source files
COPY src/ src/
# copy the compiler config
COPY .swcrc ./
# compile the files
RUN yarn build

FROM node:18.19.0-alpine3.19 AS runner
# copy the compiled files from the builder image
COPY --from=builder /app/dist /app/dist
# copy the dependencies from the deps image
COPY --from=deps /app/.yarn /app/.yarn
WORKDIR /app
# copy necessary files
COPY package.json yarn.lock .yarnrc.yml ./
# open port 8000
EXPOSE 8000
# set default command
CMD ["yarn" ,"start:prod"]
