[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / CreateStageInstance

# Interface: CreateStageInstance

[@discordeno/bot](../modules/discordeno_bot.md).CreateStageInstance

## Hierarchy

- [`WithReason`](discordeno_bot.WithReason.md)

  ↳ **`CreateStageInstance`**

## Table of contents

### Properties

- [channelId](discordeno_bot.CreateStageInstance.md#channelid)
- [reason](discordeno_bot.CreateStageInstance.md#reason)
- [sendStartNotification](discordeno_bot.CreateStageInstance.md#sendstartnotification)
- [topic](discordeno_bot.CreateStageInstance.md#topic)

## Properties

### channelId

• **channelId**: [`BigString`](../modules/discordeno_bot.md#bigstring)

#### Defined in

[packages/bot/src/helpers/channels/stages/createStageInstance.ts:37](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/stages/createStageInstance.ts#L37)

---

### reason

• `Optional` **reason**: `string`

The reason which should be added in the audit logs for doing this action.

#### Inherited from

[WithReason](discordeno_bot.WithReason.md).[reason](discordeno_bot.WithReason.md#reason)

#### Defined in

packages/types/dist/discordeno.d.ts:177

---

### sendStartNotification

• `Optional` **sendStartNotification**: `boolean`

Notify

**`Everyone`**

that the stage instance has started. Requires the MENTION_EVERYONE permission.

#### Defined in

[packages/bot/src/helpers/channels/stages/createStageInstance.ts:40](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/stages/createStageInstance.ts#L40)

---

### topic

• **topic**: `string`

#### Defined in

[packages/bot/src/helpers/channels/stages/createStageInstance.ts:38](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/stages/createStageInstance.ts#L38)
