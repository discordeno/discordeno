[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / StartThreadWithMessage

# Interface: StartThreadWithMessage

[@discordeno/bot](../modules/discordeno_bot.md).StartThreadWithMessage

## Hierarchy

- [`WithReason`](discordeno_bot.WithReason.md)

  ↳ **`StartThreadWithMessage`**

## Table of contents

### Properties

- [autoArchiveDuration](discordeno_bot.StartThreadWithMessage.md#autoarchiveduration)
- [name](discordeno_bot.StartThreadWithMessage.md#name)
- [rateLimitPerUser](discordeno_bot.StartThreadWithMessage.md#ratelimitperuser)
- [reason](discordeno_bot.StartThreadWithMessage.md#reason)

## Properties

### autoArchiveDuration

• **autoArchiveDuration**: `60` \| `1440` \| `4320` \| `10080`

Duration in minutes to automatically archive the thread after recent activity

#### Defined in

[packages/bot/src/helpers/channels/threads/startThreadWithMessage.ts:51](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/threads/startThreadWithMessage.ts#L51)

---

### name

• **name**: `string`

1-100 character thread name

#### Defined in

[packages/bot/src/helpers/channels/threads/startThreadWithMessage.ts:49](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/threads/startThreadWithMessage.ts#L49)

---

### rateLimitPerUser

• `Optional` **rateLimitPerUser**: `null` \| `number`

Amount of seconds a user has to wait before sending another message (0-21600)

#### Defined in

[packages/bot/src/helpers/channels/threads/startThreadWithMessage.ts:53](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/threads/startThreadWithMessage.ts#L53)

---

### reason

• `Optional` **reason**: `string`

The reason which should be added in the audit logs for doing this action.

#### Inherited from

[WithReason](discordeno_bot.WithReason.md).[reason](discordeno_bot.WithReason.md#reason)

#### Defined in

packages/types/dist/discordeno.d.ts:177
