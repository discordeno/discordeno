[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordMessageReference

# Interface: DiscordMessageReference

[@discordeno/types](../modules/discordeno_types.md).DiscordMessageReference

https://discord.com/developers/docs/resources/channel#message-object-message-reference-structure

## Table of contents

### Properties

- [channel_id](discordeno_types.DiscordMessageReference.md#channel_id)
- [fail_if_not_exists](discordeno_types.DiscordMessageReference.md#fail_if_not_exists)
- [guild_id](discordeno_types.DiscordMessageReference.md#guild_id)
- [message_id](discordeno_types.DiscordMessageReference.md#message_id)

## Properties

### channel_id

• `Optional` **channel_id**: `string`

id of the originating message's channel
Note: `channel_id` is optional when creating a reply, but will always be present when receiving an event/response that includes this data model.

#### Defined in

[packages/types/src/discord.ts:1121](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1121)

---

### fail_if_not_exists

• **fail_if_not_exists**: `boolean`

When sending, whether to error if the referenced message doesn't exist instead of sending as a normal (non-reply) message, default true

#### Defined in

[packages/types/src/discord.ts:1125](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1125)

---

### guild_id

• `Optional` **guild_id**: `string`

id of the originating message's guild

#### Defined in

[packages/types/src/discord.ts:1123](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1123)

---

### message_id

• `Optional` **message_id**: `string`

id of the originating message

#### Defined in

[packages/types/src/discord.ts:1116](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L1116)
