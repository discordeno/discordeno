import { Bot } from "../bot.ts";
import { DiscordMessage } from "../types/discord.ts";
import { CHANNEL_MENTION_REGEX } from "../util/constants.ts";
import { MemberToggles } from "./toggles/member.ts";
import { Optionalize } from "../types/shared.ts";

export function transformMessage(bot: Bot, payload: DiscordMessage) {
  const guildId = payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined;
  const userId = bot.transformers.snowflake(payload.author.id);

  const message = {
    // UNTRANSFORMED STUFF HERE
    content: payload.content || "",
    isBot: payload.author.bot || false,
    tag: `${payload.author.username}#${payload.author.discriminator.toString().padStart(4, "0")}`,
    timestamp: Date.parse(payload.timestamp),
    editedTimestamp: payload.edited_timestamp ? Date.parse(payload.edited_timestamp) : undefined,
    bitfield: (payload.tts ? 1n : 0n) | (payload.mention_everyone ? 2n : 0n) | (payload.pinned ? 4n : 0n),
    attachments: payload.attachments?.map((attachment) => bot.transformers.attachment(bot, attachment)),
    embeds: payload.embeds?.map((embed) => bot.transformers.embed(bot, embed)),
    reactions: payload.reactions?.map((reaction) => ({
      me: reaction.me,
      count: reaction.count,
      emoji: bot.transformers.emoji(bot, reaction.emoji),
    })),
    type: payload.type,
    activity: payload.activity
      ? {
        type: payload.activity.type,
        partyId: payload.activity.party_id,
      }
      : undefined,
    application: payload.application,
    flags: payload.flags,
    interaction: payload.interaction
      ? {
        id: bot.transformers.snowflake(payload.interaction.id),
        type: payload.interaction.type,
        name: payload.interaction.name,
        user: bot.transformers.user(bot, payload.interaction.user),
        member: payload.interaction.member
          ? {
            id: userId,
            guildId,
            nick: payload.interaction.member.nick ?? undefined,
            roles: payload.interaction.member.roles?.map((id) => BigInt(id)),
            joinedAt: payload.interaction.member.joined_at
              ? Date.parse(payload.interaction.member.joined_at)
              : undefined,
            premiumSince: payload.interaction.member.premium_since
              ? Date.parse(payload.interaction.member.premium_since) : undefined,
            toggles: new MemberToggles(payload.interaction.member),
            avatar: payload.interaction.member.avatar ? bot.utils.iconHashToBigInt(payload.interaction.member.avatar)
            : undefined,
            permissions: payload.interaction.member.permissions
              ? bot.transformers.snowflake(payload.interaction.member.permissions) : undefined,
            communicationDisabledUntil: payload.interaction.member.communication_disabled_until
              ? Date.parse(payload.interaction.member.communication_disabled_until)
              : undefined,
          }
          : undefined,
      }
      : undefined,
    thread: payload.thread ? bot.transformers.channel(bot, { channel: payload.thread, guildId }) : undefined,
    components: payload.components?.map((component) => bot.transformers.component(bot, component)),
    stickerItems: payload.sticker_items?.map((sticker) => ({
      id: bot.transformers.snowflake(sticker.id),
      name: sticker.name,
      formatType: sticker.format_type,
    })),

    // TRANSFORMED STUFF BELOW
    id: bot.transformers.snowflake(payload.id),
    guildId,
    channelId: bot.transformers.snowflake(payload.channel_id),
    webhookId: payload.webhook_id ? bot.transformers.snowflake(payload.webhook_id) : undefined,
    authorId: userId,
    applicationId: payload.application_id ? bot.transformers.snowflake(payload.application_id) : undefined,
    messageReference: payload.message_reference
      ? {
        messageId: payload.message_reference.message_id
          ? bot.transformers.snowflake(payload.message_reference.message_id)
          : undefined,
        channelId: payload.message_reference.channel_id
          ? bot.transformers.snowflake(payload.message_reference.channel_id)
          : undefined,
        guildId: payload.message_reference.guild_id ? bot.transformers.snowflake(payload.message_reference.guild_id)
        : undefined,
      }
      : undefined,
    mentionedUserIds: payload.mentions ? payload.mentions.map((m) => bot.transformers.snowflake(m.id)) : [],
    mentionedRoleIds: payload.mention_roles ? payload.mention_roles.map((id) => bot.transformers.snowflake(id)) : [],
    mentionedChannelIds: [
      // Keep any ids tht discord sends
      ...(payload.mention_channels ?? []).map((m) => bot.transformers.snowflake(m.id)),
      // Add any other ids that can be validated in a channel mention format
      ...(payload.content?.match(CHANNEL_MENTION_REGEX) || []).map((text) =>
        // converts the <#123> into 123
        bot.transformers.snowflake(text.substring(2, text.length - 1))
      ),
    ],
    member: payload.member && guildId ? bot.transformers.member(bot, payload.member, guildId, userId) : undefined,
  };

  return message as Optionalize<typeof message>;
}

export interface Message extends ReturnType<typeof transformMessage> {}
