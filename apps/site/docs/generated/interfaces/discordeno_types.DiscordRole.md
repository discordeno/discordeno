[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordRole

# Interface: DiscordRole

[@discordeno/types](../modules/discordeno_types.md).DiscordRole

https://discord.com/developers/docs/topics/permissions#role-object-role-structure

## Table of contents

### Properties

- [color](discordeno_types.DiscordRole.md#color)
- [hoist](discordeno_types.DiscordRole.md#hoist)
- [icon](discordeno_types.DiscordRole.md#icon)
- [id](discordeno_types.DiscordRole.md#id)
- [managed](discordeno_types.DiscordRole.md#managed)
- [mentionable](discordeno_types.DiscordRole.md#mentionable)
- [name](discordeno_types.DiscordRole.md#name)
- [permissions](discordeno_types.DiscordRole.md#permissions)
- [position](discordeno_types.DiscordRole.md#position)
- [tags](discordeno_types.DiscordRole.md#tags)
- [unicode_emoji](discordeno_types.DiscordRole.md#unicode_emoji)

## Properties

### color

• **color**: `number`

Integer representation of hexadecimal color code

#### Defined in

[packages/types/src/discord.ts:657](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L657)

---

### hoist

• **hoist**: `boolean`

If this role is showed separately in the user listing

#### Defined in

[packages/types/src/discord.ts:643](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L643)

---

### icon

• `Optional` **icon**: `string`

the role emoji hash

#### Defined in

[packages/types/src/discord.ts:653](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L653)

---

### id

• **id**: `string`

Role id

#### Defined in

[packages/types/src/discord.ts:641](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L641)

---

### managed

• **managed**: `boolean`

Whether this role is managed by an integration

#### Defined in

[packages/types/src/discord.ts:647](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L647)

---

### mentionable

• **mentionable**: `boolean`

Whether this role is mentionable

#### Defined in

[packages/types/src/discord.ts:649](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L649)

---

### name

• **name**: `string`

Role name

#### Defined in

[packages/types/src/discord.ts:655](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L655)

---

### permissions

• **permissions**: `string`

Permission bit set

#### Defined in

[packages/types/src/discord.ts:645](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L645)

---

### position

• **position**: `number`

Position of this role

#### Defined in

[packages/types/src/discord.ts:659](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L659)

---

### tags

• `Optional` **tags**: [`DiscordRoleTags`](discordeno_types.DiscordRoleTags.md)

The tags this role has

#### Defined in

[packages/types/src/discord.ts:651](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L651)

---

### unicode_emoji

• `Optional` **unicode_emoji**: `string`

role unicode emoji

#### Defined in

[packages/types/src/discord.ts:661](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L661)
