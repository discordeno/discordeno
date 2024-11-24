---
sidebar_position: 5
sidebar_label: Step 4 - Bot
---

# Event Handler (Bot)

Woah! You went through the most difficult part already which was the gateway. WOOT! Let's go ahead and jump into the event handler portion so we can proceed. The event handler will be called as the `bot` process going forward. Its purpose is generally to listen for events coming from the shards and process them accordingly.

:::tip
If you have the money, I would recommend writing the event listener(bot), in a serverless friendly manner. If that code is deployed to something like cloudflare workers, your bot will have unlimited scalability and your shards would simply route these events to be sent there.
:::

## Creating Bot Manager

Now we should first create a quick bot manager. Go ahead and make a file like `services/bot/bot.ts` and paste the code below.

```ts
import { createBot } from '@discordeno/bot'

export const BOT = createBot({
  token,
})
```

Awesome, now we need to implement an event handler. For example, let's implement the ready event. So we make a file like `services/bot/events/ready.ts` and paste the code below:

```ts
import { BOT } from '../bot.js'

export const ready: typeof BOT.events.ready = async ({ shardId }) => {
  BOT.logger.info(`[READY] Shard ID #${shardId} is ready.`)
}
```

Now that we have a ready event handler, let's go ahead and add it to our bot.

```ts
import { createBot } from '@discordeno/bot'
import { ready } from './events/ready.js'

export const BOT = createBot({
  token,
})

BOT.events.ready = ready;
```

There you go. You now have an event handler working perfectly.

## Setting Up Listener

Once, again we are going to create a quick http listener that will listen for events coming from the shards and process them accordingly. Create a file like `services/bot/index.ts` and paste the code below:

```ts
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
    // Add the code here in the next section
    res.status(200).json({ success: true })
  } catch (error: any) {
    console.log(error)
    res.status(500).json(error)
  }
})

app.listen(BOT_PORT, () => {
  console.log(`BOT listening at ${BOT_URL}`)
})
```

Now that we have the basic code setup complete for our listener, we can begin adding the code necessary for handling the events.

```ts
try {
  // Trigger the raw event, you may remove this if you don't need it
  bot.events.raw?.(req.body.payload, req.body.shardId)

  if (data.t) {
    bot.handlers[data.t]?.(bot, req.body.payload, req.body.shardId)
  }

  res.status(200).json({ success: true })
}
```

## Connecting To REST

Alright, now we need to start making our connection to the rest proxy work. That way, when our bot needs to make a rest request, it will use the proxy.

```ts
export const BOT = createBot({
  token,
  rest: {
    proxy: {
      baseUrl: process.env.REST_URL,
      authorization: process.env.AUTHORIZATION,
    },
  }
})
```

## Communication With Gateway

This portion of the guide is only necessary for the bots that require sending a request to their gateway manager. For example, should your bot need to connect to a voice channel, edit its status, or fetch members through the gateway, it will need to send a request to the gateway manager process.

:::tip
Take the time to implement this properly, should you need it, with something like WebSocket, IPC, gRPC, RabbitMQ etc.
:::

To tell the bot that we need to make a request to the proxy gateway manager, what we do is override the gateway in the bot.

```ts
BOT.gateway.requestMembers = async function (guildId, options) {
  // TODO: Implement the change we need.
}
```

For the purpose of this guide, we are just using fetch requests, so when we need to make a request to the gateway we simply make a fetch request.

```ts
BOT.gateway.requestMembers = async function (guildId, options) {
    await fetch(process.env.GATEWAY_MANAGER_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": process.env.AUTHORIZATION,
        },
        body: JSON.stringify({ type: "REQUEST_MEMBERS", guildId, options });
    })
        .then(res => res.text())
        .catch(() => undefined);
}
```

This will now send a request to our gateway manager whenever the bot makes a request to fetch members.

## Caching

Now that you've set up your bot process, you might want to cache certain structures for your bot to use. A detailed guide for that is provided [here](/docs/caching). Take your time to understand and implement it.

## Optimizing For Scale

Now think back at how many shards we created in this guide. We had built this with the idea that we had 5,000 shards, in other words 5,000,000 servers. This means that there are 5,000 shards or 5,000,000 servers sending events all to this one little bot listener. This needs to scale much better. So we have several options available. Remember if you went the serverless route, none of this is needed because that is already scaled. However, should you not have the money to afford serverless infrastructure, we will make it work.

### Threading

Threading or workers or clusters, however you wish to call it can be used here. You can take the time to implement a main thread and child threads to be created and have the workload be delegated to the thread. You should look into using something that can provide you a thread pool to optimizing the thread load management. However, there is another option, which is, server splitting.

### Server Splitting

With server splitting, we are going to split the amount of events that are handled by a bot process across several bot processes. So let's say we buy a couple servers for our bot processes. We can throw this process on both of them. Then go back to our `shards` in step 3 and make each shard send it to the appropriate server. If you think back, we already coded step 3 with this in mind.

```ts
async message(shard, payload) {
    await fetch(getUrlFromShardId(req.body.totalShards, shard.id), {
      method: 'POST',
    })
}
```

Here we were using a function to determine which url it should send to.

```ts
function getUrlFromShardId(totalShards: number, shardId: number) {
  const urls = process.env.EVENT_HANDLER_URLS?.split(',') ?? []
  const index = totalShards % shardId

  return urls[index] ?? urls[0]
}
```

This function is simply making it so that it determines what the event handler url should be and where that specific shard should send the event to. This means if you have 5,000 shards and you receive an event in shard #4565 and you had 10 server urls in the configs, this would make this event be sent to the 5th url in the array.

Woohoo! You've reached the end of this guide. By this point, you'll have your rest, gateway and the bot process fully functioning and you can finally begin to code your features/commands etc. If you need any help, please contact us on [Discord](https://discord.gg/ddeno). Good Luck!
