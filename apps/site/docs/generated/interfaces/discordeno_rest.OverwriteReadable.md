[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/rest](../modules/discordeno_rest.md) / OverwriteReadable

# Interface: OverwriteReadable

[@discordeno/rest](../modules/discordeno_rest.md).OverwriteReadable

## Table of contents

### Properties

- [allow](discordeno_rest.OverwriteReadable.md#allow)
- [deny](discordeno_rest.OverwriteReadable.md#deny)
- [id](discordeno_rest.OverwriteReadable.md#id)
- [type](discordeno_rest.OverwriteReadable.md#type)

## Properties

### allow

• `Optional` **allow**: (`"CREATE_INSTANT_INVITE"` \| `"KICK_MEMBERS"` \| `"BAN_MEMBERS"` \| `"ADMINISTRATOR"` \| `"MANAGE_CHANNELS"` \| `"MANAGE_GUILD"` \| `"ADD_REACTIONS"` \| `"VIEW_AUDIT_LOG"` \| `"PRIORITY_SPEAKER"` \| `"STREAM"` \| `"VIEW_CHANNEL"` \| `"SEND_MESSAGES"` \| `"SEND_TTS_MESSAGES"` \| `"MANAGE_MESSAGES"` \| `"EMBED_LINKS"` \| `"ATTACH_FILES"` \| `"READ_MESSAGE_HISTORY"` \| `"MENTION_EVERYONE"` \| `"USE_EXTERNAL_EMOJIS"` \| `"VIEW_GUILD_INSIGHTS"` \| `"CONNECT"` \| `"SPEAK"` \| `"MUTE_MEMBERS"` \| `"DEAFEN_MEMBERS"` \| `"MOVE_MEMBERS"` \| `"USE_VAD"` \| `"CHANGE_NICKNAME"` \| `"MANAGE_NICKNAMES"` \| `"MANAGE_ROLES"` \| `"MANAGE_WEBHOOKS"` \| `"MANAGE_EMOJIS_AND_STICKERS"` \| `"USE_SLASH_COMMANDS"` \| `"REQUEST_TO_SPEAK"` \| `"MANAGE_EVENTS"` \| `"MANAGE_THREADS"` \| `"CREATE_PUBLIC_THREADS"` \| `"CREATE_PRIVATE_THREADS"` \| `"USE_EXTERNAL_STICKERS"` \| `"SEND_MESSAGES_IN_THREADS"` \| `"USE_EMBEDDED_ACTIVITIES"` \| `"MODERATE_MEMBERS"`)[]

Permission bit set

#### Defined in

packages/types/dist/discordeno.d.ts:185

---

### deny

• `Optional` **deny**: (`"CREATE_INSTANT_INVITE"` \| `"KICK_MEMBERS"` \| `"BAN_MEMBERS"` \| `"ADMINISTRATOR"` \| `"MANAGE_CHANNELS"` \| `"MANAGE_GUILD"` \| `"ADD_REACTIONS"` \| `"VIEW_AUDIT_LOG"` \| `"PRIORITY_SPEAKER"` \| `"STREAM"` \| `"VIEW_CHANNEL"` \| `"SEND_MESSAGES"` \| `"SEND_TTS_MESSAGES"` \| `"MANAGE_MESSAGES"` \| `"EMBED_LINKS"` \| `"ATTACH_FILES"` \| `"READ_MESSAGE_HISTORY"` \| `"MENTION_EVERYONE"` \| `"USE_EXTERNAL_EMOJIS"` \| `"VIEW_GUILD_INSIGHTS"` \| `"CONNECT"` \| `"SPEAK"` \| `"MUTE_MEMBERS"` \| `"DEAFEN_MEMBERS"` \| `"MOVE_MEMBERS"` \| `"USE_VAD"` \| `"CHANGE_NICKNAME"` \| `"MANAGE_NICKNAMES"` \| `"MANAGE_ROLES"` \| `"MANAGE_WEBHOOKS"` \| `"MANAGE_EMOJIS_AND_STICKERS"` \| `"USE_SLASH_COMMANDS"` \| `"REQUEST_TO_SPEAK"` \| `"MANAGE_EVENTS"` \| `"MANAGE_THREADS"` \| `"CREATE_PUBLIC_THREADS"` \| `"CREATE_PRIVATE_THREADS"` \| `"USE_EXTERNAL_STICKERS"` \| `"SEND_MESSAGES_IN_THREADS"` \| `"USE_EMBEDDED_ACTIVITIES"` \| `"MODERATE_MEMBERS"`)[]

Permission bit set

#### Defined in

packages/types/dist/discordeno.d.ts:187

---

### id

• **id**: `bigint`

Role or user id

#### Defined in

packages/types/dist/discordeno.d.ts:181

---

### type

• **type**: `OverwriteTypes`

Either 0 (role) or 1 (member)

#### Defined in

packages/types/dist/discordeno.d.ts:183
