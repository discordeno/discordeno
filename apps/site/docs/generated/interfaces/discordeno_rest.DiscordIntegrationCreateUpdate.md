[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/rest](../modules/discordeno_rest.md) / DiscordIntegrationCreateUpdate

# Interface: DiscordIntegrationCreateUpdate

[@discordeno/rest](../modules/discordeno_rest.md).DiscordIntegrationCreateUpdate

https://github.com/discord/discord-api-docs/blob/master/docs/topics/Gateway.md#integration-create-event-additional-fields

## Hierarchy

- [`DiscordIntegration`](discordeno_rest.DiscordIntegration.md)

  ↳ **`DiscordIntegrationCreateUpdate`**

## Table of contents

### Properties

- [account](discordeno_rest.DiscordIntegrationCreateUpdate.md#account)
- [application](discordeno_rest.DiscordIntegrationCreateUpdate.md#application)
- [enable_emoticons](discordeno_rest.DiscordIntegrationCreateUpdate.md#enable_emoticons)
- [enabled](discordeno_rest.DiscordIntegrationCreateUpdate.md#enabled)
- [expire_behavior](discordeno_rest.DiscordIntegrationCreateUpdate.md#expire_behavior)
- [expire_grace_period](discordeno_rest.DiscordIntegrationCreateUpdate.md#expire_grace_period)
- [guild_id](discordeno_rest.DiscordIntegrationCreateUpdate.md#guild_id)
- [id](discordeno_rest.DiscordIntegrationCreateUpdate.md#id)
- [name](discordeno_rest.DiscordIntegrationCreateUpdate.md#name)
- [revoked](discordeno_rest.DiscordIntegrationCreateUpdate.md#revoked)
- [role_id](discordeno_rest.DiscordIntegrationCreateUpdate.md#role_id)
- [scopes](discordeno_rest.DiscordIntegrationCreateUpdate.md#scopes)
- [subscriber_count](discordeno_rest.DiscordIntegrationCreateUpdate.md#subscriber_count)
- [synced_at](discordeno_rest.DiscordIntegrationCreateUpdate.md#synced_at)
- [syncing](discordeno_rest.DiscordIntegrationCreateUpdate.md#syncing)
- [type](discordeno_rest.DiscordIntegrationCreateUpdate.md#type)
- [user](discordeno_rest.DiscordIntegrationCreateUpdate.md#user)

## Properties

### account

• **account**: [`DiscordIntegrationAccount`](discordeno_rest.DiscordIntegrationAccount.md)

Integration account information

#### Inherited from

[DiscordIntegration](discordeno_rest.DiscordIntegration.md).[account](discordeno_rest.DiscordIntegration.md#account)

#### Defined in

packages/types/dist/discord.d.ts:89

---

### application

• `Optional` **application**: [`DiscordIntegrationApplication`](discordeno_rest.DiscordIntegrationApplication.md)

The bot/OAuth2 application for discord integrations

#### Inherited from

[DiscordIntegration](discordeno_rest.DiscordIntegration.md).[application](discordeno_rest.DiscordIntegration.md#application)

#### Defined in

packages/types/dist/discord.d.ts:91

---

### enable_emoticons

• `Optional` **enable_emoticons**: `boolean`

Whether emoticons should be synced for this integration (twitch only currently)

#### Inherited from

[DiscordIntegration](discordeno_rest.DiscordIntegration.md).[enable_emoticons](discordeno_rest.DiscordIntegration.md#enable_emoticons)

#### Defined in

packages/types/dist/discord.d.ts:75

---

### enabled

• `Optional` **enabled**: `boolean`

Is this integration enabled

#### Inherited from

[DiscordIntegration](discordeno_rest.DiscordIntegration.md).[enabled](discordeno_rest.DiscordIntegration.md#enabled)

#### Defined in

packages/types/dist/discord.d.ts:69

---

### expire_behavior

• `Optional` **expire_behavior**: [`IntegrationExpireBehaviors`](../enums/discordeno_rest.IntegrationExpireBehaviors.md)

The behavior of expiring subscribers

#### Inherited from

[DiscordIntegration](discordeno_rest.DiscordIntegration.md).[expire_behavior](discordeno_rest.DiscordIntegration.md#expire_behavior)

#### Defined in

packages/types/dist/discord.d.ts:77

---

### expire_grace_period

• `Optional` **expire_grace_period**: `number`

The grace period (in days) before expiring subscribers

#### Inherited from

[DiscordIntegration](discordeno_rest.DiscordIntegration.md).[expire_grace_period](discordeno_rest.DiscordIntegration.md#expire_grace_period)

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

[DiscordIntegration](discordeno_rest.DiscordIntegration.md).[id](discordeno_rest.DiscordIntegration.md#id)

#### Defined in

packages/types/dist/discord.d.ts:63

---

### name

• **name**: `string`

Integration name

#### Inherited from

[DiscordIntegration](discordeno_rest.DiscordIntegration.md).[name](discordeno_rest.DiscordIntegration.md#name)

#### Defined in

packages/types/dist/discord.d.ts:65

---

### revoked

• `Optional` **revoked**: `boolean`

Has this integration been revoked

#### Inherited from

[DiscordIntegration](discordeno_rest.DiscordIntegration.md).[revoked](discordeno_rest.DiscordIntegration.md#revoked)

#### Defined in

packages/types/dist/discord.d.ts:85

---

### role_id

• `Optional` **role_id**: `string`

Role Id that this integration uses for "subscribers"

#### Inherited from

[DiscordIntegration](discordeno_rest.DiscordIntegration.md).[role_id](discordeno_rest.DiscordIntegration.md#role_id)

#### Defined in

packages/types/dist/discord.d.ts:73

---

### scopes

• **scopes**: `string`[]

the scopes the application has been authorized for

#### Inherited from

[DiscordIntegration](discordeno_rest.DiscordIntegration.md).[scopes](discordeno_rest.DiscordIntegration.md#scopes)

#### Defined in

packages/types/dist/discord.d.ts:93

---

### subscriber_count

• `Optional` **subscriber_count**: `number`

How many subscribers this integration has

#### Inherited from

[DiscordIntegration](discordeno_rest.DiscordIntegration.md).[subscriber_count](discordeno_rest.DiscordIntegration.md#subscriber_count)

#### Defined in

packages/types/dist/discord.d.ts:83

---

### synced_at

• `Optional` **synced_at**: `string`

When this integration was last synced

#### Inherited from

[DiscordIntegration](discordeno_rest.DiscordIntegration.md).[synced_at](discordeno_rest.DiscordIntegration.md#synced_at)

#### Defined in

packages/types/dist/discord.d.ts:81

---

### syncing

• `Optional` **syncing**: `boolean`

Is this integration syncing

#### Inherited from

[DiscordIntegration](discordeno_rest.DiscordIntegration.md).[syncing](discordeno_rest.DiscordIntegration.md#syncing)

#### Defined in

packages/types/dist/discord.d.ts:71

---

### type

• **type**: `"twitch"` \| `"youtube"` \| `"discord"`

Integration type (twitch, youtube or discord)

#### Inherited from

[DiscordIntegration](discordeno_rest.DiscordIntegration.md).[type](discordeno_rest.DiscordIntegration.md#type)

#### Defined in

packages/types/dist/discord.d.ts:67

---

### user

• `Optional` **user**: [`DiscordUser`](discordeno_rest.DiscordUser.md)

User for this integration

#### Inherited from

[DiscordIntegration](discordeno_rest.DiscordIntegration.md).[user](discordeno_rest.DiscordIntegration.md#user)

#### Defined in

packages/types/dist/discord.d.ts:87
