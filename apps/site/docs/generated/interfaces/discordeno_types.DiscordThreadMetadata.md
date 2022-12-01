[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / DiscordThreadMetadata

# Interface: DiscordThreadMetadata

[@discordeno/types](../modules/discordeno_types.md).DiscordThreadMetadata

## Table of contents

### Properties

- [archive_timestamp](discordeno_types.DiscordThreadMetadata.md#archive_timestamp)
- [archived](discordeno_types.DiscordThreadMetadata.md#archived)
- [auto_archive_duration](discordeno_types.DiscordThreadMetadata.md#auto_archive_duration)
- [create_timestamp](discordeno_types.DiscordThreadMetadata.md#create_timestamp)
- [invitable](discordeno_types.DiscordThreadMetadata.md#invitable)
- [locked](discordeno_types.DiscordThreadMetadata.md#locked)

## Properties

### archive_timestamp

• **archive_timestamp**: `string`

Timestamp when the thread's archive status was last changed, used for calculating recent activity

#### Defined in

[packages/types/src/discord.ts:852](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L852)

---

### archived

• **archived**: `boolean`

Whether the thread is archived

#### Defined in

[packages/types/src/discord.ts:844](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L844)

---

### auto_archive_duration

• **auto_archive_duration**: `60` \| `1440` \| `4320` \| `10080`

Duration in minutes to automatically archive the thread after recent activity

#### Defined in

[packages/types/src/discord.ts:846](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L846)

---

### create_timestamp

• `Optional` **create_timestamp**: `null` \| `string`

Timestamp when the thread was created; only populated for threads created after 2022-01-09

#### Defined in

[packages/types/src/discord.ts:854](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L854)

---

### invitable

• `Optional` **invitable**: `boolean`

whether non-moderators can add other non-moderators to a thread; only available on private threads

#### Defined in

[packages/types/src/discord.ts:850](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L850)

---

### locked

• **locked**: `boolean`

When a thread is locked, only users with `MANAGE_THREADS` can unarchive it

#### Defined in

[packages/types/src/discord.ts:848](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/discord.ts#L848)
