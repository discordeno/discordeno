[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / DiscordGuildApplicationCommandPermissions

# Interface: DiscordGuildApplicationCommandPermissions

[@discordeno/gateway](../modules/discordeno_gateway.md).DiscordGuildApplicationCommandPermissions

https://discord.com/developers/docs/interactions/slash-commands#guildapplicationcommandpermissions

## Table of contents

### Properties

- [application_id](discordeno_gateway.DiscordGuildApplicationCommandPermissions.md#application_id)
- [guild_id](discordeno_gateway.DiscordGuildApplicationCommandPermissions.md#guild_id)
- [id](discordeno_gateway.DiscordGuildApplicationCommandPermissions.md#id)
- [permissions](discordeno_gateway.DiscordGuildApplicationCommandPermissions.md#permissions)

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

• **permissions**: [`DiscordApplicationCommandPermissions`](discordeno_gateway.DiscordApplicationCommandPermissions.md)[]

Permissions for the command in the guild, max of 100

#### Defined in

packages/types/dist/discord.d.ts:1688
