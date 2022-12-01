[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / DiscordButtonComponent

# Interface: DiscordButtonComponent

[@discordeno/bot](../modules/discordeno_bot.md).DiscordButtonComponent

https://discord.com/developers/docs/interactions/message-components#buttons-button-object

## Table of contents

### Properties

- [custom_id](discordeno_bot.DiscordButtonComponent.md#custom_id)
- [disabled](discordeno_bot.DiscordButtonComponent.md#disabled)
- [emoji](discordeno_bot.DiscordButtonComponent.md#emoji)
- [label](discordeno_bot.DiscordButtonComponent.md#label)
- [style](discordeno_bot.DiscordButtonComponent.md#style)
- [type](discordeno_bot.DiscordButtonComponent.md#type)
- [url](discordeno_bot.DiscordButtonComponent.md#url)

## Properties

### custom_id

• `Optional` **custom_id**: `string`

a dev-defined unique string sent on click (max 100 characters). type 5 Link buttons can not have a custom_id

#### Defined in

packages/types/dist/discord.d.ts:1085

---

### disabled

• `Optional` **disabled**: `boolean`

Whether or not this button is disabled

#### Defined in

packages/types/dist/discord.d.ts:1100

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

packages/types/dist/discord.d.ts:1089

---

### label

• **label**: `string`

for what the button says (max 80 characters)

#### Defined in

packages/types/dist/discord.d.ts:1083

---

### style

• **style**: [`ButtonStyles`](../enums/discordeno_bot.ButtonStyles.md)

For different styles/colors of the buttons

#### Defined in

packages/types/dist/discord.d.ts:1087

---

### type

• **type**: [`Button`](../enums/discordeno_bot.MessageComponentTypes.md#button)

All button components have type 2

#### Defined in

packages/types/dist/discord.d.ts:1081

---

### url

• `Optional` **url**: `string`

optional url for link-style buttons that can navigate a user to the web. Only type 5 Link buttons can have a url

#### Defined in

packages/types/dist/discord.d.ts:1098
