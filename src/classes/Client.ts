import { EventEmitter } from "./deps.ts";
import { ClientOptions } from "./types/client_options.ts";
import { sendMessage } from "../helpers/messages/send_message.ts";
import { CreateMessage } from "../types/messages/create_message.ts";

export class Client extends EventEmitter {
  /** The bot's token */
  token: string;
  /** The timestamp when the bot started. */
  startedAt = Date.now();

  constructor(options: ClientOptions) {
    super();

    this.token = options.token;
  }

  get uptime() {
    return Date.now() - this.startedAt;
  }

  /** Send a message to the channel. Requires SEND_MESSAGES permission. */
  sendMessage(channelId: bigint, content: string | CreateMessage) {
      return sendMessage(channelId, content);
  }

  async connect() {

  }
}

export default Client;
