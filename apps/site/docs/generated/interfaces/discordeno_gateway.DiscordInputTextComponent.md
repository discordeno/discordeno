[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / DiscordInputTextComponent

# Interface: DiscordInputTextComponent

[@discordeno/gateway](../modules/discordeno_gateway.md).DiscordInputTextComponent

https://discord.com/developers/docs/interactions/message-components#text-inputs-text-input-structure

## Table of contents

### Properties

- [custom_id](discordeno_gateway.DiscordInputTextComponent.md#custom_id)
- [label](discordeno_gateway.DiscordInputTextComponent.md#label)
- [max_length](discordeno_gateway.DiscordInputTextComponent.md#max_length)
- [min_length](discordeno_gateway.DiscordInputTextComponent.md#min_length)
- [placeholder](discordeno_gateway.DiscordInputTextComponent.md#placeholder)
- [required](discordeno_gateway.DiscordInputTextComponent.md#required)
- [style](discordeno_gateway.DiscordInputTextComponent.md#style)
- [type](discordeno_gateway.DiscordInputTextComponent.md#type)
- [value](discordeno_gateway.DiscordInputTextComponent.md#value)

## Properties

### custom_id

• **custom_id**: `string`

The customId of the InputText

#### Defined in

packages/types/dist/discord.d.ts:1111

---

### label

• **label**: `string`

The label of the InputText (max 45 characters)

#### Defined in

packages/types/dist/discord.d.ts:1113

---

### max_length

• `Optional` **max_length**: `number`

The maximum length of the text the user has to provide

#### Defined in

packages/types/dist/discord.d.ts:1119

---

### min_length

• `Optional` **min_length**: `number`

The minimum length of the text the user has to provide

#### Defined in

packages/types/dist/discord.d.ts:1117

---

### placeholder

• `Optional` **placeholder**: `string`

The placeholder of the InputText

#### Defined in

packages/types/dist/discord.d.ts:1115

---

### required

• `Optional` **required**: `boolean`

whether this component is required to be filled, default true

#### Defined in

packages/types/dist/discord.d.ts:1109

---

### style

• **style**: [`TextStyles`](../enums/discordeno_gateway.TextStyles.md)

The style of the InputText

#### Defined in

packages/types/dist/discord.d.ts:1107

---

### type

• **type**: [`InputText`](../enums/discordeno_gateway.MessageComponentTypes.md#inputtext)

InputText Component is of type 3

#### Defined in

packages/types/dist/discord.d.ts:1105

---

### value

• `Optional` **value**: `string`

Pre-filled value for input text.

#### Defined in

packages/types/dist/discord.d.ts:1121
