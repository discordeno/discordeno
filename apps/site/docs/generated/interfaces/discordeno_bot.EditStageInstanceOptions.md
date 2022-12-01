[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / EditStageInstanceOptions

# Interface: EditStageInstanceOptions

[@discordeno/bot](../modules/discordeno_bot.md).EditStageInstanceOptions

## Hierarchy

- [`WithReason`](discordeno_bot.WithReason.md)

  ↳ **`EditStageInstanceOptions`**

## Table of contents

### Properties

- [reason](discordeno_bot.EditStageInstanceOptions.md#reason)
- [topic](discordeno_bot.EditStageInstanceOptions.md#topic)

## Properties

### reason

• `Optional` **reason**: `string`

The reason which should be added in the audit logs for doing this action.

#### Inherited from

[WithReason](discordeno_bot.WithReason.md).[reason](discordeno_bot.WithReason.md#reason)

#### Defined in

packages/types/dist/discordeno.d.ts:177

---

### topic

• **topic**: `string`

The topic of the Stage instance (1-120 characters)

#### Defined in

[packages/bot/src/helpers/channels/stages/editStageInstance.ts:39](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/stages/editStageInstance.ts#L39)
