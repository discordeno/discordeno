[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordApplicationCommandPermissions

# Interface: DiscordApplicationCommandPermissions

[@discordeno/types](../modules/discordeno_types.md).DiscordApplicationCommandPermissions

https://discord.com/developers/docs/interactions/slash-commands#applicationcommandpermissions

## Table of contents

### Properties

- [id](discordeno_types.DiscordApplicationCommandPermissions.md#id)
- [permission](discordeno_types.DiscordApplicationCommandPermissions.md#permission)
- [type](discordeno_types.DiscordApplicationCommandPermissions.md#type)

## Properties

### id

• **id**: `string`

ID of the role, user, or channel. It can also be a permission constant

#### Defined in

[packages/types/src/discord.ts:1944](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1944)

---

### permission

• **permission**: `boolean`

`true` to allow, `false`, to disallow

#### Defined in

[packages/types/src/discord.ts:1948](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1948)

---

### type

• **type**: [`ApplicationCommandPermissionTypes`](../enums/discordeno_types.ApplicationCommandPermissionTypes.md)

ApplicationCommandPermissionTypes.Role, ApplicationCommandPermissionTypes.User, or ApplicationCommandPermissionTypes.Channel

#### Defined in

[packages/types/src/discord.ts:1946](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1946)
