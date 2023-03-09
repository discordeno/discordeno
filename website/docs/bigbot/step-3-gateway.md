---
sidebar_position: 4
sidebar_label: Step 3 - Gateway
---

# Standalone Gateway

Sweet, it is time to start our gateway code. By now, you should have already built your rest process, as we will need it shortly. The gateway portion is the hardest and most complex part of making a bot. This is where most of your time will be spent to optimize your setup.

## Understanding The Concepts

Let's take a minute to understand the unique design approach of discordeno's gateway system. In Discordeno, we opt for maximum flexibility and scalability at the cost of user experience. This means it is a bit harder to use Discordeno but by far, it should be able to do anything you can dream of much easier.

In Discordeno, we have 2 main portions of the gateway system. We have what we call the *manager* and we have the *Shard*. These are important to keep in mind going forward. They work similar to how a a worker system is designed. You have 1 main process that manages all the other ones.

**Key Points:**

- Any Shard can communicate directly to your event handler *(bot)* process.
- Bot process should communicate to the manager only.

Let's say the bot process needs to execute some code on some shard such as fetching members, changing bot's status, or anything else. The ideal way to do this is the bot process sends a request to the gateway manager process which sends a request to the shard process which can send it back to the bot process directly. All of this will help make it easily scale horizontally, which we will start to see below as we code.

## Creating The Manager

## Preparing Connecting To REST

Before we begin making a gateway manager, we need to first prepare a connection to our REST manager. Go ahead and make a file called `services/gateway/rest/index.ts`.

```ts
import { createRestManager } from '@discordeno/rest';

export const REST = createRestManager({
  // YOUR BOT TOKEN HERE
  token: process.env.TOKEN,
  baseUrl: process.env.REST_URL,
  authorization: process.env.AUTHORIZATION,
});
```

The `baseUrl` should be pointed at the server where you are hosting your REST manager we created earlier in Step 2. This will make sure that requests sent from the gateway are sent to your proxy REST process and NOT sent directly to discord. 


## Preparing Our Gateway Manager

We are going to proceed with the understanding that we have 5,000 shards *5,000,000 servers*. Let's make a file called `services/gateway/manager.ts`

```ts
import { createGatewayManager } from '@discordeno/gateway';
import { logger } from '@discordeno/utils';
import { REST } from '../rest/index.ts';

export const GATEWAY = createGatewayManager({
    token: process.env.TOKEN,
    intents: Intents.Guilds | Intents.GuildMessages,
    shardsPerWorker: 500,
    totalWorkers: 10,
    connection = await REST.getSessionInfo(),
});

// More code to be added here but first you need to understand this part.
```

Now let's break it down. 

### Worker & Server Confusion

The `shardsPerWorker` property represents how many shards we will run per **server**. This property is called `perWorker` because for mid sized bots that don't require separate dedicated servers it uses *worker threads* to mitigate the load. Here we are going to be aiming to scale much much larger so we need to think bigger. In our case, what we are telling our gateway manager, is that it should create 500 shards per **server**. Sounds like a lot? Yes, but no problem! Those shards will then be split across *worker threads* on each server.

The `totalWorkers` property represents the number of **servers** we have available for shards. For example, if we have 10 dedicated servers available to us, this will allow the manager to spread out the load across 10 total **servers**.

:::tip
You can adjust the amount of **shardsPerWorker** and **totalWorkers** to fit your specific needs.
:::

### Setting Up Gateway To Shard Communication

Continuing from the code above, now we can start telling our gateway how to communicate to our shards. We do this bit by bit.

```ts
export const GATEWAY = createGatewayManager({
    token: process.env.TOKEN,
    intents: Intents.Guilds | Intents.GuildMessages,
    shardsPerWorker: 500,
    totalWorkers: 10,
    connection = await REST.getSessionInfo(),
});

GATEWAY.tellWorkerToIdentify = async function (workerId, shardId, bucketId) {
  const url = process.env[`SERVER_URL_${workerId}`];
  if (!url) return logger.error(`No server URL found for server #${workerId}. Unable to start Shard #${shardId}`);

  await fetch(url, {
    method: "POST",
    headers: {
      authorization: process.env.AUTHORIZATION,
    },
    body: JSON.stringify({ type: "IDENTIFY_SHARD", shardId })
  }).then(res => res.json()).catch(logger.error);
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

const AUTHORIZATION = process.env.AUTHORIZATION as string;
const SHARDS = new Collection<number, DiscordenoShard>();

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());

app.all('/*', async (req, res) => {
  if (!AUTHORIZATION || AUTHORIZATION !== req.headers.authorization) {
    return res.status(401).json({ error: 'Invalid authorization key.' });
  }

  try {
    // Identify A Shard
    switch (req.body.type) {
      case 'IDENTIFY_SHARD': {
        logger.info(`[Shard] identifying ${SHARDS.has(req.body.shardId) ? 'existing' : 'new'} shard (${shardId})`);
        const shard = SHARDS.get(req.body.shardId) ?? new DiscordenoShard({
          id: shardId,
          connection: {
            compress: false,
            intents: Intents.Guilds | Intents.GuildMessages,
            properties: this.properties,
            token: this.token,
            totalShards: this.totalShards,
            url: this.url,
            version: this.version,
          },
          // TODO: Enable this in the next portion of the guide.
          // events,
        });

        SHARDS.set(shard.id, shard);
        await shard.identify();
        return res.status(200).json({
          identified: true,
          shardId: req.body.shardId,
          workerId: process.env.WORKER_ID
        });
      }
      default:
        logger.error(`[Shard] Unknown request received. ${JSON.stringify(req.body)}`);
        return res.status(404).json({ message: "Unknown request received.", status: 404 })
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

This gives us a http listener, that processes incoming requests and verifies that these requests are authorized. Any authorized request then gets put in a switch case which will handle the request as needed. In this case, we were building support for, **identifying** our shards.

In the code above, we left a *// TODO:*. This was to keep the code above minimal not to cause confusion for understanding it. Now let's start, making shard event handlers so we can forward the events discord sends to our event listener process(bot). Start by making a file like `
