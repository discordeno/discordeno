[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / EditChannelPermissionOverridesOptions

# Interface: EditChannelPermissionOverridesOptions

[@discordeno/bot](../modules/discordeno_bot.md).EditChannelPermissionOverridesOptions

## Hierarchy

- [`OverwriteReadable`](discordeno_bot.OverwriteReadable.md)

- [`WithReason`](discordeno_bot.WithReason.md)

  ↳ **`EditChannelPermissionOverridesOptions`**

## Table of contents

### Properties

- [allow](discordeno_bot.EditChannelPermissionOverridesOptions.md#allow)
- [deny](discordeno_bot.EditChannelPermissionOverridesOptions.md#deny)
- [id](discordeno_bot.EditChannelPermissionOverridesOptions.md#id)
- [reason](discordeno_bot.EditChannelPermissionOverridesOptions.md#reason)
- [type](discordeno_bot.EditChannelPermissionOverridesOptions.md#type)

## Properties

### allow

• `Optional` **allow**: (`"CREATE_INSTANT_INVITE"` \| `"KICK_MEMBERS"` \| `"BAN_MEMBERS"` \| `"ADMINISTRATOR"` \| `"MANAGE_CHANNELS"` \| `"MANAGE_GUILD"` \| `"ADD_REACTIONS"` \| `"VIEW_AUDIT_LOG"` \| `"PRIORITY_SPEAKER"` \| `"STREAM"` \| `"VIEW_CHANNEL"` \| `"SEND_MESSAGES"` \| `"SEND_TTS_MESSAGES"` \| `"MANAGE_MESSAGES"` \| `"EMBED_LINKS"` \| `"ATTACH_FILES"` \| `"READ_MESSAGE_HISTORY"` \| `"MENTION_EVERYONE"` \| `"USE_EXTERNAL_EMOJIS"` \| `"VIEW_GUILD_INSIGHTS"` \| `"CONNECT"` \| `"SPEAK"` \| `"MUTE_MEMBERS"` \| `"DEAFEN_MEMBERS"` \| `"MOVE_MEMBERS"` \| `"USE_VAD"` \| `"CHANGE_NICKNAME"` \| `"MANAGE_NICKNAMES"` \| `"MANAGE_ROLES"` \| `"MANAGE_WEBHOOKS"` \| `"MANAGE_EMOJIS_AND_STICKERS"` \| `"USE_SLASH_COMMANDS"` \| `"REQUEST_TO_SPEAK"` \| `"MANAGE_EVENTS"` \| `"MANAGE_THREADS"` \| `"CREATE_PUBLIC_THREADS"` \| `"CREATE_PRIVATE_THREADS"` \| `"USE_EXTERNAL_STICKERS"` \| `"SEND_MESSAGES_IN_THREADS"` \| `"USE_EMBEDDED_ACTIVITIES"` \| `"MODERATE_MEMBERS"`)[]

Permission bit set

#### Inherited from

[OverwriteReadable](discordeno_bot.OverwriteReadable.md).[allow](discordeno_bot.OverwriteReadable.md#allow)

#### Defined in

packages/types/dist/discordeno.d.ts:185

---

### deny

• `Optional` **deny**: (`"CREATE_INSTANT_INVITE"` \| `"KICK_MEMBERS"` \| `"BAN_MEMBERS"` \| `"ADMINISTRATOR"` \| `"MANAGE_CHANNELS"` \| `"MANAGE_GUILD"` \| `"ADD_REACTIONS"` \| `"VIEW_AUDIT_LOG"` \| `"PRIORITY_SPEAKER"` \| `"STREAM"` \| `"VIEW_CHANNEL"` \| `"SEND_MESSAGES"` \| `"SEND_TTS_MESSAGES"` \| `"MANAGE_MESSAGES"` \| `"EMBED_LINKS"` \| `"ATTACH_FILES"` \| `"READ_MESSAGE_HISTORY"` \| `"MENTION_EVERYONE"` \| `"USE_EXTERNAL_EMOJIS"` \| `"VIEW_GUILD_INSIGHTS"` \| `"CONNECT"` \| `"SPEAK"` \| `"MUTE_MEMBERS"` \| `"DEAFEN_MEMBERS"` \| `"MOVE_MEMBERS"` \| `"USE_VAD"` \| `"CHANGE_NICKNAME"` \| `"MANAGE_NICKNAMES"` \| `"MANAGE_ROLES"` \| `"MANAGE_WEBHOOKS"` \| `"MANAGE_EMOJIS_AND_STICKERS"` \| `"USE_SLASH_COMMANDS"` \| `"REQUEST_TO_SPEAK"` \| `"MANAGE_EVENTS"` \| `"MANAGE_THREADS"` \| `"CREATE_PUBLIC_THREADS"` \| `"CREATE_PRIVATE_THREADS"` \| `"USE_EXTERNAL_STICKERS"` \| `"SEND_MESSAGES_IN_THREADS"` \| `"USE_EMBEDDED_ACTIVITIES"` \| `"MODERATE_MEMBERS"`)[]

Permission bit set

#### Inherited from

[OverwriteReadable](discordeno_bot.OverwriteReadable.md).[deny](discordeno_bot.OverwriteReadable.md#deny)

#### Defined in

packages/types/dist/discordeno.d.ts:187

---

### id

• **id**: `bigint`

Role or user id

#### Inherited from

[OverwriteReadable](discordeno_bot.OverwriteReadable.md).[id](discordeno_bot.OverwriteReadable.md#id)

#### Defined in

packages/types/dist/discordeno.d.ts:181

---

### reason

• `Optional` **reason**: `string`

The reason which should be added in the audit logs for doing this action.

#### Inherited from

[WithReason](discordeno_bot.WithReason.md).[reason](discordeno_bot.WithReason.md#reason)

#### Defined in

packages/types/dist/discordeno.d.ts:177

---

### type

• **type**: `OverwriteTypes`

Either 0 (role) or 1 (member)

#### Inherited from

[OverwriteReadable](discordeno_bot.OverwriteReadable.md).[type](discordeno_bot.OverwriteReadable.md#type)

#### Defined in

packages/types/dist/discordeno.d.ts:183
