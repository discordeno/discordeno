---
sidebar_position: 3
sidebar_label: Step 2 - Gateway
---

# Step 2: Creating A Standalone Gateway Process

If you are reading this, you should have your REST process completed. We are going to need it here. This process will be
connecting to discord's websockets which will send you all the events.

Before, we dive into how, here is a quick summary of why you will want a standalone gateway process.

## Why Use Standalone REST Process?

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

## Creating Gateway Manager

Create a file under some path like `src/gateway/mod.ts`.

```ts
import { DISCORD_TOKEN, REST_AUTHORIZATION, REST_PORT } from '../../configs.ts'
import { BASE_URL, createRestManager } from '../../deps.ts'

const rest = createRestManager({
  token: DISCORD_TOKEN,
  secretKey: REST_AUTHORIZATION,
  customUrl: `http://localhost:${REST_PORT}`,
})
```

Throw another rest manager here which will be responsible for calling the main REST process we created in Step 1. This
will allow your gateway to communicate to the other process. Remember this is just to communicate outwards, this file
should not have the http listener.

> Feel free to refactor and optimize this should you wish to move `const rest...` to a separate file and reuse in both
> steps.

### Getting Gateway Bot Data

Now we need to use this rest manager to call the api to get information about how to connect to discord's gateway for
your bot.

```ts
import { routes } from '../../deps.ts'

const rest = createRestManager({
  token: DISCORD_TOKEN,
  secretKey: REST_AUTHORIZATION,
  customUrl: `http://localhost:${REST_PORT}`,
})

// CALL THE REST PROCESS TO GET GATEWAY DATA
const gatewayBot = await rest
  .runMethod(rest, 'GET', routes.GATEWAY_BOT())
  .then(res => ({
    url: res.url,
    shards: res.shards,
    sessionStartLimit: {
      total: res.session_start_limit.total,
      remaining: res.session_start_limit.remaining,
      resetAfter: res.session_start_limit.reset_after,
      maxConcurrency: res.session_start_limit.max_concurrency,
    },
  }))
```

With this info, we can now create our gateway manager.

### Understanding Gateway Manager

```ts
import { INTENTS, SHARDS_PER_WORKER, TOTAL_WORKERS } from '../../configs.ts'

const gateway = createGatewayManager({
  gatewayBot,
  gatewayConfig: {
    token: DISCORD_TOKEN,
    intents: INTENTS,
  },
  totalShards: gatewayBot.shards,
  shardsPerWorker: SHARDS_PER_WORKER,
  totalWorkers: TOTAL_WORKERS,
  // debug: console.log,
  // THIS WILL BE USED LATER IN WORKER SO LEAVE IT HERE
  handleDiscordPayload: () => {},
})
```

#### Basic Keys

- `EVENT_HANDLER_SECRET_KEY` is from your configs that will be used to make sure requests sent to your event handler
  process are indeed from you.
- `DISCORD_TOKEN` if you can't figure this out, this guide isn't for you. Please find another.
- `INTENTS` pass in a number or a string of intents. Autocomplete/type-safety is provided for strings :)

#### Powerful Keys

If your bot is going to be run on one process, you can re-use the data that discord gave you to connect.

- `totalShards`: is the maximum number of shards you want to use for connecting your bot. Should you think Discord is
  not smart enough to recommend a good amount, use this to override their choice. Highly recommend just using theirs.
- `lastShardId`: is the last shard you want to connect in this process.
  - Using a combination of `lastShardId` & `firstShardId`, you can create several processes or even several servers to
    handle different amounts of shards should your bot get that big to require horizontal scaling. You can control how
    many shards each gateway manager will be responsible for.
- `spawnShardDelay`: The delay in milliseconds to wait before spawning next shard.
- `shardsPerWorker`: The amount of shards to load per worker. Discussed in detail below.
- `totalWorkers`: The maximum amount of workers to use for your bot.

#### Gateway Cache

There is a few things that we cache in the gateway process directly, because sending them across the network is not
ideal. This is done to support custom cache functionality.

- `guildIds`: Used for determining what type of GUILD_CREATE event is received.
- `loadingGuildIds`: Used for determining if all guilds have arrived when initially connecting.
- `editedMessages`: Used to prevent spam of events across the network. MESSAGE_UPDATE are an extremely heavy event. Any
  embed or link that is in a message will unfurl triggerring a message update event. This is undesired behavior for 99%
  of bots out there. If someone sends a message with 5 urls, in there you will get a MESSAGE_CREATE and 5 MESSAGE_UPDATE
  events. If that user edits a single letter on it you now get 6 MESSAGE_UPDATE events, 1 for the content change and 5
  more for each url being unfurled. The editedMessages cache checks if the content of the message changed or not before
  sending the event downstream. Override this behavior if you need different behavior.

#### Gateway Method Overriding

One of the benefits of Discordeno is that you can override/customize anything from the library. Should you desire to
change the logic in any method it is as simple as:

```ts
// TYPINGS WILL BE AUTOMATICALLY PROVIDED
gateway.heartbeat = function (gateway, shardId, interval) {
  // YOUR CUSTOM HANDLING CODE HERE
}
```

## Workers

Now, we should take a minute here to talk about workers. Workers are just Clusters in Node.js

When you have a big bot and you are processing millions of events, you need to speed up that processing. Keeping it in 1
thread is not very nice since JavaScript is single threaded. This means it can only process 1 event at a time. With
workers, you can make it process several events at the same time. We mentioned the `shardsPerWorker` earlier. This
option was added to allow you to choose how many shards should be managed by each worker.

When shards are spawned, they are triggered by a method on gateway: `tellWorkerToIdentify`, so we'll have to modify it
to create workers and send message:

```ts
gateway.tellWorkerToIdentify = async (
  _gateway,
  workerId,
  shardId,
  _bucketId,
) => {
  let worker = workers.get(workerId)
  if (!worker) {
    worker = createWorker(workerId)
    workers.set(workerId, worker)
  }

  // TYPE TYPE WorkerMessage IS FROM WORKER FILE, DISCUSSED IN DETAIL BELOW
  const identify: WorkerMessage = {
    type: 'IDENTIFY_SHARD',
    shardId,
  }

  worker.postMessage(identify)
}
```

You can choose to replace the handler with any desired functionality you like. For example, should should you want to
create a new worker for each new workerId that appears and have that worker trigger the identify functionaly. How you
choose to handler workers is left in your care.

Now that we've setup our initial gateway manager and added `tellWorkerToIdentify` to `gateway`, we need to do the rest
of the work: creating workers, spawning shards etc.

```ts
import { EVENT_HANDLER_SECRET_KEY, EVENT_HANDLER_URL } from '../../configs.ts'
import { Worker } from 'worker_threads'
import {
  WorkerCreateData,
  WorkerGetShardInfo,
  WorkerMessage,
  WorkerShardInfo,
  WorkerShardPayload,
} from './worker.js'

// A COLLECTION OF WORKERS
const workers = new Collection<number, Worker>()
const nonces = new Collection<string, (data: any) => void>()

function createWorker(workerId: number) {
  const workerData: WorkerCreateData = {
    intents: gateway.manager.gatewayConfig.intents ?? 0,
    token: DISCORD_TOKEN,
    // TODO: PUT THIS SEPARATELY. CAN USE MULTIPLE URLS IF YOU HAVE MULTIPLE BOT PROCESSES HANDLING DIFFERENT SHARDS' EVENTS
    handlerUrls: [EVENT_HANDLER_URL],
    handlerAuthorization: EVENT_HANDLER_SECRET_KEY,
    path: './worker.ts',
    totalShards: gateway.manager.totalShards,
    workerId,
  }

  const worker = new Worker('./worker.js', {
    workerData,
  })

  worker.on('message', async (data: ManagerMessage) => {
    switch (data.type) {
      case 'REQUEST_IDENTIFY': {
        await gateway.manager.requestIdentify(data.shardId)

        const allowIdentify: WorkerMessage = {
          type: 'ALLOW_IDENTIFY',
          shardId: data.shardId,
        }

        worker.postMessage(allowIdentify)

        break
      }
      case 'NONCE_REPLY': {
        nonces.get(data.nonce)?.(data.data)
      }
    }
  })

  return worker
}

// TYPES WE USE
export type ManagerMessage =
  | ManagerRequestIdentify
  | ManagerNonceReply<WorkerShardInfo[]>

export type ManagerRequestIdentify = {
  type: 'REQUEST_IDENTIFY'
  shardId: number
}

export type ManagerNonceReply<T> = {
  type: 'NONCE_REPLY'
  nonce: string
  data: T
}
```

## Spawning Shards

Once you are ready and the gateway has been created as you desired, we can begin spawning the shards.

```ts
gateway.spawnShards(gateway)
```

This code now handles creating gateway manager, creating workers, spawning shards and sending the info to each workers.
Next is creating a worker file to receive these info, connecting to gateway and sending the events to bot process.

Here's the full code of `src/gateway/mod.ts`:

```ts
import {
  DISCORD_TOKEN,
  EVENT_HANDLER_SECRET_KEY,
  EVENT_HANDLER_URL,
  INTENTS,
  REST_AUTHORIZATION,
  REST_PORT,
  SHARDS_PER_WORKER,
  TOTAL_WORKERS,
} from '../../configs.ts'
import { BASE_URL, createRestManager, routes } from '../../deps.ts'
import { Worker } from 'worker_threads'
import {
  WorkerCreateData,
  WorkerGetShardInfo,
  WorkerMessage,
  WorkerShardInfo,
  WorkerShardPayload,
} from './worker.ts'

const rest = createRestManager({
  token: DISCORD_TOKEN,
  secretKey: REST_AUTHORIZATION,
  customUrl: `http://localhost:${REST_PORT}`,
})

const rest = createRestManager({
  token: DISCORD_TOKEN,
  secretKey: REST_AUTHORIZATION,
  customUrl: `http://localhost:${REST_PORT}`,
})

// CALL THE REST PROCESS TO GET GATEWAY DATA
const gatewayBot = await rest
  .runMethod(rest, 'GET', routes.GATEWAY_BOT())
  .then(res => ({
    url: res.url,
    shards: res.shards,
    sessionStartLimit: {
      total: res.session_start_limit.total,
      remaining: res.session_start_limit.remaining,
      resetAfter: res.session_start_limit.reset_after,
      maxConcurrency: res.session_start_limit.max_concurrency,
    },
  }))

const gateway = createGatewayManager({
  gatewayBot,
  gatewayConfig: {
    token: DISCORD_TOKEN,
    intents: INTENTS,
  },
  totalShards: gatewayBot.shards,
  shardsPerWorker: SHARDS_PER_WORKER,
  totalWorkers: TOTAL_WORKERS,
  // debug: console.log,
  handleDiscordPayload: () => {},
  tellWorkerToIdentify: async (_gateway, workerId, shardId, _bucketId) => {
    let worker = workers.get(workerId)
    if (!worker) {
      worker = createWorker(workerId)
      workers.set(workerId, worker)
    }

    // TYPE TYPE WorkerMessage IS FROM WORKER FILE, DISCUSSED IN DETAIL BELOW
    const identify: WorkerMessage = {
      type: 'IDENTIFY_SHARD',
      shardId,
    }

    worker.postMessage(identify)
  },
})

// A COLLECTION OF WORKERS
const workers = new Collection<number, Worker>()
const nonces = new Collection<string, (data: any) => void>()

function createWorker(workerId: number) {
  const workerData: WorkerCreateData = {
    intents: gateway.manager.gatewayConfig.intents ?? 0,
    token: DISCORD_TOKEN,
    handlerUrls: [EVENT_HANDLER_URL],
    handlerAuthorization: EVENT_HANDLER_SECRET_KEY,
    path: './worker.ts',
    totalShards: gateway.manager.totalShards,
    workerId,
  }

  const worker = new Worker('./worker.ts', {
    workerData,
  })

  worker.on('message', async (data: ManagerMessage) => {
    switch (data.type) {
      case 'REQUEST_IDENTIFY': {
        await gateway.manager.requestIdentify(data.shardId)

        const allowIdentify: WorkerMessage = {
          type: 'ALLOW_IDENTIFY',
          shardId: data.shardId,
        }

        worker.postMessage(allowIdentify)

        break
      }
      case 'NONCE_REPLY': {
        nonces.get(data.nonce)?.(data.data)
      }
    }
  })

  return worker
}

// TYPES WE USE
export type ManagerMessage =
  | ManagerRequestIdentify
  | ManagerNonceReply<WorkerShardInfo[]>

export type ManagerRequestIdentify = {
  type: 'REQUEST_IDENTIFY'
  shardId: number
}

export type ManagerNonceReply<T> = {
  type: 'NONCE_REPLY'
  nonce: string
  data: T
}

// SPAWN SHARDS INTO WORKERS
gateway.spawnShards()
```

## Worker File

Now that we've handled creating gateway, workers, we need to create a worker file to identify, receive gateway events
and send them to bot process.

Create a file in a path like `src/gateway/worker.ts`.

Now we'll have to create a Shard Manager, this is what will handle identifying, receiving events.

```ts
import { createShardManager } from 'discordeno'
import { parentPort, workerData } from 'worker_threads'

if (!parentPort) {
  throw new Error('Parent port is null')
}

// THE DATA WE GET FROM GATEWAY FILE
const script: WorkerCreateData = workerData

const identifyPromises = new Map<number, () => void>()

const manager = createShardManager({
  gatewayConfig: {
    intents: script.intents,
    token: script.token,
  },
  shardIds: [],
  totalShards: script.totalShards,
  // WE WILL COVER THESE TWO FUNCTIONS IN LATER PART OF THE GUIDE, FOR NOW, LEAVE IT THIS WAY
  handleMessage: () => {},
  requestIdentify: async () => {},
})
```

The above code only creates a shard manager, we now have 3 more things to do:

- Listening to gateway process, sending events received to respective shards in the manager.
- Handling Discord Payloads.
- Requesting Identify.

## Sending events from Gateway to Shards in Manager

In order for the shards to receive events and send to bot process, we need to receive the event payloads from gateway
first, we can do this by using `message` event in `parentPort` like shown below:

```ts
import { Shard } from 'discordeno'

function buildShardInfo(shard: Shard): WorkerShardInfo {
  return {
    workerId: script.workerId,
    shardId: shard.id,
    rtt: shard.heart.rtt || -1,
    state: shard.state,
  }
}

parentPort.on('message', async (data: WorkerMessage) => {
  switch (data.type) {
    // Gateway sends IDENTIFY_SHARD in gateway.tellWorkerToIdentify
    case 'IDENTIFY_SHARD': {
      await manager.identify(data.shardId)

      break
    }
    // Gateway sends ALLOW_IDENTIFY when worker requests to identify
    case 'ALLOW_IDENTIFY': {
      identifyPromises.get(data.shardId)?.()
      identifyPromises.delete(data.shardId)

      break
    }
    // Gateway sends SHARD_PAYLOAD for every events it receives from Discord
    case 'SHARD_PAYLOAD': {
      manager.shards.get(data.shardId)?.send(data.data)

      break
    }
    // Send shard info if gateway sends GET_SHARD_INFO
    case 'GET_SHARD_INFO': {
      const infos = manager.shards.map(buildShardInfo)

      parentPort?.postMessage({
        type: 'NONCE_REPLY',
        nonce: data.nonce,
        data: infos,
      })
    }
  }
})
```

Now TypeScript will error because of missing types, add these to your code:

```ts
import { ShardSocketRequest, ShardState } from 'discordeno'

export type WorkerMessage =
  | WorkerIdentifyShard
  | WorkerAllowIdentify
  | WorkerShardPayload
  | WorkerGetShardInfo

export type WorkerIdentifyShard = {
  type: 'IDENTIFY_SHARD'
  shardId: number
}

export type WorkerAllowIdentify = {
  type: 'ALLOW_IDENTIFY'
  shardId: number
}

export type WorkerShardPayload = {
  type: 'SHARD_PAYLOAD'
  shardId: number
  data: ShardSocketRequest
}

export type WorkerGetShardInfo = {
  type: 'GET_SHARD_INFO'
  nonce: string
}

export type WorkerCreateData = {
  intents: number
  token: string
  handlerUrls: string[]
  handlerAuthorization: string
  path: string
  totalShards: number
  workerId: number
}

export type WorkerShardInfo = {
  workerId: number
  shardId: number
  rtt: number
  state: ShardState
}
```

## Handling Discord Payloads

One of the big things we didn't cover yet is the handler for discord payloads. This is the main sauce of your worker
process here. This is going to take the events that the gateway manager sent and send it to your event handler. How you
wish to communicate with your event handler is up to you. For this guide, we will use http, but you can replace that
with anything you like.

```ts
manager.createShardOptions.handleMessage = async (shard, message) => {
  const url = script.handlerUrls[shard.id % script.handlerUrls.length]
  if (!url) return console.error('ERROR: NO URL FOUND TO SEND MESSAGE')

  await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ message, shardId: shard.id }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: script.handlerAuthorization,
    },
  }).catch(error => console.error(error))
}
```

You can change this function to use a WS or any form of communication you prefer to use to send this to your event
handler.

This is also the place where you make use of the [Gateway Cache](#gateway-cache) we mentioned earlier (`guildIds`,
`loadingGuildIds`, `editedMessages`).

## Gateway Queue

One thing we can add on here, which you will find already done in the template if you are using it. However, it is still
good to read this to learn and understand the logic behind it. When you need a downtime for whatever reason, you can
create a queue like system to avoid any missed events. Let's create a simple queue. If it errors, assuming something
like the bot event listener process is down for whatever reason, the `.catch` in `fetch` will run adding this event to
the queue to try again in one second by calling the `handleQueue` function.

```ts
.catch(() => {
  // IF FAILED TRY TO QUEUE MAYBE LISTENER IS DOWN
  if (message.t === "INTERACTION_CREATE") handleInteractionQueueing(message, shard.id);
  else queue.events.push({ shardId: shard.id, message });

  setTimeout(handleQueue, 1000);
});
```

Now TypeScript will probably throw some errors at your face, so let's fix those real quick. Create an object that will
hold the queue of events for our gateway.

```ts
import { DiscordGatewayPayload } from 'discordeno'

const queue: GatewayQueue = {
  processing: false,
  events: [],
}

export interface QueuedEvent {
  message: DiscordGatewayPayload
  shardId: number
}

export interface GatewayQueue {
  processing: boolean
  events: QueuedEvent[]
}

async function handleQueue() {
  // PLACEHOLDER FUNCTION THAT WILL HANDLE PROCESSING THE QUEUE
}

async function handleInteractionQueueing(
  message: DiscordGatewayPayload,
  shardId: number,
) {
  // PLACEHOLDER FUNCTION
}
```

Alrighty, since TypeScript stopped being annoying, let's continue. Next, we should make sure to avoid fetching when the
queue is already processing or has events queued up. This will help us preserve the order of events in the queue.

```ts
handleMessage: async function (shard, message) {
// IF QUEUE IS RUNNING JUST ADD TO QUEUE
if (queue.processing) {
  if (message.t === "INTERACTION_CREATE") return handleInteractionQueueing(message, shard.id);

  return queue.events.push({ shardId: shard.id, message });
}

await fetch(EVENT_HANDLER_URL, {
```

Typescript must be at it again so let's shut it up again. Keep in mind that we are handling interaction events
separately because they require a response within 3 seconds or they will become invalid. In this function first we
automatically respond to the ones that can not be deferred. For the interactions that can be deferred, we will simply
defer them and add this event to the queue.

```ts
import {
  DiscordInteraction,
  InteractionResponseTypes,
  InteractionTypes,
  routes,
} from 'discordeno'
import { BOT_SERVER_INVITE_CODE } from '../../configs.ts'

async function handleInteractionQueueing(
  message: DiscordGatewayPayload,
  shardId: number,
) {
  if (message.t !== 'INTERACTION_CREATE') return

  const interaction = message.d as DiscordInteraction
  // IF THIS INTERACTION IS NOT DEFERABLE
  if (
    [
      InteractionTypes.ModalSubmit,
      InteractionTypes.ApplicationCommandAutocomplete,
    ].includes(interaction.type)
  ) {
    return await rest.runMethod(
      rest,
      'POST',
      routes.INTERACTION_ID_TOKEN(BigInt(interaction.id), interaction.token),
      {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content: `The bot is having a temporary issue, please try again or contact us at https://discord.gg/${BOT_SERVER_INVITE_CODE}`,
        },
      },
    )
  }

  await rest.runMethod(
    rest,
    'POST',
    endpoints.INTERACTION_ID_TOKEN(BigInt(interaction.id), interaction.token),
    {
      // MESSAGE COMPONENTS NEED SPECIAL DEFER
      type:
        InteractionTypes.MessageComponent === interaction.type
          ? InteractionResponseTypes.DeferredUpdateMessage
          : InteractionResponseTypes.DeferredChannelMessageWithSource,
    },
  )

  // ADD EVENT TO QUEUE
  queue.events.push({ shardId, message })
}
```

Oh no, TypeScript is at it again. We need to make a REST manager so that our gateway proxy can communicate with our REST
proxy. We then can make use of it to send a POST request.

```ts
const rest = createRestManager({
  token: DISCORD_TOKEN,
  secretKey: REST_AUTHORIZATION,
  customUrl: REST_URL,
})
```

So now there is only one thing left the `handleQueue` function. First we get the first item from the queue using
`.shift()`. Then we check to see if that item exists. If it does not exist, we mark the queue as no longer processing
and cancel out. However, if it does exist, we send a fetch request to the bot event handler process. In the `.catch()`
we will add this event back in to the start of the queue in case the bot is still down. Finally we call this function
again to run the next item in the queue.

```ts
async function handleQueue() {
  const event = queue.events.shift()
  // QUEUE IS EMPTY
  if (!event) {
    console.log('GATEWAY QUEUE ENDING')
    queue.processing = false
    return
  }

  await fetch(EVENT_HANDLER_URL, {
    headers: {
      Authorization: EVENT_HANDLER_SECRET_KEY,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      shardId: event.shardId,
      message: event.message,
    }),
  })
    .then(res => {
      res.text()
      handleQueue()
    })
    .catch(() => {
      // EVENT HANDLER STILL NOT ACCEPTING REQUEST. SO ADD BACK TO QUEUE
      queue.events.unshift(event)
      setTimeout(handleQueue, 1000)
    })
}
```

## Requesting Identify

We need to request identify in order to trigger initial handshake with the gateway, we'll use `manager.requestIdentify`
to do this.

```ts
import { ManagerMessage } from './mod.ts'

manager.requestIdentify = async function (shardId: number): Promise<void> {
  return await new Promise(resolve => {
    identifyPromises.set(shardId, resolve)

    const identifyRequest: ManagerMessage = {
      type: 'REQUEST_IDENTIFY',
      shardId,
    }

    parentPort?.postMessage(identifyRequest)
  })
}
```

That's all, you've now setup your gateway and worker. Here's the full code of `src/gateway/worker.ts`:

```ts
import {
  createRestManager,
  createShardManager,
  DiscordGatewayPayload,
  DiscordInteraction,
  InteractionResponseTypes,
  InteractionTypes,
  routes,
  Shard,
  ShardSocketRequest,
  ShardState,
} from 'discordeno'
import { parentPort, workerData } from 'worker_threads'
import { ManagerMessage } from './mod'
import {
  BOT_SERVER_INVITE_CODE,
  DISCORD_TOKEN,
  EVENT_HANDLER_SECRET_KEY,
  EVENT_HANDLER_URL,
  REST_AUTHORIZATION,
  REST_URL,
} from '../../configs.ts'

if (!parentPort) {
  throw new Error('Parent port is null')
}

// THE DATA WE GET FROM GATEWAY FILE
const script: WorkerCreateData = workerData

const identifyPromises = new Map<number, () => void>()

const rest = createRestManager({
  token: DISCORD_TOKEN,
  secretKey: REST_AUTHORIZATION,
  customUrl: REST_URL,
})

const manager = createShardManager({
  gatewayConfig: {
    intents: script.intents,
    token: script.token,
  },
  shardIds: [],
  totalShards: script.totalShards,
  handleMessage: async (shard, message) => {
    const url = script.handlerUrls[shard.id % script.handlerUrls.length]
    if (!url) return console.error('ERROR: NO URL FOUND TO SEND MESSAGE')

    await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ message, shardId: shard.id }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: script.handlerAuthorization,
      },
    }).catch(() => {
      // IF FAILED TRY TO QUEUE MAYBE LISTENER IS DOWN
      if (message.t === 'INTERACTION_CREATE')
        handleInteractionQueueing(message, shard.id)
      else queue.events.push({ shardId: shard.id, message })

      setTimeout(handleQueue, 1000)
    })
  },
  requestIdentify: async function (shardId: number): Promise<void> {
    return await new Promise(resolve => {
      identifyPromises.set(shardId, resolve)

      const identifyRequest: ManagerMessage = {
        type: 'REQUEST_IDENTIFY',
        shardId,
      }

      parentPort?.postMessage(identifyRequest)
    })
  },
})

function buildShardInfo(shard: Shard): WorkerShardInfo {
  return {
    workerId: script.workerId,
    shardId: shard.id,
    rtt: shard.heart.rtt || -1,
    state: shard.state,
  }
}

parentPort.on('message', async (data: WorkerMessage) => {
  switch (data.type) {
    // Gateway sends IDENTIFY_SHARD in gateway.tellWorkerToIdentify
    case 'IDENTIFY_SHARD': {
      await manager.identify(data.shardId)

      break
    }
    // Gateway sends ALLOW_IDENTIFY when worker requests to identify
    case 'ALLOW_IDENTIFY': {
      identifyPromises.get(data.shardId)?.()
      identifyPromises.delete(data.shardId)

      break
    }
    // Gateway sends SHARD_PAYLOAD for every events it receives from Discord
    case 'SHARD_PAYLOAD': {
      manager.shards.get(data.shardId)?.send(data.data)

      break
    }
    // Send shard info if gateway sends GET_SHARD_INFO
    case 'GET_SHARD_INFO': {
      const infos = manager.shards.map(buildShardInfo)

      parentPort?.postMessage({
        type: 'NONCE_REPLY',
        nonce: data.nonce,
        data: infos,
      })
    }
  }
})

const queue: GatewayQueue = {
  processing: false,
  events: [],
}

async function handleQueue() {
  const event = queue.events.shift()
  // QUEUE IS EMPTY
  if (!event) {
    console.log('GATEWAY QUEUE ENDING')
    queue.processing = false
    return
  }

  await fetch(EVENT_HANDLER_URL, {
    headers: {
      Authorization: EVENT_HANDLER_SECRET_KEY,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      shardId: event.shardId,
      message: event.message,
    }),
  })
    .then(res => {
      res.text()
      handleQueue()
    })
    .catch(() => {
      // EVENT HANDLER STILL NOT ACCEPTING REQUEST. SO ADD BACK TO QUEUE
      queue.events.unshift(event)
      setTimeout(handleQueue, 1000)
    })
}

async function handleInteractionQueueing(
  message: DiscordGatewayPayload,
  shardId: number,
) {
  if (message.t !== 'INTERACTION_CREATE') return

  const interaction = message.d as DiscordInteraction
  // IF THIS INTERACTION IS NOT DEFERABLE
  if (
    [
      InteractionTypes.ModalSubmit,
      InteractionTypes.ApplicationCommandAutocomplete,
    ].includes(interaction.type)
  ) {
    return await rest.runMethod(
      rest,
      'POST',
      routes.INTERACTION_ID_TOKEN(BigInt(interaction.id), interaction.token),
      {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content: `The bot is having a temporary issue, please try again or contact us at https://discord.gg/${BOT_SERVER_INVITE_CODE}`,
        },
      },
    )
  }

  await rest.runMethod(
    rest,
    'POST',
    routes.INTERACTION_ID_TOKEN(BigInt(interaction.id), interaction.token),
    {
      // MESSAGE COMPONENTS NEED SPECIAL DEFER
      type:
        InteractionTypes.MessageComponent === interaction.type
          ? InteractionResponseTypes.DeferredUpdateMessage
          : InteractionResponseTypes.DeferredChannelMessageWithSource,
    },
  )

  // ADD EVENT TO QUEUE
  queue.events.push({ shardId, message })
}

export type WorkerMessage =
  | WorkerIdentifyShard
  | WorkerAllowIdentify
  | WorkerShardPayload
  | WorkerGetShardInfo

export type WorkerIdentifyShard = {
  type: 'IDENTIFY_SHARD'
  shardId: number
}

export type WorkerAllowIdentify = {
  type: 'ALLOW_IDENTIFY'
  shardId: number
}

export type WorkerShardPayload = {
  type: 'SHARD_PAYLOAD'
  shardId: number
  data: ShardSocketRequest
}

export type WorkerGetShardInfo = {
  type: 'GET_SHARD_INFO'
  nonce: string
}

export type WorkerCreateData = {
  intents: number
  token: string
  handlerUrls: string[]
  handlerAuthorization: string
  path: string
  totalShards: number
  workerId: number
}

export type WorkerShardInfo = {
  workerId: number
  shardId: number
  rtt: number
  state: ShardState
}

export interface QueuedEvent {
  message: DiscordGatewayPayload
  shardId: number
}

export interface GatewayQueue {
  processing: boolean
  events: QueuedEvent[]
}
```

Note, you can take this concept and expand on it as much as you like. You can swap out the fetch() with websockets or
any other system you like to communicate between your processes. I highly recommend you take some time to add checks in
place to prevent adding to queue when the queue reaches a certain size. You don't want this to become a memory leak of
infinite size and crash your gateway. So take the time to do this right in your setup.

If you have any questions, please contact us on our [discord server](https://discord.gg/ddeno).
