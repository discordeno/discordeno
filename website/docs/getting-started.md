---
sidebar_position: 3
sidebar_label: Getting started
---

# Getting started with Discordeno

:::info
Discordeno is not intended for beginners, however you can still utilize it.
:::

## Installation

You can install the npm package `@discordeno/bot` and this package will take care of setting up the REST & Gateway for your bot.

```bash
npm install @discordeno/bot # Using npm
yarn add @discordeno/bot    # Using yarn
pnpm add @discordeno/bot    # Using pnpm
bun add @discordeno/bot     # Using bun (as a package manager)
```

If you are using Deno you will need to still use the npm package, so you will need to use the `npm:` prefix in your imports.

## Minimal bot that logins into Discord

You can use `@discordeno/bot` as follows:

```ts
import { createBot, Intents } from '@discordeno/bot'

const bot = createBot({
  token: 'YOUR BOT TOKEN',
  intents: Intents.Guilds | Intents.GuildMessages, // Or other intents that you might needs.
  events: {
    ready: data => {
      console.log(`The shard ${data.shardId} is ready!`)
    },
  },
})

// You can add events after the createBot call if you prefer

bot.events.messageCreate = message => {
  // Do stuff with the message object ...
}

await bot.start()
```

This code will create a bot object with a specified token and [Gateway Intents](https://discord.com/developers/docs/topics/gateway#gateway-intents), in this case the ones for getting Guilds and Guilds messages.

You can check some other minimal examples with [Node.JS](./examples/node.md), [Deno](./examples/deno.md) or [Bun](./examples/bun.md) if you want to know more on how to [create](./beginner/token.md) and [invite](./beginner/inviting.md) a Discord application or how to setup the use of [environment variables](./beginner/env.md) instead of putting your token in your code.

:::danger[Environment Variables]
It is highly encouraged to use an environment variable instead of using a string in your code. You can check out different ways to do it in [this guide](./beginner/env.md)

That way it makes it much harder to leak sensitive information and it easier to share with other people. Sensitive information are, but not limited to, your bot token
:::

:::warning[Excessive Intents]
Adding intents that you don't use in the `intent` value on your bot configuration will result in performance degradation. Only use the intents that you need for your bot, especially when dealing with privileged intents. You can read more about [intents](https://discord.com/developers/docs/topics/gateway#gateway-intents) and [privileged intents](https://discord.com/developers/docs/topics/gateway#privileged-intents) on Discord documentation.
:::

## Send a message in a channel from Discordeno

As well as managing your connection to the Discord gateway, Discordeno also manage HTTP/REST requests and rate limits (such as [Invalid Request Limit aka Cloudflare ban](https://discord.com/developers/docs/topics/rate-limits#invalid-request-limit-aka-cloudflare-bans)) for you.

In Discordeno, you can call methods in the `bot.helpers` object to perform some actions on Discord. These methods will return objects that are different from the one returned by Discord, a notable example are the IDs. For IDs, Discord return a string with a number inside to avoid rounding errors in most languages, including JavaScript. However, in JavaScript, this issue can be avoided using [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt). Therefore, before returning objects, Discordeno will transform most (if not every) IDs from a string to a `BigInt`. As for methods with parameters that accept an ID, most methods in the `bot.helpers` object will accept both a `BigInt` and a normal string.

For example, to send a message to a channel, you can call the `bot.helpers.sendMessage` method with the 2 required parameters:

- The ID of the channel that you want to sent the message to
- The options of your message

```ts
// Change the id below with one of the channels of one of the server your bot is in
const message = await bot.helpers.sendMessage(123123123123123123n, {
  content: 'Hello world. This is test message from Discordeno.',
})
```

:::tip[Naming of functions in Discordeno]
Most of the functions in Discordeno are explicit in what they do and named similar to what Discord calls the endpoint in the documentation.

Discordeno's methods always perform one action only. A method will never call multiple Discord endpoints.
:::

## Understanding Desired Properties in Discordeno

If we ran the code above (for example, by putting the code inside the ready event), the bot will send a message in the channel you specified (as long as it has the permissions to do so) with the content "Hello world. This is test message from Discordeno.". However, if we log to the console the message object that Discordeno return, we won't see many, if any, values on it. This is also the case for other events such as `MessageCreate`. But why is that? Well, this is because of a Discordeno feature called `Desired properties`.

Desired properties is a feature that reduce the memory usage of your application by removing properties that you don't use. For example, you might not be interested in knowing the topic of a channel, but Discord will always return it, therefore consuming more memory. This is why Discordeno requires you to explicitly set the properties that you want to keep and use.

You can set which property you want to keep in the `bot.transformers.desiredProperties` object. Discordeno will default everything to false and you can set the values you want to keep to true manually like this:

```ts
bot.transformers.desiredProperties.message.id = true
bot.transformers.desiredProperties.message.content = true
bot.transformers.desiredProperties.message.channelId = true
```

With the above 3 lines of code, we will be able to get the message ID, the channel ID and the message content\* of a specific message. The same thing can be said for the return object of `sendMessage` method and the `messageCreate` event

We can also set the properties we want to keep with `{ id: true, content: true, channelId: true }`, but that would require us to specify all others keys in the object, and doing that would get extremely annoying.

\*: As long as the required privileged intent is enabled.

:::danger[Changing the default for Desired Properties]
THIS IS NOT RECOMMENDED IF YOU PLAN TO SHIP YOUR BOT TO PRODUCTION.

While not recommended, in the `createBot` function, we do allow for a value: `defaultDesiredPropertiesValue`. This, if set to true will set every desired property to true by default, you can still disable some if you need. The reason why this is not recommended and marked as deprecated from the documentation is because while Desired Properties DO slow you down during development (needing to make sure you aren't using something that you won't have at runtime), they have a significant performance impact based on the properties you disable on both a CPU side and memory side. Also, we are currently working on a solution to the current TypeScript issues (see box below) and that may remove the `defaultDesiredPropertiesValue` value altogether or move it to a new place.
:::

:::warning[Typescript and Desired Properties]
We are aware that TypeScript has no idea which properties will be missing. We are working on fixing this issue.
:::

## Additional information on Discordeno

Here are some nice to know things about Discordeno that you might be interested, though some may be for more advanced use-cases.

### Gateway methods

If you want to edit some state such as your bot status, you will need to use the methods in `bot.gateway`. These methods will not return transformed objects so if you want to get transformed objects you will need to call the transformers yourself (the transformers are in `bot.transformers`).

### OAuth2

Some methods in `bot.helpers` will accept a `Bearer` token, or a `Client ID` and `Client Secret`. These OAuth2 methods will require you to setup the OAuth2 authorization flow. One example is the `bot.helpers.getCurrentUser(bearerToken)` method. This is a method that can not be called with a usual Bot token and require a OAuth2 token.

Discordeno includes some utilities (such as `createOAuth2Link` to create a OAuth2 authorization link) and methods to exchange your token as well as refresh your exiting token.

<!-- TODO: Add a link to the page on how to use OAuth2 in Discordeno. -->

You can read more about OAuth2 in Discord on the [documentation](https://discord.com/developers/docs/topics/oauth2).

### Use individual features from Discordeno separably

While we do provide a `@discordeno/bot` package on npm with all features included, you might just need some of them. For this reason, Discordeno is split across multiple packages, which are the following:

- `@discordeno/bot`: Groups all other packages as well as adding transformers and other functionalities on top.
- `@discordeno/rest`: Only provide methods to send requests to Discord REST API as well as handling rate limits. This will provide the same object as [`bot.rest`](#raw-rest-methods) when you create a `RestManager`.
- `@discordeno/gateway`: Only provide methods to establish and manage gateway connections to Discord. This will provide the same object as `bot.gateway` when you create a `GatewayManager`
- `@discordeno/utils`: Only provide some utilities that are independent from other Discordeno features.
- `@discordeno/types`: Only provide the Discord & Discordeno types used in all other packages.

It might make more sense to simply use `@discordeno/bot`, as the separate packages are mostly for advanced use cases.

### Raw REST methods

While we recommend using `bot.helpers`, you might find yourself in a situation where avoiding the transformers and desired properties can be beneficial. For this reason, you can use the methods in `bot.rest`. These methods will return the raw response from Discord but with the keys being camelCase instead of snake_case.
