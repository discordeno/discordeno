import type {
  Camelize,
  DiscordApplication,
  DiscordChannel,
  DiscordMessage,
  DiscordThreadMember
} from '@discordeno/types'
import { s1nakelize1Application } from './application.js'
import { s1nakelize1Attachment } from './attachment.js'
import { s1nakelize1Channel } from './channel.js'
import { s1nakelize1Component } from './component.js'
import { s1nakelize1Embed } from './embed.js'
import { s1nakelize1Emoji } from './emoji.js'
import { s1nakelize1User } from './member.js'

export function s1nakelize1Message (
  payload: Camelize<DiscordMessage>
): DiscordMessage {
  return {
    id: payload.id,
    channel_id: payload.channelId,
    author: s1nakelize1User(payload.author),
    content: payload.content,
    timestamp: payload.timestamp,
    edited_timestamp: payload.editedTimestamp,
    tts: payload.tts,
    mention_everyone: payload.mentionEveryone,
    mentions: payload.mentions?.map((mention) => s1nakelize1User(mention)),
    mention_roles: payload.mentionRoles,
    mention_channels: payload.mentionChannels?.map((channel) => ({
      id: channel.id,
      guild_id: channel.guildId,
      type: channel.type,
      name: channel.name
    })),
    attachments: payload.attachments?.map((attachment) =>
      s1nakelize1Attachment(attachment)
    ),
    embeds: payload.embeds?.map((embed) => s1nakelize1Embed(embed)),
    reactions: payload.reactions?.map((reaction) => ({
      count: reaction.count,
      me: reaction.me,
      emoji: s1nakelize1Emoji(reaction.emoji)
    })),
    nonce: payload.nonce,
    pinned: payload.pinned,
    webhook_id: payload.webhookId,
    type: payload.type,
    activity: payload.activity && {
      type: payload.activity.type,
      party_id: payload.activity.partyId
    },
    application:
      payload.application &&
      s1nakelize1Application(
        payload.application as Camelize<DiscordApplication>
      ),
    application_id: payload.applicationId,
    message_reference: payload.messageReference && {
      message_id: payload.messageReference.messageId,
      channel_id: payload.messageReference.channelId,
      guild_id: payload.messageReference.guildId,
      fail_if_not_exists: payload.messageReference.failIfNotExists
    },
    flags: payload.flags,
    referenced_message:
      payload.referencedMessage &&
      s1nakelize1Message(payload.referencedMessage),
    interaction: payload.interaction,
    thread:
      payload.thread &&
      (s1nakelize1Channel(payload.thread) as Omit<DiscordChannel, 'member'> & {
        member: DiscordThreadMember
      }),
    components: payload.components?.map((component) =>
      s1nakelize1Component(component)
    ),
    sticker_items: payload.stickerItems?.map((stickerItem) => ({
      id: stickerItem.id,
      name: stickerItem.name,
      format_type: stickerItem.formatType
    })),
    position: payload.position
  }
}
