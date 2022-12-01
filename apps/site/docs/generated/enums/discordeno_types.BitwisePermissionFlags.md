[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / BitwisePermissionFlags

# Enumeration: BitwisePermissionFlags

[@discordeno/types](../modules/discordeno_types.md).BitwisePermissionFlags

https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags

## Table of contents

### Enumeration Members

- [ADD_REACTIONS](discordeno_types.BitwisePermissionFlags.md#add_reactions)
- [ADMINISTRATOR](discordeno_types.BitwisePermissionFlags.md#administrator)
- [ATTACH_FILES](discordeno_types.BitwisePermissionFlags.md#attach_files)
- [BAN_MEMBERS](discordeno_types.BitwisePermissionFlags.md#ban_members)
- [CHANGE_NICKNAME](discordeno_types.BitwisePermissionFlags.md#change_nickname)
- [CONNECT](discordeno_types.BitwisePermissionFlags.md#connect)
- [CREATE_INSTANT_INVITE](discordeno_types.BitwisePermissionFlags.md#create_instant_invite)
- [CREATE_PRIVATE_THREADS](discordeno_types.BitwisePermissionFlags.md#create_private_threads)
- [CREATE_PUBLIC_THREADS](discordeno_types.BitwisePermissionFlags.md#create_public_threads)
- [DEAFEN_MEMBERS](discordeno_types.BitwisePermissionFlags.md#deafen_members)
- [EMBED_LINKS](discordeno_types.BitwisePermissionFlags.md#embed_links)
- [KICK_MEMBERS](discordeno_types.BitwisePermissionFlags.md#kick_members)
- [MANAGE_CHANNELS](discordeno_types.BitwisePermissionFlags.md#manage_channels)
- [MANAGE_EMOJIS_AND_STICKERS](discordeno_types.BitwisePermissionFlags.md#manage_emojis_and_stickers)
- [MANAGE_EVENTS](discordeno_types.BitwisePermissionFlags.md#manage_events)
- [MANAGE_GUILD](discordeno_types.BitwisePermissionFlags.md#manage_guild)
- [MANAGE_MESSAGES](discordeno_types.BitwisePermissionFlags.md#manage_messages)
- [MANAGE_NICKNAMES](discordeno_types.BitwisePermissionFlags.md#manage_nicknames)
- [MANAGE_ROLES](discordeno_types.BitwisePermissionFlags.md#manage_roles)
- [MANAGE_THREADS](discordeno_types.BitwisePermissionFlags.md#manage_threads)
- [MANAGE_WEBHOOKS](discordeno_types.BitwisePermissionFlags.md#manage_webhooks)
- [MENTION_EVERYONE](discordeno_types.BitwisePermissionFlags.md#mention_everyone)
- [MODERATE_MEMBERS](discordeno_types.BitwisePermissionFlags.md#moderate_members)
- [MOVE_MEMBERS](discordeno_types.BitwisePermissionFlags.md#move_members)
- [MUTE_MEMBERS](discordeno_types.BitwisePermissionFlags.md#mute_members)
- [PRIORITY_SPEAKER](discordeno_types.BitwisePermissionFlags.md#priority_speaker)
- [READ_MESSAGE_HISTORY](discordeno_types.BitwisePermissionFlags.md#read_message_history)
- [REQUEST_TO_SPEAK](discordeno_types.BitwisePermissionFlags.md#request_to_speak)
- [SEND_MESSAGES](discordeno_types.BitwisePermissionFlags.md#send_messages)
- [SEND_MESSAGES_IN_THREADS](discordeno_types.BitwisePermissionFlags.md#send_messages_in_threads)
- [SEND_TTS_MESSAGES](discordeno_types.BitwisePermissionFlags.md#send_tts_messages)
- [SPEAK](discordeno_types.BitwisePermissionFlags.md#speak)
- [STREAM](discordeno_types.BitwisePermissionFlags.md#stream)
- [USE_EMBEDDED_ACTIVITIES](discordeno_types.BitwisePermissionFlags.md#use_embedded_activities)
- [USE_EXTERNAL_EMOJIS](discordeno_types.BitwisePermissionFlags.md#use_external_emojis)
- [USE_EXTERNAL_STICKERS](discordeno_types.BitwisePermissionFlags.md#use_external_stickers)
- [USE_SLASH_COMMANDS](discordeno_types.BitwisePermissionFlags.md#use_slash_commands)
- [USE_VAD](discordeno_types.BitwisePermissionFlags.md#use_vad)
- [VIEW_AUDIT_LOG](discordeno_types.BitwisePermissionFlags.md#view_audit_log)
- [VIEW_CHANNEL](discordeno_types.BitwisePermissionFlags.md#view_channel)
- [VIEW_GUILD_INSIGHTS](discordeno_types.BitwisePermissionFlags.md#view_guild_insights)

## Enumeration Members

### ADD_REACTIONS

• **ADD_REACTIONS** = `64`

Allows for the addition of reactions to messages

#### Defined in

[packages/types/src/shared.ts:595](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L595)

---

### ADMINISTRATOR

• **ADMINISTRATOR** = `8`

Allows all permissions and bypasses channel permission overwrites

#### Defined in

[packages/types/src/shared.ts:589](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L589)

---

### ATTACH_FILES

• **ATTACH_FILES** = `32768`

Allows for uploading images and files

#### Defined in

[packages/types/src/shared.ts:613](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L613)

---

### BAN_MEMBERS

• **BAN_MEMBERS** = `4`

Allows banning members

#### Defined in

[packages/types/src/shared.ts:587](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L587)

---

### CHANGE_NICKNAME

• **CHANGE_NICKNAME** = `67108864`

Allows for modification of own nickname

#### Defined in

[packages/types/src/shared.ts:635](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L635)

---

### CONNECT

• **CONNECT** = `1048576`

Allows for joining of a voice channel

#### Defined in

[packages/types/src/shared.ts:623](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L623)

---

### CREATE_INSTANT_INVITE

• **CREATE_INSTANT_INVITE** = `1`

Allows creation of instant invites

#### Defined in

[packages/types/src/shared.ts:583](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L583)

---

### CREATE_PRIVATE_THREADS

• **CREATE_PRIVATE_THREADS** = `68719476736`

Allows for creating private threads

#### Defined in

[packages/types/src/shared.ts:655](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L655)

---

### CREATE_PUBLIC_THREADS

• **CREATE_PUBLIC_THREADS** = `34359738368`

Allows for creating public and announcement threads

#### Defined in

[packages/types/src/shared.ts:653](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L653)

---

### DEAFEN_MEMBERS

• **DEAFEN_MEMBERS** = `8388608`

Allows for deafening of members in a voice channel

#### Defined in

[packages/types/src/shared.ts:629](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L629)

---

### EMBED_LINKS

• **EMBED_LINKS** = `16384`

Links sent by users with this permission will be auto-embedded

#### Defined in

[packages/types/src/shared.ts:611](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L611)

---

### KICK_MEMBERS

• **KICK_MEMBERS** = `2`

Allows kicking members

#### Defined in

[packages/types/src/shared.ts:585](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L585)

---

### MANAGE_CHANNELS

• **MANAGE_CHANNELS** = `16`

Allows management and editing of channels

#### Defined in

[packages/types/src/shared.ts:591](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L591)

---

### MANAGE_EMOJIS_AND_STICKERS

• **MANAGE_EMOJIS_AND_STICKERS** = `1073741824`

Allows management and editing of emojis and stickers

#### Defined in

[packages/types/src/shared.ts:643](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L643)

---

### MANAGE_EVENTS

• **MANAGE_EVENTS** = `8589934592`

Allows for creating, editing, and deleting scheduled events

#### Defined in

[packages/types/src/shared.ts:649](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L649)

---

### MANAGE_GUILD

• **MANAGE_GUILD** = `32`

Allows management and editing of the guild

#### Defined in

[packages/types/src/shared.ts:593](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L593)

---

### MANAGE_MESSAGES

• **MANAGE_MESSAGES** = `8192`

Allows for deletion of other users messages

#### Defined in

[packages/types/src/shared.ts:609](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L609)

---

### MANAGE_NICKNAMES

• **MANAGE_NICKNAMES** = `134217728`

Allows for modification of other users nicknames

#### Defined in

[packages/types/src/shared.ts:637](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L637)

---

### MANAGE_ROLES

• **MANAGE_ROLES** = `268435456`

Allows management and editing of roles

#### Defined in

[packages/types/src/shared.ts:639](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L639)

---

### MANAGE_THREADS

• **MANAGE_THREADS** = `17179869184`

Allows for deleting and archiving threads, and viewing all private threads

#### Defined in

[packages/types/src/shared.ts:651](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L651)

---

### MANAGE_WEBHOOKS

• **MANAGE_WEBHOOKS** = `536870912`

Allows management and editing of webhooks

#### Defined in

[packages/types/src/shared.ts:641](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L641)

---

### MENTION_EVERYONE

• **MENTION_EVERYONE** = `131072`

Allows for using the

**`Everyone`**

tag to notify all users in a channel, and the

**`Here`**

tag to notify all online users in a channel

#### Defined in

[packages/types/src/shared.ts:617](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L617)

---

### MODERATE_MEMBERS

• **MODERATE_MEMBERS** = `1099511627776`

Allows for timing out users to prevent them from sending or reacting to messages in chat and threads, and from speaking in voice and stage channels

#### Defined in

[packages/types/src/shared.ts:663](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L663)

---

### MOVE_MEMBERS

• **MOVE_MEMBERS** = `16777216`

Allows for moving of members between voice channels

#### Defined in

[packages/types/src/shared.ts:631](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L631)

---

### MUTE_MEMBERS

• **MUTE_MEMBERS** = `4194304`

Allows for muting members in a voice channel

#### Defined in

[packages/types/src/shared.ts:627](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L627)

---

### PRIORITY_SPEAKER

• **PRIORITY_SPEAKER** = `256`

Allows for using priority speaker in a voice channel

#### Defined in

[packages/types/src/shared.ts:599](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L599)

---

### READ_MESSAGE_HISTORY

• **READ_MESSAGE_HISTORY** = `65536`

Allows for reading of message history

#### Defined in

[packages/types/src/shared.ts:615](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L615)

---

### REQUEST_TO_SPEAK

• **REQUEST_TO_SPEAK** = `4294967296`

Allows for requesting to speak in stage channels.

#### Defined in

[packages/types/src/shared.ts:647](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L647)

---

### SEND_MESSAGES

• **SEND_MESSAGES** = `2048`

Allows for sending messages in a channel. (does not allow sending messages in threads)

#### Defined in

[packages/types/src/shared.ts:605](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L605)

---

### SEND_MESSAGES_IN_THREADS

• **SEND_MESSAGES_IN_THREADS** = `274877906944`

Allows for sending messages in threads

#### Defined in

[packages/types/src/shared.ts:659](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L659)

---

### SEND_TTS_MESSAGES

• **SEND_TTS_MESSAGES** = `4096`

Allows for sending of /tts messages

#### Defined in

[packages/types/src/shared.ts:607](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L607)

---

### SPEAK

• **SPEAK** = `2097152`

Allows for speaking in a voice channel

#### Defined in

[packages/types/src/shared.ts:625](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L625)

---

### STREAM

• **STREAM** = `512`

Allows the user to go live

#### Defined in

[packages/types/src/shared.ts:601](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L601)

---

### USE_EMBEDDED_ACTIVITIES

• **USE_EMBEDDED_ACTIVITIES** = `549755813888`

Allows for launching activities (applications with the `EMBEDDED` flag) in a voice channel.

#### Defined in

[packages/types/src/shared.ts:661](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L661)

---

### USE_EXTERNAL_EMOJIS

• **USE_EXTERNAL_EMOJIS** = `262144`

Allows the usage of custom emojis from other servers

#### Defined in

[packages/types/src/shared.ts:619](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L619)

---

### USE_EXTERNAL_STICKERS

• **USE_EXTERNAL_STICKERS** = `137438953472`

Allows the usage of custom stickers from other servers

#### Defined in

[packages/types/src/shared.ts:657](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L657)

---

### USE_SLASH_COMMANDS

• **USE_SLASH_COMMANDS** = `2147483648`

Allows members to use application commands in text channels

#### Defined in

[packages/types/src/shared.ts:645](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L645)

---

### USE_VAD

• **USE_VAD** = `33554432`

Allows for using voice-activity-detection in a voice channel

#### Defined in

[packages/types/src/shared.ts:633](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L633)

---

### VIEW_AUDIT_LOG

• **VIEW_AUDIT_LOG** = `128`

Allows for viewing of audit logs

#### Defined in

[packages/types/src/shared.ts:597](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L597)

---

### VIEW_CHANNEL

• **VIEW_CHANNEL** = `1024`

Allows guild members to view a channel, which includes reading messages in text channels and joining voice channels

#### Defined in

[packages/types/src/shared.ts:603](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L603)

---

### VIEW_GUILD_INSIGHTS

• **VIEW_GUILD_INSIGHTS** = `524288`

Allows for viewing guild insights

#### Defined in

[packages/types/src/shared.ts:621](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L621)
