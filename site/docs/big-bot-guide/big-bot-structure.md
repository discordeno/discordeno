---
sidebar_position: 1
---

# The Structure of a Big Bot

In the starter guide, we used the cache plugin and `startBot()`. Although useful for small bots, these are not the best way to run a discord bot. And in reality, they are abstractions above the true structure of a discordeno bot. Let's break it down:

## The Rest Process

- Easily host on any serverless infrastructure.
- Freedom from global rate limit errors
  - As your bot grows, you want to handle global rate limits better. Shards don't communicate fast enough to truly handle it properly so this allows 1 rest handler across the entire bot.
  - In fact, you can host multiple instances of your bot and all connect to the same rest server.
- REST does not rest!
  - Separate rest means if your bot for whatever reason crashes, your requests that are queued will still keep going and will not be lost.
  - Seamless updates! When you want to update and reboot the bot, you could potentially lose tons of messages or responses that are in queue. Using this you could restart your bot without ever worrying about losing any responses.
- Single source of contact to Discord API.
  - This will allow you to make requests to discord from anywhere including a bot dashboard. You no longer need to have to communicate to your bot processes just to make a request or anything. Free up your bot process for processing bot events.

## The Gateway Process

- Zero Downtime Updates:
  - Your bot can be updated in a matter of seconds. With normal sharding, you have to restart which also has to process identifying all your shards with a 1/~5s rate limit. With WS handling moved to a proxy process, this allows you to instantly get the bot code restarted without any concerns of delays. If you have a bot on 200,000 servers normally this would mean a 20 minute delay to restart your bot if you made a small change and restarted.
- Zero Downtime Resharding:
  - Discord stops letting your bot get added to new servers at certain points in time. For example, suppose you had 150,000 servers running 150 shards. The maximum amount of servers your shards could hold is 150 * 2500 = 375,000. If your bot reaches this, it can no longer join new servers until it re-shards.
  - DD proxy provides 2 types of re-sharding. Automated and manual. You can also have both.
    - Automated: This system will automatically begin a Zero-downtime resharding process behind the scenes when you reach 80% of your maximum servers allowed by your shards. For example, since 375,000 was the max, at 300,000 we would begin re-sharding behind the scenes with ZERO DOWNTIME.
      - 80% of maximum servers reached (The % of 80% is customizable.)
      - Identify limits have room to allow re-sharding. (Also customizable)
    - Manual: You can also trigger this manually should you choose.
- Horizontal Scaling:
  - The proxy system allows you to scale the bot horizontally. When you reach a huge size, you can either keep spending more money to keep beefing up your server or you can buy several cheaper servers and scale horizontally. The proxy means you can have WS handling on a completely separate system.
- No Loss Restarts:
  - When you restart a bot without the proxy system, normally you would lose many events. Users may be using commands or messages are sent that will not be filtered. As your bot's grow this number rises dramatically. Users may join who wont get the auto-roles or any other actions your bot should take. With the proxy system, you can keep restarting your bot and never lose any events. Events will be put into a queue while your bot is down(max size of queue is customizable), once the bot is available the queue will begin processing all events.
- Controllers:
  - Using a central controller gives you full control over everything inside the proxy. You can provide a function to simply override the handler. For example, if you would like a certain function to do something different, instead of having to fork and maintain your fork, you can just provide a function to override.
- Clustering With Workers:
  - Take full advantage of all your CPU cores by using workers to spread the load. Control how many shards per worker and how many workers to maximize efficiency!

## The Cache Process

Earlier, we used the cache plugin to cache the guilds and members that our bot could see. When we restart our bot, we loose that cache, and need to rebuild it. This means that the first command in every server will take a slightly longer time to execute as we cache the guilds and members. Using a separate cache process allows us to save this data on restart.
