[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / DiscordAutoModerationActionMetadata

# Interface: DiscordAutoModerationActionMetadata

[@discordeno/gateway](../modules/discordeno_gateway.md).DiscordAutoModerationActionMetadata

## Table of contents

### Properties

- [channel_id](discordeno_gateway.DiscordAutoModerationActionMetadata.md#channel_id)
- [duration_seconds](discordeno_gateway.DiscordAutoModerationActionMetadata.md#duration_seconds)

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
