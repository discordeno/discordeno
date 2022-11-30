import type { Emoji } from '../deps.js'
import {
  Bot,
  Collection,
  DiscordChannel,
  DiscordGuildBanAddRemove,
  DiscordGuildEmojisUpdate,
  DiscordGuildMemberRemove,
  DiscordGuildRoleDelete,
  DiscordMessageDelete,
  DiscordMessageDeleteBulk,
  DiscordUnavailableGuild,
  DiscordVoiceState
} from '../deps.js'
import type { BotWithCache } from './addCacheCollections.js'

export function setupCacheRemovals<B extends Bot>(bot: BotWithCache<B>) {
  const {
    CHANNEL_DELETE,
    GUILD_BAN_ADD,
    GUILD_DELETE,
    GUILD_EMOJIS_UPDATE,
    GUILD_MEMBER_REMOVE,
    GUILD_ROLE_DELETE,
    MESSAGE_DELETE_BULK,
    VOICE_STATE_UPDATE
  } = bot.handlers

  bot.handlers.GUILD_DELETE = function (_, data, shardId) {
    const payload = data.d as DiscordUnavailableGuild
    const id = bot.transformers.snowflake(payload.id)

    bot.guilds.delete(id)
    bot.channels.forEach((channel) => {
      if (channel.guildId === id) bot.channels.delete(channel.id)
    })
    bot.members.forEach((member) => {
      if (member.guildId === id) bot.members.delete(member.id)
    })
    bot.messages.forEach((message) => {
      if (message.guildId === id) bot.messages.delete(message.id)
    })
    GUILD_DELETE(bot, data, shardId)
  }

  bot.handlers.CHANNEL_DELETE = function (_, data, shardId) {
    const payload = data.d as DiscordChannel
    // HANDLER BEFORE DELETING, BECAUSE HANDLER RUNS TRANSFORMER WHICH REACHES
    CHANNEL_DELETE(bot, data, shardId)

    const id = bot.transformers.snowflake(payload.id)
    bot.channels.delete(id)
    bot.messages.forEach((message) => {
      if (message.channelId === id) bot.messages.delete(message.id)
    })
  }

  bot.handlers.GUILD_MEMBER_REMOVE = function (_, data, shardId) {
    const payload = data.d as DiscordGuildMemberRemove
    bot.members.delete(bot.transformers.snowflake(payload.user.id))
    GUILD_MEMBER_REMOVE(bot, data, shardId)
  }

  bot.handlers.GUILD_BAN_ADD = function (_, data, shardId) {
    const payload = data.d as DiscordGuildBanAddRemove
    bot.members.delete(bot.transformers.snowflake(payload.user.id))
    GUILD_BAN_ADD(bot, data, shardId)
  }

  bot.handlers.GUILD_EMOJIS_UPDATE = function (_, data, shardId) {
    const payload = data.d as DiscordGuildEmojisUpdate
    const guild = bot.guilds.get(bot.transformers.snowflake(payload.guild_id))

    if (guild != null) {
      guild.emojis = new Collection(payload.emojis.map((e) => {
        const emoji: Emoji = bot.transformers.emoji(bot, e)
        return [emoji.id!, emoji]
      }))
    }

    GUILD_EMOJIS_UPDATE(bot, data, shardId)
  }

  bot.handlers.MESSAGE_DELETE = function (_, data) {
    const payload = data.d as DiscordMessageDelete
    const id = bot.transformers.snowflake(payload.id)
    const message = bot.messages.get(id)
    bot.events.messageDelete(bot, {
      id,
      channelId: bot.transformers.snowflake(payload.channel_id),
      guildId: payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined
    }, message)
    bot.messages.delete(id)
  }

  bot.handlers.MESSAGE_DELETE_BULK = function (_, data, shardId) {
    const payload = data.d as DiscordMessageDeleteBulk
    payload.ids.forEach((id) => bot.messages.delete(bot.transformers.snowflake(id)))
    MESSAGE_DELETE_BULK(bot, data, shardId)
  }

  bot.handlers.GUILD_ROLE_DELETE = function (_, data, shardId) {
    const payload = data.d as DiscordGuildRoleDelete
    const guild = bot.guilds.get(
      bot.transformers.snowflake(payload.guild_id)
    )
    const id = bot.transformers.snowflake(payload.role_id)

    if (guild != null) {
      guild.roles.delete(id)
      bot.members.forEach((member) => {
        // SKIP MEMBERS IN OTHER GUILDS
        if (member.guildId !== guild.id) return
        // SKIP MEMBERS WHO DON'T HAVE ROLE
        if (!member.roles.includes(id)) return
        // EDIT THE MEMBERS ROLES
        member.roles = member.roles.filter((roleId) => roleId !== id)
      })
    }

    GUILD_ROLE_DELETE(bot, data, shardId)
  }

  bot.handlers.VOICE_STATE_UPDATE = (_, data, shardId) => {
    const payload = data.d as DiscordVoiceState
    if (!payload.guild_id) return

    const vs = bot.transformers.voiceState(bot, {
      voiceState: payload,
      guildId: bot.transformers.snowflake(payload.guild_id)
    })

    if (!vs.channelId) bot.guilds.get(vs.guildId)?.voiceStates.delete(vs.userId)

    VOICE_STATE_UPDATE(bot, data, shardId)
  }
}
