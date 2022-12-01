[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordInteractionData

# Interface: DiscordInteractionData

[@discordeno/types](../modules/discordeno_types.md).DiscordInteractionData

## Table of contents

### Properties

- [component_type](discordeno_types.DiscordInteractionData.md#component_type)
- [components](discordeno_types.DiscordInteractionData.md#components)
- [custom_id](discordeno_types.DiscordInteractionData.md#custom_id)
- [guild_id](discordeno_types.DiscordInteractionData.md#guild_id)
- [id](discordeno_types.DiscordInteractionData.md#id)
- [name](discordeno_types.DiscordInteractionData.md#name)
- [options](discordeno_types.DiscordInteractionData.md#options)
- [resolved](discordeno_types.DiscordInteractionData.md#resolved)
- [target_id](discordeno_types.DiscordInteractionData.md#target_id)
- [type](discordeno_types.DiscordInteractionData.md#type)
- [values](discordeno_types.DiscordInteractionData.md#values)

## Properties

### component_type

• `Optional` **component_type**: [`MessageComponentTypes`](../enums/discordeno_types.MessageComponentTypes.md)

The type of component

#### Defined in

[packages/types/src/discord.ts:1337](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1337)

---

### components

• `Optional` **components**: [`DiscordMessageComponents`](../modules/discordeno_types.md#discordmessagecomponents)

The components if its a Modal Submit interaction.

#### Defined in

[packages/types/src/discord.ts:1341](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1341)

---

### custom_id

• `Optional` **custom_id**: `string`

The custom id provided for this component.

#### Defined in

[packages/types/src/discord.ts:1339](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1339)

---

### guild_id

• `Optional` **guild_id**: `string`

the id of the guild the command is registered to

#### Defined in

[packages/types/src/discord.ts:1370](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1370)

---

### id

• **id**: `string`

The Id of the invoked command

#### Defined in

[packages/types/src/discord.ts:1345](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1345)

---

### name

• **name**: `string`

The name of the invoked command

#### Defined in

[packages/types/src/discord.ts:1347](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1347)

---

### options

• `Optional` **options**: [`DiscordInteractionDataOption`](discordeno_types.DiscordInteractionDataOption.md)[]

The params + values from the user

#### Defined in

[packages/types/src/discord.ts:1366](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1366)

---

### resolved

• `Optional` **resolved**: `Object`

Converted users + roles + channels + attachments

#### Type declaration

| Name          | Type                                                                                                                                       | Description                         |
| :------------ | :----------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------- |
| `attachments` | `Record`<`string`, [`DiscordAttachment`](discordeno_types.DiscordAttachment.md)\>                                                          | The ids and attachment objects      |
| `channels?`   | `Record`<`string`, `Pick`<[`DiscordChannel`](discordeno_types.DiscordChannel.md), `"id"` \| `"type"` \| `"name"` \| `"permissions"`\>\>    | The Ids and partial Channel objects |
| `members?`    | `Record`<`string`, `Omit`<[`DiscordInteractionMember`](discordeno_types.DiscordInteractionMember.md), `"deaf"` \| `"mute"` \| `"user"`\>\> | The Ids and partial Member objects  |
| `messages?`   | `Record`<`string`, [`DiscordMessage`](discordeno_types.DiscordMessage.md)\>                                                                | The Ids and Message objects         |
| `roles?`      | `Record`<`string`, [`DiscordRole`](discordeno_types.DiscordRole.md)\>                                                                      | The Ids and Role objects            |
| `users?`      | `Record`<`string`, [`DiscordUser`](discordeno_types.DiscordUser.md)\>                                                                      | The Ids and User objects            |

#### Defined in

[packages/types/src/discord.ts:1351](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1351)

---

### target_id

• `Optional` **target_id**: `string`

The target id if this is a context menu command.

#### Defined in

[packages/types/src/discord.ts:1368](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1368)

---

### type

• **type**: [`ApplicationCommandTypes`](../enums/discordeno_types.ApplicationCommandTypes.md)

the type of the invoked command

#### Defined in

[packages/types/src/discord.ts:1349](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1349)

---

### values

• `Optional` **values**: `string`[]

The values chosen by the user.

#### Defined in

[packages/types/src/discord.ts:1343](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1343)
