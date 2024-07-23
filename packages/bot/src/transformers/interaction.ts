import {
  type ChannelTypes,
  DiscordApplicationIntegrationType,
  type DiscordInteraction,
  type DiscordInteractionDataOption,
  InteractionResponseTypes,
  InteractionTypes,
  MessageFlags,
} from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import {
  type Bot,
  type DiscordChannel,
  type Interaction,
  type InteractionDataOption,
  type InteractionDataResolved,
  type InteractionResolvedChannel,
  type Member,
  type Message,
} from '../index.js'
import type { DiscordInteractionDataResolved } from '../typings.js'

const baseInteraction = {
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
    return await this.bot.helpers.sendInteractionResponse(this.id, this.token, { type, data: response })
  },
  async edit(response, messageId) {
    if (this.type === InteractionTypes.ApplicationCommandAutocomplete) throw new Error('Cannot edit an autocomplete interaction.')

    // If user provides a string, change it to a response object
    if (typeof response === 'string') response = { content: response }

    if (messageId) {
      return await this.bot?.helpers.editFollowupMessage(this.token, messageId, response)
    }

    if (!this.acknowledged) {
      if (this.type !== InteractionTypes.MessageComponent)
        throw new Error("This interaction has not been responded to yet and this isn't a MessageComponent interaction.")

      this.acknowledged = true
      return await this.bot.helpers.sendInteractionResponse(this.id, this.token, { type: InteractionResponseTypes.UpdateMessage, data: response })
    }

    return await this.bot.helpers.editOriginalInteractionResponse(this.token, response)
  },
  async deferEdit() {
    if (this.type === InteractionTypes.ApplicationCommandAutocomplete) throw new Error('Cannot edit an autocomplete interaction.')
    if (this.acknowledged) throw new Error('Cannot defer an already responded interaction.')

    if (this.type !== InteractionTypes.MessageComponent)
      throw new Error("Cannot defer to then edit an interaction that isn't a MessageComponent interaction.")

    this.acknowledged = true
    return await this.bot.helpers.sendInteractionResponse(this.id, this.token, { type: InteractionResponseTypes.DeferredUpdateMessage })
  },
  async defer(isPrivate) {
    if (this.acknowledged) throw new Error('Cannot defer an already responded interaction.')

    this.acknowledged = true
    return await this.bot.helpers.sendInteractionResponse(this.id, this.token, {
      type: InteractionResponseTypes.DeferredChannelMessageWithSource,
      data: {
        flags: isPrivate ? MessageFlags.Ephemeral : undefined,
      },
    })
  },
  async delete(messageId) {
    if (this.type === InteractionTypes.ApplicationCommandAutocomplete) throw new Error('Cannot delete an autocomplete interaction')

    if (messageId) return await this.bot?.helpers.deleteFollowupMessage(this.token, messageId)
    else return await this.bot?.helpers.deleteOriginalInteractionResponse(this.token)
  },
} as Interaction

export function transformInteraction(bot: Bot, payload: { interaction: DiscordInteraction; shardId: number }): Interaction {
  const guildId = payload.interaction.guild_id ? bot.transformers.snowflake(payload.interaction.guild_id) : undefined
  const user = bot.transformers.user(bot, payload.interaction.member?.user ?? payload.interaction.user!)

  const interaction: Interaction = Object.create(baseInteraction)
  const props = bot.transformers.desiredProperties.interaction
  interaction.bot = bot
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
  if (props.message && payload.interaction.message) interaction.message = bot.transformers.message(bot, payload.interaction.message)
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
      resolved: payload.interaction.data.resolved ? transformInteractionDataResolved(bot, payload.interaction.data.resolved, guildId) : undefined,
      options: payload.interaction.data.options?.map((opt) => bot.transformers.interactionDataOptions(bot, opt)),
      targetId: payload.interaction.data.target_id ? bot.transformers.snowflake(payload.interaction.data.target_id) : undefined,
      // guildId: payload.interaction.data.guild_id ? bot.transformers.snowflake(payload.interaction.data.guild_id) : undefined,
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
      Object.entries(resolved.messages).map(([_id, value]) => {
        const message: Message = bot.transformers.message(bot, value)
        return [message.id, message]
      }),
    )
  }

  if (resolved.users) {
    transformed.users = new Collection(
      Object.entries(resolved.users).map(([_id, value]) => {
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
      Object.entries(resolved.roles).map(([_id, value]) => {
        const role = bot.transformers.role(bot, { role: value, guildId })
        return [role.id, role]
      }),
    )
  }

  if (resolved.channels) {
    transformed.channels = new Collection(
      Object.entries(resolved.channels).map(([_id, value]) => {
        const channel = bot.transformers.channel(bot, { channel: value }) as InteractionResolvedChannel
        return [channel.id, channel]
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
