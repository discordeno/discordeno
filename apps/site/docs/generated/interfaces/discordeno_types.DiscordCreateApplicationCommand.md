[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordCreateApplicationCommand

# Interface: DiscordCreateApplicationCommand

[@discordeno/types](../modules/discordeno_types.md).DiscordCreateApplicationCommand

## Hierarchy

- **`DiscordCreateApplicationCommand`**

  ↳ [`DiscordApplicationCommand`](discordeno_types.DiscordApplicationCommand.md)

## Table of contents

### Properties

- [default_member_permissions](discordeno_types.DiscordCreateApplicationCommand.md#default_member_permissions)
- [description](discordeno_types.DiscordCreateApplicationCommand.md#description)
- [description_localizations](discordeno_types.DiscordCreateApplicationCommand.md#description_localizations)
- [dm_permission](discordeno_types.DiscordCreateApplicationCommand.md#dm_permission)
- [name](discordeno_types.DiscordCreateApplicationCommand.md#name)
- [name_localizations](discordeno_types.DiscordCreateApplicationCommand.md#name_localizations)
- [options](discordeno_types.DiscordCreateApplicationCommand.md#options)
- [type](discordeno_types.DiscordCreateApplicationCommand.md#type)
- [version](discordeno_types.DiscordCreateApplicationCommand.md#version)

## Properties

### default_member_permissions

• `Optional` **default_member_permissions**: `null` \| `string`

Set of permissions represented as a bit set

#### Defined in

[packages/types/src/discord.ts:1870](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1870)

---

### description

• **description**: `string`

Description for `ApplicationCommandTypes.ChatInput` commands, 1-100 characters. Empty string for `ApplicationCommandTypes.User` and `ApplicationCommandTypes.Message` commands

#### Defined in

[packages/types/src/discord.ts:1864](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1864)

---

### description_localizations

• `Optional` **description_localizations**: `null` \| `Partial`<`Record`<[`Locales`](../enums/discordeno_types.Locales.md), `string`\>\>

Localization object for `description` field. Values follow the same restrictions as `description`

#### Defined in

[packages/types/src/discord.ts:1866](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1866)

---

### dm_permission

• `Optional` **dm_permission**: `boolean`

Indicates whether the command is available in DMs with the app, only for globally-scoped commands. By default, commands are visible.

#### Defined in

[packages/types/src/discord.ts:1872](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1872)

---

### name

• **name**: `string`

Name of command, 1-32 characters.
`ApplicationCommandTypes.ChatInput` command names must match the following regex `^[-_\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}$` with the unicode flag set.
If there is a lowercase variant of any letters used, you must use those.
Characters with no lowercase variants and/or uncased letters are still allowed.
ApplicationCommandTypes.User`and`ApplicationCommandTypes.Message` commands may be mixed case and can include spaces.

#### Defined in

[packages/types/src/discord.ts:1860](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1860)

---

### name_localizations

• `Optional` **name_localizations**: `null` \| `Partial`<`Record`<[`Locales`](../enums/discordeno_types.Locales.md), `string`\>\>

Localization object for `name` field. Values follow the same restrictions as `name`

#### Defined in

[packages/types/src/discord.ts:1862](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1862)

---

### options

• `Optional` **options**: [`DiscordApplicationCommandOption`](discordeno_types.DiscordApplicationCommandOption.md)[]

Parameters for the command, max of 25

#### Defined in

[packages/types/src/discord.ts:1868](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1868)

---

### type

• `Optional` **type**: [`ApplicationCommandTypes`](../enums/discordeno_types.ApplicationCommandTypes.md)

Type of command, defaults to `ApplicationCommandTypes.ChatInput`

#### Defined in

[packages/types/src/discord.ts:1852](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1852)

---

### version

• `Optional` **version**: `string`

Auto incrementing version identifier updated during substantial record changes

#### Defined in

[packages/types/src/discord.ts:1874](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1874)
