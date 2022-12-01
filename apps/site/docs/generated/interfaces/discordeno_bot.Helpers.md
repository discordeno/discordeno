[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / Helpers

# Interface: Helpers

[@discordeno/bot](../modules/discordeno_bot.md).Helpers

## Hierarchy

- [`DefaultHelpers`](../modules/discordeno_bot.md#defaulthelpers)

  ↳ **`Helpers`**

## Table of contents

### Properties

- [publishMessage](discordeno_bot.Helpers.md#publishmessage)
- [sendWebhookMessage](discordeno_bot.Helpers.md#sendwebhookmessage)
- [startTyping](discordeno_bot.Helpers.md#starttyping)
- [swapChannels](discordeno_bot.Helpers.md#swapchannels)
- [updateBotVoiceState](discordeno_bot.Helpers.md#updatebotvoicestate)

### Methods

- [addReaction](discordeno_bot.Helpers.md#addreaction)
- [addReactions](discordeno_bot.Helpers.md#addreactions)
- [addRole](discordeno_bot.Helpers.md#addrole)
- [addThreadMember](discordeno_bot.Helpers.md#addthreadmember)
- [banMember](discordeno_bot.Helpers.md#banmember)
- [connectToVoiceChannel](discordeno_bot.Helpers.md#connecttovoicechannel)
- [createAutomodRule](discordeno_bot.Helpers.md#createautomodrule)
- [createChannel](discordeno_bot.Helpers.md#createchannel)
- [createEmoji](discordeno_bot.Helpers.md#createemoji)
- [createForumThread](discordeno_bot.Helpers.md#createforumthread)
- [createGlobalApplicationCommand](discordeno_bot.Helpers.md#createglobalapplicationcommand)
- [createGuild](discordeno_bot.Helpers.md#createguild)
- [createGuildApplicationCommand](discordeno_bot.Helpers.md#createguildapplicationcommand)
- [createGuildFromTemplate](discordeno_bot.Helpers.md#createguildfromtemplate)
- [createGuildSticker](discordeno_bot.Helpers.md#createguildsticker)
- [createGuildTemplate](discordeno_bot.Helpers.md#createguildtemplate)
- [createInvite](discordeno_bot.Helpers.md#createinvite)
- [createRole](discordeno_bot.Helpers.md#createrole)
- [createScheduledEvent](discordeno_bot.Helpers.md#createscheduledevent)
- [createStageInstance](discordeno_bot.Helpers.md#createstageinstance)
- [createWebhook](discordeno_bot.Helpers.md#createwebhook)
- [crosspostMessage](discordeno_bot.Helpers.md#crosspostmessage)
- [deleteAutomodRule](discordeno_bot.Helpers.md#deleteautomodrule)
- [deleteChannel](discordeno_bot.Helpers.md#deletechannel)
- [deleteChannelPermissionOverride](discordeno_bot.Helpers.md#deletechannelpermissionoverride)
- [deleteEmoji](discordeno_bot.Helpers.md#deleteemoji)
- [deleteFollowupMessage](discordeno_bot.Helpers.md#deletefollowupmessage)
- [deleteGlobalApplicationCommand](discordeno_bot.Helpers.md#deleteglobalapplicationcommand)
- [deleteGuild](discordeno_bot.Helpers.md#deleteguild)
- [deleteGuildApplicationCommand](discordeno_bot.Helpers.md#deleteguildapplicationcommand)
- [deleteGuildSticker](discordeno_bot.Helpers.md#deleteguildsticker)
- [deleteGuildTemplate](discordeno_bot.Helpers.md#deleteguildtemplate)
- [deleteIntegration](discordeno_bot.Helpers.md#deleteintegration)
- [deleteInvite](discordeno_bot.Helpers.md#deleteinvite)
- [deleteMessage](discordeno_bot.Helpers.md#deletemessage)
- [deleteMessages](discordeno_bot.Helpers.md#deletemessages)
- [deleteOriginalInteractionResponse](discordeno_bot.Helpers.md#deleteoriginalinteractionresponse)
- [deleteOwnReaction](discordeno_bot.Helpers.md#deleteownreaction)
- [deleteReactionsAll](discordeno_bot.Helpers.md#deletereactionsall)
- [deleteReactionsEmoji](discordeno_bot.Helpers.md#deletereactionsemoji)
- [deleteRole](discordeno_bot.Helpers.md#deleterole)
- [deleteScheduledEvent](discordeno_bot.Helpers.md#deletescheduledevent)
- [deleteStageInstance](discordeno_bot.Helpers.md#deletestageinstance)
- [deleteUserReaction](discordeno_bot.Helpers.md#deleteuserreaction)
- [deleteWebhook](discordeno_bot.Helpers.md#deletewebhook)
- [deleteWebhookMessage](discordeno_bot.Helpers.md#deletewebhookmessage)
- [deleteWebhookWithToken](discordeno_bot.Helpers.md#deletewebhookwithtoken)
- [editApplicationCommandPermissions](discordeno_bot.Helpers.md#editapplicationcommandpermissions)
- [editAutomodRule](discordeno_bot.Helpers.md#editautomodrule)
- [editBotMember](discordeno_bot.Helpers.md#editbotmember)
- [editBotProfile](discordeno_bot.Helpers.md#editbotprofile)
- [editBotStatus](discordeno_bot.Helpers.md#editbotstatus)
- [editChannel](discordeno_bot.Helpers.md#editchannel)
- [editChannelPermissionOverrides](discordeno_bot.Helpers.md#editchannelpermissionoverrides)
- [editChannelPositions](discordeno_bot.Helpers.md#editchannelpositions)
- [editEmoji](discordeno_bot.Helpers.md#editemoji)
- [editFollowupMessage](discordeno_bot.Helpers.md#editfollowupmessage)
- [editGlobalApplicationCommand](discordeno_bot.Helpers.md#editglobalapplicationcommand)
- [editGuild](discordeno_bot.Helpers.md#editguild)
- [editGuildApplicationCommand](discordeno_bot.Helpers.md#editguildapplicationcommand)
- [editGuildMfaLevel](discordeno_bot.Helpers.md#editguildmfalevel)
- [editGuildSticker](discordeno_bot.Helpers.md#editguildsticker)
- [editGuildTemplate](discordeno_bot.Helpers.md#editguildtemplate)
- [editMember](discordeno_bot.Helpers.md#editmember)
- [editMessage](discordeno_bot.Helpers.md#editmessage)
- [editOriginalInteractionResponse](discordeno_bot.Helpers.md#editoriginalinteractionresponse)
- [editOriginalWebhookMessage](discordeno_bot.Helpers.md#editoriginalwebhookmessage)
- [editOwnVoiceState](discordeno_bot.Helpers.md#editownvoicestate)
- [editRole](discordeno_bot.Helpers.md#editrole)
- [editScheduledEvent](discordeno_bot.Helpers.md#editscheduledevent)
- [editShardStatus](discordeno_bot.Helpers.md#editshardstatus)
- [editStageInstance](discordeno_bot.Helpers.md#editstageinstance)
- [editUserVoiceState](discordeno_bot.Helpers.md#edituservoicestate)
- [editWebhook](discordeno_bot.Helpers.md#editwebhook)
- [editWebhookMessage](discordeno_bot.Helpers.md#editwebhookmessage)
- [editWebhookWithToken](discordeno_bot.Helpers.md#editwebhookwithtoken)
- [editWelcomeScreen](discordeno_bot.Helpers.md#editwelcomescreen)
- [editWidgetSettings](discordeno_bot.Helpers.md#editwidgetsettings)
- [executeWebhook](discordeno_bot.Helpers.md#executewebhook)
- [fetchMembers](discordeno_bot.Helpers.md#fetchmembers)
- [followAnnouncementChannel](discordeno_bot.Helpers.md#followannouncementchannel)
- [getActiveThreads](discordeno_bot.Helpers.md#getactivethreads)
- [getApplicationCommandPermission](discordeno_bot.Helpers.md#getapplicationcommandpermission)
- [getApplicationCommandPermissions](discordeno_bot.Helpers.md#getapplicationcommandpermissions)
- [getApplicationInfo](discordeno_bot.Helpers.md#getapplicationinfo)
- [getAuditLog](discordeno_bot.Helpers.md#getauditlog)
- [getAutomodRule](discordeno_bot.Helpers.md#getautomodrule)
- [getAutomodRules](discordeno_bot.Helpers.md#getautomodrules)
- [getAvailableVoiceRegions](discordeno_bot.Helpers.md#getavailablevoiceregions)
- [getAvatarURL](discordeno_bot.Helpers.md#getavatarurl)
- [getBan](discordeno_bot.Helpers.md#getban)
- [getBans](discordeno_bot.Helpers.md#getbans)
- [getChannel](discordeno_bot.Helpers.md#getchannel)
- [getChannelInvites](discordeno_bot.Helpers.md#getchannelinvites)
- [getChannelWebhooks](discordeno_bot.Helpers.md#getchannelwebhooks)
- [getChannels](discordeno_bot.Helpers.md#getchannels)
- [getDmChannel](discordeno_bot.Helpers.md#getdmchannel)
- [getEmoji](discordeno_bot.Helpers.md#getemoji)
- [getEmojiURL](discordeno_bot.Helpers.md#getemojiurl)
- [getEmojis](discordeno_bot.Helpers.md#getemojis)
- [getFollowupMessage](discordeno_bot.Helpers.md#getfollowupmessage)
- [getGatewayBot](discordeno_bot.Helpers.md#getgatewaybot)
- [getGlobalApplicationCommand](discordeno_bot.Helpers.md#getglobalapplicationcommand)
- [getGlobalApplicationCommands](discordeno_bot.Helpers.md#getglobalapplicationcommands)
- [getGuild](discordeno_bot.Helpers.md#getguild)
- [getGuildApplicationCommand](discordeno_bot.Helpers.md#getguildapplicationcommand)
- [getGuildApplicationCommands](discordeno_bot.Helpers.md#getguildapplicationcommands)
- [getGuildBannerURL](discordeno_bot.Helpers.md#getguildbannerurl)
- [getGuildIconURL](discordeno_bot.Helpers.md#getguildiconurl)
- [getGuildPreview](discordeno_bot.Helpers.md#getguildpreview)
- [getGuildSplashURL](discordeno_bot.Helpers.md#getguildsplashurl)
- [getGuildSticker](discordeno_bot.Helpers.md#getguildsticker)
- [getGuildStickers](discordeno_bot.Helpers.md#getguildstickers)
- [getGuildTemplate](discordeno_bot.Helpers.md#getguildtemplate)
- [getGuildTemplates](discordeno_bot.Helpers.md#getguildtemplates)
- [getGuildWebhooks](discordeno_bot.Helpers.md#getguildwebhooks)
- [getIntegrations](discordeno_bot.Helpers.md#getintegrations)
- [getInvite](discordeno_bot.Helpers.md#getinvite)
- [getInvites](discordeno_bot.Helpers.md#getinvites)
- [getMember](discordeno_bot.Helpers.md#getmember)
- [getMembers](discordeno_bot.Helpers.md#getmembers)
- [getMessage](discordeno_bot.Helpers.md#getmessage)
- [getMessages](discordeno_bot.Helpers.md#getmessages)
- [getNitroStickerPacks](discordeno_bot.Helpers.md#getnitrostickerpacks)
- [getOriginalInteractionResponse](discordeno_bot.Helpers.md#getoriginalinteractionresponse)
- [getPinnedMessages](discordeno_bot.Helpers.md#getpinnedmessages)
- [getPrivateArchivedThreads](discordeno_bot.Helpers.md#getprivatearchivedthreads)
- [getPrivateJoinedArchivedThreads](discordeno_bot.Helpers.md#getprivatejoinedarchivedthreads)
- [getPruneCount](discordeno_bot.Helpers.md#getprunecount)
- [getPublicArchivedThreads](discordeno_bot.Helpers.md#getpublicarchivedthreads)
- [getReactions](discordeno_bot.Helpers.md#getreactions)
- [getRoles](discordeno_bot.Helpers.md#getroles)
- [getScheduledEvent](discordeno_bot.Helpers.md#getscheduledevent)
- [getScheduledEventUsers](discordeno_bot.Helpers.md#getscheduledeventusers)
- [getScheduledEvents](discordeno_bot.Helpers.md#getscheduledevents)
- [getStageInstance](discordeno_bot.Helpers.md#getstageinstance)
- [getSticker](discordeno_bot.Helpers.md#getsticker)
- [getThreadMember](discordeno_bot.Helpers.md#getthreadmember)
- [getThreadMembers](discordeno_bot.Helpers.md#getthreadmembers)
- [getUser](discordeno_bot.Helpers.md#getuser)
- [getVanityUrl](discordeno_bot.Helpers.md#getvanityurl)
- [getVoiceRegions](discordeno_bot.Helpers.md#getvoiceregions)
- [getWebhook](discordeno_bot.Helpers.md#getwebhook)
- [getWebhookMessage](discordeno_bot.Helpers.md#getwebhookmessage)
- [getWebhookWithToken](discordeno_bot.Helpers.md#getwebhookwithtoken)
- [getWelcomeScreen](discordeno_bot.Helpers.md#getwelcomescreen)
- [getWidget](discordeno_bot.Helpers.md#getwidget)
- [getWidgetImageURL](discordeno_bot.Helpers.md#getwidgetimageurl)
- [getWidgetSettings](discordeno_bot.Helpers.md#getwidgetsettings)
- [isGetMessagesAfter](discordeno_bot.Helpers.md#isgetmessagesafter)
- [isGetMessagesAround](discordeno_bot.Helpers.md#isgetmessagesaround)
- [isGetMessagesBefore](discordeno_bot.Helpers.md#isgetmessagesbefore)
- [isGetMessagesLimit](discordeno_bot.Helpers.md#isgetmessageslimit)
- [joinThread](discordeno_bot.Helpers.md#jointhread)
- [kickMember](discordeno_bot.Helpers.md#kickmember)
- [leaveGuild](discordeno_bot.Helpers.md#leaveguild)
- [leaveThread](discordeno_bot.Helpers.md#leavethread)
- [leaveVoiceChannel](discordeno_bot.Helpers.md#leavevoicechannel)
- [modifyRolePositions](discordeno_bot.Helpers.md#modifyrolepositions)
- [pinMessage](discordeno_bot.Helpers.md#pinmessage)
- [processReactionString](discordeno_bot.Helpers.md#processreactionstring)
- [pruneMembers](discordeno_bot.Helpers.md#prunemembers)
- [removeRole](discordeno_bot.Helpers.md#removerole)
- [removeThreadMember](discordeno_bot.Helpers.md#removethreadmember)
- [searchMembers](discordeno_bot.Helpers.md#searchmembers)
- [sendFollowupMessage](discordeno_bot.Helpers.md#sendfollowupmessage)
- [sendInteractionResponse](discordeno_bot.Helpers.md#sendinteractionresponse)
- [sendMessage](discordeno_bot.Helpers.md#sendmessage)
- [startThreadWithMessage](discordeno_bot.Helpers.md#startthreadwithmessage)
- [startThreadWithoutMessage](discordeno_bot.Helpers.md#startthreadwithoutmessage)
- [syncGuildTemplate](discordeno_bot.Helpers.md#syncguildtemplate)
- [triggerTypingIndicator](discordeno_bot.Helpers.md#triggertypingindicator)
- [unbanMember](discordeno_bot.Helpers.md#unbanmember)
- [unpinMessage](discordeno_bot.Helpers.md#unpinmessage)
- [upsertGlobalApplicationCommands](discordeno_bot.Helpers.md#upsertglobalapplicationcommands)
- [upsertGuildApplicationCommands](discordeno_bot.Helpers.md#upsertguildapplicationcommands)

## Properties

### publishMessage

• **publishMessage**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `channelId`: [`BigString`](../modules/discordeno_bot.md#bigstring), `messageId`: [`BigString`](../modules/discordeno_bot.md#bigstring)) => `Promise`<[`Message`](discordeno_bot.Message.md)\> = `crosspostMessage`

#### Type declaration

▸ (`bot`, `channelId`, `messageId`): `Promise`<[`Message`](discordeno_bot.Message.md)\>

Cross-posts a message posted in an announcement channel to subscribed channels.

**`Remarks`**

Requires the `SEND_MESSAGES` permission.

If not cross-posting own message:

- Requires the `MANAGE_MESSAGES` permission.

Fires a _Message Create_ event in the guilds the subscribed channels are in.

**`See`**

[https://discord.com/developers/docs/resources/channel#crosspost-message](https://discord.com/developers/docs/resources/channel#crosspost-message)

##### Parameters

| Name        | Type                                                  | Description                                  |
| :---------- | :---------------------------------------------------- | :------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request. |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the announcement channel.          |
| `messageId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the message to cross-post.         |

##### Returns

`Promise`<[`Message`](discordeno_bot.Message.md)\>

An instance of the cross-posted [Message](discordeno_bot.Message.md).

#### Inherited from

DefaultHelpers.publishMessage

#### Defined in

[packages/bot/src/helpers/messages/crosspostMessage.ts:5](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/crosspostMessage.ts#L5)

---

### sendWebhookMessage

• **sendWebhookMessage**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `webhookId`: [`BigString`](../modules/discordeno_bot.md#bigstring), `token`: `string`, `options`: [`ExecuteWebhook`](discordeno_bot.ExecuteWebhook.md)) => `Promise`<[`Message`](discordeno_bot.Message.md) \| `undefined`\> = `executeWebhook`

#### Type declaration

▸ (`bot`, `webhookId`, `token`, `options`): `Promise`<[`Message`](discordeno_bot.Message.md) \| `undefined`\>

Executes a webhook, causing a message to be posted in the channel configured for the webhook.

**`Remarks`**

If the webhook channel is a forum channel, you must provide a value for either `threadId` or `threadName`.

**`See`**

[https://discord.com/developers/docs/resources/webhook#execute-webhook](https://discord.com/developers/docs/resources/webhook#execute-webhook)

##### Parameters

| Name        | Type                                                  | Description                                      |
| :---------- | :---------------------------------------------------- | :----------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.     |
| `webhookId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the webhook to execute.                |
| `token`     | `string`                                              | The webhook token, used to execute the webhook.  |
| `options`   | [`ExecuteWebhook`](discordeno_bot.ExecuteWebhook.md)  | The parameters for the execution of the webhook. |

##### Returns

`Promise`<[`Message`](discordeno_bot.Message.md) \| `undefined`\>

An instance of the created [Message](discordeno_bot.Message.md), or `undefined` if the [wait](discordeno_bot.ExecuteWebhook.md#wait) property of the options object parameter is set to `false`.

#### Inherited from

DefaultHelpers.sendWebhookMessage

#### Defined in

[packages/bot/src/helpers/webhooks/executeWebhook.ts:6](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/webhooks/executeWebhook.ts#L6)

---

### startTyping

• **startTyping**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `channelId`: [`BigString`](../modules/discordeno_bot.md#bigstring)) => `Promise`<`void`\> = `triggerTypingIndicator`

#### Type declaration

▸ (`bot`, `channelId`): `Promise`<`void`\>

Triggers a typing indicator for the bot user.

**`Remarks`**

Generally, bots should _not_ use this route.

Fires a _Typing Start_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/channel#trigger-typing-indicator](https://discord.com/developers/docs/resources/channel#trigger-typing-indicator)

##### Parameters

| Name        | Type                                                  | Description                                                     |
| :---------- | :---------------------------------------------------- | :-------------------------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.                    |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the channel in which to trigger the typing indicator. |

##### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.startTyping

#### Defined in

[packages/bot/src/helpers/channels/triggerTypingIndicator.ts:4](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/triggerTypingIndicator.ts#L4)

---

### swapChannels

• **swapChannels**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `guildId`: [`BigString`](../modules/discordeno_bot.md#bigstring), `channelPositions`: [`ModifyGuildChannelPositions`](discordeno_bot.ModifyGuildChannelPositions.md)[]) => `Promise`<`void`\> = `editChannelPositions`

#### Type declaration

▸ (`bot`, `guildId`, `channelPositions`): `Promise`<`void`\>

Edits the positions of a set of channels in a guild.

**`Remarks`**

Requires the `MANAGE_CHANNELS` permission.

Fires a _Channel Update_ gateway event for every channel impacted in this change.

**`See`**

[https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions](https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions)

##### Parameters

| Name               | Type                                                                             | Description                                                         |
| :----------------- | :------------------------------------------------------------------------------- | :------------------------------------------------------------------ |
| `bot`              | [`Bot`](discordeno_bot.Bot.md)                                                   | The bot instance to use to make the request.                        |
| `guildId`          | [`BigString`](../modules/discordeno_bot.md#bigstring)                            | The ID of the guild in which to edit the positions of the channels. |
| `channelPositions` | [`ModifyGuildChannelPositions`](discordeno_bot.ModifyGuildChannelPositions.md)[] | A set of objects defining the updated positions of the channels.    |

##### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.swapChannels

#### Defined in

[packages/bot/src/helpers/channels/editChannelPositions.ts:4](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/editChannelPositions.ts#L4)

---

### updateBotVoiceState

• **updateBotVoiceState**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `guildId`: [`BigString`](../modules/discordeno_bot.md#bigstring), `options`: [`EditOwnVoiceState`](discordeno_bot.EditOwnVoiceState.md)) => `Promise`<`void`\> = `editOwnVoiceState`

#### Type declaration

▸ (`bot`, `guildId`, `options`): `Promise`<`void`\>

Edits the voice state of the bot user.

**`Remarks`**

The [channelId](discordeno_bot.EditOwnVoiceState.md#channelid) property of the options object parameter must point to a stage channel, and the bot user must already have joined it.

If attempting to unmute oneself:

- Requires the `MUTE_MEMBERS` permission.

If attempting to request to speak:

- Requires the `REQUEST_TO_SPEAK` permission.

**`See`**

[https://discord.com/developers/docs/resources/guild#modify-current-user-voice-state](https://discord.com/developers/docs/resources/guild#modify-current-user-voice-state)

##### Parameters

| Name      | Type                                                       | Description                                                           |
| :-------- | :--------------------------------------------------------- | :-------------------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                             | The bot instance to use to make the request.                          |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring)      | The ID of the guild in which to edit the voice state of the bot user. |
| `options` | [`EditOwnVoiceState`](discordeno_bot.EditOwnVoiceState.md) | The parameters for the edit of the voice state.                       |

##### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.updateBotVoiceState

#### Defined in

[packages/bot/src/helpers/guilds/voice/editVoiceState.ts:4](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/voice/editVoiceState.ts#L4)

## Methods

### addReaction

▸ **addReaction**(`bot`, `channelId`, `messageId`, `reaction`): `Promise`<`void`\>

Adds a reaction to a message.

**`Remarks`**

Requires the `READ_MESSAGE_HISTORY` permission.

If nobody else has reacted to the message:

- Requires the `ADD_REACTIONS` permission.

Fires a _Message Reaction Add_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/channel#create-reaction](https://discord.com/developers/docs/resources/channel#create-reaction)

#### Parameters

| Name        | Type                                                  | Description                                                   |
| :---------- | :---------------------------------------------------- | :------------------------------------------------------------ |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.                  |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the channel the message to add a reaction to is in. |
| `messageId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the message to add a reaction to.                   |
| `reaction`  | `string`                                              | The reaction to add to the message.                           |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.addReaction

#### Defined in

[packages/bot/src/helpers/messages/reactions/addReaction.ts:26](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/reactions/addReaction.ts#L26)

---

### addReactions

▸ **addReactions**(`bot`, `channelId`, `messageId`, `reactions`, `ordered?`): `Promise`<`void`\>

Adds multiple a reaction to a message.

This function uses the `addReaction()` helper behind the scenes.

**`Remarks`**

Requires the `READ_MESSAGE_HISTORY` permission.

If nobody else has reacted to the message:

- Requires the `ADD_REACTIONS` permission.

Fires a _Message Reaction Add_ gateway event for every reaction added.

#### Parameters

| Name        | Type                                                  | Default value | Description                                                  |
| :---------- | :---------------------------------------------------- | :------------ | :----------------------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | `undefined`   | The bot instance to use to make the request.                 |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | `undefined`   | The ID of the channel the message to add reactions to is in. |
| `messageId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | `undefined`   | The ID of the message to add the reactions to.               |
| `reactions` | `string`[]                                            | `undefined`   | The reactions to add to the message.                         |
| `ordered`   | `boolean`                                             | `false`       | Whether the reactions must be added in order or not.         |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.addReactions

#### Defined in

[packages/bot/src/helpers/messages/reactions/addReactions.ts:25](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/reactions/addReactions.ts#L25)

---

### addRole

▸ **addRole**(`bot`, `guildId`, `userId`, `roleId`, `reason?`): `Promise`<`void`\>

Adds a role to a member.

**`Remarks`**

Requires the `MANAGE_ROLES` permission.

Fires a _Guild Member Update_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/guild#add-guild-member-role](https://discord.com/developers/docs/resources/guild#add-guild-member-role)

#### Parameters

| Name      | Type                                                  | Description                                              |
| :-------- | :---------------------------------------------------- | :------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.             |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild the member to add the role to is in. |
| `userId`  | [`BigString`](../modules/discordeno_bot.md#bigstring) | The user ID of the member to add the role to.            |
| `roleId`  | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the role to add to the member.                 |
| `reason?` | `string`                                              | -                                                        |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.addRole

#### Defined in

[packages/bot/src/helpers/roles/addRole.ts:19](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/roles/addRole.ts#L19)

---

### addThreadMember

▸ **addThreadMember**(`bot`, `channelId`, `userId`): `Promise`<`void`\>

Adds a member to a thread.

**`Remarks`**

Requires the ability to send messages in the thread.
Requires the thread not be archived.

Fires a _Thread Members Update_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/channel#add-thread-member](https://discord.com/developers/docs/resources/channel#add-thread-member)

#### Parameters

| Name        | Type                                                  | Description                                     |
| :---------- | :---------------------------------------------------- | :---------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.    |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the thread to add the member to.      |
| `userId`    | [`BigString`](../modules/discordeno_bot.md#bigstring) | The user ID of the member to add to the thread. |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.addThreadMember

#### Defined in

[packages/bot/src/helpers/channels/threads/addThreadMember.ts:19](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/threads/addThreadMember.ts#L19)

---

### banMember

▸ **banMember**(`bot`, `guildId`, `userId`, `options?`): `Promise`<`void`\>

Bans a user from a guild.

**`Remarks`**

Requires the `BAN_MEMBERS` permission.

Fires a _Guild Ban Add_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/guild#create-guild-ban](https://discord.com/developers/docs/resources/guild#create-guild-ban)

#### Parameters

| Name       | Type                                                  | Description                                  |
| :--------- | :---------------------------------------------------- | :------------------------------------------- |
| `bot`      | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request. |
| `guildId`  | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild to ban the user from.    |
| `userId`   | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the user to ban from the guild.    |
| `options?` | [`CreateGuildBan`](discordeno_bot.CreateGuildBan.md)  | The parameters for the creation of the ban.  |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.banMember

#### Defined in

[packages/bot/src/helpers/members/banMember.ts:19](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/members/banMember.ts#L19)

---

### connectToVoiceChannel

▸ **connectToVoiceChannel**(`bot`, `guildId`, `channelId`, `options?`): `Promise`<`void`\>

Connects the bot user to a voice or stage channel.

This function sends the _Update Voice State_ gateway command over the gateway behind the scenes.

**`Remarks`**

Requires the `CONNECT` permission.

Fires a _Voice State Update_ gateway event.

**`See`**

[https://discord.com/developers/docs/topics/gateway#update-voice-state](https://discord.com/developers/docs/topics/gateway#update-voice-state)

#### Parameters

| Name        | Type                                                                                                                                                                                                                                                                                                                                                                                                                                   | Description                                           |
| :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                                                                                                                                                                                                                                                                                                                                                                                                         | The bot instance to use to make the request.          |
| `guildId`   | [`BigString`](../modules/discordeno_bot.md#bigstring)                                                                                                                                                                                                                                                                                                                                                                                  | The ID of the guild the voice channel to leave is in. |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring)                                                                                                                                                                                                                                                                                                                                                                                  | -                                                     |
| `options?`  | [`AtLeastOne`](../modules/discordeno_bot.md#atleastone)<`Omit`<[`UpdateVoiceState`](discordeno_bot.UpdateVoiceState.md), `"guildId"` \| `"channelId"`\>, { `selfDeaf`: `Pick`<`Omit`<[`UpdateVoiceState`](discordeno_bot.UpdateVoiceState.md), `"guildId"` \| `"channelId"`\>, `"selfDeaf"`\> ; `selfMute`: `Pick`<`Omit`<[`UpdateVoiceState`](discordeno_bot.UpdateVoiceState.md), `"guildId"` \| `"channelId"`\>, `"selfMute"`\> }\> | -                                                     |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.connectToVoiceChannel

#### Defined in

[packages/bot/src/helpers/guilds/voice/connectToVoiceChannel.ts:19](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/voice/connectToVoiceChannel.ts#L19)

---

### createAutomodRule

▸ **createAutomodRule**(`bot`, `guildId`, `options`): `Promise`<[`AutoModerationRule`](discordeno_bot.AutoModerationRule.md)\>

Creates an automod rule in a guild.

**`Remarks`**

Requires the `MANAGE_GUILD` permission.

Fires an _Auto Moderation Rule Create_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/auto-moderation#create-auto-moderation-rule](https://discord.com/developers/docs/resources/auto-moderation#create-auto-moderation-rule)

#### Parameters

| Name      | Type                                                                                   | Description                                  |
| :-------- | :------------------------------------------------------------------------------------- | :------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                                         | The bot instance to use to make the request. |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring)                                  | The ID of the guild to create the rule in.   |
| `options` | [`CreateAutoModerationRuleOptions`](discordeno_bot.CreateAutoModerationRuleOptions.md) | The parameters for the creation of the rule. |

#### Returns

`Promise`<[`AutoModerationRule`](discordeno_bot.AutoModerationRule.md)\>

An instance of the created [AutoModerationRule](discordeno_bot.AutoModerationRule.md).

#### Inherited from

DefaultHelpers.createAutomodRule

#### Defined in

[packages/bot/src/helpers/guilds/automod/createAutomodRule.ts:27](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/automod/createAutomodRule.ts#L27)

---

### createChannel

▸ **createChannel**(`bot`, `guildId`, `options`): `Promise`<[`Channel`](discordeno_bot.Channel.md)\>

Creates a channel within a guild.

**`Remarks`**

Requires the `MANAGE_CHANNELS` permission.

If setting permission overwrites, only the permissions the bot user has in the guild can be allowed or denied.

Setting the `MANAGE_ROLES` permission is only possible for guild administrators.

Fires a _Channel Create_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/guild#create-guild-channel](https://discord.com/developers/docs/resources/guild#create-guild-channel)

#### Parameters

| Name      | Type                                                         | Description                                       |
| :-------- | :----------------------------------------------------------- | :------------------------------------------------ |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                               | The bot instance to use to make the request.      |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring)        | The ID of the guild to create the channel within. |
| `options` | [`CreateGuildChannel`](discordeno_bot.CreateGuildChannel.md) | The parameters for the creation of the channel.   |

#### Returns

`Promise`<[`Channel`](discordeno_bot.Channel.md)\>

An instance of the created [Channel](discordeno_bot.Channel.md).

#### Inherited from

DefaultHelpers.createChannel

#### Defined in

[packages/bot/src/helpers/channels/createChannel.ts:25](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/createChannel.ts#L25)

---

### createEmoji

▸ **createEmoji**(`bot`, `guildId`, `options`): `Promise`<[`Emoji`](discordeno_bot.Emoji.md)\>

Creates an emoji in a guild.

**`Remarks`**

Requires the `MANAGE_EMOJIS_AND_STICKERS` permission.

Emojis have a maximum file size of 256 kilobits. Attempting to upload a larger emoji will cause the route to return 400 Bad Request.

Fires a _Guild Emojis Update_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/emoji#create-guild-emoji](https://discord.com/developers/docs/resources/emoji#create-guild-emoji)

#### Parameters

| Name      | Type                                                     | Description                                       |
| :-------- | :------------------------------------------------------- | :------------------------------------------------ |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                           | The bot instance to use to make the request.      |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring)    | The ID of the guild in which to create the emoji. |
| `options` | [`CreateGuildEmoji`](discordeno_bot.CreateGuildEmoji.md) | The parameters for the creation of the emoji.     |

#### Returns

`Promise`<[`Emoji`](discordeno_bot.Emoji.md)\>

An instance of the created [Emoji](discordeno_bot.Emoji.md).

#### Inherited from

DefaultHelpers.createEmoji

#### Defined in

[packages/bot/src/helpers/emojis/createEmoji.ts:23](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/emojis/createEmoji.ts#L23)

---

### createForumThread

▸ **createForumThread**(`bot`, `channelId`, `options`): `Promise`<[`Channel`](discordeno_bot.Channel.md)\>

Creates a new thread in a forum channel, and sends a message within the created thread.

**`Remarks`**

Requires the `CREATE_MESSAGES` permission.

Fires a _Thread Create_ gateway event.
Fires a _Message Create_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/channel#start-thread-in-forum-channel](https://discord.com/developers/docs/resources/channel#start-thread-in-forum-channel)

#### Parameters

| Name        | Type                                                                         | Description                                              |
| :---------- | :--------------------------------------------------------------------------- | :------------------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                                               | The bot instance to use to make the request.             |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring)                        | The ID of the forum channel to create the thread within. |
| `options`   | [`CreateForumPostWithMessage`](discordeno_bot.CreateForumPostWithMessage.md) | The parameters for the creation of the thread.           |

#### Returns

`Promise`<[`Channel`](discordeno_bot.Channel.md)\>

An instance of [Channel](discordeno_bot.Channel.md) with a nested [Message](discordeno_bot.Message.md) object.

#### Inherited from

DefaultHelpers.createForumThread

#### Defined in

[packages/bot/src/helpers/channels/forums/createForumThread.ts:24](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/forums/createForumThread.ts#L24)

---

### createGlobalApplicationCommand

▸ **createGlobalApplicationCommand**(`bot`, `command`): `Promise`<[`ApplicationCommand`](discordeno_bot.ApplicationCommand.md)\>

Creates an application command accessible globally; across different guilds and channels.

**`Remarks`**

⚠️ Creating a command with the same name as an existing command for your application will overwrite the old command.
⚠️ Global commands once created are cached for periods of **an hour**, so changes made to existing commands will take an hour to surface.
⚠️ You can only create up to 200 _new_ commands daily.

**`See`**

[https://discord.com/developers/docs/interactions/application-commands#create-global-application-command](https://discord.com/developers/docs/interactions/application-commands#create-global-application-command)

#### Parameters

| Name      | Type                                                                                | Description                                  |
| :-------- | :---------------------------------------------------------------------------------- | :------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                                      | The bot instance to use to make the request. |
| `command` | [`CreateApplicationCommand`](../modules/discordeno_bot.md#createapplicationcommand) | The command to create.                       |

#### Returns

`Promise`<[`ApplicationCommand`](discordeno_bot.ApplicationCommand.md)\>

An instance of the created [ApplicationCommand](discordeno_bot.ApplicationCommand.md).

#### Inherited from

DefaultHelpers.createGlobalApplicationCommand

#### Defined in

[packages/bot/src/helpers/interactions/commands/createGlobalApplicationCommand.ts:19](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/interactions/commands/createGlobalApplicationCommand.ts#L19)

---

### createGuild

▸ **createGuild**(`bot`, `options`): `Promise`<[`Guild`](discordeno_bot.Guild.md)\>

Creates a guild.

**`Remarks`**

⚠️ This route can only be used by bots in **fewer than 10 guilds**.

Fires a _Guild Create_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/guild#create-guild](https://discord.com/developers/docs/resources/guild#create-guild)

#### Parameters

| Name      | Type                                           | Description                                   |
| :-------- | :--------------------------------------------- | :-------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                 | The bot instance to use to make the request.  |
| `options` | [`CreateGuild`](discordeno_bot.CreateGuild.md) | The parameters for the creation of the guild. |

#### Returns

`Promise`<[`Guild`](discordeno_bot.Guild.md)\>

An instance of the created [Guild](discordeno_bot.Guild.md).

#### Inherited from

DefaultHelpers.createGuild

#### Defined in

[packages/bot/src/helpers/guilds/createGuild.ts:25](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/createGuild.ts#L25)

---

### createGuildApplicationCommand

▸ **createGuildApplicationCommand**(`bot`, `command`, `guildId`): `Promise`<[`ApplicationCommand`](discordeno_bot.ApplicationCommand.md)\>

Creates an application command only accessible in a specific guild.

**`Remarks`**

⚠️ Creating a command with the same name as an existing command for your application will overwrite the old command.
⚠️ You can only create up to 200 _new_ commands daily.

**`See`**

[https://discord.com/developers/docs/interactions/application-commands#create-guild-application-command](https://discord.com/developers/docs/interactions/application-commands#create-guild-application-command)

#### Parameters

| Name      | Type                                                                                | Description                                    |
| :-------- | :---------------------------------------------------------------------------------- | :--------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                                      | The bot instance to use to make the request.   |
| `command` | [`CreateApplicationCommand`](../modules/discordeno_bot.md#createapplicationcommand) | The command to create.                         |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring)                               | The ID of the guild to create the command for. |

#### Returns

`Promise`<[`ApplicationCommand`](discordeno_bot.ApplicationCommand.md)\>

An instance of the created [ApplicationCommand](discordeno_bot.ApplicationCommand.md).

#### Inherited from

DefaultHelpers.createGuildApplicationCommand

#### Defined in

[packages/bot/src/helpers/interactions/commands/createGuildApplicationCommand.ts:18](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/interactions/commands/createGuildApplicationCommand.ts#L18)

---

### createGuildFromTemplate

▸ **createGuildFromTemplate**(`bot`, `templateCode`, `options`): `Promise`<[`Guild`](discordeno_bot.Guild.md)\>

Creates a guild from a template.

**`Remarks`**

⚠️ This route can only be used by bots in **fewer than 10 guilds**.

Fires a _Guild Create_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/guild-template#create-guild-from-guild-template](https://discord.com/developers/docs/resources/guild-template#create-guild-from-guild-template)

#### Parameters

| Name           | Type                                                                   | Description                                   |
| :------------- | :--------------------------------------------------------------------- | :-------------------------------------------- |
| `bot`          | [`Bot`](discordeno_bot.Bot.md)                                         | The bot instance to use to make the request.  |
| `templateCode` | `string`                                                               | The code of the template.                     |
| `options`      | [`CreateGuildFromTemplate`](discordeno_bot.CreateGuildFromTemplate.md) | The parameters for the creation of the guild. |

#### Returns

`Promise`<[`Guild`](discordeno_bot.Guild.md)\>

An instance of the created [Guild](discordeno_bot.Guild.md).

#### Inherited from

DefaultHelpers.createGuildFromTemplate

#### Defined in

[packages/bot/src/helpers/templates/createGuildFromTemplate.ts:20](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/templates/createGuildFromTemplate.ts#L20)

---

### createGuildSticker

▸ **createGuildSticker**(`bot`, `guildId`, `options`): `Promise`<[`Sticker`](discordeno_bot.Sticker.md)\>

Create a new sticker for the guild.

**`Remarks`**

Requires the `MANAGE_EMOJIS_AND_STICKERS` permission.
Fires a Guild Stickers Update Gateway event.
Every guilds has five free sticker slots by default, and each Boost level will grant access to more slots.
Lottie stickers can only be uploaded on guilds that have either the `VERIFIED` and/or the `PARTNERED` guild feature.

**`See`**

[https://discord.com/developers/docs/resources/sticker#create-guild-sticker](https://discord.com/developers/docs/resources/sticker#create-guild-sticker)

#### Parameters

| Name      | Type                                                                       | Description                                  |
| :-------- | :------------------------------------------------------------------------- | :------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                             | The bot instance to use to make the request. |
| `guildId` | `bigint`                                                                   | The ID of the guild to get                   |
| `options` | [`CreateGuildStickerOptions`](discordeno_bot.CreateGuildStickerOptions.md) | -                                            |

#### Returns

`Promise`<[`Sticker`](discordeno_bot.Sticker.md)\>

A [Sticker](discordeno_bot.Sticker.md)

#### Inherited from

DefaultHelpers.createGuildSticker

#### Defined in

[packages/bot/src/helpers/stickers/createGuildSticker.ts:20](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/stickers/createGuildSticker.ts#L20)

---

### createGuildTemplate

▸ **createGuildTemplate**(`bot`, `guildId`, `options`): `Promise`<[`Template`](discordeno_bot.Template.md)\>

Creates a template from a guild.

**`Remarks`**

Requires the `MANAGE_GUILD` permission.

Fires a _Guild Update_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/guild-template#create-guild-template](https://discord.com/developers/docs/resources/guild-template#create-guild-template)

#### Parameters

| Name      | Type                                                  | Description                                      |
| :-------- | :---------------------------------------------------- | :----------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.     |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild to create the template from. |
| `options` | [`CreateTemplate`](discordeno_bot.CreateTemplate.md)  | The parameters for the creation of the template. |

#### Returns

`Promise`<[`Template`](discordeno_bot.Template.md)\>

An instance of the created [Template](discordeno_bot.Template.md).

#### Inherited from

DefaultHelpers.createGuildTemplate

#### Defined in

[packages/bot/src/helpers/templates/createGuildTemplate.ts:20](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/templates/createGuildTemplate.ts#L20)

---

### createInvite

▸ **createInvite**(`bot`, `channelId`, `options?`): `Promise`<[`BaseInvite`](discordeno_bot.BaseInvite.md)\>

Creates an invite to a channel in a guild.

**`Remarks`**

Requires the `CREATE_INSTANT_INVITE` permission.

Fires an _Invite Create_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/channel#create-channel-invite](https://discord.com/developers/docs/resources/channel#create-channel-invite)

#### Parameters

| Name        | Type                                                           | Description                                    |
| :---------- | :------------------------------------------------------------- | :--------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                                 | The bot instance to use to make the request.   |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring)          | The ID of the channel to create the invite to. |
| `options`   | [`CreateChannelInvite`](discordeno_bot.CreateChannelInvite.md) | The parameters for the creation of the invite. |

#### Returns

`Promise`<[`BaseInvite`](discordeno_bot.BaseInvite.md)\>

An instance of the created [Invite](discordeno_bot.BaseInvite.md).

#### Inherited from

DefaultHelpers.createInvite

#### Defined in

[packages/bot/src/helpers/guilds/invites/createInvite.ts:24](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/invites/createInvite.ts#L24)

---

### createRole

▸ **createRole**(`bot`, `guildId`, `options`, `reason?`): `Promise`<[`Role`](discordeno_bot.Role.md)\>

Creates a role in a guild.

**`Remarks`**

Requires the `MANAGE_ROLES` permission.

Fires a _Guild Role Create_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/guild#create-guild-role](https://discord.com/developers/docs/resources/guild#create-guild-role)

#### Parameters

| Name      | Type                                                   | Description                                  |
| :-------- | :----------------------------------------------------- | :------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                         | The bot instance to use to make the request. |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring)  | The ID of the guild to create the role in.   |
| `options` | [`CreateGuildRole`](discordeno_bot.CreateGuildRole.md) | The parameters for the creation of the role. |
| `reason?` | `string`                                               | -                                            |

#### Returns

`Promise`<[`Role`](discordeno_bot.Role.md)\>

An instance of the created [Role](discordeno_bot.Role.md).

#### Inherited from

DefaultHelpers.createRole

#### Defined in

[packages/bot/src/helpers/roles/createRole.ts:20](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/roles/createRole.ts#L20)

---

### createScheduledEvent

▸ **createScheduledEvent**(`bot`, `guildId`, `options`): `Promise`<[`ScheduledEvent`](discordeno_bot.ScheduledEvent.md)\>

Creates a scheduled event in a guild.

**`Remarks`**

Requires the `MANAGE_EVENTS` permission.

A guild can only have a maximum of 100 events with a status of [Active](../enums/discordeno_bot.ScheduledEventStatus.md#active) or [Scheduled](../enums/discordeno_bot.ScheduledEventStatus.md#scheduled) (inclusive).

Fires a _Guild Scheduled Event Create_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/guild-scheduled-event#create-guild-scheduled-event](https://discord.com/developers/docs/resources/guild-scheduled-event#create-guild-scheduled-event)

#### Parameters

| Name      | Type                                                             | Description                                             |
| :-------- | :--------------------------------------------------------------- | :------------------------------------------------------ |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                   | The bot instance to use to make the request.            |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring)            | The ID of the guild to create the scheduled event in.   |
| `options` | [`CreateScheduledEvent`](discordeno_bot.CreateScheduledEvent.md) | The parameters for the creation of the scheduled event. |

#### Returns

`Promise`<[`ScheduledEvent`](discordeno_bot.ScheduledEvent.md)\>

An instance of the created [ScheduledEvent](discordeno_bot.ScheduledEvent.md).

#### Inherited from

DefaultHelpers.createScheduledEvent

#### Defined in

[packages/bot/src/helpers/guilds/events/createScheduledEvent.ts:23](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/events/createScheduledEvent.ts#L23)

---

### createStageInstance

▸ **createStageInstance**(`bot`, `options`): `Promise`<[`StageInstance`](discordeno_bot.StageInstance.md)\>

Creates a stage instance associated with a stage channel.

**`Remarks`**

Requires the user to be a moderator of the stage channel.

Fires a _Stage Instance Create_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/stage-instance#create-stage-instance](https://discord.com/developers/docs/resources/stage-instance#create-stage-instance)

#### Parameters

| Name      | Type                                                           | Description                                            |
| :-------- | :------------------------------------------------------------- | :----------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                 | The bot instance to use to make the request.           |
| `options` | [`CreateStageInstance`](discordeno_bot.CreateStageInstance.md) | The parameters for the creation of the stage instance. |

#### Returns

`Promise`<[`StageInstance`](discordeno_bot.StageInstance.md)\>

An instance of the created [StageInstance](discordeno_bot.StageInstance.md).

#### Inherited from

DefaultHelpers.createStageInstance

#### Defined in

[packages/bot/src/helpers/channels/stages/createStageInstance.ts:20](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/stages/createStageInstance.ts#L20)

---

### createWebhook

▸ **createWebhook**(`bot`, `channelId`, `options`): `Promise`<[`Webhook`](discordeno_bot.Webhook.md)\>

Creates a webhook.

**`Remarks`**

Requires the `MANAGE_WEBHOOKS` permission.

⚠️ The webhook name must not contain the string 'clyde' (case-insensitive).

Fires a _Webhooks Update_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/webhook#create-webhook](https://discord.com/developers/docs/resources/webhook#create-webhook)

#### Parameters

| Name        | Type                                                  | Description                                     |
| :---------- | :---------------------------------------------------- | :---------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.    |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the channel to create the webhook in. |
| `options`   | [`CreateWebhook`](discordeno_bot.CreateWebhook.md)    | The parameters for the creation of the webhook. |

#### Returns

`Promise`<[`Webhook`](discordeno_bot.Webhook.md)\>

An instance of the created [Webhook](discordeno_bot.Webhook.md).

#### Inherited from

DefaultHelpers.createWebhook

#### Defined in

[packages/bot/src/helpers/webhooks/createWebhook.ts:23](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/webhooks/createWebhook.ts#L23)

---

### crosspostMessage

▸ **crosspostMessage**(`bot`, `channelId`, `messageId`): `Promise`<[`Message`](discordeno_bot.Message.md)\>

Cross-posts a message posted in an announcement channel to subscribed channels.

**`Remarks`**

Requires the `SEND_MESSAGES` permission.

If not cross-posting own message:

- Requires the `MANAGE_MESSAGES` permission.

Fires a _Message Create_ event in the guilds the subscribed channels are in.

**`See`**

[https://discord.com/developers/docs/resources/channel#crosspost-message](https://discord.com/developers/docs/resources/channel#crosspost-message)

#### Parameters

| Name        | Type                                                  | Description                                  |
| :---------- | :---------------------------------------------------- | :------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request. |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the announcement channel.          |
| `messageId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the message to cross-post.         |

#### Returns

`Promise`<[`Message`](discordeno_bot.Message.md)\>

An instance of the cross-posted [Message](discordeno_bot.Message.md).

#### Inherited from

DefaultHelpers.crosspostMessage

#### Defined in

[packages/bot/src/helpers/messages/crosspostMessage.ts:25](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/crosspostMessage.ts#L25)

---

### deleteAutomodRule

▸ **deleteAutomodRule**(`bot`, `guildId`, `ruleId`, `reason?`): `Promise`<`void`\>

Deletes an automod rule.

**`Remarks`**

Requires the `MANAGE_GUILD` permission.

Fires an _Auto Moderation Rule Delete_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/auto-moderation#delete-auto-moderation-rule](https://discord.com/developers/docs/resources/auto-moderation#delete-auto-moderation-rule)

#### Parameters

| Name      | Type                                                  | Description                                  |
| :-------- | :---------------------------------------------------- | :------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request. |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild to delete the rule from. |
| `ruleId`  | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the automod rule to delete.        |
| `reason?` | `string`                                              | -                                            |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.deleteAutomodRule

#### Defined in

[packages/bot/src/helpers/guilds/automod/deleteAutomodRule.ts:18](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/automod/deleteAutomodRule.ts#L18)

---

### deleteChannel

▸ **deleteChannel**(`bot`, `channelId`, `reason?`): `Promise`<`void`\>

Deletes a channel from within a guild.

**`Remarks`**

For community guilds, the _Rules_, _Guidelines_ and _Community Update_ channels cannot be deleted.

If the channel is a thread:

- Requires the `MANAGE_THREADS` permission.

- Fires a _Thread Delete_ gateway event.

Otherwise:

- Requires the `MANAGE_CHANNELS` permission.

- ⚠️ Deleting a category channel does not delete its child channels.
  Instead, they will have their `parent_id` property removed, and a `Channel Update` gateway event will fire for each of them.

- Fires a _Channel Delete_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/channel#deleteclose-channel](https://discord.com/developers/docs/resources/channel#deleteclose-channel)

#### Parameters

| Name        | Type                                                  | Description                                  |
| :---------- | :---------------------------------------------------- | :------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request. |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the channel to delete.             |
| `reason?`   | `string`                                              | -                                            |

#### Returns

`Promise`<`void`\>

An instance of the deleted [Channel](discordeno_bot.Channel.md).

#### Inherited from

DefaultHelpers.deleteChannel

#### Defined in

[packages/bot/src/helpers/channels/deleteChannel.ts:29](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/deleteChannel.ts#L29)

---

### deleteChannelPermissionOverride

▸ **deleteChannelPermissionOverride**(`bot`, `channelId`, `overwriteId`, `reason?`): `Promise`<`void`\>

Deletes a permission override for a user or role in a channel.

**`Remarks`**

Requires the `MANAGE_ROLES` permission.

Fires a _Channel Update_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/channel#delete-channel-permission](https://discord.com/developers/docs/resources/channel#delete-channel-permission)

#### Parameters

| Name          | Type                                                  | Description                                                 |
| :------------ | :---------------------------------------------------- | :---------------------------------------------------------- |
| `bot`         | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.                |
| `channelId`   | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the channel to delete the permission override of. |
| `overwriteId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the permission override to delete.                |
| `reason?`     | `string`                                              | -                                                           |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.deleteChannelPermissionOverride

#### Defined in

[packages/bot/src/helpers/channels/deleteChannelPermissionOverride.ts:18](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/deleteChannelPermissionOverride.ts#L18)

---

### deleteEmoji

▸ **deleteEmoji**(`bot`, `guildId`, `id`, `reason?`): `Promise`<`void`\>

Deletes an emoji from a guild.

**`Remarks`**

Requires the `MANAGE_EMOJIS_AND_STICKERS` permission.

Fires a _Guild Emojis Update_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/emoji#delete-guild-emoji](https://discord.com/developers/docs/resources/emoji#delete-guild-emoji)

#### Parameters

| Name      | Type                                                  | Description                                         |
| :-------- | :---------------------------------------------------- | :-------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.        |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild from which to delete the emoji. |
| `id`      | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the emoji to delete.                      |
| `reason?` | `string`                                              | -                                                   |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.deleteEmoji

#### Defined in

[packages/bot/src/helpers/emojis/deleteEmoji.ts:18](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/emojis/deleteEmoji.ts#L18)

---

### deleteFollowupMessage

▸ **deleteFollowupMessage**(`bot`, `token`, `messageId`): `Promise`<`void`\>

Deletes a follow-up message to an interaction.

**`Remarks`**

Unlike `deleteMessage()`, this endpoint allows the bot user to act without needing to see the channel the message is in.

Fires a _Message Delete_ event.

**`See`**

[https://discord.com/developers/docs/interactions/receiving-and-responding#delete-followup-message](https://discord.com/developers/docs/interactions/receiving-and-responding#delete-followup-message)

#### Parameters

| Name        | Type                                                  | Description                                                         |
| :---------- | :---------------------------------------------------- | :------------------------------------------------------------------ |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.                        |
| `token`     | `string`                                              | The interaction token to use, provided in the original interaction. |
| `messageId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the message to delete.                                    |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.deleteFollowupMessage

#### Defined in

[packages/bot/src/helpers/interactions/responses/deleteFollowupMessage.ts:18](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/interactions/responses/deleteFollowupMessage.ts#L18)

---

### deleteGlobalApplicationCommand

▸ **deleteGlobalApplicationCommand**(`bot`, `commandId`): `Promise`<`void`\>

Deletes an application command registered globally.

**`See`**

[https://discord.com/developers/docs/interactions/application-commands#delete-global-application-command](https://discord.com/developers/docs/interactions/application-commands#delete-global-application-command)

#### Parameters

| Name        | Type                                                  | Description                                  |
| :---------- | :---------------------------------------------------- | :------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request. |
| `commandId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the command to delete.             |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.deleteGlobalApplicationCommand

#### Defined in

[packages/bot/src/helpers/interactions/commands/deleteGlobalApplicationCommand.ts:12](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/interactions/commands/deleteGlobalApplicationCommand.ts#L12)

---

### deleteGuild

▸ **deleteGuild**(`bot`, `guildId`): `Promise`<`void`\>

Deletes a guild.

**`Remarks`**

The bot user must be the owner of the guild.

Fires a _Guild Delete_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/guild#delete-guild](https://discord.com/developers/docs/resources/guild#delete-guild)

#### Parameters

| Name      | Type                                                  | Description                                  |
| :-------- | :---------------------------------------------------- | :------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request. |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild to delete.               |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.deleteGuild

#### Defined in

[packages/bot/src/helpers/guilds/deleteGuild.ts:17](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/deleteGuild.ts#L17)

---

### deleteGuildApplicationCommand

▸ **deleteGuildApplicationCommand**(`bot`, `commandId`, `guildId`): `Promise`<`void`\>

Deletes an application command registered in a guild.

**`See`**

[https://discord.com/developers/docs/interactions/application-commands#delete-guild-application-command](https://discord.com/developers/docs/interactions/application-commands#delete-guild-application-command)

#### Parameters

| Name        | Type                                                  | Description                                     |
| :---------- | :---------------------------------------------------- | :---------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.    |
| `commandId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the command to delete from the guild. |
| `guildId`   | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild to delete the command from. |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.deleteGuildApplicationCommand

#### Defined in

[packages/bot/src/helpers/interactions/commands/deleteGuildApplicationCommand.ts:15](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/interactions/commands/deleteGuildApplicationCommand.ts#L15)

---

### deleteGuildSticker

▸ **deleteGuildSticker**(`bot`, `guildId`, `stickerId`, `reason?`): `Promise`<`void`\>

Delete a new sticker for the guild.

**`Remarks`**

Requires the `MANAGE_EMOJIS_AND_STICKERS` permission.
Fires a Guild Stickers Update Gateway event.
Every guilds has five free sticker slots by default, and each Boost level will grant access to more slots.
Lottie stickers can only be uploaded on guilds that have either the `VERIFIED` and/or the `PARTNERED` guild feature.

**`See`**

[https://discord.com/developers/docs/resources/sticker#delete-guild-sticker](https://discord.com/developers/docs/resources/sticker#delete-guild-sticker)

#### Parameters

| Name        | Type                           | Description                                  |
| :---------- | :----------------------------- | :------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md) | The bot instance to use to make the request. |
| `guildId`   | `bigint`                       | The ID of the guild to get                   |
| `stickerId` | `bigint`                       | -                                            |
| `reason?`   | `string`                       | -                                            |

#### Returns

`Promise`<`void`\>

A [Sticker](discordeno_bot.Sticker.md)

#### Inherited from

DefaultHelpers.deleteGuildSticker

#### Defined in

[packages/bot/src/helpers/stickers/deleteGuildSticker.ts:19](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/stickers/deleteGuildSticker.ts#L19)

---

### deleteGuildTemplate

▸ **deleteGuildTemplate**(`bot`, `guildId`, `templateCode`): `Promise`<`void`\>

Deletes a template from a guild.

**`Remarks`**

Requires the `MANAGE_GUILD` permission.

Fires a _Guild Update_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/guild-template#delete-guild-template](https://discord.com/developers/docs/resources/guild-template#delete-guild-template)

#### Parameters

| Name           | Type                                                  | Description                                      |
| :------------- | :---------------------------------------------------- | :----------------------------------------------- |
| `bot`          | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.     |
| `guildId`      | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild to delete the template from. |
| `templateCode` | `string`                                              | The code of the template to delete.              |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.deleteGuildTemplate

#### Defined in

[packages/bot/src/helpers/templates/deleteGuildTemplate.ts:18](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/templates/deleteGuildTemplate.ts#L18)

---

### deleteIntegration

▸ **deleteIntegration**(`bot`, `guildId`, `integrationId`): `Promise`<`void`\>

Deletes an integration attached to a guild.

**`Remarks`**

Requires the `MANAGE_GUILD` permission.

Deletes all webhooks associated with the integration, and kicks the associated bot if there is one.

Fires a _Guild Integrations Update_ gateway event.
Fires a _Integration Delete_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/guild#delete-guild-integration](https://discord.com/developers/docs/resources/guild#delete-guild-integration)

#### Parameters

| Name            | Type                                                  | Description                                               |
| :-------------- | :---------------------------------------------------- | :-------------------------------------------------------- |
| `bot`           | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.              |
| `guildId`       | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild from which to delete the integration. |
| `integrationId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the integration to delete from the guild.       |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.deleteIntegration

#### Defined in

[packages/bot/src/helpers/guilds/integrations/deleteIntegration.ts:21](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/integrations/deleteIntegration.ts#L21)

---

### deleteInvite

▸ **deleteInvite**(`bot`, `inviteCode`, `reason?`): `Promise`<`void`\>

Deletes an invite to a channel.

**`Remarks`**

Requires the `MANAGE_CHANNELS` permission.

Fires an _Invite Delete_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/channel#delete-channel-invite](https://discord.com/developers/docs/resources/channel#delete-channel-invite)

#### Parameters

| Name         | Type                           | Description                                  |
| :----------- | :----------------------------- | :------------------------------------------- |
| `bot`        | [`Bot`](discordeno_bot.Bot.md) | The bot instance to use to make the request. |
| `inviteCode` | `string`                       | The invite code of the invite to delete.     |
| `reason?`    | `string`                       | -                                            |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.deleteInvite

#### Defined in

[packages/bot/src/helpers/guilds/invites/deleteInvite.ts:16](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/invites/deleteInvite.ts#L16)

---

### deleteMessage

▸ **deleteMessage**(`bot`, `channelId`, `messageId`, `reason?`, `delayMilliseconds?`): `Promise`<`void`\>

Deletes a message from a channel.

**`Remarks`**

If not deleting own message:

- Requires the `MANAGE_MESSAGES` permission.

Fires a _Message Delete_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/channel#delete-message](https://discord.com/developers/docs/resources/channel#delete-message)

#### Parameters

| Name                | Type                                                  | Default value | Description                                       |
| :------------------ | :---------------------------------------------------- | :------------ | :------------------------------------------------ |
| `bot`               | [`Bot`](discordeno_bot.Bot.md)                        | `undefined`   | The bot instance to use to make the request.      |
| `channelId`         | [`BigString`](../modules/discordeno_bot.md#bigstring) | `undefined`   | The ID of the channel to delete the message from. |
| `messageId`         | [`BigString`](../modules/discordeno_bot.md#bigstring) | `undefined`   | The ID of the message to delete from the channel. |
| `reason?`           | `string`                                              | `undefined`   | -                                                 |
| `delayMilliseconds` | `number`                                              | `0`           | -                                                 |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.deleteMessage

#### Defined in

[packages/bot/src/helpers/messages/deleteMessage.ts:21](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/deleteMessage.ts#L21)

---

### deleteMessages

▸ **deleteMessages**(`bot`, `channelId`, `messageIds`, `reason?`): `Promise`<`void`\>

Deletes multiple messages from a channel.

**`Remarks`**

Requires the `MANAGE_MESSAGES` permission.

⚠️ Messages older than 2 weeks old cannot be deleted.

Fires a _Message Delete Bulk_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/channel#bulk-delete-messages](https://discord.com/developers/docs/resources/channel#bulk-delete-messages)

#### Parameters

| Name         | Type                                                    | Description                                         |
| :----------- | :------------------------------------------------------ | :-------------------------------------------------- |
| `bot`        | [`Bot`](discordeno_bot.Bot.md)                          | The bot instance to use to make the request.        |
| `channelId`  | [`BigString`](../modules/discordeno_bot.md#bigstring)   | The ID of the channel to delete the messages from.  |
| `messageIds` | [`BigString`](../modules/discordeno_bot.md#bigstring)[] | The IDs of the messages to delete from the channel. |
| `reason?`    | `string`                                                | -                                                   |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.deleteMessages

#### Defined in

[packages/bot/src/helpers/messages/deleteMessages.ts:20](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/deleteMessages.ts#L20)

---

### deleteOriginalInteractionResponse

▸ **deleteOriginalInteractionResponse**(`bot`, `token`): `Promise`<`void`\>

Deletes the initial message response to an interaction.

**`Remarks`**

Unlike `deleteMessage()`, this endpoint allows the bot user to act without needing to see the channel the message is in.

Fires a _Message Delete_ event.

**`See`**

[https://discord.com/developers/docs/interactions/receiving-and-responding#delete-original-interaction-response](https://discord.com/developers/docs/interactions/receiving-and-responding#delete-original-interaction-response)

#### Parameters

| Name    | Type                           | Description                                                         |
| :------ | :----------------------------- | :------------------------------------------------------------------ |
| `bot`   | [`Bot`](discordeno_bot.Bot.md) | The bot instance to use to make the request.                        |
| `token` | `string`                       | The interaction token to use, provided in the original interaction. |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.deleteOriginalInteractionResponse

#### Defined in

[packages/bot/src/helpers/interactions/responses/deleteOriginalInteractionResponse.ts:16](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/interactions/responses/deleteOriginalInteractionResponse.ts#L16)

---

### deleteOwnReaction

▸ **deleteOwnReaction**(`bot`, `channelId`, `messageId`, `reaction`): `Promise`<`void`\>

Deletes a reaction added by the bot user from a message.

**`Remarks`**

Requires the `READ_MESSAGE_HISTORY` permission.

Fires a _Message Reaction Remove_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/channel#delete-own-reaction](https://discord.com/developers/docs/resources/channel#delete-own-reaction)

#### Parameters

| Name        | Type                                                  | Description                                                          |
| :---------- | :---------------------------------------------------- | :------------------------------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.                         |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the channel the message to delete the reaction from is in. |
| `messageId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the message to delete the reaction from.                   |
| `reaction`  | `string`                                              | The reaction to delete from the message.                             |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.deleteOwnReaction

#### Defined in

[packages/bot/src/helpers/messages/reactions/deleteReaction.ts:22](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/reactions/deleteReaction.ts#L22)

---

### deleteReactionsAll

▸ **deleteReactionsAll**(`bot`, `channelId`, `messageId`): `Promise`<`void`\>

Deletes all reactions for all emojis from a message.

**`Remarks`**

Requires the `READ_MESSAGE_HISTORY` permission.

Requires the `MANAGE_MESSAGES` permission.

Fires a _Message Reaction Remove All_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/channel#delete-all-reactions](https://discord.com/developers/docs/resources/channel#delete-all-reactions)

#### Parameters

| Name        | Type                                                  | Description                                                           |
| :---------- | :---------------------------------------------------- | :-------------------------------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.                          |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the channel the message to delete the reactions from is in. |
| `messageId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the message to delete the reactions from.                   |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.deleteReactionsAll

#### Defined in

[packages/bot/src/helpers/messages/reactions/deleteReactionsAll.ts:20](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/reactions/deleteReactionsAll.ts#L20)

---

### deleteReactionsEmoji

▸ **deleteReactionsEmoji**(`bot`, `channelId`, `messageId`, `reaction`): `Promise`<`void`\>

Deletes all reactions for an emoji from a message.

**`Remarks`**

Requires the `READ_MESSAGE_HISTORY` permission.

Requires the `MANAGE_MESSAGES` permission.

Fires a _Message Reaction Remove Emoji_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/channel#delete-all-reactions-for-emoji](https://discord.com/developers/docs/resources/channel#delete-all-reactions-for-emoji)

#### Parameters

| Name        | Type                                                  | Description                                                           |
| :---------- | :---------------------------------------------------- | :-------------------------------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.                          |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the channel the message to delete the reactions from is in. |
| `messageId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the message to delete the reactions from.                   |
| `reaction`  | `string`                                              | The reaction to remove from the message.                              |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.deleteReactionsEmoji

#### Defined in

[packages/bot/src/helpers/messages/reactions/deleteReactionsEmoji.ts:22](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/reactions/deleteReactionsEmoji.ts#L22)

---

### deleteRole

▸ **deleteRole**(`bot`, `guildId`, `roleId`): `Promise`<`void`\>

Deletes a role from a guild.

**`Remarks`**

Requires the `MANAGE_ROLES` permission.

Fires a _Guild Role Delete_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/guild#delete-guild-role](https://discord.com/developers/docs/resources/guild#delete-guild-role)

#### Parameters

| Name      | Type                                                  | Description                                  |
| :-------- | :---------------------------------------------------- | :------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request. |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild to delete the role from. |
| `roleId`  | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the role to delete.                |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.deleteRole

#### Defined in

[packages/bot/src/helpers/roles/deleteRole.ts:18](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/roles/deleteRole.ts#L18)

---

### deleteScheduledEvent

▸ **deleteScheduledEvent**(`bot`, `guildId`, `eventId`): `Promise`<`void`\>

Deletes a scheduled event from a guild.

**`Remarks`**

Requires the `MANAGE_EVENTS` permission.

Fires a _Guild Scheduled Event Delete_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/guild-scheduled-event#delete-guild-scheduled-event](https://discord.com/developers/docs/resources/guild-scheduled-event#delete-guild-scheduled-event)

#### Parameters

| Name      | Type                                                  | Description                                             |
| :-------- | :---------------------------------------------------- | :------------------------------------------------------ |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.            |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild to delete the scheduled event from. |
| `eventId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the scheduled event to delete.                |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.deleteScheduledEvent

#### Defined in

[packages/bot/src/helpers/guilds/events/deleteScheduledEvent.ts:18](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/events/deleteScheduledEvent.ts#L18)

---

### deleteStageInstance

▸ **deleteStageInstance**(`bot`, `channelId`, `reason?`): `Promise`<`void`\>

Deletes the stage instance associated with a stage channel, if one exists.

**`Remarks`**

Requires the user to be a moderator of the stage channel.

Fires a _Stage Instance Delete_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/stage-instance#delete-stage-instance](https://discord.com/developers/docs/resources/stage-instance#delete-stage-instance)

#### Parameters

| Name        | Type                                                  | Description                                                        |
| :---------- | :---------------------------------------------------- | :----------------------------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.                       |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the stage channel the stage instance is associated with. |
| `reason?`   | `string`                                              | -                                                                  |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.deleteStageInstance

#### Defined in

[packages/bot/src/helpers/channels/stages/deleteStageInstance.ts:17](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/stages/deleteStageInstance.ts#L17)

---

### deleteUserReaction

▸ **deleteUserReaction**(`bot`, `channelId`, `messageId`, `userId`, `reaction`): `Promise`<`void`\>

Deletes a user's reaction from a message.

**`Remarks`**

Requires the `READ_MESSAGE_HISTORY` permission.

Requires the `MANAGE_MESSAGES` permission.

Fires a _Message Reaction Remove_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/channel#delete-user-reaction](https://discord.com/developers/docs/resources/channel#delete-user-reaction)

#### Parameters

| Name        | Type                                                  | Description                                                          |
| :---------- | :---------------------------------------------------- | :------------------------------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.                         |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the channel the message to delete the reaction from is in. |
| `messageId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the message to delete the reaction from.                   |
| `userId`    | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the user whose reaction to delete.                         |
| `reaction`  | `string`                                              | The reaction to delete from the message.                             |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.deleteUserReaction

#### Defined in

[packages/bot/src/helpers/messages/reactions/deleteReaction.ts:55](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/reactions/deleteReaction.ts#L55)

---

### deleteWebhook

▸ **deleteWebhook**(`bot`, `webhookId`, `reason?`): `Promise`<`void`\>

Deletes a webhook.

**`Remarks`**

Requires the `MANAGE_WEBHOOKS` permission.

Fires a _Webhooks Update_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/webhook#delete-webhook](https://discord.com/developers/docs/resources/webhook#delete-webhook)

#### Parameters

| Name        | Type                                                  | Description                                  |
| :---------- | :---------------------------------------------------- | :------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request. |
| `webhookId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the webhook to delete.             |
| `reason?`   | `string`                                              | -                                            |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.deleteWebhook

#### Defined in

[packages/bot/src/helpers/webhooks/deleteWebhook.ts:17](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/webhooks/deleteWebhook.ts#L17)

---

### deleteWebhookMessage

▸ **deleteWebhookMessage**(`bot`, `webhookId`, `token`, `messageId`, `options?`): `Promise`<`void`\>

Deletes a webhook message.

**`Remarks`**

Fires a _Message Delete_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/webhook#delete-webhook](https://discord.com/developers/docs/resources/webhook#delete-webhook)

#### Parameters

| Name        | Type                                                                           | Description                                               |
| :---------- | :----------------------------------------------------------------------------- | :-------------------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                                                 | The bot instance to use to make the request.              |
| `webhookId` | [`BigString`](../modules/discordeno_bot.md#bigstring)                          | The ID of the webhook to delete the message belonging to. |
| `token`     | `string`                                                                       | The webhook token, used to manage the webhook.            |
| `messageId` | [`BigString`](../modules/discordeno_bot.md#bigstring)                          | The ID of the message to delete.                          |
| `options?`  | [`DeleteWebhookMessageOptions`](discordeno_bot.DeleteWebhookMessageOptions.md) | The parameters for the deletion of the message.           |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.deleteWebhookMessage

#### Defined in

[packages/bot/src/helpers/webhooks/deleteWebhookMessage.ts:18](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/webhooks/deleteWebhookMessage.ts#L18)

---

### deleteWebhookWithToken

▸ **deleteWebhookWithToken**(`bot`, `webhookId`, `token`): `Promise`<`void`\>

Deletes a webhook message using the webhook token, thereby bypassing the need for authentication + permissions.

**`Remarks`**

Fires a _Message Delete_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/webhook#delete-webhook-with-token](https://discord.com/developers/docs/resources/webhook#delete-webhook-with-token)

#### Parameters

| Name        | Type                                                  | Description                                               |
| :---------- | :---------------------------------------------------- | :-------------------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.              |
| `webhookId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the webhook to delete the message belonging to. |
| `token`     | `string`                                              | The webhook token, used to delete the webhook.            |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.deleteWebhookWithToken

#### Defined in

[packages/bot/src/helpers/webhooks/deleteWebhookWithToken.ts:16](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/webhooks/deleteWebhookWithToken.ts#L16)

---

### editApplicationCommandPermissions

▸ **editApplicationCommandPermissions**(`bot`, `guildId`, `commandId`, `bearerToken`, `options`): `Promise`<[`ApplicationCommandPermission`](discordeno_bot.ApplicationCommandPermission.md)\>

Edits the permissions for a guild application command.

**`Remarks`**

The bearer token requires the `applications.commands.permissions.update` scope to be enabled, and to have access to the guild whose ID has been provided in the parameters.

**`See`**

[https://discord.com/developers/docs/interactions/application-commands#edit-application-command-permissions](https://discord.com/developers/docs/interactions/application-commands#edit-application-command-permissions)

#### Parameters

| Name          | Type                                                                                 | Description                                             |
| :------------ | :----------------------------------------------------------------------------------- | :------------------------------------------------------ |
| `bot`         | [`Bot`](discordeno_bot.Bot.md)                                                       | The bot instance to use to make the request.            |
| `guildId`     | [`BigString`](../modules/discordeno_bot.md#bigstring)                                | The ID of the guild the command is registered in.       |
| `commandId`   | [`BigString`](../modules/discordeno_bot.md#bigstring)                                | The ID of the command to edit the permissions of.       |
| `bearerToken` | `string`                                                                             | The bearer token to use to make the request.            |
| `options`     | [`ApplicationCommandPermissions`](discordeno_bot.ApplicationCommandPermissions.md)[] | The parameters for the edit of the command permissions. |

#### Returns

`Promise`<[`ApplicationCommandPermission`](discordeno_bot.ApplicationCommandPermission.md)\>

An instance of the edited [ApplicationCommandPermission](discordeno_bot.ApplicationCommandPermission.md).

#### Inherited from

DefaultHelpers.editApplicationCommandPermissions

#### Defined in

[packages/bot/src/helpers/interactions/commands/editApplicationCommandPermissions.ts:22](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/interactions/commands/editApplicationCommandPermissions.ts#L22)

---

### editAutomodRule

▸ **editAutomodRule**(`bot`, `guildId`, `ruleId`, `options`): `Promise`<[`AutoModerationRule`](discordeno_bot.AutoModerationRule.md)\>

Edits an automod rule.

**`Remarks`**

Requires the `MANAGE_GUILD` permission.

Fires an _Auto Moderation Rule Update_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/auto-moderation#modify-auto-moderation-rule](https://discord.com/developers/docs/resources/auto-moderation#modify-auto-moderation-rule)

#### Parameters

| Name      | Type                                                                                           | Description                                  |
| :-------- | :--------------------------------------------------------------------------------------------- | :------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                                                 | The bot instance to use to make the request. |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring)                                          | The ID of the guild to edit the rule in.     |
| `ruleId`  | [`BigString`](../modules/discordeno_bot.md#bigstring)                                          | The ID of the rule to edit.                  |
| `options` | `Partial`<[`EditAutoModerationRuleOptions`](discordeno_bot.EditAutoModerationRuleOptions.md)\> | The parameters for the edit of the rule.     |

#### Returns

`Promise`<[`AutoModerationRule`](discordeno_bot.AutoModerationRule.md)\>

An instance of the edited [AutoModerationRule](discordeno_bot.AutoModerationRule.md).

#### Inherited from

DefaultHelpers.editAutomodRule

#### Defined in

[packages/bot/src/helpers/guilds/automod/editAutomodRule.ts:27](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/automod/editAutomodRule.ts#L27)

---

### editBotMember

▸ **editBotMember**(`bot`, `guildId`, `options`): `Promise`<[`Member`](discordeno_bot.Member.md)\>

Edits the nickname of the bot user.

**`Remarks`**

Fires a _Guild Member Update_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/guild#modify-current-member](https://discord.com/developers/docs/resources/guild#modify-current-member)

#### Parameters

| Name      | Type                                                             | Description                                                  |
| :-------- | :--------------------------------------------------------------- | :----------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                   | The bot instance to use to make the request.                 |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring)            | The ID of the guild to edit the nickname of the bot user in. |
| `options` | [`EditBotMemberOptions`](discordeno_bot.EditBotMemberOptions.md) | The parameters for the edit of the nickname.                 |

#### Returns

`Promise`<[`Member`](discordeno_bot.Member.md)\>

An instance of the edited [Member](discordeno_bot.Member.md)

#### Inherited from

DefaultHelpers.editBotMember

#### Defined in

[packages/bot/src/helpers/members/editBotMember.ts:17](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/members/editBotMember.ts#L17)

---

### editBotProfile

▸ **editBotProfile**(`bot`, `options`): `Promise`<[`User`](discordeno_bot.User.md)\>

Modifies the bot's username or avatar.
NOTE: username: if changed may cause the bot's discriminator to be randomized.

#### Parameters

| Name                    | Type                           |
| :---------------------- | :----------------------------- |
| `bot`                   | [`Bot`](discordeno_bot.Bot.md) |
| `options`               | `Object`                       |
| `options.botAvatarURL?` | `null` \| `string`             |
| `options.username?`     | `string`                       |

#### Returns

`Promise`<[`User`](discordeno_bot.User.md)\>

#### Inherited from

DefaultHelpers.editBotProfile

#### Defined in

[packages/bot/src/helpers/misc/editBotProfile.ts:9](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/misc/editBotProfile.ts#L9)

---

### editBotStatus

▸ **editBotStatus**(`bot`, `data`): `Promise`<`void`\>

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                   |
| `data` | [`StatusUpdate`](discordeno_bot.StatusUpdate.md) |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.editBotStatus

#### Defined in

[packages/bot/src/helpers/misc/editBotStatus.ts:4](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/misc/editBotStatus.ts#L4)

---

### editChannel

▸ **editChannel**(`bot`, `channelId`, `options`): `Promise`<[`Channel`](discordeno_bot.Channel.md)\>

Edits a channel's settings.

**`Remarks`**

If editing a channel of type [GroupDm](../enums/discordeno_bot.ChannelTypes.md#groupdm):

- Fires a _Channel Update_ gateway event.

If editing a thread channel:

- Requires the `MANAGE_THREADS` permission **unless** if setting the `archived` property to `false` when the `locked` property is also `false`, in which case only the `SEND_MESSAGES` permission is required.

- Fires a _Thread Update_ gateway event.

If editing a guild channel:

- Requires the `MANAGE_CHANNELS` permission.

- If modifying permission overrides:

  - Requires the `MANAGE_ROLES` permission.

  - Only permissions the bot user has in the guild or parent channel can be allowed/denied **unless** the bot user has a `MANAGE_ROLES` permission override in the channel.

- If modifying a channel of type [GuildCategory](../enums/discordeno_bot.ChannelTypes.md#guildcategory):
  - Fires a _Channel Update_ gateway event for each child channel impacted in this change.
- Otherwise:
  - Fires a _Channel Update_ gateway event.

#### Parameters

| Name        | Type                                                  | Description                                  |
| :---------- | :---------------------------------------------------- | :------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request. |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the channel to edit.               |
| `options`   | [`ModifyChannel`](discordeno_bot.ModifyChannel.md)    | The parameters for the edit of the channel.  |

#### Returns

`Promise`<[`Channel`](discordeno_bot.Channel.md)\>

An instance of the edited [Channel](discordeno_bot.Channel.md).

#### Inherited from

DefaultHelpers.editChannel

#### Defined in

[packages/bot/src/helpers/channels/editChannel.ts:36](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/editChannel.ts#L36)

---

### editChannelPermissionOverrides

▸ **editChannelPermissionOverrides**(`bot`, `channelId`, `options`): `Promise`<`void`\>

Edits the permission overrides for a user or role in a channel.

**`Remarks`**

Requires the `MANAGE_ROLES` permission.

Only permissions the bot user has in the guild or parent channel can be allowed/denied **unless** the bot user has a `MANAGE_ROLES` permission override in the channel.

Fires a _Channel Update_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/channel#edit-channel-permissions](https://discord.com/developers/docs/resources/channel#edit-channel-permissions)

#### Parameters

| Name        | Type                                                                                               | Description                                                |
| :---------- | :------------------------------------------------------------------------------------------------- | :--------------------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                                                                     | The bot instance to use to make the request.               |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring)                                              | The ID of the channel to edit the permission overrides of. |
| `options`   | [`EditChannelPermissionOverridesOptions`](discordeno_bot.EditChannelPermissionOverridesOptions.md) | The permission override.                                   |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.editChannelPermissionOverrides

#### Defined in

[packages/bot/src/helpers/channels/editChannelPermissionOverrides.ts:21](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/editChannelPermissionOverrides.ts#L21)

---

### editChannelPositions

▸ **editChannelPositions**(`bot`, `guildId`, `channelPositions`): `Promise`<`void`\>

Edits the positions of a set of channels in a guild.

**`Remarks`**

Requires the `MANAGE_CHANNELS` permission.

Fires a _Channel Update_ gateway event for every channel impacted in this change.

**`See`**

[https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions](https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions)

#### Parameters

| Name               | Type                                                                             | Description                                                         |
| :----------------- | :------------------------------------------------------------------------------- | :------------------------------------------------------------------ |
| `bot`              | [`Bot`](discordeno_bot.Bot.md)                                                   | The bot instance to use to make the request.                        |
| `guildId`          | [`BigString`](../modules/discordeno_bot.md#bigstring)                            | The ID of the guild in which to edit the positions of the channels. |
| `channelPositions` | [`ModifyGuildChannelPositions`](discordeno_bot.ModifyGuildChannelPositions.md)[] | A set of objects defining the updated positions of the channels.    |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.editChannelPositions

#### Defined in

[packages/bot/src/helpers/channels/editChannelPositions.ts:20](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/editChannelPositions.ts#L20)

---

### editEmoji

▸ **editEmoji**(`bot`, `guildId`, `id`, `options`): `Promise`<[`Emoji`](discordeno_bot.Emoji.md)\>

Edits an emoji.

**`Remarks`**

Requires the `MANAGE_EMOJIS_AND_STICKERS` permission.

Fires a `Guild Emojis Update` gateway event.

**`See`**

[https://discord.com/developers/docs/resources/emoji#modify-guild-emoji](https://discord.com/developers/docs/resources/emoji#modify-guild-emoji)

#### Parameters

| Name      | Type                                                     | Description                                     |
| :-------- | :------------------------------------------------------- | :---------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                           | The bot instance to use to make the request.    |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring)    | The ID of the guild in which to edit the emoji. |
| `id`      | [`BigString`](../modules/discordeno_bot.md#bigstring)    | The ID of the emoji to edit.                    |
| `options` | [`ModifyGuildEmoji`](discordeno_bot.ModifyGuildEmoji.md) | The parameters for the edit of the emoji.       |

#### Returns

`Promise`<[`Emoji`](discordeno_bot.Emoji.md)\>

An instance of the updated [Emoji](discordeno_bot.Emoji.md).

#### Inherited from

DefaultHelpers.editEmoji

#### Defined in

[packages/bot/src/helpers/emojis/editEmoji.ts:22](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/emojis/editEmoji.ts#L22)

---

### editFollowupMessage

▸ **editFollowupMessage**(`bot`, `token`, `messageId`, `options`): `Promise`<[`Message`](discordeno_bot.Message.md)\>

Edits a follow-up message to an interaction.

**`Remarks`**

Unlike `editMessage()`, this endpoint allows the bot user to act without needing to see the channel the message is in.

Does not support ephemeral follow-up messages due to these being stateless.

Fires a _Message Update_ event.

**`See`**

[https://discord.com/developers/docs/interactions/receiving-and-responding#edit-followup-message](https://discord.com/developers/docs/interactions/receiving-and-responding#edit-followup-message)

#### Parameters

| Name        | Type                                                                   | Description                                                         |
| :---------- | :--------------------------------------------------------------------- | :------------------------------------------------------------------ |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                                         | The bot instance to use to make the request.                        |
| `token`     | `string`                                                               | The interaction token to use, provided in the original interaction. |
| `messageId` | [`BigString`](../modules/discordeno_bot.md#bigstring)                  | The ID of the message to edit.                                      |
| `options`   | [`InteractionCallbackData`](discordeno_bot.InteractionCallbackData.md) | The parameters for the edit of the message.                         |

#### Returns

`Promise`<[`Message`](discordeno_bot.Message.md)\>

An instance of the edited [Message](discordeno_bot.Message.md).

#### Inherited from

DefaultHelpers.editFollowupMessage

#### Defined in

[packages/bot/src/helpers/interactions/responses/editFollowupMessage.ts:24](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/interactions/responses/editFollowupMessage.ts#L24)

---

### editGlobalApplicationCommand

▸ **editGlobalApplicationCommand**(`bot`, `commandId`, `options`): `Promise`<[`ApplicationCommand`](discordeno_bot.ApplicationCommand.md)\>

Edits a global application command.

**`See`**

[https://discord.com/developers/docs/interactions/application-commands#edit-global-application-command](https://discord.com/developers/docs/interactions/application-commands#edit-global-application-command)

#### Parameters

| Name        | Type                                                                                | Description                                  |
| :---------- | :---------------------------------------------------------------------------------- | :------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                                                      | The bot instance to use to make the request. |
| `commandId` | [`BigString`](../modules/discordeno_bot.md#bigstring)                               | The ID of the command to edit.               |
| `options`   | [`CreateApplicationCommand`](../modules/discordeno_bot.md#createapplicationcommand) | The parameters for the edit of the command.  |

#### Returns

`Promise`<[`ApplicationCommand`](discordeno_bot.ApplicationCommand.md)\>

An instance of the edited [ApplicationCommand](discordeno_bot.ApplicationCommand.md).

#### Inherited from

DefaultHelpers.editGlobalApplicationCommand

#### Defined in

[packages/bot/src/helpers/interactions/commands/editGlobalApplicationCommand.ts:16](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/interactions/commands/editGlobalApplicationCommand.ts#L16)

---

### editGuild

▸ **editGuild**(`bot`, `guildId`, `options`, `shardId`): `Promise`<[`Guild`](discordeno_bot.Guild.md)\>

Edits a guild's settings.

**`Remarks`**

Requires the `MANAGE_GUILD` permission.

If attempting to add or remove the [Community](../enums/discordeno_bot.GuildFeatures.md#community) feature:

- Requires the `ADMINISTRATOR` permission.

Fires a _Guild Update_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/guild#modify-guild](https://discord.com/developers/docs/resources/guild#modify-guild)

#### Parameters

| Name      | Type                                                  | Description                                  |
| :-------- | :---------------------------------------------------- | :------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request. |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild to edit.                 |
| `options` | [`ModifyGuild`](discordeno_bot.ModifyGuild.md)        | The parameters for the edit of the guild.    |
| `shardId` | `number`                                              | The ID of the shard the guild is in.         |

#### Returns

`Promise`<[`Guild`](discordeno_bot.Guild.md)\>

An instance of the edited [Guild](discordeno_bot.Guild.md).

#### Inherited from

DefaultHelpers.editGuild

#### Defined in

[packages/bot/src/helpers/guilds/editGuild.ts:32](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/editGuild.ts#L32)

---

### editGuildApplicationCommand

▸ **editGuildApplicationCommand**(`bot`, `commandId`, `guildId`, `options`): `Promise`<[`ApplicationCommand`](discordeno_bot.ApplicationCommand.md)\>

Edits an application command registered in a guild.

**`See`**

[https://discord.com/developers/docs/interactions/application-commands#edit-guild-application-command](https://discord.com/developers/docs/interactions/application-commands#edit-guild-application-command)

#### Parameters

| Name        | Type                                                                                | Description                                       |
| :---------- | :---------------------------------------------------------------------------------- | :------------------------------------------------ |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                                                      | The bot instance to use to make the request.      |
| `commandId` | [`BigString`](../modules/discordeno_bot.md#bigstring)                               | The ID of the command to edit.                    |
| `guildId`   | [`BigString`](../modules/discordeno_bot.md#bigstring)                               | The ID of the guild the command is registered in. |
| `options`   | [`CreateApplicationCommand`](../modules/discordeno_bot.md#createapplicationcommand) | The parameters for the edit of the command.       |

#### Returns

`Promise`<[`ApplicationCommand`](discordeno_bot.ApplicationCommand.md)\>

An instance of the edited [ApplicationCommand](discordeno_bot.ApplicationCommand.md).

#### Inherited from

DefaultHelpers.editGuildApplicationCommand

#### Defined in

[packages/bot/src/helpers/interactions/commands/editGuildApplicationCommand.ts:19](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/interactions/commands/editGuildApplicationCommand.ts#L19)

---

### editGuildMfaLevel

▸ **editGuildMfaLevel**(`bot`, `guildId`, `mfaLevel`, `reason?`): `Promise`<`void`\>

Modify a guild's MFA level. Requires guild ownership.

#### Parameters

| Name       | Type                                                  |
| :--------- | :---------------------------------------------------- |
| `bot`      | [`Bot`](discordeno_bot.Bot.md)                        |
| `guildId`  | [`BigString`](../modules/discordeno_bot.md#bigstring) |
| `mfaLevel` | [`MfaLevels`](../enums/discordeno_bot.MfaLevels.md)   |
| `reason?`  | `string`                                              |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.editGuildMfaLevel

#### Defined in

[packages/bot/src/helpers/guilds/editGuildMfaLevel.ts:5](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/editGuildMfaLevel.ts#L5)

---

### editGuildSticker

▸ **editGuildSticker**(`bot`, `guildId`, `stickerId`, `options`): `Promise`<[`Sticker`](discordeno_bot.Sticker.md)\>

Edit the given sticker.

**`Remarks`**

Requires the `MANAGE_EMOJIS_AND_STICKERS` permission.
Fires a Guild Stickers Update Gateway event.

**`See`**

[https://discord.com/developers/docs/resources/sticker#modify-guild-sticker](https://discord.com/developers/docs/resources/sticker#modify-guild-sticker)

#### Parameters

| Name        | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Description                                  |
| :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | The bot instance to use to make the request. |
| `guildId`   | `bigint`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | The ID of the guild to get                   |
| `stickerId` | `bigint`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | -                                            |
| `options`   | [`AtLeastOne`](../modules/discordeno_bot.md#atleastone)<[`EditGuildStickerOptions`](discordeno_bot.EditGuildStickerOptions.md), { `description?`: `Pick`<[`EditGuildStickerOptions`](discordeno_bot.EditGuildStickerOptions.md), `"description"`\> ; `name?`: `Pick`<[`EditGuildStickerOptions`](discordeno_bot.EditGuildStickerOptions.md), `"name"`\> ; `reason?`: `Pick`<[`EditGuildStickerOptions`](discordeno_bot.EditGuildStickerOptions.md), `"reason"`\> ; `tags?`: `Pick`<[`EditGuildStickerOptions`](discordeno_bot.EditGuildStickerOptions.md), `"tags"`\> }\> | -                                            |

#### Returns

`Promise`<[`Sticker`](discordeno_bot.Sticker.md)\>

A [Sticker](discordeno_bot.Sticker.md)

#### Inherited from

DefaultHelpers.editGuildSticker

#### Defined in

[packages/bot/src/helpers/stickers/editGuildSticker.ts:18](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/stickers/editGuildSticker.ts#L18)

---

### editGuildTemplate

▸ **editGuildTemplate**(`bot`, `guildId`, `templateCode`, `options`): `Promise`<[`Template`](discordeno_bot.Template.md)\>

Edits a template's settings.

**`Remarks`**

Requires the `MANAGE_GUILD` permission.

Fires a _Guild Update_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/guild-template#modify-guild-template](https://discord.com/developers/docs/resources/guild-template#modify-guild-template)

#### Parameters

| Name           | Type                                                           | Description                                  |
| :------------- | :------------------------------------------------------------- | :------------------------------------------- |
| `bot`          | [`Bot`](discordeno_bot.Bot.md)                                 | The bot instance to use to make the request. |
| `guildId`      | [`BigString`](../modules/discordeno_bot.md#bigstring)          | The ID of the guild to edit a template of.   |
| `templateCode` | `string`                                                       | The code of the template to edit.            |
| `options`      | [`ModifyGuildTemplate`](discordeno_bot.ModifyGuildTemplate.md) | The parameters for the edit of the template. |

#### Returns

`Promise`<[`Template`](discordeno_bot.Template.md)\>

An instance of the edited [Template](discordeno_bot.Template.md).

#### Inherited from

DefaultHelpers.editGuildTemplate

#### Defined in

[packages/bot/src/helpers/templates/editGuildTemplate.ts:21](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/templates/editGuildTemplate.ts#L21)

---

### editMember

▸ **editMember**(`bot`, `guildId`, `userId`, `options`): `Promise`<[`Member`](discordeno_bot.Member.md)\>

Edits a member's properties.

**`Remarks`**

This endpoint requires various permissions depending on what is edited about the member.
To find out the required permission to enact a change, read the documentation of this endpoint's [parameters](discordeno_bot.ModifyGuildMember.md).

Fires a _Guild Member Update_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/guild#modify-guild-member](https://discord.com/developers/docs/resources/guild#modify-guild-member)

#### Parameters

| Name      | Type                                                       | Description                                  |
| :-------- | :--------------------------------------------------------- | :------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                             | The bot instance to use to make the request. |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring)      | The ID of the guild to edit the member of.   |
| `userId`  | [`BigString`](../modules/discordeno_bot.md#bigstring)      | The user ID of the member to edit.           |
| `options` | [`ModifyGuildMember`](discordeno_bot.ModifyGuildMember.md) | The parameters for the edit of the user.     |

#### Returns

`Promise`<[`Member`](discordeno_bot.Member.md)\>

#### Inherited from

DefaultHelpers.editMember

#### Defined in

[packages/bot/src/helpers/members/editMember.ts:21](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/members/editMember.ts#L21)

---

### editMessage

▸ **editMessage**(`bot`, `channelId`, `messageId`, `options`): `Promise`<[`Message`](discordeno_bot.Message.md)\>

Edits a message.

**`Remarks`**

If editing another user's message:

- Requires the `MANAGE_MESSAGES` permission.
- Only the [flags](discordeno_bot.EditMessage.md#flags) property of the options object parameter can be edited.

Fires a _Message Update_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/channel#edit-message](https://discord.com/developers/docs/resources/channel#edit-message)

#### Parameters

| Name        | Type                                                  | Description                                   |
| :---------- | :---------------------------------------------------- | :-------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.  |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the channel to edit the message in. |
| `messageId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The IDs of the message to edit.               |
| `options`   | [`EditMessage`](discordeno_bot.EditMessage.md)        | The parameters for the edit of the message.   |

#### Returns

`Promise`<[`Message`](discordeno_bot.Message.md)\>

An instance of the edited [Message](discordeno_bot.Message.md).

#### Inherited from

DefaultHelpers.editMessage

#### Defined in

[packages/bot/src/helpers/messages/editMessage.ts:25](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/editMessage.ts#L25)

---

### editOriginalInteractionResponse

▸ **editOriginalInteractionResponse**(`bot`, `token`, `options`): `Promise`<[`Message`](discordeno_bot.Message.md) \| `undefined`\>

Edits the initial message response to an interaction.

**`Remarks`**

Unlike `editMessage()`, this endpoint allows the bot user to act without needing to see the channel the message is in.

Does not support ephemeral follow-up messages due to these being stateless.

Fires a _Message Update_ event.

**`See`**

[https://discord.com/developers/docs/interactions/receiving-and-responding#edit-original-interaction-response](https://discord.com/developers/docs/interactions/receiving-and-responding#edit-original-interaction-response)

#### Parameters

| Name      | Type                                                                   | Description                                                         |
| :-------- | :--------------------------------------------------------------------- | :------------------------------------------------------------------ |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                         | The bot instance to use to make the request.                        |
| `token`   | `string`                                                               | The interaction token to use, provided in the original interaction. |
| `options` | [`InteractionCallbackData`](discordeno_bot.InteractionCallbackData.md) | The parameters for the edit of the response.                        |

#### Returns

`Promise`<[`Message`](discordeno_bot.Message.md) \| `undefined`\>

An instance of the edited [Message](discordeno_bot.Message.md).

#### Inherited from

DefaultHelpers.editOriginalInteractionResponse

#### Defined in

[packages/bot/src/helpers/interactions/responses/editOriginalInteractionResponse.ts:23](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/interactions/responses/editOriginalInteractionResponse.ts#L23)

---

### editOriginalWebhookMessage

▸ **editOriginalWebhookMessage**(`bot`, `webhookId`, `token`, `options`): `Promise`<[`Message`](discordeno_bot.Message.md)\>

Edits the original webhook message.

**`Remarks`**

Fires a _Message Update_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/webhook#edit-webhook-message](https://discord.com/developers/docs/resources/webhook#edit-webhook-message)

#### Parameters

| Name        | Type                                                                                                                                            | Description                                            |
| :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                                                                                                                  | The bot instance to use to make the request.           |
| `webhookId` | [`BigString`](../modules/discordeno_bot.md#bigstring)                                                                                           | The ID of the webhook to edit the original message of. |
| `token`     | `string`                                                                                                                                        | The webhook token, used to edit the message.           |
| `options`   | [`InteractionCallbackData`](discordeno_bot.InteractionCallbackData.md) & { `threadId?`: [`BigString`](../modules/discordeno_bot.md#bigstring) } | The parameters for the edit of the message.            |

#### Returns

`Promise`<[`Message`](discordeno_bot.Message.md)\>

An instance of the edited [Message](discordeno_bot.Message.md).

#### Inherited from

DefaultHelpers.editOriginalWebhookMessage

#### Defined in

[packages/bot/src/helpers/webhooks/editOriginalWebhookMessage.ts:20](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/webhooks/editOriginalWebhookMessage.ts#L20)

---

### editOwnVoiceState

▸ **editOwnVoiceState**(`bot`, `guildId`, `options`): `Promise`<`void`\>

Edits the voice state of the bot user.

**`Remarks`**

The [channelId](discordeno_bot.EditOwnVoiceState.md#channelid) property of the options object parameter must point to a stage channel, and the bot user must already have joined it.

If attempting to unmute oneself:

- Requires the `MUTE_MEMBERS` permission.

If attempting to request to speak:

- Requires the `REQUEST_TO_SPEAK` permission.

**`See`**

[https://discord.com/developers/docs/resources/guild#modify-current-user-voice-state](https://discord.com/developers/docs/resources/guild#modify-current-user-voice-state)

#### Parameters

| Name      | Type                                                       | Description                                                           |
| :-------- | :--------------------------------------------------------- | :-------------------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                             | The bot instance to use to make the request.                          |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring)      | The ID of the guild in which to edit the voice state of the bot user. |
| `options` | [`EditOwnVoiceState`](discordeno_bot.EditOwnVoiceState.md) | The parameters for the edit of the voice state.                       |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.editOwnVoiceState

#### Defined in

[packages/bot/src/helpers/guilds/voice/editVoiceState.ts:24](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/voice/editVoiceState.ts#L24)

---

### editRole

▸ **editRole**(`bot`, `guildId`, `roleId`, `options`): `Promise`<[`Role`](discordeno_bot.Role.md)\>

Edits a role in a guild.

**`Remarks`**

Requires the `MANAGE_ROLES` permission.

Fires a _Guild Role Update_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/guild#modify-guild-role](https://discord.com/developers/docs/resources/guild#modify-guild-role)

#### Parameters

| Name      | Type                                                  | Description                                  |
| :-------- | :---------------------------------------------------- | :------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request. |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild to edit the role in.     |
| `roleId`  | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the role to edit.                  |
| `options` | [`EditGuildRole`](discordeno_bot.EditGuildRole.md)    | The parameters for the edit of the role.     |

#### Returns

`Promise`<[`Role`](discordeno_bot.Role.md)\>

An instance of the edited [Role](discordeno_bot.Role.md).

#### Inherited from

DefaultHelpers.editRole

#### Defined in

[packages/bot/src/helpers/roles/editRole.ts:21](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/roles/editRole.ts#L21)

---

### editScheduledEvent

▸ **editScheduledEvent**(`bot`, `guildId`, `eventId`, `options`): `Promise`<[`ScheduledEvent`](discordeno_bot.ScheduledEvent.md)\>

Edits a scheduled event.

**`Remarks`**

Requires the `MANAGE_EVENTS` permission.

To start or end an event, modify the event's `status` property.

The `entity_metadata` property is discarded for events whose `entity_type` is not [External](../enums/discordeno_bot.ScheduledEventEntityType.md#external).

Fires a _Guild Scheduled Event Update_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/guild-scheduled-event#modify-guild-scheduled-event](https://discord.com/developers/docs/resources/guild-scheduled-event#modify-guild-scheduled-event)

#### Parameters

| Name      | Type                                                                     | Description                                         |
| :-------- | :----------------------------------------------------------------------- | :-------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                           | The bot instance to use to make the request.        |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring)                    | The ID of the guild to edit the scheduled event in. |
| `eventId` | [`BigString`](../modules/discordeno_bot.md#bigstring)                    | The ID of the scheduled event to edit.              |
| `options` | `Partial`<[`EditScheduledEvent`](discordeno_bot.EditScheduledEvent.md)\> | -                                                   |

#### Returns

`Promise`<[`ScheduledEvent`](discordeno_bot.ScheduledEvent.md)\>

An instance of the edited [ScheduledEvent](discordeno_bot.ScheduledEvent.md).

#### Inherited from

DefaultHelpers.editScheduledEvent

#### Defined in

[packages/bot/src/helpers/guilds/events/editScheduledEvent.ts:29](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/events/editScheduledEvent.ts#L29)

---

### editShardStatus

▸ **editShardStatus**(`bot`, `shardId`, `data`): `Promise`<`void`\>

#### Parameters

| Name      | Type                                             |
| :-------- | :----------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                   |
| `shardId` | `number`                                         |
| `data`    | [`StatusUpdate`](discordeno_bot.StatusUpdate.md) |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.editShardStatus

#### Defined in

[packages/bot/src/helpers/misc/editShardStatus.ts:5](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/misc/editShardStatus.ts#L5)

---

### editStageInstance

▸ **editStageInstance**(`bot`, `channelId`, `data`): `Promise`<[`StageInstance`](discordeno_bot.StageInstance.md)\>

Edits a stage instance.

**`Remarks`**

Requires the user to be a moderator of the stage channel.

Fires a _Stage Instance Update_ event.

**`See`**

[https://discord.com/developers/docs/resources/stage-instance#modify-stage-instance](https://discord.com/developers/docs/resources/stage-instance#modify-stage-instance)

#### Parameters

| Name        | Type                                                                     | Description                                                        |
| :---------- | :----------------------------------------------------------------------- | :----------------------------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                                           | The bot instance to use to make the request.                       |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring)                    | The ID of the stage channel the stage instance is associated with. |
| `data`      | [`EditStageInstanceOptions`](discordeno_bot.EditStageInstanceOptions.md) | -                                                                  |

#### Returns

`Promise`<[`StageInstance`](discordeno_bot.StageInstance.md)\>

An instance of the updated [StageInstance](discordeno_bot.StageInstance.md).

#### Inherited from

DefaultHelpers.editStageInstance

#### Defined in

[packages/bot/src/helpers/channels/stages/editStageInstance.ts:20](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/stages/editStageInstance.ts#L20)

---

### editUserVoiceState

▸ **editUserVoiceState**(`bot`, `guildId`, `options`): `Promise`<`void`\>

Edits the voice state of another user.

**`Remarks`**

The [channelId](discordeno_bot.EditOwnVoiceState.md#channelid) property of the options object parameter must point to a stage channel, and the user must already have joined it.

Requires the `MUTE_MEMBERS` permission.

**`See`**

[https://discord.com/developers/docs/resources/guild#modify-current-user-voice-state](https://discord.com/developers/docs/resources/guild#modify-current-user-voice-state)

#### Parameters

| Name      | Type                                                         | Description                                                           |
| :-------- | :----------------------------------------------------------- | :-------------------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                               | The bot instance to use to make the request.                          |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring)        | The ID of the guild in which to edit the voice state of the bot user. |
| `options` | [`EditUserVoiceState`](discordeno_bot.EditUserVoiceState.md) | The parameters for the edit of the voice state.                       |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.editUserVoiceState

#### Defined in

[packages/bot/src/helpers/guilds/voice/editVoiceState.ts:50](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/voice/editVoiceState.ts#L50)

---

### editWebhook

▸ **editWebhook**(`bot`, `webhookId`, `options`): `Promise`<[`Webhook`](discordeno_bot.Webhook.md)\>

Edits a webhook.

**`Remarks`**

Requires the `MANAGE_WEBHOOKS` permission.

Fires a _Webhooks Update_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/webhook#edit-webhook](https://discord.com/developers/docs/resources/webhook#edit-webhook)

#### Parameters

| Name        | Type                                                  | Description                                  |
| :---------- | :---------------------------------------------------- | :------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request. |
| `webhookId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the webhook to edit.               |
| `options`   | [`ModifyWebhook`](discordeno_bot.ModifyWebhook.md)    | -                                            |

#### Returns

`Promise`<[`Webhook`](discordeno_bot.Webhook.md)\>

An instance of the edited [Webhook](discordeno_bot.Webhook.md).

#### Inherited from

DefaultHelpers.editWebhook

#### Defined in

[packages/bot/src/helpers/webhooks/editWebhook.ts:20](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/webhooks/editWebhook.ts#L20)

---

### editWebhookMessage

▸ **editWebhookMessage**(`bot`, `webhookId`, `token`, `messageId`, `options`): `Promise`<[`Message`](discordeno_bot.Message.md)\>

Edits a webhook message.

**`Remarks`**

Fires a _Message Update_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/webhook#edit-webhook-message](https://discord.com/developers/docs/resources/webhook#edit-webhook-message)

#### Parameters

| Name        | Type                                                                                                                                            | Description                                   |
| :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                                                                                                                  | The bot instance to use to make the request.  |
| `webhookId` | [`BigString`](../modules/discordeno_bot.md#bigstring)                                                                                           | The ID of the webhook to edit the message of. |
| `token`     | `string`                                                                                                                                        | The webhook token, used to edit the message.  |
| `messageId` | [`BigString`](../modules/discordeno_bot.md#bigstring)                                                                                           | The ID of the message to edit.                |
| `options`   | [`InteractionCallbackData`](discordeno_bot.InteractionCallbackData.md) & { `threadId?`: [`BigString`](../modules/discordeno_bot.md#bigstring) } | The parameters for the edit of the message.   |

#### Returns

`Promise`<[`Message`](discordeno_bot.Message.md)\>

An instance of the edited [Message](discordeno_bot.Message.md).

#### Inherited from

DefaultHelpers.editWebhookMessage

#### Defined in

[packages/bot/src/helpers/webhooks/editWebhookMessage.ts:21](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/webhooks/editWebhookMessage.ts#L21)

---

### editWebhookWithToken

▸ **editWebhookWithToken**(`bot`, `webhookId`, `token`, `options`): `Promise`<[`Webhook`](discordeno_bot.Webhook.md)\>

Edits a webhook using the webhook token, thereby bypassing the need for authentication + permissions.

**`Remarks`**

Requires the `MANAGE_WEBHOOKS` permission.

Fires a _Webhooks Update_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/webhook#modify-webhook-with-token](https://discord.com/developers/docs/resources/webhook#modify-webhook-with-token)

#### Parameters

| Name        | Type                                                                       | Description                                  |
| :---------- | :------------------------------------------------------------------------- | :------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                                             | The bot instance to use to make the request. |
| `webhookId` | [`BigString`](../modules/discordeno_bot.md#bigstring)                      | The ID of the webhook to edit.               |
| `token`     | `string`                                                                   | The webhook token, used to edit the webhook. |
| `options`   | `Omit`<[`ModifyWebhook`](discordeno_bot.ModifyWebhook.md), `"channelId"`\> | -                                            |

#### Returns

`Promise`<[`Webhook`](discordeno_bot.Webhook.md)\>

An instance of the edited [Webhook](discordeno_bot.Webhook.md).

#### Inherited from

DefaultHelpers.editWebhookWithToken

#### Defined in

[packages/bot/src/helpers/webhooks/editWebhookWithToken.ts:21](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/webhooks/editWebhookWithToken.ts#L21)

---

### editWelcomeScreen

▸ **editWelcomeScreen**(`bot`, `guildId`, `options`): `Promise`<[`WelcomeScreen`](discordeno_bot.WelcomeScreen.md)\>

Edits a guild's welcome screen.

**`Remarks`**

Requires the `MANAGE_GUILD` permission.

Fires a _Guild Update_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/guild#modify-guild-welcome-screen](https://discord.com/developers/docs/resources/guild#modify-guild-welcome-screen)

#### Parameters

| Name      | Type                                                                     | Description                                        |
| :-------- | :----------------------------------------------------------------------- | :------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                           | The bot instance to use to make the request.       |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring)                    | The ID of the guild to edit the welcome screen of. |
| `options` | [`ModifyGuildWelcomeScreen`](discordeno_bot.ModifyGuildWelcomeScreen.md) | The parameters for the edit of the welcome screen. |

#### Returns

`Promise`<[`WelcomeScreen`](discordeno_bot.WelcomeScreen.md)\>

An instance of the edited [WelcomeScreen](discordeno_bot.WelcomeScreen.md).

#### Inherited from

DefaultHelpers.editWelcomeScreen

#### Defined in

[packages/bot/src/helpers/guilds/editWelcomeScreen.ts:20](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/editWelcomeScreen.ts#L20)

---

### editWidgetSettings

▸ **editWidgetSettings**(`bot`, `guildId`, `enabled`, `channelId?`): `Promise`<[`GuildWidgetSettings`](discordeno_bot.GuildWidgetSettings.md)\>

Edits the settings of a guild's widget.

**`Remarks`**

Requires the `MANAGE_GUILD` permission.

Fires a _Guild Update_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/guild#modify-guild-widget](https://discord.com/developers/docs/resources/guild#modify-guild-widget)

#### Parameters

| Name         | Type                                                  | Description                                                |
| :----------- | :---------------------------------------------------- | :--------------------------------------------------------- |
| `bot`        | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.               |
| `guildId`    | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild to edit the settings of the widget of. |
| `enabled`    | `boolean`                                             | -                                                          |
| `channelId?` | `null` \| `string`                                    | -                                                          |

#### Returns

`Promise`<[`GuildWidgetSettings`](discordeno_bot.GuildWidgetSettings.md)\>

An instance of the edited [GuildWidgetSettings](discordeno_bot.GuildWidgetSettings.md).

#### Inherited from

DefaultHelpers.editWidgetSettings

#### Defined in

[packages/bot/src/helpers/guilds/widget/editWidgetSettings.ts:21](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/widget/editWidgetSettings.ts#L21)

---

### executeWebhook

▸ **executeWebhook**(`bot`, `webhookId`, `token`, `options`): `Promise`<[`Message`](discordeno_bot.Message.md) \| `undefined`\>

Executes a webhook, causing a message to be posted in the channel configured for the webhook.

**`Remarks`**

If the webhook channel is a forum channel, you must provide a value for either `threadId` or `threadName`.

**`See`**

[https://discord.com/developers/docs/resources/webhook#execute-webhook](https://discord.com/developers/docs/resources/webhook#execute-webhook)

#### Parameters

| Name        | Type                                                  | Description                                      |
| :---------- | :---------------------------------------------------- | :----------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.     |
| `webhookId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the webhook to execute.                |
| `token`     | `string`                                              | The webhook token, used to execute the webhook.  |
| `options`   | [`ExecuteWebhook`](discordeno_bot.ExecuteWebhook.md)  | The parameters for the execution of the webhook. |

#### Returns

`Promise`<[`Message`](discordeno_bot.Message.md) \| `undefined`\>

An instance of the created [Message](discordeno_bot.Message.md), or `undefined` if the [wait](discordeno_bot.ExecuteWebhook.md#wait) property of the options object parameter is set to `false`.

#### Inherited from

DefaultHelpers.executeWebhook

#### Defined in

[packages/bot/src/helpers/webhooks/executeWebhook.ts:22](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/webhooks/executeWebhook.ts#L22)

---

### fetchMembers

▸ **fetchMembers**(`bot`, `guildId`, `options?`): `Promise`<`void`\>

Fetches the list of members for a guild over the gateway.

**`Remarks`**

If requesting the entire member list:

- Requires the `GUILD_MEMBERS` intent.

If requesting presences ([presences](discordeno_bot.RequestGuildMembers.md#presences) set to `true`):

- Requires the `GUILD_PRESENCES` intent.

If requesting a prefix ([query](discordeno_bot.RequestGuildMembers.md#query) non-`undefined`):

- Returns a maximum of 100 members.

If requesting a users by ID ([userIds](discordeno_bot.RequestGuildMembers.md#userids) non-`undefined`):

- Returns a maximum of 100 members.

Fires a _Guild Members Chunk_ gateway event for every 1000 members fetched.

**`See`**

[https://discord.com/developers/docs/topics/gateway#request-guild-members](https://discord.com/developers/docs/topics/gateway#request-guild-members)

#### Parameters

| Name       | Type                                                                                 | Description                                         |
| :--------- | :----------------------------------------------------------------------------------- | :-------------------------------------------------- |
| `bot`      | [`Bot`](discordeno_bot.Bot.md)                                                       | The bot instance to use to make the requests.       |
| `guildId`  | [`BigString`](../modules/discordeno_bot.md#bigstring)                                | The ID of the guild to get the list of members for. |
| `options?` | `Omit`<[`RequestGuildMembers`](discordeno_bot.RequestGuildMembers.md), `"guildId"`\> | The parameters for the fetching of the members.     |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.fetchMembers

#### Defined in

[packages/bot/src/helpers/members/fetchMembers.ts:29](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/members/fetchMembers.ts#L29)

---

### followAnnouncementChannel

▸ **followAnnouncementChannel**(`bot`, `sourceChannelId`, `targetChannelId`): `Promise`<`bigint`\>

Follows an announcement channel, allowing messages posted within it to be cross-posted into the target channel.

**`Remarks`**

Requires the `MANAGE_WEBHOOKS` permission in the **target channel**.

Fires a _Webhooks Update_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/channel#follow-announcement-channel](https://discord.com/developers/docs/resources/channel#follow-announcement-channel)

#### Parameters

| Name              | Type                                                  | Description                                                  |
| :---------------- | :---------------------------------------------------- | :----------------------------------------------------------- |
| `bot`             | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.                 |
| `sourceChannelId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the announcement channel to follow.                |
| `targetChannelId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the target channel - the channel to cross-post to. |

#### Returns

`Promise`<`bigint`\>

An instance of FollowedChannel.

#### Inherited from

DefaultHelpers.followAnnouncementChannel

#### Defined in

[packages/bot/src/helpers/channels/announcements/followAnnouncementChannel.ts:19](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/announcements/followAnnouncementChannel.ts#L19)

---

### getActiveThreads

▸ **getActiveThreads**(`bot`, `guildId`): `Promise`<[`ActiveThreads`](discordeno_bot.ActiveThreads.md)\>

Gets the list of all active threads for a guild.

**`Remarks`**

Returns both public and private threads.

Threads are ordered by the `id` property in descending order.

**`See`**

[https://discord.com/developers/docs/resources/guild#list-active-guild-threads](https://discord.com/developers/docs/resources/guild#list-active-guild-threads)

#### Parameters

| Name      | Type                                                  | Description                                  |
| :-------- | :---------------------------------------------------- | :------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request. |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild to get the threads of.   |

#### Returns

`Promise`<[`ActiveThreads`](discordeno_bot.ActiveThreads.md)\>

An instance of [ActiveThreads](discordeno_bot.ActiveThreads.md).

#### Inherited from

DefaultHelpers.getActiveThreads

#### Defined in

[packages/bot/src/helpers/channels/threads/getActiveThreads.ts:20](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/threads/getActiveThreads.ts#L20)

---

### getApplicationCommandPermission

▸ **getApplicationCommandPermission**(`bot`, `guildId`, `commandId`): `Promise`<[`ApplicationCommandPermission`](discordeno_bot.ApplicationCommandPermission.md)\>

Gets the permissions of a guild application command.

**`See`**

[https://discord.com/developers/docs/interactions/application-commands#get-application-command-permissions](https://discord.com/developers/docs/interactions/application-commands#get-application-command-permissions)

#### Parameters

| Name        | Type                                                  | Description                                       |
| :---------- | :---------------------------------------------------- | :------------------------------------------------ |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.      |
| `guildId`   | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild the command is registered in. |
| `commandId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the command to get the permissions of.  |

#### Returns

`Promise`<[`ApplicationCommandPermission`](discordeno_bot.ApplicationCommandPermission.md)\>

An instance of [ApplicationCommandPermission](discordeno_bot.ApplicationCommandPermission.md).

#### Inherited from

DefaultHelpers.getApplicationCommandPermission

#### Defined in

[packages/bot/src/helpers/interactions/commands/getApplicationCommandPermission.ts:15](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/interactions/commands/getApplicationCommandPermission.ts#L15)

---

### getApplicationCommandPermissions

▸ **getApplicationCommandPermissions**(`bot`, `guildId`): `Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`ApplicationCommandPermission`](discordeno_bot.ApplicationCommandPermission.md)\>\>

Gets the permissions of all application commands registered in a guild by the ID of the guild.

**`See`**

[https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command-permissions](https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command-permissions)

#### Parameters

| Name      | Type                                                  | Description                                            |
| :-------- | :---------------------------------------------------- | :----------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.           |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild to get the permissions objects of. |

#### Returns

`Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`ApplicationCommandPermission`](discordeno_bot.ApplicationCommandPermission.md)\>\>

A collection of [ApplicationCommandPermission](discordeno_bot.ApplicationCommandPermission.md) objects assorted by command ID.

#### Inherited from

DefaultHelpers.getApplicationCommandPermissions

#### Defined in

[packages/bot/src/helpers/interactions/commands/getApplicationCommandPermissions.ts:15](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/interactions/commands/getApplicationCommandPermissions.ts#L15)

---

### getApplicationInfo

▸ **getApplicationInfo**(`bot`): `Promise`<[`Application`](discordeno_bot.Application.md)\>

Get the applications info

#### Parameters

| Name  | Type                           |
| :---- | :----------------------------- |
| `bot` | [`Bot`](discordeno_bot.Bot.md) |

#### Returns

`Promise`<[`Application`](discordeno_bot.Application.md)\>

#### Inherited from

DefaultHelpers.getApplicationInfo

#### Defined in

[packages/bot/src/helpers/misc/getApplicationInfo.ts:6](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/misc/getApplicationInfo.ts#L6)

---

### getAuditLog

▸ **getAuditLog**(`bot`, `guildId`, `options?`): `Promise`<[`AuditLog`](discordeno_bot.AuditLog.md)\>

Gets a guild's audit log.

**`Remarks`**

Requires the `VIEW_AUDIT_LOG` permission.

**`See`**

[https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log](https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log)

#### Parameters

| Name       | Type                                                     | Description                                       |
| :--------- | :------------------------------------------------------- | :------------------------------------------------ |
| `bot`      | [`Bot`](discordeno_bot.Bot.md)                           | The bot instance to use to make the request.      |
| `guildId`  | [`BigString`](../modules/discordeno_bot.md#bigstring)    | The ID of the guild to get the audit log of.      |
| `options?` | [`GetGuildAuditLog`](discordeno_bot.GetGuildAuditLog.md) | The parameters for the fetching of the audit log. |

#### Returns

`Promise`<[`AuditLog`](discordeno_bot.AuditLog.md)\>

An instance of [AuditLog](discordeno_bot.AuditLog.md).

#### Inherited from

DefaultHelpers.getAuditLog

#### Defined in

[packages/bot/src/helpers/guilds/getAuditLog.ts:38](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/getAuditLog.ts#L38)

---

### getAutomodRule

▸ **getAutomodRule**(`bot`, `guildId`, `ruleId`): `Promise`<[`AutoModerationRule`](discordeno_bot.AutoModerationRule.md)\>

Gets an automod rule by its ID.

**`Remarks`**

Requires the `MANAGE_GUILD` permission.

**`See`**

[https://discord.com/developers/docs/resources/auto-moderation#get-auto-moderation-rule](https://discord.com/developers/docs/resources/auto-moderation#get-auto-moderation-rule)

#### Parameters

| Name      | Type                                                  | Description                                  |
| :-------- | :---------------------------------------------------- | :------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request. |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild to get the rule of.      |
| `ruleId`  | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the rule to get.                   |

#### Returns

`Promise`<[`AutoModerationRule`](discordeno_bot.AutoModerationRule.md)\>

An instance of [AutoModerationRule](discordeno_bot.AutoModerationRule.md).

#### Inherited from

DefaultHelpers.getAutomodRule

#### Defined in

[packages/bot/src/helpers/guilds/automod/getAutomodRule.ts:18](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/automod/getAutomodRule.ts#L18)

---

### getAutomodRules

▸ **getAutomodRules**(`bot`, `guildId`): `Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`AutoModerationRule`](discordeno_bot.AutoModerationRule.md)\>\>

Gets the list of automod rules for a guild.

**`Remarks`**

Requires the `MANAGE_GUILD` permission.

**`See`**

[https://discord.com/developers/docs/resources/auto-moderation#list-auto-moderation-rules-for-guild](https://discord.com/developers/docs/resources/auto-moderation#list-auto-moderation-rules-for-guild)

#### Parameters

| Name      | Type                                                  | Description                                  |
| :-------- | :---------------------------------------------------- | :------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request. |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild to get the rules from.   |

#### Returns

`Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`AutoModerationRule`](discordeno_bot.AutoModerationRule.md)\>\>

A collection of [AutoModerationRule](discordeno_bot.AutoModerationRule.md) objects assorted by rule ID.

#### Inherited from

DefaultHelpers.getAutomodRules

#### Defined in

[packages/bot/src/helpers/guilds/automod/getAutomodRules.ts:18](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/automod/getAutomodRules.ts#L18)

---

### getAvailableVoiceRegions

▸ **getAvailableVoiceRegions**(`bot`): `Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`string`, [`VoiceRegions`](discordeno_bot.VoiceRegions.md)\>\>

Gets the list of available voice regions.

#### Parameters

| Name  | Type                           | Description                                  |
| :---- | :----------------------------- | :------------------------------------------- |
| `bot` | [`Bot`](discordeno_bot.Bot.md) | The bot instance to use to make the request. |

#### Returns

`Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`string`, [`VoiceRegions`](discordeno_bot.VoiceRegions.md)\>\>

A collection of [VoiceRegion](discordeno_bot.VoiceRegions.md) objects assorted by voice region ID.

#### Inherited from

DefaultHelpers.getAvailableVoiceRegions

#### Defined in

[packages/bot/src/helpers/guilds/voice/getAvailableVoiceRegions.ts:12](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/voice/getAvailableVoiceRegions.ts#L12)

---

### getAvatarURL

▸ **getAvatarURL**(`bot`, `userId`, `discriminator`, `options?`): `string`

Builds a URL to a user's avatar stored in the Discord CDN.

#### Parameters

| Name              | Type                                                                 | Description                                                |
| :---------------- | :------------------------------------------------------------------- | :--------------------------------------------------------- |
| `bot`             | [`Bot`](discordeno_bot.Bot.md)                                       | The bot instance to use to build the URL.                  |
| `userId`          | [`BigString`](../modules/discordeno_bot.md#bigstring)                | The ID of the user to get the avatar of.                   |
| `discriminator`   | `string`                                                             | The user's discriminator. (4-digit tag after the hashtag.) |
| `options?`        | `Object`                                                             | The parameters for the building of the URL.                |
| `options.avatar`  | `undefined` \| [`BigString`](../modules/discordeno_bot.md#bigstring) | -                                                          |
| `options.format?` | [`ImageFormat`](../modules/discordeno_bot.md#imageformat)            | -                                                          |
| `options.size?`   | [`ImageSize`](../modules/discordeno_bot.md#imagesize)                | -                                                          |

#### Returns

`string`

The link to the resource.

#### Inherited from

DefaultHelpers.getAvatarURL

#### Defined in

[packages/bot/src/helpers/members/getAvatarUrl.ts:13](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/members/getAvatarUrl.ts#L13)

---

### getBan

▸ **getBan**(`bot`, `guildId`, `userId`): `Promise`<[`Ban`](discordeno_bot.Ban.md)\>

Gets a ban by user ID.

**`Remarks`**

Requires the `BAN_MEMBERS` permission.

**`See`**

[https://discord.com/developers/docs/resources/guild#get-guild-ban](https://discord.com/developers/docs/resources/guild#get-guild-ban)

#### Parameters

| Name      | Type                                                  | Description                                  |
| :-------- | :---------------------------------------------------- | :------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request. |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild to get the ban from.     |
| `userId`  | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the user to get the ban for.       |

#### Returns

`Promise`<[`Ban`](discordeno_bot.Ban.md)\>

An instance of [Ban](discordeno_bot.Ban.md).

#### Inherited from

DefaultHelpers.getBan

#### Defined in

[packages/bot/src/helpers/guilds/getBan.ts:25](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/getBan.ts#L25)

---

### getBans

▸ **getBans**(`bot`, `guildId`, `options?`): `Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`Ban`](discordeno_bot.Ban.md)\>\>

Gets the list of bans for a guild.

**`Remarks`**

Requires the `BAN_MEMBERS` permission.

Users are ordered by their IDs in _ascending_ order.

**`See`**

[https://discord.com/developers/docs/resources/guild#get-guild-bans](https://discord.com/developers/docs/resources/guild#get-guild-bans)

#### Parameters

| Name       | Type                                                  | Description                                          |
| :--------- | :---------------------------------------------------- | :--------------------------------------------------- |
| `bot`      | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.         |
| `guildId`  | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild to get the list of bans for.     |
| `options?` | [`GetBans`](discordeno_bot.GetBans.md)                | The parameters for the fetching of the list of bans. |

#### Returns

`Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`Ban`](discordeno_bot.Ban.md)\>\>

A collection of [Ban](discordeno_bot.Ban.md) objects assorted by user ID.

#### Inherited from

DefaultHelpers.getBans

#### Defined in

[packages/bot/src/helpers/guilds/getBans.ts:21](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/getBans.ts#L21)

---

### getChannel

▸ **getChannel**(`bot`, `channelId`): `Promise`<[`Channel`](discordeno_bot.Channel.md)\>

Gets a channel by its ID.

**`Remarks`**

If the channel is a thread, a [ThreadMember](discordeno_bot.ThreadMember.md) object is included in the result.

**`See`**

[https://discord.com/developers/docs/resources/channel#get-channel](https://discord.com/developers/docs/resources/channel#get-channel)

#### Parameters

| Name        | Type                                                  | Description                                  |
| :---------- | :---------------------------------------------------- | :------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request. |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the channel to get.                |

#### Returns

`Promise`<[`Channel`](discordeno_bot.Channel.md)\>

An instance of [Channel](discordeno_bot.Channel.md).

#### Inherited from

DefaultHelpers.getChannel

#### Defined in

[packages/bot/src/helpers/channels/getChannel.ts:17](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/getChannel.ts#L17)

---

### getChannelInvites

▸ **getChannelInvites**(`bot`, `channelId`): `Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`string`, [`InviteMetadata`](../modules/discordeno_bot.md#invitemetadata)\>\>

Gets the list of invites for a channel.

**`Remarks`**

Requires the `MANAGE_CHANNELS` permission.

Only usable for guild channels.

**`See`**

[https://discord.com/developers/docs/resources/channel#get-channel-invites](https://discord.com/developers/docs/resources/channel#get-channel-invites)

#### Parameters

| Name        | Type                                                  | Description                                  |
| :---------- | :---------------------------------------------------- | :------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request. |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the channel to get the invites of. |

#### Returns

`Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`string`, [`InviteMetadata`](../modules/discordeno_bot.md#invitemetadata)\>\>

A collection of [InviteMetadata](../modules/discordeno_bot.md#invitemetadata) objects assorted by invite code.

#### Inherited from

DefaultHelpers.getChannelInvites

#### Defined in

[packages/bot/src/helpers/channels/getChannelInvites.ts:20](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/getChannelInvites.ts#L20)

---

### getChannelWebhooks

▸ **getChannelWebhooks**(`bot`, `channelId`): `Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`Webhook`](discordeno_bot.Webhook.md)\>\>

Gets a list of webhooks for a channel.

**`Remarks`**

Requires the `MANAGE_WEBHOOKS` permission.

**`See`**

[https://discord.com/developers/docs/resources/webhook#get-channel-webhooks](https://discord.com/developers/docs/resources/webhook#get-channel-webhooks)

#### Parameters

| Name        | Type                                                  | Description                                         |
| :---------- | :---------------------------------------------------- | :-------------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.        |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the channel which to get the webhooks of. |

#### Returns

`Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`Webhook`](discordeno_bot.Webhook.md)\>\>

A collection of [Webhook](discordeno_bot.Webhook.md) objects assorted by webhook ID.

#### Inherited from

DefaultHelpers.getChannelWebhooks

#### Defined in

[packages/bot/src/helpers/webhooks/getChannelWebhooks.ts:18](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/webhooks/getChannelWebhooks.ts#L18)

---

### getChannels

▸ **getChannels**(`bot`, `guildId`): `Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`Channel`](discordeno_bot.Channel.md)\>\>

Gets the list of channels for a guild.

**`Remarks`**

Excludes threads.

**`See`**

[https://discord.com/developers/docs/resources/guild#get-guild-channels](https://discord.com/developers/docs/resources/guild#get-guild-channels)

#### Parameters

| Name      | Type                                                  | Description                                  |
| :-------- | :---------------------------------------------------- | :------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request. |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild to get the channels of.  |

#### Returns

`Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`Channel`](discordeno_bot.Channel.md)\>\>

A collection of [Channel](discordeno_bot.Channel.md) objects assorted by channel ID.

#### Inherited from

DefaultHelpers.getChannels

#### Defined in

[packages/bot/src/helpers/channels/getChannels.ts:18](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/getChannels.ts#L18)

---

### getDmChannel

▸ **getDmChannel**(`bot`, `userId`): `Promise`<[`Channel`](discordeno_bot.Channel.md)\>

Gets or creates a DM channel with a user.

**`See`**

[https://discord.com/developers/docs/resources/user#create-dm](https://discord.com/developers/docs/resources/user#create-dm)

#### Parameters

| Name     | Type                                                  | Description                                       |
| :------- | :---------------------------------------------------- | :------------------------------------------------ |
| `bot`    | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.      |
| `userId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the user to create the DM channel with. |

#### Returns

`Promise`<[`Channel`](discordeno_bot.Channel.md)\>

An instance of [Channel](discordeno_bot.Channel.md).

#### Inherited from

DefaultHelpers.getDmChannel

#### Defined in

[packages/bot/src/helpers/members/getDmChannel.ts:14](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/members/getDmChannel.ts#L14)

---

### getEmoji

▸ **getEmoji**(`bot`, `guildId`, `emojiId`): `Promise`<[`Emoji`](discordeno_bot.Emoji.md)\>

Gets an emoji by its ID.

**`See`**

[https://discord.com/developers/docs/resources/emoji#get-guild-emoji](https://discord.com/developers/docs/resources/emoji#get-guild-emoji)

#### Parameters

| Name      | Type                                                  | Description                                      |
| :-------- | :---------------------------------------------------- | :----------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.     |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild from which to get the emoji. |
| `emojiId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the emoji to get.                      |

#### Returns

`Promise`<[`Emoji`](discordeno_bot.Emoji.md)\>

An instance of [Emoji](discordeno_bot.Emoji.md).

#### Inherited from

DefaultHelpers.getEmoji

#### Defined in

[packages/bot/src/helpers/emojis/getEmoji.ts:15](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/emojis/getEmoji.ts#L15)

---

### getEmojiURL

▸ **getEmojiURL**(`_bot`, `emojiId`, `animated?`): `string`

Builds a URL to an emoji in the Discord CDN.

#### Parameters

| Name       | Type                                                  | Default value | Description                              |
| :--------- | :---------------------------------------------------- | :------------ | :--------------------------------------- |
| `_bot`     | [`Bot`](discordeno_bot.Bot.md)                        | `undefined`   | -                                        |
| `emojiId`  | [`BigString`](../modules/discordeno_bot.md#bigstring) | `undefined`   | The ID of the emoji to access.           |
| `animated` | `boolean`                                             | `false`       | Whether the emoji is animated or static. |

#### Returns

`string`

The link to the resource.

#### Inherited from

DefaultHelpers.getEmojiURL

#### Defined in

[packages/bot/src/helpers/emojis/getEmojiUrl.ts:11](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/emojis/getEmojiUrl.ts#L11)

---

### getEmojis

▸ **getEmojis**(`bot`, `guildId`): `Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`Emoji`](discordeno_bot.Emoji.md)\>\>

Gets the list of emojis for a guild.

**`See`**

[https://discord.com/developers/docs/resources/emoji#list-guild-emojis](https://discord.com/developers/docs/resources/emoji#list-guild-emojis)

#### Parameters

| Name      | Type                                                  | Description                                     |
| :-------- | :---------------------------------------------------- | :---------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.    |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild which to get the emojis of. |

#### Returns

`Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`Emoji`](discordeno_bot.Emoji.md)\>\>

A collection of [Emoji](discordeno_bot.Emoji.md) objects assorted by emoji ID.

#### Inherited from

DefaultHelpers.getEmojis

#### Defined in

[packages/bot/src/helpers/emojis/getEmojis.ts:15](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/emojis/getEmojis.ts#L15)

---

### getFollowupMessage

▸ **getFollowupMessage**(`bot`, `token`, `messageId`): `Promise`<[`Message`](discordeno_bot.Message.md)\>

Gets a follow-up message to an interaction by the ID of the message.

**`Remarks`**

Unlike `getMessage()`, this endpoint allows the bot user to act without:

- Needing to be able to see the contents of the channel that the message is in. (`READ_MESSAGES` permission.)
- Requiring the `MESSAGE_CONTENT` intent.

Does not support ephemeral follow-up messages due to these being stateless.

**`See`**

[https://discord.com/developers/docs/interactions/receiving-and-responding#get-followup-message](https://discord.com/developers/docs/interactions/receiving-and-responding#get-followup-message)

#### Parameters

| Name        | Type                                                  | Description                                                         |
| :---------- | :---------------------------------------------------- | :------------------------------------------------------------------ |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.                        |
| `token`     | `string`                                              | The interaction token to use, provided in the original interaction. |
| `messageId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the message to get.                                       |

#### Returns

`Promise`<[`Message`](discordeno_bot.Message.md)\>

An instance of [Message](discordeno_bot.Message.md).

#### Inherited from

DefaultHelpers.getFollowupMessage

#### Defined in

[packages/bot/src/helpers/interactions/responses/getFollowupMessage.ts:22](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/interactions/responses/getFollowupMessage.ts#L22)

---

### getGatewayBot

▸ **getGatewayBot**(`bot`): `Promise`<[`GetGatewayBot`](discordeno_bot.GetGatewayBot.md)\>

Get the bots Gateway metadata that can help during the operation of large or sharded bots.

#### Parameters

| Name  | Type                           |
| :---- | :----------------------------- |
| `bot` | [`Bot`](discordeno_bot.Bot.md) |

#### Returns

`Promise`<[`GetGatewayBot`](discordeno_bot.GetGatewayBot.md)\>

#### Inherited from

DefaultHelpers.getGatewayBot

#### Defined in

[packages/bot/src/helpers/misc/getGatewayBot.ts:5](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/misc/getGatewayBot.ts#L5)

---

### getGlobalApplicationCommand

▸ **getGlobalApplicationCommand**(`bot`, `commandId`): `Promise`<[`ApplicationCommand`](discordeno_bot.ApplicationCommand.md)\>

Gets a global application command by its ID.

**`See`**

[https://discord.com/developers/docs/interactions/application-commands#get-global-application-command](https://discord.com/developers/docs/interactions/application-commands#get-global-application-command)

#### Parameters

| Name        | Type                                                  | Description                                  |
| :---------- | :---------------------------------------------------- | :------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request. |
| `commandId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the command to get.                |

#### Returns

`Promise`<[`ApplicationCommand`](discordeno_bot.ApplicationCommand.md)\>

An instance of [ApplicationCommand](discordeno_bot.ApplicationCommand.md).

#### Inherited from

DefaultHelpers.getGlobalApplicationCommand

#### Defined in

[packages/bot/src/helpers/interactions/commands/getGlobalApplicationCommand.ts:14](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/interactions/commands/getGlobalApplicationCommand.ts#L14)

---

### getGlobalApplicationCommands

▸ **getGlobalApplicationCommands**(`bot`): `Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`ApplicationCommand`](discordeno_bot.ApplicationCommand.md)\>\>

Gets the list of your bot's global application commands.

**`See`**

[https://discord.com/developers/docs/interactions/application-commands#get-global-application-commands](https://discord.com/developers/docs/interactions/application-commands#get-global-application-commands)

#### Parameters

| Name  | Type                           | Description                                  |
| :---- | :----------------------------- | :------------------------------------------- |
| `bot` | [`Bot`](discordeno_bot.Bot.md) | The bot instance to use to make the request. |

#### Returns

`Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`ApplicationCommand`](discordeno_bot.ApplicationCommand.md)\>\>

A collection of [ApplicationCommand](discordeno_bot.ApplicationCommand.md) objects assorted by command ID.

#### Inherited from

DefaultHelpers.getGlobalApplicationCommands

#### Defined in

[packages/bot/src/helpers/interactions/commands/getGlobalApplicationCommands.ts:16](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/interactions/commands/getGlobalApplicationCommands.ts#L16)

---

### getGuild

▸ **getGuild**(`bot`, `guildId`, `options?`): `Promise`<[`Guild`](discordeno_bot.Guild.md)\>

Gets a guild by its ID.

**`See`**

[https://discord.com/developers/docs/resources/guild#get-guild](https://discord.com/developers/docs/resources/guild#get-guild)

#### Parameters

| Name              | Type                                                  | Description                                   |
| :---------------- | :---------------------------------------------------- | :-------------------------------------------- |
| `bot`             | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.  |
| `guildId`         | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild to get.                   |
| `options`         | `Object`                                              | The parameters for the fetching of the guild. |
| `options.counts?` | `boolean`                                             | -                                             |

#### Returns

`Promise`<[`Guild`](discordeno_bot.Guild.md)\>

An instance of [Guild](discordeno_bot.Guild.md).

#### Inherited from

DefaultHelpers.getGuild

#### Defined in

[packages/bot/src/helpers/guilds/getGuild.ts:15](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/getGuild.ts#L15)

---

### getGuildApplicationCommand

▸ **getGuildApplicationCommand**(`bot`, `commandId`, `guildId`): `Promise`<[`ApplicationCommand`](discordeno_bot.ApplicationCommand.md)\>

Gets a guild application command by its ID.

**`See`**

[https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command](https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command)

#### Parameters

| Name        | Type                                                  | Description                                       |
| :---------- | :---------------------------------------------------- | :------------------------------------------------ |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.      |
| `commandId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the command to get.                     |
| `guildId`   | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild the command is registered in. |

#### Returns

`Promise`<[`ApplicationCommand`](discordeno_bot.ApplicationCommand.md)\>

An instance of [ApplicationCommand](discordeno_bot.ApplicationCommand.md).

#### Inherited from

DefaultHelpers.getGuildApplicationCommand

#### Defined in

[packages/bot/src/helpers/interactions/commands/getGuildApplicationCommand.ts:17](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/interactions/commands/getGuildApplicationCommand.ts#L17)

---

### getGuildApplicationCommands

▸ **getGuildApplicationCommands**(`bot`, `guildId`): `Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`ApplicationCommand`](discordeno_bot.ApplicationCommand.md)\>\>

Gets the list of application commands registered by your bot in a guild.

**`See`**

[https://discord.com/developers/docs/interactions/application-commands#get-global-application-commandss](https://discord.com/developers/docs/interactions/application-commands#get-global-application-commandss)

#### Parameters

| Name      | Type                                                  | Description                                         |
| :-------- | :---------------------------------------------------- | :-------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.        |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild the commands are registered in. |

#### Returns

`Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`ApplicationCommand`](discordeno_bot.ApplicationCommand.md)\>\>

A collection of [ApplicationCommand](discordeno_bot.ApplicationCommand.md) objects assorted by command ID.

#### Inherited from

DefaultHelpers.getGuildApplicationCommands

#### Defined in

[packages/bot/src/helpers/interactions/commands/getGuildApplicationCommands.ts:15](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/interactions/commands/getGuildApplicationCommands.ts#L15)

---

### getGuildBannerURL

▸ **getGuildBannerURL**(`bot`, `guildId`, `options`): `string` \| `undefined`

Builds a URL to the guild banner stored in the Discord CDN.

#### Parameters

| Name              | Type                                                      | Description                                            |
| :---------------- | :-------------------------------------------------------- | :----------------------------------------------------- |
| `bot`             | [`Bot`](discordeno_bot.Bot.md)                            | The bot instance to use to build the URL.              |
| `guildId`         | [`BigString`](../modules/discordeno_bot.md#bigstring)     | The ID of the guild to get the link to the banner for. |
| `options`         | `Object`                                                  | The parameters for the building of the URL.            |
| `options.banner?` | `string` \| `bigint`                                      | -                                                      |
| `options.format?` | [`ImageFormat`](../modules/discordeno_bot.md#imageformat) | -                                                      |
| `options.size?`   | [`ImageSize`](../modules/discordeno_bot.md#imagesize)     | -                                                      |

#### Returns

`string` \| `undefined`

The link to the resource or `undefined` if no banner has been set.

#### Inherited from

DefaultHelpers.getGuildBannerURL

#### Defined in

[packages/bot/src/helpers/guilds/getGuildBannerUrl.ts:15](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/getGuildBannerUrl.ts#L15)

---

### getGuildIconURL

▸ **getGuildIconURL**(`bot`, `guildId`, `imageHash`, `options?`): `string` \| `undefined`

Builds a URL to the guild icon stored in the Discord CDN.

#### Parameters

| Name              | Type                                                                 | Description                                            |
| :---------------- | :------------------------------------------------------------------- | :----------------------------------------------------- |
| `bot`             | [`Bot`](discordeno_bot.Bot.md)                                       | The bot instance to use to build the URL.              |
| `guildId`         | [`BigString`](../modules/discordeno_bot.md#bigstring)                | The ID of the guild to get the link to the banner for. |
| `imageHash`       | `undefined` \| [`BigString`](../modules/discordeno_bot.md#bigstring) | -                                                      |
| `options?`        | `Object`                                                             | The parameters for the building of the URL.            |
| `options.format?` | [`ImageFormat`](../modules/discordeno_bot.md#imageformat)            | -                                                      |
| `options.size?`   | [`ImageSize`](../modules/discordeno_bot.md#imagesize)                | -                                                      |

#### Returns

`string` \| `undefined`

The link to the resource or `undefined` if no banner has been set.

#### Inherited from

DefaultHelpers.getGuildIconURL

#### Defined in

[packages/bot/src/helpers/guilds/getGuildIconUrl.ts:13](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/getGuildIconUrl.ts#L13)

---

### getGuildPreview

▸ **getGuildPreview**(`bot`, `guildId`): `Promise`<[`GuildPreview`](discordeno_bot.GuildPreview.md)\>

Gets the preview of a guild by a guild's ID.

**`Remarks`**

If the bot user is not in the guild, the guild must be lurkable.

**`See`**

[https://discord.com/developers/docs/resources/guild#get-guild-preview](https://discord.com/developers/docs/resources/guild#get-guild-preview)

#### Parameters

| Name      | Type                                                  | Description                                  |
| :-------- | :---------------------------------------------------- | :------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request. |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild to get the preview of.   |

#### Returns

`Promise`<[`GuildPreview`](discordeno_bot.GuildPreview.md)\>

An instance of [GuildPreview](discordeno_bot.GuildPreview.md).

#### Inherited from

DefaultHelpers.getGuildPreview

#### Defined in

[packages/bot/src/helpers/guilds/getGuildPreview.ts:34](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/getGuildPreview.ts#L34)

---

### getGuildSplashURL

▸ **getGuildSplashURL**(`bot`, `guildId`, `imageHash`, `options?`): `string` \| `undefined`

Builds the URL to a guild splash stored in the Discord CDN.

#### Parameters

| Name              | Type                                                                 | Description                                 |
| :---------------- | :------------------------------------------------------------------- | :------------------------------------------ |
| `bot`             | [`Bot`](discordeno_bot.Bot.md)                                       | The bot instance to use to build the URL.   |
| `guildId`         | [`BigString`](../modules/discordeno_bot.md#bigstring)                | The ID of the guild to get the splash of.   |
| `imageHash`       | `undefined` \| [`BigString`](../modules/discordeno_bot.md#bigstring) | The hash identifying the splash image.      |
| `options?`        | `Object`                                                             | The parameters for the building of the URL. |
| `options.format?` | [`ImageFormat`](../modules/discordeno_bot.md#imageformat)            | -                                           |
| `options.size?`   | [`ImageSize`](../modules/discordeno_bot.md#imagesize)                | -                                           |

#### Returns

`string` \| `undefined`

The link to the resource or `undefined` if the guild does not have a splash image set.

#### Inherited from

DefaultHelpers.getGuildSplashURL

#### Defined in

[packages/bot/src/helpers/guilds/getGuildSplashUrl.ts:14](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/getGuildSplashUrl.ts#L14)

---

### getGuildSticker

▸ **getGuildSticker**(`bot`, `guildId`, `stickerId`): `Promise`<[`Sticker`](discordeno_bot.Sticker.md)\>

Returns a sticker object for the given guild and sticker IDs.

**`Remarks`**

Includes the user field if the bot has the `MANAGE_EMOJIS_AND_STICKERS` permission.

**`See`**

[https://discord.com/developers/docs/resources/sticker#get-guild-sticker](https://discord.com/developers/docs/resources/sticker#get-guild-sticker)

#### Parameters

| Name        | Type                           | Description                                  |
| :---------- | :----------------------------- | :------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md) | The bot instance to use to make the request. |
| `guildId`   | `bigint`                       | The ID of the guild to get                   |
| `stickerId` | `bigint`                       | The ID of the sticker to get                 |

#### Returns

`Promise`<[`Sticker`](discordeno_bot.Sticker.md)\>

A [Sticker](discordeno_bot.Sticker.md)

#### Inherited from

DefaultHelpers.getGuildSticker

#### Defined in

[packages/bot/src/helpers/stickers/getGuildSticker.ts:15](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/stickers/getGuildSticker.ts#L15)

---

### getGuildStickers

▸ **getGuildStickers**(`bot`, `guildId`): `Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`Sticker`](discordeno_bot.Sticker.md)\>\>

Returns an array of sticker objects for the given guild.

**`Remarks`**

Includes user fields if the bot has the `MANAGE_EMOJIS_AND_STICKERS` permission.

**`See`**

[https://discord.com/developers/docs/resources/sticker#list-guild-stickers](https://discord.com/developers/docs/resources/sticker#list-guild-stickers)

#### Parameters

| Name      | Type                           | Description                                  |
| :-------- | :----------------------------- | :------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md) | The bot instance to use to make the request. |
| `guildId` | `bigint`                       | The ID of the guild to get                   |

#### Returns

`Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`Sticker`](discordeno_bot.Sticker.md)\>\>

A collection of [Sticker](discordeno_bot.Sticker.md) objects assorted by sticker ID.

#### Inherited from

DefaultHelpers.getGuildStickers

#### Defined in

[packages/bot/src/helpers/stickers/getGuildStickers.ts:17](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/stickers/getGuildStickers.ts#L17)

---

### getGuildTemplate

▸ **getGuildTemplate**(`bot`, `templateCode`): `Promise`<[`Template`](discordeno_bot.Template.md)\>

Gets a template by its code.

**`Remarks`**

Requires the `MANAGE_GUILD` permission.

**`See`**

[https://discord.com/developers/docs/resources/guild-template#get-guild-template](https://discord.com/developers/docs/resources/guild-template#get-guild-template)

#### Parameters

| Name           | Type                           | Description                                  |
| :------------- | :----------------------------- | :------------------------------------------- |
| `bot`          | [`Bot`](discordeno_bot.Bot.md) | The bot instance to use to make the request. |
| `templateCode` | `string`                       | The code of the template to get.             |

#### Returns

`Promise`<[`Template`](discordeno_bot.Template.md)\>

An instance of [Template](discordeno_bot.Template.md).

#### Inherited from

DefaultHelpers.getGuildTemplate

#### Defined in

[packages/bot/src/helpers/templates/getGuildTemplate.ts:17](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/templates/getGuildTemplate.ts#L17)

---

### getGuildTemplates

▸ **getGuildTemplates**(`bot`, `guildId`): `Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`string`, [`Template`](discordeno_bot.Template.md)\>\>

Gets the list of templates for a guild.

**`Remarks`**

Requires the `MANAGE_GUILD` permission.

**`See`**

[https://discord.com/developers/docs/resources/guild-template#get-guild-templates](https://discord.com/developers/docs/resources/guild-template#get-guild-templates)

#### Parameters

| Name      | Type                                                  | Description                                           |
| :-------- | :---------------------------------------------------- | :---------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.          |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild to get the list of templates for. |

#### Returns

`Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`string`, [`Template`](discordeno_bot.Template.md)\>\>

A collection of [Template](discordeno_bot.Template.md) objects assorted by template code.

#### Inherited from

DefaultHelpers.getGuildTemplates

#### Defined in

[packages/bot/src/helpers/templates/getGuildTemplates.ts:18](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/templates/getGuildTemplates.ts#L18)

---

### getGuildWebhooks

▸ **getGuildWebhooks**(`bot`, `guildId`): `Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`Webhook`](discordeno_bot.Webhook.md)\>\>

Gets the list of webhooks for a guild.

**`Remarks`**

Requires the `MANAGE_WEBHOOKS` permission.

**`See`**

[https://discord.com/developers/docs/resources/webhook#get-guild-webhooks](https://discord.com/developers/docs/resources/webhook#get-guild-webhooks)

#### Parameters

| Name      | Type                                                  | Description                                          |
| :-------- | :---------------------------------------------------- | :--------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.         |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild to get the list of webhooks for. |

#### Returns

`Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`Webhook`](discordeno_bot.Webhook.md)\>\>

A collection of [Webhook](discordeno_bot.Webhook.md) objects assorted by webhook ID.

#### Inherited from

DefaultHelpers.getGuildWebhooks

#### Defined in

[packages/bot/src/helpers/webhooks/getGuildWebhooks.ts:18](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/webhooks/getGuildWebhooks.ts#L18)

---

### getIntegrations

▸ **getIntegrations**(`bot`, `guildId`): `Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`Integration`](discordeno_bot.Integration.md)\>\>

Gets the list of integrations attached to a guild.

**`Remarks`**

Requires the `MANAGE_GUILD` permission.

**`See`**

[https://discord.com/developers/docs/resources/guild#get-guild-integrations](https://discord.com/developers/docs/resources/guild#get-guild-integrations)

#### Parameters

| Name      | Type                                                  | Description                                               |
| :-------- | :---------------------------------------------------- | :-------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.              |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild to get the list of integrations from. |

#### Returns

`Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`Integration`](discordeno_bot.Integration.md)\>\>

A collection of [Integration](discordeno_bot.Integration.md) objects assorted by integration ID.

#### Inherited from

DefaultHelpers.getIntegrations

#### Defined in

[packages/bot/src/helpers/guilds/integrations/getIntegrations.ts:18](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/integrations/getIntegrations.ts#L18)

---

### getInvite

▸ **getInvite**(`bot`, `inviteCode`, `options?`): `Promise`<[`BaseInvite`](discordeno_bot.BaseInvite.md)\>

Gets an invite to a channel by its invite code.

**`See`**

[https://discord.com/developers/docs/resources/invite#get-invite](https://discord.com/developers/docs/resources/invite#get-invite)

#### Parameters

| Name         | Type                                       | Description                                    |
| :----------- | :----------------------------------------- | :--------------------------------------------- |
| `bot`        | [`Bot`](discordeno_bot.Bot.md)             | The bot instance to use to make the request.   |
| `inviteCode` | `string`                                   | The invite code of the invite to get.          |
| `options?`   | [`GetInvite`](discordeno_bot.GetInvite.md) | The parameters for the fetching of the invite. |

#### Returns

`Promise`<[`BaseInvite`](discordeno_bot.BaseInvite.md)\>

An instance of [Invite](discordeno_bot.BaseInvite.md).

#### Inherited from

DefaultHelpers.getInvite

#### Defined in

[packages/bot/src/helpers/guilds/invites/getInvite.ts:37](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/invites/getInvite.ts#L37)

---

### getInvites

▸ **getInvites**(`bot`, `guildId`): `Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`string`, [`InviteMetadata`](../modules/discordeno_bot.md#invitemetadata)\>\>

Gets the list of invites for a guild.

**`Remarks`**

Requires the `MANAGE_GUILD` permission.

**`See`**

[https://discord.com/developers/docs/resources/invite#get-invites](https://discord.com/developers/docs/resources/invite#get-invites)

#### Parameters

| Name      | Type                                                  | Description                                  |
| :-------- | :---------------------------------------------------- | :------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request. |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild to get the invites from. |

#### Returns

`Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`string`, [`InviteMetadata`](../modules/discordeno_bot.md#invitemetadata)\>\>

A collection of [Invite](../modules/discordeno_bot.md#invitemetadata) objects assorted by invite code.

#### Inherited from

DefaultHelpers.getInvites

#### Defined in

[packages/bot/src/helpers/guilds/invites/getInvites.ts:18](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/invites/getInvites.ts#L18)

---

### getMember

▸ **getMember**(`bot`, `guildId`, `userId`): `Promise`<[`Member`](discordeno_bot.Member.md)\>

Gets the member object by user ID.

**`See`**

[https://discord.com/developers/docs/resources/guild#get-guild-member](https://discord.com/developers/docs/resources/guild#get-guild-member)

#### Parameters

| Name      | Type                                                  | Description                                       |
| :-------- | :---------------------------------------------------- | :------------------------------------------------ |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.      |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild to get the member object for. |
| `userId`  | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the user to get the member object for.  |

#### Returns

`Promise`<[`Member`](discordeno_bot.Member.md)\>

An instance of [Member](discordeno_bot.Member.md).

#### Inherited from

DefaultHelpers.getMember

#### Defined in

[packages/bot/src/helpers/members/getMember.ts:15](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/members/getMember.ts#L15)

---

### getMembers

▸ **getMembers**(`bot`, `guildId`, `options`): `Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`Member`](discordeno_bot.Member.md)\>\>

Gets the list of members for a guild.

**`Remarks`**

Requires the `GUILD_MEMBERS` intent.

⚠️ It is not recommended to use this endpoint with very large bots. Instead, opt to use `fetchMembers()`:
REST communication only permits 50 requests to be made per second, while gateways allow for up to 120 requests
per minute per shard. For more information, read [https://discord.com/developers/docs/topics/rate-limits#rate-limits](https://discord.com/developers/docs/topics/rate-limits#rate-limits).

**`See`**

- [https://discord.com/developers/docs/resources/guild#list-guild-members](https://discord.com/developers/docs/resources/guild#list-guild-members)
- [https://discord.com/developers/docs/topics/gateway#request-guild-members](https://discord.com/developers/docs/topics/gateway#request-guild-members)
- [https://discord.com/developers/docs/topics/rate-limits#rate-limits](https://discord.com/developers/docs/topics/rate-limits#rate-limits)

#### Parameters

| Name      | Type                                                     | Description                                         |
| :-------- | :------------------------------------------------------- | :-------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                           | The bot instance to use to make the request.        |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring)    | The ID of the guild to get the list of members for. |
| `options` | [`ListGuildMembers`](discordeno_bot.ListGuildMembers.md) | The parameters for the fetching of the members.     |

#### Returns

`Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`Member`](discordeno_bot.Member.md)\>\>

A collection of [Member](discordeno_bot.Member.md) objects assorted by user ID.

#### Inherited from

DefaultHelpers.getMembers

#### Defined in

[packages/bot/src/helpers/members/getMembers.ts:27](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/members/getMembers.ts#L27)

---

### getMessage

▸ **getMessage**(`bot`, `channelId`, `messageId`): `Promise`<[`Message`](discordeno_bot.Message.md)\>

Gets a message from a channel by the ID of the message.

**`Remarks`**

Requires that the bot user be able to see the contents of the channel in which the message was posted.

If getting a message from a guild channel:

- Requires the `READ_MESSAGE_HISTORY` permission.

**`See`**

[https://discord.com/developers/docs/resources/channel#get-channel-message](https://discord.com/developers/docs/resources/channel#get-channel-message)

#### Parameters

| Name        | Type                                                  | Description                                          |
| :---------- | :---------------------------------------------------- | :--------------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.         |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the channel from which to get the message. |
| `messageId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the message to get.                        |

#### Returns

`Promise`<[`Message`](discordeno_bot.Message.md)\>

An instance of [Message](discordeno_bot.Message.md).

#### Inherited from

DefaultHelpers.getMessage

#### Defined in

[packages/bot/src/helpers/messages/getMessage.ts:21](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/getMessage.ts#L21)

---

### getMessages

▸ **getMessages**(`bot`, `channelId`, `options?`): `Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`Message`](discordeno_bot.Message.md)\>\>

Gets multiple messages from a channel.

**`Remarks`**

Requires that the bot user be able to see the contents of the channel in which the messages were posted.

If getting a messages from a guild channel:

- Requires the `READ_MESSAGE_HISTORY` permission.

**`See`**

[https://discord.com/developers/docs/resources/channel#get-channel-messages](https://discord.com/developers/docs/resources/channel#get-channel-messages)

#### Parameters

| Name        | Type                                                                    | Description                                           |
| :---------- | :---------------------------------------------------------------------- | :---------------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                                          | The bot instance to use to make the request.          |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring)                   | The ID of the channel from which to get the messages. |
| `options?`  | [`GetMessagesOptions`](../modules/discordeno_bot.md#getmessagesoptions) | The parameters for the fetching of the messages.      |

#### Returns

`Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`Message`](discordeno_bot.Message.md)\>\>

A collection of [Message](discordeno_bot.Message.md) objects assorted by message ID.

#### Inherited from

DefaultHelpers.getMessages

#### Defined in

[packages/bot/src/helpers/messages/getMessages.ts:23](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/getMessages.ts#L23)

---

### getNitroStickerPacks

▸ **getNitroStickerPacks**(`bot`): `Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`StickerPack`](discordeno_bot.StickerPack.md)\>\>

Returns the list of sticker packs available to Nitro subscribers.

**`See`**

[https://discord.com/developers/docs/resources/sticker#list-nitro-sticker-packs](https://discord.com/developers/docs/resources/sticker#list-nitro-sticker-packs)

#### Parameters

| Name  | Type                           | Description                                  |
| :---- | :----------------------------- | :------------------------------------------- |
| `bot` | [`Bot`](discordeno_bot.Bot.md) | The bot instance to use to make the request. |

#### Returns

`Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`StickerPack`](discordeno_bot.StickerPack.md)\>\>

A collection of [StickerPack](discordeno_bot.StickerPack.md) objects assorted by sticker ID.

#### Inherited from

DefaultHelpers.getNitroStickerPacks

#### Defined in

[packages/bot/src/helpers/misc/getNitroStickerPacks.ts:14](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/misc/getNitroStickerPacks.ts#L14)

---

### getOriginalInteractionResponse

▸ **getOriginalInteractionResponse**(`bot`, `token`): `Promise`<[`Message`](discordeno_bot.Message.md)\>

Gets the initial message response to an interaction.

**`Remarks`**

Unlike `getMessage()`, this endpoint allows the bot user to act without:

- Needing to be able to see the contents of the channel that the message is in. (`READ_MESSAGES` permission.)
- Requiring the `MESSAGE_CONTENT` intent.

Does not support ephemeral follow-up messages due to these being stateless.

**`See`**

[https://discord.com/developers/docs/interactions/receiving-and-responding#get-original-interaction-response](https://discord.com/developers/docs/interactions/receiving-and-responding#get-original-interaction-response)

#### Parameters

| Name    | Type                           | Description                                                         |
| :------ | :----------------------------- | :------------------------------------------------------------------ |
| `bot`   | [`Bot`](discordeno_bot.Bot.md) | The bot instance to use to make the request.                        |
| `token` | `string`                       | The interaction token to use, provided in the original interaction. |

#### Returns

`Promise`<[`Message`](discordeno_bot.Message.md)\>

An instance of [Message](discordeno_bot.Message.md).

#### Inherited from

DefaultHelpers.getOriginalInteractionResponse

#### Defined in

[packages/bot/src/helpers/interactions/responses/getOriginalInteractionResponse.ts:21](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/interactions/responses/getOriginalInteractionResponse.ts#L21)

---

### getPinnedMessages

▸ **getPinnedMessages**(`bot`, `channelId`): `Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`Message`](discordeno_bot.Message.md)\>\>

Gets the pinned messages for a channel.

**`Remarks`**

Requires that the bot user be able to see the contents of the channel in which the messages were posted.

If getting a message from a guild channel:

- Requires the `READ_MESSAGE_HISTORY` permission.

**`See`**

[https://discord.com/developers/docs/resources/channel#get-pinned-messages](https://discord.com/developers/docs/resources/channel#get-pinned-messages)

#### Parameters

| Name        | Type                                                  | Description                                           |
| :---------- | :---------------------------------------------------- | :---------------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.          |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the channel to get the pinned messages for. |

#### Returns

`Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`Message`](discordeno_bot.Message.md)\>\>

A collection of [Message](discordeno_bot.Message.md) objects assorted by message ID.

#### Inherited from

DefaultHelpers.getPinnedMessages

#### Defined in

[packages/bot/src/helpers/messages/getPinnedMessages.ts:21](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/getPinnedMessages.ts#L21)

---

### getPrivateArchivedThreads

▸ **getPrivateArchivedThreads**(`bot`, `channelId`, `options?`): `Promise`<[`ArchivedThreads`](../modules/discordeno_bot.md#archivedthreads)\>

Gets the list of private archived threads for a channel.

**`Remarks`**

Requires the `READ_MESSAGE_HISTORY` permission.
Requires the `MANAGE_THREADS` permission.

Returns threads of type ChannelTypes.GuildPrivateThread.

Threads are ordered by the `archive_timestamp` property included in the metadata of the object in descending order.

**`See`**

[https://discord.com/developers/docs/resources/channel#list-private-archived-threads](https://discord.com/developers/docs/resources/channel#list-private-archived-threads)

#### Parameters

| Name        | Type                                                           | Description                                            |
| :---------- | :------------------------------------------------------------- | :----------------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                                 | The bot instance to use to make the request.           |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring)          | The ID of the channel to get the archived threads for. |
| `options?`  | [`ListArchivedThreads`](discordeno_bot.ListArchivedThreads.md) | The parameters for the fetching of threads.            |

#### Returns

`Promise`<[`ArchivedThreads`](../modules/discordeno_bot.md#archivedthreads)\>

An instance of [ArchivedThreads](../modules/discordeno_bot.md#archivedthreads).

#### Inherited from

DefaultHelpers.getPrivateArchivedThreads

#### Defined in

[packages/bot/src/helpers/channels/threads/getPrivateArchivedThreads.ts:24](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/threads/getPrivateArchivedThreads.ts#L24)

---

### getPrivateJoinedArchivedThreads

▸ **getPrivateJoinedArchivedThreads**(`bot`, `channelId`, `options?`): `Promise`<[`ArchivedThreads`](../modules/discordeno_bot.md#archivedthreads)\>

Gets the list of private archived threads the bot is a member of for a channel.

**`Remarks`**

Requires the `READ_MESSAGE_HISTORY` permission.

Returns threads of type ChannelTypes.GuildPrivateThread.

Threads are ordered by the `id` property in descending order.

**`See`**

[https://discord.com/developers/docs/resources/channel#list-joined-private-archived-threads](https://discord.com/developers/docs/resources/channel#list-joined-private-archived-threads)

#### Parameters

| Name        | Type                                                           | Description                                            |
| :---------- | :------------------------------------------------------------- | :----------------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                                 | The bot instance to use to make the request.           |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring)          | The ID of the channel to get the archived threads for. |
| `options?`  | [`ListArchivedThreads`](discordeno_bot.ListArchivedThreads.md) | The parameters for the fetching of threads.            |

#### Returns

`Promise`<[`ArchivedThreads`](../modules/discordeno_bot.md#archivedthreads)\>

An instance of [ArchivedThreads](../modules/discordeno_bot.md#archivedthreads).

#### Inherited from

DefaultHelpers.getPrivateJoinedArchivedThreads

#### Defined in

[packages/bot/src/helpers/channels/threads/getPrivateJoinedArchivedThreads.ts:23](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/threads/getPrivateJoinedArchivedThreads.ts#L23)

---

### getPruneCount

▸ **getPruneCount**(`bot`, `guildId`, `options?`): `Promise`<`number`\>

Gets the number of members that would be kicked from a guild during pruning.

**`Remarks`**

Requires the `KICK_MEMBERS` permission.

**`See`**

[https://discord.com/developers/docs/resources/guild#get-guild-prune-count](https://discord.com/developers/docs/resources/guild#get-guild-prune-count)

#### Parameters

| Name       | Type                                                                   | Description                                         |
| :--------- | :--------------------------------------------------------------------- | :-------------------------------------------------- |
| `bot`      | [`Bot`](discordeno_bot.Bot.md)                                         | The bot instance used to make the request           |
| `guildId`  | [`BigString`](../modules/discordeno_bot.md#bigstring)                  | The ID of the guild to get the prune count of.      |
| `options?` | [`GetGuildPruneCountQuery`](discordeno_bot.GetGuildPruneCountQuery.md) | The parameters for the fetching of the prune count. |

#### Returns

`Promise`<`number`\>

A number indicating the number of members that would be kicked.

#### Inherited from

DefaultHelpers.getPruneCount

#### Defined in

[packages/bot/src/helpers/guilds/getPruneCount.ts:21](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/getPruneCount.ts#L21)

---

### getPublicArchivedThreads

▸ **getPublicArchivedThreads**(`bot`, `channelId`, `options?`): `Promise`<[`ArchivedThreads`](../modules/discordeno_bot.md#archivedthreads)\>

Gets the list of public archived threads for a channel.

**`Remarks`**

Requires the `READ_MESSAGE_HISTORY` permission.

If called on a channel of type [GuildText](../enums/discordeno_bot.ChannelTypes.md#guildtext), returns threads of type ChannelTypes.GuildPublicThread.
If called on a channel of type ChannelTypes.GuildNews, returns threads of type ChannelTypes.GuildNewsThread.

Threads are ordered by the `archive_timestamp` property included in the metadata of the object in descending order.

**`See`**

[https://discord.com/developers/docs/resources/channel#list-public-archived-threads](https://discord.com/developers/docs/resources/channel#list-public-archived-threads)

#### Parameters

| Name        | Type                                                           | Description                                            |
| :---------- | :------------------------------------------------------------- | :----------------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                                 | The bot instance to use to make the request.           |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring)          | The ID of the channel to get the archived threads for. |
| `options?`  | [`ListArchivedThreads`](discordeno_bot.ListArchivedThreads.md) | The parameters for the fetching of threads.            |

#### Returns

`Promise`<[`ArchivedThreads`](../modules/discordeno_bot.md#archivedthreads)\>

An instance of [ArchivedThreads](../modules/discordeno_bot.md#archivedthreads).

#### Inherited from

DefaultHelpers.getPublicArchivedThreads

#### Defined in

[packages/bot/src/helpers/channels/threads/getPublicArchivedThreads.ts:24](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/threads/getPublicArchivedThreads.ts#L24)

---

### getReactions

▸ **getReactions**(`bot`, `channelId`, `messageId`, `reaction`, `options?`): `Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`User`](discordeno_bot.User.md)\>\>

Gets the list of users that reacted with an emoji to a message.

**`See`**

[https://discord.com/developers/docs/resources/channel#get-reactions](https://discord.com/developers/docs/resources/channel#get-reactions)

#### Parameters

| Name        | Type                                                  | Description                                                   |
| :---------- | :---------------------------------------------------- | :------------------------------------------------------------ |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.                  |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the channel the message to get the users for is in. |
| `messageId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the message to get the users for.                   |
| `reaction`  | `string`                                              | The reaction for which to get the users.                      |
| `options?`  | [`GetReactions`](discordeno_bot.GetReactions.md)      | The parameters for the fetching of the users.                 |

#### Returns

`Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`User`](discordeno_bot.User.md)\>\>

A collection of [User](discordeno_bot.User.md) objects assorted by user ID.

#### Inherited from

DefaultHelpers.getReactions

#### Defined in

[packages/bot/src/helpers/messages/reactions/getReactions.ts:19](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/reactions/getReactions.ts#L19)

---

### getRoles

▸ **getRoles**(`bot`, `guildId`): `Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`Role`](discordeno_bot.Role.md)\>\>

Gets the list of roles for a guild.

**`Remarks`**

⚠️ This endpoint should be used sparingly due to [User](discordeno_bot.User.md) objects already being included in guild payloads.

**`See`**

[https://discord.com/developers/docs/resources/guild#get-guild-roles](https://discord.com/developers/docs/resources/guild#get-guild-roles)

#### Parameters

| Name      | Type                                                  | Description                                       |
| :-------- | :---------------------------------------------------- | :------------------------------------------------ |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.      |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild to get the list of roles for. |

#### Returns

`Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`Role`](discordeno_bot.Role.md)\>\>

A collection of [Role](discordeno_bot.Role.md) objects assorted by role ID.

#### Inherited from

DefaultHelpers.getRoles

#### Defined in

[packages/bot/src/helpers/roles/getRoles.ts:18](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/roles/getRoles.ts#L18)

---

### getScheduledEvent

▸ **getScheduledEvent**(`bot`, `guildId`, `eventId`, `options?`): `Promise`<[`ScheduledEvent`](discordeno_bot.ScheduledEvent.md)\>

Gets a scheduled event by its ID.

**`See`**

[https://discord.com/developers/docs/resources/guild-scheduled-event#get-guild-scheduled-event](https://discord.com/developers/docs/resources/guild-scheduled-event#get-guild-scheduled-event)

#### Parameters

| Name                     | Type                                                  | Description                                             |
| :----------------------- | :---------------------------------------------------- | :------------------------------------------------------ |
| `bot`                    | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.            |
| `guildId`                | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild to get the scheduled event from.    |
| `eventId`                | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the scheduled event to get.                   |
| `options?`               | `Object`                                              | The parameters for the fetching of the scheduled event. |
| `options.withUserCount?` | `boolean`                                             | -                                                       |

#### Returns

`Promise`<[`ScheduledEvent`](discordeno_bot.ScheduledEvent.md)\>

An instance of [ScheduledEvent](discordeno_bot.ScheduledEvent.md).

#### Inherited from

DefaultHelpers.getScheduledEvent

#### Defined in

[packages/bot/src/helpers/guilds/events/getScheduledEvent.ts:16](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/events/getScheduledEvent.ts#L16)

---

### getScheduledEventUsers

▸ **getScheduledEventUsers**(`bot`, `guildId`, `eventId`, `options?`): `Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`User`](discordeno_bot.User.md)\>\>

Gets the list of subscribers to a scheduled event from a guild.

**`Remarks`**

Requires the `MANAGE_EVENTS` permission.

Users are ordered by their IDs in _ascending_ order.

**`See`**

[https://discord.com/developers/docs/resources/guild-scheduled-event#get-guild-scheduled-event-users](https://discord.com/developers/docs/resources/guild-scheduled-event#get-guild-scheduled-event-users)

#### Parameters

| Name       | Type                                                                                              | Description                                                             |
| :--------- | :------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------- |
| `bot`      | [`Bot`](discordeno_bot.Bot.md)                                                                    | The bot instance to use to make the request.                            |
| `guildId`  | [`BigString`](../modules/discordeno_bot.md#bigstring)                                             | The ID of the guild to get the subscribers to the scheduled event from. |
| `eventId`  | [`BigString`](../modules/discordeno_bot.md#bigstring)                                             | The ID of the scheduled event to get the subscribers of.                |
| `options?` | [`GetScheduledEventUsers`](discordeno_bot.GetScheduledEventUsers.md) & { `withMember?`: `false` } | The parameters for the fetching of the subscribers.                     |

#### Returns

`Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`User`](discordeno_bot.User.md)\>\>

A collection of [User](discordeno_bot.User.md) objects assorted by user ID.

#### Inherited from

DefaultHelpers.getScheduledEventUsers

#### Defined in

[packages/bot/src/helpers/guilds/events/getScheduledEventUsers.ts:25](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/events/getScheduledEventUsers.ts#L25)

▸ **getScheduledEventUsers**(`bot`, `guildId`, `eventId`, `options?`): `Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, { `member`: [`Member`](discordeno_bot.Member.md) ; `user`: [`User`](discordeno_bot.User.md) }\>\>

#### Parameters

| Name       | Type                                                                                            |
| :--------- | :---------------------------------------------------------------------------------------------- |
| `bot`      | [`Bot`](discordeno_bot.Bot.md)                                                                  |
| `guildId`  | [`BigString`](../modules/discordeno_bot.md#bigstring)                                           |
| `eventId`  | [`BigString`](../modules/discordeno_bot.md#bigstring)                                           |
| `options?` | [`GetScheduledEventUsers`](discordeno_bot.GetScheduledEventUsers.md) & { `withMember`: `true` } |

#### Returns

`Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, { `member`: [`Member`](discordeno_bot.Member.md) ; `user`: [`User`](discordeno_bot.User.md) }\>\>

#### Inherited from

DefaultHelpers.getScheduledEventUsers

#### Defined in

[packages/bot/src/helpers/guilds/events/getScheduledEventUsers.ts:31](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/events/getScheduledEventUsers.ts#L31)

---

### getScheduledEvents

▸ **getScheduledEvents**(`bot`, `guildId`, `options?`): `Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`ScheduledEvent`](discordeno_bot.ScheduledEvent.md)\>\>

Gets the list of scheduled events for a guild.

**`See`**

[https://discord.com/developers/docs/resources/guild-scheduled-event#list-scheduled-events-for-guild](https://discord.com/developers/docs/resources/guild-scheduled-event#list-scheduled-events-for-guild)

#### Parameters

| Name       | Type                                                         | Description                                              |
| :--------- | :----------------------------------------------------------- | :------------------------------------------------------- |
| `bot`      | [`Bot`](discordeno_bot.Bot.md)                               | The bot instance to use to make the request.             |
| `guildId`  | [`BigString`](../modules/discordeno_bot.md#bigstring)        | The ID of the guild to get the scheduled events from.    |
| `options?` | [`GetScheduledEvents`](discordeno_bot.GetScheduledEvents.md) | The parameters for the fetching of the scheduled events. |

#### Returns

`Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`ScheduledEvent`](discordeno_bot.ScheduledEvent.md)\>\>

A collection of [ScheduledEvent](discordeno_bot.ScheduledEvent.md) objects assorted by event ID.

#### Inherited from

DefaultHelpers.getScheduledEvents

#### Defined in

[packages/bot/src/helpers/guilds/events/getScheduledEvents.ts:16](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/events/getScheduledEvents.ts#L16)

---

### getStageInstance

▸ **getStageInstance**(`bot`, `channelId`): `Promise`<[`StageInstance`](discordeno_bot.StageInstance.md)\>

Gets the stage instance associated with a stage channel, if one exists.

**`See`**

[https://discord.com/developers/docs/resources/stage-instance#get-stage-instance](https://discord.com/developers/docs/resources/stage-instance#get-stage-instance)

#### Parameters

| Name        | Type                                                  | Description                                                        |
| :---------- | :---------------------------------------------------- | :----------------------------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.                       |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the stage channel the stage instance is associated with. |

#### Returns

`Promise`<[`StageInstance`](discordeno_bot.StageInstance.md)\>

An instance of [StageInstance](discordeno_bot.StageInstance.md).

#### Inherited from

DefaultHelpers.getStageInstance

#### Defined in

[packages/bot/src/helpers/channels/stages/getStageInstance.ts:14](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/stages/getStageInstance.ts#L14)

---

### getSticker

▸ **getSticker**(`bot`, `stickerId`): `Promise`<[`Sticker`](discordeno_bot.Sticker.md)\>

Returns a sticker object for the given sticker ID.

**`See`**

[https://discord.com/developers/docs/resources/sticker#get-sticker](https://discord.com/developers/docs/resources/sticker#get-sticker)

#### Parameters

| Name        | Type                           | Description                                  |
| :---------- | :----------------------------- | :------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md) | The bot instance to use to make the request. |
| `stickerId` | `bigint`                       | The ID of the sticker to get                 |

#### Returns

`Promise`<[`Sticker`](discordeno_bot.Sticker.md)\>

A [Sticker](discordeno_bot.Sticker.md)

#### Inherited from

DefaultHelpers.getSticker

#### Defined in

[packages/bot/src/helpers/stickers/getSticker.ts:14](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/stickers/getSticker.ts#L14)

---

### getThreadMember

▸ **getThreadMember**(`bot`, `channelId`, `userId`): `Promise`<[`ThreadMember`](discordeno_bot.ThreadMember.md)\>

Gets a thread member by their user ID.

**`See`**

[https://discord.com/developers/docs/resources/channel#get-thread-member](https://discord.com/developers/docs/resources/channel#get-thread-member)

#### Parameters

| Name        | Type                                                  | Description                                       |
| :---------- | :---------------------------------------------------- | :------------------------------------------------ |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.      |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the thread to get the thread member of. |
| `userId`    | [`BigString`](../modules/discordeno_bot.md#bigstring) | The user ID of the thread member to get.          |

#### Returns

`Promise`<[`ThreadMember`](discordeno_bot.ThreadMember.md)\>

An instance of [ThreadMember](discordeno_bot.ThreadMember.md).

#### Inherited from

DefaultHelpers.getThreadMember

#### Defined in

[packages/bot/src/helpers/channels/threads/getThreadMember.ts:15](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/threads/getThreadMember.ts#L15)

---

### getThreadMembers

▸ **getThreadMembers**(`bot`, `channelId`): `Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`ThreadMember`](discordeno_bot.ThreadMember.md)\>\>

Gets the list of thread members for a thread.

**`Remarks`**

Requires the application to have the `GUILD_MEMBERS` privileged intent enabled.

**`See`**

[https://discord.com/developers/docs/resources/channel#list-thread-members](https://discord.com/developers/docs/resources/channel#list-thread-members)

#### Parameters

| Name        | Type                                                  | Description                                        |
| :---------- | :---------------------------------------------------- | :------------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.       |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the thread to get the thread members of. |

#### Returns

`Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`ThreadMember`](discordeno_bot.ThreadMember.md)\>\>

A collection of [ThreadMember](discordeno_bot.ThreadMember.md) assorted by user ID.

#### Inherited from

DefaultHelpers.getThreadMembers

#### Defined in

[packages/bot/src/helpers/channels/threads/getThreadMembers.ts:18](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/threads/getThreadMembers.ts#L18)

---

### getUser

▸ **getUser**(`bot`, `userId`): `Promise`<[`User`](discordeno_bot.User.md)\>

This function will return the raw user payload in the rare cases you need to fetch a user directly from the API.

#### Parameters

| Name     | Type                                                  |
| :------- | :---------------------------------------------------- |
| `bot`    | [`Bot`](discordeno_bot.Bot.md)                        |
| `userId` | [`BigString`](../modules/discordeno_bot.md#bigstring) |

#### Returns

`Promise`<[`User`](discordeno_bot.User.md)\>

#### Inherited from

DefaultHelpers.getUser

#### Defined in

[packages/bot/src/helpers/misc/getUser.ts:6](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/misc/getUser.ts#L6)

---

### getVanityUrl

▸ **getVanityUrl**(`bot`, `guildId`): `Promise`<[`VanityUrl`](discordeno_bot.VanityUrl.md)\>

Gets information about the vanity url of a guild.

**`Remarks`**

Requires the `MANAGE_GUILD` permission.

The `code` property will be `null` if the guild does not have a set vanity url.

**`See`**

[https://discord.com/developers/docs/resources/guild#get-guild-vanity-url](https://discord.com/developers/docs/resources/guild#get-guild-vanity-url)

#### Parameters

| Name      | Type                                                  | Description                                                |
| :-------- | :---------------------------------------------------- | :--------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance used to make the request                  |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild to get the vanity url information for. |

#### Returns

`Promise`<[`VanityUrl`](discordeno_bot.VanityUrl.md)\>

An instance of [VanityUrl](discordeno_bot.VanityUrl.md).

#### Inherited from

DefaultHelpers.getVanityUrl

#### Defined in

[packages/bot/src/helpers/guilds/getVanityUrl.ts:25](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/getVanityUrl.ts#L25)

---

### getVoiceRegions

▸ **getVoiceRegions**(`bot`, `guildId`): `Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`string`, [`VoiceRegions`](discordeno_bot.VoiceRegions.md)\>\>

Gets the list of voice regions for a guild.

**`See`**

[https://discord.com/developers/docs/resources/guild#get-guild-voice-regions](https://discord.com/developers/docs/resources/guild#get-guild-voice-regions)

#### Parameters

| Name      | Type                                                  | Description                                       |
| :-------- | :---------------------------------------------------- | :------------------------------------------------ |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.      |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild to get the voice regions for. |

#### Returns

`Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`string`, [`VoiceRegions`](discordeno_bot.VoiceRegions.md)\>\>

A collection of [VoiceRegion](discordeno_bot.VoiceRegions.md) objects assorted by voice region ID.

#### Inherited from

DefaultHelpers.getVoiceRegions

#### Defined in

[packages/bot/src/helpers/guilds/voice/getVoiceRegions.ts:15](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/voice/getVoiceRegions.ts#L15)

---

### getWebhook

▸ **getWebhook**(`bot`, `webhookId`): `Promise`<[`Webhook`](discordeno_bot.Webhook.md)\>

Gets a webhook by its ID.

**`Remarks`**

Requires the `MANAGE_WEBHOOKS` permission.

**`See`**

[https://discord.com/developers/docs/resources/webhook#get-webhook](https://discord.com/developers/docs/resources/webhook#get-webhook)

#### Parameters

| Name        | Type                                                  | Description                                  |
| :---------- | :---------------------------------------------------- | :------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request. |
| `webhookId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the webhook to get.                |

#### Returns

`Promise`<[`Webhook`](discordeno_bot.Webhook.md)\>

An instance of [Webhook](discordeno_bot.Webhook.md).

#### Inherited from

DefaultHelpers.getWebhook

#### Defined in

[packages/bot/src/helpers/webhooks/getWebhook.ts:17](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/webhooks/getWebhook.ts#L17)

---

### getWebhookMessage

▸ **getWebhookMessage**(`bot`, `webhookId`, `token`, `messageId`, `options?`): `Promise`<[`Message`](discordeno_bot.Message.md)\>

Gets a webhook message by its ID.

**`See`**

[https://discord.com/developers/docs/resources/webhook#get-webhook-message](https://discord.com/developers/docs/resources/webhook#get-webhook-message)

#### Parameters

| Name        | Type                                                                     | Description                                      |
| :---------- | :----------------------------------------------------------------------- | :----------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                                           | The bot instance to use to make the request.     |
| `webhookId` | [`BigString`](../modules/discordeno_bot.md#bigstring)                    | The ID of the webhook to get a message of.       |
| `token`     | `string`                                                                 | The webhook token, used to get webhook messages. |
| `messageId` | [`BigString`](../modules/discordeno_bot.md#bigstring)                    | the ID of the webhook message to get.            |
| `options?`  | [`GetWebhookMessageOptions`](discordeno_bot.GetWebhookMessageOptions.md) | The parameters for the fetching of the message.  |

#### Returns

`Promise`<[`Message`](discordeno_bot.Message.md)\>

An instance of [Message](discordeno_bot.Message.md).

#### Inherited from

DefaultHelpers.getWebhookMessage

#### Defined in

[packages/bot/src/helpers/webhooks/getWebhookMessage.ts:21](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/webhooks/getWebhookMessage.ts#L21)

---

### getWebhookWithToken

▸ **getWebhookWithToken**(`bot`, `webhookId`, `token`): `Promise`<[`Webhook`](discordeno_bot.Webhook.md)\>

Gets a webhook using the webhook token, thereby bypassing the need for authentication + permissions.

**`See`**

[https://discord.com/developers/docs/resources/webhook#get-webhook-with-token](https://discord.com/developers/docs/resources/webhook#get-webhook-with-token)

#### Parameters

| Name        | Type                                                  | Description                                  |
| :---------- | :---------------------------------------------------- | :------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request. |
| `webhookId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the webhook to get.                |
| `token`     | `string`                                              | The webhook token, used to get the webhook.  |

#### Returns

`Promise`<[`Webhook`](discordeno_bot.Webhook.md)\>

An instance of [Webhook](discordeno_bot.Webhook.md).

#### Inherited from

DefaultHelpers.getWebhookWithToken

#### Defined in

[packages/bot/src/helpers/webhooks/getWebhookWithToken.ts:15](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/webhooks/getWebhookWithToken.ts#L15)

---

### getWelcomeScreen

▸ **getWelcomeScreen**(`bot`, `guildId`): `Promise`<[`WelcomeScreen`](discordeno_bot.WelcomeScreen.md)\>

Gets the welcome screen for a guild.

**`Remarks`**

If the welcome screen is not enabled:

- Requires the `MANAGE_GUILD` permission.

**`See`**

[https://discord.com/developers/docs/resources/guild#get-guild-welcome-screen](https://discord.com/developers/docs/resources/guild#get-guild-welcome-screen)

#### Parameters

| Name      | Type                                                  | Description                                        |
| :-------- | :---------------------------------------------------- | :------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance used to make the request          |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild to get the welcome screen for. |

#### Returns

`Promise`<[`WelcomeScreen`](discordeno_bot.WelcomeScreen.md)\>

An instance of [WelcomeScreen](discordeno_bot.WelcomeScreen.md).

#### Inherited from

DefaultHelpers.getWelcomeScreen

#### Defined in

[packages/bot/src/helpers/guilds/getWelcomeScreen.ts:18](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/getWelcomeScreen.ts#L18)

---

### getWidget

▸ **getWidget**(`bot`, `guildId`): `Promise`<[`GuildWidget`](discordeno_bot.GuildWidget.md)\>

Gets the guild widget by guild ID.

**`See`**

[https://discord.com/developers/docs/resources/guild#get-guild-widget](https://discord.com/developers/docs/resources/guild#get-guild-widget)

#### Parameters

| Name      | Type                                                  | Description                                  |
| :-------- | :---------------------------------------------------- | :------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request. |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild to get the widget of.    |

#### Returns

`Promise`<[`GuildWidget`](discordeno_bot.GuildWidget.md)\>

An instance of [GuildWidget](discordeno_bot.GuildWidget.md).

#### Inherited from

DefaultHelpers.getWidget

#### Defined in

[packages/bot/src/helpers/guilds/widget/getWidget.ts:14](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/widget/getWidget.ts#L14)

---

### getWidgetImageURL

▸ **getWidgetImageURL**(`bot`, `guildId`, `options?`): `string`

Builds a URL to the guild widget image stored in the Discord CDN.

#### Parameters

| Name       | Type                                                                     | Description                                                  |
| :--------- | :----------------------------------------------------------------------- | :----------------------------------------------------------- |
| `bot`      | [`Bot`](discordeno_bot.Bot.md)                                           | The bot instance to use to build the URL.                    |
| `guildId`  | [`BigString`](../modules/discordeno_bot.md#bigstring)                    | The ID of the guild to get the link to the widget image for. |
| `options?` | [`GetGuildWidgetImageQuery`](discordeno_bot.GetGuildWidgetImageQuery.md) | The parameters for the building of the URL.                  |

#### Returns

`string`

The link to the resource.

#### Inherited from

DefaultHelpers.getWidgetImageURL

#### Defined in

[packages/bot/src/helpers/guilds/widget/getWidgetImageUrl.ts:12](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/widget/getWidgetImageUrl.ts#L12)

---

### getWidgetSettings

▸ **getWidgetSettings**(`bot`, `guildId`): `Promise`<[`GuildWidgetSettings`](discordeno_bot.GuildWidgetSettings.md)\>

Gets the settings of a guild's widget.

**`Remarks`**

Requires the `MANAGE_GUILD` permission.

**`See`**

[https://discord.com/developers/docs/resources/guild#get-guild-widget-settings](https://discord.com/developers/docs/resources/guild#get-guild-widget-settings)

#### Parameters

| Name      | Type                                                  | Description                                  |
| :-------- | :---------------------------------------------------- | :------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request. |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild to get the widget of.    |

#### Returns

`Promise`<[`GuildWidgetSettings`](discordeno_bot.GuildWidgetSettings.md)\>

An instance of [GuildWidgetSettings](discordeno_bot.GuildWidgetSettings.md).

#### Inherited from

DefaultHelpers.getWidgetSettings

#### Defined in

[packages/bot/src/helpers/guilds/widget/getWidgetSettings.ts:17](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/widget/getWidgetSettings.ts#L17)

---

### isGetMessagesAfter

▸ **isGetMessagesAfter**(`options`): options is GetMessagesAfter

#### Parameters

| Name      | Type                                                                    |
| :-------- | :---------------------------------------------------------------------- |
| `options` | [`GetMessagesOptions`](../modules/discordeno_bot.md#getmessagesoptions) |

#### Returns

options is GetMessagesAfter

#### Inherited from

DefaultHelpers.isGetMessagesAfter

#### Defined in

[packages/bot/src/helpers/messages/getMessages.ts:72](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/getMessages.ts#L72)

---

### isGetMessagesAround

▸ **isGetMessagesAround**(`options`): options is GetMessagesAround

#### Parameters

| Name      | Type                                                                    |
| :-------- | :---------------------------------------------------------------------- |
| `options` | [`GetMessagesOptions`](../modules/discordeno_bot.md#getmessagesoptions) |

#### Returns

options is GetMessagesAround

#### Inherited from

DefaultHelpers.isGetMessagesAround

#### Defined in

[packages/bot/src/helpers/messages/getMessages.ts:80](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/getMessages.ts#L80)

---

### isGetMessagesBefore

▸ **isGetMessagesBefore**(`options`): options is GetMessagesBefore

#### Parameters

| Name      | Type                                                                    |
| :-------- | :---------------------------------------------------------------------- |
| `options` | [`GetMessagesOptions`](../modules/discordeno_bot.md#getmessagesoptions) |

#### Returns

options is GetMessagesBefore

#### Inherited from

DefaultHelpers.isGetMessagesBefore

#### Defined in

[packages/bot/src/helpers/messages/getMessages.ts:76](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/getMessages.ts#L76)

---

### isGetMessagesLimit

▸ **isGetMessagesLimit**(`options`): options is GetMessagesLimit

#### Parameters

| Name      | Type                                                                    |
| :-------- | :---------------------------------------------------------------------- |
| `options` | [`GetMessagesOptions`](../modules/discordeno_bot.md#getmessagesoptions) |

#### Returns

options is GetMessagesLimit

#### Inherited from

DefaultHelpers.isGetMessagesLimit

#### Defined in

[packages/bot/src/helpers/messages/getMessages.ts:84](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/getMessages.ts#L84)

---

### joinThread

▸ **joinThread**(`bot`, `channelId`): `Promise`<`void`\>

Adds the bot user to a thread.

**`Remarks`**

Requires the thread not be archived.

Fires a _Thread Members Update_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/channel#join-thread](https://discord.com/developers/docs/resources/channel#join-thread)

#### Parameters

| Name        | Type                                                  | Description                                  |
| :---------- | :---------------------------------------------------- | :------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request. |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the thread to add the bot user to. |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.joinThread

#### Defined in

[packages/bot/src/helpers/channels/threads/joinThread.ts:17](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/threads/joinThread.ts#L17)

---

### kickMember

▸ **kickMember**(`bot`, `guildId`, `userId`, `reason?`): `Promise`<`void`\>

Kicks a member from a guild.

**`Remarks`**

Requires the `KICK_MEMBERS` permission.

Fires a _Guild Member Remove_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/guild#remove-guild-member](https://discord.com/developers/docs/resources/guild#remove-guild-member)

#### Parameters

| Name      | Type                                                  | Description                                       |
| :-------- | :---------------------------------------------------- | :------------------------------------------------ |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.      |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild to kick the member from.      |
| `userId`  | [`BigString`](../modules/discordeno_bot.md#bigstring) | The user ID of the member to kick from the guild. |
| `reason?` | `string`                                              | -                                                 |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.kickMember

#### Defined in

[packages/bot/src/helpers/members/kickMember.ts:18](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/members/kickMember.ts#L18)

---

### leaveGuild

▸ **leaveGuild**(`bot`, `guildId`): `Promise`<`void`\>

Leaves a guild.

**`Remarks`**

Fires a _Guild Delete_ event.

**`See`**

[https://discord.com/developers/docs/resources/user#leave-guild](https://discord.com/developers/docs/resources/user#leave-guild)

#### Parameters

| Name      | Type                                                  | Description                               |
| :-------- | :---------------------------------------------------- | :---------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance used to make the request |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild to leave.             |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.leaveGuild

#### Defined in

[packages/bot/src/helpers/guilds/leaveGuild.ts:15](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/leaveGuild.ts#L15)

---

### leaveThread

▸ **leaveThread**(`bot`, `channelId`): `Promise`<`void`\>

Removes the bot user from a thread.

**`Remarks`**

Requires the thread not be archived.

Fires a _Thread Members Update_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/channel#leave-thread](https://discord.com/developers/docs/resources/channel#leave-thread)

#### Parameters

| Name        | Type                                                  | Description                                       |
| :---------- | :---------------------------------------------------- | :------------------------------------------------ |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.      |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the thread to remove the bot user from. |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.leaveThread

#### Defined in

[packages/bot/src/helpers/channels/threads/leaveThread.ts:17](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/threads/leaveThread.ts#L17)

---

### leaveVoiceChannel

▸ **leaveVoiceChannel**(`bot`, `guildId`): `Promise`<`void`\>

Leaves the voice channel the bot user is currently in.

This function sends the _Update Voice State_ gateway command over the gateway behind the scenes.

**`Remarks`**

Fires a _Voice State Update_ gateway event.

**`See`**

[https://discord.com/developers/docs/topics/gateway#update-voice-state](https://discord.com/developers/docs/topics/gateway#update-voice-state)

#### Parameters

| Name      | Type                                                  | Description                                           |
| :-------- | :---------------------------------------------------- | :---------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.          |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild the voice channel to leave is in. |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.leaveVoiceChannel

#### Defined in

[packages/bot/src/helpers/guilds/voice/leaveVoiceChannel.ts:17](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/voice/leaveVoiceChannel.ts#L17)

---

### modifyRolePositions

▸ **modifyRolePositions**(`bot`, `guildId`, `options`): `Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`Role`](discordeno_bot.Role.md)\>\>

Edits the positions of a set of roles.

**`Remarks`**

Requires the `MANAGE_ROLES` permission.

Fires a _Guild Role Update_ gateway event for every role impacted in this change.

**`See`**

[https://discord.com/developers/docs/resources/guild#modify-guild-role-positions](https://discord.com/developers/docs/resources/guild#modify-guild-role-positions)

#### Parameters

| Name      | Type                                                             | Description                                        |
| :-------- | :--------------------------------------------------------------- | :------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                   | The bot instance to use to make the request.       |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring)            | The ID of the guild to edit the role positions in. |
| `options` | [`ModifyRolePositions`](discordeno_bot.ModifyRolePositions.md)[] | The parameters for the edit of the role positions. |

#### Returns

`Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`Role`](discordeno_bot.Role.md)\>\>

A collection of [Role](discordeno_bot.Role.md) objects assorted by role ID.

#### Inherited from

DefaultHelpers.modifyRolePositions

#### Defined in

[packages/bot/src/helpers/roles/editRolePositions.ts:21](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/roles/editRolePositions.ts#L21)

---

### pinMessage

▸ **pinMessage**(`bot`, `channelId`, `messageId`, `reason?`): `Promise`<`void`\>

Pins a message in a channel.

**`Remarks`**

Requires that the bot user be able to see the contents of the channel in which the messages were posted.

Requires the `MANAGE_MESSAGES` permission.

⚠️ There can only be at max 50 messages pinned in a channel.

Fires a _Channel Pins Update_ event.

**`See`**

[https://discord.com/developers/docs/resources/channel#pin-message](https://discord.com/developers/docs/resources/channel#pin-message)

#### Parameters

| Name        | Type                                                  | Description                                              |
| :---------- | :---------------------------------------------------- | :------------------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.             |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the channel where the message is to be pinned. |
| `messageId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the message to pin.                            |
| `reason?`   | `string`                                              | -                                                        |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.pinMessage

#### Defined in

[packages/bot/src/helpers/messages/pinMessage.ts:22](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/pinMessage.ts#L22)

---

### processReactionString

▸ **processReactionString**(`reaction`): `string`

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `reaction` | `string` |

#### Returns

`string`

#### Inherited from

DefaultHelpers.processReactionString

#### Defined in

[packages/bot/src/helpers/messages/reactions/getReactions.ts:42](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/reactions/getReactions.ts#L42)

---

### pruneMembers

▸ **pruneMembers**(`bot`, `guildId`, `options`): `Promise`<`number` \| `undefined`\>

Initiates the process of pruning inactive members.

**`Remarks`**

Requires the `KICK_MEMBERS` permission.

❗ Requests to this endpoint will time out for large guilds. To prevent this from happening, set the [computePruneCount](discordeno_bot.BeginGuildPrune.md#computeprunecount) property of the options object parameter to `false`. This will begin the process of pruning, and immediately return `undefined`, rather than wait for the process to complete before returning the actual count of members that have been kicked.

⚠️ By default, this process will not remove members with a role. To include the members who have a _particular subset of roles_, specify the role(s) in the [includeRoles](discordeno_bot.BeginGuildPrune.md#includeroles) property of the options object parameter.

Fires a _Guild Member Remove_ gateway event for every member kicked.

**`See`**

[https://discord.com/developers/docs/resources/guild#begin-guild-prune](https://discord.com/developers/docs/resources/guild#begin-guild-prune)

#### Parameters

| Name      | Type                                                   | Description                                  |
| :-------- | :----------------------------------------------------- | :------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                         | The bot instance to use to make the request. |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring)  | The ID of the guild to prune the members of. |
| `options` | [`BeginGuildPrune`](discordeno_bot.BeginGuildPrune.md) | The parameters for the pruning of members.   |

#### Returns

`Promise`<`number` \| `undefined`\>

A number indicating how many members were pruned.

#### Inherited from

DefaultHelpers.pruneMembers

#### Defined in

[packages/bot/src/helpers/members/pruneMembers.ts:23](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/members/pruneMembers.ts#L23)

---

### removeRole

▸ **removeRole**(`bot`, `guildId`, `userId`, `roleId`, `reason?`): `Promise`<`void`\>

Removes a role from a member.

**`Remarks`**

Requires the `MANAGE_ROLES` permission.

Fires a _Guild Member Update_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/guild#remove-guild-member-role](https://discord.com/developers/docs/resources/guild#remove-guild-member-role)

#### Parameters

| Name      | Type                                                  | Description                                                   |
| :-------- | :---------------------------------------------------- | :------------------------------------------------------------ |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.                  |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild the member to remove the role from is in. |
| `userId`  | [`BigString`](../modules/discordeno_bot.md#bigstring) | The user ID of the member to remove the role from.            |
| `roleId`  | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the role to remove from the member.                 |
| `reason?` | `string`                                              | -                                                             |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.removeRole

#### Defined in

[packages/bot/src/helpers/roles/removeRole.ts:19](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/roles/removeRole.ts#L19)

---

### removeThreadMember

▸ **removeThreadMember**(`bot`, `channelId`, `userId`): `Promise`<`void`\>

Removes a member from a thread.

**`Remarks`**

If the thread is of type ChannelTypes.GuildPrivateThread, requires to be the creator of the thread.
Otherwise, requires the `MANAGE_THREADS` permission.

Requires the thread not be archived.

Fires a _Thread Members Update_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/channel#remove-thread-member](https://discord.com/developers/docs/resources/channel#remove-thread-member)

#### Parameters

| Name        | Type                                                  | Description                                          |
| :---------- | :---------------------------------------------------- | :--------------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.         |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the thread to remove the thread member of. |
| `userId`    | [`BigString`](../modules/discordeno_bot.md#bigstring) | The user ID of the thread member to remove.          |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.removeThreadMember

#### Defined in

[packages/bot/src/helpers/channels/threads/removeThreadMember.ts:21](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/threads/removeThreadMember.ts#L21)

---

### searchMembers

▸ **searchMembers**(`bot`, `guildId`, `query`, `options?`): `Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`Member`](discordeno_bot.Member.md)\>\>

Gets the list of members whose usernames or nicknames start with a provided string.

**`See`**

[https://discord.com/developers/docs/resources/guild#search-guild-members](https://discord.com/developers/docs/resources/guild#search-guild-members)

#### Parameters

| Name       | Type                                                                   | Description                                         |
| :--------- | :--------------------------------------------------------------------- | :-------------------------------------------------- |
| `bot`      | [`Bot`](discordeno_bot.Bot.md)                                         | The bot instance to use to make the request.        |
| `guildId`  | [`BigString`](../modules/discordeno_bot.md#bigstring)                  | The ID of the guild to search in.                   |
| `query`    | `string`                                                               | The string to match usernames or nicknames against. |
| `options?` | `Omit`<[`SearchMembers`](discordeno_bot.SearchMembers.md), `"query"`\> | The parameters for searching through the members.   |

#### Returns

`Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`Member`](discordeno_bot.Member.md)\>\>

A collection of [Member](discordeno_bot.Member.md) objects assorted by user ID.

#### Inherited from

DefaultHelpers.searchMembers

#### Defined in

[packages/bot/src/helpers/members/searchMembers.ts:19](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/members/searchMembers.ts#L19)

---

### sendFollowupMessage

▸ **sendFollowupMessage**(`bot`, `token`, `options`): `Promise`<[`Message`](discordeno_bot.Message.md)\>

Sends a follow-up message to an interaction.

**`Remarks`**

⚠️ Interaction tokens are only valid for _15 minutes_.

By default, mentions are suppressed. To enable mentions, pass a mention object with the callback data.

Unlike `sendMessage()`, this endpoint allows the bot user to act without:

- Needing to be able to see the contents of the channel that the message is in. (`READ_MESSAGES` permission.)
- Requiring the `MESSAGE_CONTENT` intent.

Fires a _Message Create_ event.

**`See`**

[https://discord.com/developers/docs/interactions/receiving-and-responding#create-followup-message](https://discord.com/developers/docs/interactions/receiving-and-responding#create-followup-message)

#### Parameters

| Name      | Type                                                           | Description                                                         |
| :-------- | :------------------------------------------------------------- | :------------------------------------------------------------------ |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                 | The bot instance to use to make the request.                        |
| `token`   | `string`                                                       | The interaction token to use, provided in the original interaction. |
| `options` | [`InteractionResponse`](discordeno_bot.InteractionResponse.md) | The parameters for the creation of the message.                     |

#### Returns

`Promise`<[`Message`](discordeno_bot.Message.md)\>

An instance of the created [Message](discordeno_bot.Message.md).

#### Inherited from

DefaultHelpers.sendFollowupMessage

#### Defined in

[packages/bot/src/helpers/interactions/responses/sendFollowupMessage.ts:26](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/interactions/responses/sendFollowupMessage.ts#L26)

---

### sendInteractionResponse

▸ **sendInteractionResponse**(`bot`, `interactionId`, `token`, `options`): `Promise`<`void`\>

Sends a response to an interaction.

**`Remarks`**

⚠️ Interaction tokens are only valid for _15 minutes_.

By default, mentions are suppressed. To enable mentions, pass a mention object with the callback data.

Unlike `sendMessage()`, this endpoint allows the bot user to act without:

- Needing to be able to see the contents of the channel that the message is in. (`READ_MESSAGES` permission.)
- Requiring the `MESSAGE_CONTENT` intent.

Fires a _Message Create_ event.

**`See`**

[https://discord.com/developers/docs/interactions/receiving-and-responding#create-interaction-response](https://discord.com/developers/docs/interactions/receiving-and-responding#create-interaction-response)

#### Parameters

| Name            | Type                                                           | Description                                                         |
| :-------------- | :------------------------------------------------------------- | :------------------------------------------------------------------ |
| `bot`           | [`Bot`](discordeno_bot.Bot.md)                                 | The bot instance to use to make the request.                        |
| `interactionId` | [`BigString`](../modules/discordeno_bot.md#bigstring)          | The ID of the interaction to respond to.                            |
| `token`         | `string`                                                       | The interaction token to use, provided in the original interaction. |
| `options`       | [`InteractionResponse`](discordeno_bot.InteractionResponse.md) | The parameters for the creation of the message.                     |

#### Returns

`Promise`<`void`\>

An instance of the created [Message](discordeno_bot.Message.md).

#### Inherited from

DefaultHelpers.sendInteractionResponse

#### Defined in

[packages/bot/src/helpers/interactions/responses/sendInteractionResponse.ts:27](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/interactions/responses/sendInteractionResponse.ts#L27)

---

### sendMessage

▸ **sendMessage**(`bot`, `channelId`, `options`): `Promise`<[`Message`](discordeno_bot.Message.md)\>

Sends a message to a channel.

**`Remarks`**

Requires that the bot user be able to see the contents of the channel the message is to be sent in.

If sending a message to a guild channel:

- Requires the `SEND_MESSAGES` permission.

If sending a TTS message:

- Requires the `SEND_TTS_MESSAGES` permission.

If sending a message as a reply to another message:

- Requires the `READ_MESSAGE_HISTORY` permission.
- The message being replied to cannot be a system message.

⚠️ The maximum size of a request (accounting for any attachments and message content) for bot users is _8 MiB_.

Fires a _Message Create_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/channel#create-message](https://discord.com/developers/docs/resources/channel#create-message)

#### Parameters

| Name        | Type                                                  | Description                                     |
| :---------- | :---------------------------------------------------- | :---------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.    |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the channel to send the message in.   |
| `options`   | [`CreateMessage`](discordeno_bot.CreateMessage.md)    | The parameters for the creation of the message. |

#### Returns

`Promise`<[`Message`](discordeno_bot.Message.md)\>

An instance of the created [Message](discordeno_bot.Message.md).

#### Inherited from

DefaultHelpers.sendMessage

#### Defined in

[packages/bot/src/helpers/messages/sendMessage.ts:33](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/sendMessage.ts#L33)

---

### startThreadWithMessage

▸ **startThreadWithMessage**(`bot`, `channelId`, `messageId`, `options`): `Promise`<[`Channel`](discordeno_bot.Channel.md)\>

Creates a thread, using an existing message as its point of origin.

**`Remarks`**

If called on a channel of type [GuildText](../enums/discordeno_bot.ChannelTypes.md#guildtext), creates a ChannelTypes.GuildPublicThread.
If called on a channel of type ChannelTypes.GuildNews, creates a ChannelTypes.GuildNewsThread.
Does not work on channels of type [GuildForum](../enums/discordeno_bot.ChannelTypes.md#guildforum).

The ID of the created thread will be the same as the ID of the source message.

Fires a _Thread Create_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/channel#start-thread-from-message](https://discord.com/developers/docs/resources/channel#start-thread-from-message)

#### Parameters

| Name        | Type                                                                 | Description                                                   |
| :---------- | :------------------------------------------------------------------- | :------------------------------------------------------------ |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                                       | The bot instance to use to make the request.                  |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring)                | The ID of the channel in which to create the thread.          |
| `messageId` | [`BigString`](../modules/discordeno_bot.md#bigstring)                | The ID of the message to use as the thread's point of origin. |
| `options`   | [`StartThreadWithMessage`](discordeno_bot.StartThreadWithMessage.md) | The parameters to use for the creation of the thread.         |

#### Returns

`Promise`<[`Channel`](discordeno_bot.Channel.md)\>

An instance of the created [Thread](discordeno_bot.Channel.md).

#### Inherited from

DefaultHelpers.startThreadWithMessage

#### Defined in

[packages/bot/src/helpers/channels/threads/startThreadWithMessage.ts:26](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/threads/startThreadWithMessage.ts#L26)

---

### startThreadWithoutMessage

▸ **startThreadWithoutMessage**(`bot`, `channelId`, `options`): `Promise`<[`Channel`](discordeno_bot.Channel.md)\>

Creates a thread without using a message as the thread's point of origin.

**`Remarks`**

Creating a private thread requires the server to be boosted.

Fires a _Thread Create_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/channel#start-thread-without-message](https://discord.com/developers/docs/resources/channel#start-thread-without-message)

#### Parameters

| Name        | Type                                                                       | Description                                           |
| :---------- | :------------------------------------------------------------------------- | :---------------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                                             | The bot instance to use to make the request.          |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring)                      | The ID of the channel in which to create the thread.  |
| `options`   | [`StartThreadWithoutMessage`](discordeno_bot.StartThreadWithoutMessage.md) | The parameters to use for the creation of the thread. |

#### Returns

`Promise`<[`Channel`](discordeno_bot.Channel.md)\>

An instance of the created [Thread](discordeno_bot.Channel.md).

#### Inherited from

DefaultHelpers.startThreadWithoutMessage

#### Defined in

[packages/bot/src/helpers/channels/threads/startThreadWithoutMessage.ts:21](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/threads/startThreadWithoutMessage.ts#L21)

---

### syncGuildTemplate

▸ **syncGuildTemplate**(`bot`, `guildId`, `templateCode`): `Promise`<[`Template`](discordeno_bot.Template.md)\>

Synchronises a template with the current state of a guild.

**`Remarks`**

Requires the `MANAGE_GUILD` permission.

Fires a _Guild Update_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/guild-template#get-guild-templates](https://discord.com/developers/docs/resources/guild-template#get-guild-templates)

#### Parameters

| Name           | Type                                                  | Description                                       |
| :------------- | :---------------------------------------------------- | :------------------------------------------------ |
| `bot`          | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.      |
| `guildId`      | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild to synchronise a template of. |
| `templateCode` | `string`                                              | -                                                 |

#### Returns

`Promise`<[`Template`](discordeno_bot.Template.md)\>

An instance of the edited [Template](discordeno_bot.Template.md).

#### Inherited from

DefaultHelpers.syncGuildTemplate

#### Defined in

[packages/bot/src/helpers/templates/syncGuildTemplate.ts:19](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/templates/syncGuildTemplate.ts#L19)

---

### triggerTypingIndicator

▸ **triggerTypingIndicator**(`bot`, `channelId`): `Promise`<`void`\>

Triggers a typing indicator for the bot user.

**`Remarks`**

Generally, bots should _not_ use this route.

Fires a _Typing Start_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/channel#trigger-typing-indicator](https://discord.com/developers/docs/resources/channel#trigger-typing-indicator)

#### Parameters

| Name        | Type                                                  | Description                                                     |
| :---------- | :---------------------------------------------------- | :-------------------------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.                    |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the channel in which to trigger the typing indicator. |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.triggerTypingIndicator

#### Defined in

[packages/bot/src/helpers/channels/triggerTypingIndicator.ts:19](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/channels/triggerTypingIndicator.ts#L19)

---

### unbanMember

▸ **unbanMember**(`bot`, `guildId`, `userId`): `Promise`<`void`\>

Unbans a user from a guild.

**`Remarks`**

Requires the `BAN_MEMBERS` permission.

Fires a _Guild Ban Remove_ gateway event.

**`See`**

[https://discord.com/developers/docs/resources/guild#remove-guild-ban](https://discord.com/developers/docs/resources/guild#remove-guild-ban)

#### Parameters

| Name      | Type                                                  | Description                                  |
| :-------- | :---------------------------------------------------- | :------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request. |
| `guildId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the guild to unban the user in.    |
| `userId`  | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the user to unban.                 |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.unbanMember

#### Defined in

[packages/bot/src/helpers/members/unbanMember.ts:18](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/members/unbanMember.ts#L18)

---

### unpinMessage

▸ **unpinMessage**(`bot`, `channelId`, `messageId`, `reason?`): `Promise`<`void`\>

Unpins a pinned message in a channel.

**`Remarks`**

Requires that the bot user be able to see the contents of the channel in which the messages were posted.

Requires the `MANAGE_MESSAGES` permission.

Fires a _Channel Pins Update_ event.

**`See`**

[https://discord.com/developers/docs/resources/channel#unpin-message](https://discord.com/developers/docs/resources/channel#unpin-message)

#### Parameters

| Name        | Type                                                  | Description                                        |
| :---------- | :---------------------------------------------------- | :------------------------------------------------- |
| `bot`       | [`Bot`](discordeno_bot.Bot.md)                        | The bot instance to use to make the request.       |
| `channelId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the channel where the message is pinned. |
| `messageId` | [`BigString`](../modules/discordeno_bot.md#bigstring) | The ID of the message to unpin.                    |
| `reason?`   | `string`                                              | -                                                  |

#### Returns

`Promise`<`void`\>

#### Inherited from

DefaultHelpers.unpinMessage

#### Defined in

[packages/bot/src/helpers/messages/unpinMessage.ts:20](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/messages/unpinMessage.ts#L20)

---

### upsertGlobalApplicationCommands

▸ **upsertGlobalApplicationCommands**(`bot`, `commands`): `Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`ApplicationCommand`](discordeno_bot.ApplicationCommand.md)\>\>

Re-registers the list of global application commands, overwriting the previous commands completely.

**`Remarks`**

❗ Commands that are not present in the `commands` array will be **deleted**.

⚠️ Commands that do not already exist will count towards the daily limit of _200_ new commands.

**`See`**

[https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands](https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands)

#### Parameters

| Name       | Type                                                                                  | Description                                                 |
| :--------- | :------------------------------------------------------------------------------------ | :---------------------------------------------------------- |
| `bot`      | [`Bot`](discordeno_bot.Bot.md)                                                        | The bot instance to use to make the request.                |
| `commands` | [`CreateApplicationCommand`](../modules/discordeno_bot.md#createapplicationcommand)[] | The list of commands to use to overwrite the previous list. |

#### Returns

`Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`ApplicationCommand`](discordeno_bot.ApplicationCommand.md)\>\>

A collection of [ApplicationCommand](discordeno_bot.ApplicationCommand.md) objects assorted by command ID.

#### Inherited from

DefaultHelpers.upsertGlobalApplicationCommands

#### Defined in

[packages/bot/src/helpers/interactions/commands/upsertGlobalApplicationCommands.ts:21](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/interactions/commands/upsertGlobalApplicationCommands.ts#L21)

---

### upsertGuildApplicationCommands

▸ **upsertGuildApplicationCommands**(`bot`, `guildId`, `commands`): `Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`ApplicationCommand`](discordeno_bot.ApplicationCommand.md)\>\>

Re-registers the list of application commands registered in a guild, overwriting the previous commands completely.

**`Remarks`**

❗ Commands that are not present in the `commands` array will be **deleted**.

⚠️ Commands that do not already exist will count towards the daily limit of _200_ new commands.

**`See`**

[https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-guild-application-commands](https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-guild-application-commands)

#### Parameters

| Name       | Type                                                                                  | Description                                                 |
| :--------- | :------------------------------------------------------------------------------------ | :---------------------------------------------------------- |
| `bot`      | [`Bot`](discordeno_bot.Bot.md)                                                        | The bot instance to use to make the request.                |
| `guildId`  | [`BigString`](../modules/discordeno_bot.md#bigstring)                                 | The ID of the guild whose list of commands to overwrite.    |
| `commands` | [`CreateApplicationCommand`](../modules/discordeno_bot.md#createapplicationcommand)[] | The list of commands to use to overwrite the previous list. |

#### Returns

`Promise`<[`Collection`](../classes/discordeno_bot.Collection.md)<`bigint`, [`ApplicationCommand`](discordeno_bot.ApplicationCommand.md)\>\>

A collection of [ApplicationCommand](discordeno_bot.ApplicationCommand.md) objects assorted by command ID.

#### Inherited from

DefaultHelpers.upsertGuildApplicationCommands

#### Defined in

[packages/bot/src/helpers/interactions/commands/upsertGuildApplicationCommands.ts:22](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/interactions/commands/upsertGuildApplicationCommands.ts#L22)
