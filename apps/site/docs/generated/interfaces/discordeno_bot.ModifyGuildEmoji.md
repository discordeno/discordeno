[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / ModifyGuildEmoji

# Interface: ModifyGuildEmoji

[@discordeno/bot](../modules/discordeno_bot.md).ModifyGuildEmoji

https://discord.com/developers/docs/resources/emoji#modify-guild-emoji

## Hierarchy

- [`WithReason`](discordeno_bot.WithReason.md)

  ↳ **`ModifyGuildEmoji`**

## Table of contents

### Properties

- [name](discordeno_bot.ModifyGuildEmoji.md#name)
- [reason](discordeno_bot.ModifyGuildEmoji.md#reason)
- [roles](discordeno_bot.ModifyGuildEmoji.md#roles)

## Properties

### name

• `Optional` **name**: `string`

Name of the emoji

#### Defined in

[packages/bot/src/helpers/emojis/editEmoji.ts:46](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/emojis/editEmoji.ts#L46)

---

### reason

• `Optional` **reason**: `string`

The reason which should be added in the audit logs for doing this action.

#### Inherited from

[WithReason](discordeno_bot.WithReason.md).[reason](discordeno_bot.WithReason.md#reason)

#### Defined in

packages/types/dist/discordeno.d.ts:177

---

### roles

• `Optional` **roles**: `null` \| [`BigString`](../modules/discordeno_bot.md#bigstring)[]

Roles allowed to use this emoji

#### Defined in

[packages/bot/src/helpers/emojis/editEmoji.ts:48](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/emojis/editEmoji.ts#L48)
