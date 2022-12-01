[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / EventHandlers

# Interface: EventHandlers

[@discordeno/bot](../modules/discordeno_bot.md).EventHandlers

## Table of contents

### Properties

- [automodActionExecution](discordeno_bot.EventHandlers.md#automodactionexecution)
- [automodRuleCreate](discordeno_bot.EventHandlers.md#automodrulecreate)
- [automodRuleDelete](discordeno_bot.EventHandlers.md#automodruledelete)
- [automodRuleUpdate](discordeno_bot.EventHandlers.md#automodruleupdate)
- [botUpdate](discordeno_bot.EventHandlers.md#botupdate)
- [channelCreate](discordeno_bot.EventHandlers.md#channelcreate)
- [channelDelete](discordeno_bot.EventHandlers.md#channeldelete)
- [channelPinsUpdate](discordeno_bot.EventHandlers.md#channelpinsupdate)
- [channelUpdate](discordeno_bot.EventHandlers.md#channelupdate)
- [debug](discordeno_bot.EventHandlers.md#debug)
- [dispatchRequirements](discordeno_bot.EventHandlers.md#dispatchrequirements)
- [guildBanAdd](discordeno_bot.EventHandlers.md#guildbanadd)
- [guildBanRemove](discordeno_bot.EventHandlers.md#guildbanremove)
- [guildCreate](discordeno_bot.EventHandlers.md#guildcreate)
- [guildDelete](discordeno_bot.EventHandlers.md#guilddelete)
- [guildEmojisUpdate](discordeno_bot.EventHandlers.md#guildemojisupdate)
- [guildMemberAdd](discordeno_bot.EventHandlers.md#guildmemberadd)
- [guildMemberRemove](discordeno_bot.EventHandlers.md#guildmemberremove)
- [guildMemberUpdate](discordeno_bot.EventHandlers.md#guildmemberupdate)
- [guildUpdate](discordeno_bot.EventHandlers.md#guildupdate)
- [integrationCreate](discordeno_bot.EventHandlers.md#integrationcreate)
- [integrationDelete](discordeno_bot.EventHandlers.md#integrationdelete)
- [integrationUpdate](discordeno_bot.EventHandlers.md#integrationupdate)
- [interactionCreate](discordeno_bot.EventHandlers.md#interactioncreate)
- [inviteCreate](discordeno_bot.EventHandlers.md#invitecreate)
- [inviteDelete](discordeno_bot.EventHandlers.md#invitedelete)
- [messageCreate](discordeno_bot.EventHandlers.md#messagecreate)
- [messageDelete](discordeno_bot.EventHandlers.md#messagedelete)
- [messageDeleteBulk](discordeno_bot.EventHandlers.md#messagedeletebulk)
- [messageUpdate](discordeno_bot.EventHandlers.md#messageupdate)
- [presenceUpdate](discordeno_bot.EventHandlers.md#presenceupdate)
- [raw](discordeno_bot.EventHandlers.md#raw)
- [reactionAdd](discordeno_bot.EventHandlers.md#reactionadd)
- [reactionRemove](discordeno_bot.EventHandlers.md#reactionremove)
- [reactionRemoveAll](discordeno_bot.EventHandlers.md#reactionremoveall)
- [reactionRemoveEmoji](discordeno_bot.EventHandlers.md#reactionremoveemoji)
- [ready](discordeno_bot.EventHandlers.md#ready)
- [roleCreate](discordeno_bot.EventHandlers.md#rolecreate)
- [roleDelete](discordeno_bot.EventHandlers.md#roledelete)
- [roleUpdate](discordeno_bot.EventHandlers.md#roleupdate)
- [scheduledEventCreate](discordeno_bot.EventHandlers.md#scheduledeventcreate)
- [scheduledEventDelete](discordeno_bot.EventHandlers.md#scheduledeventdelete)
- [scheduledEventUpdate](discordeno_bot.EventHandlers.md#scheduledeventupdate)
- [scheduledEventUserAdd](discordeno_bot.EventHandlers.md#scheduledeventuseradd)
- [scheduledEventUserRemove](discordeno_bot.EventHandlers.md#scheduledeventuserremove)
- [stageInstanceCreate](discordeno_bot.EventHandlers.md#stageinstancecreate)
- [stageInstanceDelete](discordeno_bot.EventHandlers.md#stageinstancedelete)
- [stageInstanceUpdate](discordeno_bot.EventHandlers.md#stageinstanceupdate)
- [threadCreate](discordeno_bot.EventHandlers.md#threadcreate)
- [threadDelete](discordeno_bot.EventHandlers.md#threaddelete)
- [threadMemberUpdate](discordeno_bot.EventHandlers.md#threadmemberupdate)
- [threadMembersUpdate](discordeno_bot.EventHandlers.md#threadmembersupdate)
- [threadUpdate](discordeno_bot.EventHandlers.md#threadupdate)
- [typingStart](discordeno_bot.EventHandlers.md#typingstart)
- [voiceServerUpdate](discordeno_bot.EventHandlers.md#voiceserverupdate)
- [voiceStateUpdate](discordeno_bot.EventHandlers.md#voicestateupdate)
- [webhooksUpdate](discordeno_bot.EventHandlers.md#webhooksupdate)

## Properties

### automodActionExecution

• **automodActionExecution**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`AutoModerationActionExecution`](discordeno_bot.AutoModerationActionExecution.md)) => `unknown`

#### Type declaration

▸ (`bot`, `payload`): `unknown`

##### Parameters

| Name      | Type                                                                               |
| :-------- | :--------------------------------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                                     |
| `payload` | [`AutoModerationActionExecution`](discordeno_bot.AutoModerationActionExecution.md) |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:421](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L421)

---

### automodRuleCreate

• **automodRuleCreate**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `rule`: [`AutoModerationRule`](discordeno_bot.AutoModerationRule.md)) => `unknown`

#### Type declaration

▸ (`bot`, `rule`): `unknown`

##### Parameters

| Name   | Type                                                         |
| :----- | :----------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                               |
| `rule` | [`AutoModerationRule`](discordeno_bot.AutoModerationRule.md) |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:418](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L418)

---

### automodRuleDelete

• **automodRuleDelete**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `rule`: [`AutoModerationRule`](discordeno_bot.AutoModerationRule.md)) => `unknown`

#### Type declaration

▸ (`bot`, `rule`): `unknown`

##### Parameters

| Name   | Type                                                         |
| :----- | :----------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                               |
| `rule` | [`AutoModerationRule`](discordeno_bot.AutoModerationRule.md) |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:420](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L420)

---

### automodRuleUpdate

• **automodRuleUpdate**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `rule`: [`AutoModerationRule`](discordeno_bot.AutoModerationRule.md)) => `unknown`

#### Type declaration

▸ (`bot`, `rule`): `unknown`

##### Parameters

| Name   | Type                                                         |
| :----- | :----------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                               |
| `rule` | [`AutoModerationRule`](discordeno_bot.AutoModerationRule.md) |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:419](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L419)

---

### botUpdate

• **botUpdate**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `user`: [`User`](discordeno_bot.User.md)) => `unknown`

#### Type declaration

▸ (`bot`, `user`): `unknown`

##### Parameters

| Name   | Type                             |
| :----- | :------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)   |
| `user` | [`User`](discordeno_bot.User.md) |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:624](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L624)

---

### channelCreate

• **channelCreate**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `channel`: [`Channel`](discordeno_bot.Channel.md)) => `unknown`

#### Type declaration

▸ (`bot`, `channel`): `unknown`

##### Parameters

| Name      | Type                                   |
| :-------- | :------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)         |
| `channel` | [`Channel`](discordeno_bot.Channel.md) |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:565](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L565)

---

### channelDelete

• **channelDelete**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `channel`: [`Channel`](discordeno_bot.Channel.md)) => `unknown`

#### Type declaration

▸ (`bot`, `channel`): `unknown`

##### Parameters

| Name      | Type                                   |
| :-------- | :------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)         |
| `channel` | [`Channel`](discordeno_bot.Channel.md) |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:571](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L571)

---

### channelPinsUpdate

• **channelPinsUpdate**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: { `channelId`: `bigint` ; `guildId?`: `bigint` ; `lastPinTimestamp?`: `number` }) => `unknown`

#### Type declaration

▸ (`bot`, `data`): `unknown`

##### Parameters

| Name                     | Type                           |
| :----------------------- | :----------------------------- |
| `bot`                    | [`Bot`](discordeno_bot.Bot.md) |
| `data`                   | `Object`                       |
| `data.channelId`         | `bigint`                       |
| `data.guildId?`          | `bigint`                       |
| `data.lastPinTimestamp?` | `number`                       |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:572](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L572)

---

### channelUpdate

• **channelUpdate**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `channel`: [`Channel`](discordeno_bot.Channel.md)) => `unknown`

#### Type declaration

▸ (`bot`, `channel`): `unknown`

##### Parameters

| Name      | Type                                   |
| :-------- | :------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)         |
| `channel` | [`Channel`](discordeno_bot.Channel.md) |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:576](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L576)

---

### debug

• **debug**: (`text`: `string`, ...`args`: `any`[]) => `unknown`

#### Type declaration

▸ (`text`, ...`args`): `unknown`

##### Parameters

| Name      | Type     |
| :-------- | :------- |
| `text`    | `string` |
| `...args` | `any`[]  |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:417](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L417)

---

### dispatchRequirements

• **dispatchRequirements**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md), `shardId`: `number`) => `unknown`

#### Type declaration

▸ (`bot`, `data`, `shardId`): `unknown`

##### Parameters

| Name      | Type                                                               |
| :-------- | :----------------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data`    | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |
| `shardId` | `number`                                                           |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:566](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L566)

---

### guildBanAdd

• **guildBanAdd**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `user`: [`User`](discordeno_bot.User.md), `guildId`: `bigint`) => `unknown`

#### Type declaration

▸ (`bot`, `user`, `guildId`): `unknown`

##### Parameters

| Name      | Type                             |
| :-------- | :------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)   |
| `user`    | [`User`](discordeno_bot.User.md) |
| `guildId` | `bigint`                         |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:611](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L611)

---

### guildBanRemove

• **guildBanRemove**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `user`: [`User`](discordeno_bot.User.md), `guildId`: `bigint`) => `unknown`

#### Type declaration

▸ (`bot`, `user`, `guildId`): `unknown`

##### Parameters

| Name      | Type                             |
| :-------- | :------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)   |
| `user`    | [`User`](discordeno_bot.User.md) |
| `guildId` | `bigint`                         |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:612](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L612)

---

### guildCreate

• **guildCreate**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `guild`: [`Guild`](discordeno_bot.Guild.md)) => `unknown`

#### Type declaration

▸ (`bot`, `guild`): `unknown`

##### Parameters

| Name    | Type                               |
| :------ | :--------------------------------- |
| `bot`   | [`Bot`](discordeno_bot.Bot.md)     |
| `guild` | [`Guild`](discordeno_bot.Guild.md) |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:613](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L613)

---

### guildDelete

• **guildDelete**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `id`: `bigint`, `shardId`: `number`) => `unknown`

#### Type declaration

▸ (`bot`, `id`, `shardId`): `unknown`

##### Parameters

| Name      | Type                           |
| :-------- | :----------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md) |
| `id`      | `bigint`                       |
| `shardId` | `number`                       |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:614](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L614)

---

### guildEmojisUpdate

• **guildEmojisUpdate**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: { `emojis`: [`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`DiscordEmoji`](discordeno_bot.DiscordEmoji.md)\> ; `guildId`: `bigint` }) => `unknown`

#### Type declaration

▸ (`bot`, `payload`): `unknown`

##### Parameters

| Name              | Type                                                                                                                 |
| :---------------- | :------------------------------------------------------------------------------------------------------------------- |
| `bot`             | [`Bot`](discordeno_bot.Bot.md)                                                                                       |
| `payload`         | `Object`                                                                                                             |
| `payload.emojis`  | [`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`DiscordEmoji`](discordeno_bot.DiscordEmoji.md)\> |
| `payload.guildId` | `bigint`                                                                                                             |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:604](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L604)

---

### guildMemberAdd

• **guildMemberAdd**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `member`: [`Member`](discordeno_bot.Member.md), `user`: [`User`](discordeno_bot.User.md)) => `unknown`

#### Type declaration

▸ (`bot`, `member`, `user`): `unknown`

##### Parameters

| Name     | Type                                 |
| :------- | :----------------------------------- |
| `bot`    | [`Bot`](discordeno_bot.Bot.md)       |
| `member` | [`Member`](discordeno_bot.Member.md) |
| `user`   | [`User`](discordeno_bot.User.md)     |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:490](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L490)

---

### guildMemberRemove

• **guildMemberRemove**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `user`: [`User`](discordeno_bot.User.md), `guildId`: `bigint`) => `unknown`

#### Type declaration

▸ (`bot`, `user`, `guildId`): `unknown`

##### Parameters

| Name      | Type                             |
| :-------- | :------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)   |
| `user`    | [`User`](discordeno_bot.User.md) |
| `guildId` | `bigint`                         |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:495](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L495)

---

### guildMemberUpdate

• **guildMemberUpdate**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `member`: [`Member`](discordeno_bot.Member.md), `user`: [`User`](discordeno_bot.User.md)) => `unknown`

#### Type declaration

▸ (`bot`, `member`, `user`): `unknown`

##### Parameters

| Name     | Type                                 |
| :------- | :----------------------------------- |
| `bot`    | [`Bot`](discordeno_bot.Bot.md)       |
| `member` | [`Member`](discordeno_bot.Member.md) |
| `user`   | [`User`](discordeno_bot.User.md)     |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:496](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L496)

---

### guildUpdate

• **guildUpdate**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `guild`: [`Guild`](discordeno_bot.Guild.md)) => `unknown`

#### Type declaration

▸ (`bot`, `guild`): `unknown`

##### Parameters

| Name    | Type                               |
| :------ | :--------------------------------- |
| `bot`   | [`Bot`](discordeno_bot.Bot.md)     |
| `guild` | [`Guild`](discordeno_bot.Guild.md) |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:615](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L615)

---

### integrationCreate

• **integrationCreate**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `integration`: [`Integration`](discordeno_bot.Integration.md)) => `unknown`

#### Type declaration

▸ (`bot`, `integration`): `unknown`

##### Parameters

| Name          | Type                                           |
| :------------ | :--------------------------------------------- |
| `bot`         | [`Bot`](discordeno_bot.Bot.md)                 |
| `integration` | [`Integration`](discordeno_bot.Integration.md) |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:475](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L475)

---

### integrationDelete

• **integrationDelete**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: { `applicationId?`: `bigint` ; `guildId`: `bigint` ; `id`: `bigint` }) => `unknown`

#### Type declaration

▸ (`bot`, `payload`): `unknown`

##### Parameters

| Name                     | Type                           |
| :----------------------- | :----------------------------- |
| `bot`                    | [`Bot`](discordeno_bot.Bot.md) |
| `payload`                | `Object`                       |
| `payload.applicationId?` | `bigint`                       |
| `payload.guildId`        | `bigint`                       |
| `payload.id`             | `bigint`                       |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:476](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L476)

---

### integrationUpdate

• **integrationUpdate**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: { `guildId`: `bigint` }) => `unknown`

#### Type declaration

▸ (`bot`, `payload`): `unknown`

##### Parameters

| Name              | Type                           |
| :---------------- | :----------------------------- |
| `bot`             | [`Bot`](discordeno_bot.Bot.md) |
| `payload`         | `Object`                       |
| `payload.guildId` | `bigint`                       |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:480](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L480)

---

### interactionCreate

• **interactionCreate**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `interaction`: [`Interaction`](discordeno_bot.Interaction.md)) => `unknown`

#### Type declaration

▸ (`bot`, `interaction`): `unknown`

##### Parameters

| Name          | Type                                           |
| :------------ | :--------------------------------------------- |
| `bot`         | [`Bot`](discordeno_bot.Bot.md)                 |
| `interaction` | [`Interaction`](discordeno_bot.Interaction.md) |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:474](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L474)

---

### inviteCreate

• **inviteCreate**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `invite`: [`Invite`](discordeno_bot.Invite.md)) => `unknown`

#### Type declaration

▸ (`bot`, `invite`): `unknown`

##### Parameters

| Name     | Type                                 |
| :------- | :----------------------------------- |
| `bot`    | [`Bot`](discordeno_bot.Bot.md)       |
| `invite` | [`Invite`](discordeno_bot.Invite.md) |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:481](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L481)

---

### inviteDelete

• **inviteDelete**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: { `channelId`: `bigint` ; `code`: `string` ; `guildId?`: `bigint` }) => `unknown`

#### Type declaration

▸ (`bot`, `payload`): `unknown`

##### Parameters

| Name                | Type                           |
| :------------------ | :----------------------------- |
| `bot`               | [`Bot`](discordeno_bot.Bot.md) |
| `payload`           | `Object`                       |
| `payload.channelId` | `bigint`                       |
| `payload.code`      | `string`                       |
| `payload.guildId?`  | `bigint`                       |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:482](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L482)

---

### messageCreate

• **messageCreate**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `message`: [`Message`](discordeno_bot.Message.md)) => `unknown`

#### Type declaration

▸ (`bot`, `message`): `unknown`

##### Parameters

| Name      | Type                                   |
| :-------- | :------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)         |
| `message` | [`Message`](discordeno_bot.Message.md) |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:501](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L501)

---

### messageDelete

• **messageDelete**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: { `channelId`: `bigint` ; `guildId?`: `bigint` ; `id`: `bigint` }, `message?`: [`Message`](discordeno_bot.Message.md)) => `unknown`

#### Type declaration

▸ (`bot`, `payload`, `message?`): `unknown`

##### Parameters

| Name                | Type                                   |
| :------------------ | :------------------------------------- |
| `bot`               | [`Bot`](discordeno_bot.Bot.md)         |
| `payload`           | `Object`                               |
| `payload.channelId` | `bigint`                               |
| `payload.guildId?`  | `bigint`                               |
| `payload.id`        | `bigint`                               |
| `message?`          | [`Message`](discordeno_bot.Message.md) |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:502](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L502)

---

### messageDeleteBulk

• **messageDeleteBulk**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: { `channelId`: `bigint` ; `guildId?`: `bigint` ; `ids`: `bigint`[] }) => `unknown`

#### Type declaration

▸ (`bot`, `payload`): `unknown`

##### Parameters

| Name                | Type                           |
| :------------------ | :----------------------------- |
| `bot`               | [`Bot`](discordeno_bot.Bot.md) |
| `payload`           | `Object`                       |
| `payload.channelId` | `bigint`                       |
| `payload.guildId?`  | `bigint`                       |
| `payload.ids`       | `bigint`[]                     |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:507](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L507)

---

### messageUpdate

• **messageUpdate**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `message`: [`Message`](discordeno_bot.Message.md), `oldMessage?`: [`Message`](discordeno_bot.Message.md)) => `unknown`

#### Type declaration

▸ (`bot`, `message`, `oldMessage?`): `unknown`

##### Parameters

| Name          | Type                                   |
| :------------ | :------------------------------------- |
| `bot`         | [`Bot`](discordeno_bot.Bot.md)         |
| `message`     | [`Message`](discordeno_bot.Message.md) |
| `oldMessage?` | [`Message`](discordeno_bot.Message.md) |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:508](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L508)

---

### presenceUpdate

• **presenceUpdate**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `presence`: [`PresenceUpdate`](discordeno_bot.PresenceUpdate.md), `oldPresence?`: [`PresenceUpdate`](discordeno_bot.PresenceUpdate.md)) => `unknown`

#### Type declaration

▸ (`bot`, `presence`, `oldPresence?`): `unknown`

##### Parameters

| Name           | Type                                                 |
| :------------- | :--------------------------------------------------- |
| `bot`          | [`Bot`](discordeno_bot.Bot.md)                       |
| `presence`     | [`PresenceUpdate`](discordeno_bot.PresenceUpdate.md) |
| `oldPresence?` | [`PresenceUpdate`](discordeno_bot.PresenceUpdate.md) |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:552](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L552)

---

### raw

• **raw**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md), `shardId`: `number`) => `unknown`

#### Type declaration

▸ (`bot`, `data`, `shardId`): `unknown`

##### Parameters

| Name      | Type                                                               |
| :-------- | :----------------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data`    | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |
| `shardId` | `number`                                                           |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:616](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L616)

---

### reactionAdd

• **reactionAdd**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: { `channelId`: `bigint` ; `emoji`: [`Emoji`](discordeno_bot.Emoji.md) ; `guildId?`: `bigint` ; `member?`: [`Member`](discordeno_bot.Member.md) ; `messageId`: `bigint` ; `user?`: [`User`](discordeno_bot.User.md) ; `userId`: `bigint` }) => `unknown`

#### Type declaration

▸ (`bot`, `payload`): `unknown`

##### Parameters

| Name                | Type                                 |
| :------------------ | :----------------------------------- |
| `bot`               | [`Bot`](discordeno_bot.Bot.md)       |
| `payload`           | `Object`                             |
| `payload.channelId` | `bigint`                             |
| `payload.emoji`     | [`Emoji`](discordeno_bot.Emoji.md)   |
| `payload.guildId?`  | `bigint`                             |
| `payload.member?`   | [`Member`](discordeno_bot.Member.md) |
| `payload.messageId` | `bigint`                             |
| `payload.user?`     | [`User`](discordeno_bot.User.md)     |
| `payload.userId`    | `bigint`                             |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:513](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L513)

---

### reactionRemove

• **reactionRemove**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: { `channelId`: `bigint` ; `emoji`: [`Emoji`](discordeno_bot.Emoji.md) ; `guildId?`: `bigint` ; `messageId`: `bigint` ; `userId`: `bigint` }) => `unknown`

#### Type declaration

▸ (`bot`, `payload`): `unknown`

##### Parameters

| Name                | Type                               |
| :------------------ | :--------------------------------- |
| `bot`               | [`Bot`](discordeno_bot.Bot.md)     |
| `payload`           | `Object`                           |
| `payload.channelId` | `bigint`                           |
| `payload.emoji`     | [`Emoji`](discordeno_bot.Emoji.md) |
| `payload.guildId?`  | `bigint`                           |
| `payload.messageId` | `bigint`                           |
| `payload.userId`    | `bigint`                           |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:525](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L525)

---

### reactionRemoveAll

• **reactionRemoveAll**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: { `channelId`: `bigint` ; `guildId?`: `bigint` ; `messageId`: `bigint` }) => `unknown`

#### Type declaration

▸ (`bot`, `payload`): `unknown`

##### Parameters

| Name                | Type                           |
| :------------------ | :----------------------------- |
| `bot`               | [`Bot`](discordeno_bot.Bot.md) |
| `payload`           | `Object`                       |
| `payload.channelId` | `bigint`                       |
| `payload.guildId?`  | `bigint`                       |
| `payload.messageId` | `bigint`                       |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:544](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L544)

---

### reactionRemoveEmoji

• **reactionRemoveEmoji**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: { `channelId`: `bigint` ; `emoji`: [`Emoji`](discordeno_bot.Emoji.md) ; `guildId?`: `bigint` ; `messageId`: `bigint` }) => `unknown`

#### Type declaration

▸ (`bot`, `payload`): `unknown`

##### Parameters

| Name                | Type                               |
| :------------------ | :--------------------------------- |
| `bot`               | [`Bot`](discordeno_bot.Bot.md)     |
| `payload`           | `Object`                           |
| `payload.channelId` | `bigint`                           |
| `payload.emoji`     | [`Emoji`](discordeno_bot.Emoji.md) |
| `payload.guildId?`  | `bigint`                           |
| `payload.messageId` | `bigint`                           |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:535](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L535)

---

### ready

• **ready**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: { `applicationId`: `bigint` ; `guilds`: `bigint`[] ; `sessionId`: `string` ; `shard?`: `number`[] ; `shardId`: `number` ; `user`: [`User`](discordeno_bot.User.md) ; `v`: `number` }, `rawPayload`: [`DiscordReady`](discordeno_bot.DiscordReady.md)) => `unknown`

#### Type declaration

▸ (`bot`, `payload`, `rawPayload`): `unknown`

##### Parameters

| Name                    | Type                                             |
| :---------------------- | :----------------------------------------------- |
| `bot`                   | [`Bot`](discordeno_bot.Bot.md)                   |
| `payload`               | `Object`                                         |
| `payload.applicationId` | `bigint`                                         |
| `payload.guilds`        | `bigint`[]                                       |
| `payload.sessionId`     | `string`                                         |
| `payload.shard?`        | `number`[]                                       |
| `payload.shardId`       | `number`                                         |
| `payload.user`          | [`User`](discordeno_bot.User.md)                 |
| `payload.v`             | `number`                                         |
| `rawPayload`            | [`DiscordReady`](discordeno_bot.DiscordReady.md) |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:461](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L461)

---

### roleCreate

• **roleCreate**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `role`: [`Role`](discordeno_bot.Role.md)) => `unknown`

#### Type declaration

▸ (`bot`, `role`): `unknown`

##### Parameters

| Name   | Type                             |
| :----- | :------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)   |
| `role` | [`Role`](discordeno_bot.Role.md) |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:617](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L617)

---

### roleDelete

• **roleDelete**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: { `guildId`: `bigint` ; `roleId`: `bigint` }) => `unknown`

#### Type declaration

▸ (`bot`, `payload`): `unknown`

##### Parameters

| Name              | Type                           |
| :---------------- | :----------------------------- |
| `bot`             | [`Bot`](discordeno_bot.Bot.md) |
| `payload`         | `Object`                       |
| `payload.guildId` | `bigint`                       |
| `payload.roleId`  | `bigint`                       |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:618](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L618)

---

### roleUpdate

• **roleUpdate**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `role`: [`Role`](discordeno_bot.Role.md)) => `unknown`

#### Type declaration

▸ (`bot`, `role`): `unknown`

##### Parameters

| Name   | Type                             |
| :----- | :------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)   |
| `role` | [`Role`](discordeno_bot.Role.md) |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:619](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L619)

---

### scheduledEventCreate

• **scheduledEventCreate**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `event`: [`ScheduledEvent`](discordeno_bot.ScheduledEvent.md)) => `unknown`

#### Type declaration

▸ (`bot`, `event`): `unknown`

##### Parameters

| Name    | Type                                                 |
| :------ | :--------------------------------------------------- |
| `bot`   | [`Bot`](discordeno_bot.Bot.md)                       |
| `event` | [`ScheduledEvent`](discordeno_bot.ScheduledEvent.md) |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:440](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L440)

---

### scheduledEventDelete

• **scheduledEventDelete**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `event`: [`ScheduledEvent`](discordeno_bot.ScheduledEvent.md)) => `unknown`

#### Type declaration

▸ (`bot`, `event`): `unknown`

##### Parameters

| Name    | Type                                                 |
| :------ | :--------------------------------------------------- |
| `bot`   | [`Bot`](discordeno_bot.Bot.md)                       |
| `event` | [`ScheduledEvent`](discordeno_bot.ScheduledEvent.md) |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:442](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L442)

---

### scheduledEventUpdate

• **scheduledEventUpdate**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `event`: [`ScheduledEvent`](discordeno_bot.ScheduledEvent.md)) => `unknown`

#### Type declaration

▸ (`bot`, `event`): `unknown`

##### Parameters

| Name    | Type                                                 |
| :------ | :--------------------------------------------------- |
| `bot`   | [`Bot`](discordeno_bot.Bot.md)                       |
| `event` | [`ScheduledEvent`](discordeno_bot.ScheduledEvent.md) |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:441](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L441)

---

### scheduledEventUserAdd

• **scheduledEventUserAdd**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: { `guildId`: `bigint` ; `guildScheduledEventId`: `bigint` ; `userId`: `bigint` }) => `unknown`

#### Type declaration

▸ (`bot`, `payload`): `unknown`

Sent when a user has subscribed to a guild scheduled event. EXPERIMENTAL!

##### Parameters

| Name                            | Type                           |
| :------------------------------ | :----------------------------- |
| `bot`                           | [`Bot`](discordeno_bot.Bot.md) |
| `payload`                       | `Object`                       |
| `payload.guildId`               | `bigint`                       |
| `payload.guildScheduledEventId` | `bigint`                       |
| `payload.userId`                | `bigint`                       |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:444](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L444)

---

### scheduledEventUserRemove

• **scheduledEventUserRemove**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: { `guildId`: `bigint` ; `guildScheduledEventId`: `bigint` ; `userId`: `bigint` }) => `unknown`

#### Type declaration

▸ (`bot`, `payload`): `unknown`

Sent when a user has unsubscribed to a guild scheduled event. EXPERIMENTAL!

##### Parameters

| Name                            | Type                           |
| :------------------------------ | :----------------------------- |
| `bot`                           | [`Bot`](discordeno_bot.Bot.md) |
| `payload`                       | `Object`                       |
| `payload.guildId`               | `bigint`                       |
| `payload.guildScheduledEventId` | `bigint`                       |
| `payload.userId`                | `bigint`                       |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:453](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L453)

---

### stageInstanceCreate

• **stageInstanceCreate**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: { `channelId`: `bigint` ; `guildId`: `bigint` ; `id`: `bigint` ; `topic`: `string` }) => `unknown`

#### Type declaration

▸ (`bot`, `data`): `unknown`

##### Parameters

| Name             | Type                           |
| :--------------- | :----------------------------- |
| `bot`            | [`Bot`](discordeno_bot.Bot.md) |
| `data`           | `Object`                       |
| `data.channelId` | `bigint`                       |
| `data.guildId`   | `bigint`                       |
| `data.id`        | `bigint`                       |
| `data.topic`     | `string`                       |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:577](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L577)

---

### stageInstanceDelete

• **stageInstanceDelete**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: { `channelId`: `bigint` ; `guildId`: `bigint` ; `id`: `bigint` ; `topic`: `string` }) => `unknown`

#### Type declaration

▸ (`bot`, `data`): `unknown`

##### Parameters

| Name             | Type                           |
| :--------------- | :----------------------------- |
| `bot`            | [`Bot`](discordeno_bot.Bot.md) |
| `data`           | `Object`                       |
| `data.channelId` | `bigint`                       |
| `data.guildId`   | `bigint`                       |
| `data.id`        | `bigint`                       |
| `data.topic`     | `string`                       |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:586](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L586)

---

### stageInstanceUpdate

• **stageInstanceUpdate**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: { `channelId`: `bigint` ; `guildId`: `bigint` ; `id`: `bigint` ; `topic`: `string` }) => `unknown`

#### Type declaration

▸ (`bot`, `data`): `unknown`

##### Parameters

| Name             | Type                           |
| :--------------- | :----------------------------- |
| `bot`            | [`Bot`](discordeno_bot.Bot.md) |
| `data`           | `Object`                       |
| `data.channelId` | `bigint`                       |
| `data.guildId`   | `bigint`                       |
| `data.id`        | `bigint`                       |
| `data.topic`     | `string`                       |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:595](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L595)

---

### threadCreate

• **threadCreate**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `thread`: [`Channel`](discordeno_bot.Channel.md)) => `unknown`

#### Type declaration

▸ (`bot`, `thread`): `unknown`

##### Parameters

| Name     | Type                                   |
| :------- | :------------------------------------- |
| `bot`    | [`Bot`](discordeno_bot.Bot.md)         |
| `thread` | [`Channel`](discordeno_bot.Channel.md) |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:422](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L422)

---

### threadDelete

• **threadDelete**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `thread`: [`Channel`](discordeno_bot.Channel.md)) => `unknown`

#### Type declaration

▸ (`bot`, `thread`): `unknown`

##### Parameters

| Name     | Type                                   |
| :------- | :------------------------------------- |
| `bot`    | [`Bot`](discordeno_bot.Bot.md)         |
| `thread` | [`Channel`](discordeno_bot.Channel.md) |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:423](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L423)

---

### threadMemberUpdate

• **threadMemberUpdate**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: { `flags`: `number` ; `guildId`: `bigint` ; `id`: `bigint` ; `joinedAt`: `number` }) => `unknown`

#### Type declaration

▸ (`bot`, `payload`): `unknown`

##### Parameters

| Name               | Type                           |
| :----------------- | :----------------------------- |
| `bot`              | [`Bot`](discordeno_bot.Bot.md) |
| `payload`          | `Object`                       |
| `payload.flags`    | `number`                       |
| `payload.guildId`  | `bigint`                       |
| `payload.id`       | `bigint`                       |
| `payload.joinedAt` | `number`                       |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:424](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L424)

---

### threadMembersUpdate

• **threadMembersUpdate**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: { `addedMembers?`: [`ThreadMember`](discordeno_bot.ThreadMember.md)[] ; `guildId`: `bigint` ; `id`: `bigint` ; `removedMemberIds?`: `bigint`[] }) => `unknown`

#### Type declaration

▸ (`bot`, `payload`): `unknown`

##### Parameters

| Name                        | Type                                               |
| :-------------------------- | :------------------------------------------------- |
| `bot`                       | [`Bot`](discordeno_bot.Bot.md)                     |
| `payload`                   | `Object`                                           |
| `payload.addedMembers?`     | [`ThreadMember`](discordeno_bot.ThreadMember.md)[] |
| `payload.guildId`           | `bigint`                                           |
| `payload.id`                | `bigint`                                           |
| `payload.removedMemberIds?` | `bigint`[]                                         |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:430](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L430)

---

### threadUpdate

• **threadUpdate**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `thread`: [`Channel`](discordeno_bot.Channel.md)) => `unknown`

#### Type declaration

▸ (`bot`, `thread`): `unknown`

##### Parameters

| Name     | Type                                   |
| :------- | :------------------------------------- |
| `bot`    | [`Bot`](discordeno_bot.Bot.md)         |
| `thread` | [`Channel`](discordeno_bot.Channel.md) |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:439](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L439)

---

### typingStart

• **typingStart**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: { `channelId`: `bigint` ; `guildId`: `undefined` \| `bigint` ; `member`: `undefined` \| [`Member`](discordeno_bot.Member.md) ; `timestamp`: `number` ; `userId`: `bigint` }) => `unknown`

#### Type declaration

▸ (`bot`, `payload`): `unknown`

##### Parameters

| Name                | Type                                                |
| :------------------ | :-------------------------------------------------- |
| `bot`               | [`Bot`](discordeno_bot.Bot.md)                      |
| `payload`           | `Object`                                            |
| `payload.channelId` | `bigint`                                            |
| `payload.guildId`   | `undefined` \| `bigint`                             |
| `payload.member`    | `undefined` \| [`Member`](discordeno_bot.Member.md) |
| `payload.timestamp` | `number`                                            |
| `payload.userId`    | `bigint`                                            |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:625](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L625)

---

### voiceServerUpdate

• **voiceServerUpdate**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: { `endpoint?`: `string` ; `guildId`: `bigint` ; `token`: `string` }) => `unknown`

#### Type declaration

▸ (`bot`, `payload`): `unknown`

##### Parameters

| Name                | Type                           |
| :------------------ | :----------------------------- |
| `bot`               | [`Bot`](discordeno_bot.Bot.md) |
| `payload`           | `Object`                       |
| `payload.endpoint?` | `string`                       |
| `payload.guildId`   | `bigint`                       |
| `payload.token`     | `string`                       |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:557](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L557)

---

### voiceStateUpdate

• **voiceStateUpdate**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `voiceState`: [`VoiceState`](discordeno_bot.VoiceState.md)) => `unknown`

#### Type declaration

▸ (`bot`, `voiceState`): `unknown`

##### Parameters

| Name         | Type                                         |
| :----------- | :------------------------------------------- |
| `bot`        | [`Bot`](discordeno_bot.Bot.md)               |
| `voiceState` | [`VoiceState`](discordeno_bot.VoiceState.md) |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:561](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L561)

---

### webhooksUpdate

• **webhooksUpdate**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: { `channelId`: `bigint` ; `guildId`: `bigint` }) => `unknown`

#### Type declaration

▸ (`bot`, `payload`): `unknown`

##### Parameters

| Name                | Type                           |
| :------------------ | :----------------------------- |
| `bot`               | [`Bot`](discordeno_bot.Bot.md) |
| `payload`           | `Object`                       |
| `payload.channelId` | `bigint`                       |
| `payload.guildId`   | `bigint`                       |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:620](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L620)
