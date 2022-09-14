import { BotWithCache } from "../../deps.ts";
import { deleteMessage } from "./deleteMessage.ts";
import { deleteMessages } from "./deleteMessages.ts";
import { getMessage } from "./getMessage.ts";
import { getMessages } from "./getMessages.ts";
import { pinMessage } from "./pinMessage.ts";
import { reactions } from "./reactions/mod.ts";
import { sendMessage } from "./sendMessage.ts";
import { unpinMessage } from "./unpinMessage.ts";

export function messages(bot: BotWithCache) {
  reactions(bot);
  deleteMessage(bot);
  deleteMessages(bot);
  getMessage(bot);
  getMessages(bot);
  pinMessage(bot);
  sendMessage(bot);
  unpinMessage(bot);
}
