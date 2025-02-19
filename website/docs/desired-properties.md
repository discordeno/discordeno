---
sidebar_position: 4
sidebar_label: Desired Properties
---

# Desired Properties

The `desiredProperties` feature in Discordeno gives developers full control over resource utilization. This enables a highly lightweight setup, where only the essential data is processed and stored.

With `desiredProperties`, you can specify which properties to cache for each object type—such as users, members, channels, and guilds. This flexibility allows you to tailor caching to the exact needs of your bot, preserving only the data you truly require.

## Benefits
- **Memory Efficiency**: Only relevant data is stored, leading to substantial memory savings, especially for larger bots.
- **Improved Performance**: By storing minimal data, bots experience faster processing times and reduced resource usage.
- **Customizable**: Developers can enable specific properties on a per-object basis, eliminating unnecessary bloat.

## Example: The Memory Impact of Channel Topics

Consider the `channel.topic` property, which stores a text description for each channel.

While a single topic might not seem memory-intensive, this property can quickly become costly at scale:
- **Single Channel Topic**: A typical `channel.topic` can occupy hundreds of bytes.
- **Large Bot Scale**: If your bot operates across millions of servers with hundreds of millions of channels, storing every `channel.topic` would consume vast amounts of memory.

By choosing to store only the properties relevant to your bot’s functionality — like omitting `channel.topic` when it’s unnecessary — you can save gigabytes of memory.
Desired Properties is thus an essential tool for bots needing scalable and efficient caching, allowing for minimal resource usage without sacrificing performance.

:::tip
Check the [TypeScript](#typescript) section if you are using typescript
:::

## Configuring

To configure desired properties, you can use the `desiredProperties` option on the `createBot` function.

The objects inside `desiredProperties` contains all the names of the objects that have desired properties and inside them you'll find all the properties of the objects. 

:::info[Flags and toggles]
Usually flags and toggles will be stored in a BitField to save on memory, Discordeno does provide getters on the objects for these flags, however they aren't in desired properties with their individual names, instead you will find them as `toggles` and / or `flags` most of the cases.
:::

:::danger[NOT RECOMMENDED - Changing the default for Desired Properties]
You can change the default value for desired properties, using `desiredProperties: createDesiredPropertiesObject({}, true) as CompleteDesiredProperties<{}, true>` in the `createBot` function to make discordeno process all properties on all objects, however this will negate all the benefits desired properties provide.

The reason why this is not recommended is because while Desired Properties can be an annoyance at first, they have a significant performance impact on both CPU and memory usage.

Again, this is **NOT** RECOMMENDED, especially if you plan to ship your bot to production.
:::

### Computed Properties

Some properties in these object may depend on some other property, notable examples are `user.bot` and `interaction.respond`. If you do not include all the properties they depend on, you might see undefined values / unexpected bheavior when using them.

### Examples

In this example, we will configure desired properties to have `user.id`, `user.bot` and `user.username`.

```ts
const bot = createBot({
  // Your usual createBot options, such as token and intents
  desiredProperties: {
    user: {
      id: true,
      toggles: true, // Toggles includes the "bot" flag
      username: true,
    },
  },
})
```

## TypeScript

Discordeno will change the types of the supported objects to match your desired properties, for this reason, you might get an error when incorrectly typing your functions.

Alongside `desiredProperties` in the bot option that is explained above, `desiredPropertiesBehavior` is a configuration option for how should typescript threat properties that are not desired in your configuration. 

Discordeno does expose the customized type according to your desired properties in the `bot.transformers.$inferredTypes` object, inside this property you'll find all the types to be used in your functions / variables etc.

:::info
The property `bot.transformers.$inferredTypes` only exists in typescript. It will be `undefined` if tried to access at runtime, as it is not intended to provide any value at runtime, and only intended to be used alongside the `typeof` operator in typescript.
:::

### Example

```ts
const bot = createBot({
  // Your usual createBot options, such as token and intents
  desiredProperties: {
    message: {
      id: true,
      author: true,
    },
    user: {
      id: true,
      toggles: true, // Toggles includes the "bot" flag
      username: true,
    },
  },
})

bot.events.messageCreate = (message) => {
  processMessage(message)
}

function processMessage(message: typeof bot.transformers.$inferredTypes.message) {
  bot.logger.info(`Message with id ${message.id} has author @${message.author.username}, whose has id ${message.author.id} and ${message.author.bot ? 'is' : "isn't"} a bot`)

  // Do some other work with the message
}
```

For ease of use, you can also have a single file where you export all these inferred types under a single type name, for example:

```ts
import { bot } from './index.ts'

export type Guild = typeof bot.transformers.$inferredTypes.guild
export type Message = typeof bot.transformers.$inferredTypes.message

// Repeat this for all other types you'd like
```

### Configuring Desired Properties Behavior

There are 2 behaviors, `ChangeType` and `RemoveKey`. The default behavior is `RemoveKey`.

An example where the behavior is changed to `ChangeType` is:

```ts
const bot = createBot({
  // Your usual createBot options, such as token and intents
  desiredPropertiesBehavior: DesiredPropertiesBehavior.ChangeType,
  desiredProperties: {
    user: {
      id: true,
      toggles: true, // Toggles includes the "bot" flag
      username: true,
    },
  },
})
```

Following is the explanation of each behavior:

#### `RemoveKey`

All the "undesired" properties will be removed from the type of the object. This will prevent you from using them at all since they "don't exist anymore".

The caveats of this behavior are the following:
- You don't know all the properties available on the object
- If a property requires other properties to be enabled, you won't know them without searching it up (when a computed property is missing a dependency, it won't be shown)

#### `ChangeType`

All the "undesired" properties will be typed with a string that will explain why the property is disabled, this may also include the dependencies for said property if those are present.

The caveats of this behavior are the following:
- Typescript may not always error on the usage of undesired properties, as in some cases, strings can be a valid option (e.g. channel.name is always a string so typescript won't error)

### Removing TypeScript Clutter

Since we dynamically change types based on the desired properties you provide, many functions' types become cluttered. For example, the intellisense for `bot.helpers.getUser()` shows:

```js
(property) getUser: (id: BigString) => Promise<SetupDesiredProps<User, CompleteDesiredProperties<{
  message: {
      id: true;
      author: true;
  };
  user: {
    id: true;
    toggles: true;
    username: true;
  };
}>, DesiredPropertiesBehavior.RemoveKey>>
```

This will become increasingly cluttered as you add more desired properties, making it harder to read and work with. To address this issue, you can do something like:

```js
import { createBot, createDesiredPropertiesObject } from '@discordeno/bot';

const desiredProperties = createDesiredPropertiesObject({
  message: {
    id: true,
    author: true,
  },
  user: {
    id: true,
    toggles: true, // Toggles includes the "bot" flag
    username: true,
  },
})

interface BotDesiredProperties extends Required<typeof desiredProperties> {}

const bot = createBot({
  // Your usual createBot options, such as token and intents
  desiredProperties: desiredProperties as BotDesiredProperties,
});
```

Now, when you hover over `bot.helpers.getUser()`, you'll see:

```js
(property) getUser: (id: BigString) => Promise<SetupDesiredProps<User, BotDesiredProperties, DesiredPropertiesBehavior.RemoveKey>>
```

This makes it more readable and easier to work with.
