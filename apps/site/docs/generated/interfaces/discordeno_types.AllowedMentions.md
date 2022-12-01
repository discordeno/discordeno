[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / AllowedMentions

# Interface: AllowedMentions

[@discordeno/types](../modules/discordeno_types.md).AllowedMentions

https://discord.com/developers/docs/resources/channel#allowed-mentions-object

## Table of contents

### Properties

- [parse](discordeno_types.AllowedMentions.md#parse)
- [repliedUser](discordeno_types.AllowedMentions.md#replieduser)
- [roles](discordeno_types.AllowedMentions.md#roles)
- [users](discordeno_types.AllowedMentions.md#users)

## Properties

### parse

• `Optional` **parse**: [`AllowedMentionsTypes`](../enums/discordeno_types.AllowedMentionsTypes.md)[]

An array of allowed mention types to parse from the content.

#### Defined in

[packages/types/src/discordeno.ts:181](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L181)

---

### repliedUser

• `Optional` **repliedUser**: `boolean`

For replies, whether to mention the author of the message being replied to (default false)

#### Defined in

[packages/types/src/discordeno.ts:183](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L183)

---

### roles

• `Optional` **roles**: `bigint`[]

Array of role_ids to mention (Max size of 100)

#### Defined in

[packages/types/src/discordeno.ts:186](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L186)

---

### users

• `Optional` **users**: `bigint`[]

Array of user_ids to mention (Max size of 100)

#### Defined in

[packages/types/src/discordeno.ts:188](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discordeno.ts#L188)
