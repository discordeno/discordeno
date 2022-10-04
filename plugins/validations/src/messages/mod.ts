import { Bot } from "../../deps.ts";
import { deleteMessages } from "./deleteMessages.ts";
import { editMessage } from "./editMessage.ts";
import { sendMessage } from "./sendMessage.ts";

export function messages(bot: Bot) {
  deleteMessages(bot);
  editMessage(bot);
  sendMessage(bot);
}
