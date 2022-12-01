[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordOverwrite

# Interface: DiscordOverwrite

[@discordeno/types](../modules/discordeno_types.md).DiscordOverwrite

## Table of contents

### Properties

- [allow](discordeno_types.DiscordOverwrite.md#allow)
- [deny](discordeno_types.DiscordOverwrite.md#deny)
- [id](discordeno_types.DiscordOverwrite.md#id)
- [type](discordeno_types.DiscordOverwrite.md#type)

## Properties

### allow

• `Optional` **allow**: `string`

Permission bit set

#### Defined in

[packages/types/src/discord.ts:986](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L986)

---

### deny

• `Optional` **deny**: `string`

Permission bit set

#### Defined in

[packages/types/src/discord.ts:988](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L988)

---

### id

• **id**: `string`

Role or user id

#### Defined in

[packages/types/src/discord.ts:984](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L984)

---

### type

• **type**: [`OverwriteTypes`](../enums/discordeno_types.OverwriteTypes.md)

Either 0 (role) or 1 (member)

#### Defined in

[packages/types/src/discord.ts:982](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L982)
