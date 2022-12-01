[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / CreateContextApplicationCommand

# Interface: CreateContextApplicationCommand

[@discordeno/bot](../modules/discordeno_bot.md).CreateContextApplicationCommand

https://discord.com/developers/docs/interactions/application-commands#endpoints-json-params

## Hierarchy

- `Omit`<[`CreateSlashApplicationCommand`](discordeno_bot.CreateSlashApplicationCommand.md), `"options"` \| `"description"` \| `"descriptionLocalizations"`\>

  ↳ **`CreateContextApplicationCommand`**

## Table of contents

### Properties

- [defaultMemberPermissions](discordeno_bot.CreateContextApplicationCommand.md#defaultmemberpermissions)
- [dmPermission](discordeno_bot.CreateContextApplicationCommand.md#dmpermission)
- [name](discordeno_bot.CreateContextApplicationCommand.md#name)
- [nameLocalizations](discordeno_bot.CreateContextApplicationCommand.md#namelocalizations)
- [type](discordeno_bot.CreateContextApplicationCommand.md#type)

## Properties

### defaultMemberPermissions

• `Optional` **defaultMemberPermissions**: (`"CREATE_INSTANT_INVITE"` \| `"KICK_MEMBERS"` \| `"BAN_MEMBERS"` \| `"ADMINISTRATOR"` \| `"MANAGE_CHANNELS"` \| `"MANAGE_GUILD"` \| `"ADD_REACTIONS"` \| `"VIEW_AUDIT_LOG"` \| `"PRIORITY_SPEAKER"` \| `"STREAM"` \| `"VIEW_CHANNEL"` \| `"SEND_MESSAGES"` \| `"SEND_TTS_MESSAGES"` \| `"MANAGE_MESSAGES"` \| `"EMBED_LINKS"` \| `"ATTACH_FILES"` \| `"READ_MESSAGE_HISTORY"` \| `"MENTION_EVERYONE"` \| `"USE_EXTERNAL_EMOJIS"` \| `"VIEW_GUILD_INSIGHTS"` \| `"CONNECT"` \| `"SPEAK"` \| `"MUTE_MEMBERS"` \| `"DEAFEN_MEMBERS"` \| `"MOVE_MEMBERS"` \| `"USE_VAD"` \| `"CHANGE_NICKNAME"` \| `"MANAGE_NICKNAMES"` \| `"MANAGE_ROLES"` \| `"MANAGE_WEBHOOKS"` \| `"MANAGE_EMOJIS_AND_STICKERS"` \| `"USE_SLASH_COMMANDS"` \| `"REQUEST_TO_SPEAK"` \| `"MANAGE_EVENTS"` \| `"MANAGE_THREADS"` \| `"CREATE_PUBLIC_THREADS"` \| `"CREATE_PRIVATE_THREADS"` \| `"USE_EXTERNAL_STICKERS"` \| `"SEND_MESSAGES_IN_THREADS"` \| `"USE_EMBEDDED_ACTIVITIES"` \| `"MODERATE_MEMBERS"`)[]

Set of permissions represented as a bit set

#### Inherited from

Omit.defaultMemberPermissions

#### Defined in

[packages/bot/src/types.ts:32](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/types.ts#L32)

---

### dmPermission

• `Optional` **dmPermission**: `boolean`

Indicates whether the command is available in DMs with the app, only for globally-scoped commands. By default, commands are visible.

#### Inherited from

Omit.dmPermission

#### Defined in

[packages/bot/src/types.ts:34](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/types.ts#L34)

---

### name

• **name**: `string`

Name of command, 1-32 characters.
`ApplicationCommandTypes.ChatInput` command names must match the following regex `^[-_\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}$` with the unicode flag set.
If there is a lowercase variant of any letters used, you must use those.
Characters with no lowercase variants and/or uncased letters are still allowed.
ApplicationCommandTypes.User`and`ApplicationCommandTypes.Message` commands may be mixed case and can include spaces.

#### Inherited from

Omit.name

#### Defined in

[packages/bot/src/types.ts:20](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/types.ts#L20)

---

### nameLocalizations

• `Optional` **nameLocalizations**: `Partial`<`Record`<[`Locales`](../enums/discordeno_bot.Locales.md), `string`\>\>

Localization object for the `name` field. Values follow the same restrictions as `name`

#### Inherited from

Omit.nameLocalizations

#### Defined in

[packages/bot/src/types.ts:22](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/types.ts#L22)

---

### type

• **type**: [`User`](../enums/discordeno_bot.ApplicationCommandTypes.md#user) \| [`Message`](../enums/discordeno_bot.ApplicationCommandTypes.md#message)

The type of the command

#### Overrides

Omit.type

#### Defined in

[packages/bot/src/types.ts:41](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/types.ts#L41)
