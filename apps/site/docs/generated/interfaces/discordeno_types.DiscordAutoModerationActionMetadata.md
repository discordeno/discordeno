[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordAutoModerationActionMetadata

# Interface: DiscordAutoModerationActionMetadata

[@discordeno/types](../modules/discordeno_types.md).DiscordAutoModerationActionMetadata

## Table of contents

### Properties

- [channel_id](discordeno_types.DiscordAutoModerationActionMetadata.md#channel_id)
- [duration_seconds](discordeno_types.DiscordAutoModerationActionMetadata.md#duration_seconds)

## Properties

### channel_id

• `Optional` **channel_id**: `string`

The id of channel to which user content should be logged. Only in ActionType.SendAlertMessage

#### Defined in

[packages/types/src/discord.ts:1524](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1524)

---

### duration_seconds

• `Optional` **duration_seconds**: `number`

Timeout duration in seconds maximum of 2419200 seconds (4 weeks). Only supported for TriggerType.Keyword && Only in ActionType.Timeout

#### Defined in

[packages/types/src/discord.ts:1526](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1526)
