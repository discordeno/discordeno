[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / DiscordThreadMembersUpdate

# Interface: DiscordThreadMembersUpdate

[@discordeno/bot](../modules/discordeno_bot.md).DiscordThreadMembersUpdate

https://discord.com/developers/docs/topics/gateway#thread-members-update-thread-members-update-event-fields

## Table of contents

### Properties

- [added_members](discordeno_bot.DiscordThreadMembersUpdate.md#added_members)
- [guild_id](discordeno_bot.DiscordThreadMembersUpdate.md#guild_id)
- [id](discordeno_bot.DiscordThreadMembersUpdate.md#id)
- [member_count](discordeno_bot.DiscordThreadMembersUpdate.md#member_count)
- [removed_member_ids](discordeno_bot.DiscordThreadMembersUpdate.md#removed_member_ids)

## Properties

### added_members

• `Optional` **added_members**: [`DiscordThreadMember`](discordeno_bot.DiscordThreadMember.md)[]

The users who were added to the thread

#### Defined in

packages/types/dist/discord.d.ts:2011

---

### guild_id

• **guild_id**: `string`

The id of the guild

#### Defined in

packages/types/dist/discord.d.ts:2009

---

### id

• **id**: `string`

The id of the thread

#### Defined in

packages/types/dist/discord.d.ts:2007

---

### member_count

• **member_count**: `number`

the approximate number of members in the thread, capped at 50

#### Defined in

packages/types/dist/discord.d.ts:2015

---

### removed_member_ids

• `Optional` **removed_member_ids**: `string`[]

The id of the users who were removed from the thread

#### Defined in

packages/types/dist/discord.d.ts:2013
