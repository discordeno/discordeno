[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordSelectMenuComponent

# Interface: DiscordSelectMenuComponent

[@discordeno/types](../modules/discordeno_types.md).DiscordSelectMenuComponent

## Table of contents

### Properties

- [custom_id](discordeno_types.DiscordSelectMenuComponent.md#custom_id)
- [max_values](discordeno_types.DiscordSelectMenuComponent.md#max_values)
- [min_values](discordeno_types.DiscordSelectMenuComponent.md#min_values)
- [options](discordeno_types.DiscordSelectMenuComponent.md#options)
- [placeholder](discordeno_types.DiscordSelectMenuComponent.md#placeholder)
- [type](discordeno_types.DiscordSelectMenuComponent.md#type)

## Properties

### custom_id

• **custom_id**: `string`

A custom identifier for this component. Maximum 100 characters.

#### Defined in

[packages/types/src/discord.ts:1192](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1192)

---

### max_values

• `Optional` **max_values**: `number`

The maximum number of items that can be selected. Default 1. Between 1-25.

#### Defined in

[packages/types/src/discord.ts:1198](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1198)

---

### min_values

• `Optional` **min_values**: `number`

The minimum number of items that must be selected. Default 1. Between 1-25.

#### Defined in

[packages/types/src/discord.ts:1196](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1196)

---

### options

• **options**: [`DiscordSelectOption`](discordeno_types.DiscordSelectOption.md)[]

The choices! Maximum of 25 items.

#### Defined in

[packages/types/src/discord.ts:1200](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1200)

---

### placeholder

• `Optional` **placeholder**: `string`

A custom placeholder text if nothing is selected. Maximum 150 characters.

#### Defined in

[packages/types/src/discord.ts:1194](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1194)

---

### type

• **type**: [`SelectMenu`](../enums/discordeno_types.MessageComponentTypes.md#selectmenu)

#### Defined in

[packages/types/src/discord.ts:1190](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1190)
