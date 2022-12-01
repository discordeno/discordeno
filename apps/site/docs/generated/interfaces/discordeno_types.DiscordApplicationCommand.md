[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordApplicationCommand

# Interface: DiscordApplicationCommand

[@discordeno/types](../modules/discordeno_types.md).DiscordApplicationCommand

https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-structure

## Hierarchy

- [`DiscordCreateApplicationCommand`](discordeno_types.DiscordCreateApplicationCommand.md)

  ↳ **`DiscordApplicationCommand`**

## Table of contents

### Properties

- [application_id](discordeno_types.DiscordApplicationCommand.md#application_id)
- [default_member_permissions](discordeno_types.DiscordApplicationCommand.md#default_member_permissions)
- [description](discordeno_types.DiscordApplicationCommand.md#description)
- [description_localizations](discordeno_types.DiscordApplicationCommand.md#description_localizations)
- [dm_permission](discordeno_types.DiscordApplicationCommand.md#dm_permission)
- [guild_id](discordeno_types.DiscordApplicationCommand.md#guild_id)
- [id](discordeno_types.DiscordApplicationCommand.md#id)
- [name](discordeno_types.DiscordApplicationCommand.md#name)
- [name_localizations](discordeno_types.DiscordApplicationCommand.md#name_localizations)
- [options](discordeno_types.DiscordApplicationCommand.md#options)
- [type](discordeno_types.DiscordApplicationCommand.md#type)
- [version](discordeno_types.DiscordApplicationCommand.md#version)

## Properties

### application_id

• **application_id**: `string`

ID of the parent application

#### Defined in

[packages/types/src/discord.ts:1845](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1845)

---

### default_member_permissions

• `Optional` **default_member_permissions**: `null` \| `string`

Set of permissions represented as a bit set

#### Inherited from

[DiscordCreateApplicationCommand](discordeno_types.DiscordCreateApplicationCommand.md).[default_member_permissions](discordeno_types.DiscordCreateApplicationCommand.md#default_member_permissions)

#### Defined in

[packages/types/src/discord.ts:1870](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1870)

---

### description

• **description**: `string`

Description for `ApplicationCommandTypes.ChatInput` commands, 1-100 characters. Empty string for `ApplicationCommandTypes.User` and `ApplicationCommandTypes.Message` commands

#### Inherited from

[DiscordCreateApplicationCommand](discordeno_types.DiscordCreateApplicationCommand.md).[description](discordeno_types.DiscordCreateApplicationCommand.md#description)

#### Defined in

[packages/types/src/discord.ts:1864](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1864)

---

### description_localizations

• `Optional` **description_localizations**: `null` \| `Partial`<`Record`<[`Locales`](../enums/discordeno_types.Locales.md), `string`\>\>

Localization object for `description` field. Values follow the same restrictions as `description`

#### Inherited from

[DiscordCreateApplicationCommand](discordeno_types.DiscordCreateApplicationCommand.md).[description_localizations](discordeno_types.DiscordCreateApplicationCommand.md#description_localizations)

#### Defined in

[packages/types/src/discord.ts:1866](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1866)

---

### dm_permission

• `Optional` **dm_permission**: `boolean`

Indicates whether the command is available in DMs with the app, only for globally-scoped commands. By default, commands are visible.

#### Inherited from

[DiscordCreateApplicationCommand](discordeno_types.DiscordCreateApplicationCommand.md).[dm_permission](discordeno_types.DiscordCreateApplicationCommand.md#dm_permission)

#### Defined in

[packages/types/src/discord.ts:1872](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1872)

---

### guild_id

• `Optional` **guild_id**: `string`

Guild id of the command, if not global

#### Defined in

[packages/types/src/discord.ts:1847](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1847)

---

### id

• **id**: `string`

Unique ID of command

#### Defined in

[packages/types/src/discord.ts:1843](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1843)

---

### name

• **name**: `string`

Name of command, 1-32 characters.
`ApplicationCommandTypes.ChatInput` command names must match the following regex `^[-_\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}$` with the unicode flag set.
If there is a lowercase variant of any letters used, you must use those.
Characters with no lowercase variants and/or uncased letters are still allowed.
ApplicationCommandTypes.User`and`ApplicationCommandTypes.Message` commands may be mixed case and can include spaces.

#### Inherited from

[DiscordCreateApplicationCommand](discordeno_types.DiscordCreateApplicationCommand.md).[name](discordeno_types.DiscordCreateApplicationCommand.md#name)

#### Defined in

[packages/types/src/discord.ts:1860](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1860)

---

### name_localizations

• `Optional` **name_localizations**: `null` \| `Partial`<`Record`<[`Locales`](../enums/discordeno_types.Locales.md), `string`\>\>

Localization object for `name` field. Values follow the same restrictions as `name`

#### Inherited from

[DiscordCreateApplicationCommand](discordeno_types.DiscordCreateApplicationCommand.md).[name_localizations](discordeno_types.DiscordCreateApplicationCommand.md#name_localizations)

#### Defined in

[packages/types/src/discord.ts:1862](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1862)

---

### options

• `Optional` **options**: [`DiscordApplicationCommandOption`](discordeno_types.DiscordApplicationCommandOption.md)[]

Parameters for the command, max of 25

#### Inherited from

[DiscordCreateApplicationCommand](discordeno_types.DiscordCreateApplicationCommand.md).[options](discordeno_types.DiscordCreateApplicationCommand.md#options)

#### Defined in

[packages/types/src/discord.ts:1868](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1868)

---

### type

• `Optional` **type**: [`ApplicationCommandTypes`](../enums/discordeno_types.ApplicationCommandTypes.md)

Type of command, defaults to `ApplicationCommandTypes.ChatInput`

#### Inherited from

[DiscordCreateApplicationCommand](discordeno_types.DiscordCreateApplicationCommand.md).[type](discordeno_types.DiscordCreateApplicationCommand.md#type)

#### Defined in

[packages/types/src/discord.ts:1852](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1852)

---

### version

• `Optional` **version**: `string`

Auto incrementing version identifier updated during substantial record changes

#### Inherited from

[DiscordCreateApplicationCommand](discordeno_types.DiscordCreateApplicationCommand.md).[version](discordeno_types.DiscordCreateApplicationCommand.md#version)

#### Defined in

[packages/types/src/discord.ts:1874](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1874)
