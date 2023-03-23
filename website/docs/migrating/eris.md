---
sidebar_position: 1
sidebar_label: Eris To Discordeno
---

# Migrating From Eris To Discordeno Guide

## Understanding The Goals of This Guide

This guide is a quick-paced walkthrough meant for explaining the migration process for Eris bots to using Discordeno. If you are not sure whether you want to migrate, please read [Should I Migrate?](../intro.md)

## TypeScript

I really hope you wrote your bot with TypeScript as it is going to save you a lot of time. If you have not written it in TypeScript, you should probably start now. Using this migrating as a push to switch to TypeScript.

If your bot is using TypeScript, this migration will be a lot easier.

First, update typescript to the latest version available. This will be required if your bot is using a much older version. Discordeno uses the leverages the latest and greatest TypeScript features. Please make sure you have the latest version of typescript before going forward.

## ESM

If you are using a runtime like Deno that supports ESM from the get go then this step is not required.

Discordeno uses ESM. More than likely, your bot does not use it and if you do not know what ESM is don't worry. It's just the new standard of using JavaScript. Let's keep it simple, to make Discordeno work add `"type": "module"` to your `package.json` file.

Next go to your tsconfig.json file:
```json
{
    "module": "ES2022",
    "target": "ES2022",
}
```

:::tip
You can use any version above ES2022 should you be reading this guide in the future and it is not updated. 
- P.S. If it is not updated, blame Yui!!! 🤣
:::

## Getting Started

Open up a terminal and run `tsc --watch --noEmit` to keep TypeScript warning of us of errors that may appear as we migrate.

Once you are ready, let's go ahead and install Discordeno, while we are at it we can uninstall eris. Open a new terminal and run the following command for the package manager you use:

```ts
// NPM users
npm uninstall eris && npm install @discordeno/client@19.0.0-next.99fbe1e
// Yarn users
yarn remove eris && yarn add @discordeno/client@19.0.0-next.99fbe1e
```

:::caution
Currently, Discordeno v19 is in development. This is why you can not install it as @discordeno/client but have to specify the commit version. Once this version is released, it will be as easy as `@discordeno/client`.
:::

We are going to use [NayuBot](https://github.com/AwesomeStickz/Nayu-Bot) which is a small bot written in TypeScript with Eris and is open source as the example we are going to migrate to Discordeno.

At this moment in time, the tsc terminal(from now on we are going to refer to this as TypeScript), is telling us we have 13 errors. This is because when we removed eris, we also need to fix any imports it may have. So let's run a search in VSC to find any `from 'eris';` and `from "eris"`. We need to replace these with `from '@discordeno/client'` and `from "@discordeno/client"`.

## Intents

Eris was still using an older version of the api. This meant, that intents like MessageContent was not yet supported. When switching to Discordeno, we use the latest API version possible to provide the best experience possible. This requires that if your bot needs the `MessageContent` intent, that it provide it in the intents.

```ts
// If your code is a number like this, update the number.
intents: 4086,
// If your code is an array, add Intents.MessageContent
intents: ["guilds", "guildMessages", Intents.MessageContent],
```

## Known Issues

Currently, there are a few issues with the migration. 

- `voice` - Currently **@discordeno/client** does not support voice features. Until we have a large music bot with the desire to migrate to discordeno we don't plan to support this as it is a massive endeavor. It will require a willing developer with good ability to test our implementation and make sure it scales well, like the rest of discordeno. If you are a music bot developer looking to migrate, and are willing to work with us to support this, please do contact me on Discord.
- `selfbots/userbots` - Eris supported a lot of selfbot features that Discordeno does not. All of these features were removed. If you are trying to migrate a self bot, you will not be able to access a lot of features. This will never be supported. Please don't ask.
- `command frameworks` - If you made your bot with a command framework package such as Yuuko, you may have some issues. This is because that package itself depends on Eris. It would need updating to support **@discordeno/client** instead of Eris. In a near future, when both typescript and node.js, you will be able to use *import maps* to replace all instance of eris with discordeno in all your packages.
- `deprecations` - If your bot was written using old code that Eris had marked as deprecated, we removed that behavior. Take this time, to fix those few errors in the new cleaner fashion. The following is a list of reported methods that were effected:
    - getMessages
