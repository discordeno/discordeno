import {
  DiscordApplicationIntegrationType,
  type DiscordInteraction,
  type DiscordInteractionCallback,
  type DiscordInteractionCallbackResponse,
  type DiscordInteractionDataOption,
  type DiscordInteractionDataResolved,
  type DiscordInteractionResource,
  InteractionResponseTypes,
  InteractionTypes,
  MessageFlags,
} from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type {
  Bot,
  DiscordChannel,
  Interaction,
  InteractionCallback,
  InteractionCallbackResponse,
  InteractionDataOption,
  InteractionDataResolved,
  InteractionResolvedChannel,
  InteractionResource,
  InternalBot,
  Member,
  Message,
} from '../index.js'

export const baseInteraction: InternalBot['transformers']['$inferredTypes']['interaction'] = {
  // This allows typescript to still check for type errors on functions below
  ...(undefined as unknown as InternalBot['transformers']['$inferredTypes']['interaction']),

  async respond(response, options) {
    let type = InteractionResponseTypes.ChannelMessageWithSource

    // If user provides a string, change it to a response object
    if (typeof response === 'string') response = { content: response }

    // If user provides an object, determine if it should be an autocomplete or a modal response
    if (response.title) type = InteractionResponseTypes.Modal
    if (this.type === InteractionTypes.ApplicationCommandAutocomplete) type = InteractionResponseTypes.ApplicationCommandAutocompleteResult
    if (type === InteractionResponseTypes.ChannelMessageWithSource && options?.isPrivate) response.flags = MessageFlags.Ephemeral

    // Since this has already been given a response, any further responses must be followups.
    if (this.acknowledged) return await this.bot.helpers.sendFollowupMessage(this.token, response)

    // Modals cannot be chained
    if (this.type === InteractionTypes.ModalSubmit && type === InteractionResponseTypes.Modal)
      throw new Error('Cannot respond to a modal interaction with another modal.')

    this.acknowledged = true
    return await this.bot.helpers.sendInteractionResponse(this.id, this.token, { type, data: response }, { withResponse: options?.withResponse })
  },
  async edit(response, messageId, options) {
    if (this.type === InteractionTypes.ApplicationCommandAutocomplete) throw new Error('Cannot edit an autocomplete interaction.')

    // If user provides a string, change it to a response object
    if (typeof response === 'string') response = { content: response }

    if (messageId) {
      return await this.bot?.helpers.editFollowupMessage(this.token, messageId, response)
    }

    if (!this.acknowledged) {
      if (this.type !== InteractionTypes.MessageComponent && this.type !== InteractionTypes.ModalSubmit)
        throw new Error("This interaction has not been responded to yet and this isn't a MessageComponent or ModalSubmit interaction.")

      this.acknowledged = true
      return await this.bot.helpers.sendInteractionResponse(
        this.id,
        this.token,
        { type: InteractionResponseTypes.UpdateMessage, data: response },
        options,
      )
    }

    return await this.bot.helpers.editOriginalInteractionResponse(this.token, response)
  },
  async deferEdit(options) {
    if (this.type === InteractionTypes.ApplicationCommandAutocomplete) throw new Error('Cannot edit an autocomplete interaction.')
    if (this.acknowledged) throw new Error('Cannot defer an already responded interaction.')

    if (this.type !== InteractionTypes.MessageComponent && this.type !== InteractionTypes.ModalSubmit)
      throw new Error("Cannot defer to then edit an interaction that isn't a MessageComponent or ModalSubmit interaction.")

    this.acknowledged = true
    return await this.bot.helpers.sendInteractionResponse(this.id, this.token, { type: InteractionResponseTypes.DeferredUpdateMessage }, options)
  },
  async defer(isPrivate, options) {
    if (this.acknowledged) throw new Error('Cannot defer an already responded interaction.')

    this.acknowledged = true
    return await this.bot.helpers.sendInteractionResponse(
      this.id,
      this.token,
      {
        type: InteractionResponseTypes.DeferredChannelMessageWithSource,
        data: {
          flags: isPrivate ? MessageFlags.Ephemeral : undefined,
        },
      },
      options,
    )
  },
  async delete(messageId) {
    if (this.type === InteractionTypes.ApplicationCommandAutocomplete) throw new Error('Cannot delete an autocomplete interaction')

    if (messageId) return await this.bot?.helpers.deleteFollowupMessage(this.token, messageId)
    else return await this.bot?.helpers.deleteOriginalInteractionResponse(this.token)
  },
}

export function transformInteraction(
  bot: InternalBot,
  payload: { interaction: DiscordInteraction; shardId: number },
): typeof bot.transformers.$inferredTypes.interaction {
  const guildId = payload.interaction.guild_id ? bot.transformers.snowflake(payload.interaction.guild_id) : undefined
  const user = bot.transformers.user(bot, payload.interaction.member?.user ?? payload.interaction.user!)

  const interaction: Interaction = Object.create(baseInteraction)
  const props = bot.transformers.desiredProperties.interaction
  // Typescript has an hard time with this, so we need to tell him for sure this is a Bot
  interaction.bot = bot as unknown as Bot
  interaction.acknowledged = false

  if (props.id && payload.interaction.id) interaction.id = bot.transformers.snowflake(payload.interaction.id)
  if (props.applicationId && payload.interaction.application_id)
    interaction.applicationId = bot.transformers.snowflake(payload.interaction.application_id)
  if (props.type && payload.interaction.type) interaction.type = payload.interaction.type
  if (props.token && payload.interaction.token) interaction.token = payload.interaction.token
  if (props.version && payload.interaction.version) interaction.version = payload.interaction.version
  if (props.locale && payload.interaction.locale) interaction.locale = payload.interaction.locale
  if (props.guildLocale && payload.interaction.guild_locale) interaction.guildLocale = payload.interaction.guild_locale
  if (props.guild && payload.interaction.guild)
    // @ts-expect-error payload.interaction.guild is a Partial<DiscordGuild>
    interaction.guild = bot.transformers.guild(bot, { guild: payload.interaction.guild, shardId: payload.shardId })
  if (props.guildId && guildId) interaction.guildId = guildId
  if (props.user && user) interaction.user = user
  if (props.appPermissions && payload.interaction.app_permissions)
    interaction.appPermissions = bot.transformers.snowflake(payload.interaction.app_permissions)
  if (props.message && payload.interaction.message)
    interaction.message = bot.transformers.message(bot, { message: payload.interaction.message, shardId: 0 })
  if (props.channel && payload.interaction.channel)
    interaction.channel = bot.transformers.channel(bot, { channel: payload.interaction.channel as DiscordChannel, guildId })
  if (props.channelId && payload.interaction.channel_id) interaction.channelId = bot.transformers.snowflake(payload.interaction.channel_id)
  if (props.member && guildId && payload.interaction.member)
    interaction.member = bot.transformers.member(bot, payload.interaction.member, guildId, user.id)
  if (props.authorizingIntegrationOwners && payload.interaction.authorizing_integration_owners) {
    interaction.authorizingIntegrationOwners = {}

    if (payload.interaction.authorizing_integration_owners['0'])
      interaction.authorizingIntegrationOwners[DiscordApplicationIntegrationType.GuildInstall] = bot.transformers.snowflake(
        payload.interaction.authorizing_integration_owners['0'],
      )
    if (payload.interaction.authorizing_integration_owners['1'])
      interaction.authorizingIntegrationOwners[DiscordApplicationIntegrationType.UserInstall] = bot.transformers.snowflake(
        payload.interaction.authorizing_integration_owners['1'],
      )
  }
  if (props.context && payload.interaction.context) interaction.context = payload.interaction.context
  if (props.data && payload.interaction.data) {
    interaction.data = {
      type: payload.interaction.data.type,
      componentType: payload.interaction.data.component_type,
      customId: payload.interaction.data.custom_id,
      components: payload.interaction.data.components?.map((component) => bot.transformers.component(bot, component)),
      values: payload.interaction.data.values,
      id: payload.interaction.data.id ? bot.transformers.snowflake(payload.interaction.data.id) : undefined,
      name: payload.interaction.data.name,
      resolved: payload.interaction.data.resolved
        ? bot.transformers.interactionDataResolved(bot, { resolved: payload.interaction.data.resolved, shardId: payload.shardId, guildId })
        : undefined,
      options: payload.interaction.data.options?.map((opt) => bot.transformers.interactionDataOptions(bot, opt)),
      targetId: payload.interaction.data.target_id ? bot.transformers.snowflake(payload.interaction.data.target_id) : undefined,
    }
  }

  // Typescript has an hard time with interaction.bot, so we need to tell him for sure this interaction is the of the correct type
  return bot.transformers.customizers.interaction(bot, payload, interaction as unknown as typeof bot.transformers.$inferredTypes.interaction)
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

export function transformInteractionDataResolved(
  bot: InternalBot,
  payload: { resolved: DiscordInteractionDataResolved; shardId: number; guildId?: bigint },
): InteractionDataResolved {
  const transformed: InteractionDataResolved = {}

  if (payload.resolved.messages) {
    transformed.messages = new Collection(
      Object.entries(payload.resolved.messages).map(([_id, value]) => {
        const message: Message = bot.transformers.message(bot, { message: value, shardId: payload.shardId })
        return [message.id, message]
      }),
    )
  }

  if (payload.resolved.users) {
    transformed.users = new Collection(
      Object.entries(payload.resolved.users).map(([_id, value]) => {
        const user = bot.transformers.user(bot, value)
        return [user.id, user]
      }),
    )
  }

  if (payload.guildId && payload.resolved.members) {
    transformed.members = new Collection(
      Object.entries(payload.resolved.members).map(([id, value]) => {
        const member: Member = bot.transformers.member(bot, value, payload.guildId!, bot.transformers.snowflake(id))
        return [member.id, member]
      }),
    )
  }

  if (payload.guildId && payload.resolved.roles) {
    transformed.roles = new Collection(
      Object.entries(payload.resolved.roles).map(([_id, value]) => {
        const role = bot.transformers.role(bot, { role: value, guildId: payload.guildId! })
        return [role.id, role]
      }),
    )
  }

  if (payload.resolved.channels) {
    transformed.channels = new Collection(
      Object.entries(payload.resolved.channels).map(([_id, value]) => {
        const channel = bot.transformers.channel(bot, { channel: value }) as InteractionResolvedChannel
        return [channel.id, channel]
      }),
    )
  }

  if (payload.resolved.attachments) {
    transformed.attachments = new Collection(
      Object.entries(payload.resolved.attachments).map(([key, value]) => {
        const id = bot.transformers.snowflake(key)
        return [id, bot.transformers.attachment(bot, value)]
      }),
    )
  }

  return bot.transformers.customizers.interactionDataResolved(bot, payload, transformed)
}

export function transformInteractionCallbackResponse(
  bot: InternalBot,
  payload: { interactionCallbackResponse: DiscordInteractionCallbackResponse; shardId: number },
): typeof bot.transformers.$inferredTypes.interactionCallbackResponse {
  const props = bot.transformers.desiredProperties.interactionCallbackResponse
  const response = {} as InteractionCallbackResponse

  if (props.interaction && payload.interactionCallbackResponse.interaction)
    response.interaction = bot.transformers.interactionCallback(bot, payload.interactionCallbackResponse.interaction)
  if (props.resource && payload.interactionCallbackResponse.resource)
    response.resource = bot.transformers.interactionResource(bot, {
      interactionResource: payload.interactionCallbackResponse.resource,
      shardId: payload.shardId,
    })

  return bot.transformers.customizers.interactionCallbackResponse(bot, payload.interactionCallbackResponse, response)
}

export function transformInteractionCallback(
  bot: InternalBot,
  payload: DiscordInteractionCallback,
): typeof bot.transformers.$inferredTypes.interactionCallback {
  const props = bot.transformers.desiredProperties.interactionCallback
  const callback = {} as InteractionCallback

  if (props.id && payload.id) callback.id = bot.transformers.snowflake(payload.id)
  if (props.type && payload.type) callback.type = payload.type
  if (props.activityInstanceId && payload.activity_instance_id) callback.activityInstanceId = payload.activity_instance_id
  if (props.responseMessageId && payload.response_message_id) callback.responseMessageId = bot.transformers.snowflake(payload.response_message_id)
  if (props.responseMessageEphemeral && payload.response_message_ephemeral) callback.responseMessageEphemeral = payload.response_message_ephemeral
  if (props.responseMessageLoading && payload.response_message_loading) callback.responseMessageLoading = payload.response_message_loading

  return bot.transformers.customizers.interactionCallback(bot, payload, callback)
}

export function transformInteractionResource(
  bot: InternalBot,
  payload: { interactionResource: DiscordInteractionResource; shardId: number },
): typeof bot.transformers.$inferredTypes.interactionResource {
  const props = bot.transformers.desiredProperties.interactionResource
  const resource = {} as InteractionResource

  if (props.type && payload.interactionResource.type) resource.type = payload.interactionResource.type
  if (props.activityInstance && payload.interactionResource.activity_instance)
    resource.activityInstance = payload.interactionResource.activity_instance
  if (props.message && payload.interactionResource.message)
    resource.message = bot.transformers.message(bot, { message: payload.interactionResource.message, shardId: payload.shardId })

  return bot.transformers.customizers.interactionResource(bot, payload.interactionResource, resource)
}
