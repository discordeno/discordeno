[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / DiscordApplicationCommandPermissions

# Interface: DiscordApplicationCommandPermissions

[@discordeno/bot](../modules/discordeno_bot.md).DiscordApplicationCommandPermissions

https://discord.com/developers/docs/interactions/slash-commands#applicationcommandpermissions

## Table of contents

### Properties

- [id](discordeno_bot.DiscordApplicationCommandPermissions.md#id)
- [permission](discordeno_bot.DiscordApplicationCommandPermissions.md#permission)
- [type](discordeno_bot.DiscordApplicationCommandPermissions.md#type)

## Properties

### id

• **id**: `string`

ID of the role, user, or channel. It can also be a permission constant

#### Defined in

packages/types/dist/discord.d.ts:1693

---

### permission

• **permission**: `boolean`

`true` to allow, `false`, to disallow

#### Defined in

packages/types/dist/discord.d.ts:1697

---

### type

• **type**: [`ApplicationCommandPermissionTypes`](../enums/discordeno_bot.ApplicationCommandPermissionTypes.md)

ApplicationCommandPermissionTypes.Role, ApplicationCommandPermissionTypes.User, or ApplicationCommandPermissionTypes.Channel

#### Defined in

packages/types/dist/discord.d.ts:1695
