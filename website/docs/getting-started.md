---
sidebar_position: 3
sidebar_label: Getting started
---

# Getting started with Discordeno

:::info
Discordeno is not intended for beginners, however you can still utilize it.
:::

## Installation

```bash
npm install discordeno # Using npm
```

If you need more specific packages, you can install them directly for example:

```bash
npm install @discordeno/types # Using npm
```

### Typescript

If you are using Typescript you do need to enable `strictNullChecks` in your TSConfig, or else it may cause issues especially with [Desired Properties](#understanding-desired-properties-in-discordeno)

## Understanding Bot Helpers

Whenever you want to do something on discord, you will need to talk to the discord api. To make this easy, we provide "helpers". For example, to send a message to a channel, you can call the `bot.helpers.sendMessage` method with the 2 required parameters:

- The ID of the channel that you want to send the message to
- The options of your message

```ts
const message = await bot.helpers.sendMessage(channel.id, {
  content: 'Hello world. This is test message from Discordeno.',
})
```

## Understanding Desired Properties in Discordeno

By default, discordeno requires you to opt into each property on discord objects. For example, a channel object by default will be `{}`. If you want details in that channel you must enable those properties as desired properties.

For more details checkout [the desired properties docs](./desired-properties.md)

:::tip
If you plan to use discordeno, this is a must read! Please do not skip! It is a very important concept to make your bot work in discordeno.
:::

## Minimal bot that logs into Discord

You can check minimal examples with [Node.JS](./examples/node.md), [Deno](./examples/deno.md) or [Bun](./examples/bun.md). 
