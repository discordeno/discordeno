[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / EditGuildRole

# Interface: EditGuildRole

[@discordeno/bot](../modules/discordeno_bot.md).EditGuildRole

## Table of contents

### Properties

- [color](discordeno_bot.EditGuildRole.md#color)
- [hoist](discordeno_bot.EditGuildRole.md#hoist)
- [icon](discordeno_bot.EditGuildRole.md#icon)
- [mentionable](discordeno_bot.EditGuildRole.md#mentionable)
- [name](discordeno_bot.EditGuildRole.md#name)
- [permissions](discordeno_bot.EditGuildRole.md#permissions)
- [unicodeEmoji](discordeno_bot.EditGuildRole.md#unicodeemoji)

## Properties

### color

• `Optional` **color**: `number`

RGB color value, default: 0

#### Defined in

[packages/bot/src/helpers/roles/editRole.ts:46](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/roles/editRole.ts#L46)

---

### hoist

• `Optional` **hoist**: `boolean`

Whether the role should be displayed separately in the sidebar, default: false

#### Defined in

[packages/bot/src/helpers/roles/editRole.ts:48](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/roles/editRole.ts#L48)

---

### icon

• `Optional` **icon**: `string`

the role's icon image (if the guild has the `ROLE_ICONS` feature)

#### Defined in

[packages/bot/src/helpers/roles/editRole.ts:54](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/roles/editRole.ts#L54)

---

### mentionable

• `Optional` **mentionable**: `boolean`

Whether the role should be mentionable, default: false

#### Defined in

[packages/bot/src/helpers/roles/editRole.ts:50](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/roles/editRole.ts#L50)

---

### name

• `Optional` **name**: `string`

Name of the role, max 100 characters, default: "new role"

#### Defined in

[packages/bot/src/helpers/roles/editRole.ts:42](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/roles/editRole.ts#L42)

---

### permissions

• `Optional` **permissions**: (`"CREATE_INSTANT_INVITE"` \| `"KICK_MEMBERS"` \| `"BAN_MEMBERS"` \| `"ADMINISTRATOR"` \| `"MANAGE_CHANNELS"` \| `"MANAGE_GUILD"` \| `"ADD_REACTIONS"` \| `"VIEW_AUDIT_LOG"` \| `"PRIORITY_SPEAKER"` \| `"STREAM"` \| `"VIEW_CHANNEL"` \| `"SEND_MESSAGES"` \| `"SEND_TTS_MESSAGES"` \| `"MANAGE_MESSAGES"` \| `"EMBED_LINKS"` \| `"ATTACH_FILES"` \| `"READ_MESSAGE_HISTORY"` \| `"MENTION_EVERYONE"` \| `"USE_EXTERNAL_EMOJIS"` \| `"VIEW_GUILD_INSIGHTS"` \| `"CONNECT"` \| `"SPEAK"` \| `"MUTE_MEMBERS"` \| `"DEAFEN_MEMBERS"` \| `"MOVE_MEMBERS"` \| `"USE_VAD"` \| `"CHANGE_NICKNAME"` \| `"MANAGE_NICKNAMES"` \| `"MANAGE_ROLES"` \| `"MANAGE_WEBHOOKS"` \| `"MANAGE_EMOJIS_AND_STICKERS"` \| `"USE_SLASH_COMMANDS"` \| `"REQUEST_TO_SPEAK"` \| `"MANAGE_EVENTS"` \| `"MANAGE_THREADS"` \| `"CREATE_PUBLIC_THREADS"` \| `"CREATE_PRIVATE_THREADS"` \| `"USE_EXTERNAL_STICKERS"` \| `"SEND_MESSAGES_IN_THREADS"` \| `"USE_EMBEDDED_ACTIVITIES"` \| `"MODERATE_MEMBERS"`)[]

Bitwise value of the enabled/disabled permissions, default: everyone permissions in guild

#### Defined in

[packages/bot/src/helpers/roles/editRole.ts:44](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/roles/editRole.ts#L44)

---

### unicodeEmoji

• `Optional` **unicodeEmoji**: `string`

The role's unicode emoji (if the guild has the `ROLE_ICONS` feature)

#### Defined in

[packages/bot/src/helpers/roles/editRole.ts:52](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/roles/editRole.ts#L52)
