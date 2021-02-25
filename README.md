# Discordeno

<img align="right" src=docs/src/.vuepress/public/logo.png height="150px">

Discord API library for [Deno](https://deno.land)

Discordeno follows [Semantic Versioning](https://semver.org/)

[![Discord](https://img.shields.io/discord/785384884197392384?color=7289da&logo=discord&logoColor=dark)](https://discord.com/invite/5vBgXk3UcZ)
![Lint](https://github.com/discordeno/discordeno/workflows/Lint/badge.svg)
![Test](https://github.com/discordeno/discordeno/workflows/Test/badge.svg)

## Features

- **Secure & stable**: Discordeno is actively maintained to ensure great
  performance and convenience. Moreover, it internally checks all missing
  permissions before forwarding a request to the Discord API so that the client
  does not get globally-banned by Discord.
- **Simple, Efficient, & Lightweight**: Discordeno is simplistic, easy-to-use,
  versatile while being efficient and lightweight. Follows
  [Convention Over Configuration](https://en.wikipedia.org/wiki/Convention_over_configuration)
  design paradigm ― prefers defaults options or values that are recommended by
  Discord or the best configuration for the majority of the users.
- [**Functional API**](https://en.wikipedia.org/wiki/Functional_programming):
  Functional API ensures an overall concise yet performant code while removing
  the difficulties of extending built-in classes and inheritance.

## Getting Started

### Minimal Example

Here is a minimal example to get started with:

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

### Boilerplates

Note to developers: don't worry a lot of developers start out programming a
Discord bot as their first project (I did 😉) and it is not so easy to do so.
Discordeno is designed and built considering all the issues that I and a lot of
developers had when I first started out coding Discord bots with existing
libraries. If you are a beginner, you can check out these awesome official and
unofficial boilerplates:

- [Discordeno Boilerplate (official)](https://github.com/discordeno/boilerplate)
- [Serverless Slash Commands Template
  (official)](https://github.com/discordeno/slash-commands-boilerplate)
- [Add Your Own!](https://github.com/discordeno/discordeno/pulls)

## Useful Links

- [Website](https://discordeno.mod.land)
- [Documentation](https://doc.deno.land/https/deno.land/x/discordeno/mod.ts)
- [Discord](https://discord.com/invite/5vBgXk3UcZ)

## Contributing

We appreciate your help! Before contributing, please read the
[Contributing Guide](https://github.com/discordeno/discordeno/blob/master/.github/CONTRIBUTING.md).

### License

[License can be found here](https://github.com/discordeno/discordeno/blob/master/LICENSE)
