[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / DiscordGuildApplicationCommandPermissions

# Interface: DiscordGuildApplicationCommandPermissions

[@discordeno/bot](../modules/discordeno_bot.md).DiscordGuildApplicationCommandPermissions

https://discord.com/developers/docs/interactions/slash-commands#guildapplicationcommandpermissions

## Table of contents

### Properties

- [application_id](discordeno_bot.DiscordGuildApplicationCommandPermissions.md#application_id)
- [guild_id](discordeno_bot.DiscordGuildApplicationCommandPermissions.md#guild_id)
- [id](discordeno_bot.DiscordGuildApplicationCommandPermissions.md#id)
- [permissions](discordeno_bot.DiscordGuildApplicationCommandPermissions.md#permissions)

## Properties

### application_id

• **application_id**: `string`

ID of the application the command belongs to

#### Defined in

packages/types/dist/discord.d.ts:1684

---

### guild_id

• **guild_id**: `string`

ID of the guild

#### Defined in

packages/types/dist/discord.d.ts:1686

---

### id

• **id**: `string`

ID of the command or the application ID. When the `id` field is the application ID instead of a command ID, the permissions apply to all commands that do not contain explicit overwrites.

#### Defined in

packages/types/dist/discord.d.ts:1682

---

### permissions

• **permissions**: [`DiscordApplicationCommandPermissions`](discordeno_bot.DiscordApplicationCommandPermissions.md)[]

Permissions for the command in the guild, max of 100

#### Defined in

packages/types/dist/discord.d.ts:1688
