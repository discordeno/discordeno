[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordInvite

# Interface: DiscordInvite

[@discordeno/types](../modules/discordeno_types.md).DiscordInvite

https://discord.com/developers/docs/resources/invite#invite-object

## Hierarchy

- **`DiscordInvite`**

  ↳ [`DiscordInviteMetadata`](discordeno_types.DiscordInviteMetadata.md)

## Table of contents

### Properties

- [approximate_member_count](discordeno_types.DiscordInvite.md#approximate_member_count)
- [approximate_presence_count](discordeno_types.DiscordInvite.md#approximate_presence_count)
- [channel](discordeno_types.DiscordInvite.md#channel)
- [code](discordeno_types.DiscordInvite.md#code)
- [expires_at](discordeno_types.DiscordInvite.md#expires_at)
- [guild](discordeno_types.DiscordInvite.md#guild)
- [guild_scheduled_event](discordeno_types.DiscordInvite.md#guild_scheduled_event)
- [inviter](discordeno_types.DiscordInvite.md#inviter)
- [stage_instance](discordeno_types.DiscordInvite.md#stage_instance)
- [target_application](discordeno_types.DiscordInvite.md#target_application)
- [target_type](discordeno_types.DiscordInvite.md#target_type)
- [target_user](discordeno_types.DiscordInvite.md#target_user)

## Properties

### approximate_member_count

• `Optional` **approximate_member_count**: `number`

Approximate count of total members

#### Defined in

[packages/types/src/discord.ts:1820](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1820)

---

### approximate_presence_count

• `Optional` **approximate_presence_count**: `number`

Approximate count of online members (only present when target_user is set)

#### Defined in

[packages/types/src/discord.ts:1818](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1818)

---

### channel

• **channel**: `null` \| `Partial`<[`DiscordChannel`](discordeno_types.DiscordChannel.md)\>

The channel this invite is for

#### Defined in

[packages/types/src/discord.ts:1808](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1808)

---

### code

• **code**: `string`

The invite code (unique Id)

#### Defined in

[packages/types/src/discord.ts:1804](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1804)

---

### expires_at

• `Optional` **expires_at**: `null` \| `string`

The expiration date of this invite, returned from the `GET /invites/<code>` endpoint when `with_expiration` is `true`

#### Defined in

[packages/types/src/discord.ts:1822](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1822)

---

### guild

• `Optional` **guild**: `Partial`<[`DiscordGuild`](discordeno_types.DiscordGuild.md)\>

The guild this invite is for

#### Defined in

[packages/types/src/discord.ts:1806](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1806)

---

### guild_scheduled_event

• `Optional` **guild_scheduled_event**: [`DiscordScheduledEvent`](discordeno_types.DiscordScheduledEvent.md)

guild scheduled event data

#### Defined in

[packages/types/src/discord.ts:1826](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1826)

---

### inviter

• `Optional` **inviter**: [`DiscordUser`](discordeno_types.DiscordUser.md)

The user who created the invite

#### Defined in

[packages/types/src/discord.ts:1810](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1810)

---

### stage_instance

• `Optional` **stage_instance**: [`DiscordInviteStageInstance`](discordeno_types.DiscordInviteStageInstance.md)

Stage instance data if there is a public Stage instance in the Stage channel this invite is for

#### Defined in

[packages/types/src/discord.ts:1824](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1824)

---

### target_application

• `Optional` **target_application**: `Partial`<[`DiscordApplication`](discordeno_types.DiscordApplication.md)\>

The embedded application to open for this voice channel embedded application invite

#### Defined in

[packages/types/src/discord.ts:1816](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1816)

---

### target_type

• `Optional` **target_type**: [`TargetTypes`](../enums/discordeno_types.TargetTypes.md)

The type of target for this voice channel invite

#### Defined in

[packages/types/src/discord.ts:1812](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1812)

---

### target_user

• `Optional` **target_user**: [`DiscordUser`](discordeno_types.DiscordUser.md)

The target user for this invite

#### Defined in

[packages/types/src/discord.ts:1814](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1814)
