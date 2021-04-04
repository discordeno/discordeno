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
import { CHANNEL_MENTION_REGEX } from "../util/constants.ts";
import { createNewProp } from "../util/utils.ts";

const baseMessage: Partial<Message> = {
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
    return this.mentionRoleIds?.map((id) => this.guild?.roles.get(id)) || [];
  },
  get mentionedChannels() {
    return this.mentionChannelIds?.map((id) => cache.channels.get(id)) || [];
  },
  get mentionedMembers() {
    return this.mentions?.map((id) => cache.members.get(id)) || [];
  },

  // METHODS
  delete(reason, delayMilliseconds) {
    return deleteMessage(this.channelId!, this.id!, reason, delayMilliseconds);
  },
  edit(content) {
    return editMessage(this as Message, content);
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
    const contentWithMention = typeof content === "string"
      ? {
        content,
        mentions: { repliedUser: true },
        replyMessageId: this.id,
        failReplyIfNotExists: false,
      }
      : {
        ...content,
        mentions: { ...(content.mentions || {}), repliedUser: true },
        replyMessageId: this.id,
        failReplyIfNotExists: content.failReplyIfNotExists === true,
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

export async function createMessageStruct(data: MessageCreateOptions) {
  const {
    guild_id: guildId = "",
    channel_id: channelId,
    mentions_everyone: mentionsEveryone,
    mention_channels: mentionChannelIds = [],
    mention_roles: mentionRoleIds,
    webhook_id: webhookId,
    message_reference: messageReference,
    edited_timestamp: editedTimestamp,
    referenced_message: referencedMessageId,
    member,
    ...rest
  } = data;

  const restProps: Record<string, ReturnType<typeof createNewProp>> = {};
  for (const key of Object.keys(rest)) {
    // @ts-ignore index signature
    restProps[key] = createNewProp(rest[key]);
  }

  // Discord doesnt give guild id for getMessage() so this will fill it in
  const guildIdFinal = guildId ||
    (await cacheHandlers.get("channels", channelId))?.guildId || "";

  const message = Object.create(baseMessage, {
    ...restProps,
    /** The message id of the original message if this message was sent as a reply. If null, the original message was deleted. */
    referencedMessageId: createNewProp(referencedMessageId),
    channelId: createNewProp(channelId),
    guildId: createNewProp(guildId || guildIdFinal),
    mentions: createNewProp(data.mentions.map((m) => m.id)),
    mentionsEveryone: createNewProp(mentionsEveryone),
    mentionRoleIds: createNewProp(mentionRoleIds),
    mentionChannelIds: createNewProp(
      [
        // Keep any ids that discord sends
        ...mentionChannelIds,
        // Add any other ids that can be validated in a channel mention format
        ...(rest.content.match(CHANNEL_MENTION_REGEX) || []).map((text) =>
          // converts the <#123> into 123
          text.substring(2, text.length - 1)
        ),
      ].map((m) => m.id),
    ),
    webhookId: createNewProp(webhookId),
    messageReference: createNewProp(messageReference),
    timestamp: createNewProp(Date.parse(data.timestamp)),
    editedTimestamp: createNewProp(
      editedTimestamp ? Date.parse(editedTimestamp) : undefined,
    ),
  });

  return message as Message;
}
