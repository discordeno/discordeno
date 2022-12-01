[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / DiscordInteractionDataResolved

# Interface: DiscordInteractionDataResolved

[@discordeno/gateway](../modules/discordeno_gateway.md).DiscordInteractionDataResolved

## Table of contents

### Properties

- [attachments](discordeno_gateway.DiscordInteractionDataResolved.md#attachments)
- [channels](discordeno_gateway.DiscordInteractionDataResolved.md#channels)
- [members](discordeno_gateway.DiscordInteractionDataResolved.md#members)
- [messages](discordeno_gateway.DiscordInteractionDataResolved.md#messages)
- [roles](discordeno_gateway.DiscordInteractionDataResolved.md#roles)
- [users](discordeno_gateway.DiscordInteractionDataResolved.md#users)

## Properties

### attachments

• `Optional` **attachments**: `Record`<`string`, [`DiscordAttachment`](discordeno_gateway.DiscordAttachment.md)\>

The Ids and attachments objects

#### Defined in

packages/types/dist/discord.d.ts:1245

---

### channels

• `Optional` **channels**: `Record`<`string`, `Pick`<[`DiscordChannel`](discordeno_gateway.DiscordChannel.md), `"type"` \| `"id"` \| `"name"` \| `"permissions"`\>\>

The Ids and partial Channel objects

#### Defined in

packages/types/dist/discord.d.ts:1243

---

### members

• `Optional` **members**: `Record`<`string`, `Omit`<[`DiscordInteractionMember`](discordeno_gateway.DiscordInteractionMember.md), `"deaf"` \| `"mute"` \| `"user"`\>\>

The Ids and partial Member objects

#### Defined in

packages/types/dist/discord.d.ts:1239

---

### messages

• `Optional` **messages**: `Record`<`string`, [`DiscordMessage`](discordeno_gateway.DiscordMessage.md)\>

The Ids and Message objects

#### Defined in

packages/types/dist/discord.d.ts:1235

---

### roles

• `Optional` **roles**: `Record`<`string`, [`DiscordRole`](discordeno_gateway.DiscordRole.md)\>

The Ids and Role objects

#### Defined in

packages/types/dist/discord.d.ts:1241

---

### users

• `Optional` **users**: `Record`<`string`, [`DiscordUser`](discordeno_gateway.DiscordUser.md)\>

The Ids and User objects

#### Defined in

packages/types/dist/discord.d.ts:1237
