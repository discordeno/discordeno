import { eventHandlers } from "../bot.ts";
import { cache, cacheHandlers } from "../cache.ts";
import { sendDirectMessage } from "../helpers/members/send_direct_message.ts";
import { addReaction } from "../helpers/messages/add_reaction.ts";
import { addReactions } from "../helpers/messages/add_reactions.ts";
import { deleteMessage } from "../helpers/messages/delete_message.ts";
import { editMessage } from "../helpers/messages/edit_message.ts";
import { pinMessage } from "../helpers/messages/pin_message.ts";
import { removeAllReactions } from "../helpers/messages/remove_all_reactions.ts";
import { removeReaction } from "../helpers/messages/remove_reaction.ts";
import { removeReactionEmoji } from "../helpers/messages/remove_reaction_emoji.ts";
import { sendMessage } from "../helpers/messages/send_message.ts";
import { GuildMember } from "../types/guilds/guild_member.ts";
import { CreateMessage } from "../types/messages/create_message.ts";
import { EditMessage } from "../types/messages/edit_message.ts";
import { DiscordMessage, Message } from "../types/messages/message.ts";
import { CHANNEL_MENTION_REGEX } from "../util/constants.ts";
import { createNewProp, snakeKeysToCamelCase } from "../util/utils.ts";
import { DiscordenoChannel } from "./channel.ts";
import { DiscordenoGuild } from "./guild.ts";
import { DiscordenoMember } from "./member.ts";
import { DiscordenoRole } from "./role.ts";

const baseMessage: Partial<DiscordenoMessage> = {
  get channel() {
    if (this.guildId) return cache.channels.get(this.channelId!);
    return cache.channels.get(this.author?.id!);
  },
  get guild() {
    if (!this.guildId) return undefined;
    return cache.guilds.get(this.guildId);
  },
  get member() {
    if (!this.author?.id) return undefined;
    return cache.members.get(this.author?.id);
  },
  get guildMember() {
    if (!this.guildId) return undefined;
    return this.member?.guilds.get(this.guildId);
  },
  get link() {
    return `https://discord.com/channels/${this.guildId ||
      "@me"}/${this.channelId}/${this.id}`;
  },
  get mentionedRoles() {
    return this.mentionedRoleIds?.map((id) => this.guild?.roles.get(id)) || [];
  },
  get mentionedChannels() {
    return this.mentionedChannelIds?.map((id) => cache.channels.get(id)) || [];
  },
  get mentionedMembers() {
    return this.mentionedUserIds?.map((id) => cache.members.get(id)) || [];
  },

  // METHODS
  delete(reason, delayMilliseconds) {
    return deleteMessage(this.channelId!, this.id!, reason, delayMilliseconds);
  },
  edit(content) {
    return editMessage(this as DiscordenoMessage, content);
  },
  pin() {
    return pinMessage(this.channelId!, this.id!);
  },
  addReaction(reaction) {
    return addReaction(this.channelId!, this.id!, reaction);
  },
  addReactions(reactions, ordered) {
    return addReactions(this.channelId!, this.id!, reactions, ordered);
  },
  reply(content) {
    const contentWithMention: CreateMessage = typeof content === "string"
      ? {
        content,
        allowedMentions: {
          repliedUser: true,
        },
        messageReference: {
          messageId: this.id,
          failIfNotExists: false,
        },
      }
      : {
        ...content,
        allowedMentions: {
          ...(content.allowedMentions || {}),
          repliedUser: true,
        },
        messageReference: {
          messageId: this.id,
          failIfNotExists: content.messageReference?.failIfNotExists === true,
        },
      };

    if (this.guildId) return sendMessage(this.channelId!, contentWithMention);
    return sendDirectMessage(this.author!.id, contentWithMention);
  },
  send(content) {
    if (this.guildId) return sendMessage(this.channelId!, content);
    return sendDirectMessage(this.author!.id, content);
  },
  alert(content, timeout = 10, reason = "") {
    if (this.guildId) {
      return sendMessage(this.channelId!, content).then((response) => {
        response.delete(reason, timeout * 1000).catch(console.error);
      });
    }

    return sendDirectMessage(this.author!.id, content).then((response) => {
      response.delete(reason, timeout * 1000).catch(console.error);
    });
  },
  alertReply(content, timeout = 10, reason = "") {
    return this.reply!(content).then((response) =>
      response.delete(reason, timeout * 1000).catch(console.error)
    );
  },
  removeAllReactions() {
    return removeAllReactions(this.channelId!, this.id!);
  },
  removeReactionEmoji(reaction) {
    return removeReactionEmoji(this.channelId!, this.id!, reaction);
  },
  removeReaction(reaction) {
    return removeReaction(this.channelId!, this.id!, reaction);
  },
};

export async function createDiscordenoMessage(data: DiscordMessage) {
  const {
    guildId = "",
    channelId,
    mentionChannels = [],
    mentions = [],
    mentionRoles = [],
    editedTimestamp,
    ...rest
  } = snakeKeysToCamelCase<Message>(data);

  const props: Record<string, ReturnType<typeof createNewProp>> = {};
  for (const key of Object.keys(rest)) {
    eventHandlers.debug?.(
      "loop",
      `Running for of loop in createDiscordenoMessage function.`,
    );
    // @ts-ignore index signature
    props[key] = createNewProp(rest[key]);
  }

  // Discord doesnt give guild id for getMessage() so this will fill it in
  const guildIdFinal = guildId ||
    (await cacheHandlers.get("channels", channelId))?.guildId || "";

  const message: DiscordenoMessage = Object.create(baseMessage, {
    ...props,
    /** The message id of the original message if this message was sent as a reply. If null, the original message was deleted. */
    channelId: createNewProp(channelId),
    guildId: createNewProp(guildIdFinal),
    mentionedUserIds: createNewProp(mentions.map((m) => m.id)),
    mentionedRoleIds: createNewProp(mentionRoles),
    mentionedChannelIds: createNewProp([
      // Keep any ids that discord sends
      ...mentionChannels.map((m) => m.id),
      // Add any other ids that can be validated in a channel mention format
      ...(rest.content?.match(CHANNEL_MENTION_REGEX) || []).map((text) =>
        // converts the <#123> into 123
        text.substring(2, text.length - 1)
      ),
    ]),
    timestamp: createNewProp(Date.parse(data.timestamp)),
    editedTimestamp: createNewProp(
      editedTimestamp ? Date.parse(editedTimestamp) : undefined,
    ),
  });

  return message;
}

export interface DiscordenoMessage
  extends Omit<Message, "timestamp" | "editedTimestamp"> {
  // For better user experience
  /** Ids of users specifically mentioned in the message */
  mentionedUserIds: string[];
  /** Ids of roles specifically mentioned in this message */
  mentionedRoleIds: string[];
  /** Channels specifically mentioned in this message */
  mentionedChannelIds?: string[];
  /** When this message was sent */
  timestamp: number;
  /** When this message was edited (or undefined if never) */
  editedTimestamp?: number;
  // GETTERS

  /** The channel where this message was sent. Can be undefined if uncached. */
  channel?: DiscordenoChannel;
  /** The guild of this message. Can be undefined if not in cache or in DM */
  guild?: DiscordenoGuild;
  /** The member for the user who sent the message. Can be undefined if not in cache or in dm. */
  member?: DiscordenoMember;
  /** The guild member details for this guild and member. Can be undefined if not in cache or in dm. */
  guildMember?: Omit<GuildMember, "joinedAt" | "premiumSince"> & {
    joinedAt: number;
    premiumSince?: number;
  };
  /** The url link to this message */
  link: string;
  /** The role objects for all the roles that were mentioned in this message */
  mentionedRoles: (DiscordenoRole | undefined)[];
  /** The channel objects for all the channels that were mentioned in this message. */
  mentionedChannels: (DiscordenoChannel | undefined)[];
  /** The member objects for all the members that were mentioned in this message. */
  mentionedMembers: (DiscordenoMember | undefined)[];

  // METHODS

  /** Delete the message */
  delete(
    reason?: string,
    delayMilliseconds?: number,
  ): ReturnType<typeof deleteMessage>;
  /** Edit the message */
  edit(content: string | EditMessage): ReturnType<typeof editMessage>;
  /** Pins the message in the channel */
  pin(): ReturnType<typeof pinMessage>;
  /** Add a reaction to the message */
  addReaction(reaction: string): ReturnType<typeof addReaction>;
  /** Add multiple reactions to the message without or without order. */
  addReactions(
    reactions: string[],
    ordered?: boolean,
  ): ReturnType<typeof addReactions>;
  /** Send a inline reply to this message */
  reply(content: string | CreateMessage): ReturnType<typeof sendMessage>;
  /** Send a message to this channel where this message is */
  send(content: string | CreateMessage): ReturnType<typeof sendMessage>;
  /** Send a message to this channel and then delete it after a bit. By default it will delete after 10 seconds with no reason provided. */
  alert(
    content: string | CreateMessage,
    timeout?: number,
    reason?: string,
  ): Promise<void>;
  /** Send a inline reply to this message but then delete it after a bit. By default it will delete after 10 seconds with no reason provided.  */
  alertReply(
    content: string | CreateMessage,
    timeout?: number,
    reason?: string,
  ): Promise<unknown>;
  /** Remove all reactions */
  removeAllReactions(): ReturnType<typeof removeAllReactions>;
  /** Remove all reactions */
  removeReactionEmoji(reaction: string): ReturnType<typeof removeReactionEmoji>;
  /** Remove all reactions */
  removeReaction(reaction: string): ReturnType<typeof removeReaction>;
}
