[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / DiscordInteractionDataOption

# Interface: DiscordInteractionDataOption

[@discordeno/gateway](../modules/discordeno_gateway.md).DiscordInteractionDataOption

## Table of contents

### Properties

- [focused](discordeno_gateway.DiscordInteractionDataOption.md#focused)
- [name](discordeno_gateway.DiscordInteractionDataOption.md#name)
- [options](discordeno_gateway.DiscordInteractionDataOption.md#options)
- [type](discordeno_gateway.DiscordInteractionDataOption.md#type)
- [value](discordeno_gateway.DiscordInteractionDataOption.md#value)

## Properties

### focused

• `Optional` **focused**: `boolean`

`true` if this option is the currently focused option for autocomplete

#### Defined in

packages/types/dist/discord.d.ts:1231

---

### name

• **name**: `string`

Name of the parameter

#### Defined in

packages/types/dist/discord.d.ts:1223

---

### options

• `Optional` **options**: [`DiscordInteractionDataOption`](discordeno_gateway.DiscordInteractionDataOption.md)[]

Present if this option is a group or subcommand

#### Defined in

packages/types/dist/discord.d.ts:1229

---

### type

• **type**: [`ApplicationCommandOptionTypes`](../enums/discordeno_gateway.ApplicationCommandOptionTypes.md)

Value of application command option type

#### Defined in

packages/types/dist/discord.d.ts:1225

---

### value

• `Optional` **value**: `string` \| `number` \| `boolean` \| [`DiscordMember`](discordeno_gateway.DiscordMember.md) \| [`DiscordChannel`](discordeno_gateway.DiscordChannel.md) \| [`DiscordRole`](discordeno_gateway.DiscordRole.md)

Value of the option resulting from user input

#### Defined in

packages/types/dist/discord.d.ts:1227
