import { ChannelTypes, type DiscordChannel } from "@discordeno/types";
import Base from "../../Base.js";
import type Client from "../../Client.js";
import type { AnyChannel } from "../../typings.js";
import CategoryChannel from "./Category.js";
import GuildChannel from "./Guild.js";
import NewsChannel from "./News.js";
import PrivateChannel from "./Private.js";
import StageChannel from "./Stage.js";
import TextChannel from "./Text.js";
import TextVoiceChannel from "./TextVoice.js";
import NewsThreadChannel from "./threads/NewsThread.js";
import PrivateThreadChannel from "./threads/PrivateThread.js";
import PublicThreadChannel from "./threads/PublicThread.js";


export class Channel extends Base {
  type: ChannelTypes;
  client: Client;

  constructor(data: DiscordChannel | Pick<DiscordChannel, "id" | "permissions" | "name" | "type">, client: Client) {
    super(data.id);
    this.type = data.type;
    this.client = client;
  }

  get mention(): string {
    return `<#${this.id}>`;
  }

  static from(data: DiscordChannel, client: Client): AnyChannel {
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
      case ChannelTypes.GuildAnnouncement: {
        return new NewsChannel(data, client);
      }
      case ChannelTypes.AnnouncementThread: {
        return new NewsThreadChannel(data, client);
      }
      case ChannelTypes.PublicThread: {
        return new PublicThreadChannel(data, client);
      }
      case ChannelTypes.PrivateThread: {
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

  toJSON(props: string[] = []): Record<string, any> {
    return super.toJSON([
      "type",
      ...props,
    ]);
  }
}

export default Channel;