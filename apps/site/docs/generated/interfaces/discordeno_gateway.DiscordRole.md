[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / DiscordRole

# Interface: DiscordRole

[@discordeno/gateway](../modules/discordeno_gateway.md).DiscordRole

https://discord.com/developers/docs/topics/permissions#role-object-role-structure

## Table of contents

### Properties

- [color](discordeno_gateway.DiscordRole.md#color)
- [hoist](discordeno_gateway.DiscordRole.md#hoist)
- [icon](discordeno_gateway.DiscordRole.md#icon)
- [id](discordeno_gateway.DiscordRole.md#id)
- [managed](discordeno_gateway.DiscordRole.md#managed)
- [mentionable](discordeno_gateway.DiscordRole.md#mentionable)
- [name](discordeno_gateway.DiscordRole.md#name)
- [permissions](discordeno_gateway.DiscordRole.md#permissions)
- [position](discordeno_gateway.DiscordRole.md#position)
- [tags](discordeno_gateway.DiscordRole.md#tags)
- [unicode_emoji](discordeno_gateway.DiscordRole.md#unicode_emoji)

## Properties

### color

• **color**: `number`

Integer representation of hexadecimal color code

#### Defined in

packages/types/dist/discord.d.ts:551

---

### hoist

• **hoist**: `boolean`

If this role is showed separately in the user listing

#### Defined in

packages/types/dist/discord.d.ts:537

---

### icon

• `Optional` **icon**: `string`

the role emoji hash

#### Defined in

packages/types/dist/discord.d.ts:547

---

### id

• **id**: `string`

Role id

#### Defined in

packages/types/dist/discord.d.ts:535

---

### managed

• **managed**: `boolean`

Whether this role is managed by an integration

#### Defined in

packages/types/dist/discord.d.ts:541

---

### mentionable

• **mentionable**: `boolean`

Whether this role is mentionable

#### Defined in

packages/types/dist/discord.d.ts:543

---

### name

• **name**: `string`

Role name

#### Defined in

packages/types/dist/discord.d.ts:549

---

### permissions

• **permissions**: `string`

Permission bit set

#### Defined in

packages/types/dist/discord.d.ts:539

---

### position

• **position**: `number`

Position of this role

#### Defined in

packages/types/dist/discord.d.ts:553

---

### tags

• `Optional` **tags**: [`DiscordRoleTags`](discordeno_gateway.DiscordRoleTags.md)

The tags this role has

#### Defined in

packages/types/dist/discord.d.ts:545

---

### unicode_emoji

• `Optional` **unicode_emoji**: `string`

role unicode emoji

#### Defined in

packages/types/dist/discord.d.ts:555
