[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordAutoModerationActionExecution

# Interface: DiscordAutoModerationActionExecution

[@discordeno/types](../modules/discordeno_types.md).DiscordAutoModerationActionExecution

## Table of contents

### Properties

- [action](discordeno_types.DiscordAutoModerationActionExecution.md#action)
- [alert_system_message_id](discordeno_types.DiscordAutoModerationActionExecution.md#alert_system_message_id)
- [channel_id](discordeno_types.DiscordAutoModerationActionExecution.md#channel_id)
- [content](discordeno_types.DiscordAutoModerationActionExecution.md#content)
- [guild_id](discordeno_types.DiscordAutoModerationActionExecution.md#guild_id)
- [matched_content](discordeno_types.DiscordAutoModerationActionExecution.md#matched_content)
- [matched_keyword](discordeno_types.DiscordAutoModerationActionExecution.md#matched_keyword)
- [message_id](discordeno_types.DiscordAutoModerationActionExecution.md#message_id)
- [rule_id](discordeno_types.DiscordAutoModerationActionExecution.md#rule_id)
- [rule_trigger_type](discordeno_types.DiscordAutoModerationActionExecution.md#rule_trigger_type)
- [user_id](discordeno_types.DiscordAutoModerationActionExecution.md#user_id)

## Properties

### action

• **action**: [`DiscordAutoModerationAction`](discordeno_types.DiscordAutoModerationAction.md)

Action which was executed

#### Defined in

[packages/types/src/discord.ts:1539](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1539)

---

### alert_system_message_id

• `Optional` **alert_system_message_id**: `null` \| `string`

The id of any system auto moderation messages posted as a result of this action

#### Defined in

[packages/types/src/discord.ts:1547](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1547)

---

### channel_id

• `Optional` **channel_id**: `null` \| `string`

The id of the channel in which user content was posted

#### Defined in

[packages/types/src/discord.ts:1543](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1543)

---

### content

• **content**: `string`

The content from the user

#### Defined in

[packages/types/src/discord.ts:1537](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1537)

---

### guild_id

• **guild_id**: `string`

The id of the guild

#### Defined in

[packages/types/src/discord.ts:1531](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1531)

---

### matched_content

• **matched_content**: `null` \| `string`

The substring in content that triggered the rule

#### Defined in

[packages/types/src/discord.ts:1551](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1551)

---

### matched_keyword

• **matched_keyword**: `null` \| `string`

The word or phrase that triggerred the rule.

#### Defined in

[packages/types/src/discord.ts:1549](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1549)

---

### message_id

• `Optional` **message_id**: `null` \| `string`

The id of the message. Will not exist if message was blocked by automod or content was not part of any message

#### Defined in

[packages/types/src/discord.ts:1545](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1545)

---

### rule_id

• **rule_id**: `string`

The id of the rule that was executed

#### Defined in

[packages/types/src/discord.ts:1533](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1533)

---

### rule_trigger_type

• **rule_trigger_type**: [`AutoModerationTriggerTypes`](../enums/discordeno_types.AutoModerationTriggerTypes.md)

The trigger type of the rule that was executed.

#### Defined in

[packages/types/src/discord.ts:1541](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1541)

---

### user_id

• **user_id**: `string`

The id of the user which generated the content which triggered the rule

#### Defined in

[packages/types/src/discord.ts:1535](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1535)
