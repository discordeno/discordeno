[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / CreateGuildBan

# Interface: CreateGuildBan

[@discordeno/bot](../modules/discordeno_bot.md).CreateGuildBan

https://discord.com/developers/docs/resources/guild#create-guild-ban

## Hierarchy

- [`WithReason`](discordeno_bot.WithReason.md)

  ↳ **`CreateGuildBan`**

## Table of contents

### Properties

- [deleteMessageSeconds](discordeno_bot.CreateGuildBan.md#deletemessageseconds)
- [reason](discordeno_bot.CreateGuildBan.md#reason)

## Properties

### deleteMessageSeconds

• `Optional` **deleteMessageSeconds**: `number`

Number of seconds to delete messages for, between 0 and 604800 (7 days)

#### Defined in

[packages/bot/src/helpers/members/banMember.ts:39](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/members/banMember.ts#L39)

---

### reason

• `Optional` **reason**: `string`

The reason which should be added in the audit logs for doing this action.

#### Inherited from

[WithReason](discordeno_bot.WithReason.md).[reason](discordeno_bot.WithReason.md#reason)

#### Defined in

packages/types/dist/discordeno.d.ts:177
