[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / AuditLogEvents

# Enumeration: AuditLogEvents

[@discordeno/gateway](../modules/discordeno_gateway.md).AuditLogEvents

https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events

## Table of contents

### Enumeration Members

- [ApplicationCommandPermissionUpdate](discordeno_gateway.AuditLogEvents.md#applicationcommandpermissionupdate)
- [AutoModerationBlockMessage](discordeno_gateway.AuditLogEvents.md#automoderationblockmessage)
- [AutoModerationRuleCreate](discordeno_gateway.AuditLogEvents.md#automoderationrulecreate)
- [AutoModerationRuleDelete](discordeno_gateway.AuditLogEvents.md#automoderationruledelete)
- [AutoModerationRuleUpdate](discordeno_gateway.AuditLogEvents.md#automoderationruleupdate)
- [BotAdd](discordeno_gateway.AuditLogEvents.md#botadd)
- [ChannelCreate](discordeno_gateway.AuditLogEvents.md#channelcreate)
- [ChannelDelete](discordeno_gateway.AuditLogEvents.md#channeldelete)
- [ChannelOverwriteCreate](discordeno_gateway.AuditLogEvents.md#channeloverwritecreate)
- [ChannelOverwriteDelete](discordeno_gateway.AuditLogEvents.md#channeloverwritedelete)
- [ChannelOverwriteUpdate](discordeno_gateway.AuditLogEvents.md#channeloverwriteupdate)
- [ChannelUpdate](discordeno_gateway.AuditLogEvents.md#channelupdate)
- [EmojiCreate](discordeno_gateway.AuditLogEvents.md#emojicreate)
- [EmojiDelete](discordeno_gateway.AuditLogEvents.md#emojidelete)
- [EmojiUpdate](discordeno_gateway.AuditLogEvents.md#emojiupdate)
- [GuildScheduledEventCreate](discordeno_gateway.AuditLogEvents.md#guildscheduledeventcreate)
- [GuildScheduledEventDelete](discordeno_gateway.AuditLogEvents.md#guildscheduledeventdelete)
- [GuildScheduledEventUpdate](discordeno_gateway.AuditLogEvents.md#guildscheduledeventupdate)
- [GuildUpdate](discordeno_gateway.AuditLogEvents.md#guildupdate)
- [IntegrationCreate](discordeno_gateway.AuditLogEvents.md#integrationcreate)
- [IntegrationDelete](discordeno_gateway.AuditLogEvents.md#integrationdelete)
- [IntegrationUpdate](discordeno_gateway.AuditLogEvents.md#integrationupdate)
- [InviteCreate](discordeno_gateway.AuditLogEvents.md#invitecreate)
- [InviteDelete](discordeno_gateway.AuditLogEvents.md#invitedelete)
- [InviteUpdate](discordeno_gateway.AuditLogEvents.md#inviteupdate)
- [MemberBanAdd](discordeno_gateway.AuditLogEvents.md#memberbanadd)
- [MemberBanRemove](discordeno_gateway.AuditLogEvents.md#memberbanremove)
- [MemberDisconnect](discordeno_gateway.AuditLogEvents.md#memberdisconnect)
- [MemberKick](discordeno_gateway.AuditLogEvents.md#memberkick)
- [MemberMove](discordeno_gateway.AuditLogEvents.md#membermove)
- [MemberPrune](discordeno_gateway.AuditLogEvents.md#memberprune)
- [MemberRoleUpdate](discordeno_gateway.AuditLogEvents.md#memberroleupdate)
- [MemberUpdate](discordeno_gateway.AuditLogEvents.md#memberupdate)
- [MessageBulkDelete](discordeno_gateway.AuditLogEvents.md#messagebulkdelete)
- [MessageDelete](discordeno_gateway.AuditLogEvents.md#messagedelete)
- [MessagePin](discordeno_gateway.AuditLogEvents.md#messagepin)
- [MessageUnpin](discordeno_gateway.AuditLogEvents.md#messageunpin)
- [RoleCreate](discordeno_gateway.AuditLogEvents.md#rolecreate)
- [RoleDelete](discordeno_gateway.AuditLogEvents.md#roledelete)
- [RoleUpdate](discordeno_gateway.AuditLogEvents.md#roleupdate)
- [StageInstanceCreate](discordeno_gateway.AuditLogEvents.md#stageinstancecreate)
- [StageInstanceDelete](discordeno_gateway.AuditLogEvents.md#stageinstancedelete)
- [StageInstanceUpdate](discordeno_gateway.AuditLogEvents.md#stageinstanceupdate)
- [StickerCreate](discordeno_gateway.AuditLogEvents.md#stickercreate)
- [StickerDelete](discordeno_gateway.AuditLogEvents.md#stickerdelete)
- [StickerUpdate](discordeno_gateway.AuditLogEvents.md#stickerupdate)
- [ThreadCreate](discordeno_gateway.AuditLogEvents.md#threadcreate)
- [ThreadDelete](discordeno_gateway.AuditLogEvents.md#threaddelete)
- [ThreadUpdate](discordeno_gateway.AuditLogEvents.md#threadupdate)
- [WebhookCreate](discordeno_gateway.AuditLogEvents.md#webhookcreate)
- [WebhookDelete](discordeno_gateway.AuditLogEvents.md#webhookdelete)
- [WebhookUpdate](discordeno_gateway.AuditLogEvents.md#webhookupdate)

## Enumeration Members

### ApplicationCommandPermissionUpdate

• **ApplicationCommandPermissionUpdate** = `121`

Permissions were updated for a command

#### Defined in

packages/types/dist/shared.d.ts:479

---

### AutoModerationBlockMessage

• **AutoModerationBlockMessage** = `143`

Message was blocked by AutoMod according to a rule.

#### Defined in

packages/types/dist/shared.d.ts:487

---

### AutoModerationRuleCreate

• **AutoModerationRuleCreate** = `140`

Auto moderation rule was created

#### Defined in

packages/types/dist/shared.d.ts:481

---

### AutoModerationRuleDelete

• **AutoModerationRuleDelete** = `142`

Auto moderation rule was deleted

#### Defined in

packages/types/dist/shared.d.ts:485

---

### AutoModerationRuleUpdate

• **AutoModerationRuleUpdate** = `141`

Auto moderation rule was updated

#### Defined in

packages/types/dist/shared.d.ts:483

---

### BotAdd

• **BotAdd** = `28`

Bot user was added to server

#### Defined in

packages/types/dist/shared.d.ts:415

---

### ChannelCreate

• **ChannelCreate** = `10`

Channel was created

#### Defined in

packages/types/dist/shared.d.ts:387

---

### ChannelDelete

• **ChannelDelete** = `12`

Channel was deleted

#### Defined in

packages/types/dist/shared.d.ts:391

---

### ChannelOverwriteCreate

• **ChannelOverwriteCreate** = `13`

Permission overwrite was added to a channel

#### Defined in

packages/types/dist/shared.d.ts:393

---

### ChannelOverwriteDelete

• **ChannelOverwriteDelete** = `15`

Permission overwrite was deleted from a channel

#### Defined in

packages/types/dist/shared.d.ts:397

---

### ChannelOverwriteUpdate

• **ChannelOverwriteUpdate** = `14`

Permission overwrite was updated for a channel

#### Defined in

packages/types/dist/shared.d.ts:395

---

### ChannelUpdate

• **ChannelUpdate** = `11`

Channel settings were updated

#### Defined in

packages/types/dist/shared.d.ts:389

---

### EmojiCreate

• **EmojiCreate** = `60`

Emoji was created

#### Defined in

packages/types/dist/shared.d.ts:435

---

### EmojiDelete

• **EmojiDelete** = `62`

Emoji was deleted

#### Defined in

packages/types/dist/shared.d.ts:439

---

### EmojiUpdate

• **EmojiUpdate** = `61`

Emoji name was updated

#### Defined in

packages/types/dist/shared.d.ts:437

---

### GuildScheduledEventCreate

• **GuildScheduledEventCreate** = `100`

Event was created

#### Defined in

packages/types/dist/shared.d.ts:467

---

### GuildScheduledEventDelete

• **GuildScheduledEventDelete** = `102`

Event was cancelled

#### Defined in

packages/types/dist/shared.d.ts:471

---

### GuildScheduledEventUpdate

• **GuildScheduledEventUpdate** = `101`

Event was updated

#### Defined in

packages/types/dist/shared.d.ts:469

---

### GuildUpdate

• **GuildUpdate** = `1`

Server settings were updated

#### Defined in

packages/types/dist/shared.d.ts:385

---

### IntegrationCreate

• **IntegrationCreate** = `80`

App was added to server

#### Defined in

packages/types/dist/shared.d.ts:449

---

### IntegrationDelete

• **IntegrationDelete** = `82`

App was removed from server

#### Defined in

packages/types/dist/shared.d.ts:453

---

### IntegrationUpdate

• **IntegrationUpdate** = `81`

App was updated (as an example, its scopes were updated)

#### Defined in

packages/types/dist/shared.d.ts:451

---

### InviteCreate

• **InviteCreate** = `40`

Server invite was created

#### Defined in

packages/types/dist/shared.d.ts:423

---

### InviteDelete

• **InviteDelete** = `42`

Server invite was deleted

#### Defined in

packages/types/dist/shared.d.ts:427

---

### InviteUpdate

• **InviteUpdate** = `41`

Server invite was updated

#### Defined in

packages/types/dist/shared.d.ts:425

---

### MemberBanAdd

• **MemberBanAdd** = `22`

Member was banned from server

#### Defined in

packages/types/dist/shared.d.ts:403

---

### MemberBanRemove

• **MemberBanRemove** = `23`

Server ban was lifted for a member

#### Defined in

packages/types/dist/shared.d.ts:405

---

### MemberDisconnect

• **MemberDisconnect** = `27`

Member was disconnected from a voice channel

#### Defined in

packages/types/dist/shared.d.ts:413

---

### MemberKick

• **MemberKick** = `20`

Member was removed from server

#### Defined in

packages/types/dist/shared.d.ts:399

---

### MemberMove

• **MemberMove** = `26`

Member was moved to a different voice channel

#### Defined in

packages/types/dist/shared.d.ts:411

---

### MemberPrune

• **MemberPrune** = `21`

Members were pruned from server

#### Defined in

packages/types/dist/shared.d.ts:401

---

### MemberRoleUpdate

• **MemberRoleUpdate** = `25`

Member was added or removed from a role

#### Defined in

packages/types/dist/shared.d.ts:409

---

### MemberUpdate

• **MemberUpdate** = `24`

Member was updated in server

#### Defined in

packages/types/dist/shared.d.ts:407

---

### MessageBulkDelete

• **MessageBulkDelete** = `73`

Multiple messages were deleted

#### Defined in

packages/types/dist/shared.d.ts:443

---

### MessageDelete

• **MessageDelete** = `72`

Single message was deleted

#### Defined in

packages/types/dist/shared.d.ts:441

---

### MessagePin

• **MessagePin** = `74`

Messaged was pinned to a channel

#### Defined in

packages/types/dist/shared.d.ts:445

---

### MessageUnpin

• **MessageUnpin** = `75`

Message was unpinned from a channel

#### Defined in

packages/types/dist/shared.d.ts:447

---

### RoleCreate

• **RoleCreate** = `30`

Role was created

#### Defined in

packages/types/dist/shared.d.ts:417

---

### RoleDelete

• **RoleDelete** = `32`

Role was deleted

#### Defined in

packages/types/dist/shared.d.ts:421

---

### RoleUpdate

• **RoleUpdate** = `31`

Role was edited

#### Defined in

packages/types/dist/shared.d.ts:419

---

### StageInstanceCreate

• **StageInstanceCreate** = `83`

Stage instance was created (stage channel becomes live)

#### Defined in

packages/types/dist/shared.d.ts:455

---

### StageInstanceDelete

• **StageInstanceDelete** = `85`

Stage instance was deleted (stage channel no longer live)

#### Defined in

packages/types/dist/shared.d.ts:459

---

### StageInstanceUpdate

• **StageInstanceUpdate** = `84`

Stage instace details were updated

#### Defined in

packages/types/dist/shared.d.ts:457

---

### StickerCreate

• **StickerCreate** = `90`

Sticker was created

#### Defined in

packages/types/dist/shared.d.ts:461

---

### StickerDelete

• **StickerDelete** = `92`

Sticker was deleted

#### Defined in

packages/types/dist/shared.d.ts:465

---

### StickerUpdate

• **StickerUpdate** = `91`

Sticker details were updated

#### Defined in

packages/types/dist/shared.d.ts:463

---

### ThreadCreate

• **ThreadCreate** = `110`

Thread was created in a channel

#### Defined in

packages/types/dist/shared.d.ts:473

---

### ThreadDelete

• **ThreadDelete** = `112`

Thread was deleted

#### Defined in

packages/types/dist/shared.d.ts:477

---

### ThreadUpdate

• **ThreadUpdate** = `111`

Thread was updated

#### Defined in

packages/types/dist/shared.d.ts:475

---

### WebhookCreate

• **WebhookCreate** = `50`

Webhook was created

#### Defined in

packages/types/dist/shared.d.ts:429

---

### WebhookDelete

• **WebhookDelete** = `52`

Webhook was deleted

#### Defined in

packages/types/dist/shared.d.ts:433

---

### WebhookUpdate

• **WebhookUpdate** = `51`

Webhook properties or channel were updated

#### Defined in

packages/types/dist/shared.d.ts:431
