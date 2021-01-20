# Discordeno

> Discord API library for Deno

[![Discord](https://img.shields.io/discord/785384884197392384?color=7289da&logo=discord&logoColor=dark)](https://discord.com/invite/5vBgXk3UcZ)
![Lint](https://github.com/discordeno/discordeno/workflows/Lint/badge.svg)
![Test](https://github.com/discordeno/discordeno/workflows/Test/badge.svg)

- **Secure & stable**: Discordeno is comparatively more stable than the other
  libraries. One of the greatest issues with almost every library is stability;
  types are outdated, less (or minimal) parity with the API, core maintainers
  have quit or no longer actively maintain the library, and whatnot. Discordeno,
  on the other hand, is actively maintained to ensure great performance and
  convenience. Discordeno internally checks all missing permissions before
  forwarding a request to the API so that the client does not get
  globally-banned by Discord.
- **Efficient & lightweight**: Discordeno is simplistic and easy-to-use. Always
  prefer defaults that Discord recommends or the best configuration for the
  majority―if necessary, it is remarkably customizable, versatile, and
  efficient.
- **Functional API**: This will produce a cleaner and more performant code while
  removing the difficulties of extending built-in classes and inheritance. Avoid
  potential memory leaks or crashes because of too many listeners or other silly
  issues.

## Usage

### Beginner Developers

Don't worry a lot of developers start out coding their first projects as a
Discord bot (I did 😉) and it is not so easy to do so. Discordeno is built
considering all the issues with pre-existing libraries and issues that I had
when I first started out coding bots. If you are a beginner developer, you may
check out these awesome official and unofficial boilerplates:

- Official Discordeno Boilerplate
  - [GitHub](https://github.com/Skillz4Killz/Discordeno-bot-template)
  - [Features](https://github.com/Skillz4Killz/Discordeno-bot-template#features)

If you do not wish to use a boilerplate, you may continue reading.

### Advanced Developers

Here's a minimal example to get started with:

```typescript
import { startBot } from "https://deno.land/x/discordeno/mod.ts";

startBot({
  token: "BOT TOKEN",
  intents: ["GUILDS", "GUILD_MESSAGES"],
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

Before contributing, please read the
[Contributing Guide](https://github.com/discordeno/discordeno/blob/master/.github/CONTRIBUTING.md).

### License

[MIT © discordeno](https://github.com/discordeno/discordeno/blob/master/LICENSE)
