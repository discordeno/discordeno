[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / CreateWebhook

# Interface: CreateWebhook

[@discordeno/bot](../modules/discordeno_bot.md).CreateWebhook

## Hierarchy

- [`WithReason`](discordeno_bot.WithReason.md)

  ↳ **`CreateWebhook`**

## Table of contents

### Properties

- [avatar](discordeno_bot.CreateWebhook.md#avatar)
- [name](discordeno_bot.CreateWebhook.md#name)
- [reason](discordeno_bot.CreateWebhook.md#reason)

## Properties

### avatar

• `Optional` **avatar**: `null` \| `string`

Image url for the default webhook avatar

#### Defined in

[packages/bot/src/helpers/webhooks/createWebhook.ts:42](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/webhooks/createWebhook.ts#L42)

---

### name

• **name**: `string`

Name of the webhook (1-80 characters)

#### Defined in

[packages/bot/src/helpers/webhooks/createWebhook.ts:40](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/webhooks/createWebhook.ts#L40)

---

### reason

• `Optional` **reason**: `string`

The reason which should be added in the audit logs for doing this action.

#### Inherited from

[WithReason](discordeno_bot.WithReason.md).[reason](discordeno_bot.WithReason.md#reason)

#### Defined in

packages/types/dist/discordeno.d.ts:177
