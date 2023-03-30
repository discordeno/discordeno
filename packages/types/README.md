# Discordeno

<img align="right" src="https://raw.githubusercontent.com/discordeno/discordeno/main/site/static/img/logo.png" height="150px">

Discord API library for [Deno](https://deno.land)

Discordeno follows [semantic versioning](https://semver.org/)

[![Discord](https://img.shields.io/discord/785384884197392384?color=7289da&logo=discord&logoColor=dark)](https://discord.com/invite/5vBgXk3UcZ)
![Test](https://github.com/discordeno/discordeno/workflows/Test/badge.svg)
[![Coverage](https://img.shields.io/codecov/c/gh/discordeno/discordeno)](https://codecov.io/gh/discordeno/discordeno)

## Features

Discordeno is actively maintained to guarantee **excellent performance and ease.**

- **Simple, Efficient, and Lightweight**: Discordeno is lightweight, simple to use, and adaptable. By default, no
  caching.
- **Functional API**: The functional API eliminates the challenges of extending built-in classes and inheritance while
  ensuring overall simple but performant code.
- **Cross Runtime**: Supports the Node.js and Deno runtimes.
- **Standalone components**: Discordeno offers the option to have practically any component of a bot as a separate
  piece, including standalone REST, gateways, custom caches, and more.
- **Plugins:** Designed to allow you to overwrite any portion of the code with your own code. Never go through the
  hassle of maintaining your fork in order to acquire something that is specifically tailored to your requirements.
  Plugins may be used for nearly anything; for instance, we have a few authorised plugins.

  - A caching plugin that makes anything cacheable.
  - A plugin for sweepers that allows them to periodically clear the cache.
  - The permission plugin internally verifies any missing permissions before sending a call to the Discord API to
    prevent the client from receiving a Discord global ban.

- **Flexibility:** You may easily delete an object's attributes if your bot doesn't require them. For instance, you
  shouldn't be required to keep `Channel.topic` if your bot doesn't require it. You may save GBs of RAM in this way. A
  few lines of code are all that are needed to accomplish this for any property on any object.

### REST

- Freedom from 1 hour downtimes due to invalid requests
  - By lowering the maximum downtime to 10 minutes, Discordeno will prevent your bot from being down for an hour.
- Freedom from global rate limit errors
  - As your bot grows, you want to handle global rate limits better. Shards don't communicate fast enough to truly
    handle it properly so this allows 1 rest handler across the entire bot.
  - You may really run numerous instances of your bot on different hosts, all of which will connect to the same REST
    server.
- REST does not rest!
  - Separate rest guarantees that your queued requests will continue to be processed even if your bot breaks for
    whatever reason.
  - Seamless updates! There's a chance you'll lose a lot of messages or replies that are waiting to be given when you
    wish to update and restart the bot. You may restart your bot using this technique and never have to worry about
    losing any answers.
- Single source of contact to Discord API
  - As a result, you will be able to send requests to Discord from any location, even a bot dashboard. You are no longer
    need to interact with your bot processes in order to submit a request or do anything else. Your bot process should
    be freed up to handle bot events.
- Scalability! Scalability! Scalability!

### Gateway

- **Zero Downtime Updates:**
  - A few seconds are needed to update your bot. When using conventional sharding, you must restart in addition to going
    through a 1/5s rate-limited process of identifying all of your shards. As WS processing has been relocated to a
    proxy process, you may resume the bot code right away without worrying about any delays. Normally, if you had a bot
    that was spread across 200,000 servers, restarting it after making a simple modification would take 20 minutes.
- **Zero Downtime Resharding:**
  - At various periods in time, Discord stops allowing your bot to be added to new servers. Consider 150 shards
    operating on 150,000 servers, for instance. Your shards may support a maximum of 150 \* 2500 = 375,000 servers. Your
    bot will be unable to join new servers once it reaches this point until it re-shards.
  - DD proxy provides 2 types of re-sharding. Automated and manual. You can also have both.
    - Automated: This system will automatically begin a Zero-downtime resharding process behind the scenes when you
      reach 80% of your maximum servers allowed by your shards. For example, since 375,000 was the max, at 300,000 we
      would begin re-sharding behind the scenes with ZERO DOWNTIME.
      - 80% of maximum servers reached (The % of 80% is customizable.)
      - Identify limits have room to allow re-sharding. (Also customizable)
    - Manual: You can also trigger this manually should you choose.
- **Horizontal Scaling:**
  - The bot may be scaled horizontally thanks to the proxy mechanism. When your business grows significantly, you have
    two options: you can either keep investing money to upgrade your server or you may expand horizontally by purchasing
    numerous more affordable servers. The proxy enables WS handling on a totally other system.
- **No Loss Restarts:**
  - Without the proxy mechanism, you would typically lose numerous events while restarting a bot. Users could issue
    instructions or send messages that are not screened. As your bot population increases, this amount grows sharply.
    Users who don't receive the automatic roles or any other activities your bot should do may join. You may keep
    restarting your bot thanks to the proxy technology without ever losing any events. While your bot is unavailable,
    events will be added to a queue (the maximum size of the queue is configurable), and once the bot is back online,
    the queue will start processing all of the events.
- **Controllers:**
  - You have complete control over everything inside the proxy thanks to the controller aspect. To simply override the
    handler, you may supply a function. For instance, you may simply give a method to override a specific function if
    you want it to behave differently rather than forking and maintaining your fork.
- **Clustering With Workers:**
  - Utilize all of your CPU cores to their greatest potential by distributing the workload across employees. To enhance
    efficiency, manage how many employees and shards there are each worker!

### Custom Cache

Have your cache setup in any way you like. Redis, PGSQL or any cache layer you would like.

## Getting Started

### Minimal Example

Here is a minimal example to get started with:

```typescript
import { createBot, Intents, startBot } from 'https://deno.land/x/discordeno@13.0.0/mod.ts'

const bot = createBot({
  token: process.env.DISCORD_TOKEN,
  intents: Intents.Guilds | Intents.GuildMessages,
  events: {
    ready() {
      console.log('Successfully connected to gateway')
    },
  },
})

// Another way to do events
bot.events.messageCreate = function (b, message) {
  // Process the message here with your command handler.
}

await startBot(bot)
```

### Tools

This library is not intended for beginners, however if you still want to utilise it, check out these excellent official
and unofficial templates:

**Templates**

- [Discordeno Template (official)](https://github.com/discordeno/discordeno/tree/main/template)
- [Serverless Slash Commands Template (official)](https://github.com/discordeno/serverless-deno-deploy-template)
- [`create-discordeno-bot` (WIP, unoffical)](https://github.com/Reboot-Codes/create-discordeno-bot/)
- [Add Your Own!](https://github.com/discordeno/discordeno/pulls)

**Frameworks**

- [Amethyst Framework](https://github.com/AmethystFramework/framework)
- [Add Your Own!](https://github.com/discordeno/discordeno/pulls)

**Plugins**

- [Cache Plugin](plugins/cache)
- [Fileloader Plugin](plugins/fileloader)
- [Helpers Plugin](plugins/helpers)
- [Permissions Plugin](plugins/permissions)

## Links

- [Website](https://discordeno.js.org/)
- [Documentation](https://doc.deno.land/https/deno.land/x/discordeno/mod.ts)
- [Discord](https://discord.com/invite/5vBgXk3UcZ)
