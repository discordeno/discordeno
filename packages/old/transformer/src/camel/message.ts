import type {
  Camelize,
  DiscordApplication,
  DiscordMessage
} from '@discordeno/types'
import { c1amelize1Application } from './application.js'
import { c1amelize1Attachment } from './attachment.js'
import { c1amelize1Channel } from './channel.js'
import { c1amelize1Component } from './component.js'
import { c1amelize1Embed } from './embed.js'
import { c1amelize1Emoji } from './emoji.js'
import { c1amelize1User } from './member.js'

export function c1amelize1Message (
  payload: DiscordMessage
): Camelize<DiscordMessage> {
  return {
    id: payload.id,
    channelId: payload.channel_id,
    author: c1amelize1User(payload.author),
    content: payload.content,
    timestamp: payload.timestamp,
    editedTimestamp: payload.edited_timestamp,
    tts: payload.tts,
    mentionEveryone: payload.mention_everyone,
    mentions: payload.mentions?.map((mention) => c1amelize1User(mention)),
    mentionRoles: payload.mention_roles,
    mentionChannels: payload.mention_channels?.map((channel) => ({
      id: channel.id,
      guildId: channel.guild_id,
      type: channel.type,
      name: channel.name
    })),
    attachments: payload.attachments?.map((attachment) =>
      c1amelize1Attachment(attachment)
    ),
    embeds: payload.embeds?.map((embed) => c1amelize1Embed(embed)),
    reactions: payload.reactions?.map((reaction) => ({
      count: reaction.count,
      me: reaction.me,
      emoji: c1amelize1Emoji(reaction.emoji)
    })),
    nonce: payload.nonce,
    pinned: payload.pinned,
    webhookId: payload.webhook_id,
    type: payload.type,
    activity: payload.activity && {
      type: payload.activity.type,
      partyId: payload.activity.party_id
    },
    application:
      payload.application &&
      c1amelize1Application(payload.application as DiscordApplication),
    applicationId: payload.application_id,
    messageReference: payload.message_reference && {
      messageId: payload.message_reference.message_id,
      channelId: payload.message_reference.channel_id,
      guildId: payload.message_reference.guild_id,
      failIfNotExists: payload.message_reference.fail_if_not_exists
    },
    flags: payload.flags,
    referencedMessage:
      payload.referenced_message &&
      c1amelize1Message(payload.referenced_message),
    interaction: payload.interaction,
    thread:
      payload.thread &&
      (c1amelize1Channel(payload.thread) as Camelize<typeof payload.thread>),
    components: payload.components?.map((component) =>
      c1amelize1Component(component)
    ),
    stickerItems: payload.sticker_items?.map((stickerItem) => ({
      id: stickerItem.id,
      name: stickerItem.name,
      formatType: stickerItem.format_type
    })),
    position: payload.position
  }
}
