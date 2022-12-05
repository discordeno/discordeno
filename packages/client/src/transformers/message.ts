import type { DiscordMessage, Optionalize } from '@discordeno/types'
import { CHANNEL_MENTION_REGEX } from '@discordeno/utils'
import type { Client } from '../client.js'
import { MemberToggles } from './toggles/member.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformMessage (client: Client, payload: DiscordMessage) {
  const guildId = payload.guild_id
    ? client.transformers.snowflake(payload.guild_id)
    : undefined
  const userId = client.transformers.snowflake(payload.author.id)

  const message = {
    // UNTRANSFORMED STUFF HERE
    content: payload.content ?? '',
    isFromClient: payload.author.bot ?? false,
    tag: `${payload.author.username}#${payload.author.discriminator}`,
    timestamp: Date.parse(payload.timestamp),
    editedTimestamp: payload.edited_timestamp
      ? Date.parse(payload.edited_timestamp)
      : undefined,
    bitfield:
      (payload.tts ? 1n : 0n) |
      (payload.mention_everyone ? 2n : 0n) |
      (payload.pinned ? 4n : 0n),
    attachments: payload.attachments?.map((attachment) =>
      client.transformers.attachment(client, attachment)
    ),
    embeds: payload.embeds?.map((embed) =>
      client.transformers.embed(client, embed)
    ),
    reactions: payload.reactions?.map((reaction) => ({
      me: reaction.me,
      count: reaction.count,
      emoji: client.transformers.emoji(client, reaction.emoji)
    })),
    type: payload.type,
    activity: payload.activity
      ? {
          type: payload.activity.type,
          partyId: payload.activity.party_id
        }
      : undefined,
    application: payload.application,
    flags: payload.flags,
    interaction: payload.interaction
      ? {
          id: client.transformers.snowflake(payload.interaction.id),
          type: payload.interaction.type,
          name: payload.interaction.name,
          user: client.transformers.user(client, payload.interaction.user),
          member: payload.interaction.member
            ? {
                id: userId,
                guildId,
                nick: payload.interaction.member.nick ?? undefined,
                roles: payload.interaction.member.roles?.map((id) =>
                  client.transformers.snowflake(id)
                ),
                joinedAt: payload.interaction.member.joined_at
                  ? Date.parse(payload.interaction.member.joined_at)
                  : undefined,
                premiumSince: payload.interaction.member.premium_since
                  ? Date.parse(payload.interaction.member.premium_since)
                  : undefined,
                toggles: new MemberToggles(payload.interaction.member),
                avatar: payload.interaction.member.avatar
                  ? client.utils.iconHashToBigInt(
                    payload.interaction.member.avatar
                  )
                  : undefined,
                permissions: payload.interaction.member.permissions
                  ? client.transformers.snowflake(
                    payload.interaction.member.permissions
                  )
                  : undefined,
                communicationDisabledUntil: payload.interaction.member
                  .communication_disabled_until
                  ? Date.parse(
                    payload.interaction.member.communication_disabled_until
                  )
                  : undefined
              }
            : undefined
        }
      : undefined,
    thread: payload.thread
      ? client.transformers.channel(client, {
        channel: payload.thread,
        guildId
      })
      : undefined,
    components: payload.components?.map((component) =>
      client.transformers.component(client, component)
    ),
    stickerItems: payload.sticker_items?.map((sticker) => ({
      id: client.transformers.snowflake(sticker.id),
      name: sticker.name,
      formatType: sticker.format_type
    })),

    // TRANSFORMED STUFF BELOW
    id: client.transformers.snowflake(payload.id),
    guildId,
    channelId: client.transformers.snowflake(payload.channel_id),
    webhookId: payload.webhook_id
      ? client.transformers.snowflake(payload.webhook_id)
      : undefined,
    authorId: userId,
    applicationId: payload.application_id
      ? client.transformers.snowflake(payload.application_id)
      : undefined,
    messageReference: payload.message_reference
      ? {
          messageId: payload.message_reference.message_id
            ? client.transformers.snowflake(
              payload.message_reference.message_id
            )
            : undefined,
          channelId: payload.message_reference.channel_id
            ? client.transformers.snowflake(
              payload.message_reference.channel_id
            )
            : undefined,
          guildId: payload.message_reference.guild_id
            ? client.transformers.snowflake(payload.message_reference.guild_id)
            : undefined
        }
      : undefined,
    mentionedUserIds: payload.mentions
      ? payload.mentions.map((m) => client.transformers.snowflake(m.id))
      : [],
    mentionedRoleIds: payload.mention_roles
      ? payload.mention_roles.map((id) => client.transformers.snowflake(id))
      : [],
    mentionedChannelIds: [
      // Keep any ids tht discord sends
      ...(payload.mention_channels ?? []).map((m) =>
        client.transformers.snowflake(m.id)
      ),
      // Add any other ids that can be validated in a channel mention format
      ...(payload.content?.match(CHANNEL_MENTION_REGEX) ?? []).map((text) =>
        // converts the <#123> into 123
        client.transformers.snowflake(text.substring(2, text.length - 1))
      )
    ],
    member:
      payload.member && guildId
        ? client.transformers.member(client, payload.member, guildId, userId)
        : undefined,
    nonce: payload.nonce
  }

  return message as Optionalize<typeof message>
}

export interface Message extends ReturnType<typeof transformMessage> {}
