[discordeno-monorepo](../README.md) / [Modules](../modules.md) / @discordeno/utils

# Module: @discordeno/utils

## Table of contents

### Enumerations

- [LogDepth](../enums/LogDepth.md)
- [LogLevels](../enums/LogLevels.md)

### Classes

- [Collection](../classes/Collection.md)

### Interfaces

- [Code](../interfaces/Code.md)
- [CollectionOptions](../interfaces/CollectionOptions.md)
- [CollectionSweeper](../interfaces/CollectionSweeper.md)
- [LeakyBucket](../interfaces/LeakyBucket.md)
- [PlaceHolderBot](../interfaces/PlaceHolderBot.md)
- [Rgb](../interfaces/Rgb.md)

### Variables

- [logger](md#logger)

### Functions

- [acquire](md#acquire)
- [avatarUrl](md#avatarurl)
- [bgBlack](md#bgblack)
- [bgBlue](md#bgblue)
- [bgBrightBlack](md#bgbrightblack)
- [bgBrightBlue](md#bgbrightblue)
- [bgBrightCyan](md#bgbrightcyan)
- [bgBrightGreen](md#bgbrightgreen)
- [bgBrightMagenta](md#bgbrightmagenta)
- [bgBrightRed](md#bgbrightred)
- [bgBrightWhite](md#bgbrightwhite)
- [bgBrightYellow](md#bgbrightyellow)
- [bgCyan](md#bgcyan)
- [bgGreen](md#bggreen)
- [bgMagenta](md#bgmagenta)
- [bgRed](md#bgred)
- [bgRgb24](md#bgrgb24)
- [bgRgb8](md#bgrgb8)
- [bgWhite](md#bgwhite)
- [bgYellow](md#bgyellow)
- [black](md#black)
- [blue](md#blue)
- [bold](md#bold)
- [brightBlack](md#brightblack)
- [brightBlue](md#brightblue)
- [brightCyan](md#brightcyan)
- [brightGreen](md#brightgreen)
- [brightMagenta](md#brightmagenta)
- [brightRed](md#brightred)
- [brightWhite](md#brightwhite)
- [brightYellow](md#brightyellow)
- [calculateBits](md#calculatebits)
- [calculatePermissions](md#calculatepermissions)
- [camelToSnakeCase](md#cameltosnakecase)
- [camelize](md#camelize)
- [coerceToFileContent](md#coercetofilecontent)
- [createLeakyBucket](md#createleakybucket)
- [createLogger](md#createlogger)
- [cyan](md#cyan)
- [decode](md#decode)
- [delay](md#delay)
- [dim](md#dim)
- [emojiUrl](md#emojiurl)
- [encode](md#encode)
- [findFiles](md#findfiles)
- [formatImageUrl](md#formatimageurl)
- [getBotIdFromToken](md#getbotidfromtoken)
- [getColorEnabled](md#getcolorenabled)
- [getWidgetImageUrl](md#getwidgetimageurl)
- [gray](md#gray)
- [green](md#green)
- [guildBannerUrl](md#guildbannerurl)
- [guildIconUrl](md#guildiconurl)
- [guildSplashUrl](md#guildsplashurl)
- [hasProperty](md#hasproperty)
- [hidden](md#hidden)
- [iconBigintToHash](md#iconbiginttohash)
- [iconHashToBigInt](md#iconhashtobigint)
- [inverse](md#inverse)
- [isGetMessagesAfter](md#isgetmessagesafter)
- [isGetMessagesAround](md#isgetmessagesaround)
- [isGetMessagesBefore](md#isgetmessagesbefore)
- [isGetMessagesLimit](md#isgetmessageslimit)
- [italic](md#italic)
- [magenta](md#magenta)
- [nextRefill](md#nextrefill)
- [processReactionString](md#processreactionstring)
- [red](md#red)
- [removeTokenPrefix](md#removetokenprefix)
- [reset](md#reset)
- [rgb24](md#rgb24)
- [rgb8](md#rgb8)
- [setColorEnabled](md#setcolorenabled)
- [snakeToCamelCase](md#snaketocamelcase)
- [snakelize](md#snakelize)
- [strikethrough](md#strikethrough)
- [stripColor](md#stripcolor)
- [underline](md#underline)
- [updateTokens](md#updatetokens)
- [urlToBase64](md#urltobase64)
- [white](md#white)
- [yellow](md#yellow)

## Variables

### logger

• `Const` **logger**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `debug` | (...`args`: `any`[]) => `void` |
| `error` | (...`args`: `any`[]) => `void` |
| `fatal` | (...`args`: `any`[]) => `void` |
| `info` | (...`args`: `any`[]) => `void` |
| `log` | (`level`: [`LogLevels`](../enums/LogLevels.md), ...`args`: `any`[]) => `void` |
| `setDepth` | (`level`: [`LogDepth`](../enums/LogDepth.md)) => `void` |
| `setLevel` | (`level`: [`LogLevels`](../enums/LogLevels.md)) => `void` |
| `warn` | (...`args`: `any`[]) => `void` |

#### Defined in

[packages/utils/src/logger.ts:118](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/logger.ts#L118)

## Functions

### acquire

▸ **acquire**(`bucket`, `amount`, `highPriority?`): `Promise`<`void`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `bucket` | [`LeakyBucket`](../interfaces/LeakyBucket.md) | `undefined` |
| `amount` | `number` | `undefined` |
| `highPriority` | `boolean` | `false` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/utils/src/bucket.ts:113](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/bucket.ts#L113)

___

### avatarUrl

▸ **avatarUrl**(`userId`, `discriminator`, `options?`): `string`

Builds a URL to a user's avatar stored in the Discord CDN.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userId` | `BigString` | The ID of the user to get the avatar of. |
| `discriminator` | `string` | The user's discriminator. (4-digit tag after the hashtag.) |
| `options?` | `Object` | The parameters for the building of the URL. |
| `options.avatar` | `undefined` \| `BigString` | - |
| `options.format?` | `ImageFormat` | - |
| `options.size?` | `ImageSize` | - |

#### Returns

`string`

The link to the resource.

#### Defined in

[packages/utils/src/images.ts:29](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/images.ts#L29)

___

### bgBlack

▸ **bgBlack**(`str`): `string`

Set background color to black.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make its background black |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:268](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L268)

___

### bgBlue

▸ **bgBlue**(`str`): `string`

Set background color to blue.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make its background blue |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:300](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L300)

___

### bgBrightBlack

▸ **bgBrightBlack**(`str`): `string`

Set background color to bright black.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make its background bright-black |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:332](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L332)

___

### bgBrightBlue

▸ **bgBrightBlue**(`str`): `string`

Set background color to bright blue.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make its background bright-blue |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:364](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L364)

___

### bgBrightCyan

▸ **bgBrightCyan**(`str`): `string`

Set background color to bright cyan.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make its background bright-cyan |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:380](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L380)

___

### bgBrightGreen

▸ **bgBrightGreen**(`str`): `string`

Set background color to bright green.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make its background bright-green |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:348](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L348)

___

### bgBrightMagenta

▸ **bgBrightMagenta**(`str`): `string`

Set background color to bright magenta.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make its background bright-magenta |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:372](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L372)

___

### bgBrightRed

▸ **bgBrightRed**(`str`): `string`

Set background color to bright red.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make its background bright-red |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:340](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L340)

___

### bgBrightWhite

▸ **bgBrightWhite**(`str`): `string`

Set background color to bright white.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make its background bright-white |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:388](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L388)

___

### bgBrightYellow

▸ **bgBrightYellow**(`str`): `string`

Set background color to bright yellow.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make its background bright-yellow |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:356](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L356)

___

### bgCyan

▸ **bgCyan**(`str`): `string`

Set background color to cyan.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make its background cyan |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:316](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L316)

___

### bgGreen

▸ **bgGreen**(`str`): `string`

Set background color to green.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make its background green |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:284](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L284)

___

### bgMagenta

▸ **bgMagenta**(`str`): `string`

Set background color to magenta.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make its background magenta |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:308](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L308)

___

### bgRed

▸ **bgRed**(`str`): `string`

Set background color to red.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make its background red |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:276](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L276)

___

### bgRgb24

▸ **bgRgb24**(`str`, `color`): `string`

Set background color using 24bit rgb.
`color` can be a number in range `0x000000` to `0xffffff` or
an `Rgb`.

To produce the color magenta:

```ts
     import { bgRgb24 } from "./colors.ts";
     bgRgb24("foo", 0xff00ff);
     bgRgb24("foo", {r: 255, g: 0, b: 255});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text color to apply 24bit rgb to |
| `color` | `number` \| [`Rgb`](../interfaces/Rgb.md) | code |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:461](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L461)

___

### bgRgb8

▸ **bgRgb8**(`str`, `color`): `string`

Set background color using paletted 8bit colors.
https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text color to apply paletted 8bit background colors to |
| `color` | `number` | code |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:420](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L420)

___

### bgWhite

▸ **bgWhite**(`str`): `string`

Set background color to white.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make its background white |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:324](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L324)

___

### bgYellow

▸ **bgYellow**(`str`): `string`

Set background color to yellow.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make its background yellow |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:292](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L292)

___

### black

▸ **black**(`str`): `string`

Set text color to black.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make black |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:132](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L132)

___

### blue

▸ **blue**(`str`): `string`

Set text color to blue.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make blue |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:164](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L164)

___

### bold

▸ **bold**(`str`): `string`

Make the text bold.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make bold |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:76](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L76)

___

### brightBlack

▸ **brightBlack**(`str`): `string`

Set text color to bright black.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make bright-black |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:204](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L204)

___

### brightBlue

▸ **brightBlue**(`str`): `string`

Set text color to bright blue.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make bright-blue |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:236](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L236)

___

### brightCyan

▸ **brightCyan**(`str`): `string`

Set text color to bright cyan.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make bright-cyan |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:252](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L252)

___

### brightGreen

▸ **brightGreen**(`str`): `string`

Set text color to bright green.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make bright-green |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:220](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L220)

___

### brightMagenta

▸ **brightMagenta**(`str`): `string`

Set text color to bright magenta.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make bright-magenta |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:244](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L244)

___

### brightRed

▸ **brightRed**(`str`): `string`

Set text color to bright red.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make bright-red |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:212](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L212)

___

### brightWhite

▸ **brightWhite**(`str`): `string`

Set text color to bright white.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make bright-white |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:260](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L260)

___

### brightYellow

▸ **brightYellow**(`str`): `string`

Set text color to bright yellow.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make bright-yellow |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:228](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L228)

___

### calculateBits

▸ **calculateBits**(`permissions`): `string`

This function converts an array of permissions into the bitwise string.

#### Parameters

| Name | Type |
| :------ | :------ |
| `permissions` | (``"CREATE_INSTANT_INVITE"`` \| ``"KICK_MEMBERS"`` \| ``"BAN_MEMBERS"`` \| ``"ADMINISTRATOR"`` \| ``"MANAGE_CHANNELS"`` \| ``"MANAGE_GUILD"`` \| ``"ADD_REACTIONS"`` \| ``"VIEW_AUDIT_LOG"`` \| ``"PRIORITY_SPEAKER"`` \| ``"STREAM"`` \| ``"VIEW_CHANNEL"`` \| ``"SEND_MESSAGES"`` \| ``"SEND_TTS_MESSAGES"`` \| ``"MANAGE_MESSAGES"`` \| ``"EMBED_LINKS"`` \| ``"ATTACH_FILES"`` \| ``"READ_MESSAGE_HISTORY"`` \| ``"MENTION_EVERYONE"`` \| ``"USE_EXTERNAL_EMOJIS"`` \| ``"VIEW_GUILD_INSIGHTS"`` \| ``"CONNECT"`` \| ``"SPEAK"`` \| ``"MUTE_MEMBERS"`` \| ``"DEAFEN_MEMBERS"`` \| ``"MOVE_MEMBERS"`` \| ``"USE_VAD"`` \| ``"CHANGE_NICKNAME"`` \| ``"MANAGE_NICKNAMES"`` \| ``"MANAGE_ROLES"`` \| ``"MANAGE_WEBHOOKS"`` \| ``"MANAGE_EMOJIS_AND_STICKERS"`` \| ``"USE_SLASH_COMMANDS"`` \| ``"REQUEST_TO_SPEAK"`` \| ``"MANAGE_EVENTS"`` \| ``"MANAGE_THREADS"`` \| ``"CREATE_PUBLIC_THREADS"`` \| ``"CREATE_PRIVATE_THREADS"`` \| ``"USE_EXTERNAL_STICKERS"`` \| ``"SEND_MESSAGES_IN_THREADS"`` \| ``"USE_EMBEDDED_ACTIVITIES"`` \| ``"MODERATE_MEMBERS"``)[] |

#### Returns

`string`

#### Defined in

[packages/utils/src/permissions.ts:15](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/permissions.ts#L15)

___

### calculatePermissions

▸ **calculatePermissions**(`permissionBits`): `PermissionStrings`[]

This function converts a bitwise string to permission strings

#### Parameters

| Name | Type |
| :------ | :------ |
| `permissionBits` | `bigint` |

#### Returns

`PermissionStrings`[]

#### Defined in

[packages/utils/src/permissions.ts:5](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/permissions.ts#L5)

___

### camelToSnakeCase

▸ **camelToSnakeCase**(`str`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`string`

#### Defined in

[packages/utils/src/casing.ts:53](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/casing.ts#L53)

___

### camelize

▸ **camelize**<`T`\>(`object`): `Camelize`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `T` |

#### Returns

`Camelize`<`T`\>

#### Defined in

[packages/utils/src/casing.ts:3](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/casing.ts#L3)

___

### coerceToFileContent

▸ **coerceToFileContent**(`value`): value is FileContent

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is FileContent

#### Defined in

[packages/utils/src/files.ts:13](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/files.ts#L13)

___

### createLeakyBucket

▸ **createLeakyBucket**(`«destructured»`): [`LeakyBucket`](../interfaces/LeakyBucket.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Omit`<`PickPartial`<[`LeakyBucket`](../interfaces/LeakyBucket.md), ``"max"`` \| ``"refillInterval"`` \| ``"refillAmount"``\>, ``"tokens"``\> & { `tokens?`: `number`  } |

#### Returns

[`LeakyBucket`](../interfaces/LeakyBucket.md)

#### Defined in

[packages/utils/src/bucket.ts:53](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/bucket.ts#L53)

___

### createLogger

▸ **createLogger**(`«destructured»?`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `logLevel?` | [`LogLevels`](../enums/LogLevels.md) |
| › `name?` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `debug` | (...`args`: `any`[]) => `void` |
| `error` | (...`args`: `any`[]) => `void` |
| `fatal` | (...`args`: `any`[]) => `void` |
| `info` | (...`args`: `any`[]) => `void` |
| `log` | (`level`: [`LogLevels`](../enums/LogLevels.md), ...`args`: `any`[]) => `void` |
| `setDepth` | (`level`: [`LogDepth`](../enums/LogDepth.md)) => `void` |
| `setLevel` | (`level`: [`LogLevels`](../enums/LogLevels.md)) => `void` |
| `warn` | (...`args`: `any`[]) => `void` |

#### Defined in

[packages/utils/src/logger.ts:34](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/logger.ts#L34)

___

### cyan

▸ **cyan**(`str`): `string`

Set text color to cyan.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make cyan |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:180](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L180)

___

### decode

▸ **decode**(`data`): `Uint8Array`

CREDIT: https://gist.github.com/enepomnyaschih/72c423f727d395eeaa09697058238727
Decodes RFC4648 base64 string into an Uint8Array

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` |

#### Returns

`Uint8Array`

#### Defined in

[packages/utils/src/base64.ts:38](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/base64.ts#L38)

___

### delay

▸ **delay**(`ms`): `Promise`<`void`\>

Pause the execution for a given amount of milliseconds.

#### Parameters

| Name | Type |
| :------ | :------ |
| `ms` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/utils/src/utils.ts:2](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/utils.ts#L2)

___

### dim

▸ **dim**(`str`): `string`

The text emits only a small amount of light.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to dim |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:84](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L84)

___

### emojiUrl

▸ **emojiUrl**(`emojiId`, `animated?`): `string`

Get the url for an emoji.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `emojiId` | `BigString` | `undefined` | The id of the emoji |
| `animated` | `boolean` | `false` | Whether or not the emoji is animated |

#### Returns

`string`

string

#### Defined in

[packages/utils/src/images.ts:17](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/images.ts#L17)

___

### encode

▸ **encode**(`data`): `string`

CREDIT: https://gist.github.com/enepomnyaschih/72c423f727d395eeaa09697058238727
Encodes a given Uint8Array, ArrayBuffer or string into RFC4648 base64 representation

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` \| `ArrayBuffer` |

#### Returns

`string`

#### Defined in

[packages/utils/src/base64.ts:6](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/base64.ts#L6)

___

### findFiles

▸ **findFiles**(`file`): `FileContent`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | `unknown` |

#### Returns

`FileContent`[]

#### Defined in

[packages/utils/src/files.ts:4](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/files.ts#L4)

___

### formatImageUrl

▸ **formatImageUrl**(`url`, `size?`, `format?`): `string`

Help format an image url.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `url` | `string` | `undefined` |
| `size` | `ImageSize` | `128` |
| `format?` | `ImageFormat` | `undefined` |

#### Returns

`string`

#### Defined in

[packages/utils/src/images.ts:6](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/images.ts#L6)

___

### getBotIdFromToken

▸ **getBotIdFromToken**(`token`): `bigint`

Get the bot id from the bot token. WARNING: Discord staff has mentioned this may not be stable forever. Use at your own risk. However, note for over 5 years this has never broken.

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |

#### Returns

`bigint`

#### Defined in

[packages/utils/src/token.ts:16](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/token.ts#L16)

___

### getColorEnabled

▸ **getColorEnabled**(): `boolean`

Get whether text color change is enabled or disabled.

#### Returns

`boolean`

#### Defined in

[packages/utils/src/colors.ts:38](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L38)

___

### getWidgetImageUrl

▸ **getWidgetImageUrl**(`guildId`, `options?`): `string`

Builds a URL to the guild widget image stored in the Discord CDN.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `guildId` | `BigString` | The ID of the guild to get the link to the widget image for. |
| `options?` | `GetGuildWidgetImageQuery` | The parameters for the building of the URL. |

#### Returns

`string`

The link to the resource.

#### Defined in

[packages/utils/src/images.ts:127](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/images.ts#L127)

___

### gray

▸ **gray**(`str`): `string`

Set text color to gray.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make gray |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:196](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L196)

___

### green

▸ **green**(`str`): `string`

Set text color to green.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make green |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:148](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L148)

___

### guildBannerUrl

▸ **guildBannerUrl**(`guildId`, `options`): `string` \| `undefined`

Builds a URL to the guild banner stored in the Discord CDN.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `guildId` | `BigString` | The ID of the guild to get the link to the banner for. |
| `options` | `Object` | The parameters for the building of the URL. |
| `options.banner?` | `string` \| `bigint` | - |
| `options.format?` | `ImageFormat` | - |
| `options.size?` | `ImageSize` | - |

#### Returns

`string` \| `undefined`

The link to the resource or `undefined` if no banner has been set.

#### Defined in

[packages/utils/src/images.ts:54](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/images.ts#L54)

___

### guildIconUrl

▸ **guildIconUrl**(`guildId`, `imageHash`, `options?`): `string` \| `undefined`

Builds a URL to the guild icon stored in the Discord CDN.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `guildId` | `BigString` | The ID of the guild to get the link to the banner for. |
| `imageHash` | `undefined` \| `BigString` | - |
| `options?` | `Object` | The parameters for the building of the URL. |
| `options.format?` | `ImageFormat` | - |
| `options.size?` | `ImageSize` | - |

#### Returns

`string` \| `undefined`

The link to the resource or `undefined` if no banner has been set.

#### Defined in

[packages/utils/src/images.ts:78](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/images.ts#L78)

___

### guildSplashUrl

▸ **guildSplashUrl**(`guildId`, `imageHash`, `options?`): `string` \| `undefined`

Builds the URL to a guild splash stored in the Discord CDN.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `guildId` | `BigString` | The ID of the guild to get the splash of. |
| `imageHash` | `undefined` \| `BigString` | The hash identifying the splash image. |
| `options?` | `Object` | The parameters for the building of the URL. |
| `options.format?` | `ImageFormat` | - |
| `options.size?` | `ImageSize` | - |

#### Returns

`string` \| `undefined`

The link to the resource or `undefined` if the guild does not have a splash image set.

#### Defined in

[packages/utils/src/images.ts:103](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/images.ts#L103)

___

### hasProperty

▸ **hasProperty**<`T`, `Y`\>(`obj`, `prop`): obj is T & Record<Y, unknown\>

TS save way to check if a property exists in an object

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |
| `Y` | extends `PropertyKey` = `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `T` |
| `prop` | `Y` |

#### Returns

obj is T & Record<Y, unknown\>

#### Defined in

[packages/utils/src/utils.ts:15](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/utils.ts#L15)

___

### hidden

▸ **hidden**(`str`): `string`

Make the text hidden.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to hide |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:116](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L116)

___

### iconBigintToHash

▸ **iconBigintToHash**(`icon`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `icon` | `bigint` |

#### Returns

`string`

#### Defined in

[packages/utils/src/hash.ts:14](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/hash.ts#L14)

___

### iconHashToBigInt

▸ **iconHashToBigInt**(`hash`): `bigint`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hash` | `string` |

#### Returns

`bigint`

#### Defined in

[packages/utils/src/hash.ts:1](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/hash.ts#L1)

___

### inverse

▸ **inverse**(`str`): `string`

Invert background color and text color.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to invert its color |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:108](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L108)

___

### isGetMessagesAfter

▸ **isGetMessagesAfter**(`options`): options is GetMessagesAfter

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `GetMessagesOptions` |

#### Returns

options is GetMessagesAfter

#### Defined in

[packages/utils/src/typeguards.ts:4](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/typeguards.ts#L4)

___

### isGetMessagesAround

▸ **isGetMessagesAround**(`options`): options is GetMessagesAround

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `GetMessagesOptions` |

#### Returns

options is GetMessagesAround

#### Defined in

[packages/utils/src/typeguards.ts:12](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/typeguards.ts#L12)

___

### isGetMessagesBefore

▸ **isGetMessagesBefore**(`options`): options is GetMessagesBefore

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `GetMessagesOptions` |

#### Returns

options is GetMessagesBefore

#### Defined in

[packages/utils/src/typeguards.ts:8](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/typeguards.ts#L8)

___

### isGetMessagesLimit

▸ **isGetMessagesLimit**(`options`): options is GetMessagesLimit

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `GetMessagesOptions` |

#### Returns

options is GetMessagesLimit

#### Defined in

[packages/utils/src/typeguards.ts:16](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/typeguards.ts#L16)

___

### italic

▸ **italic**(`str`): `string`

Make the text italic.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make italic |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:92](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L92)

___

### magenta

▸ **magenta**(`str`): `string`

Set text color to magenta.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make magenta |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:172](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L172)

___

### nextRefill

▸ **nextRefill**(`bucket`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `bucket` | [`LeakyBucket`](../interfaces/LeakyBucket.md) |

#### Returns

`number`

#### Defined in

[packages/utils/src/bucket.ts:106](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/bucket.ts#L106)

___

### processReactionString

▸ **processReactionString**(`reaction`): `string`

Converts an reaction emoji unicode string to the discord required form of name:id

#### Parameters

| Name | Type |
| :------ | :------ |
| `reaction` | `string` |

#### Returns

`string`

#### Defined in

[packages/utils/src/reactions.ts:2](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/reactions.ts#L2)

___

### red

▸ **red**(`str`): `string`

Set text color to red.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make red |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:140](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L140)

___

### removeTokenPrefix

▸ **removeTokenPrefix**(`token?`, `type?`): `string`

Removes the Bot before the token.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `token?` | `string` | `undefined` |
| `type` | ``"GATEWAY"`` \| ``"REST"`` | `'REST'` |

#### Returns

`string`

#### Defined in

[packages/utils/src/token.ts:4](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/token.ts#L4)

___

### reset

▸ **reset**(`str`): `string`

Reset the text modified

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to reset |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:68](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L68)

___

### rgb24

▸ **rgb24**(`str`, `color`): `string`

Set text color using 24bit rgb.
`color` can be a number in range `0x000000` to `0xffffff` or
an `Rgb`.

To produce the color magenta:

```ts
     import { rgb24 } from "./colors.ts";
     rgb24("foo", 0xff00ff);
     rgb24("foo", {r: 255, g: 0, b: 255});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text color to apply 24bit rgb to |
| `color` | `number` \| [`Rgb`](../interfaces/Rgb.md) | code |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:439](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L439)

___

### rgb8

▸ **rgb8**(`str`, `color`): `string`

Set text color using paletted 8bit colors.
https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text color to apply paletted 8bit colors to |
| `color` | `number` | code |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:410](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L410)

___

### setColorEnabled

▸ **setColorEnabled**(`value`): `void`

Set changing text color to enabled or disabled

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`

#### Defined in

[packages/utils/src/colors.ts:29](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L29)

___

### snakeToCamelCase

▸ **snakeToCamelCase**(`str`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`string`

#### Defined in

[packages/utils/src/casing.ts:36](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/casing.ts#L36)

___

### snakelize

▸ **snakelize**<`T`\>(`object`): `Snakelize`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `T` |

#### Returns

`Snakelize`<`T`\>

#### Defined in

[packages/utils/src/casing.ts:19](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/casing.ts#L19)

___

### strikethrough

▸ **strikethrough**(`str`): `string`

Put horizontal line through the center of the text.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to strike through |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:124](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L124)

___

### stripColor

▸ **stripColor**(`string`): `string`

Remove ANSI escape codes from the string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | to remove ANSI escape codes from |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:481](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L481)

___

### underline

▸ **underline**(`str`): `string`

Make the text underline.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to underline |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:100](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L100)

___

### updateTokens

▸ **updateTokens**(`bucket`): `number`

Update the tokens of that bucket.

#### Parameters

| Name | Type |
| :------ | :------ |
| `bucket` | [`LeakyBucket`](../interfaces/LeakyBucket.md) |

#### Returns

`number`

The amount of current available tokens.

#### Defined in

[packages/utils/src/bucket.ts:95](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/bucket.ts#L95)

___

### urlToBase64

▸ **urlToBase64**(`url`): `Promise`<`string`\>

Converts a url to base 64. Useful for example, uploading/creating server emojis.

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[packages/utils/src/urlToBase64.ts:4](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/urlToBase64.ts#L4)

___

### white

▸ **white**(`str`): `string`

Set text color to white.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make white |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:188](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L188)

___

### yellow

▸ **yellow**(`str`): `string`

Set text color to yellow.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | text to make yellow |

#### Returns

`string`

#### Defined in

[packages/utils/src/colors.ts:156](https://github.com/discordeno/discordeno/blob/b8c25357/packages/utils/src/colors.ts#L156)
