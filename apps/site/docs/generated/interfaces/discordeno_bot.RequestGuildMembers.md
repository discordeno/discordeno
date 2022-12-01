[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / RequestGuildMembers

# Interface: RequestGuildMembers

[@discordeno/bot](../modules/discordeno_bot.md).RequestGuildMembers

https://discord.com/developers/docs/topics/gateway#request-guild-members

## Table of contents

### Properties

- [guildId](discordeno_bot.RequestGuildMembers.md#guildid)
- [limit](discordeno_bot.RequestGuildMembers.md#limit)
- [nonce](discordeno_bot.RequestGuildMembers.md#nonce)
- [presences](discordeno_bot.RequestGuildMembers.md#presences)
- [query](discordeno_bot.RequestGuildMembers.md#query)
- [userIds](discordeno_bot.RequestGuildMembers.md#userids)

## Properties

### guildId

• **guildId**: [`BigString`](../modules/discordeno_bot.md#bigstring)

id of the guild to get members for

#### Defined in

[packages/bot/src/helpers/members/fetchMembers.ts:73](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/members/fetchMembers.ts#L73)

---

### limit

• **limit**: `number`

Maximum number of members to send matching the query; a limit of 0 can be used with an empty string query to return all members

#### Defined in

[packages/bot/src/helpers/members/fetchMembers.ts:77](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/members/fetchMembers.ts#L77)

---

### nonce

• `Optional` **nonce**: `string`

Nonce to identify the Guild Members Chunk response

#### Defined in

[packages/bot/src/helpers/members/fetchMembers.ts:83](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/members/fetchMembers.ts#L83)

---

### presences

• `Optional` **presences**: `boolean`

Used to specify if we want the presences of the matched members

#### Defined in

[packages/bot/src/helpers/members/fetchMembers.ts:79](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/members/fetchMembers.ts#L79)

---

### query

• `Optional` **query**: `string`

String that username starts with, or an empty string to return all members

#### Defined in

[packages/bot/src/helpers/members/fetchMembers.ts:75](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/members/fetchMembers.ts#L75)

---

### userIds

• `Optional` **userIds**: [`BigString`](../modules/discordeno_bot.md#bigstring)[]

Used to specify which users you wish to fetch

#### Defined in

[packages/bot/src/helpers/members/fetchMembers.ts:81](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/members/fetchMembers.ts#L81)
