[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / ModifyWebhook

# Interface: ModifyWebhook

[@discordeno/bot](../modules/discordeno_bot.md).ModifyWebhook

## Hierarchy

- [`WithReason`](discordeno_bot.WithReason.md)

  ↳ **`ModifyWebhook`**

## Table of contents

### Properties

- [avatar](discordeno_bot.ModifyWebhook.md#avatar)
- [channelId](discordeno_bot.ModifyWebhook.md#channelid)
- [name](discordeno_bot.ModifyWebhook.md#name)
- [reason](discordeno_bot.ModifyWebhook.md#reason)

## Properties

### avatar

• `Optional` **avatar**: `null` \| [`BigString`](../modules/discordeno_bot.md#bigstring)

Image for the default webhook avatar

#### Defined in

[packages/bot/src/helpers/webhooks/editWebhook.ts:40](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/webhooks/editWebhook.ts#L40)

---

### channelId

• `Optional` **channelId**: [`BigString`](../modules/discordeno_bot.md#bigstring)

The new channel id this webhook should be moved to

#### Defined in

[packages/bot/src/helpers/webhooks/editWebhook.ts:42](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/webhooks/editWebhook.ts#L42)

---

### name

• `Optional` **name**: `string`

The default name of the webhook

#### Defined in

[packages/bot/src/helpers/webhooks/editWebhook.ts:38](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/webhooks/editWebhook.ts#L38)

---

### reason

• `Optional` **reason**: `string`

The reason which should be added in the audit logs for doing this action.

#### Inherited from

[WithReason](discordeno_bot.WithReason.md).[reason](discordeno_bot.WithReason.md#reason)

#### Defined in

packages/types/dist/discordeno.d.ts:177
