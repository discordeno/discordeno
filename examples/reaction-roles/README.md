# Reaction roles example bot

Example bot for reaction-roles using Discord Interactions and not classic reactions.

## Setup

1. Rename `.env.example` to `.env` and add your bot token in the `TOKEN` variable
1. Replace `REPLACE WITH YOUR GUILD ID` in `src/register-commands.ts` with your test guild id

## Run the bot

1. `yarn` to install the dependencies
1. `yarn postinstall` to run the Discordeno Desired Properties CLI
1. `yarn build` to build the .ts files into .js
1. `yarn start` (or `node ./dist/index.js`) to run the bot
