---
sidebar_position: 3
sidebar_label: Getting started
---

# Getting started with Discordeno

<!-- TODO: Do we want to keep this info box? Or rewrite a bit this -->

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

As well as managing your connection to the Discord gateway, Discordeno also deals with handling the required handling for HTTP/REST requests too. Discordeno will manage for you the ratelimit of the Discord endpoints, these ratelimit includes the invalid request hard limit for the [Cloudflare ban](https://discord.com/developers/docs/topics/rate-limits#invalid-request-limit-aka-cloudflare-bans).

In Discordeno, you can use the `bot.helpers` object to have access to all the function that will perform some kind of actions on Discord. These methods will also give you some objects that will be slightly different from the one from Discord, a notable example are the IDs. Discord will give you a string with a number inside, this is to avoid some rounding errors in some languages (Javascript included), however this issue can be avoided when using [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) in Javascript. Discordeno will transform most (if not every) id that you get from a string to a `BigInt` format, however most methods in the `bot.helpers` object will accept both a `BigInt` or a normal string where content is the id.

To send a message to a channel, for example, you can call the `bot.helpers.sendMessage` method with the 2 required parameters:

- The channel ID corresponding to the channel where you want your message to be
- The message options to create your message

```ts
// Change the id below with one of the channels of one of the server your bot is in
const message = await bot.helpers.sendMessage(123123123123123123n, {
  content: 'Hello world. This is test message from Discordeno.',
})
```

:::tip[Naming of functions in Discordeno]
Most of the functions in Discordeno tend to be very explicit in what they will do and be similar to how discord calls their endpoints in the documentation.

Also, helper methods from Discordeno will always perform a single action only. They will never call multiple Discord endpoints.
:::

## Understanding Desired Properties in Discordeno

If we ran the code from above, for example on the ready event, the bot will send a message in the channel you specified, as long as it has the permissions to do so, with the content of "Hello world. This is test message from Discordeno.". However, if we log to the console the message object we are getting, we won't see many, if any, values on it. This is also the case from the events such as `MessageCreate`, but why is that? Well, this is a Discordeno feature called `Desired properties`.

Desired properties is a feature to allow for a smaller memory impact on your application for properties that you don't use. An example may be the channel topic, you might not be interested in knowing the topic of a channel, however, Discord will always give it to you making your code have to deal with values that you will not use but still consume memory. This is why Discordeno requires you to explicitly set ahead of time the properties that you want/use.

You can set these from the `bot.transformers.desiredProperties` object. This will contain an object for every type that supports this feature, such as `Message` or `Interaction` for example, inside which you will find the single properties with a boolean value, or an object with more properties inside. Discordeno will default everything to false and you can set the values you need to true manually like this:

```ts
bot.transformers.desiredProperties.message.id = true
bot.transformers.desiredProperties.message.content = true
bot.transformers.desiredProperties.message.channelId = true
```

With the above 3 lines of code, we will get the message ID, the channel ID and the message content\* for a specific message, and if we now see the object from both our `sendMessage` helper method and/or the `messageCreate` event, we will find the `id`, the `channelId` and the `content` properties to be present in the object.

We can also set the properties using the Javascript Object Syntax (`{ id: true, content: true, channelId: true }`), but that would require us to specify all others keys in the object with false, and doing something like that would get extremely annoying.

\*: As long as the required privileged intent is enabled.

:::danger[Changing the default for Desired Properties]
THIS IS NOT RECOMMENDED IF YOU WANT TO SHIP YOUR BOT TO PRODUCTION.

While not recommended, in the `createBot` function, we do allow for a value: `defaultDesiredPropertiesValue`. This, if set to true will set every desired property to true by default, you can still disable some if you need. The reason why this is not recommended and marked as deprecated from the documentation is because while Desired Properties DO slow you down during development (needing to make sure you aren't using something that you won't have at runtime), they have a significant performance impact based on the properties you disable on both a CPU side and memory side. Also, we are currently working on a solution to the current TypeScript issues (see box below) and that may remove the `defaultDesiredPropertiesValue` value altogether or move it to a new place.
:::

:::warning[Typescript and Desired Properties]
We are aware that TypeScript, at this time has no idea that those properties will be missing when we execute our code. We are working on fixing this issue but it is not yet ready at this time.
:::

## Additional information on Discordeno

Here are some other nice to know things about Discordeno that might interest you. Even if some may be more advanced use-cases.

### Gateway methods

You might want to edit some state like your bot status, for this you will need to use the methods in `bot.gateway`. Those methods will not give you transformed objects then they do give something back and if you want to get transformed objects you will need to call the transformers yourself (the transformers are located on `bot.transformers`).

### OAuth2

Some of the methods in `bot.helpers` will accept a `Bearer` token, or a `Client ID` and `Client Secret`. Those methods are for OAuth2 and will require you to setup the OAuth2 authorization flow with your application. An example of these methods is `bot.helpers.getCurrentUser(bearerToken)`, this is a method that can not be called with a usual Bot token and so will require the OAuth2 token.

Discordeno includes some utilities (such as `createOAuth2Link` to help create a link for the OAuth2 authorization link) and also the methods to do the exchange of the token and refresh of your exiting token.

<!-- TODO: Add a link to the page on how to use OAuth2 in Discordeno. -->

You can read more about OAuth2 in Discord on the [documentation](https://discord.com/developers/docs/topics/oauth2).

### Use individual features from Discordeno separably

While we do provide a `@discordeno/bot` package on npm with all the features, you might just need a subset of those. For this reason, Discordeno is split across multiple packages which are the following:

- `@discordeno/bot`: Groups all other packages and adds transformers and other functionalities on top.
- `@discordeno/rest`: Will only provide the methods you could use to send requests to Discord REST API, and ratelimit handling feature. This will provide the same object as [`bot.rest`](#raw-rest-methods) when you create a `RestManager`.
- `@discordeno/gateway`: Will only provide the methods you could use to establish and manage gateway connections to Discord. This will provide the same object as `bot.gateway` when you create a `GatewayManager`
- `@discordeno/utils`: Will only provide some utilities that are independent from other Discordeno features.
- `@discordeno/types`: Will only provide the Discord & Discordeno types used in all other packages.

The use-case for the separate packages may be more advanced compared to the use-cases where it makes more sense to simply use `@discordeno/bot`.

### Raw REST methods

While we recommend using `bot.helpers`, you might find yourself in a situation where avoiding the transformers and desired properties can be beneficial. For that, you can use the `bot.rest` methods, in this object, there are the same methods from `bot.helpers` but with a more raw return object. The return objects will simply be the raw response from Discord, but with the keys being camelCase instead of snake_case.
