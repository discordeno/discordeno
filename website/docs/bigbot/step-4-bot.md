---
sidebar_position: 5
sidebar_label: Step 4 - Bot
---

# Event Handler (Bot)

Woah! You go through the most difficult part already which was the gateway. WOOT! Let's go ahead and jump into the event handler portion so we can proceed. The event handler will be called as the `bot` process going forward. It's purpose is generally to listen for events coming from the shards and process them accordingly.

:::tip
If you have the $, I would recommend writing the event listener(bot), in a serverless friendly manner. If that code is deployed to something like cloudflare workers, your bot will have unlimited scalability and your shards would simply route these events to be sent there.
:::

## Creating Bot Manager

Now we should first create a quick bot manager. Go ahead and make a file like `services/bot/bot.ts` and paste the code below.

```ts
import { createBot } from '@discordeno/bot'

export const BOT = createBot({
  token,
  events: {},
})
```

Now that our bot manager is created, we need to implement our event handlers. First, we can make another file like `services/bot/events/index.ts` and paste the code below.

```ts
import type { EventHandlers } from '@discordeno/bot'

export const events: Partial<EventHandlers> = {
  // TODO: fill this in the next section
}
```

Now, we go back to the bot file and pass this events object to the createBot function.

```ts
import { createBot } from '@discordeno/bot'
import { events } from './events/index.js'

export const BOT = createBot({
  token,
  events,
})
```

Awesome, now the only thing left is we need to implement an event handler. For example, let's implement the ready event. So we make a file like `services/bot/events/ready.ts` and paste the code below.

```ts
export const ready: EventHandlers['ready'] = async function (payload, shardId) {
  logger.info(`[READY] Shard ID #${shardId} is ready.`)
}
```

Now that we have a ready event handler. Let's go ahead and add it to our events.

```ts
import type { EventHandlers } from '@discordeno/bot'
import { ready } from './ready.ts'

export const events: Partial<EventHandlers> = {
  ready,
}
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
    // TODO: Add the code here in next portion
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

Now that we have the basic code setup complete for our listener. We can begin adding the code necessary for handling the events.

```ts
try {
    // OPTIONAL: Runs the raw event handler if you need it
	bot.events.raw(bot, req.body.payload, req.body.shardId);
    // Runs the event handler if available
    if (message.t) bot.events.[snakeToCamelCase(message.t)]?.(req.body.payload, req.body.shardId);

    res.status(200).json({ success: true })
  }
```

## Connecting To REST

Alright, now we need to start making our connection to the rest proxy work. That way when our bot needs to make a rest request, it will use the proxy.

```ts
export const BOT = createBot({
  token,
  events,
})

BOT.rest = createRestManager({
  token: process.env.TOKEN,
  proxy: {
    baseUrl: process.env.REST_URL,
    authorization: process.env.AUTHORIZATION,
  },
})
```

## Communication With Gateway

This portion of the guide is only necessary for the bots that require sending a request to their gateway manager. For example, should your bot need to connect to a voice channel, edit it's status, or fetch members through the gateway; it will need to send a request to the gateway manager process.

:::tip
Take the time to implement this properly should you need it with something like websocket, IPC, gRPC, rabbitMQ etc...
:::

To tell, the Bot that we need to make a request to the proxy gateway manager what we do is override the gateway in the bot.

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

## Optimizing For Scale

Now think back at how many shards we created in this guide. We had built this with the idea that we had 5,000 shards, in other words 5,000,000 servers. This means that there are 5,000 shards or 5,000,000 servers sending events all to this one little bot listener. This needs to scale much better. So we have several options available. Remember if you went the serverless route, none of this is needed because that is already scaled. However, should you not have the $ to afford serverless infrastructure, we will make it work.

### Threading

Threading or workers or clusters however you wish to call it can be used here. You can take the time to implement a main thread and child threads to be created and have the workload be delegated to the thread. You should look into using something that can provide you a thread pool to optimizing the thread load management. However, there is another option which is server splitting.

### Server Splitting

With server splitting, we are going to split the amount of events that are handled by a bot process across several bot processes. So let's say we buy a couple servers for our bot processes. We can throw this process on both of them. Then go back to our `shards` in step 3 and make each shard send it to the appropriate server. If you think back, we already coded step 3 with this in mind.

```ts
async message(shrd, payload) {
    await fetch(getUrlFromShardId(req.body.totalShards, shrd.id), {
    method: 'POST',
```

Here we were using a function to determine which url it should send to.

```ts
function getUrlFromShardId(totalShards: number, shardId: number) {
  const urls = process.env.EVENT_HANDLER_URLS?.split(',') ?? []
  const index = totalShards % shardId

  return urls[index] ?? urls[0]
}
```

This function is simply making it so that it determines what the event handler url should be where that specific shard should send the event to. This means if you have 5,000 shards and you receive an event in shard #4565 and you had 10 server urls in the configs. This would mak this event be sent to the 5th url in the array.

Now that all your processes are fully functioning, we can get into the nitty gritty part of finally beginning to code our features/commands/etc...
