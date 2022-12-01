[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordButtonComponent

# Interface: DiscordButtonComponent

[@discordeno/types](../modules/discordeno_types.md).DiscordButtonComponent

https://discord.com/developers/docs/interactions/message-components#buttons-button-object

## Table of contents

### Properties

- [custom_id](discordeno_types.DiscordButtonComponent.md#custom_id)
- [disabled](discordeno_types.DiscordButtonComponent.md#disabled)
- [emoji](discordeno_types.DiscordButtonComponent.md#emoji)
- [label](discordeno_types.DiscordButtonComponent.md#label)
- [style](discordeno_types.DiscordButtonComponent.md#style)
- [type](discordeno_types.DiscordButtonComponent.md#type)
- [url](discordeno_types.DiscordButtonComponent.md#url)

## Properties

### custom_id

• `Optional` **custom_id**: `string`

a dev-defined unique string sent on click (max 100 characters). type 5 Link buttons can not have a custom_id

#### Defined in

[packages/types/src/discord.ts:1230](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1230)

---

### disabled

• `Optional` **disabled**: `boolean`

Whether or not this button is disabled

#### Defined in

[packages/types/src/discord.ts:1245](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1245)

---

### emoji

• `Optional` **emoji**: `Object`

Emoji object that includes fields of name, id, and animated supporting unicode and custom emojis.

#### Type declaration

| Name        | Type      | Description                    |
| :---------- | :-------- | :----------------------------- |
| `animated?` | `boolean` | Whether this emoji is animated |
| `id?`       | `string`  | Emoji id                       |
| `name?`     | `string`  | Emoji name                     |

#### Defined in

[packages/types/src/discord.ts:1234](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1234)

---

### label

• **label**: `string`

for what the button says (max 80 characters)

#### Defined in

[packages/types/src/discord.ts:1228](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1228)

---

### style

• **style**: [`ButtonStyles`](../enums/discordeno_types.ButtonStyles.md)

For different styles/colors of the buttons

#### Defined in

[packages/types/src/discord.ts:1232](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1232)

---

### type

• **type**: [`Button`](../enums/discordeno_types.MessageComponentTypes.md#button)

All button components have type 2

#### Defined in

[packages/types/src/discord.ts:1226](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1226)

---

### url

• `Optional` **url**: `string`

optional url for link-style buttons that can navigate a user to the web. Only type 5 Link buttons can have a url

#### Defined in

[packages/types/src/discord.ts:1243](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1243)
