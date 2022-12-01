[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordAutoModerationRule

# Interface: DiscordAutoModerationRule

[@discordeno/types](../modules/discordeno_types.md).DiscordAutoModerationRule

## Table of contents

### Properties

- [actions](discordeno_types.DiscordAutoModerationRule.md#actions)
- [creator_id](discordeno_types.DiscordAutoModerationRule.md#creator_id)
- [enabled](discordeno_types.DiscordAutoModerationRule.md#enabled)
- [event_type](discordeno_types.DiscordAutoModerationRule.md#event_type)
- [exempt_channels](discordeno_types.DiscordAutoModerationRule.md#exempt_channels)
- [exempt_roles](discordeno_types.DiscordAutoModerationRule.md#exempt_roles)
- [guild_id](discordeno_types.DiscordAutoModerationRule.md#guild_id)
- [id](discordeno_types.DiscordAutoModerationRule.md#id)
- [name](discordeno_types.DiscordAutoModerationRule.md#name)
- [trigger_metadata](discordeno_types.DiscordAutoModerationRule.md#trigger_metadata)
- [trigger_type](discordeno_types.DiscordAutoModerationRule.md#trigger_type)

## Properties

### actions

• **actions**: [`DiscordAutoModerationAction`](discordeno_types.DiscordAutoModerationAction.md)[]

Actions which will execute whenever a rule is triggered.

#### Defined in

[packages/types/src/discord.ts:1463](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1463)

---

### creator_id

• **creator_id**: `string`

The id of the user who created this rule.

#### Defined in

[packages/types/src/discord.ts:1455](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1455)

---

### enabled

• **enabled**: `boolean`

Whether the rule is enabled.

#### Defined in

[packages/types/src/discord.ts:1465](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1465)

---

### event_type

• **event_type**: [`MessageSend`](../enums/discordeno_types.AutoModerationEventTypes.md#messagesend)

Indicates in what event context a rule should be checked.

#### Defined in

[packages/types/src/discord.ts:1457](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1457)

---

### exempt_channels

• **exempt_channels**: `string`[]

The channel ids that are whitelisted. Max 50.

#### Defined in

[packages/types/src/discord.ts:1469](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1469)

---

### exempt_roles

• **exempt_roles**: `string`[]

The role ids that are whitelisted. Max 20.

#### Defined in

[packages/types/src/discord.ts:1467](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1467)

---

### guild_id

• **guild_id**: `string`

The guild id of the rule

#### Defined in

[packages/types/src/discord.ts:1451](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1451)

---

### id

• **id**: `string`

The id of this rule

#### Defined in

[packages/types/src/discord.ts:1449](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1449)

---

### name

• **name**: `string`

The name of the rule

#### Defined in

[packages/types/src/discord.ts:1453](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1453)

---

### trigger_metadata

• **trigger_metadata**: [`DiscordAutoModerationRuleTriggerMetadata`](discordeno_types.DiscordAutoModerationRuleTriggerMetadata.md)

The metadata used to determine whether a rule should be triggered.

#### Defined in

[packages/types/src/discord.ts:1461](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1461)

---

### trigger_type

• **trigger_type**: [`AutoModerationTriggerTypes`](../enums/discordeno_types.AutoModerationTriggerTypes.md)

The type of trigger for this rule

#### Defined in

[packages/types/src/discord.ts:1459](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1459)
