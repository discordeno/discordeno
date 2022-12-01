[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / DiscordCreateApplicationCommand

# Interface: DiscordCreateApplicationCommand

[@discordeno/bot](../modules/discordeno_bot.md).DiscordCreateApplicationCommand

## Hierarchy

- **`DiscordCreateApplicationCommand`**

  ↳ [`DiscordApplicationCommand`](discordeno_bot.DiscordApplicationCommand.md)

## Table of contents

### Properties

- [default_member_permissions](discordeno_bot.DiscordCreateApplicationCommand.md#default_member_permissions)
- [description](discordeno_bot.DiscordCreateApplicationCommand.md#description)
- [description_localizations](discordeno_bot.DiscordCreateApplicationCommand.md#description_localizations)
- [dm_permission](discordeno_bot.DiscordCreateApplicationCommand.md#dm_permission)
- [name](discordeno_bot.DiscordCreateApplicationCommand.md#name)
- [name_localizations](discordeno_bot.DiscordCreateApplicationCommand.md#name_localizations)
- [options](discordeno_bot.DiscordCreateApplicationCommand.md#options)
- [type](discordeno_bot.DiscordCreateApplicationCommand.md#type)
- [version](discordeno_bot.DiscordCreateApplicationCommand.md#version)

## Properties

### default_member_permissions

• `Optional` **default_member_permissions**: `null` \| `string`

Set of permissions represented as a bit set

#### Defined in

packages/types/dist/discord.d.ts:1623

---

### description

• **description**: `string`

Description for `ApplicationCommandTypes.ChatInput` commands, 1-100 characters. Empty string for `ApplicationCommandTypes.User` and `ApplicationCommandTypes.Message` commands

#### Defined in

packages/types/dist/discord.d.ts:1617

---

### description_localizations

• `Optional` **description_localizations**: `null` \| `Partial`<`Record`<[`Locales`](../enums/discordeno_bot.Locales.md), `string`\>\>

Localization object for `description` field. Values follow the same restrictions as `description`

#### Defined in

packages/types/dist/discord.d.ts:1619

---

### dm_permission

• `Optional` **dm_permission**: `boolean`

Indicates whether the command is available in DMs with the app, only for globally-scoped commands. By default, commands are visible.

#### Defined in

packages/types/dist/discord.d.ts:1625

---

### name

• **name**: `string`

Name of command, 1-32 characters.
`ApplicationCommandTypes.ChatInput` command names must match the following regex `^[-_\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}$` with the unicode flag set.
If there is a lowercase variant of any letters used, you must use those.
Characters with no lowercase variants and/or uncased letters are still allowed.
ApplicationCommandTypes.User`and`ApplicationCommandTypes.Message` commands may be mixed case and can include spaces.

#### Defined in

packages/types/dist/discord.d.ts:1613

---

### name_localizations

• `Optional` **name_localizations**: `null` \| `Partial`<`Record`<[`Locales`](../enums/discordeno_bot.Locales.md), `string`\>\>

Localization object for `name` field. Values follow the same restrictions as `name`

#### Defined in

packages/types/dist/discord.d.ts:1615

---

### options

• `Optional` **options**: [`DiscordApplicationCommandOption`](discordeno_bot.DiscordApplicationCommandOption.md)[]

Parameters for the command, max of 25

#### Defined in

packages/types/dist/discord.d.ts:1621

---

### type

• `Optional` **type**: [`ApplicationCommandTypes`](../enums/discordeno_bot.ApplicationCommandTypes.md)

Type of command, defaults to `ApplicationCommandTypes.ChatInput`

#### Defined in

packages/types/dist/discord.d.ts:1605

---

### version

• `Optional` **version**: `string`

Auto incrementing version identifier updated during substantial record changes

#### Defined in

packages/types/dist/discord.d.ts:1627
