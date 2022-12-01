[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordInteractionDataResolved

# Interface: DiscordInteractionDataResolved

[@discordeno/types](../modules/discordeno_types.md).DiscordInteractionDataResolved

## Table of contents

### Properties

- [attachments](discordeno_types.DiscordInteractionDataResolved.md#attachments)
- [channels](discordeno_types.DiscordInteractionDataResolved.md#channels)
- [members](discordeno_types.DiscordInteractionDataResolved.md#members)
- [messages](discordeno_types.DiscordInteractionDataResolved.md#messages)
- [roles](discordeno_types.DiscordInteractionDataResolved.md#roles)
- [users](discordeno_types.DiscordInteractionDataResolved.md#users)

## Properties

### attachments

• `Optional` **attachments**: `Record`<`string`, [`DiscordAttachment`](discordeno_types.DiscordAttachment.md)\>

The Ids and attachments objects

#### Defined in

[packages/types/src/discord.ts:1398](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1398)

---

### channels

• `Optional` **channels**: `Record`<`string`, `Pick`<[`DiscordChannel`](discordeno_types.DiscordChannel.md), `"id"` \| `"type"` \| `"name"` \| `"permissions"`\>\>

The Ids and partial Channel objects

#### Defined in

[packages/types/src/discord.ts:1396](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1396)

---

### members

• `Optional` **members**: `Record`<`string`, `Omit`<[`DiscordInteractionMember`](discordeno_types.DiscordInteractionMember.md), `"deaf"` \| `"mute"` \| `"user"`\>\>

The Ids and partial Member objects

#### Defined in

[packages/types/src/discord.ts:1392](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1392)

---

### messages

• `Optional` **messages**: `Record`<`string`, [`DiscordMessage`](discordeno_types.DiscordMessage.md)\>

The Ids and Message objects

#### Defined in

[packages/types/src/discord.ts:1388](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1388)

---

### roles

• `Optional` **roles**: `Record`<`string`, [`DiscordRole`](discordeno_types.DiscordRole.md)\>

The Ids and Role objects

#### Defined in

[packages/types/src/discord.ts:1394](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1394)

---

### users

• `Optional` **users**: `Record`<`string`, [`DiscordUser`](discordeno_types.DiscordUser.md)\>

The Ids and User objects

#### Defined in

[packages/types/src/discord.ts:1390](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1390)
