# Beginner Bot Template

This template is designed for beginners to start coding discord bots.

This template includes caching (using `dd-cache-proxy`) and support for slash subcommands.
This template also includes a /ping command to show the bot latency

## Setup

- Download the source
- Install the dependencies using `yarn`
- Copy the .env.example file and rename it to .env
- Fill out the .env file

## Run Bot

- run `yarn` to install the dependencies
- run `yarn build` to build the source
- run `node dist/register-commands.js` to register the slash commands
- run `yarn start` to run the bot
