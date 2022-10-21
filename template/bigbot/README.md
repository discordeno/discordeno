# Discordeno Big Bot Template

Support: <https://discord.gg/ddeno>

This template is designed for bots that aim or are already in millions of Discord servers. It is written with Node.js as
currently Deno & Bun are not ready to run something at such a scale. The general idea of this template can be modified
for any other runtime if this improves in the future.

Make sure to install the latest version when you use it.

## Setup

1. Run a find all for `// SETUP-DD-TEMP:` and follow all instructions and delete the comments as you finish them.

## Startup

There are two ways to start your bot, using docker and node. Using docker will be the simplest and easiest way to start your bot. The default configuation will be set for Docker.

### Using Docker

The docker compose file include the discordeno bot and influxdb, this would create an enviroment more close to the production enviroment.

First, rename the .env.example file to .env, and set the discord token and your dev guild id.

Then, run ... to build/rebuild the bot

- `docker-compose build`

And, run ... to start

- `docker-compose up -d`

Your bot should be running now, and you can check the rest process fetch analytics in influxdb's webgui - <http://localhost:8086>

### Using Node

you will need to start a few processes. The instructions below will use `node` but you can use something like `pm2` to help keep your processes alive.

First, rename the .env.example file to .env, and set the discord token and your dev guild id, change the `REST_URL` and `EVENT_HANDLER_URL` to `localhost`.

Then compile everything with `npm run build`.

After that, you can start your bot one by one with the following order.

- Start REST
  - `npm run startr`
- Start Bot
  - `npm run startb`
- Start Gateway
  - `npm run startg`
