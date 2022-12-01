[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / AllowedMentions

# Interface: AllowedMentions

[@discordeno/bot](../modules/discordeno_bot.md).AllowedMentions

https://discord.com/developers/docs/resources/channel#allowed-mentions-object

## Table of contents

### Properties

- [parse](discordeno_bot.AllowedMentions.md#parse)
- [repliedUser](discordeno_bot.AllowedMentions.md#replieduser)
- [roles](discordeno_bot.AllowedMentions.md#roles)
- [users](discordeno_bot.AllowedMentions.md#users)

## Properties

### parse

• `Optional` **parse**: `AllowedMentionsTypes`[]

An array of allowed mention types to parse from the content.

#### Defined in

packages/types/dist/discordeno.d.ts:154

---

### repliedUser

• `Optional` **repliedUser**: `boolean`

For replies, whether to mention the author of the message being replied to (default false)

#### Defined in

packages/types/dist/discordeno.d.ts:156

---

### roles

• `Optional` **roles**: `bigint`[]

Array of role_ids to mention (Max size of 100)

#### Defined in

packages/types/dist/discordeno.d.ts:158

---

### users

• `Optional` **users**: `bigint`[]

Array of user_ids to mention (Max size of 100)

#### Defined in

packages/types/dist/discordeno.d.ts:160
