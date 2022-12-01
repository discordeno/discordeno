[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / CreateSlashApplicationCommand

# Interface: CreateSlashApplicationCommand

[@discordeno/bot](../modules/discordeno_bot.md).CreateSlashApplicationCommand

https://discord.com/developers/docs/interactions/application-commands#endpoints-json-params

## Table of contents

### Properties

- [defaultMemberPermissions](discordeno_bot.CreateSlashApplicationCommand.md#defaultmemberpermissions)
- [description](discordeno_bot.CreateSlashApplicationCommand.md#description)
- [descriptionLocalizations](discordeno_bot.CreateSlashApplicationCommand.md#descriptionlocalizations)
- [dmPermission](discordeno_bot.CreateSlashApplicationCommand.md#dmpermission)
- [name](discordeno_bot.CreateSlashApplicationCommand.md#name)
- [nameLocalizations](discordeno_bot.CreateSlashApplicationCommand.md#namelocalizations)
- [options](discordeno_bot.CreateSlashApplicationCommand.md#options)
- [type](discordeno_bot.CreateSlashApplicationCommand.md#type)

## Properties

### defaultMemberPermissions

• `Optional` **defaultMemberPermissions**: (`"CREATE_INSTANT_INVITE"` \| `"KICK_MEMBERS"` \| `"BAN_MEMBERS"` \| `"ADMINISTRATOR"` \| `"MANAGE_CHANNELS"` \| `"MANAGE_GUILD"` \| `"ADD_REACTIONS"` \| `"VIEW_AUDIT_LOG"` \| `"PRIORITY_SPEAKER"` \| `"STREAM"` \| `"VIEW_CHANNEL"` \| `"SEND_MESSAGES"` \| `"SEND_TTS_MESSAGES"` \| `"MANAGE_MESSAGES"` \| `"EMBED_LINKS"` \| `"ATTACH_FILES"` \| `"READ_MESSAGE_HISTORY"` \| `"MENTION_EVERYONE"` \| `"USE_EXTERNAL_EMOJIS"` \| `"VIEW_GUILD_INSIGHTS"` \| `"CONNECT"` \| `"SPEAK"` \| `"MUTE_MEMBERS"` \| `"DEAFEN_MEMBERS"` \| `"MOVE_MEMBERS"` \| `"USE_VAD"` \| `"CHANGE_NICKNAME"` \| `"MANAGE_NICKNAMES"` \| `"MANAGE_ROLES"` \| `"MANAGE_WEBHOOKS"` \| `"MANAGE_EMOJIS_AND_STICKERS"` \| `"USE_SLASH_COMMANDS"` \| `"REQUEST_TO_SPEAK"` \| `"MANAGE_EVENTS"` \| `"MANAGE_THREADS"` \| `"CREATE_PUBLIC_THREADS"` \| `"CREATE_PRIVATE_THREADS"` \| `"USE_EXTERNAL_STICKERS"` \| `"SEND_MESSAGES_IN_THREADS"` \| `"USE_EMBEDDED_ACTIVITIES"` \| `"MODERATE_MEMBERS"`)[]

Set of permissions represented as a bit set

#### Defined in

[packages/bot/src/types.ts:32](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/types.ts#L32)

---

### description

• **description**: `string`

1-100 character description

#### Defined in

[packages/bot/src/types.ts:24](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/types.ts#L24)

---

### descriptionLocalizations

• `Optional` **descriptionLocalizations**: `Partial`<`Record`<[`Locales`](../enums/discordeno_bot.Locales.md), `string`\>\>

Localization object for the `description` field. Values follow the same restrictions as `description`

#### Defined in

[packages/bot/src/types.ts:26](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/types.ts#L26)

---

### dmPermission

• `Optional` **dmPermission**: `boolean`

Indicates whether the command is available in DMs with the app, only for globally-scoped commands. By default, commands are visible.

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

#### Defined in

[packages/bot/src/types.ts:20](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/types.ts#L20)

---

### nameLocalizations

• `Optional` **nameLocalizations**: `Partial`<`Record`<[`Locales`](../enums/discordeno_bot.Locales.md), `string`\>\>

Localization object for the `name` field. Values follow the same restrictions as `name`

#### Defined in

[packages/bot/src/types.ts:22](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/types.ts#L22)

---

### options

• `Optional` **options**: [`ApplicationCommandOption`](discordeno_bot.ApplicationCommandOption.md)[]

Parameters for the command

#### Defined in

[packages/bot/src/types.ts:30](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/types.ts#L30)

---

### type

• `Optional` **type**: [`ApplicationCommandTypes`](../enums/discordeno_bot.ApplicationCommandTypes.md)

Type of command, defaults `ApplicationCommandTypes.ChatInput` if not set

#### Defined in

[packages/bot/src/types.ts:28](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/types.ts#L28)
