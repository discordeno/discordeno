[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / DiscordAutoModerationActionMetadata

# Interface: DiscordAutoModerationActionMetadata

[@discordeno/bot](../modules/discordeno_bot.md).DiscordAutoModerationActionMetadata

## Table of contents

### Properties

- [channel_id](discordeno_bot.DiscordAutoModerationActionMetadata.md#channel_id)
- [duration_seconds](discordeno_bot.DiscordAutoModerationActionMetadata.md#duration_seconds)

## Properties

### channel_id

• `Optional` **channel_id**: `string`

The id of channel to which user content should be logged. Only in ActionType.SendAlertMessage

#### Defined in

packages/types/dist/discord.d.ts:1358

---

### duration_seconds

• `Optional` **duration_seconds**: `number`

Timeout duration in seconds maximum of 2419200 seconds (4 weeks). Only supported for TriggerType.Keyword && Only in ActionType.Timeout

#### Defined in

packages/types/dist/discord.d.ts:1360
