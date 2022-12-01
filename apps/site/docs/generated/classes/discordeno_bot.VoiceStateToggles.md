[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / VoiceStateToggles

# Class: VoiceStateToggles

[@discordeno/bot](../modules/discordeno_bot.md).VoiceStateToggles

## Hierarchy

- [`ToggleBitfield`](discordeno_bot.ToggleBitfield.md)

  ↳ **`VoiceStateToggles`**

## Table of contents

### Constructors

- [constructor](discordeno_bot.VoiceStateToggles.md#constructor)

### Properties

- [bitfield](discordeno_bot.VoiceStateToggles.md#bitfield)

### Accessors

- [deaf](discordeno_bot.VoiceStateToggles.md#deaf)
- [mute](discordeno_bot.VoiceStateToggles.md#mute)
- [selfDeaf](discordeno_bot.VoiceStateToggles.md#selfdeaf)
- [selfMute](discordeno_bot.VoiceStateToggles.md#selfmute)
- [selfStream](discordeno_bot.VoiceStateToggles.md#selfstream)
- [selfVideo](discordeno_bot.VoiceStateToggles.md#selfvideo)
- [suppress](discordeno_bot.VoiceStateToggles.md#suppress)

### Methods

- [add](discordeno_bot.VoiceStateToggles.md#add)
- [contains](discordeno_bot.VoiceStateToggles.md#contains)
- [has](discordeno_bot.VoiceStateToggles.md#has)
- [list](discordeno_bot.VoiceStateToggles.md#list)
- [remove](discordeno_bot.VoiceStateToggles.md#remove)

## Constructors

### constructor

• **new VoiceStateToggles**(`voiceOrTogglesInt`)

#### Parameters

| Name                | Type                                                                                 |
| :------------------ | :----------------------------------------------------------------------------------- |
| `voiceOrTogglesInt` | `number` \| [`DiscordVoiceState`](../interfaces/discordeno_bot.DiscordVoiceState.md) |

#### Overrides

[ToggleBitfield](discordeno_bot.ToggleBitfield.md).[constructor](discordeno_bot.ToggleBitfield.md#constructor)

#### Defined in

[packages/bot/src/transformers/toggles/voice.ts:22](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/voice.ts#L22)

## Properties

### bitfield

• **bitfield**: `number` = `0`

#### Inherited from

[ToggleBitfield](discordeno_bot.ToggleBitfield.md).[bitfield](discordeno_bot.ToggleBitfield.md#bitfield)

#### Defined in

[packages/bot/src/transformers/toggles/ToggleBitfield.ts:2](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/ToggleBitfield.ts#L2)

## Accessors

### deaf

• `get` **deaf**(): `boolean`

Whether this user is deafened by the server

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/voice.ts:40](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/voice.ts#L40)

---

### mute

• `get` **mute**(): `boolean`

Whether this user is muted by the server

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/voice.ts:45](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/voice.ts#L45)

---

### selfDeaf

• `get` **selfDeaf**(): `boolean`

Whether this user is locally deafened

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/voice.ts:50](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/voice.ts#L50)

---

### selfMute

• `get` **selfMute**(): `boolean`

Whether this user is locally muted

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/voice.ts:55](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/voice.ts#L55)

---

### selfStream

• `get` **selfStream**(): `boolean`

Whether this user is streaming using "Go Live"

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/voice.ts:60](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/voice.ts#L60)

---

### selfVideo

• `get` **selfVideo**(): `boolean`

Whether this user's camera is enabled

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/voice.ts:65](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/voice.ts#L65)

---

### suppress

• `get` **suppress**(): `boolean`

Whether this user is muted by the current user

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/voice.ts:70](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/voice.ts#L70)

## Methods

### add

▸ **add**(`bits`): [`VoiceStateToggles`](discordeno_bot.VoiceStateToggles.md)

Adds some bits to the bitfield.

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `bits` | `number` |

#### Returns

[`VoiceStateToggles`](discordeno_bot.VoiceStateToggles.md)

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

| Name          | Type                                                                                                                                                                                                                   |
| :------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `permissions` | `"deaf"` \| `"mute"` \| `"suppress"` \| `"selfDeaf"` \| `"selfMute"` \| `"selfStream"` \| `"selfVideo"` \| (`"deaf"` \| `"mute"` \| `"suppress"` \| `"selfDeaf"` \| `"selfMute"` \| `"selfStream"` \| `"selfVideo"`)[] |

#### Returns

`boolean`

#### Defined in

[packages/bot/src/transformers/toggles/voice.ts:75](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/voice.ts#L75)

---

### list

▸ **list**(): `Record`<`"deaf"` \| `"mute"` \| `"suppress"` \| `"selfDeaf"` \| `"selfMute"` \| `"selfStream"` \| `"selfVideo"`, `boolean`\>

Lists all the toggles for the role and whether or not each is true or false.

#### Returns

`Record`<`"deaf"` \| `"mute"` \| `"suppress"` \| `"selfDeaf"` \| `"selfMute"` \| `"selfStream"` \| `"selfVideo"`, `boolean`\>

#### Defined in

[packages/bot/src/transformers/toggles/voice.ts:82](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/voice.ts#L82)

---

### remove

▸ **remove**(`bits`): [`VoiceStateToggles`](discordeno_bot.VoiceStateToggles.md)

Removes some bits from the bitfield.

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `bits` | `number` |

#### Returns

[`VoiceStateToggles`](discordeno_bot.VoiceStateToggles.md)

#### Inherited from

[ToggleBitfield](discordeno_bot.ToggleBitfield.md).[remove](discordeno_bot.ToggleBitfield.md#remove)

#### Defined in

[packages/bot/src/transformers/toggles/ToggleBitfield.ts:20](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/transformers/toggles/ToggleBitfield.ts#L20)
