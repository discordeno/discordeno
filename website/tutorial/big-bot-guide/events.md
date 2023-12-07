---
sidebar_position: 5
sidebar_label: Step 4 - Event Handler
---

# Step 4: Creating Standalone Event Handler

Now we are about to start working on the bot code itself. The last 3 steps should be completed by the time you reach
this. The event handler process will be listening for events from any number of gateway instances and be ready to handle
them.

In this guide, we may use the term `Bot` or the term `event handler`, remember that these refer to the same thing. This
is your main bot code.

## Why Use Standalone Event Handler Process?

The standalone event handler is the portion of your bot code that you will be changing the most. The three previous
steps created processes that are intended to never be turned off. This process is designed to let you restart whenever
you wish and be incredibly quick to restart. Since we don't have the delay to start up shards anymore, your code becomes
reloaded instantly.

## Creating Event Handlers

Create a file path like `src/bot/mod.ts`.

```ts
import { DISCORD_TOKEN } from '../../configs.ts'
import { Collection, createBot, Intents } from '../../deps.ts'
import { psql } from './cache/mod.ts'

export const bot = createBot({
  token: DISCORD_TOKEN,
  botId: 270010330782892032n,
  intents: Intents.Guilds | Intents.GuildMessages,
  events: {
    messageCreate: function (bot, message) {
      console.log('message arrived')
    },
  },
})
```

Alright that was a lot of code. Now let's break it down little by little.

### Understanding createBot()

**Basic Keys**

- `token` if you can't figure this out stop reading and find another guide please. Thanks.
- `botId` This is going to be your bot id. The reason we require this here is because we are going to set up a
  standalone gateway process. With most other libs, they can fill this information using the READY event. However, since
  our gateway is designed not to reboot, we are not going to get the READY event whenever we restart our bot. This means
  we won't be able to fill this information later. Another method to get the id is to use the `token` but discord
  developers have mentioned that this behavior is not documented and not supposed to be relied on to remain stable. Due
  to these reasons, we chose to just require the bot id be passed here.
- `applicationId` is an optional choice if your bot is old and has a unique id different from it's bot id.
- `intents`: Provide the intents you like using a bitwise OR operation (eg. `Intents.Guilds | Intents.GuildsMessages`).
  String form supports autocomplete and type safety.
- `events`: These are your event handler functions. When a MESSAGE_CREATE event arrives from Discord it will be
  processed here. We will set up the routing to run these functions later in the guide but for now you can see how to
  set it up. Note, you can create these functions in separate files and just import them here as you wish.

## Using Your Cache

Since we are using a standalone gateway, a custom cache is essentially required as explained in step 3 of this guide.
Here we'll have some basic functions to make use of the cache we created in step 3.

```ts
const cache = {
  /** Get a single item from the table */
  async get(key) {
    return await psql`SELECT * FROM ${psql(
      tables[table],
    )} WHERE "id" = ${psql.types.bigint(key)}`
  },
  /** Completely empty this table. */
  async clear() {
    await psql`TRUNCATE TABLE ${psql(tables[table])}`
  },
  /** Delete the data related to this key from table. */
  async delete(key) {
    await psql`DELETE FROM ${psql(
      tables[table],
    )} WHERE "id" = ${psql.types.bigint(key)}`
    return true
  },
  /** Check if there is data assigned to this key. */
  async has(key) {
    return Boolean(
      await psql`SELECT 1 FROM ${psql(
        tables[table],
      )} WHERE "id" = ${psql.types.bigint(key)}`,
    )
  },
  /** Check how many items are stored in this table. */
  async size() {
    return (await psql`SELECT COUNT("id") FROM ${psql(tables[table])}`).count
  },
  /** Store new data to this table. */
  async set(key, data) {
    await psql`INSERT INTO ${psql(tables[table])} ${psql(
      data,
      ...Object.keys(data),
    )}`
    return true
  },
  // THESE TWO ARE USELESS FOR CUSTOM CACHE BUT NEED TO SHUT UP TS ERRORS
  async forEach(callback) {},
  async filter(callback) {
    return new Collection()
  },
}
```

You can insert any code you desire for your cache system here. Since we were using PGSQL, we used sql queries to make
these requests. However, should you need to communicate to Redis or anything else of your choice, you can do so here.

> Note: The .filter() and .forEach() methods are unnecessary and should not be used for your bot as they are not
> optimized for performance. These are made for smaller bot users who would not leave itoh alone and in order to please
> them itoh gave them their hearts desire! LMAO!

## Customizing Internal Code

One of the best parts about discordeno is the flexibility. In order to show this off, we will use the `user` example but
you can apply this to any part of the library.

### Why Is Customizing Important?

At large scale, every single property can become expensive to store in your cache. For example, if your bot does not
make use of a `channel.topic` why storing potentially millions of strings in your memory for something you never
need/user. This could save you potentially GBs of memory to just remove this one property.

### Customizing Process

First, let's create a file in some path like `src/bot/internals/mod.ts`. Note that we will create quite a few files
below simply to keep code cleaner and simpler, in expectation that it will grow more complex later. You can merge them
as you wish.

```ts
import { Bot } from '../../../deps.ts'
import { customizeBotTransformers } from './transformers/mod.ts'

export function customizeBotInternals(bot: Bot) {
  bot = customizeBotTransformers(bot)
  // ADD AS MANY MORE CUSTOMIZATIONS HERE AS YOU LIKE TO HANDLERS, HELPERS, UTILS ETC...
  return bot
}
```

We also need to add another file now at `src/bot/internals/transformers/mod.ts`

```ts
import { Bot } from '../../../../deps.ts'
import { customizeUserTransformer } from './user.ts'

export function customizeBotTransformers(bot: Bot) {
  bot = customizeUserTransformer(bot)
  // ADD ANY MORE CUSTOM TRANSFORMERS HERE
  return bot
}
```

One more file at `src/bot/internals/transformers/user.ts`

```ts
import { Bot, DiscordenoUser, transformUser } from '../../../../deps.ts'

export function customizeUserTransformer(bot: Bot) {
  bot.transformers.user = function (bot, payload) {
    // REMOVE USELESS PROPS OUR BOT DOESNT USE
    const {
      system,
      locale,
      verified,
      email,
      flags,
      mfaEnabled,
      premiumType,
      publicFlags,
      ...user
    } = transformUser(bot, payload)

    // RETURN ONLY USEFUL PROPS WE NEED TO USE AND CACHE IF NECESSARY
    return user as DiscordenoUser
  }

  return bot
}
```

First we override the internal transformer for the `user` object. What's cool is the typings will be automatically
provided :) Next, we use the `transformUser` function from the lib itself to make it create the internal user version.
The reason I do this is so when I update the library and a new property is added or removed i can simply update and get
it. Should you desire maximum control you can remove this entirely and only have what you want no matter what discord
sends. Discordeno gives you the ability to stay in control.

This method can be applied to any transformer, helper function, gateway event handler, util function or any part of the
library. Anything and everything is possible to override. You do NOT need to fork and modify the library ever and give
yourself a headache trying to maintain your fork with updates.

## Handling Incoming Gateway Events

Remember, this is a separate process we need to make sure we are listening to incoming events from our gateway
instances. Since we used http in our Gateway step, we can create an http listener here as well.

Create a file in a path like `src/bot/gatewayEventsListener.ts`

Now we should create a http listener, check for authorization in headers, run `bot.events.raw` and `bot.handlers[event]`

```ts
import { DiscordGatewayPayload } from 'discordeno'
import { EVENT_HANDLER_PORT, REST_AUTHORIZATION } from '../../configs.ts'

const server = Deno.listen({ port: EVENT_HANDLER_PORT })

// Connections to the server will be yielded up as an async iterable.
for await (const conn of server) {
  // In order to not be blocking, we need to handle each connection individually
  // in its own async function.
  handleRequest(conn)
}

async function handleRequest(conn: Deno.Conn) {
  // This "upgrades" a network connection into an HTTP connection.
  const httpConn = Deno.serveHttp(conn)
  // Each request sent over the HTTP connection will be yielded as an async
  // iterator from the HTTP connection.
  for await (const requestEvent of httpConn) {
    if (
      !REST_AUTHORIZATION ||
      REST_AUTHORIZATION !== requestEvent.request.headers.get('AUTHORIZATION')
    ) {
      return requestEvent.respondWith(
        new Response(JSON.stringify({ error: 'Invalid authorization key.' }), {
          status: 401,
        }),
      )
    }

    const json = (await requestEvent.request.json()) as {
      message: DiscordGatewayPayload
      shardId: number
    }

    // Run raw event.
    bot.events.raw(bot, json.message, json.shardId)

    if (json.message.t && json.message.t !== 'RESUMED') {
      // When a guild or something isn't in cache this will fetch it before doing anything else.
      if (!['READY', 'GUILD_LOADED_DD'].includes(json.message.t)) {
        await bot.events.dispatchRequirements(bot, json.message, json.shardId)
      }

      // Run event function provided in bot.events
      bot.handlers[json.message.t]?.(bot, json.message, json.shardId)
    }

    new Response(undefined, { status: 200 })
  }
}
```
