# validations-plugin

This is an official plugin maintained by Discordeno. This plugin provides automatic request checking and useful
validation utility functions. Highly recommended to install this plugin for all users as you can use the utility
functions.

## Usage

```ts
// MOVE TO DEPS.TS AND USE SPECIFIC VERSION
import { enableValidationsPlugin } from "./deps.ts";
// Create the bot object, THIS WILL NEED YOUR OPTIONS.
const bot = createBot({});
// Enables the plugin on this bot
enableValidationsPlugin(bot);
// Start your bot
await startBot(bot);
```
