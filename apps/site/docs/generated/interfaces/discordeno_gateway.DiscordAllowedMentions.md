[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / DiscordAllowedMentions

# Interface: DiscordAllowedMentions

[@discordeno/gateway](../modules/discordeno_gateway.md).DiscordAllowedMentions

https://discord.com/developers/docs/resources/channel#allowed-mentions-object

## Table of contents

### Properties

- [parse](discordeno_gateway.DiscordAllowedMentions.md#parse)
- [replied_user](discordeno_gateway.DiscordAllowedMentions.md#replied_user)
- [roles](discordeno_gateway.DiscordAllowedMentions.md#roles)
- [users](discordeno_gateway.DiscordAllowedMentions.md#users)

## Properties

### parse

• `Optional` **parse**: [`AllowedMentionsTypes`](../enums/discordeno_gateway.AllowedMentionsTypes.md)[]

An array of allowed mention types to parse from the content.

#### Defined in

packages/types/dist/discord.d.ts:249

---

### replied_user

• `Optional` **replied_user**: `boolean`

For replies, whether to mention the author of the message being replied to (default false)

#### Defined in

packages/types/dist/discord.d.ts:251

---

### roles

• `Optional` **roles**: `string`[]

Array of role_ids to mention (Max size of 100)

#### Defined in

packages/types/dist/discord.d.ts:253

---

### users

• `Optional` **users**: `string`[]

Array of user_ids to mention (Max size of 100)

#### Defined in

packages/types/dist/discord.d.ts:255
