# Step 2: Creating A Standalone Gateway Process

If you are reading this, you should have your REST process completed. We are going to need it here. This process will be connecting to discord's websockets which will send you all the events.

Before, we dive into how, here is a quick summary of why you will want a standalone gateway process.

## Why Use Standalone REST Process?

- **Zero Downtime Updates**:

  - Your bot can be updated in a matter of seconds. With normal sharding, you
    have to restart which also has to process identifying all your shards with a
    1/~5s rate limit. With WS handling moved to a proxy process, this allows you
    to instantly get the bot code restarted without any concerns of delays. If
    you have a bot on 200,000 servers normally this would mean a 20 minute delay
    to restart your bot if you made a small change and restarted.

- **Zero Downtime Resharding**:

  - Discord stops letting your bot get added to new servers at certain points in
    time. For example, suppose you had 150,000 servers running 150 shards. The
    maximum amount of servers your shards could hold is 150 \* 2500 = 375,000. If
    your bot reaches this, it can no longer join new servers until it re-shards.
  - DD proxy provides 2 types of re-sharding. Automated and manual. You can also
    have both.
    - `Automated`: This system will automatically begin a Zero-downtime
      resharding process behind the scenes when you reach 80% of your maximum
      servers allowed by your shards. For example, since 375,000 was the max, at
      300,000 we would begin re-sharding behind the scenes with `ZERO DOWNTIME`.
      - 80% of maximum servers reached (The % of 80% is customizable.)
      - Identify limits have room to allow re-sharding. (Also customizable)
    - `Manual`: You can also trigger this manually should you choose.

- **Horizontal Scaling**:

  - The proxy system allows you to scale the bot horizontally. When you reach a
    huge size, you can either keep spending more money to keep beefing up your
    server or you can buy several cheaper servers and scale horizontally. The
    proxy means you can have WS handling on a completely separate system.

- **No Loss Restarts**:

  - When you restart a bot without the proxy system, normally you would lose
    many events. Users may be using commands or messages are sent that will not
    be filtered. As your bot's grow this number rises dramatically. Users may
    join who wont get the auto-roles or any other actions your bot should take.
    With the proxy system, you can keep restarting your bot and never lose any
    events. Events will be put into a queue while your bot is down(max size of
    queue is customizable), once the bot is available the queue will begin
    processing all events.

- **Controllers**:

  - The controller aspect gives you full control over everything inside the
    proxy. You can provide a function to simply override the handler. For
    example, if you would like a certain function to do something different,
    instead of having to fork and maintain your fork, you can just provide a
    function to override.

- **Clustering With Workers**:
  - Take full advantage of all your CPU cores by using workers to spread the
    load. Control how many shards per worker and how many workers to maximize
    efficiency!

## Creating Gateway Manager

Create a file under some path like `src/gateway/mod.ts`. 

```ts
import { DISCORD_TOKEN, REST_AUTHORIZATION, REST_PORT } from "../../configs.ts";
import { BASE_URL, createRestManager } from "../../deps.ts";

const rest = createRestManager({
  token: DISCORD_TOKEN,
  secretKey: REST_AUTHORIZATION,
  customUrl: `http://localhost:${REST_PORT}`,
});
```

Throw another rest manager here which will be responsible for calling the main REST process we created in Step 1. This will allow your gateway to communicate to the other process. Remember this is just to communicate outwards, this file should not have the http listener.

> Feel free to refactor and optimize this should you wish to move `const rest...` to a separate file and reuse in both steps.

### Getting Gateway Bot Data

Now we need to use this rest manager to call the api to get information about how to connect to discord's gateway for your bot.

```ts
const rest = createRestManager({
  token: DISCORD_TOKEN,
  secretKey: REST_AUTHORIZATION,
  customUrl: `http://localhost:${REST_PORT}`,
});

// CALL THE REST PROCESS TO GET GATEWAY DATA
const result = await rest.runMethod(rest, 'get', endpoints.GATEWAY_BOT).then((res) => ({
  url: res.url,
  shards: res.shards,
  sessionStartLimit: {
    total: res.session_start_limit.total,
    remaining: res.session_start_limit.remaining,
    resetAfter: res.session_start_limit.reset_after,
    maxConcurrency: res.session_start_limit.max_concurrency,
  },
}));
```

With this info, we can now create our gateway manager.

### Understanding Gateway Manager

```ts
const gateway = createGatewayManager({
  secretKey: EVENT_HANDLER_SECRET_KEY,
  token: DISCORD_TOKEN,
  intents: ['GuildMessages', 'Guilds'],
  shardsRecommended: result.shards,
  sessionStartLimitTotal: result.sessionStartLimit.total,
  sessionStartLimitRemaining: result.sessionStartLimit.remaining,
  sessionStartLimitResetAfter: result.sessionStartLimit.resetAfter,
  maxConcurrency: result.sessionStartLimit.maxConcurrency,
  maxShards: result.shards,
  lastShardId: result.shards,
  // debug: console.log,
  handleDiscordPayload: async function (_, data, shardId) {
    await fetch(`${EVENT_HANDLER_URL}:${EVENT_HANDLER_PORT}`, {
      headers: {
        Authorization: gateway.secretKey,
        method: 'POST',
        body: JSON.stringify({
          shardId,
          data,
        }),
      },
    })
      // BELOW IS FOR SOLVING DENO MEMORY LEAK. Node users do your thing.
      .then((res) => res.text())
      .catch(() => null)
  },
})
```


**Basic Keys**

- `EVENT_HANDLER_SECRET_KEY` is from your configs that will be used to make sure requests sent to your event handler process are indeed from you.
- `DISCORD_TOKEN` if you can't figure this out, this guide isn't for you. Please find another.
- `intents` pass in a number or a string of intents. Autocomplete/type-safety is provided for strings :)

**Discord Data Keys**:  These keys will be the data you got from the gateway request we made earlier.
- `shardsRecommended`
- `sessionStartLimitTotal` 
- `sessionStartLimitRemaining`
- `sessionStartLimitResetAfter`
- `maxConcurrency`

**Powerful Keys**

If your bot is going to be run on one process, you can re-use the data that discord gave you to connect. 

- `maxShards`: is the maximum number of shards you want to use for connecting your bot. Should you think Discord is not smart enough to recommend a good amount, use this to override their choice. Highly recommend just using theirs.
- `lastShardId`: is the last shard you want to connect in this process.
    - Using a combination of `lastShardId` & `firstShardId`, you can create several processes or even several servers to handle different amounts of shards should your bot get that big to require horizontal scaling. You can control how many shards each gateway manager will be responsible for.
- `reshard`: Whether or not to automatically reshard the bot when necessary with zero downtime deployment strategy. Default: true.
- `reshardPercentage`: The % of servers to trigger a reshard. Default: 80%.
-  `spawnShardDelay`: The delay in milliseconds to wait before spawning next shard. OPTIMAL IS ABOVE 2500. YOU DON"T WANT TO HIT THE RATE LIMIT!!! This is mainly if you are changing internals a lot and need to modify this behavior.
- `useOptimalLargeBotSharding`: Whether or not the resharder should automatically switch to LARGE BOT SHARDING when you are above 100K servers.
- `shardsPerCluster`: The amount of shards to load per worker. Discussed in detail below.
- `maxClusters`: The maximum amount of workers to use for your bot.

#### Gateway Cache

There is a few things that we cache in the gateway process directly, because sending them across the network is not ideal. This is done to support custom cache functionality.

- `guildIds`: Used for determining what type of GUILD_CREATE event is received.
- `loadingGuildIds`: Used for determining if all guilds have arrived when initially connecting.
- `editedMessages`: Used to prevent spam of events across the network. MESSAGE_UPDATE are an extremely heavy event. Any embed or link that is in a message will unfurl triggerring a message update event. This is undesired behavior for 99% of bots out there. If someone sends a message with 5 urls, in there you will get a MESSAGE_CREATE and 5 MESSAGE_UPDATE events. If that user edits a single letter on it you now get 6 MESSAGE_UPDATE events, 1 for the content change and 5 more for each url being unfurled. The editedMessages cache checks if the content of the message changed or not before sending the event downstream. Override this behavior if you need different behavior. 

#### Gateway Method Overriding

One of the benefits of Discordeno is that you can override/customize anything from the library. Should you desire to change the logic in any method it is as simple as:

```ts
// TYPINGS WILL BE AUTOMATICALLY PROVIDED
gateway.heartbeat = function(gateway, shardId, interval) {
    // YOUR CUSTOM HANDLING CODE HERE
}
```

### Handle Discord Payloads

One of the big things we didn't cover yet is the handler for discord payloads. This is the main sauce of your gateway process here. This is going to take the events that the gateway manager processed and send it to your event handler. How you wish to communicate with your event handler is up to you. For this guide, we will use http, but you can replace that with anything you like. 

```ts
handleDiscordPayload: async function (_, data, shardId) {
    // CHANGE FROM SENDING THROUGH HTTP TO USING A WS FOR FASTER PROCESSING! OR HTTP3 OR WHATEVER!
    await fetch(`${EVENT_HANDLER_URL}:${EVENT_HANDLER_PORT}`, {
      headers: {
        Authorization: gateway.secretKey,
        method: 'POST',
        body: JSON.stringify({
          shardId,
          data,
        }),
      },
    })
      // BELOW IS FOR SOLVING DENO MEMORY LEAK. Node users do your thing.
      .then((res) => res.text())
      .catch(() => null)
  },
```

You can change this function to use a WS or any form of communication you prefer to use to send this to your event handler.

## Spawning Shards

Once you are ready and the gateway has been created as you desired, we can begin spawning the shards.

```ts
gateway.spawnShards(gateway)
```

## Workers

Now, we should take a minute here to talk about workers. Workers are just Clusters in Node.js

When you have a big bot and you are processing millions of events, you need to speed up that processing. Keeping it in 1 thread is not very nice since JavaScript is single threaded. This means it can only process 1 event at a time. With workers, you can make it process several events at the same time. We mentioned the `shardsPerCluster` earlier. This option was added to allow you to choose how many shards should be managed by each worker.

When shards are spawn they are triggered by a method on gateway.
```ts
gateway.tellClusterToIdentify = async function(gateway, workerId, shardId, bucketId) {
  await gateway.identify(gateway, shardId, gateway.maxShards);
}
```

You can choose to replace the handler with any desired functionality you like. For example, should should you want to create a new worker for each new workerId that appears and have that worker trigger the identify functionaly. How you choose to handler workers is left in your care.