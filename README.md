# Discordeno

Discord API library wrapper in Deno

[Discord Server](https://discord.gg/J4NqJ72)

## Bot Boilerplate Template / Frameworks

If you are just starting out, you can use the Discordeno Template repo to get the base of your bot pre-built for you. As other developers create other command frameworks for this library, those frameworks will be listed here:

| Bot Name             | Developer         | Links                                                                                                           | Description                                                                           |
| -------------------- | ----------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Official Boilerplate | Skillz4Killz#4500 | [Github](https://github.com/Skillz4Killz/Discordeno-bot-template), [Support Server](https://discord.gg/J4NqJ72) | This is a very minimalistic design for a boilerplate for your bot to get you started. |
| DenoBot              | NTM Nathan#0001   | [Github](https://github.com/ntm-development/DenoBot), [Support Server](https://discord.com/invite/G2rb53z)      | Another boilerplate example of the first one, with more commands and improvements.    |

**ADVANCED DEVELOPERS:** If you would like to start from scratch without any boilerplate/framework:

```ts
import Client from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/v5/module/client.ts";
import { sendMessage } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/v5/handlers/channel.ts";
import { Intents } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/v5/types/options.ts";
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
    },
  },
});
```

## Motivations/Features

This project began out of the desire to want to learn and enhance my developer skills. As I was building it, I encountered so many issues that other libraries have that I wanted to change in my library.

- **TYPESCRIPT:**
  - First class support for Typescript!
  - **STABILITY:**
    - One of the biggest issues with almost every library(I have used) is stability. None of the libraries gave much love and attention to Typescript developers the way it deserves.
      - Discord.JS developers continues to make breaking changes(on "stable" version) to TS projects without bumping the MAJOR version causing headaches for TS developers.
      - Eris was the most stable when it comes to JS, but in regards to TS, I was personally maintaing the typings and this was just a hassle to try and maintain when very few others cared to keep it properly maintained.
      - Detritus was in fact the best library for TS, but once again it lacked in proper stability. It only had 1 master branch and no signs of a proper stable version where I would not have to worry about breaking changes.
- **SECURITY:**
  - Check all permissions necessary before sending a request to the API.
  - Prevent supporting self-bots and abusive behavior.
  - Never supporting undocumented features.
- **Functional API:**
  - This will overall make a cleaner and more performant API, while removing the headaches of extending built-in classes, and inheritance.
  - Avoid as many headaches and issues related to `class` and `this`
  - Avoid EventEmitter to not have potential of memory leaks or bot crashes because of too many listeners or other silly issues.
  - Avoid for loops, while loops etc...
- **MINIMALISTIC:**
  - Prevent as many "options" for the sake of customizability. Prefer defaults that Discord recommends.
- **DOCUMENTATION:**
  - All of Discord API Documentation available inside your VSC while you code.
  - The entire libraries documentation is automatically available to you through intellisense.
- **LATEST AND GREATEST JAVASCRIPT:**
  - Backwards compatibility is the death of code. It causes clutter and uglyness to pile up and makes developers lazier.
  - There will be no such thing as backwards compatibility reasons in Discordeno.
  - We will always support the latest and greatest of JS in our code internally. The end!
  - That said, we don't expect many things to be changing drastically in regards to the public API after v1. As you can imagine Typescript allows the latest and greatest of JS so we will be ahead of the curve for years to come.
- **Unique 2 Versioning Systems**
  - Discordeno will have releases that comply with SemVer. To use this system you will simply use the `v2.0.0` system in your version.
    - `Note:` This means for every tiny bug fix/change you need to manually update the code every time. So if a new feature is added, you would need to bump the version in your code.
  - Each version is also available through a specific branch. For example `v2` branch holds all the version 2 code. This branch is always updated whenever a MINOR or PATCH update is made that will NOT break your bots.
    - `Note:` This means you never have to update your code EXCEPT when you are ready to bump to next MAJOR version. So if a new feature is added, it will be added automatically. If a small bug is fixed it will be automatic.

Documentation: https://doc.deno.land/https/deno.land/x/discordeno/mod.ts

Website: https://discordeno.js.org
