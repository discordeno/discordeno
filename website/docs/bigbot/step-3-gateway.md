---
sidebar_position: 4
sidebar_label: Step 3 - Gateway
---

# Standalone Gateway

Sweet, it is time to start our gateway code. By now, you should have already built your rest process, as we will need it shortly. The gateway portion is the hardest and most complex part of making a bot. This is where most of your time will be spent to optimize your setup.

## Understanding The Concepts

Let's take a minute to understand the unique design approach of discordeno's gateway system. In Discordeno, we opt for maximum flexibility and scalability at the cost of user experience. This means it is a bit harder to use Discordeno but by far, it should be able to do anything you can dream of much easier.

In Discordeno, we have 2 main portions of the gateway system. We have what we call the _manager_ and we have the _Shard_. These are important to keep in mind going forward. They work similar to how a a worker system is designed. You have 1 main process that manages all the other ones.

**Key Points:**

- Any Shard can communicate directly to your event handler _(bot)_ process.
- Bot process should communicate to the manager only.

Let's say the bot process needs to execute some code on some shard such as fetching members, changing bot's status, or anything else. The ideal way to do this is the bot process sends a request to the gateway manager process which sends a request to the shard process which can send it back to the bot process directly. All of this will help make it easily scale horizontally, which we will start to see below as we code.

## Creating The Manager

## Connecting To REST

Before we begin making a gateway manager, we need to first prepare a connection to our REST manager. Go ahead and make a file called `services/gateway/rest/index.ts`.

```ts
import { createRestManager } from '@discordeno/rest'

export const REST = createRestManager({
  // YOUR BOT TOKEN HERE
  token: process.env.TOKEN,
  proxy: {
    baseUrl: process.env.REST_URL,
    authorization: process.env.AUTHORIZATION,
  }
})
```

The `baseUrl` should be pointed at the server where you are hosting your REST manager we created earlier in Step 2. This will make sure that requests sent from the gateway are sent to your proxy REST process and NOT sent directly to discord.

## Preparing Our Gateway Manager

We are going to proceed with the understanding that we have 5,000 shards _5,000,000 servers_. Let's make a file called `services/gateway/manager.ts`

```ts
import { createGatewayManager } from '@discordeno/gateway'
import { logger } from '@discordeno/utils'
import { REST } from '../rest/index.ts'

export const GATEWAY = createGatewayManager({
  token: process.env.TOKEN,
  intents: Intents.Guilds | Intents.GuildMessages,
  shardsPerWorker: 500,
  totalWorkers: 10,
  connection: await REST.getSessionInfo(),
})

// More code to be added here but first you need to understand this part.
```

Now let's break it down.

### Worker & Server Confusion

The `shardsPerWorker` property represents how many shards we will run per **server**. This property is called `perWorker` because for mid sized bots that don't require separate dedicated servers it uses _worker threads_ to mitigate the load. Here we are going to be aiming to scale much much larger so we need to think bigger. In our case, what we are telling our gateway manager, is that it should create 500 shards per **server**. Sounds like a lot? Yes, but no problem! Those shards will then be split across _worker threads_ on each server.

The `totalWorkers` property represents the number of **servers** we have available for shards. For example, if we have 10 dedicated servers available to us, this will allow the manager to spread out the load across 10 total **servers**.

:::tip
You can adjust the amount of **shardsPerWorker** and **totalWorkers** to fit your specific needs.
:::

### Setting Up Bot To Gateway Communication

Let's make a file called `services/gateway/index.ts` and paste the following code:

```ts
import { logger } from '@discordeno/utils';
import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

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
        return await GATEWAY.requestMembers(req.body.guildId, req.body.options);
      }
      default:
        logger.error(`[Shard] Unknown request received. ${JSON.stringify(req.body)}`)
        return res.status(404).json({ message: 'Unknown request received.', status: 404 })
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
  if (!url) return logger.error(`No server URL found for server #${workerId}. Unable to start Shard #${shardId}`)

  await fetch(url, {
    method: 'POST',
    headers: {
      authorization: process.env.AUTHORIZATION,
    },
    body: JSON.stringify({ type: 'IDENTIFY_SHARD', shardId }),
  })
    .then((res) => res.json())
    .catch(logger.error)
}

// More code to be added here but first you need to understand this part.
```

Here, we are overriding the built in method on the gateway manager called `tellWorkerToIdentify`. Internally, this function just simply starts a new shard as by default the lib supports small bots. For our case, we are going to make it get the server url from a `.env` file
and then send the request to identify it.

:::tip
For the purposes of the guide, we are using `fetch` to communicate between servers but you can use any communication system you prefer. I highly recommend taking the time to optimize this portion with a more performant communication system. Ideal recommendation would be gRPC.
:::

Now, let's go ahead and set up the server where we will receive this and start a Shard.

### Setting Up Sharder

Just like before, we are going to make another http listener to listen for incoming events and delegate them outwords. Make a file called `services/gateway/sharding/index.ts`

```ts
import { DiscordenoShard } from '@discordeno/gateway';
import { logger } from '@discordeno/utils';
import { Intents } from '@discordeno/types';
import events from './events.js';
import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

const AUTHORIZATION = process.env.AUTHORIZATION as string
const SHARDS = new Collection<number, DiscordenoShard>()

const app = express()

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

function getUrlFromShardId(totalShards: number, shardId: number) {
 const urls = process.env.EVENT_HANDLER_URLS?.split(',') ?? [];
 const index = totalShards % shardId;

 return urls[index] ?? urls[0];
}

app.all('/*', async (req, res) => {
  if (!AUTHORIZATION || AUTHORIZATION !== req.headers.authorization) {
    return res.status(401).json({ error: 'Invalid authorization key.' })
  }

  try {
    // Identify A Shard
    switch (req.body.type) {
      case 'IDENTIFY_SHARD': {
        logger.info(`[Shard] identifying ${SHARDS.has(req.body.shardId) ? 'existing' : 'new'} shard (${req.body.shardId})`);
        const shard = SHARDS.get(req.body.shardId) ?? new DiscordenoShard({
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
          // TODO: Enable this in the next portion of the guide.
          // events,
        });

        SHARDS.set(shard.id, shard)
        await shard.identify()
        return res.status(200).json({
          identified: true,
          shardId: req.body.shardId,
          workerId: process.env.WORKER_ID,
        })
      }
      default:
        logger.error(`[Shard] Unknown request received. ${JSON.stringify(req.body)}`)
        return res.status(404).json({ message: 'Unknown request received.', status: 404 })
    }
  } catch (error: any) {
    console.log(error)
    res.status(500).json(error)
  }
})

app.listen(process.env.SHARD_SERVER_PORT, () => {
  console.log(`Listening at ${process.env.SERVER_URL}`)
})
```

Most of this code is another http listener again. The part we are going to focus on is the part after the authorization check. Each request is past into a switch statement which determines which type of request to handle. If it is the `identify` request, it will begin identifying the shard. First it checks if an existing shard exists and triggers identify on that which will internally handle this cleanly by closing existing shard, and opening a new one. If no shard exists, we create this shard and save it to our SHARDS cache. Using this method, you can support many different types of communication between your gateway manager and your shards.

Next, we will focus on the `events` portion which we had commented out above. Each shard handles many events and this will be the portion where we tell the shard how to handle those events. For this guide, we will only cover the `message` event, but you can implement any other events you require as you need following the same method.

```ts
const shard =
  SHARDS.get(req.body.shardId) ??
  new DiscordenoShard({
    id: shardId,
    connection: {
      compress: this.compress,
      intents: this.intents,
      properties: this.properties,
      token: this.token,
      totalShards: this.totalShards,
      url: this.url,
      version: this.version,
    },
    // This is the part we are adding
    events: {
      async message(shrd, payload) {
        await fetch(getUrlFromShardId(req.body.totalShards, shrd.id), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', authorization: AUTHORIZATION },
          body: JSON.stringify({ payload, shardId }),
        })
          .then((res) => res.text())
          .catch(logger.error)
      },
    },
  })
```

Now, whenever the shard gets an event, it will send that payload to the event listener url. The event listener is also known as the "bot".

:::tip
If you have the $, I would recommend writing the event listener(bot), in a serverless friendly manner. If that code is deployed to something like cloudflare workers, your bot will have unlimited scalability and your shards would simply route these events to be sent there.
:::

At this point, what we need next is the bot process which is listening to these events. However, before we go make that, let us take some time and really improve our gateway logic a bit more.

### Analytics

There is a lot of analytics you can build here. But we will specifically cover just the analytics for a couple of things. You should take the time to implement much more of the analytics. Go ahead and make a file: `services/gateway/analytics.ts`

```ts
import { InfluxDB, Point } from '@influxdata/influxdb-client'

const INFLUX_ORG = process.env.INFLUX_ORG as string
const INFLUX_BUCKET = process.env.INFLUX_BUCKET as string
const INFLUX_TOKEN = process.env.INFLUX_TOKEN as string
const INFLUX_URL = process.env.INFLUX_URL as string

export const influxDB = INFLUX_URL && INFLUX_TOKEN ? new InfluxDB({ url: INFLUX_URL, token: INFLUX_TOKEN }) : undefined
export const Influx = influxDB?.getWriteApi(INFLUX_ORG, INFLUX_BUCKET)

let savingAnalyticsId: NodeJS.Interval | undefined = undefined
if (!saveAnalyticsId) {
  setInterval(() => {
    console.log(`[Influx - Gateway] Saving events...`)
    Influx?.flush()
      .then(() => {
        console.log(`[Influx - Gateway] Saved events!`)
      })
      .catch((error) => {
        console.log(`[Influx - Gateway] Error saving events!`, error)
      })
    // Every 15 seconds
  }, 15000)
}
```

Now we can begin implementing influxdb in our sharder. Go back to `services/gateway/sharding/index.ts`.

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

### Event Queue

We should take the time here to implement a small queue where we can store events in the off chance that our event listener was not able to receive the event. For example, if you are restarting the bot process for a split second, you might lose some events. To avoid this issue, we should build an event queue which will make sure we don't lose them.

RabbitMQ setup guide here.

### Resharding

Now let's enable resharding on our bot so we don't need to deal with it. Remember, Discord stops allowing your bot to be added to new servers when you max out your existing max shards. Consider a bot started with 150 shards operating on 150,000 servers. Your shards support a maximum of 150 \* 2500 = 375,000 servers. Your bot will be unable to join new servers once it reaches this point until it re-shards. Discordeno proxy provides 2 types of re-sharding. Automated and manual. You can also have both.

- Automated: This system will automatically begin a Zero-downtime resharding process behind the scenes when you
  reach 80% of your maximum servers allowed by your shards. For example, since 375,000 was the max, at 300,000 we
  would begin re-sharding behind the scenes with ZERO DOWNTIME.
  - 80% of maximum servers reached (The % of 80% is customizable.)
  - Identify limits have room to allow re-sharding. (Also customizable)
- Manual: You can also trigger this manually should you choose.
  - When discord releases a new API version, updates your gateways to new version with no downtime.



### Evals

One of the last things we should do, is make it possible to run commands on this process. To do this, we simply create a small bot on this process with an eval command that listens for our messages only on our developer server. This way we can dynamically update any properties we may need to. For example, if discord updates the API version, we can easily switch the api version with a simple command.

Please review the Evals section in Step 2 - REST portion of this guide to see how we made an eval in that process. The entire setup would be repeated here for the bot portion as well. That way you can dynamically change anything in your gateway.
