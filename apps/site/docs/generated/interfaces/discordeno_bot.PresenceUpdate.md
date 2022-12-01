[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / PresenceUpdate

# Interface: PresenceUpdate

[@discordeno/bot](../modules/discordeno_bot.md).PresenceUpdate

## Hierarchy

- `ReturnType`<typeof [`transformPresence`](../modules/discordeno_bot.md#transformpresence)\>

  ↳ **`PresenceUpdate`**

## Table of contents

### Properties

- [activities](discordeno_bot.PresenceUpdate.md#activities)
- [desktop](discordeno_bot.PresenceUpdate.md#desktop)
- [guildId](discordeno_bot.PresenceUpdate.md#guildid)
- [mobile](discordeno_bot.PresenceUpdate.md#mobile)
- [status](discordeno_bot.PresenceUpdate.md#status)
- [user](discordeno_bot.PresenceUpdate.md#user)
- [web](discordeno_bot.PresenceUpdate.md#web)

## Properties

### activities

• **activities**: [`Activity`](discordeno_bot.Activity.md)[]

#### Inherited from

ReturnType.activities

---

### desktop

• **desktop**: `undefined` \| `string`

#### Inherited from

ReturnType.desktop

---

### guildId

• **guildId**: `bigint`

#### Inherited from

ReturnType.guildId

---

### mobile

• **mobile**: `undefined` \| `string`

#### Inherited from

ReturnType.mobile

---

### status

• **status**: [`PresenceStatus`](../enums/discordeno_bot.PresenceStatus.md)

#### Inherited from

ReturnType.status

---

### user

• **user**: `Object`

#### Type declaration

| Name            | Type                                                                     |
| :-------------- | :----------------------------------------------------------------------- |
| `avatar`        | `undefined` \| `bigint`                                                  |
| `discriminator` | `string`                                                                 |
| `email`         | `undefined` \| `string`                                                  |
| `flags`         | `undefined` \| [`UserFlags`](../enums/discordeno_bot.UserFlags.md)       |
| `id`            | `bigint`                                                                 |
| `locale`        | `undefined` \| `string`                                                  |
| `premiumType`   | `undefined` \| [`PremiumTypes`](../enums/discordeno_bot.PremiumTypes.md) |
| `publicFlags`   | `undefined` \| [`UserFlags`](../enums/discordeno_bot.UserFlags.md)       |
| `toggles`       | [`UserToggles`](../classes/discordeno_bot.UserToggles.md)                |
| `username`      | `string`                                                                 |

#### Inherited from

ReturnType.user

---

### web

• **web**: `undefined` \| `string`

#### Inherited from

ReturnType.web
