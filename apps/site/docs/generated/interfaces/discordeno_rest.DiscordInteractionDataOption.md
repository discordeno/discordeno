[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/rest](../modules/discordeno_rest.md) / DiscordInteractionDataOption

# Interface: DiscordInteractionDataOption

[@discordeno/rest](../modules/discordeno_rest.md).DiscordInteractionDataOption

## Table of contents

### Properties

- [focused](discordeno_rest.DiscordInteractionDataOption.md#focused)
- [name](discordeno_rest.DiscordInteractionDataOption.md#name)
- [options](discordeno_rest.DiscordInteractionDataOption.md#options)
- [type](discordeno_rest.DiscordInteractionDataOption.md#type)
- [value](discordeno_rest.DiscordInteractionDataOption.md#value)

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

• `Optional` **options**: [`DiscordInteractionDataOption`](discordeno_rest.DiscordInteractionDataOption.md)[]

Present if this option is a group or subcommand

#### Defined in

packages/types/dist/discord.d.ts:1229

---

### type

• **type**: [`ApplicationCommandOptionTypes`](../enums/discordeno_rest.ApplicationCommandOptionTypes.md)

Value of application command option type

#### Defined in

packages/types/dist/discord.d.ts:1225

---

### value

• `Optional` **value**: `string` \| `number` \| `boolean` \| [`DiscordMember`](discordeno_rest.DiscordMember.md) \| [`DiscordChannel`](discordeno_rest.DiscordChannel.md) \| [`DiscordRole`](discordeno_rest.DiscordRole.md)

Value of the option resulting from user input

#### Defined in

packages/types/dist/discord.d.ts:1227
