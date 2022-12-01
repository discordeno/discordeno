[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordInputTextComponent

# Interface: DiscordInputTextComponent

[@discordeno/types](../modules/discordeno_types.md).DiscordInputTextComponent

https://discord.com/developers/docs/interactions/message-components#text-inputs-text-input-structure

## Table of contents

### Properties

- [custom_id](discordeno_types.DiscordInputTextComponent.md#custom_id)
- [label](discordeno_types.DiscordInputTextComponent.md#label)
- [max_length](discordeno_types.DiscordInputTextComponent.md#max_length)
- [min_length](discordeno_types.DiscordInputTextComponent.md#min_length)
- [placeholder](discordeno_types.DiscordInputTextComponent.md#placeholder)
- [required](discordeno_types.DiscordInputTextComponent.md#required)
- [style](discordeno_types.DiscordInputTextComponent.md#style)
- [type](discordeno_types.DiscordInputTextComponent.md#type)
- [value](discordeno_types.DiscordInputTextComponent.md#value)

## Properties

### custom_id

• **custom_id**: `string`

The customId of the InputText

#### Defined in

[packages/types/src/discord.ts:1257](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1257)

---

### label

• **label**: `string`

The label of the InputText (max 45 characters)

#### Defined in

[packages/types/src/discord.ts:1259](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1259)

---

### max_length

• `Optional` **max_length**: `number`

The maximum length of the text the user has to provide

#### Defined in

[packages/types/src/discord.ts:1265](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1265)

---

### min_length

• `Optional` **min_length**: `number`

The minimum length of the text the user has to provide

#### Defined in

[packages/types/src/discord.ts:1263](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1263)

---

### placeholder

• `Optional` **placeholder**: `string`

The placeholder of the InputText

#### Defined in

[packages/types/src/discord.ts:1261](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1261)

---

### required

• `Optional` **required**: `boolean`

whether this component is required to be filled, default true

#### Defined in

[packages/types/src/discord.ts:1255](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1255)

---

### style

• **style**: [`TextStyles`](../enums/discordeno_types.TextStyles.md)

The style of the InputText

#### Defined in

[packages/types/src/discord.ts:1253](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1253)

---

### type

• **type**: [`InputText`](../enums/discordeno_types.MessageComponentTypes.md#inputtext)

InputText Component is of type 3

#### Defined in

[packages/types/src/discord.ts:1251](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1251)

---

### value

• `Optional` **value**: `string`

Pre-filled value for input text.

#### Defined in

[packages/types/src/discord.ts:1267](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1267)
