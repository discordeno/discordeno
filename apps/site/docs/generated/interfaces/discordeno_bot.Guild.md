[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / Guild

# Interface: Guild

[@discordeno/bot](../modules/discordeno_bot.md).Guild

## Hierarchy

- `ReturnType`<typeof [`transformGuild`](../modules/discordeno_bot.md#transformguild)\>

  ↳ **`Guild`**

## Table of contents

### Properties

- [afkChannelId](discordeno_bot.Guild.md#afkchannelid)
- [afkTimeout](discordeno_bot.Guild.md#afktimeout)
- [applicationId](discordeno_bot.Guild.md#applicationid)
- [approximateMemberCount](discordeno_bot.Guild.md#approximatemembercount)
- [approximatePresenceCount](discordeno_bot.Guild.md#approximatepresencecount)
- [banner](discordeno_bot.Guild.md#banner)
- [channels](discordeno_bot.Guild.md#channels)
- [defaultMessageNotifications](discordeno_bot.Guild.md#defaultmessagenotifications)
- [description](discordeno_bot.Guild.md#description)
- [discoverySplash](discordeno_bot.Guild.md#discoverysplash)
- [emojis](discordeno_bot.Guild.md#emojis)
- [explicitContentFilter](discordeno_bot.Guild.md#explicitcontentfilter)
- [icon](discordeno_bot.Guild.md#icon)
- [id](discordeno_bot.Guild.md#id)
- [joinedAt](discordeno_bot.Guild.md#joinedat)
- [maxMembers](discordeno_bot.Guild.md#maxmembers)
- [maxPresences](discordeno_bot.Guild.md#maxpresences)
- [maxVideoChannelUsers](discordeno_bot.Guild.md#maxvideochannelusers)
- [memberCount](discordeno_bot.Guild.md#membercount)
- [members](discordeno_bot.Guild.md#members)
- [mfaLevel](discordeno_bot.Guild.md#mfalevel)
- [name](discordeno_bot.Guild.md#name)
- [nsfwLevel](discordeno_bot.Guild.md#nsfwlevel)
- [ownerId](discordeno_bot.Guild.md#ownerid)
- [permissions](discordeno_bot.Guild.md#permissions)
- [preferredLocale](discordeno_bot.Guild.md#preferredlocale)
- [premiumProgressBarEnabled](discordeno_bot.Guild.md#premiumprogressbarenabled)
- [premiumSubscriptionCount](discordeno_bot.Guild.md#premiumsubscriptioncount)
- [premiumTier](discordeno_bot.Guild.md#premiumtier)
- [publicUpdatesChannelId](discordeno_bot.Guild.md#publicupdateschannelid)
- [roles](discordeno_bot.Guild.md#roles)
- [rulesChannelId](discordeno_bot.Guild.md#ruleschannelid)
- [shardId](discordeno_bot.Guild.md#shardid)
- [splash](discordeno_bot.Guild.md#splash)
- [stageInstances](discordeno_bot.Guild.md#stageinstances)
- [systemChannelFlags](discordeno_bot.Guild.md#systemchannelflags)
- [systemChannelId](discordeno_bot.Guild.md#systemchannelid)
- [toggles](discordeno_bot.Guild.md#toggles)
- [vanityUrlCode](discordeno_bot.Guild.md#vanityurlcode)
- [verificationLevel](discordeno_bot.Guild.md#verificationlevel)
- [voiceStates](discordeno_bot.Guild.md#voicestates)
- [welcomeScreen](discordeno_bot.Guild.md#welcomescreen)
- [widgetChannelId](discordeno_bot.Guild.md#widgetchannelid)

## Properties

### afkChannelId

• **afkChannelId**: `undefined` \| `bigint`

#### Inherited from

ReturnType.afkChannelId

---

### afkTimeout

• **afkTimeout**: `number`

#### Inherited from

ReturnType.afkTimeout

---

### applicationId

• **applicationId**: `undefined` \| `bigint`

#### Inherited from

ReturnType.applicationId

---

### approximateMemberCount

• **approximateMemberCount**: `undefined` \| `number`

#### Inherited from

ReturnType.approximateMemberCount

---

### approximatePresenceCount

• **approximatePresenceCount**: `undefined` \| `number`

#### Inherited from

ReturnType.approximatePresenceCount

---

### banner

• **banner**: `undefined` \| `bigint`

#### Inherited from

ReturnType.banner

---

### channels

• **channels**: [`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`Channel`](discordeno_bot.Channel.md)\>

#### Inherited from

ReturnType.channels

---

### defaultMessageNotifications

• **defaultMessageNotifications**: [`DefaultMessageNotificationLevels`](../enums/discordeno_bot.DefaultMessageNotificationLevels.md)

#### Inherited from

ReturnType.defaultMessageNotifications

---

### description

• **description**: `undefined` \| `null` \| `string`

#### Inherited from

ReturnType.description

---

### discoverySplash

• **discoverySplash**: `undefined` \| `bigint`

#### Inherited from

ReturnType.discoverySplash

---

### emojis

• **emojis**: [`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`Emoji`](discordeno_bot.Emoji.md)\>

#### Inherited from

ReturnType.emojis

---

### explicitContentFilter

• **explicitContentFilter**: [`ExplicitContentFilterLevels`](../enums/discordeno_bot.ExplicitContentFilterLevels.md)

#### Inherited from

ReturnType.explicitContentFilter

---

### icon

• **icon**: `undefined` \| `bigint`

#### Inherited from

ReturnType.icon

---

### id

• **id**: `bigint`

#### Inherited from

ReturnType.id

---

### joinedAt

• **joinedAt**: `undefined` \| `number`

#### Inherited from

ReturnType.joinedAt

---

### maxMembers

• **maxMembers**: `undefined` \| `number`

#### Inherited from

ReturnType.maxMembers

---

### maxPresences

• **maxPresences**: `undefined` \| `number`

#### Inherited from

ReturnType.maxPresences

---

### maxVideoChannelUsers

• **maxVideoChannelUsers**: `undefined` \| `number`

#### Inherited from

ReturnType.maxVideoChannelUsers

---

### memberCount

• **memberCount**: `number`

#### Inherited from

ReturnType.memberCount

---

### members

• **members**: [`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`Member`](discordeno_bot.Member.md)\>

#### Inherited from

ReturnType.members

---

### mfaLevel

• **mfaLevel**: [`MfaLevels`](../enums/discordeno_bot.MfaLevels.md)

#### Inherited from

ReturnType.mfaLevel

---

### name

• **name**: `string`

#### Inherited from

ReturnType.name

---

### nsfwLevel

• **nsfwLevel**: [`GuildNsfwLevel`](../enums/discordeno_bot.GuildNsfwLevel.md)

#### Inherited from

ReturnType.nsfwLevel

---

### ownerId

• **ownerId**: `bigint`

#### Inherited from

ReturnType.ownerId

---

### permissions

• **permissions**: `bigint`

#### Inherited from

ReturnType.permissions

---

### preferredLocale

• **preferredLocale**: `string`

#### Inherited from

ReturnType.preferredLocale

---

### premiumProgressBarEnabled

• **premiumProgressBarEnabled**: `boolean`

#### Inherited from

ReturnType.premiumProgressBarEnabled

---

### premiumSubscriptionCount

• **premiumSubscriptionCount**: `undefined` \| `number`

#### Inherited from

ReturnType.premiumSubscriptionCount

---

### premiumTier

• **premiumTier**: [`PremiumTiers`](../enums/discordeno_bot.PremiumTiers.md)

#### Inherited from

ReturnType.premiumTier

---

### publicUpdatesChannelId

• **publicUpdatesChannelId**: `undefined` \| `bigint`

#### Inherited from

ReturnType.publicUpdatesChannelId

---

### roles

• **roles**: [`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`Role`](discordeno_bot.Role.md)\>

#### Inherited from

ReturnType.roles

---

### rulesChannelId

• **rulesChannelId**: `undefined` \| `bigint`

#### Inherited from

ReturnType.rulesChannelId

---

### shardId

• **shardId**: `number`

#### Inherited from

ReturnType.shardId

---

### splash

• **splash**: `undefined` \| `bigint`

#### Inherited from

ReturnType.splash

---

### stageInstances

• **stageInstances**: `undefined` \| { `channelId`: `bigint` ; `guildId`: `bigint` ; `id`: `bigint` ; `topic`: `string` }[]

#### Inherited from

ReturnType.stageInstances

---

### systemChannelFlags

• **systemChannelFlags**: [`SystemChannelFlags`](../enums/discordeno_bot.SystemChannelFlags.md)

#### Inherited from

ReturnType.systemChannelFlags

---

### systemChannelId

• **systemChannelId**: `undefined` \| `bigint`

#### Inherited from

ReturnType.systemChannelId

---

### toggles

• **toggles**: [`GuildToggles`](../classes/discordeno_bot.GuildToggles.md)

#### Inherited from

ReturnType.toggles

---

### vanityUrlCode

• **vanityUrlCode**: `undefined` \| `null` \| `string`

#### Inherited from

ReturnType.vanityUrlCode

---

### verificationLevel

• **verificationLevel**: [`VerificationLevels`](../enums/discordeno_bot.VerificationLevels.md)

#### Inherited from

ReturnType.verificationLevel

---

### voiceStates

• **voiceStates**: [`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`VoiceState`](discordeno_bot.VoiceState.md)\>

#### Inherited from

ReturnType.voiceStates

---

### welcomeScreen

• **welcomeScreen**: `undefined` \| { `description`: `undefined` \| `string` ; `welcomeChannels`: { `channelId`: `bigint` ; `description`: `string` = wc.description; `emojiId`: `undefined` \| `bigint` ; `emojiName`: `undefined` \| `string` }[] }

#### Inherited from

ReturnType.welcomeScreen

---

### widgetChannelId

• **widgetChannelId**: `undefined` \| `bigint`

#### Inherited from

ReturnType.widgetChannelId
