[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / DiscordIntegrationCreateUpdate

# Interface: DiscordIntegrationCreateUpdate

[@discordeno/gateway](../modules/discordeno_gateway.md).DiscordIntegrationCreateUpdate

https://github.com/discord/discord-api-docs/blob/master/docs/topics/Gateway.md#integration-create-event-additional-fields

## Hierarchy

- [`DiscordIntegration`](discordeno_gateway.DiscordIntegration.md)

  ↳ **`DiscordIntegrationCreateUpdate`**

## Table of contents

### Properties

- [account](discordeno_gateway.DiscordIntegrationCreateUpdate.md#account)
- [application](discordeno_gateway.DiscordIntegrationCreateUpdate.md#application)
- [enable_emoticons](discordeno_gateway.DiscordIntegrationCreateUpdate.md#enable_emoticons)
- [enabled](discordeno_gateway.DiscordIntegrationCreateUpdate.md#enabled)
- [expire_behavior](discordeno_gateway.DiscordIntegrationCreateUpdate.md#expire_behavior)
- [expire_grace_period](discordeno_gateway.DiscordIntegrationCreateUpdate.md#expire_grace_period)
- [guild_id](discordeno_gateway.DiscordIntegrationCreateUpdate.md#guild_id)
- [id](discordeno_gateway.DiscordIntegrationCreateUpdate.md#id)
- [name](discordeno_gateway.DiscordIntegrationCreateUpdate.md#name)
- [revoked](discordeno_gateway.DiscordIntegrationCreateUpdate.md#revoked)
- [role_id](discordeno_gateway.DiscordIntegrationCreateUpdate.md#role_id)
- [scopes](discordeno_gateway.DiscordIntegrationCreateUpdate.md#scopes)
- [subscriber_count](discordeno_gateway.DiscordIntegrationCreateUpdate.md#subscriber_count)
- [synced_at](discordeno_gateway.DiscordIntegrationCreateUpdate.md#synced_at)
- [syncing](discordeno_gateway.DiscordIntegrationCreateUpdate.md#syncing)
- [type](discordeno_gateway.DiscordIntegrationCreateUpdate.md#type)
- [user](discordeno_gateway.DiscordIntegrationCreateUpdate.md#user)

## Properties

### account

• **account**: [`DiscordIntegrationAccount`](discordeno_gateway.DiscordIntegrationAccount.md)

Integration account information

#### Inherited from

[DiscordIntegration](discordeno_gateway.DiscordIntegration.md).[account](discordeno_gateway.DiscordIntegration.md#account)

#### Defined in

packages/types/dist/discord.d.ts:89

---

### application

• `Optional` **application**: [`DiscordIntegrationApplication`](discordeno_gateway.DiscordIntegrationApplication.md)

The bot/OAuth2 application for discord integrations

#### Inherited from

[DiscordIntegration](discordeno_gateway.DiscordIntegration.md).[application](discordeno_gateway.DiscordIntegration.md#application)

#### Defined in

packages/types/dist/discord.d.ts:91

---

### enable_emoticons

• `Optional` **enable_emoticons**: `boolean`

Whether emoticons should be synced for this integration (twitch only currently)

#### Inherited from

[DiscordIntegration](discordeno_gateway.DiscordIntegration.md).[enable_emoticons](discordeno_gateway.DiscordIntegration.md#enable_emoticons)

#### Defined in

packages/types/dist/discord.d.ts:75

---

### enabled

• `Optional` **enabled**: `boolean`

Is this integration enabled

#### Inherited from

[DiscordIntegration](discordeno_gateway.DiscordIntegration.md).[enabled](discordeno_gateway.DiscordIntegration.md#enabled)

#### Defined in

packages/types/dist/discord.d.ts:69

---

### expire_behavior

• `Optional` **expire_behavior**: [`IntegrationExpireBehaviors`](../enums/discordeno_gateway.IntegrationExpireBehaviors.md)

The behavior of expiring subscribers

#### Inherited from

[DiscordIntegration](discordeno_gateway.DiscordIntegration.md).[expire_behavior](discordeno_gateway.DiscordIntegration.md#expire_behavior)

#### Defined in

packages/types/dist/discord.d.ts:77

---

### expire_grace_period

• `Optional` **expire_grace_period**: `number`

The grace period (in days) before expiring subscribers

#### Inherited from

[DiscordIntegration](discordeno_gateway.DiscordIntegration.md).[expire_grace_period](discordeno_gateway.DiscordIntegration.md#expire_grace_period)

#### Defined in

packages/types/dist/discord.d.ts:79

---

### guild_id

• **guild_id**: `string`

Id of the guild

#### Defined in

packages/types/dist/discord.d.ts:118

---

### id

• **id**: `string`

Integration Id

#### Inherited from

[DiscordIntegration](discordeno_gateway.DiscordIntegration.md).[id](discordeno_gateway.DiscordIntegration.md#id)

#### Defined in

packages/types/dist/discord.d.ts:63

---

### name

• **name**: `string`

Integration name

#### Inherited from

[DiscordIntegration](discordeno_gateway.DiscordIntegration.md).[name](discordeno_gateway.DiscordIntegration.md#name)

#### Defined in

packages/types/dist/discord.d.ts:65

---

### revoked

• `Optional` **revoked**: `boolean`

Has this integration been revoked

#### Inherited from

[DiscordIntegration](discordeno_gateway.DiscordIntegration.md).[revoked](discordeno_gateway.DiscordIntegration.md#revoked)

#### Defined in

packages/types/dist/discord.d.ts:85

---

### role_id

• `Optional` **role_id**: `string`

Role Id that this integration uses for "subscribers"

#### Inherited from

[DiscordIntegration](discordeno_gateway.DiscordIntegration.md).[role_id](discordeno_gateway.DiscordIntegration.md#role_id)

#### Defined in

packages/types/dist/discord.d.ts:73

---

### scopes

• **scopes**: `string`[]

the scopes the application has been authorized for

#### Inherited from

[DiscordIntegration](discordeno_gateway.DiscordIntegration.md).[scopes](discordeno_gateway.DiscordIntegration.md#scopes)

#### Defined in

packages/types/dist/discord.d.ts:93

---

### subscriber_count

• `Optional` **subscriber_count**: `number`

How many subscribers this integration has

#### Inherited from

[DiscordIntegration](discordeno_gateway.DiscordIntegration.md).[subscriber_count](discordeno_gateway.DiscordIntegration.md#subscriber_count)

#### Defined in

packages/types/dist/discord.d.ts:83

---

### synced_at

• `Optional` **synced_at**: `string`

When this integration was last synced

#### Inherited from

[DiscordIntegration](discordeno_gateway.DiscordIntegration.md).[synced_at](discordeno_gateway.DiscordIntegration.md#synced_at)

#### Defined in

packages/types/dist/discord.d.ts:81

---

### syncing

• `Optional` **syncing**: `boolean`

Is this integration syncing

#### Inherited from

[DiscordIntegration](discordeno_gateway.DiscordIntegration.md).[syncing](discordeno_gateway.DiscordIntegration.md#syncing)

#### Defined in

packages/types/dist/discord.d.ts:71

---

### type

• **type**: `"twitch"` \| `"youtube"` \| `"discord"`

Integration type (twitch, youtube or discord)

#### Inherited from

[DiscordIntegration](discordeno_gateway.DiscordIntegration.md).[type](discordeno_gateway.DiscordIntegration.md#type)

#### Defined in

packages/types/dist/discord.d.ts:67

---

### user

• `Optional` **user**: [`DiscordUser`](discordeno_gateway.DiscordUser.md)

User for this integration

#### Inherited from

[DiscordIntegration](discordeno_gateway.DiscordIntegration.md).[user](discordeno_gateway.DiscordIntegration.md#user)

#### Defined in

packages/types/dist/discord.d.ts:87
