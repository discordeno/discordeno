# Discordeno Big Bot Template

Support: <https://discord.gg/ddeno>

This template is designed for bots that aim or are already in millions of Discord servers. It is written with Node.js as
currently Deno & Bun are not ready to run something at such a scale. The general idea of this template can be modified
for any other runtime if this improves in the future.

Make sure to install the latest version when you use it.

## Setup

1. Run a find all for `// SETUP-DD-TEMP:` and follow all instructions and delete the comments as you finish them.

## Startup

To start your bot, you will need to start a few processes. The instructions below will use `node` but you can use
something like `pm2` to help keep your processes alive.

Please compile everything first with `tsc`.

- Start REST
  - `ts-node src/rest/index.ts`
- Start Gateway
  - `ts-node src/gateway/index.ts`
- Start Bot
  - `ts-node src/bot/index.ts`

## Improvements

- Change configs.ts file to use an .env file.
