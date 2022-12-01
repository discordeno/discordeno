[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/rest](../modules/discordeno_rest.md) / DiscordThreadMetadata

# Interface: DiscordThreadMetadata

[@discordeno/rest](../modules/discordeno_rest.md).DiscordThreadMetadata

## Table of contents

### Properties

- [archive_timestamp](discordeno_rest.DiscordThreadMetadata.md#archive_timestamp)
- [archived](discordeno_rest.DiscordThreadMetadata.md#archived)
- [auto_archive_duration](discordeno_rest.DiscordThreadMetadata.md#auto_archive_duration)
- [create_timestamp](discordeno_rest.DiscordThreadMetadata.md#create_timestamp)
- [invitable](discordeno_rest.DiscordThreadMetadata.md#invitable)
- [locked](discordeno_rest.DiscordThreadMetadata.md#locked)

## Properties

### archive_timestamp

• **archive_timestamp**: `string`

Timestamp when the thread's archive status was last changed, used for calculating recent activity

#### Defined in

packages/types/dist/discord.d.ts:733

---

### archived

• **archived**: `boolean`

Whether the thread is archived

#### Defined in

packages/types/dist/discord.d.ts:725

---

### auto_archive_duration

• **auto_archive_duration**: `60` \| `1440` \| `4320` \| `10080`

Duration in minutes to automatically archive the thread after recent activity

#### Defined in

packages/types/dist/discord.d.ts:727

---

### create_timestamp

• `Optional` **create_timestamp**: `null` \| `string`

Timestamp when the thread was created; only populated for threads created after 2022-01-09

#### Defined in

packages/types/dist/discord.d.ts:735

---

### invitable

• `Optional` **invitable**: `boolean`

whether non-moderators can add other non-moderators to a thread; only available on private threads

#### Defined in

packages/types/dist/discord.d.ts:731

---

### locked

• **locked**: `boolean`

When a thread is locked, only users with `MANAGE_THREADS` can unarchive it

#### Defined in

packages/types/dist/discord.d.ts:729
