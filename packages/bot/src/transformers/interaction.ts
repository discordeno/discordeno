import {
  InteractionResponseTypes,
  InteractionTypes,
  type ApplicationCommandOptionTypes,
  type ApplicationCommandTypes,
  type BigString,
  type ChannelTypes,
  type DiscordInteraction,
  type DiscordInteractionDataOption,
  type InteractionCallbackData,
  type MessageComponentTypes,
} from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import {
  DiscordApplicationIntegrationType,
  type Bot,
  type Channel,
  type Component,
  type DiscordChannel,
  type DiscordInteractionContextType,
} from '../index.js'
import { MessageFlags, type DiscordInteractionDataResolved } from '../typings.js'
import type { Attachment } from './attachment.js'
import type { Member } from './member.js'
import type { Message } from './message.js'
import type { Role } from './role.js'
import type { User } from './user.js'

export interface Interaction extends BaseInteraction {
  /** The bot object */
  bot: Bot
  /** Whether or not this interaction has been responded to. */
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
  channel: Partial<Channel>
  /**
   * The ID of channel it was sent from
   *
   * @remarks
   * It is recommended that you begin using this channel field to identify the source channel of the interaction as they may deprecate the existing channel_id field in the future.
   */
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
  /** Mapping of installation contexts that the interaction was authorized for to related user or guild IDs. */
  authorizingIntegrationOwners: Partial<Record<DiscordApplicationIntegrationType, bigint>>
  /** Context where the interaction was triggered from */
  context?: DiscordInteractionContextType
}

export interface BaseInteraction {
  /**
   * Sends a response to an interaction.
   *
   * @remarks
   * This will send a {@link InteractionResponseTypes.ChannelMessageWithSource}, {@link InteractionResponseTypes.ApplicationCommandAutocompleteResult} or {@link InteractionResponseTypes.Modal} response based on the type of the interaction you are responding to.
   *
   * If the interaction has been already acknowledged, indicated by {@link Interaction.acknowledged}, it will send a followup message instead.
   *
   * Uses `interaction.type`, `interaction.token` and `interaction.id`, missing one of these in the desired proprieties may cause unexpected behavior.
   */
  respond: (response: string | InteractionCallbackData, options?: { isPrivate?: boolean }) => Promise<Message | void>
  /**
   * Edit the original response of an interaction or a followup if the message id is provided.
   *
   * @remarks
   * This will edit the original interaction response or, if the interaction has not yet been acknowledged and the type of the interaction is {@link InteractionTypes.MessageComponent} it will instead send a {@link InteractionResponseTypes.UpdateMessage} response instead.
   *
   * Uses `interaction.type`, `interaction.token` and `interaction.id`, missing one of these in the desired proprieties may cause unexpected behavior.
   */
  edit: (response: string | InteractionCallbackData, messageId?: BigString) => Promise<Message | void>
  /**
   * Defer the interaction for updating the referenced message at a later time with {@link edit}.
   *
   * @remarks
   * This will send a {@link InteractionResponseTypes.DeferredUpdateMessage} response.
   *
   * Uses `interaction.type`, `interaction.token` and `interaction.id`, missing one of these in the desired proprieties may cause unexpected behavior.
   */
  deferEdit: () => Promise<void>
  /**
   * Defer the interaction for updating the response at a later time with {@link edit}.
   *
   * @remarks
   * This will send a {@link InteractionResponseTypes.DeferredChannelMessageWithSource} response.
   *
   * Uses `interaction.type`, `interaction.token` and `interaction.id`, missing one of these in the desired proprieties may cause unexpected behavior.
   */
  defer: (isPrivate?: boolean) => Promise<void>
  /**
   * Delete the original interaction response or a followup if the message id is provided.
   *
   * @remarks
   * Uses `interaction.type` and `interaction.token`, missing one of these in the desired proprieties may cause unexpected behavior.
   */
  delete: (messageId?: BigString) => Promise<void>
}

const baseInteraction: Partial<Interaction> & BaseInteraction = {
  async respond(response, options) {
    let type = InteractionResponseTypes.ChannelMessageWithSource

    // If user provides a string, change it to a response object
    if (typeof response === 'string') response = { content: response }

    // If user provides an object, determine if it should be an autocomplete or a modal response
    if (response.title) type = InteractionResponseTypes.Modal
    if (this.type === InteractionTypes.ApplicationCommandAutocomplete) type = InteractionResponseTypes.ApplicationCommandAutocompleteResult
    if (type === InteractionResponseTypes.ChannelMessageWithSource && options?.isPrivate) response.flags = MessageFlags.Ephemeral

    // Since this has already been given a response, any further responses must be followups.
    if (this.acknowledged) return await this.bot!.helpers.sendFollowupMessage(this.token!, response)

    // Modals cannot be chained
    if (this.type === InteractionTypes.ModalSubmit && type === InteractionResponseTypes.Modal)
      throw new Error('Cannot respond to a modal interaction with another modal.')

    this.acknowledged = true
    return await this.bot!.helpers.sendInteractionResponse(this.id!, this.token!, { type, data: response })
  },
  async edit(response, messageId) {
    if (this.type === InteractionTypes.ApplicationCommandAutocomplete) throw new Error('Cannot edit an autocomplete interaction.')

    // If user provides a string, change it to a response object
    if (typeof response === 'string') response = { content: response }

    if (messageId) {
      return await this.bot?.helpers.editFollowupMessage(this.token!, messageId, response)
    }

    if (!this.acknowledged) {
      if (this.type !== InteractionTypes.MessageComponent)
        throw new Error("This interaction has not been responded to yet and this isn't a MessageComponent interaction.")

      this.acknowledged = true
      return await this.bot!.helpers.sendInteractionResponse(this.id!, this.token!, { type: InteractionResponseTypes.UpdateMessage, data: response })
    }

    return await this.bot!.helpers.editOriginalInteractionResponse(this.token!, response)
  },
  async deferEdit() {
    if (this.type === InteractionTypes.ApplicationCommandAutocomplete) throw new Error('Cannot edit an autocomplete interaction.')
    if (this.acknowledged) throw new Error('Cannot defer an already responded interaction.')

    if (this.type !== InteractionTypes.MessageComponent)
      throw new Error("Cannot defer to then edit an interaction that isn't a MessageComponent interaction.")

    this.acknowledged = true
    return await this.bot!.helpers.sendInteractionResponse(this.id!, this.token!, { type: InteractionResponseTypes.DeferredUpdateMessage })
  },
  async defer(isPrivate) {
    if (this.acknowledged) throw new Error('Cannot defer an already responded interaction.')

    this.acknowledged = true
    return await this.bot!.helpers.sendInteractionResponse(this.id!, this.token!, {
      type: InteractionResponseTypes.DeferredChannelMessageWithSource,
      data: {
        flags: isPrivate ? MessageFlags.Ephemeral : undefined,
      },
    })
  },
  async delete(messageId) {
    if (this.type === InteractionTypes.ApplicationCommandAutocomplete) throw new Error('Cannot delete an autocomplete interaction')

    if (messageId) return await this.bot?.helpers.deleteFollowupMessage(this.token!, messageId)
    else return await this.bot?.helpers.deleteOriginalInteractionResponse(this.token!)
  },
}

export function transformInteraction(bot: Bot, payload: DiscordInteraction): Interaction {
  const guildId = payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined
  const user = bot.transformers.user(bot, payload.member?.user ?? payload.user!)

  const interaction: Interaction = Object.create(baseInteraction)
  const props = bot.transformers.desiredProperties.interaction
  interaction.bot = bot
  interaction.acknowledged = false

  if (props.id && payload.id) interaction.id = bot.transformers.snowflake(payload.id)
  if (props.applicationId && payload.application_id) interaction.applicationId = bot.transformers.snowflake(payload.application_id)
  if (props.type && payload.type) interaction.type = payload.type
  if (props.token && payload.token) interaction.token = payload.token
  if (props.version && payload.version) interaction.version = payload.version
  if (props.locale && payload.locale) interaction.locale = payload.locale
  if (props.guildLocale && payload.guild_locale) interaction.guildLocale = payload.guild_locale
  if (props.guildId && guildId) interaction.guildId = guildId
  if (props.user && user) interaction.user = user
  if (props.appPermissions && payload.app_permissions) interaction.appPermissions = bot.transformers.snowflake(payload.app_permissions)
  if (props.message && payload.message) interaction.message = bot.transformers.message(bot, payload.message)
  if (props.channel && payload.channel) interaction.channel = bot.transformers.channel(bot, { channel: payload.channel as DiscordChannel, guildId })
  if (props.channelId && payload.channel_id) interaction.channelId = bot.transformers.snowflake(payload.channel_id)
  if (props.member && guildId && payload.member) interaction.member = bot.transformers.member(bot, payload.member, guildId, user.id)
  if (props.authorizingIntegrationOwners && payload.authorizing_integration_owners) {
    interaction.authorizingIntegrationOwners = {}

    if (payload.authorizing_integration_owners['0'])
      interaction.authorizingIntegrationOwners[DiscordApplicationIntegrationType.GuildInstall] = bot.transformers.snowflake(
        payload.authorizing_integration_owners['0'],
      )
    if (payload.authorizing_integration_owners['1'])
      interaction.authorizingIntegrationOwners[DiscordApplicationIntegrationType.UserInstall] = bot.transformers.snowflake(
        payload.authorizing_integration_owners['1'],
      )
  }
  if (props.context && payload.context) interaction.context = payload.context
  if (props.data && payload.data) {
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
  } as InteractionDataOption

  return bot.transformers.customizers.interactionDataOptions(bot, option, opt)
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
