# Discordeno

> Discord API library for Deno

[![Discord](https://img.shields.io/discord/785384884197392384?color=7289da&logo=discord&logoColor=dark)](https://discord.com/invite/5vBgXk3UcZ)
![Lint](https://github.com/discordeno/discordeno/workflows/Lint/badge.svg)
![Test](https://github.com/discordeno/discordeno/workflows/Test/badge.svg)

- First-class TypeScript & JavaScript support
- Secure & stable
- Efficient & inimalistic
- Function-based API
- Builtin Documentation

## Usage

### Beginner Developers

Don't worry a lot of developers start out coding their first projects as a Discord bot (I did 😉) and it is not so easy to do so. Discordeno is built considering all the issues with pre-existing libraries and issues that I had when I first started out coding bots.
If you are a beginner developer, you may check out these awesome official and unofficial boilerplates:

- Official Discordeno Boilerplate
  - [GitHub](https://github.com/Skillz4Killz/Discordeno-bot-template)
  - [Features](https://github.com/Skillz4Killz/Discordeno-bot-template#features)

If you do not wish to use a boilerplate, you may continue reading.

### Advanced Developers

Here's a minimal example to get started with:

```typescript
import { Intents, startBot } from "https://deno.land/x/discordeno@10.0.1/mod.ts";

startBot({
  token: "BOT TOKEN",
  intents: [Intents.GUILDS, Intents.GUILD_MESSAGES],
  eventHandlers: {
    ready() {
      console.log("Successfully connected to gateway");
    },
    messageCreate(message) {
      if (message.content === "!ping") {
        message.reply("Pong using Discordeno!");
      }
    },
  },
});
```

## Useful Links

- [Website](https://discordeno.mod.land)
- [Documentation](https://doc.deno.land/https/deno.land/x/discordeno/mod.ts)
- [Discord](https://discord.com/invite/5vBgXk3UcZ)

## Contributing

We appreciate your help!

Before contributing, please read the [Contributing Guide](https://github.com/discordeno/discordeno/blob/master/.github/CONTRIBUTING.md).

### License

[MIT © discordeno](https://github.com/discordeno/discordeno/blob/master/LICENSE)
