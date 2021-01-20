import {
  Activity,
  Application,
  Attachment,
  Embed,
  GuildMember,
  MessageContent,
  MessageCreateOptions,
  MessageSticker,
  Reaction,
  Reference,
  UserPayload,
} from "../../types/mod.ts";
import { cache } from "../../util/cache.ts";
import { createNewProp } from "../../util/utils.ts";
import { cacheHandlers } from "../controllers/cache.ts";
import { sendMessage } from "../handlers/channel.ts";
import {
  addReaction,
  addReactions,
  deleteMessageByID,
  editMessage,
  pin,
  removeAllReactions,
  removeReaction,
  removeReactionEmoji,
} from "../handlers/message.ts";
import { Channel } from "./channel.ts";
import { Guild } from "./guild.ts";
import { Member } from "./member.ts";
import { Role } from "./role.ts";

const baseMessage: Partial<Message> = {
  get channel() {
    return cache.channels.get(this.channelID!);
  },
  get guild() {
    if (!this.guildID) return undefined;
    return cache.guilds.get(this.guildID);
  },
  get member() {
    if (!this.author?.id) return undefined;
    return cache.members.get(this.author?.id);
  },
  get guildMember() {
    if (!this.guildID) return undefined;
    return this.member?.guilds.get(this.guildID);
  },
  get link() {
    return `https://discord.com/channels/${this.guildID ||
      "@me"}/${this.channelID}/${this.id}`;
  },
  get mentionedRoles() {
    // TODO: add getters for Guild structure, that will fix this error
    return this.mentionRoleIDs?.map((id) => this.guild?.roles.get(id)) || [];
  },
  get mentionedChannels() {
    return this.mentionChannelIDs?.map((id) => cache.channels.get(id)) || [];
  },
  get mentionedMembers() {
    return this.mentions?.map((id) => cache.members.get(id)) || [];
  },

  // METHODS
  delete(reason, delayMilliseconds) {
    return deleteMessageByID(
      this.channelID!,
      this.id!,
      reason,
      delayMilliseconds,
    );
  },
  edit(content) {
    return editMessage(this as Message, content);
  },
  pin() {
    return pin(this.channelID!, this.id!);
  },
  addReaction(reaction) {
    return addReaction(this.channelID!, this.id!, reaction);
  },
  addReactions(reactions, ordered) {
    return addReactions(this.channelID!, this.id!, reactions, ordered);
  },
  reply(content) {
    const contentWithMention = typeof content === "string"
      ? { content, mentions: { repliedUser: true }, replyMessageID: this.id }
      : {
        ...content,
        mentions: { ...(content.mentions || {}), repliedUser: true },
        replyMessageID: this.id,
      };

    return sendMessage(this.channelID!, contentWithMention);
  },
  send(content) {
    return sendMessage(this.channelID!, content);
  },
  alert(content, timeout = 10, reason = "") {
    return sendMessage(this.channelID!, content).then((response) => {
      response.delete(reason, timeout * 1000).catch(console.error);
    });
  },
  alertReply(content, timeout = 10, reason = "") {
    return this.reply!(content).then((response) =>
      response.delete(reason, timeout * 1000).catch(console.error)
    );
  },
  removeAllReactions() {
    return removeAllReactions(this.channelID!, this.id!);
  },
  removeReactionEmoji(reaction) {
    return removeReactionEmoji(this.channelID!, this.id!, reaction);
  },
  removeReaction(reaction) {
    return removeReaction(this.channelID!, this.id!, reaction);
  },
};

export async function createMessage(data: MessageCreateOptions) {
  const {
    guild_id: guildID = "",
    channel_id: channelID,
    mentions_everyone: mentionsEveryone,
    mention_channels: mentionChannelIDs = [],
    mention_roles: mentionRoleIDs,
    webhook_id: webhookID,
    message_reference: messageReference,
    edited_timestamp: editedTimestamp,
    referenced_message: referencedMessageID,
    member,
    ...rest
  } = data;

  const restProps: Record<string, ReturnType<typeof createNewProp>> = {};
  for (const key of Object.keys(rest)) {
    restProps[key] = createNewProp(rest[key]);
  }

  // Discord doesnt give guild id for getMessage() so this will fill it in
  const guildIDFinal = guildID ||
    (await cacheHandlers.get("channels", channelID))?.guildID || "";

  const message = Object.create(baseMessage, {
    ...restProps,
    /** The message id of the original message if this message was sent as a reply. If null, the original message was deleted. */
    referencedMessageID: createNewProp(referencedMessageID),
    channelID: createNewProp(channelID),
    guildID: createNewProp(guildID || guildIDFinal),
    mentions: createNewProp(data.mentions.map((m) => m.id)),
    mentionsEveryone: createNewProp(mentionsEveryone),
    mentionRoleIDs: createNewProp(mentionRoleIDs),
    mentionChannelIDs: createNewProp(mentionChannelIDs.map((m) => m.id)),
    webhookID: createNewProp(webhookID),
    messageReference: createNewProp(messageReference),
    timestamp: createNewProp(Date.parse(data.timestamp)),
    editedTimestamp: createNewProp(
      editedTimestamp ? Date.parse(editedTimestamp) : undefined,
    ),
  });

  return message as Message;
}

export interface Message {
  /** The id of the message */
  id: string;
  /** The id of the channel the message was sent in */
  channelID: string;
  /** The id of the guild the message was sent in */
  guildID: string;
  /** The author of this message (not guaranteed to be a valid user such as a webhook.) */
  author: UserPayload;
  /** The contents of the message */
  content: string;
  /** When this message was sent */
  timestamp: number;
  /** When this message was edited (if it was not edited, null) */
  editedTimestamp?: number;
  /** Whether this was a TextToSpeech message. */
  tts: boolean;
  /** Whether this message mentions everyone */
  mentionsEveryone: boolean;
  /** Users specifically mentioned in the message. */
  mentions: string[];
  /** Roles specifically mentioned in this message */
  mentionRoleIDs: string[];
  /** Channels specifically mentioned in this message */
  mentionChannelIDs: string[];
  /** Any attached files */
  attachments: Attachment[];
  /** Any embedded content */
  embeds: Embed[];
  /** Reactions to the message */
  reactions?: Reaction[];
  /** Used for validating a message was sent */
  nonce?: number | string;
  /** Whether this message is pinned */
  pinned: boolean;
  /** If the message is generated by a webhook, this is the webhooks id */
  webhook_id?: string;
  /** The type of message */
  type: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /** The activities sent with Rich Presence-related chat embeds. */
  activity?: Activity;
  /** Applications that sent with Rich Presence related chat embeds. */
  applications?: Application;
  /** The reference data sent with crossposted messages */
  messageReference?: Reference;
  /** The message flags combined like permission bits describe extra features of the message */
  flags?: 1 | 2 | 4 | 8 | 16;
  /** the stickers sent with the message (bots currently can only receive messages with stickers, not send) */
  stickers?: MessageSticker[];
  /** The message id of the original message if this message was sent as a reply. If null, the original message was deleted. */
  referencedMessageID?: MessageCreateOptions | null;

  // GETTERS

  /** The channel where this message was sent. Can be undefined if uncached. */
  channel?: Channel;
  /** The guild of this message. Can be undefined if not in cache or in DM */
  guild?: Guild;
  /** The member for the user who sent the message. Can be undefined if not in cache or in dm. */
  member?: Member;
  /** The guild member details for this guild and member. Can be undefined if not in cache or in dm. */
  guildMember?: GuildMember;
  /** The url link to this message */
  link: string;
  /** The role objects for all the roles that were mentioned in this message */
  mentionedRoles: (Role | undefined)[];
  /** The channel objects for all the channels that were mentioned in this message. */
  mentionedChannels: (Channel | undefined)[];
  /** The member objects for all the members that were mentioned in this message. */
  mentionedMembers: (Member | undefined)[];

  // METHODS

  /** Delete the message */
  delete(
    reason?: string,
    delayMilliseconds?: number,
  ): ReturnType<typeof deleteMessageByID>;
  /** Edit the message */
  edit(content: string | MessageContent): ReturnType<typeof editMessage>;
  /** Pins the message in the channel */
  pin(): ReturnType<typeof pin>;
  /** Add a reaction to the message */
  addReaction(reaction: string): ReturnType<typeof addReaction>;
  /** Add multiple reactions to the message without or without order. */
  addReactions(
    reactions: string[],
    ordered?: boolean,
  ): ReturnType<typeof addReactions>;
  /** Send a inline reply to this message */
  reply(content: string | MessageContent): ReturnType<typeof sendMessage>;
  /** Send a message to this channel where this message is */
  send(content: string | MessageContent): ReturnType<typeof sendMessage>;
  /** Send a message to this channel and then delete it after a bit. By default it will delete after 10 seconds with no reason provided. */
  alert(
    content: string | MessageContent,
    timeout?: number,
    reason?: string,
  ): Promise<void>;
  /** Send a inline reply to this message but then delete it after a bit. By default it will delete after 10 seconds with no reason provided.  */
  alertReply(
    content: string | MessageContent,
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
