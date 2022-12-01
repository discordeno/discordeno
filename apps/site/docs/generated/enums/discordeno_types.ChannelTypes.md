[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / ChannelTypes

# Enumeration: ChannelTypes

[@discordeno/types](../modules/discordeno_types.md).ChannelTypes

https://discord.com/developers/docs/resources/channel#channel-object-channel-types

## Table of contents

### Enumeration Members

- [AnnouncementThread](discordeno_types.ChannelTypes.md#announcementthread)
- [DM](discordeno_types.ChannelTypes.md#dm)
- [GroupDm](discordeno_types.ChannelTypes.md#groupdm)
- [GuildAnnouncement](discordeno_types.ChannelTypes.md#guildannouncement)
- [GuildCategory](discordeno_types.ChannelTypes.md#guildcategory)
- [GuildDirectory](discordeno_types.ChannelTypes.md#guilddirectory)
- [GuildForum](discordeno_types.ChannelTypes.md#guildforum)
- [GuildStageVoice](discordeno_types.ChannelTypes.md#guildstagevoice)
- [GuildText](discordeno_types.ChannelTypes.md#guildtext)
- [GuildVoice](discordeno_types.ChannelTypes.md#guildvoice)
- [PrivateThread](discordeno_types.ChannelTypes.md#privatethread)
- [PublicThread](discordeno_types.ChannelTypes.md#publicthread)

## Enumeration Members

### AnnouncementThread

• **AnnouncementThread** = `10`

A temporary sub-channel within a GUILD_ANNOUNCEMENT channel

#### Defined in

[packages/types/src/shared.ts:308](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L308)

---

### DM

• **DM** = `1`

A direct message between users

#### Defined in

[packages/types/src/shared.ts:298](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L298)

---

### GroupDm

• **GroupDm** = `3`

A direct message between multiple users

#### Defined in

[packages/types/src/shared.ts:302](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L302)

---

### GuildAnnouncement

• **GuildAnnouncement** = `5`

A channel that users can follow and crosspost into their own server

#### Defined in

[packages/types/src/shared.ts:306](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L306)

---

### GuildCategory

• **GuildCategory** = `4`

An organizational category that contains up to 50 channels

#### Defined in

[packages/types/src/shared.ts:304](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L304)

---

### GuildDirectory

• **GuildDirectory** = `14`

A channel in a hub containing the listed servers

#### Defined in

[packages/types/src/shared.ts:316](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L316)

---

### GuildForum

• **GuildForum** = `15`

A channel which can only contains threads

#### Defined in

[packages/types/src/shared.ts:318](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L318)

---

### GuildStageVoice

• **GuildStageVoice** = `13`

A voice channel for hosting events with an audience

#### Defined in

[packages/types/src/shared.ts:314](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L314)

---

### GuildText

• **GuildText** = `0`

A text channel within a server

#### Defined in

[packages/types/src/shared.ts:296](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L296)

---

### GuildVoice

• **GuildVoice** = `2`

A voice channel within a server

#### Defined in

[packages/types/src/shared.ts:300](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L300)

---

### PrivateThread

• **PrivateThread** = `12`

A temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission

#### Defined in

[packages/types/src/shared.ts:312](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L312)

---

### PublicThread

• **PublicThread** = `11`

A temporary sub-channel within a GUILD_TEXT or GUILD_FORUM channel

#### Defined in

[packages/types/src/shared.ts:310](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L310)
