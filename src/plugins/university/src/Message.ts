import { CreateMessage } from "../../../types/messages/create_message.ts";
import { EditMessage } from "../../../types/messages/edit_message.ts";
import { Message as MessagePayload } from "../../../types/messages/message.ts";
import { bigintToTimestamp, snowflakeToBigint } from "../../../util/bigint.ts";
import { endpoints } from "../../../util/constants.ts";
import { delay, snakelize } from "../../../util/utils.ts";
import Base from "./Base.ts";
import Client from "./Client.ts";

export class Message extends Base {
  /** The id of the guild if this message was inside a guild. */
  guildId?: bigint;
  /** The id of the channel where this message was sent. */
  channelId: bigint;

  /** The reactions that are cached on this message. */
  reactions: { count: number; me: boolean; emoji: { id?: bigint; name: string; animated?: boolean } }[];

  /** The content of the message */
  content: string;

  constructor(client: Client, payload: MessagePayload) {
    super(client, snowflakeToBigint(payload.id));

    this.content = payload.content || "";
    this.channelId = snowflakeToBigint(payload.channelId);

    if (payload.guildId) this.guildId = snowflakeToBigint(payload.guildId);
    this.timestamp;

    this.reactions =
      payload.reactions?.map((reaction) => ({
        ...reaction,
        emoji: {
          ...reaction.emoji,
          id: reaction.emoji.id ? snowflakeToBigint(reaction.emoji.id) : undefined,
          name: reaction.emoji.name || "",
        },
      })) || [];
  }

  /** The timestamp when this message was sent. */
  get timestamp() {
    return bigintToTimestamp(this.id);
  }

  /** The guild where this message was sent. */
  get guild() {
    return this.guildId ? this.client.guilds.get(this.guildId) : undefined;
  }

  /** The channel where this message was sent. */
  get channel() {
    return this.guild?.channels.get(this.channelId) || this.client.dmChannels.get(this.channelId)!;
  }

  /** Create a reaction for the message. Reaction takes the form of **name:id** for custom guild emoji, or Unicode characters. Requires READ_MESSAGE_HISTORY and ADD_REACTIONS */
  async addReaction(reaction: string) {
    if (reaction.startsWith("<:")) {
      reaction = reaction.substring(2, reaction.length - 1);
    } else if (reaction.startsWith("<a:")) {
      reaction = reaction.substring(3, reaction.length - 1);
    }

    return await this.client.rest.put(endpoints.CHANNEL_MESSAGE_REACTION_ME(this.channelId, this.id, reaction));
  }

  /** Adds multiple reactions to a message. If `ordered` is true(default is false), it will add the reactions one at a time in the order provided. Note: Reaction takes the form of **name:id** for custom guild emoji, or Unicode characters. Requires READ_MESSAGE_HISTORY and ADD_REACTIONS */
  async addReactions(reactions: string[], ordered = false) {
    if (!ordered) {
      await Promise.all(reactions.map((reaction) => this.addReaction(reaction)));
    } else {
      for (const reaction of reactions) {
        this.client.emit("debug", "loop", "Running for of loop in addReactions function.");
        await this.addReaction(reaction);
      }
    }
  }

  /** Delete a message with the channel id and message id only. */
  async delete(reason?: string, delayMilliseconds = 0) {
    if (delayMilliseconds) await delay(delayMilliseconds);

    return await this.client.rest.delete(endpoints.CHANNEL_MESSAGE(this.channelId, this.id), { reason });
  }

  /** Edit the message. */
  async edit(content: string | EditMessage) {
    if (typeof content === "string") content = { content };
    if (Array.isArray(content)) content = { embeds: content };

    const result = (await this.client.rest.patch(
      endpoints.CHANNEL_MESSAGE(this.channelId, this.id),
      snakelize(content)
    )) as MessagePayload;

    const message = new Message(this.client, result);
    this.channel?.messages.set(message.id, message);

    return message;
  }

  /** Unpin a message in a channel. Requires MANAGE_MESSAGES. */
  async unpin() {
    return await this.client.rest.delete(endpoints.CHANNEL_PIN(this.channelId, this.id));
  }

  /** Send a message to the channel. Requires SEND_MESSAGES permission. */
  async send(content: string | CreateMessage) {
    return await this.channel.sendMessage(content);
  }
}

export default Message;
