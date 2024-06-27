# syntax=docker/dockerfile:1

ARG NODE_VERSION=20

################################################################################

FROM node:${NODE_VERSION}-alpine as base

# Set working directory for all build stages.
WORKDIR /usr/src/app

# Enable corepack so it can install the needed yarn version
RUN corepack enable

COPY package.json .
COPY yarn.lock .
# We need to copy the yarnrc or else yarn will attempt to use PnP
COPY .yarnrc.yml .

RUN yarn install

# Copy the rest of the source files into the image.
COPY . .

# Run the build script.
RUN yarn build

# Use production node environment by default.
ENV NODE_ENV production

# Run the application as a non-root user.
USER node

################################################################################

FROM base as rest

# Expose the port that the application listens on.
EXPOSE 8000

# Run the application.
CMD node dist/rest/index.js

################################################################################

FROM base as gateway

# Expose the port that the application listens on.
EXPOSE 8080

# Run the application.
CMD node dist/gateway/index.js

################################################################################

FROM base as bot

# Expose the port that the application listens on.
EXPOSE 8081

# Run the application.
CMD node dist/bot/index.js

################################################################################

FROM rabbitmq:3.12-management-alpine as rabbitmq

# Copy the rabbitmq plugins
COPY rabbitmq/plugins/** plugins

HEALTHCHECK CMD [ "rabbitmq-diagnostics", "-q", "status" ] \
  --interval=30s --timeout=30s --start-period=30s --retries=5

# Enable the required plugins
RUN rabbitmq-plugins enable rabbitmq_message_deduplication
