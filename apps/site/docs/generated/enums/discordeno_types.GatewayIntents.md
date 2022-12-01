[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / GatewayIntents

# Enumeration: GatewayIntents

[@discordeno/types](../modules/discordeno_types.md).GatewayIntents

https://discord.com/developers/docs/topics/gateway#list-of-intents

## Table of contents

### Enumeration Members

- [AutoModerationConfiguration](discordeno_types.GatewayIntents.md#automoderationconfiguration)
- [AutoModerationExecution](discordeno_types.GatewayIntents.md#automoderationexecution)
- [DirectMessageReactions](discordeno_types.GatewayIntents.md#directmessagereactions)
- [DirectMessageTyping](discordeno_types.GatewayIntents.md#directmessagetyping)
- [DirectMessages](discordeno_types.GatewayIntents.md#directmessages)
- [GuildBans](discordeno_types.GatewayIntents.md#guildbans)
- [GuildEmojis](discordeno_types.GatewayIntents.md#guildemojis)
- [GuildIntegrations](discordeno_types.GatewayIntents.md#guildintegrations)
- [GuildInvites](discordeno_types.GatewayIntents.md#guildinvites)
- [GuildMembers](discordeno_types.GatewayIntents.md#guildmembers)
- [GuildMessageReactions](discordeno_types.GatewayIntents.md#guildmessagereactions)
- [GuildMessageTyping](discordeno_types.GatewayIntents.md#guildmessagetyping)
- [GuildMessages](discordeno_types.GatewayIntents.md#guildmessages)
- [GuildPresences](discordeno_types.GatewayIntents.md#guildpresences)
- [GuildScheduledEvents](discordeno_types.GatewayIntents.md#guildscheduledevents)
- [GuildVoiceStates](discordeno_types.GatewayIntents.md#guildvoicestates)
- [GuildWebhooks](discordeno_types.GatewayIntents.md#guildwebhooks)
- [Guilds](discordeno_types.GatewayIntents.md#guilds)
- [MessageContent](discordeno_types.GatewayIntents.md#messagecontent)

## Enumeration Members

### AutoModerationConfiguration

• **AutoModerationConfiguration** = `1048576`

- AUTO_MODERATION_RULE_CREATE
- AUTO_MODERATION_RULE_UPDATE
- AUTO_MODERATION_RULE_DELETE

#### Defined in

[packages/types/src/shared.ts:1221](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1221)

---

### AutoModerationExecution

• **AutoModerationExecution** = `2097152`

- AUTO_MODERATION_ACTION_EXECUTION

#### Defined in

[packages/types/src/shared.ts:1225](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1225)

---

### DirectMessageReactions

• **DirectMessageReactions** = `8192`

- MESSAGE_REACTION_ADD
- MESSAGE_REACTION_REMOVE
- MESSAGE_REACTION_REMOVE_ALL
- MESSAGE_REACTION_REMOVE_EMOJI

#### Defined in

[packages/types/src/shared.ts:1197](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1197)

---

### DirectMessageTyping

• **DirectMessageTyping** = `16384`

- TYPING_START

#### Defined in

[packages/types/src/shared.ts:1201](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1201)

---

### DirectMessages

• **DirectMessages** = `4096`

- CHANNEL_CREATE
- MESSAGE_CREATE
- MESSAGE_UPDATE
- MESSAGE_DELETE
- CHANNEL_PINS_UPDATE

#### Defined in

[packages/types/src/shared.ts:1190](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1190)

---

### GuildBans

• **GuildBans** = `4`

- GUILD_BAN_ADD
- GUILD_BAN_REMOVE

#### Defined in

[packages/types/src/shared.ts:1137](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1137)

---

### GuildEmojis

• **GuildEmojis** = `8`

- GUILD_EMOJIS_UPDATE

#### Defined in

[packages/types/src/shared.ts:1141](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1141)

---

### GuildIntegrations

• **GuildIntegrations** = `16`

- GUILD_INTEGRATIONS_UPDATE
- INTEGRATION_CREATE
- INTEGRATION_UPDATE
- INTEGRATION_DELETE

#### Defined in

[packages/types/src/shared.ts:1148](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1148)

---

### GuildInvites

• **GuildInvites** = `64`

- INVITE_CREATE
- INVITE_DELETE

#### Defined in

[packages/types/src/shared.ts:1157](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1157)

---

### GuildMembers

• **GuildMembers** = `2`

- GUILD_MEMBER_ADD
- GUILD_MEMBER_UPDATE
- GUILD_MEMBER_REMOVE

#### Defined in

[packages/types/src/shared.ts:1132](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1132)

---

### GuildMessageReactions

• **GuildMessageReactions** = `1024`

- MESSAGE_REACTION_ADD
- MESSAGE_REACTION_REMOVE
- MESSAGE_REACTION_REMOVE_ALL
- MESSAGE_REACTION_REMOVE_EMOJI

#### Defined in

[packages/types/src/shared.ts:1178](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1178)

---

### GuildMessageTyping

• **GuildMessageTyping** = `2048`

- TYPING_START

#### Defined in

[packages/types/src/shared.ts:1182](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1182)

---

### GuildMessages

• **GuildMessages** = `512`

- MESSAGE_CREATE
- MESSAGE_UPDATE
- MESSAGE_DELETE

#### Defined in

[packages/types/src/shared.ts:1171](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1171)

---

### GuildPresences

• **GuildPresences** = `256`

- PRESENCE_UPDATE

#### Defined in

[packages/types/src/shared.ts:1165](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1165)

---

### GuildScheduledEvents

• **GuildScheduledEvents** = `65536`

- GUILD_SCHEDULED_EVENT_CREATE
- GUILD_SCHEDULED_EVENT_UPDATE
- GUILD_SCHEDULED_EVENT_DELETE
- GUILD_SCHEDULED_EVENT_USER_ADD this is experimental and unstable.
- GUILD_SCHEDULED_EVENT_USER_REMOVE this is experimental and unstable.

#### Defined in

[packages/types/src/shared.ts:1214](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1214)

---

### GuildVoiceStates

• **GuildVoiceStates** = `128`

- VOICE_STATE_UPDATE

#### Defined in

[packages/types/src/shared.ts:1161](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1161)

---

### GuildWebhooks

• **GuildWebhooks** = `32`

Enables the following events:

- WEBHOOKS_UPDATE

#### Defined in

[packages/types/src/shared.ts:1152](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1152)

---

### Guilds

• **Guilds** = `1`

- GUILD_CREATE
- GUILD_DELETE
- GUILD_ROLE_CREATE
- GUILD_ROLE_UPDATE
- GUILD_ROLE_DELETE
- CHANNEL_CREATE
- CHANNEL_UPDATE
- CHANNEL_DELETE
- CHANNEL_PINS_UPDATE
- THREAD_CREATE
- THREAD_UPDATE
- THREAD_DELETE
- THREAD_LIST_SYNC
- THREAD_MEMBER_UPDATE
- THREAD_MEMBERS_UPDATE
- STAGE_INSTANCE_CREATE
- STAGE_INSTANCE_UPDATE
- STAGE_INSTANCE_DELETE

#### Defined in

[packages/types/src/shared.ts:1126](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1126)

---

### MessageContent

• **MessageContent** = `32768`

This intent will add `content` values to all message objects.

#### Defined in

[packages/types/src/shared.ts:1206](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1206)
