import { Bot } from "../bot.ts";
import { Message } from "../types/messages/message.ts";
import { CHANNEL_MENTION_REGEX } from "../util/constants.ts";
import { SnakeCasedPropertiesDeep } from "../types/util.ts";
import { DiscordenoAttachment } from "./attachment.ts";
import { DiscordMessageStickerFormatTypes } from "../types/messages/message_sticker_format_types.ts";
import { DiscordenoMember, DiscordenoUser } from "./member.ts";
import { DiscordenoEmbed } from "./embed.ts";
import { DiscordMessageTypes } from "../types/messages/message_types.ts";
import { DiscordMessageActivityTypes } from "../types/messages/message_activity_types.ts";
import { DiscordInteractionTypes } from "../types/interactions/interaction_types.ts";
import { DiscordenoComponent } from "./component.ts";
import { Application } from "../types/applications/application.ts";
import { DiscordenoThread } from "./thread.ts";

export function transformMessage(bot: Bot, data: SnakeCasedPropertiesDeep<Message>): DiscordenoMessage {
  const guildId = data.guild_id ? bot.transformers.snowflake(data.guild_id) : undefined;
  const userId = bot.transformers.snowflake(data.author.id);

  return {
    // UNTRANSFORMED STUFF HERE
    content: data.content || "",
    isBot: data.author.bot || false,
    tag: `${data.author.username}#${data.author.discriminator.toString().padStart(4, "0")}`,
    timestamp: Date.parse(data.timestamp),
    editedTimestamp: data.edited_timestamp ? Date.parse(data.edited_timestamp) : undefined,
    bitfield: (data.tts ? 1n : 0n) | (data.mention_everyone ? 2n : 0n) | (data.pinned ? 4n : 0n),
    attachments: data.attachments?.map((attachment) => bot.transformers.attachment(bot, attachment)),
    embeds: data.embeds.map((embed) => bot.transformers.embed(bot, embed)),
    reactions: data.reactions?.map((reaction) => ({
      me: reaction.me,
      count: reaction.count,
      emoji: {
        id: reaction.emoji.id ? bot.transformers.snowflake(reaction.emoji.id) : undefined,
        name: reaction.emoji.name,
        animated: reaction.emoji.animated,
      },
    })),
    type: data.type,
    activity: data.activity
      ? {
          type: data.activity.type,
          partyId: data.activity.party_id,
        }
      : undefined,
    application: data.application,
    flags: data.flags,
    interaction: data.interaction
      ? {
          id: bot.transformers.snowflake(data.interaction.id),
          type: data.interaction.type,
          name: data.interaction.name,
          user: bot.transformers.user(bot, data.interaction.user),
        }
      : undefined,
    thread: data.thread ? bot.transformers.thread(bot, data.thread) : undefined,
    components: data.components?.map((component) => bot.transformers.component(bot, component)),
    stickerItems: data.sticker_items?.map((sticker) => ({
      id: bot.transformers.snowflake(sticker.id),
      name: sticker.name,
      formatType: sticker.format_type,
    })),

    // TRANSFORMED STUFF BELOW
    id: bot.transformers.snowflake(data.id),
    guildId,
    channelId: bot.transformers.snowflake(data.channel_id),
    webhookId: data.webhook_id ? bot.transformers.snowflake(data.webhook_id) : undefined,
    authorId: userId,
    applicationId: data.application_id ? bot.transformers.snowflake(data.application_id) : undefined,
    messageReference: data.message_reference
      ? {
          messageId: data.message_reference.message_id
            ? bot.transformers.snowflake(data.message_reference.message_id)
            : undefined,
          channelId: data.message_reference.channel_id
            ? bot.transformers.snowflake(data.message_reference.channel_id)
            : undefined,
          guildId: data.message_reference.guild_id
            ? bot.transformers.snowflake(data.message_reference.guild_id)
            : undefined,
        }
      : undefined,
    mentionedUserIds: data.mentions ? data.mentions.map((m) => bot.transformers.snowflake(m.id)) : [],
    mentionedRoleIds: data.mention_roles ? data.mention_roles.map((id) => bot.transformers.snowflake(id)) : [],
    mentionedChannelIds: [
      // Keep any ids tht discord sends
      ...(data.mention_channels ?? []).map((m) => bot.transformers.snowflake(m.id)),
      // Add any other ids that can be validated in a channel mention format
      ...(data.content?.match(CHANNEL_MENTION_REGEX) || []).map((text) =>
        // converts the <#123> into 123
        bot.transformers.snowflake(text.substring(2, text.length - 1))
      ),
    ],
    member: data.member && guildId ? bot.transformers.member(bot, data.member, guildId, userId) : undefined,
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
    formatType: DiscordMessageStickerFormatTypes;
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
  type: DiscordMessageTypes;
  /** Sent with Rich Presence-related chat embeds */
  activity?: {
    /** Type of message activity */
    type: DiscordMessageActivityTypes;
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
    type: DiscordInteractionTypes;
    /** The name of the ApplicationCommand */
    name: string;
    /** The user who invoked the interaction */
    user: DiscordenoUser;
  };
  /** The thread that was started from this message, includes thread member object */
  thread?: DiscordenoThread;
  /** The components related to this message */
  components?: DiscordenoComponent[];
}
