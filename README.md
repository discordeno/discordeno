# Discordeno

Discord API library wrapper in Deno

[Discord Server](https://discord.gg/J4NqJ72)

## Bot Boilerplate Template / Frameworks

If you are just starting out, you can use the Discordeno Template repo to get the base of your bot pre-built for you. As other developers create other command frameworks for this library, those frameworks will be listed here:

| Bot Name           | Developer          | Links | Description |
|--------------------|--------------------|---------------------------------------------------------|-----|
| Official Boilerplate | Skillz4Killz#4500 | [Github](https://github.com/Skillz4Killz/Discordeno-bot-template), [Support Server](https://discord.gg/J4NqJ72) | This is a very minimalistic design for a boilerplate for your bot to get you started. |
| DenoBot            | NTM Nathan#0001    | [Github](https://github.com/ntm-development/DenoBot), [Support Server](https://discord.com/invite/G2rb53z) | Another boilerplate example of the first one, with more commands and improvements. |

## Open Source Bots Using Discordeno

| Bot Name           | Developer          | Links |
|--------------------|--------------------|---------------------------------------------------------|
| discordeno-mattis  | Mattis6666         | [Github](https://github.com/Mattis6666/discordeno-mattis/) |

## Motivations/Features

This project began out of the desire to want to learn and enhance my developer skills. As I was building it, I encountered so many issues that other libraries have that I wanted to change in my library.

- **TYPESCRIPT:**
  - First class support for Typescript!
  - **STABILITY:**
    - One of the biggest issues with almost every library(I have used) is stability. None of the libraries gave much love and attention to Typescript developers the way it deserves.
      - Discord.JS developers continues to make breaking changes(on "stable" version) to TS projects without bumping the MAJOR version causing headaches for TS developers.
      - Eris was the most stable when it comes to JS, but in regards to TS, I was personally maintaing the typings and this was just a hassle to try and maintain when very few others cared to keep it properly maintained.
      - Detritus was in fact the best library for TS, but once again it lacked in proper stability. It only had 1 master branch and no signs of a proper stable version where I would not have to worry about breaking changes.
- **SECURITY:**
  - Check all permissions necessary before sending a request to the API.
  - Prevent supporting self-bots and abusive behavior.
  - Never supporting undocumented features.
- **Functional API:**
  - This will overall make a cleaner and more performant API, while removing the headaches of extending built-in classes, and inheritance.
  - Avoid as many headaches and issues related to `class` and `this`
  - Avoid EventEmitter to not have potential of memory leaks or bot crashes because of too many listeners or other silly issues.
  - Avoid for loops, while loops etc...
- **MINIMALISTIC:**
  - Prevent as many "options" for the sake of customizability. Prefer defaults that Discord recommends.
- **DOCUMENTATION:**
  - All of Discord API Documentation available inside your VSC while you code.
  - The entire libraries documentation is automatically available to you through intellisense.
- **LATEST AND GREATEST JAVASCRIPT:**
  - Backwards compatibility is the death of code. It causes clutter and uglyness to pile up and makes developers lazier.
  - There will be no such thing as backwards compatibility reasons in Discordeno.
  - We will always support the latest and greatest of JS in our code internally. The end!
  - That said, we don't expect many things to be changing drastically in regards to the public API after v1. As you can imagine Typescript allows the latest and greatest of JS so we will be ahead of the curve for years to come.
- **Unique 2 Versioning Systems**
  - Discordeno will have releases that comply with SemVer. To use this system you will simply use the `v2.0.0` system in your version.
    - `Note:` This means for every tiny bug fix/change you need to manually update the code every time. So if a new feature is added, you would need to bump the version in your code.
  - Each version is also available through a specific branch. For example `v2` branch holds all the version 2 code. This branch is always updated whenever a MINOR or PATCH update is made that will NOT break your bots.
    - `Note:` This means you never have to update your code EXCEPT when you are ready to bump to next MAJOR version. So if a new feature is added, it will be added automatically. If a small bug is fixed it will be automatic.

# Overview

This section will list out all the available methods and functionality in the library. When you use them in your editor you will be able to get much more useful information. Documentation is built into your editor.

## Events

```ts
.botUpdate(user, cachedUser)
.channelCreate(channel)
.channelUpdate(channel, cachedChannel)
.channelDelete(channel)
.guildBanAdd(guild, user)
.guildBanRemove(guild, user)
.guildCreate(guild)
.guildUpdate(guild, cachedGuild)
.guildDelete(guild)
.guildEmojisUpdate(guild, emojis, cachedEmojis)
.guildMemberAdd(guild, member)
.guildMemberRemove(guild, member)
.guildMemberUpdate(guild, member, cachedMember)
.heartbeat()
.messageCreate(message)
.messageDelete(message)
.nicknameUpdate(guild, member, nickname, oldNickname)
.presenceUpdate(data)
.ready()
.reactionAdd(message, emoji, userID)
.reactionRemove(message, emoji, userID)
.reactionRemoveAll(data)
.reactionRemoveEmoji(data)
.roleCreate(guild, role)
.roleDelete(guild, role)
.roleUpdate(guild, role, cachedRole)
.roleGained(guild, member, roleID)
.roleLost(guild, member, roleID)
.typingStart(data)
.voiceChannelJoin(member, channelID)
.voiceChannelLeave(member, channelID)
.voiceChannelSwitch(member, channelID, oldChannelID)
.voiceStateUpdate(member, voiceState)
.webhooksUpdate(channelID, guildID)
```

## Channel

- id
- type
- permission_overwrites (Raw Permission Bits provided by discord). Advanced only.
- permissions (Permission Strings For Better User Experience).
- guildID
- position
- name
- topic
- lastMessageID
- bitrate
- userLimit
- rateLimitPerUser
- parentID
- lastPinTimestamp
- nsfw
- mention
```ts
- .hasPermission(id, permissions)
- .getMessage(id)
- .getMessages(options)
- .getPins()
- .sendMessages(content)
- .deleteMessages(ids, reason)
- .getInvites()
- .createInvite(options)
- .getWebhooks()
- .edit(options)
```

## Guild

- id
- name
- icon
- splash
- ownerID
- region
- afkChannelID
- afkTimeout
- embedEnabled
- embedChannelID
- verificationLevel
- roles
- emojis
- features
- mfaLevel
- systemChannelID
- large
- unavailable
- memberCount
- voiceStates
- members
- channels
- presences
- maxPresences
- maxMembers
- vanityUrlCode
- description
- banner
- premiumTier
- premiumSubscriptionCount
- preferredLocale
- joinedAt
```ts
- .categoryChildrenIDs(id)
- .iconURL(size, format)
- .splashURL(size, format)
- .bannerURL(size, format)
- .createChannel(name, options)
- .getChannels()
- .swapChannels(channelPositions)
- .getMember(id)
- .editEmoji(id, options)
- .deleteEmoji(id, reason)
- .createRole(options, reason)
- .editRole(id, options)
- .deleteRole(id)
- .getRoles()
- .swapRoles(rolePositons)
- .getPruneCount(days)
- .pruneMembers(days)
- .fetchMembers(options)
- .getAuditLogs(options)
- .getEmbed()
- .editEmbed(enabled, channelID)
- .getVanityURL()
- .getIntegrations()
- .editIntegration(id, options)
- .deleteIntegration(id)
- .syncIntegration(id)
- .getBans()
- .ban(id, options: BanOptions)
- .unban(id)
- .edit(options)
- .getInvites()
- .leave()
- .getVoiceRegions()
- .getWebhooks()
```

## Member

- user
  - id
  - username
  - discriminator
  - avatar
  - bot
  - system
  - mfaEnabled
  - locale
  - verified
  - email
  - flags
  - premiumType
- nick
- roles
- deaf
- mute
- joinedAt
- premiumSince
- tag
- mention
- guildID
```ts
- .guild()
- .avatarURL(size, format)
- .addRole(roleID, reason)
- .removeRole(roleID, reason)
- .kick(reason)
- .edit(options)
- .hasPermissions(permissions)
```

## Message

- id
- channelID
- guildID
- member
- content
- tts
- mentionsEveryone
- mentions
- mentionRoles
- mentionChannels
- attachments
- embeds
- reactions
- nonce
- pinned
- webhook
- type
- activity
- applications
- messageReference
- flags
- author
- timestamp
- editedTimestamp
- channel
```ts
- .delete(reason)
- .pin()
- .unpin()
- .addReaction(reaction)
- .removeReaction(reaction)
- .removeAllReactions()
- .removeReactionEmoji(reaction)
- .getReactions(reaction)
- .edit(content)
```

## Role

- id
- name
- color
- hoist
- position
- permissions
- managed
- mentionable
- mention

## User

- id
- username
- discriminator
- avatar
- bot
- system
- mfaEnabled
- locale
- verified
- email
- flags
- premiumType
- mention
- tag
```ts
- .avatarURL(size, format)
```

## Utils

```ts
.editBotsStatus(status, name, type)
updateEventHandlers(eventHandlers)
```
