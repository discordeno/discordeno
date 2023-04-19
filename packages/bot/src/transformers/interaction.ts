import {
  InteractionResponseTypes,
  type ApplicationCommandOptionTypes,
  type ApplicationCommandTypes,
  type CamelizedDiscordMessage,
  type ChannelTypes,
  type DiscordInteraction,
  type DiscordInteractionDataOption,
  type InteractionResponse,
  type InteractionTypes,
  type MessageComponentTypes,
} from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { Bot, Component } from '../index.js'
import type { DiscordInteractionDataResolved } from '../typings.js'
import type { Attachment } from './attachment.js'
import type { Member } from './member.js'
import type { Message } from './message.js'
import type { Role } from './role.js'
import type { User } from './user.js'

export interface Interaction {
  /** The bot object */
  bot: Bot
  /** Whether or not this interaction has been replied to. */
  acknowledged: boolean
  /** Id of the interaction */
  id: bigint
  /** Id of the application this interaction is for */
  applicationId: bigint
  /** The type of interaction */
  type: InteractionTypes
  /** The guild it was sent from */
  guildId?: bigint
  /** The channel it was sent from */
  channelId?: bigint
  /** Guild member data for the invoking user, including permissions */
  member?: Member
  /** User object for the invoking user, if invoked in a DM */
  user: User
  /** A continuation token for responding to the interaction */
  token: string
  /** Read-only property, always `1` */
  version: 1
  /** For the message the button was attached to */
  message?: Message
  /** the command data payload */
  data?: {
    type?: ApplicationCommandTypes
    componentType?: MessageComponentTypes
    customId?: string
    components?: Component[]
    values?: string[]
    name: string
    resolved?: InteractionDataResolved
    options?: InteractionDataOption[]
    id?: bigint
    targetId?: bigint
    // guildId?: bigint
  }
  /** The selected language of the invoking user */
  locale?: string
  /** The guild's preferred locale, if invoked in a guild */
  guildLocale?: string
  /** The computed permissions for a bot or app in the context of a specific interaction (including channel overwrites) */
  appPermissions: bigint
}

export interface BaseInteraction {
  respond: (response: string | InteractionResponse, options: { private: boolean }) => Promise<CamelizedDiscordMessage | void>
}

const baseInteraction: Partial<Interaction> & BaseInteraction = {
  async respond(response, options) {
    // If user provides a string, change it to response object
    if (typeof response === 'string') {
      response = {
        type: InteractionResponseTypes.DeferredChannelMessageWithSource,
        data: {
          content: response,
        },
      }
    }

    // If user wants to send a ephemeral message
    if (options.private && response.data) response.data.flags = 64
    // If user has not already responded to this interaction we need to send an original response
    if (!this.acknowledged) return await this.bot?.rest.sendInteractionResponse(this.id!, this.token!, response)
    // Since this has already been given a response, any further responses must be folloups.
    return await this.bot?.rest.sendFollowupMessage(this.token!, response.data!)
  },
}

export function transformInteraction(bot: Bot, payload: DiscordInteraction): Interaction {
  const guildId = payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined
  const user = bot.transformers.user(bot, payload.member?.user ?? payload.user!)

  const interaction: Interaction = Object.create(baseInteraction)
  const props = bot.transformers.desiredProperties.interaction
  interaction.bot = bot
  interaction.acknowledged = false

  if (payload.id && props.id) interaction.id = bot.transformers.snowflake(payload.id)
  if (payload.application_id && props.applicationId) interaction.applicationId = bot.transformers.snowflake(payload.application_id)
  if (payload.type && props.type) interaction.type = payload.type
  if (payload.token && props.token) interaction.token = payload.token
  if (payload.version && props.version) interaction.version = payload.version
  if (payload.locale && props.locale) interaction.locale = payload.locale
  if (payload.guild_locale && props.guildLocale) interaction.guildLocale = payload.guild_locale
  if (guildId && props.guildId) interaction.guildId = guildId
  if (props.user) interaction.user = user
  if (payload.app_permissions && props.appPermissions) interaction.appPermissions = bot.transformers.snowflake(payload.app_permissions)
  if (payload.message && props.message) interaction.message = bot.transformers.message(bot, payload.message)
  if (payload.channel_id && props.channelId) interaction.channelId = bot.transformers.snowflake(payload.channel_id)
  if (payload.member && guildId && props.member) interaction.member = bot.transformers.member(bot, payload.member, guildId, user.id)
  if (payload.data && props.data) {
    interaction.data = {
      type: payload.data.type,
      componentType: payload.data.component_type,
      customId: payload.data.custom_id,
      components: payload.data.components?.map((component) => bot.transformers.component(bot, component)),
      values: payload.data.values,
      id: payload.data.id ? bot.transformers.snowflake(payload.data.id) : undefined,
      name: payload.data.name,
      resolved: payload.data.resolved ? transformInteractionDataResolved(bot, payload.data.resolved, guildId) : undefined,
      options: payload.data.options?.map((opt) => bot.transformers.interactionDataOptions(bot, opt)),
      targetId: payload.data.target_id ? bot.transformers.snowflake(payload.data.target_id) : undefined,
      // guildId: payload.data.guild_id ? bot.transformers.snowflake(payload.data.guild_id) : undefined,
    }
  }

  return bot.transformers.customizers.interaction(bot, payload, interaction)
}

export function transformInteractionDataOption(bot: Bot, option: DiscordInteractionDataOption): InteractionDataOption {
  const opt = {
    name: option.name,
    type: option.type,
    value: option.value,
    options: option.options,
    focused: option.focused,
  }

  return opt
}

export function transformInteractionDataResolved(bot: Bot, resolved: DiscordInteractionDataResolved, guildId?: bigint): InteractionDataResolved {
  const transformed: InteractionDataResolved = {}

  if (resolved.messages) {
    transformed.messages = new Collection(
      Object.entries(resolved.messages).map(([id, value]) => {
        const message: Message = bot.transformers.message(bot, value)
        return [message.id, message]
      }),
    )
  }

  if (resolved.users) {
    transformed.users = new Collection(
      Object.entries(resolved.users).map(([id, value]) => {
        const user = bot.transformers.user(bot, value)
        return [user.id, user]
      }),
    )
  }

  if (guildId && resolved.members) {
    transformed.members = new Collection(
      Object.entries(resolved.members).map(([id, value]) => {
        const member: Member = bot.transformers.member(bot, value, guildId, bot.transformers.snowflake(id))
        return [member.id, member]
      }),
    )
  }

  if (guildId && resolved.roles) {
    transformed.roles = new Collection(
      Object.entries(resolved.roles).map(([id, value]) => {
        const role = bot.transformers.role(bot, { role: value, guildId })
        return [role.id, role]
      }),
    )
  }

  if (resolved.channels) {
    transformed.channels = new Collection(
      Object.entries(resolved.channels).map(([key, value]) => {
        const id = bot.transformers.snowflake(key)
        const channel = value as {
          id: string
          name: string
          type: ChannelTypes
          permissions: string
        }
        return [
          id,
          {
            id,
            name: channel.name,
            type: channel.type,
            permissions: bot.transformers.snowflake(channel.permissions),
          },
        ]
      }),
    )
  }

  if (resolved.attachments) {
    transformed.attachments = new Collection(
      Object.entries(resolved.attachments).map(([key, value]) => {
        const id = bot.transformers.snowflake(key)
        return [id, bot.transformers.attachment(bot, value)]
      }),
    )
  }

  return transformed
}

export interface InteractionDataResolved {
  messages?: Collection<bigint, Message>
  users?: Collection<bigint, User>
  members?: Collection<bigint, Member>
  roles?: Collection<bigint, Role>
  channels?: Collection<bigint, { id: bigint; name: string; type: ChannelTypes; permissions: bigint }>
  attachments?: Collection<bigint, Attachment>
}

export interface InteractionDataOption {
  name: string
  type: ApplicationCommandOptionTypes
  value?: string | number | boolean
  options?: InteractionDataOption[]
  focused?: boolean
}
