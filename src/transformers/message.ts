import { Bot } from "../bot.ts";
import { Message } from "../types/messages/message.ts";
import { CHANNEL_MENTION_REGEX } from "../util/constants.ts";
import { SnakeCasedPropertiesDeep } from "../types/util.ts";
import { DiscordenoAttachment } from "./attachment.ts";
import { MessageStickerFormatTypes } from "../types/messages/messageStickerFormatTypes.ts";
import { DiscordenoMember, DiscordenoUser } from "./member.ts";
import { DiscordenoEmbed } from "./embed.ts";
import { MessageTypes } from "../types/messages/messageTypes.ts";
import { MessageActivityTypes } from "../types/messages/messageActivityTypes.ts";
import { InteractionTypes } from "../types/interactions/interactionTypes.ts";
import { DiscordenoComponent } from "./component.ts";
import { Application } from "../types/applications/application.ts";
import { DiscordenoChannel } from "./channel.ts";

export function transformMessage(bot: Bot, payload: SnakeCasedPropertiesDeep<Message>): DiscordenoMessage {
  const guildId = payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined;
  const userId = bot.transformers.snowflake(payload.author.id);

  return {
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
      emoji: {
        id: reaction.emoji.id ? bot.transformers.snowflake(reaction.emoji.id) : undefined,
        name: reaction.emoji.name,
        animated: reaction.emoji.animated,
      },
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
          guildId: payload.message_reference.guild_id
            ? bot.transformers.snowflake(payload.message_reference.guild_id)
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
}

export interface DiscordenoMessage {
  id: bigint;
  /** Whether or not this message was sent by a bot */
  isBot: boolean;
  /** The username#discrimnator for the user who sent this message */
  tag: string;
  /** Holds all the boolean toggles. */
  bitfield: bigint;

  // For better user experience

  /** Id of the guild which the massage has been send in. "0n" if it a DM */
  guildId?: bigint;
  /** id of the channel the message was sent in */
  channelId: bigint;
  /** If the message is generated by a webhook, this is the webhook's id */
  webhookId?: bigint;
  /** The id of the user who sent this message */
  authorId: bigint;
  /** If the message is a response to an Interaction, this is the id of the interaction's application */
  applicationId?: bigint;
  /** The message content for this message. Empty string if no content was sent like an attachment only. */
  content: string;
  /** Ids of users specifically mentioned in the message */
  mentionedUserIds: bigint[];
  /** Ids of roles specifically mentioned in this message */
  mentionedRoleIds: bigint[];
  /** Channels specifically mentioned in this message */
  mentionedChannelIds?: bigint[];
  /** When this message was sent */
  timestamp: number;
  /** When this message was edited (or undefined if never) */
  editedTimestamp?: number;
  /** The attachments uploaded with this message */
  attachments: DiscordenoAttachment[];
  /** Data showing the source of a crossposted channel follow add, pin or reply message */
  messageReference?: {
    /** id of the originating message */
    messageId?: bigint;
    /** id of the originating message's channel */
    channelId?: bigint;
    /** id of the originating message's guild */
    guildId?: bigint;
  };
  /** Sent if the message contains stickers */
  stickerItems?: {
    /** Id of the sticker */
    id: bigint;
    /** Name of the sticker */
    name: string;
    /** Type of sticker format */
    formatType: MessageStickerFormatTypes;
  }[];

  /**
   * Member properties for this message's author
   * Note: The member object exists in `MESSAGE_CREATE` and `MESSAGE_UPDATE` events from text-based guild channels. This allows bots to obtain real-time member data without requiring bots to store member state in memory.
   */
  member?: DiscordenoMember;
  /** Any embedded content */
  embeds: DiscordenoEmbed[];
  /** Reactions to the message */
  reactions?: {
    me: boolean;
    count: number;
    emoji: { id?: bigint; name?: string; animated?: boolean };
  }[];
  /** Used for validating a message was sent */
  nonce?: number | string;
  /** Type of message */
  type: MessageTypes;
  /** Sent with Rich Presence-related chat embeds */
  activity?: {
    /** Type of message activity */
    type: MessageActivityTypes;
    /** `party_id` from a Rich Presence event */
    partyId?: string;
  };
  /** Sent with Rich Presence-related chat embeds */
  application?: Partial<SnakeCasedPropertiesDeep<Application>>;
  /** Message flags combined as a bitfield */
  flags?: number;
  /**
   * The message associated with the `message_reference`
   * Note: This field is only returned for messages with a `type` of `19` (REPLY). If the message is a reply but the `referenced_message` field is not present, the backend did not attempt to fetch the message that was being replied to, so its state is unknown. If the field exists but is null, the referenced message was deleted.
   */
  referencedMessage?: Message | null;
  /** Sent if the message is a response to an Interaction */
  interaction?: {
    /** Id of the interaction */
    id: bigint;
    /** The type of interaction */
    type: InteractionTypes;
    /** The name of the ApplicationCommand */
    name: string;
    /** The user who invoked the interaction */
    user: DiscordenoUser;
  };
  /** The thread that was started from this message, includes thread member object */
  thread?: DiscordenoChannel;
  /** The components related to this message */
  components?: DiscordenoComponent[];
}
