[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / GuildToggles

# Class: GuildToggles

[@discordeno/bot](../modules/discordeno_bot.md).GuildToggles

## Hierarchy

- [`ToggleBitfieldBigint`](discordeno_bot.ToggleBitfieldBigint.md)

  ↳ **`GuildToggles`**

## Table of contents

### Constructors

- [constructor](discordeno_bot.GuildToggles.md#constructor)

### Properties

- [bitfield](discordeno_bot.GuildToggles.md#bitfield)

### Accessors

- [animatedBanner](discordeno_bot.GuildToggles.md#animatedbanner)
- [animatedIcon](discordeno_bot.GuildToggles.md#animatedicon)
- [autoModeration](discordeno_bot.GuildToggles.md#automoderation)
- [banner](discordeno_bot.GuildToggles.md#banner)
- [community](discordeno_bot.GuildToggles.md#community)
- [developerSupportServer](discordeno_bot.GuildToggles.md#developersupportserver)
- [discoverable](discordeno_bot.GuildToggles.md#discoverable)
- [featurable](discordeno_bot.GuildToggles.md#featurable)
- [features](discordeno_bot.GuildToggles.md#features)
- [inviteSplash](discordeno_bot.GuildToggles.md#invitesplash)
- [invitesDisabled](discordeno_bot.GuildToggles.md#invitesdisabled)
- [large](discordeno_bot.GuildToggles.md#large)
- [memberVerificationGateEnabled](discordeno_bot.GuildToggles.md#memberverificationgateenabled)
- [monetizationEnabled](discordeno_bot.GuildToggles.md#monetizationenabled)
- [moreStickers](discordeno_bot.GuildToggles.md#morestickers)
- [news](discordeno_bot.GuildToggles.md#news)
- [owner](discordeno_bot.GuildToggles.md#owner)
- [partnered](discordeno_bot.GuildToggles.md#partnered)
- [premiumProgressBarEnabled](discordeno_bot.GuildToggles.md#premiumprogressbarenabled)
- [previewEnabled](discordeno_bot.GuildToggles.md#previewenabled)
- [privateThreads](discordeno_bot.GuildToggles.md#privatethreads)
- [roleIcons](discordeno_bot.GuildToggles.md#roleicons)
- [ticketedEventsEnabled](discordeno_bot.GuildToggles.md#ticketedeventsenabled)
- [unavailable](discordeno_bot.GuildToggles.md#unavailable)
- [vanityUrl](discordeno_bot.GuildToggles.md#vanityurl)
- [verified](discordeno_bot.GuildToggles.md#verified)
- [vipRegions](discordeno_bot.GuildToggles.md#vipregions)
- [welcomeScreenEnabled](discordeno_bot.GuildToggles.md#welcomescreenenabled)
- [widgetEnabled](discordeno_bot.GuildToggles.md#widgetenabled)

### Methods

- [add](discordeno_bot.GuildToggles.md#add)
- [contains](discordeno_bot.GuildToggles.md#contains)
- [has](discordeno_bot.GuildToggles.md#has)
- [list](discordeno_bot.GuildToggles.md#list)
- [remove](discordeno_bot.GuildToggles.md#remove)

## Constructors

### constructor

• **new GuildToggles**(`guildOrTogglesBigint`)

#### Parameters

| Name                   | Type                                                                       |
| :--------------------- | :------------------------------------------------------------------------- |
| `guildOrTogglesBigint` | `bigint` \| [`DiscordGuild`](../interfaces/discordeno_bot.DiscordGuild.md) |

#### Overrides

[ToggleBitfieldBigint](discordeno_bot.ToggleBitfieldBigint.md).[constructor](discordeno_bot.ToggleBitfieldBigint.md#constructor)

#### Defined in

[packages/bot/src/transformers/toggles/guild.ts:93](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/guild.ts#L93)

## Properties

### bitfield

• **bitfield**: `bigint`

#### Inherited from

[ToggleBitfieldBigint](discordeno_bot.ToggleBitfieldBigint.md).[bitfield](discordeno_bot.ToggleBitfieldBigint.md#bitfield)

#### Defined in

[packages/bot/src/transformers/toggles/ToggleBitfield.ts:27](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/ToggleBitfield.ts#L27)

## Accessors

### animatedBanner

• `get` **animatedBanner**(): `boolean`

Whether the guild has access to set an animated guild banner image

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/guild.ts:207](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/guild.ts#L207)

---

### animatedIcon

• `get` **animatedIcon**(): `boolean`

Whether the guild has access to set an animated guild icon

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/guild.ts:227](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/guild.ts#L227)

---

### autoModeration

• `get` **autoModeration**(): `boolean`

Whether the guild has set up auto moderation rules

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/guild.ts:277](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/guild.ts#L277)

---

### banner

• `get` **banner**(): `boolean`

Whether the guild has access to set a guild banner image

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/guild.ts:232](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/guild.ts#L232)

---

### community

• `get` **community**(): `boolean`

Whether the guild can enable welcome screen, Membership Screening, stage channels and discovery, and receives community updates

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/guild.ts:197](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/guild.ts#L197)

---

### developerSupportServer

• `get` **developerSupportServer**(): `boolean`

Whether the Guild has been set as a support server on the App Directory

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/guild.ts:202](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/guild.ts#L202)

---

### discoverable

• `get` **discoverable**(): `boolean`

Whether the guild is able to be discovered in the directory

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/guild.ts:217](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/guild.ts#L217)

---

### featurable

• `get` **featurable**(): `boolean`

Whether the guild is able to be featured in the directory

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/guild.ts:222](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/guild.ts#L222)

---

### features

• `get` **features**(): (`"unavailable"` \| `"owner"` \| `"verified"` \| `"banner"` \| `"inviteSplash"` \| `"vipRegions"` \| `"vanityUrl"` \| `"partnered"` \| `"community"` \| `"developerSupportServer"` \| `"news"` \| `"discoverable"` \| `"featurable"` \| `"animatedIcon"` \| `"welcomeScreenEnabled"` \| `"memberVerificationGateEnabled"` \| `"previewEnabled"` \| `"ticketedEventsEnabled"` \| `"monetizationEnabled"` \| `"moreStickers"` \| `"privateThreads"` \| `"roleIcons"` \| `"autoModeration"` \| `"invitesDisabled"` \| `"animatedBanner"` \| `"widgetEnabled"` \| `"large"` \| `"premiumProgressBarEnabled"`)[]

#### Returns

(`"unavailable"` \| `"owner"` \| `"verified"` \| `"banner"` \| `"inviteSplash"` \| `"vipRegions"` \| `"vanityUrl"` \| `"partnered"` \| `"community"` \| `"developerSupportServer"` \| `"news"` \| `"discoverable"` \| `"featurable"` \| `"animatedIcon"` \| `"welcomeScreenEnabled"` \| `"memberVerificationGateEnabled"` \| `"previewEnabled"` \| `"ticketedEventsEnabled"` \| `"monetizationEnabled"` \| `"moreStickers"` \| `"privateThreads"` \| `"roleIcons"` \| `"autoModeration"` \| `"invitesDisabled"` \| `"animatedBanner"` \| `"widgetEnabled"` \| `"large"` \| `"premiumProgressBarEnabled"`)[]

#### Defined in

[packages/bot/src/transformers/toggles/guild.ts:134](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/guild.ts#L134)

---

### inviteSplash

• `get` **inviteSplash**(): `boolean`

Whether the guild has access to set an invite splash background

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/guild.ts:172](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/guild.ts#L172)

---

### invitesDisabled

• `get` **invitesDisabled**(): `boolean`

Whether the guild has paused invites, preventing new users from joining

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/guild.ts:282](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/guild.ts#L282)

---

### large

• `get` **large**(): `boolean`

Whether this is considered a large guild

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/guild.ts:157](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/guild.ts#L157)

---

### memberVerificationGateEnabled

• `get` **memberVerificationGateEnabled**(): `boolean`

Whether the guild has enabled [Membership Screening](https://discord.com/developers/docs/resources/guild#membership-screening-object)

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/guild.ts:242](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/guild.ts#L242)

---

### monetizationEnabled

• `get` **monetizationEnabled**(): `boolean`

Whether the guild has enabled monetization

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/guild.ts:257](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/guild.ts#L257)

---

### moreStickers

• `get` **moreStickers**(): `boolean`

Whether the guild has increased custom sticker slots

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/guild.ts:262](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/guild.ts#L262)

---

### news

• `get` **news**(): `boolean`

Whether the guild has access to create news channels

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/guild.ts:212](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/guild.ts#L212)

---

### owner

• `get` **owner**(): `boolean`

Whether the bot is the owner of the guild

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/guild.ts:147](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/guild.ts#L147)

---

### partnered

• `get` **partnered**(): `boolean`

Whether the guild is partnered

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/guild.ts:192](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/guild.ts#L192)

---

### premiumProgressBarEnabled

• `get` **premiumProgressBarEnabled**(): `boolean`

Whether the guild has the boost progress bar enabled

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/guild.ts:167](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/guild.ts#L167)

---

### previewEnabled

• `get` **previewEnabled**(): `boolean`

Whether the guild can be previewed before joining via Membership Screening or the directory

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/guild.ts:247](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/guild.ts#L247)

---

### privateThreads

• `get` **privateThreads**(): `boolean`

Whether the guild has access to create private threads

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/guild.ts:267](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/guild.ts#L267)

---

### roleIcons

• `get` **roleIcons**(): `boolean`

Whether the guild is able to set role icons

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/guild.ts:272](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/guild.ts#L272)

---

### ticketedEventsEnabled

• `get` **ticketedEventsEnabled**(): `boolean`

Whether the guild has enabled ticketed events

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/guild.ts:252](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/guild.ts#L252)

---

### unavailable

• `get` **unavailable**(): `boolean`

Whether this guild is unavailable due to an outage

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/guild.ts:162](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/guild.ts#L162)

---

### vanityUrl

• `get` **vanityUrl**(): `boolean`

Whether the guild has access to set a vanity URL

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/guild.ts:182](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/guild.ts#L182)

---

### verified

• `get` **verified**(): `boolean`

Whether the guild is verified

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/guild.ts:187](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/guild.ts#L187)

---

### vipRegions

• `get` **vipRegions**(): `boolean`

Whether the guild has access to set 384 kbps bitrate in voice (previously VIP voice servers)

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/guild.ts:177](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/guild.ts#L177)

---

### welcomeScreenEnabled

• `get` **welcomeScreenEnabled**(): `boolean`

Whether the guild has enabled the welcome screen

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/guild.ts:237](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/guild.ts#L237)

---

### widgetEnabled

• `get` **widgetEnabled**(): `boolean`

Whether the server widget is enabled

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/guild.ts:152](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/guild.ts#L152)

## Methods

### add

▸ **add**(`bits`): [`GuildToggles`](discordeno_bot.GuildToggles.md)

Adds some bits to the bitfield.

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `bits` | `bigint` |

#### Returns

[`GuildToggles`](discordeno_bot.GuildToggles.md)

#### Inherited from

[ToggleBitfieldBigint](discordeno_bot.ToggleBitfieldBigint.md).[add](discordeno_bot.ToggleBitfieldBigint.md#add)

#### Defined in

[packages/bot/src/transformers/toggles/ToggleBitfield.ts:39](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/ToggleBitfield.ts#L39)

---

### contains

▸ **contains**(`bits`): `boolean`

Tests whether or not this bitfield has the permission requested.

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `bits` | `bigint` |

#### Returns

`boolean`

#### Inherited from

[ToggleBitfieldBigint](discordeno_bot.ToggleBitfieldBigint.md).[contains](discordeno_bot.ToggleBitfieldBigint.md#contains)

#### Defined in

[packages/bot/src/transformers/toggles/ToggleBitfield.ts:34](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/ToggleBitfield.ts#L34)

---

### has

▸ **has**(`permissions`): `boolean`

Checks whether or not the permissions exist in this

#### Parameters

| Name          | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `permissions` | `"unavailable"` \| `"owner"` \| `"verified"` \| `"banner"` \| `"inviteSplash"` \| `"vipRegions"` \| `"vanityUrl"` \| `"partnered"` \| `"community"` \| `"developerSupportServer"` \| `"news"` \| `"discoverable"` \| `"featurable"` \| `"animatedIcon"` \| `"welcomeScreenEnabled"` \| `"memberVerificationGateEnabled"` \| `"previewEnabled"` \| `"ticketedEventsEnabled"` \| `"monetizationEnabled"` \| `"moreStickers"` \| `"privateThreads"` \| `"roleIcons"` \| `"autoModeration"` \| `"invitesDisabled"` \| `"animatedBanner"` \| `"widgetEnabled"` \| `"large"` \| `"premiumProgressBarEnabled"` \| (`"unavailable"` \| `"owner"` \| `"verified"` \| `"banner"` \| `"inviteSplash"` \| `"vipRegions"` \| `"vanityUrl"` \| `"partnered"` \| `"community"` \| `"developerSupportServer"` \| `"news"` \| `"discoverable"` \| `"featurable"` \| `"animatedIcon"` \| `"welcomeScreenEnabled"` \| `"memberVerificationGateEnabled"` \| `"previewEnabled"` \| `"ticketedEventsEnabled"` \| `"monetizationEnabled"` \| `"moreStickers"` \| `"privateThreads"` \| `"roleIcons"` \| `"autoModeration"` \| `"invitesDisabled"` \| `"animatedBanner"` \| `"widgetEnabled"` \| `"large"` \| `"premiumProgressBarEnabled"`)[] |

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/guild.ts:287](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/guild.ts#L287)

---

### list

▸ **list**(): `Record`<`"unavailable"` \| `"owner"` \| `"verified"` \| `"banner"` \| `"inviteSplash"` \| `"vipRegions"` \| `"vanityUrl"` \| `"partnered"` \| `"community"` \| `"developerSupportServer"` \| `"news"` \| `"discoverable"` \| `"featurable"` \| `"animatedIcon"` \| `"welcomeScreenEnabled"` \| `"memberVerificationGateEnabled"` \| `"previewEnabled"` \| `"ticketedEventsEnabled"` \| `"monetizationEnabled"` \| `"moreStickers"` \| `"privateThreads"` \| `"roleIcons"` \| `"autoModeration"` \| `"invitesDisabled"` \| `"animatedBanner"` \| `"widgetEnabled"` \| `"large"` \| `"premiumProgressBarEnabled"`, `boolean`\>

Lists all the toggles for the role and whether or not each is true or false.

#### Returns

`Record`<`"unavailable"` \| `"owner"` \| `"verified"` \| `"banner"` \| `"inviteSplash"` \| `"vipRegions"` \| `"vanityUrl"` \| `"partnered"` \| `"community"` \| `"developerSupportServer"` \| `"news"` \| `"discoverable"` \| `"featurable"` \| `"animatedIcon"` \| `"welcomeScreenEnabled"` \| `"memberVerificationGateEnabled"` \| `"previewEnabled"` \| `"ticketedEventsEnabled"` \| `"monetizationEnabled"` \| `"moreStickers"` \| `"privateThreads"` \| `"roleIcons"` \| `"autoModeration"` \| `"invitesDisabled"` \| `"animatedBanner"` \| `"widgetEnabled"` \| `"large"` \| `"premiumProgressBarEnabled"`, `boolean`\>

#### Defined in

[packages/bot/src/transformers/toggles/guild.ts:294](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/guild.ts#L294)

---

### remove

▸ **remove**(`bits`): [`GuildToggles`](discordeno_bot.GuildToggles.md)

Removes some bits from the bitfield.

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `bits` | `bigint` |

#### Returns

[`GuildToggles`](discordeno_bot.GuildToggles.md)

#### Inherited from

[ToggleBitfieldBigint](discordeno_bot.ToggleBitfieldBigint.md).[remove](discordeno_bot.ToggleBitfieldBigint.md#remove)

#### Defined in

[packages/bot/src/transformers/toggles/ToggleBitfield.ts:45](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/ToggleBitfield.ts#L45)
