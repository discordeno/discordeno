[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / WelcomeScreenChannel

# Interface: WelcomeScreenChannel

[@discordeno/bot](../modules/discordeno_bot.md).WelcomeScreenChannel

## Table of contents

### Properties

- [channelId](discordeno_bot.WelcomeScreenChannel.md#channelid)
- [description](discordeno_bot.WelcomeScreenChannel.md#description)
- [emojiId](discordeno_bot.WelcomeScreenChannel.md#emojiid)
- [emojiName](discordeno_bot.WelcomeScreenChannel.md#emojiname)

## Properties

### channelId

• **channelId**: [`BigString`](../modules/discordeno_bot.md#bigstring)

The channel's id

#### Defined in

[packages/bot/src/helpers/guilds/editWelcomeScreen.ts:56](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/editWelcomeScreen.ts#L56)

---

### description

• **description**: `string`

The description shown for the channel

#### Defined in

[packages/bot/src/helpers/guilds/editWelcomeScreen.ts:62](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/editWelcomeScreen.ts#L62)

---

### emojiId

• `Optional` **emojiId**: [`BigString`](../modules/discordeno_bot.md#bigstring)

The emoji id, if the emoji is custom

#### Defined in

[packages/bot/src/helpers/guilds/editWelcomeScreen.ts:58](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/editWelcomeScreen.ts#L58)

---

### emojiName

• `Optional` **emojiName**: `string`

The emoji name if custom, the unicode character if standard, or `null` if no emoji is set

#### Defined in

[packages/bot/src/helpers/guilds/editWelcomeScreen.ts:60](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/editWelcomeScreen.ts#L60)
