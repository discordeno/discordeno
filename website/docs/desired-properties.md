---
sidebar_position: 4
sidebar_label: Desired Properties
---

# Desired Properties

As already explained in the Getting started desired properties are a way to save on performance by not transforming value you don't use.

There are a couple of ways to configure and work with desired properties, you can chose the one is more appropriate for your bot.

:::tip
See the [TypeScript](#typescript) section if you are using TypeScript as that requires a bit more work
:::


## Configuring desired properties

There are 2 ways to configure desired proprieties. These are:
- Using `desiredProperties` on the `createBot` function
- Using `desiredProprieties` object on `bot.transformers`

The recommended way is to use `desiredProperties` on `createBot`.

Both objects are structured the same way: the objects contains all the names of the objects that have desired proprieties and in them you will find all the properties of the objects. 

:::info[Flags and toggles]
Usually flags and toggles will be stored in a BitField to save on memory, Discordeno does provide getters on the objects for these flags however they aren't in desired properties with their individual names, instead you will find them as `toggles` and / or `flags` most of the cases.
:::

:::danger[NOT RECOMMENDED - Changing the default for Desired Properties]
You can change the default value for desired properties, using `desiredProprieties: createDesiredPropertiesObject({}, true)` or `defaultDesiredPropertiesValue` in the `createBot` function, however this will negate all the benefits desired proprieties provide.

The reason why this is not recommended is because while Desired Properties DO slow you down during development (needing to make sure you aren't using something that you won't have at runtime), they have a significant performance impact on both CPU and memory usage.

The `defaultDesiredPropertiesValue` is considered deprecated on the `createBot` function to make it apparent that it is not recommended, changing the default of `createDesiredPropertiesObject` is still not recommended but not deprecated.

Again, this is **NOT** RECOMMENDED, especially if you plan to ship your bot to production.
:::

### Examples

In these examples we will configure desired properties to have `user.id`, `user.bot` and `user.username`.

#### `createBot({ ... })` function example

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

#### `bot.transformers.desiredProprieties` example

```ts
bot.transformers.desiredProprieties.user.id = true
// Toggles includes the "bot" flag
bot.transformers.desiredProprieties.user.toggles = true
bot.transformers.desiredProprieties.user.username = true
```

It is important to note when changing this object that we can't re-assign the entire object or else there will be a lot of errors as we require all properties to exist in this object, if you want to can get around this by using `createDesiredPropertiesObject`

```ts
bot.transformers.desiredProprieties = createDesiredPropertiesObject({
  user: {
    id: true,
    toggles: true, // Toggles includes the "bot" flag
    username: true,
  },
})
```

## TypeScript

As is Typescript will not give you any type error if you try to use a value that is not specified in your desired proprieties configuration, this is because desired proprieties are something that happen at runtime based on what you configure, for this reason we have built a CLI to get around this.

:::warning[Experimental]
The CLI is considered experimental at this time. It is subject to change in the way it works
:::

:::warning[Deno]
If you are using Deno you might not be able to use the CLI, see [limitations](#limitations)
:::

The CLI is not included in `@discordeno/bot`, you will need to install the `discordeno` npm package:

```bash
npm install discordeno # Using npm
yarn add discordeno    # Using yarn
pnpm add discordeno    # Using pnpm
bun add discordeno     # Using bun (as a package manager)
```

You can configure the CLI with a `discordeno.config.ts` that looks like this:
- Has a default export to the config
- Is a EcmaScript Module (a `.mts` can be used)

Discordeno provides a `defineConfig` function, you should use this function.

```ts
import { defineConfig } from "discordeno";

export default defineConfig({
    desiredProperties: {
      // We will use the same example configuration from before, you can change this object the same way you would the `createBot` `desiredProperties` object
      properties: {
        user: {
          id: true,
          toggles: true,
          username: true,
        },
      },
    }
});
```

:::tip
To avoid duplicating code and ensuring Runtime and Types are in sync you can import the CLI config in your bot code you can use `cliConfig.desiredProperties.properties` as `desiredProperties` in the `createBot` function
:::

Then you can run the CLI by running `discordeno generate` and if needed pass `--config <path to your config file>` if the CLI can't find it automatically.

After you do this restart the Typescript Server if you are in VSCode as it does not always pick up the change and you should start getting errors about properties that aren't enabled in your CLI config.

:::tip
Set the `discordeno generate` command as a `postinstall` / `prepare` / ... script in your package.json so every time you install the dependencies/update discordeno you don't need to re-run the CLI separately
:::

Every time you update the desired proprieties you will need to re-run the CLI to update the typings of discordeno to reflect the current state of desired proprieties

### Configuring

There are 2 mode for the CLI, `TypeAsNever` and `Remove`, by default the CLI will use `TypeAsNever`.

It can be configured by changing the `behavior` config in `defineConfig()`, for example if we want to instead remove the proprieties:
```ts
import { DesiredPropertiesBehavior, defineConfig } from "discordeno";

export default defineConfig({
    desiredProperties: {
      behavior: DesiredPropertiesBehavior.Remove,
      properties: {
        // ...
      },
    }
});
```

Following is the explanation of each mode:

#### `TypeAsNever`

All the "undesired" properties will be typed as `never` and in the JSDoc comment you will find a `@remark` section explaining that the property is not enabled, what the type for that property is and if the propriety depends on other values being presents they will be listed too to make it easy to know why something is missing.

This mode has a caveat: when working with generic functions / untyped functions / ... you may face situation where TypeScript won't give you a type error since `never` will actually be a valid type for that function

This mode is the default.

#### `Remove`

All the "undesired" properties will be removed from the type of the object. This will prevent you from using them at all since they "don't exist anymore".

This mode has a caveat: You will not know the original type and if there are any dependencies needed for a value to be available

### Limitations

There are a few limitations with the current implementation of the CLI:

- `Deno` is not always supported due to the fact that the CLI works by editing the `node_modules` folder
- When using `pnpm` you need to explicitly install `@discordeno/bot` or else the CLI will report an error as it can't find the transformer types file
- `yarn` PnP / `bun` Auto-install is not supported since they don't create a `node_modules` folder
- The Typescript Server might needs to be restarted after you run the CLI to make sure it picks up the updated types
