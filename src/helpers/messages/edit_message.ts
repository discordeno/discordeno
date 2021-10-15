import { cacheHandlers } from "../../cache.ts";
import { EditMessage } from "../../types/messages/edit_message.ts";
import type { Message } from "../../types/messages/message.ts";
import type { PermissionStrings } from "../../types/permissions/permission_strings.ts";
import { validateComponents } from "../../util/utils.ts";
import {Bot} from "../../bot.ts";
import {SnakeCasedPropertiesDeep} from "../../types/util.ts";

/** Edit the message. */
export async function editMessage(bot: Bot, channelId: bigint, messageId: bigint, content: string | EditMessage) {
  const message = await cacheHandlers.get("messages", messageId);

  if (message) {
    if (message.authorId !== bot.id) {
      throw new Error("You can only edit a message that was sent by the bot.");
    }
    const requiredPerms: PermissionStrings[] = ["SEND_MESSAGES"];

    await bot.utils.requireBotChannelPermissions(message.channelId, requiredPerms);
  }

  if (typeof content === "string") content = { content };

  if (content.components?.length) {
    validateComponents(bot, content.components);
  }

  content.embeds?.splice(10);

  if (content.content && content.content.length > 2000) {
    throw new Error(bot.constants.Errors.MESSAGE_MAX_LENGTH);
  }

  const result = await bot.rest.runMethod<SnakeCasedPropertiesDeep<Message>>(
      bot.rest,
    "patch",
    bot.constants.endpoints.CHANNEL_MESSAGE(channelId, messageId),
    bot.utils.snakelize(content)
  );

  return bot.transformers.message(bot, result);
}
