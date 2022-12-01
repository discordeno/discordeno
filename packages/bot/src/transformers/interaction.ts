import {
  ChannelTypes, DiscordInteraction,
  DiscordInteractionDataOption,
  DiscordInteractionDataResolved, Optionalize
} from '@discordeno/types'
import { Bot } from '../bot.js'
import { Collection } from '../util/collection.js'
import { Attachment } from './attachment.js'
import { Member, User } from './member.js'
import { Message } from './message.js'
import { Role } from './role.js'

export function transformInteraction (bot: Bot, payload: DiscordInteraction) {
  const guildId = payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined
  const user = bot.transformers.user(bot, ((payload.member?.user) != null) || payload.user!)

  const interaction = {
    // UNTRANSFORMED STUFF HERE
    type: payload.type,
    token: payload.token,
    version: payload.version,
    locale: payload.locale,
    guildLocale: payload.guild_locale,

    // TRANSFORMED STUFF BELOW
    guildId,
    user,
    id: bot.transformers.snowflake(payload.id),
    applicationId: bot.transformers.snowflake(payload.application_id),
    appPermissions: payload.app_permissions ? bot.transformers.snowflake(payload.app_permissions) : undefined,
    message: (payload.message != null) ? bot.transformers.message(bot, payload.message) : undefined,
    channelId: payload.channel_id ? bot.transformers.snowflake(payload.channel_id) : undefined,
    member: (payload.member != null) && guildId ? bot.transformers.member(bot, payload.member, guildId, user.id) : undefined,

    data: (payload.data != null)
      ? {
          componentType: payload.data.component_type,
          customId: payload.data.custom_id,
          components: payload.data.components?.map((component) => bot.transformers.component(bot, component)),
          values: payload.data.values,
          id: payload.data.id ? bot.transformers.snowflake(payload.data.id) : undefined,
          name: payload.data.name,
          resolved: (payload.data.resolved != null)
            ? transformInteractionDataResolved(bot, payload.data.resolved, guildId)
            : undefined,
          options: payload.data.options?.map((opt) => bot.transformers.interactionDataOptions(bot, opt)),
          targetId: payload.data.target_id ? bot.transformers.snowflake(payload.data.target_id) : undefined,
          guildId: payload.data.guild_id ? bot.transformers.snowflake(payload.data.guild_id) : undefined
        }
      : undefined
  }

  return interaction as Optionalize<typeof interaction>
}

export function transformInteractionDataOption (bot: Bot, option: DiscordInteractionDataOption) {
  const opt = {
    name: option.name,
    type: option.type,
    value: option.value,
    options: option.options,
    focused: option.focused
  }

  return opt as Optionalize<typeof opt>
}

export function transformInteractionDataResolved (bot: Bot, resolved: DiscordInteractionDataResolved, guildId?: bigint) {
  const transformed: {
    messages?: Collection<bigint, Message>
    users?: Collection<bigint, User>
    members?: Collection<bigint, Member>
    roles?: Collection<bigint, Role>
    channels?: Collection<bigint, { id: bigint, name: string, type: ChannelTypes, permissions: bigint }>
    attachments?: Collection<bigint, Attachment>
  } = {}

  if (resolved.messages != null) {
    transformed.messages = new Collection(
      Object.entries(resolved.messages).map(([id, value]) => {
        const message: Message = bot.transformers.message(bot, value)
        return [message.id, message]
      })
    )
  }

  if (resolved.users != null) {
    transformed.users = new Collection(
      Object.entries(resolved.users).map(([id, value]) => {
        const user = bot.transformers.user(bot, value)
        return [user.id, user]
      })
    )
  }

  if (guildId && (resolved.members != null)) {
    transformed.members = new Collection(
      Object.entries(resolved.members).map(([id, value]) => {
        const member: Member = bot.transformers.member(bot, value, guildId, bot.transformers.snowflake(id))
        return [member.id, member]
      })
    )
  }

  if (guildId && (resolved.roles != null)) {
    transformed.roles = new Collection(
      Object.entries(resolved.roles).map(([id, value]) => {
        const role = bot.transformers.role(bot, { role: value, guildId })
        return [role.id, role]
      })
    )
  }

  if (resolved.channels != null) {
    transformed.channels = new Collection(
      Object.entries(resolved.channels).map(([key, value]) => {
        const id = bot.transformers.snowflake(key)
        const channel = value as { id: string, name: string, type: ChannelTypes, permissions: string }
        return [
          id,
          {
            id,
            name: channel.name,
            type: channel.type,
            permissions: bot.transformers.snowflake(channel.permissions)
          }
        ]
      })
    )
  }

  if (resolved.attachments != null) {
    transformed.attachments = new Collection(
      Object.entries(resolved.attachments).map(([key, value]) => {
        const id = bot.transformers.snowflake(key)
        return [id, bot.transformers.attachment(bot, value)]
      })
    )
  }

  return transformed as Optionalize<typeof transformed>
}

export interface Interaction extends ReturnType<typeof transformInteraction> { }
export interface InteractionDataResolved extends ReturnType<typeof transformInteractionDataResolved> { }
export interface InteractionDataOption extends ReturnType<typeof transformInteractionDataOption> { }
