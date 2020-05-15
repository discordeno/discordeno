# Discordeno

Version 1 of this library is complete. The only concern is that it has not been heavily tested by developers yet. If any bugs are found while testing please open an issue and I will patch it ASAP. **If you are brave enough to help test it, I would welcome your help.**

Discord API library wrapper in Deno

[Discord Server](https://discord.gg/J4NqJ72)

## Bot Boilerplate Template / Frameworks

If you are just starting out, you can use the Discordeno Template repo to get the base of your bot pre-built for you. As other developers create other command frameworks for this library, those frameworks will be listed here:

**[Official Boilerplate](https://github.com/Skillz4Killz/Discordeno-bot-template):** This is a very minimalistic design for a boilerplate for your bot to get you started.

## Motivations/Features

This project began out of the desire to want to learn and enhance my developer skills. As I was building it, I encountered so many issues that other libraries have that I wanted to change in my library.

- **TYPESCRIPT:**
  - First class support for Typescript!
  - **STABILITY:**
    - One of the biggest issues with almost every library is stability. None of the libraries gave much love and attention to Typescript developers the way it deserves.
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

# Overview

This section will list out all the available methods and functionality in the library. When you use them in your editor you will be able to get much more useful information. Documentation is built into your editor.

## Events

```ts
.botUpdate(user, cachedUser)
.channelCreate(channel)
.channel_update(channel, cachedChannel)
.channelDelete(channel)
.guildBanAdd(guild, user)
.guildBanRemove(guild, user)
.guildCreate(guild)
.guildUpdate(guild, cachedGuild)
.guildDelete(guild)
.guildEmojisUpdate(guild, emojis, cachedEmojis)
.guildMemberAdd(guild, member)
.guildMemberRemove(guild, member)
.guild_member_update(guild, member, cachedMember)
.heartbeat()
.messageCreate(message)
.message_delete(message)
.nicknameUpdate(guild, member, nickname, old_nickname)
.presenceUpdate(data)
.raw(data)
.ready()
.reactionAdd(message, emoji, user_id)
.reactionRemove(message, emoji, user_id)
.reactionRemoveAll(data)
.reactionRemoveEmoji(dataReactionRemoveEmojiPayload)
.roleCreate(guild, role)
.roleDelete(guild, role)
.roleUpdate(guild, role, cached_role)
.role_gained(guild, member, role_id)
.role_lost(guild, member, role_id)
.typingStart(data)
.voiceChannelJoin(member, channel_id)
.voiceChannelLeave(member, channel_id)
.voiceChannelSwitch(member, channel_id, old_channel_id)
.voiceStateUpdate(member, voice_state)
.webhooksUpdate(channel_id, guild_id)
```

## Channel

- id
- type
- permission_overwrites
- guild_id
- position
- name
- topic
- last_message_id
- bitrate
- user_limit
- rate_limit_per_user
- parent_id
- last_pin_timestamp
- permissions
- nsfw
- mention
- raw
```ts
- .getMessage(id)
- .getMessages(options)
- .getPins()
- .sendMessages(content)
- .deleteMessages(ids, reason)
- .getInvites()
- .createInvite(options)
- .getWebhooks()
```

## Guild

- id
- name
- icon
- splash
- owner_id
- region
- afk_channel_id
- afk_timeout
- embed_enabled
- embed_channel_id
- verification_level
- roles
- emojis
- features
- mfa_level
- system_channel_id
- large
- unavailable
- memberCount
- voice_states
- members
- channels
- presences
- max_presences
- max_members
- vanity_url_code
- description
- banner
- premium_tier
- premium_subscription_count
- preferred_locale
- raw
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
- .editEmbed(enabled, channel_id)
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
  - mfa_enabled
  - locale
  - verified
  - email
  - flags
  - premium_type
- nick
- roles
- deaf
- mute
- raw
- joinedAt
- premiumSince
- tag
- mention
```ts
- .avatarURL(size, format)
- .addRole(roleID, reason)
- .remove_role(roleID, reason)
- .kick(reason)
- .edit(options)
- .hasPermissions(permissions)
```

## Message

- id
- channel_id
- guild_id?
- author
- member?
- content
- timestamp
- edited_timestamp
- tts
- mentions_everyone
- mentions
- mention_roles
- mention_channels?
- attachments
- embeds
- reactions?
- nonce?
- pinned
- webhook_id?
- type
- activity?
- applications?
- message_reference?
- flags?
- raw
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
- raw
- mention

## User

- id
- username
- discriminator
- avatar
- bot
- system
- mfa_enabled
- locale
- verified
- email
- flags
- premium_type
- mention
- tag
```ts
- .avatarURL(size, format)
```
