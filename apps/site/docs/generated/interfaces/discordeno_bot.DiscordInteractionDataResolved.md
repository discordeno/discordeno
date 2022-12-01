[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / DiscordInteractionDataResolved

# Interface: DiscordInteractionDataResolved

[@discordeno/bot](../modules/discordeno_bot.md).DiscordInteractionDataResolved

## Table of contents

### Properties

- [attachments](discordeno_bot.DiscordInteractionDataResolved.md#attachments)
- [channels](discordeno_bot.DiscordInteractionDataResolved.md#channels)
- [members](discordeno_bot.DiscordInteractionDataResolved.md#members)
- [messages](discordeno_bot.DiscordInteractionDataResolved.md#messages)
- [roles](discordeno_bot.DiscordInteractionDataResolved.md#roles)
- [users](discordeno_bot.DiscordInteractionDataResolved.md#users)

## Properties

### attachments

• `Optional` **attachments**: `Record`<`string`, [`DiscordAttachment`](discordeno_bot.DiscordAttachment.md)\>

The Ids and attachments objects

#### Defined in

packages/types/dist/discord.d.ts:1245

---

### channels

• `Optional` **channels**: `Record`<`string`, `Pick`<[`DiscordChannel`](discordeno_bot.DiscordChannel.md), `"type"` \| `"name"` \| `"id"` \| `"permissions"`\>\>

The Ids and partial Channel objects

#### Defined in

packages/types/dist/discord.d.ts:1243

---

### members

• `Optional` **members**: `Record`<`string`, `Omit`<[`DiscordInteractionMember`](discordeno_bot.DiscordInteractionMember.md), `"user"` \| `"deaf"` \| `"mute"`\>\>

The Ids and partial Member objects

#### Defined in

packages/types/dist/discord.d.ts:1239

---

### messages

• `Optional` **messages**: `Record`<`string`, [`DiscordMessage`](discordeno_bot.DiscordMessage.md)\>

The Ids and Message objects

#### Defined in

packages/types/dist/discord.d.ts:1235

---

### roles

• `Optional` **roles**: `Record`<`string`, [`DiscordRole`](discordeno_bot.DiscordRole.md)\>

The Ids and Role objects

#### Defined in

packages/types/dist/discord.d.ts:1241

---

### users

• `Optional` **users**: `Record`<`string`, [`DiscordUser`](discordeno_bot.DiscordUser.md)\>

The Ids and User objects

#### Defined in

packages/types/dist/discord.d.ts:1237
