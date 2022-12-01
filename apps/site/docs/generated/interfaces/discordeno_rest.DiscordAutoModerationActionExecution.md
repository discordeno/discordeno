[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/rest](../modules/discordeno_rest.md) / DiscordAutoModerationActionExecution

# Interface: DiscordAutoModerationActionExecution

[@discordeno/rest](../modules/discordeno_rest.md).DiscordAutoModerationActionExecution

## Table of contents

### Properties

- [action](discordeno_rest.DiscordAutoModerationActionExecution.md#action)
- [alert_system_message_id](discordeno_rest.DiscordAutoModerationActionExecution.md#alert_system_message_id)
- [channel_id](discordeno_rest.DiscordAutoModerationActionExecution.md#channel_id)
- [content](discordeno_rest.DiscordAutoModerationActionExecution.md#content)
- [guild_id](discordeno_rest.DiscordAutoModerationActionExecution.md#guild_id)
- [matched_content](discordeno_rest.DiscordAutoModerationActionExecution.md#matched_content)
- [matched_keyword](discordeno_rest.DiscordAutoModerationActionExecution.md#matched_keyword)
- [message_id](discordeno_rest.DiscordAutoModerationActionExecution.md#message_id)
- [rule_id](discordeno_rest.DiscordAutoModerationActionExecution.md#rule_id)
- [rule_trigger_type](discordeno_rest.DiscordAutoModerationActionExecution.md#rule_trigger_type)
- [user_id](discordeno_rest.DiscordAutoModerationActionExecution.md#user_id)

## Properties

### action

• **action**: [`DiscordAutoModerationAction`](discordeno_rest.DiscordAutoModerationAction.md)

Action which was executed

#### Defined in

packages/types/dist/discord.d.ts:1372

---

### alert_system_message_id

• `Optional` **alert_system_message_id**: `null` \| `string`

The id of any system auto moderation messages posted as a result of this action

#### Defined in

packages/types/dist/discord.d.ts:1380

---

### channel_id

• `Optional` **channel_id**: `null` \| `string`

The id of the channel in which user content was posted

#### Defined in

packages/types/dist/discord.d.ts:1376

---

### content

• **content**: `string`

The content from the user

#### Defined in

packages/types/dist/discord.d.ts:1370

---

### guild_id

• **guild_id**: `string`

The id of the guild

#### Defined in

packages/types/dist/discord.d.ts:1364

---

### matched_content

• **matched_content**: `null` \| `string`

The substring in content that triggered the rule

#### Defined in

packages/types/dist/discord.d.ts:1384

---

### matched_keyword

• **matched_keyword**: `null` \| `string`

The word or phrase that triggerred the rule.

#### Defined in

packages/types/dist/discord.d.ts:1382

---

### message_id

• `Optional` **message_id**: `null` \| `string`

The id of the message. Will not exist if message was blocked by automod or content was not part of any message

#### Defined in

packages/types/dist/discord.d.ts:1378

---

### rule_id

• **rule_id**: `string`

The id of the rule that was executed

#### Defined in

packages/types/dist/discord.d.ts:1366

---

### rule_trigger_type

• **rule_trigger_type**: [`AutoModerationTriggerTypes`](../enums/discordeno_rest.AutoModerationTriggerTypes.md)

The trigger type of the rule that was executed.

#### Defined in

packages/types/dist/discord.d.ts:1374

---

### user_id

• **user_id**: `string`

The id of the user which generated the content which triggered the rule

#### Defined in

packages/types/dist/discord.d.ts:1368
