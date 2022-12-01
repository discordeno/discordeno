[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / GatewayIntents

# Enumeration: GatewayIntents

[@discordeno/bot](../modules/discordeno_bot.md).GatewayIntents

https://discord.com/developers/docs/topics/gateway#list-of-intents

## Table of contents

### Enumeration Members

- [AutoModerationConfiguration](discordeno_bot.GatewayIntents.md#automoderationconfiguration)
- [AutoModerationExecution](discordeno_bot.GatewayIntents.md#automoderationexecution)
- [DirectMessageReactions](discordeno_bot.GatewayIntents.md#directmessagereactions)
- [DirectMessageTyping](discordeno_bot.GatewayIntents.md#directmessagetyping)
- [DirectMessages](discordeno_bot.GatewayIntents.md#directmessages)
- [GuildBans](discordeno_bot.GatewayIntents.md#guildbans)
- [GuildEmojis](discordeno_bot.GatewayIntents.md#guildemojis)
- [GuildIntegrations](discordeno_bot.GatewayIntents.md#guildintegrations)
- [GuildInvites](discordeno_bot.GatewayIntents.md#guildinvites)
- [GuildMembers](discordeno_bot.GatewayIntents.md#guildmembers)
- [GuildMessageReactions](discordeno_bot.GatewayIntents.md#guildmessagereactions)
- [GuildMessageTyping](discordeno_bot.GatewayIntents.md#guildmessagetyping)
- [GuildMessages](discordeno_bot.GatewayIntents.md#guildmessages)
- [GuildPresences](discordeno_bot.GatewayIntents.md#guildpresences)
- [GuildScheduledEvents](discordeno_bot.GatewayIntents.md#guildscheduledevents)
- [GuildVoiceStates](discordeno_bot.GatewayIntents.md#guildvoicestates)
- [GuildWebhooks](discordeno_bot.GatewayIntents.md#guildwebhooks)
- [Guilds](discordeno_bot.GatewayIntents.md#guilds)
- [MessageContent](discordeno_bot.GatewayIntents.md#messagecontent)

## Enumeration Members

### AutoModerationConfiguration

• **AutoModerationConfiguration** = `1048576`

- AUTO_MODERATION_RULE_CREATE
- AUTO_MODERATION_RULE_UPDATE
- AUTO_MODERATION_RULE_DELETE

#### Defined in

packages/types/dist/shared.d.ts:1105

---

### AutoModerationExecution

• **AutoModerationExecution** = `2097152`

- AUTO_MODERATION_ACTION_EXECUTION

#### Defined in

packages/types/dist/shared.d.ts:1109

---

### DirectMessageReactions

• **DirectMessageReactions** = `8192`

- MESSAGE_REACTION_ADD
- MESSAGE_REACTION_REMOVE
- MESSAGE_REACTION_REMOVE_ALL
- MESSAGE_REACTION_REMOVE_EMOJI

#### Defined in

packages/types/dist/shared.d.ts:1083

---

### DirectMessageTyping

• **DirectMessageTyping** = `16384`

- TYPING_START

#### Defined in

packages/types/dist/shared.d.ts:1087

---

### DirectMessages

• **DirectMessages** = `4096`

- CHANNEL_CREATE
- MESSAGE_CREATE
- MESSAGE_UPDATE
- MESSAGE_DELETE
- CHANNEL_PINS_UPDATE

#### Defined in

packages/types/dist/shared.d.ts:1076

---

### GuildBans

• **GuildBans** = `4`

- GUILD_BAN_ADD
- GUILD_BAN_REMOVE

#### Defined in

packages/types/dist/shared.d.ts:1023

---

### GuildEmojis

• **GuildEmojis** = `8`

- GUILD_EMOJIS_UPDATE

#### Defined in

packages/types/dist/shared.d.ts:1027

---

### GuildIntegrations

• **GuildIntegrations** = `16`

- GUILD_INTEGRATIONS_UPDATE
- INTEGRATION_CREATE
- INTEGRATION_UPDATE
- INTEGRATION_DELETE

#### Defined in

packages/types/dist/shared.d.ts:1034

---

### GuildInvites

• **GuildInvites** = `64`

- INVITE_CREATE
- INVITE_DELETE

#### Defined in

packages/types/dist/shared.d.ts:1043

---

### GuildMembers

• **GuildMembers** = `2`

- GUILD_MEMBER_ADD
- GUILD_MEMBER_UPDATE
- GUILD_MEMBER_REMOVE

#### Defined in

packages/types/dist/shared.d.ts:1018

---

### GuildMessageReactions

• **GuildMessageReactions** = `1024`

- MESSAGE_REACTION_ADD
- MESSAGE_REACTION_REMOVE
- MESSAGE_REACTION_REMOVE_ALL
- MESSAGE_REACTION_REMOVE_EMOJI

#### Defined in

packages/types/dist/shared.d.ts:1064

---

### GuildMessageTyping

• **GuildMessageTyping** = `2048`

- TYPING_START

#### Defined in

packages/types/dist/shared.d.ts:1068

---

### GuildMessages

• **GuildMessages** = `512`

- MESSAGE_CREATE
- MESSAGE_UPDATE
- MESSAGE_DELETE

#### Defined in

packages/types/dist/shared.d.ts:1057

---

### GuildPresences

• **GuildPresences** = `256`

- PRESENCE_UPDATE

#### Defined in

packages/types/dist/shared.d.ts:1051

---

### GuildScheduledEvents

• **GuildScheduledEvents** = `65536`

- GUILD_SCHEDULED_EVENT_CREATE
- GUILD_SCHEDULED_EVENT_UPDATE
- GUILD_SCHEDULED_EVENT_DELETE
- GUILD_SCHEDULED_EVENT_USER_ADD this is experimental and unstable.
- GUILD_SCHEDULED_EVENT_USER_REMOVE this is experimental and unstable.

#### Defined in

packages/types/dist/shared.d.ts:1099

---

### GuildVoiceStates

• **GuildVoiceStates** = `128`

- VOICE_STATE_UPDATE

#### Defined in

packages/types/dist/shared.d.ts:1047

---

### GuildWebhooks

• **GuildWebhooks** = `32`

Enables the following events:

- WEBHOOKS_UPDATE

#### Defined in

packages/types/dist/shared.d.ts:1038

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

packages/types/dist/shared.d.ts:1012

---

### MessageContent

• **MessageContent** = `32768`

This intent will add `content` values to all message objects.

#### Defined in

packages/types/dist/shared.d.ts:1091
