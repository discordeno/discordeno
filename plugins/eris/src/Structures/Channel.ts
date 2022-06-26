import { ChannelTypes, DiscordChannel } from "../../deps.ts";
import { Base } from "../Base.ts";
import Client from "../Client.ts";
import CategoryChannel from "./CategoryChannel.ts";
import GuildChannel from "./GuildChannel.ts";
import NewsChannel from "./NewsChannel.ts";
import NewsThreadChannel from "./NewsThreadChannel.ts";
import PrivateChannel from "./PrivateChannel.ts";
import PrivateThreadChannel from "./PrivateThreadChannel.ts";
import PublicThreadChannel from "./PublicThreadChannel.ts";
import StageChannel from "./StageChannel.ts";
import TextChannel from "./TextChannel.ts";
import TextVoiceChannel from "./TextVoiceChannel.ts";

export class Channel extends Base {
  type: ChannelTypes;
  client: Client;

  constructor(data: DiscordChannel, client: Client) {
    super(data.id);
    this.type = data.type;
    this.client = client;
  }

  get mention() {
    return `<#${this.id}>`;
  }

  static from(data: DiscordChannel, client: Client) {
    switch (data.type) {
      case ChannelTypes.GuildText: {
        return new TextChannel(data, client);
      }
      case ChannelTypes.DM: {
        return new PrivateChannel(data, client);
      }
      case ChannelTypes.GuildVoice: {
        return new TextVoiceChannel(data, client);
      }
      case ChannelTypes.GuildCategory: {
        return new CategoryChannel(data, client);
      }
      case ChannelTypes.GuildNews: {
        return new NewsChannel(data, client);
      }
      case ChannelTypes.GuildNewsThread: {
        return new NewsThreadChannel(data, client);
      }
      case ChannelTypes.GuildPublicThread: {
        return new PublicThreadChannel(data, client);
      }
      case ChannelTypes.GuildPrivateThread: {
        return new PrivateThreadChannel(data, client);
      }
      case ChannelTypes.GuildStageVoice: {
        return new StageChannel(data, client);
      }
    }
    if (data.guild_id) {
      if (data.last_message_id !== undefined) {
        client.emit("warn", new Error(`Unknown guild text channel type: ${data.type}\n${JSON.stringify(data)}`));
        return new TextChannel(data, client);
      }
      client.emit("warn", new Error(`Unknown guild channel type: ${data.type}\n${JSON.stringify(data)}`));
      return new GuildChannel(data, client);
    }
    client.emit("warn", new Error(`Unknown channel type: ${data.type}\n${JSON.stringify(data)}`));
    return new Channel(data, client);
  }

  toJSON(props: string[] = []) {
    return super.toJSON([
      "type",
      ...props,
    ]);
  }
}

export default Channel;
