[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / Transformers

# Interface: Transformers

[@discordeno/bot](../modules/discordeno_bot.md).Transformers

## Table of contents

### Properties

- [activity](discordeno_bot.Transformers.md#activity)
- [application](discordeno_bot.Transformers.md#application)
- [applicationCommand](discordeno_bot.Transformers.md#applicationcommand)
- [applicationCommandOption](discordeno_bot.Transformers.md#applicationcommandoption)
- [applicationCommandOptionChoice](discordeno_bot.Transformers.md#applicationcommandoptionchoice)
- [applicationCommandPermission](discordeno_bot.Transformers.md#applicationcommandpermission)
- [attachment](discordeno_bot.Transformers.md#attachment)
- [auditLogEntry](discordeno_bot.Transformers.md#auditlogentry)
- [automodActionExecution](discordeno_bot.Transformers.md#automodactionexecution)
- [automodRule](discordeno_bot.Transformers.md#automodrule)
- [channel](discordeno_bot.Transformers.md#channel)
- [component](discordeno_bot.Transformers.md#component)
- [embed](discordeno_bot.Transformers.md#embed)
- [emoji](discordeno_bot.Transformers.md#emoji)
- [gatewayBot](discordeno_bot.Transformers.md#gatewaybot)
- [guild](discordeno_bot.Transformers.md#guild)
- [integration](discordeno_bot.Transformers.md#integration)
- [interaction](discordeno_bot.Transformers.md#interaction)
- [interactionDataOptions](discordeno_bot.Transformers.md#interactiondataoptions)
- [invite](discordeno_bot.Transformers.md#invite)
- [member](discordeno_bot.Transformers.md#member)
- [message](discordeno_bot.Transformers.md#message)
- [presence](discordeno_bot.Transformers.md#presence)
- [reverse](discordeno_bot.Transformers.md#reverse)
- [role](discordeno_bot.Transformers.md#role)
- [scheduledEvent](discordeno_bot.Transformers.md#scheduledevent)
- [snowflake](discordeno_bot.Transformers.md#snowflake)
- [stageInstance](discordeno_bot.Transformers.md#stageinstance)
- [sticker](discordeno_bot.Transformers.md#sticker)
- [stickerPack](discordeno_bot.Transformers.md#stickerpack)
- [team](discordeno_bot.Transformers.md#team)
- [template](discordeno_bot.Transformers.md#template)
- [threadMember](discordeno_bot.Transformers.md#threadmember)
- [user](discordeno_bot.Transformers.md#user)
- [voiceRegion](discordeno_bot.Transformers.md#voiceregion)
- [voiceState](discordeno_bot.Transformers.md#voicestate)
- [webhook](discordeno_bot.Transformers.md#webhook)
- [welcomeScreen](discordeno_bot.Transformers.md#welcomescreen)
- [widget](discordeno_bot.Transformers.md#widget)
- [widgetSettings](discordeno_bot.Transformers.md#widgetsettings)

## Properties

### activity

• **activity**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`DiscordActivity`](discordeno_bot.DiscordActivity.md)) => [`Activity`](discordeno_bot.Activity.md)

#### Type declaration

▸ (`bot`, `payload`): [`Activity`](discordeno_bot.Activity.md)

##### Parameters

| Name      | Type                                                   |
| :-------- | :----------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                         |
| `payload` | [`DiscordActivity`](discordeno_bot.DiscordActivity.md) |

##### Returns

[`Activity`](discordeno_bot.Activity.md)

#### Defined in

[packages/bot/src/bot.ts:317](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L317)

---

### application

• **application**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`DiscordApplication`](discordeno_bot.DiscordApplication.md)) => [`Application`](discordeno_bot.Application.md)

#### Type declaration

▸ (`bot`, `payload`): [`Application`](discordeno_bot.Application.md)

##### Parameters

| Name      | Type                                                         |
| :-------- | :----------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                               |
| `payload` | [`DiscordApplication`](discordeno_bot.DiscordApplication.md) |

##### Returns

[`Application`](discordeno_bot.Application.md)

#### Defined in

[packages/bot/src/bot.ts:314](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L314)

---

### applicationCommand

• **applicationCommand**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`DiscordApplicationCommand`](discordeno_bot.DiscordApplicationCommand.md)) => [`ApplicationCommand`](discordeno_bot.ApplicationCommand.md)

#### Type declaration

▸ (`bot`, `payload`): [`ApplicationCommand`](discordeno_bot.ApplicationCommand.md)

##### Parameters

| Name      | Type                                                                       |
| :-------- | :------------------------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                             |
| `payload` | [`DiscordApplicationCommand`](discordeno_bot.DiscordApplicationCommand.md) |

##### Returns

[`ApplicationCommand`](discordeno_bot.ApplicationCommand.md)

#### Defined in

[packages/bot/src/bot.ts:324](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L324)

---

### applicationCommandOption

• **applicationCommandOption**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`DiscordApplicationCommandOption`](discordeno_bot.DiscordApplicationCommandOption.md)) => [`ApplicationCommandOption`](discordeno_bot.ApplicationCommandOption.md)

#### Type declaration

▸ (`bot`, `payload`): [`ApplicationCommandOption`](discordeno_bot.ApplicationCommandOption.md)

##### Parameters

| Name      | Type                                                                                   |
| :-------- | :------------------------------------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                                         |
| `payload` | [`DiscordApplicationCommandOption`](discordeno_bot.DiscordApplicationCommandOption.md) |

##### Returns

[`ApplicationCommandOption`](discordeno_bot.ApplicationCommandOption.md)

#### Defined in

[packages/bot/src/bot.ts:325](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L325)

---

### applicationCommandOptionChoice

• **applicationCommandOptionChoice**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`DiscordApplicationCommandOptionChoice`](discordeno_bot.DiscordApplicationCommandOptionChoice.md)) => [`ApplicationCommandOptionChoice`](discordeno_bot.ApplicationCommandOptionChoice.md)

#### Type declaration

▸ (`bot`, `payload`): [`ApplicationCommandOptionChoice`](discordeno_bot.ApplicationCommandOptionChoice.md)

##### Parameters

| Name      | Type                                                                                               |
| :-------- | :------------------------------------------------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                                                     |
| `payload` | [`DiscordApplicationCommandOptionChoice`](discordeno_bot.DiscordApplicationCommandOptionChoice.md) |

##### Returns

[`ApplicationCommandOptionChoice`](discordeno_bot.ApplicationCommandOptionChoice.md)

#### Defined in

[packages/bot/src/bot.ts:339](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L339)

---

### applicationCommandPermission

• **applicationCommandPermission**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`DiscordGuildApplicationCommandPermissions`](discordeno_bot.DiscordGuildApplicationCommandPermissions.md)) => [`ApplicationCommandPermission`](discordeno_bot.ApplicationCommandPermission.md)

#### Type declaration

▸ (`bot`, `payload`): [`ApplicationCommandPermission`](discordeno_bot.ApplicationCommandPermission.md)

##### Parameters

| Name      | Type                                                                                                       |
| :-------- | :--------------------------------------------------------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                                                             |
| `payload` | [`DiscordGuildApplicationCommandPermissions`](discordeno_bot.DiscordGuildApplicationCommandPermissions.md) |

##### Returns

[`ApplicationCommandPermission`](discordeno_bot.ApplicationCommandPermission.md)

#### Defined in

[packages/bot/src/bot.ts:326](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L326)

---

### attachment

• **attachment**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`DiscordAttachment`](discordeno_bot.DiscordAttachment.md)) => [`Attachment`](discordeno_bot.Attachment.md)

#### Type declaration

▸ (`bot`, `payload`): [`Attachment`](discordeno_bot.Attachment.md)

##### Parameters

| Name      | Type                                                       |
| :-------- | :--------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                             |
| `payload` | [`DiscordAttachment`](discordeno_bot.DiscordAttachment.md) |

##### Returns

[`Attachment`](discordeno_bot.Attachment.md)

#### Defined in

[packages/bot/src/bot.ts:319](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L319)

---

### auditLogEntry

• **auditLogEntry**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`DiscordAuditLogEntry`](discordeno_bot.DiscordAuditLogEntry.md)) => [`AuditLogEntry`](discordeno_bot.AuditLogEntry.md)

#### Type declaration

▸ (`bot`, `payload`): [`AuditLogEntry`](discordeno_bot.AuditLogEntry.md)

##### Parameters

| Name      | Type                                                             |
| :-------- | :--------------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                   |
| `payload` | [`DiscordAuditLogEntry`](discordeno_bot.DiscordAuditLogEntry.md) |

##### Returns

[`AuditLogEntry`](discordeno_bot.AuditLogEntry.md)

#### Defined in

[packages/bot/src/bot.ts:323](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L323)

---

### automodActionExecution

• **automodActionExecution**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`DiscordAutoModerationActionExecution`](discordeno_bot.DiscordAutoModerationActionExecution.md)) => [`AutoModerationActionExecution`](discordeno_bot.AutoModerationActionExecution.md)

#### Type declaration

▸ (`bot`, `payload`): [`AutoModerationActionExecution`](discordeno_bot.AutoModerationActionExecution.md)

##### Parameters

| Name      | Type                                                                                             |
| :-------- | :----------------------------------------------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                                                   |
| `payload` | [`DiscordAutoModerationActionExecution`](discordeno_bot.DiscordAutoModerationActionExecution.md) |

##### Returns

[`AutoModerationActionExecution`](discordeno_bot.AutoModerationActionExecution.md)

#### Defined in

[packages/bot/src/bot.ts:302](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L302)

---

### automodRule

• **automodRule**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`DiscordAutoModerationRule`](discordeno_bot.DiscordAutoModerationRule.md)) => [`AutoModerationRule`](discordeno_bot.AutoModerationRule.md)

#### Type declaration

▸ (`bot`, `payload`): [`AutoModerationRule`](discordeno_bot.AutoModerationRule.md)

##### Parameters

| Name      | Type                                                                       |
| :-------- | :------------------------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                             |
| `payload` | [`DiscordAutoModerationRule`](discordeno_bot.DiscordAutoModerationRule.md) |

##### Returns

[`AutoModerationRule`](discordeno_bot.AutoModerationRule.md)

#### Defined in

[packages/bot/src/bot.ts:301](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L301)

---

### channel

• **channel**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: { `channel`: [`DiscordChannel`](discordeno_bot.DiscordChannel.md) } & { `guildId?`: `bigint` }) => [`Channel`](discordeno_bot.Channel.md)

#### Type declaration

▸ (`bot`, `payload`): [`Channel`](discordeno_bot.Channel.md)

##### Parameters

| Name      | Type                                                                                           |
| :-------- | :--------------------------------------------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                                                 |
| `payload` | { `channel`: [`DiscordChannel`](discordeno_bot.DiscordChannel.md) } & { `guildId?`: `bigint` } |

##### Returns

[`Channel`](discordeno_bot.Channel.md)

#### Defined in

[packages/bot/src/bot.ts:303](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L303)

---

### component

• **component**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`DiscordComponent`](discordeno_bot.DiscordComponent.md)) => [`Component`](discordeno_bot.Component.md)

#### Type declaration

▸ (`bot`, `payload`): [`Component`](discordeno_bot.Component.md)

##### Parameters

| Name      | Type                                                     |
| :-------- | :------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                           |
| `payload` | [`DiscordComponent`](discordeno_bot.DiscordComponent.md) |

##### Returns

[`Component`](discordeno_bot.Component.md)

#### Defined in

[packages/bot/src/bot.ts:321](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L321)

---

### embed

• **embed**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`DiscordEmbed`](discordeno_bot.DiscordEmbed.md)) => [`Embed`](discordeno_bot.Embed.md)

#### Type declaration

▸ (`bot`, `payload`): [`Embed`](discordeno_bot.Embed.md)

##### Parameters

| Name      | Type                                             |
| :-------- | :----------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                   |
| `payload` | [`DiscordEmbed`](discordeno_bot.DiscordEmbed.md) |

##### Returns

[`Embed`](discordeno_bot.Embed.md)

#### Defined in

[packages/bot/src/bot.ts:320](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L320)

---

### emoji

• **emoji**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`DiscordEmoji`](discordeno_bot.DiscordEmoji.md)) => [`Emoji`](discordeno_bot.Emoji.md)

#### Type declaration

▸ (`bot`, `payload`): [`Emoji`](discordeno_bot.Emoji.md)

##### Parameters

| Name      | Type                                             |
| :-------- | :----------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                   |
| `payload` | [`DiscordEmoji`](discordeno_bot.DiscordEmoji.md) |

##### Returns

[`Emoji`](discordeno_bot.Emoji.md)

#### Defined in

[packages/bot/src/bot.ts:316](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L316)

---

### gatewayBot

• **gatewayBot**: (`payload`: [`DiscordGetGatewayBot`](discordeno_bot.DiscordGetGatewayBot.md)) => [`GetGatewayBot`](discordeno_bot.GetGatewayBot.md)

#### Type declaration

▸ (`payload`): [`GetGatewayBot`](discordeno_bot.GetGatewayBot.md)

##### Parameters

| Name      | Type                                                             |
| :-------- | :--------------------------------------------------------------- |
| `payload` | [`DiscordGetGatewayBot`](discordeno_bot.DiscordGetGatewayBot.md) |

##### Returns

[`GetGatewayBot`](discordeno_bot.GetGatewayBot.md)

#### Defined in

[packages/bot/src/bot.ts:300](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L300)

---

### guild

• **guild**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: { `guild`: [`DiscordGuild`](discordeno_bot.DiscordGuild.md) } & { `shardId`: `number` }) => [`Guild`](discordeno_bot.Guild.md)

#### Type declaration

▸ (`bot`, `payload`): [`Guild`](discordeno_bot.Guild.md)

##### Parameters

| Name      | Type                                                                                    |
| :-------- | :-------------------------------------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                                          |
| `payload` | { `guild`: [`DiscordGuild`](discordeno_bot.DiscordGuild.md) } & { `shardId`: `number` } |

##### Returns

[`Guild`](discordeno_bot.Guild.md)

#### Defined in

[packages/bot/src/bot.ts:304](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L304)

---

### integration

• **integration**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`DiscordIntegrationCreateUpdate`](discordeno_bot.DiscordIntegrationCreateUpdate.md)) => [`Integration`](discordeno_bot.Integration.md)

#### Type declaration

▸ (`bot`, `payload`): [`Integration`](discordeno_bot.Integration.md)

##### Parameters

| Name      | Type                                                                                 |
| :-------- | :----------------------------------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                                       |
| `payload` | [`DiscordIntegrationCreateUpdate`](discordeno_bot.DiscordIntegrationCreateUpdate.md) |

##### Returns

[`Integration`](discordeno_bot.Integration.md)

#### Defined in

[packages/bot/src/bot.ts:312](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L312)

---

### interaction

• **interaction**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`DiscordInteraction`](discordeno_bot.DiscordInteraction.md)) => [`Interaction`](discordeno_bot.Interaction.md)

#### Type declaration

▸ (`bot`, `payload`): [`Interaction`](discordeno_bot.Interaction.md)

##### Parameters

| Name      | Type                                                         |
| :-------- | :----------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                               |
| `payload` | [`DiscordInteraction`](discordeno_bot.DiscordInteraction.md) |

##### Returns

[`Interaction`](discordeno_bot.Interaction.md)

#### Defined in

[packages/bot/src/bot.ts:310](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L310)

---

### interactionDataOptions

• **interactionDataOptions**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`DiscordInteractionDataOption`](discordeno_bot.DiscordInteractionDataOption.md)) => [`InteractionDataOption`](discordeno_bot.InteractionDataOption.md)

#### Type declaration

▸ (`bot`, `payload`): [`InteractionDataOption`](discordeno_bot.InteractionDataOption.md)

##### Parameters

| Name      | Type                                                                             |
| :-------- | :------------------------------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                                   |
| `payload` | [`DiscordInteractionDataOption`](discordeno_bot.DiscordInteractionDataOption.md) |

##### Returns

[`InteractionDataOption`](discordeno_bot.InteractionDataOption.md)

#### Defined in

[packages/bot/src/bot.ts:311](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L311)

---

### invite

• **invite**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `invite`: [`DiscordInviteCreate`](discordeno_bot.DiscordInviteCreate.md)) => [`Invite`](discordeno_bot.Invite.md)

#### Type declaration

▸ (`bot`, `invite`): [`Invite`](discordeno_bot.Invite.md)

##### Parameters

| Name     | Type                                                           |
| :------- | :------------------------------------------------------------- |
| `bot`    | [`Bot`](discordeno_bot.Bot.md)                                 |
| `invite` | [`DiscordInviteCreate`](discordeno_bot.DiscordInviteCreate.md) |

##### Returns

[`Invite`](discordeno_bot.Invite.md)

#### Defined in

[packages/bot/src/bot.ts:313](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L313)

---

### member

• **member**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`DiscordMember`](discordeno_bot.DiscordMember.md), `guildId`: `bigint`, `userId`: `bigint`) => [`Member`](discordeno_bot.Member.md)

#### Type declaration

▸ (`bot`, `payload`, `guildId`, `userId`): [`Member`](discordeno_bot.Member.md)

##### Parameters

| Name      | Type                                               |
| :-------- | :------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                     |
| `payload` | [`DiscordMember`](discordeno_bot.DiscordMember.md) |
| `guildId` | `bigint`                                           |
| `userId`  | `bigint`                                           |

##### Returns

[`Member`](discordeno_bot.Member.md)

#### Defined in

[packages/bot/src/bot.ts:306](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L306)

---

### message

• **message**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`DiscordMessage`](discordeno_bot.DiscordMessage.md)) => [`Message`](discordeno_bot.Message.md)

#### Type declaration

▸ (`bot`, `payload`): [`Message`](discordeno_bot.Message.md)

##### Parameters

| Name      | Type                                                 |
| :-------- | :--------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                       |
| `payload` | [`DiscordMessage`](discordeno_bot.DiscordMessage.md) |

##### Returns

[`Message`](discordeno_bot.Message.md)

#### Defined in

[packages/bot/src/bot.ts:307](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L307)

---

### presence

• **presence**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`DiscordPresenceUpdate`](discordeno_bot.DiscordPresenceUpdate.md)) => [`PresenceUpdate`](discordeno_bot.PresenceUpdate.md)

#### Type declaration

▸ (`bot`, `payload`): [`PresenceUpdate`](discordeno_bot.PresenceUpdate.md)

##### Parameters

| Name      | Type                                                               |
| :-------- | :----------------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                     |
| `payload` | [`DiscordPresenceUpdate`](discordeno_bot.DiscordPresenceUpdate.md) |

##### Returns

[`PresenceUpdate`](discordeno_bot.PresenceUpdate.md)

#### Defined in

[packages/bot/src/bot.ts:318](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L318)

---

### reverse

• **reverse**: `Object`

#### Type declaration

| Name                             | Type                                                                                                                                                                                                                                           |
| :------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `activity`                       | (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`Activity`](discordeno_bot.Activity.md)) => [`DiscordActivity`](discordeno_bot.DiscordActivity.md)                                                                                         |
| `allowedMentions`                | (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`AllowedMentions`](discordeno_bot.AllowedMentions.md)) => [`DiscordAllowedMentions`](discordeno_bot.DiscordAllowedMentions.md)                                                             |
| `application`                    | (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`Application`](discordeno_bot.Application.md)) => [`DiscordApplication`](discordeno_bot.DiscordApplication.md)                                                                             |
| `applicationCommand`             | (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`ApplicationCommand`](discordeno_bot.ApplicationCommand.md)) => [`DiscordApplicationCommand`](discordeno_bot.DiscordApplicationCommand.md)                                                 |
| `applicationCommandOption`       | (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`ApplicationCommandOption`](discordeno_bot.ApplicationCommandOption.md)) => [`DiscordApplicationCommandOption`](discordeno_bot.DiscordApplicationCommandOption.md)                         |
| `applicationCommandOptionChoice` | (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`ApplicationCommandOptionChoice`](discordeno_bot.ApplicationCommandOptionChoice.md)) => [`DiscordApplicationCommandOptionChoice`](discordeno_bot.DiscordApplicationCommandOptionChoice.md) |
| `attachment`                     | (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`Attachment`](discordeno_bot.Attachment.md)) => [`DiscordAttachment`](discordeno_bot.DiscordAttachment.md)                                                                                 |
| `component`                      | (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`Component`](discordeno_bot.Component.md)) => [`DiscordComponent`](discordeno_bot.DiscordComponent.md)                                                                                     |
| `createApplicationCommand`       | (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`CreateApplicationCommand`](../modules/discordeno_bot.md#createapplicationcommand)) => [`DiscordCreateApplicationCommand`](discordeno_bot.DiscordCreateApplicationCommand.md)              |
| `embed`                          | (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`Embed`](discordeno_bot.Embed.md)) => [`DiscordEmbed`](discordeno_bot.DiscordEmbed.md)                                                                                                     |
| `interactionResponse`            | (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`InteractionResponse`](discordeno_bot.InteractionResponse.md)) => [`DiscordInteractionResponse`](discordeno_bot.DiscordInteractionResponse.md)                                             |
| `member`                         | (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`Member`](discordeno_bot.Member.md)) => [`DiscordMember`](discordeno_bot.DiscordMember.md)                                                                                                 |
| `snowflake`                      | (`snowflake`: [`BigString`](../modules/discordeno_bot.md#bigstring)) => `string`                                                                                                                                                               |
| `team`                           | (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`Team`](discordeno_bot.Team.md)) => [`DiscordTeam`](discordeno_bot.DiscordTeam.md)                                                                                                         |
| `user`                           | (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`User`](discordeno_bot.User.md)) => [`DiscordUser`](discordeno_bot.DiscordUser.md)                                                                                                         |

#### Defined in

[packages/bot/src/bot.ts:279](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L279)

---

### role

• **role**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: { `role`: [`DiscordRole`](discordeno_bot.DiscordRole.md) } & { `guildId`: `bigint` }) => [`Role`](discordeno_bot.Role.md)

#### Type declaration

▸ (`bot`, `payload`): [`Role`](discordeno_bot.Role.md)

##### Parameters

| Name      | Type                                                                                 |
| :-------- | :----------------------------------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                                       |
| `payload` | { `role`: [`DiscordRole`](discordeno_bot.DiscordRole.md) } & { `guildId`: `bigint` } |

##### Returns

[`Role`](discordeno_bot.Role.md)

#### Defined in

[packages/bot/src/bot.ts:308](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L308)

---

### scheduledEvent

• **scheduledEvent**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`DiscordScheduledEvent`](discordeno_bot.DiscordScheduledEvent.md)) => [`ScheduledEvent`](discordeno_bot.ScheduledEvent.md)

#### Type declaration

▸ (`bot`, `payload`): [`ScheduledEvent`](discordeno_bot.ScheduledEvent.md)

##### Parameters

| Name      | Type                                                               |
| :-------- | :----------------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                     |
| `payload` | [`DiscordScheduledEvent`](discordeno_bot.DiscordScheduledEvent.md) |

##### Returns

[`ScheduledEvent`](discordeno_bot.ScheduledEvent.md)

#### Defined in

[packages/bot/src/bot.ts:330](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L330)

---

### snowflake

• **snowflake**: (`snowflake`: [`BigString`](../modules/discordeno_bot.md#bigstring)) => `bigint`

#### Type declaration

▸ (`snowflake`): `bigint`

##### Parameters

| Name        | Type                                                  |
| :---------- | :---------------------------------------------------- |
| `snowflake` | [`BigString`](../modules/discordeno_bot.md#bigstring) |

##### Returns

`bigint`

#### Defined in

[packages/bot/src/bot.ts:299](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L299)

---

### stageInstance

• **stageInstance**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`DiscordStageInstance`](discordeno_bot.DiscordStageInstance.md)) => [`StageInstance`](discordeno_bot.StageInstance.md)

#### Type declaration

▸ (`bot`, `payload`): [`StageInstance`](discordeno_bot.StageInstance.md)

##### Parameters

| Name      | Type                                                             |
| :-------- | :--------------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                   |
| `payload` | [`DiscordStageInstance`](discordeno_bot.DiscordStageInstance.md) |

##### Returns

[`StageInstance`](discordeno_bot.StageInstance.md)

#### Defined in

[packages/bot/src/bot.ts:336](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L336)

---

### sticker

• **sticker**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`DiscordSticker`](discordeno_bot.DiscordSticker.md)) => [`Sticker`](discordeno_bot.Sticker.md)

#### Type declaration

▸ (`bot`, `payload`): [`Sticker`](discordeno_bot.Sticker.md)

##### Parameters

| Name      | Type                                                 |
| :-------- | :--------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                       |
| `payload` | [`DiscordSticker`](discordeno_bot.DiscordSticker.md) |

##### Returns

[`Sticker`](discordeno_bot.Sticker.md)

#### Defined in

[packages/bot/src/bot.ts:337](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L337)

---

### stickerPack

• **stickerPack**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`DiscordStickerPack`](discordeno_bot.DiscordStickerPack.md)) => [`StickerPack`](discordeno_bot.StickerPack.md)

#### Type declaration

▸ (`bot`, `payload`): [`StickerPack`](discordeno_bot.StickerPack.md)

##### Parameters

| Name      | Type                                                         |
| :-------- | :----------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                               |
| `payload` | [`DiscordStickerPack`](discordeno_bot.DiscordStickerPack.md) |

##### Returns

[`StickerPack`](discordeno_bot.StickerPack.md)

#### Defined in

[packages/bot/src/bot.ts:338](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L338)

---

### team

• **team**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`DiscordTeam`](discordeno_bot.DiscordTeam.md)) => [`Team`](discordeno_bot.Team.md)

#### Type declaration

▸ (`bot`, `payload`): [`Team`](discordeno_bot.Team.md)

##### Parameters

| Name      | Type                                           |
| :-------- | :--------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                 |
| `payload` | [`DiscordTeam`](discordeno_bot.DiscordTeam.md) |

##### Returns

[`Team`](discordeno_bot.Team.md)

#### Defined in

[packages/bot/src/bot.ts:315](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L315)

---

### template

• **template**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`DiscordTemplate`](discordeno_bot.DiscordTemplate.md)) => [`Template`](discordeno_bot.Template.md)

#### Type declaration

▸ (`bot`, `payload`): [`Template`](discordeno_bot.Template.md)

##### Parameters

| Name      | Type                                                   |
| :-------- | :----------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                         |
| `payload` | [`DiscordTemplate`](discordeno_bot.DiscordTemplate.md) |

##### Returns

[`Template`](discordeno_bot.Template.md)

#### Defined in

[packages/bot/src/bot.ts:343](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L343)

---

### threadMember

• **threadMember**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`DiscordThreadMember`](discordeno_bot.DiscordThreadMember.md)) => [`ThreadMember`](discordeno_bot.ThreadMember.md)

#### Type declaration

▸ (`bot`, `payload`): [`ThreadMember`](discordeno_bot.ThreadMember.md)

##### Parameters

| Name      | Type                                                           |
| :-------- | :------------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                 |
| `payload` | [`DiscordThreadMember`](discordeno_bot.DiscordThreadMember.md) |

##### Returns

[`ThreadMember`](discordeno_bot.ThreadMember.md)

#### Defined in

[packages/bot/src/bot.ts:331](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L331)

---

### user

• **user**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`DiscordUser`](discordeno_bot.DiscordUser.md)) => [`User`](discordeno_bot.User.md)

#### Type declaration

▸ (`bot`, `payload`): [`User`](discordeno_bot.User.md)

##### Parameters

| Name      | Type                                           |
| :-------- | :--------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                 |
| `payload` | [`DiscordUser`](discordeno_bot.DiscordUser.md) |

##### Returns

[`User`](discordeno_bot.User.md)

#### Defined in

[packages/bot/src/bot.ts:305](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L305)

---

### voiceRegion

• **voiceRegion**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`DiscordVoiceRegion`](discordeno_bot.DiscordVoiceRegion.md)) => [`VoiceRegions`](discordeno_bot.VoiceRegions.md)

#### Type declaration

▸ (`bot`, `payload`): [`VoiceRegions`](discordeno_bot.VoiceRegions.md)

##### Parameters

| Name      | Type                                                         |
| :-------- | :----------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                               |
| `payload` | [`DiscordVoiceRegion`](discordeno_bot.DiscordVoiceRegion.md) |

##### Returns

[`VoiceRegions`](discordeno_bot.VoiceRegions.md)

#### Defined in

[packages/bot/src/bot.ts:333](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L333)

---

### voiceState

• **voiceState**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: { `voiceState`: [`DiscordVoiceState`](discordeno_bot.DiscordVoiceState.md) } & { `guildId`: `bigint` }) => [`VoiceState`](discordeno_bot.VoiceState.md)

#### Type declaration

▸ (`bot`, `payload`): [`VoiceState`](discordeno_bot.VoiceState.md)

##### Parameters

| Name      | Type                                                                                                   |
| :-------- | :----------------------------------------------------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                                                         |
| `payload` | { `voiceState`: [`DiscordVoiceState`](discordeno_bot.DiscordVoiceState.md) } & { `guildId`: `bigint` } |

##### Returns

[`VoiceState`](discordeno_bot.VoiceState.md)

#### Defined in

[packages/bot/src/bot.ts:309](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L309)

---

### webhook

• **webhook**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`DiscordWebhook`](../modules/discordeno_bot.md#discordwebhook)) => [`Webhook`](discordeno_bot.Webhook.md)

#### Type declaration

▸ (`bot`, `payload`): [`Webhook`](discordeno_bot.Webhook.md)

##### Parameters

| Name      | Type                                                            |
| :-------- | :-------------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                  |
| `payload` | [`DiscordWebhook`](../modules/discordeno_bot.md#discordwebhook) |

##### Returns

[`Webhook`](discordeno_bot.Webhook.md)

#### Defined in

[packages/bot/src/bot.ts:322](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L322)

---

### welcomeScreen

• **welcomeScreen**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`DiscordWelcomeScreen`](discordeno_bot.DiscordWelcomeScreen.md)) => [`WelcomeScreen`](discordeno_bot.WelcomeScreen.md)

#### Type declaration

▸ (`bot`, `payload`): [`WelcomeScreen`](discordeno_bot.WelcomeScreen.md)

##### Parameters

| Name      | Type                                                             |
| :-------- | :--------------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                   |
| `payload` | [`DiscordWelcomeScreen`](discordeno_bot.DiscordWelcomeScreen.md) |

##### Returns

[`WelcomeScreen`](discordeno_bot.WelcomeScreen.md)

#### Defined in

[packages/bot/src/bot.ts:332](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L332)

---

### widget

• **widget**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`DiscordGuildWidget`](discordeno_bot.DiscordGuildWidget.md)) => [`GuildWidget`](discordeno_bot.GuildWidget.md)

#### Type declaration

▸ (`bot`, `payload`): [`GuildWidget`](discordeno_bot.GuildWidget.md)

##### Parameters

| Name      | Type                                                         |
| :-------- | :----------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                               |
| `payload` | [`DiscordGuildWidget`](discordeno_bot.DiscordGuildWidget.md) |

##### Returns

[`GuildWidget`](discordeno_bot.GuildWidget.md)

#### Defined in

[packages/bot/src/bot.ts:334](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L334)

---

### widgetSettings

• **widgetSettings**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`DiscordGuildWidgetSettings`](discordeno_bot.DiscordGuildWidgetSettings.md)) => [`GuildWidgetSettings`](discordeno_bot.GuildWidgetSettings.md)

#### Type declaration

▸ (`bot`, `payload`): [`GuildWidgetSettings`](discordeno_bot.GuildWidgetSettings.md)

##### Parameters

| Name      | Type                                                                         |
| :-------- | :--------------------------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                               |
| `payload` | [`DiscordGuildWidgetSettings`](discordeno_bot.DiscordGuildWidgetSettings.md) |

##### Returns

[`GuildWidgetSettings`](discordeno_bot.GuildWidgetSettings.md)

#### Defined in

[packages/bot/src/bot.ts:335](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L335)
