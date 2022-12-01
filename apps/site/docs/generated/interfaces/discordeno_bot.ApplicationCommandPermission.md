[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / ApplicationCommandPermission

# Interface: ApplicationCommandPermission

[@discordeno/bot](../modules/discordeno_bot.md).ApplicationCommandPermission

## Hierarchy

- `ReturnType`<typeof `transformApplicationCommandPermission`\>

  ↳ **`ApplicationCommandPermission`**

## Table of contents

### Properties

- [applicationId](discordeno_bot.ApplicationCommandPermission.md#applicationid)
- [guildId](discordeno_bot.ApplicationCommandPermission.md#guildid)
- [id](discordeno_bot.ApplicationCommandPermission.md#id)
- [permissions](discordeno_bot.ApplicationCommandPermission.md#permissions)

## Properties

### applicationId

• **applicationId**: `bigint`

#### Inherited from

ReturnType.applicationId

---

### guildId

• **guildId**: `bigint`

#### Inherited from

ReturnType.guildId

---

### id

• **id**: `bigint`

#### Inherited from

ReturnType.id

---

### permissions

• **permissions**: { `id`: `bigint` ; `permission`: `boolean` = perm.permission; `type`: [`ApplicationCommandPermissionTypes`](../enums/discordeno_bot.ApplicationCommandPermissionTypes.md) = perm.type }[]

#### Inherited from

ReturnType.permissions
