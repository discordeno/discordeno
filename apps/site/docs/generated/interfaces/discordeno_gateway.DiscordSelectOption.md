[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / DiscordSelectOption

# Interface: DiscordSelectOption

[@discordeno/gateway](../modules/discordeno_gateway.md).DiscordSelectOption

## Table of contents

### Properties

- [default](discordeno_gateway.DiscordSelectOption.md#default)
- [description](discordeno_gateway.DiscordSelectOption.md#description)
- [emoji](discordeno_gateway.DiscordSelectOption.md#emoji)
- [label](discordeno_gateway.DiscordSelectOption.md#label)
- [value](discordeno_gateway.DiscordSelectOption.md#value)

## Properties

### default

• `Optional` **default**: `boolean`

Will render this option as already-selected by default.

#### Defined in

packages/types/dist/discord.d.ts:1076

---

### description

• `Optional` **description**: `string`

An additional description of the option. Maximum 50 characters.

#### Defined in

packages/types/dist/discord.d.ts:1065

---

### emoji

• `Optional` **emoji**: `Object`

The id, name, and animated properties of an emoji.

#### Type declaration

| Name        | Type      | Description                    |
| :---------- | :-------- | :----------------------------- |
| `animated?` | `boolean` | Whether this emoji is animated |
| `id?`       | `string`  | Emoji id                       |
| `name?`     | `string`  | Emoji name                     |

#### Defined in

packages/types/dist/discord.d.ts:1067

---

### label

• **label**: `string`

The user-facing name of the option. Maximum 25 characters.

#### Defined in

packages/types/dist/discord.d.ts:1061

---

### value

• **value**: `string`

The dev-defined value of the option. Maximum 100 characters.

#### Defined in

packages/types/dist/discord.d.ts:1063
