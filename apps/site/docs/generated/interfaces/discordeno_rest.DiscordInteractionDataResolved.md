[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/rest](../modules/discordeno_rest.md) / DiscordInteractionDataResolved

# Interface: DiscordInteractionDataResolved

[@discordeno/rest](../modules/discordeno_rest.md).DiscordInteractionDataResolved

## Table of contents

### Properties

- [attachments](discordeno_rest.DiscordInteractionDataResolved.md#attachments)
- [channels](discordeno_rest.DiscordInteractionDataResolved.md#channels)
- [members](discordeno_rest.DiscordInteractionDataResolved.md#members)
- [messages](discordeno_rest.DiscordInteractionDataResolved.md#messages)
- [roles](discordeno_rest.DiscordInteractionDataResolved.md#roles)
- [users](discordeno_rest.DiscordInteractionDataResolved.md#users)

## Properties

### attachments

• `Optional` **attachments**: `Record`<`string`, [`DiscordAttachment`](discordeno_rest.DiscordAttachment.md)\>

The Ids and attachments objects

#### Defined in

packages/types/dist/discord.d.ts:1245

---

### channels

• `Optional` **channels**: `Record`<`string`, `Pick`<[`DiscordChannel`](discordeno_rest.DiscordChannel.md), `"name"` \| `"type"` \| `"id"` \| `"permissions"`\>\>

The Ids and partial Channel objects

#### Defined in

packages/types/dist/discord.d.ts:1243

---

### members

• `Optional` **members**: `Record`<`string`, `Omit`<[`DiscordInteractionMember`](discordeno_rest.DiscordInteractionMember.md), `"deaf"` \| `"mute"` \| `"user"`\>\>

The Ids and partial Member objects

#### Defined in

packages/types/dist/discord.d.ts:1239

---

### messages

• `Optional` **messages**: `Record`<`string`, [`DiscordMessage`](discordeno_rest.DiscordMessage.md)\>

The Ids and Message objects

#### Defined in

packages/types/dist/discord.d.ts:1235

---

### roles

• `Optional` **roles**: `Record`<`string`, [`DiscordRole`](discordeno_rest.DiscordRole.md)\>

The Ids and Role objects

#### Defined in

packages/types/dist/discord.d.ts:1241

---

### users

• `Optional` **users**: `Record`<`string`, [`DiscordUser`](discordeno_rest.DiscordUser.md)\>

The Ids and User objects

#### Defined in

packages/types/dist/discord.d.ts:1237
