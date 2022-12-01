[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordTypingStart

# Interface: DiscordTypingStart

[@discordeno/types](../modules/discordeno_types.md).DiscordTypingStart

https://discord.com/developers/docs/topics/gateway#typing-start

## Table of contents

### Properties

- [channel_id](discordeno_types.DiscordTypingStart.md#channel_id)
- [guild_id](discordeno_types.DiscordTypingStart.md#guild_id)
- [member](discordeno_types.DiscordTypingStart.md#member)
- [timestamp](discordeno_types.DiscordTypingStart.md#timestamp)
- [user_id](discordeno_types.DiscordTypingStart.md#user_id)

## Properties

### channel_id

• **channel_id**: `string`

id of the channel

#### Defined in

[packages/types/src/discord.ts:214](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L214)

---

### guild_id

• `Optional` **guild_id**: `string`

id of the guild

#### Defined in

[packages/types/src/discord.ts:216](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L216)

---

### member

• `Optional` **member**: [`DiscordMember`](discordeno_types.DiscordMember.md)

The member who started typing if this happened in a guild

#### Defined in

[packages/types/src/discord.ts:220](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L220)

---

### timestamp

• **timestamp**: `number`

Unix time (in seconds) of when the user started typing

#### Defined in

[packages/types/src/discord.ts:211](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L211)

---

### user_id

• **user_id**: `string`

id of the user

#### Defined in

[packages/types/src/discord.ts:218](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L218)
