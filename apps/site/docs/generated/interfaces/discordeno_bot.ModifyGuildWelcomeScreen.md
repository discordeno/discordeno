[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / ModifyGuildWelcomeScreen

# Interface: ModifyGuildWelcomeScreen

[@discordeno/bot](../modules/discordeno_bot.md).ModifyGuildWelcomeScreen

https://discord.com/developers/docs/resources/guild#modify-guild-welcome-screen

## Table of contents

### Properties

- [description](discordeno_bot.ModifyGuildWelcomeScreen.md#description)
- [enabled](discordeno_bot.ModifyGuildWelcomeScreen.md#enabled)
- [welcomeScreen](discordeno_bot.ModifyGuildWelcomeScreen.md#welcomescreen)

## Properties

### description

• `Optional` **description**: `null` \| `string`

The server description to show in the welcome screen

#### Defined in

[packages/bot/src/helpers/guilds/editWelcomeScreen.ts:51](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/editWelcomeScreen.ts#L51)

---

### enabled

• `Optional` **enabled**: `null` \| `boolean`

Whether the welcome screen is enabled

#### Defined in

[packages/bot/src/helpers/guilds/editWelcomeScreen.ts:47](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/editWelcomeScreen.ts#L47)

---

### welcomeScreen

• `Optional` **welcomeScreen**: `null` \| [`WelcomeScreenChannel`](discordeno_bot.WelcomeScreenChannel.md)[]

Channels linked in the welcome screen and their display options

#### Defined in

[packages/bot/src/helpers/guilds/editWelcomeScreen.ts:49](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/editWelcomeScreen.ts#L49)
