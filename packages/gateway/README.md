# Discordeno WS

<img align="right" src="https://raw.githubusercontent.com/discordeno/discordeno/main/website/static/img/logo.png" height="150px" />

Discord API library for [Node.JS](https://nodejs.org), [Deno](https://deno.land) & [Bun](https://bun.sh/)

[![Discord](https://img.shields.io/discord/785384884197392384?color=7289da&logo=discord&logoColor=dark)](https://discord.com/invite/5vBgXk3UcZ)
[![codecov](https://codecov.io/gh/discordeno/discordeno/branch/main/graph/badge.svg?token=SQI9OYJ7AK)](https://codecov.io/gh/discordeno/discordeno)
![action status](https://github.com/discordeno/discordeno/actions/workflows/lib-check.yml/badge.svg?event=push)

> [!WARNING]
> Using a Standalone / Proxy WS is mean for advanced developers only

Standalone WebSocket to connect to the Discord API.

- **Zero Downtime Updates**:

  - Your bot can be updated in a matter of seconds. With normal sharding, you have to restart which also has to process
    identifying all your shards with a 1/~5s rate limit. With WS handling moved to a proxy process, this allows you to
    instantly get the bot code restarted without any concerns of delays. If you have a bot on 200,000 servers normally
    this would mean a 20 minute delay to restart your bot if you made a small change and restarted.

- **Zero Downtime Resharding**:

  - Discord stops letting your bot get added to new servers at certain points in time. For example, suppose you had
    150,000 servers running 150 shards. The maximum amount of servers your shards could hold is 150 \* 2500 = 375,000.
    If your bot reaches this, it can no longer join new servers until it re-shards.
  - DD proxy provides 2 types of re-sharding. Automated and manual. You can also have both.
    - `Automated`: This system will automatically begin a Zero-downtime resharding process behind the scenes when you
      reach 80% of your maximum servers allowed by your shards. For example, since 375,000 was the max, at 300,000 we
      would begin re-sharding behind the scenes with `ZERO DOWNTIME`.
      - 80% of maximum servers reached (The % of 80% is customizable.)
      - Identify limits have room to allow re-sharding. (Also customizable)
    - `Manual`: You can also trigger this manually should you choose.

- **Horizontal Scaling**:

  - The proxy system allows you to scale the bot horizontally. When you reach a huge size, you can either keep spending
    more money to keep beefing up your server or you can buy several cheaper servers and scale horizontally. The proxy
    means you can have WS handling on a completely separate system.

- **No Loss Restarts**:

  - When you restart a bot without the proxy system, normally you would lose many events. Users may be using commands or
    messages are sent that will not be filtered. As your bot's grow this number rises dramatically. Users may join who
    wont get the auto-roles or any other actions your bot should take. With the proxy system, you can keep restarting
    your bot and never lose any events. Events will be put into a queue while your bot is down(max size of queue is
    customizable), once the bot is available the queue will begin processing all events.

- **Controllers**:

  - The controller aspect gives you full control over everything inside the proxy. You can provide a function to simply
    override the handler. For example, if you would like a certain function to do something different, instead of having
    to fork and maintain your fork, you can just provide a function to override.

- **Clustering With Workers**:
  - Take full advantage of all your CPU cores by using workers to spread the load. Control how many shards per worker
    and how many workers to maximize efficiency!

## Links

- [Website](https://discordeno.js.org/)
- [Documentation](https://doc.deno.land/https/deno.land/x/discordeno/mod.ts)
- [Discord](https://discord.com/invite/5vBgXk3UcZ)
