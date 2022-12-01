[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / StatusUpdate

# Interface: StatusUpdate

[@discordeno/bot](../modules/discordeno_bot.md).StatusUpdate

https://discord.com/developers/docs/topics/gateway-events#update-presence

## Table of contents

### Properties

- [activities](discordeno_bot.StatusUpdate.md#activities)
- [status](discordeno_bot.StatusUpdate.md#status)

## Properties

### activities

• **activities**: [`Activity`](discordeno_bot.Activity.md)[]

The user's activities

#### Defined in

[packages/bot/src/helpers/misc/editShardStatus.ts:72](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/misc/editShardStatus.ts#L72)

---

### status

• **status**: `"idle"` \| `"dnd"` \| `"online"` \| `"offline"`

The user's new status

#### Defined in

[packages/bot/src/helpers/misc/editShardStatus.ts:74](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/misc/editShardStatus.ts#L74)
