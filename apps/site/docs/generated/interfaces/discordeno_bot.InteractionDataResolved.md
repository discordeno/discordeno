[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / InteractionDataResolved

# Interface: InteractionDataResolved

[@discordeno/bot](../modules/discordeno_bot.md).InteractionDataResolved

## Hierarchy

- `ReturnType`<typeof [`transformInteractionDataResolved`](../modules/discordeno_bot.md#transforminteractiondataresolved)\>

  ↳ **`InteractionDataResolved`**

## Table of contents

### Properties

- [attachments](discordeno_bot.InteractionDataResolved.md#attachments)
- [channels](discordeno_bot.InteractionDataResolved.md#channels)
- [members](discordeno_bot.InteractionDataResolved.md#members)
- [messages](discordeno_bot.InteractionDataResolved.md#messages)
- [roles](discordeno_bot.InteractionDataResolved.md#roles)
- [users](discordeno_bot.InteractionDataResolved.md#users)

## Properties

### attachments

• `Optional` **attachments**: [`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`Attachment`](discordeno_bot.Attachment.md)\>

#### Inherited from

ReturnType.attachments

#### Defined in

[packages/bot/src/transformers/interaction.ts:78](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/interaction.ts#L78)

---

### channels

• `Optional` **channels**: [`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, { `id`: `bigint` ; `name`: `string` ; `permissions`: `bigint` ; `type`: [`ChannelTypes`](../enums/discordeno_bot.ChannelTypes.md) }\>

#### Inherited from

ReturnType.channels

#### Defined in

[packages/bot/src/transformers/interaction.ts:77](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/interaction.ts#L77)

---

### members

• `Optional` **members**: [`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`Member`](discordeno_bot.Member.md)\>

#### Inherited from

ReturnType.members

#### Defined in

[packages/bot/src/transformers/interaction.ts:75](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/interaction.ts#L75)

---

### messages

• `Optional` **messages**: [`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`Message`](discordeno_bot.Message.md)\>

#### Inherited from

ReturnType.messages

#### Defined in

[packages/bot/src/transformers/interaction.ts:73](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/interaction.ts#L73)

---

### roles

• `Optional` **roles**: [`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`Role`](discordeno_bot.Role.md)\>

#### Inherited from

ReturnType.roles

#### Defined in

[packages/bot/src/transformers/interaction.ts:76](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/interaction.ts#L76)

---

### users

• `Optional` **users**: [`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`User`](discordeno_bot.User.md)\>

#### Inherited from

ReturnType.users

#### Defined in

[packages/bot/src/transformers/interaction.ts:74](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/interaction.ts#L74)
