[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordAllowedMentions

# Interface: DiscordAllowedMentions

[@discordeno/types](../modules/discordeno_types.md).DiscordAllowedMentions

https://discord.com/developers/docs/resources/channel#allowed-mentions-object

## Table of contents

### Properties

- [parse](discordeno_types.DiscordAllowedMentions.md#parse)
- [replied_user](discordeno_types.DiscordAllowedMentions.md#replied_user)
- [roles](discordeno_types.DiscordAllowedMentions.md#roles)
- [users](discordeno_types.DiscordAllowedMentions.md#users)

## Properties

### parse

• `Optional` **parse**: [`AllowedMentionsTypes`](../enums/discordeno_types.AllowedMentionsTypes.md)[]

An array of allowed mention types to parse from the content.

#### Defined in

[packages/types/src/discord.ts:333](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L333)

---

### replied_user

• `Optional` **replied_user**: `boolean`

For replies, whether to mention the author of the message being replied to (default false)

#### Defined in

[packages/types/src/discord.ts:335](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L335)

---

### roles

• `Optional` **roles**: `string`[]

Array of role_ids to mention (Max size of 100)

#### Defined in

[packages/types/src/discord.ts:338](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L338)

---

### users

• `Optional` **users**: `string`[]

Array of user_ids to mention (Max size of 100)

#### Defined in

[packages/types/src/discord.ts:340](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L340)
