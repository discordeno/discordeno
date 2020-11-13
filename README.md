# Discordeno

> Discord API library wrapper in Deno

[![Discord](https://img.shields.io/discord/223909216866402304?color=7289da&logo=discord&logoColor=dark)](https://discord.gg/J4NqJ72)
![Lint](https://github.com/Skillz4Killz/Discordeno/workflows/Lint/badge.svg)
![Test](https://github.com/Skillz4Killz/Discordeno/workflows/Test/badge.svg)
[![nest badge](https://nest.land/badge.svg)](https://nest.land/package/Discordeno)

## Why Discordeno?

### Beginner Developers

Don't worry a lot of developers start out coding their first projects as a Discord bot (I did 😉) and it is not so easy to do so. Discordeno is built considering all the issues with pre-existing libraries and issues that I had when I first started out coding bots. 
If you are a beginner developer, you may check out these awesome official and unofficial boilerplates:

- Official Discordeno Boilerplate
  - [GitHub](https://github.com/Skillz4Killz/Discordeno-bot-template)
  - [Features](https://github.com/Skillz4Killz/Discordeno-bot-template#features)

If you do not wish to use a boilerplate, you may continue reading.

### Advanced Developers

The instructions below are meant for advanced developers!

Starting with Discordeno is very simple, you can start from scratch without any boilerplates/frameworks: Add this snippet of code into a new TypeScript file:

```typescript
import StartBot, { sendMessage, Intents } from "https://x.nest.land/Discordeno@9.0.15/mod.ts";
import config from "./config.ts";

StartBot({
  token: config.token,
  intents: [Intents.GUILD_MESSAGES, Intents.GUILDS],
  eventHandlers: {
    ready: () => {
      console.log('Successfully connected to gateway');
    },
    messageCreate: (message) => {
      if (message.content === "!ping") {
        sendMessage(message.channelID, "Pong");
      }
    },
  },
});
```

Alternatively, you can use boilerplate template repositories that were created by wonderful developers. Review the list on the website, and add any of yours if you make your own.

## Documentation

- [API Documentation](https://doc.deno.land/https/deno.land/x/discordeno/mod.ts)
- [Guide](https://discordeno.netlify.com)
- [Support server](https://discord.gg/J4NqJ72)
- [Contributing Guide](https://github.com/Skillz4Killz/Discordeno/blob/master/.github/CONTRIBUTING.md)

## License

[MIT © Skillz4Killz](https://github.com/Skillz4Killz/Discordeno/blob/master/LICENSE)
