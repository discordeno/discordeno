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
// If you provide intents like this, make sure to update the number with MessageContent intent.
intents: 4086,
// If you provide intents like this, make sure to update the number with MessageContent as below
intents: ["guilds", "guildMessages", Intents.MessageContent],
```


