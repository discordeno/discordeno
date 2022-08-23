# Discordeno

<img align="right" src="https://raw.githubusercontent.com/discordeno/discordeno/main/site/static/img/logo.png" height="150px">

Discord API library for [Deno](https://deno.land)

Discordeno follows [semantic versioning](https://semver.org/)

<!-- TODO: add coverage back when it is stable -->

[![Discord](https://img.shields.io/discord/785384884197392384?color=7289da&logo=discord&logoColor=dark)](https://discord.com/invite/5vBgXk3UcZ)
![Test](https://github.com/discordeno/discordeno/workflows/Test/badge.svg)
[![Coverage](https://img.shields.io/codecov/c/gh/discordeno/discordeno)](https://codecov.io/gh/discordeno/discordeno)

## Features

- **Secure & stable**: Discordeno is actively maintained to ensure great performance and convenience.
- **Simple, Efficient, & Lightweight**: Discordeno is simplistic, easy-to-use and versatile while being efficient and
  lightweight. No caching by default.
- **Functional API**: The functional API ensures overall concise yet performant code while removing the difficulties of
  extending built-in classes and inheritance.
- **Cross Runtime**: Supports both Deno and Node.js runtimes.
- **Standalone REST, Gateway, Custom Cache & more**: Discordeno provides the ability to have almost every part of a bot
  as a standalone piece.
- **Plugins:** Designed to let you plugin and override any part of the code. Never deal with the headaches of
  maintaining your fork just to get something customized for your needs. You can use plugins for almost anything, for
  example we have a few official plugins.
  - Cache plugin that enables caching everything.
  - Sweeper plugin that enables sweepers to clean the cache every once in a while.
  - Permission plugin checks internally all missing permissions before forwarding a request to the Discord API so that
    the client does not get globally banned by Discord.
- **Flexibility:** If your bot does not need certain properties from objects then you can simply remove them. For
  example, if your bot does not need `Channel.topic` you should not have to store it. This can save you GBs of memory.
  Doing this for any property on any object is as simple as a few lines of code.

### REST

- ✅ Freedom from Invalid Request 1 Hour Downtimes
  - ✅ Discordeno will protect your bot from going down for an hour and will instead decrease the maximum downtime to 10
    minutes.
- ✅ Freedom from global rate limit errors
  - ✅ As your bot grows, you want to handle global rate limits better. Shards don't communicate fast enough to truly
    handle it properly so this allows 1 rest handler across the entire bot.
  - ✅ In fact, you can host multiple instances of your bot and all connect to the same rest server.
- ✅ REST does not rest!
  - ✅ Separate rest means if your bot for whatever reason crashes, your requests that are queued will still keep going
    and will not be lost.
  - ✅ Seamless updates! When you want to update and reboot the bot, you could potentially lose tons of messages or
    responses that are in queue. Using this you could restart your bot without ever worrying about losing any responses.
- ✅ Single source of contact to Discord API
  - ✅ This will allow you to make requests to discord from anywhere including a bot dashboard. You no longer need to
    have to communicate to your bot processes just to make a request or anything. Free up your bot process for
    processing bot events.
- ✅ Scalability! Scalability! Scalability!

### Gateway

- ✅ **Zero Downtime Updates:**
  - ✅ Your bot can be updated in a matter of seconds. With normal sharding, you have to restart which also has to
    process identifying all your shards with a 1/~5s rate limit. With WS handling moved to a proxy process, this allows
    you to instantly get the bot code restarted without any concerns of delays. If you have a bot on 200,000 servers
    normally this would mean a 20 minute delay to restart your bot if you made a small change and restarted.
- ✅ **Zero Downtime Resharding:**
  - ✅ Discord stops letting your bot get added to new servers at certain points in time. For example, suppose you had
    150,000 servers running 150 shards. The maximum amount of servers your shards could hold is 150 \* 2500 = 375,000.
    If your bot reaches this, it can no longer join new servers until it re-shards.
  - ✅ DD proxy provides 2 types of re-sharding. Automated and manual. You can also have both.
    - ✅ Automated: This system will automatically begin a Zero-downtime resharding process behind the scenes when you
      reach 80% of your maximum servers allowed by your shards. For example, since 375,000 was the max, at 300,000 we
      would begin re-sharding behind the scenes with ZERO DOWNTIME.
      - ✅ 80% of maximum servers reached (The % of 80% is customizable.)
      - ✅ Identify limits have room to allow re-sharding. (Also customizable)
    - ✅ Manual: You can also trigger this manually should you choose.
- ✅ **Horizontal Scaling:**
  - ✅ The proxy system allows you to scale the bot horizontally. When you reach a huge size, you can either keep
    spending more money to keep beefing up your server or you can buy several cheaper servers and scale horizontally.
    The proxy means you can have WS handling on a completely separate system.
- ✅ **No Loss Restarts:**
  - ✅ When you restart a bot without the proxy system, normally you would lose many events. Users may be using commands
    or messages are sent that will not be filtered. As your bot's grow this number rises dramatically. Users may join
    who wont get the auto-roles or any other actions your bot should take. With the proxy system, you can keep
    restarting your bot and never lose any events. Events will be put into a queue while your bot is down(max size of
    queue is customizable), once the bot is available the queue will begin processing all events.
- ✅ **Controllers:**
  - ✅ The controller aspect gives you full control over everything inside the proxy. You can provide a function to
    simply override the handler. For example, if you would like a certain function to do something different, instead of
    having to fork and maintain your fork, you can just provide a function to override.
- ✅ **Clustering With Workers:**
  - ✅ Take full advantage of all your CPU cores by using workers to spread the load. Control how many shards per worker
    and how many workers to maximize efficiency!

### Custom Cache

Have your cache setup in any way you like. Redis, PGSQL or any cache layer you would like.

## Getting Started

### Minimal Example

Here is a minimal example to get started with:

```typescript
import { createBot, Intents, startBot } from "https://deno.land/x/discordeno@13.0.0-rc18/mod.ts";
import { enableCachePlugin, enableCacheSweepers } from "https://deno.land/x/discordeno_cache_plugin@0.0.18/mod.ts";

const baseBot = createBot({
  token: Deno.env.get("DISCORD_TOKEN"),
  intents: Intents.Guilds | Intents.GuildMessages,
  botId: Deno.env.get("BOT_ID"),
  events: {
    ready() {
      console.log("Successfully connected to gateway");
    },
    messageCreate(bot, message) {
      // Process the message here with your command handler
    },
  },
});

const bot = enableCachePlugin(baseBot);

enableCacheSweepers(bot);

await startBot(bot);
```

### Templates

Note to developers: don't worry, a lot of developers start out by building a Discord bot as their first project, and
it's not easy. Discordeno is designed and built with all of the issues in mind that many developers have encountered
when they initially started writing Discord bots using existing libraries. If you are a beginner, you can check out
these awesome official and unofficial templates:

- [Discordeno Template (official)](https://github.com/discordeno/discordeno/tree/main/template)
- [Serverless Slash Commands Template (official)](https://github.com/discordeno/serverless-deno-deploy-template)
- [`create-discordeno-bot` (WIP, unoffical)](https://github.com/Reboot-Codes/create-discordeno-bot/)
- [Add Your Own!](https://github.com/discordeno/discordeno/pulls)

### Frameworks

- [Natico](https://github.com/naticoo/framework)
- [Amethyst](https://github.com/AmethystFramework/framework)
- [Add Your Own!](https://github.com/discordeno/discordeno/pulls)

### Plugins

- [Cache Plugin](plugins/cache)
- [Fileloader Plugin](plugins/fileloader)
- [Helpers Plugin](plugins/helpers)
- [Permissions Plugin](plugins/permissions)

## Links

- [Website](https://discordeno.mod.land)
- [Documentation](https://doc.deno.land/https/deno.land/x/discordeno/mod.ts)
- [Discord](https://discord.com/invite/5vBgXk3UcZ)

## Contributing

We appreciate your help! Before contributing, please read the
[Contributing Guide](https://github.com/discordeno/discordeno/blob/main/.github/CONTRIBUTING.md).
