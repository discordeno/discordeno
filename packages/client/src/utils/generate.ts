import type { DiscordChannel, DiscordInteraction } from '@discordeno/types'
import { ChannelTypes, InteractionTypes } from '@discordeno/types'
import type Client from '../Client.js'
import type { TextableChannel } from '../index.js'
import CategoryChannel from '../Structures/channels/Category.js'
import Channel from '../Structures/channels/Channel.js'
import GuildChannel from '../Structures/channels/Guild.js'
import NewsChannel from '../Structures/channels/News.js'
import PrivateChannel from '../Structures/channels/Private.js'
import StageChannel from '../Structures/channels/Stage.js'
import TextChannel from '../Structures/channels/Text.js'
import TextVoiceChannel from '../Structures/channels/TextVoice.js'
import NewsThreadChannel from '../Structures/channels/threads/NewsThread.js'
import PrivateThreadChannel from '../Structures/channels/threads/PrivateThread.js'
import PublicThreadChannel from '../Structures/channels/threads/PublicThread.js'
import AutocompleteInteraction from '../Structures/interactions/Autocomplete.js'
import CommandInteraction from '../Structures/interactions/Command.js'
import ComponentInteraction from '../Structures/interactions/Component.js'
import PingInteraction from '../Structures/interactions/Ping.js'
import UnknownInteraction from '../Structures/interactions/Unknown.js'

export function generateChannelFrom(data: DiscordChannel, client: Client): Channel {
  switch (data.type) {
    case ChannelTypes.GuildText: {
      return new TextChannel(data, client)
    }
    case ChannelTypes.DM: {
      return new PrivateChannel(data, client)
    }
    case ChannelTypes.GuildVoice: {
      return new TextVoiceChannel(data, client)
    }
    case ChannelTypes.GuildCategory: {
      return new CategoryChannel(data, client)
    }
    case ChannelTypes.GuildAnnouncement: {
      return new NewsChannel(data, client)
    }
    case ChannelTypes.AnnouncementThread: {
      return new NewsThreadChannel(data, client)
    }
    case ChannelTypes.PublicThread: {
      return new PublicThreadChannel(data, client)
    }
    case ChannelTypes.PrivateThread: {
      return new PrivateThreadChannel(data, client)
    }
    case ChannelTypes.GuildStageVoice: {
      return new StageChannel(data, client)
    }
  }
  if (data.guild_id) {
    if (data.last_message_id !== undefined) {
      client.emit('warn', new Error(`Unknown guild text channel type: ${data.type}\n${JSON.stringify(data)}`))
      return new TextChannel(data, client)
    }
    client.emit('warn', new Error(`Unknown guild channel type: ${data.type}\n${JSON.stringify(data)}`))
    return new GuildChannel(data, client)
  }
  client.emit('warn', new Error(`Unknown channel type: ${data.type}\n${JSON.stringify(data)}`))
  return new Channel(data, client)
}

export function generateInteractionFrom(
  data: DiscordInteraction,
  client: Client,
): UnknownInteraction<TextableChannel> | PingInteraction | CommandInteraction | ComponentInteraction | AutocompleteInteraction {
  switch (data.type) {
    case InteractionTypes.Ping: {
      return new PingInteraction(data, client)
    }
    case InteractionTypes.ApplicationCommand: {
      return new CommandInteraction(data, client)
    }
    case InteractionTypes.MessageComponent: {
      return new ComponentInteraction(data, client)
    }
    case InteractionTypes.ApplicationCommandAutocomplete: {
      return new AutocompleteInteraction(data, client)
    }
  }

  client.emit('warn', new Error(`Unknown interaction type: ${data.type}\n${JSON.stringify(data)}`))
  return new UnknownInteraction(data, client)
}
