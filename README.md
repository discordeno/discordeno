# Discordeno

Discord API library wrapper in Deno

[Discord Server](https://discord.gg/J4NqJ72)

[Website](https://discordeno.netlify.app)

[![nest badge](https://nest.land/badge-large.svg)](https://nest.land/package/Discordeno)
![Testing](https://github.com/Skillz4Killz/Discordeno/workflows/Testing/Linting/badge.svg)

## Beginner Developers

Don't worry a lot of developers start out coding their first projects as a Discord bot(I did 😉) and it is not so easy. With Discordeno, I tried to build it in a way that solved all the headaches I had when first starting out coding bots. If you are a beginner developer, please use a boilerplate: The official one is at: [GitHub](https://github.com/Skillz4Killz/Discordeno-bot-template) but there will be more listed on the website. It is a beautiful website indeed! Check it out!

**Modular commands, arguments, events, inhibitors, monitors, tasks.**

- Clean and powerful commands system
  - Powerful argument handling including validating, parsing and modifications.
  - Easily create custom arguments for your specific needs.
  - Command aliases.
  - Cooldowns and allowed uses before cooldown triggers.
  - Author and bot permission checks in server AND in channel!
- Clean and powerful events system
  - Simple functions that are called when an event occurs.
  - Easily reloadable!
  - No possible memory leaks due to incorrect EventEmitter usage!
  - Useful events available to help debug!
- Clean and powerful inhibitors system
  - Stops a command from running if a requirement fails.
  - Easily add custom inhibitors!
- Clean and powerful monitors system.
  - Runs a function on every message sent. Useful for stuff like auto-moderation or tags.
  - Easily ignore bots, users, edits, dms.
  - Powerful permission checks.
- Clean and powerful tasks system.
  - Runs a function at a certain interval. Useful for things like unmute and updating bot lists etc.
  - Can be used for cache sweeping to keep your cache optimized for exactly what you want.
  - Botlists code already made for most botlists. Just add your api tokens for each site and magic!
- Clean and powerful languages system.
  - Built in multi-lingual support.
  - Uses i18next, one of the best localization tools available.
  - Supports nested folders to keep cleaner translation files

**Hot Reloadable**
  - Easily update your code without having to restart the bot everytime.

**Step By Step Guide**
  - There is a step by step walkthrough to learn how to create Discord bots with Discordeno on our website!

## Advanced Developers
The instructions below are meant for advanced developers!

Starting with Discordeno is very simple, you can start from scratch without any boilerplates/frameworks: Add this snippet of code into a new TypeScript file:

```typescript
import Client from "https://x.nest.land/Discordeno@8.4.1/src/module/client.ts";
import { sendMessage } from "https://x.nest.land/Discordeno@8.4.1/src/handlers/channel.ts";
import { Intents } from "https://x.nest.land/Discordeno@8.4.1/src/types/options.ts";
import config from "./config.ts";

Client({
    token: config.token,
    intents: [Intents.GUILD_MESSAGES, Intents.GUILDS],
    eventHandlers: {
        ready: () => {
            console.log(`Logged!`);
        },
        messageCreate: (message) => {
            if (message.content === "!ping") {
                sendMessage(message.channel, "Pong");
            }
        }
    }
});
```

Alternatively, you can use boilerplate template repositories that were created by wonderful developers. Review the list on the website, and add any of yours if you make your own.

![image](https://i.imgur.com/z1BfUnt.png)

#### Dark Mode

![image](https://i.imgur.com/Vr2Bebr.png)
