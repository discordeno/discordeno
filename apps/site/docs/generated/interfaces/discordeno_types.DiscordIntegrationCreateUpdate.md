[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordIntegrationCreateUpdate

# Interface: DiscordIntegrationCreateUpdate

[@discordeno/types](../modules/discordeno_types.md).DiscordIntegrationCreateUpdate

https://github.com/discord/discord-api-docs/blob/master/docs/topics/Gateway.md#integration-create-event-additional-fields

## Hierarchy

- [`DiscordIntegration`](discordeno_types.DiscordIntegration.md)

  ↳ **`DiscordIntegrationCreateUpdate`**

## Table of contents

### Properties

- [account](discordeno_types.DiscordIntegrationCreateUpdate.md#account)
- [application](discordeno_types.DiscordIntegrationCreateUpdate.md#application)
- [enable_emoticons](discordeno_types.DiscordIntegrationCreateUpdate.md#enable_emoticons)
- [enabled](discordeno_types.DiscordIntegrationCreateUpdate.md#enabled)
- [expire_behavior](discordeno_types.DiscordIntegrationCreateUpdate.md#expire_behavior)
- [expire_grace_period](discordeno_types.DiscordIntegrationCreateUpdate.md#expire_grace_period)
- [guild_id](discordeno_types.DiscordIntegrationCreateUpdate.md#guild_id)
- [id](discordeno_types.DiscordIntegrationCreateUpdate.md#id)
- [name](discordeno_types.DiscordIntegrationCreateUpdate.md#name)
- [revoked](discordeno_types.DiscordIntegrationCreateUpdate.md#revoked)
- [role_id](discordeno_types.DiscordIntegrationCreateUpdate.md#role_id)
- [scopes](discordeno_types.DiscordIntegrationCreateUpdate.md#scopes)
- [subscriber_count](discordeno_types.DiscordIntegrationCreateUpdate.md#subscriber_count)
- [synced_at](discordeno_types.DiscordIntegrationCreateUpdate.md#synced_at)
- [syncing](discordeno_types.DiscordIntegrationCreateUpdate.md#syncing)
- [type](discordeno_types.DiscordIntegrationCreateUpdate.md#type)
- [user](discordeno_types.DiscordIntegrationCreateUpdate.md#user)

## Properties

### account

• **account**: [`DiscordIntegrationAccount`](discordeno_types.DiscordIntegrationAccount.md)

Integration account information

#### Inherited from

[DiscordIntegration](discordeno_types.DiscordIntegration.md).[account](discordeno_types.DiscordIntegration.md#account)

#### Defined in

[packages/types/src/discord.ts:156](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L156)

---

### application

• `Optional` **application**: [`DiscordIntegrationApplication`](discordeno_types.DiscordIntegrationApplication.md)

The bot/OAuth2 application for discord integrations

#### Inherited from

[DiscordIntegration](discordeno_types.DiscordIntegration.md).[application](discordeno_types.DiscordIntegration.md#application)

#### Defined in

[packages/types/src/discord.ts:158](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L158)

---

### enable_emoticons

• `Optional` **enable_emoticons**: `boolean`

Whether emoticons should be synced for this integration (twitch only currently)

#### Inherited from

[DiscordIntegration](discordeno_types.DiscordIntegration.md).[enable_emoticons](discordeno_types.DiscordIntegration.md#enable_emoticons)

#### Defined in

[packages/types/src/discord.ts:141](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L141)

---

### enabled

• `Optional` **enabled**: `boolean`

Is this integration enabled

#### Inherited from

[DiscordIntegration](discordeno_types.DiscordIntegration.md).[enabled](discordeno_types.DiscordIntegration.md#enabled)

#### Defined in

[packages/types/src/discord.ts:135](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L135)

---

### expire_behavior

• `Optional` **expire_behavior**: [`IntegrationExpireBehaviors`](../enums/discordeno_types.IntegrationExpireBehaviors.md)

The behavior of expiring subscribers

#### Inherited from

[DiscordIntegration](discordeno_types.DiscordIntegration.md).[expire_behavior](discordeno_types.DiscordIntegration.md#expire_behavior)

#### Defined in

[packages/types/src/discord.ts:143](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L143)

---

### expire_grace_period

• `Optional` **expire_grace_period**: `number`

The grace period (in days) before expiring subscribers

#### Inherited from

[DiscordIntegration](discordeno_types.DiscordIntegration.md).[expire_grace_period](discordeno_types.DiscordIntegration.md#expire_grace_period)

#### Defined in

[packages/types/src/discord.ts:145](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L145)

---

### guild_id

• **guild_id**: `string`

Id of the guild

#### Defined in

[packages/types/src/discord.ts:189](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L189)

---

### id

• **id**: `string`

Integration Id

#### Inherited from

[DiscordIntegration](discordeno_types.DiscordIntegration.md).[id](discordeno_types.DiscordIntegration.md#id)

#### Defined in

[packages/types/src/discord.ts:129](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L129)

---

### name

• **name**: `string`

Integration name

#### Inherited from

[DiscordIntegration](discordeno_types.DiscordIntegration.md).[name](discordeno_types.DiscordIntegration.md#name)

#### Defined in

[packages/types/src/discord.ts:131](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L131)

---

### revoked

• `Optional` **revoked**: `boolean`

Has this integration been revoked

#### Inherited from

[DiscordIntegration](discordeno_types.DiscordIntegration.md).[revoked](discordeno_types.DiscordIntegration.md#revoked)

#### Defined in

[packages/types/src/discord.ts:151](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L151)

---

### role_id

• `Optional` **role_id**: `string`

Role Id that this integration uses for "subscribers"

#### Inherited from

[DiscordIntegration](discordeno_types.DiscordIntegration.md).[role_id](discordeno_types.DiscordIntegration.md#role_id)

#### Defined in

[packages/types/src/discord.ts:139](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L139)

---

### scopes

• **scopes**: `string`[]

the scopes the application has been authorized for

#### Inherited from

[DiscordIntegration](discordeno_types.DiscordIntegration.md).[scopes](discordeno_types.DiscordIntegration.md#scopes)

#### Defined in

[packages/types/src/discord.ts:160](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L160)

---

### subscriber_count

• `Optional` **subscriber_count**: `number`

How many subscribers this integration has

#### Inherited from

[DiscordIntegration](discordeno_types.DiscordIntegration.md).[subscriber_count](discordeno_types.DiscordIntegration.md#subscriber_count)

#### Defined in

[packages/types/src/discord.ts:149](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L149)

---

### synced_at

• `Optional` **synced_at**: `string`

When this integration was last synced

#### Inherited from

[DiscordIntegration](discordeno_types.DiscordIntegration.md).[synced_at](discordeno_types.DiscordIntegration.md#synced_at)

#### Defined in

[packages/types/src/discord.ts:147](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L147)

---

### syncing

• `Optional` **syncing**: `boolean`

Is this integration syncing

#### Inherited from

[DiscordIntegration](discordeno_types.DiscordIntegration.md).[syncing](discordeno_types.DiscordIntegration.md#syncing)

#### Defined in

[packages/types/src/discord.ts:137](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L137)

---

### type

• **type**: `"twitch"` \| `"youtube"` \| `"discord"`

Integration type (twitch, youtube or discord)

#### Inherited from

[DiscordIntegration](discordeno_types.DiscordIntegration.md).[type](discordeno_types.DiscordIntegration.md#type)

#### Defined in

[packages/types/src/discord.ts:133](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L133)

---

### user

• `Optional` **user**: [`DiscordUser`](discordeno_types.DiscordUser.md)

User for this integration

#### Inherited from

[DiscordIntegration](discordeno_types.DiscordIntegration.md).[user](discordeno_types.DiscordIntegration.md#user)

#### Defined in

[packages/types/src/discord.ts:154](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L154)
