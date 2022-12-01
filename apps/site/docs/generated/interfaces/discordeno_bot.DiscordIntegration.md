[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / DiscordIntegration

# Interface: DiscordIntegration

[@discordeno/bot](../modules/discordeno_bot.md).DiscordIntegration

https://discord.com/developers/docs/resources/guild#integration-object-integration-structure

## Hierarchy

- **`DiscordIntegration`**

  ↳ [`DiscordIntegrationCreateUpdate`](discordeno_bot.DiscordIntegrationCreateUpdate.md)

## Table of contents

### Properties

- [account](discordeno_bot.DiscordIntegration.md#account)
- [application](discordeno_bot.DiscordIntegration.md#application)
- [enable_emoticons](discordeno_bot.DiscordIntegration.md#enable_emoticons)
- [enabled](discordeno_bot.DiscordIntegration.md#enabled)
- [expire_behavior](discordeno_bot.DiscordIntegration.md#expire_behavior)
- [expire_grace_period](discordeno_bot.DiscordIntegration.md#expire_grace_period)
- [id](discordeno_bot.DiscordIntegration.md#id)
- [name](discordeno_bot.DiscordIntegration.md#name)
- [revoked](discordeno_bot.DiscordIntegration.md#revoked)
- [role_id](discordeno_bot.DiscordIntegration.md#role_id)
- [scopes](discordeno_bot.DiscordIntegration.md#scopes)
- [subscriber_count](discordeno_bot.DiscordIntegration.md#subscriber_count)
- [synced_at](discordeno_bot.DiscordIntegration.md#synced_at)
- [syncing](discordeno_bot.DiscordIntegration.md#syncing)
- [type](discordeno_bot.DiscordIntegration.md#type)
- [user](discordeno_bot.DiscordIntegration.md#user)

## Properties

### account

• **account**: [`DiscordIntegrationAccount`](discordeno_bot.DiscordIntegrationAccount.md)

Integration account information

#### Defined in

packages/types/dist/discord.d.ts:89

---

### application

• `Optional` **application**: [`DiscordIntegrationApplication`](discordeno_bot.DiscordIntegrationApplication.md)

The bot/OAuth2 application for discord integrations

#### Defined in

packages/types/dist/discord.d.ts:91

---

### enable_emoticons

• `Optional` **enable_emoticons**: `boolean`

Whether emoticons should be synced for this integration (twitch only currently)

#### Defined in

packages/types/dist/discord.d.ts:75

---

### enabled

• `Optional` **enabled**: `boolean`

Is this integration enabled

#### Defined in

packages/types/dist/discord.d.ts:69

---

### expire_behavior

• `Optional` **expire_behavior**: [`IntegrationExpireBehaviors`](../enums/discordeno_bot.IntegrationExpireBehaviors.md)

The behavior of expiring subscribers

#### Defined in

packages/types/dist/discord.d.ts:77

---

### expire_grace_period

• `Optional` **expire_grace_period**: `number`

The grace period (in days) before expiring subscribers

#### Defined in

packages/types/dist/discord.d.ts:79

---

### id

• **id**: `string`

Integration Id

#### Defined in

packages/types/dist/discord.d.ts:63

---

### name

• **name**: `string`

Integration name

#### Defined in

packages/types/dist/discord.d.ts:65

---

### revoked

• `Optional` **revoked**: `boolean`

Has this integration been revoked

#### Defined in

packages/types/dist/discord.d.ts:85

---

### role_id

• `Optional` **role_id**: `string`

Role Id that this integration uses for "subscribers"

#### Defined in

packages/types/dist/discord.d.ts:73

---

### scopes

• **scopes**: `string`[]

the scopes the application has been authorized for

#### Defined in

packages/types/dist/discord.d.ts:93

---

### subscriber_count

• `Optional` **subscriber_count**: `number`

How many subscribers this integration has

#### Defined in

packages/types/dist/discord.d.ts:83

---

### synced_at

• `Optional` **synced_at**: `string`

When this integration was last synced

#### Defined in

packages/types/dist/discord.d.ts:81

---

### syncing

• `Optional` **syncing**: `boolean`

Is this integration syncing

#### Defined in

packages/types/dist/discord.d.ts:71

---

### type

• **type**: `"twitch"` \| `"youtube"` \| `"discord"`

Integration type (twitch, youtube or discord)

#### Defined in

packages/types/dist/discord.d.ts:67

---

### user

• `Optional` **user**: [`DiscordUser`](discordeno_bot.DiscordUser.md)

User for this integration

#### Defined in

packages/types/dist/discord.d.ts:87
