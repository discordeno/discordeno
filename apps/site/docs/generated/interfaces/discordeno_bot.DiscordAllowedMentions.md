[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / DiscordAllowedMentions

# Interface: DiscordAllowedMentions

[@discordeno/bot](../modules/discordeno_bot.md).DiscordAllowedMentions

https://discord.com/developers/docs/resources/channel#allowed-mentions-object

## Table of contents

### Properties

- [parse](discordeno_bot.DiscordAllowedMentions.md#parse)
- [replied_user](discordeno_bot.DiscordAllowedMentions.md#replied_user)
- [roles](discordeno_bot.DiscordAllowedMentions.md#roles)
- [users](discordeno_bot.DiscordAllowedMentions.md#users)

## Properties

### parse

• `Optional` **parse**: [`AllowedMentionsTypes`](../enums/discordeno_bot.AllowedMentionsTypes.md)[]

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
