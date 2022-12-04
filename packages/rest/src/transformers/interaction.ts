import {
  ChannelTypes,
  DiscordInteraction,
  DiscordInteractionDataOption,
  DiscordInteractionDataResolved,
  Optionalize
} from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../restManager.js'
import { Attachment } from './attachment.js'
import { Member, User } from './member.js'
import { Message } from './message.js'
import { Role } from './role.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformInteraction (
  rest: RestManager,
  payload: DiscordInteraction
) {
  const guildId = payload.guild_id
    ? rest.transformers.snowflake(payload.guild_id)
    : undefined
  const user = rest.transformers.user(
    rest,
    payload.member?.user ?? payload.user!
  )

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
    id: rest.transformers.snowflake(payload.id),
    applicationId: rest.transformers.snowflake(payload.application_id),
    appPermissions: payload.app_permissions
      ? rest.transformers.snowflake(payload.app_permissions)
      : undefined,
    message: payload.message
      ? rest.transformers.message(rest, payload.message)
      : undefined,
    channelId: payload.channel_id
      ? rest.transformers.snowflake(payload.channel_id)
      : undefined,
    member:
      payload.member && guildId
        ? rest.transformers.member(rest, payload.member, guildId, user.id)
        : undefined,

    data: payload.data
      ? {
          componentType: payload.data.component_type,
          customId: payload.data.custom_id,
          components: payload.data.components?.map((component) =>
            rest.transformers.component(rest, component)
          ),
          values: payload.data.values,
          id: payload.data.id
            ? rest.transformers.snowflake(payload.data.id)
            : undefined,
          name: payload.data.name,
          resolved: payload.data.resolved
            ? transformInteractionDataResolved(
              rest,
              payload.data.resolved,
              guildId
            )
            : undefined,
          options: payload.data.options?.map((opt) =>
            rest.transformers.interactionDataOptions(rest, opt)
          ),
          targetId: payload.data.target_id
            ? rest.transformers.snowflake(payload.data.target_id)
            : undefined,
          guildId: payload.data.guild_id
            ? rest.transformers.snowflake(payload.data.guild_id)
            : undefined
        }
      : undefined
  }

  return interaction
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformInteractionDataOption (
  rest: RestManager,
  option: DiscordInteractionDataOption
) {
  const opt = {
    name: option.name,
    type: option.type,
    value: option.value,
    options: option.options,
    focused: option.focused
  }

  return opt as Optionalize<typeof opt>
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformInteractionDataResolved (
  rest: RestManager,
  resolved: DiscordInteractionDataResolved,
  guildId?: bigint
) {
  const transformed: {
    messages?: Collection<bigint, Message>
    users?: Collection<bigint, User>
    members?: Collection<bigint, Member>
    roles?: Collection<bigint, Role>
    channels?: Collection<
      bigint,
    { id: bigint, name: string, type: ChannelTypes, permissions: bigint }
    >
    attachments?: Collection<bigint, Attachment>
  } = {}

  if (resolved.messages) {
    transformed.messages = new Collection(
      Object.entries(resolved.messages).map(([id, value]) => {
        const message: Message = rest.transformers.message(rest, value)
        return [message.id, message]
      })
    )
  }

  if (resolved.users) {
    transformed.users = new Collection(
      Object.entries(resolved.users).map(([id, value]) => {
        const user = rest.transformers.user(rest, value)
        return [user.id, user]
      })
    )
  }

  if (guildId && resolved.members) {
    transformed.members = new Collection(
      Object.entries(resolved.members).map(([id, value]) => {
        const member: Member = rest.transformers.member(
          rest,
          value,
          guildId,
          rest.transformers.snowflake(id)
        )
        return [member.id, member]
      })
    )
  }

  if (guildId && resolved.roles) {
    transformed.roles = new Collection(
      Object.entries(resolved.roles).map(([id, value]) => {
        const role = rest.transformers.role(rest, { role: value, guildId })
        return [role.id, role]
      })
    )
  }

  if (resolved.channels) {
    transformed.channels = new Collection(
      Object.entries(resolved.channels).map(([key, value]) => {
        const id = rest.transformers.snowflake(key)
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
            permissions: rest.transformers.snowflake(channel.permissions)
          }
        ]
      })
    )
  }

  if (resolved.attachments) {
    transformed.attachments = new Collection(
      Object.entries(resolved.attachments).map(([key, value]) => {
        const id = rest.transformers.snowflake(key)
        return [id, rest.transformers.attachment(rest, value)]
      })
    )
  }

  return transformed
}

export interface Interaction extends ReturnType<typeof transformInteraction> {}
export interface InteractionDataResolved
  extends ReturnType<typeof transformInteractionDataResolved> {}
export interface InteractionDataOption
  extends ReturnType<typeof transformInteractionDataOption> {}
