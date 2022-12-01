[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordGuildApplicationCommandPermissions

# Interface: DiscordGuildApplicationCommandPermissions

[@discordeno/types](../modules/discordeno_types.md).DiscordGuildApplicationCommandPermissions

https://discord.com/developers/docs/interactions/slash-commands#guildapplicationcommandpermissions

## Table of contents

### Properties

- [application_id](discordeno_types.DiscordGuildApplicationCommandPermissions.md#application_id)
- [guild_id](discordeno_types.DiscordGuildApplicationCommandPermissions.md#guild_id)
- [id](discordeno_types.DiscordGuildApplicationCommandPermissions.md#id)
- [permissions](discordeno_types.DiscordGuildApplicationCommandPermissions.md#permissions)

## Properties

### application_id

• **application_id**: `string`

ID of the application the command belongs to

#### Defined in

[packages/types/src/discord.ts:1934](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1934)

---

### guild_id

• **guild_id**: `string`

ID of the guild

#### Defined in

[packages/types/src/discord.ts:1936](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1936)

---

### id

• **id**: `string`

ID of the command or the application ID. When the `id` field is the application ID instead of a command ID, the permissions apply to all commands that do not contain explicit overwrites.

#### Defined in

[packages/types/src/discord.ts:1932](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1932)

---

### permissions

• **permissions**: [`DiscordApplicationCommandPermissions`](discordeno_types.DiscordApplicationCommandPermissions.md)[]

Permissions for the command in the guild, max of 100

#### Defined in

[packages/types/src/discord.ts:1938](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1938)
