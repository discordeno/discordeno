# Discordeno

> Discord API library wrapper in Deno

[![Discord](https://img.shields.io/discord/223909216866402304?color=7289da&logo=discord&logoColor=dark)](https://discord.gg/J4NqJ72)
![Lint](https://github.com/Skillz4Killz/Discordeno/workflows/Lint/badge.svg)
![Test](https://github.com/Skillz4Killz/Discordeno/workflows/Test/badge.svg)
[![nest badge](https://nest.land/badge.svg)](https://nest.land/package/Discordeno)

- **First-class TypeScript & JavaScript**: First class support for Typescript! Never compile your code again in order to run it. Automated typings so they are never inaccurate or out of date. Discordeno uses the latest and greatest JavaScript/TypeScript available. A lot of libraries still use JavaScript standards from 4-6 years ago because of backwards compatibility. Backwards compatibility is the death of code. It causes clutter and uglyness to pile up and makes developers lazier.
- **Security & stable**: Checks all missing permissions necessary before sending a request to the API so that your bot's token do not get globally banned by Discord. Discordeno does not support self-bot functionality like other libraries either. Discordeno is one of the most stable libraries ever. One of the biggest issues with almost every library(I have used) is stability. None of the libraries gave much love and attention to Typescript developers the way it deserves which caused TypeScript bots to break.
- **Builtin Documentation**: All of Discord API Documentation available inside your VSC while you code. The entire libraries documentation is automatically available to you through intellisense.
- **Minimalistic**: Discordeno will always prefer defaults that Discord recommends or in the cases where Discord does not care we choose the best option for the majority of developers.
- **Functional API**: This will overall make a cleaner and more performant API, while removing the headaches of extending built-in classes, and inheritance. Avoid potential of memory leaks or bot crashes because of too many listeners or other silly issues.
- **Actively maintained**: Discordeno is actively being maintained. Some of the other libraries original developers have quit or no longer actively maintain it and leave it to the community to maintain the library.

## Usage

Don't worry a lot of developers start out coding their first projects as a Discord bot (I did 😉) and it is not so easy to do so. Discordeno is built considering all the issues with pre-existing libraries and issues that I had when I first started out coding bots. 
If you are a beginner developer, you may check out these awesome official and unofficial boilerplates:

- Official Discordeno Template
  - [GitHub](https://github.com/Skillz4Killz/Discordeno-bot-template)
  - [Features](https://github.com/Skillz4Killz/Discordeno-bot-template#features)
- Discordeno Helper Template
  - [GitHub](https://github.com/Suyashtnt/discordeno-helper-template)

If you do not wish to use a boilerplate, here's a minimal example to get started with:

```typescript
import StartBot, { sendMessage, Intents } from "https://x.nest.land/Discordeno@9.4.0/mod.ts";

StartBot({
  token: "BOT TOKEN",
  intents: [Intents.GUILD_MESSAGES, Intents.GUILDS],
  eventHandlers: {
    ready: () => console.log('Successfully connected to gateway'),
    messageCreate: (message) => {
      if (message.content === "hello") {
        sendMessage(message.channelID, "Hi there!");
      }
    },
  },
});
```

## Documentation

- [Website](https://discordeno.mod.land)
- [Support server](https://discord.gg/J4NqJ72)

## Contributing

## Code of Conduct

Discordeno expects participants to adhere to our [Code of Conduct](https://github.com/Skillz4Killz/Discordeno/blob/master/.github/CODE_OF_CONDUCT.md).

## Contributing Guide

We appreciate your help!

Before contributing, please read the [Contributing Guide](https://github.com/Skillz4Killz/Discordeno/blob/master/.github/CONTRIBUTING.md).

### License

[MIT © Skillz4Killz](https://github.com/Skillz4Killz/Discordeno/blob/master/LICENSE)
