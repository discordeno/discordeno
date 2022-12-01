[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / DiscordInviteMetadata

# Interface: DiscordInviteMetadata

[@discordeno/bot](../modules/discordeno_bot.md).DiscordInviteMetadata

https://discord.com/developers/docs/resources/invite#invite-metadata-object

## Hierarchy

- [`DiscordInvite`](discordeno_bot.DiscordInvite.md)

  ↳ **`DiscordInviteMetadata`**

## Table of contents

### Properties

- [approximate_member_count](discordeno_bot.DiscordInviteMetadata.md#approximate_member_count)
- [approximate_presence_count](discordeno_bot.DiscordInviteMetadata.md#approximate_presence_count)
- [channel](discordeno_bot.DiscordInviteMetadata.md#channel)
- [code](discordeno_bot.DiscordInviteMetadata.md#code)
- [created_at](discordeno_bot.DiscordInviteMetadata.md#created_at)
- [expires_at](discordeno_bot.DiscordInviteMetadata.md#expires_at)
- [guild](discordeno_bot.DiscordInviteMetadata.md#guild)
- [guild_scheduled_event](discordeno_bot.DiscordInviteMetadata.md#guild_scheduled_event)
- [inviter](discordeno_bot.DiscordInviteMetadata.md#inviter)
- [max_age](discordeno_bot.DiscordInviteMetadata.md#max_age)
- [max_uses](discordeno_bot.DiscordInviteMetadata.md#max_uses)
- [stage_instance](discordeno_bot.DiscordInviteMetadata.md#stage_instance)
- [target_application](discordeno_bot.DiscordInviteMetadata.md#target_application)
- [target_type](discordeno_bot.DiscordInviteMetadata.md#target_type)
- [target_user](discordeno_bot.DiscordInviteMetadata.md#target_user)
- [temporary](discordeno_bot.DiscordInviteMetadata.md#temporary)
- [uses](discordeno_bot.DiscordInviteMetadata.md#uses)

## Properties

### approximate_member_count

• `Optional` **approximate_member_count**: `number`

Approximate count of total members

#### Inherited from

[DiscordInvite](discordeno_bot.DiscordInvite.md).[approximate_member_count](discordeno_bot.DiscordInvite.md#approximate_member_count)

#### Defined in

packages/types/dist/discord.d.ts:1576

---

### approximate_presence_count

• `Optional` **approximate_presence_count**: `number`

Approximate count of online members (only present when target_user is set)

#### Inherited from

[DiscordInvite](discordeno_bot.DiscordInvite.md).[approximate_presence_count](discordeno_bot.DiscordInvite.md#approximate_presence_count)

#### Defined in

packages/types/dist/discord.d.ts:1574

---

### channel

• **channel**: `null` \| `Partial`<[`DiscordChannel`](discordeno_bot.DiscordChannel.md)\>

The channel this invite is for

#### Inherited from

[DiscordInvite](discordeno_bot.DiscordInvite.md).[channel](discordeno_bot.DiscordInvite.md#channel)

#### Defined in

packages/types/dist/discord.d.ts:1564

---

### code

• **code**: `string`

The invite code (unique Id)

#### Inherited from

[DiscordInvite](discordeno_bot.DiscordInvite.md).[code](discordeno_bot.DiscordInvite.md#code)

#### Defined in

packages/types/dist/discord.d.ts:1560

---

### created_at

• **created_at**: `string`

When this invite was created

#### Defined in

packages/types/dist/discord.d.ts:1555

---

### expires_at

• `Optional` **expires_at**: `null` \| `string`

The expiration date of this invite, returned from the `GET /invites/<code>` endpoint when `with_expiration` is `true`

#### Inherited from

[DiscordInvite](discordeno_bot.DiscordInvite.md).[expires_at](discordeno_bot.DiscordInvite.md#expires_at)

#### Defined in

packages/types/dist/discord.d.ts:1578

---

### guild

• `Optional` **guild**: `Partial`<[`DiscordGuild`](discordeno_bot.DiscordGuild.md)\>

The guild this invite is for

#### Inherited from

[DiscordInvite](discordeno_bot.DiscordInvite.md).[guild](discordeno_bot.DiscordInvite.md#guild)

#### Defined in

packages/types/dist/discord.d.ts:1562

---

### guild_scheduled_event

• `Optional` **guild_scheduled_event**: [`DiscordScheduledEvent`](discordeno_bot.DiscordScheduledEvent.md)

guild scheduled event data

#### Inherited from

[DiscordInvite](discordeno_bot.DiscordInvite.md).[guild_scheduled_event](discordeno_bot.DiscordInvite.md#guild_scheduled_event)

#### Defined in

packages/types/dist/discord.d.ts:1582

---

### inviter

• `Optional` **inviter**: [`DiscordUser`](discordeno_bot.DiscordUser.md)

The user who created the invite

#### Inherited from

[DiscordInvite](discordeno_bot.DiscordInvite.md).[inviter](discordeno_bot.DiscordInvite.md#inviter)

#### Defined in

packages/types/dist/discord.d.ts:1566

---

### max_age

• **max_age**: `number`

Duration (in seconds) after which the invite expires

#### Defined in

packages/types/dist/discord.d.ts:1551

---

### max_uses

• **max_uses**: `number`

Max number of times this invite can be used

#### Defined in

packages/types/dist/discord.d.ts:1549

---

### stage_instance

• `Optional` **stage_instance**: [`DiscordInviteStageInstance`](discordeno_bot.DiscordInviteStageInstance.md)

Stage instance data if there is a public Stage instance in the Stage channel this invite is for

#### Inherited from

[DiscordInvite](discordeno_bot.DiscordInvite.md).[stage_instance](discordeno_bot.DiscordInvite.md#stage_instance)

#### Defined in

packages/types/dist/discord.d.ts:1580

---

### target_application

• `Optional` **target_application**: `Partial`<[`DiscordApplication`](discordeno_bot.DiscordApplication.md)\>

The embedded application to open for this voice channel embedded application invite

#### Inherited from

[DiscordInvite](discordeno_bot.DiscordInvite.md).[target_application](discordeno_bot.DiscordInvite.md#target_application)

#### Defined in

packages/types/dist/discord.d.ts:1572

---

### target_type

• `Optional` **target_type**: [`TargetTypes`](../enums/discordeno_bot.TargetTypes.md)

The type of target for this voice channel invite

#### Inherited from

[DiscordInvite](discordeno_bot.DiscordInvite.md).[target_type](discordeno_bot.DiscordInvite.md#target_type)

#### Defined in

packages/types/dist/discord.d.ts:1568

---

### target_user

• `Optional` **target_user**: [`DiscordUser`](discordeno_bot.DiscordUser.md)

The target user for this invite

#### Inherited from

[DiscordInvite](discordeno_bot.DiscordInvite.md).[target_user](discordeno_bot.DiscordInvite.md#target_user)

#### Defined in

packages/types/dist/discord.d.ts:1570

---

### temporary

• **temporary**: `boolean`

Whether this invite only grants temporary membership

#### Defined in

packages/types/dist/discord.d.ts:1553

---

### uses

• **uses**: `number`

Number of times this invite has been used

#### Defined in

packages/types/dist/discord.d.ts:1547
