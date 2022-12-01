[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/rest](../modules/discordeno_rest.md) / DiscordAutoModerationRule

# Interface: DiscordAutoModerationRule

[@discordeno/rest](../modules/discordeno_rest.md).DiscordAutoModerationRule

## Table of contents

### Properties

- [actions](discordeno_rest.DiscordAutoModerationRule.md#actions)
- [creator_id](discordeno_rest.DiscordAutoModerationRule.md#creator_id)
- [enabled](discordeno_rest.DiscordAutoModerationRule.md#enabled)
- [event_type](discordeno_rest.DiscordAutoModerationRule.md#event_type)
- [exempt_channels](discordeno_rest.DiscordAutoModerationRule.md#exempt_channels)
- [exempt_roles](discordeno_rest.DiscordAutoModerationRule.md#exempt_roles)
- [guild_id](discordeno_rest.DiscordAutoModerationRule.md#guild_id)
- [id](discordeno_rest.DiscordAutoModerationRule.md#id)
- [name](discordeno_rest.DiscordAutoModerationRule.md#name)
- [trigger_metadata](discordeno_rest.DiscordAutoModerationRule.md#trigger_metadata)
- [trigger_type](discordeno_rest.DiscordAutoModerationRule.md#trigger_type)

## Properties

### actions

• **actions**: [`DiscordAutoModerationAction`](discordeno_rest.DiscordAutoModerationAction.md)[]

Actions which will execute whenever a rule is triggered.

#### Defined in

packages/types/dist/discord.d.ts:1305

---

### creator_id

• **creator_id**: `string`

The id of the user who created this rule.

#### Defined in

packages/types/dist/discord.d.ts:1297

---

### enabled

• **enabled**: `boolean`

Whether the rule is enabled.

#### Defined in

packages/types/dist/discord.d.ts:1307

---

### event_type

• **event_type**: [`MessageSend`](../enums/discordeno_rest.AutoModerationEventTypes.md#messagesend)

Indicates in what event context a rule should be checked.

#### Defined in

packages/types/dist/discord.d.ts:1299

---

### exempt_channels

• **exempt_channels**: `string`[]

The channel ids that are whitelisted. Max 50.

#### Defined in

packages/types/dist/discord.d.ts:1311

---

### exempt_roles

• **exempt_roles**: `string`[]

The role ids that are whitelisted. Max 20.

#### Defined in

packages/types/dist/discord.d.ts:1309

---

### guild_id

• **guild_id**: `string`

The guild id of the rule

#### Defined in

packages/types/dist/discord.d.ts:1293

---

### id

• **id**: `string`

The id of this rule

#### Defined in

packages/types/dist/discord.d.ts:1291

---

### name

• **name**: `string`

The name of the rule

#### Defined in

packages/types/dist/discord.d.ts:1295

---

### trigger_metadata

• **trigger_metadata**: [`DiscordAutoModerationRuleTriggerMetadata`](discordeno_rest.DiscordAutoModerationRuleTriggerMetadata.md)

The metadata used to determine whether a rule should be triggered.

#### Defined in

packages/types/dist/discord.d.ts:1303

---

### trigger_type

• **trigger_type**: [`AutoModerationTriggerTypes`](../enums/discordeno_rest.AutoModerationTriggerTypes.md)

The type of trigger for this rule

#### Defined in

packages/types/dist/discord.d.ts:1301
