[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / CreateChannelInvite

# Interface: CreateChannelInvite

[@discordeno/bot](../modules/discordeno_bot.md).CreateChannelInvite

## Hierarchy

- [`WithReason`](discordeno_bot.WithReason.md)

  ↳ **`CreateChannelInvite`**

## Table of contents

### Properties

- [maxAge](discordeno_bot.CreateChannelInvite.md#maxage)
- [maxUses](discordeno_bot.CreateChannelInvite.md#maxuses)
- [reason](discordeno_bot.CreateChannelInvite.md#reason)
- [targetApplicationId](discordeno_bot.CreateChannelInvite.md#targetapplicationid)
- [targetType](discordeno_bot.CreateChannelInvite.md#targettype)
- [targetUserId](discordeno_bot.CreateChannelInvite.md#targetuserid)
- [temporary](discordeno_bot.CreateChannelInvite.md#temporary)
- [unique](discordeno_bot.CreateChannelInvite.md#unique)

## Properties

### maxAge

• `Optional` **maxAge**: `number`

Duration of invite in seconds before expiry, or 0 for never. Between 0 and 604800 (7 days). Default: 86400 (24 hours)

#### Defined in

[packages/bot/src/helpers/guilds/invites/createInvite.ts:63](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/invites/createInvite.ts#L63)

---

### maxUses

• `Optional` **maxUses**: `number`

Max number of users or 0 for unlimited. Between 0 and 100. Default: 0

#### Defined in

[packages/bot/src/helpers/guilds/invites/createInvite.ts:65](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/invites/createInvite.ts#L65)

---

### reason

• `Optional` **reason**: `string`

The reason which should be added in the audit logs for doing this action.

#### Inherited from

[WithReason](discordeno_bot.WithReason.md).[reason](discordeno_bot.WithReason.md#reason)

#### Defined in

packages/types/dist/discordeno.d.ts:177

---

### targetApplicationId

• `Optional` **targetApplicationId**: [`BigString`](../modules/discordeno_bot.md#bigstring)

The id of the embedded application to open for this invite, required if `target_type` is 2, the application must have the `EMBEDDED` flag

#### Defined in

[packages/bot/src/helpers/guilds/invites/createInvite.ts:75](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/invites/createInvite.ts#L75)

---

### targetType

• `Optional` **targetType**: [`TargetTypes`](../enums/discordeno_bot.TargetTypes.md)

The type of target for this voice channel invite

#### Defined in

[packages/bot/src/helpers/guilds/invites/createInvite.ts:71](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/invites/createInvite.ts#L71)

---

### targetUserId

• `Optional` **targetUserId**: [`BigString`](../modules/discordeno_bot.md#bigstring)

The id of the user whose stream to display for this invite, required if `target_type` is 1, the user must be streaming in the channel

#### Defined in

[packages/bot/src/helpers/guilds/invites/createInvite.ts:73](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/invites/createInvite.ts#L73)

---

### temporary

• `Optional` **temporary**: `boolean`

Whether this invite only grants temporary membership. Default: false

#### Defined in

[packages/bot/src/helpers/guilds/invites/createInvite.ts:67](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/invites/createInvite.ts#L67)

---

### unique

• `Optional` **unique**: `boolean`

If true, don't try to reuse similar invite (useful for creating many unique one time use invites). Default: false

#### Defined in

[packages/bot/src/helpers/guilds/invites/createInvite.ts:69](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/invites/createInvite.ts#L69)
