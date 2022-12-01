[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / DiscordInteractionDataOption

# Interface: DiscordInteractionDataOption

[@discordeno/bot](../modules/discordeno_bot.md).DiscordInteractionDataOption

## Table of contents

### Properties

- [focused](discordeno_bot.DiscordInteractionDataOption.md#focused)
- [name](discordeno_bot.DiscordInteractionDataOption.md#name)
- [options](discordeno_bot.DiscordInteractionDataOption.md#options)
- [type](discordeno_bot.DiscordInteractionDataOption.md#type)
- [value](discordeno_bot.DiscordInteractionDataOption.md#value)

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

• `Optional` **options**: [`DiscordInteractionDataOption`](discordeno_bot.DiscordInteractionDataOption.md)[]

Present if this option is a group or subcommand

#### Defined in

packages/types/dist/discord.d.ts:1229

---

### type

• **type**: [`ApplicationCommandOptionTypes`](../enums/discordeno_bot.ApplicationCommandOptionTypes.md)

Value of application command option type

#### Defined in

packages/types/dist/discord.d.ts:1225

---

### value

• `Optional` **value**: `string` \| `number` \| `boolean` \| [`DiscordChannel`](discordeno_bot.DiscordChannel.md) \| [`DiscordMember`](discordeno_bot.DiscordMember.md) \| [`DiscordRole`](discordeno_bot.DiscordRole.md)

Value of the option resulting from user input

#### Defined in

packages/types/dist/discord.d.ts:1227
