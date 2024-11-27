---
sidebar_position: 4
sidebar_label: Step 3 - Gateway
---

import BrowserOnly from '@docusaurus/BrowserOnly'
import FlowChart from '@site/src/components/bigbotguide/GatewayFlowChart'

# Standalone Gateway

Sweet, it is time to start our gateway code. By now, you should have already built your rest process, as we will need it shortly. The gateway portion is the hardest and most complex part of making a bot. This is where most of your time will be spent to optimize your setup.

## Understanding The Concepts

Let's take a minute to understand the unique design approach of discordeno's gateway system. In Discordeno, we opt for maximum flexibility and scalability at the cost of user experience. This means it is a bit harder to use Discordeno but by far, it should be able to do anything you can dream of much easier.

In Discordeno, we have 2 main portions of the gateway system. We have what we call the _manager_ and we have the _Shard_. These are important to keep in mind going forward. They work similar to how a a worker system is designed. You have 1 main process that manages all the other ones.

**Key Points:**

- Any Shard can communicate directly to your event handler _(bot)_ process.
- Bot process should communicate to the manager only.

Let's say the bot process needs to execute some code on some shard such as fetching members, changing bot's status, or anything else. The ideal way to do this is the bot process sends a request to the gateway manager process which sends a request to the shard process which can send it back to the bot process directly. All of this will help make it easily scale horizontally, which we will start to see below as we code.

## Understanding the Flow

In this example, we're proceeding with the understanding that we have 5,000 shards, 5,000,000 Discord servers, which we'll be scaling horizontally across 10 separate dedicated servers with 500 shards each. Each server will have 50 worker threads that contain 10 shards each to split the load evenly among all of the servers properly. Take a look at the following diagram to get a better understanding of this:

<BrowserOnly>{() => <FlowChart />}</BrowserOnly>

Now let's proceed with the next steps.

## Creating The Manager

## Connecting To REST

Before we begin making a gateway manager, we need to first prepare a connection to our REST manager. Go ahead and make a file called `services/gateway/rest.ts`.

```ts
import { createRestManager } from '@discordeno/rest'

export const REST = createRestManager({
  // YOUR BOT TOKEN HERE
  token: process.env.TOKEN,
  proxy: {
    baseUrl: process.env.REST_URL,
    authorization: process.env.AUTHORIZATION,
  },
})
```

The `baseUrl` should be pointed at the server where you are hosting your REST manager we created earlier in Step 2. This will make sure that requests sent from the gateway are sent to your proxy REST process and NOT sent directly to discord.

## Preparing Our Gateway Manager

We are going to proceed with the understanding that we have 5,000 shards, 5,000,000 Discord servers. Let's make a file called `services/gateway/manager.ts`

```ts
import { createGatewayManager } from '@discordeno/gateway'
import { GatewayIntents } from '@discordeno/types'
import { REST } from '../rest.ts'

export const GATEWAY = createGatewayManager({
  token: process.env.TOKEN,
  intents: Intents.Guilds | Intents.GuildMessages,
  shardsPerWorker: 500,
  totalWorkers: 10,
  connection: await REST.getSessionInfo(),
})

GATEWAY.spawnShards()
```

Now let's break it down.

### Worker & Server Confusion

The `shardsPerWorker` property represents how many shards we will run per **server** in this eaxmple. This property is called `perWorker` because for mid sized bots that don't require separate dedicated servers, it can use _worker threads_ to mitigate the load in that single server. Here, we are going to be aiming to scale much much larger so we need to think bigger. In our case, what we are telling our gateway manager is that it should create 500 shards per **server**. Sounds like a lot? Yes, but no problem! Those shards will then be split across _worker threads_ on each server.

The `totalWorkers` property represents the number of **servers** we have available for shards. For example, if we have 10 dedicated servers available to us, this will allow the manager to spread out the load across 10 total **servers**.

:::tip
You can adjust the amount of **shardsPerWorker** and **totalWorkers** to fit your specific needs.
:::

### Setting Up Bot To Gateway Communication

Let's make a file called `services/gateway/index.ts` and paste the following code:

```ts
import { logger } from '@discordeno/utils'
import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

const AUTHORIZATION = process.env.AUTHORIZATION as string

const app = express()

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

app.all('/*', async (req, res) => {
  if (!AUTHORIZATION || AUTHORIZATION !== req.headers.authorization) {
    return res.status(401).json({ error: 'Invalid authorization key.' })
  }

  try {
    // Identify A Shard
    switch (req.body.type) {
      case 'REQUEST_MEMBERS': {
        return await GATEWAY.requestMembers(req.body.guildId, req.body.options)
      }
      default:
        logger.error(
          `[Shard] Unknown request received. ${JSON.stringify(req.body)}`,
        )
        return res
          .status(404)
          .json({ message: 'Unknown request received.', status: 404 })
    }
  } catch (error: any) {
    console.log(error)
    res.status(500).json(error)
  }
})

app.listen(process.env.GATEWAY_MANAGER_PORT, () => {
  console.log(`Listening at ${process.env.GATEWAY_MANAGER_URL}`)
})
```

### Setting Up Gateway To Shard Communication

Continuing from the code above, now we can start telling our gateway how to communicate to our shards. We do this bit by bit.

```ts
export const GATEWAY = createGatewayManager({
  token: process.env.TOKEN,
  intents: Intents.Guilds | Intents.GuildMessages,
  shardsPerWorker: 500,
  totalWorkers: 10,
  connection: await REST.getSessionInfo(),
})

GATEWAY.tellWorkerToIdentify = async function (workerId, shardId, bucketId) {
  const url = process.env[`SERVER_URL_${workerId}`]
  if (!url)
    return logger.error(
      `No server URL found for server #${workerId}. Unable to start Shard #${shardId}`,
    )

  await fetch(url, {
    method: 'POST',
    headers: {
      authorization: process.env.AUTHORIZATION,
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ type: 'IDENTIFY_SHARD', shardId }),
  })
    .then(res => res.json())
    .catch(logger.error)
}

GATEWAY.spawnShards()
```

Here, we are overriding the built in method on the gateway manager called `tellWorkerToIdentify`. Internally, this function just simply starts a new shard, as by default, the lib supports small bots. For our case, we are going to make it get the server url from a `.env` file and then send the request to identify it.

:::tip
For the purposes of the guide, we are using `fetch` to communicate between servers but you can use any communication system you prefer. I highly recommend taking the time to optimize this portion with a more performant communication system. Ideal recommendation would be gRPC.
:::

Now, let's go ahead and set up the server where we will receive this and start a Shard.

### Setting Up Sharder

Now, we need to setup a sharder process to spawn all our shards in each server. Since we will have 500 shards in each server, we need to split them evenly with `worker_threads`, so we'll be setting up a master process and worker for our sharder.

### Setting Up Sharding Master Process

Just like before, we are going to make another http listener to listen for incoming requests from the gateway manager and delegate them outwards to different workers. Make a file called `services/gateway/sharding/index.ts`

```ts
import dotenv from 'dotenv'
import express from 'express'
import { Worker } from 'worker_threads'

dotenv.config()

const AUTHORIZATION = process.env.AUTHORIZATION as string

// Create workers
const WORKERS = new Collection<number, Worker>()

const app = express()

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

app.all('/*', async (req, res) => {
  if (!AUTHORIZATION || AUTHORIZATION !== req.headers.authorization) {
    return res.status(401).json({ error: 'Invalid authorization key.' })
  }

  try {
    // Identify A Shard
    switch (req.body.type) {
      case 'IDENTIFY_SHARD': {
        const workerId = Math.floor(req.body.shardId / 10)
        let worker = WORKERS.get(workerId)

        if (!worker) {
          worker = new Worker('./worker.js', { workerData: { workerId } })

          WORKERS.set(workerId, worker)
        }

        worker.postMessage(req.body)

        return res.status(200).send()
      }
      default:
        logger.error(
          `[Sharding Master] Unknown request received. ${JSON.stringify(
            req.body,
          )}`,
        )

        return res
          .status(404)
          .json({ message: 'Unknown request received.', status: 404 })
    }
  } catch (error: any) {
    console.log(error)
    res.status(500).json(error)
  }
})

app.listen(process.env.SHARD_SERVER_PORT, () => {
  console.log(`[Sharding Master] Listening at ${process.env.SERVER_URL}`)
})
```

Most of this code is another http listener again. The part we are going to focus on is the part after the authorization check. Each request is passed into a switch statement which determines which type of request to handle. If it is the `identify` request, it will send that request to the corresponding worker by finding the worker id responsible for this shard and then getting the worker object from the `WORKERS` collection or spawning the worker if it doesn't already exist, and then it forwards the request to that worker.

### Setting Up Sharding Worker Process

Now that we have our sharding master process ready, create a file called `services/gateway/sharding/worker.ts` for it to spawn and forward requests to.

```ts
import { DiscordenoShard } from '@discordeno/gateway'
import { logger } from '@discordeno/utils'
import { Intents } from '@discordeno/types'
import { parentPort, workerData } from 'worker_threads'
import dotenv from 'dotenv'

dotenv.config()

if (!parentPort) throw new Error('Parent port is null')

const SHARDS = new Collection<number, DiscordenoShard>()

function getUrlFromShardId(totalShards: number, shardId: number) {
  const urls = process.env.EVENT_HANDLER_URLS?.split(',') ?? []
  const index = totalShards % shardId

  return urls[index] ?? urls[0]
}

parentPort.on('message', async data => {
  try {
    switch (data.type) {
      // Identify A Shard
      case 'IDENTIFY_SHARD': {
        logger.info(
          `[Sharding Worker #${workerData.workerId}] identifying ${
            SHARDS.has(data.shardId) ? 'existing' : 'new'
          } shard (${data.shardId})`,
        )

        const shard =
          SHARDS.get(data.shardId) ??
          new DiscordenoShard({
            id: data.shardId,
            connection: {
              compress: data.compress,
              intents: data.intents,
              properties: data.properties,
              token: data.token,
              totalShards: data.totalShards,
              url: data.url,
              version: data.version,
            },
            // Enable this in the next portion of the guide.
            // events,
          })

        SHARDS.set(shard.id, shard)

        await shard.identify()
      }
      default:
        logger.error(
          `[Sharding Worker #${
            workerData.workerId
          }] Unknown request received. ${JSON.stringify(data)}`,
        )
    }
  } catch (error: any) {
    console.log(error)
  }
})

console.log(
  `[Sharding Worker #${workerData.workerId}] Sharding Worker Started.`,
)
```

Here, we listen to the master process for message event, through which we'll receive requests to identify shards or any other requests from the gateway manager. Each message is passed into a switch statement which determines which type of request to handle. If it is the `identify` request, it will begin identifying the shard. First it checks if an existing shard exists and triggers identify on that which will internally handle this cleanly by closing existing shard, and opening a new one. If no shard exists, we create this shard and save it to our SHARDS cache. Using this method, you can support many different types of communication between your gateway manager and your shards.

Next, we will focus on the `events` portion which we had commented out above. Each shard handles many events and this will be the portion where we tell the shard how to handle those events. For this guide, we will only cover the `message` event, but you can implement any other events you require as you need following the same method.

:::info
Shard events are NOT the same as your regular bot events. **All** your bot events will be received on the `shard.events.message` function.
:::

```diff
const shard =
  SHARDS.get(req.body.shardId) ??
  new DiscordenoShard({
    id: req.body.shardId,
    connection: {
      compress: req.body.compress,
      intents: req.body.intents,
      properties: req.body.properties,
      token: req.body.token,
      totalShards: req.body.totalShards,
      url: req.body.url,
      version: req.body.version,
    },
+    events: {
+      async message(shrd, payload) {
+        await fetch(getUrlFromShardId(req.body.totalShards, shrd.id), {
+          method: 'POST',
+          headers: {
+            'Content-Type': 'application/json',
+            authorization: AUTHORIZATION,
+          },
+          body: JSON.stringify({ payload, shardId }),
+        })
+          .then(res => res.text())
+          .catch(logger.error)
+      },
+    },
  })
```

Now, whenever the shard gets an event, it will send that payload to the event listener url. The event listener is also known as the "bot".

:::tip
If you have the money, I would recommend writing the event listener (bot), in a serverless friendly manner. If that code is deployed to something like cloudflare workers, your bot will have unlimited scalability and your shards would simply route these events to be sent there.
:::

At this point, what we need next is the bot process which is listening to these events. However, before we go make that, let us take some time and really improve our gateway logic a bit more.

## Analytics

There is a lot of analytics you can build here. But we will specifically cover just the analytics for a couple of things. You should take the time to implement much more of the analytics. Go ahead and make a file: `services/gateway/analytics.ts`

```ts
import { InfluxDB, Point } from '@influxdata/influxdb-client'

const INFLUX_ORG = process.env.INFLUX_ORG as string
const INFLUX_BUCKET = process.env.INFLUX_BUCKET as string
const INFLUX_TOKEN = process.env.INFLUX_TOKEN as string
const INFLUX_URL = process.env.INFLUX_URL as string

export const influxDB =
  INFLUX_URL && INFLUX_TOKEN
    ? new InfluxDB({ url: INFLUX_URL, token: INFLUX_TOKEN })
    : undefined
export const Influx = influxDB?.getWriteApi(INFLUX_ORG, INFLUX_BUCKET)

let savingAnalyticsId: NodeJS.Interval | undefined = undefined
if (!saveAnalyticsId) {
  setInterval(() => {
    console.log(`[Influx - Gateway] Saving events...`)
    Influx?.flush()
      .then(() => {
        console.log(`[Influx - Gateway] Saved events!`)
      })
      .catch(error => {
        console.log(`[Influx - Gateway] Error saving events!`, error)
      })
    // Every 15 seconds
  }, 15000)
}
```

Now, we can begin implementing influxdb in our sharder. Go back to `services/gateway/sharding/worker.ts`.

```ts
events: {
  async message(shrd, payload) {
    Influx?.writePoint(
      new Point('gatewayEvents')
        .timestamp(new Date())
        .stringField('type', payload.t ?? "NA")
        .tag('shard', shardId),
    );

    await fetch(
      process.env.EVENT_LISTENER_URL,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', authorization: AUTHORIZATION },
        body: JSON.stringify({payload, shardId }),
      }
    )
      .then(res => res.text())
      .catch(logger.error);
  },
},
```

Easy as that. Take the time to add more data to your events. For example, a cool one to have might be your worker id. Next, let's add a couple more just to show how to apply for other shard events.

```ts
events: {
  async message(shrd, payload) {
    // lots of code here
  },
  identified() {
    Influx?.writePoint(
      new Point('gatewayEvents')
        .timestamp(new Date())
        .stringField('type', "IDENTIFIED"),
        .tag('shard', shardId),
    );
  },
  resumed() {
    Influx?.writePoint(
      new Point('gatewayEvents')
        .timestamp(new Date())
        .stringField('type', "RESUMED"),
        .tag('shard', shardId),
    );
  },
},
```

## Further Optimizations

There are a few things we can improve in our gateway proxy, should we require certain features in our bot. You can choose to implement these should you need them.

### GUILD_LOADED

This is for bots who need to take certain actions when the bot is added to or removed from a server. There are a few different things to keep in mind here and its important for you to understand whether you need to have **GUILD_LOADED_DD** added or not. Discord is really odd when it comes to **GUILD_CREATE** and **GUILD_DELETE** events. **GUILD_CREATE** event are emitted in various different circumstances:

- A guild was added
- Shard resumed
- Unavailable guild became available
- Initial loading when connecting to discord
- Insert anything I didn't think of here...

Due to this, we can't find if a **GUILD_CREATE** event was sent because the bot was added to a guild or not without a few more steps. Let's start by creating a small local cache at the top of the file.

```ts
const cache = {
  guildIds: new Set<string>(),
  loadingGuildIds: new Set<string>(),
}
```

Next, let's handle the fact that some guilds are actually new guilds the bot gets added to. To make this possible, we need to store which guilds already have the bot in it when it starts. A list of guild ids are sent in the READY event, telling the bot that the bot is already in these guilds. So let's store them to cache.

```ts
events: {
  async message(shrd, payload) {
    Influx?.writePoint(
      new Point('gatewayEvents')
        .timestamp(new Date())
        .stringField('type', payload.t ?? "NA")
        .tag('shard', shardId),
    );

    if (payload.t === "READY") {
      // Marks which guilds the bot in when initial loading in cache
      payload.d.guilds.forEach((g) => cache.loadingGuildIds.add(g.id));
    }

    await fetch(
      process.env.EVENT_LISTENER_URL,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', authorization: AUTHORIZATION },
        body: JSON.stringify({payload, shardId }),
      }
    )
      .then(res => res.text())
      .catch(logger.error);
  },
},
```

Now, we need to make sure that this will handle it correctly by changing any guild creates that are not new guilds, to a private event.

```ts
if (payload.t === 'READY') {
  // Marks which guilds the bot in when initial loading in cache
  payload.d.guilds.forEach(g => cache.loadingGuildIds.add(g.id))
}

if (payload.t === 'GUILD_CREATE') {
  // Check if this id is in cache
  const existing = cache.guildIds.has(payload.d.id)
  // If it already exists this was either a shard resume or unavailable guild became available etc...
  if (existing) return

  // add this id to cache or db
  cache.guildIds.add(payload.d.id)

  if (cache.loadingGuildIds.has(payload.d.id)) {
    // SEND A CUSTOM EVENT. Name it whatever u want
    payload.t = 'GUILD_LOADED_DD'
    // Remove from cache
    cache.loadingGuildIds.delete(id)
  }

  cache.guildIds.add(id)
}
```

This will make it so whenever a **GUILD_CREATE** arrives from the initial batch from the **READY** event, it will rename the event to **GUILD_LOADED_DD**. Any other **GUILD_CREATE** that arrive can be safely ignored, as those are just guilds being resumed or becoming available. Should you need these events, feel free to edit the code above and create custom events just as **GUILD_CREATE_RESUMED** or **GUILD_CREATE_AVAILABLE**. This way, when your bot receives a **GUILD_CREATE**, it will be automatically known that this is the bot being added to a new guild.

One last bit before you are done, simply add the following to make it ignore any useless **GUILD_DELETE** events as well. You can also choose rename it should you like to something like **GUILD_UNAVAILABLE**.

```ts
if (payload.t === 'GUILD_DELETE') {
  if ((payload.d as DiscordUnavailableGuild).unavailable) return
}
```

### MESSAGE_UPDATE

One other area where we can optimize is for the **MESSAGE_UPDATE** event, assuming you have the MessageContent intent enabled. You can save a ton of your CPU for gateway and bot by adding this in. This event can spam for no reason whatsoever and we can use the following code to ignore useless events. For example, any message that is sent with an embed will have a

- MESSAGE_CREATE
- MESSAGE_UPDATE

The update event is sent just to reflect that this message had an embed in it. This is how discord loads embeds by internally editing it and that sends a MESSAGE_UPDATE event out. Imagine every time your bot sends a message, you are processing double the event load. Further, it's not just your bot but every bot. Even when a bot farm or abusive user decides to make self bots send embeds, it will do the same.

It gets even worse when you realize that any `link` in a message will trigger the same. So if a user sends a message with 5 urls. That will trigger:

- MESSAGE_CREATE
- MESSAGE_UPDATE
- MESSAGE_UPDATE
- MESSAGE_UPDATE
- MESSAGE_UPDATE
- MESSAGE_UPDATE

Then let's say the user actually edits the message just a tiny bit.

- MESSAGE_UPDATE
- MESSAGE_UPDATE
- MESSAGE_UPDATE
- MESSAGE_UPDATE
- MESSAGE_UPDATE

Imagine having to process all these events, sending them through your queue system and causing a waste of CPU processing power so let's go ahead and change our code to:

```ts
if (payload.t === 'MESSAGE_UPDATE') {
  const message = payload.d as DiscordMessage

  const id = message.id
  const content = message.content || ''
  const cached = cache.editedMessages.get(id)

  if (cached === content) return
  else {
    // Add to local cache for future events comparison
    cache.editedMessages.set(id, content)
    // Remove after 10 seconds from cache
    setTimeout(() => {
      cache.editedMessages.delete(id)
    }, 10000)
  }
}
```

:::tip
Take the time to improve more events like this for you bot. For example, if you use the MessageIntent for message commands and nothing else. You can choose to make a if () for the MESSAGE_CREATE and ignore any events that don't start with your bots prefix.
:::

### Event Queue

We should take the time here to implement a small queue where we can store events in the off chance that our event listener was not able to receive the event. For example, if you are restarting the bot process for a split second, you might lose some events. To avoid this issue, we should build an event queue which will make sure we don't lose them.

RabbitMQ setup guide here.

## Resharding

Now let's enable resharding on our bot so we don't need to deal with it. Remember, Discord stops allowing your bot to be added to new servers when you max out your existing max shards. Consider a bot started with 150 shards operating on 150,000 servers. Your shards support a maximum of 150 \* 2500 = 375,000 servers. Your bot will be unable to join new servers once it reaches this point until it reshards. Discordeno provides 2 types of resharding: Automated and Manual. You can also have both.

- Automated: This system will automatically begin a Zero-downtime resharding process behind the scenes when you
  reach 80% of your maximum servers allowed by your shards. For example, since 375,000 was the max, at 300,000 we
  would begin resharding behind the scenes with ZERO DOWNTIME.
- Manual: You can also trigger this manually, should you choose. For example, when discord releases a new API version, you can update your gateway to new version with no downtime.

By default, automated resharding is enabled with 80% shards full percentage that checks every 8 hours once. You may disable or change it as you want. You can change settings for your resharder inside `createGatewayManager`:

```js
const GATEWAY = createGatewayManager({
  ...
  resharding: {
    enabled: true,
    shardsFullPercentage: 80,
    checkInterval: 28800000, // 8 hours
    getSessionInfo: REST.getSessionInfo(), // This option is necessary for gateway proxies (which is the case here)
  }
})
```

Take your time to check out all the other properties and methods you can change inside `GATEWAY.resharding`.
  

## Evals

One of the last things we should do, is make it possible to run commands on this process. To do this, we simply create a small bot on this process with an eval command that listens for our messages only on our developer server. This way, we can dynamically update any properties we may need to. For example, if discord updates the API version, we can easily switch the api version with a simple command.

Please review the [Evals section in Step 2 - REST](./step-2-rest.md#evals) portion of this guide to see how we made an eval in that process. The entire setup would be repeated here for the gateway portion as well. That way, you can dynamically change anything in your gateway, should you need.
