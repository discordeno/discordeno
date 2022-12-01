[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordInviteMetadata

# Interface: DiscordInviteMetadata

[@discordeno/types](../modules/discordeno_types.md).DiscordInviteMetadata

https://discord.com/developers/docs/resources/invite#invite-metadata-object

## Hierarchy

- [`DiscordInvite`](discordeno_types.DiscordInvite.md)

  ↳ **`DiscordInviteMetadata`**

## Table of contents

### Properties

- [approximate_member_count](discordeno_types.DiscordInviteMetadata.md#approximate_member_count)
- [approximate_presence_count](discordeno_types.DiscordInviteMetadata.md#approximate_presence_count)
- [channel](discordeno_types.DiscordInviteMetadata.md#channel)
- [code](discordeno_types.DiscordInviteMetadata.md#code)
- [created_at](discordeno_types.DiscordInviteMetadata.md#created_at)
- [expires_at](discordeno_types.DiscordInviteMetadata.md#expires_at)
- [guild](discordeno_types.DiscordInviteMetadata.md#guild)
- [guild_scheduled_event](discordeno_types.DiscordInviteMetadata.md#guild_scheduled_event)
- [inviter](discordeno_types.DiscordInviteMetadata.md#inviter)
- [max_age](discordeno_types.DiscordInviteMetadata.md#max_age)
- [max_uses](discordeno_types.DiscordInviteMetadata.md#max_uses)
- [stage_instance](discordeno_types.DiscordInviteMetadata.md#stage_instance)
- [target_application](discordeno_types.DiscordInviteMetadata.md#target_application)
- [target_type](discordeno_types.DiscordInviteMetadata.md#target_type)
- [target_user](discordeno_types.DiscordInviteMetadata.md#target_user)
- [temporary](discordeno_types.DiscordInviteMetadata.md#temporary)
- [uses](discordeno_types.DiscordInviteMetadata.md#uses)

## Properties

### approximate_member_count

• `Optional` **approximate_member_count**: `number`

Approximate count of total members

#### Inherited from

[DiscordInvite](discordeno_types.DiscordInvite.md).[approximate_member_count](discordeno_types.DiscordInvite.md#approximate_member_count)

#### Defined in

[packages/types/src/discord.ts:1820](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1820)

---

### approximate_presence_count

• `Optional` **approximate_presence_count**: `number`

Approximate count of online members (only present when target_user is set)

#### Inherited from

[DiscordInvite](discordeno_types.DiscordInvite.md).[approximate_presence_count](discordeno_types.DiscordInvite.md#approximate_presence_count)

#### Defined in

[packages/types/src/discord.ts:1818](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1818)

---

### channel

• **channel**: `null` \| `Partial`<[`DiscordChannel`](discordeno_types.DiscordChannel.md)\>

The channel this invite is for

#### Inherited from

[DiscordInvite](discordeno_types.DiscordInvite.md).[channel](discordeno_types.DiscordInvite.md#channel)

#### Defined in

[packages/types/src/discord.ts:1808](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1808)

---

### code

• **code**: `string`

The invite code (unique Id)

#### Inherited from

[DiscordInvite](discordeno_types.DiscordInvite.md).[code](discordeno_types.DiscordInvite.md#code)

#### Defined in

[packages/types/src/discord.ts:1804](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1804)

---

### created_at

• **created_at**: `string`

When this invite was created

#### Defined in

[packages/types/src/discord.ts:1798](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1798)

---

### expires_at

• `Optional` **expires_at**: `null` \| `string`

The expiration date of this invite, returned from the `GET /invites/<code>` endpoint when `with_expiration` is `true`

#### Inherited from

[DiscordInvite](discordeno_types.DiscordInvite.md).[expires_at](discordeno_types.DiscordInvite.md#expires_at)

#### Defined in

[packages/types/src/discord.ts:1822](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1822)

---

### guild

• `Optional` **guild**: `Partial`<[`DiscordGuild`](discordeno_types.DiscordGuild.md)\>

The guild this invite is for

#### Inherited from

[DiscordInvite](discordeno_types.DiscordInvite.md).[guild](discordeno_types.DiscordInvite.md#guild)

#### Defined in

[packages/types/src/discord.ts:1806](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1806)

---

### guild_scheduled_event

• `Optional` **guild_scheduled_event**: [`DiscordScheduledEvent`](discordeno_types.DiscordScheduledEvent.md)

guild scheduled event data

#### Inherited from

[DiscordInvite](discordeno_types.DiscordInvite.md).[guild_scheduled_event](discordeno_types.DiscordInvite.md#guild_scheduled_event)

#### Defined in

[packages/types/src/discord.ts:1826](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1826)

---

### inviter

• `Optional` **inviter**: [`DiscordUser`](discordeno_types.DiscordUser.md)

The user who created the invite

#### Inherited from

[DiscordInvite](discordeno_types.DiscordInvite.md).[inviter](discordeno_types.DiscordInvite.md#inviter)

#### Defined in

[packages/types/src/discord.ts:1810](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1810)

---

### max_age

• **max_age**: `number`

Duration (in seconds) after which the invite expires

#### Defined in

[packages/types/src/discord.ts:1794](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1794)

---

### max_uses

• **max_uses**: `number`

Max number of times this invite can be used

#### Defined in

[packages/types/src/discord.ts:1792](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1792)

---

### stage_instance

• `Optional` **stage_instance**: [`DiscordInviteStageInstance`](discordeno_types.DiscordInviteStageInstance.md)

Stage instance data if there is a public Stage instance in the Stage channel this invite is for

#### Inherited from

[DiscordInvite](discordeno_types.DiscordInvite.md).[stage_instance](discordeno_types.DiscordInvite.md#stage_instance)

#### Defined in

[packages/types/src/discord.ts:1824](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1824)

---

### target_application

• `Optional` **target_application**: `Partial`<[`DiscordApplication`](discordeno_types.DiscordApplication.md)\>

The embedded application to open for this voice channel embedded application invite

#### Inherited from

[DiscordInvite](discordeno_types.DiscordInvite.md).[target_application](discordeno_types.DiscordInvite.md#target_application)

#### Defined in

[packages/types/src/discord.ts:1816](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1816)

---

### target_type

• `Optional` **target_type**: [`TargetTypes`](../enums/discordeno_types.TargetTypes.md)

The type of target for this voice channel invite

#### Inherited from

[DiscordInvite](discordeno_types.DiscordInvite.md).[target_type](discordeno_types.DiscordInvite.md#target_type)

#### Defined in

[packages/types/src/discord.ts:1812](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1812)

---

### target_user

• `Optional` **target_user**: [`DiscordUser`](discordeno_types.DiscordUser.md)

The target user for this invite

#### Inherited from

[DiscordInvite](discordeno_types.DiscordInvite.md).[target_user](discordeno_types.DiscordInvite.md#target_user)

#### Defined in

[packages/types/src/discord.ts:1814](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1814)

---

### temporary

• **temporary**: `boolean`

Whether this invite only grants temporary membership

#### Defined in

[packages/types/src/discord.ts:1796](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1796)

---

### uses

• **uses**: `number`

Number of times this invite has been used

#### Defined in

[packages/types/src/discord.ts:1790](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1790)
