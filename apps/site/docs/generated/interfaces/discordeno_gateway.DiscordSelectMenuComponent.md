[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / DiscordSelectMenuComponent

# Interface: DiscordSelectMenuComponent

[@discordeno/gateway](../modules/discordeno_gateway.md).DiscordSelectMenuComponent

## Table of contents

### Properties

- [custom_id](discordeno_gateway.DiscordSelectMenuComponent.md#custom_id)
- [max_values](discordeno_gateway.DiscordSelectMenuComponent.md#max_values)
- [min_values](discordeno_gateway.DiscordSelectMenuComponent.md#min_values)
- [options](discordeno_gateway.DiscordSelectMenuComponent.md#options)
- [placeholder](discordeno_gateway.DiscordSelectMenuComponent.md#placeholder)
- [type](discordeno_gateway.DiscordSelectMenuComponent.md#type)

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

• **options**: [`DiscordSelectOption`](discordeno_gateway.DiscordSelectOption.md)[]

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

• **type**: [`SelectMenu`](../enums/discordeno_gateway.MessageComponentTypes.md#selectmenu)

#### Defined in

packages/types/dist/discord.d.ts:1047
