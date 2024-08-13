---
sidebar_position: 6
sidebar_label: Caching Guide
---

# Caching Guide

Caching in Discordeno is different from other libraries. This is because we don't encourage caching everything just because you can even if you don't need it. So we provide ways to cache and users can cache the data as they need, which lets them customize it as much as they want!

Now you can do it manually by yourself or use the cache proxy package that already handles all the basic caches and provides an advanced wrapper to have full control over it, check them both and go with the one that'll suit your needs.

## Cache Proxy

### Overview

`dd-cache-proxy` provides you with a simpler way to cache using Discordeno. It supports caching both inside memory and outside memory. It supports caching channels, guilds, members, roles and users. If you need more than this, you can extend the package or cache manually.

### Installing The Package

Install the package `dd-cache-proxy` from npm with your preferred package manager:

```bash
yarn add dd-cache-proxy
```

### Example Usage

```js
import { createProxyCache } from 'dd-cache-proxy';
import { createBot, Bot, Intents } from '@discordeno/bot';

// Create a function for easier use and cleaner code.
const getProxyCacheBot = (bot: Bot) =>
  createProxyCache(bot, {
    // Define what properties of individual cache you wish to cache. Caches no props by default. Or you can use the `undesiredProps` prop to reverse the behavior of `desiredProps`.
    desiredProps: {
      // Example props that are cached in channels and other cache. Accepts an array of props of the cache. All props are optional.
      guilds: ['channels', 'icon', 'id', 'name', 'roles'],
      users: ['avatar', 'id', 'username'],
    },
    // Define what to cache in memory. All props are optional except `default`. By default, all props inside `cacheInMemory` are set to `true`.
    cacheInMemory: {
      // Whether or not to cache guilds.
      guilds: true,
      channels: true,
      // Default value for the properties that are not provided inside `cacheInMemory`.
      default: false,
    },
    // Define what to cache outside memory. All props are optional except `default`. By default, all props inside `cacheOutsideMemory` are set to `false`.
    cacheOutsideMemory: {
      // Whether or not to cache channels.
      channels: false,
      roles: false,
      // Default value for the properties that are not provided inside `cacheOutsideMemory`.
      default: true,
    },
    // Function to get an item from outside cache. `getItem`, `setItem`, `removeItem` must be provided if you cache outside memory, can be omitted if you don't store outside memory.
    setItem: (table, item) => {
      if (table === 'channels') {
        // Custom code to store data into your cache outside memory, say redis or a database or whichever you use.
      }
    },
  });

// Pass the created bot object to `getProxyCacheBot` so it can add the cache proxy to it.
const bot = getProxyCacheBot(
  // Create the bot object.
  createBot({
    token,
    intents: Intents.Guilds,
  })
);
```

It also supports generic type so you can have your cached objects with different types than their original ones, like:

```js
import { Bot } from '@discordeno/bot'

const bot = getProxyCacheBot<{ guilds: CachedGuild }, Bot>(...)
```

### Getting From Cache

To get a guild from your cache, you can do:

```js
await bot.cache.guilds.get(guildId);
```

Each cache will be in their own property under `bot.cache` and each of them have the following methods: `delete`, `get`, `set`, usage of these should be self explanatory from intellisense. If you cache in memory and need access to the collection directly, you can use `bot.cache.guilds.memory`, this will return a collection.

### Important Points To Note

-   Make sure to include the correct `bot.transformers.desiredProperties` somewhere in your code, this must include at least **all** the properties from `bot.cache.options.desiredProps` for it to cache all those properties you want to cache.
-   It's not recommended to dynamically change `bot.cache.options.cacheInMemory` or `bot.cache.options.cacheOutsideMemory` since it may not cache newly added cache if events for that isn't setup. If you need to do so, you need to manually rerun the `setupDummyEvents` function.
    -   You should also avoid directly replacing `bot.events` (like `bot.events = { ready: ReadyFunction }`) since it'll override the dummy events setup by the cache proxy, which may make it unable to cache data. Instead, assign to individual event properties, like `bot.events.ready = ReadyFunction`, `bot.events.messageCreate = MessageCreateFunction` etc.

### Useful Options To Note

#### `options.shouldCache`:

This is a property with which you can conditionally cache only certain objects and leave out the others. For example, if you only want to cache guild channels, you can simply do:

```js
shouldCache: {
  channel: async (channel) => {
    if (channel.guildId) return true;
    else return false;
  },
}
```

#### `options.bulk`:

Lets you define how to deal with bulk removal of data. Useful to provide when you use cache outside memory. For example, if you store channels individually and separately from a guild, say in a database, when a guild is deleted, all of those channels will be deleted individually in individual queries, which is not ideal, so you can use `options.bulk.removeGuild` to delete the guild and all the channels related to that guild as one query or so, whichever gives better performance.

This provides the following props: (should be self explanatory with intellisense)

-   `options.bulk.removeGuild`
-   `options.bulk.removeRole`
-   `options.bulk.replaceInternalBulkRemover` - To set props under this prop to tell the cache proxy whether or not to run internal bulk removers.

#### `options.maxCacheInactiveTime`:

Lets you provide the amount of inactive time (in milliseconds) for a cached object after which it should be removed from cache. Useful if for example you want to cache only active guilds.

#### `options.cacheSweepInterval`:

Lets you define the interval (in milliseconds) in which the cache sweeper should check for inactive objects based on maxCacheInactiveTime to clear them.

## Manual Caching

### Overview

Every structure that you receive from Discord through the API or the Gateway will be passed onto something called `customizers`, making it the easiest place to cache them all by simply overriding them.

Customizers are found under `bot.transformers`. For each structure, we have a customizer function that gets run every time the library sees the structure. For example, every guild received through gateway events like `GUILD_CREATE`, `GUILD_UPDATE` or REST functions like `REST.getGuild()`, `REST.editGuild()` (as response) etc. will be passed onto `bot.transformers.customizers.guild`. This means that if we override this function, we'll have access to the guild object whenever it's created or updated.

### Adding Into Cache

Override the `bot.transformers.customizers.guild` function, inside which insert the code to store the guild into the cache of your choice:

```js
bot.transformers.customizers.guild = (bot, payload, guild) => {
  // Store the guild into cache
  guilds.set(guild.id, guild);
};
```

And that's it! As simple as that.

### Removing From Cache

Now we also need to consider for guilds that gets removed, we can do this by overriding the `GUILD_DELETE` handler:

```js
const { GUILD_DELETE } = bot.handlers;

bot.handlers.GUILD_DELETE = (bot, data, shardId) => {
  const payload = data.d as DiscordUnavailableGuild;
  const id = bot.transformers.snowflake(payload.id);

  // Remove the guild from cache
  guilds.delete(id);

  GUILD_DELETE(bot, data, shardId);
};
```

Remember to call the original handler, as that contains the code to pass it onto the event function.

That's all for guild, now we repeat these steps for every other structure that we want to cache.

### Important Point To Note

Discordeno is designed to be minimal, this means that it won't handle the events that you don't have a function attached to. This means that it won't run customizers on those events.

For example, let's say that you have a function set to `bot.events.guildCreate` but not `bot.events.guildUpdate`, then `bot.transformers.customizers.guild` will be run whenever there's a `GUILD_CREATE` event but not on `GUILD_UPDATE` event. This will lead to your cached guild not being up-to-date if that guild is updated.

To solve this issue, you should attach a dummy function to all events that could update the cached object. For a guild, there are only 2 events: `GUILD_CREATE` and `GUILD_UPDATE`. Since in this example you already have a `bot.events.guildCreate` and lack a `bot.events.guildUpdate`, you can simply do like: `bot.events.guildUpdate = () => {}` to make Discordeno handle this event, which in turn calls the `bot.transformers.customizers.guild` function, which will let you update your cache on `GUILD_UPDATE` event.

Now there's an easy way to go about and find all the events that would run the customizer you're working with. Simply go to [Discordeno's codebase](https://github.com/discordeno/discordeno), Ctrl + F and enter `transformers.<YOUR_CACHED_OBJECT_NAME>` and look into the files that are in the directory `package/bot/src/handlers/**`. All the files displayed there are the events you're looking for to add to your `bot.events`.

You will also see that some transformers are called inside other transformers in the directory `package/bot/src/transformers/**`. You would need to repeat the above step for each transformer you see there to ensure that your cache is fully up-to-date. You can take a look at [how we handle it at dd-cache-proxy](https://github.com/AwesomeStickz/dd-cache-proxy/blob/main/setupDummyEvents.ts) to get a better idea of this.

Now that you've got an idea of how to cache in discordeno, you can proceed with next steps in your bot. If you need any help, contact us on [Discord](https://discord.gg/ddeno). Happy coding!