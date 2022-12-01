[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / AuditLogEntry

# Interface: AuditLogEntry

[@discordeno/bot](../modules/discordeno_bot.md).AuditLogEntry

## Hierarchy

- `ReturnType`<typeof `transformAuditLogEntry`\>

  ↳ **`AuditLogEntry`**

## Table of contents

### Properties

- [actionType](discordeno_bot.AuditLogEntry.md#actiontype)
- [changes](discordeno_bot.AuditLogEntry.md#changes)
- [id](discordeno_bot.AuditLogEntry.md#id)
- [options](discordeno_bot.AuditLogEntry.md#options)
- [reason](discordeno_bot.AuditLogEntry.md#reason)
- [targetId](discordeno_bot.AuditLogEntry.md#targetid)
- [userId](discordeno_bot.AuditLogEntry.md#userid)

## Properties

### actionType

• **actionType**: [`AuditLogEvents`](../enums/discordeno_bot.AuditLogEvents.md)

#### Inherited from

ReturnType.actionType

---

### changes

• **changes**: `undefined` \| { `key`: `"auto_archive_duration"` \| `"archived"` \| `"locked"` \| `"invitable"` \| `"type"` \| `"position"` \| `"name"` \| `"topic"` \| `"nsfw"` \| `"bitrate"` \| `"id"` \| `"permissions"` \| `"description"` \| `"deaf"` \| `"mute"` \| `"nick"` \| `"communication_disabled_until"` \| `"channel_id"` \| `"discovery_splash_hash"` \| `"banner_hash"` \| `"preferred_locale"` \| `"rules_channel_id"` \| `"public_updates_channel_id"` \| `"icon_hash"` \| `"image_hash"` \| `"splash_hash"` \| `"owner_id"` \| `"region"` \| `"afk_channel_id"` \| `"vanity_url_code"` \| `"widget_channel_id"` \| `"system_channel_id"` \| `"application_id"` \| `"allow"` \| `"deny"` \| `"code"` \| `"inviter_id"` \| `"avatar_hash"` \| `"location"` \| `"command_id"` \| `"afk_timeout"` \| `"mfa_level"` \| `"verification_level"` \| `"explicit_content_filter"` \| `"default_message_notifications"` \| `"prune_delete_days"` \| `"rate_limit_per_user"` \| `"color"` \| `"max_uses"` \| `"uses"` \| `"max_age"` \| `"expire_behavior"` \| `"expire_grace_period"` \| `"user_limit"` \| `"privacy_level"` \| `"default_auto_archive_duration"` \| `"entity_type"` \| `"status"` \| `"$add"` \| `"$remove"` \| `"widget_enabled"` \| `"hoist"` \| `"mentionable"` \| `"temporary"` \| `"enable_emoticons"` \| `"permission_overwrites"` ; `new`: `undefined` \| `string` \| `number` \| `bigint` \| `boolean` \| { allow?: string \| undefined; deny?: string \| undefined; type: OverwriteTypes; id: string; }[] \| { name?: string \| undefined; id?: bigint \| undefined; }[] ; `old`: `undefined` \| `string` \| `number` \| `bigint` \| `boolean` \| { allow?: string \| undefined; deny?: string \| undefined; type: OverwriteTypes; id: string; }[] \| { name?: string \| undefined; id?: bigint \| undefined; }[] }[]

#### Inherited from

ReturnType.changes

---

### id

• **id**: `bigint`

#### Inherited from

ReturnType.id

---

### options

• **options**: `undefined` \| { `channelId`: `undefined` \| `bigint` ; `count`: `number` ; `deleteMemberDays`: `number` ; `id`: `undefined` \| `bigint` ; `membersRemoved`: `number` ; `messageId`: `undefined` \| `bigint` ; `roleName`: `string` ; `type`: `number` }

#### Inherited from

ReturnType.options

---

### reason

• **reason**: `undefined` \| `string`

#### Inherited from

ReturnType.reason

---

### targetId

• **targetId**: `undefined` \| `bigint`

#### Inherited from

ReturnType.targetId

---

### userId

• **userId**: `undefined` \| `bigint`

#### Inherited from

ReturnType.userId
