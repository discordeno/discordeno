[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / BotGatewayHandlerOptions

# Interface: BotGatewayHandlerOptions

[@discordeno/bot](../modules/discordeno_bot.md).BotGatewayHandlerOptions

## Table of contents

### Properties

- [CHANNEL_CREATE](discordeno_bot.BotGatewayHandlerOptions.md#channel_create)
- [CHANNEL_DELETE](discordeno_bot.BotGatewayHandlerOptions.md#channel_delete)
- [CHANNEL_PINS_UPDATE](discordeno_bot.BotGatewayHandlerOptions.md#channel_pins_update)
- [CHANNEL_UPDATE](discordeno_bot.BotGatewayHandlerOptions.md#channel_update)
- [GUILD_BAN_ADD](discordeno_bot.BotGatewayHandlerOptions.md#guild_ban_add)
- [GUILD_BAN_REMOVE](discordeno_bot.BotGatewayHandlerOptions.md#guild_ban_remove)
- [GUILD_CREATE](discordeno_bot.BotGatewayHandlerOptions.md#guild_create)
- [GUILD_DELETE](discordeno_bot.BotGatewayHandlerOptions.md#guild_delete)
- [GUILD_EMOJIS_UPDATE](discordeno_bot.BotGatewayHandlerOptions.md#guild_emojis_update)
- [GUILD_INTEGRATIONS_UPDATE](discordeno_bot.BotGatewayHandlerOptions.md#guild_integrations_update)
- [GUILD_MEMBERS_CHUNK](discordeno_bot.BotGatewayHandlerOptions.md#guild_members_chunk)
- [GUILD_MEMBER_ADD](discordeno_bot.BotGatewayHandlerOptions.md#guild_member_add)
- [GUILD_MEMBER_REMOVE](discordeno_bot.BotGatewayHandlerOptions.md#guild_member_remove)
- [GUILD_MEMBER_UPDATE](discordeno_bot.BotGatewayHandlerOptions.md#guild_member_update)
- [GUILD_ROLE_CREATE](discordeno_bot.BotGatewayHandlerOptions.md#guild_role_create)
- [GUILD_ROLE_DELETE](discordeno_bot.BotGatewayHandlerOptions.md#guild_role_delete)
- [GUILD_ROLE_UPDATE](discordeno_bot.BotGatewayHandlerOptions.md#guild_role_update)
- [GUILD_SCHEDULED_EVENT_CREATE](discordeno_bot.BotGatewayHandlerOptions.md#guild_scheduled_event_create)
- [GUILD_SCHEDULED_EVENT_DELETE](discordeno_bot.BotGatewayHandlerOptions.md#guild_scheduled_event_delete)
- [GUILD_SCHEDULED_EVENT_UPDATE](discordeno_bot.BotGatewayHandlerOptions.md#guild_scheduled_event_update)
- [GUILD_SCHEDULED_EVENT_USER_ADD](discordeno_bot.BotGatewayHandlerOptions.md#guild_scheduled_event_user_add)
- [GUILD_SCHEDULED_EVENT_USER_REMOVE](discordeno_bot.BotGatewayHandlerOptions.md#guild_scheduled_event_user_remove)
- [GUILD_UPDATE](discordeno_bot.BotGatewayHandlerOptions.md#guild_update)
- [INTEGRATION_CREATE](discordeno_bot.BotGatewayHandlerOptions.md#integration_create)
- [INTEGRATION_DELETE](discordeno_bot.BotGatewayHandlerOptions.md#integration_delete)
- [INTEGRATION_UPDATE](discordeno_bot.BotGatewayHandlerOptions.md#integration_update)
- [INTERACTION_CREATE](discordeno_bot.BotGatewayHandlerOptions.md#interaction_create)
- [INVITE_CREATE](discordeno_bot.BotGatewayHandlerOptions.md#invite_create)
- [INVITE_DELETE](discordeno_bot.BotGatewayHandlerOptions.md#invite_delete)
- [MESSAGE_CREATE](discordeno_bot.BotGatewayHandlerOptions.md#message_create)
- [MESSAGE_DELETE](discordeno_bot.BotGatewayHandlerOptions.md#message_delete)
- [MESSAGE_DELETE_BULK](discordeno_bot.BotGatewayHandlerOptions.md#message_delete_bulk)
- [MESSAGE_REACTION_ADD](discordeno_bot.BotGatewayHandlerOptions.md#message_reaction_add)
- [MESSAGE_REACTION_REMOVE](discordeno_bot.BotGatewayHandlerOptions.md#message_reaction_remove)
- [MESSAGE_REACTION_REMOVE_ALL](discordeno_bot.BotGatewayHandlerOptions.md#message_reaction_remove_all)
- [MESSAGE_REACTION_REMOVE_EMOJI](discordeno_bot.BotGatewayHandlerOptions.md#message_reaction_remove_emoji)
- [MESSAGE_UPDATE](discordeno_bot.BotGatewayHandlerOptions.md#message_update)
- [PRESENCE_UPDATE](discordeno_bot.BotGatewayHandlerOptions.md#presence_update)
- [READY](discordeno_bot.BotGatewayHandlerOptions.md#ready)
- [STAGE_INSTANCE_CREATE](discordeno_bot.BotGatewayHandlerOptions.md#stage_instance_create)
- [STAGE_INSTANCE_DELETE](discordeno_bot.BotGatewayHandlerOptions.md#stage_instance_delete)
- [STAGE_INSTANCE_UPDATE](discordeno_bot.BotGatewayHandlerOptions.md#stage_instance_update)
- [THREAD_CREATE](discordeno_bot.BotGatewayHandlerOptions.md#thread_create)
- [THREAD_DELETE](discordeno_bot.BotGatewayHandlerOptions.md#thread_delete)
- [THREAD_LIST_SYNC](discordeno_bot.BotGatewayHandlerOptions.md#thread_list_sync)
- [THREAD_MEMBERS_UPDATE](discordeno_bot.BotGatewayHandlerOptions.md#thread_members_update)
- [THREAD_UPDATE](discordeno_bot.BotGatewayHandlerOptions.md#thread_update)
- [TYPING_START](discordeno_bot.BotGatewayHandlerOptions.md#typing_start)
- [USER_UPDATE](discordeno_bot.BotGatewayHandlerOptions.md#user_update)
- [VOICE_SERVER_UPDATE](discordeno_bot.BotGatewayHandlerOptions.md#voice_server_update)
- [VOICE_STATE_UPDATE](discordeno_bot.BotGatewayHandlerOptions.md#voice_state_update)
- [WEBHOOKS_UPDATE](discordeno_bot.BotGatewayHandlerOptions.md#webhooks_update)

## Properties

### CHANNEL_CREATE

• **CHANNEL_CREATE**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `payload`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`bot`, `payload`): `Promise`<`void`\>

##### Parameters

| Name      | Type                                                               |
| :-------- | :----------------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                     |
| `payload` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/bot/src/bot.ts:657](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L657)

---

### CHANNEL_DELETE

• **CHANNEL_DELETE**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`bot`, `data`): `Promise`<`void`\>

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/bot/src/bot.ts:658](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L658)

---

### CHANNEL_PINS_UPDATE

• **CHANNEL_PINS_UPDATE**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`bot`, `data`): `Promise`<`void`\>

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/bot/src/bot.ts:659](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L659)

---

### CHANNEL_UPDATE

• **CHANNEL_UPDATE**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`bot`, `data`): `Promise`<`void`\>

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/bot/src/bot.ts:660](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L660)

---

### GUILD_BAN_ADD

• **GUILD_BAN_ADD**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`bot`, `data`): `Promise`<`void`\>

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/bot/src/bot.ts:669](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L669)

---

### GUILD_BAN_REMOVE

• **GUILD_BAN_REMOVE**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`bot`, `data`): `Promise`<`void`\>

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/bot/src/bot.ts:670](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L670)

---

### GUILD_CREATE

• **GUILD_CREATE**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md), `shardId`: `number`) => `void`

#### Type declaration

▸ (`bot`, `data`, `shardId`): `void`

##### Parameters

| Name      | Type                                                               |
| :-------- | :----------------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data`    | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |
| `shardId` | `number`                                                           |

##### Returns

`void`

#### Defined in

[packages/bot/src/bot.ts:671](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L671)

---

### GUILD_DELETE

• **GUILD_DELETE**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md), `shardId`: `number`) => `Promise`<`void`\>

#### Type declaration

▸ (`bot`, `data`, `shardId`): `Promise`<`void`\>

##### Parameters

| Name      | Type                                                               |
| :-------- | :----------------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data`    | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |
| `shardId` | `number`                                                           |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/bot/src/bot.ts:672](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L672)

---

### GUILD_EMOJIS_UPDATE

• **GUILD_EMOJIS_UPDATE**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`bot`, `data`): `Promise`<`void`\>

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/bot/src/bot.ts:673](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L673)

---

### GUILD_INTEGRATIONS_UPDATE

• **GUILD_INTEGRATIONS_UPDATE**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`bot`, `data`): `Promise`<`void`\>

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/bot/src/bot.ts:674](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L674)

---

### GUILD_MEMBERS_CHUNK

• **GUILD_MEMBERS_CHUNK**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `Promise`<{ `chunkCount`: `number` = payload.chunk_count; `chunkIndex`: `number` = payload.chunk_index; `guildId`: `bigint` ; `members`: [`Member`](discordeno_bot.Member.md)[] ; `nonce`: `undefined` \| `string` = payload.nonce; `notFound`: `undefined` \| `bigint`[] ; `presences`: `undefined` \| { `activities`: [`Activity`](discordeno_bot.Activity.md)[] ; `clientStatus`: { `desktop`: `undefined` \| `string` = presence.client_status.desktop; `mobile`: `undefined` \| `string` = presence.client_status.mobile; `web`: `undefined` \| `string` = presence.client_status.web } ; `guildId`: `bigint` ; `status`: [`PresenceStatus`](../enums/discordeno_bot.PresenceStatus.md) ; `user`: [`User`](discordeno_bot.User.md) }[] }\>

#### Type declaration

▸ (`bot`, `data`): `Promise`<{ `chunkCount`: `number` = payload.chunk_count; `chunkIndex`: `number` = payload.chunk_index; `guildId`: `bigint` ; `members`: [`Member`](discordeno_bot.Member.md)[] ; `nonce`: `undefined` \| `string` = payload.nonce; `notFound`: `undefined` \| `bigint`[] ; `presences`: `undefined` \| { `activities`: [`Activity`](discordeno_bot.Activity.md)[] ; `clientStatus`: { `desktop`: `undefined` \| `string` = presence.client_status.desktop; `mobile`: `undefined` \| `string` = presence.client_status.mobile; `web`: `undefined` \| `string` = presence.client_status.web } ; `guildId`: `bigint` ; `status`: [`PresenceStatus`](../enums/discordeno_bot.PresenceStatus.md) ; `user`: [`User`](discordeno_bot.User.md) }[] }\>

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`Promise`<{ `chunkCount`: `number` = payload.chunk_count; `chunkIndex`: `number` = payload.chunk_index; `guildId`: `bigint` ; `members`: [`Member`](discordeno_bot.Member.md)[] ; `nonce`: `undefined` \| `string` = payload.nonce; `notFound`: `undefined` \| `bigint`[] ; `presences`: `undefined` \| { `activities`: [`Activity`](discordeno_bot.Activity.md)[] ; `clientStatus`: { `desktop`: `undefined` \| `string` = presence.client_status.desktop; `mobile`: `undefined` \| `string` = presence.client_status.mobile; `web`: `undefined` \| `string` = presence.client_status.web } ; `guildId`: `bigint` ; `status`: [`PresenceStatus`](../enums/discordeno_bot.PresenceStatus.md) ; `user`: [`User`](discordeno_bot.User.md) }[] }\>

#### Defined in

[packages/bot/src/bot.ts:678](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L678)

---

### GUILD_MEMBER_ADD

• **GUILD_MEMBER_ADD**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`bot`, `data`): `Promise`<`void`\>

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/bot/src/bot.ts:675](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L675)

---

### GUILD_MEMBER_REMOVE

• **GUILD_MEMBER_REMOVE**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`bot`, `data`): `Promise`<`void`\>

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/bot/src/bot.ts:676](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L676)

---

### GUILD_MEMBER_UPDATE

• **GUILD_MEMBER_UPDATE**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`bot`, `data`): `Promise`<`void`\>

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/bot/src/bot.ts:677](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L677)

---

### GUILD_ROLE_CREATE

• **GUILD_ROLE_CREATE**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`bot`, `data`): `Promise`<`void`\>

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/bot/src/bot.ts:679](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L679)

---

### GUILD_ROLE_DELETE

• **GUILD_ROLE_DELETE**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`bot`, `data`): `Promise`<`void`\>

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/bot/src/bot.ts:680](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L680)

---

### GUILD_ROLE_UPDATE

• **GUILD_ROLE_UPDATE**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`bot`, `data`): `Promise`<`void`\>

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/bot/src/bot.ts:681](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L681)

---

### GUILD_SCHEDULED_EVENT_CREATE

• **GUILD_SCHEDULED_EVENT_CREATE**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md), `shardId`: `number`) => `void`

#### Type declaration

▸ (`bot`, `data`, `shardId`): `void`

##### Parameters

| Name      | Type                                                               |
| :-------- | :----------------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data`    | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |
| `shardId` | `number`                                                           |

##### Returns

`void`

#### Defined in

[packages/bot/src/bot.ts:682](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L682)

---

### GUILD_SCHEDULED_EVENT_DELETE

• **GUILD_SCHEDULED_EVENT_DELETE**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `void`

#### Type declaration

▸ (`bot`, `data`): `void`

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`void`

#### Defined in

[packages/bot/src/bot.ts:683](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L683)

---

### GUILD_SCHEDULED_EVENT_UPDATE

• **GUILD_SCHEDULED_EVENT_UPDATE**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `void`

#### Type declaration

▸ (`bot`, `data`): `void`

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`void`

#### Defined in

[packages/bot/src/bot.ts:684](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L684)

---

### GUILD_SCHEDULED_EVENT_USER_ADD

• **GUILD_SCHEDULED_EVENT_USER_ADD**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `unknown`

#### Type declaration

▸ (`bot`, `data`): `unknown`

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:685](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L685)

---

### GUILD_SCHEDULED_EVENT_USER_REMOVE

• **GUILD_SCHEDULED_EVENT_USER_REMOVE**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `unknown`

#### Type declaration

▸ (`bot`, `data`): `unknown`

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`unknown`

#### Defined in

[packages/bot/src/bot.ts:686](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L686)

---

### GUILD_UPDATE

• **GUILD_UPDATE**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md), `shardId`: `number`) => `void`

#### Type declaration

▸ (`bot`, `data`, `shardId`): `void`

##### Parameters

| Name      | Type                                                               |
| :-------- | :----------------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data`    | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |
| `shardId` | `number`                                                           |

##### Returns

`void`

#### Defined in

[packages/bot/src/bot.ts:687](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L687)

---

### INTEGRATION_CREATE

• **INTEGRATION_CREATE**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `void`

#### Type declaration

▸ (`bot`, `data`): `void`

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`void`

#### Defined in

[packages/bot/src/bot.ts:705](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L705)

---

### INTEGRATION_DELETE

• **INTEGRATION_DELETE**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `void`

#### Type declaration

▸ (`bot`, `data`): `void`

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`void`

#### Defined in

[packages/bot/src/bot.ts:707](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L707)

---

### INTEGRATION_UPDATE

• **INTEGRATION_UPDATE**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `void`

#### Type declaration

▸ (`bot`, `data`): `void`

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`void`

#### Defined in

[packages/bot/src/bot.ts:706](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L706)

---

### INTERACTION_CREATE

• **INTERACTION_CREATE**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`bot`, `data`): `Promise`<`void`\>

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/bot/src/bot.ts:688](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L688)

---

### INVITE_CREATE

• **INVITE_CREATE**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `void`

#### Type declaration

▸ (`bot`, `data`): `void`

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`void`

#### Defined in

[packages/bot/src/bot.ts:689](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L689)

---

### INVITE_DELETE

• **INVITE_DELETE**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `void`

#### Type declaration

▸ (`bot`, `data`): `void`

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`void`

#### Defined in

[packages/bot/src/bot.ts:690](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L690)

---

### MESSAGE_CREATE

• **MESSAGE_CREATE**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`bot`, `data`): `Promise`<`void`\>

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/bot/src/bot.ts:691](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L691)

---

### MESSAGE_DELETE

• **MESSAGE_DELETE**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`bot`, `data`): `Promise`<`void`\>

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/bot/src/bot.ts:693](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L693)

---

### MESSAGE_DELETE_BULK

• **MESSAGE_DELETE_BULK**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`bot`, `data`): `Promise`<`void`\>

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/bot/src/bot.ts:692](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L692)

---

### MESSAGE_REACTION_ADD

• **MESSAGE_REACTION_ADD**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`bot`, `data`): `Promise`<`void`\>

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/bot/src/bot.ts:694](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L694)

---

### MESSAGE_REACTION_REMOVE

• **MESSAGE_REACTION_REMOVE**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`bot`, `data`): `Promise`<`void`\>

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/bot/src/bot.ts:697](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L697)

---

### MESSAGE_REACTION_REMOVE_ALL

• **MESSAGE_REACTION_REMOVE_ALL**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`bot`, `data`): `Promise`<`void`\>

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/bot/src/bot.ts:695](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L695)

---

### MESSAGE_REACTION_REMOVE_EMOJI

• **MESSAGE_REACTION_REMOVE_EMOJI**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`bot`, `data`): `Promise`<`void`\>

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/bot/src/bot.ts:696](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L696)

---

### MESSAGE_UPDATE

• **MESSAGE_UPDATE**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`bot`, `data`): `Promise`<`void`\>

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/bot/src/bot.ts:698](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L698)

---

### PRESENCE_UPDATE

• **PRESENCE_UPDATE**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`bot`, `data`): `Promise`<`void`\>

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/bot/src/bot.ts:699](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L699)

---

### READY

• **READY**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md), `shardId`: `number`) => `void`

#### Type declaration

▸ (`bot`, `data`, `shardId`): `void`

##### Parameters

| Name      | Type                                                               |
| :-------- | :----------------------------------------------------------------- |
| `bot`     | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data`    | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |
| `shardId` | `number`                                                           |

##### Returns

`void`

#### Defined in

[packages/bot/src/bot.ts:656](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L656)

---

### STAGE_INSTANCE_CREATE

• **STAGE_INSTANCE_CREATE**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `void`

#### Type declaration

▸ (`bot`, `data`): `void`

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`void`

#### Defined in

[packages/bot/src/bot.ts:666](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L666)

---

### STAGE_INSTANCE_DELETE

• **STAGE_INSTANCE_DELETE**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `void`

#### Type declaration

▸ (`bot`, `data`): `void`

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`void`

#### Defined in

[packages/bot/src/bot.ts:668](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L668)

---

### STAGE_INSTANCE_UPDATE

• **STAGE_INSTANCE_UPDATE**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `void`

#### Type declaration

▸ (`bot`, `data`): `void`

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`void`

#### Defined in

[packages/bot/src/bot.ts:667](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L667)

---

### THREAD_CREATE

• **THREAD_CREATE**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`bot`, `data`): `Promise`<`void`\>

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/bot/src/bot.ts:661](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L661)

---

### THREAD_DELETE

• **THREAD_DELETE**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`bot`, `data`): `Promise`<`void`\>

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/bot/src/bot.ts:663](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L663)

---

### THREAD_LIST_SYNC

• **THREAD_LIST_SYNC**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `Promise`<{ `channelIds`: `undefined` \| `bigint`[] ; `guildId`: `bigint` ; `members`: { `id`: `undefined` \| `bigint` ; `joinTimestamp`: `number` ; `userId`: `undefined` \| `bigint` }[] ; `threads`: [`Channel`](discordeno_bot.Channel.md)[] }\>

#### Type declaration

▸ (`bot`, `data`): `Promise`<{ `channelIds`: `undefined` \| `bigint`[] ; `guildId`: `bigint` ; `members`: { `id`: `undefined` \| `bigint` ; `joinTimestamp`: `number` ; `userId`: `undefined` \| `bigint` }[] ; `threads`: [`Channel`](discordeno_bot.Channel.md)[] }\>

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`Promise`<{ `channelIds`: `undefined` \| `bigint`[] ; `guildId`: `bigint` ; `members`: { `id`: `undefined` \| `bigint` ; `joinTimestamp`: `number` ; `userId`: `undefined` \| `bigint` }[] ; `threads`: [`Channel`](discordeno_bot.Channel.md)[] }\>

#### Defined in

[packages/bot/src/bot.ts:664](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L664)

---

### THREAD_MEMBERS_UPDATE

• **THREAD_MEMBERS_UPDATE**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`bot`, `data`): `Promise`<`void`\>

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/bot/src/bot.ts:665](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L665)

---

### THREAD_UPDATE

• **THREAD_UPDATE**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`bot`, `data`): `Promise`<`void`\>

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/bot/src/bot.ts:662](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L662)

---

### TYPING_START

• **TYPING_START**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `void`

#### Type declaration

▸ (`bot`, `data`): `void`

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`void`

#### Defined in

[packages/bot/src/bot.ts:700](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L700)

---

### USER_UPDATE

• **USER_UPDATE**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`bot`, `data`): `Promise`<`void`\>

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/bot/src/bot.ts:701](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L701)

---

### VOICE_SERVER_UPDATE

• **VOICE_SERVER_UPDATE**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`bot`, `data`): `Promise`<`void`\>

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/bot/src/bot.ts:702](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L702)

---

### VOICE_STATE_UPDATE

• **VOICE_STATE_UPDATE**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `Promise`<`void`\>

#### Type declaration

▸ (`bot`, `data`): `Promise`<`void`\>

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`Promise`<`void`\>

#### Defined in

[packages/bot/src/bot.ts:703](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L703)

---

### WEBHOOKS_UPDATE

• **WEBHOOKS_UPDATE**: (`bot`: [`Bot`](discordeno_bot.Bot.md), `data`: [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md)) => `void`

#### Type declaration

▸ (`bot`, `data`): `void`

##### Parameters

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `bot`  | [`Bot`](discordeno_bot.Bot.md)                                     |
| `data` | [`DiscordGatewayPayload`](discordeno_bot.DiscordGatewayPayload.md) |

##### Returns

`void`

#### Defined in

[packages/bot/src/bot.ts:704](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/bot.ts#L704)
