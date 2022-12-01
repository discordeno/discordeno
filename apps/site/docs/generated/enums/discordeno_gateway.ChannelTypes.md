[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / ChannelTypes

# Enumeration: ChannelTypes

[@discordeno/gateway](../modules/discordeno_gateway.md).ChannelTypes

https://discord.com/developers/docs/resources/channel#channel-object-channel-types

## Table of contents

### Enumeration Members

- [AnnouncementThread](discordeno_gateway.ChannelTypes.md#announcementthread)
- [DM](discordeno_gateway.ChannelTypes.md#dm)
- [GroupDm](discordeno_gateway.ChannelTypes.md#groupdm)
- [GuildAnnouncement](discordeno_gateway.ChannelTypes.md#guildannouncement)
- [GuildCategory](discordeno_gateway.ChannelTypes.md#guildcategory)
- [GuildDirectory](discordeno_gateway.ChannelTypes.md#guilddirectory)
- [GuildForum](discordeno_gateway.ChannelTypes.md#guildforum)
- [GuildStageVoice](discordeno_gateway.ChannelTypes.md#guildstagevoice)
- [GuildText](discordeno_gateway.ChannelTypes.md#guildtext)
- [GuildVoice](discordeno_gateway.ChannelTypes.md#guildvoice)
- [PrivateThread](discordeno_gateway.ChannelTypes.md#privatethread)
- [PublicThread](discordeno_gateway.ChannelTypes.md#publicthread)

## Enumeration Members

### AnnouncementThread

• **AnnouncementThread** = `10`

A temporary sub-channel within a GUILD_ANNOUNCEMENT channel

#### Defined in

packages/types/dist/shared.d.ts:282

---

### DM

• **DM** = `1`

A direct message between users

#### Defined in

packages/types/dist/shared.d.ts:272

---

### GroupDm

• **GroupDm** = `3`

A direct message between multiple users

#### Defined in

packages/types/dist/shared.d.ts:276

---

### GuildAnnouncement

• **GuildAnnouncement** = `5`

A channel that users can follow and crosspost into their own server

#### Defined in

packages/types/dist/shared.d.ts:280

---

### GuildCategory

• **GuildCategory** = `4`

An organizational category that contains up to 50 channels

#### Defined in

packages/types/dist/shared.d.ts:278

---

### GuildDirectory

• **GuildDirectory** = `14`

A channel in a hub containing the listed servers

#### Defined in

packages/types/dist/shared.d.ts:290

---

### GuildForum

• **GuildForum** = `15`

A channel which can only contains threads

#### Defined in

packages/types/dist/shared.d.ts:292

---

### GuildStageVoice

• **GuildStageVoice** = `13`

A voice channel for hosting events with an audience

#### Defined in

packages/types/dist/shared.d.ts:288

---

### GuildText

• **GuildText** = `0`

A text channel within a server

#### Defined in

packages/types/dist/shared.d.ts:270

---

### GuildVoice

• **GuildVoice** = `2`

A voice channel within a server

#### Defined in

packages/types/dist/shared.d.ts:274

---

### PrivateThread

• **PrivateThread** = `12`

A temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission

#### Defined in

packages/types/dist/shared.d.ts:286

---

### PublicThread

• **PublicThread** = `11`

A temporary sub-channel within a GUILD_TEXT or GUILD_FORUM channel

#### Defined in

packages/types/dist/shared.d.ts:284
