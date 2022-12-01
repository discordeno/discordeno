[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / DiscordApplicationCommand

# Interface: DiscordApplicationCommand

[@discordeno/gateway](../modules/discordeno_gateway.md).DiscordApplicationCommand

https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-structure

## Hierarchy

- [`DiscordCreateApplicationCommand`](discordeno_gateway.DiscordCreateApplicationCommand.md)

  ↳ **`DiscordApplicationCommand`**

## Table of contents

### Properties

- [application_id](discordeno_gateway.DiscordApplicationCommand.md#application_id)
- [default_member_permissions](discordeno_gateway.DiscordApplicationCommand.md#default_member_permissions)
- [description](discordeno_gateway.DiscordApplicationCommand.md#description)
- [description_localizations](discordeno_gateway.DiscordApplicationCommand.md#description_localizations)
- [dm_permission](discordeno_gateway.DiscordApplicationCommand.md#dm_permission)
- [guild_id](discordeno_gateway.DiscordApplicationCommand.md#guild_id)
- [id](discordeno_gateway.DiscordApplicationCommand.md#id)
- [name](discordeno_gateway.DiscordApplicationCommand.md#name)
- [name_localizations](discordeno_gateway.DiscordApplicationCommand.md#name_localizations)
- [options](discordeno_gateway.DiscordApplicationCommand.md#options)
- [type](discordeno_gateway.DiscordApplicationCommand.md#type)
- [version](discordeno_gateway.DiscordApplicationCommand.md#version)

## Properties

### application_id

• **application_id**: `string`

ID of the parent application

#### Defined in

packages/types/dist/discord.d.ts:1599

---

### default_member_permissions

• `Optional` **default_member_permissions**: `null` \| `string`

Set of permissions represented as a bit set

#### Inherited from

[DiscordCreateApplicationCommand](discordeno_gateway.DiscordCreateApplicationCommand.md).[default_member_permissions](discordeno_gateway.DiscordCreateApplicationCommand.md#default_member_permissions)

#### Defined in

packages/types/dist/discord.d.ts:1623

---

### description

• **description**: `string`

Description for `ApplicationCommandTypes.ChatInput` commands, 1-100 characters. Empty string for `ApplicationCommandTypes.User` and `ApplicationCommandTypes.Message` commands

#### Inherited from

[DiscordCreateApplicationCommand](discordeno_gateway.DiscordCreateApplicationCommand.md).[description](discordeno_gateway.DiscordCreateApplicationCommand.md#description)

#### Defined in

packages/types/dist/discord.d.ts:1617

---

### description_localizations

• `Optional` **description_localizations**: `null` \| `Partial`<`Record`<[`Locales`](../enums/discordeno_gateway.Locales.md), `string`\>\>

Localization object for `description` field. Values follow the same restrictions as `description`

#### Inherited from

[DiscordCreateApplicationCommand](discordeno_gateway.DiscordCreateApplicationCommand.md).[description_localizations](discordeno_gateway.DiscordCreateApplicationCommand.md#description_localizations)

#### Defined in

packages/types/dist/discord.d.ts:1619

---

### dm_permission

• `Optional` **dm_permission**: `boolean`

Indicates whether the command is available in DMs with the app, only for globally-scoped commands. By default, commands are visible.

#### Inherited from

[DiscordCreateApplicationCommand](discordeno_gateway.DiscordCreateApplicationCommand.md).[dm_permission](discordeno_gateway.DiscordCreateApplicationCommand.md#dm_permission)

#### Defined in

packages/types/dist/discord.d.ts:1625

---

### guild_id

• `Optional` **guild_id**: `string`

Guild id of the command, if not global

#### Defined in

packages/types/dist/discord.d.ts:1601

---

### id

• **id**: `string`

Unique ID of command

#### Defined in

packages/types/dist/discord.d.ts:1597

---

### name

• **name**: `string`

Name of command, 1-32 characters.
`ApplicationCommandTypes.ChatInput` command names must match the following regex `^[-_\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}$` with the unicode flag set.
If there is a lowercase variant of any letters used, you must use those.
Characters with no lowercase variants and/or uncased letters are still allowed.
ApplicationCommandTypes.User`and`ApplicationCommandTypes.Message` commands may be mixed case and can include spaces.

#### Inherited from

[DiscordCreateApplicationCommand](discordeno_gateway.DiscordCreateApplicationCommand.md).[name](discordeno_gateway.DiscordCreateApplicationCommand.md#name)

#### Defined in

packages/types/dist/discord.d.ts:1613

---

### name_localizations

• `Optional` **name_localizations**: `null` \| `Partial`<`Record`<[`Locales`](../enums/discordeno_gateway.Locales.md), `string`\>\>

Localization object for `name` field. Values follow the same restrictions as `name`

#### Inherited from

[DiscordCreateApplicationCommand](discordeno_gateway.DiscordCreateApplicationCommand.md).[name_localizations](discordeno_gateway.DiscordCreateApplicationCommand.md#name_localizations)

#### Defined in

packages/types/dist/discord.d.ts:1615

---

### options

• `Optional` **options**: [`DiscordApplicationCommandOption`](discordeno_gateway.DiscordApplicationCommandOption.md)[]

Parameters for the command, max of 25

#### Inherited from

[DiscordCreateApplicationCommand](discordeno_gateway.DiscordCreateApplicationCommand.md).[options](discordeno_gateway.DiscordCreateApplicationCommand.md#options)

#### Defined in

packages/types/dist/discord.d.ts:1621

---

### type

• `Optional` **type**: [`ApplicationCommandTypes`](../enums/discordeno_gateway.ApplicationCommandTypes.md)

Type of command, defaults to `ApplicationCommandTypes.ChatInput`

#### Inherited from

[DiscordCreateApplicationCommand](discordeno_gateway.DiscordCreateApplicationCommand.md).[type](discordeno_gateway.DiscordCreateApplicationCommand.md#type)

#### Defined in

packages/types/dist/discord.d.ts:1605

---

### version

• `Optional` **version**: `string`

Auto incrementing version identifier updated during substantial record changes

#### Inherited from

[DiscordCreateApplicationCommand](discordeno_gateway.DiscordCreateApplicationCommand.md).[version](discordeno_gateway.DiscordCreateApplicationCommand.md#version)

#### Defined in

packages/types/dist/discord.d.ts:1627
