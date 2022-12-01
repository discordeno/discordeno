[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordThreadMembersUpdate

# Interface: DiscordThreadMembersUpdate

[@discordeno/types](../modules/discordeno_types.md).DiscordThreadMembersUpdate

https://discord.com/developers/docs/topics/gateway#thread-members-update-thread-members-update-event-fields

## Table of contents

### Properties

- [added_members](discordeno_types.DiscordThreadMembersUpdate.md#added_members)
- [guild_id](discordeno_types.DiscordThreadMembersUpdate.md#guild_id)
- [id](discordeno_types.DiscordThreadMembersUpdate.md#id)
- [member_count](discordeno_types.DiscordThreadMembersUpdate.md#member_count)
- [removed_member_ids](discordeno_types.DiscordThreadMembersUpdate.md#removed_member_ids)

## Properties

### added_members

• `Optional` **added_members**: [`DiscordThreadMember`](discordeno_types.DiscordThreadMember.md)[]

The users who were added to the thread

#### Defined in

[packages/types/src/discord.ts:2307](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2307)

---

### guild_id

• **guild_id**: `string`

The id of the guild

#### Defined in

[packages/types/src/discord.ts:2305](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2305)

---

### id

• **id**: `string`

The id of the thread

#### Defined in

[packages/types/src/discord.ts:2303](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2303)

---

### member_count

• **member_count**: `number`

the approximate number of members in the thread, capped at 50

#### Defined in

[packages/types/src/discord.ts:2311](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2311)

---

### removed_member_ids

• `Optional` **removed_member_ids**: `string`[]

The id of the users who were removed from the thread

#### Defined in

[packages/types/src/discord.ts:2309](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L2309)
