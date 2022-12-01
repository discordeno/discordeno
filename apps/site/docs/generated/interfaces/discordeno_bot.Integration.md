[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / Integration

# Interface: Integration

[@discordeno/bot](../modules/discordeno_bot.md).Integration

## Hierarchy

- `ReturnType`<typeof [`transformIntegration`](../modules/discordeno_bot.md#transformintegration)\>

  ↳ **`Integration`**

## Table of contents

### Properties

- [account](discordeno_bot.Integration.md#account)
- [application](discordeno_bot.Integration.md#application)
- [enableEmoticons](discordeno_bot.Integration.md#enableemoticons)
- [enabled](discordeno_bot.Integration.md#enabled)
- [expireBehavior](discordeno_bot.Integration.md#expirebehavior)
- [expireGracePeriod](discordeno_bot.Integration.md#expiregraceperiod)
- [guildId](discordeno_bot.Integration.md#guildid)
- [id](discordeno_bot.Integration.md#id)
- [name](discordeno_bot.Integration.md#name)
- [revoked](discordeno_bot.Integration.md#revoked)
- [roleId](discordeno_bot.Integration.md#roleid)
- [scopes](discordeno_bot.Integration.md#scopes)
- [subscriberCount](discordeno_bot.Integration.md#subscribercount)
- [syncedAt](discordeno_bot.Integration.md#syncedat)
- [syncing](discordeno_bot.Integration.md#syncing)
- [type](discordeno_bot.Integration.md#type)
- [user](discordeno_bot.Integration.md#user)

## Properties

### account

• **account**: `Object`

#### Type declaration

| Name   | Type     |
| :----- | :------- |
| `id`   | `bigint` |
| `name` | `string` |

#### Inherited from

ReturnType.account

---

### application

• **application**: `undefined` \| { `bot`: `undefined` \| { flags?: UserFlags \| undefined; avatar?: bigint \| undefined; locale?: string \| undefined; email?: string \| undefined; premiumType?: PremiumTypes \| undefined; ... 4 more ...; toggles: UserToggles; } ; `description`: `string` ; `icon`: `undefined` \| `bigint` ; `id`: `bigint` ; `name`: `string` }

#### Inherited from

ReturnType.application

---

### enableEmoticons

• **enableEmoticons**: `undefined` \| `boolean`

#### Inherited from

ReturnType.enableEmoticons

---

### enabled

• **enabled**: `undefined` \| `boolean`

#### Inherited from

ReturnType.enabled

---

### expireBehavior

• **expireBehavior**: `undefined` \| [`IntegrationExpireBehaviors`](../enums/discordeno_bot.IntegrationExpireBehaviors.md)

#### Inherited from

ReturnType.expireBehavior

---

### expireGracePeriod

• **expireGracePeriod**: `undefined` \| `number`

#### Inherited from

ReturnType.expireGracePeriod

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

### name

• **name**: `string`

#### Inherited from

ReturnType.name

---

### revoked

• **revoked**: `undefined` \| `boolean`

#### Inherited from

ReturnType.revoked

---

### roleId

• **roleId**: `undefined` \| `bigint`

#### Inherited from

ReturnType.roleId

---

### scopes

• **scopes**: `string`[]

#### Inherited from

ReturnType.scopes

---

### subscriberCount

• **subscriberCount**: `undefined` \| `number`

#### Inherited from

ReturnType.subscriberCount

---

### syncedAt

• **syncedAt**: `undefined` \| `number`

#### Inherited from

ReturnType.syncedAt

---

### syncing

• **syncing**: `undefined` \| `boolean`

#### Inherited from

ReturnType.syncing

---

### type

• **type**: `"twitch"` \| `"youtube"` \| `"discord"`

#### Inherited from

ReturnType.type

---

### user

• **user**: `undefined` \| { `avatar`: `undefined` \| `bigint` ; `discriminator`: `string` ; `email`: `undefined` \| `string` ; `flags`: `undefined` \| [`UserFlags`](../enums/discordeno_bot.UserFlags.md) ; `id`: `bigint` ; `locale`: `undefined` \| `string` ; `premiumType`: `undefined` \| [`PremiumTypes`](../enums/discordeno_bot.PremiumTypes.md) ; `publicFlags`: `undefined` \| [`UserFlags`](../enums/discordeno_bot.UserFlags.md) ; `toggles`: [`UserToggles`](../classes/discordeno_bot.UserToggles.md) ; `username`: `string` }

#### Inherited from

ReturnType.user
