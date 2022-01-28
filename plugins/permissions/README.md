# permissions-plugin

This is an official plugin maintained by Discordeno. This plugin provides automatic permission checking and useful permission checking utility functions. Highly recommended to install this plugin for all users as you can use the utility functions. Enabling the permission plugin should not be done for big bot developers as it requires the cache plugin which will not work in a performance optimized fashion. This is designed mainly for the small beginner devs.

## Requirements

- [Cache Plugin](https://github.com/discordeno/cache-plugin)

## Usage

```ts
// MOVE TO DEPS.TS AND USE SPECIFIC VERSION
import enableCachePlugin from "https://deno.land/x/discordeno_cache_plugin/mod.ts";
import enablePermissionPlugin from "https://deno.land/x/discordeno_permission_plugin/mod.ts";

// Create the bot object, THIS WILL NEED YOUR OPTIONS.
const bot = createBot({});
// REQUIRED: Enables the cache plugin on this bot
enableCachePlugin(bot);
// Enables the permission plugin on this bot
enablePermissionPlugin(bot);
// Start your bot
await startBot(bot);
```

