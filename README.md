# Discordeno

<img alt="discordeno" align="right" src="https://raw.githubusercontent.com/discordeno/guide/main/src/.vuepress/public/logo.png" height="150px">

Discord API library for [Deno](https://deno.land)

Discordeno follows [semantic versioning](https://semver.org/)

[![Discord](https://img.shields.io/discord/785384884197392384?color=7289da&logo=discord&logoColor=dark)](https://discord.com/invite/5vBgXk3UcZ)
![Test](https://github.com/discordeno/discordeno/workflows/Test/badge.svg)

<!--
TODO: add coverage back when it is stable
[![Coverage](https://img.shields.io/codecov/c/gh/discordeno/discordeno)](https://codecov.io/gh/discordeno/discordeno)
-->

## Features

- **Secure & stable**: Discordeno is actively maintained to ensure great
  performance and convenience. Moreover, it internally checks all missing
  permissions before forwarding a request to the Discord API so that the client
  does not get
  [globally banned by Discord](https://discord.com/developers/docs/topics/rate-limits#invalid-request-limit).
- **Simple, Efficient, & Lightweight**: Discordeno is simplistic, easy-to-use
  and versatile while being efficient and lightweight. Discordeno follows the
  [convention over configuration](https://en.wikipedia.org/wiki/Convention_over_configuration)
  design paradigm; it prefers default options or values that are recommended by
  Discord or the best configuration for the majority of the users.
- [**Functional API**](https://en.wikipedia.org/wiki/Functional_programming):
  The functional API ensures overall concise yet performant code while removing
  the difficulties of extending built-in classes and inheritance.

## Getting Started

### Minimal Example

Here is a minimal example to get started with:

```typescript
import { startBot } from "https://deno.land/x/discordeno/mod.ts";

startBot({
  token: "BOT_TOKEN",
  intents: ["Guilds", "GuildMessages"],
  eventHandlers: {
    ready() {
      console.log("Successfully connected to gateway");
    },
    messageCreate(message) {
      // Process the message with your command handler here
    },
  },
});
```

### Templates

Note to developers: don't worry, a lot of developers start out by building a
Discord bot as their first project, and it's not easy. Discordeno is designed
and built with all the issues in mind that many developers have encountered
when they initially started writing Discord bots using existing libraries. If
you are a beginner, you can check out these awesome official and unofficial
templates:

- [Discordeno Template (official)](https://github.com/discordeno/template)
- [Serverless Slash Commands Template (official)](https://github.com/discordeno/serverless-deno-deploy-template)
- [Add Your Own!](https://github.com/discordeno/discordeno/pulls)

### Frameworks

- [Natico](https://github.com/naticoo/framework)
- [Amethyst](https://github.com/AmethystFramework/framework)

## Links

- [Website](https://discordeno.mod.land)
- [Documentation](https://doc.deno.land/https/deno.land/x/discordeno/mod.ts)
- [Discord](https://discord.com/invite/5vBgXk3UcZ)

## Contributing

We appreciate your help! Before contributing, please read the
[Contributing Guide](https://github.com/discordeno/discordeno/blob/main/.github/CONTRIBUTING.md).
