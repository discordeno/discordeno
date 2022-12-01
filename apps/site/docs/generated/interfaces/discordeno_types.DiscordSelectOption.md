[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordSelectOption

# Interface: DiscordSelectOption

[@discordeno/types](../modules/discordeno_types.md).DiscordSelectOption

## Table of contents

### Properties

- [default](discordeno_types.DiscordSelectOption.md#default)
- [description](discordeno_types.DiscordSelectOption.md#description)
- [emoji](discordeno_types.DiscordSelectOption.md#emoji)
- [label](discordeno_types.DiscordSelectOption.md#label)
- [value](discordeno_types.DiscordSelectOption.md#value)

## Properties

### default

• `Optional` **default**: `boolean`

Will render this option as already-selected by default.

#### Defined in

[packages/types/src/discord.ts:1220](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1220)

---

### description

• `Optional` **description**: `string`

An additional description of the option. Maximum 50 characters.

#### Defined in

[packages/types/src/discord.ts:1209](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1209)

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

[packages/types/src/discord.ts:1211](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1211)

---

### label

• **label**: `string`

The user-facing name of the option. Maximum 25 characters.

#### Defined in

[packages/types/src/discord.ts:1205](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1205)

---

### value

• **value**: `string`

The dev-defined value of the option. Maximum 100 characters.

#### Defined in

[packages/types/src/discord.ts:1207](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1207)
