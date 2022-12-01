[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / ModifyGuildChannelPositions

# Interface: ModifyGuildChannelPositions

[@discordeno/bot](../modules/discordeno_bot.md).ModifyGuildChannelPositions

https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions

## Table of contents

### Properties

- [id](discordeno_bot.ModifyGuildChannelPositions.md#id)
- [lockPositions](discordeno_bot.ModifyGuildChannelPositions.md#lockpositions)
- [parentId](discordeno_bot.ModifyGuildChannelPositions.md#parentid)
- [position](discordeno_bot.ModifyGuildChannelPositions.md#position)

## Properties

### id

• **id**: `string`

Channel id

#### Defined in

[packages/bot/src/helpers/channels/editChannelPositions.ts:45](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/editChannelPositions.ts#L45)

---

### lockPositions

• `Optional` **lockPositions**: `null` \| `boolean`

Syncs the permission overwrites with the new parent, if moving to a new category

#### Defined in

[packages/bot/src/helpers/channels/editChannelPositions.ts:49](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/editChannelPositions.ts#L49)

---

### parentId

• `Optional` **parentId**: `null` \| `string`

The new parent ID for the channel that is moved

#### Defined in

[packages/bot/src/helpers/channels/editChannelPositions.ts:51](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/editChannelPositions.ts#L51)

---

### position

• **position**: `null` \| `number`

Sorting position of the channel

#### Defined in

[packages/bot/src/helpers/channels/editChannelPositions.ts:47](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/editChannelPositions.ts#L47)
