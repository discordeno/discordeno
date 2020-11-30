# Discordeno

> Discord API library wrapper in Deno

[![Discord](https://img.shields.io/discord/223909216866402304?color=7289da&logo=discord&logoColor=dark)](https://discord.gg/J4NqJ72)
![Lint](https://github.com/Skillz4Killz/Discordeno/workflows/Lint/badge.svg)
![Test](https://github.com/Skillz4Killz/Discordeno/workflows/Test/badge.svg)
[![nest badge](https://nest.land/badge.svg)](https://nest.land/package/Discordeno)

- First-class TypeScript & JavaScript support
- Security & stable
- Builtin Documentation
- Minimalistic
- Functional API
- Actively maintained

### Beginner Developers

Don't worry a lot of developers start out coding their first projects as a Discord bot (I did 😉) and it is not so easy to do so. Discordeno is built considering all the issues with pre-existing libraries and issues that I had when I first started out coding bots. 
If you are a beginner developer, you may check out these awesome official and unofficial boilerplates:

- Official Discordeno Boilerplate
  - [GitHub](https://github.com/Skillz4Killz/Discordeno-bot-template)
  - [Features](https://github.com/Skillz4Killz/Discordeno-bot-template#features)
- Dencord Starter
  - [GitHub](https://github.com/ayntee/dencord-starter)

If you do not wish to use a boilerplate, you may continue reading.

### Advanced Developers

Here's a minimal example to get started with:

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
- [Contributing Guide](https://github.com/Skillz4Killz/Discordeno/blob/master/.github/CONTRIBUTING.md)

## Contributing

## Code of Conduct

Discordeno expects participants to adhere to our [Code of Conduct](https://github.com/Skillz4Killz/Discordeno/blob/master/.github/CODE_OF_CONDUCT.md).

## Contributing Guide

We appreciate your help!

Before contributing, please read the [Contributing Guide](https://github.com/Skillz4Killz/Discordeno/blob/master/.github/CONTRIBUTING.md).

### License

[MIT © Skillz4Killz](https://github.com/Skillz4Killz/Discordeno/blob/master/LICENSE)
