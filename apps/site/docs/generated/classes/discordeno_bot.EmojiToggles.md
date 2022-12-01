[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / EmojiToggles

# Class: EmojiToggles

[@discordeno/bot](../modules/discordeno_bot.md).EmojiToggles

## Hierarchy

- [`ToggleBitfield`](discordeno_bot.ToggleBitfield.md)

  ↳ **`EmojiToggles`**

## Table of contents

### Constructors

- [constructor](discordeno_bot.EmojiToggles.md#constructor)

### Properties

- [bitfield](discordeno_bot.EmojiToggles.md#bitfield)

### Accessors

- [animated](discordeno_bot.EmojiToggles.md#animated)
- [available](discordeno_bot.EmojiToggles.md#available)
- [managed](discordeno_bot.EmojiToggles.md#managed)
- [requireColons](discordeno_bot.EmojiToggles.md#requirecolons)

### Methods

- [add](discordeno_bot.EmojiToggles.md#add)
- [contains](discordeno_bot.EmojiToggles.md#contains)
- [has](discordeno_bot.EmojiToggles.md#has)
- [list](discordeno_bot.EmojiToggles.md#list)
- [remove](discordeno_bot.EmojiToggles.md#remove)

## Constructors

### constructor

• **new EmojiToggles**(`roleOrTogglesInt`)

#### Parameters

| Name               | Type                                                                       |
| :----------------- | :------------------------------------------------------------------------- |
| `roleOrTogglesInt` | `number` \| [`DiscordEmoji`](../interfaces/discordeno_bot.DiscordEmoji.md) |

#### Overrides

[ToggleBitfield](discordeno_bot.ToggleBitfield.md).[constructor](discordeno_bot.ToggleBitfield.md#constructor)

#### Defined in

[packages/bot/src/transformers/toggles/emoji.ts:16](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/emoji.ts#L16)

## Properties

### bitfield

• **bitfield**: `number` = `0`

#### Inherited from

[ToggleBitfield](discordeno_bot.ToggleBitfield.md).[bitfield](discordeno_bot.ToggleBitfield.md#bitfield)

#### Defined in

[packages/bot/src/transformers/toggles/ToggleBitfield.ts:2](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/ToggleBitfield.ts#L2)

## Accessors

### animated

• `get` **animated**(): `boolean`

Whether this emoji is animated

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/emoji.ts:41](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/emoji.ts#L41)

---

### available

• `get` **available**(): `boolean`

Whether this emoji can be used, may be false due to loss of Server Boosts

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/emoji.ts:46](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/emoji.ts#L46)

---

### managed

• `get` **managed**(): `boolean`

Whether this emoji is managed

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/emoji.ts:36](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/emoji.ts#L36)

---

### requireColons

• `get` **requireColons**(): `boolean`

Whether this emoji must be wrapped in colons

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/emoji.ts:31](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/emoji.ts#L31)

## Methods

### add

▸ **add**(`bits`): [`EmojiToggles`](discordeno_bot.EmojiToggles.md)

Adds some bits to the bitfield.

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `bits` | `number` |

#### Returns

[`EmojiToggles`](discordeno_bot.EmojiToggles.md)

#### Inherited from

[ToggleBitfield](discordeno_bot.ToggleBitfield.md).[add](discordeno_bot.ToggleBitfield.md#add)

#### Defined in

[packages/bot/src/transformers/toggles/ToggleBitfield.ts:14](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/ToggleBitfield.ts#L14)

---

### contains

▸ **contains**(`bits`): `boolean`

Tests whether or not this bitfield has the permission requested.

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `bits` | `number` |

#### Returns

`boolean`

#### Inherited from

[ToggleBitfield](discordeno_bot.ToggleBitfield.md).[contains](discordeno_bot.ToggleBitfield.md#contains)

#### Defined in

[packages/bot/src/transformers/toggles/ToggleBitfield.ts:9](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/ToggleBitfield.ts#L9)

---

### has

▸ **has**(`permissions`): `boolean`

Checks whether or not the permissions exist in this

#### Parameters

| Name          | Type                                                                                                                                       |
| :------------ | :----------------------------------------------------------------------------------------------------------------------------------------- |
| `permissions` | `"animated"` \| `"managed"` \| `"available"` \| `"requireColons"` \| (`"animated"` \| `"managed"` \| `"available"` \| `"requireColons"`)[] |

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/emoji.ts:51](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/emoji.ts#L51)

---

### list

▸ **list**(): `Record`<`"animated"` \| `"managed"` \| `"available"` \| `"requireColons"`, `boolean`\>

Lists all the toggles for the role and whether or not each is true or false.

#### Returns

`Record`<`"animated"` \| `"managed"` \| `"available"` \| `"requireColons"`, `boolean`\>

#### Defined in

[packages/bot/src/transformers/toggles/emoji.ts:58](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/emoji.ts#L58)

---

### remove

▸ **remove**(`bits`): [`EmojiToggles`](discordeno_bot.EmojiToggles.md)

Removes some bits from the bitfield.

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `bits` | `number` |

#### Returns

[`EmojiToggles`](discordeno_bot.EmojiToggles.md)

#### Inherited from

[ToggleBitfield](discordeno_bot.ToggleBitfield.md).[remove](discordeno_bot.ToggleBitfield.md#remove)

#### Defined in

[packages/bot/src/transformers/toggles/ToggleBitfield.ts:20](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/ToggleBitfield.ts#L20)
