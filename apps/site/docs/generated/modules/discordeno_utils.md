[discordeno-monorepo](../README.md) / [Modules](../modules.md) / @discordeno/utils

# Module: @discordeno/utils

## Table of contents

### Classes

- [Collection](../classes/discordeno_utils.Collection.md)

### Interfaces

- [CollectionOptions](../interfaces/discordeno_utils.CollectionOptions.md)
- [CollectionSweeper](../interfaces/discordeno_utils.CollectionSweeper.md)
- [LeakyBucket](../interfaces/discordeno_utils.LeakyBucket.md)
- [PlaceHolderBot](../interfaces/discordeno_utils.PlaceHolderBot.md)
- [VerifySignatureOptions](../interfaces/discordeno_utils.VerifySignatureOptions.md)

### Variables

- [API_VERSION](discordeno_utils.md#api_version)
- [BASE_URL](discordeno_utils.md#base_url)
- [CHANNEL_MENTION_REGEX](discordeno_utils.md#channel_mention_regex)
- [CONTEXT_MENU_COMMANDS_NAME_REGEX](discordeno_utils.md#context_menu_commands_name_regex)
- [DISCORDENO_VERSION](discordeno_utils.md#discordeno_version)
- [DISCORD_SNOWFLAKE_REGEX](discordeno_utils.md#discord_snowflake_regex)
- [IMAGE_BASE_URL](discordeno_utils.md#image_base_url)
- [SLASH_COMMANDS_NAME_REGEX](discordeno_utils.md#slash_commands_name_regex)
- [USER_AGENT](discordeno_utils.md#user_agent)
- [baseEndpoints](discordeno_utils.md#baseendpoints)

### Functions

- [bigintToSnowflake](discordeno_utils.md#biginttosnowflake)
- [calculateBits](discordeno_utils.md#calculatebits)
- [calculatePermissions](discordeno_utils.md#calculatepermissions)
- [createLeakyBucket](discordeno_utils.md#createleakybucket)
- [decode](discordeno_utils.md#decode)
- [delay](discordeno_utils.md#delay)
- [encode](discordeno_utils.md#encode)
- [getBotIdFromToken](discordeno_utils.md#getbotidfromtoken)
- [iconBigintToHash](discordeno_utils.md#iconbiginttohash)
- [iconHashToBigInt](discordeno_utils.md#iconhashtobigint)
- [removeTokenPrefix](discordeno_utils.md#removetokenprefix)
- [snowflakeToBigint](discordeno_utils.md#snowflaketobigint)
- [urlToBase64](discordeno_utils.md#urltobase64)
- [validateLength](discordeno_utils.md#validatelength)
- [verifySignature](discordeno_utils.md#verifysignature)

## Variables

### API_VERSION

• `Const` **API_VERSION**: `10`

https://discord.com/developers/docs/reference#api-versioning-api-versions

#### Defined in

[packages/utils/src/constants.ts:5](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/constants.ts#L5)

---

### BASE_URL

• `Const` **BASE_URL**: `"https://discord.com/api"`

https://discord.com/developers/docs/reference#api-reference-base-url

#### Defined in

[packages/utils/src/constants.ts:2](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/constants.ts#L2)

---

### CHANNEL_MENTION_REGEX

• `Const` **CHANNEL_MENTION_REGEX**: `RegExp`

#### Defined in

[packages/utils/src/constants.ts:25](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/constants.ts#L25)

---

### CONTEXT_MENU_COMMANDS_NAME_REGEX

• `Const` **CONTEXT_MENU_COMMANDS_NAME_REGEX**: `RegExp`

#### Defined in

[packages/utils/src/constants.ts:24](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/constants.ts#L24)

---

### DISCORDENO_VERSION

• `Const` **DISCORDENO_VERSION**: `"17.1.0"`

https://github.com/discordeno/discordeno/releases

#### Defined in

[packages/utils/src/constants.ts:9](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/constants.ts#L9)

---

### DISCORD_SNOWFLAKE_REGEX

• `Const` **DISCORD_SNOWFLAKE_REGEX**: `RegExp`

#### Defined in

[packages/utils/src/constants.ts:26](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/constants.ts#L26)

---

### IMAGE_BASE_URL

• `Const` **IMAGE_BASE_URL**: `"https://cdn.discordapp.com"`

https://discord.com/developers/docs/reference#image-formatting-image-base-url

#### Defined in

[packages/utils/src/constants.ts:15](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/constants.ts#L15)

---

### SLASH_COMMANDS_NAME_REGEX

• `Const` **SLASH_COMMANDS_NAME_REGEX**: `RegExp`

#### Defined in

[packages/utils/src/constants.ts:23](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/constants.ts#L23)

---

### USER_AGENT

• `Const` **USER_AGENT**: `string`

https://discord.com/developers/docs/reference#user-agent

#### Defined in

[packages/utils/src/constants.ts:12](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/constants.ts#L12)

---

### baseEndpoints

• `Const` **baseEndpoints**: `Object`

#### Type declaration

| Name       | Type     |
| :--------- | :------- |
| `BASE_URL` | `string` |
| `CDN_URL`  | `string` |

#### Defined in

[packages/utils/src/constants.ts:18](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/constants.ts#L18)

## Functions

### bigintToSnowflake

▸ **bigintToSnowflake**(`snowflake`): `string`

#### Parameters

| Name        | Type        |
| :---------- | :---------- |
| `snowflake` | `BigString` |

#### Returns

`string`

#### Defined in

[packages/utils/src/bigint.ts:7](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/bigint.ts#L7)

---

### calculateBits

▸ **calculateBits**(`permissions`): `string`

This function converts an array of permissions into the bitwise string.

#### Parameters

| Name          | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `permissions` | (`"CREATE_INSTANT_INVITE"` \| `"KICK_MEMBERS"` \| `"BAN_MEMBERS"` \| `"ADMINISTRATOR"` \| `"MANAGE_CHANNELS"` \| `"MANAGE_GUILD"` \| `"ADD_REACTIONS"` \| `"VIEW_AUDIT_LOG"` \| `"PRIORITY_SPEAKER"` \| `"STREAM"` \| `"VIEW_CHANNEL"` \| `"SEND_MESSAGES"` \| `"SEND_TTS_MESSAGES"` \| `"MANAGE_MESSAGES"` \| `"EMBED_LINKS"` \| `"ATTACH_FILES"` \| `"READ_MESSAGE_HISTORY"` \| `"MENTION_EVERYONE"` \| `"USE_EXTERNAL_EMOJIS"` \| `"VIEW_GUILD_INSIGHTS"` \| `"CONNECT"` \| `"SPEAK"` \| `"MUTE_MEMBERS"` \| `"DEAFEN_MEMBERS"` \| `"MOVE_MEMBERS"` \| `"USE_VAD"` \| `"CHANGE_NICKNAME"` \| `"MANAGE_NICKNAMES"` \| `"MANAGE_ROLES"` \| `"MANAGE_WEBHOOKS"` \| `"MANAGE_EMOJIS_AND_STICKERS"` \| `"USE_SLASH_COMMANDS"` \| `"REQUEST_TO_SPEAK"` \| `"MANAGE_EVENTS"` \| `"MANAGE_THREADS"` \| `"CREATE_PUBLIC_THREADS"` \| `"CREATE_PRIVATE_THREADS"` \| `"USE_EXTERNAL_STICKERS"` \| `"SEND_MESSAGES_IN_THREADS"` \| `"USE_EMBEDDED_ACTIVITIES"` \| `"MODERATE_MEMBERS"`)[] |

#### Returns

`string`

#### Defined in

[packages/utils/src/permissions.ts:14](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/permissions.ts#L14)

---

### calculatePermissions

▸ **calculatePermissions**(`permissionBits`): `PermissionStrings`[]

This function converts a bitwise string to permission strings

#### Parameters

| Name             | Type     |
| :--------------- | :------- |
| `permissionBits` | `bigint` |

#### Returns

`PermissionStrings`[]

#### Defined in

[packages/utils/src/permissions.ts:4](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/permissions.ts#L4)

---

### createLeakyBucket

▸ **createLeakyBucket**(`__namedParameters`): [`LeakyBucket`](../interfaces/discordeno_utils.LeakyBucket.md)

#### Parameters

| Name                | Type                                                                                                                                                                             |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `__namedParameters` | `Omit`<`PickPartial`<[`LeakyBucket`](../interfaces/discordeno_utils.LeakyBucket.md), `"max"` \| `"refillInterval"` \| `"refillAmount"`\>, `"tokens"`\> & { `tokens?`: `number` } |

#### Returns

[`LeakyBucket`](../interfaces/discordeno_utils.LeakyBucket.md)

#### Defined in

[packages/utils/src/bucket.ts:65](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/bucket.ts#L65)

---

### decode

▸ **decode**(`data`): `Uint8Array`

CREDIT: https://gist.github.com/enepomnyaschih/72c423f727d395eeaa09697058238727
Decodes RFC4648 base64 string into an Uint8Array

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `data` | `string` |

#### Returns

`Uint8Array`

#### Defined in

[packages/utils/src/base64.ts:42](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/base64.ts#L42)

---

### delay

▸ **delay**(`ms`): `Promise`<`void`\>

Pause the execution for a given amount of milliseconds.

#### Parameters

| Name | Type     |
| :--- | :------- |
| `ms` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/utils/src/utils.ts:2](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/utils.ts#L2)

---

### encode

▸ **encode**(`data`): `string`

CREDIT: https://gist.github.com/enepomnyaschih/72c423f727d395eeaa09697058238727
Encodes a given Uint8Array, ArrayBuffer or string into RFC4648 base64 representation

#### Parameters

| Name   | Type                      |
| :----- | :------------------------ |
| `data` | `string` \| `ArrayBuffer` |

#### Returns

`string`

#### Defined in

[packages/utils/src/base64.ts:6](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/base64.ts#L6)

---

### getBotIdFromToken

▸ **getBotIdFromToken**(`token`): `bigint`

Get the bot id from the bot token. WARNING: Discord staff has mentioned this may not be stable forever. Use at your own risk. However, note for over 5 years this has never broken.

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `token` | `string` |

#### Returns

`bigint`

#### Defined in

[packages/utils/src/token.ts:12](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/token.ts#L12)

---

### iconBigintToHash

▸ **iconBigintToHash**(`icon`): `string`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `icon` | `bigint` |

#### Returns

`string`

#### Defined in

[packages/utils/src/hash.ts:14](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/hash.ts#L14)

---

### iconHashToBigInt

▸ **iconHashToBigInt**(`hash`): `bigint`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `hash` | `string` |

#### Returns

`bigint`

#### Defined in

[packages/utils/src/hash.ts:1](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/hash.ts#L1)

---

### removeTokenPrefix

▸ **removeTokenPrefix**(`token?`, `type?`): `string`

Removes the Bot before the token.

#### Parameters

| Name     | Type                    | Default value |
| :------- | :---------------------- | :------------ |
| `token?` | `string`                | `undefined`   |
| `type`   | `"GATEWAY"` \| `"REST"` | `'REST'`      |

#### Returns

`string`

#### Defined in

[packages/utils/src/token.ts:2](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/token.ts#L2)

---

### snowflakeToBigint

▸ **snowflakeToBigint**(`snowflake`): `bigint`

#### Parameters

| Name        | Type        |
| :---------- | :---------- |
| `snowflake` | `BigString` |

#### Returns

`bigint`

#### Defined in

[packages/utils/src/bigint.ts:3](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/bigint.ts#L3)

---

### urlToBase64

▸ **urlToBase64**(`url`): `Promise`<`string`\>

Converts a url to base 64. Useful for example, uploading/creating server emojis.

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `url` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[packages/utils/src/urlToBase64.ts:4](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/urlToBase64.ts#L4)

---

### validateLength

▸ **validateLength**(`text`, `options`): `boolean`

Validates the length of a string in JS. Certain characters in JS can have multiple numbers in length in unicode and discords api is in python which treats length differently.

#### Parameters

| Name           | Type     |
| :------------- | :------- |
| `text`         | `string` |
| `options`      | `Object` |
| `options.max?` | `number` |
| `options.min?` | `number` |

#### Returns

`boolean`

#### Defined in

[packages/utils/src/validateLength.ts:2](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/validateLength.ts#L2)

---

### verifySignature

▸ **verifySignature**(`__namedParameters`): `Object`

#### Parameters

| Name                | Type                                                                                 |
| :------------------ | :----------------------------------------------------------------------------------- |
| `__namedParameters` | [`VerifySignatureOptions`](../interfaces/discordeno_utils.VerifySignatureOptions.md) |

#### Returns

`Object`

| Name      | Type      |
| :-------- | :-------- |
| `body`    | `string`  |
| `isValid` | `boolean` |

#### Defined in

[packages/utils/src/verifySignature.ts:3](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/utils/src/verifySignature.ts#L3)
