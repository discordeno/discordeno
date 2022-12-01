[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / Message

# Interface: Message

[@discordeno/bot](../modules/discordeno_bot.md).Message

## Hierarchy

- `ReturnType`<typeof [`transformMessage`](../modules/discordeno_bot.md#transformmessage)\>

  ↳ **`Message`**

## Table of contents

### Properties

- [activity](discordeno_bot.Message.md#activity)
- [application](discordeno_bot.Message.md#application)
- [applicationId](discordeno_bot.Message.md#applicationid)
- [attachments](discordeno_bot.Message.md#attachments)
- [authorId](discordeno_bot.Message.md#authorid)
- [bitfield](discordeno_bot.Message.md#bitfield)
- [channelId](discordeno_bot.Message.md#channelid)
- [components](discordeno_bot.Message.md#components)
- [content](discordeno_bot.Message.md#content)
- [editedTimestamp](discordeno_bot.Message.md#editedtimestamp)
- [embeds](discordeno_bot.Message.md#embeds)
- [flags](discordeno_bot.Message.md#flags)
- [guildId](discordeno_bot.Message.md#guildid)
- [id](discordeno_bot.Message.md#id)
- [interaction](discordeno_bot.Message.md#interaction)
- [isFromBot](discordeno_bot.Message.md#isfrombot)
- [member](discordeno_bot.Message.md#member)
- [mentionedChannelIds](discordeno_bot.Message.md#mentionedchannelids)
- [mentionedRoleIds](discordeno_bot.Message.md#mentionedroleids)
- [mentionedUserIds](discordeno_bot.Message.md#mentioneduserids)
- [messageReference](discordeno_bot.Message.md#messagereference)
- [nonce](discordeno_bot.Message.md#nonce)
- [reactions](discordeno_bot.Message.md#reactions)
- [stickerItems](discordeno_bot.Message.md#stickeritems)
- [tag](discordeno_bot.Message.md#tag)
- [thread](discordeno_bot.Message.md#thread)
- [timestamp](discordeno_bot.Message.md#timestamp)
- [type](discordeno_bot.Message.md#type)
- [webhookId](discordeno_bot.Message.md#webhookid)

## Properties

### activity

• **activity**: `undefined` \| { `partyId`: `undefined` \| `string` ; `type`: [`MessageActivityTypes`](../enums/discordeno_bot.MessageActivityTypes.md) }

#### Inherited from

ReturnType.activity

---

### application

• **application**: `undefined` \| { `bot_public`: `undefined` \| `boolean` ; `bot_require_code_grant`: `undefined` \| `boolean` ; `cover_image`: `undefined` \| `string` ; `custom_install_url`: `undefined` \| `string` ; `description`: `undefined` \| `string` ; `flags`: `undefined` \| [`ApplicationFlags`](../enums/discordeno_bot.ApplicationFlags.md) ; `guild_id`: `undefined` \| `string` ; `icon`: `undefined` \| `null` \| `string` ; `id`: `undefined` \| `string` ; `install_params`: `undefined` \| { permissions: string; scopes: string[]; } ; `name`: `undefined` \| `string` ; `owner`: `undefined` \| { id?: string \| undefined; flags?: UserFlags \| undefined; bot?: boolean \| undefined; username?: string \| undefined; discriminator?: string \| undefined; avatar?: string \| null \| undefined; ... 8 more ...; banner?: string \| undefined; } ; `primary_sku_id`: `undefined` \| `string` ; `privacy_policy_url`: `undefined` \| `string` ; `rpc_origins`: `undefined` \| `string`[] ; `slug`: `undefined` \| `string` ; `tags`: `undefined` \| `string`[] ; `team`: `undefined` \| `null` \| { icon?: string \| null \| undefined; name: string; id: string; members: DiscordTeamMember[]; owner_user_id: string; } ; `terms_of_service_url`: `undefined` \| `string` ; `verify_key`: `undefined` \| `string` }

#### Inherited from

ReturnType.application

---

### applicationId

• **applicationId**: `undefined` \| `bigint`

#### Inherited from

ReturnType.applicationId

---

### attachments

• **attachments**: [`Attachment`](discordeno_bot.Attachment.md)[]

#### Inherited from

ReturnType.attachments

---

### authorId

• **authorId**: `bigint`

#### Inherited from

ReturnType.authorId

---

### bitfield

• **bitfield**: `bigint`

#### Inherited from

ReturnType.bitfield

---

### channelId

• **channelId**: `bigint`

#### Inherited from

ReturnType.channelId

---

### components

• **components**: `undefined` \| { `components`: `undefined` \| { url?: string \| undefined; emoji?: { name?: string \| undefined; id?: bigint \| undefined; animated?: boolean \| undefined; } \| undefined; options?: { description?: string \| undefined; emoji?: { ...; } \| undefined; default?: boolean \| undefined; value: string; label: string; }[] \| undefined; ... 12 more ...; type: Mes...[] ; `customId`: `undefined` \| `string` ; `disabled`: `undefined` \| `boolean` ; `emoji`: `undefined` \| { name?: string \| undefined; id?: bigint \| undefined; animated?: boolean \| undefined; } ; `label`: `undefined` \| `string` ; `maxLength`: `undefined` \| `number` ; `maxValues`: `undefined` \| `number` ; `minLength`: `undefined` \| `number` ; `minValues`: `undefined` \| `number` ; `options`: `undefined` \| { description?: string \| undefined; emoji?: { name?: string \| undefined; id?: bigint \| undefined; animated?: boolean \| undefined; } \| undefined; default?: boolean \| undefined; value: string; label: string; }[] ; `placeholder`: `undefined` \| `string` ; `required`: `undefined` \| `boolean` ; `style`: `undefined` \| [`ButtonStyles`](../enums/discordeno_bot.ButtonStyles.md) \| [`TextStyles`](../enums/discordeno_bot.TextStyles.md) ; `type`: [`MessageComponentTypes`](../enums/discordeno_bot.MessageComponentTypes.md) ; `url`: `undefined` \| `string` ; `value`: `undefined` \| `string` }[]

#### Inherited from

ReturnType.components

---

### content

• **content**: `string`

#### Inherited from

ReturnType.content

---

### editedTimestamp

• **editedTimestamp**: `undefined` \| `number`

#### Inherited from

ReturnType.editedTimestamp

---

### embeds

• **embeds**: [`Embed`](discordeno_bot.Embed.md)[]

#### Inherited from

ReturnType.embeds

---

### flags

• **flags**: `undefined` \| `number`

#### Inherited from

ReturnType.flags

---

### guildId

• **guildId**: `undefined` \| `bigint`

#### Inherited from

ReturnType.guildId

---

### id

• **id**: `bigint`

#### Inherited from

ReturnType.id

---

### interaction

• **interaction**: `undefined` \| { `id`: `bigint` ; `member`: `undefined` \| { guildId?: bigint \| undefined; permissions?: bigint \| undefined; avatar?: bigint \| undefined; nick?: string \| undefined; roles?: bigint[] \| undefined; joinedAt?: number \| undefined; premiumSince?: number \| undefined; communicationDisabledUntil?: number \| undefined; id: bigint; toggles: MemberToggles; } ; `name`: `string` ; `type`: [`InteractionTypes`](../enums/discordeno_bot.InteractionTypes.md) ; `user`: { flags?: UserFlags \| undefined; avatar?: bigint \| undefined; locale?: string \| undefined; email?: string \| undefined; premiumType?: PremiumTypes \| undefined; ... 4 more ...; toggles: UserToggles; } }

#### Inherited from

ReturnType.interaction

---

### isFromBot

• **isFromBot**: `boolean`

#### Inherited from

ReturnType.isFromBot

---

### member

• **member**: `undefined` \| { `avatar`: `undefined` \| `bigint` ; `communicationDisabledUntil`: `undefined` \| `number` ; `guildId`: `bigint` ; `id`: `bigint` ; `joinedAt`: `number` ; `nick`: `undefined` \| `string` ; `permissions`: `undefined` \| `bigint` ; `premiumSince`: `undefined` \| `number` ; `roles`: `bigint`[] ; `toggles`: [`MemberToggles`](../classes/discordeno_bot.MemberToggles.md) ; `user`: `undefined` \| { flags?: UserFlags \| undefined; avatar?: bigint \| undefined; locale?: string \| undefined; email?: string \| undefined; premiumType?: PremiumTypes \| undefined; ... 4 more ...; toggles: UserToggles; } }

#### Inherited from

ReturnType.member

---

### mentionedChannelIds

• **mentionedChannelIds**: `bigint`[]

#### Inherited from

ReturnType.mentionedChannelIds

---

### mentionedRoleIds

• **mentionedRoleIds**: `bigint`[]

#### Inherited from

ReturnType.mentionedRoleIds

---

### mentionedUserIds

• **mentionedUserIds**: `bigint`[]

#### Inherited from

ReturnType.mentionedUserIds

---

### messageReference

• **messageReference**: `undefined` \| { `channelId`: `undefined` \| `bigint` ; `guildId`: `undefined` \| `bigint` ; `messageId`: `undefined` \| `bigint` }

#### Inherited from

ReturnType.messageReference

---

### nonce

• **nonce**: `undefined` \| `string` \| `number`

#### Inherited from

ReturnType.nonce

---

### reactions

• **reactions**: `undefined` \| { `count`: `number` ; `emoji`: { name?: string \| undefined; id?: bigint \| undefined; user?: { flags?: UserFlags \| undefined; avatar?: bigint \| undefined; locale?: string \| undefined; email?: string \| undefined; ... 5 more ...; toggles: UserToggles; } \| undefined; roles?: bigint[] \| undefined; toggles: EmojiToggles; } ; `me`: `boolean` }[]

#### Inherited from

ReturnType.reactions

---

### stickerItems

• **stickerItems**: `undefined` \| { `formatType`: [`StickerFormatTypes`](../enums/discordeno_bot.StickerFormatTypes.md) ; `id`: `bigint` ; `name`: `string` }[]

#### Inherited from

ReturnType.stickerItems

---

### tag

• **tag**: `string`

#### Inherited from

ReturnType.tag

---

### thread

• **thread**: `undefined` \| { `applicationId`: `undefined` \| `bigint` ; `archiveTimestamp`: `undefined` \| `number` ; `archived`: `undefined` \| `boolean` ; `autoArchiveDuration`: `undefined` \| `60` \| `1440` \| `4320` \| `10080` ; `bitrate`: `undefined` \| `number` ; `botIsMember`: `boolean` ; `createTimestamp`: `undefined` \| `number` ; `flags`: `undefined` \| [`ChannelFlags`](../enums/discordeno_bot.ChannelFlags.md) ; `guildId`: `bigint` ; `id`: `bigint` ; `invitable`: `undefined` \| `boolean` ; `lastMessageId`: `undefined` \| `bigint` ; `lastPinTimestamp`: `undefined` \| `number` ; `locked`: `undefined` \| `boolean` ; `memberCount`: `undefined` \| `number` ; `messageCount`: `undefined` \| `number` ; `name`: `undefined` \| `string` ; `newlyCreated`: `undefined` \| `boolean` ; `nsfw`: `undefined` \| `boolean` ; `ownerId`: `undefined` \| `bigint` ; `parentId`: `undefined` \| `bigint` ; `permissionOverwrites`: `bigint`[] ; `permissions`: `undefined` \| `bigint` ; `position`: `undefined` \| `number` ; `rateLimitPerUser`: `undefined` \| `number` ; `rtcRegion`: `undefined` \| `string` ; `topic`: `undefined` \| `string` ; `type`: [`ChannelTypes`](../enums/discordeno_bot.ChannelTypes.md) ; `userLimit`: `undefined` \| `number` ; `videoQualityMode`: `undefined` \| [`VideoQualityModes`](../enums/discordeno_bot.VideoQualityModes.md) }

#### Inherited from

ReturnType.thread

---

### timestamp

• **timestamp**: `number`

#### Inherited from

ReturnType.timestamp

---

### type

• **type**: [`MessageTypes`](../enums/discordeno_bot.MessageTypes.md)

#### Inherited from

ReturnType.type

---

### webhookId

• **webhookId**: `undefined` \| `bigint`

#### Inherited from

ReturnType.webhookId
