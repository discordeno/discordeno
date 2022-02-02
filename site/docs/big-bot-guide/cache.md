---
sidebar_position: 4
sidebar_label: Step 3 - Cache
---

# Step 3: Standalone Cache Process

The next part of this is going to be about making a standalone cache process. By now, you should have both a REST and a Gateway process ready. Before, we start handling events we should build a Cache handler.

## Why Use Standalone Cache Process?

A standalone cache process allows you to retain cached data even after bot restarts. For example, if you are caching member roles to track when a role was added or removed, you may want to cache the members. The question then comes to play, when deciding where to keep your cache. Another reason to use this is, whether or not you are using a standalone gateway process.

- Start rest process
- Start event handler process(bot)
- Start gateway process.
    - Guild create events arrive providing all the data needed to cache in the bot process.
- Restart event handler process(maybe for an update/reboot)
    - You lost all guilds/channels/permissions etc and can not get them again without restarting gateway. This defeats the entire point of the standalone gateway.

If your cache is tied to the bot processes which is not tied to the gateway you lose all this info. The next thought is to just keep the Cache entirely in the gateway process however, I do not like this personally however, should you desire this you can do this as well. The reason I prefer not to do this is when your bot needs to make requests to your cache, you do not want it occupying the thread for processing other gateway events arriving from discord. A separate cache process makes it so it uses an entirely separate thread and will not slow down anything else.

## Understand Cache Types

When I use the term cache process, this is interchangeable with any similar term such as "custom cache", "redis cache", "pgsql cache", etc... The fact is you can keep this "cache" anywhere. For this guide, we will implement a very simple cache using pgsql. Feel free to modify this any way you like as advanced as you like. The point is Discordeno cache is flexible enough to let you use anything for your Cache storage.

## Setting Up The Cache

This step is for you to create the base schema for your cache. For example, if you want to implement a pgsql or redis cache perhaps you want to prepare the tables/schema. For this guide, we are just going to do a quick little hack to get a custom cache working.

Create a file in a path like `src/bot/cache/schema.sql`

```sql
CREATE TABLE IF NOT EXISTS "users" (
    id bigint NOT NULL,
    username text COLLATE pg_catalog."default" NOT NULL,
    discriminator text COLLATE pg_catalog."default" NOT NULL,
    bot boolean,
    CONSTRAINT "users_pkey" PRIMARY KEY (id)
)
```

Now that we have this schema ready for our users cache. Go ahead and repeat this for all other cache tables.

Cache Tables:

- users
- members
- guilds
- channels
- threads
- messages
- presences
- unavailableGuilds

Once you are finished continue forward, for the purpose of keeping this guide short we wont cover each table.

> You should also run this file to prepare your pgsql and have your pgsql database running by now. Or whatever, cache service you use.

### Cache Handler

Now we will initiate our cache service. This may be different for you based on your choice of cache type. Since we are using PGSQL for our cache layer, we will now instantiate it.

```ts
import { postgres } from '../../../deps.ts'

// YOU CUSTOM PGSQL INFO GOES HERE
const DATABASE_USERNAME = "";
const DATABASE_PASSWORD = "";
const DATABASE_NAME = "";
const DATABASE_HOST = "";
const DATABASE_PORT = 8956;
const DATABASE_MAX = 20;

export const psql = postgres({
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  max: DATABASE_MAX,
  /*onnotice: (data) => {
      logger.psql(`${data.severity} ${bgBrightBlack(`[${data.code}| ${data.file}:${data.line}]`)}`, data.message);
    },*/
  types: {
    bigint: postgres.BigInt,
  },
})
```

To use the PGSQL driver we are using in this guide you can insert this into your `deps.ts`. 

```ts
// @deno-types="https://denopkg.com/porsager/postgres@e2a8595d7aa8c3c838b83b9bca7b890c1707ad2c/types/index.d.ts"
export { default as postgres } from "https://denopkg.com/porsager/postgres@e2a8595d7aa8c3c838b83b9bca7b890c1707ad2c/deno/lib/index.js";
```

> Note: Remember you can use any driver you like. For deno users we prefer to use this library for PGSQL because it is more stable and more performant.

Now that the cache layer is ready, we can proceed to begin creating our bot.