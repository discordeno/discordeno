# we node 18 alpine 3.17 as base image
# we use multi stage build in this file
# deps: contain all dependencies including dev dependencies
# builder: contains all compiled files
# prod-deps: contains only dependencies excluding dev dependencies
# runner: the final image, with only the dependencies and compiled files

FROM node:18.15.0-alpine3.17 AS deps
WORKDIR /app
# copy necessary for install dependencies
COPY package.json yarn.lock ./
# install dependencies
RUN yarn install

# use node alpine as base image
FROM node:18.15.0-alpine3.17 as builder
# copy the dependencies (node_modules) from the deps image
COPY --from=deps /app /app
WORKDIR /app
# copy the source files
COPY src/ src/
# copy the compiler config
COPY .swcrc ./
# compile the files
RUN yarn build

FROM node:18.15.0-alpine3.17 AS prod-deps
WORKDIR /app
# copy necessary for install dependencies
COPY package.json yarn.lock .yarnrc.yml ./
# config yarn to install only prod dependencies
RUN yarn set version berry
RUN yarn plugin import workspace-tools
# install prod dependencies
RUN yarn workspaces focus --all --production

FROM node:18.15.0-alpine3.17 as runner
# copy the compiled files from the builder image
COPY --from=builder /app/dist /app/dist
# copy the prod dependencies (node_modules) from the prod-deps image
COPY --from=prod-deps /app/node_modules /app/node_modules
WORKDIR /app
# copy necessary files
COPY package.json ./
# open port 8000
EXPOSE 8000
# set default command
CMD ["yarn" ,"start"]
