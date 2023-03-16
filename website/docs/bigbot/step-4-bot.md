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
import { createBot } from '@discordeno/bot';

export const BOT = createBot({
    token,
    events: {}
});
```

Now that our bot manager is created, we need to implement our event handlers. First, we can make another file like `services/bot/events/index.ts` and paste the code below.

```ts
import type { EventHandlers } from '@discordeno/bot';

export const events: Partial<EventHandlers> = {
    // TODO: fill this in the next section
}
```

Now, we go back to the bot file and pass this events object to the createBot function.

```ts
import { createBot } from '@discordeno/bot';
import { events } from './events/index.js';

export const BOT = createBot({
    token,
    events,
});
```

Awesome, now the only thing left is we need to implement an event handler. For example, let's implement the ready event. So we make a file like `services/bot/events/ready.ts` and paste the code below.

```ts
export const ready: EventHandlers['ready'] = async function (payload, shardId) {
    logger.info(`[READY] Shard ID #${shardId} is ready.`)
}
```

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

