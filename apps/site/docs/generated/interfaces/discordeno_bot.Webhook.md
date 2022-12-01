[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / Webhook

# Interface: Webhook

[@discordeno/bot](../modules/discordeno_bot.md).Webhook

## Hierarchy

- `ReturnType`<typeof `transformWebhook`\>

  ↳ **`Webhook`**

## Table of contents

### Properties

- [applicationId](discordeno_bot.Webhook.md#applicationid)
- [avatar](discordeno_bot.Webhook.md#avatar)
- [channelId](discordeno_bot.Webhook.md#channelid)
- [guildId](discordeno_bot.Webhook.md#guildid)
- [id](discordeno_bot.Webhook.md#id)
- [name](discordeno_bot.Webhook.md#name)
- [sourceChannel](discordeno_bot.Webhook.md#sourcechannel)
- [sourceGuild](discordeno_bot.Webhook.md#sourceguild)
- [token](discordeno_bot.Webhook.md#token)
- [type](discordeno_bot.Webhook.md#type)
- [url](discordeno_bot.Webhook.md#url)
- [user](discordeno_bot.Webhook.md#user)

## Properties

### applicationId

• **applicationId**: `undefined` \| `bigint`

#### Inherited from

ReturnType.applicationId

---

### avatar

• **avatar**: `undefined` \| `bigint`

#### Inherited from

ReturnType.avatar

---

### channelId

• **channelId**: `undefined` \| `bigint`

#### Inherited from

ReturnType.channelId

---

### guildId

• **guildId**: `undefined` \| `bigint`

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

### sourceChannel

• **sourceChannel**: `undefined` \| { `id`: `bigint` ; `name`: `string` }

#### Inherited from

ReturnType.sourceChannel

---

### sourceGuild

• **sourceGuild**: `undefined` \| { `icon`: `undefined` \| `bigint` ; `id`: `bigint` ; `name`: `string` }

#### Inherited from

ReturnType.sourceGuild

---

### token

• **token**: `undefined` \| `string`

#### Inherited from

ReturnType.token

---

### type

• **type**: [`WebhookTypes`](../enums/discordeno_bot.WebhookTypes.md)

#### Inherited from

ReturnType.type

---

### url

• **url**: `undefined` \| `string`

#### Inherited from

ReturnType.url

---

### user

• **user**: `undefined` \| { `avatar`: `undefined` \| `bigint` ; `discriminator`: `string` ; `email`: `undefined` \| `string` ; `flags`: `undefined` \| [`UserFlags`](../enums/discordeno_bot.UserFlags.md) ; `id`: `bigint` ; `locale`: `undefined` \| `string` ; `premiumType`: `undefined` \| [`PremiumTypes`](../enums/discordeno_bot.PremiumTypes.md) ; `publicFlags`: `undefined` \| [`UserFlags`](../enums/discordeno_bot.UserFlags.md) ; `toggles`: [`UserToggles`](../classes/discordeno_bot.UserToggles.md) ; `username`: `string` }

#### Inherited from

ReturnType.user
