[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / DiscordSelectMenuComponent

# Interface: DiscordSelectMenuComponent

[@discordeno/bot](../modules/discordeno_bot.md).DiscordSelectMenuComponent

## Table of contents

### Properties

- [custom_id](discordeno_bot.DiscordSelectMenuComponent.md#custom_id)
- [max_values](discordeno_bot.DiscordSelectMenuComponent.md#max_values)
- [min_values](discordeno_bot.DiscordSelectMenuComponent.md#min_values)
- [options](discordeno_bot.DiscordSelectMenuComponent.md#options)
- [placeholder](discordeno_bot.DiscordSelectMenuComponent.md#placeholder)
- [type](discordeno_bot.DiscordSelectMenuComponent.md#type)

## Properties

### custom_id

• **custom_id**: `string`

A custom identifier for this component. Maximum 100 characters.

#### Defined in

packages/types/dist/discord.d.ts:1049

---

### max_values

• `Optional` **max_values**: `number`

The maximum number of items that can be selected. Default 1. Between 1-25.

#### Defined in

packages/types/dist/discord.d.ts:1055

---

### min_values

• `Optional` **min_values**: `number`

The minimum number of items that must be selected. Default 1. Between 1-25.

#### Defined in

packages/types/dist/discord.d.ts:1053

---

### options

• **options**: [`DiscordSelectOption`](discordeno_bot.DiscordSelectOption.md)[]

The choices! Maximum of 25 items.

#### Defined in

packages/types/dist/discord.d.ts:1057

---

### placeholder

• `Optional` **placeholder**: `string`

A custom placeholder text if nothing is selected. Maximum 150 characters.

#### Defined in

packages/types/dist/discord.d.ts:1051

---

### type

• **type**: [`SelectMenu`](../enums/discordeno_bot.MessageComponentTypes.md#selectmenu)

#### Defined in

packages/types/dist/discord.d.ts:1047
