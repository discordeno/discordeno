[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / OverwriteReadable

# Interface: OverwriteReadable

[@discordeno/types](../modules/discordeno_types.md).OverwriteReadable

## Table of contents

### Properties

- [allow](discordeno_types.OverwriteReadable.md#allow)
- [deny](discordeno_types.OverwriteReadable.md#deny)
- [id](discordeno_types.OverwriteReadable.md#id)
- [type](discordeno_types.OverwriteReadable.md#type)

## Properties

### allow

• `Optional` **allow**: (`"CREATE_INSTANT_INVITE"` \| `"KICK_MEMBERS"` \| `"BAN_MEMBERS"` \| `"ADMINISTRATOR"` \| `"MANAGE_CHANNELS"` \| `"MANAGE_GUILD"` \| `"ADD_REACTIONS"` \| `"VIEW_AUDIT_LOG"` \| `"PRIORITY_SPEAKER"` \| `"STREAM"` \| `"VIEW_CHANNEL"` \| `"SEND_MESSAGES"` \| `"SEND_TTS_MESSAGES"` \| `"MANAGE_MESSAGES"` \| `"EMBED_LINKS"` \| `"ATTACH_FILES"` \| `"READ_MESSAGE_HISTORY"` \| `"MENTION_EVERYONE"` \| `"USE_EXTERNAL_EMOJIS"` \| `"VIEW_GUILD_INSIGHTS"` \| `"CONNECT"` \| `"SPEAK"` \| `"MUTE_MEMBERS"` \| `"DEAFEN_MEMBERS"` \| `"MOVE_MEMBERS"` \| `"USE_VAD"` \| `"CHANGE_NICKNAME"` \| `"MANAGE_NICKNAMES"` \| `"MANAGE_ROLES"` \| `"MANAGE_WEBHOOKS"` \| `"MANAGE_EMOJIS_AND_STICKERS"` \| `"USE_SLASH_COMMANDS"` \| `"REQUEST_TO_SPEAK"` \| `"MANAGE_EVENTS"` \| `"MANAGE_THREADS"` \| `"CREATE_PUBLIC_THREADS"` \| `"CREATE_PRIVATE_THREADS"` \| `"USE_EXTERNAL_STICKERS"` \| `"SEND_MESSAGES_IN_THREADS"` \| `"USE_EMBEDDED_ACTIVITIES"` \| `"MODERATE_MEMBERS"`)[]

Permission bit set

#### Defined in

[packages/types/src/discordeno.ts:217](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L217)

---

### deny

• `Optional` **deny**: (`"CREATE_INSTANT_INVITE"` \| `"KICK_MEMBERS"` \| `"BAN_MEMBERS"` \| `"ADMINISTRATOR"` \| `"MANAGE_CHANNELS"` \| `"MANAGE_GUILD"` \| `"ADD_REACTIONS"` \| `"VIEW_AUDIT_LOG"` \| `"PRIORITY_SPEAKER"` \| `"STREAM"` \| `"VIEW_CHANNEL"` \| `"SEND_MESSAGES"` \| `"SEND_TTS_MESSAGES"` \| `"MANAGE_MESSAGES"` \| `"EMBED_LINKS"` \| `"ATTACH_FILES"` \| `"READ_MESSAGE_HISTORY"` \| `"MENTION_EVERYONE"` \| `"USE_EXTERNAL_EMOJIS"` \| `"VIEW_GUILD_INSIGHTS"` \| `"CONNECT"` \| `"SPEAK"` \| `"MUTE_MEMBERS"` \| `"DEAFEN_MEMBERS"` \| `"MOVE_MEMBERS"` \| `"USE_VAD"` \| `"CHANGE_NICKNAME"` \| `"MANAGE_NICKNAMES"` \| `"MANAGE_ROLES"` \| `"MANAGE_WEBHOOKS"` \| `"MANAGE_EMOJIS_AND_STICKERS"` \| `"USE_SLASH_COMMANDS"` \| `"REQUEST_TO_SPEAK"` \| `"MANAGE_EVENTS"` \| `"MANAGE_THREADS"` \| `"CREATE_PUBLIC_THREADS"` \| `"CREATE_PRIVATE_THREADS"` \| `"USE_EXTERNAL_STICKERS"` \| `"SEND_MESSAGES_IN_THREADS"` \| `"USE_EMBEDDED_ACTIVITIES"` \| `"MODERATE_MEMBERS"`)[]

Permission bit set

#### Defined in

[packages/types/src/discordeno.ts:219](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L219)

---

### id

• **id**: `bigint`

Role or user id

#### Defined in

[packages/types/src/discordeno.ts:213](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L213)

---

### type

• **type**: [`OverwriteTypes`](../enums/discordeno_types.OverwriteTypes.md)

Either 0 (role) or 1 (member)

#### Defined in

[packages/types/src/discordeno.ts:215](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L215)
