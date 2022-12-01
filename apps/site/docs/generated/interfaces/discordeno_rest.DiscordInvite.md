[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/rest](../modules/discordeno_rest.md) / DiscordInvite

# Interface: DiscordInvite

[@discordeno/rest](../modules/discordeno_rest.md).DiscordInvite

https://discord.com/developers/docs/resources/invite#invite-object

## Hierarchy

- **`DiscordInvite`**

  ↳ [`DiscordInviteMetadata`](discordeno_rest.DiscordInviteMetadata.md)

## Table of contents

### Properties

- [approximate_member_count](discordeno_rest.DiscordInvite.md#approximate_member_count)
- [approximate_presence_count](discordeno_rest.DiscordInvite.md#approximate_presence_count)
- [channel](discordeno_rest.DiscordInvite.md#channel)
- [code](discordeno_rest.DiscordInvite.md#code)
- [expires_at](discordeno_rest.DiscordInvite.md#expires_at)
- [guild](discordeno_rest.DiscordInvite.md#guild)
- [guild_scheduled_event](discordeno_rest.DiscordInvite.md#guild_scheduled_event)
- [inviter](discordeno_rest.DiscordInvite.md#inviter)
- [stage_instance](discordeno_rest.DiscordInvite.md#stage_instance)
- [target_application](discordeno_rest.DiscordInvite.md#target_application)
- [target_type](discordeno_rest.DiscordInvite.md#target_type)
- [target_user](discordeno_rest.DiscordInvite.md#target_user)

## Properties

### approximate_member_count

• `Optional` **approximate_member_count**: `number`

Approximate count of total members

#### Defined in

packages/types/dist/discord.d.ts:1576

---

### approximate_presence_count

• `Optional` **approximate_presence_count**: `number`

Approximate count of online members (only present when target_user is set)

#### Defined in

packages/types/dist/discord.d.ts:1574

---

### channel

• **channel**: `null` \| `Partial`<[`DiscordChannel`](discordeno_rest.DiscordChannel.md)\>

The channel this invite is for

#### Defined in

packages/types/dist/discord.d.ts:1564

---

### code

• **code**: `string`

The invite code (unique Id)

#### Defined in

packages/types/dist/discord.d.ts:1560

---

### expires_at

• `Optional` **expires_at**: `null` \| `string`

The expiration date of this invite, returned from the `GET /invites/<code>` endpoint when `with_expiration` is `true`

#### Defined in

packages/types/dist/discord.d.ts:1578

---

### guild

• `Optional` **guild**: `Partial`<[`DiscordGuild`](discordeno_rest.DiscordGuild.md)\>

The guild this invite is for

#### Defined in

packages/types/dist/discord.d.ts:1562

---

### guild_scheduled_event

• `Optional` **guild_scheduled_event**: [`DiscordScheduledEvent`](discordeno_rest.DiscordScheduledEvent.md)

guild scheduled event data

#### Defined in

packages/types/dist/discord.d.ts:1582

---

### inviter

• `Optional` **inviter**: [`DiscordUser`](discordeno_rest.DiscordUser.md)

The user who created the invite

#### Defined in

packages/types/dist/discord.d.ts:1566

---

### stage_instance

• `Optional` **stage_instance**: [`DiscordInviteStageInstance`](discordeno_rest.DiscordInviteStageInstance.md)

Stage instance data if there is a public Stage instance in the Stage channel this invite is for

#### Defined in

packages/types/dist/discord.d.ts:1580

---

### target_application

• `Optional` **target_application**: `Partial`<[`DiscordApplication`](discordeno_rest.DiscordApplication.md)\>

The embedded application to open for this voice channel embedded application invite

#### Defined in

packages/types/dist/discord.d.ts:1572

---

### target_type

• `Optional` **target_type**: [`TargetTypes`](../enums/discordeno_rest.TargetTypes.md)

The type of target for this voice channel invite

#### Defined in

packages/types/dist/discord.d.ts:1568

---

### target_user

• `Optional` **target_user**: [`DiscordUser`](discordeno_rest.DiscordUser.md)

The target user for this invite

#### Defined in

packages/types/dist/discord.d.ts:1570
