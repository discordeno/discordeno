---
sidebar_position: 1
title: Intro
---

# Discordeno

> Discord API library for [Deno](https://deno.land)

- [API Documentation](https://doc.deno.land/https/deno.land/x/discordeno/mod.ts)
- [Discord](https://discord.gg/ddeno)

## Features

- **Secure & stable**: Discordeno is secure and stable. One of the greatest issues with almost every library is
  stability; types are outdated, less (or minimal) parity with the API, core maintainers have quit or no longer actively
  maintain the library, and whatnot. Discordeno, on the other hand, is actively maintained to ensure great performance
  and convenience. Moreover, it internally checks all missing permissions before forwarding a request to the Discord API
  so the client doesn't get banned by Discord.
- **Simple, Efficient, & Lightweight**: Discordeno is simplistic, easy-to-use, versatile while being efficient and
  lightweight.
- [**Functional API**](https://en.wikipedia.org/wiki/Functional_programming): A functional API ensures an overall
  concise yet performant code while removing the difficulties of extending built-in classes and inheritance.
  [Learn more about class-free JavaScript.](https://dannyfritz.wordpress.com/2014/10/11/class-free-object-oriented-programming/)
- **Strongly Typed**: Type safety is important, therefore, discordeno is written in
  [TypeScript](https://www.typescriptlang.org/) to make sure you get consistent results.

# Get Started

Using discordeno can be as simple as running the following TypeScript snippet using `deno run` (with a valid bot token):

```ts
import { createBot, startBot } from "https://deno.land/x/discordeno/mod.ts";

// Import this from something like `.env`
const BOT_TOKEN = "";
const BOT_ID = BigInt(atob(BOT_TOKEN.split(".")[0]));

console.log("Bot starting...");

export const bot = createBot({
  token: BOT_TOKEN,
  botId: BOT_ID,
  intents: [],
  events: {
    ready: () => {
      console.log("Bot ready!");
    },
  },
});

await startBot(bot);
```

Checkout the [starter guide](/docs/starter/getting-started) to learn about discordeno. Or checkout an external tutorial:

- [Making a Discord bot with Deno and Discordeno](https://web-mystery.com/articles/making-discord-bot-deno-and-discordeno)
- [Running a Discord bot written using Deno in Docker](https://web-mystery.com/articles/running-discord-bot-written-deno-docker)
- [Discordeno Bot Tutorials (YouTube)](https://youtu.be/rIph9-BGsuQ)
