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
import { createNewProp } from "../util/utils.ts";
import { Channel } from "./channel.ts";
import { Guild } from "./guild.ts";
import { Member } from "./member.ts";
import { Role } from "./role.ts";

const baseMessage: Partial<Message> = {
  get channel() {
    if (this.guildID) return cache.channels.get(this.channelID!);
    return cache.channels.get(this.author?.id!);
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
    return deleteMessage(
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
    return pinMessage(this.channelID!, this.id!);
  },
  addReaction(reaction) {
    return addReaction(this.channelID!, this.id!, reaction);
  },
  addReactions(reactions, ordered) {
    return addReactions(this.channelID!, this.id!, reactions, ordered);
  },
  reply(content) {
    const contentWithMention = typeof content === "string"
      ? {
        content,
        mentions: { repliedUser: true },
        replyMessageID: this.id,
        failReplyIfNotExists: false,
      }
      : {
        ...content,
        mentions: { ...(content.mentions || {}), repliedUser: true },
        replyMessageID: this.id,
        failReplyIfNotExists: content.failReplyIfNotExists === true,
      };

    if (this.guildID) return sendMessage(this.channelID!, contentWithMention);
    return sendDirectMessage(this.author!.id, contentWithMention);
  },
  send(content) {
    if (this.guildID) return sendMessage(this.channelID!, content);
    return sendDirectMessage(this.author!.id, content);
  },
  alert(content, timeout = 10, reason = "") {
    if (this.guildID) {
      return sendMessage(this.channelID!, content).then((response) => {
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
    return removeAllReactions(this.channelID!, this.id!);
  },
  removeReactionEmoji(reaction) {
    return removeReactionEmoji(this.channelID!, this.id!, reaction);
  },
  removeReaction(reaction) {
    return removeReaction(this.channelID!, this.id!, reaction);
  },
};

export async function createMessageStruct(data: MessageCreateOptions) {
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
    // @ts-ignore index signature
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
