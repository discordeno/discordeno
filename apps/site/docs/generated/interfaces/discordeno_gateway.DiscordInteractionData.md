[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / DiscordInteractionData

# Interface: DiscordInteractionData

[@discordeno/gateway](../modules/discordeno_gateway.md).DiscordInteractionData

## Table of contents

### Properties

- [component_type](discordeno_gateway.DiscordInteractionData.md#component_type)
- [components](discordeno_gateway.DiscordInteractionData.md#components)
- [custom_id](discordeno_gateway.DiscordInteractionData.md#custom_id)
- [guild_id](discordeno_gateway.DiscordInteractionData.md#guild_id)
- [id](discordeno_gateway.DiscordInteractionData.md#id)
- [name](discordeno_gateway.DiscordInteractionData.md#name)
- [options](discordeno_gateway.DiscordInteractionData.md#options)
- [resolved](discordeno_gateway.DiscordInteractionData.md#resolved)
- [target_id](discordeno_gateway.DiscordInteractionData.md#target_id)
- [type](discordeno_gateway.DiscordInteractionData.md#type)
- [values](discordeno_gateway.DiscordInteractionData.md#values)

## Properties

### component_type

• `Optional` **component_type**: [`MessageComponentTypes`](../enums/discordeno_gateway.MessageComponentTypes.md)

The type of component

#### Defined in

packages/types/dist/discord.d.ts:1186

---

### components

• `Optional` **components**: [`DiscordMessageComponents`](../modules/discordeno_gateway.md#discordmessagecomponents)

The components if its a Modal Submit interaction.

#### Defined in

packages/types/dist/discord.d.ts:1190

---

### custom_id

• `Optional` **custom_id**: `string`

The custom id provided for this component.

#### Defined in

packages/types/dist/discord.d.ts:1188

---

### guild_id

• `Optional` **guild_id**: `string`

the id of the guild the command is registered to

#### Defined in

packages/types/dist/discord.d.ts:1219

---

### id

• **id**: `string`

The Id of the invoked command

#### Defined in

packages/types/dist/discord.d.ts:1194

---

### name

• **name**: `string`

The name of the invoked command

#### Defined in

packages/types/dist/discord.d.ts:1196

---

### options

• `Optional` **options**: [`DiscordInteractionDataOption`](discordeno_gateway.DiscordInteractionDataOption.md)[]

The params + values from the user

#### Defined in

packages/types/dist/discord.d.ts:1215

---

### resolved

• `Optional` **resolved**: `Object`

Converted users + roles + channels + attachments

#### Type declaration

| Name          | Type                                                                                                                                         | Description                         |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------- |
| `attachments` | `Record`<`string`, [`DiscordAttachment`](discordeno_gateway.DiscordAttachment.md)\>                                                          | The ids and attachment objects      |
| `channels?`   | `Record`<`string`, `Pick`<[`DiscordChannel`](discordeno_gateway.DiscordChannel.md), `"type"` \| `"id"` \| `"name"` \| `"permissions"`\>\>    | The Ids and partial Channel objects |
| `members?`    | `Record`<`string`, `Omit`<[`DiscordInteractionMember`](discordeno_gateway.DiscordInteractionMember.md), `"deaf"` \| `"mute"` \| `"user"`\>\> | The Ids and partial Member objects  |
| `messages?`   | `Record`<`string`, [`DiscordMessage`](discordeno_gateway.DiscordMessage.md)\>                                                                | The Ids and Message objects         |
| `roles?`      | `Record`<`string`, [`DiscordRole`](discordeno_gateway.DiscordRole.md)\>                                                                      | The Ids and Role objects            |
| `users?`      | `Record`<`string`, [`DiscordUser`](discordeno_gateway.DiscordUser.md)\>                                                                      | The Ids and User objects            |

#### Defined in

packages/types/dist/discord.d.ts:1200

---

### target_id

• `Optional` **target_id**: `string`

The target id if this is a context menu command.

#### Defined in

packages/types/dist/discord.d.ts:1217

---

### type

• **type**: [`ApplicationCommandTypes`](../enums/discordeno_gateway.ApplicationCommandTypes.md)

the type of the invoked command

#### Defined in

packages/types/dist/discord.d.ts:1198

---

### values

• `Optional` **values**: `string`[]

The values chosen by the user.

#### Defined in

packages/types/dist/discord.d.ts:1192
