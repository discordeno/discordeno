---
sidebar_position: 4
sidebar_label: Desired Properties
---

# Desired Properties

The `desiredProperties` feature in Discordeno gives developers full control over memory utilization. This enables a highly lightweight setup, where only essential data is stored.

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

To configure desired proprieties you can use the `desiredProperties` option on the `createBot` function

The objects inside `desiredProperties` contains all the names of the objects that have desired proprieties and in them you will find all the properties of the objects. 

:::info[Flags and toggles]
Usually flags and toggles will be stored in a BitField to save on memory, Discordeno does provide getters on the objects for these flags however they aren't in desired properties with their individual names, instead you will find them as `toggles` and / or `flags` most of the cases.
:::

:::danger[NOT RECOMMENDED - Changing the default for Desired Properties]
You can change the default value for desired properties, using `desiredProprieties: createDesiredPropertiesObject({}, true) as CompleteDesiredProprieties<{}, true>` in the `createBot` function, however this will negate all the benefits desired proprieties provide.

The reason why this is not recommended is because while Desired Proprieties can be an annoyance at first, they have a significant performance impact on both CPU and memory usage.

Again, this is **NOT** RECOMMENDED, especially if you plan to ship your bot to production.
:::

### Computed values

Some values in these object may depend on some other value, notable examples are `user.bot` and `interaction.respond`. If you do not include all the values they depend on these require you might face undefined behavior using these values.

### Examples

In this example we will configure desired properties to have `user.id`, `user.bot` and `user.username`.

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

Discordeno will give change the types of the supported objects to match your desired proprieties, for this reason you might get an error when incorrectly typing your functions.

Along side `desiredProperties` in the bot option that is explained above, `desiredPropertiesBehavior` is a configuration option for how should typescript threat proprieties that are not desired in your configuration. 

Discordeno does expose the customized type according to your desired properties in the `bot.transformers.$inferredTypes` object, in these you will find all the types to be used in your functions / variables / ...

:::info
The value `bot.transformers.$inferredTypes` only exists for typescript. It will be `undefined` if tried to access at runtime, as it is not intended to provide any value at runtime, and it is intended to be used along side the `typeof` operator in typescript
:::

### Example

```ts
const bot = createBot({
  // Your usual createBot options, such as token and intents
  desiredProperties: {
    message: {
      id: true,
      author: true,
    }
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

### Configuring

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
- If a value requires other values to be enabled you won't know them without searching it up (when a computed value is missing a dependency it won't be shown)

#### `ChangeType`

All the "undesired" properties will be typed with a string that will explain why the property is disabled, this may also include the dependencies for said property if those are present.

The caveats of this behavior are the following:
- Typescript may not always error on the usage of undesired proprieties as in some context the string will be a valid option
