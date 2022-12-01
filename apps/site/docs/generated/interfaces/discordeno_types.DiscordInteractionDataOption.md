[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordInteractionDataOption

# Interface: DiscordInteractionDataOption

[@discordeno/types](../modules/discordeno_types.md).DiscordInteractionDataOption

## Table of contents

### Properties

- [focused](discordeno_types.DiscordInteractionDataOption.md#focused)
- [name](discordeno_types.DiscordInteractionDataOption.md#name)
- [options](discordeno_types.DiscordInteractionDataOption.md#options)
- [type](discordeno_types.DiscordInteractionDataOption.md#type)
- [value](discordeno_types.DiscordInteractionDataOption.md#value)

## Properties

### focused

• `Optional` **focused**: `boolean`

`true` if this option is the currently focused option for autocomplete

#### Defined in

[packages/types/src/discord.ts:1383](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1383)

---

### name

• **name**: `string`

Name of the parameter

#### Defined in

[packages/types/src/discord.ts:1375](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1375)

---

### options

• `Optional` **options**: [`DiscordInteractionDataOption`](discordeno_types.DiscordInteractionDataOption.md)[]

Present if this option is a group or subcommand

#### Defined in

[packages/types/src/discord.ts:1381](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1381)

---

### type

• **type**: [`ApplicationCommandOptionTypes`](../enums/discordeno_types.ApplicationCommandOptionTypes.md)

Value of application command option type

#### Defined in

[packages/types/src/discord.ts:1377](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1377)

---

### value

• `Optional` **value**: `string` \| `number` \| `boolean` \| [`DiscordMember`](discordeno_types.DiscordMember.md) \| [`DiscordChannel`](discordeno_types.DiscordChannel.md) \| [`DiscordRole`](discordeno_types.DiscordRole.md)

Value of the option resulting from user input

#### Defined in

[packages/types/src/discord.ts:1379](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1379)
