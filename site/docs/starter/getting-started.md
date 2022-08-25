# Getting Started

:::caution

This guide is being updated to better explain what discordeno does, how to properly write a bot, and use the latest v13
RC.

:::

Discordeno aims for a simple, easy and stress-free interaction with the Discord API. Always supporting the latest
version to ensure stability, consistency and the best developer experience. This guide serves as the purpose for
introducing Discordeno's (very) opinionated method of writing bots to new developers.

This guide covers creating a very simple bot meant for just a few servers. If you would like to just clone the code, we
have a [minimal template](https://github.com/discordeno/discordeno/blob/main/template/minimal) ready to go, but make
sure to follow the [setup instructions](https://github.com/discordeno/discordeno/tree/main/template/minimal#readme).

## Requirements

- The latest version of a sever side JavaScript interpreter.
  - This lib was originally developed with, and still uses [Deno](https://deno.land).
  - However, we have great support for [Node.js](https://nodejs.org)
  - And are experimenting with [Bun](https://bun.sh/) support!
- A text editor (we like [Visual Studio Code](https://code.visualstudio.com/)) and terminal (the one integrated with VS
  Code is good enough for now).
- A directory on your computer to contain your project files. Every path in this tutorial will start at the project's
  root directory. Example: `~/dev/starter-project/mod.ts` -> `mod.ts` or `~/dev/starter-project/src/utils/logger.ts` ->
  `src/utils/logger.ts`.
- Git to serve as the project's version management system. (This isn't a discordeno requirement, but it is extremely
  useful.)
- Knowledge of how to write JavaScript and/or TypeScript (we won't explain everything, just the discordeno stuff). Need
  a refresher? Check out these tutorials:
  - [JavaScript Tutorial](https://www.w3schools.com/js/default.asp)
  - [TypeScript Tutorial](https://www.w3schools.com/typescript/index.php)
