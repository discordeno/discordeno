[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordWelcomeScreenChannel

# Interface: DiscordWelcomeScreenChannel

[@discordeno/types](../modules/discordeno_types.md).DiscordWelcomeScreenChannel

https://discord.com/developers/docs/resources/guild#welcome-screen-object-welcome-screen-channel-structure

## Table of contents

### Properties

- [channel_id](discordeno_types.DiscordWelcomeScreenChannel.md#channel_id)
- [description](discordeno_types.DiscordWelcomeScreenChannel.md#description)
- [emoji_id](discordeno_types.DiscordWelcomeScreenChannel.md#emoji_id)
- [emoji_name](discordeno_types.DiscordWelcomeScreenChannel.md#emoji_name)

## Properties

### channel_id

• **channel_id**: `string`

The channel's id

#### Defined in

[packages/types/src/discord.ts:821](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L821)

---

### description

• **description**: `string`

The description shown for the channel

#### Defined in

[packages/types/src/discord.ts:818](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L818)

---

### emoji_id

• **emoji_id**: `null` \| `string`

The emoji id, if the emoji is custom

#### Defined in

[packages/types/src/discord.ts:823](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L823)

---

### emoji_name

• **emoji_name**: `null` \| `string`

The emoji name if custom, the unicode character if standard, or `null` if no emoji is set

#### Defined in

[packages/types/src/discord.ts:825](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L825)
