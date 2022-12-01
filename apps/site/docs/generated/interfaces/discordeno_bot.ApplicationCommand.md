[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / ApplicationCommand

# Interface: ApplicationCommand

[@discordeno/bot](../modules/discordeno_bot.md).ApplicationCommand

## Hierarchy

- `ReturnType`<typeof `transformApplicationCommand`\>

  ↳ **`ApplicationCommand`**

## Table of contents

### Properties

- [applicationId](discordeno_bot.ApplicationCommand.md#applicationid)
- [defaultMemberPermissions](discordeno_bot.ApplicationCommand.md#defaultmemberpermissions)
- [description](discordeno_bot.ApplicationCommand.md#description)
- [descriptionLocalizations](discordeno_bot.ApplicationCommand.md#descriptionlocalizations)
- [dmPermission](discordeno_bot.ApplicationCommand.md#dmpermission)
- [guildId](discordeno_bot.ApplicationCommand.md#guildid)
- [id](discordeno_bot.ApplicationCommand.md#id)
- [name](discordeno_bot.ApplicationCommand.md#name)
- [nameLocalizations](discordeno_bot.ApplicationCommand.md#namelocalizations)
- [options](discordeno_bot.ApplicationCommand.md#options)
- [type](discordeno_bot.ApplicationCommand.md#type)
- [version](discordeno_bot.ApplicationCommand.md#version)

## Properties

### applicationId

• **applicationId**: `bigint`

#### Inherited from

ReturnType.applicationId

---

### defaultMemberPermissions

• **defaultMemberPermissions**: `undefined` \| `bigint`

#### Inherited from

ReturnType.defaultMemberPermissions

---

### description

• **description**: `string`

#### Inherited from

ReturnType.description

---

### descriptionLocalizations

• **descriptionLocalizations**: `undefined` \| { `bg`: `undefined` \| `string` ; `cs`: `undefined` \| `string` ; `da`: `undefined` \| `string` ; `de`: `undefined` \| `string` ; `el`: `undefined` \| `string` ; `en-GB`: `undefined` \| `string` ; `en-US`: `undefined` \| `string` ; `es-ES`: `undefined` \| `string` ; `fi`: `undefined` \| `string` ; `fr`: `undefined` \| `string` ; `hi`: `undefined` \| `string` ; `hr`: `undefined` \| `string` ; `hu`: `undefined` \| `string` ; `it`: `undefined` \| `string` ; `ja`: `undefined` \| `string` ; `ko`: `undefined` \| `string` ; `lt`: `undefined` \| `string` ; `nl`: `undefined` \| `string` ; `no`: `undefined` \| `string` ; `pl`: `undefined` \| `string` ; `pt-BR`: `undefined` \| `string` ; `ro`: `undefined` \| `string` ; `ru`: `undefined` \| `string` ; `sv-SE`: `undefined` \| `string` ; `th`: `undefined` \| `string` ; `tr`: `undefined` \| `string` ; `uk`: `undefined` \| `string` ; `vi`: `undefined` \| `string` ; `zh-CN`: `undefined` \| `string` ; `zh-TW`: `undefined` \| `string` }

#### Inherited from

ReturnType.descriptionLocalizations

---

### dmPermission

• **dmPermission**: `boolean`

#### Inherited from

ReturnType.dmPermission

---

### guildId

• **guildId**: `undefined` \| `bigint`

#### Inherited from

ReturnType.guildId

---

### id

• **id**: `bigint`

#### Inherited from

ReturnType.id

---

### name

• **name**: `string`

#### Inherited from

ReturnType.name

---

### nameLocalizations

• **nameLocalizations**: `undefined` \| { `bg`: `undefined` \| `string` ; `cs`: `undefined` \| `string` ; `da`: `undefined` \| `string` ; `de`: `undefined` \| `string` ; `el`: `undefined` \| `string` ; `en-GB`: `undefined` \| `string` ; `en-US`: `undefined` \| `string` ; `es-ES`: `undefined` \| `string` ; `fi`: `undefined` \| `string` ; `fr`: `undefined` \| `string` ; `hi`: `undefined` \| `string` ; `hr`: `undefined` \| `string` ; `hu`: `undefined` \| `string` ; `it`: `undefined` \| `string` ; `ja`: `undefined` \| `string` ; `ko`: `undefined` \| `string` ; `lt`: `undefined` \| `string` ; `nl`: `undefined` \| `string` ; `no`: `undefined` \| `string` ; `pl`: `undefined` \| `string` ; `pt-BR`: `undefined` \| `string` ; `ro`: `undefined` \| `string` ; `ru`: `undefined` \| `string` ; `sv-SE`: `undefined` \| `string` ; `th`: `undefined` \| `string` ; `tr`: `undefined` \| `string` ; `uk`: `undefined` \| `string` ; `vi`: `undefined` \| `string` ; `zh-CN`: `undefined` \| `string` ; `zh-TW`: `undefined` \| `string` }

#### Inherited from

ReturnType.nameLocalizations

---

### options

• **options**: `undefined` \| { `autocomplete`: `undefined` \| `boolean` ; `channelTypes`: `undefined` \| [`ChannelTypes`](../enums/discordeno_bot.ChannelTypes.md)[] ; `choices`: `undefined` \| { nameLocalizations?: { da?: string \| undefined; de?: string \| undefined; "en-GB"?: string \| undefined; "en-US"?: string \| undefined; "es-ES"?: string \| undefined; fr?: string \| undefined; ... 23 more ...; ko?: string \| undefined; } \| undefined; name: string; value: string \| number; }[] ; `description`: `string` ; `descriptionLocalizations`: `undefined` \| { da?: string \| undefined; de?: string \| undefined; "en-GB"?: string \| undefined; "en-US"?: string \| undefined; "es-ES"?: string \| undefined; fr?: string \| undefined; hr?: string \| undefined; ... 22 more ...; ko?: string \| undefined; } ; `maxLength`: `undefined` \| `number` ; `maxValue`: `undefined` \| `number` ; `minLength`: `undefined` \| `number` ; `minValue`: `undefined` \| `number` ; `name`: `string` ; `nameLocalizations`: `undefined` \| { da?: string \| undefined; de?: string \| undefined; "en-GB"?: string \| undefined; "en-US"?: string \| undefined; "es-ES"?: string \| undefined; fr?: string \| undefined; hr?: string \| undefined; ... 22 more ...; ko?: string \| undefined; } ; `options`: `undefined` \| { nameLocalizations?: { da?: string \| undefined; de?: string \| undefined; "en-GB"?: string \| undefined; "en-US"?: string \| undefined; "es-ES"?: string \| undefined; fr?: string \| undefined; ... 23 more ...; ko?: string \| undefined; } \| undefined; ... 12 more ...; description: string; }[] ; `required`: `undefined` \| `boolean` ; `type`: [`ApplicationCommandOptionTypes`](../enums/discordeno_bot.ApplicationCommandOptionTypes.md) }[]

#### Inherited from

ReturnType.options

---

### type

• **type**: `undefined` \| [`ApplicationCommandTypes`](../enums/discordeno_bot.ApplicationCommandTypes.md)

#### Inherited from

ReturnType.type

---

### version

• **version**: `undefined` \| `string`

#### Inherited from

ReturnType.version
