[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / Interaction

# Interface: Interaction

[@discordeno/bot](../modules/discordeno_bot.md).Interaction

## Hierarchy

- `ReturnType`<typeof [`transformInteraction`](../modules/discordeno_bot.md#transforminteraction)\>

  ↳ **`Interaction`**

## Table of contents

### Properties

- [appPermissions](discordeno_bot.Interaction.md#apppermissions)
- [applicationId](discordeno_bot.Interaction.md#applicationid)
- [channelId](discordeno_bot.Interaction.md#channelid)
- [data](discordeno_bot.Interaction.md#data)
- [guildId](discordeno_bot.Interaction.md#guildid)
- [guildLocale](discordeno_bot.Interaction.md#guildlocale)
- [id](discordeno_bot.Interaction.md#id)
- [locale](discordeno_bot.Interaction.md#locale)
- [member](discordeno_bot.Interaction.md#member)
- [message](discordeno_bot.Interaction.md#message)
- [token](discordeno_bot.Interaction.md#token)
- [type](discordeno_bot.Interaction.md#type)
- [user](discordeno_bot.Interaction.md#user)
- [version](discordeno_bot.Interaction.md#version)

## Properties

### appPermissions

• **appPermissions**: `undefined` \| `bigint`

#### Inherited from

ReturnType.appPermissions

#### Defined in

[packages/bot/src/transformers/interaction.ts:31](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/interaction.ts#L31)

---

### applicationId

• **applicationId**: `bigint`

#### Inherited from

ReturnType.applicationId

#### Defined in

[packages/bot/src/transformers/interaction.ts:30](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/interaction.ts#L30)

---

### channelId

• **channelId**: `undefined` \| `bigint`

#### Inherited from

ReturnType.channelId

#### Defined in

[packages/bot/src/transformers/interaction.ts:33](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/interaction.ts#L33)

---

### data

• **data**: `undefined` \| { `componentType`: `undefined` \| [`MessageComponentTypes`](../enums/discordeno_bot.MessageComponentTypes.md) = payload.data.component_type; `components`: `undefined` \| [`Component`](discordeno_bot.Component.md)[] ; `customId`: `undefined` \| `string` = payload.data.custom_id; `guildId`: `undefined` \| `bigint` ; `id`: `undefined` \| `bigint` ; `name`: `string` = payload.data.name; `options`: `undefined` \| [`InteractionDataOption`](discordeno_bot.InteractionDataOption.md)[] ; `resolved`: `undefined` \| { `attachments?`: [`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`Attachment`](discordeno_bot.Attachment.md)\> ; `channels?`: [`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, { `id`: `bigint` ; `name`: `string` ; `permissions`: `bigint` ; `type`: [`ChannelTypes`](../enums/discordeno_bot.ChannelTypes.md) }\> ; `members?`: [`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`Member`](discordeno_bot.Member.md)\> ; `messages?`: [`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`Message`](discordeno_bot.Message.md)\> ; `roles?`: [`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`Role`](discordeno_bot.Role.md)\> ; `users?`: [`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`User`](discordeno_bot.User.md)\> } ; `targetId`: `undefined` \| `bigint` ; `values`: `undefined` \| `string`[] = payload.data.values }

#### Inherited from

ReturnType.data

#### Defined in

[packages/bot/src/transformers/interaction.ts:36](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/interaction.ts#L36)

---

### guildId

• **guildId**: `undefined` \| `bigint`

#### Inherited from

ReturnType.guildId

#### Defined in

[packages/bot/src/transformers/interaction.ts:27](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/interaction.ts#L27)

---

### guildLocale

• **guildLocale**: `undefined` \| `string` = `payload.guild_locale`

#### Inherited from

ReturnType.guildLocale

#### Defined in

[packages/bot/src/transformers/interaction.ts:24](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/interaction.ts#L24)

---

### id

• **id**: `bigint`

#### Inherited from

ReturnType.id

#### Defined in

[packages/bot/src/transformers/interaction.ts:29](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/interaction.ts#L29)

---

### locale

• **locale**: `undefined` \| `string` = `payload.locale`

#### Inherited from

ReturnType.locale

#### Defined in

[packages/bot/src/transformers/interaction.ts:23](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/interaction.ts#L23)

---

### member

• **member**: `undefined` \| [`Member`](discordeno_bot.Member.md)

#### Inherited from

ReturnType.member

#### Defined in

[packages/bot/src/transformers/interaction.ts:34](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/interaction.ts#L34)

---

### message

• **message**: `undefined` \| [`Message`](discordeno_bot.Message.md)

#### Inherited from

ReturnType.message

#### Defined in

[packages/bot/src/transformers/interaction.ts:32](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/interaction.ts#L32)

---

### token

• **token**: `string` = `payload.token`

#### Inherited from

ReturnType.token

#### Defined in

[packages/bot/src/transformers/interaction.ts:21](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/interaction.ts#L21)

---

### type

• **type**: [`InteractionTypes`](../enums/discordeno_bot.InteractionTypes.md) = `payload.type`

#### Inherited from

ReturnType.type

#### Defined in

[packages/bot/src/transformers/interaction.ts:20](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/interaction.ts#L20)

---

### user

• **user**: [`User`](discordeno_bot.User.md)

#### Inherited from

ReturnType.user

#### Defined in

[packages/bot/src/transformers/interaction.ts:28](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/interaction.ts#L28)

---

### version

• **version**: `1`

#### Inherited from

ReturnType.version

#### Defined in

[packages/bot/src/transformers/interaction.ts:22](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/interaction.ts#L22)
